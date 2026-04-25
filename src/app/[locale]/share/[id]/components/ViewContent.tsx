'use client'

import { Brain, List } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Outliner } from 'react-outliner-neo'
import type { MindElixirData, Options } from 'mind-elixir'

// 确保MindElixirReact组件完全在客户端渲染
import { MindMap } from '@/components/ui/mindmap'
import { useTranslations } from 'next-intl'

type ViewMode = 'mindmap' | 'outline' | 'split'

interface ViewContentProps {
  viewMode: ViewMode
  mapData: MindElixirData
  plugins: any[]
  options: Partial<Options>
}

export function ViewContent({
  viewMode,
  mapData,
  plugins,
  options,
}: ViewContentProps) {
  const t = useTranslations('share')
  return (
    <div className="flex flex-col gap-4">
      {/* 思维导图视图 */}
      <Card
        className={`overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-xl ${
          viewMode !== 'mindmap' && viewMode !== 'split' ? 'hidden' : ''
        }`}
        style={{ display: viewMode === 'outline' ? 'none' : undefined }}
      >
        {viewMode === 'split' && (
          <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30">
            <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                <Brain className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </div>
              {t('mindMapView')}
            </CardTitle>
          </CardHeader>
        )}
        <CardContent className="p-0">
          <div
            className={`${
              viewMode === 'split'
                ? 'h-[calc(100vh-380px)] min-h-[500px]'
                : 'h-[calc(100vh-280px)] min-h-[600px]'
            }`}
          >
            <MindMap data={mapData} className="h-full w-full" readonly />
          </div>
        </CardContent>
      </Card>

      {/* 大纲视图 */}
      <Card
        className={`overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-xl ${
          viewMode !== 'outline' && viewMode !== 'split' ? 'hidden' : ''
        }`}
        style={{ display: viewMode === 'mindmap' ? 'none' : undefined }}
      >
        <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30">
          <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
            <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
              <List className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            </div>
            {t('mindMapOutline')}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[calc(100vh-380px)] min-h-[500px] overflow-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full dark:[&::-webkit-scrollbar-thumb]:bg-gray-600">
            <div className="border-b border-gray-100 dark:border-gray-800 px-6 py-3">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                {mapData.nodeData.topic}
              </h1>
            </div>
            <Outliner data={mapData.nodeData.children!} readonly />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
