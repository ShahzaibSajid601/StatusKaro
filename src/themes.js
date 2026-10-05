// What the seller is announcing. Drives the badge label and price display.
export const TYPES = [
  { id: 'new', label: 'New Arrival' },
  { id: 'sale', label: 'Sale' },
  { id: 'limited', label: 'Limited Stock' },
]

// bg: page · soft: tint · ink: text on bg · primary/accent: brand colours · on*: text on those
export const PALETTES = [
  { id: 'emerald', name: 'Emerald', bg: '#f7f2e8', soft: '#e8dfcb', ink: '#10281f', primary: '#0d5a42', onPrimary: '#f7f2e8', accent: '#e2bd6b', onAccent: '#10281f' },
  { id: 'navy', name: 'Navy', bg: '#f4f7fc', soft: '#dbe4f2', ink: '#0f1b33', primary: '#14284b', onPrimary: '#f4f7fc', accent: '#f2a65a', onAccent: '#14284b' },
  { id: 'rose', name: 'Rose', bg: '#fdf3f1', soft: '#f8d9d4', ink: '#3a1420', primary: '#8e2c4a', onPrimary: '#fdf3f1', accent: '#f4b9a6', onAccent: '#3a1420' },
  { id: 'coral', name: 'Sunset', bg: '#fff6ea', soft: '#ffe0bf', ink: '#2b2118', primary: '#e4572e', onPrimary: '#fff6ea', accent: '#17a8a5', onAccent: '#ffffff' },
  { id: 'plum', name: 'Plum', bg: '#f6f0fb', soft: '#e3d4f2', ink: '#241334', primary: '#4b1d78', onPrimary: '#f6f0fb', accent: '#ffb347', onAccent: '#241334' },
  { id: 'noir', name: 'Noir', bg: '#14120f', soft: '#26221b', ink: '#f5eedc', primary: '#d9b45a', onPrimary: '#14120f', accent: '#f5eedc', onAccent: '#14120f' },
]
