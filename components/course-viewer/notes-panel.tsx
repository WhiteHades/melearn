"use client"

import { useEffect, useMemo } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Tabs, TabsTriggerList, TabsTrigger, TabsContent } from "@/components/retroui/Tabs"
import { Textarea } from "@/components/retroui/Textarea"
import { Button } from "@/components/retroui/Button"
import { Label } from "@/components/retroui/Label"
import { cn, formatDuration, formatTimestamp } from "@/lib/utils"
import { trpc } from "@/lib/trpc/client"
import type { Lesson, Note } from "@/types"

const noteSchema = z.object({
  text: z.string().trim().min(1, "note text is required").max(2000),
})

type NoteFormValues = z.infer<typeof noteSchema>

interface NotesPanelProps {
  className?: string
  lesson?: Lesson | null
}

export function NotesPanel({ className, lesson }: NotesPanelProps) {
  const utils = trpc.useUtils()
  const lessonId = lesson?.id ?? ""

  const notesQuery = trpc.notes.list.useQuery(
    { lessonId },
    {
      enabled: Boolean(lessonId),
    }
  )

  const addNote = trpc.notes.add.useMutation({
    onSuccess: async () => {
      await utils.notes.list.invalidate({ lessonId })
    },
  })

  const removeNote = trpc.notes.remove.useMutation({
    onSuccess: async () => {
      await utils.notes.list.invalidate({ lessonId })
    },
  })

  const form = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      text: "",
    },
  })

  useEffect(() => {
    form.reset({ text: "" })
  }, [form, lessonId])

  const notes = useMemo<Note[]>(() => {
    if (!lessonId) return []
    const source = notesQuery.data ?? []
    return [...source].sort((a, b) => a.timestamp - b.timestamp)
  }, [lessonId, notesQuery.data])

  const handleSubmit = form.handleSubmit(async (values) => {
    if (!lesson) return
    await addNote.mutateAsync({
      lessonId: lesson.id,
      text: values.text,
      timestamp: lesson.lastPosition ?? 0,
    })
    form.reset()
  })

  return (
    <div className={cn("flex h-full flex-col bg-background", className)}>
      <div className="h-1 w-full bg-primary" />
      <Tabs defaultValue="notes" className="flex-1 flex flex-col">
        <div className="border-b border-border bg-muted/30 px-4">
          <TabsTriggerList className="w-full justify-start gap-4 h-12 bg-transparent p-0 border-none">
            <TabsTrigger
              value="notes"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border-b-2 border-transparent data-[state=active]:border-black rounded-none h-full font-bold px-4 top-0"
            >
              my notes
            </TabsTrigger>
            <TabsTrigger
              value="resources"
              className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground border-b-2 border-transparent data-[state=active]:border-black rounded-none h-full font-bold px-4 top-0"
            >
              resources
            </TabsTrigger>
          </TabsTriggerList>
        </div>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="notes" className="h-full p-4 space-y-4 m-0 mt-0">
            <form className="flex flex-col h-full gap-3" onSubmit={handleSubmit}>
              <div className="flex items-center justify-between">
                <Label htmlFor="session-notes" className="font-head font-bold text-lg">
                  session notes
                </Label>
                {lesson ? (
                  <span className="text-xs text-muted-foreground">{lesson.name}</span>
                ) : (
                  <span className="text-xs text-muted-foreground">no lesson selected</span>
                )}
              </div>
              <Textarea
                id="session-notes"
                placeholder="type your notes here..."
                className="flex-1 resize-none border-2 border-black shadow-sm font-sans focus-visible:ring-primary"
                {...form.register("text")}
                aria-invalid={Boolean(form.formState.errors.text)}
                disabled={!lesson || addNote.isPending}
              />
              {form.formState.errors.text && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.text.message}
                </p>
              )}
              <Button
                type="submit"
                className="w-full font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-px hover:shadow-none transition-all"
                disabled={!lesson || addNote.isPending}
              >
                {addNote.isPending ? "saving..." : "save notes"}
              </Button>
            </form>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold">saved notes</p>
                <span className="text-xs text-muted-foreground">{notes.length}</span>
              </div>
              {notes.length === 0 ? (
                <p className="text-xs text-muted-foreground italic">no notes yet</p>
              ) : (
                <div className="space-y-3">
                  {notes.map((note: Note) => (
                    <div
                      key={note.id}
                      className="rounded-md border-2 border-black bg-background p-3"
                    >
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="font-mono">{formatDuration(note.timestamp)}</span>
                        <span>{formatTimestamp(note.createdAt)}</span>
                      </div>
                      <p className="mt-2 text-sm whitespace-pre-wrap">{note.text}</p>
                      <div className="mt-3 flex justify-end">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeNote.mutate({ noteId: note.id })}
                          disabled={removeNote.isPending}
                        >
                          delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="h-full p-4 m-0 mt-0">
            <div className="space-y-4">
              <h3 className="font-head font-bold text-lg">resources</h3>
              <p className="text-muted-foreground italic text-sm">no attached resources.</p>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
