import express from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import jwt from 'jsonwebtoken'
import path from 'node:path'
import fs from 'node:fs'
import { db, JWT_SECRET, hash, verify, toPublic } from './db.js'

const app = express()
const PORT = process.env.PORT || 3001
const COOKIE = 'sk_token'
const DAY = 86400000

app.set('trust proxy', 1) // correct IPs/HTTPS behind Nginx, Render, Railway, etc.
app.use(helmet({ contentSecurityPolicy: false }))
app.use(express.json({ limit: '20kb' }))
app.use(cookieParser())

const ID_RE = /^[a-z0-9._-]{3,24}$/
const fail = (res, code, error) => res.status(code).json({ error })
const addDays = (from, days) => new Date(from.getTime() + days * DAY).toISOString()

// ---- auth middleware: loads the user from the DB on every request, so
// disabling or deleting an account takes effect immediately.
function auth(req, res, next) {
  try {
    const { sub } = jwt.verify(req.cookies[COOKIE], JWT_SECRET)
    const row = db.prepare('SELECT * FROM users WHERE id = ?').get(sub)
    if (!row || !row.active) throw new Error('inactive')
    req.user = row
    next()
  } catch {
    fail(res, 401, 'Please log in.')
  }
}
const adminOnly = (req, res, next) => (req.user.role === 'admin' ? next() : fail(res, 403, 'Admins only.'))

// ---- auth routes
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: true, legacyHeaders: false, message: { error: 'Too many attempts. Try again in 15 minutes.' } })

app.post('/api/auth/login', loginLimiter, (req, res) => {
  const userId = String(req.body?.userId || '').trim().toLowerCase()
  const password = String(req.body?.password || '')
  const row = db.prepare('SELECT * FROM users WHERE user_id = ?').get(userId)
  if (!row || !verify(password, row.password_hash)) return fail(res, 401, 'Wrong user ID or password.')
  if (!row.active) return fail(res, 403, 'This account is disabled. Please contact support.')
  db.prepare("UPDATE users SET last_login = datetime('now') WHERE id = ?").run(row.id)
  const token = jwt.sign({ sub: row.id }, JWT_SECRET, { expiresIn: '7d' })
  res.cookie(COOKIE, token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 7 * DAY })
  res.json({ user: toPublic(row) })
})

app.post('/api/auth/logout', (_req, res) => { res.clearCookie(COOKIE); res.json({ ok: true }) })
app.get('/api/auth/me', auth, (req, res) => res.json({ user: toPublic(req.user) }))

// ---- signed-in user
app.post('/api/me/password', auth, (req, res) => {
  const { current = '', next = '' } = req.body || {}
  if (!verify(String(current), req.user.password_hash)) return fail(res, 400, 'Current password is wrong.')
  if (String(next).length < 6) return fail(res, 400, 'New password must be at least 6 characters.')
  db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(hash(String(next)), req.user.id)
  res.json({ ok: true })
})
app.post('/api/me/download', auth, (req, res) => {
  db.prepare('UPDATE users SET downloads = downloads + 1 WHERE id = ?').run(req.user.id)
  res.json({ ok: true })
})

// ---- admin: user management
const admin = express.Router()
admin.use(auth, adminOnly)

admin.get('/users', (_req, res) => {
  res.json({ users: db.prepare('SELECT * FROM users ORDER BY created_at DESC, id DESC').all().map(toPublic) })
})

admin.post('/users', (req, res) => {
  const b = req.body || {}
  const userId = String(b.userId || '').trim().toLowerCase()
  const password = String(b.password || '')
  if (!ID_RE.test(userId)) return fail(res, 400, 'User ID must be 3–24 characters: letters, numbers, . _ -')
  if (password.length < 6) return fail(res, 400, 'Password must be at least 6 characters.')
  if (db.prepare('SELECT 1 FROM users WHERE user_id = ?').get(userId)) return fail(res, 409, 'That user ID is already taken.')
  const days = Number(b.paidDays) || 0
  db.prepare('INSERT INTO users (user_id, name, phone, password_hash, paid_until) VALUES (?, ?, ?, ?, ?)')
    .run(userId, String(b.name || '').slice(0, 60), String(b.phone || '').slice(0, 20), hash(password), days > 0 ? addDays(new Date(), days) : null)
  res.status(201).json({ user: toPublic(db.prepare('SELECT * FROM users WHERE user_id = ?').get(userId)) })
})

admin.patch('/users/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id)
  if (!row) return fail(res, 404, 'User not found.')
  const b = req.body || {}
  const isSelf = row.id === req.user.id
  if (b.active === false && isSelf) return fail(res, 400, "You can't disable your own account.")

  const next = { name: row.name, phone: row.phone, active: row.active, paid_until: row.paid_until, password_hash: row.password_hash }
  if (typeof b.name === 'string') next.name = b.name.slice(0, 60)
  if (typeof b.phone === 'string') next.phone = b.phone.slice(0, 20)
  if (typeof b.active === 'boolean') next.active = b.active ? 1 : 0
  if (b.paidUntil === null) next.paid_until = null // back to free
  else if (typeof b.paidUntil === 'string' && !Number.isNaN(Date.parse(b.paidUntil))) next.paid_until = new Date(b.paidUntil).toISOString()
  if (Number(b.addDays) > 0) { // extend from today, or from current expiry if still running
    const start = row.paid_until && new Date(row.paid_until) > new Date() ? new Date(row.paid_until) : new Date()
    next.paid_until = addDays(start, Number(b.addDays))
  }
  if (b.password) {
    if (String(b.password).length < 6) return fail(res, 400, 'Password must be at least 6 characters.')
    next.password_hash = hash(String(b.password))
  }
  db.prepare('UPDATE users SET name=?, phone=?, active=?, paid_until=?, password_hash=? WHERE id=?')
    .run(next.name, next.phone, next.active, next.paid_until, next.password_hash, row.id)
  res.json({ user: toPublic(db.prepare('SELECT * FROM users WHERE id = ?').get(row.id)) })
})

admin.delete('/users/:id', (req, res) => {
  if (Number(req.params.id) === req.user.id) return fail(res, 400, "You can't delete your own account.")
  db.prepare('DELETE FROM users WHERE id = ?').run(req.params.id)
  res.json({ ok: true })
})
app.use('/api/admin', admin)
app.use('/api', (_req, res) => fail(res, 404, 'Not found.'))

// ---- production: serve the built frontend
const dist = path.resolve('dist')
if (fs.existsSync(dist)) {
  app.use(express.static(dist))
  app.use((req, res, next) => (req.method === 'GET' ? res.sendFile(path.join(dist, 'index.html')) : next()))
}

app.listen(PORT, () => console.log(`StatusKaro server running on http://localhost:${PORT}`))
