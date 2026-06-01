'use client'
/*
  Portfolio shuffle grid — adapted from a 21st.dev "shuffle-grid" component to
  this project's stack (plain JS + framer-motion + design tokens). Uses real
  product photos from /public/portfolio. The 16-cell grid is filled by cycling
  through the available photos; framer-motion `layout` animates each tile to a
  new position on every shuffle.
*/
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

const PHOTOS = [
  '/portfolio/mimikyu.jpeg',
  '/portfolio/koi.jpeg',
  '/portfolio/lucario.jpeg',
  '/portfolio/psyduck.jpeg',
  '/portfolio/kid.jpeg',
  '/portfolio/mew.jpeg',
  '/portfolio/articuno.jpeg',
  '/portfolio/starters.jpeg',
  '/portfolio/dialga.jpeg',
]

// 16 tiles, each with a stable id and an assigned photo (photos repeat).
const baseTiles = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  src: PHOTOS[i % PHOTOS.length],
}))

const shuffle = (array) => {
  const a = [...array]
  let current = a.length
  while (current !== 0) {
    const rand = Math.floor(Math.random() * current)
    current--
    ;[a[current], a[rand]] = [a[rand], a[current]]
  }
  return a
}

const ShuffleGrid = () => {
  const timeoutRef = useRef(null)
  const [tiles, setTiles] = useState(baseTiles)

  useEffect(() => {
    // Respect users who prefer reduced motion: keep the grid static.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const run = () => {
      setTiles((prev) => shuffle(prev))
      timeoutRef.current = setTimeout(run, 3000)
    }
    timeoutRef.current = setTimeout(run, 3000)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div className="shuffle-grid">
      {tiles.map((tile) => (
        <motion.div
          key={tile.id}
          layout
          transition={{ duration: 1.4, type: 'spring' }}
          className="shuffle-tile"
          style={{ backgroundImage: `url(${tile.src})` }}
        />
      ))}
    </div>
  )
}

export default function Portfolio() {
  const t = useTranslations('portfolio')

  return (
    <>
      <style>{`
        .portfolio-section {
          padding: 7rem 3rem; max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr;
          align-items: center; gap: 4rem;
        }
        .shuffle-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 1fr; gap: 4px; aspect-ratio: 1 / 1;
          background: var(--color-border); padding: 4px;
          border: 2px solid var(--color-border);
          box-shadow: var(--shadow-hard);
        }
        .shuffle-tile {
          width: 100%; height: 100%; border-radius: 3px; overflow: hidden;
          background-color: var(--color-surface);
          background-size: cover; background-position: center;
        }
        .portfolio-cta {
          display: inline-block; margin-top: 2rem;
          background: var(--color-accent); color: var(--color-text);
          font-size: 0.9rem; font-weight: 600; padding: 0.95rem 2.1rem;
          border-radius: var(--radius); text-decoration: none;
          border: 1px solid var(--color-accent);
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease; font-family: var(--font-ui);
        }
        .portfolio-cta:hover { background: var(--color-accent-hover); border-color: var(--color-accent-hover); transform: translateY(-1px); box-shadow: 0 8px 20px rgba(10,10,10,0.12); }
        @media (max-width: 900px) {
          .portfolio-section { grid-template-columns: 1fr; gap: 2.5rem; }
        }
        @media (max-width: 520px) {
          .portfolio-section { padding: 4rem 1.5rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .shuffle-tile { transition: none !important; }
        }
      `}</style>

      <div id="portfolio" style={{ background: 'var(--color-bg)', borderTop: '2px solid var(--color-border)' }}>
        <section className="portfolio-section" style={{ fontFamily: 'var(--font-ui)' }}>
          <div>
            <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>{t('eyebrow')}</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.1, color: 'var(--color-text)' }}>
              {t('titleLine1')}<br/>{t('titleLine2')}
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.75, fontWeight: 400, maxWidth: '380px', marginTop: '1.5rem' }}>
              {t('intro')}
            </p>
            <a href="#order" className="portfolio-cta">{t('cta')}</a>
          </div>

          <div role="img" aria-label={t('intro')}>
            <ShuffleGrid />
          </div>
        </section>
      </div>
    </>
  )
}
