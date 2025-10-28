'use client'

import { useState, useMemo, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { ExternalLink } from 'lucide-react'
import { useTranslations } from 'next-intl'

// Components
import { ShareHeader } from './ShareHeader'
import { ViewContent } from './ViewContent'
import { ShareFooter } from './ShareFooter'
import { AuthorInfo } from './AuthorInfo'
import { ErrorState } from './ErrorState'
import LoadingMask  from '@/components/LoadingMask'

// Services
import { api } from '@/services/api'

// Types
import type { MindMapItem } from '@/models/list'
import type { PublicUserProfile } from '@/services/types'
import type { MindElixirData, Options } from 'mind-elixir'
// @ts-ignore
import nodeMenu from '@mind-elixir/node-menu-neo'

type ViewMode = 'mindmap' | 'outline' | 'split'

export function ClientWrapper({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const t = useTranslations('share')
  const [viewMode, setViewMode] = useState<ViewMode>('split')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [mapData, setMapData] = useState<MindElixirData | null>(null)
  const [mapItem, setMapItem] = useState<MindMapItem | null>(null)
  const [authorProfile, setAuthorProfile] = useState<PublicUserProfile | undefined>(undefined)

  // 获取数据
  useEffect(() => {
    async function fetchData() {
      try {
        const { id } = await params
        
        // 获取思维导图数据
        const mapRes = await api.public.getPublicMap(id)
        const mapItemData = mapRes.data
        const mapDataContent = mapRes.data.content

        setMapItem(mapItemData)
        setMapData(mapDataContent)

        // 获取作者信息
        if (mapItemData.author) {
          try {
            const authorRes = await api.public.getPublicUserProfile(mapItemData.author.toString())
            setAuthorProfile(authorRes.data)
          } catch (authorError) {
            console.error('Failed to fetch author profile:', authorError)
            // 不阻止页面加载，只是没有作者信息
          }
        }

        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch map:', error)
        setError(true)
        setLoading(false)
      }
    }

    fetchData()
  }, [params])

  // 使用useMemo缓存plugins和options，避免不必要的重新渲染
  const plugins = useMemo(() => [nodeMenu], [])
  const options = useMemo<Partial<Options>>(() => ({
    direction: 2,
    draggable: false,
    editable: false,
    contextMenu: false,
    toolBar: true,
    keypress: false,
  }), [])

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy link:', error)
    }
  }

  // 加载状态
  if (loading) {
    return <LoadingMask />
  }

  // 错误状态
  if (error) {
    return <ErrorState />
  }

  // 数据验证
  if (!mapData || !mapItem) {
    return <ErrorState />
  }

  return (
    <div className={cn(
      "min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800",
      isFullscreen && "fixed inset-0 z-50"
    )}>
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
                <AuthorInfo className='w-64' author={authorProfile} />
              )}

              {/* 思维导图相关链接 */}
              {mapItem.source && (
                <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 rounded-xl p-6 w-64">
                  <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
                    {t('relatedLinks')}
                  </h4>
                  <a
                    href={mapItem.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
                  >
                    <ExternalLink className="w-4 h-4" />
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