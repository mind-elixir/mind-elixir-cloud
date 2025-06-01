'use client'

import { useState } from 'react'
import { Brain } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import '../[id]/share-page.css'

// 思维导图组件骨架屏
function MindMapSkeleton() {
  return (
    <div className="h-full w-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center relative overflow-hidden">
      {/* 模拟思维导图结构的骨架 */}
      <div className="relative">
        {/* 中心节点 */}
        <div className="w-32 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-8 loading-pulse flex items-center justify-center">
          <Brain className="w-6 h-6 text-gray-400" />
        </div>
        
        {/* 分支节点 */}
        <div className="flex items-center justify-center space-x-16">
          {/* 左侧分支 */}
          <div className="space-y-4">
            <div className="w-24 h-10 bg-gray-200 dark:bg-gray-700 rounded loading-pulse"></div>
            <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded loading-pulse ml-4"></div>
            <div className="w-28 h-10 bg-gray-200 dark:bg-gray-700 rounded loading-pulse"></div>
          </div>
          
          {/* 右侧分支 */}
          <div className="space-y-4">
            <div className="w-26 h-10 bg-gray-200 dark:bg-gray-700 rounded loading-pulse"></div>
            <div className="w-22 h-8 bg-gray-200 dark:bg-gray-700 rounded loading-pulse mr-4"></div>
            <div className="w-24 h-10 bg-gray-200 dark:bg-gray-700 rounded loading-pulse"></div>
          </div>
        </div>
        
        {/* 连接线骨架 */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-2 h-16 bg-gray-300 dark:bg-gray-600 loading-pulse"></div>
        </div>
        <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2">
          <div className="w-16 h-1 bg-gray-300 dark:bg-gray-600 loading-pulse"></div>
        </div>
        <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2">
          <div className="w-16 h-1 bg-gray-300 dark:bg-gray-600 loading-pulse"></div>
        </div>
      </div>
      
      {/* 加载提示 */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
          <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full loading-pulse"></div>
          <span className="text-sm">加载思维导图中...</span>
        </div>
      </div>
    </div>
  )
}

export default function SkeletonTestPage() {
  const [showSkeleton, setShowSkeleton] = useState(true)

  return (
    <div className="min-h-screen gradient-bg p-8">
      <div className="container mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold mb-4">骨架屏测试页面</h1>
          <Button 
            onClick={() => setShowSkeleton(!showSkeleton)}
            className="mb-4"
          >
            {showSkeleton ? '隐藏骨架屏' : '显示骨架屏'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 思维导图区域 */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 shadow-strong bg-white dark:bg-gray-900">
              <CardHeader className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                    <Brain className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                  </div>
                  思维导图视图
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-96">
                  {showSkeleton ? (
                    <MindMapSkeleton />
                  ) : (
                    <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                      <div className="text-center text-gray-500 dark:text-gray-400">
                        <Brain className="w-12 h-12 mx-auto mb-2" />
                        <p>这里是实际的思维导图内容</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 大纲区域 */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 shadow-strong bg-white dark:bg-gray-900">
              <CardHeader className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  大纲视图
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {showSkeleton ? (
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full loading-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 loading-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 loading-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 loading-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 loading-pulse"></div>
                  </div>
                ) : (
                  <div className="text-gray-500 dark:text-gray-400">
                    <p>• 主要分支 1</p>
                    <p className="ml-4">• 子分支 1.1</p>
                    <p className="ml-4">• 子分支 1.2</p>
                    <p>• 主要分支 2</p>
                    <p className="ml-4">• 子分支 2.1</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
