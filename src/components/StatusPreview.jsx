import ScaledDesign from './ScaledDesign'

// Phone-style frame around the live preview.
export default function StatusPreview({ layoutId, data }) {
  return (
    <div className="mx-auto w-full max-w-[330px] rounded-[40px] bg-stone-900 p-[9px] shadow-2xl shadow-stone-900/25 ring-1 ring-stone-900/10">
      <div className="relative overflow-hidden rounded-[32px] bg-white">
        <ScaledDesign layoutId={layoutId} data={data} />
        <div className="pointer-events-none absolute top-2 left-1/2 h-[18px] w-[72px] -translate-x-1/2 rounded-full bg-stone-900/90" />
      </div>
    </div>
  )
}
