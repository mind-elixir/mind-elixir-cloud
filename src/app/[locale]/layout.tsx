import type { Metadata } from 'next'
import '../globals.css'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import NavBar from '@/components/NavBar'
import { UserProvider } from '@/providers/UserProvider'
import { Toaster } from 'sonner'
import 'react-outliner-neo/style.css'
import 'mind-elixir/style.css'

export const metadata: Metadata = {
  title: 'Mind Elixir Cloud',
  description: 'A powerful mind mapping application',
  icons: {
    icon: '/mind-elixir-cloud.png',
    apple: '/mind-elixir-cloud.png',
  },
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* 仅在开发环境下加载 */}
        {process.env.NODE_ENV === 'development' && (
          <script
            src="https://unpkg.com/react-scan/dist/auto.global.js"
            async
          />
        )}
      </head>
      <body className="font-sans">
        <NextIntlClientProvider messages={messages}>
          <UserProvider>{children}</UserProvider>
        </NextIntlClientProvider>
        <Toaster />
      </body>
    </html>
  )
}
