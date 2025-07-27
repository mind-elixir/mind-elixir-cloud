'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User } from '@/models/user'
import { api } from '@/services/api'

interface UserContextType {
  userData: User | undefined
  setUserData: (user: User | undefined) => void
  loading: boolean
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<User | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  const refreshUser = async () => {
    try {
      // 检查是否有token
      const token = localStorage.getItem('auth_token')
      if (!token) {
        setUserData(undefined)
        return
      }
      
      const res = await api.user.getCurrentUser()
      if (res.data && res.data.providerAccountId) {
        setUserData(res.data)
      } else {
        setUserData(undefined)
        // 如果用户数据无效，清除token
        localStorage.removeItem('auth_token')
      }
    } catch (error) {
      console.error('Failed to fetch user:', error)
      setUserData(undefined)
      // 如果请求失败，清除可能无效的token
      localStorage.removeItem('auth_token')
    }
  }



  const logout = async () => {
    try {
      await api.user.logout()
      setUserData(undefined)
      // 清除本地token
      localStorage.removeItem('auth_token')
    } catch (error) {
      console.error('Logout failed:', error)
      // 即使API调用失败，也清除本地状态和token
      setUserData(undefined)
      localStorage.removeItem('auth_token')
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      await refreshUser()
      setLoading(false)
    }

    fetchUser()
  }, [])

  return (
    <UserContext.Provider value={{ userData, setUserData, loading, logout, refreshUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
