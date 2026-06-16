/*
  Single source of truth for the portfolio.

  TO ADD A BINDER:
    1. Drop the photo in /public/portfolio/<name>.jpeg
    2. `import <name> from '@/public/portfolio/<name>.jpeg'`  (static import →
       Next infers width/height + a blur placeholder automatically)
    3. Add one object to BINDERS below.
  Everything else — the homepage preview, all portfolio-page designs and the
  category filters — updates automatically.

  Descriptions were verified against the actual photos (2026-06-16).
*/
import mewtwo from '@/public/portfolio/mewtwo.jpeg'
import battle from '@/public/portfolio/battle.jpeg'
import dialga from '@/public/portfolio/dialga.jpeg'
import articuno from '@/public/portfolio/articuno.jpeg'
import lucario from '@/public/portfolio/lucario.jpeg'
import mimikyu from '@/public/portfolio/mimikyu.jpeg'
import koi from '@/public/portfolio/koi.jpeg'
import mew from '@/public/portfolio/mew.jpeg'
import psyduck from '@/public/portfolio/psyduck.jpeg'
import starters from '@/public/portfolio/starters.jpeg'
import beach from '@/public/portfolio/beach.jpeg'
import kid from '@/public/portfolio/kid.jpeg'
import moltres from '@/public/portfolio/moltres.jpeg'
import lugia from '@/public/portfolio/lugia.jpeg'
import charmander from '@/public/portfolio/charmander.jpeg'
import chopper from '@/public/portfolio/chopper.jpeg'

export const BINDERS = [
  {
    id: 'mewtwo', img: mewtwo, category: 'Legendary', game: 'Pokémon', featured: true,
    title: { en: 'Mewtwo', nl: 'Mewtwo' },
    alt: {
      en: 'Custom Mewtwo binder with a cosmic purple design',
      nl: 'Custom Mewtwo-binder met een kosmisch paars ontwerp',
    },
  },
  {
    id: 'battle', img: battle, category: 'Battle', game: 'Pokémon', featured: true,
    title: { en: 'Charizard, Lucario & Gengar', nl: 'Charizard, Lucario & Gengar' },
    alt: {
      en: 'Custom binder with an epic battle between Charizard, Lucario and Gengar above a fiery landscape',
      nl: 'Custom binder met een episch gevecht tussen Charizard, Lucario en Gengar boven een vurig landschap',
    },
  },
  {
    id: 'lucario', img: lucario, category: 'Battle', game: 'Pokémon', featured: true,
    title: { en: 'Lucario', nl: 'Lucario' },
    alt: {
      en: 'Custom dark Lucario binder with glowing blue accents',
      nl: 'Custom donkere Lucario-binder met gloeiende blauwe accenten',
    },
  },
  {
    id: 'dialga', img: dialga, category: 'Legendary', game: 'Pokémon', featured: true,
    title: { en: 'Dialga, Palkia & Darkrai', nl: 'Dialga, Palkia & Darkrai' },
    alt: {
      en: 'Custom binder with Dialga, Palkia and Darkrai in a legendary battle scene',
      nl: 'Custom binder met Dialga, Palkia en Darkrai in een legendarische gevechtsscène',
    },
  },
  {
    id: 'articuno', img: articuno, category: 'Legendary', game: 'Pokémon', featured: false,
    title: { en: 'Articuno', nl: 'Articuno' },
    alt: {
      en: 'Custom Articuno binder in icy blue tones',
      nl: 'Custom Articuno-binder in ijsblauwe tinten',
    },
  },
  {
    id: 'moltres', img: moltres, category: 'Legendary', game: 'Pokémon', featured: true,
    title: { en: 'Moltres', nl: 'Moltres' },
    alt: {
      en: 'Custom Moltres binder with a blazing fire design',
      nl: 'Custom Moltres-binder met een laaiend vuurontwerp',
    },
  },
  {
    id: 'lugia', img: lugia, category: 'Legendary', game: 'Pokémon', featured: false,
    title: { en: 'Lugia', nl: 'Lugia' },
    alt: {
      en: 'Custom Lugia binder in stormy blue tones',
      nl: 'Custom Lugia-binder in stormachtige blauwtinten',
    },
  },
  {
    id: 'mimikyu', img: mimikyu, category: 'Cute', game: 'Pokémon', featured: true,
    title: { en: 'Mimikyu', nl: 'Mimikyu' },
    alt: {
      en: 'Custom Mimikyu binder against a dreamy cloudy sky',
      nl: 'Custom Mimikyu-binder tegen een dromerige wolkenlucht',
    },
  },
  {
    id: 'mew', img: mew, category: 'Cute', game: 'Pokémon', featured: false,
    title: { en: 'Mew', nl: 'Mew' },
    alt: {
      en: 'Custom binder with a sleeping Mew in a bubble above a dreamy pastel landscape',
      nl: 'Custom binder met een slapende Mew in een luchtbel boven een dromerig pastellandschap',
    },
  },
  {
    id: 'psyduck', img: psyduck, category: 'Cute', game: 'Pokémon', featured: false,
    title: { en: 'Psyduck', nl: 'Psyduck' },
    alt: {
      en: 'Custom Psyduck binder holding a sunflower in a Van Gogh style',
      nl: 'Custom Psyduck-binder met een zonnebloem in Van Gogh-stijl',
    },
  },
  {
    id: 'croconaw', img: koi, category: 'Scenery', game: 'Pokémon', featured: false,
    title: { en: 'Croconaw', nl: 'Croconaw' },
    alt: {
      en: 'Custom Croconaw binder with a colourful underwater scene among vibrant seaweed',
      nl: 'Custom Croconaw-binder met een kleurrijk onderwatertafereel tussen levendige zeewieren',
    },
  },
  {
    id: 'starters', img: starters, category: 'Scenery', game: 'Pokémon', featured: false,
    title: { en: 'Kanto Starters', nl: 'Kanto-starters' },
    alt: {
      en: 'Custom binder with Pikachu and the Kanto starters watching a meteor shower',
      nl: 'Custom binder met Pikachu en de Kanto-starters kijkend naar een sterrenregen',
    },
  },
  {
    id: 'beach', img: beach, category: 'Scenery', game: 'Pokémon', featured: false,
    title: { en: 'Beach', nl: 'Strand' },
    alt: {
      en: 'Custom binder with a tropical Pokémon beach scene',
      nl: 'Custom binder met een tropisch Pokémon-strandtafereel',
    },
  },
  {
    id: 'charmander', img: charmander, category: 'Scenery', game: 'Pokémon', featured: false,
    title: { en: 'Charmander', nl: 'Charmander' },
    alt: {
      en: 'Custom Charmander binder with a cosy window scene',
      nl: 'Custom Charmander-binder met een gezellig raamtafereel',
    },
  },
  {
    id: 'kid', img: kid, category: 'Anime', game: 'One Piece', featured: true,
    title: { en: 'Eustass Kid', nl: 'Eustass Kid' },
    alt: {
      en: 'Custom One Piece binder with Eustass Kid surrounded by lightning',
      nl: 'Custom One Piece-binder met Eustass Kid omringd door bliksem',
    },
  },
  {
    id: 'chopper', img: chopper, category: 'Anime', game: 'One Piece', featured: false,
    title: { en: 'Tony Tony Chopper', nl: 'Tony Tony Chopper' },
    alt: {
      en: 'Custom One Piece binder with Tony Tony Chopper in a snowy scene',
      nl: 'Custom One Piece-binder met Tony Tony Chopper in een besneeuwd tafereel',
    },
  },
]

// Filter categories, in display order, derived from the data so a new category
// added above appears automatically.
const CATEGORY_ORDER = ['Legendary', 'Battle', 'Cute', 'Scenery', 'Anime']
export const CATEGORIES = [
  ...CATEGORY_ORDER.filter((c) => BINDERS.some((b) => b.category === c)),
  ...[...new Set(BINDERS.map((b) => b.category))].filter((c) => !CATEGORY_ORDER.includes(c)),
]
