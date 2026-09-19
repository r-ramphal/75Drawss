/*
  Shared portfolio view for the concept pages. Wraps BINDERS with a running
  number and the derived crop paths from public/portfolio/derived/ (see
  scripts/derive-images.mjs). Source file names differ from ids in one case
  (croconaw → koi.jpeg), hence the map.
*/
import { BINDERS, CATEGORIES } from '@/app/data/binders'

const FILE_BY_ID = { croconaw: 'koi' }

export function derived(id, variant) {
  const base = FILE_BY_ID[id] || id
  return `/portfolio/derived/${base}-${variant}.jpg`
}

export const WORKS = BINDERS.map((b, i) => ({
  ...b,
  nr: String(i + 1).padStart(2, '0'),
  wide: derived(b.id, 'wide'),
  mono: derived(b.id, 'mono'),
  card: derived(b.id, '4x5'),
  square: derived(b.id, '1x1'),
}))

export const WORK_COUNT = WORKS.length
export { CATEGORIES }
