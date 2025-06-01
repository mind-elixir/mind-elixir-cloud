'use client'

import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import DOMPurify from 'dompurify'
import type { MindElixirData, MindElixirInstance, Options } from 'mind-elixir'

interface MindElixirReactProps {
  data?: MindElixirData
  options?: Partial<Options>
  plugins?: any[]
  initScale?: number
  className?: string
  fitPage?: boolean
}

export interface MindElixirReactRef {
  instance: MindElixirInstance | null
}

const MindElixirReact = forwardRef<MindElixirReactRef, MindElixirReactProps>(
  ({ data, options, plugins, initScale, className, fitPage }, ref) => {
    const mindmapEl = useRef<HTMLDivElement>(null)
    const meInstance = useRef<MindElixirInstance | null>(null)
    const isInitialized = useRef<boolean>(false)

    useImperativeHandle(ref, () => ({
      instance: meInstance.current,
    }))

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

    // Load MindElixir dynamically and initialize
    useEffect(() => {
      if (!mindmapEl.current || typeof window === 'undefined') return

      const initializeMindElixir = async () => {
        try {
          const MindElixirModule = await import('mind-elixir')
          const MindElixir = MindElixirModule.default

          const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
          const changeTheme = (e: MediaQueryListEvent) => {
            if (e.matches) {
              meInstance.current?.changeTheme(MindElixir.DARK_THEME)
            } else {
              meInstance.current?.changeTheme(MindElixir.THEME)
            }
          }

          const mergedOptions = {
            ...(options || {}),
            el: mindmapEl.current!,
          }

          meInstance.current = new MindElixir(mergedOptions)

          // Install plugins
          if (plugins) {
            for (const plugin of plugins) {
              meInstance.current?.install(plugin)
            }
          }

          // Set initial scale
          if (initScale && meInstance.current) {
            meInstance.current.scaleVal = initScale
            meInstance.current.map.style.transform = `scale(${initScale})`
          }

          if (meInstance.current) {
            meInstance.current.map.style.opacity = '0'
          }

          mediaQuery.addEventListener('change', changeTheme)
          isInitialized.current = true

          // Initialize with data if available
          if (data && meInstance.current) {
            sanitizeNodeData(data.nodeData)
            meInstance.current.init(data)
            meInstance.current.toCenter()
            fitPage && meInstance.current.scaleFit()
            meInstance.current.map.style.opacity = '1'
          }

          // Return cleanup function
          return () => {
            mediaQuery.removeEventListener('change', changeTheme)
          }
        } catch (error) {
          console.error('Failed to load MindElixir:', error)
          return undefined
        }
      }

      let cleanup: (() => void) | undefined
      initializeMindElixir().then((cleanupFn) => {
        cleanup = cleanupFn
      })

      return () => {
        cleanup?.()
      }
    }, [options, plugins, initScale])

    useEffect(() => {
      if (!data || !meInstance.current || !isInitialized.current) return

      sanitizeNodeData(data.nodeData)
      meInstance.current.refresh(data)
      meInstance.current.toCenter()
      fitPage && meInstance.current.scaleFit()
      meInstance.current.map.style.opacity = '1'
    }, [data, fitPage])

    return <div ref={mindmapEl} className={className} />
  }
)

MindElixirReact.displayName = 'MindElixirReact'

export default MindElixirReact
