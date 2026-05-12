'use client'

import { Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'

interface ShareFooterProps {
  onCopyLink: () => void
}

export function ShareFooter({ onCopyLink }: ShareFooterProps) {
  const t = useTranslations('share')

  return (
    <div className="border-t border-gray-200/50 dark:border-gray-800/50 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {t('poweredBy')}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
