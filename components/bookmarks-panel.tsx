"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { formatDuration } from "@/lib/utils"
import type { Bookmark } from "@/types"
import { nanoid } from "nanoid"
import { Plus, Trash2, Clock, Bookmark as BookmarkIcon } from "lucide-react"

interface BookmarksPanelProps {
  lessonId: string
  bookmarks: Bookmark[]
  currentTimestamp: number
  onAddBookmark: (bookmark: Bookmark) => void
  onDeleteBookmark: (id: string) => void
  onSeek: (timestamp: number) => void
}

export function BookmarksPanel({
  lessonId,
  bookmarks,
  currentTimestamp,
  onAddBookmark,
  onDeleteBookmark,
  onSeek,
}: BookmarksPanelProps) {
  const [newLabel, setNewLabel] = useState("")

  const lessonBookmarks = bookmarks
    .filter((b) => b.lessonId === lessonId)
    .sort((a, b) => a.timestamp - b.timestamp)

  function handleAddBookmark() {
    const bookmark: Bookmark = {
      id: nanoid(12),
      lessonId,
      timestamp: currentTimestamp,
      label: newLabel.trim() || `bookmark at ${formatDuration(currentTimestamp)}`,
      createdAt: new Date(),
    }

    onAddBookmark(bookmark)
    setNewLabel("")
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between p-3">
        <h3 className="text-sm font-semibold">bookmarks</h3>
        <span className="text-xs text-muted-foreground">{lessonBookmarks.length} bookmarks</span>
      </div>
      <Separator />

      <div className="p-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddBookmark()}
            placeholder="bookmark label (optional)"
            className="flex-1 rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
          <Button size="sm" onClick={handleAddBookmark}>
            <Plus className="mr-1 size-4" />
            add
          </Button>
        </div>
        <span className="mt-1 block text-xs text-muted-foreground">
          at {formatDuration(currentTimestamp)}
        </span>
      </div>

      <Separator />

      <ScrollArea className="flex-1">
        <div className="space-y-1 p-3">
          {lessonBookmarks.length === 0 ? (
            <p className="py-4 text-center text-sm text-muted-foreground">
              no bookmarks yet. click add to bookmark current time.
            </p>
          ) : (
            lessonBookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="group flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-muted/50"
              >
                <button
                  className="flex flex-1 items-center gap-2 text-left text-sm"
                  onClick={() => onSeek(bookmark.timestamp)}
                >
                  <BookmarkIcon className="size-4 shrink-0 text-primary" />
                  <span className="flex-1 truncate">{bookmark.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDuration(bookmark.timestamp)}
                  </span>
                </button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="opacity-0 group-hover:opacity-100"
                  onClick={() => onDeleteBookmark(bookmark.id)}
                >
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
