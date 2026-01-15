"use client"

import { useEffect, useState, useCallback } from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { search, type SearchResult } from "@/lib/search"
import { useCourseStore } from "@/lib/stores/course-store"
import type { Course, Lesson } from "@/types"
import { BookOpen, PlayCircle } from "lucide-react"

interface CommandPaletteProps {
  onSelectCourse: (course: Course) => void
  onSelectLesson: (lesson: Lesson, course: Course) => void
}

export function CommandPalette({ onSelectCourse, onSelectLesson }: CommandPaletteProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const { courses } = useCourseStore()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  useEffect(() => {
    if (query.trim()) {
      const searchResults = search(query, 10)
      setResults(searchResults)
    } else {
      setResults([])
    }
  }, [query])

  const handleSelect = useCallback(
    (result: SearchResult) => {
      setOpen(false)
      setQuery("")

      if (result.type === "course") {
        const course = courses.find((c) => c.id === result.id)
        if (course) onSelectCourse(course)
      } else {
        for (const course of courses) {
          for (const section of course.sections) {
            const lesson = section.lessons.find((l) => l.id === result.id)
            if (lesson) {
              onSelectLesson(lesson, course)
              return
            }
          }
        }
      }
    },
    [courses, onSelectCourse, onSelectLesson]
  )

  const courseResults = results.filter((r) => r.type === "course")
  const lessonResults = results.filter((r) => r.type === "lesson")

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="search courses and lessons..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>no results found.</CommandEmpty>

        {courseResults.length > 0 && (
          <CommandGroup heading="courses">
            {courseResults.map((result) => (
              <CommandItem
                key={result.id}
                value={result.id}
                onSelect={() => handleSelect(result)}
              >
                <BookOpen className="mr-2 size-4" />
                <span>{result.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {lessonResults.length > 0 && (
          <CommandGroup heading="lessons">
            {lessonResults.map((result) => (
              <CommandItem
                key={result.id}
                value={result.id}
                onSelect={() => handleSelect(result)}
              >
                <PlayCircle className="mr-2 size-4" />
                <div className="flex flex-col">
                  <span>{result.name}</span>
                  {result.courseName && (
                    <span className="text-xs text-muted-foreground">
                      {result.courseName} • {result.sectionName}
                    </span>
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  )
}
