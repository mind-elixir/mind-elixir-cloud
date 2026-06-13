'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function AuthLoginPage() {
  const t = useTranslations('misc')

  const meLogin = () => {
    window.location.href =
      process.env.NEXT_PUBLIC_API_URL + '/oauth/authme/login?type=desktop'
  }

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
              <div className="relative">
                <img
                  className="w-20 h-20"
                  src="https://img.ssshooter.com/img/mind-elixir-desktop/icon.svg"
                  alt="Mind Elixir App logo"
                />
                <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-xl -z-10" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-1">
              Mind Elixir
            </h1>
            <p className="text-muted-foreground text-sm">
              {t('desktopAuthDesc')}
            </p>
          </div>

          {/* Sign in button */}
          <Button
            onClick={meLogin}
            variant="default"
            size="lg"
            className="w-full text-base"
          >
            {t('desktopAuthTitle')}
          </Button>
        </div>

        {/* Footer badges */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <Badge variant="outline" className="text-xs text-muted-foreground">
            {t('secureConnection')}
          </Badge>
          <span className="text-muted-foreground text-xs">&bull;</span>
          <Badge variant="outline" className="text-xs text-muted-foreground">
            Mind Elixir App
          </Badge>
        </div>
      </div>
    </div>
  )
}
