import type { Metadata } from 'next'
import '../globals.css'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import NavBar from '@/components/NavBar'
import { UserProvider } from '@/providers/UserProvider'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'Mind Elixir Cloud',
  description: 'A powerful mind mapping application',
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="font-sans">
        <NextIntlClientProvider messages={messages}>
          <UserProvider>
            {children}
          </UserProvider>
        </NextIntlClientProvider>
        <Toaster />
      </body>
    </html>
  )
}
