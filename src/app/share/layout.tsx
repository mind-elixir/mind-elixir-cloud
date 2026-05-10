import type { Metadata } from 'next'
import { ShareLocaleProvider } from './components/ShareLocaleProvider'
import { UserProvider } from '@/providers/UserProvider'
import { Toaster } from 'sonner'
import '../globals.css'
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

import { locales } from '@/config/i18n'

export default async function ShareLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Load all messages dynamically to support client-side switching
  const messagesArray = await Promise.all(
    locales.map(async (locale) => ({
      locale,
      messages: (await import(`../../../messages/${locale}.json`)).default,
    }))
  )
  const allMessages = messagesArray.reduce(
    (acc, { locale, messages }) => {
      acc[locale] = messages
      return acc
    },
    {} as Record<string, any>
  )

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <ShareLocaleProvider allMessages={allMessages}>
          <UserProvider>{children}</UserProvider>
        </ShareLocaleProvider>
        <Toaster />
      </body>
    </html>
  )
}
