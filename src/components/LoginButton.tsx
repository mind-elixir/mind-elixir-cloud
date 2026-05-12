'use client'

import { useTranslations } from 'next-intl'
import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface LoginButtonProps extends ButtonProps {}

export default function LoginButton({ className, ...props }: LoginButtonProps) {
  const t = useTranslations('button')

  return (
    <Button
      onClick={() => {
        window.location.href =
          process.env.NEXT_PUBLIC_API_URL + '/oauth/authme/login'
      }}
      className={cn('flex-shrink-0 bg-slate-900 hover:bg-slate-800 text-white', className)}
      {...props}
    >
      {t('signin')}
    </Button>
  )
}

