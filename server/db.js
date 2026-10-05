import Database from 'better-sqlite3'
import bcrypt from 'bcryptjs'
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

const dir = path.resolve(process.env.DATA_DIR || 'data')
fs.mkdirSync(dir, { recursive: true })

export const db = new Database(path.join(dir, 'statuskaro.db'))
db.pragma('journal_mode = WAL')
db.exec(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  paid_until TEXT,                 -- ISO date; user is "paid" while this is in the future
  active INTEGER NOT NULL DEFAULT 1,
  downloads INTEGER NOT NULL DEFAULT 0,
  last_login TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
)`)

// JWT secret: env var, or generated once and kept in the data folder.
export const JWT_SECRET = (() => {
  if (process.env.JWT_SECRET) return process.env.JWT_SECRET
  const f = path.join(dir, 'jwt.secret')
  if (!fs.existsSync(f)) fs.writeFileSync(f, crypto.randomBytes(48).toString('hex'), { mode: 0o600 })
  return fs.readFileSync(f, 'utf8')
})()

export const hash = (pw) => bcrypt.hashSync(pw, 10)
export const verify = (pw, h) => bcrypt.compareSync(pw, h)

export const isPaid = (row) => !!row.paid_until && new Date(row.paid_until) > new Date()

export const toPublic = (r) => ({
  id: r.id, userId: r.user_id, name: r.name, phone: r.phone, role: r.role,
  active: !!r.active, paidUntil: r.paid_until, isPaid: isPaid(r),
  downloads: r.downloads, lastLogin: r.last_login, createdAt: r.created_at,
})

// First run: create the admin account.
if (!db.prepare("SELECT 1 FROM users WHERE role = 'admin'").get()) {
  const userId = (process.env.ADMIN_USER || 'admin').toLowerCase()
  const password = process.env.ADMIN_PASSWORD || crypto.randomBytes(6).toString('base64url')
  db.prepare("INSERT INTO users (user_id, name, password_hash, role) VALUES (?, 'Admin', ?, 'admin')").run(userId, hash(password))
  console.log('\n  Admin account created')
  console.log(`  User ID : ${userId}`)
  console.log(`  Password: ${password}${process.env.ADMIN_PASSWORD ? ' (from ADMIN_PASSWORD)' : '  <- shown once, change it after login'}\n`)
}
