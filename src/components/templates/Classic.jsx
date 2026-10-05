import { Badge, Brand, Desc, Name, OrderBar, Price, ProductImage } from './parts'

// Clean: brand + badge on top, one big photo with a colour block behind it.
export default function Classic({ data }) {
  const t = data.theme
  return (
    <div className="flex h-[1920px] w-[1080px] flex-col px-[90px] py-[90px]" style={{ background: t.bg, color: t.ink }}>
      <div className="flex items-center justify-between">
        <Brand name={data.brand} color={t.primary} />
        <Badge label={data.label} bg={t.primary} fg={t.onPrimary} />
      </div>
      <div className="relative mt-[60px] h-[800px] shrink-0">
        <div className="absolute inset-0 translate-x-[28px] translate-y-[28px] rounded-[48px]" style={{ background: t.accent }} />
        <ProductImage src={data.image} adjustment={data.imageAdjustment} className="relative h-full w-full rounded-[48px]" />
      </div>
      <Name color={t.ink} size={92} className="mt-[80px]">{data.name}</Name>
      <div className="mt-6"><Price data={data} color={t.primary} muted={`${t.ink}99`} /></div>
      <Desc color={`${t.ink}b3`} className="mt-5">{data.description}</Desc>
      <OrderBar phone={data.phone} bg={t.primary} fg={t.onPrimary} btnBg={t.accent} btnFg={t.onAccent} className="mt-auto" />
    </div>
  )
}
