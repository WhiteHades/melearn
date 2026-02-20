"use client"

import { useMemo, useState } from "react"
import { motion } from "motion/react"
import { CourseCard } from "@/components/course-card"
import { Button } from "@/components/ui/button"
import { useCourseStore } from "@/lib/stores/course-store"
import { selectFolderDialog, isTauri } from "@/lib/tauri"
import { searchCourses } from "@/lib/search"
import { trpc } from "@/lib/trpc/client"
import { FolderOpen, Loader2, RefreshCw } from "lucide-react"
import type { Course } from "@/types"

interface CourseGridProps {
  onCourseSelect: (course: Course) => void
  searchQuery?: string
  layout?: "grid" | "list"
}

export function CourseGrid({ onCourseSelect, searchQuery, layout = "grid" }: CourseGridProps) {
  const isScanning = useCourseStore(
    (state: ReturnType<typeof useCourseStore.getState>) => state.isScanning
  )
  const setIsScanning = useCourseStore(
    (state: ReturnType<typeof useCourseStore.getState>) => state.setIsScanning
  )
  const libraryPath = useCourseStore(
    (state: ReturnType<typeof useCourseStore.getState>) => state.libraryPath
  )
  const [error, setError] = useState<string | null>(null)
  const utils = trpc.useUtils()
  const { data: courses = [] } = trpc.courses.list.useQuery()
  const scanLibrary = trpc.library.scan.useMutation({
    onSuccess: async () => {
      await utils.courses.list.invalidate()
    },
  })

  const normalizedQuery = searchQuery?.trim() ?? ""

  const visibleCourses = useMemo<Course[]>(() => {
    if (!normalizedQuery) return courses
    const results = searchCourses(normalizedQuery, 50)
    const ids = new Set(results.map((result) => result.id))
    return courses.filter((course: Course) => ids.has(course.id))
  }, [courses, normalizedQuery])

  async function handleSelectFolder() {
    if (!isTauri()) {
      setError("folder selection only works in desktop app")
      return
    }

    try {
      const path = await selectFolderDialog()
      if (!path) return

      setIsScanning(true)
      setError(null)
      await scanLibrary.mutateAsync({ path })
    } catch (err) {
      setError(err instanceof Error ? err.message : "failed to scan folder")
    } finally {
      setIsScanning(false)
    }
  }

  async function handleRefresh() {
    if (!libraryPath) return
    
    try {
      setIsScanning(true)
      setError(null)

      await scanLibrary.mutateAsync({ path: libraryPath })
    } catch (err) {
      setError(err instanceof Error ? err.message : "failed to refresh")
    } finally {
      setIsScanning(false)
    }
  }

  if (courses.length === 0 && !isScanning) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-card/60 p-8 text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl border border-border bg-muted">
          <FolderOpen className="size-8 text-muted-foreground" />
        </div>
        <div>
          <h2 className="text-lg font-head font-semibold">no courses yet</h2>
          <p className="mt-1 text-sm text-muted-foreground font-sans">
            select a folder containing your courses to get started
          </p>
        </div>
        <Button onClick={handleSelectFolder} disabled={isScanning} className="font-semibold">
          {isScanning ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              scanning...
            </>
          ) : (
            <>
              <FolderOpen className="mr-2 size-4" />
              select folder
            </>
          )}
        </Button>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    )
  }

  const layoutClassName =
    layout === "list"
      ? "flex flex-col gap-4"
      : "grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"

  return (
    <div className="flex flex-1 flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-head">your courses</h2>
          <p className="text-sm text-muted-foreground font-sans">
            <span className="mr-2 inline-flex items-center rounded-full border border-border bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground">
              {visibleCourses.length}
            </span>
            course{visibleCourses.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={handleRefresh} disabled={isScanning}>
            <RefreshCw className={`mr-2 size-4 ${isScanning ? "animate-spin" : ""}`} />
            refresh
          </Button>
          <Button variant="secondary" size="sm" onClick={handleSelectFolder} disabled={isScanning}>
            <FolderOpen className="mr-2 size-4" />
            change folder
          </Button>
        </div>
      </div>
      
      {error && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {normalizedQuery && visibleCourses.length === 0 ? (
        <div className="rounded-xl border border-border bg-card/60 p-6 text-center">
          <p className="text-sm font-medium">no matches for "{normalizedQuery}"</p>
          <p className="mt-1 text-xs text-muted-foreground">try a different search term</p>
        </div>
      ) : (
        <div className={layoutClassName}>
          {visibleCourses.map((course: Course, index: number) => (
            <motion.div
              key={course.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.02 }}
              className={layout === "grid" ? "h-full" : ""}
            >
              <CourseCard
                course={course}
                onClick={() => onCourseSelect(course)}
                layout={layout}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
