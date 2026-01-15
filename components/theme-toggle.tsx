"use client"

import * as React from "react"
import { Moon, Sun, Palette } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
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
  { value: "catppuccin-mocha", label: "catppuccin mocha" },
  { value: "gruvbox-dark", label: "gruvbox dark" },
  { value: "tokyo-night", label: "tokyo night" },
  { value: "nord", label: "nord" },
  { value: "dracula", label: "dracula" },
  { value: "one-dark", label: "one dark" },
  { value: "rose-pine", label: "rosé pine" },
] as const

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

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
          <DropdownMenuItem key={t.value} onClick={() => setTheme(t.value)}>
            {t.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
