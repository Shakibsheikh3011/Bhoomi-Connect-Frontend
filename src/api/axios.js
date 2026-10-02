import axios from 'axios'

const API = axios.create({
  baseURL: 'https://real-estate-backend-vh62.onrender.com',
})

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

API.interceptors.response.use(
  (res) => res,
  (error) => {
    const isAuthCall = error.config?.url?.includes('/api/auth/')
    if (error.response?.status === 401 && !isAuthCall && localStorage.getItem('accessToken')) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default API