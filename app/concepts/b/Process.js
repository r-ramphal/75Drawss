'use client'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { useRevealOnScroll } from '@/app/lib/useReveal'

export default function Process() {
  const t = useTranslations('concept.b')
  const th = useTranslations('howItWorks')
  const steps = th.raw('steps')
  const meta = t.raw('processMeta')
  const root = useRef(null)
  useRevealOnScroll(root, '.cb-shot')

  return (
    <>
      <style>{`
        .cb-proc { border-top: 1px solid var(--color-border); padding: clamp(4rem, 8vw, 7rem) 0; }
        .cb-proc h2 { font-size: clamp(2rem, 4.6vw, 4rem); margin: 0.75rem 0 2.5rem; }
        .cb-shots { border-top: 1px solid var(--color-border-strong); }
        .cb-shot { display: grid; grid-template-columns: 5rem 1.2fr 1.6fr 10rem; gap: 1.5rem; align-items: baseline; padding: 1.6rem 0; border-bottom: 1px solid var(--color-border); }
        .cb-shot-nr { font-family: var(--font-mono); font-size: 1.4rem; color: var(--color-accent); }
        .cb-shot h3 { font-family: var(--font-display); font-size: clamp(1.3rem, 2.4vw, 2rem); font-weight: 700; letter-spacing: -0.02em; margin: 0; }
        .cb-shot p { margin: 0; color: var(--color-text-secondary); line-height: 1.7; }
        .cb-shot-meta { text-align: right; }
        @media (max-width: 860px) {
          .cb-shot { grid-template-columns: 3rem 1fr; }
          .cb-shot p { grid-column: 2; }
          .cb-shot-meta { grid-column: 2; text-align: left; }
        }
      `}</style>
      <section className="cb-proc" id="process" ref={root}>
        <div className="cb-wrap">
          <p className="cb-label"><b>{'//'}</b> {t('processLabel')}</p>
          <h2 className="cb-title">{t('processTitle')}</h2>
          <div className="cb-shots">
            {steps.map((s, i) => (
              <div className="cb-shot" key={i}>
                <span className="cb-shot-nr">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="cb-label cb-shot-meta"><b>[</b> {meta[i]} <b>]</b></span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
