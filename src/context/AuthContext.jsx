import { createContext, useContext, useState } from 'react'
import API from '../api/axios'
import { unwrap } from '../utils/property'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'))
    } catch {
      return null
    }
  })

  const login = async (email, password) => {
    const res = await API.post('/api/auth/login', { email, password })
    console.log('login response (test ke baad ye line hata dena):', res.data)
    const data = unwrap(res)
    const token = data.accessToken || data.token || data.jwt
    if (!token) throw new Error('Login succeeded but no token found in response')

    const u = data.user || {
      fullName: data.fullName,
      email: data.email,
      role: data.role,
    }
    localStorage.setItem('accessToken', token)
    if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken)
    localStorage.setItem('user', JSON.stringify(u))
    setUser(u)
    return u
  }

  const logout = async () => {
    try {
      await API.post('/api/auth/logout')
    } catch {
      // logout API fail ho tab bhi local session saaf kar do
    }
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, role: user?.role, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)