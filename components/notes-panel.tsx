"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { formatDuration } from "@/lib/utils"
import type { Note } from "@/types"
import { nanoid } from "nanoid"
import { Plus, Trash2, Clock } from "lucide-react"

interface NotesPanelProps {
  lessonId: string
  notes: Note[]
  currentTimestamp: number
  onAddNote: (note: Note) => void
  onDeleteNote: (id: string) => void
  onSeek: (timestamp: number) => void
}

export function NotesPanel({
  lessonId,
  notes,
  currentTimestamp,
  onAddNote,
  onDeleteNote,
  onSeek,
}: NotesPanelProps) {
  const [newNoteText, setNewNoteText] = useState("")

  const lessonNotes = notes
    .filter((n) => n.lessonId === lessonId)
    .sort((a, b) => a.timestamp - b.timestamp)

  function handleAddNote() {
    if (!newNoteText.trim()) return

    const note: Note = {
      id: nanoid(12),
      lessonId,
      timestamp: currentTimestamp,
      text: newNoteText.trim(),
      createdAt: new Date(),
    }

    onAddNote(note)
    setNewNoteText("")
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleAddNote()
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between p-3">
        <h3 className="text-sm font-semibold">notes</h3>
        <span className="text-xs text-muted-foreground">{lessonNotes.length} notes</span>
      </div>
      <Separator />

      <div className="p-3">
        <div className="flex gap-2">
          <textarea
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="add a note at current time..."
            className="flex-1 resize-none rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            rows={2}
          />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            at {formatDuration(currentTimestamp)}
          </span>
          <Button size="sm" onClick={handleAddNote} disabled={!newNoteText.trim()}>
            <Plus className="mr-1 size-4" />
            add
          </Button>
        </div>
      </div>

      <Separator />

      <ScrollArea className="flex-1">
        <div className="space-y-2 p-3">
          {lessonNotes.length === 0 ? (
            <p className="py-4 text-center text-sm text-muted-foreground">
              no notes yet. add your first note above.
            </p>
          ) : (
            lessonNotes.map((note) => (
              <div
                key={note.id}
                className="group relative rounded-md border p-3 transition-colors hover:bg-muted/50"
              >
                <button
                  className="flex items-center gap-1 text-xs text-primary hover:underline"
                  onClick={() => onSeek(note.timestamp)}
                >
                  <Clock className="size-3" />
                  {formatDuration(note.timestamp)}
                </button>
                <p className="mt-1 text-sm">{note.text}</p>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="absolute right-2 top-2 opacity-0 group-hover:opacity-100"
                  onClick={() => onDeleteNote(note.id)}
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
