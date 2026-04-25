'use client'

import { User, MapPin } from 'lucide-react'
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
    <div
      className={`bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 rounded-xl p-6 ${className}`}
    >
      {/* 作者头像和基本信息 */}
      <div className="relative group/avatar mb-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border-2 border-white dark:border-gray-800 group-hover/avatar:scale-105 transition-transform duration-300">
              {author.image ? (
                <img
                  src={author.image}
                  alt={author.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-blue-600 to-violet-700 text-white font-bold text-xl flex items-center justify-center">
                  {author.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 border-2 border-white dark:border-gray-900 rounded-lg flex items-center justify-center shadow-md">
              <User className="w-3 h-3 text-white" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 truncate tracking-tight mb-0.5">
              {author.name}
            </h3>
            {author.location && (
              <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                <MapPin className="w-3 h-3" />
                <span>{author.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* 个人简介 */}
        {author.bio && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2 italic">
              {author.bio}
            </p>
          </div>
        )}
      </div>

      {/* 社交媒体链接 */}
      {author.socialLinks && author.socialLinks.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
          <h4 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 mb-4 uppercase tracking-[0.2em]">
            {t('socialMedia')}
          </h4>
          <div className="grid grid-cols-1 gap-3">
            {author.socialLinks.map((link, index) => {
              const label = getPlatformLabel(link)
              const platformConfig = SOCIAL_PLATFORMS.find(
                (p) => p.id === link.platform,
              )
              const color = platformConfig?.color || '#6B7280'

              return (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-3 p-2.5 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 hover:bg-white dark:hover:bg-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-sm transition-all duration-300"
                  title={t('followOn', { platform: label })}
                >
                  <div
                    className="flex items-center justify-center w-8 h-8 rounded-lg bg-white dark:bg-gray-900 shadow-sm group-hover:scale-110 transition-transform duration-300"
                    style={{ color }}
                  >
                    <PlatformIcon
                      platform={link.platform}
                      className="w-4 h-4"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-gray-600 dark:text-gray-400 truncate group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                      {label}
                    </p>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
