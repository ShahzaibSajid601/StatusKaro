import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import Field from '../components/Field'
import { useAuth } from '../auth'
import { CONFIG, waLink } from '../config'

export default function Login() {
  const { user, login } = useAuth()
  const nav = useNavigate()
  const [form, setForm] = useState({ userId: '', password: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (user) return <Navigate to={user.role === 'admin' ? '/admin' : '/app'} replace />

  async function submit(e) {
    e.preventDefault()
    setBusy(true); setError('')
    try {
      const u = await login(form.userId, form.password)
      nav(u.role === 'admin' ? '/admin' : '/app', { replace: true })
    } catch (err) { setError(err.message) } finally { setBusy(false) }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-10">
      <Logo />
      <form onSubmit={submit} className="mt-8 w-full max-w-sm space-y-4 rounded-3xl border border-stone-200/80 bg-white p-6 shadow-xl shadow-stone-900/5 sm:p-8">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-1 text-sm text-stone-500">Log in with the user ID we gave you.</p>
        </div>
        <Field label="User ID" autoComplete="username" autoCapitalize="none" value={form.userId} onChange={(e) => setForm({ ...form, userId: e.target.value })} />
        <Field label="Password" type="password" autoComplete="current-password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <p role="alert" className="rounded-xl bg-red-50 px-3.5 py-2.5 text-sm font-medium text-red-600">{error}</p>}
        <button disabled={busy || !form.userId || !form.password} className="w-full rounded-2xl bg-gradient-to-b from-brand to-brand-dark py-3.5 font-bold text-white shadow-lg shadow-brand/25 transition hover:brightness-110 disabled:opacity-50">
          {busy ? 'Logging in…' : 'Log in'}
        </button>
      </form>
      <p className="mt-6 text-sm text-stone-500">
        No account yet? <a className="font-semibold text-brand" href={waLink('Hi! I want to get StatusKaro access.')} target="_blank" rel="noreferrer">Message us on WhatsApp</a>
      </p>
      <p className="mt-2 text-xs text-stone-400">{CONFIG.support}</p>
    </div>
  )
}
