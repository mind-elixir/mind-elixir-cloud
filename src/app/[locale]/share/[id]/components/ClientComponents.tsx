'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

// Components
import { ShareHeader } from './ShareHeader'
import { ViewContent } from './ViewContent'
import { ShareFooter } from './ShareFooter'
import { AuthorInfo } from './AuthorInfo'

// Types
import { MindMapItem } from '@/models/list'
import { PublicUserProfile } from '@/services/types'
import { MindElixirData, Options } from 'mind-elixir'
// @ts-ignore
import nodeMenu from '@mind-elixir/node-menu-neo'

type ViewMode = 'mindmap' | 'outline' | 'split'

export function ClientWrapper({ 
  mapData, 
  mapItem, 
  authorProfile 
}: { 
  mapData: MindElixirData, 
  mapItem: MindMapItem, 
  authorProfile?: PublicUserProfile 
}) {
  const router = useRouter()
  const [viewMode, setViewMode] = useState<ViewMode>('split')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [copied, setCopied] = useState(false)

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

  return (
    <div className={cn(
      "min-h-screen gradient-bg",
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

      {/* 头部间距 */}
      <div className="header-spacer"></div>

      {/* 主要内容区域 */}
      <div className="container mx-auto px-6 py-8">
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
            {authorProfile && (
              <div className="sticky top-24">
                <AuthorInfo className='w-64' author={authorProfile} />
              </div>
            )}
          </div>
        </div>
      </div>

      <ShareFooter onCopyLink={handleCopyLink} />
    </div>
  )
}