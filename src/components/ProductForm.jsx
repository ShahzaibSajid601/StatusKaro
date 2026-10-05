import Field from './Field'

export default function ProductForm({ values, errors, onChange }) {
  const set = (k) => (e) => onChange({ ...values, [k]: e.target.value })
  return (
    <div className="space-y-4">
      <Field label="Brand / shop name" hint="shown on your status" value={values.brand} onChange={set('brand')} maxLength={28} placeholder="e.g. Noor Collection" />
      <Field label="Product name" value={values.name} onChange={set('name')} error={errors.name} maxLength={60} placeholder="e.g. Embroidered Lawn 3-Piece" />
      <div className="grid grid-cols-2 gap-3">
        <Field label="Original price" hint="Rs." inputMode="numeric" value={values.originalPrice} onChange={set('originalPrice')} error={errors.originalPrice} placeholder="4500" />
        <Field label="Sale price" hint="optional" inputMode="numeric" value={values.salePrice} onChange={set('salePrice')} error={errors.salePrice} placeholder="3499" />
      </div>
      <Field label="WhatsApp number" inputMode="tel" value={values.phone} onChange={set('phone')} error={errors.phone} placeholder="0300 1234567" />
      <Field label="Short description" multiline value={values.description} onChange={set('description')} maxLength={120} hint={`${values.description.length}/120`} placeholder="Fabric, sizes, colours…" />
    </div>
  )
}
