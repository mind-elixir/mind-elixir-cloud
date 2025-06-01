'use client'

import { cn } from '@/lib/utils'
import 'react-outliner-neo/style.css'
import './share-page.css'

// Components
import { PageSkeleton } from './components/PageSkeleton'
import { ErrorState } from './components/ErrorState'
import { ShareHeader } from './components/ShareHeader'
import { ViewContent } from './components/ViewContent'
import { ShareFooter } from './components/ShareFooter'

// Hooks
import { useSharePage } from './hooks/useSharePage'

export default function MapSharePage() {
  const {
    mapData,
    mapItem,
    viewMode,
    setViewMode,
    isFullscreen,
    setIsFullscreen,
    copied,
    loading,
    plugins,
    options,
    handleCopyLink,
  } = useSharePage()

  if (loading) {
    return <PageSkeleton />
  }

  if (!mapData || !mapItem) {
    return <ErrorState />
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
        <ViewContent
          viewMode={viewMode}
          mapData={mapData}
          plugins={plugins}
          options={options}
        />
      </div>

      <ShareFooter onCopyLink={handleCopyLink} />
    </div>
  )
}
