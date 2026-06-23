'use client'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { useRevealOnScroll } from '@/app/lib/useReveal'

export default function HowItWorks() {
  const t = useTranslations('howItWorks')
  const steps = t.raw('steps')
  const nums = ['01', '02', '03', '04']
  const root = useRef(null)

  // Reveal the process steps (.reveal-item) as they scroll into view.
  useRevealOnScroll(root)

  return (
    <>
      <style>{`
        .step {
          padding: 2.5rem 2rem;
          border-right: 2px solid var(--color-border);
          background: var(--color-surface);
          transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
          cursor: default;
        }
        .step:last-child { border-right: none; }
        .step:hover {
          background: #FFFBEB;
          box-shadow: inset -3px -3px 0 var(--color-accent);
        }
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border: 2px solid var(--color-border);
          box-shadow: var(--shadow-hard);
        }
        .howitworks-section { padding: 7rem 3rem; }
        @media (max-width: 640px) {
          .howitworks-section { padding: 4rem 1.5rem !important; }
          .steps-grid { grid-template-columns: 1fr 1fr !important; }
          .step { padding: 1.75rem 1.25rem; border-right: 2px solid var(--color-border); border-bottom: 2px solid var(--color-border); }
          .step:nth-child(2) { border-right: none; }
          .step:nth-child(3) { border-right: 2px solid var(--color-border); border-bottom: none; }
          .step:nth-child(4) { border-right: none; border-bottom: none; }
        }
        /* On the narrowest phones a 2-col grid is too cramped — stack to one. */
        @media (max-width: 400px) {
          .steps-grid { grid-template-columns: 1fr !important; }
          .step, .step:nth-child(2), .step:nth-child(3) { border-right: none !important; border-bottom: 2px solid var(--color-border) !important; }
          .step:last-child { border-bottom: none !important; }
        }
      `}</style>
      <div id="how-it-works" ref={root} style={{ background: 'var(--color-bg)' }}>
        <section className="howitworks-section" style={{ maxWidth: '1200px', margin: '0 auto', fontFamily: 'var(--font-ui)' }}>
          <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>{t('eyebrow')}</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '4rem', color: 'var(--color-text)' }}>
            {t('titleLine1')}<br/>{t('titleLine2')}
          </h2>
          <div className="steps-grid">
            {steps.map((step, i) => (
              <div key={i} className="step reveal-item">
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.75rem', fontWeight: 300, color: '#D0D0CC', lineHeight: 1, marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>{nums[i]}</div>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.6rem', color: 'var(--color-text)', letterSpacing: '-0.01em' }}>{step.title}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, fontWeight: 400 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
