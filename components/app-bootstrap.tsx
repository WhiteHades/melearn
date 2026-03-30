"use client"

import { useEffect, useRef } from "react"
import { trpc } from "@/lib/trpc/client"
import { initDatabase } from "@/lib/database"
import { isTauri } from "@/lib/tauri"
import { useCourseStore } from "@/lib/stores/course-store"

export function AppBootstrap() {
  const libraryPath = useCourseStore(
    (state: ReturnType<typeof useCourseStore.getState>) => state.libraryPath
  )
  const setIsScanning = useCourseStore(
    (state: ReturnType<typeof useCourseStore.getState>) => state.setIsScanning
  )
  const utils = trpc.useUtils()
  const scanLibrary = trpc.library.scan.useMutation()
  const restoredPathRef = useRef<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const bootstrap = async () => {
      await initDatabase()

      if (!isTauri() || !libraryPath || restoredPathRef.current === libraryPath) {
        return
      }

      restoredPathRef.current = libraryPath

      try {
        if (!cancelled) {
          setIsScanning(true)
        }

        await scanLibrary.mutateAsync({ path: libraryPath })
        await utils.courses.list.invalidate()
      } catch (error) {
        restoredPathRef.current = null
        console.error("Failed to restore course library", error)
      } finally {
        if (!cancelled) {
          setIsScanning(false)
        }
      }
    }

    bootstrap()

    return () => {
      cancelled = true
    }
  }, [libraryPath, scanLibrary, setIsScanning, utils])

  return null
}
