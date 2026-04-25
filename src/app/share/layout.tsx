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

export default async function ShareLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Load all messages to support client-side switching
  const allMessages = {
    en: (await import('../../../messages/en.json')).default,
    cn: (await import('../../../messages/cn.json')).default,
    ja: (await import('../../../messages/ja.json')).default,
  }

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
