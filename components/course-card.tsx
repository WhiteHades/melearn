import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Course } from "@/types"
import { formatDuration } from "@/lib/utils"
import { BookOpen, Clock, PlayCircle } from "lucide-react"

interface CourseCardProps {
  course: Course
  onClick: () => void
}

export function CourseCard({ course, onClick }: CourseCardProps) {
  const totalLessons = course.sections.reduce((sum, s) => sum + s.lessons.length, 0)
  const completedLessons = course.sections.reduce(
    (sum, s) => sum + s.lessons.filter((l) => l.completed).length,
    0
  )
  const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-2 text-base">{course.name}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
          <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="size-4" />
            <span>{formatDuration(course.totalDuration)}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2">
        <div className="flex w-full items-center justify-between text-sm">
          <span className="text-muted-foreground">progress</span>
          <span className="font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="text-xs text-muted-foreground">
          {completedLessons} / {totalLessons} lessons completed
        </div>
      </CardFooter>
    </Card>
  )
}
