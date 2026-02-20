"use client"

import { useCallback, useEffect, useMemo } from "react"
import { parseAsString, useQueryState } from "nuqs"
import { CourseViewerLayout } from "@/components/course-viewer/layout"
import { CourseGrid } from "@/components/course-grid"
import { CommandPalette } from "@/components/command-palette"
import { ThemeToggle } from "@/components/theme-toggle"
import { StatsDashboard } from "@/components/stats-dashboard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { trpc } from "@/lib/trpc/client"
import { Search, Library, BarChart2, LayoutGrid, List } from "lucide-react"
import type { Course, Lesson } from "@/types"

type View = "library" | "viewer" | "stats"

export default function Home() {
  const [viewParam, setViewParam] = useQueryState(
    "view",
    parseAsString.withDefault("library")
  )
  const [courseId, setCourseId] = useQueryState("course", parseAsString)
  const [lessonId, setLessonId] = useQueryState("lesson", parseAsString)
  const [searchQuery, setSearchQuery] = useQueryState(
    "q",
    parseAsString.withDefault("")
  )
  const [layoutParam, setLayoutParam] = useQueryState(
    "layout",
    parseAsString.withDefault("grid")
  )

  const view = ("library viewer stats".split(" ") as View[]).includes(viewParam as View)
    ? (viewParam as View)
    : "library"

  const layout = layoutParam === "list" ? "list" : "grid"

  const { data: courses = [] } = trpc.courses.list.useQuery()
  const markAccessed = trpc.courses.markAccessed.useMutation()

  const selectedCourse = useMemo(() => {
    return courses.find((course: Course) => course.id === courseId) ?? null
  }, [courses, courseId])

  useEffect(() => {
    if (view === "viewer" && !selectedCourse) {
      setViewParam("library")
      setCourseId(null)
      setLessonId(null)
    }
  }, [view, selectedCourse, setViewParam, setCourseId, setLessonId])

  const handleCourseSelect = useCallback(
    (course: Course) => {
      setCourseId(course.id)
      setLessonId(null)
      setViewParam("viewer")
      markAccessed.mutate({ courseId: course.id })
    },
    [setCourseId, setLessonId, setViewParam, markAccessed]
  )

  const handleLessonSelect = useCallback(
    (lesson: Lesson, course: Course) => {
      setCourseId(course.id)
      setLessonId(lesson.id)
      setViewParam("viewer")
      markAccessed.mutate({ courseId: course.id })
    },
    [setCourseId, setLessonId, setViewParam, markAccessed]
  )

  const handleBack = useCallback(() => {
    setViewParam("library")
    setCourseId(null)
    setLessonId(null)
  }, [setViewParam, setCourseId, setLessonId])

  return (
    <main className="app-shell relative h-full bg-background text-foreground font-sans selection:bg-primary/15 selection:text-foreground">
      <div className="relative z-10 flex h-full flex-col">
        {view === "library" || view === "stats" ? (
          <div className="flex h-full flex-col">
            <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
              <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-3">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                      <span className="font-head text-sm tracking-tight">ml</span>
                    </div>
                    <div className="flex flex-col">
                      <h1 className="text-lg font-head leading-none">melearn</h1>
                      <span className="text-xs text-muted-foreground">offline course hub</span>
                    </div>
                  </div>
                  <nav className="flex items-center gap-1 rounded-lg bg-muted/70 p-1">
                    <Button
                      variant={view === "library" ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setViewParam("library")}
                      className="h-8 gap-2 px-3"
                    >
                      <Library className="h-4 w-4" /> library
                    </Button>
                    <Button
                      variant={view === "stats" ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setViewParam("stats")}
                      className="h-8 gap-2 px-3"
                    >
                      <BarChart2 className="h-4 w-4" /> stats
                    </Button>
                  </nav>
                </div>
                <div className="flex w-full flex-1 items-center gap-3 sm:w-auto sm:flex-initial">
                  {view === "library" && (
                    <div className="relative flex-1 sm:w-64">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="search courses..."
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        className="h-9 w-full bg-card pl-9"
                      />
                    </div>
                  )}
                  {view === "library" && (
                    <div className="flex items-center gap-1 rounded-md border border-border bg-muted/60 p-1">
                      <Button
                        size="icon-sm"
                        variant={layout === "grid" ? "secondary" : "ghost"}
                        onClick={() => setLayoutParam("grid")}
                        aria-label="grid view"
                      >
                        <LayoutGrid className="size-4" />
                      </Button>
                      <Button
                        size="icon-sm"
                        variant={layout === "list" ? "secondary" : "ghost"}
                        onClick={() => setLayoutParam("list")}
                        aria-label="list view"
                      >
                        <List className="size-4" />
                      </Button>
                    </div>
                  )}
                  <ThemeToggle />
                </div>
              </div>
            </header>
            <div className="flex-1 overflow-y-auto px-4 pb-8 pt-6">
              <div className="mx-auto max-w-7xl">
                {view === "library" ? (
                  <CourseGrid
                    onCourseSelect={handleCourseSelect}
                    searchQuery={searchQuery}
                    layout={layout}
                  />
                ) : (
                  <StatsDashboard />
                )}
              </div>
            </div>
            <CommandPalette onSelectCourse={handleCourseSelect} onSelectLesson={handleLessonSelect} />
          </div>
        ) : (
          <CourseViewerLayout
            course={selectedCourse}
            onBack={handleBack}
            selectedLessonId={lessonId}
            onLessonChange={setLessonId}
          />
        )}
      </div>
    </main>
  )
}
