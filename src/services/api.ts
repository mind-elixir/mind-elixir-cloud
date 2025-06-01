import connect from '@/connect'
import {
  PaginationParams,
  CreateMapParams,
  UpdateMapParams,
  ProfileData,
  MindMapListResponse,
  TokenResponse,
  MapResponse,
  UserResponse,
  ProfileResponse
} from './types'

/**
 * 用户相关 API 服务
 */
export const userApi = {
  /**
   * 获取当前用户信息
   */
  getCurrentUser: async (): Promise<UserResponse> => {
    return await connect.get<never, UserResponse>('/api/user')
  },

  /**
   * 用户登出
   */
  logout: async (): Promise<void> => {
    return await connect.post('/api/auth/logout')
  },

  /**
   * 获取用户配置信息
   */
  getProfile: async (): Promise<ProfileResponse> => {
    return await connect.get('/api/user/profile')
  },

  /**
   * 更新用户配置信息
   */
  updateProfile: async (profileData: ProfileData): Promise<ProfileResponse> => {
    return await connect.put('/api/user/profile', profileData)
  },

  /**
   * 获取桌面登录token
   */
  getDesktopToken: async (): Promise<TokenResponse> => {
    return await connect.get<never, TokenResponse>('token')
  }
}

/**
 * 思维导图相关 API 服务
 */
export const mindMapApi = {
  /**
   * 获取思维导图列表
   */
  getMapList: async (params: PaginationParams): Promise<MindMapListResponse> => {
    return await connect.get<never, MindMapListResponse>('/api/map', {
      params
    })
  },

  /**
   * 创建新的思维导图
   */
  createMap: async (params: CreateMapParams): Promise<MapResponse> => {
    return await connect.post('/api/map', params)
  },

  /**
   * 获取特定思维导图
   */
  getMap: async (id: string): Promise<MapResponse> => {
    return await connect.get<never, MapResponse>(`/api/map/${id}`)
  },

  /**
   * 更新思维导图
   */
  updateMap: async (id: string, params: UpdateMapParams): Promise<void> => {
    return await connect.patch(`/api/map/${id}`, params)
  },

  /**
   * 删除思维导图
   */
  deleteMap: async (id: string): Promise<void> => {
    return await connect.delete(`/api/map/${id}`)
  }
}

/**
 * 公共分享相关 API 服务
 */
export const publicApi = {
  /**
   * 获取公共思维导图列表
   */
  getPublicMapList: async (params: PaginationParams): Promise<MindMapListResponse> => {
    return await connect.get<never, MindMapListResponse>('/api/public', {
      params
    })
  },

  /**
   * 获取特定公共思维导图
   */
  getPublicMap: async (id: string): Promise<MapResponse> => {
    return await connect.get<never, MapResponse>(`/api/public/${id}`)
  }
}

/**
 * 统一导出所有 API 服务
 */
export const api = {
  user: userApi,
  mindMap: mindMapApi,
  public: publicApi
}

export default api
