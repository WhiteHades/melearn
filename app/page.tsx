import { Suspense } from "react"
import { HomeScreen } from "@/components/home-screen"

function HomeFallback() {
  return <main className="h-full bg-background" />
}

export default function Home() {
  return (
    <Suspense fallback={<HomeFallback />}>
      <HomeScreen />
    </Suspense>
  )
}
