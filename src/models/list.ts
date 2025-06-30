import { MindElixirData } from 'mind-elixir'

export interface MindMapItem {
  author: number
  content: MindElixirData
  date: string
  name: string
  origin: string
  public: boolean
  updatedAt: string
  __v: number
  _id: string
  source?: string // mostly a link
  // added by client
  clone?: MindMapItem
}

export type MindMapList = {
  data: MindMapItem[]
  page: number
  pageSize: number
  total: number
}
