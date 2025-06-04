import { cn } from '@/lib/utils'
import 'react-outliner-neo/style.css'
import './share-page.css'

// Components
import { ErrorState } from './components/ErrorState'
import { ClientWrapper } from './components/ClientComponents'

// Services
import { api } from '@/services/api'

// 服务端获取数据
async function getSharePageData(id: string) {
  try {
    const mapRes = await api.public.getPublicMap(id)
    const mapItem = mapRes.data
    const mapData = mapRes.data.content

    let authorProfile = undefined
    
    // 获取作者信息
    if (mapItem.author) {
      try {
        const authorRes = await api.public.getPublicUserProfile(mapItem.author.toString())
        authorProfile = authorRes.data
      } catch (authorError) {
        console.error('Failed to fetch author profile:', authorError)
        // 不阻止页面加载，只是没有作者信息
      }
    }

    return {
      mapItem,
      mapData,
      authorProfile,
    }
  } catch (error) {
    console.error('Failed to fetch map:', error)
    return { error: true }
  }
}

// 主页面组件
export default async function MapSharePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { mapItem, mapData, authorProfile, error } = await getSharePageData(id)

  if (error) {
    return <ErrorState />
  }

  if (!mapData || !mapItem) {
    return <ErrorState />
  }

  return (
    <ClientWrapper 
      mapData={mapData} 
      mapItem={mapItem} 
      authorProfile={authorProfile} 
    />
  )
}
