import { Badge, Brand, Desc, Name, OrderBar, Price, ProductImage } from './parts'

// Photo fills the top; a rounded light card carries the details.
export default function FullBleed({ data }) {
  const t = data.theme
  return (
    <div className="relative h-[1920px] w-[1080px] overflow-hidden" style={{ background: t.bg, color: t.ink }}>
      <ProductImage src={data.image} adjustment={data.imageAdjustment} className="absolute inset-x-0 top-0 h-[1250px] w-full" />
      <div className="absolute inset-x-0 top-0 h-[1250px]" style={{ background: `linear-gradient(${t.primary}cc, ${t.primary}00 35%)` }} />
      <div className="absolute inset-x-[70px] top-[70px] flex items-center justify-between">
        <div className="rounded-full px-9 py-4" style={{ background: t.bg }}><Brand name={data.brand || ' '} color={t.primary} size={42} /></div>
        <Badge label={data.label} bg={t.accent} fg={t.onAccent} />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[860px] rounded-t-[72px] px-[90px] pt-[80px]" style={{ background: t.bg }}>
        <div className="mx-auto mb-[44px] h-[8px] w-[110px] rounded-full" style={{ background: t.accent }} />
        <Name color={t.ink} size={88}>{data.name}</Name>
        <div className="mt-5"><Price data={data} color={t.primary} muted={`${t.ink}99`} /></div>
        <Desc color={`${t.ink}b3`} className="mt-4">{data.description}</Desc>
        <OrderBar phone={data.phone} bg={t.primary} fg={t.onPrimary} btnBg={t.accent} btnFg={t.onAccent} className="absolute inset-x-[90px] bottom-[80px]" />
      </div>
    </div>
  )
}
