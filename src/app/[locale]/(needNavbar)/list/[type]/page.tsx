'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { AlertCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import SearchBar from '@/components/SearchBar'
import LoadingMask from '@/components/LoadingMask'
import CreateButton from '@/components/CreateButton'
import MindMapCard from '@/components/MindMapCard'
import Pagination from '@/components/Pagination'
import ShareModal from '@/components/ShareModal'

import { api } from '@/services/api'
import { MindMapItem } from '@/models/list'
import Link from 'next/link'

export default function MapListPage() {
  const t = useTranslations('list')
  const params = useParams()
  const router = useRouter()
  const [mapList, setMapList] = useState<MindMapItem[]>([])
  const [loading, setLoading] = useState(true)
  const [keyword, setKeyword] = useState('')
  const [isUnauthorized, setIsUnauthorized] = useState(false)
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 20,
    total: 0,
  })
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [currentShareItem, setCurrentShareItem] = useState<MindMapItem | null>(
    null,
  )

  const type = params.type as string
  const isPublic = type === 'public'

  const fetchList = async () => {
    setLoading(true)
    setIsUnauthorized(false)
    try {
      const params = {
        page: pagination.page,
        pageSize: pagination.pageSize,
        keyword,
      }

      const res = isPublic
        ? await api.public.getPublicMapList(params)
        : await api.mindMap.getMapList(params)

      console.log('API Response:', res)
      console.log('Map List:', res.data)

      if (res && Array.isArray(res.data)) {
        setMapList(res.data)
        setPagination((prev) => ({
          ...prev,
          total: res.total || 0,
        }))
      } else {
        console.warn('Unexpected API response structure:', res)
        setMapList([])
        setPagination((prev) => ({
          ...prev,
          total: 0,
        }))
      }
    } catch (error: any) {
      console.error('Failed to fetch maps:', error)

      // 处理401未授权错误
      if (error.response?.status === 401) {
        setIsUnauthorized(true)
        setMapList([])
        setPagination((prev) => ({
          ...prev,
          total: 0,
        }))
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchList()
  }, [pagination.page, keyword, type])

  useEffect(() => {
    console.log('MapList updated:', mapList, 'Length:', mapList.length)
  }, [mapList])

  const handleSearch = (val: string) => {
    setKeyword(val)
    setPagination((prev) => ({ ...prev, page: 1 }))
  }

  const deleteMap = async (item: MindMapItem) => {
    if (window.confirm(t('deleteConfirm'))) {
      try {
        await api.mindMap.deleteMap(item._id)
        fetchList()
      } catch (error) {
        console.error('Failed to delete map:', error)
      }
    }
  }

  const makePublic = async (item: MindMapItem) => {
    try {
      await api.mindMap.updateMap(item._id, {
        public: !item.public,
      })
      item.public = !item.public
      setMapList([...mapList])
    } catch (error) {
      console.error('Failed to update map:', error)
    }
  }

  const share = (item: MindMapItem) => {
    setCurrentShareItem(item)
    setShareModalOpen(true)
  }

  const download = (item: MindMapItem, type: string) => {
    // TODO: Implement download functionality
    console.log('Download:', item, type)
  }

  const content = (
    <div className="min-h-screen pt-36 pb-12 px-4">
      {loading ? (
        <LoadingMask className="pt-20" />
      ) : isUnauthorized ? (
        // 未登录状态提示
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="rounded-lg border border-border bg-card p-8 max-w-md w-full text-center shadow-sm">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-muted p-3">
                  <AlertCircle className="h-6 w-6 text-muted-foreground" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {t('loginRequired')}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t('loginToView', {
                  type: isPublic ? t('publicMaps') : t('yourMaps'),
                })}
                <br />
                {t('loginHint')}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          {/* Search bar and create button container */}
          <div className="mb-10">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <SearchBar
                  onSearch={handleSearch}
                  className="max-w-none mx-0 mb-0"
                />
              </div>
              {!isPublic && (
                <div className="flex-shrink-0">
                  <CreateButton className="h-10 w-auto px-4" />
                </div>
              )}
            </div>
          </div>

          {mapList.length === 0 ? (
            // 空状态
            <div className="flex flex-col items-center justify-center py-20 px-4">
              <div className="rounded-lg border border-dashed border-border bg-muted/30 p-12 max-w-md w-full text-center">
                <p className="text-muted-foreground mb-4">
                  {keyword ? t('noMapsFound') : t('noMapsYet')}
                </p>
                {!isPublic && !keyword && <CreateButton className="mx-auto" />}
              </div>
            </div>
          ) : (
            <>
              <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-10">
                {mapList.map((map) => (
                  <Link
                    key={map._id}
                    href={`/${isPublic ? 'share' : 'edit'}/${map._id}`}
                  >
                    <MindMapCard
                      key={map._id}
                      className="h-full"
                      map={map}
                      type={isPublic ? 'public' : 'private'}
                      onDelete={() => deleteMap(map)}
                      onDownload={(type) => download(map, type)}
                      onMakePublic={() => makePublic(map)}
                      onShare={() => share(map)}
                    />
                  </Link>
                ))}
              </div>

              <div className="flex justify-center">
                <Pagination
                  page={pagination.page}
                  pageSize={pagination.pageSize}
                  total={pagination.total}
                  onPageChange={(page) =>
                    setPagination((prev) => ({ ...prev, page }))
                  }
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )

  const shareUrl = currentShareItem
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}/${params.locale}/share/${currentShareItem._id}`
    : ''

  return (
    <>
      {content}
      <ShareModal
        open={shareModalOpen}
        onOpenChange={setShareModalOpen}
        shareUrl={shareUrl}
        title={
          currentShareItem?.name
            ? t('shareTitle', { name: currentShareItem.name })
            : t('shareDefaultTitle')
        }
      />
    </>
  )
}
