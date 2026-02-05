import { createTRPCReact } from "@trpc/react-query"
import type { AppRouter } from "@/lib/trpc/router"

export const trpc = createTRPCReact<AppRouter>()
