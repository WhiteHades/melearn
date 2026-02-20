import Database from "@tauri-apps/plugin-sql"
import type { Note } from "@/types"
import { isTauri } from "./tauri"

let db: Database | null = null

export async function initDatabase(): Promise<void> {
  if (!isTauri()) return
  db = await Database.load("sqlite:melearn.db")
}

export async function updateLessonProgress(
  lessonId: string,
  watchedTime: number,
  lastPosition: number,
  completed: boolean
): Promise<void> {
  if (!db) return

  await db.execute(
    `UPDATE lessons SET watched_time = $1, last_position = $2, completed = $3 WHERE id = $4`,
    [watchedTime, lastPosition, completed ? 1 : 0, lessonId]
  )
}

export async function saveNote(note: Note): Promise<void> {
  if (!db) return

  await db.execute(
    `INSERT INTO notes (id, lesson_id, timestamp, text, created_at) VALUES ($1, $2, $3, $4, $5)`,
    [note.id, note.lessonId, note.timestamp, note.text, note.createdAt]
  )
}

export async function deleteNote(noteId: string): Promise<void> {
  if (!db) return
  await db.execute(`DELETE FROM notes WHERE id = $1`, [noteId])
}
