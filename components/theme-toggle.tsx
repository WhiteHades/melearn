"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative rounded-full border-border/80 bg-card/80 shadow-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.96]"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <Sun
        className={`absolute size-4 transition-[transform,opacity,filter] duration-200 ${
          isDark ? "scale-75 opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-0"
        }`}
      />
      <Moon
        className={`absolute size-4 transition-[transform,opacity,filter] duration-200 ${
          isDark ? "scale-100 opacity-100 blur-0" : "scale-75 opacity-0 blur-[4px]"
        }`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
