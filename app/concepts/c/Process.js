'use client'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { useRevealOnScroll } from '@/app/lib/useReveal'

export default function Process() {
  const t = useTranslations('concept.c')
  const th = useTranslations('howItWorks')
  const steps = th.raw('steps')
  const root = useRef(null)
  useRevealOnScroll(root, '.cc-step', { y: 24, stagger: 0.12 })

  return (
    <>
      <style>{`
        .cc-proc { padding: clamp(4rem, 8vw, 7rem) 0; border-top: 1px solid var(--color-border); }
        .cc-proc h2 { font-size: clamp(2rem, 4.2vw, 3.6rem); margin: 0 0 3rem; }
        .cc-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; border-top: 1px solid var(--color-ink); }
        .cc-step { padding-top: 1.25rem; }
        .cc-step i { font-family: var(--font-display); font-style: italic; font-size: 4rem; line-height: 1; color: var(--color-accent); display: block; margin-bottom: 1rem; font-variation-settings: 'opsz' 144; }
        .cc-step h3 { font-size: 1.05rem; font-weight: 600; margin: 0 0 0.5rem; }
        .cc-step p { font-size: 0.92rem; color: var(--color-text-secondary); line-height: 1.7; margin: 0; }
        @media (max-width: 900px) { .cc-steps { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 520px) { .cc-steps { grid-template-columns: 1fr; } }
      `}</style>
      <section className="cc-proc" ref={root} id="process">
        <div className="cc-wrap">
          <p className="cc-eyebrow">{t('processEyebrow')}</p>
          <h2 className="cc-display">{t('processTitle')}</h2>
          <div className="cc-steps">
            {steps.map((s, i) => (
              <div className="cc-step" key={i}>
                <i>{i + 1}</i>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
