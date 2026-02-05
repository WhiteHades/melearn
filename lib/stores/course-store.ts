import { create, type StoreApi } from "zustand"
import { persist } from "zustand/middleware"
import type { Course, Lesson, Note, Bookmark, Settings, Section } from "@/types"
import type { ScanResult } from "@/lib/tauri"

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

type CourseStoreSet = StoreApi<CourseStore>["setState"]
type CourseStoreGet = StoreApi<CourseStore>["getState"]

const createCourseStore = (set: CourseStoreSet, _get: CourseStoreGet): CourseStore => ({
  ...initialState,

  setCourses: (courses: Course[]) => set({ courses }),

  setCurrentCourse: (course: Course | null) => set({ currentCourse: course }),

  setCurrentLesson: (lesson: Lesson | null) => set({ currentLesson: lesson }),

  addNote: (note: Note) =>
    set((state: CourseStore) => ({
      notes: [...state.notes, note],
    })),

  updateNote: (id: string, text: string) =>
    set((state: CourseStore) => ({
      notes: state.notes.map((n: Note) => (n.id === id ? { ...n, text } : n)),
    })),

  deleteNote: (id: string) =>
    set((state: CourseStore) => ({
      notes: state.notes.filter((n: Note) => n.id !== id),
    })),

  addBookmark: (bookmark: Bookmark) =>
    set((state: CourseStore) => ({
      bookmarks: [...state.bookmarks, bookmark],
    })),

  deleteBookmark: (id: string) =>
    set((state: CourseStore) => ({
      bookmarks: state.bookmarks.filter((b: Bookmark) => b.id !== id),
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

  updateSettings: (newSettings: Partial<Settings>) =>
    set((state: CourseStore) => ({
      settings: { ...state.settings, ...newSettings },
    })),

  setIsScanning: (isScanning: boolean) => set({ isScanning }),

  setScanResult: (scanResult: ScanResult | null) => set({ scanResult }),

  setLibraryPath: (libraryPath: string | null) => set({ libraryPath }),

  reset: () => set(initialState),
})

export const useCourseStore = create<CourseStore>()(
  persist(createCourseStore, {
    name: "melearn-storage",
    partialize: (state: CourseStore) => ({
      settings: state.settings,
      libraryPath: state.libraryPath,
    }),
  })
)
