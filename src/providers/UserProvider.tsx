'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User } from '@/models/user'
import { Response } from '@/models/response'
import connect from '@/connect'

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
      const res = await connect.get<never, Response<User>>('/api/user')
      if (res.data && res.data.providerAccountId) {
        setUserData(res.data)
      } else {
        setUserData(undefined)
      }
    } catch (error) {
      console.error('Failed to fetch user:', error)
      setUserData(undefined)
    }
  }



  const logout = async () => {
    try {
      await connect.post('/api/auth/logout')
      setUserData(undefined)
    } catch (error) {
      console.error('Logout failed:', error)
      // 即使API调用失败，也清除本地状态
      setUserData(undefined)
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
