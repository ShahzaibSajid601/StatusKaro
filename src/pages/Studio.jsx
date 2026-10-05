import { useEffect, useMemo, useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import { TypePicker, DesignPicker, PalettePicker } from '../components/Pickers'
import ImageUpload from '../components/ImageUpload'
import ProductForm from '../components/ProductForm'
import StatusPreview from '../components/StatusPreview'
import DesignCanvas from '../components/DesignCanvas'
import AppBar from '../components/AppBar'
import { useAuth } from '../auth'
import { api } from '../api'
import { PALETTES, TYPES } from '../themes'
import { validate } from '../utils/helpers'

const DEFAULTS = {
  brand: 'Noor Collection',
  name: 'Embroidered Lawn 3-Piece',
  originalPrice: '4500',
  salePrice: '',
  phone: '0300 1234567',
  description: 'Soft lawn shirt with chiffon dupatta. Sizes S–XL. Cash on delivery available.',
}

const DEFAULT_IMAGE_ADJUSTMENT = { zoom: 1, x: 50, y: 50 }

function Card({ step, title, children }) {
  return (
    <section className="rounded-3xl border border-stone-200/80 bg-white p-5 shadow-sm shadow-stone-900/[0.03] sm:p-6">
      <h2 className="mb-5 flex items-center gap-3 text-[17px] font-bold tracking-tight">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-[13px] font-bold text-white">{step}</span>
        {title}
      </h2>
      {children}
    </section>
  )
}

function DownloadButton({ busy, onClick, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className={`flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-b from-brand to-brand-dark px-6 py-4 text-base font-bold text-white shadow-lg shadow-brand/25 ring-1 ring-brand-dark transition hover:brightness-110 active:scale-[0.99] disabled:opacity-60 ${className}`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 20h14" /></svg>
      {busy ? 'Creating image…' : 'Download Status'}
    </button>
  )
}

export default function Studio() {
  const { user } = useAuth()
  const [type, setType] = useState('new')
  const [layoutId, setLayoutId] = useState('classic')
  const [paletteId, setPaletteId] = useState('emerald')
  const [image, setImage] = useState('')
  const [imageAdjustment, setImageAdjustment] = useState(DEFAULT_IMAGE_ADJUSTMENT)
  const [values, setValues] = useState(DEFAULTS)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState(null)
  const [showErrors, setShowErrors] = useState(false)
  const exportRef = useRef(null)

  // Auto-hide the toast
  useEffect(() => {
    if (!message) return
    const t = setTimeout(() => setMessage(null), 5000)
    return () => clearTimeout(t)
  }, [message])

  const errors = useMemo(() => validate(values), [values])
  const hasErrors = Object.keys(errors).length > 0
  const data = {
    ...values, image, imageAdjustment, type,
    label: TYPES.find((t) => t.id === type).label,
    theme: PALETTES.find((p) => p.id === paletteId),
    watermark: !user.isPaid,
  }

  async function download() {
    setShowErrors(true)
    setMessage(null)
    if (hasErrors) return setMessage({ type: 'error', text: 'Please fix the highlighted fields first.' })
    setBusy(true)
    try {
      await document.fonts.ready
      const opts = { width: 1080, height: 1920, pixelRatio: 1, cacheBust: true }
      await toPng(exportRef.current, opts) // warm-up pass so fonts/images are embedded
      const url = await toPng(exportRef.current, opts)
      const a = document.createElement('a')
      a.href = url
      a.download = `statuskaro-${values.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'status'}.png`
      a.click()
      api('/me/download', { method: 'POST' }).catch(() => {})
      setMessage({ type: 'ok', text: user.isPaid ? 'Downloaded! Open WhatsApp → Status → add it from your gallery.' : 'Downloaded with watermark. Upgrade to Pro to remove it.' })
    } catch {
      setMessage({ type: 'error', text: 'Could not create the image. Try a different photo and download again.' })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen pb-28 lg:pb-12">
      <AppBar />

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-10">
        {/* Preview first on mobile so every change is visible straight away */}
        <div className="order-1 lg:sticky lg:top-6 lg:order-2">
          <StatusPreview layoutId={layoutId} data={data} />
          <DownloadButton busy={busy} onClick={download} className="mx-auto mt-6 hidden max-w-[330px] lg:flex" />
          <p className="mt-3 hidden text-center text-xs text-stone-400 lg:block">1080 × 1920 PNG · ready for WhatsApp Status</p>
        </div>

        <div className="order-2 space-y-5 lg:order-1">
          <Card step="1" title="What are you posting?"><TypePicker value={type} onChange={setType} /></Card>
          <Card step="2" title="Pick a design">
            <DesignPicker value={layoutId} onChange={setLayoutId} data={data} />
            <h3 className="mt-6 mb-3 text-[13px] font-semibold text-stone-700">Colours</h3>
            <PalettePicker value={paletteId} onChange={setPaletteId} />
          </Card>
          <Card step="3" title="Add your product photo"><ImageUpload image={image} onChange={setImage} adjustment={imageAdjustment} onAdjustmentChange={setImageAdjustment} /></Card>
          <Card step="4" title="Product details">
            <ProductForm values={values} errors={showErrors ? errors : filterTouched(errors, values)} onChange={setValues} />
          </Card>
        </div>
      </main>

      {/* Mobile: download stays within thumb reach */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-stone-200 bg-white/90 p-3 backdrop-blur lg:hidden">
        <DownloadButton busy={busy} onClick={download} />
      </div>

      {message && (
        <div role="status" className={`toast fixed bottom-24 left-1/2 z-30 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-2xl px-5 py-3.5 text-center text-sm font-semibold text-white shadow-xl lg:bottom-8 ${message.type === 'ok' ? 'bg-brand' : 'bg-red-600'}`}>
          {message.text}
        </div>
      )}

      {/* Full-size copy used only for PNG export (kept off-screen) */}
      <div aria-hidden="true" style={{ position: 'fixed', left: -10000, top: 0, pointerEvents: 'none' }}>
        <div ref={exportRef} style={{ width: 1080, height: 1920 }}><DesignCanvas layoutId={layoutId} data={data} /></div>
      </div>
    </div>
  )
}

// Show errors only for fields the user has changed, so the form starts calm.
function filterTouched(errors, values) {
  const out = {}
  for (const k of Object.keys(errors)) if (values[k] !== DEFAULTS[k]) out[k] = errors[k]
  return out
}
