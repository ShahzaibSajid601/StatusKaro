import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import ScaledDesign from '../components/ScaledDesign'
import { PALETTES } from '../themes'
import { SAMPLE_IMAGE } from '../samples'
import { CONFIG, waLink } from '../config'
import { useAuth } from '../auth'

const demo = (type, label, paletteId, extra = {}) => ({
  brand: 'Noor Collection', name: 'Embroidered Lawn 3-Piece', originalPrice: '4500', salePrice: '', phone: '0300 1234567',
  description: 'Soft lawn shirt with chiffon dupatta. Sizes S–XL.', image: SAMPLE_IMAGE, type, label,
  theme: PALETTES.find((p) => p.id === paletteId), watermark: false, ...extra,
})

const SHOWCASE = [
  { layout: 'split', data: demo('new', 'New Arrival', 'emerald') },
  { layout: 'poster', data: demo('sale', 'Sale', 'plum', { salePrice: '3199' }) },
  { layout: 'fullbleed', data: demo('limited', 'Limited Stock', 'noir') },
  { layout: 'classic', data: demo('sale', 'Sale', 'coral', { salePrice: '3499' }) },
]

const FEATURES = [
  ['Ready in 30 seconds', 'Upload a photo, type the price, download. No design skills needed.'],
  ['Your brand on every post', 'Your shop name, price and WhatsApp number are placed professionally on each design.'],
  ['8 designs × 6 colour themes', 'Switch the look instantly so your Status never looks repeated.'],
  ['Made for WhatsApp', 'Perfect 9:16 PNG, sharp on every phone. Also great for Instagram Stories.'],
]
const STEPS = [['Choose', 'New Arrival, Sale or Limited Stock, then pick a design and colours.'], ['Add your product', 'Upload the photo and enter name, price and your WhatsApp number.'], ['Download & post', 'Download the image and add it to your WhatsApp Status.']]
const FAQ = [
  ['How do I get an account?', 'Message us on WhatsApp. We create your user ID and password after you choose a plan.'],
  ['What is the difference between Free and Pro?', 'Free designs include a StatusKaro watermark. Pro removes it so the image carries only your brand.'],
  ['How do I pay?', 'Pay by JazzCash, Easypaisa or bank transfer and send us the screenshot. Your account is upgraded right away.'],
  ['Do I need to install anything?', 'No. It works in your phone or computer browser.'],
]

const Cta = ({ className = '', children = 'Get access on WhatsApp' }) => (
  <a href={waLink('Hi! I want to get StatusKaro access.')} target="_blank" rel="noreferrer" className={`inline-flex items-center justify-center rounded-2xl bg-gradient-to-b from-brand to-brand-dark px-7 py-4 font-bold text-white shadow-lg shadow-brand/25 transition hover:brightness-110 ${className}`}>{children}</a>
)

function Phone({ item, className = '' }) {
  return (
    <div className={`w-[46%] max-w-[250px] rounded-[34px] bg-stone-900 p-[7px] shadow-2xl shadow-stone-900/30 ${className}`}>
      <div className="overflow-hidden rounded-[27px]"><ScaledDesign layoutId={item.layout} data={item.data} /></div>
    </div>
  )
}

export default function Landing() {
  const { user } = useAuth()
  return (
    <div className="overflow-x-hidden">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <Logo />
        <div className="flex items-center gap-3 text-sm font-semibold">
          <a href="#pricing" className="hidden text-stone-600 hover:text-stone-900 sm:block">Pricing</a>
          <Link to={user ? '/app' : '/login'} className="rounded-full border border-stone-300 bg-white px-5 py-2.5 hover:bg-stone-50">{user ? 'Open app' : 'Log in'}</Link>
        </div>
      </nav>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-8 pb-20 sm:px-6 lg:grid-cols-2 lg:pt-16">
        <div>
          <span className="rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-brand">For Pakistani clothing sellers</span>
          <h1 className="mt-6 font-serif text-[52px] leading-[0.98] font-bold tracking-tight sm:text-[72px]">Professional WhatsApp Status in <span className="text-brand italic">30 seconds.</span></h1>
          <p className="mt-6 max-w-lg text-lg text-stone-600">Turn your product photo into a polished, branded Status image. New arrivals, sales and limited stock — no designer needed.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Cta />
            <a href="#designs" className="inline-flex items-center rounded-2xl border border-stone-300 bg-white px-7 py-4 font-bold hover:bg-stone-50">See designs</a>
          </div>
          <p className="mt-4 text-sm text-stone-500">Free plan available · Pro {CONFIG.price} {CONFIG.period}</p>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-x-6 top-10 bottom-0 rounded-[48px] bg-gradient-to-br from-emerald-100 to-amber-100" />
          <div className="relative flex w-full items-center justify-center">
            <Phone item={SHOWCASE[0]} className="-rotate-6 translate-x-5" />
            <Phone item={SHOWCASE[1]} className="z-10 -translate-y-6 scale-105" />
            <Phone item={SHOWCASE[2]} className="-translate-x-5 rotate-6" />
          </div>
        </div>
      </section>

      <section className="border-y border-stone-200/80 bg-white py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {FEATURES.map(([t, d], i) => (
            <div key={t} className="rounded-3xl border border-stone-200/80 bg-[#faf8f4] p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand font-serif text-xl font-bold text-[#e2bd6b]">{i + 1}</div>
              <h3 className="mt-5 text-lg font-bold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="designs" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-center font-serif text-[44px] leading-none font-bold">Designs that sell</h2>
        <p className="mt-3 text-center text-stone-600">Clean, premium layouts in colours that match your brand.</p>
        <div className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {SHOWCASE.map((s, i) => <div key={i} className="overflow-hidden rounded-3xl border border-stone-200 bg-white p-2 shadow-lg shadow-stone-900/5"><div className="overflow-hidden rounded-2xl"><ScaledDesign layoutId={s.layout} data={s.data} /></div></div>)}
        </div>
      </section>

      <section className="bg-stone-900 py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center font-serif text-[44px] leading-none font-bold">How it works</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {STEPS.map(([t, d], i) => (
              <div key={t}><div className="font-serif text-6xl font-bold text-[#e2bd6b]">0{i + 1}</div><h3 className="mt-3 text-xl font-bold">{t}</h3><p className="mt-2 text-stone-400">{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <h2 className="text-center font-serif text-[44px] leading-none font-bold">Simple pricing</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-stone-200 bg-white p-8">
            <h3 className="text-lg font-bold">Free</h3>
            <div className="mt-3 font-serif text-5xl font-bold">Rs. 0</div>
            <ul className="mt-6 space-y-3 text-sm text-stone-600">{['All 8 designs and 6 colour themes', 'Unlimited downloads', 'StatusKaro watermark on images'].map((x) => <li key={x}>✓ {x}</li>)}</ul>
            <a href={waLink('Hi! I want a free StatusKaro account.')} target="_blank" rel="noreferrer" className="mt-8 block rounded-2xl border border-stone-300 py-3.5 text-center font-bold hover:bg-stone-50">Get free account</a>
          </div>
          <div className="relative rounded-3xl bg-gradient-to-b from-brand to-brand-dark p-8 text-white shadow-xl shadow-brand/30">
            <span className="absolute top-6 right-6 rounded-full bg-[#e2bd6b] px-3 py-1 text-xs font-bold text-[#10281f]">Best for sellers</span>
            <h3 className="text-lg font-bold">Pro</h3>
            <div className="mt-3 font-serif text-5xl font-bold">{CONFIG.price} <span className="font-sans text-base font-medium text-emerald-100/80">{CONFIG.period}</span></div>
            <ul className="mt-6 space-y-3 text-sm text-emerald-50">{['Everything in Free', 'No watermark — only your brand', 'Priority WhatsApp support'].map((x) => <li key={x}>✓ {x}</li>)}</ul>
            <a href={waLink('Hi! I want StatusKaro Pro.')} target="_blank" rel="noreferrer" className="mt-8 block rounded-2xl bg-[#e2bd6b] py-3.5 text-center font-bold text-[#10281f] hover:brightness-105">Get Pro on WhatsApp</a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        <h2 className="text-center font-serif text-[44px] leading-none font-bold">Questions</h2>
        <div className="mt-10 divide-y divide-stone-200 rounded-3xl border border-stone-200 bg-white">
          {FAQ.map(([q, a]) => (
            <details key={q} className="group p-6"><summary className="cursor-pointer list-none font-bold">{q}</summary><p className="mt-3 text-stone-600">{a}</p></details>
          ))}
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-white py-10 text-center text-sm text-stone-500">
        <Logo />
        <p className="mt-4">© {new Date().getFullYear()} StatusKaro · {CONFIG.support}</p>
      </footer>
    </div>
  )
}
