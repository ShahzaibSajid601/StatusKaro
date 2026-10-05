import { displayPhone } from '../../utils/helpers'

// Shared WhatsApp number + ORDER NOW footer; colours come from props.
export default function OrderBar({ phone, bg, fg, btnBg, btnFg, border, className = '' }) {
  return (
    <div className={`flex items-center justify-between rounded-full py-[18px] pr-[18px] pl-14 ${className}`} style={{ background: bg, color: fg, border }}>
      <div>
        <div className="font-mont text-[24px] font-semibold tracking-[0.15em] opacity-70">WHATSAPP</div>
        <div className="font-mont text-[48px] font-extrabold tracking-wide">{displayPhone(phone)}</div>
      </div>
      <div className="rounded-full px-12 py-[34px] font-mont text-[32px] font-extrabold tracking-[0.12em]" style={{ background: btnBg, color: btnFg }}>
        ORDER NOW
      </div>
    </div>
  )
}
