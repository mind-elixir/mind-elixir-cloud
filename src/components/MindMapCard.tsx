'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { MindMapItem } from '@/models/list'
import { Options } from 'mind-elixir'
import { MoreVertical, Download } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

const MindElixirReact = dynamic(() => import('./MindElixirReact'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-muted animate-pulse rounded"></div>
})

interface MindMapCardProps {
  map: MindMapItem
  type: 'public' | 'private'
  className?: string
  onDelete: () => void
  onDownload: (type: string) => void
  onMakePublic: () => void
  onShare: () => void
}

export default function MindMapCard({
  map,
  type,
  className,
  onDelete,
  onDownload,
  onMakePublic,
  onShare,
}: MindMapCardProps) {
  const [showDropdown, setShowDropdown] = useState(false)

  const options: Partial<Options> = {
    direction: 2,
    draggable: false,
    editable: false,
    contextMenu: false,
    toolBar: false,
    keypress: false,
  }

  const timeFormatter = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <Card className={cn("group hover:shadow-lg transition-all duration-300 overflow-hidden", className)}>
      <div className="relative w-full aspect-video bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
        <div className="h-full w-full overflow-hidden pointer-events-none">
          <MindElixirReact
            data={map.content}
            options={options}
            initScale={0.2}
            className="h-full w-full"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-background border shadow-sm"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              {type === 'private' && (
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation()
                  onMakePublic()
                }}>
                  {map.public ? 'Make Private' : 'Make Public'}
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={(e) => {
                e.stopPropagation()
                onShare()
              }}>
                Share
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation()
                    onDownload('json')
                  }}>
                    JSON
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation()
                    onDownload('html')
                  }}>
                    HTML
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation()
                    onDownload('xmind')
                  }}>
                    XMind
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              {type === 'private' && (
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation()
                  onDelete()
                }} className="text-destructive">
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-base font-semibold overflow-hidden whitespace-nowrap text-ellipsis flex-1 group-hover:text-primary transition-colors duration-200">
            {map.name}
          </CardTitle>
          {map.public && (
            <Badge variant="secondary" className="ml-2">
              Public
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{timeFormatter(map.updatedAt || map.date)}</p>
      </CardContent>
    </Card>
  )
}
