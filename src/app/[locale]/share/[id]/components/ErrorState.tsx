'use client'

import { useTranslations } from 'next-intl'

interface ErrorStateProps {
  title?: string
  message?: string
}

export function ErrorState({ 
  title, 
  message 
}: ErrorStateProps) {
  const t = useTranslations('share')
  
  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg">
      <div className="text-center border-gray-200/20 dark:border-gray-800/20 p-8 rounded-2xl shadow-strong">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 gradient-text">
          {title || t('notFound')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">{message || t('checkLink')}</p>
      </div>
    </div>
  )
}
