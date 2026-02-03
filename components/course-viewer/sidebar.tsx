"use client"

import { Accordion } from "@/components/retroui/Accordion"
import { Badge } from "@/components/retroui/Badge"
import { Button } from "@/components/retroui/Button"
import { ScrollArea } from "@/components/retroui/ScrollArea"
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
        "flex h-full min-h-0 min-w-0 flex-col bg-sidebar overflow-hidden w-full",
        className
      )}
    >
      <div className="flex flex-col border-b-2 border-border bg-primary text-primary-foreground shrink-0">
        <div className="p-4 pb-2">
             <Button variant="ghost" size="sm" onClick={onBack} className="text-primary-foreground hover:bg-white/20 border-2 border-transparent hover:border-black shadow-none px-2 h-8">
               <ChevronLeft className="mr-1 h-4 w-4" /> Back
             </Button>
        </div>
        <div className="px-4 pb-4">
           <h2 className="font-head text-base font-bold leading-tight line-clamp-2">{course.name}</h2>
        </div>
      </div>
      <ScrollArea className="flex-1 min-h-0 min-w-0 bg-background">
        <div className="p-4 w-full min-w-0">
        <Accordion type="single" collapsible className="w-full space-y-2 min-w-0">
          {course.sections.map((section: Section, index: number) => (
            <Accordion.Item key={section.id} value={section.id} className="bg-card w-full">
              <Accordion.Header className="font-bold text-sm">
                <div className="flex items-center min-w-0 pr-2 text-left">
                  <span className="mr-2 text-muted-foreground shrink-0">#{index + 1}</span>
                  <span className="truncate min-w-0">{section.name}</span>
                </div>
              </Accordion.Header>
              <Accordion.Content className="pt-0 pb-2">
                <div className="flex flex-col gap-1">
                  {section.lessons.map((lesson: Lesson) => {
                    const isActive = currentLessonId === lesson.id
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => onSelectLesson?.(lesson)}
                        className={cn(
                          "flex w-full min-w-0 items-center justify-between rounded px-4 py-2 text-left text-sm transition-colors border-2 border-transparent",
                          isActive 
                            ? "bg-primary/20 border-primary font-bold" 
                            : "hover:bg-muted/50 hover:underline"
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
                        <Badge
                          variant="outline"
                          className="text-[10px] h-5 bg-secondary text-secondary-foreground border-2 border-black ml-2 shrink-0"
                        >
                          {formatDuration(lesson.duration)}
                        </Badge>
                      </button>
                    )
                  })}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion>
        </div>
      </ScrollArea>
    </div>
  )
}
