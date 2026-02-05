"use client"

import { useThemeStore } from "@/lib/stores/theme-store"
import { useEffect } from "react"

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const color = useThemeStore(
    (state: ReturnType<typeof useThemeStore.getState>) => state.color
  )

  useEffect(() => {
    // Remove all existing theme classes from html element (where next-themes adds dark class)
    const themeClasses = ["theme-yellow", "theme-purple", "theme-lime", "theme-red", "theme-lavender", "theme-orange", "theme-green"]
    document.documentElement.classList.remove(...themeClasses)
    
    // Add theme class to html element so it works with dark mode selector
    if (color) {
      document.documentElement.classList.add(`theme-${color}`)
    }
  }, [color])

  return <>{children}</>
}
