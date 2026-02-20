"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn, formatDuration } from "@/lib/utils"
import { ChevronLeft, CheckCircle2, Circle } from "lucide-react"
import type { Course, Lesson, Section } from "@/types"

interface SidebarProps {
  className?: string
  onBack?: () => void
  course: Course | null
  currentLessonId?: string
  onSelectLesson?: (lesson: Lesson) => void
}

export function Sidebar({ className, onBack, course, currentLessonId, onSelectLesson }: SidebarProps) {
  if (!course) return null

  return (
    <div
      className={cn(
        "flex h-full min-h-0 min-w-0 flex-col bg-sidebar text-sidebar-foreground overflow-hidden w-full",
        className
      )}
    >
      <div className="flex flex-col border-b border-sidebar-border bg-sidebar shrink-0">
        <div className="p-4 pb-2">
          <Button variant="ghost" size="sm" onClick={onBack} className="h-8 px-2">
            <ChevronLeft className="mr-1 h-4 w-4" /> back
          </Button>
        </div>
        <div className="px-4 pb-4">
          <h2 className="font-head text-base leading-tight line-clamp-2">{course.name}</h2>
        </div>
      </div>
      <ScrollArea className="flex-1 min-h-0 min-w-0">
        <div className="p-4 w-full min-w-0">
          <Accordion type="single" collapsible className="w-full min-w-0">
            {course.sections.map((section: Section, index: number) => (
              <AccordionItem key={section.id} value={section.id} className="border-b-0">
                <AccordionTrigger className="text-sm">
                  <div className="flex items-center min-w-0 pr-2 text-left">
                    <span className="mr-2 text-muted-foreground shrink-0">#{index + 1}</span>
                    <span className="truncate min-w-0">{section.name}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-0">
                  <div className="flex flex-col gap-1">
                    {section.lessons.map((lesson: Lesson) => {
                      const isActive = currentLessonId === lesson.id
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => onSelectLesson?.(lesson)}
                          className={cn(
                            "flex w-full min-w-0 items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors",
                            isActive
                              ? "bg-sidebar-primary text-sidebar-primary-foreground"
                              : "hover:bg-sidebar-accent"
                          )}
                        >
                          <div className="flex items-center gap-2 overflow-hidden min-w-0 flex-1">
                            {lesson.completed ? (
                              <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                            ) : (
                              <Circle className="h-3 w-3 text-muted-foreground shrink-0" />
                            )}
                            <span className="truncate min-w-0 block">{lesson.name}</span>
                          </div>
                          <Badge variant="outline" className="text-[10px] ml-2 shrink-0 text-foreground">
                            {formatDuration(lesson.duration)}
                          </Badge>
                        </button>
                      )
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  )
}
