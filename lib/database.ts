import Database from "@tauri-apps/plugin-sql"
import type { Course, Note } from "@/types"
import { isTauri } from "./tauri"

let db: Database | null = null
const SQLITE_BATCH_SIZE = 500

type PersistedCourseRow = {
  id: string
  path: string
  last_accessed: string | null
}

type PersistedLessonRow = {
  id: string
  path: string
  watched_time: number
  last_position: number
  completed: number
}

type PersistedNoteRow = {
  id: string
  lesson_id: string
  timestamp: number
  text: string
  created_at: string
}

async function getDatabase(): Promise<Database | null> {
  if (!isTauri()) return null

  if (!db) {
    db = await Database.load("sqlite:melearn.db")
  }

  return db
}

function createPlaceholders(count: number): string {
  return Array.from({ length: count }, (_, index) => `$${index + 1}`).join(", ")
}

async function selectPersistedCourses(paths: string[]): Promise<PersistedCourseRow[]> {
  const database = await getDatabase()
  if (!database || paths.length === 0) return []

  const rows: PersistedCourseRow[] = []

  for (let index = 0; index < paths.length; index += SQLITE_BATCH_SIZE) {
    const batch = paths.slice(index, index + SQLITE_BATCH_SIZE)
    const result = await database.select<PersistedCourseRow[]>(
      `SELECT id, path, last_accessed FROM courses WHERE path IN (${createPlaceholders(batch.length)})`,
      batch
    )

    rows.push(...result)
  }

  return rows
}

async function selectPersistedLessons(paths: string[]): Promise<PersistedLessonRow[]> {
  const database = await getDatabase()
  if (!database || paths.length === 0) return []

  const rows: PersistedLessonRow[] = []

  for (let index = 0; index < paths.length; index += SQLITE_BATCH_SIZE) {
    const batch = paths.slice(index, index + SQLITE_BATCH_SIZE)
    const result = await database.select<PersistedLessonRow[]>(
      `SELECT id, path, watched_time, last_position, completed FROM lessons WHERE path IN (${createPlaceholders(batch.length)})`,
      batch
    )

    rows.push(...result)
  }

  return rows
}

export async function initDatabase(): Promise<void> {
  await getDatabase()
}

export async function syncLibrary(courses: Course[]): Promise<Course[]> {
  const database = await getDatabase()
  if (!database || courses.length === 0) {
    return courses
  }

  const coursePaths = courses.map((course) => course.path)
  const lessonPaths = courses.flatMap((course) =>
    course.sections.flatMap((section) => section.lessons.map((lesson) => lesson.path))
  )

  const [persistedCourses, persistedLessons] = await Promise.all([
    selectPersistedCourses(coursePaths),
    selectPersistedLessons(lessonPaths),
  ])

  const persistedCourseByPath = new Map(
    persistedCourses.map((course) => [course.path, course])
  )
  const persistedLessonByPath = new Map(
    persistedLessons.map((lesson) => [lesson.path, lesson])
  )

  const resolvedCourses = courses.map((course) => {
    const persistedCourse = persistedCourseByPath.get(course.path)
    const courseId = persistedCourse?.id ?? course.id

    return {
      ...course,
      id: courseId,
      lastAccessed: persistedCourse?.last_accessed ?? course.lastAccessed,
      sections: course.sections.map((section) => ({
        ...section,
        lessons: section.lessons.map((lesson) => {
          const persistedLesson = persistedLessonByPath.get(lesson.path)

          return {
            ...lesson,
            id: persistedLesson?.id ?? lesson.id,
            courseId,
            watchedTime: persistedLesson?.watched_time ?? lesson.watchedTime,
            lastPosition: persistedLesson?.last_position ?? lesson.lastPosition,
            completed:
              persistedLesson !== undefined
                ? Boolean(persistedLesson.completed)
                : lesson.completed,
          }
        }),
      })),
    }
  })

  for (const course of resolvedCourses) {
    await database.execute(
      `INSERT INTO courses (id, name, path, total_duration, watched_duration, last_accessed)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT(path) DO UPDATE SET
         id = excluded.id,
         name = excluded.name,
         total_duration = excluded.total_duration,
         watched_duration = excluded.watched_duration,
         last_accessed = excluded.last_accessed`,
      [
        course.id,
        course.name,
        course.path,
        course.totalDuration,
        course.watchedDuration,
        course.lastAccessed,
      ]
    )

    for (const section of course.sections) {
      for (const lesson of section.lessons) {
        await database.execute(
          `INSERT INTO lessons (
            id,
            course_id,
            section_name,
            name,
            path,
            type,
            duration,
            watched_time,
            completed,
            order_index,
            last_position
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
          ON CONFLICT(path) DO UPDATE SET
            id = excluded.id,
            course_id = excluded.course_id,
            section_name = excluded.section_name,
            name = excluded.name,
            type = excluded.type,
            duration = excluded.duration,
            order_index = excluded.order_index`,
          [
            lesson.id,
            course.id,
            lesson.sectionName,
            lesson.name,
            lesson.path,
            lesson.type,
            lesson.duration,
            lesson.watchedTime,
            lesson.completed ? 1 : 0,
            lesson.order,
            lesson.lastPosition,
          ]
        )
      }
    }
  }

  return resolvedCourses
}

export async function updateLessonProgress(
  lessonId: string,
  watchedTime: number,
  lastPosition: number,
  completed: boolean
): Promise<void> {
  const database = await getDatabase()
  if (!database) return

  await database.execute(
    `UPDATE lessons SET watched_time = $1, last_position = $2, completed = $3 WHERE id = $4`,
    [watchedTime, lastPosition, completed ? 1 : 0, lessonId]
  )
}

export async function updateCourseLastAccessed(
  courseId: string,
  timestamp: string
): Promise<void> {
  const database = await getDatabase()
  if (!database) return

  await database.execute(`UPDATE courses SET last_accessed = $1 WHERE id = $2`, [timestamp, courseId])
}

export async function saveNote(note: Note): Promise<void> {
  const database = await getDatabase()
  if (!database) return

  await database.execute(
    `INSERT INTO notes (id, lesson_id, timestamp, text, created_at) VALUES ($1, $2, $3, $4, $5)`,
    [note.id, note.lessonId, note.timestamp, note.text, note.createdAt]
  )
}

export async function listNotesByLesson(lessonId: string): Promise<Note[]> {
  const database = await getDatabase()
  if (!database) return []

  const rows = await database.select<PersistedNoteRow[]>(
    `SELECT id, lesson_id, timestamp, text, created_at
     FROM notes
     WHERE lesson_id = $1
     ORDER BY timestamp ASC, created_at ASC`,
    [lessonId]
  )

  return rows.map((row) => ({
    id: row.id,
    lessonId: row.lesson_id,
    timestamp: row.timestamp,
    text: row.text,
    createdAt: row.created_at,
  }))
}

export async function deleteNote(noteId: string): Promise<void> {
  const database = await getDatabase()
  if (!database) return

  await database.execute(`DELETE FROM notes WHERE id = $1`, [noteId])
}
