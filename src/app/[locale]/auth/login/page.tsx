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
import { SiGithub, SiGoogle, SiLinux } from 'react-icons/si'
import { LinuxDoLogo } from '@/components/icon/linuxdo-logo'

export default function AuthLoginPage() {
  const t = useTranslations('button')
  const titleT = useTranslations('title')
  const authT = useTranslations('auth')
  const locale = useLocale()

  const githubLogin = () => {
    window.location.href =
      process.env.NEXT_PUBLIC_API_URL + '/oauth/github/login?type=desktop'
  }

  const googleLogin = () => {
    window.location.href =
      process.env.NEXT_PUBLIC_API_URL + '/oauth/google/login?type=desktop'
  }

  const linuxDoLogin = () => {
    window.location.href =
      process.env.NEXT_PUBLIC_API_URL + '/oauth/linuxdo/login?type=desktop'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-6">
            <img
              className="w-20 h-20"
              src="https://img.ssshooter.com/img/mind-elixir-desktop/icon.svg"
              alt="Mind Elixir Desktop logo"
            />
          </div>
          <CardTitle className="text-2xl font-bold">
            {titleT('signinWith')}
          </CardTitle>
          <CardDescription>{authT('loginPageDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={githubLogin}
            variant="outline"
            className="w-full flex items-center justify-center gap-3 h-12 text-base"
          >
            <SiGithub className="h-5 w-5" />
            {t('signinWithGitHub')}
          </Button>

          <Button
            onClick={googleLogin}
            variant="outline"
            className="w-full flex items-center justify-center gap-3 h-12 text-base"
          >
            <SiGoogle className="h-5 w-5" />
            {t('signinWithGoogle')}
          </Button>

          <Button
            onClick={linuxDoLogin}
            variant="outline"
            className="w-full flex items-center justify-center gap-3 h-12 text-base"
          >
            <LinuxDoLogo className="h-5 w-5" />
            {t('signinWithLinuxDo')}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
