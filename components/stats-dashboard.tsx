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
import { Card } from "@/components/retroui/Card"
import { Badge } from "@/components/retroui/Badge"
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

const COLORS = ["#ffdb33", "#000000"]

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
        cell: ({ row }) => <span className="font-bold">{row.original.name}</span>,
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
      <div className="flex h-full flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-head font-bold">no stats yet</h2>
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
        <Card className="border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] overflow-hidden">
          <div className="h-2 w-full bg-primary border-b-2 border-black" />
          <Card.Header>
            <Card.Title className="text-sm font-bold">courses</Card.Title>
          </Card.Header>
          <Card.Content>
            <p className="text-3xl font-head font-black">{courses.length}</p>
          </Card.Content>
        </Card>
        <Card className="border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] overflow-hidden">
          <div className="h-2 w-full bg-primary border-b-2 border-black" />
          <Card.Header>
            <Card.Title className="text-sm font-bold">lessons</Card.Title>
          </Card.Header>
          <Card.Content>
            <p className="text-3xl font-head font-black">{stats.totalLessons}</p>
          </Card.Content>
        </Card>
        <Card className="border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] overflow-hidden">
          <div className="h-2 w-full bg-primary border-b-2 border-black" />
          <Card.Header>
            <Card.Title className="text-sm font-bold">completed</Card.Title>
          </Card.Header>
          <Card.Content>
            <p className="text-3xl font-head font-black">{stats.completedLessons}</p>
          </Card.Content>
        </Card>
        <Card className="border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] overflow-hidden">
          <div className="h-2 w-full bg-primary border-b-2 border-black" />
          <Card.Header>
            <Card.Title className="text-sm font-bold">avg progress</Card.Title>
          </Card.Header>
          <Card.Content>
            <p className="text-3xl font-head font-black">{stats.averageProgress}%</p>
          </Card.Content>
        </Card>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] overflow-hidden">
          <div className="h-2 w-full bg-primary border-b-2 border-black" />
          <Card.Header>
            <Card.Title className="text-sm font-bold">course progress</Card.Title>
          </Card.Header>
          <Card.Content className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" stroke="#000" opacity={0.2} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-15} height={50} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="progress" fill="#ffdb33" stroke="#000" strokeWidth={1} />
              </BarChart>
            </ResponsiveContainer>
          </Card.Content>
        </Card>

        <Card className="border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] overflow-hidden">
          <div className="h-2 w-full bg-primary border-b-2 border-black" />
          <Card.Header>
            <Card.Title className="text-sm font-bold">completion split</Card.Title>
          </Card.Header>
          <Card.Content className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={completionData} dataKey="value" outerRadius={90} innerRadius={55} paddingAngle={2}>
                  {completionData.map((entry, index) => (
                    <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} stroke="#000" />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card.Content>
        </Card>
      </div>

      <Card className="border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] overflow-hidden">
        <div className="h-2 w-full bg-primary border-b-2 border-black" />
        <Card.Header>
          <Card.Title className="text-sm font-bold">course table</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="overflow-x-auto">
            <table className="w-full border-2 border-black text-sm">
              <thead className="bg-muted">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="border-b-2 border-black">
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="px-3 py-2 text-left font-bold">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-b border-black/20">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-3 py-2">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Content>
      </Card>
    </div>
  )
}
