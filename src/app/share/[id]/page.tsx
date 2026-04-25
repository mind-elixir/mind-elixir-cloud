import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { serverApi } from '@/services/api.server'
import { setRequestLocale } from 'next-intl/server'
import { ClientWrapper } from './components/ClientComponents'
import { generateI18nAlternates } from '@/lib/metadata'
import type { MindElixirData } from 'mind-elixir'
import type { MindMapItem } from '@/models/list'
import type { PublicUserProfile } from '@/services/types'

// Enable ISR with 1 day revalidation
export const revalidate = 86400

// Enable fallback for non-pre-generated pages
export const dynamicParams = true

/**
 * Cached function to fetch author profile - shared across all pages during build
 *
 * unstable_cache 特性说明：
 *
 * 1. 跨请求缓存：与 React cache 不同，unstable_cache 的缓存会持久化到 Next.js 数据缓存层
 *    - React cache: 仅在单次请求/渲染中有效
 *    - unstable_cache: 跨多个页面构建、多次请求都有效
 *
 * 2. 缓存键生成：基于函数参数自动生成
 *    - 相同的 authorId 会命中同一个缓存
 *    - 例如：authorId="123" 在构建50个页面时只会调用一次API
 *
 * 3. 缓存生命周期：
 *    - 构建时：缓存在整个构建过程中共享
 *    - 运行时：缓存持久化到文件系统（.next/cache）
 *    - 失效时间：86400秒（1天）后自动重新验证
 *
 * 4. 使用场景：
 *    - 适合：跨多个页面共享的数据（如用户信息、分类列表）
 *    - 不适合：每个页面独有的数据（如思维导图内容本身）
 *
 * 5. 注意事项：
 *    - API 标记为 unstable，未来可能变更
 *    - 缓存键需要唯一，避免冲突
 *    - 可通过 tags 批量清除缓存（revalidateTag('author-profile')）
 */
const getAuthorProfile = unstable_cache(
  async (authorId: string) => {
    try {
      const authorRes = await serverApi.public.getPublicUserProfile(authorId)
      return authorRes.data
    } catch (error) {
      console.error('Failed to fetch author profile:', error)
      return undefined
    }
  },
  ['author-profile'], // 缓存键前缀，与参数组合生成完整缓存键：author-profile-{authorId}
  {
    revalidate: 86400, // 缓存失效时间（秒），与页面的 revalidate 保持一致
    tags: ['author-profile'], // 缓存标签，用于批量清除缓存
  },
)

// Fetch map data with cached author profile
const getMapData = async (id: string) => {
  const mapRes = await serverApi.public.getPublicMap(id)
  const mapItem: MindMapItem = mapRes.data
  const mapData: MindElixirData = mapRes.data.content

  let authorProfile: PublicUserProfile | undefined = undefined
  if (mapItem.author) {
    authorProfile = await getAuthorProfile(mapItem.author.toString())
  }

  return { mapItem, mapData, authorProfile }
}

// Generate dynamic metadata for SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params
  const locale = 'en' // Default locale for share pages without URL segment

  try {
    const { mapItem, authorProfile } = await getMapData(id)

    const authorName =
      authorProfile?.displayName || authorProfile?.name || 'Mind Elixir User'
    const title = `${mapItem.name} - Mind Elixir`
    const description = `Explore "${mapItem.name}" mind map created by ${authorName}. Interactive mind mapping tool for organizing thoughts and ideas.`
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || 'https://cloud.mind-elixir.com'
    const currentUrl = `${baseUrl}/share/${id}`

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: currentUrl,
        siteName: 'Mind Elixir',
        type: 'website',
        images: [
          {
            url: '/og-image.png',
            width: 1200,
            height: 630,
            alt: mapItem.name,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: ['/og-image.png'],
      },
      alternates: {
        canonical: currentUrl,
      },
    }
  } catch (error) {
    console.error('Failed to generate metadata:', error)
    return {
      title: 'Mind Map - Mind Elixir',
      description:
        'Interactive mind mapping tool for organizing thoughts and ideas.',
    }
  }
}

// Pre-generate top 50 mind maps at build time
export async function generateStaticParams() {
  try {
    // Fetch top 50 public mind maps
    const response = await serverApi.public.getPublicMapList({
      page: 1,
      pageSize: 50,
    })

    return response.data.map((map: MindMapItem) => ({
      id: map._id,
    }))
  } catch (error) {
    console.error('Failed to fetch maps for static generation:', error)
    return []
  }
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function MapSharePage({ params }: PageProps) {
  const { id } = await params
  const locale = 'en'
  setRequestLocale(locale)

  try {
    const { mapItem, mapData, authorProfile } = await getMapData(id)

    return (
      <ClientWrapper
        mapData={mapData}
        mapItem={mapItem}
        authorProfile={authorProfile}
      />
    )
  } catch (error) {
    console.error('Failed to fetch map:', error)
    notFound()
  }
}
