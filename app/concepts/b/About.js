'use client'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { useRevealOnScroll } from '@/app/lib/useReveal'

export default function About() {
  const t = useTranslations('concept.b')
  const tf = useTranslations('features')
  const items = tf.raw('items')
  const root = useRef(null)
  useRevealOnScroll(root)

  return (
    <>
      <style>{`
        .cb-about { border-top: 1px solid var(--color-border); padding: clamp(4rem, 8vw, 7rem) 0; }
        .cb-about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(2rem, 6vw, 6rem); }
        .cb-about h2 { font-size: clamp(2rem, 4.6vw, 4rem); margin: 0.75rem 0 1.25rem; }
        .cb-about p { color: var(--color-text-secondary); line-height: 1.8; margin: 0; max-width: 52ch; }
        .cb-about-list { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--color-border); }
        .cb-about-list li { display: grid; grid-template-columns: 3rem 1fr; gap: 1rem; padding: 1.1rem 0; border-bottom: 1px solid var(--color-border); }
        .cb-about-list h3 { font-size: 1rem; font-weight: 500; margin: 0 0 0.3rem; }
        .cb-about-list p { font-size: 0.9rem; }
        @media (max-width: 860px) { .cb-about-grid { grid-template-columns: 1fr; } }
      `}</style>
      <section className="cb-about" id="about" ref={root}>
        <div className="cb-wrap cb-about-grid">
          <div className="reveal-item">
            <p className="cb-label"><b>{'//'}</b> {t('aboutLabel')}</p>
            <h2 className="cb-title">{t('aboutTitle')}</h2>
            <p>{t('aboutBody')}</p>
          </div>
          <ul className="cb-about-list">
            {items.map((f, i) => (
              <li key={i} className="reveal-item">
                <span className="cb-label"><b>0{i + 1}</b></span>
                <div><h3>{f.title}</h3><p>{f.desc}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
