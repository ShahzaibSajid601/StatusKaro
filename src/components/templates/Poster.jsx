import { Badge, Brand, Desc, Name, OrderBar, Price, ProductImage } from './parts'

// Bold single-colour poster: centred, big circle behind a rounded photo.
export default function Poster({ data }) {
  const t = data.theme
  return (
    <div className="relative flex h-[1920px] w-[1080px] flex-col items-center overflow-hidden px-[90px] pt-[100px] pb-[80px]" style={{ background: t.primary, color: t.onPrimary }}>
      <div className="absolute top-[260px] left-1/2 h-[940px] w-[940px] -translate-x-1/2 rounded-full" style={{ background: t.accent }} />
      <div className="relative flex flex-col items-center gap-6">
        <Brand name={data.brand} color={t.onPrimary} size={54} />
        <Badge label={data.label} bg={t.bg} fg={t.primary} />
      </div>
      <ProductImage src={data.image} adjustment={data.imageAdjustment} className="relative mt-[50px] h-[800px] w-[680px] shrink-0 rounded-[56px] border-[14px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)]" style={{ borderColor: t.bg }} />
      <Name color={t.onPrimary} size={88} className="relative mt-[56px] text-center">{data.name}</Name>
      <div className="relative mt-5"><Price data={data} color={t.accent} muted={`${t.onPrimary}aa`} align="center" /></div>
      <Desc color={`${t.onPrimary}cc`} className="relative mt-4 text-center">{data.description}</Desc>
      <OrderBar phone={data.phone} bg={t.bg} fg={t.primary} btnBg={t.primary} btnFg={t.onPrimary} className="mt-auto w-full" />
    </div>
  )
}
