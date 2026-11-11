'use client'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { useRevealOnScroll } from '@/app/lib/useReveal'

export default function Manifesto() {
  const t = useTranslations('home')
  const root = useRef(null)
  useRevealOnScroll(root)

  return (
    <>
      <style>{`
        .site-manifesto { padding: var(--section-y) 0; }
        .site-manifesto-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: clamp(2rem, 6vw, 6rem); align-items: start; }
        .site-manifesto h2 {
          font-size: clamp(1.9rem, 4.2vw, 3.6rem); line-height: 1.02; letter-spacing: -0.03em;
          font-family: var(--font-display); font-weight: 700 !important; text-transform: none !important; margin: 1.25rem 0 0;
        }
        .site-manifesto p { font-size: clamp(1.05rem, 1.5vw, 1.3rem); line-height: 1.65; color: var(--color-text-secondary); margin: 0; }
        .site-manifesto-aside { margin-top: 1.5rem; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--color-text-muted); }
        @media (max-width: 900px) { .site-manifesto-grid { grid-template-columns: 1fr; } }
      `}</style>
      <section className="site-manifesto" ref={root} id="about">
        <div className="site-wrap site-manifesto-grid">
          <div className="reveal-item">
            <p className="site-eyebrow">{t('manifestoEyebrow')}</p>
            <h2>{t('manifestoTitle')}</h2>
          </div>
          <div className="reveal-item">
            <p>{t('manifestoBody')}</p>
            <div className="site-manifesto-aside">{t('manifestoAside')}</div>
          </div>
        </div>
      </section>
    </>
  )
}
