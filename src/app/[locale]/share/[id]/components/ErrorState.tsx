interface ErrorStateProps {
  title?: string
  message?: string
}

export function ErrorState({ 
  title = "思维导图未找到", 
  message = "请检查链接是否正确" 
}: ErrorStateProps) {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg">
      <div className="text-center border-gray-200/20 dark:border-gray-800/20 p-8 rounded-2xl shadow-strong">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 gradient-text">
          {title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">{message}</p>
      </div>
    </div>
  )
}
