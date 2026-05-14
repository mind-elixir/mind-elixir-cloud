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
import { useDebounce } from '@/hooks/useDebounce'

export default function MapListPage() {
  const t = useTranslations('list')
  const params = useParams()
  const router = useRouter()
  const [mapList, setMapList] = useState<MindMapItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchValue, setSearchValue] = useState('')
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
  const isLiked = type === 'liked'
  const debouncedSearchValue = useDebounce(searchValue, 500)

  const fetchList = async () => {
    setLoading(true)
    setIsUnauthorized(false)
    try {
      const res =
        isPublic
          ? debouncedSearchValue
            ? await api.public.getPublicMapList({
                page: pagination.page,
                pageSize: pagination.pageSize,
                name: debouncedSearchValue,
              })
            : await api.public.getRandomMapList({ size: 20 })
          : isLiked
            ? await api.mindMap.getLikedMapList({
                page: pagination.page,
                pageSize: pagination.pageSize,
              })
            : await api.mindMap.getMapList({
                page: pagination.page,
                pageSize: pagination.pageSize,
                name: debouncedSearchValue,
              })

      if (res && Array.isArray(res.data)) {
        setMapList(res.data)
        setPagination((prev) => ({
          ...prev,
          total: res.total || 0,
        }))
      } else {
        setMapList([])
        setPagination((prev) => ({
          ...prev,
          total: 0,
        }))
      }
    } catch (error: any) {
      console.error('Failed to fetch maps:', error)
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
  }, [pagination.page, debouncedSearchValue, type])

  useEffect(() => {
    setPagination((prev) => ({ ...prev, page: 1 }))
  }, [debouncedSearchValue])

  const handleSearch = (val: string) => {
    setSearchValue(val)
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
    console.log('Download:', item, type)
  }

  const showSearch = !isLiked
  const showPagination =
    pagination.total > pagination.pageSize &&
    (!isPublic || debouncedSearchValue || isLiked)

  const shareUrl = currentShareItem
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}/share/${currentShareItem._id}`
    : ''

  const renderContent = () => {
    if (isUnauthorized) {
      return (
        <div className="flex flex-col items-center justify-center py-20">
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
                type: isPublic
                  ? t('publicMaps')
                  : isLiked
                    ? t('likedMaps')
                    : t('yourMaps'),
              })}
              <br />
              {t('loginHint')}
            </p>
          </div>
        </div>
      )
    }

    if (loading) {
      return <LoadingMask className="py-20" />
    }

    if (mapList.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="rounded-lg border border-dashed border-border bg-muted/30 p-12 max-w-md w-full text-center">
            <p className="text-muted-foreground mb-4">
              {debouncedSearchValue
                ? t('noMapsFound')
                : isLiked
                  ? t('noLikedMaps')
                  : t('noMapsYet')}
            </p>
            {!isPublic && !isLiked && !debouncedSearchValue && (
              <CreateButton className="mx-auto" />
            )}
          </div>
        </div>
      )
    }

    return (
      <>
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {mapList.map((map) => (
            <Link
              key={map._id}
              href={
                isPublic || isLiked
                  ? `/${params.locale}/share/${map._id}`
                  : `/${params.locale}/edit/${map._id}`
              }
            >
              <MindMapCard
                className="h-full"
                map={map}
                type={isPublic || isLiked ? 'public' : 'private'}
                onDelete={() => deleteMap(map)}
                onDownload={(type) => download(map, type)}
                onMakePublic={() => makePublic(map)}
                onShare={() => share(map)}
              />
            </Link>
          ))}
        </div>

        {showPagination && (
          <div className="flex justify-center pt-2">
            <Pagination
              page={pagination.page}
              pageSize={pagination.pageSize}
              total={pagination.total}
              onPageChange={(page) =>
                setPagination((prev) => ({ ...prev, page }))
              }
            />
          </div>
        )}
      </>
    )
  }

  return (
    <>
      <div className="min-h-screen pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto space-y-6">
          {!isUnauthorized && (showSearch || (!isPublic && !isLiked)) && (
            <div className="flex items-center gap-3">
              {showSearch && (
                <SearchBar onSearch={handleSearch} className="flex-1" />
              )}
              {!isPublic && !isLiked && (
                <CreateButton className="flex-shrink-0 h-10" />
              )}
            </div>
          )}
          {renderContent()}
        </div>
      </div>
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
