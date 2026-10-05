import { discountPercent, displayPhone, formatPrice } from '../../utils/helpers'

// Shows the uploaded photo, or a calm placeholder when none is chosen.
export function ProductImage({ src, className = '', style, adjustment }) {
  const crop = { zoom: 1, x: 50, y: 50, ...adjustment }
  if (src) return <img src={src} alt="" style={{ ...style, objectPosition: `${crop.x}% ${crop.y}%`, transform: `scale(${crop.zoom})` }} className={`object-cover ${className}`} />
  return (
    <div style={style} className={`flex flex-col items-center justify-center gap-5 bg-gradient-to-br from-[#ece6da] to-[#d3c9b6] text-[#8a7d62] ${className}`}>
      <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M8 3 4 6l2 3 2-1v13h8V8l2 1 2-3-4-3c-.5 1.5-2 2.5-4 2.5S8.5 4.5 8 3Z" />
      </svg>
      <span className="font-mont text-[32px] font-semibold">Your product photo</span>
    </div>
  )
}

export function Brand({ name, color, size = 46 }) {
  if (!name.trim()) return <span />
  return <div className="max-w-[560px] truncate font-serif font-bold tracking-wide" style={{ fontSize: size, color }}>{name}</div>
}

export function Badge({ label, bg, fg }) {
  return (
    <div className="rounded-full px-9 py-4 font-mont text-[28px] font-extrabold tracking-[0.22em] whitespace-nowrap" style={{ background: bg, color: fg }}>
      {label.toUpperCase()}
    </div>
  )
}

// Price row. Only the Sale type shows the struck-through original and % off.
export function Price({ data, color, muted, align = 'left' }) {
  const t = data.theme
  const orig = formatPrice(data.originalPrice)
  const sale = formatPrice(data.salePrice)
  const isSale = data.type === 'sale'
  const off = isSale ? discountPercent(data.originalPrice, data.salePrice) : 0
  const justify = align === 'center' ? 'justify-center' : ''
  return (
    <div className={`flex flex-wrap items-center gap-x-7 gap-y-3 ${justify}`}>
      <span className="font-mont text-[72px] leading-none font-extrabold" style={{ color }}>{sale || orig}</span>
      {isSale && sale && orig && <span className="font-mont text-[40px] font-semibold line-through decoration-[3px]" style={{ color: muted }}>{orig}</span>}
      {off > 0 && <span className="rounded-full px-6 py-2 font-mont text-[28px] font-extrabold" style={{ background: t.accent, color: t.onAccent }}>{off}% OFF</span>}
      {data.type === 'limited' && <span className="rounded-full px-6 py-2 font-mont text-[26px] font-bold" style={{ background: t.accent, color: t.onAccent }}>Few pieces left</span>}
    </div>
  )
}

export function OrderBar({ phone, bg, fg, btnBg, btnFg, className = '' }) {
  return (
    <div className={`flex items-center justify-between rounded-full py-[16px] pr-[16px] pl-12 ${className}`} style={{ background: bg, color: fg }}>
      <div>
        <div className="font-mont text-[22px] font-semibold tracking-[0.18em] opacity-70">WHATSAPP</div>
        <div className="font-mont text-[46px] font-extrabold">{displayPhone(phone)}</div>
      </div>
      <div className="rounded-full px-11 py-[32px] font-mont text-[30px] font-extrabold tracking-[0.12em]" style={{ background: btnBg, color: btnFg }}>ORDER NOW</div>
    </div>
  )
}

export const Name = ({ children, color, size = 96, className = '' }) => (
  <h2 className={`line-clamp-2 font-serif leading-[0.98] font-semibold ${className}`} style={{ color, fontSize: size }}>{children}</h2>
)

export const Desc = ({ children, color, lines = 2, className = '' }) => (
  <p className={`font-mont text-[31px] leading-[1.45] font-semibold ${className}`} style={{ color, display: '-webkit-box', WebkitLineClamp: lines, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{children}</p>
)
