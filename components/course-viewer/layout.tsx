"use client"

import { useEffect, useMemo } from "react"
import { Sidebar } from "./sidebar"
import { VideoArea } from "./video-area"
import { NotesPanel } from "./notes-panel"
import type { Course, Lesson } from "@/types"

interface CourseViewerLayoutProps {
  course: Course | null
  onBack: () => void
  selectedLessonId?: string | null
  onLessonChange?: (lessonId: string | null) => void
}

export function CourseViewerLayout({
  course,
  onBack,
  selectedLessonId,
  onLessonChange,
}: CourseViewerLayoutProps) {
  const orderedLessons = useMemo(() => {
    if (!course) return []
    return course.sections.flatMap((section) => section.lessons)
  }, [course])

  const currentLesson = useMemo(() => {
    if (!course) return null

    if (selectedLessonId) {
      const selectedLesson = orderedLessons.find((lesson) => lesson.id === selectedLessonId)
      if (selectedLesson) {
        return selectedLesson
      }
    }

    return orderedLessons[0] ?? null
  }, [course, orderedLessons, selectedLessonId])

  useEffect(() => {
    const currentLessonId = currentLesson?.id ?? null

    if (currentLessonId !== selectedLessonId) {
      onLessonChange?.(currentLessonId)
    }
  }, [currentLesson, onLessonChange, selectedLessonId])

  const handleLessonSelect = (lesson: Lesson) => {
    onLessonChange?.(lesson.id)
  }

  const handleNextLesson = () => {
    if (!currentLesson) return

    const currentIndex = orderedLessons.findIndex((lesson) => lesson.id === currentLesson.id)
    if (currentIndex === -1) return

    const nextLesson = orderedLessons[currentIndex + 1]
    if (nextLesson) {
      onLessonChange?.(nextLesson.id)
    }
  }

  const handlePrevLesson = () => {
    if (!currentLesson) return

    const currentIndex = orderedLessons.findIndex((lesson) => lesson.id === currentLesson.id)
    if (currentIndex <= 0) return

    const previousLesson = orderedLessons[currentIndex - 1]
    if (previousLesson) {
      onLessonChange?.(previousLesson.id)
    }
  }

  return (
    <div className="h-full w-full bg-background text-foreground">
      <div className="flex h-full w-full flex-col lg:flex-row">
          <div className="border-b border-border lg:w-72 lg:border-b-0 lg:border-r lg:bg-sidebar">
          <Sidebar
            onBack={onBack}
            course={course}
            currentLessonId={currentLesson?.id}
            onSelectLesson={handleLessonSelect}
          />
        </div>

          <div className="flex h-full min-h-0 flex-1 flex-col lg:flex-row">
          <div className="flex-1 min-h-0">
            <VideoArea
              key={currentLesson?.id ?? "empty-lesson"}
              lesson={currentLesson}
              onNext={handleNextLesson}
              onPrevious={handlePrevLesson}
            />
          </div>

          <div className="border-t border-border lg:w-[320px] lg:border-l lg:border-t-0">
            <NotesPanel lesson={currentLesson} />
          </div>
        </div>
      </div>
    </div>
  )
}
