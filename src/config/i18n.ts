export const locales = ['en', 'cn', 'ja', 'es'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  cn: '简体中文',
  ja: '日本語',
  es: 'Español',
}

export const languages = Object.entries(localeNames).map(([value, label]) => ({
  value: value as Locale,
  label,
}))
