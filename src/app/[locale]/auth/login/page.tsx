'use client'

import { useTranslations, useLocale } from 'next-intl'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function AuthLoginPage() {
  const t = useTranslations('button')

  const meLogin = () => {
    window.location.href =
      process.env.NEXT_PUBLIC_API_URL + '/oauth/authme/login?type=desktop'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-6">
            <img
              className="w-20 h-20"
              src="https://img.ssshooter.com/img/mind-elixir-desktop/icon.svg"
              alt="Mind Elixir App logo"
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={meLogin}
            variant="outline"
            className="w-full flex items-center justify-center gap-3 h-12 text-base"
          >
            {t('signin')}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
