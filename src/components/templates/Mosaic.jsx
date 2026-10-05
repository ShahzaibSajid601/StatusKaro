import { Badge, Brand, Desc, Name, OrderBar, Price, ProductImage } from './parts'

// Modern collage layout built for bright product launches and social posts.
export default function Mosaic({ data }) {
  const t = data.theme
  return (
    <div className="relative h-[1920px] w-[1080px] overflow-hidden" style={{ background: t.primary, color: t.onPrimary }}>
      <div className="absolute top-[-170px] right-[-170px] h-[650px] w-[650px] rounded-full" style={{ background: t.accent }} />
      <div className="absolute bottom-[-190px] left-[-160px] h-[560px] w-[560px] rounded-full" style={{ background: t.soft }} />
      <div className="relative flex items-center justify-between px-[86px] pt-[82px]">
        <Brand name={data.brand} color={t.onPrimary} size={52} />
        <Badge label={data.label} bg={t.bg} fg={t.primary} />
      </div>
      <div className="relative mx-auto mt-[76px] h-[850px] w-[790px] rotate-[-4deg] rounded-[54px] p-[18px] shadow-[0_34px_70px_-20px_rgba(0,0,0,0.45)]" style={{ background: t.bg }}>
        <ProductImage src={data.image} adjustment={data.imageAdjustment} className="h-full w-full rounded-[40px]" />
        <div className="absolute right-[-72px] bottom-[72px] rotate-[4deg] rounded-full px-8 py-5 font-mont text-[25px] font-extrabold tracking-[0.18em]" style={{ background: t.accent, color: t.onAccent }}>NEW DROP</div>
      </div>
      <div className="relative mt-[64px] px-[90px]">
        <Name color={t.onPrimary} size={90}>{data.name}</Name>
        <div className="mt-5"><Price data={data} color={t.accent} muted={`${t.onPrimary}aa`} /></div>
        <Desc color={`${t.onPrimary}cc`} className="mt-5">{data.description}</Desc>
      </div>
      <OrderBar phone={data.phone} bg={t.bg} fg={t.primary} btnBg={t.accent} btnFg={t.onAccent} className="absolute right-[90px] bottom-[82px] left-[90px]" />
    </div>
  )
}
