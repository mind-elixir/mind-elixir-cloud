'use client'

import { useTranslations } from 'next-intl'
import { LogOut } from 'lucide-react'
import { useUser } from '@/providers/UserProvider'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function LogoutButton() {
  const t = useTranslations('button')
  const { userData, logout } = useUser()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  if (!userData) return null

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 flex-shrink-0 hover:bg-slate-100">
          <div className="w-8 h-8 rounded-full ring-2 ring-slate-200 hover:ring-slate-300 transition-all duration-200 overflow-hidden">
            <img src={userData.image} alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52" sideOffset={5}>
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          {t('logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
