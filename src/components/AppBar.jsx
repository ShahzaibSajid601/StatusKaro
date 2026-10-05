import { Link } from 'react-router-dom'
import Logo from './Logo'
import { useAuth } from '../auth'
import { waLink } from '../config'

const fmt = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

export default function AppBar() {
  const { user, logout } = useAuth()
  const name = user.name?.trim() || user.userId
  return (
    <header className="border-b border-stone-200/80 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <Logo to="/app" />
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <div className="mr-1 flex items-center gap-2">
            <div className="text-right leading-tight">
              <div className="max-w-[140px] truncate font-bold text-stone-800 sm:max-w-[180px]">Welcome, {name}</div>
              <div className="mt-1 text-[11px] font-bold text-brand">{user.isPaid ? 'Pro Member' : 'Free Member'}</div>
            </div>
          </div>
          {user.isPaid
            ? <span className="hidden rounded-full bg-emerald-50 px-3 py-1.5 font-semibold text-brand md:inline">Pro · until {fmt(user.paidUntil)}</span>
            : <a href={waLink(`Hi! I want to upgrade StatusKaro to Pro. My user ID: ${user.userId}`)} target="_blank" rel="noreferrer" className="rounded-full bg-[#e2bd6b] px-3.5 py-1.5 font-bold text-[#10281f]">Upgrade to Pro</a>}
          {user.role === 'admin' && <Link to="/admin" className="rounded-full border border-stone-200 px-3.5 py-1.5 font-semibold hover:bg-stone-50">Admin</Link>}
          <button onClick={logout} className="rounded-full border border-stone-200 px-3.5 py-1.5 font-semibold text-stone-600 hover:bg-stone-50">Log out</button>
        </div>
      </div>
    </header>
  )
}
