'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  onSearch: (value: string) => void
  className?: string
}

export default function SearchBar({ onSearch, className }: SearchBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value)
  }

  return (
    <div className={cn("max-w-lg mx-auto mb-8", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-10"
          type="text"
          id="search"
          placeholder="Search mind maps..."
          onChange={handleChange}
        />
      </div>
    </div>
  )
}
