'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { ExternalLink, Plus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { api } from '@/services/api'
import toast from '@/utils/toast'
import MindElixir from 'mind-elixir'
interface CreateButtonProps {
  className?: string
}

export default function CreateButton({ className }: CreateButtonProps) {
  const t = useTranslations()
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [creating, setCreating] = useState(false)

  const handleCreate = async () => {
    if (!title.trim()) return

    setCreating(true)
    try {
      const res = await api.mindMap.createMap({
        name: title,
        content: MindElixir.new(title),
      })
      setIsModalOpen(false)
      setTitle('')
      router.push(`/edit/${res.data._id}`)
    } catch (error) {
      console.error('Failed to create map:', error)
      toast.error('Failed to create map')
    } finally {
      setCreating(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreate()
    }
  }

  // Button layout for search bar usage
  return (
    <>
      <Button
        className={cn('flex items-center gap-2 whitespace-nowrap', className)}
        onClick={() => setIsModalOpen(true)}
      >
        <Plus className="w-4 h-4" />
        {t('button.new')}
      </Button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('misc.title')}</DialogTitle>
          </DialogHeader>
          <div>{t('create.desktopRecommendation')}</div>
          <div className="flex items-center gap-2 text-blue-500">
            <a
              href="https://desktop.mind-elixir.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('create.desktopApp')}
            </a>
            <a
              href="https://desktop.mind-elixir.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <div className="py-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              type="text"
              placeholder={t('create.titlePlaceholder')}
              autoFocus
            />
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              disabled={creating}
            >
              {t('misc.cancel')}
            </Button>
            <Button onClick={handleCreate} disabled={!title.trim() || creating}>
              {creating && (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
              )}
              {t('misc.create')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
