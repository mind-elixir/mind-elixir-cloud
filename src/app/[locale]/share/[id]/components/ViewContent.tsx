'use client'

import dynamic from 'next/dynamic'
import { Brain, List } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Outliner } from 'react-outliner-neo'
import { MindMapSkeleton } from './MindMapSkeleton'
import type { MindElixirData, Options } from 'mind-elixir'

// 确保MindElixirReact组件完全在客户端渲染
const MindElixirReact = dynamic(
  () => import('@/components/MindElixirReact'),
  {
    ssr: false,
    loading: () => <MindMapSkeleton />,
  }
)

type ViewMode = 'mindmap' | 'outline' | 'split'

interface ViewContentProps {
  viewMode: ViewMode
  mapData: MindElixirData
  plugins: any[]
  options: Partial<Options>
}

export function ViewContent({ viewMode, mapData, plugins, options }: ViewContentProps) {
  if (viewMode === 'mindmap') {
    return (
      <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 shadow-strong bg-white dark:bg-gray-900 floating-card mindmap-container">
        <CardContent className="p-0">
          <div className="h-[calc(100vh-280px)] min-h-[600px]">
            <MindElixirReact
              data={mapData}
              plugins={plugins}
              options={options}
              className="h-full w-full"
            />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (viewMode === 'outline') {
    return (
      <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 shadow-strong bg-white dark:bg-gray-900 floating-card">
        <CardHeader className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
            <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
              <List className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            </div>
            思维导图大纲
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[calc(100vh-380px)] min-h-[500px] overflow-auto custom-scrollbar">
            <Outliner data={mapData.nodeData.children!} />
          </div>
        </CardContent>
      </Card>
    )
  }

  // Split view
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 思维导图 */}
      <div className="lg:col-span-2">
        <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 shadow-strong bg-white dark:bg-gray-900 floating-card mindmap-container h-full">
          <CardHeader className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 ">
            <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                <Brain className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </div>
              思维导图视图
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[calc(100vh-380px)] min-h-[500px]">
              <MindElixirReact
                data={mapData}
                plugins={plugins}
                options={options}
                className="h-full w-full"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 大纲视图 */}
      <div className="lg:col-span-1">
        <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 shadow-strong bg-white dark:bg-gray-900 floating-card h-full">
          <CardHeader className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 ">
            <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                <List className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </div>
              大纲视图
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[calc(100vh-430px)] min-h-[450px] overflow-auto custom-scrollbar">
              <Outliner data={mapData.nodeData.children!} readonly />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
