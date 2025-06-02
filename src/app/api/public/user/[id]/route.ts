import { NextRequest, NextResponse } from 'next/server'

// 模拟用户数据和配置信息
const mockUsers = [
  {
    _id: '1',
    id: '1',
    name: 'Alex Chen',
    image: 'https://avatars.githubusercontent.com/u/1?v=4',
    bio: '全栈开发者，专注于现代 Web 技术和用户体验设计。热爱开源，喜欢分享技术知识。',
    location: '北京，中国',
    website: 'https://alexchen.dev',
    socialLinks: [
      {
        platform: 'github',
        url: 'https://github.com/alexchen',
        label: 'GitHub'
      },
      {
        platform: 'twitter',
        url: 'https://twitter.com/alexchen_dev',
        label: 'X (Twitter)'
      },
      {
        platform: 'linkedin',
        url: 'https://linkedin.com/in/alexchen',
        label: 'LinkedIn'
      },
      {
        platform: 'bilibili',
        url: 'https://space.bilibili.com/123456',
        label: '哔哩哔哩'
      }
    ]
  },
  {
    _id: '2',
    id: '2',
    name: 'Sarah Wang',
    image: 'https://avatars.githubusercontent.com/u/2?v=4',
    bio: 'UI/UX 设计师和前端开发者。专注于创建美观且实用的数字产品。',
    location: '上海，中国',
    website: 'https://sarahwang.design',
    socialLinks: [
      {
        platform: 'instagram',
        url: 'https://instagram.com/sarahwang_design',
        label: 'Instagram'
      },
      {
        platform: 'xiaohongshu',
        url: 'https://xiaohongshu.com/user/profile/123456',
        label: '小红书'
      },
      {
        platform: 'custom',
        url: 'https://dribbble.com/sarahwang',
        label: 'Dribbble'
      }
    ]
  },
  {
    _id: '3',
    id: '3',
    name: 'David Liu',
    image: 'https://avatars.githubusercontent.com/u/3?v=4',
    bio: '产品经理和技术写作者。致力于通过技术改善人们的生活。',
    location: '深圳，中国',
    website: 'https://davidliu.blog',
    socialLinks: [
      {
        platform: 'weibo',
        url: 'https://weibo.com/davidliu',
        label: '微博'
      },
      {
        platform: 'youtube',
        url: 'https://youtube.com/@davidliu',
        label: 'YouTube'
      },
      {
        platform: 'custom',
        url: 'https://medium.com/@davidliu',
        label: 'Medium'
      }
    ]
  }
]

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id
    
    // 查找用户
    const user = mockUsers.find(u => u.id === userId || u._id === userId)
    
    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'User not found'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: user
    })
  } catch (error) {
    console.error('Error fetching public user profile:', error)
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 })
  }
}
