'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function FAQ() {
  const t = useTranslations('faq')
  const faqs = t.raw('items')
  const [open, setOpen] = useState(null)

  return (
    <>
      <style>{`
        .faq-item { border-bottom: 2px solid var(--color-border); }
        .faq-item:first-child { border-top: 2px solid var(--color-border); }
        .faq-btn {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.4rem 0;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          gap: 2rem;
          font-family: var(--font-ui);
          transition: color 0.15s;
        }
        .faq-btn:hover .faq-q { color: var(--color-accent-text); }
        .faq-q {
          font-size: 0.92rem;
          font-weight: 500;
          color: var(--color-text);
          line-height: 1.4;
          transition: color 0.15s;
        }
        .faq-icon {
          width: 24px;
          height: 24px;
          border: 2px solid var(--color-border);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          color: var(--color-text);
          flex-shrink: 0;
          transition: background 0.15s, color 0.15s, transform 0.2s;
          font-family: var(--font-ui);
          line-height: 1;
        }
        .faq-icon.open {
          background: var(--color-accent);
          transform: rotate(45deg);
        }
        .faq-answer {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          line-height: 1.85;
          font-weight: 400;
          padding-bottom: 1.4rem;
          max-width: 680px;
        }
        .faq-section { padding: 7rem 3rem; }
        @media (max-width: 640px) { .faq-section { padding: 4rem 1.5rem !important; } }
      `}</style>

      <div id="faq" style={{ borderTop: '2px solid var(--color-border)', background: 'var(--color-bg)' }}>
        <section className="faq-section" style={{ maxWidth: '1200px', margin: '0 auto', fontFamily: 'var(--font-ui)' }}>
          <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>{t('eyebrow')}</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '4rem', color: 'var(--color-text)' }}>
            {t('titleLine1')}<br/>{t('titleLine2')}
          </h2>
          <div>
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item">
                <button
                  className="faq-btn"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className="faq-q">{faq.q}</span>
                  <span className={`faq-icon ${open === i ? 'open' : ''}`} aria-hidden="true">+</span>
                </button>
                {open === i && (
                  <p className="faq-answer">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
