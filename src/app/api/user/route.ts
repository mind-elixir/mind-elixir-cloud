import { NextRequest, NextResponse } from 'next/server'

// 模拟用户数据
const mockUser = {
  _id: 'mock-user-id',
  id: 'mock-user-id',
  name: 'Test User',
  email: 'test@example.com',
  avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
  from: 'github',
  providerAccountId: 'mock-provider-id'
}

export async function GET(request: NextRequest) {
  try {
    // 检查是否有登录cookie或session
    const cookies = request.cookies
    const isLoggedIn = cookies.get('auth-token') || cookies.get('user-session')
    
    if (isLoggedIn) {
      return NextResponse.json({
        success: true,
        data: mockUser
      })
    } else {
      return NextResponse.json({
        success: false,
        message: 'Not authenticated'
      }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 })
  }
}
