import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import Field from '../components/Field'
import { useAuth } from '../auth'
import { api } from '../api'

const fmt = (d) => (d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—')
const btn = 'rounded-lg border border-stone-200 px-2.5 py-1.5 text-xs font-semibold hover:bg-stone-50'

function UserDialog({ user, onClose, onSaved }) {
  const editing = !!user
  const [f, setF] = useState({ userId: '', name: user?.name || '', phone: user?.phone || '', password: '', paidDays: '30' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  async function save(e) {
    e.preventDefault(); setBusy(true); setError('')
    try {
      if (editing) await api(`/admin/users/${user.id}`, { method: 'PATCH', body: { name: f.name, phone: f.phone, ...(f.password && { password: f.password }) } })
      else await api('/admin/users', { method: 'POST', body: { ...f, paidDays: Number(f.paidDays) || 0 } })
      onSaved()
    } catch (err) { setError(err.message); setBusy(false) }
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-stone-900/40 p-4 sm:items-center" onClick={onClose}>
      <form onSubmit={save} onClick={(e) => e.stopPropagation()} className="w-full max-w-md space-y-4 rounded-3xl bg-white p-6 shadow-2xl">
        <h2 className="text-lg font-bold">{editing ? `Edit ${user.userId}` : 'Add user'}</h2>
        {!editing && <Field label="User ID" autoCapitalize="none" value={f.userId} onChange={set('userId')} placeholder="e.g. ali_boutique" />}
        <Field label="Customer name" value={f.name} onChange={set('name')} />
        <Field label="WhatsApp number" value={f.phone} onChange={set('phone')} />
        <Field label={editing ? 'New password' : 'Password'} hint={editing ? 'leave empty to keep' : 'min 6 characters'} value={f.password} onChange={set('password')} />
        {!editing && <Field label="Paid days" hint="0 = free account" inputMode="numeric" value={f.paidDays} onChange={set('paidDays')} />}
        {error && <p role="alert" className="text-sm font-medium text-red-600">{error}</p>}
        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-stone-200 py-3 font-semibold">Cancel</button>
          <button disabled={busy} className="flex-1 rounded-xl bg-brand py-3 font-bold text-white disabled:opacity-60">{busy ? 'Saving…' : 'Save'}</button>
        </div>
      </form>
    </div>
  )
}

export default function Admin() {
  const { user: me } = useAuth()
  const [users, setUsers] = useState([])
  const [q, setQ] = useState('')
  const [dialog, setDialog] = useState(null) // null | 'new' | user
  const [error, setError] = useState('')

  const load = () => api('/admin/users').then((d) => setUsers(d.users)).catch((e) => setError(e.message))
  useEffect(() => { load() }, [])

  const act = async (fn) => { setError(''); try { await fn(); await load() } catch (e) { setError(e.message) } }
  const patch = (u, body) => act(() => api(`/admin/users/${u.id}`, { method: 'PATCH', body }))
  const remove = (u) => confirm(`Delete ${u.userId}? This cannot be undone.`) && act(() => api(`/admin/users/${u.id}`, { method: 'DELETE' }))

  const customers = users.filter((u) => u.role !== 'admin')
  const stats = [
    ['Customers', customers.length],
    ['Paid (active)', customers.filter((u) => u.isPaid).length],
    ['Free', customers.filter((u) => !u.isPaid).length],
    ['Disabled', customers.filter((u) => !u.active).length],
  ]
  const shown = useMemo(() => users.filter((u) => `${u.userId} ${u.name} ${u.phone}`.toLowerCase().includes(q.toLowerCase())), [users, q])

  return (
    <div className="min-h-screen pb-16">
      <header className="border-b border-stone-200/80 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <Logo to="/admin" />
          <div className="flex gap-2 text-sm"><Link to="/app" className={btn}>Open studio</Link></div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><h1 className="text-2xl font-bold tracking-tight">Users</h1><p className="text-sm text-stone-500">Add customers and manage who is on Pro.</p></div>
          <button onClick={() => setDialog('new')} className="rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white shadow-md shadow-brand/20">+ Add user</button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map(([l, v]) => (
            <div key={l} className="rounded-2xl border border-stone-200/80 bg-white p-4"><div className="text-xs font-semibold text-stone-500">{l}</div><div className="mt-1 text-3xl font-extrabold">{v}</div></div>
          ))}
        </div>

        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by ID, name or number" className="mt-6 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm focus:border-brand focus:ring-4 focus:ring-brand/10 focus:outline-none sm:max-w-xs" />
        {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{error}</p>}

        <div className="mt-4 overflow-x-auto rounded-2xl border border-stone-200/80 bg-white">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="border-b border-stone-200 bg-stone-50 text-xs text-stone-500">
              <tr>{['User', 'Plan', 'Paid until', 'Downloads', 'Last login', 'Actions'].map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {shown.map((u) => (
                <tr key={u.id} className={u.active ? '' : 'bg-stone-50 text-stone-400'}>
                  <td className="px-4 py-3"><div className="font-semibold">{u.userId}{u.role === 'admin' && <span className="ml-2 rounded bg-stone-900 px-1.5 py-0.5 text-[10px] text-white">ADMIN</span>}</div><div className="text-xs text-stone-500">{u.name} {u.phone && `· ${u.phone}`}</div></td>
                  <td className="px-4 py-3">{!u.active ? <span className="font-semibold text-red-500">Disabled</span> : u.isPaid ? <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-brand">Pro</span> : <span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-bold text-stone-500">Free</span>}</td>
                  <td className="px-4 py-3">{fmt(u.paidUntil)}</td>
                  <td className="px-4 py-3">{u.downloads}</td>
                  <td className="px-4 py-3">{fmt(u.lastLogin)}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      <button className={btn} onClick={() => patch(u, { addDays: 30 })}>+30 days</button>
                      {u.isPaid && <button className={btn} onClick={() => patch(u, { paidUntil: null })}>Set free</button>}
                      <button className={btn} onClick={() => setDialog(u)}>Edit</button>
                      {u.id !== me.id && <button className={btn} onClick={() => patch(u, { active: !u.active })}>{u.active ? 'Disable' : 'Enable'}</button>}
                      {u.id !== me.id && <button className={`${btn} text-red-600`} onClick={() => remove(u)}>Delete</button>}
                    </div>
                  </td>
                </tr>
              ))}
              {!shown.length && <tr><td colSpan="6" className="px-4 py-10 text-center text-stone-400">No users found.</td></tr>}
            </tbody>
          </table>
        </div>
      </main>
      {dialog && <UserDialog user={dialog === 'new' ? null : dialog} onClose={() => setDialog(null)} onSaved={() => { setDialog(null); load() }} />}
    </div>
  )
}
