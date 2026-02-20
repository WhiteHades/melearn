"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useThemeStore } from "@/lib/stores/theme-store"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

const themes = [
  { value: "light", label: "light" },
  { value: "dark", label: "dark" },
  { value: "system", label: "system" },
] as const

const colorThemes = [
  { value: "yellow", label: "yellow (default)", color: "#ffdb33" },
  { value: "purple", label: "purple", color: "#5F4FE6" },
  { value: "lime", label: "lime", color: "#AAFC3D" },
  { value: "red", label: "red", color: "#EA435F" },
  { value: "lavender", label: "lavender", color: "#C4A1FF" },
  { value: "orange", label: "orange", color: "#F07200" },
  { value: "green", label: "green", color: "#599D77" },
] as const

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const setColor = useThemeStore(
    (state: ReturnType<typeof useThemeStore.getState>) => state.setColor
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          mode
        </DropdownMenuLabel>
        {themes.map((t) => (
          <DropdownMenuItem key={t.value} onClick={() => setTheme(t.value)}>
            {t.label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          color theme
        </DropdownMenuLabel>
        {colorThemes.map((t) => (
          <DropdownMenuItem key={t.value} onClick={() => setColor(t.value)}>
             <div className="mr-2 h-3 w-3 rounded-full border border-border" style={{ backgroundColor: t.color }} />
            {t.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
