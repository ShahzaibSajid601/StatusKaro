import ProductImage from './ProductImage'
import OrderBar from './OrderBar'
import { formatPrice } from '../../utils/helpers'

// Boutique editorial: ivory, gold hairline frame, arched photo, serif italic name.
export default function NewArrival({ data }) {
  const price = formatPrice(data.salePrice) || formatPrice(data.originalPrice)
  return (
    <div className="relative flex h-[1920px] w-[1080px] flex-col items-center bg-[#f7f2e8] px-[110px] pt-[120px] pb-[110px] text-[#0f2a20]">
      <div className="absolute inset-[34px] border-[2px] border-[#b98f3e]/70" />
      <div className="absolute inset-[50px] border border-[#b98f3e]/40" />

      <div className="flex items-center gap-8 font-mont text-[34px] font-semibold tracking-[0.45em] text-[#0d5a42]">
        <span className="h-px w-[90px] bg-[#b98f3e]" />NEW ARRIVAL<span className="h-px w-[90px] bg-[#b98f3e]" />
      </div>

      <div className="relative mt-[70px] h-[840px] w-[700px]">
        <div className="absolute inset-0 translate-x-[26px] translate-y-[26px] rounded-t-[350px] border-[3px] border-[#b98f3e]" />
        <div className="relative h-full w-full overflow-hidden rounded-t-[350px] bg-white shadow-[0_30px_60px_-20px_rgba(15,42,32,0.45)]">
          <ProductImage src={data.image} className="h-full w-full" />
        </div>
      </div>

      <h2 className="mt-[80px] line-clamp-2 text-center font-serif text-[96px] leading-[0.98] font-semibold italic">{data.name}</h2>
      <div className="mt-6 flex items-center gap-8 font-mont text-[56px] font-extrabold text-[#0d5a42]">
        <span className="h-px w-[70px] bg-[#b98f3e]" />{price}<span className="h-px w-[70px] bg-[#b98f3e]" />
      </div>
      <p className="mt-5 line-clamp-3 max-w-[760px] text-center font-mont text-[31px] leading-[1.45] font-semibold text-[#0f2a20]/65">{data.description}</p>

      <OrderBar phone={data.phone} bg="#0d5a42" fg="#f7f2e8" btnBg="#e2bd6b" btnFg="#0f2a20" className="mt-auto w-full" />
    </div>
  )
}
