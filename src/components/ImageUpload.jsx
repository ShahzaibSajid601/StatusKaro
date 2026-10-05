import { useRef, useState } from 'react'
import { readFileAsDataURL } from '../utils/helpers'

const MAX_MB = 10

const DEFAULT_ADJUSTMENT = { zoom: 1, x: 50, y: 50 }

export default function ImageUpload({ image, onChange, adjustment = DEFAULT_ADJUSTMENT, onAdjustmentChange }) {
  const input = useRef(null)
  const [error, setError] = useState('')
  const current = { ...DEFAULT_ADJUSTMENT, ...adjustment }

  async function handle(file) {
    if (!file) return
    if (!file.type.startsWith('image/')) return setError('Please choose an image file (JPG, PNG or WebP).')
    if (file.size > MAX_MB * 1024 * 1024) return setError(`Image is too large. Keep it under ${MAX_MB} MB.`)
    try {
      setError('')
      // Data URL (not blob URL) so the PNG export can always embed it.
      onChange(await readFileAsDataURL(file))
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div>
      <input ref={input} type="file" accept="image/*" className="sr-only" onChange={(e) => { handle(e.target.files[0]); e.target.value = '' }} />
      <button
        type="button"
        onClick={() => input.current.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); handle(e.dataTransfer.files[0]) }}
        className="flex w-full items-center gap-4 rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-3 text-left transition hover:border-brand hover:bg-emerald-50/40"
      >
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-stone-200">
          {image ? <img src={image} alt="Your product" className="h-full w-full object-cover" style={{ objectPosition: `${current.x}% ${current.y}%`, transform: `scale(${current.zoom})` }} /> : (
            <div className="flex h-full items-center justify-center text-stone-400">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 16V4m0 0 4 4m-4-4L8 8M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" /></svg>
            </div>
          )}
        </div>
        <div>
          <div className="text-sm font-semibold">{image ? 'Change photo' : 'Upload product photo'}</div>
          <div className="text-xs text-stone-500">Tap to choose, or drop a photo here</div>
        </div>
      </button>
      {error && <p role="alert" className="mt-2 text-xs font-medium text-red-600">{error}</p>}
      {image && onAdjustmentChange && (
        <div className="mt-4 space-y-3 rounded-2xl bg-stone-50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-stone-800">Adjust photo</div>
              <div className="text-xs text-stone-500">Move the product into the best position.</div>
            </div>
            <button type="button" onClick={() => onAdjustmentChange(DEFAULT_ADJUSTMENT)} className="text-xs font-bold text-brand hover:underline">Reset</button>
          </div>
          <Range label="Zoom" value={current.zoom} min="1" max="2.5" step="0.05" display={`${Math.round(current.zoom * 100)}%`} onChange={(value) => onAdjustmentChange({ ...current, zoom: Number(value) })} />
          <Range label="Horizontal" value={current.x} min="0" max="100" step="1" display={`${Math.round(current.x)}%`} onChange={(value) => onAdjustmentChange({ ...current, x: Number(value) })} />
          <Range label="Vertical" value={current.y} min="0" max="100" step="1" display={`${Math.round(current.y)}%`} onChange={(value) => onAdjustmentChange({ ...current, y: Number(value) })} />
        </div>
      )}
    </div>
  )
}

function Range({ label, value, min, max, step, display, onChange }) {
  return (
    <label className="block">
      <div className="mb-1 flex justify-between text-xs font-semibold text-stone-600"><span>{label}</span><span>{display}</span></div>
      <input type="range" value={value} min={min} max={max} step={step} onChange={(e) => onChange(e.target.value)} className="h-2 w-full cursor-pointer accent-brand" />
    </label>
  )
}
