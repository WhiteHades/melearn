import type { Course, Section, Lesson } from "@/types"
import type { ScanResult, CourseData, SectionData, FileEntry } from "@/lib/tauri"
import { nanoid } from "nanoid"

function generateLessonId(): string {
  return nanoid(12)
}

function generateCourseId(): string {
  return nanoid(12)
}

function mapFileType(type: FileEntry["file_type"]): Lesson["type"] {
  switch (type) {
    case "video":
      return "video"
    case "audio":
      return "audio"
    case "document":
      return "document"
    case "quiz":
      return "quiz"
    default:
      return "video"
  }
}

function extractSubtitles(files: FileEntry[], videoPath: string): Lesson["subtitles"] {
  const videoBasename = videoPath
    .split("/")
    .pop()
    ?.replace(/\.[^.]+$/, "") ?? ""

  return files
    .filter((f) => f.file_type === "subtitle")
    .filter((f) => {
      const subtitleBasename = f.name.replace(/\.[^.]+$/, "")
      return (
        subtitleBasename === videoBasename ||
        subtitleBasename.startsWith(videoBasename + ".")
      )
    })
    .map((f) => {
      const parts = f.name.split(".")
      const lang = parts.length > 2 ? parts[parts.length - 2] : "default"
      return {
        path: f.path,
        language: lang,
        label: lang,
      }
    })
}

function sectionDataToSection(
  data: SectionData,
  courseId: string,
  allFiles: FileEntry[]
): Section {
  const lessons: Lesson[] = data.files
    .filter((f) => f.file_type !== "subtitle")
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
    .map((file, index) => ({
      id: generateLessonId(),
      courseId,
      sectionName: data.name,
      name: file.name.replace(/\.[^.]+$/, ""),
      path: file.path,
      type: mapFileType(file.file_type),
      duration: 0,
      completed: false,
      watchedTime: 0,
      lastPosition: 0,
      order: index,
      subtitles: extractSubtitles(data.files, file.path),
    }))

  return {
    id: nanoid(8),
    name: data.name,
    lessons,
    order: data.order,
  }
}

function courseDataToCourse(data: CourseData): Course {
  const courseId = generateCourseId()
  const allFiles = data.sections.flatMap((s) => s.files)
  
  const sections = data.sections
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
    .map((s, index) => sectionDataToSection({ ...s, order: index }, courseId, allFiles))

  const totalLessons = sections.reduce((sum, s) => sum + s.lessons.length, 0)

  return {
    id: courseId,
    name: data.name,
    path: data.path,
    sections,
    progress: 0,
    totalDuration: 0,
    watchedDuration: 0,
    lastAccessed: null,
    thumbnail: null,
  }
}

export function processScanResult(result: ScanResult): Course[] {
  return result.courses.map(courseDataToCourse)
}

export function calculateCourseProgress(course: Course): number {
  const lessons = course.sections.flatMap((s) => s.lessons)
  if (lessons.length === 0) return 0
  const completed = lessons.filter((l) => l.completed).length
  return Math.round((completed / lessons.length) * 100)
}

export function getTotalLessons(course: Course): number {
  return course.sections.reduce((sum, s) => sum + s.lessons.length, 0)
}

export function getCompletedLessons(course: Course): number {
  return course.sections.reduce(
    (sum, s) => sum + s.lessons.filter((l) => l.completed).length,
    0
  )
}

export function findLessonById(courses: Course[], lessonId: string): Lesson | null {
  for (const course of courses) {
    for (const section of course.sections) {
      const lesson = section.lessons.find((l) => l.id === lessonId)
      if (lesson) return lesson
    }
  }
  return null
}

export function findNextLesson(course: Course, currentLessonId: string): Lesson | null {
  const allLessons = course.sections.flatMap((s) => s.lessons)
  const currentIndex = allLessons.findIndex((l) => l.id === currentLessonId)
  if (currentIndex === -1 || currentIndex >= allLessons.length - 1) return null
  return allLessons[currentIndex + 1]
}

export function findPreviousLesson(course: Course, currentLessonId: string): Lesson | null {
  const allLessons = course.sections.flatMap((s) => s.lessons)
  const currentIndex = allLessons.findIndex((l) => l.id === currentLessonId)
  if (currentIndex <= 0) return null
  return allLessons[currentIndex - 1]
}
