"use client"

import { useEffect, useState } from "react"
import { getCurrentWindow } from "@tauri-apps/api/window"
import { isTauri } from "@/lib/tauri"
import { X, Minus, Square, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TitleBar() {
  const [isMaximized, setIsMaximized] = useState(false)
  const [isTauriApp, setIsTauriApp] = useState(false)

  useEffect(() => {
    setIsTauriApp(isTauri())
    
    // Check initial maximize state if in Tauri
    if (isTauri()) {
      getCurrentWindow().isMaximized().then(setIsMaximized)
      
      const unlisten = getCurrentWindow().listen("tauri://resize", async () => {
        setIsMaximized(await getCurrentWindow().isMaximized())
      })

      return () => {
        unlisten.then(f => f())
      }
    }
  }, [])

  if (!isTauriApp) return null

  const handleMinimize = () => getCurrentWindow().minimize()
  const handleMaximize = async () => {
    await getCurrentWindow().toggleMaximize()
    setIsMaximized(!isMaximized)
  }
  const handleClose = () => getCurrentWindow().close()

  return (
    <div
      data-tauri-drag-region
      className="sticky top-0 left-0 right-0 z-50 flex h-10 w-full shrink-0 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur select-none"
    >
      <div className="flex items-center gap-2 font-head text-sm" data-tauri-drag-region>
        <div className="h-2.5 w-2.5 rounded-full bg-primary" />
        melearn
      </div>

      <div className="flex-1 h-full" data-tauri-drag-region />

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={handleMinimize}
          aria-label="minimize"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={handleMaximize}
          aria-label={isMaximized ? "restore" : "maximize"}
        >
          {isMaximized ? (
            <Copy className="h-3.5 w-3.5 rotate-180" />
          ) : (
            <Square className="h-3.5 w-3.5" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={handleClose}
          className="hover:bg-destructive hover:text-destructive-foreground"
          aria-label="close"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
