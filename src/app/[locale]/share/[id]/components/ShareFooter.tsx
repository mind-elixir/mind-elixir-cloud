import { Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ShareFooterProps {
  onCopyLink: () => void
}

export function ShareFooter({ onCopyLink }: ShareFooterProps) {
  return (
    // <div className="border-t border-gray-200/50 dark:border-gray-800/50 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400 mobile-text-center">
          <div className="flex items-center gap-4">
            <span className="font-medium text-gray-700 dark:text-gray-300">由 Mind Elixir Cloud 强力驱动</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onCopyLink}
              className="h-7 px-3 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <Share2 className="w-3.5 h-3.5 mr-1.5" />
              分享此思维导图
            </Button>
          </div>
        </div>
      </div>
    // </div>
  )
}
