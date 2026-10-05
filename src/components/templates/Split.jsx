import { Badge, Brand, Desc, Name, OrderBar, Price, ProductImage } from './parts'

// Colour block on top, arched photo overlapping into the light area.
export default function Split({ data }) {
  const t = data.theme
  return (
    <div className="relative h-[1920px] w-[1080px] overflow-hidden" style={{ background: t.bg, color: t.ink }}>
      <div className="absolute inset-x-0 top-0 h-[980px]" style={{ background: t.primary }} />
      <div className="absolute top-[-140px] right-[-140px] h-[520px] w-[520px] rounded-full" style={{ background: t.accent, opacity: 0.9 }} />
      <div className="absolute inset-x-[90px] top-[90px] flex items-center justify-between">
        <Brand name={data.brand} color={t.onPrimary} />
      </div>
      <div className="absolute top-[200px] left-1/2 h-[960px] w-[740px] -translate-x-1/2 overflow-hidden rounded-t-[370px] rounded-b-[44px] border-[14px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.4)]" style={{ borderColor: t.bg }}>
        <ProductImage src={data.image} adjustment={data.imageAdjustment} className="h-full w-full" />
      </div>
      <div className="absolute top-[1090px] left-[90px]"><Badge label={data.label} bg={t.accent} fg={t.onAccent} /></div>
      <div className="absolute inset-x-[90px] top-[1215px]">
        <Name color={t.ink} size={88}>{data.name}</Name>
        <div className="mt-5"><Price data={data} color={t.primary} muted={`${t.ink}99`} /></div>
        <Desc color={`${t.ink}b3`} className="mt-4">{data.description}</Desc>
      </div>
      <OrderBar phone={data.phone} bg={t.primary} fg={t.onPrimary} btnBg={t.accent} btnFg={t.onAccent} className="absolute inset-x-[90px] bottom-[80px]" />
    </div>
  )
}
