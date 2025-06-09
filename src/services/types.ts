import { User } from '@/models/user'
import { MindMapItem } from '@/models/list'
import { Response } from '@/models/response'

// API 请求参数类型
export interface PaginationParams {
  page: number
  pageSize: number
  keyword?: string
}

export interface CreateMapParams {
  name: string
  content?: any
}

export interface UpdateMapParams {
  name?: string
  content?: any
  public?: boolean
}

// Social link represents a social media or custom link
export interface SocialLink {
  platform: string // e.g., "twitter", "github", "linkedin", "custom"
  url: string
  label?: string // For custom links
}

// User profile represents user's profile information
export interface ProfileData {
  displayName?: string
  bio?: string
  location?: string
  socialLinks?: SocialLink[]
}

// API 响应类型
export interface MindMapListResponse {
  data: MindMapItem[]
  total: number
  page: number
  pageSize: number
}

export interface TokenResponse {
  token: string
}

export interface MapResponse {
  data: MindMapItem
}

export interface UserResponse extends Response<User> {}

export interface ProfileResponse {
  data?: ProfileData
  message?: string
}

// Public user profile represents public user information
export interface PublicUserProfile {
  _id: string
  id: string
  name: string
  displayName?: string
  image?: string
  bio?: string
  location?: string
  socialLinks?: SocialLink[]
}

export interface PublicUserResponse {
  data?: PublicUserProfile
  message?: string
}
