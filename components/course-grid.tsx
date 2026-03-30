"use client"

import { useMemo, useState } from "react"
import { FolderOpen, Loader2, RefreshCw } from "lucide-react"
import { CourseCard } from "@/components/course-card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCourseStore } from "@/lib/stores/course-store"
import { selectFolderDialog, isTauri } from "@/lib/tauri"
import { search } from "@/lib/search"
import { trpc } from "@/lib/trpc/client"
import type { Course } from "@/types"

interface CourseGridProps {
  onCourseSelect: (course: Course) => void
  searchQuery?: string
}

export function CourseGrid({ onCourseSelect, searchQuery }: CourseGridProps) {
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
    const results = search(normalizedQuery, 50)
    const ids = new Set(
      results.map((result) => (result.type === "course" ? result.id : result.courseId)).filter(Boolean)
    )
    return courses.filter((course: Course) => ids.has(course.id))
  }, [courses, normalizedQuery])

  async function handleSelectFolder() {
    if (!isTauri()) {
      setError("Folder selection is only available in the desktop app.")
      return
    }

    try {
      const path = await selectFolderDialog()
      if (!path) return

      setIsScanning(true)
      setError(null)
      await scanLibrary.mutateAsync({ path })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to scan the selected folder.")
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
      setError(err instanceof Error ? err.message : "Failed to refresh the current library.")
    } finally {
      setIsScanning(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-[28px] border border-border/70 bg-card/85 p-5 shadow-[0_24px_64px_-48px_rgba(15,23,42,0.45)] sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Library</p>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">Your downloaded courses</h2>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground text-pretty">
                Point melearn at one folder and keep the rest simple. Refresh when you add new course files.
              </p>
            </div>
            {libraryPath ? (
              <p className="max-w-2xl truncate text-sm text-muted-foreground">{libraryPath}</p>
            ) : (
              <p className="text-sm text-muted-foreground">No library selected yet.</p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {libraryPath && (
              <Button variant="outline" onClick={handleRefresh} disabled={isScanning}>
                {isScanning ? (
                  <Loader2 data-icon="inline-start" className="animate-spin" />
                ) : (
                  <RefreshCw data-icon="inline-start" />
                )}
                Refresh library
              </Button>
            )}
            <Button onClick={handleSelectFolder} disabled={isScanning}>
              {isScanning ? (
                <Loader2 data-icon="inline-start" className="animate-spin" />
              ) : (
                <FolderOpen data-icon="inline-start" />
              )}
              {libraryPath ? "Choose another folder" : "Choose folder"}
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mt-5">
            <AlertTitle>Library error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>

      {isScanning && courses.length === 0 ? (
        <Card className="rounded-[28px] border-border/70 bg-card/75 shadow-none">
          <CardContent className="flex flex-col items-center gap-4 px-6 py-12 text-center sm:px-10">
            <Loader2 className="size-7 animate-spin text-muted-foreground" />
            <div className="space-y-2">
              <h3 className="text-xl font-semibold tracking-tight text-foreground">Scanning your library</h3>
              <p className="max-w-md text-sm leading-6 text-muted-foreground">
                Reading folders and rebuilding the offline index. This usually takes a moment.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : courses.length === 0 ? (
        <Card className="rounded-[28px] border-dashed border-border/80 bg-card/75 shadow-none">
          <CardContent className="flex flex-col items-center gap-5 px-6 py-12 text-center sm:px-10">
            <div className="flex size-16 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
              <FolderOpen className="size-7" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold tracking-tight text-foreground">No courses yet</h3>
              <p className="max-w-md text-sm leading-6 text-muted-foreground">
                Choose the folder that contains your downloaded courses and melearn will build the library for you.
              </p>
            </div>
            <Button onClick={handleSelectFolder} disabled={isScanning}>
              {isScanning ? (
                <Loader2 data-icon="inline-start" className="animate-spin" />
              ) : (
                <FolderOpen data-icon="inline-start" />
              )}
              Select folder
            </Button>
          </CardContent>
        </Card>
      ) : normalizedQuery && visibleCourses.length === 0 ? (
        <Card className="rounded-[28px] border-border/70 bg-card/75 shadow-none">
          <CardContent className="px-6 py-10 text-center sm:px-10">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              No matches for &quot;{normalizedQuery}&quot;
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a course title, lesson name, or section heading.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onClick={() => onCourseSelect(course)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
