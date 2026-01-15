import { watch, type UnwatchFn, type WatchEvent } from "@tauri-apps/plugin-fs"
import { isTauri } from "./tauri"

let unwatchFn: UnwatchFn | null = null

function getEventType(event: WatchEvent): "create" | "modify" | "remove" | null {
  const kind = event.type
  
  if (typeof kind === "object") {
    if ("create" in kind) return "create"
    if ("modify" in kind) return "modify"
    if ("remove" in kind) return "remove"
  }
  
  return null
}

export async function startWatching(
  path: string,
  onAdd: (path: string) => void,
  onRemove: (path: string) => void,
  onChange: (path: string) => void
): Promise<void> {
  if (!isTauri()) return

  await stopWatching()

  unwatchFn = await watch(
    path,
    (event: WatchEvent) => {
      const eventType = getEventType(event)
      const paths = event.paths || []

      for (const p of paths) {
        if (eventType === "create") {
          onAdd(p)
        } else if (eventType === "remove") {
          onRemove(p)
        } else if (eventType === "modify") {
          onChange(p)
        }
      }
    },
    {
      recursive: true,
      delayMs: 1000,
    }
  )
}

export async function stopWatching(): Promise<void> {
  if (unwatchFn) {
    await unwatchFn()
    unwatchFn = null
  }
}

export function isWatching(): boolean {
  return unwatchFn !== null
}
