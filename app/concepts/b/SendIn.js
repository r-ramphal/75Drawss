'use client'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { useRevealOnScroll } from '@/app/lib/useReveal'
import { WORKS } from '../shared/work'

const BG = WORKS.find((w) => w.id === 'kid') || WORKS[0]

export default function SendIn() {
  const t = useTranslations('concept.b')
  const ts = useTranslations('sendIn')
  const steps = ts.raw('steps')
  const root = useRef(null)
  useRevealOnScroll(root)

  return (
    <>
      <style>{`
        .cb-sendin { position: relative; border-top: 1px solid var(--color-border); padding: clamp(4rem, 8vw, 7rem) 0; overflow: hidden; }
        .cb-sendin-bg { position: absolute; inset: 0; background: url(${BG.mono}) center / cover no-repeat; opacity: 0.28; }
        .cb-sendin-bg::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, #0D0D0D 10%, rgba(13,13,13,0.55)); }
        .cb-sendin-in { position: relative; }
        .cb-sendin h2 { font-size: clamp(2rem, 4.6vw, 4rem); margin: 0.75rem 0 2.5rem; max-width: 18ch; }
        .cb-sendin-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .cb-sendin-step { border: 1px solid var(--color-border-strong); padding: 1.25rem; background: rgba(13,13,13,0.6); backdrop-filter: blur(6px); }
        .cb-sendin-step h3 { font-size: 1.05rem; font-weight: 500; margin: 0.6rem 0 0.5rem; }
        .cb-sendin-step p { font-size: 0.9rem; color: var(--color-text-secondary); line-height: 1.7; margin: 0; }
        .cb-sendin-cta { margin-top: 2rem; }
        @media (max-width: 860px) { .cb-sendin-steps { grid-template-columns: 1fr; } }
      `}</style>
      <section className="cb-sendin" id="send-in" ref={root}>
        <div className="cb-sendin-bg" aria-hidden="true" />
        <div className="cb-wrap cb-sendin-in">
          <p className="cb-label reveal-item"><b>{'//'}</b> {t('sendinLabel')}</p>
          <h2 className="cb-title reveal-item">{t('sendinTitle')}</h2>
          <div className="cb-sendin-steps">
            {steps.map((s, i) => (
              <div className="cb-sendin-step reveal-item" key={i}>
                <span className="cb-label"><b>Take {i + 1}</b></span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="cb-sendin-cta reveal-item"><a href="#order" className="cb-btn">{ts('cta')}</a></div>
        </div>
      </section>
    </>
  )
}
