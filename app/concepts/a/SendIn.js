'use client'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { useRevealOnScroll } from '@/app/lib/useReveal'
import { WORKS } from '../shared/work'

const BG = WORKS.find((w) => w.id === 'lucario') || WORKS[2]

export default function SendIn() {
  const t = useTranslations('concept.a')
  const ts = useTranslations('sendIn')
  const steps = ts.raw('steps')
  const root = useRef(null)
  useRevealOnScroll(root)

  return (
    <>
      <style>{`
        .ca-sendin { position: relative; padding: clamp(5rem, 12vw, 10rem) 0; overflow: hidden; border-top: 1px solid var(--color-border); }
        .ca-sendin-bg { position: absolute; inset: 0; background: url(${BG.mono}) center / cover no-repeat; opacity: 0.35; }
        .ca-sendin-bg::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to right, #0A0A0A 20%, rgba(10,10,10,0.5)); }
        .ca-sendin-in { position: relative; }
        .ca-sendin h2 { font-size: clamp(2rem, 5.6vw, 5rem); margin: 0.75rem 0 2.5rem; max-width: 14ch; }
        .ca-sendin-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; border-top: 1px solid var(--color-border-strong); }
        .ca-sendin-step { padding-top: 1.25rem; }
        .ca-sendin-step span { font-size: 0.68rem; letter-spacing: 0.2em; color: var(--color-accent); }
        .ca-sendin-step h3 { font-size: 1.1rem; font-weight: 700; margin: 0.5rem 0; }
        .ca-sendin-step p { font-size: 0.9rem; color: var(--color-text-secondary); line-height: 1.65; margin: 0; }
        .ca-sendin-cta { margin-top: 2.5rem; }
        @media (max-width: 800px) { .ca-sendin-steps { grid-template-columns: 1fr; gap: 1.25rem; } }
      `}</style>
      <section className="ca-sendin" ref={root} id="send-in">
        <div className="ca-sendin-bg" aria-hidden="true" />
        <div className="ca-wrap ca-sendin-in">
          <p className="ca-eyebrow reveal-item">{t('sendinEyebrow')}</p>
          <h2 className="ca-display reveal-item">{t('sendinTitle')}</h2>
          <div className="ca-sendin-steps">
            {steps.map((s, i) => (
              <div className="ca-sendin-step reveal-item" key={i}>
                <span>0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="ca-sendin-cta reveal-item">
            <a href="#order" className="ca-btn">{ts('cta')}</a>
          </div>
        </div>
      </section>
    </>
  )
}
