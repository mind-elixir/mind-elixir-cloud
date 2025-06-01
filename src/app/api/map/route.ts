import { NextRequest, NextResponse } from 'next/server'

// 模拟思维导图数据
const mockMaps = [
  {
    _id: 'map-1',
    name: 'My First Mind Map',
    author: 1,
    content: {
      nodeData: {
        id: 'root',
        topic: 'My First Mind Map',
        children: [
          {
            id: 'child1',
            topic: 'Branch 1',
            children: []
          },
          {
            id: 'child2',
            topic: 'Branch 2',
            children: []
          }
        ]
      }
    },
    date: '2023-12-01',
    updatedAt: '2023-12-01',
    origin: 'web',
    public: false,
    __v: 0
  },
  {
    _id: 'map-2',
    name: 'Project Planning',
    author: 1,
    content: {
      nodeData: {
        id: 'root',
        topic: 'Project Planning',
        children: [
          {
            id: 'phase1',
            topic: 'Phase 1',
            children: []
          },
          {
            id: 'phase2',
            topic: 'Phase 2',
            children: []
          }
        ]
      }
    },
    date: '2023-12-02',
    updatedAt: '2023-12-02',
    origin: 'web',
    public: true,
    __v: 0
  },
  {
    _id: 'map-3',
    name: 'Learning Goals',
    author: 1,
    content: {
      nodeData: {
        id: 'root',
        topic: 'Learning Goals',
        children: [
          {
            id: 'tech',
            topic: 'Technology',
            children: []
          },
          {
            id: 'soft',
            topic: 'Soft Skills',
            children: []
          }
        ]
      }
    },
    date: '2023-12-03',
    updatedAt: '2023-12-03',
    origin: 'web',
    public: false,
    __v: 0
  }
]

export async function GET(request: NextRequest) {
  try {
    // 检查认证
    const cookies = request.cookies
    const isLoggedIn = cookies.get('auth-token') || cookies.get('user-session')
    
    if (!isLoggedIn) {
      return NextResponse.json({
        success: false,
        message: 'Authentication required'
      }, { status: 401 })
    }

    // 获取查询参数
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '20')
    const keyword = searchParams.get('keyword') || ''

    // 过滤数据
    let filteredMaps = mockMaps
    if (keyword) {
      filteredMaps = mockMaps.filter(map => 
        map.name.toLowerCase().includes(keyword.toLowerCase())
      )
    }

    // 分页
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedMaps = filteredMaps.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: {
        list: paginatedMaps,
        total: filteredMaps.length,
        page,
        pageSize
      }
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // 检查认证
    const cookies = request.cookies
    const isLoggedIn = cookies.get('auth-token') || cookies.get('user-session')
    
    if (!isLoggedIn) {
      return NextResponse.json({
        success: false,
        message: 'Authentication required'
      }, { status: 401 })
    }

    const body = await request.json()
    const { name } = body

    // 创建新的思维导图
    const newMap = {
      _id: `map-${Date.now()}`,
      name: name || 'Untitled Mind Map',
      author: 1,
      content: {
        nodeData: {
          id: 'root',
          topic: name || 'Untitled Mind Map',
          children: []
        }
      },
      date: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      origin: 'web',
      public: false,
      __v: 0
    }

    return NextResponse.json({
      success: true,
      data: newMap,
      message: 'Mind map created successfully'
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Failed to create mind map'
    }, { status: 500 })
  }
}
