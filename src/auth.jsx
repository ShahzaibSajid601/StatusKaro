import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { Navigate } from 'react-router-dom'
import { api } from './api'

const Ctx = createContext(null)
export const useAuth = () => useContext(Ctx)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    try { setUser((await api('/auth/me')).user) } catch { setUser(null) } finally { setLoading(false) }
  }, [])
  useEffect(() => { refresh() }, [refresh])

  const login = async (userId, password) => { const { user } = await api('/auth/login', { method: 'POST', body: { userId, password } }); setUser(user); return user }
  const logout = async () => { await api('/auth/logout', { method: 'POST' }).catch(() => {}); setUser(null) }

  return <Ctx.Provider value={{ user, loading, login, logout, refresh }}>{children}</Ctx.Provider>
}

export function Protected({ children, admin }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="flex min-h-screen items-center justify-center text-sm text-stone-400">Loading…</div>
  if (!user) return <Navigate to="/login" replace />
  if (admin && user.role !== 'admin') return <Navigate to="/app" replace />
  return children
}
