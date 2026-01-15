"use client"

import { useState, useCallback } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { CourseGrid } from "@/components/course-grid"
import { LessonViewer } from "@/components/lesson-viewer"
import { CommandPalette } from "@/components/command-palette"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { Button } from "@/components/ui/button"
import type { Course, Lesson } from "@/types"
import { Search, BarChart2, Library } from "lucide-react"

type View = "library" | "lesson" | "stats"

export default function HomePage() {
  const [view, setView] = useState<View>("library")
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)

  const handleCourseSelect = useCallback((course: Course) => {
    setSelectedCourse(course)
    setSelectedLesson(null)
    setView("lesson")
  }, [])

  const handleLessonSelect = useCallback((lesson: Lesson, course: Course) => {
    setSelectedCourse(course)
    setSelectedLesson(lesson)
    setView("lesson")
  }, [])

  const handleBack = useCallback(() => {
    setView("library")
    setSelectedCourse(null)
    setSelectedLesson(null)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b bg-background px-4">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold">melearn</h1>
          <nav className="flex items-center gap-1">
            <Button
              variant={view === "library" || view === "lesson" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setView("library")}
            >
              <Library className="mr-1 size-4" />
              library
            </Button>
            <Button
              variant={view === "stats" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setView("stats")}
            >
              <BarChart2 className="mr-1 size-4" />
              stats
            </Button>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Search className="size-4" />
            <span className="hidden sm:inline">search</span>
            <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium sm:inline-flex">
              <span className="text-xs">⌘</span>k
            </kbd>
          </Button>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        {view === "library" && <CourseGrid onCourseSelect={handleCourseSelect} />}
        {view === "lesson" && selectedCourse && (
          <LessonViewer
            course={selectedCourse}
            initialLesson={selectedLesson ?? undefined}
            onBack={handleBack}
          />
        )}
        {view === "stats" && <AnalyticsDashboard />}
      </main>

      <CommandPalette
        onSelectCourse={handleCourseSelect}
        onSelectLesson={handleLessonSelect}
      />
    </div>
  )
}
