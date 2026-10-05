import { useEffect, useRef, useState } from 'react'
import DesignCanvas from './DesignCanvas'

// Renders a 1080x1920 template scaled to fill its (9:16) parent's width.
export default function ScaledDesign({ layoutId, data, className = '' }) {
  const box = useRef(null)
  const [scale, setScale] = useState(0.3)

  useEffect(() => {
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / 1080))
    ro.observe(box.current)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={box} className={`relative w-full overflow-hidden ${className}`} style={{ aspectRatio: '9 / 16' }}>
      <div className="absolute top-0 left-0 origin-top-left" style={{ width: 1080, height: 1920, transform: `scale(${scale})` }}>
        <DesignCanvas layoutId={layoutId} data={data} />
      </div>
    </div>
  )
}
