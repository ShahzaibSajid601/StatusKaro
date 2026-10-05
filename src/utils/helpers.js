// Prices: positive number, digits/commas allowed
export const parsePrice = (v) => {
  const n = Number(String(v).replace(/,/g, '').trim())
  return Number.isFinite(n) ? n : NaN
}

export const formatPrice = (v) => {
  const n = parsePrice(v)
  return Number.isFinite(n) && n > 0 ? `Rs. ${n.toLocaleString('en-PK')}` : ''
}

// Accepts 03XXXXXXXXX, 3XXXXXXXXX, +923XXXXXXXXX, 923XXXXXXXXX (spaces/dashes ignored)
export const normalizePhone = (v) => {
  const d = String(v).replace(/[\s\-()]/g, '').replace(/^\+/, '')
  const m = d.match(/^(?:92|0)?(3\d{9})$/)
  return m ? `0${m[1]}` : null
}

export const displayPhone = (v) => {
  const p = normalizePhone(v)
  return p ? `${p.slice(0, 4)} ${p.slice(4)}` : String(v)
}

export const discountPercent = (orig, sale) => {
  const o = parsePrice(orig), s = parsePrice(sale)
  return o > 0 && s > 0 && s < o ? Math.round((1 - s / o) * 100) : 0
}

export function validate({ originalPrice, salePrice, phone, name }) {
  const e = {}
  if (!name.trim()) e.name = 'Enter the product name.'
  const o = parsePrice(originalPrice)
  if (!String(originalPrice).trim()) e.originalPrice = 'Enter the price.'
  else if (!(o > 0)) e.originalPrice = 'Price must be a number above 0.'
  if (String(salePrice).trim()) {
    const s = parsePrice(salePrice)
    if (!(s > 0)) e.salePrice = 'Sale price must be a number above 0.'
    else if (o > 0 && s >= o) e.salePrice = 'Sale price must be lower than the original price.'
  }
  if (!String(phone).trim()) e.phone = 'Enter your WhatsApp number.'
  else if (!normalizePhone(phone)) e.phone = 'Use a Pakistani mobile number, e.g. 0300 1234567.'
  return e
}

export const readFileAsDataURL = (file) =>
  new Promise((res, rej) => {
    const r = new FileReader()
    r.onload = () => res(r.result)
    r.onerror = () => rej(new Error('Could not read the image.'))
    r.readAsDataURL(file)
  })
