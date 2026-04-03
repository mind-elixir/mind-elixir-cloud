'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'

export default function LoginButton() {
  const t = useTranslations('button')

  return (
    <Button
      onClick={() => {
        window.location.href =
          process.env.NEXT_PUBLIC_API_URL + '/oauth/authme/login'
      }}
      className="flex-shrink-0 bg-slate-900 hover:bg-slate-800 text-white"
    >
      {t('signin')}
    </Button>
  )
}
