'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SiGithub, SiGoogle, SiLinux } from 'react-icons/si'

export default function LoginButton() {
  const t = useTranslations('button')
  const locale = useLocale()

  const githubLogin = () => {
    window.location.href =
      process.env.NEXT_PUBLIC_API_URL + '/oauth/github/login'
  }

  const googleLogin = () => {
    window.location.href =
      process.env.NEXT_PUBLIC_API_URL + '/oauth/google/login'
  }

  const linuxDoLogin = () => {
    window.location.href =
      process.env.NEXT_PUBLIC_API_URL + '/oauth/linuxdo/login'
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button className="flex-shrink-0 bg-slate-900 hover:bg-slate-800 text-white">
          {t('signin')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56" sideOffset={5}>
        <DropdownMenuItem onClick={githubLogin} className="cursor-pointer">
          <SiGithub className="mr-2 h-4 w-4" />
          {t('signinWithGitHub')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={googleLogin} className="cursor-pointer">
          <SiGoogle className="mr-2 h-4 w-4" />
          {t('signinWithGoogle')}
        </DropdownMenuItem>
        {locale === 'cn' && (
          <DropdownMenuItem onClick={linuxDoLogin} className="cursor-pointer">
            <SiLinux className="mr-2 h-4 w-4" />
            {t('signinWithLinuxDo')}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
