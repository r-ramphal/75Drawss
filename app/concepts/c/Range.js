'use client'
import { useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useRevealOnScroll } from '@/app/lib/useReveal'
import { WORKS } from '../shared/work'

/*
  Horizontal, snap-scrolling product carousel. Only the binder card carries a
  photo (that is the only product type we have photos of); the other types
  are typographic cards so nothing is misrepresented.
*/
const BINDER = WORKS.find((w) => w.id === 'moltres') || WORKS[0]

export default function Range() {
  const t = useTranslations('concept.c')
  const tp = useTranslations('products')
  const items = tp.raw('items')
  const locale = useLocale()
  const root = useRef(null)
  useRevealOnScroll(root, '.cc-range-card', { y: 24, stagger: 0.1 })

  return (
    <>
      <style>{`
        .cc-range { background: var(--color-sand); padding: clamp(4rem, 8vw, 7rem) 0; }
        .cc-range-head { display: flex; justify-content: space-between; align-items: end; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap; }
        .cc-range h2 { font-size: clamp(2rem, 4.2vw, 3.6rem); margin: 0; }
        .cc-range-track { display: flex; gap: 1.25rem; overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 0.5rem; scrollbar-width: none; }
        .cc-range-track::-webkit-scrollbar { display: none; }
        .cc-range-card { flex: 0 0 min(78vw, 330px); scroll-snap-align: start; background: var(--color-surface); display: flex; flex-direction: column; min-height: 440px; }
        .cc-range-media { aspect-ratio: 1; overflow: hidden; background: var(--color-bg); display: flex; align-items: center; justify-content: center; }
        .cc-range-media img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .cc-range-media i { font-family: var(--font-display); font-style: italic; font-size: 7rem; color: var(--color-accent); line-height: 1; }
        .cc-range-body { padding: 1.25rem 1.25rem 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; flex: 1; }
        .cc-range-body h3 { font-family: var(--font-display); font-style: italic; font-weight: 400; font-size: 1.5rem; margin: 0; }
        .cc-range-body p { font-size: 0.9rem; color: var(--color-text-secondary); line-height: 1.65; margin: 0; }
        .cc-range-body .cc-link { margin-top: auto; align-self: start; font-size: 0.82rem; }
        .cc-range-tag { font-size: 0.68rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-accent); font-weight: 600; }
      `}</style>
      <section className="cc-range" ref={root}>
        <div className="cc-wrap">
          <div className="cc-range-head">
            <div>
              <p className="cc-eyebrow">{t('rangeEyebrow')}</p>
              <h2 className="cc-display">{t('rangeTitle')}</h2>
            </div>
            <a href="#order" className="cc-btn">{tp('cta')}</a>
          </div>
          <div className="cc-range-track">
            {items.map((item, i) => (
              <article className="cc-range-card" key={i}>
                <div className="cc-range-media">
                  {i === 0 ? <img src={BINDER.square} alt={BINDER.alt[locale] || BINDER.alt.en} loading="lazy" /> : <i>0{i + 1}</i>}
                </div>
                <div className="cc-range-body">
                  {i === 0 && <span className="cc-range-tag">{tp('tagPopular')}</span>}
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <a href="#order" className="cc-link">{t('order')} →</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
