import { LAYOUTS } from './templates'
import { PALETTES, TYPES } from '../themes'
import ScaledDesign from './ScaledDesign'

const ring = (on) => (on ? 'border-brand ring-2 ring-brand/25 shadow-md shadow-brand/10' : 'border-stone-200 hover:border-stone-300')

export function TypePicker({ value, onChange }) {
  return (
    <div role="radiogroup" aria-label="Template" className="grid grid-cols-3 gap-1.5 rounded-2xl bg-stone-100 p-1.5">
      {TYPES.map((t) => (
        <button key={t.id} type="button" role="radio" aria-checked={t.id === value} onClick={() => onChange(t.id)}
          className={`rounded-xl px-2 py-3 text-sm font-semibold transition ${t.id === value ? 'bg-white text-brand shadow-sm' : 'text-stone-500 hover:text-stone-800'}`}>
          {t.label}
        </button>
      ))}
    </div>
  )
}

// Thumbnails are the real designs, filled with the seller's own photo and colours.
export function DesignPicker({ value, onChange, data }) {
  return (
    <div role="radiogroup" aria-label="Design" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {LAYOUTS.map((l) => (
        <button key={l.id} type="button" role="radio" aria-checked={l.id === value} onClick={() => onChange(l.id)}
          className={`rounded-2xl border bg-white p-1.5 text-center transition ${ring(l.id === value)}`}>
          <div className="overflow-hidden rounded-xl ring-1 ring-stone-900/5"><ScaledDesign layoutId={l.id} data={{ ...data, watermark: false }} /></div>
          <div className={`py-2 text-[13px] font-semibold ${l.id === value ? 'text-brand' : 'text-stone-600'}`}>{l.label}</div>
        </button>
      ))}
    </div>
  )
}

export function PalettePicker({ value, onChange }) {
  return (
    <div role="radiogroup" aria-label="Colours" className="grid grid-cols-3 gap-3 sm:grid-cols-6">
      {PALETTES.map((p) => (
        <button key={p.id} type="button" role="radio" aria-checked={p.id === value} onClick={() => onChange(p.id)}
          className={`rounded-2xl border bg-white p-2.5 text-center transition ${ring(p.id === value)}`}>
          <div className="mx-auto flex h-10 w-full overflow-hidden rounded-full ring-1 ring-stone-900/10">
            <span className="flex-1" style={{ background: p.primary }} /><span className="flex-1" style={{ background: p.accent }} /><span className="flex-1" style={{ background: p.bg }} />
          </div>
          <div className="mt-2 text-xs font-semibold text-stone-600">{p.name}</div>
        </button>
      ))}
    </div>
  )
}
