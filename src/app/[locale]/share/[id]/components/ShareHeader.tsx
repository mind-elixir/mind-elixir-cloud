import { 
  Brain, 
  List, 
  Maximize2, 
  Minimize2, 
  Calendar, 
  Eye, 
  Copy, 
  Check 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { MindMapItem } from '@/models/list'

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
  onCopyLink
}: ShareHeaderProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="fixed-header border-b border-gray-200/20 dark:border-gray-800/20 glass-effect">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* 标题和元信息 */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 shadow-soft">
                <Brain className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </div>
              <h1 className="text-xl lg:text-2xl font-semibold gradient-text">
                {mapItem.name}
              </h1>
              {mapItem.public && (
                <Badge variant="secondary" className="status-badge bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  <Eye className="w-3 h-3 mr-1" />
                  公开
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>更新于 {formatDate(mapItem.updatedAt || mapItem.date)}</span>
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex items-center gap-3 mobile-stack mobile-full-width">
            {/* 视图切换 */}
            <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-lg p-0.5 shadow-soft border border-gray-200 dark:border-gray-700">
              <Button
                variant={viewMode === 'mindmap' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('mindmap')}
                className={cn(
                  "h-8 px-3 text-xs font-medium btn-hover",
                  viewMode === 'mindmap'
                    ? "bg-white dark:bg-gray-700 shadow-soft text-gray-900 dark:text-gray-100"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                )}
              >
                <Brain className="w-3.5 h-3.5 mr-1.5" />
                思维导图
              </Button>
              <Button
                variant={viewMode === 'outline' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('outline')}
                className={cn(
                  "h-8 px-3 text-xs font-medium btn-hover",
                  viewMode === 'outline'
                    ? "bg-white dark:bg-gray-700 shadow-soft text-gray-900 dark:text-gray-100"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                )}
              >
                <List className="w-3.5 h-3.5 mr-1.5" />
                大纲
              </Button>
              <Button
                variant={viewMode === 'split' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('split')}
                className={cn(
                  "h-8 px-3 text-xs font-medium btn-hover",
                  viewMode === 'split'
                    ? "bg-white dark:bg-gray-700 shadow-soft text-gray-900 dark:text-gray-100"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                )}
              >
                分屏
              </Button>
            </div>

            {/* 全屏切换 */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="h-8 px-3 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 btn-hover shadow-soft"
            >
              {isFullscreen ? (
                <Minimize2 className="w-3.5 h-3.5" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5" />
              )}
            </Button>

            {/* 分享按钮 */}
            <Button
              variant="outline"
              size="sm"
              onClick={onCopyLink}
              className="h-8 px-3 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 btn-hover shadow-soft"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5 mr-1.5" />
              )}
              <span className="text-xs font-medium">{copied ? '已复制' : '复制链接'}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
