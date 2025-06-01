import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mind Elixir Cloud",
  description: "A powerful mind mapping application",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}