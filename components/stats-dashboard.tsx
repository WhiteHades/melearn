"use client"

import { useMemo } from "react"
import { motion } from "motion/react"
import { flexRender, useReactTable, getCoreRowModel, type ColumnDef } from "@tanstack/react-table"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatDuration } from "@/lib/utils"
import { trpc } from "@/lib/trpc/client"
import { calculateCourseProgress } from "@/lib/course-utils"
import type { Course, Lesson, Section } from "@/types"

type CourseRow = {
  id: string
  name: string
  sections: number
  lessons: number
  progress: number
  duration: string
}

const CHART_COLORS = ["var(--primary)", "var(--muted)"]

export function StatsDashboard() {
  const { data: courses = [] } = trpc.courses.list.useQuery()

  const stats = useMemo(() => {
    const totalLessons = courses.reduce(
      (sum: number, course: Course) =>
        sum +
        course.sections.reduce(
          (acc: number, section: Section) => acc + section.lessons.length,
          0
        ),
      0
    )
    const completedLessons = courses.reduce(
      (sum: number, course: Course) =>
        sum +
        course.sections.reduce(
          (acc: number, section: Section) =>
            acc + section.lessons.filter((lesson: Lesson) => lesson.completed).length,
          0
        ),
      0
    )
    const totalDuration = courses.reduce(
      (sum: number, course: Course) => sum + course.totalDuration,
      0
    )
    const averageProgress =
      courses.length > 0
        ? Math.round(
            courses.reduce(
              (sum: number, course: Course) => sum + calculateCourseProgress(course),
              0
            ) / courses.length
          )
        : 0

    return {
      totalLessons,
      completedLessons,
      totalDuration,
      averageProgress,
    }
  }, [courses])

  const chartData = useMemo(() => {
    return courses.map((course: Course) => ({
      name: course.name.length > 18 ? `${course.name.slice(0, 18)}...` : course.name,
      progress: calculateCourseProgress(course),
      lessons: course.sections.reduce(
        (sum: number, section: Section) => sum + section.lessons.length,
        0
      ),
    }))
  }, [courses])

  const completionData = useMemo(() => {
    return [
      { name: "completed", value: stats.completedLessons },
      { name: "remaining", value: Math.max(stats.totalLessons - stats.completedLessons, 0) },
    ]
  }, [stats.completedLessons, stats.totalLessons])

  const tableData = useMemo<CourseRow[]>(() => {
    return courses.map((course: Course) => ({
      id: course.id,
      name: course.name,
      sections: course.sections.length,
      lessons: course.sections.reduce(
        (sum: number, section: Section) => sum + section.lessons.length,
        0
      ),
      progress: calculateCourseProgress(course),
      duration: formatDuration(course.totalDuration),
    }))
  }, [courses])

  const columns = useMemo<ColumnDef<CourseRow>[]>(
    () => [
      {
        header: "course",
        accessorKey: "name",
        cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
      },
      { header: "sections", accessorKey: "sections" },
      { header: "lessons", accessorKey: "lessons" },
      {
        header: "progress",
        accessorKey: "progress",
        cell: ({ row }) => (
          <Badge variant="outline" className="font-mono">
            {row.original.progress}%
          </Badge>
        ),
      },
      { header: "duration", accessorKey: "duration" },
    ],
    []
  )

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (courses.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center space-y-4 rounded-2xl border border-dashed border-border bg-card/60 p-10">
        <h2 className="text-2xl font-head">no stats yet</h2>
        <p className="text-muted-foreground font-sans">
          add a course to unlock analytics.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <motion.div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">courses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-head">{courses.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">lessons</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-head">{stats.totalLessons}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-head">{stats.completedLessons}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">avg progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-head">{stats.averageProgress}%</p>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">course progress</CardTitle>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.4} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-15} height={50} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ borderRadius: 8 }} />
                <Bar dataKey="progress" fill="var(--primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">completion split</CardTitle>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={completionData} dataKey="value" outerRadius={90} innerRadius={55} paddingAngle={2}>
                  {completionData.map((entry, index) => (
                    <Cell key={`cell-${entry.name}`} fill={CHART_COLORS[index % CHART_COLORS.length]} stroke="var(--border)" />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">course table</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
