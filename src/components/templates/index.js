import Classic from './Classic'
import Split from './Split'
import FullBleed from './FullBleed'
import Poster from './Poster'
import Luxe from './Luxe'
import Mosaic from './Mosaic'
import Spotlight from './Spotlight'
import Magazine from './Magazine'

export const LAYOUTS = [
  { id: 'classic', label: 'Classic', Component: Classic },
  { id: 'split', label: 'Arch', Component: Split },
  { id: 'fullbleed', label: 'Full photo', Component: FullBleed },
  { id: 'poster', label: 'Poster', Component: Poster },
  { id: 'luxe', label: 'Luxe', Component: Luxe },
  { id: 'mosaic', label: 'Mosaic', Component: Mosaic },
  { id: 'spotlight', label: 'Spotlight', Component: Spotlight },
  { id: 'magazine', label: 'Magazine', Component: Magazine },
]
