import { NextRequest, NextResponse } from 'next/server'

// 模拟公共思维导图数据
const mockPublicMaps = [
  {
    _id: 'public-map-1',
    name: 'JavaScript Learning Path',
    author: 1,
    content: {
      nodeData: {
        id: 'root',
        topic: 'JavaScript Learning Path',
        children: [
          {
            id: 'basics',
            topic: 'Basics',
            children: []
          },
          {
            id: 'advanced',
            topic: 'Advanced',
            children: []
          }
        ]
      }
    },
    date: '2023-11-01',
    updatedAt: '2023-11-01',
    origin: 'web',
    public: true,
    __v: 0
  },
  {
    _id: 'public-map-2',
    name: 'React Development Guide',
    author: 2,
    content: {
      nodeData: {
        id: 'root',
        topic: 'React Development Guide',
        children: [
          {
            id: 'components',
            topic: 'Components',
            children: []
          },
          {
            id: 'hooks',
            topic: 'Hooks',
            children: []
          }
        ]
      }
    },
    date: '2023-11-02',
    updatedAt: '2023-11-02',
    origin: 'web',
    public: true,
    __v: 0
  },
  {
    _id: 'public-map-3',
    name: 'Web Design Principles',
    author: 3,
    content: {
      nodeData: {
        id: 'root',
        topic: 'Web Design Principles',
        children: [
          {
            id: 'layout',
            topic: 'Layout',
            children: []
          },
          {
            id: 'colors',
            topic: 'Colors',
            children: []
          }
        ]
      }
    },
    date: '2023-11-03',
    updatedAt: '2023-11-03',
    origin: 'web',
    public: true,
    __v: 0
  }
]

export async function GET(request: NextRequest) {
  try {
    // 获取查询参数
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '20')
    const keyword = searchParams.get('keyword') || ''

    // 过滤数据
    let filteredMaps = mockPublicMaps
    if (keyword) {
      filteredMaps = mockPublicMaps.filter(map => 
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
