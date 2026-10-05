import { LAYOUTS } from './templates'

// One 1080x1920 design. Free accounts get a diagonal watermark.
export default function DesignCanvas({ layoutId, data }) {
  const { Component } = LAYOUTS.find((l) => l.id === layoutId)
  return (
    <div className="relative h-[1920px] w-[1080px]">
      <Component data={data} />
      {data.watermark && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <span className="-rotate-[24deg] font-mont text-[130px] font-extrabold tracking-widest whitespace-nowrap text-white/40 [text-shadow:0_2px_14px_rgba(0,0,0,0.4)]">StatusKaro</span>
        </div>
      )}
    </div>
  )
}
