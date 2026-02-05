"use client"

import { useEffect } from "react"
import { useCourseStore } from "@/lib/stores/course-store"
import type { Course } from "@/types"
import { indexCourses } from "@/lib/search"

export function SearchIndexer() {
  const courses = useCourseStore((state: { courses: Course[] }) => state.courses)

  useEffect(() => {
    indexCourses(courses)
  }, [courses])

  return null
}
