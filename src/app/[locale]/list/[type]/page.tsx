'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useUser } from '@/providers/UserProvider'
import SearchBar from '@/components/SearchBar'
import LoadingMask from '@/components/LoadingMask'
import CreateButton from '@/components/CreateButton'
import MindMapCard from '@/components/MindMapCard'
import Pagination from '@/components/Pagination'
import ConfirmModal from '@/components/ConfirmModal'
import ShareModal from '@/components/ShareModal'

import connect from '@/connect'
import { MindMapItem, MindMapList } from '@/models/list'
import Link from 'next/link'

export default function MapListPage() {
  const params = useParams()
  const t = useTranslations()
  const { userData } = useUser()
  const [mapList, setMapList] = useState<MindMapItem[]>([])
  const [loading, setLoading] = useState(true)
  const [keyword, setKeyword] = useState('')
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 20,
    total: 0,
  })
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [currentShareItem, setCurrentShareItem] = useState<MindMapItem | null>(null)

  const type = params.type as string
  const isPublic = type === 'public'

  const fetchList = async () => {
    setLoading(true)
    try {
      const endpoint = isPublic ? '/api/public' : '/api/map'
      const res = await connect.get<
        never,
        MindMapList
      >(endpoint, {
        params: {
          page: pagination.page,
          pageSize: pagination.pageSize,
          keyword,
        },
      })
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
    } catch (error) {
      console.error('Failed to fetch maps:', error)
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
    if (window.confirm('Are you sure to delete this map?')) {
      try {
        await connect.delete(`/api/map/${item._id}`)
        fetchList()
      } catch (error) {
        console.error('Failed to delete map:', error)
      }
    }
  }

  const makePublic = async (item: MindMapItem) => {
    try {
      await connect.patch(`/api/map/${item._id}`, {
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
    <div className="mt-28">
      {/* Search bar and create button container */}
      <div className="max-w-6xl mx-auto mb-8 px-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <SearchBar onSearch={handleSearch} className="max-w-none mx-0 mb-0" />
          </div>
          {!isPublic && (
            <div className="flex-shrink-0">
              <CreateButton className="h-10 w-auto px-4" />
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <LoadingMask className="pt-20" />
      ) : (
        <div>
          {/* <div className="text-center mb-4">
            <p>User Data: {userData ? 'Logged in' : 'Not logged in'}</p>
            <p>Is Public: {isPublic ? 'Yes' : 'No'}</p>
            <p>Map List Length: {mapList.length}</p>
          </div> */}

          <div className="mx-20 grid gap-4 grid-cols-1 auto-rows-[208px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {mapList.map((map) => (
              <Link
                key={map._id}
                href={`/${isPublic ? 'share' : 'edit'}/${map._id}`}
              >
                <MindMapCard
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

          <div className="flex justify-center my-8">
            <Pagination
              page={pagination.page}
              pageSize={pagination.pageSize}
              total={pagination.total}
              onPageChange={(page) =>
                setPagination((prev) => ({ ...prev, page }))
              }
            />
          </div>
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
        title={currentShareItem?.name ? `Share "${currentShareItem.name}"` : 'Share Mind Map'}
      />
    </>
  )
}
