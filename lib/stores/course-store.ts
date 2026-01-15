import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Course, Lesson, Note, Bookmark, Settings, ScanResult } from "@/types"

interface CourseState {
  courses: Course[]
  currentCourse: Course | null
  currentLesson: Lesson | null
  notes: Note[]
  bookmarks: Bookmark[]
  settings: Settings
  isScanning: boolean
  scanResult: ScanResult | null
  libraryPath: string | null
}

interface CourseActions {
  setCourses: (courses: Course[]) => void
  setCurrentCourse: (course: Course | null) => void
  setCurrentLesson: (lesson: Lesson | null) => void
  addNote: (note: Note) => void
  updateNote: (id: string, text: string) => void
  deleteNote: (id: string) => void
  addBookmark: (bookmark: Bookmark) => void
  deleteBookmark: (id: string) => void
  updateLessonProgress: (lessonId: string, watchedTime: number, lastPosition: number) => void
  markLessonComplete: (lessonId: string, completed: boolean) => void
  updateSettings: (settings: Partial<Settings>) => void
  setIsScanning: (isScanning: boolean) => void
  setScanResult: (result: ScanResult | null) => void
  setLibraryPath: (path: string | null) => void
  reset: () => void
}

type CourseStore = CourseState & CourseActions

const defaultSettings: Settings = {
  libraryPaths: [],
  theme: "system",
  playbackSpeed: 1,
  volume: 1,
  autoplay: true,
  skipIntro: false,
}

const initialState: CourseState = {
  courses: [],
  currentCourse: null,
  currentLesson: null,
  notes: [],
  bookmarks: [],
  settings: defaultSettings,
  isScanning: false,
  scanResult: null,
  libraryPath: null,
}

export const useCourseStore = create<CourseStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setCourses: (courses) => set({ courses }),

      setCurrentCourse: (course) => set({ currentCourse: course }),

      setCurrentLesson: (lesson) => set({ currentLesson: lesson }),

      addNote: (note) =>
        set((state) => ({
          notes: [...state.notes, note],
        })),

      updateNote: (id, text) =>
        set((state) => ({
          notes: state.notes.map((n) => (n.id === id ? { ...n, text } : n)),
        })),

      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((n) => n.id !== id),
        })),

      addBookmark: (bookmark) =>
        set((state) => ({
          bookmarks: [...state.bookmarks, bookmark],
        })),

      deleteBookmark: (id) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.id !== id),
        })),

      updateLessonProgress: (lessonId, watchedTime, lastPosition) =>
        set((state) => {
          const updatedCourses = state.courses.map((course) => ({
            ...course,
            sections: course.sections.map((section) => ({
              ...section,
              lessons: section.lessons.map((lesson) =>
                lesson.id === lessonId
                  ? { ...lesson, watchedTime, lastPosition }
                  : lesson
              ),
            })),
          }))
          return { courses: updatedCourses }
        }),

      markLessonComplete: (lessonId, completed) =>
        set((state) => {
          const updatedCourses = state.courses.map((course) => ({
            ...course,
            sections: course.sections.map((section) => ({
              ...section,
              lessons: section.lessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, completed } : lesson
              ),
            })),
          }))
          return { courses: updatedCourses }
        }),

      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),

      setIsScanning: (isScanning) => set({ isScanning }),

      setScanResult: (scanResult) => set({ scanResult }),

      setLibraryPath: (libraryPath) => set({ libraryPath }),

      reset: () => set(initialState),
    }),
    {
      name: "melearn-storage",
      partialize: (state) => ({
        settings: state.settings,
        libraryPath: state.libraryPath,
      }),
    }
  )
)
