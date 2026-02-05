import { create, type StoreApi } from "zustand"
import { persist } from "zustand/middleware"

type ThemeColor = "yellow" | "purple" | "lime" | "red" | "lavender" | "orange" | "green"

interface ThemeStore {
  color: ThemeColor
  setColor: (color: ThemeColor) => void
}

type ThemeStoreSet = StoreApi<ThemeStore>["setState"]

const createThemeStore = (set: ThemeStoreSet): ThemeStore => ({
  color: "yellow",
  setColor: (color: ThemeColor) => set({ color }),
})

export const useThemeStore = create<ThemeStore>()(
  persist(createThemeStore, {
    name: "theme-color-storage",
  })
)
