'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Info } from 'lucide-react'
import connect from '@/connect'

export default function DesktopLoginPage() {
  const t = useTranslations('misc')
  const searchParams = useSearchParams()
  
  // 响应式状态
  const [progressWidth, setProgressWidth] = useState(0)
  const [currentStatus, setCurrentStatus] = useState(t('gettingToken'))

  // 模拟进度更新
  const updateProgress = (width: number, status: string) => {
    setProgressWidth(width)
    setCurrentStatus(status)
  }

  useEffect(() => {
    const performLogin = async () => {
      try {
        updateProgress(20, t('gettingToken'))

        const { token } = await connect.get<never, { token: string }>('token')
        console.log(token)

        updateProgress(50, t('connectingApp'))

        const port = searchParams.get('port')
        console.log(port)

        updateProgress(80, t('verifyingIdentity'))

        const response = await fetch(
          `http://127.0.0.1:${port}/login?token=${token}`,
          {
            method: 'POST',
          }
        )

        updateProgress(100, t('loginSuccess'))

        const data = await response.text()
        console.log(data)

        // 短暂延迟显示成功状态
        setTimeout(() => {
          setCurrentStatus(t('completed'))
        }, 1000)
      } catch (error) {
        console.error('登录过程中出现错误:', error)
        updateProgress(0, t('connectionFailed'))
        setCurrentStatus(t('checkDesktopApp'))
      }
    }

    performLogin()
  }, [t, searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-slate-200 dark:bg-slate-700 rounded-full opacity-10 animate-pulse" />
        <div 
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-slate-300 dark:bg-slate-600 rounded-full opacity-10 animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </div>

      {/* 主要内容卡片 */}
      <div className="relative w-full max-w-md">
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 shadow-2xl">
          <CardContent className="p-8">
            {/* Logo和标题 */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center">
                  <svg 
                    className="w-8 h-8 text-slate-600 dark:text-slate-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                    />
                  </svg>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                Mind Elixir
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                {t('loggingIn')}
              </p>
            </div>

            {/* 加载动画和进度 */}
            <div className="space-y-6">
              {/* 主要加载指示器 */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-slate-200 dark:border-slate-700 rounded-full animate-spin border-t-slate-600 dark:border-t-slate-400" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-slate-600 dark:bg-slate-400 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>

              {/* 进度条 */}
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-slate-600 to-slate-800 dark:from-slate-400 dark:to-slate-200 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressWidth}%` }}
                />
              </div>

              {/* 状态文本 */}
              <div className="text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  {currentStatus}
                </p>
                <div className="flex justify-center space-x-1">
                  <div className="w-2 h-2 bg-slate-600 dark:bg-slate-400 rounded-full animate-bounce" />
                  <div 
                    className="w-2 h-2 bg-slate-600 dark:bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  />
                  <div 
                    className="w-2 h-2 bg-slate-600 dark:bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  />
                </div>
              </div>

              {/* 提示信息 */}
              <Card className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-slate-600 dark:text-slate-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-slate-800 dark:text-slate-200 font-medium">
                        {t('connectingDesktop')}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        {t('ensureDesktopRunning')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* 底部信息 */}
        <div className="text-center mt-6">
          <div className="flex items-center justify-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
            <Badge variant="outline" className="text-xs border-slate-300 dark:border-slate-600">
              {t('secureConnection')}
            </Badge>
            <span>•</span>
            <Badge variant="outline" className="text-xs border-slate-300 dark:border-slate-600">
              {t('autoRedirect')}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
