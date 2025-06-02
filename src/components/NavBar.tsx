'use client'

import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, Globe } from 'lucide-react'
import { useUser } from '@/providers/UserProvider'
import LoginButton from '@/components/LoginButton'
import LogoutButton from '@/components/LogoutButton'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

interface NavBarProps {
  className?: string
}

export default function NavBar({ className }: NavBarProps) {
  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const { userData } = useUser()

  const availableLocales = ['en', 'cn', 'ja']

  const changeLocale = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <nav className={cn("flex items-center justify-between p-4 bg-background/95 backdrop-blur-sm border border-border rounded-lg shadow-sm", className)}>
      {/* Mobile menu */}
      <div className="lg:hidden flex-shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-slate-100 hover:text-slate-900">
              <Menu className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-52">
            <DropdownMenuItem asChild>
              <Link href="/list/public">{t('menu.public')}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/list/map">{t('menu.folder')}</Link>
            </DropdownMenuItem>
            {/* TODO: add like page */}
            {/* <DropdownMenuItem asChild>
              <Link href="/about">{t('menu.about')}</Link>
            </DropdownMenuItem> */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Globe className="mr-2 h-4 w-4" />
                i18n
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {availableLocales.map((localeOption) => (
                  <DropdownMenuItem
                    key={localeOption}
                    onClick={() => changeLocale(localeOption)}
                  >
                    {localeOption}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Logo */}
      <Link href="/" className="flex items-center space-x-2 text-xl font-semibold flex-shrink-0">
        <Image src="/logo2.png" alt="Logo" width={32} height={32} />
        <span className="hidden sm:inline">Mind Elixir</span>
      </Link>

      {/* Desktop navigation */}
      <div className="hidden lg:flex">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/list/public" className={cn(navigationMenuTriggerStyle(), "hover:bg-slate-100 hover:text-slate-900")}>
                  {t('menu.public')}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/list/map" className={cn(navigationMenuTriggerStyle(), "hover:bg-slate-100 hover:text-slate-900")}>
                  {t('menu.folder')}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-10 px-4 py-2 hover:bg-slate-100 hover:text-slate-900">
                    <Globe className="mr-2 h-4 w-4" />
                    i18n
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {availableLocales.map((localeOption) => (
                    <DropdownMenuItem
                      key={localeOption}
                      onClick={() => changeLocale(localeOption)}
                    >
                      {localeOption}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Right side - Auth buttons */}
      <div className="flex items-center justify-end space-x-2 flex-shrink-0 min-w-[120px]">
        {userData ? <LogoutButton /> : <LoginButton />}
      </div>
    </nav>
  )
}
