'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useUser } from '@/providers/UserProvider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'

export default function LoginPage() {
  const t = useTranslations('misc')
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const handleTokenLogin = async () => {
      const token = searchParams.get('token')
      const type = searchParams.get('type')
      
      if (!token) {
        setStatus('error')
        setMessage(t('connectionFailed'))
        return
      }

      try {
        // 将token存储到localStorage
        localStorage.setItem('auth_token', token)
        
        // 如果是桌面登录类型，跳转到desktop-login页面
        if (type === 'desktop') {
          const port = searchParams.get('port')
          const desktopUrl = port ? `/desktop-login?port=${port}` : '/desktop-login'
          router.push(desktopUrl)
          return
        }        
        setStatus('success')
        setMessage(t('loginSuccess'))
        
        // 延迟跳转到首页
        setTimeout(() => {
          router.push('/')
        }, 1000)
      } catch (error) {
        console.error('Login failed:', error)
        setStatus('error')
        setMessage(t('checkDesktopApp'))
        
        // 清除无效token
        localStorage.removeItem('auth_token')
      }
    }

    handleTokenLogin()
  }, [searchParams, router, t])

  const getIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      case 'success':
        return <CheckCircle className="h-8 w-8 text-green-500" />
      case 'error':
        return <XCircle className="h-8 w-8 text-red-500" />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'loading':
        return 'text-blue-600'
      case 'success':
        return 'text-green-600'
      case 'error':
        return 'text-red-600'
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {getIcon()}
          </div>
          <CardTitle className={`text-xl ${getStatusColor()}`}>
            {status === 'loading' && t('loggingIn')}
            {status === 'success' && t('loginSuccess')}
            {status === 'error' && t('connectionFailed')}
          </CardTitle>
          <CardDescription>
            {message}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {status === 'error' && (
            <div className="text-center">
              <button
                onClick={() => router.push('/')}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                {t('ok')}
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}