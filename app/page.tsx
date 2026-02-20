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
    <main className="relative h-full bg-background text-foreground font-sans selection:bg-primary/20 selection:text-foreground bg-[radial-gradient(120%_80%_at_50%_0%,_rgba(255,255,255,0.7)_0%,_transparent_60%)] dark:bg-[radial-gradient(120%_80%_at_50%_0%,_rgba(255,255,255,0.08)_0%,_transparent_65%)]">
      <div className="relative z-10 flex h-full flex-col">
        {view === "library" || view === "stats" ? (
          <div className="flex h-full flex-col">
            <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-head tracking-tight">melearn</h1>
                  <span className="hidden md:inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    offline course hub
                  </span>
                </div>
                <nav className="flex items-center gap-2 ml-4">
                  <Button
                    variant={view === "library" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewParam("library")}
                    className="gap-2"
                  >
                    <Library className="h-4 w-4" /> library
                  </Button>
                  <Button
                    variant={view === "stats" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewParam("stats")}
                    className="gap-2"
                  >
                    <BarChart2 className="h-4 w-4" /> stats
                  </Button>
                </nav>
              </div>
              <div className="flex items-center gap-3">
                {view === "library" && (
                  <>
                    <div className="relative hidden sm:block">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="search courses..."
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        className="h-9 w-64 pl-9"
                      />
                    </div>
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
                  </>
                )}
                <ThemeToggle />
              </div>
            </header>
            <div className="flex-1 overflow-y-auto p-6">
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
