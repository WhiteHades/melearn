"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import type { Course, Lesson } from "@/types"
import {
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  PlayCircle,
  CheckCircle,
  FileText,
  Headphones,
  HelpCircle,
} from "lucide-react"
import { useState } from "react"

interface SidebarProps {
  course: Course
  currentLesson: Lesson | null
  onLessonSelect: (lesson: Lesson) => void
  onBack: () => void
}

function getLessonIcon(type: Lesson["type"]) {
  switch (type) {
    case "video":
      return PlayCircle
    case "audio":
      return Headphones
    case "document":
      return FileText
    case "quiz":
      return HelpCircle
    default:
      return PlayCircle
  }
}

export function Sidebar({ course, currentLesson, onLessonSelect, onBack }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(course.sections.map((s) => s.id))
  )

  const totalLessons = course.sections.reduce((sum, s) => sum + s.lessons.length, 0)
  const completedLessons = course.sections.reduce(
    (sum, s) => sum + s.lessons.filter((l) => l.completed).length,
    0
  )
  const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

  function toggleSection(sectionId: string) {
    const next = new Set(expandedSections)
    if (next.has(sectionId)) {
      next.delete(sectionId)
    } else {
      next.add(sectionId)
    }
    setExpandedSections(next)
  }

  return (
    <aside className="flex w-72 flex-col border-r bg-sidebar">
      <div className="flex items-center gap-2 border-b p-3">
        <Button variant="ghost" size="icon-sm" onClick={onBack} aria-label="back to course library">
          <ChevronLeft className="size-4" aria-hidden="true" />
        </Button>
        <div className="flex-1 truncate">
          <h2 className="truncate text-sm font-semibold">{course.name}</h2>
          <p className="text-xs text-muted-foreground">
            {completedLessons}/{totalLessons} completed
          </p>
        </div>
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">progress</span>
          <span className="font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="mt-1.5 h-1.5" />
      </div>

      <Separator />

      <ScrollArea className="flex-1">
        <div className="p-2">
          {course.sections.map((section) => {
            const sectionCompleted = section.lessons.filter((l) => l.completed).length
            const isExpanded = expandedSections.has(section.id)

            return (
              <div key={section.id} className="mb-1">
                <button
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-sidebar-accent"
                  onClick={() => toggleSection(section.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`section-${section.id}`}
                >
                  {isExpanded ? (
                    <ChevronDown className="size-4 shrink-0" aria-hidden="true" />
                  ) : (
                    <ChevronRight className="size-4 shrink-0" aria-hidden="true" />
                  )}
                  <span className="flex-1 truncate font-medium">{section.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {sectionCompleted}/{section.lessons.length}
                  </span>
                </button>

                {isExpanded && (
                  <div className="ml-4 mt-1 space-y-0.5" id={`section-${section.id}`} role="region" aria-label={section.name}>
                    {section.lessons.map((lesson) => {
                      const Icon = getLessonIcon(lesson.type)
                      const isActive = currentLesson?.id === lesson.id

                      return (
                        <button
                          key={lesson.id}
                          className={cn(
                            "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors",
                            isActive
                              ? "bg-sidebar-primary text-sidebar-primary-foreground"
                              : "hover:bg-sidebar-accent"
                          )}
                          onClick={() => onLessonSelect(lesson)}
                        >
                          {lesson.completed ? (
                            <CheckCircle className="size-4 shrink-0 text-green-500" aria-hidden="true" />
                          ) : (
                            <Icon className="size-4 shrink-0" aria-hidden="true" />
                          )}
                          <span className="flex-1 truncate">{lesson.name}</span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </ScrollArea>
    </aside>
  )
}
