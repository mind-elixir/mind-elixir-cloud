'use client'

import { NextIntlClientProvider } from 'next-intl'
import { useState, useEffect, createContext, useContext } from 'react'
import { Locale, locales, defaultLocale } from '@/config/i18n'

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function useShareLocale() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useShareLocale must be used within a ShareLocaleProvider')
  }
  return context
}

export function ShareLocaleProvider({
  children,
  allMessages,
}: {
  children: React.ReactNode
  allMessages: Record<string, any>
}) {
  const [locale, setLocale] = useState<Locale>(defaultLocale)

  useEffect(() => {
    // 1. Check localStorage
    const savedLocale = localStorage.getItem('share-locale') as Locale
    if (savedLocale && (locales as readonly string[]).includes(savedLocale)) {
      setLocale(savedLocale)
      return
    }

    // 2. Detect browser language
    const browserLang = navigator.language.toLowerCase()
    if (browserLang.startsWith('zh')) {
      setLocale('cn')
    } else if (browserLang.startsWith('ja')) {
      setLocale('ja')
    } else if (browserLang.startsWith('es')) {
      setLocale('es')
    } else {
      setLocale(defaultLocale)
    }
  }, [])

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale)
    localStorage.setItem('share-locale', newLocale)
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale: handleSetLocale }}>
      <NextIntlClientProvider
        messages={allMessages[locale]}
        locale={locale}
        timeZone="UTC"
      >
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  )
}
