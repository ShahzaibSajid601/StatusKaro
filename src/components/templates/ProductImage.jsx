// Shows the uploaded photo, or an elegant placeholder when none is chosen.
export default function ProductImage({ src, className = '' }) {
  if (src) return <img src={src} alt="" className={`object-cover ${className}`} />
  return (
    <div className={`flex flex-col items-center justify-center gap-5 bg-gradient-to-br from-[#e9e2d4] to-[#cfc5b0] text-[#8a7d62] ${className}`}>
      <svg width="130" height="130" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M8 3 4 6l2 3 2-1v13h8V8l2 1 2-3-4-3c-.5 1.5-2 2.5-4 2.5S8.500 4.500 8 3Z" />
      </svg>
      <span className="font-mont text-[34px] font-semibold tracking-wide">Your product photo</span>
    </div>
  )
}
