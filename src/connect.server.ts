import axios from 'axios'

const serverConnect = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

// Response interceptor for server-side requests
serverConnect.interceptors.response.use(
  function (res) {
    return res.data
  },
  function (error) {
    console.error('Server API Error:', error)
    return Promise.reject(error)
  },
)

export default serverConnect
