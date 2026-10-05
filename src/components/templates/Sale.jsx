import ProductImage from './ProductImage'
import OrderBar from './OrderBar'
import { formatPrice, discountPercent } from '../../utils/helpers'

// Fashion poster: oxblood + champagne, full-bleed photo, oversized SALE, discount seal.
export default function Sale({ data }) {
  const orig = formatPrice(data.originalPrice)
  const sale = formatPrice(data.salePrice)
  const off = discountPercent(data.originalPrice, data.salePrice)
  return (
    <div className="relative h-[1920px] w-[1080px] overflow-hidden bg-[#4a0d1a] text-[#f8ecd2]">
      <ProductImage src={data.image} className="absolute inset-x-0 top-0 h-[1250px] w-full" />
      <div className="absolute inset-x-0 top-0 h-[1250px] bg-[linear-gradient(to_bottom,rgba(74,13,26,0.85)_0%,rgba(74,13,26,0)_32%,rgba(74,13,26,0)_55%,#4a0d1a_100%)]" />
      <div className="absolute inset-[34px] border-[2px] border-[#e2bd6b]/80" />

      <div className="absolute top-[90px] left-[90px] font-anton text-[340px] leading-[0.95] tracking-[0.02em] text-[#f8ecd2] [text-shadow:0_10px_30px_rgba(0,0,0,0.35)]">SALE</div>

      {off > 0 && (
        <div className="absolute top-[110px] right-[90px] flex h-[250px] w-[250px] items-center justify-center rounded-full bg-[#e2bd6b] text-[#4a0d1a] shadow-[0_14px_30px_rgba(0,0,0,0.35)]">
          <div className="flex h-[218px] w-[218px] flex-col items-center justify-center rounded-full border-[3px] border-dashed border-[#4a0d1a]/70">
            <span className="font-anton text-[96px] leading-none">{off}%</span>
            <span className="font-mont text-[40px] font-extrabold tracking-[0.2em]">OFF</span>
          </div>
        </div>
      )}

      <div className="absolute inset-x-[90px] top-[1090px]">
        <h2 className="line-clamp-2 font-serif text-[88px] leading-[0.98] font-semibold">{data.name}</h2>
        <div className="mt-6 flex items-baseline gap-9">
          <span className="font-anton text-[120px] leading-none text-[#e2bd6b]">{sale || orig}</span>
          {sale && orig && <span className="font-mont text-[46px] font-semibold text-[#f8ecd2]/70 line-through decoration-[4px]">{orig}</span>}
        </div>
        <p className="mt-5 line-clamp-2 font-mont text-[31px] leading-[1.45] font-semibold text-[#f8ecd2]/80">{data.description}</p>
      </div>
      <OrderBar phone={data.phone} bg="#e2bd6b" fg="#4a0d1a" btnBg="#4a0d1a" btnFg="#f8ecd2" className="absolute inset-x-[90px] bottom-[100px]" />
    </div>
  )
}
