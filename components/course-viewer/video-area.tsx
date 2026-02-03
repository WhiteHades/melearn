"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { readTextFile } from "@tauri-apps/plugin-fs"
import { Card } from "@/components/retroui/Card"
import { Badge } from "@/components/retroui/Badge"
import { Button } from "@/components/retroui/Button"
import { cn, formatDuration } from "@/lib/utils"
import { trpc } from "@/lib/trpc/client"
import { isTauri } from "@/lib/tauri"
import type { Lesson } from "@/types"
import { ContentViewer } from "@/components/content-viewer"
import { VideoPlayer } from "@/components/video-player"
import { CheckCircle2, Circle } from "lucide-react"

interface VideoAreaProps {
  className?: string
  lesson?: Lesson | null
  onNext?: () => void
  onPrevious?: () => void
}

type TranscriptCue = {
  id: string
  start: number
  end: number
  text: string
}

const parseTimecode = (value: string) => {
  const clean = value.replace(",", ".")
  const parts = clean.split(":")
  if (parts.length < 2) return 0
  const [hours, minutes, rest] =
    parts.length === 3 ? parts : ["0", parts[0], parts[1]]
  if (!minutes || !rest) return 0
  const [seconds, millis = "0"] = rest.split(".")
  const total =
    Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds) + Number(millis) / 1000
  return Number.isFinite(total) ? total : 0
}

const parseTranscript = (content: string): TranscriptCue[] => {
  const normalized = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n")
  const blocks = normalized
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)

  const cues: TranscriptCue[] = []

  blocks.forEach((block, index) => {
    const lines = block.split("\n").map((line) => line.trim())
    const timeLineIndex = lines.findIndex((line) => line.includes("-->"))
    if (timeLineIndex === -1) return

    const timeLine = lines[timeLineIndex]
    const [startRaw, endRaw] = timeLine.split("-->").map((part) => part.trim())
    if (!startRaw || !endRaw) return

    const start = parseTimecode(startRaw)
    const end = parseTimecode(endRaw)
    const text = lines.slice(timeLineIndex + 1).join(" ").trim()

    if (!text) return

    cues.push({
      id: `cue-${index}`,
      start,
      end,
      text,
    })
  })

  return cues
}

export function VideoArea({ className, lesson, onNext, onPrevious }: VideoAreaProps) {
  const utils = trpc.useUtils()
  const lastUpdateRef = useRef(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const transcriptRef = useRef<HTMLDivElement>(null)
  const lessonId = lesson?.id ?? ""
  const lessonDuration = lesson?.duration ?? 0
  const lessonLastPosition = lesson?.lastPosition ?? 0
  const [playhead, setPlayhead] = useState(0)
  const [isCompact, setIsCompact] = useState(false)
  const [seekTo, setSeekTo] = useState<number | null>(null)
  const [transcript, setTranscript] = useState<TranscriptCue[]>([])
  const [transcriptLabel, setTranscriptLabel] = useState<string | null>(null)
  const [transcriptError, setTranscriptError] = useState<string | null>(null)
  const updateProgress = trpc.lessons.updateProgress.useMutation({
    onSuccess: async () => {
      await utils.courses.list.invalidate()
    },
  })

  useEffect(() => {
    lastUpdateRef.current = 0
    setPlayhead(0)
    setSeekTo(null)
  }, [lessonId])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const handleScroll = () => {
      setIsCompact(container.scrollTop > 180)
    }

    handleScroll()
    container.addEventListener("scroll", handleScroll, { passive: true })
    return () => container.removeEventListener("scroll", handleScroll)
  }, [lessonId])

  useEffect(() => {
    let isActive = true

    const loadTranscript = async () => {
      setTranscript([])
      setTranscriptLabel(null)
      setTranscriptError(null)

      if (!lesson || lesson.subtitles.length === 0 || !isTauri()) return

      const preferredSubtitle =
        lesson.subtitles.find((item) => item.path.toLowerCase().endsWith(".srt")) ??
        lesson.subtitles[0]

      if (!preferredSubtitle) return

      try {
        const content = await readTextFile(preferredSubtitle.path)
        const cues = parseTranscript(content)
        if (!isActive) return
        setTranscript(cues)
        setTranscriptLabel(preferredSubtitle.label || preferredSubtitle.language)
      } catch (err) {
        if (!isActive) return
        setTranscriptError("failed to load transcript")
      }
    }

    loadTranscript()

    return () => {
      isActive = false
    }
  }, [lessonId, lesson])

  useEffect(() => {
    if (seekTo === null) return
    const timer = window.setTimeout(() => setSeekTo(null), 0)
    return () => window.clearTimeout(timer)
  }, [seekTo])

  const handleProgress = useCallback(
    (currentTime: number, duration: number) => {
      if (!lessonId) return
      setPlayhead(currentTime)
      const now = Date.now()
      const shouldUpdate = now - lastUpdateRef.current > 5000 || currentTime >= duration - 1

      if (!shouldUpdate) return
      lastUpdateRef.current = now

      updateProgress.mutate({
        lessonId,
        watchedTime: currentTime,
        lastPosition: currentTime,
        completed: duration > 0 ? currentTime >= duration - 1 : false,
      })
    },
    [lessonId, updateProgress]
  )

  const handleComplete = useCallback(() => {
    if (!lessonId) return
    const completionTime = lessonDuration > 0 ? lessonDuration : lessonLastPosition
    updateProgress.mutate({
      lessonId,
      watchedTime: completionTime,
      lastPosition: completionTime,
      completed: true,
    })
  }, [lessonDuration, lessonId, lessonLastPosition, updateProgress])

  const toggleComplete = useCallback(() => {
    if (!lesson || !lessonId) return
    const completionTime = Math.max(playhead, lesson.lastPosition)
    updateProgress.mutate({
      lessonId,
      watchedTime: completionTime,
      lastPosition: completionTime,
      completed: !lesson.completed,
    })
  }, [lesson, lessonId, playhead, updateProgress])

  const activeCueIndex = useMemo(() => {
    if (transcript.length === 0) return -1
    return transcript.findIndex((cue) => playhead >= cue.start && playhead <= cue.end)
  }, [playhead, transcript])

  useEffect(() => {
    if (activeCueIndex < 0) return
    const container = transcriptRef.current
    const activeNode = container?.querySelector(
      `[data-cue-index="${activeCueIndex}"]`
    ) as HTMLElement | null
    if (!activeNode) return
    activeNode.scrollIntoView({ block: "center", behavior: "smooth" })
  }, [activeCueIndex])

  if (!lesson) {
    return (
      <div className={cn("flex h-full flex-col bg-background p-6 items-center justify-center text-center", className)}>
        <div className="p-8 border-4 border-dashed border-muted-foreground/30 rounded-xl">
          <h3 className="text-xl font-bold font-head text-muted-foreground">
            Select a lesson to start learning
          </h3>
        </div>
      </div>
    )
  }

  const isVideo = lesson.type === "video"

  const showTranscript = isVideo && (transcript.length > 0 || transcriptError || lesson.subtitles.length > 0)

  return (
    <div
      ref={scrollRef}
      className={cn("flex h-full flex-col gap-6 bg-background p-6 overflow-y-auto", className)}
    >
      <div className="h-1 w-full bg-primary" />

      <div className="sticky top-4 z-20">
        <div
          className={cn(
            "mx-auto w-full transition-all duration-300",
            isCompact ? "max-w-[820px] scale-[0.92] origin-top" : "max-w-[1040px]"
          )}
        >
          {isVideo ? (
            <Card className="aspect-video w-full overflow-hidden border-2 border-black bg-black p-0 shadow-xl rounded-lg">
              <VideoPlayer
                lesson={lesson}
                onProgress={handleProgress}
                onComplete={handleComplete}
                onNext={onNext}
                onPrevious={onPrevious}
                seekTo={seekTo}
              />
            </Card>
          ) : (
            <Card className="h-full w-full overflow-hidden border-2 border-black bg-background p-0 shadow-xl rounded-lg">
              <ContentViewer lesson={lesson} onNext={onNext} onPrevious={onPrevious} />
            </Card>
          )}
        </div>
      </div>

      {showTranscript && (
        <div className="rounded-lg border-2 border-black bg-background">
          <div className="flex items-center justify-between border-b-2 border-black px-4 py-3">
            <h3 className="font-head font-bold">transcript</h3>
            {transcriptLabel ? (
              <Badge className="bg-primary text-primary-foreground border-2 border-black font-bold uppercase">
                {transcriptLabel}
              </Badge>
            ) : (
              <Badge variant="outline" className="text-xs border-2 border-black">
                auto
              </Badge>
            )}
          </div>
          <div ref={transcriptRef} className="max-h-[320px] overflow-y-auto p-4 space-y-3">
            {transcriptError && (
              <p className="text-sm text-destructive font-bold">{transcriptError}</p>
            )}
            {!transcriptError && transcript.length === 0 && (
              <p className="text-sm text-muted-foreground italic">no transcript found.</p>
            )}
            {transcript.map((cue, index) => {
              const isActiveCue = index === activeCueIndex
              return (
                <button
                  key={cue.id}
                  type="button"
                  data-cue-index={index}
                  onClick={() => setSeekTo(cue.start)}
                  className={cn(
                    "w-full text-left rounded-md border-2 border-transparent px-3 py-2 transition-colors",
                    isActiveCue
                      ? "bg-primary/20 border-primary font-bold"
                      : "hover:bg-muted/50"
                  )}
                >
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="font-mono">{formatDuration(cue.start)}</span>
                    <span className="text-[10px] uppercase tracking-wide">
                      {formatDuration(cue.end)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-foreground">{cue.text}</p>
                </button>
              )
            })}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-head font-black mb-2 leading-tight">{lesson.name}</h1>
            <div className="flex gap-2 flex-wrap">
              <Badge className="bg-primary text-primary-foreground border-2 border-black font-bold">
                {lesson.sectionName || "module"}
              </Badge>
              <Badge variant="outline" className="bg-secondary font-bold uppercase tracking-wider">
                {lesson.type}
              </Badge>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <Button variant="outline" onClick={onPrevious} disabled={!onPrevious}>
              previous
            </Button>
            <Button
              variant={lesson.completed ? "secondary" : "outline"}
              onClick={toggleComplete}
              className="gap-2"
            >
              {lesson.completed ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <Circle className="h-4 w-4" />
              )}
              {lesson.completed ? "completed" : "mark complete"}
            </Button>
            <Button
              onClick={onNext}
              disabled={!onNext}
              className="bg-primary text-primary-foreground hover:bg-primary/80"
            >
              next lesson
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
