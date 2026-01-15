import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import "@/app/globals.css"

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          themes={[
            "light",
            "dark",
            "catppuccin-mocha",
            "gruvbox-dark",
            "tokyo-night",
            "nord",
            "dracula",
            "one-dark",
            "rose-pine",
          ]}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
