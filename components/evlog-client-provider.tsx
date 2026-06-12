"use client"

import { EvlogProvider } from "evlog/next/client"

export function EvlogClientProvider({ children }: { children: React.ReactNode }) {
  if (typeof window === "undefined") return <>{children}</>
  return (
    <EvlogProvider service="melearner" transport={{ enabled: false }}>
      {children}
    </EvlogProvider>
  )
}
