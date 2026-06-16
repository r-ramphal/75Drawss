/*
  Inspiration content for /inspiratie. Easy to extend — add an object to a list.
  Labels are bilingual { nl, en }. The browse-by-vibe section reuses BINDERS +
  CATEGORIES from ./binders.js.
*/

export const STYLES = [
  { id: 'anime', label: { nl: 'Anime', en: 'Anime' }, desc: { nl: 'Scherpe lijnen, felle kleuren', en: 'Bold lines, vivid colours' } },
  { id: 'watercolour', label: { nl: 'Aquarel', en: 'Watercolour' }, desc: { nl: 'Zachte, vloeiende kleuren', en: 'Soft, flowing colours' } },
  { id: 'minimal', label: { nl: 'Minimalistisch', en: 'Minimal' }, desc: { nl: 'Strak, veel ruimte', en: 'Clean, lots of space' } },
  { id: 'vintage', label: { nl: 'Vintage', en: 'Vintage' }, desc: { nl: 'Retro sfeer en texturen', en: 'Retro mood and textures' } },
  { id: 'pixel', label: { nl: 'Pixel-art', en: 'Pixel art' }, desc: { nl: 'Nostalgische game-look', en: 'Nostalgic game look' } },
  { id: 'realistic', label: { nl: 'Realistisch', en: 'Realistic' }, desc: { nl: 'Gedetailleerd en levensecht', en: 'Detailed and lifelike' } },
]

export const PALETTES = [
  { id: 'ocean', label: { nl: 'Oceaan', en: 'Ocean' }, colors: ['#0a2540', '#2D5BE3', '#4FB0E5', '#bfe6f5'] },
  { id: 'sunset', label: { nl: 'Zonsondergang', en: 'Sunset' }, colors: ['#3a1c1c', '#d93030', '#F5B301', '#ffd9a0'] },
  { id: 'forest', label: { nl: 'Bos', en: 'Forest' }, colors: ['#0f2417', '#16a34a', '#7bc96f', '#dff0d8'] },
  { id: 'cosmic', label: { nl: 'Kosmisch', en: 'Cosmic' }, colors: ['#1a0a2e', '#7c3aed', '#d946ef', '#22d3ee'] },
  { id: 'pastel', label: { nl: 'Pastel', en: 'Pastel' }, colors: ['#f4a0bc', '#c3b1e1', '#a0d8f4', '#fff3b0'] },
  { id: 'mono', label: { nl: 'Monochroom', en: 'Monochrome' }, colors: ['#0a0a0a', '#555555', '#999999', '#e5e5e5'] },
]

export const THEMES = [
  { id: 'legendaries', label: { nl: 'Legendarische Pokémon', en: 'Legendary Pokémon' } },
  { id: 'starters', label: { nl: 'Starters', en: 'Starters' } },
  { id: 'eeveelutions', label: { nl: 'Eeveelutions', en: 'Eeveelutions' } },
  { id: 'onepiece', label: { nl: 'One Piece', en: 'One Piece' } },
  { id: 'cute', label: { nl: 'Schattig & chibi', en: 'Cute & chibi' } },
  { id: 'scenery', label: { nl: 'Landschappen', en: 'Scenery' } },
]

// Social profiles for the community section. To embed specific posts later,
// drop their permalinks into the `posts` arrays (Instagram/TikTok official
// embeds) — until then the section shows the follow CTAs + a work teaser.
export const SOCIALS = {
  instagram: { handle: '@75.drawss', url: 'https://www.instagram.com/75.drawss' },
  tiktok: { handle: '@75drawss', url: 'https://www.tiktok.com/@75drawss' },
}
