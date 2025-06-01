'use client'

import { useTranslations } from 'next-intl'

export default function AboutPage() {
  const t = useTranslations('about')

  return (
    <div className="min-h-screen pt-28 px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          {t('title', { default: 'About Mind Elixir Cloud' })}
        </h1>
        <div className="prose prose-lg mx-auto">
          <p className="text-lg mb-6">{t('1')}</p>
          <p className="text-lg mb-6">{t('2')}</p>
          <p className="text-lg mb-6">{t('3')}</p>
        </div>
      </div>
    </div>
  )
}
