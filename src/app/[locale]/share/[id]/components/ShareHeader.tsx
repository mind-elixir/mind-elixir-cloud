'use client'

import Image from 'next/image'
import {
  Brain,
  List,
  Maximize2,
  Minimize2,
  Calendar,
  Eye,
  Copy,
  Check,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { MindMapItem } from '@/models/list'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

type ViewMode = 'mindmap' | 'outline' | 'split'

interface ShareHeaderProps {
  mapItem: MindMapItem
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  isFullscreen: boolean
  setIsFullscreen: (fullscreen: boolean) => void
  copied: boolean
  onCopyLink: () => void
}

export function ShareHeader({
  mapItem,
  viewMode,
  setViewMode,
  isFullscreen,
  setIsFullscreen,
  copied,
  onCopyLink,
}: ShareHeaderProps) {
  const t = useTranslations('share')
  const locale = useLocale()

  const formatDate = (dateString: string) => {
    const localeMap: Record<string, string> = {
      cn: 'zh-CN',
      en: 'en-US',
      ja: 'ja-JP',
    }
    return new Date(dateString).toLocaleDateString(localeMap[locale] || 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200/30 dark:border-gray-700/30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* 标题和元信息 */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <Link href="/list/public" className="flex-shrink-0">
                <Image src="/logo2.png" alt="Logo" width={32} height={32} />
              </Link>
              <h1 className="text-xl lg:text-2xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                {mapItem.name}
              </h1>
              {mapItem.public && (
                <Badge
                  variant="secondary"
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  {t('public')}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {t('updatedAt')} {formatDate(mapItem.updatedAt || mapItem.date)}
                </span>
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex items-center gap-3 flex-col sm:flex-row w-full sm:w-auto">
            {/* 视图切换 */}
            <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-lg p-0.5 border border-gray-200 dark:border-gray-700">
              <Button
                variant={viewMode === 'mindmap' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('mindmap')}
                className={cn('h-8 px-3 text-xs font-medium')}
              >
                <Brain className="w-3.5 h-3.5 mr-1.5" />
                {t('viewMindMap')}
              </Button>
              <Button
                variant={viewMode === 'outline' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('outline')}
                className={cn('h-8 px-3 text-xs font-medium')}
              >
                <List className="w-3.5 h-3.5 mr-1.5" />
                {t('viewOutline')}
              </Button>
              <Button
                variant={viewMode === 'split' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('split')}
                className={cn('h-8 px-3 text-xs font-medium')}
              >
                {t('viewSplit')}
              </Button>
            </div>

            {/* 全屏切换 */}
            {/* <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="h-8 px-3 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 shadow-soft"
            >
              {isFullscreen ? (
                <Minimize2 className="w-3.5 h-3.5" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5" />
              )}
            </Button> */}

            {/* 分享按钮 */}
            <Button
              variant="outline"
              size="sm"
              onClick={onCopyLink}
              className="h-8 px-3 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5 mr-1.5" />
              )}
              <span className="text-xs font-medium">
                {copied ? t('copied') : t('copyLink')}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
