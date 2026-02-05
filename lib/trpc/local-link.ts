import { unstable_localLink } from "@trpc/client"
import type { TRPCLink } from "@trpc/client"
import { appRouter, type AppRouter } from "@/lib/trpc/router"

export function createLocalLink(): TRPCLink<AppRouter> {
  return unstable_localLink({
    router: appRouter,
    createContext: async () => ({}),
  })
}
