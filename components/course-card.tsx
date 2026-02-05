import { Card } from "@/components/retroui/Card"
import { Badge } from "@/components/retroui/Badge"
import { cn, formatDuration } from "@/lib/utils"
import type { Course } from "@/types"
import { formatDistanceToNow } from "date-fns"
import { BookOpen, Clock, PlayCircle } from "lucide-react"

type CourseCardLayout = "grid" | "list"

interface CourseCardProps {
  course: Course
  onClick: () => void
  layout?: CourseCardLayout
}

export function CourseCard({ course, onClick, layout = "grid" }: CourseCardProps) {
  const totalLessons = course.sections.reduce((sum, s) => sum + s.lessons.length, 0)
  const completedLessons = course.sections.reduce(
    (sum, s) => sum + s.lessons.filter((l) => l.completed).length,
    0
  )
  const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
  const lastAccessedLabel = course.lastAccessed
    ? formatDistanceToNow(new Date(course.lastAccessed), { addSuffix: true })
    : "never opened"

  const progressBadge = (
    <Badge
      variant="outline"
      className="font-mono bg-secondary font-bold text-foreground border-2 border-black"
    >
      {progress}%
    </Badge>
  )

  const progressBar = (
    <div className="h-3 w-full border-2 border-black bg-muted rounded-full overflow-hidden relative">
      <div
        className="h-full bg-primary transition-all duration-300 ease-in-out border-r-2 border-black"
        style={{ width: `${progress}%` }}
      />
    </div>
  )

  if (layout === "list") {
    return (
      <Card
        className={cn(
          "cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 bg-card border-2 border-border shadow-md overflow-hidden",
          "p-0"
        )}
        onClick={onClick}
      >
        <div className="h-2 w-full bg-primary border-b-2 border-black" />
        <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center">
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <h3 className="line-clamp-2 text-base font-head font-bold">
                {course.name}
              </h3>
              {progressBadge}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground font-sans">
              <div className="flex items-center gap-1">
                <BookOpen className="size-4" />
                <span>{course.sections.length} sections</span>
              </div>
              <div className="flex items-center gap-1">
                <PlayCircle className="size-4" />
                <span>{totalLessons} lessons</span>
              </div>
              {course.totalDuration > 0 && (
                <div className="flex items-center gap-1">
                  <Clock className="size-4" />
                  <span>{formatDuration(course.totalDuration)}</span>
                </div>
              )}
            </div>
            <div className="mt-2 text-xs text-muted-foreground font-sans">
              last opened {lastAccessedLabel}
            </div>
          </div>
          <div className="w-full md:w-64 space-y-2">
            {progressBar}
            <div className="text-xs text-muted-foreground font-sans">
              {completedLessons} / {totalLessons} lessons completed
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 bg-card border-2 border-border shadow-md overflow-hidden",
        "flex h-full min-h-[260px] flex-col"
      )}
      onClick={onClick}
    >
      <div className="h-2 w-full bg-primary border-b-2 border-black" />
      <Card.Header className="pb-2 min-h-[72px]">
        <Card.Title className="line-clamp-2 text-base font-head font-bold">
          {course.name}
        </Card.Title>
      </Card.Header>
      <Card.Content className="pb-2 flex-1">
        <div className="flex items-center gap-4 text-sm text-muted-foreground font-sans">
          <div className="flex items-center gap-1">
            <BookOpen className="size-4" />
            <span>{course.sections.length} sections</span>
          </div>
          <div className="flex items-center gap-1">
            <PlayCircle className="size-4" />
            <span>{totalLessons} lessons</span>
          </div>
        </div>
        {course.totalDuration > 0 && (
          <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground font-sans">
            <Clock className="size-4" />
            <span>{formatDuration(course.totalDuration)}</span>
          </div>
        )}
        <div className="mt-2 text-xs text-muted-foreground font-sans">
          last opened {lastAccessedLabel}
        </div>
      </Card.Content>
      <Card.Footer className="flex-col items-start gap-2 pt-2 border-t-2 border-border/10">
        <div className="flex w-full items-center justify-between text-sm">
          <span className="text-muted-foreground font-bold">progress</span>
          {progressBadge}
        </div>
        {progressBar}
        <div className="text-xs text-muted-foreground font-sans">
          {completedLessons} / {totalLessons} lessons completed
        </div>
      </Card.Footer>
    </Card>
  )
}
