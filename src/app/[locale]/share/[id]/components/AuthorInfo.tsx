'use client'

import {
  User,
  MapPin
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PublicUserProfile, SocialLink } from '@/services/types'
import { SOCIAL_PLATFORMS, PlatformIcon } from '@/config/socialPlatforms'
import { useTranslations } from 'next-intl'

interface AuthorInfoProps {
  author: PublicUserProfile
  className?: string
}

// 获取平台显示名称
const getPlatformLabel = (link: SocialLink) => {
  if (link.label) return link.label

  const platformConfig = SOCIAL_PLATFORMS.find((p) => p.id === link.platform)
  return platformConfig ? platformConfig.name : link.platform
}

export function AuthorInfo({ author, className = '' }: AuthorInfoProps) {
  const t = useTranslations('share')
  
  const handleSocialClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className={`bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 rounded-xl p-6 ${className}`}>
      {/* 作者头像和基本信息 */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 ring-2 ring-gray-200 dark:ring-gray-600 rounded-full overflow-hidden flex-shrink-0">
          {author.image ? (
            <img
              src={author.image}
              alt={author.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold flex items-center justify-center">
              {author.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
              {author.name}
            </h3>
            <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              <User className="w-3 h-3 mr-1" />
              {t('author')}
            </Badge>
          </div>
          
          {/* 位置信息 */}
          {author.location && (
            <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>{author.location}</span>
            </div>
          )}
          
          {/* 个人简介 */}
          {author.bio && (
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              {author.bio}
            </p>
          )}
        </div>
      </div>

      {/* 社交媒体链接 */}
      {author.socialLinks && author.socialLinks.length > 0 && (
        <div>
          <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
            {t('socialMedia')}
          </h4>
          <div className="flex flex-wrap gap-2">
            {author.socialLinks.map((link, index) => {
              const label = getPlatformLabel(link)

              return (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSocialClick(link.url)}
                  className="h-8 px-3 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  title={t('followOn', { platform: label })}
                >
                  <PlatformIcon platform={link.platform} className="w-3.5 h-3.5 mr-1.5" />
                  {label}
                </Button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
