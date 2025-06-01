'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useUser } from '@/providers/UserProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import connect from '@/connect'
import toast from '@/utils/toast'
import { User } from '@/models/user'

interface ProfileData {
  socialMedia: {
    bilibili: string
    xiaohongshu: string
    weibo: string
  }
}

export default function ProfilePage() {
  const t = useTranslations('profile')
  const { userData, refreshUser } = useUser()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profileData, setProfileData] = useState<ProfileData>({
    socialMedia: {
      bilibili: '',
      xiaohongshu: '',
      weibo: ''
    }
  })

  // 加载用户配置数据
  useEffect(() => {
    const loadProfile = async () => {
      if (!userData) return
      
      try {
        const response = await connect.get('/api/user/profile')
        if (response.success && response.data) {
          setProfileData(response.data)
        }
      } catch (error) {
        console.error('Failed to load profile:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [userData])

  // 处理输入变化
  const handleInputChange = (platform: keyof ProfileData['socialMedia'], value: string) => {
    setProfileData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value
      }
    }))
  }

  // 保存配置
  const handleSave = async () => {
    if (!userData) return

    setSaving(true)
    try {
      const response = await connect.put('/api/user/profile', profileData)
      if (response.success) {
        toast.success(t('saved'))
        // 刷新用户数据
        await refreshUser()
      } else {
        toast.error(t('error'))
      }
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
    <div className="min-h-screen pt-28 px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>
        
        {/* 用户基本信息 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-slate-200">
                <img src={userData.image} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{userData.name}</h2>
                <p className="text-sm text-gray-600">{userData.email}</p>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* 社交媒体配置 */}
        <Card>
          <CardHeader>
            <CardTitle>{t('socialMedia')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                <p className="mt-2 text-gray-600">加载中...</p>
              </div>
            ) : (
              <>
                {/* 哔哩哔哩 */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    {t('bilibili')}
                  </label>
                  <Input
                    type="text"
                    placeholder={t('placeholder.bilibili')}
                    value={profileData.socialMedia.bilibili}
                    onChange={(e) => handleInputChange('bilibili', e.target.value)}
                    className="w-full"
                  />
                </div>

                <Separator />

                {/* 小红书 */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    {t('xiaohongshu')}
                  </label>
                  <Input
                    type="text"
                    placeholder={t('placeholder.xiaohongshu')}
                    value={profileData.socialMedia.xiaohongshu}
                    onChange={(e) => handleInputChange('xiaohongshu', e.target.value)}
                    className="w-full"
                  />
                </div>

                <Separator />

                {/* 微博 */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    {t('weibo')}
                  </label>
                  <Input
                    type="text"
                    placeholder={t('placeholder.weibo')}
                    value={profileData.socialMedia.weibo}
                    onChange={(e) => handleInputChange('weibo', e.target.value)}
                    className="w-full"
                  />
                </div>

                <Separator />

                {/* 保存按钮 */}
                <div className="pt-4">
                  <Button 
                    onClick={handleSave} 
                    disabled={saving}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white"
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
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
