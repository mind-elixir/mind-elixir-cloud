'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
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
import connect from '@/connect'
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
      const res = await connect.post('/api/map', {
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

  // Check if this is being used as a card (has h-full class) or as a button
  const isCardMode = className?.includes('h-full')

  if (isCardMode) {
    // Original card layout for grid usage
    return (
      <>
        <Card
          className={cn(
            'border-2 border-dashed border-border hover:border-primary/50 bg-gradient-to-br from-muted/50 to-muted/30 hover:from-muted/70 hover:to-muted/50 cursor-pointer transition-all duration-300 group',
            className
          )}
          onClick={() => setIsModalOpen(true)}
        >
          <CardContent className="flex justify-center items-center flex-col h-full p-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors duration-200">
              <Plus className="w-8 h-8 text-primary" />
            </div>
            <div className="text-muted-foreground font-medium group-hover:text-primary transition-colors duration-200">
              {t('button.new')}
            </div>
          </CardContent>
        </Card>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{t('misc.title')}</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                type="text"
                placeholder="Enter mind map title..."
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

  // Button layout for search bar usage
  return (
    <>
      <Button
        className={cn(
          'flex items-center gap-2 whitespace-nowrap',
          className
        )}
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
          <div className="py-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              type="text"
              placeholder="Enter mind map title..."
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
