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
  },
)

// 响应拦截器：处理token过期
relink.interceptors.response.use(
  function (res) {
    return res.data
  },
  function (error) {
    console.log('API Error:', error)

    // 如果是401错误，清除token但不跳转，让调用方处理
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
    }

    return Promise.reject(error)
  },
)

export default relink
