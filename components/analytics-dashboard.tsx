"use client"

import { useCourseStore } from "@/lib/stores/course-store"
import { formatDuration } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Clock, BookOpen, PlayCircle, CheckCircle, TrendingUp } from "lucide-react"

export function AnalyticsDashboard() {
  const { courses } = useCourseStore()

  const allLessons = courses.flatMap((c) =>
    c.sections.flatMap((s) => s.lessons)
  )

  const totalCourses = courses.length
  const totalLessons = allLessons.length
  const completedLessons = allLessons.filter((l) => l.completed).length
  const totalWatchTime = allLessons.reduce((sum, l) => sum + (l.lastPosition || 0), 0)
  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

  const recentlyWatched = [...allLessons]
    .filter((l) => l.lastPosition > 0)
    .sort((a, b) => b.lastPosition - a.lastPosition)
    .slice(0, 5)

  const courseProgress = courses.map((c) => {
    const total = c.sections.reduce((s, sec) => s + sec.lessons.length, 0)
    const completed = c.sections.reduce(
      (s, sec) => s + sec.lessons.filter((l) => l.completed).length,
      0
    )
    return {
      name: c.name,
      total,
      completed,
      progress: total > 0 ? Math.round((completed / total) * 100) : 0,
    }
  })

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">total courses</CardTitle>
            <BookOpen className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCourses}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">lessons completed</CardTitle>
            <CheckCircle className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {completedLessons} / {totalLessons}
            </div>
            <Progress value={overallProgress} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">watch time</CardTitle>
            <Clock className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatDuration(totalWatchTime)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">overall progress</CardTitle>
            <TrendingUp className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallProgress}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-base">course progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64">
              <div className="space-y-4">
                {courseProgress.map((c) => (
                  <div key={c.name}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="truncate">{c.name}</span>
                      <span className="text-muted-foreground">
                        {c.completed}/{c.total}
                      </span>
                    </div>
                    <Progress value={c.progress} className="mt-1 h-2" />
                  </div>
                ))}
                {courseProgress.length === 0 && (
                  <p className="text-center text-sm text-muted-foreground">no courses yet</p>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-base">recently watched</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64">
              <div className="space-y-3">
                {recentlyWatched.map((l) => (
                  <div key={l.id} className="flex items-center gap-3">
                    <PlayCircle className="size-4 shrink-0 text-muted-foreground" />
                    <div className="flex-1 truncate">
                      <p className="truncate text-sm">{l.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDuration(l.lastPosition)} watched
                      </p>
                    </div>
                  </div>
                ))}
                {recentlyWatched.length === 0 && (
                  <p className="text-center text-sm text-muted-foreground">no watch history</p>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
