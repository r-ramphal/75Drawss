'use client'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { useRevealOnScroll } from '@/app/lib/useReveal'

export default function Manifesto() {
  const t = useTranslations('concept.a')
  const root = useRef(null)
  useRevealOnScroll(root)

  return (
    <>
      <style>{`
        .ca-manifesto { padding: clamp(5rem, 12vw, 10rem) 0; }
        .ca-manifesto-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: clamp(2rem, 6vw, 6rem); align-items: start; }
        .ca-manifesto h2 {
          font-size: clamp(1.9rem, 4.2vw, 3.6rem); line-height: 1.02; letter-spacing: -0.03em;
          font-weight: 600 !important; text-transform: none !important; margin: 1.25rem 0 0;
        }
        .ca-manifesto p { font-size: clamp(1.05rem, 1.5vw, 1.3rem); line-height: 1.65; color: var(--color-text-secondary); margin: 0; }
        .ca-manifesto-aside { margin-top: 2.5rem; font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--color-text-muted); }
        @media (max-width: 900px) { .ca-manifesto-grid { grid-template-columns: 1fr; } }
      `}</style>
      <section className="ca-manifesto" ref={root} id="about">
        <div className="ca-wrap ca-manifesto-grid">
          <div className="reveal-item">
            <p className="ca-eyebrow">{t('manifestoEyebrow')}</p>
            <h2>{t('manifestoTitle')}</h2>
          </div>
          <div className="reveal-item">
            <p>{t('manifestoBody')}</p>
            <div className="ca-manifesto-aside">{t('manifestoAside')}</div>
          </div>
        </div>
      </section>
    </>
  )
}
