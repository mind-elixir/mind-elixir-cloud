'use client'

import { useShareLocale } from './ShareLocaleProvider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Languages } from 'lucide-react'

export function LanguageSelector() {
  const { locale, setLocale } = useShareLocale()

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'cn', label: '简体中文' },
    { value: 'ja', label: '日本語' },
  ]

  return (
    <div className="flex items-center gap-2">
      <Select value={locale} onValueChange={(val: any) => setLocale(val)}>
        <SelectTrigger className="h-7 w-[90px] lg:h-8 lg:w-[110px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-xs">
          <Languages className="w-3 h-3 lg:w-3.5 lg:h-3.5 mr-1 lg:mr-1.5 text-gray-500" />
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.value} value={lang.value} className="text-xs">
              {lang.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
