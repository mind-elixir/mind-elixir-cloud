import { Globe } from 'lucide-react'
import {
  SiX,
  SiFacebook,
  SiGithub,
  SiLinkedin,
  SiInstagram,
  SiYoutube,
  SiBilibili,
  SiTiktok,
  SiSinaweibo,
  SiXiaohongshu
} from 'react-icons/si'

// 社交平台配置
export const SOCIAL_PLATFORMS = [
  { id: 'twitter', name: 'X (Twitter)', icon: SiX, color: '#000000' },
  { id: 'facebook', name: 'Facebook', icon: SiFacebook, color: '#1877F2' },
  { id: 'github', name: 'GitHub', icon: SiGithub, color: '#181717' },
  { id: 'linkedin', name: 'LinkedIn', icon: SiLinkedin, color: '#0A66C2' },
  { id: 'instagram', name: 'Instagram', icon: SiInstagram, color: '#E4405F' },
  { id: 'youtube', name: 'YouTube', icon: SiYoutube, color: '#FF0000' },
  { id: 'bilibili', name: '哔哩哔哩', icon: SiBilibili, color: '#00A1D6' },
  { id: 'xiaohongshu', name: '小红书', icon: SiXiaohongshu, color: '#FF2442' },
  { id: 'weibo', name: '微博', icon: SiSinaweibo, color: '#E6162D' },
  { id: 'tiktok', name: 'TikTok', icon: SiTiktok, color: '#000000' },
  { id: 'custom', name: '自定义', icon: Globe, color: '#6B7280' },
]

// 平台图标组件
export const PlatformIcon = ({
  platform,
  className = 'w-4 h-4',
}: {
  platform: string
  className?: string
}) => {
  const platformConfig = SOCIAL_PLATFORMS.find((p) => p.id === platform)

  if (!platformConfig) {
    return <Globe className={className} />
  }

  const IconComponent = platformConfig.icon
  return (
    <IconComponent
      className={className}
      style={{ color: platformConfig.color }}
    />
  )
}
