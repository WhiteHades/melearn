import type { Metadata } from "next"
import { AppProviders } from "@/components/app-providers"
import { Archivo_Black, Space_Grotesk } from "next/font/google"
import { TitleBar } from "@/components/title-bar"
import { ThemeWrapper } from "@/components/theme-wrapper"
import "@/app/globals.css"

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-head",
  display: "swap",
})

const space = Space_Grotesk({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "melearn",
  description: "modern local course viewer",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="theme-yellow" suppressHydrationWarning>
      <body className={`${archivoBlack.variable} ${space.variable} font-sans flex flex-col h-screen overflow-hidden`}>
        <AppProviders>
          <ThemeWrapper>
            <TitleBar />
            <div className="flex-1 w-full overflow-hidden">
              {children}
            </div>
          </ThemeWrapper>
        </AppProviders>
      </body>
    </html>
  )
}
