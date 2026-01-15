"use client"

import { useState } from "react"
import { CourseCard } from "@/components/course-card"
import { Button } from "@/components/ui/button"
import { useCourseStore } from "@/lib/stores/course-store"
import { selectFolderDialog, scanFolder, isTauri } from "@/lib/tauri"
import { processScanResult } from "@/lib/course-utils"
import { indexCourses } from "@/lib/search"
import { FolderOpen, Loader2, RefreshCw } from "lucide-react"
import type { Course } from "@/types"

interface CourseGridProps {
  onCourseSelect: (course: Course) => void
}

export function CourseGrid({ onCourseSelect }: CourseGridProps) {
  const { courses, setCourses, isScanning, setIsScanning, libraryPath, setLibraryPath } = useCourseStore()
  const [error, setError] = useState<string | null>(null)

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
      setLibraryPath(path)

      const result = await scanFolder(path)
      const processedCourses = processScanResult(result)
      setCourses(processedCourses)
      indexCourses(processedCourses)

      if (result.warnings.length > 0) {
        console.warn("scan warnings:", result.warnings)
      }
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

      const result = await scanFolder(libraryPath)
      const processedCourses = processScanResult(result)
      setCourses(processedCourses)
      indexCourses(processedCourses)
    } catch (err) {
      setError(err instanceof Error ? err.message : "failed to refresh")
    } finally {
      setIsScanning(false)
    }
  }

  if (courses.length === 0 && !isScanning) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
        <div className="flex size-16 items-center justify-center rounded-full bg-muted">
          <FolderOpen className="size-8 text-muted-foreground" />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-semibold">no courses yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            select a folder containing your courses to get started
          </p>
        </div>
        <Button onClick={handleSelectFolder} disabled={isScanning}>
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

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">your courses</h2>
          <p className="text-sm text-muted-foreground">
            {courses.length} course{courses.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isScanning}>
            <RefreshCw className={`mr-2 size-4 ${isScanning ? "animate-spin" : ""}`} />
            refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleSelectFolder} disabled={isScanning}>
            <FolderOpen className="mr-2 size-4" />
            change folder
          </Button>
        </div>
      </div>
      
      {error && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onClick={() => onCourseSelect(course)}
          />
        ))}
      </div>
    </div>
  )
}
