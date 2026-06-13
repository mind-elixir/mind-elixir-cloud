'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { Info } from 'lucide-react'
import { openAppWithFallback } from '@mind-elixir/open-desktop'
import { Badge } from '@/components/ui/badge'

export default function AppLoginPage() {
  const t = useTranslations('misc')
  const searchParams = useSearchParams()

  const [progressWidth, setProgressWidth] = useState(0)
  const [currentStatus, setCurrentStatus] = useState(t('gettingToken'))
  const [appLink, setAppLink] = useState('')

  const updateProgress = (width: number, status: string) => {
    setProgressWidth(width)
    setCurrentStatus(status)
  }

  useEffect(() => {
    const performLogin = async () => {
      try {
        updateProgress(20, t('gettingToken'))

        const token = localStorage.getItem('auth_token')
        if (!token) {
          throw new Error('No token found in localStorage')
        }

        updateProgress(50, t('connectingApp'))
        updateProgress(80, t('verifyingIdentity'))

        const url = 'mind-elixir://login?token=' + token
        setAppLink(url)

        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
        if (isMobile) {
          window.location.href = url
        } else {
          openAppWithFallback(url)
        }

        updateProgress(100, t('loginSuccess'))

        setTimeout(() => {
          setCurrentStatus(t('completed'))
        }, 1000)
      } catch (error) {
        console.error('Login error:', error)
        updateProgress(0, t('connectionFailed'))
        setCurrentStatus(t('checkDesktopApp'))
      }
    }

    performLogin()
  }, [t, searchParams])

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
          {/* Logo and title */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-primary"
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
            <h1 className="text-2xl font-bold text-foreground mb-1">
              Mind Elixir
            </h1>
            <p className="text-muted-foreground text-sm">
              {t('appLoginTitle')}
            </p>
          </div>

          {/* Loading animation and progress */}
          <div className="space-y-6">
            {/* Spinner */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-primary/20 rounded-full animate-spin border-t-primary" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 bg-primary rounded-full animate-pulse" />
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressWidth}%` }}
              />
            </div>

            {/* Status text */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                {currentStatus}
              </p>
              {appLink && (
                <a
                  href={appLink}
                  className="text-xs text-primary hover:underline mb-2 block"
                >
                  {t('manualOpenApp')}
                </a>
              )}
              <div className="flex justify-center space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                <div
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: '0.1s' }}
                />
                <div
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                />
              </div>
            </div>

            {/* Info card */}
            <div className="bg-muted rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-foreground font-medium">
                    {t('connectingDesktop')}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t('ensureDesktopRunning')}
                  </p>
                </div>
              </div>
            </div>
          </div>
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
