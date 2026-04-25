import connect from '@/connect.server'
import {
  PaginationParams,
  MindMapListResponse,
  MapResponse,
  PublicUserResponse,
} from './types'

/**
 * Server-side public API service (no localStorage dependency)
 */
export const serverPublicApi = {
  /**
   * Get public mind map list
   */
  getPublicMapList: async (
    params: PaginationParams,
  ): Promise<MindMapListResponse> => {
    return await connect.get<never, MindMapListResponse>('/api/public', {
      params,
    })
  },

  /**
   * Get specific public mind map
   */
  getPublicMap: async (id: string): Promise<MapResponse> => {
    return await connect.get<never, MapResponse>(`/api/public/${id}`)
  },

  /**
   * Get public user profile
   */
  getPublicUserProfile: async (userId: string): Promise<PublicUserResponse> => {
    return await connect.get<never, PublicUserResponse>(
      `/api/public/profile?id=${userId}`,
    )
  },
}

export const serverApi = {
  public: serverPublicApi,
}
