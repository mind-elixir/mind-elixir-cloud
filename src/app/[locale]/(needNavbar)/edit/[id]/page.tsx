'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { api } from '@/services/api'
import { MindElixirData, MindElixirInstance, Options } from 'mind-elixir'
import MindElixir from 'mind-elixir'
import DOMPurify from 'dompurify'
// @ts-ignore
import nodeMenu from '@mind-elixir/node-menu-neo'
import { toast } from 'sonner'

const sanitizeNodeData = (nodeData: MindElixirData['nodeData']) => {
  if (!nodeData) return
  if (nodeData.dangerouslySetInnerHTML) {
    nodeData.dangerouslySetInnerHTML = DOMPurify.sanitize(
      nodeData.dangerouslySetInnerHTML
    )
  }
  if (nodeData.children) {
    for (const child of nodeData.children) {
      sanitizeNodeData(child)
    }
  }
}

export default function MapEditPage() {
  const params = useParams()
  const router = useRouter()
  const [mapData, setMapData] = useState<MindElixirData | undefined>(undefined)
  const [isUnsaved, setIsUnsaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [lastSavedTime, setLastSavedTime] = useState('')
  const mindmapEl = useRef<HTMLDivElement>(null)
  const meInstance = useRef<MindElixirInstance | null>(null)

  const plugins = [nodeMenu]
  const options: Partial<Options> = {
    direction: 2,
    allowUndo: true,
  }

  const mapId = params.id as string

  
  // Load MindElixir dynamically and initialize
  useEffect(() => {
    if (!mindmapEl.current || typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const changeTheme = (e: MediaQueryListEvent) => {
      if (e.matches) {
        meInstance.current?.changeTheme(MindElixir.DARK_THEME)
      } else {
        meInstance.current?.changeTheme(MindElixir.THEME)
      }
    }
    mediaQuery.addEventListener('change', changeTheme)

    const mergedOptions = {
      ...options,
      el: mindmapEl.current!,
    }

    meInstance.current = new MindElixir(mergedOptions)

    // Install plugins
    if (plugins) {
      for (const plugin of plugins) {
        meInstance.current?.install(plugin)
      }
    }

    if (mapData) {
      sanitizeNodeData(mapData.nodeData)
      meInstance.current.init(mapData)
    } else {
      meInstance.current.init(MindElixir.new('Loading...'))
    }

    // Initialize with data if available
    // Setup save functionality
    const save = async () => {
      // if (saving || !isUnsaved) return
      setSaving(true)
      const newData = meInstance.current?.getData() as MindElixirData
      newData.theme = undefined
      // debugger
      await api.mindMap.updateMap(mapId, {
        name: newData.nodeData.topic,
        content: newData,
      })

      setSaving(false)
      setIsUnsaved(false)
      setLastSavedTime(new Date().toLocaleString())
      toast.success('Saved')
    }

    const handleKeydown = (e: KeyboardEvent) => {
      e.preventDefault()
      if (e.target !== e.currentTarget) {
        return
      }
      if (e.ctrlKey && e.key === 's') {
        save()
      }
    }
    const handleOperation = () => {
      setIsUnsaved(true)
    }
    meInstance.current.map?.addEventListener('keydown', handleKeydown)
    meInstance.current.bus.addListener('operation', handleOperation)
    meInstance.current.bus.addListener('expandNode', handleOperation)

    // Return cleanup function
    return () => {
      meInstance.current?.bus.removeListener('operation', handleOperation)
      meInstance.current?.bus.removeListener('expandNode', handleOperation)
      meInstance.current?.map?.removeEventListener('keydown', handleKeydown)
    }
  }, [])

  useEffect(() => {
    if (!mapData || !meInstance.current) return
    sanitizeNodeData(mapData.nodeData)
    if(!meInstance.current.selection) return
    meInstance.current.refresh(mapData)
    meInstance.current.toCenter()
    meInstance.current.map.style.opacity = '1'
  }, [mapData])

  useEffect(() => {
    const fetchMap = async () => {
      try {
        const res = await api.mindMap.getMap(mapId)
        setMapData(res.data.content)
      } catch (error) {
        console.error('Failed to fetch map:', error)
        router.push('/404')
      }
    }

    if (mapId) {
      fetchMap()
    }
  }, [mapId])

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isUnsaved) {
        e.preventDefault()
        e.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isUnsaved])
  return (
    <>
      <div ref={mindmapEl} className="h-screen" tabIndex={0} />
      {isUnsaved && (
        <div className="fixed bottom-10 left-6 dark:text-gray-200">Unsaved</div>
      )}
      {lastSavedTime && (
        <div className="fixed bottom-6 left-6 dark:text-gray-200">
          Last saved time: {lastSavedTime}
        </div>
      )}
    </>
  )
}
