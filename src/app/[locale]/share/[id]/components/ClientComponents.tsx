'use client'

import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { ExternalLink, Copy, Check } from 'lucide-react'
import { useTranslations } from 'next-intl'

// Components
import { ShareHeader } from './ShareHeader'
import { ViewContent } from './ViewContent'
import { ShareFooter } from './ShareFooter'
import { AuthorInfo } from './AuthorInfo'

// Config
import { PlatformIcon } from '@/config/socialPlatforms'

// Types
import type { MindMapItem } from '@/models/list'
import type { PublicUserProfile } from '@/services/types'
import type { MindElixirData, Options } from 'mind-elixir'
// @ts-ignore
import nodeMenu from '@mind-elixir/node-menu-neo'

type ViewMode = 'mindmap' | 'outline' | 'split'

interface ClientWrapperProps {
  mapData: MindElixirData
  mapItem: MindMapItem
  authorProfile?: PublicUserProfile
}

export function ClientWrapper({ mapData, mapItem, authorProfile }: ClientWrapperProps) {
  const t = useTranslations('share')
  const [viewMode, setViewMode] = useState<ViewMode>('split')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [copied, setCopied] = useState(false)

  const plugins = useMemo(() => [nodeMenu], [])
  const options = useMemo<Partial<Options>>(
    () => ({
      direction: 2,
      draggable: false,
      editable: false,
      contextMenu: false,
      toolBar: true,
      keypress: false,
    }),
    [],
  )

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy link:', error)
    }
  }

  return (
    <div
      className={cn(
        'min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800',
        isFullscreen && 'fixed inset-0 z-50',
      )}
    >
      <ShareHeader
        mapItem={mapItem}
        viewMode={viewMode}
        setViewMode={setViewMode}
        isFullscreen={isFullscreen}
        setIsFullscreen={setIsFullscreen}
        copied={copied}
        onCopyLink={handleCopyLink}
      />

      {/* 主要内容区域 */}
      <div className="container mx-auto px-6 pb-8 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 思维导图内容 */}
          <div className="lg:col-span-3">
            <ViewContent
              viewMode={viewMode}
              mapData={mapData}
              plugins={plugins}
              options={options}
            />
          </div>

          {/* 作者信息侧边栏 */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-4">
              {authorProfile && (
                <AuthorInfo className="w-64" author={authorProfile} />
              )}

              {/* 分享到社交媒体 */}
              <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 rounded-2xl p-6 w-64 shadow-sm">
                <h4 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 mb-4 uppercase tracking-[0.2em]">
                  {t('shareThisMindMap')}
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  <button
                    onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(mapItem.name)}`, '_blank')}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 shadow-sm hover:-translate-y-1"
                    title="Share to X (Twitter)"
                  >
                    <PlatformIcon platform="twitter" className="w-4 h-4" color="currentColor" />
                  </button>
                  <button
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-[#1877F2] hover:text-white transition-all duration-300 shadow-sm hover:-translate-y-1"
                    title="Share to Facebook"
                  >
                    <PlatformIcon platform="facebook" className="w-5 h-5" color="currentColor" />
                  </button>
                  <button
                    onClick={() => window.open(`https://service.weibo.com/share/share.php?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(mapItem.name)}`, '_blank')}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-[#E6162D] hover:text-white transition-all duration-300 shadow-sm hover:-translate-y-1"
                    title="分享到微博"
                  >
                    <PlatformIcon platform="weibo" className="w-5 h-5" color="currentColor" />
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-sm hover:-translate-y-1"
                    title={t('copyLink')}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* 思维导图相关链接 */}
              {mapItem.source && (
                <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 rounded-2xl p-6 w-64 shadow-sm">
                  <h4 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 mb-3 uppercase tracking-[0.2em]">
                    {t('relatedLinks')}
                  </h4>
                  <a
                    href={mapItem.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                  >
                    <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 group-hover:scale-110 transition-transform duration-200">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                    <span className="truncate">{t('viewRelatedLink')}</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ShareFooter onCopyLink={handleCopyLink} />
    </div>
  )
}
