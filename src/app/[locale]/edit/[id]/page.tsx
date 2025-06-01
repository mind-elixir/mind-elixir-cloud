'use client'

import { useEffect, useState, useRef, forwardRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import connect from '@/connect'
import { MindElixirData, Options } from 'mind-elixir'
import { MindMapItem } from '@/models/list'
import { MindElixirReactRef } from '@/components/MindElixirReact'
import toast from '@/utils/toast'
// @ts-ignore
import nodeMenu from '@mind-elixir/node-menu-neo'

// 使用条件渲染而不是动态导入来避免 ref 问题
import MindElixirReactComponent from '@/components/MindElixirReact'

const MindElixirReact = forwardRef<MindElixirReactRef, any>((props, ref) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>
  }

  return <MindElixirReactComponent {...props} ref={ref} />
})
MindElixirReact.displayName = 'MindElixirReact'

export default function MapEditPage() {
  const params = useParams()
  const router = useRouter()
  const t = useTranslations('button')
  const [mapData, setMapData] = useState<MindElixirData | undefined>(undefined)
  const [isUnsaved, setIsUnsaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [lastSavedTime, setLastSavedTime] = useState('')
  const meRef = useRef<MindElixirReactRef>(null)

  const plugins = [nodeMenu]
  const options: Partial<Options> = {
    direction: 2,
    allowUndo: true,
  }

  const mapId = params.id as string

  useEffect(() => {
    const fetchMap = async () => {
      try {
        const res = await connect.get<never, { data: MindMapItem }>(`/api/map/${mapId}`)
        setMapData(res.data.content)
      } catch (error) {
        console.error('Failed to fetch map:', error)
        router.push('/404')
      }
    }

    if (mapId) {
      fetchMap()
    }
  }, [mapId, router])

  useEffect(() => {
    const instance = meRef.current?.instance
    if (instance) {
      const handleOperation = () => {
        setIsUnsaved(true)
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

      instance.bus.addListener('operation', handleOperation)
      instance.map?.addEventListener('keydown', handleKeydown)

      return () => {
        instance.bus.removeListener('operation', handleOperation)
        instance.map?.removeEventListener('keydown', handleKeydown)
      }
    }
  }, [mapData])

  const save = async () => {
    if (saving || !isUnsaved || !meRef.current?.instance) return

    setSaving(true)
    try {
      const newData = meRef.current.instance.getData() as MindElixirData
      newData.theme = undefined

      await connect.patch(`/api/map/${mapId}`, {
        name: newData.nodeData.topic,
        content: newData,
      })

      setSaving(false)
      setIsUnsaved(false)
      setLastSavedTime(new Date().toLocaleString())
      toast.success('Saved')
    } catch (error) {
      setSaving(false)
      toast.error('Failed to save')
    }
  }

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
      <MindElixirReact
        ref={meRef}
        data={mapData}
        plugins={plugins}
        options={options}
        className="h-screen"
      />
      {isUnsaved && (
        <div className="fixed bottom-10 left-6 dark:text-gray-200">
          Unsaved
        </div>
      )}
      {lastSavedTime && (
        <div className="fixed bottom-6 left-6 dark:text-gray-200">
          Last saved time: {lastSavedTime}
        </div>
      )}
      <div className="fixed top-5 right-8 z-20">
        <button className="btn" onClick={save} disabled={saving || !isUnsaved}>
          {saving && <span className="loading loading-spinner"></span>}
          {t('save')}
        </button>
      </div>
    </>
  )
}
