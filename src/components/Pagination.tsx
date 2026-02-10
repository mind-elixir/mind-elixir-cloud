import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

interface PaginationProps {
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
  className?: string
}

export default function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
  className,
}: PaginationProps) {
  const t = useTranslations('pagination')
  const totalPages = Math.ceil(total / pageSize)

  // 显示分页信息，即使只有一页
  if (totalPages <= 1) {
    return (
      <div
        className={cn(
          'flex items-center justify-center gap-2 text-sm text-muted-foreground',
          className,
        )}
      >
        <span>{t('totalItems', { total })}</span>
      </div>
    )
  }

  const getVisiblePages = () => {
    const delta = 1
    const range = []
    const rangeWithDots = []

    for (
      let i = Math.max(2, page - delta);
      i <= Math.min(totalPages - 1, page + delta);
      i++
    ) {
      range.push(i)
    }

    if (page - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (page + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  return (
    <nav
      className={cn('flex items-center gap-2', className)}
      role="navigation"
      aria-label="pagination"
    >
      {/* First & Previous */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(1)}
          disabled={page <= 1}
          className={cn(
            'inline-flex items-center justify-center h-8 w-8 rounded-md text-sm font-medium transition-colors',
            'hover:bg-accent hover:text-accent-foreground',
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
            'disabled:pointer-events-none disabled:opacity-50',
          )}
          aria-label={t('goToFirstPage')}
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className={cn(
            'inline-flex items-center justify-center h-8 w-8 rounded-md text-sm font-medium transition-colors',
            'hover:bg-accent hover:text-accent-foreground',
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
            'disabled:pointer-events-none disabled:opacity-50',
          )}
          aria-label={t('goToPreviousPage')}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {getVisiblePages().map((pageNum, index) => (
          <button
            key={index}
            onClick={() => typeof pageNum === 'number' && onPageChange(pageNum)}
            disabled={pageNum === '...'}
            className={cn(
              'inline-flex items-center justify-center h-8 min-w-[2rem] px-2 rounded-md text-sm font-medium transition-colors',
              'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
              pageNum === page
                ? 'bg-primary text-primary-foreground shadow-sm'
                : pageNum === '...'
                  ? 'cursor-default pointer-events-none'
                  : 'hover:bg-accent hover:text-accent-foreground',
            )}
            aria-label={
              typeof pageNum === 'number'
                ? t('goToPage', { page: pageNum })
                : t('morePages')
            }
            aria-current={pageNum === page ? 'page' : undefined}
          >
            {pageNum}
          </button>
        ))}
      </div>

      {/* Next & Last */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className={cn(
            'inline-flex items-center justify-center h-8 w-8 rounded-md text-sm font-medium transition-colors',
            'hover:bg-accent hover:text-accent-foreground',
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
            'disabled:pointer-events-none disabled:opacity-50',
          )}
          aria-label={t('goToNextPage')}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={page >= totalPages}
          className={cn(
            'inline-flex items-center justify-center h-8 w-8 rounded-md text-sm font-medium transition-colors',
            'hover:bg-accent hover:text-accent-foreground',
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
            'disabled:pointer-events-none disabled:opacity-50',
          )}
          aria-label={t('goToLastPage')}
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>

      {/* Page Info */}
      <div className="flex items-center gap-1 ml-2 text-sm text-muted-foreground">
        <span className="hidden sm:inline">{t('currentPage')}</span>
        <span className="font-medium text-foreground">{page}</span>
        <span className="hidden sm:inline">/</span>
        <span className="sm:hidden">/</span>
        <span className="font-medium text-foreground">{totalPages}</span>
        <span className="hidden sm:inline">{t('totalPages')}</span>
        <span className="hidden md:inline ml-2">•</span>
        <span className="hidden md:inline">{t('totalItems', { total })}</span>
      </div>
    </nav>
  )
}
