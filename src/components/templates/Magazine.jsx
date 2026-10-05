import { Badge, Brand, Desc, Name, OrderBar, Price, ProductImage } from './parts'

// Fashion magazine composition with a bold masthead and offset image window.
export default function Magazine({ data }) {
  const t = data.theme
  return (
    <div className="relative h-[1920px] w-[1080px] overflow-hidden px-[82px] py-[76px]" style={{ background: t.bg, color: t.ink }}>
      <div className="border-b-[3px] pb-7" style={{ borderColor: t.primary }}>
        <div className="flex items-center justify-between">
          <div className="font-mont text-[22px] font-bold tracking-[0.3em]" style={{ color: t.primary }}>THE EDIT</div>
          <Brand name={data.brand} color={t.primary} size={42} />
        </div>
        <div className="mt-5 font-serif text-[142px] font-bold leading-[0.72] tracking-[-0.06em]" style={{ color: t.ink }}>STYLE</div>
      </div>
      <div className="relative mt-[60px] h-[820px]">
        <div className="absolute top-[34px] left-[34px] h-[760px] w-[760px]" style={{ background: t.accent }} />
        <ProductImage src={data.image} adjustment={data.imageAdjustment} className="relative h-[760px] w-[760px] rounded-[8px]" />
        <div className="absolute right-[-20px] bottom-[42px] rotate-90 font-mont text-[20px] font-bold tracking-[0.3em]" style={{ color: t.primary }}>LOOK / 01</div>
      </div>
      <div className="mt-[52px] flex items-start justify-between gap-8">
        <div className="max-w-[610px]"><Name color={t.ink} size={86}>{data.name}</Name><Desc color={`${t.ink}b3`} className="mt-5">{data.description}</Desc></div>
        <Badge label={data.label} bg={t.primary} fg={t.onPrimary} />
      </div>
      <div className="mt-7"><Price data={data} color={t.primary} muted={`${t.ink}99`} /></div>
      <OrderBar phone={data.phone} bg={t.primary} fg={t.onPrimary} btnBg={t.accent} btnFg={t.onAccent} className="absolute right-[82px] bottom-[78px] left-[82px]" />
    </div>
  )
}
