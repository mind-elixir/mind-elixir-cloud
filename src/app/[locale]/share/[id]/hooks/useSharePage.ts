import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { api } from '@/services/api'
import { MindElixirData, Options } from 'mind-elixir'
import { MindMapItem } from '@/models/list'
// @ts-ignore
import nodeMenu from '@mind-elixir/node-menu-neo'

type ViewMode = 'mindmap' | 'outline' | 'split'

export function useSharePage() {
  const params = useParams()
  const router = useRouter()
  const [mapData, setMapData] = useState<MindElixirData | undefined>(undefined)
  const [mapItem, setMapItem] = useState<MindMapItem | undefined>(undefined)
  const [viewMode, setViewMode] = useState<ViewMode>('split')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)

  const plugins = [nodeMenu]
  const options: Partial<Options> = {
    direction: 2,
    draggable: false,
    editable: false,
    contextMenu: false,
    toolBar: true,
    keypress: false,
  }

  const mapId = params.id as string

  useEffect(() => {
    const fetchMap = async () => {
      try {
        setLoading(true)
        const res = await api.public.getPublicMap(mapId)
        setMapItem(res.data)
        setMapData(res.data.content)
      } catch (error) {
        console.error('Failed to fetch map:', error)
        router.push('/404')
      } finally {
        setLoading(false)
      }
    }

    if (mapId) {
      fetchMap()
    }
  }, [mapId, router])

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy link:', error)
    }
  }

  return {
    mapData,
    mapItem,
    viewMode,
    setViewMode,
    isFullscreen,
    setIsFullscreen,
    copied,
    loading,
    plugins,
    options,
    handleCopyLink,
  }
}
