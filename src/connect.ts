import axios from 'axios'
import { toast } from 'sonner'

const relink = axios.create({
  baseURL: 'https://mind-elixir-backend.fly.dev',
})

// 请求拦截器：自动添加JWT token
relink.interceptors.request.use(
  function (config) {
    // 从localStorage获取token
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 响应拦截器：处理token过期
relink.interceptors.response.use(
  function (res) {
    return res.data
  },
  function (error) {
    console.log('API Error:', error)
    
    // 如果是401错误，清除token并跳转到首页
    if (error.response?.status === 401) {
      toast.error('Session expired, please login again')
      localStorage.removeItem('auth_token')
      // 如果不在登录页面，则跳转到首页
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = '/'
      }
    } else {
      toast.error('Network error')
    }
    return Promise.reject(error)
  }
)

export default relink
