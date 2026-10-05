import { Badge, Brand, Desc, Name, OrderBar, Price, ProductImage } from './parts'

// Dark spotlight card that gives the product a premium, high-contrast stage.
export default function Spotlight({ data }) {
  const t = data.theme
  return (
    <div className="relative h-[1920px] w-[1080px] overflow-hidden" style={{ background: t.ink, color: t.onPrimary }}>
      <div className="absolute inset-x-0 top-0 h-[1120px]" style={{ background: `linear-gradient(145deg, ${t.primary}, ${t.ink})` }} />
      <div className="absolute top-[220px] left-1/2 h-[760px] w-[760px] -translate-x-1/2 rounded-full border-[2px]" style={{ borderColor: `${t.accent}88` }} />
      <div className="relative flex items-center justify-between px-[86px] pt-[82px]">
        <Brand name={data.brand} color={t.onPrimary} size={48} />
        <div className="font-mont text-[22px] font-bold tracking-[0.25em]" style={{ color: t.accent }}>SPOTLIGHT</div>
      </div>
      <ProductImage src={data.image} adjustment={data.imageAdjustment} className="relative mx-auto mt-[94px] h-[760px] w-[650px] rounded-[34px] border-[10px] shadow-[0_40px_90px_-25px_rgba(0,0,0,0.7)]" style={{ borderColor: t.accent }} />
      <div className="absolute inset-x-[86px] bottom-0 h-[780px] rounded-t-[64px] px-[76px] pt-[70px]" style={{ background: t.bg, color: t.ink }}>
        <Badge label={data.label} bg={t.accent} fg={t.onAccent} />
        <Name color={t.ink} size={88} className="mt-7">{data.name}</Name>
        <div className="mt-5"><Price data={data} color={t.primary} muted={`${t.ink}99`} /></div>
        <Desc color={`${t.ink}b3`} className="mt-5">{data.description}</Desc>
        <OrderBar phone={data.phone} bg={t.primary} fg={t.onPrimary} btnBg={t.accent} btnFg={t.onAccent} className="absolute right-[76px] bottom-[70px] left-[76px]" />
      </div>
    </div>
  )
}
