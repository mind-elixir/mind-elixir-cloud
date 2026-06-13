'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function LoginPage() {
  const t = useTranslations('misc')
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading',
  )
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
        localStorage.setItem('auth_token', token)

        if (type === 'desktop') {
          const port = searchParams.get('port')
          const desktopUrl = port ? `/app-login?port=${port}` : '/app-login'
          router.push(desktopUrl)
          return
        }
        setStatus('success')
        setMessage(t('redirectingToHome'))

        setTimeout(() => {
          router.push('/')
        }, 1000)
      } catch (error) {
        console.error('Login failed:', error)
        setStatus('error')
        setMessage(t('checkDesktopApp'))
        localStorage.removeItem('auth_token')
      }
    }

    handleTokenLogin()
  }, [searchParams, router, t])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 relative overflow-hidden">
      {/* Aurora background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Frosted glass card */}
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl shadow-lg p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img
                className="w-16 h-16"
                src="https://img.ssshooter.com/img/mind-elixir-desktop/icon.svg"
                alt="Mind Elixir logo"
              />
            </div>
            <h1 className="text-xl font-semibold text-foreground">Mind Elixir</h1>
          </div>

          {/* Status icon */}
          <div className="flex justify-center mb-6">
            {status === 'loading' && (
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                </div>
                <div className="absolute inset-0 rounded-full bg-primary/5 animate-ping" />
              </div>
            )}
            {status === 'success' && (
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            )}
            {status === 'error' && (
              <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
                <XCircle className="h-8 w-8 text-destructive" />
              </div>
            )}
          </div>

          {/* Status text */}
          <div className="text-center space-y-2">
            <h2 className="text-lg font-medium text-foreground">
              {status === 'loading' && t('loggingIn')}
              {status === 'success' && t('loginSuccess')}
              {status === 'error' && t('connectionFailed')}
            </h2>
            {message && (
              <p className="text-sm text-muted-foreground">{message}</p>
            )}
          </div>

          {/* Error action */}
          {status === 'error' && (
            <div className="mt-6 flex justify-center">
              <Button onClick={() => router.push('/')} variant="default">
                {t('ok')}
              </Button>
            </div>
          )}
        </div>

        {/* Footer badges */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <Badge variant="outline" className="text-xs text-muted-foreground">
            {t('secureConnection')}
          </Badge>
          <span className="text-muted-foreground text-xs">&bull;</span>
          <Badge variant="outline" className="text-xs text-muted-foreground">
            {t('autoRedirect')}
          </Badge>
        </div>
      </div>
    </div>
  )
}
