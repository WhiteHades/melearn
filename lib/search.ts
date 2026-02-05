import MiniSearch from "minisearch"
import type { Course, Lesson } from "@/types"

interface SearchDocument {
  id: string
  type: "course" | "lesson"
  name: string
  path: string
  courseId?: string
  courseName?: string
  sectionName?: string
}

let searchIndex: MiniSearch<SearchDocument> | null = null

export function initSearchIndex(): void {
  searchIndex = new MiniSearch<SearchDocument>({
    fields: ["name", "courseName", "sectionName"],
    storeFields: [
      "id",
      "type",
      "name",
      "path",
      "courseId",
      "courseName",
      "sectionName",
    ],
    searchOptions: {
      boost: { name: 2 },
      fuzzy: 0.2,
      prefix: true,
    },
  })
}

export function indexCourses(courses: Course[]): void {
  if (!searchIndex) initSearchIndex()
  
  searchIndex!.removeAll()

  const documents: SearchDocument[] = []

  for (const course of courses) {
    documents.push({
      id: course.id,
      type: "course",
      name: course.name,
      path: course.path,
      courseId: course.id,
    })

    for (const section of course.sections) {
      for (const lesson of section.lessons) {
        documents.push({
          id: lesson.id,
          type: "lesson",
          name: lesson.name,
          path: lesson.path,
          courseId: course.id,
          courseName: course.name,
          sectionName: section.name,
        })
      }
    }
  }

  searchIndex!.addAll(documents)
}

export interface SearchResult {
  id: string
  type: "course" | "lesson"
  name: string
  path: string
  courseId?: string
  courseName?: string
  sectionName?: string
  score: number
}

export function search(query: string, limit = 20): SearchResult[] {
  if (!searchIndex || !query.trim()) return []

  const results = searchIndex.search(query)

  return results.slice(0, limit).map((r) => ({
    id: r.id,
    type: r.type as "course" | "lesson",
    name: r.name,
    path: r.path,
    courseId: r.courseId,
    courseName: r.courseName,
    sectionName: r.sectionName,
    score: r.score,
  }))
}

export function searchCourses(query: string, limit = 10): SearchResult[] {
  return search(query, limit * 2).filter((r) => r.type === "course").slice(0, limit)
}

export function searchLessons(query: string, limit = 10): SearchResult[] {
  return search(query, limit * 2).filter((r) => r.type === "lesson").slice(0, limit)
}
