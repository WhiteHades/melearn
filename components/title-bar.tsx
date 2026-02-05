"use client"

import { useEffect, useState } from "react"
import { getCurrentWindow } from "@tauri-apps/api/window"
import { isTauri } from "@/lib/tauri"
import { X, Minus, Square, Copy } from "lucide-react"

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
      className="sticky top-0 left-0 right-0 z-50 flex h-10 w-full shrink-0 items-center justify-between border-b-2 border-black bg-background px-4 select-none"
    >
      {/* Left: Branding/Drag Region */}
      <div className="flex items-center gap-2 font-head font-bold text-sm" data-tauri-drag-region>
        <div className="h-3 w-3 rounded-full bg-primary border border-black" />
        melearn
      </div>

      {/* Center: Drag Region Spacer */}
      <div className="flex-1 h-full" data-tauri-drag-region />

      {/* Right: Window Controls */}
      <div className="flex items-center gap-1">
        <button 
          onClick={handleMinimize}
          className="flex h-8 w-8 items-center justify-center hover:bg-muted active:bg-primary border-transparent rounded hover:border-black hover:border transition-colors focus:outline-none"
        >
          <Minus className="h-4 w-4" />
        </button>
        <button 
          onClick={handleMaximize}
          className="flex h-8 w-8 items-center justify-center hover:bg-muted active:bg-primary border-transparent rounded hover:border-black hover:border transition-colors focus:outline-none"
        >
          {isMaximized ? (
             <Copy className="h-3 w-3 rotate-180" /> // Using Copy icon rotated/styled as 'Restore' makeshift
          ) : (
             <Square className="h-3 w-3" />
          )}
        </button>
        <button 
          onClick={handleClose}
          className="flex h-8 w-8 items-center justify-center hover:bg-destructive hover:text-white border-transparent rounded hover:border-black hover:border transition-colors focus:outline-none"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
