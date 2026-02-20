"use client"

import { useState, useEffect, useMemo } from "react"
import { Sidebar } from "./sidebar"
import { VideoArea } from "./video-area"
import { NotesPanel } from "./notes-panel"
import type { Course, Lesson } from "@/types"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

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
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null)

  // Initialize with the first lesson of the first section when course changes
  useEffect(() => {
    if (!course) {
      setCurrentLessonId(null)
      onLessonChange?.(null)
      return
    }

    const fromSelection = selectedLessonId
      ? course.sections.flatMap((section) => section.lessons).find((lesson) => lesson.id === selectedLessonId) ?? null
      : null

    const fallback =
      course.sections.length > 0 && course.sections[0].lessons.length > 0
        ? course.sections[0].lessons[0]
        : null

    const nextLessonId = fromSelection?.id ?? fallback?.id ?? null
    setCurrentLessonId(nextLessonId)

    if (nextLessonId && nextLessonId !== selectedLessonId) {
      onLessonChange?.(nextLessonId)
    }
  }, [course, selectedLessonId, onLessonChange])

  const currentLesson = useMemo(() => {
    if (!course || !currentLessonId) return null
    for (const section of course.sections) {
      const lesson = section.lessons.find((item) => item.id === currentLessonId)
      if (lesson) return lesson
    }
    return null
  }, [course, currentLessonId])

  const handleLessonSelect = (lesson: Lesson) => {
    setCurrentLessonId(lesson.id)
    onLessonChange?.(lesson.id)
  }

  const handleNextLesson = () => {
    if (!course || !currentLessonId) return

    for (let i = 0; i < course.sections.length; i++) {
      const section = course.sections[i]
      const lessonIndex = section.lessons.findIndex((l) => l.id === currentLessonId)
      
      if (lessonIndex !== -1) {
        // Check next lesson in same section
        if (lessonIndex < section.lessons.length - 1) {
          const nextLesson = section.lessons[lessonIndex + 1]
          setCurrentLessonId(nextLesson.id)
          onLessonChange?.(nextLesson.id)
          return
        }
        // Check first lesson of next section
        if (i < course.sections.length - 1 && course.sections[i + 1].lessons.length > 0) {
          const nextLesson = course.sections[i + 1].lessons[0]
          setCurrentLessonId(nextLesson.id)
          onLessonChange?.(nextLesson.id)
          return
        }
      }
    }
  }

  const handlePrevLesson = () => {
    if (!course || !currentLessonId) return

    for (let i = 0; i < course.sections.length; i++) {
        const section = course.sections[i]
        const lessonIndex = section.lessons.findIndex((l) => l.id === currentLessonId)
        
        if (lessonIndex !== -1) {
          // Check prev lesson in same section
          if (lessonIndex > 0) {
            const prevLesson = section.lessons[lessonIndex - 1]
            setCurrentLessonId(prevLesson.id)
            onLessonChange?.(prevLesson.id)
            return
          }
          // Check last lesson of prev section
          if (i > 0 && course.sections[i - 1].lessons.length > 0) {
            const prevSection = course.sections[i - 1]
            const prevLesson = prevSection.lessons[prevSection.lessons.length - 1]
            setCurrentLessonId(prevLesson.id)
            onLessonChange?.(prevLesson.id)
            return
          }
        }
      }
  }

  return (
    <div className="h-full w-full bg-background text-foreground">
      <ResizablePanelGroup
        orientation="horizontal"
        className="h-full w-full"
        id="course-viewer-layout"
      >
        <ResizablePanel
          defaultSize={20}
          minSize={12}
          collapsible={true}
          className="bg-sidebar min-h-0 min-w-0 overflow-hidden"
        >
          <Sidebar
            onBack={onBack}
            course={course}
            currentLessonId={currentLesson?.id}
            onSelectLesson={handleLessonSelect}
          />
        </ResizablePanel>

        <ResizableHandle withHandle className="w-px bg-border" />

        <ResizablePanel defaultSize={55} minSize={20} className="bg-background min-h-0 min-w-0">
          <VideoArea
            lesson={currentLesson}
            onNext={handleNextLesson}
            onPrevious={handlePrevLesson}
          />
        </ResizablePanel>

        <ResizableHandle withHandle className="w-px bg-border" />

        <ResizablePanel
          defaultSize={25}
          minSize={12}
          collapsible={true}
          className="bg-background min-h-0 min-w-0"
        >
          <NotesPanel lesson={currentLesson} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
