// Thin fetch wrapper. The session lives in an httpOnly cookie set by the server.
const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

export async function api(path, { method = 'GET', body } = {}) {
  const res = await fetch(`${API_URL}/api${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include',
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw Object.assign(new Error(data.error || 'Something went wrong.'), { status: res.status })
  return data
}
