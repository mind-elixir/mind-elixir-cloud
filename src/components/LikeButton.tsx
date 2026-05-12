'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUser } from '@/providers/UserProvider'
import { api } from '@/services/api'

interface LikeButtonProps {
  mapId: string
  initialLiked?: boolean
  initialCount?: number
  className?: string
}

export default function LikeButton({ mapId, initialLiked = false, initialCount = 0, className }: LikeButtonProps) {
  const { userData } = useUser()
  const [liked, setLiked] = useState(initialLiked)
  const [count, setCount] = useState(initialCount)
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    if (!userData) {
      // 未登录跳转登录
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7001'}/oauth/authme/login`
      return
    }
    if (loading) return

    // 乐观更新
    const prevLiked = liked
    const prevCount = count
    setLiked(!liked)
    setCount(liked ? count - 1 : count + 1)
    setLoading(true)

    try {
      const res = await api.public.toggleLike(mapId)
      setLiked(res.liked)
      setCount(res.likeCount)
    } catch {
      // 回滚
      setLiked(prevLiked)
      setCount(prevCount)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'flex items-center gap-1.5 text-sm transition-colors duration-200',
        liked ? 'text-red-500' : 'text-muted-foreground hover:text-red-400',
        className,
      )}
    >
      <Heart className={cn('w-4 h-4', liked && 'fill-current')} />
      {count > 0 && <span>{count}</span>}
    </button>
  )
}
