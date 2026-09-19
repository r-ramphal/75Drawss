'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function Faq() {
  const t = useTranslations('concept.b')
  const tf = useTranslations('faq')
  const items = tf.raw('items')
  const [open, setOpen] = useState(null)

  return (
    <>
      <style>{`
        .cb-faq { border-top: 1px solid var(--color-border); padding: clamp(4rem, 8vw, 7rem) 0; }
        .cb-faq-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 3rem; }
        .cb-faq h2 { font-size: clamp(2rem, 4.6vw, 4rem); margin: 0.75rem 0 0; }
        .cb-faq-list { border-top: 1px solid var(--color-border-strong); }
        .cb-faq-item { border-bottom: 1px solid var(--color-border); }
        .cb-faq-q { width: 100%; display: grid; grid-template-columns: 3rem 1fr auto; gap: 1rem; align-items: baseline; padding: 1.1rem 0; background: none; border: 0; color: inherit; cursor: pointer; text-align: left; font-family: var(--font-display); font-size: 1.05rem; font-weight: 500; }
        .cb-faq-q:hover { color: var(--color-accent); }
        .cb-faq-a { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.35s ease; }
        .cb-faq-item.open .cb-faq-a { grid-template-rows: 1fr; }
        .cb-faq-a > div { overflow: hidden; }
        .cb-faq-a p { margin: 0; padding: 0 0 1.25rem 4rem; color: var(--color-text-secondary); line-height: 1.75; max-width: 60ch; }
        @media (max-width: 860px) { .cb-faq-grid { grid-template-columns: 1fr; gap: 1.5rem; } .cb-faq-a p { padding-left: 0; } }
      `}</style>
      <section className="cb-faq" id="faq">
        <div className="cb-wrap cb-faq-grid">
          <div>
            <p className="cb-label"><b>{'//'}</b> {t('faqLabel')}</p>
            <h2 className="cb-title">{tf('titleLine1')} {tf('titleLine2')}</h2>
          </div>
          <div className="cb-faq-list">
            {items.map((f, i) => (
              <div key={i} className={`cb-faq-item ${open === i ? 'open' : ''}`}>
                <button type="button" className="cb-faq-q" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
                  <span className="cb-label"><b>{String(i + 1).padStart(2, '0')}</b></span>
                  <span>{f.q}</span>
                  <span className="cb-label">[{open === i ? '–' : '+'}]</span>
                </button>
                <div className="cb-faq-a"><div><p>{f.a}</p></div></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
