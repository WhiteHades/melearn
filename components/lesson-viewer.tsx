"use client"

import { useState, useCallback, useRef } from "react"
import { Sidebar } from "@/components/sidebar"
import { VideoPlayer } from "@/components/video-player"
import { ContentViewer } from "@/components/content-viewer"
import { NotesPanel } from "@/components/notes-panel"
import { BookmarksPanel } from "@/components/bookmarks-panel"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCourseStore } from "@/lib/stores/course-store"
import { findNextLesson, findPreviousLesson } from "@/lib/course-utils"
import type { Course, Lesson } from "@/types"
import { PanelRightClose, PanelRightOpen } from "lucide-react"

interface LessonViewerProps {
  course: Course
  initialLesson?: Lesson
  onBack: () => void
}

export function LessonViewer({ course, initialLesson, onBack }: LessonViewerProps) {
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(
    initialLesson ?? course.sections[0]?.lessons[0] ?? null
  )
  const [showPanel, setShowPanel] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  const {
    notes,
    bookmarks,
    addNote,
    deleteNote,
    addBookmark,
    deleteBookmark,
    updateLessonProgress,
    markLessonComplete,
  } = useCourseStore()

  const handleProgress = useCallback(
    (time: number, duration: number) => {
      if (!currentLesson) return
      setCurrentTime(time)
      updateLessonProgress(currentLesson.id, time, time)
    },
    [currentLesson, updateLessonProgress]
  )

  const handleComplete = useCallback(() => {
    if (!currentLesson) return
    markLessonComplete(currentLesson.id, true)

    const next = findNextLesson(course, currentLesson.id)
    if (next) {
      setCurrentLesson(next)
    }
  }, [currentLesson, course, markLessonComplete])

  const handleNext = useCallback(() => {
    if (!currentLesson) return
    const next = findNextLesson(course, currentLesson.id)
    if (next) setCurrentLesson(next)
  }, [currentLesson, course])

  const handlePrevious = useCallback(() => {
    if (!currentLesson) return
    const prev = findPreviousLesson(course, currentLesson.id)
    if (prev) setCurrentLesson(prev)
  }, [currentLesson, course])

  const handleSeek = useCallback((timestamp: number) => {
    const video = document.querySelector("video")
    if (video) {
      video.currentTime = timestamp
    }
  }, [])

  if (!currentLesson) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-muted-foreground">no lessons available</p>
      </div>
    )
  }

  const nextLesson = findNextLesson(course, currentLesson.id)
  const prevLesson = findPreviousLesson(course, currentLesson.id)
  const isVideoLesson = currentLesson.type === "video"

  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar
        course={course}
        currentLesson={currentLesson}
        onLessonSelect={setCurrentLesson}
        onBack={onBack}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          {isVideoLesson ? (
            <VideoPlayer
              lesson={currentLesson}
              onProgress={handleProgress}
              onComplete={handleComplete}
              onPrevious={prevLesson ? handlePrevious : undefined}
              onNext={nextLesson ? handleNext : undefined}
              autoplay
            />
          ) : (
            <ContentViewer
              lesson={currentLesson}
              onPrevious={prevLesson ? handlePrevious : undefined}
              onNext={nextLesson ? handleNext : undefined}
            />
          )}

          <div className="border-t p-4">
            <h2 className="text-lg font-semibold">{currentLesson.name}</h2>
            <p className="text-sm text-muted-foreground">
              {course.name} • {currentLesson.sectionName}
            </p>
          </div>
        </div>
      </div>

      {showPanel && (
        <aside className="w-80 border-l">
          <Tabs defaultValue="notes" className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b px-2">
              <TabsList className="h-10">
                <TabsTrigger value="notes" className="text-xs">
                  notes
                </TabsTrigger>
                <TabsTrigger value="bookmarks" className="text-xs">
                  bookmarks
                </TabsTrigger>
              </TabsList>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setShowPanel(false)}
              >
                <PanelRightClose className="size-4" />
              </Button>
            </div>
            <TabsContent value="notes" className="m-0 flex-1">
              <NotesPanel
                lessonId={currentLesson.id}
                notes={notes}
                currentTimestamp={currentTime}
                onAddNote={addNote}
                onDeleteNote={deleteNote}
                onSeek={handleSeek}
              />
            </TabsContent>
            <TabsContent value="bookmarks" className="m-0 flex-1">
              <BookmarksPanel
                lessonId={currentLesson.id}
                bookmarks={bookmarks}
                currentTimestamp={currentTime}
                onAddBookmark={addBookmark}
                onDeleteBookmark={deleteBookmark}
                onSeek={handleSeek}
              />
            </TabsContent>
          </Tabs>
        </aside>
      )}

      {!showPanel && (
        <Button
          variant="ghost"
          size="icon-sm"
          className="absolute right-4 top-20"
          onClick={() => setShowPanel(true)}
        >
          <PanelRightOpen className="size-4" />
        </Button>
      )}
    </div>
  )
}
