import type { Metadata } from 'next'
import '../globals.css'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import NavBar from '@/components/NavBar'
import { UserProvider } from '@/providers/UserProvider'

export const metadata: Metadata = {
  title: 'Mind Elixir Cloud',
  description: 'A powerful mind mapping application',
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { locale } = await params
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className="font-sans">
        <NextIntlClientProvider messages={messages}>
          <UserProvider>
            <div className="fixed top-0 left-0 right-0 z-50 p-5">
              <NavBar className="max-w-4xl mx-auto" />
            </div>
            {children}
          </UserProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
