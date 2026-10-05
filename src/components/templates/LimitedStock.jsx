import ProductImage from './ProductImage'
import OrderBar from './OrderBar'
import { formatPrice } from '../../utils/helpers'

// Black and champagne gold: framed photo, corner marks, ribbon for urgency.
const Corner = ({ pos }) => <span className={`absolute h-[70px] w-[70px] border-[#e2bd6b] ${pos}`} />

export default function LimitedStock({ data }) {
  const price = formatPrice(data.salePrice) || formatPrice(data.originalPrice)
  return (
    <div className="relative flex h-[1920px] w-[1080px] flex-col bg-[#0e0c09] bg-[radial-gradient(ellipse_at_50%_25%,rgba(226,189,107,0.18),transparent_60%)] px-[100px] pt-[120px] pb-[100px] text-[#f4ead4]">
      <Corner pos="top-[50px] left-[50px] border-t-[3px] border-l-[3px]" />
      <Corner pos="top-[50px] right-[50px] border-t-[3px] border-r-[3px]" />
      <Corner pos="bottom-[50px] left-[50px] border-b-[3px] border-l-[3px]" />
      <Corner pos="bottom-[50px] right-[50px] border-b-[3px] border-r-[3px]" />

      <div className="text-center font-mont text-[46px] font-extrabold tracking-[0.4em] text-[#e2bd6b]">LIMITED STOCK</div>
      <div className="mx-auto mt-5 h-px w-[220px] bg-[#e2bd6b]/70" />

      <div className="relative mt-[60px] h-[900px] border border-[#e2bd6b]/80 p-[20px]">
        <ProductImage src={data.image} className="h-full w-full" />
        <div className="absolute right-[-40px] bottom-[70px] bg-[#e2bd6b] px-12 py-5 font-mont text-[36px] font-extrabold tracking-[0.08em] text-[#0e0c09] shadow-[0_14px_30px_rgba(0,0,0,0.5)]">
          Few pieces left
        </div>
      </div>

      <h2 className="mt-[60px] line-clamp-2 font-serif text-[92px] leading-[0.98] font-semibold">{data.name}</h2>
      <div className="mt-4 font-mont text-[56px] font-extrabold text-[#e2bd6b]">{price}</div>
      <p className="mt-4 line-clamp-3 font-mont text-[31px] leading-[1.45] font-semibold text-[#f4ead4]/65">{data.description}</p>

      <OrderBar phone={data.phone} bg="transparent" border="2px solid #e2bd6b" fg="#f4ead4" btnBg="#e2bd6b" btnFg="#0e0c09" className="mt-auto" />
    </div>
  )
}
