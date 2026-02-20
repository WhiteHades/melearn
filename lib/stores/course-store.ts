import { create, type StoreApi } from "zustand"
import { persist } from "zustand/middleware"
import type { Course, Lesson, Note, Section } from "@/types"

interface CourseState {
  courses: Course[]
  notes: Note[]
  isScanning: boolean
  libraryPath: string | null
}

interface CourseActions {
  setCourses: (courses: Course[]) => void
  addNote: (note: Note) => void
  deleteNote: (id: string) => void
  updateLessonProgress: (lessonId: string, watchedTime: number, lastPosition: number) => void
  markLessonComplete: (lessonId: string, completed: boolean) => void
  setIsScanning: (isScanning: boolean) => void
  setLibraryPath: (path: string | null) => void
}

type CourseStore = CourseState & CourseActions

const initialState: CourseState = {
  courses: [],
  notes: [],
  isScanning: false,
  libraryPath: null,
}

type CourseStoreSet = StoreApi<CourseStore>["setState"]
type CourseStoreGet = StoreApi<CourseStore>["getState"]

const createCourseStore = (set: CourseStoreSet, _get: CourseStoreGet): CourseStore => ({
  ...initialState,

  setCourses: (courses: Course[]) => set({ courses }),

  addNote: (note: Note) =>
    set((state: CourseStore) => ({
      notes: [...state.notes, note],
    })),

  deleteNote: (id: string) =>
    set((state: CourseStore) => ({
      notes: state.notes.filter((n: Note) => n.id !== id),
    })),

  updateLessonProgress: (lessonId: string, watchedTime: number, lastPosition: number) =>
    set((state: CourseStore) => {
      const updatedCourses = state.courses.map((course: Course) => ({
        ...course,
        sections: course.sections.map((section: Section) => ({
          ...section,
          lessons: section.lessons.map((lesson: Lesson) =>
            lesson.id === lessonId
              ? { ...lesson, watchedTime, lastPosition }
              : lesson
          ),
        })),
      }))
      return { courses: updatedCourses }
    }),

  markLessonComplete: (lessonId: string, completed: boolean) =>
    set((state: CourseStore) => {
      const updatedCourses = state.courses.map((course: Course) => ({
        ...course,
        sections: course.sections.map((section: Section) => ({
          ...section,
          lessons: section.lessons.map((lesson: Lesson) =>
            lesson.id === lessonId ? { ...lesson, completed } : lesson
          ),
        })),
      }))
      return { courses: updatedCourses }
    }),

  setIsScanning: (isScanning: boolean) => set({ isScanning }),

  setLibraryPath: (libraryPath: string | null) => set({ libraryPath }),
})

export const useCourseStore = create<CourseStore>()(
  persist(createCourseStore, {
    name: "melearn-storage",
    partialize: (state: CourseStore) => ({
      libraryPath: state.libraryPath,
    }),
  })
)
