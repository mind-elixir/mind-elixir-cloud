import { 
  User, 
  MapPin, 
  Globe, 
  ExternalLink,
  Github,
  Linkedin,
  Instagram,
  Youtube,
  Play,
  Camera,
  Building2,
  GitBranch,
  Share2,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PublicUserProfile, SocialLink } from '@/services/types'

interface AuthorInfoProps {
  author: PublicUserProfile
  className?: string
}

// 社交平台图标映射
const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'github':
      return Github
    case 'twitter':
    case 'x':
      return X
    case 'linkedin':
      return Linkedin
    case 'instagram':
      return Instagram
    case 'youtube':
      return Youtube
    case 'facebook':
      return Share2
    case 'bilibili':
      return Play
    case 'xiaohongshu':
      return Camera
    case 'weibo':
      return Share2
    case 'tiktok':
      return Play
    default:
      return ExternalLink
  }
}

// 社交平台颜色映射
const getSocialColor = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'github':
      return 'hover:text-gray-900 dark:hover:text-gray-100'
    case 'twitter':
    case 'x':
      return 'hover:text-black dark:hover:text-white'
    case 'linkedin':
      return 'hover:text-blue-600 dark:hover:text-blue-400'
    case 'instagram':
      return 'hover:text-pink-600 dark:hover:text-pink-400'
    case 'youtube':
      return 'hover:text-red-600 dark:hover:text-red-400'
    case 'facebook':
      return 'hover:text-blue-700 dark:hover:text-blue-400'
    case 'bilibili':
      return 'hover:text-cyan-600 dark:hover:text-cyan-400'
    case 'xiaohongshu':
      return 'hover:text-red-500 dark:hover:text-red-400'
    case 'weibo':
      return 'hover:text-orange-600 dark:hover:text-orange-400'
    case 'tiktok':
      return 'hover:text-black dark:hover:text-white'
    default:
      return 'hover:text-gray-700 dark:hover:text-gray-300'
  }
}

// 获取平台显示名称
const getPlatformLabel = (link: SocialLink) => {
  if (link.label) return link.label
  
  switch (link.platform.toLowerCase()) {
    case 'github':
      return 'GitHub'
    case 'twitter':
    case 'x':
      return 'X'
    case 'linkedin':
      return 'LinkedIn'
    case 'instagram':
      return 'Instagram'
    case 'youtube':
      return 'YouTube'
    case 'facebook':
      return 'Facebook'
    case 'bilibili':
      return '哔哩哔哩'
    case 'xiaohongshu':
      return '小红书'
    case 'weibo':
      return '微博'
    case 'tiktok':
      return 'TikTok'
    default:
      return link.platform
  }
}

export function AuthorInfo({ author, className = '' }: AuthorInfoProps) {
  const handleSocialClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleWebsiteClick = () => {
    if (author.website) {
      window.open(author.website, '_blank', 'noopener,noreferrer')
    }
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
              作者
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

      {/* 网站链接 */}
      {author.website && (
        <div className="mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleWebsiteClick}
            className="h-8 px-3 text-xs bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <Globe className="w-3.5 h-3.5 mr-1.5" />
            访问网站
          </Button>
        </div>
      )}

      {/* 社交媒体链接 */}
      {author.socialLinks && author.socialLinks.length > 0 && (
        <div>
          <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
            社交媒体
          </h4>
          <div className="flex flex-wrap gap-2">
            {author.socialLinks.map((link, index) => {
              const Icon = getSocialIcon(link.platform)
              const colorClass = getSocialColor(link.platform)
              const label = getPlatformLabel(link)
              
              return (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSocialClick(link.url)}
                  className={`h-8 px-3 text-xs text-gray-500 dark:text-gray-400 ${colorClass} transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800`}
                  title={`在 ${label} 上关注`}
                >
                  <Icon className="w-3.5 h-3.5 mr-1.5" />
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
