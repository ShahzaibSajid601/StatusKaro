import { Link } from 'react-router-dom'

export default function Logo({ to = '/', tagline }) {
  return (
    <Link to={to} className="flex items-center gap-3.5">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-dark font-serif text-[28px] leading-none font-bold text-[#e2bd6b] shadow-md shadow-brand/30">S</div>
      <div>
        <div className="font-serif text-[30px] leading-none font-bold tracking-tight">StatusKaro</div>
        {tagline && <div className="mt-1 text-[13px] text-stone-500">{tagline}</div>}
      </div>
    </Link>
  )
}
