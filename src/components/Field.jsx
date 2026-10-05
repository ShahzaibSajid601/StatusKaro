export default function Field({ label, hint, error, multiline, ...props }) {
  const Tag = multiline ? 'textarea' : 'input'
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline justify-between text-[13px] font-semibold text-stone-700">
        {label}
        {hint && <span className="text-xs font-normal text-stone-400">{hint}</span>}
      </span>
      <Tag
        {...props}
        rows={multiline ? 3 : undefined}
        aria-invalid={!!error}
        className={`w-full resize-none rounded-xl border bg-stone-50/60 px-4 py-3 text-[15px] transition placeholder:text-stone-400 focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10 focus:outline-none ${error ? 'border-red-400 bg-red-50/40' : 'border-stone-200'}`}
      />
      {error && <span role="alert" className="mt-1.5 block text-xs font-medium text-red-600">{error}</span>}
    </label>
  )
}
