import { initTRPC } from "@trpc/server"
import { z } from "zod"
import { nanoid } from "nanoid"
import type { Course, Note } from "@/types"
import { useCourseStore } from "@/lib/stores/course-store"
import { processScanResult } from "@/lib/course-utils"
import { indexCourses, search as searchIndex } from "@/lib/search"
import { scanFolder, isTauri } from "@/lib/tauri"
import {
  saveNote,
  deleteNote as removeNote,
  updateLessonProgress as persistLessonProgress,
} from "@/lib/database"

const t = initTRPC.create({
  allowOutsideOfServer: true,
})

const getStore = () => useCourseStore.getState()

const courseIdSchema = z.string().min(1)
const lessonIdSchema = z.string().min(1)

export const appRouter = t.router({
  courses: t.router({
    list: t.procedure.query(() => getStore().courses),
    byId: t.procedure.input(courseIdSchema).query(({ input }) => {
      return getStore().courses.find((course: Course) => course.id === input) ?? null
    }),
    markAccessed: t.procedure
      .input(z.object({ courseId: courseIdSchema }))
      .mutation(({ input }) => {
        const { courses, setCourses, setCurrentCourse } = getStore()
        const updated = courses.map((course: Course) =>
          course.id === input.courseId
            ? { ...course, lastAccessed: new Date().toISOString() }
            : course
        )
        const current = updated.find((course: Course) => course.id === input.courseId) ?? null
        setCourses(updated)
        setCurrentCourse(current)
        return current
      }),
  }),
  library: t.router({
    scan: t.procedure
      .input(z.object({ path: z.string().min(1) }))
      .mutation(async ({ input }) => {
        const result = await scanFolder(input.path)
        const courses = processScanResult(result)
        const store = getStore()
        store.setCourses(courses)
        store.setLibraryPath(input.path)
        store.setScanResult(result)
        indexCourses(courses)
        return { courses, warnings: result.warnings }
      }),
  }),
  lessons: t.router({
    updateProgress: t.procedure
      .input(
        z.object({
          lessonId: lessonIdSchema,
          watchedTime: z.number().min(0),
          lastPosition: z.number().min(0),
          completed: z.boolean(),
        })
      )
      .mutation(async ({ input }) => {
        const store = getStore()
        store.updateLessonProgress(input.lessonId, input.watchedTime, input.lastPosition)
        store.markLessonComplete(input.lessonId, input.completed)

        if (isTauri()) {
          await persistLessonProgress(
            input.lessonId,
            input.watchedTime,
            input.lastPosition,
            input.completed
          )
        }

        return true
      }),
  }),
  notes: t.router({
    list: t.procedure
      .input(z.object({ lessonId: lessonIdSchema }))
      .query(({ input }) => {
        return getStore().notes.filter((note: Note) => note.lessonId === input.lessonId)
      }),
    add: t.procedure
      .input(
        z.object({
          lessonId: lessonIdSchema,
          text: z.string().trim().min(1).max(2000),
          timestamp: z.number().min(0),
        })
      )
      .mutation(async ({ input }) => {
        const note = {
          id: nanoid(12),
          lessonId: input.lessonId,
          timestamp: input.timestamp,
          text: input.text,
          createdAt: new Date().toISOString(),
        }

        getStore().addNote(note)

        if (isTauri()) {
          await saveNote(note)
        }

        return note
      }),
    remove: t.procedure
      .input(z.object({ noteId: z.string().min(1) }))
      .mutation(async ({ input }) => {
        getStore().deleteNote(input.noteId)
        if (isTauri()) {
          await removeNote(input.noteId)
        }
        return true
      }),
  }),
  search: t.procedure
    .input(
      z.object({
        query: z.string().trim().min(1),
        limit: z.number().min(1).max(50).optional(),
      })
    )
    .query(({ input }) => searchIndex(input.query, input.limit ?? 20)),
})

export type AppRouter = typeof appRouter
