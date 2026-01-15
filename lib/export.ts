import type { Note } from "@/types"
import { formatDuration } from "@/lib/utils"

export function notesToMarkdown(notes: Note[], lessonName: string): string {
  if (notes.length === 0) return ""

  const sortedNotes = [...notes].sort((a, b) => a.timestamp - b.timestamp)

  let md = `# ${lessonName}\n\n`
  md += `_exported on ${new Date().toLocaleDateString()}_\n\n`
  md += `---\n\n`

  for (const note of sortedNotes) {
    md += `## ${formatDuration(note.timestamp)}\n\n`
    md += `${note.text}\n\n`
  }

  return md
}

export function allNotesToMarkdown(
  notesByLesson: Map<string, { lessonName: string; notes: Note[] }>
): string {
  let md = "# course notes\n\n"
  md += `_exported on ${new Date().toLocaleDateString()}_\n\n`

  for (const [, { lessonName, notes }] of notesByLesson) {
    if (notes.length === 0) continue

    const sortedNotes = [...notes].sort((a, b) => a.timestamp - b.timestamp)

    md += `## ${lessonName}\n\n`

    for (const note of sortedNotes) {
      md += `**${formatDuration(note.timestamp)}:** ${note.text}\n\n`
    }

    md += `---\n\n`
  }

  return md
}

export function downloadMarkdown(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename.endsWith(".md") ? filename : `${filename}.md`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
