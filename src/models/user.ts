export interface User {
  image: string
  email: string
  from: string
  id: string
  name: string
  providerAccountId: string
  _id: string
  socialMedia?: {
    bilibili?: string
    xiaohongshu?: string
    weibo?: string
  }
}
