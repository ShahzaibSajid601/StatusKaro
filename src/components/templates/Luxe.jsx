import { Badge, Brand, Desc, Name, OrderBar, Price, ProductImage } from './parts'

// Quiet luxury layout with a soft frame, generous space, and editorial type.
export default function Luxe({ data }) {
  const t = data.theme
  return (
    <div className="relative h-[1920px] w-[1080px] overflow-hidden px-[90px] py-[86px]" style={{ background: t.bg, color: t.ink }}>
      <div className="absolute inset-[42px] rounded-[44px] border-[2px]" style={{ borderColor: `${t.primary}35` }} />
      <div className="relative flex items-center justify-between">
        <Brand name={data.brand} color={t.primary} size={48} />
        <div className="font-mont text-[22px] font-bold tracking-[0.28em]" style={{ color: t.primary }}>EST. 2024</div>
      </div>
      <div className="relative mt-[70px] flex justify-center">
        <div className="absolute top-[32px] h-[780px] w-[780px] rounded-full" style={{ background: t.soft }} />
        <ProductImage src={data.image} adjustment={data.imageAdjustment} className="relative h-[820px] w-[650px] rounded-t-[330px] rounded-b-[44px] border-[12px] shadow-[0_30px_70px_-28px_rgba(0,0,0,0.4)]" style={{ borderColor: t.bg }} />
      </div>
      <div className="relative mt-[70px] text-center">
        <Badge label={data.label} bg={t.primary} fg={t.onPrimary} />
        <Name color={t.ink} size={92} className="mt-7">{data.name}</Name>
        <div className="mt-5 flex justify-center"><Price data={data} color={t.primary} muted={`${t.ink}99`} align="center" /></div>
        <Desc color={`${t.ink}b3`} className="mx-auto mt-5 max-w-[820px]">{data.description}</Desc>
      </div>
      <OrderBar phone={data.phone} bg={t.primary} fg={t.onPrimary} btnBg={t.accent} btnFg={t.onAccent} className="absolute right-[90px] bottom-[92px] left-[90px]" />
    </div>
  )
}
