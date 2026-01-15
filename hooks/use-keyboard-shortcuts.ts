import { useEffect, useCallback } from "react"

export interface KeyboardShortcut {
  key: string
  ctrl?: boolean
  shift?: boolean
  alt?: boolean
  meta?: boolean
  action: () => void
  description: string
}

export function useKeyboardShortcuts(
  shortcuts: KeyboardShortcut[],
  enabled = true
) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return

      const target = event.target as HTMLElement
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return
      }

      for (const shortcut of shortcuts) {
        const keyMatches = event.key.toLowerCase() === shortcut.key.toLowerCase()
        const ctrlMatches = shortcut.ctrl ? event.ctrlKey || event.metaKey : true
        const shiftMatches = shortcut.shift ? event.shiftKey : !event.shiftKey
        const altMatches = shortcut.alt ? event.altKey : !event.altKey
        const metaMatches = shortcut.meta ? event.metaKey : true

        if (keyMatches && ctrlMatches && shiftMatches && altMatches && metaMatches) {
          event.preventDefault()
          shortcut.action()
          return
        }
      }
    },
    [shortcuts, enabled]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])
}

export const defaultShortcuts = {
  playPause: { key: " ", description: "play/pause" },
  playPauseAlt: { key: "k", description: "play/pause" },
  mute: { key: "m", description: "mute/unmute" },
  fullscreen: { key: "f", description: "toggle fullscreen" },
  seekBack: { key: "j", description: "seek back 10s" },
  seekForward: { key: "l", description: "seek forward 10s" },
  seekBackShort: { key: "ArrowLeft", description: "seek back 5s" },
  seekForwardShort: { key: "ArrowRight", description: "seek forward 5s" },
  volumeUp: { key: "ArrowUp", description: "volume up" },
  volumeDown: { key: "ArrowDown", description: "volume down" },
  nextLesson: { key: "n", description: "next lesson" },
  prevLesson: { key: "p", description: "prev lesson" },
  speedUp: { key: ">", shift: true, description: "increase speed" },
  speedDown: { key: "<", shift: true, description: "decrease speed" },
  search: { key: "k", ctrl: true, description: "search" },
  toggleNotes: { key: "o", ctrl: true, description: "toggle notes panel" },
}
