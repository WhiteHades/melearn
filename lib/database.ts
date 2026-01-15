import Database from "@tauri-apps/plugin-sql"
import type { Course, Lesson, Note, Bookmark } from "@/types"
import { isTauri } from "./tauri"

let db: Database | null = null

export async function initDatabase(): Promise<void> {
  if (!isTauri()) return
  db = await Database.load("sqlite:melearn.db")
}

export async function saveCourse(course: Course): Promise<void> {
  if (!db) return

  await db.execute(
    `INSERT OR REPLACE INTO courses (id, name, path, total_duration, watched_duration, last_accessed, metadata)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [
      course.id,
      course.name,
      course.path,
      course.totalDuration,
      course.watchedDuration,
      course.lastAccessed?.toISOString() ?? null,
      JSON.stringify({ thumbnail: course.thumbnail }),
    ]
  )

  for (const section of course.sections) {
    for (const lesson of section.lessons) {
      await db.execute(
        `INSERT OR REPLACE INTO lessons (id, course_id, section_name, name, path, type, duration, watched_time, completed, order_index, last_position)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          lesson.id,
          course.id,
          section.name,
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

export async function loadCourses(): Promise<Course[]> {
  if (!db) return []

  const courseRows = await db.select<{
    id: string
    name: string
    path: string
    total_duration: number
    watched_duration: number
    last_accessed: string | null
    metadata: string | null
  }[]>("SELECT * FROM courses ORDER BY last_accessed DESC")

  const courses: Course[] = []

  for (const row of courseRows) {
    const lessonRows = await db.select<{
      id: string
      course_id: string
      section_name: string
      name: string
      path: string
      type: string
      duration: number
      watched_time: number
      completed: number
      order_index: number
      last_position: number
    }[]>("SELECT * FROM lessons WHERE course_id = $1 ORDER BY section_name, order_index", [row.id])

    const sectionsMap = new Map<string, Lesson[]>()

    for (const lesson of lessonRows) {
      const sectionName = lesson.section_name || "main"
      if (!sectionsMap.has(sectionName)) {
        sectionsMap.set(sectionName, [])
      }
      sectionsMap.get(sectionName)!.push({
        id: lesson.id,
        courseId: lesson.course_id,
        sectionName: lesson.section_name,
        name: lesson.name,
        path: lesson.path,
        type: lesson.type as Lesson["type"],
        duration: lesson.duration,
        watchedTime: lesson.watched_time,
        completed: lesson.completed === 1,
        lastPosition: lesson.last_position,
        order: lesson.order_index,
        subtitles: [],
      })
    }

    const metadata = row.metadata ? JSON.parse(row.metadata) : {}

    courses.push({
      id: row.id,
      name: row.name,
      path: row.path,
      sections: Array.from(sectionsMap.entries()).map(([name, lessons], index) => ({
        id: `${row.id}-${index}`,
        name,
        lessons,
        order: index,
      })),
      progress: 0,
      totalDuration: row.total_duration,
      watchedDuration: row.watched_duration,
      lastAccessed: row.last_accessed ? new Date(row.last_accessed) : null,
      thumbnail: metadata.thumbnail ?? null,
    })
  }

  return courses
}

export async function updateLessonProgress(
  lessonId: string,
  watchedTime: number,
  lastPosition: number,
  completed: boolean
): Promise<void> {
  if (!db) return

  await db.execute(
    `UPDATE lessons SET watched_time = $1, last_position = $2, completed = $3 WHERE id = $4`,
    [watchedTime, lastPosition, completed ? 1 : 0, lessonId]
  )
}

export async function saveNote(note: Note): Promise<void> {
  if (!db) return

  await db.execute(
    `INSERT INTO notes (id, lesson_id, timestamp, text, created_at) VALUES ($1, $2, $3, $4, $5)`,
    [note.id, note.lessonId, note.timestamp, note.text, note.createdAt.toISOString()]
  )
}

export async function deleteNote(noteId: string): Promise<void> {
  if (!db) return
  await db.execute(`DELETE FROM notes WHERE id = $1`, [noteId])
}

export async function loadNotes(lessonId: string): Promise<Note[]> {
  if (!db) return []

  const rows = await db.select<{
    id: string
    lesson_id: string
    timestamp: number
    text: string
    created_at: string
  }[]>("SELECT * FROM notes WHERE lesson_id = $1 ORDER BY timestamp", [lessonId])

  return rows.map((row) => ({
    id: row.id,
    lessonId: row.lesson_id,
    timestamp: row.timestamp,
    text: row.text,
    createdAt: new Date(row.created_at),
  }))
}

export async function saveBookmark(bookmark: Bookmark): Promise<void> {
  if (!db) return

  await db.execute(
    `INSERT INTO bookmarks (id, lesson_id, timestamp, label, created_at) VALUES ($1, $2, $3, $4, $5)`,
    [bookmark.id, bookmark.lessonId, bookmark.timestamp, bookmark.label, bookmark.createdAt.toISOString()]
  )
}

export async function deleteBookmark(bookmarkId: string): Promise<void> {
  if (!db) return
  await db.execute(`DELETE FROM bookmarks WHERE id = $1`, [bookmarkId])
}

export async function loadBookmarks(lessonId: string): Promise<Bookmark[]> {
  if (!db) return []

  const rows = await db.select<{
    id: string
    lesson_id: string
    timestamp: number
    label: string | null
    created_at: string
  }[]>("SELECT * FROM bookmarks WHERE lesson_id = $1 ORDER BY timestamp", [lessonId])

  return rows.map((row) => ({
    id: row.id,
    lessonId: row.lesson_id,
    timestamp: row.timestamp,
    label: row.label ?? "",
    createdAt: new Date(row.created_at),
  }))
}

export async function deleteCourse(courseId: string): Promise<void> {
  if (!db) return
  await db.execute(`DELETE FROM courses WHERE id = $1`, [courseId])
}
