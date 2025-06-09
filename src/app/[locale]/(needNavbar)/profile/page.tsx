'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useUser } from '@/providers/UserProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User, MapPin, Globe, Trash2, Link, Plus } from 'lucide-react'
import {
  SiX,
  SiFacebook,
  SiGithub,
  SiLinkedin,
  SiInstagram,
  SiYoutube,
  SiBilibili,
  SiTiktok,
  SiSinaweibo ,
  SiXiaohongshu
} from 'react-icons/si'
import { api } from '@/services/api'
import { ProfileData, SocialLink } from '@/services/types'
import { toast } from 'sonner'

// 社交平台配置
const SOCIAL_PLATFORMS = [
  { id: 'twitter', name: 'X (Twitter)', icon: SiX, color: '#000000' },
  { id: 'facebook', name: 'Facebook', icon: SiFacebook, color: '#1877F2' },
  { id: 'github', name: 'GitHub', icon: SiGithub, color: '#181717' },
  { id: 'linkedin', name: 'LinkedIn', icon: SiLinkedin, color: '#0A66C2' },
  { id: 'instagram', name: 'Instagram', icon: SiInstagram, color: '#E4405F' },
  { id: 'youtube', name: 'YouTube', icon: SiYoutube, color: '#FF0000' },
  { id: 'bilibili', name: '哔哩哔哩', icon: SiBilibili, color: '#00A1D6' },
  { id: 'xiaohongshu', name: '小红书', icon: SiXiaohongshu, color: '#FF2442' },
  { id: 'weibo', name: '微博', icon: SiSinaweibo , color: '#E6162D' },
  { id: 'tiktok', name: 'TikTok', icon: SiTiktok, color: '#000000' },
  { id: 'custom', name: '自定义', icon: Globe, color: '#6B7280' },
]

// 平台图标组件
const PlatformIcon = ({
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

export default function ProfilePage() {
  const t = useTranslations('profile')
  const { userData, refreshUser } = useUser()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [profileData, setProfileData] = useState<ProfileData>({
    displayName: '',
    bio: '',
    location: '',
    socialLinks: [],
  })

  // 加载用户配置数据
  useEffect(() => {
    const loadProfile = async () => {
      if (!userData) return

      try {
        setError(null)
        const response = await api.user.getProfile()
        if (response.data) {
          setProfileData(response.data)
        } else {
          setError('无法加载用户配置信息')
        }
      } catch (error) {
        console.error('Failed to load profile:', error)
        setError('加载用户配置信息时发生错误')
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [userData])

  // 处理基本信息输入变化
  const handleBasicInfoChange = (
    field: keyof Pick<ProfileData, 'displayName' | 'bio' | 'location'>,
    value: string
  ) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // 添加社交链接
  const addSocialLink = (platformId?: string) => {
    const platform = platformId || 'custom'
    const platformConfig = SOCIAL_PLATFORMS.find((p) => p.id === platform)
    const label =
      platformConfig && platform !== 'custom' ? platformConfig.name : ''

    setProfileData((prev) => ({
      ...prev,
      socialLinks: [...(prev.socialLinks || []), { platform, url: '', label }],
    }))
  }

  // 更新社交链接
  const updateSocialLink = (
    index: number,
    field: keyof SocialLink,
    value: string
  ) => {
    setProfileData((prev) => ({
      ...prev,
      socialLinks:
        prev.socialLinks?.map((link, i) =>
          i === index ? { ...link, [field]: value } : link
        ) || [],
    }))
  }

  // 删除社交链接
  const removeSocialLink = (index: number) => {
    setProfileData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks?.filter((_, i) => i !== index) || [],
    }))
  }

  // 保存配置
  const handleSave = async () => {
    if (!userData) return

    setSaving(true)
    try {
      await api.user.updateProfile(profileData)
      toast.success(t('saved'))
    } catch (error) {
      console.error('Failed to save profile:', error)
      toast.error(t('error'))
    } finally {
      setSaving(false)
    }
  }

  // 如果用户未登录，显示提示
  if (!userData) {
    return (
      <div className="min-h-screen pt-28 px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">请先登录</h1>
          <p className="text-gray-600">您需要登录后才能访问个人设置页面。</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-28 pb-4 px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>

        {/* 用户基本信息 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-slate-200">
                <img
                  src={userData.image}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{userData.name}</h2>
                <p className="text-sm text-gray-600">{userData.email}</p>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-2 text-gray-600">加载中...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">
              <svg
                className="w-12 h-12 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <p className="text-lg font-medium">{error}</p>
            </div>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="mt-4"
            >
              重新加载
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {/* 基本信息 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  {t('basicInfo')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 显示名称 */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {t('displayName')}
                  </label>
                  <Input
                    type="text"
                    placeholder={t('placeholder.displayName')}
                    value={profileData.displayName || ''}
                    onChange={(e) =>
                      handleBasicInfoChange('displayName', e.target.value)
                    }
                  />
                </div>

                {/* 个人简介 */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    {t('bio')}
                  </label>
                  <Textarea
                    placeholder={t('placeholder.bio')}
                    value={profileData.bio || ''}
                    onChange={(e) =>
                      handleBasicInfoChange('bio', e.target.value)
                    }
                    className="min-h-[100px] resize-none"
                  />
                </div>

                {/* 所在地 */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {t('location')}
                  </label>
                  <Input
                    type="text"
                    placeholder={t('placeholder.location')}
                    value={profileData.location || ''}
                    onChange={(e) =>
                      handleBasicInfoChange('location', e.target.value)
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* 社交链接 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link className="w-5 h-5" />
                  {t('socialLinks')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 预设平台快速添加 */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">
                    {t('popularPlatforms')}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {SOCIAL_PLATFORMS.filter((p) => p.id !== 'custom').map(
                      (platform) => (
                        <Button
                          key={platform.id}
                          variant="outline"
                          size="sm"
                          onClick={() => addSocialLink(platform.id)}
                          className="flex items-center gap-2 justify-start h-9"
                          disabled={profileData.socialLinks?.some(
                            (link) => link.platform === platform.id
                          )}
                        >
                          <PlatformIcon
                            platform={platform.id}
                            className="w-4 h-4"
                          />
                          <span className="text-xs truncate">
                            {platform.name}
                          </span>
                        </Button>
                      )
                    )}
                  </div>
                </div>

                {/* 自定义链接添加 */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-sm font-medium text-gray-700">
                    {t('customLinks')}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addSocialLink('custom')}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    {t('addCustomLink')}
                  </Button>
                </div>

                {/* 已添加的社交链接 */}
                {profileData.socialLinks &&
                profileData.socialLinks.length > 0 ? (
                  <div className="space-y-3">
                    {profileData.socialLinks.map((link, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 border rounded-lg"
                      >
                        <PlatformIcon
                          platform={link.platform}
                          className="w-5 h-5 flex-shrink-0"
                        />

                        <div className="flex-1 space-y-2">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {/* 标签 */}
                            <Input
                              type="text"
                              placeholder={t('placeholder.label')}
                              value={link.label || ''}
                              onChange={(e) =>
                                updateSocialLink(index, 'label', e.target.value)
                              }
                              disabled={link.platform !== 'custom'}
                              className="text-sm h-8"
                            />

                            {/* URL */}
                            <Input
                              type="url"
                              placeholder={t('placeholder.url')}
                              value={link.url}
                              onChange={(e) =>
                                updateSocialLink(index, 'url', e.target.value)
                              }
                              className="text-sm h-8"
                            />
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSocialLink(index)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <Link className="w-6 h-6 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">{t('noLinksYet')}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* 保存按钮 */}
        {!loading && !error && (
          <div className="mt-8">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white"
              size="lg"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  保存中...
                </>
              ) : (
                t('save')
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
