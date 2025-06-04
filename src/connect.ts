import axios from 'axios'
import { toast } from 'sonner'

const relink = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

relink.interceptors.response.use(
  function (res) {
    return res.data
  },
  function (error) {
    console.log('API Error:', error)
    if (error.response?.status !== 401) {
      toast.error('Network error')
    }
    return Promise.reject(error)
  }
)

export default relink
