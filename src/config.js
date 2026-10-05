// Edit these to match your business.
export const CONFIG = {
  whatsapp: '923263913728', // your WhatsApp number, country code first, no + or spaces
  price: 'Rs. 299',
  period: 'per month',
  support: 'support@statuskaro.pk',
}
export const waLink = (text) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`
