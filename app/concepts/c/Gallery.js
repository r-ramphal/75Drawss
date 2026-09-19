'use client'
import { useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { useRevealOnScroll } from '@/app/lib/useReveal'
import { WORKS } from '../shared/work'

export default function Gallery() {
  const t = useTranslations('concept.c')
  const tp = useTranslations('portfolio')
  const locale = useLocale()
  const root = useRef(null)
  useRevealOnScroll(root, '.cc-gal-item', { y: 24, stagger: 0.06 })

  return (
    <>
      <style>{`
        .cc-gal { padding: clamp(4rem, 8vw, 7rem) 0; }
        .cc-gal-head { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: end; margin-bottom: 2.5rem; }
        .cc-gal h2 { font-size: clamp(2rem, 4.2vw, 3.6rem); margin: 0; }
        .cc-gal-intro { color: var(--color-text-secondary); line-height: 1.7; margin: 0 0 1rem; max-width: 46ch; }
        .cc-gal-cols { columns: 3; column-gap: 1.25rem; }
        .cc-gal-item { break-inside: avoid; margin: 0 0 1.25rem; }
        .cc-gal-item img { width: 100%; height: auto; display: block; }
        .cc-gal-item figcaption { display: flex; justify-content: space-between; gap: 1rem; padding: 0.6rem 0 0; font-size: 0.8rem; color: var(--color-text-secondary); }
        .cc-gal-item figcaption i { font-family: var(--font-display); color: var(--color-accent); }
        @media (max-width: 900px) { .cc-gal-cols { columns: 2; } .cc-gal-head { grid-template-columns: 1fr; } }
        @media (max-width: 520px) { .cc-gal-cols { columns: 1; } }
      `}</style>
      <section className="cc-gal" ref={root} id="portfolio">
        <div className="cc-wrap">
          <div className="cc-gal-head">
            <div>
              <p className="cc-eyebrow">{t('galleryEyebrow')}</p>
              <h2 className="cc-display">{t('galleryTitle')}</h2>
            </div>
            <div>
              <p className="cc-gal-intro">{tp('intro')}</p>
              <Link href="/portfolio" className="cc-link">{tp('viewAll')} →</Link>
            </div>
          </div>
          <div className="cc-gal-cols">
            {WORKS.map((w) => (
              <figure className="cc-gal-item" key={w.id}>
                <Image src={w.img} alt={w.alt[locale] || w.alt.en} placeholder="blur" sizes="(max-width: 520px) 100vw, (max-width: 900px) 50vw, 33vw" />
                <figcaption><span><i>{w.nr}</i> — {w.title[locale] || w.title.en}</span><span>{w.category}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
