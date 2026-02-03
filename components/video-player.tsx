"use client"

import { useRef, useState, useEffect, useCallback, memo } from "react"
import { invoke } from "@tauri-apps/api/core"
import { Button } from "@/components/retroui/Button"
import { Slider } from "@/components/retroui/Slider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/retroui/DropdownMenu"
import { cn, formatDuration } from "@/lib/utils"
import { isTauri } from "@/lib/tauri"
import type { Lesson } from "@/types"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  RotateCcw,
  Check,
  Maximize,
  Minimize,
} from "lucide-react"

interface VideoPlayerProps {
  lesson: Lesson
  onProgress: (currentTime: number, duration: number) => void
  onComplete: () => void
  onPrevious?: () => void
  onNext?: () => void
  autoplay?: boolean
  seekTo?: number | null
}

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]

function VideoPlayerComponent({
  lesson,
  onProgress,
  onComplete,
  onPrevious,
  onNext,
  autoplay = false,
  seekTo,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [videoSrc, setVideoSrc] = useState<string | null>(null)
  const [subtitleSrc, setSubtitleSrc] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [isEnded, setIsEnded] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const hasInitialSeekRef = useRef(false)
  const [error, setError] = useState<string | null>(null)

  const isVideoFile = lesson.type === "video"

  useEffect(() => {
    async function loadVideoSrc() {
      if (!isVideoFile) return

      try {
        if (isTauri()) {
          const port = await invoke<number>("get_video_server_port")
          const videoPath = lesson.path.slice(1)
          const src = `http://127.0.0.1:${port}/video/${encodeURIComponent(videoPath)}`
          setVideoSrc(src)

          const subtitleFile = lesson.subtitles?.[0]
          if (subtitleFile) {
            const subtitlePath = subtitleFile.path.slice(1)
            const subtitleUrl = `http://127.0.0.1:${port}/video/${encodeURIComponent(subtitlePath)}`
            setSubtitleSrc(subtitleUrl)
          } else {
            setSubtitleSrc(null)
          }
        } else {
          setVideoSrc(lesson.path)
          setSubtitleSrc(lesson.subtitles?.[0]?.path ?? null)
        }
      } catch (err) {
        setError("failed to load video source")
      }
    }
    loadVideoSrc()
  }, [lesson.path, lesson.subtitles, isVideoFile])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !videoSrc) return

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
      onProgress(video.currentTime, video.duration)
    }

    const handleDurationChange = () => setDuration(video.duration)
    const handleEnded = () => {
      setIsEnded(true)
      setIsPlaying(false)
      onComplete()
    }
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleError = () => setError("video playback failed")

    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("durationchange", handleDurationChange)
    video.addEventListener("ended", handleEnded)
    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)
    video.addEventListener("error", handleError)

    if (lesson.lastPosition > 0 && !hasInitialSeekRef.current) {
      video.currentTime = lesson.lastPosition
      hasInitialSeekRef.current = true
    }

    if (autoplay) {
      video.play().catch(() => setIsPlaying(false))
    }

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("durationchange", handleDurationChange)
      video.removeEventListener("ended", handleEnded)
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
      video.removeEventListener("error", handleError)
    }
  }, [videoSrc, autoplay, lesson.lastPosition, onProgress, onComplete])

  useEffect(() => {
    if (seekTo === null || seekTo === undefined) return
    if (!videoRef.current) return
    videoRef.current.currentTime = seekTo
    setCurrentTime(seekTo)
    onProgress(seekTo, videoRef.current.duration)
  }, [seekTo, onProgress])

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }, [isPlaying])

  const handleSeek = useCallback((value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }, [])

  const handleVolumeChange = useCallback((value: number[]) => {
    const newVolume = value[0]
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      setVolume(newVolume)
      setIsMuted(newVolume === 0)
    }
  }, [])

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      const newMuted = !isMuted
      videoRef.current.muted = newMuted
      setIsMuted(newMuted)
    }
  }, [isMuted])

  const changeSpeed = useCallback((newSpeed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = newSpeed
      setSpeed(newSpeed)
    }
  }, [])

  const handleReplay = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
      setIsEnded(false)
    }
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  const handleMouseMove = useCallback(() => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false)
    }, 2500)
  }, [isPlaying])

  if (!isVideoFile) {
    return (
      <div className="flex aspect-video w-full items-center justify-center bg-muted">
        <div className="text-center">
          <p className="text-lg font-medium">{lesson.name}</p>
          <div className="mt-4 flex justify-center gap-2">
            {onPrevious && (
              <Button variant="outline" size="sm" onClick={onPrevious}>
                <SkipBack className="mr-1 size-4" /> previous
              </Button>
            )}
            {onNext && (
              <Button size="sm" onClick={onNext}>
                next <SkipForward className="ml-1 size-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (!videoSrc) {
    return (
      <div className="flex aspect-video w-full items-center justify-center bg-black">
        <p className="text-white">loading...</p>
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      className="group relative flex aspect-video w-full flex-col bg-black overflow-hidden rounded-md shadow-lg ring-1 ring-white/10"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        className="size-full"
        onClick={togglePlay}
        playsInline
        preload="auto"
        style={{ 
          WebkitTransform: 'translateZ(0)',
          transform: 'translateZ(0)',
          willChange: 'contents',
        } as React.CSSProperties}
      >
        {subtitleSrc && (
          <track
            kind="subtitles"
            src={subtitleSrc}
            srcLang="en"
            label="English"
            default
          />
        )}
      </video>

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <p className="text-white">{error}</p>
        </div>
      )}

      {isEnded && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="flex gap-4">
            <Button variant="outline" onClick={handleReplay}>
              <RotateCcw className="mr-2 size-4" /> replay
            </Button>
            {onNext && (
              <Button onClick={onNext}>
                next lesson <SkipForward className="ml-2 size-4" />
              </Button>
            )}
          </div>
        </div>
      )}

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-black/90 to-transparent p-4 transition-opacity duration-300",
          showControls || !isPlaying ? "opacity-100" : "opacity-0"
        )}
      >
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={0.1}
          onValueChange={handleSeek}
          className="mb-4 cursor-pointer"
          aria-label="video progress"
        />

        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            {onPrevious && (
              <Button variant="ghost" size="icon-sm" onClick={onPrevious} className="text-white hover:bg-white/20" aria-label="previous lesson">
                <SkipBack className="size-5" aria-hidden="true" />
              </Button>
            )}
            
            <Button variant="ghost" size="icon" onClick={togglePlay} className="text-white hover:bg-white/20" aria-label={isPlaying ? "pause" : "play"}>
              {isPlaying ? <Pause className="size-6" aria-hidden="true" /> : <Play className="size-6" aria-hidden="true" />}
            </Button>

            {onNext && (
              <Button variant="ghost" size="icon-sm" onClick={onNext} className="text-white hover:bg-white/20" aria-label="next lesson">
                <SkipForward className="size-5" aria-hidden="true" />
              </Button>
            )}

            <div className="group/vol ml-2 flex items-center gap-2">
              <Button variant="ghost" size="icon-sm" onClick={toggleMute} className="text-white hover:bg-white/20" aria-label={isMuted ? "unmute" : "mute"}>
                {isMuted ? <VolumeX className="size-5" aria-hidden="true" /> : <Volume2 className="size-5" aria-hidden="true" />}
              </Button>
              <Slider
                value={[isMuted ? 0 : volume]}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                className="w-0 scale-x-0 transition-all duration-200 group-hover/vol:w-20 group-hover/vol:scale-x-100"
                aria-label="volume"
              />
            </div>

            <span className="ml-2 text-xs font-medium tabular-nums opacity-90">
              {formatDuration(currentTime)} / {formatDuration(duration)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 gap-1 px-2 text-white hover:bg-white/20">
                  <span className="text-xs font-bold">{speed}x</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-20 min-w-20">
                {SPEEDS.map((s) => (
                  <DropdownMenuItem key={s} onClick={() => changeSpeed(s)}>
                    {speed === s && <Check className="mr-2 size-3" />}
                    {s}x
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon-sm" onClick={toggleFullscreen} className="text-white hover:bg-white/20" aria-label={isFullscreen ? "exit fullscreen" : "fullscreen"}>
              {isFullscreen ? <Minimize className="size-5" aria-hidden="true" /> : <Maximize className="size-5" aria-hidden="true" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const VideoPlayer = memo(VideoPlayerComponent)
