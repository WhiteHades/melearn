"use client"

import { useState, useEffect } from "react"
import { invoke } from "@tauri-apps/api/core"
import { Button } from "@/components/ui/button"
import { frontendLog } from "@/lib/frontend-log"
import { isTauri } from "@/lib/tauri"
import type { Lesson } from "@/types"
import { SkipBack, SkipForward, FileText, File, FileCode } from "lucide-react"

interface ContentViewerProps {
  lesson: Lesson
  onPrevious?: () => void
  onNext?: () => void
}

export function ContentViewer({ lesson, onPrevious, onNext }: ContentViewerProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [openedExternally, setOpenedExternally] = useState(false)

  const ext = lesson.path.toLowerCase().split(".").pop() || ""
  const isPdf = ext === "pdf"
  const isHtml = ext === "html" || ext === "htm"
  const isMarkdown = ext === "md" || ext === "markdown"
  const isDocument = lesson.type === "document"

  const getIcon = () => {
    if (isPdf || isDocument) return <FileText className="size-8 text-muted-foreground" />
    if (isHtml || isMarkdown) return <FileCode className="size-8 text-muted-foreground" />
    return <File className="size-8 text-muted-foreground" />
  }

  useEffect(() => {
    let isActive = true

    async function openInNative() {
      setLoading(true)
      setError(null)
      setOpenedExternally(false)

      if (!isTauri()) {
        setError("file viewing requires desktop app")
        setLoading(false)
        return
      }

      try {
        await invoke("open_native", { path: lesson.path })
        if (!isActive) return
        setOpenedExternally(true)
        frontendLog("info", "content.openNative", { path: lesson.path, type: lesson.type })
      } catch (err) {
        if (!isActive) return
        const message = err instanceof Error ? err.message : String(err)
        setError(`failed to open file: ${message}`)
        frontendLog("error", "content.openNative.failed", { path: lesson.path, error: message })
      } finally {
        if (isActive) setLoading(false)
      }
    }

    openInNative()

    return () => {
      isActive = false
    }
  }, [lesson.path, lesson.type])

  const navButtons = (
    <div className="flex gap-2">
      {onPrevious && (
        <Button variant="outline" size="sm" onClick={onPrevious}>
          <SkipBack className="mr-1 size-4" /> previous
        </Button>
      )}
      {onNext && (
        <Button size="sm" onClick={onNext}>
          next <SkipForward className="ml-1 size-4" />
        </Button>
      )}
    </div>
  )

  if (loading) {
    return (
      <div className="flex aspect-video w-full items-center justify-center bg-muted">
        <p className="text-muted-foreground">opening in default app...</p>
      </div>
    )
  }

  if (openedExternally) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-4 bg-muted">
        {getIcon()}
        <div className="text-center">
          <p className="text-lg font-medium">{lesson.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {"opened in your default app \u2014 return here when you are done"}
          </p>
          <p className="mt-2 max-w-md truncate text-xs text-muted-foreground">{lesson.path}</p>
        </div>
        {navButtons}
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-4 bg-muted">
        <p className="text-destructive">{error}</p>
        {navButtons}
      </div>
    )
  }

  return (
    <div className="flex aspect-video w-full flex-col items-center justify-center gap-4 bg-muted">
      {getIcon()}
      <div className="text-center">
        <p className="text-lg font-medium">{lesson.name}</p>
        <p className="mt-1 text-sm text-muted-foreground">{lesson.type} file</p>
        <p className="mt-2 max-w-md truncate text-xs text-muted-foreground">{lesson.path}</p>
      </div>
      {navButtons}
    </div>
  )
}
