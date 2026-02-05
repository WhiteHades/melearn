"use client"

import * as React from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/retroui/Command"
import { trpc } from "@/lib/trpc/client"
import type { Course, Lesson, Section } from "@/types"
import { BookOpen, Search, Video } from "lucide-react"

interface CommandPaletteProps {
  onSelectCourse: (course: Course) => void
  onSelectLesson?: (lesson: Lesson, course: Course) => void
}

export function CommandPalette({ onSelectCourse, onSelectLesson }: CommandPaletteProps) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const deferredQuery = React.useDeferredValue(query)

  const { data: courses = [] } = trpc.courses.list.useQuery()
  const { data: results = [] } = trpc.search.useQuery(
    { query: deferredQuery, limit: 20 },
    { enabled: deferredQuery.trim().length > 0 }
  )

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((currentOpen) => !currentOpen)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const courseResults = results.filter((result) => result.type === "course")
  const lessonResults = results.filter((result) => result.type === "lesson")

  const handleSelectCourse = (courseId: string) => {
    const course = courses.find((candidate: Course) => candidate.id === courseId)
    if (course) {
      onSelectCourse(course)
      setOpen(false)
      setQuery("")
    }
  }

  const handleSelectLesson = (lessonId: string, courseId?: string) => {
    if (!courseId) return
    const course = courses.find((candidate: Course) => candidate.id === courseId)
    const lesson = course?.sections
      .flatMap((section: Section) => section.lessons)
      .find((candidate: Lesson) => candidate.id === lessonId)

    if (course && lesson && onSelectLesson) {
      onSelectLesson(lesson, course)
      setOpen(false)
      setQuery("")
      return
    }

    if (course) {
      onSelectCourse(course)
      setOpen(false)
      setQuery("")
    }
  }

  return (
    <>
      <p className="fixed bottom-4 right-4 text-sm text-muted-foreground hidden lg:block">
        Press{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border-2 border-black bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <span className="text-xs">⌘</span>K
        </kbd>
      </p>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="type a command or search..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList className="font-sans border-t-2 border-black">
          <CommandEmpty>No results found.</CommandEmpty>

          {deferredQuery.trim().length === 0 ? (
            <CommandGroup heading="suggestions">
              <CommandItem onSelect={() => setQuery("courses")}
              >
                <Search className="mr-2 h-4 w-4" />
                <span>search courses</span>
              </CommandItem>
              <CommandItem onSelect={() => setQuery("lessons")}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                <span>browse library</span>
              </CommandItem>
            </CommandGroup>
          ) : (
            <>
              {courseResults.length > 0 && (
                <CommandGroup heading="courses">
                  {courseResults.map((result) => (
                    <CommandItem
                      key={result.id}
                      onSelect={() => handleSelectCourse(result.id)}
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      <span>{result.name}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {courseResults.length > 0 && lessonResults.length > 0 && <CommandSeparator />}

              {lessonResults.length > 0 && (
                <CommandGroup heading="lessons">
                  {lessonResults.map((result) => (
                    <CommandItem
                      key={result.id}
                      onSelect={() => handleSelectLesson(result.id, result.courseId)}
                    >
                      <Video className="mr-2 h-4 w-4" />
                      <span>{result.name}</span>
                      {result.courseName && (
                        <span className="ml-auto text-xs text-muted-foreground">
                          {result.courseName}
                        </span>
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
