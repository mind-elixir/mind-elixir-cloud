// 专业加载骨架屏组件
export function PageSkeleton() {
  return (
    <div className="min-h-screen gradient-bg">
      {/* 固定头部骨架 */}
      <div className="fixed-header border-b border-gray-200/20 dark:border-gray-800/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-9 h-9 bg-gray-200 dark:bg-gray-700 rounded-xl loading-pulse"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 loading-pulse"></div>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-16 loading-pulse"></div>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32 loading-pulse"></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-48 loading-pulse"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-10 loading-pulse"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-20 loading-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 头部间距 */}
      <div className="header-spacer"></div>

      {/* 内容骨架 */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 shadow-strong">
              <div className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 p-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 loading-pulse"></div>
              </div>
              <div className="h-96 bg-gray-100 dark:bg-gray-800 loading-pulse"></div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 shadow-strong">
              <div className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 p-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24 loading-pulse"></div>
              </div>
              <div className="p-6 space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full loading-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 loading-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 loading-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 loading-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
