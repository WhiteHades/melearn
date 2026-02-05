"use client"

import { useEffect } from "react"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { ThemeProvider } from "@/components/theme-provider"
import { TRPCProvider } from "@/components/trpc-provider"
import { SearchIndexer } from "@/components/search-indexer"
import { initDatabase } from "@/lib/database"

export function AppProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initDatabase()
  }, [])

  return (
    <NuqsAdapter>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TRPCProvider>
          <SearchIndexer />
          {children}
        </TRPCProvider>
      </ThemeProvider>
    </NuqsAdapter>
  )
}
