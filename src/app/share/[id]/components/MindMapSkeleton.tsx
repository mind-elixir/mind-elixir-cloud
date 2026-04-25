import { Brain } from 'lucide-react'

// 思维导图组件骨架屏
export function MindMapSkeleton() {
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
