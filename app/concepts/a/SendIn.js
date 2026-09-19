'use client'
import { useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import { useRevealOnScroll } from '@/app/lib/useReveal'
import { WORKS } from '../shared/work'

const PHOTO = WORKS.find((w) => w.id === 'lucario') || WORKS[2]

export default function SendIn() {
  const t = useTranslations('concept.a')
  const ts = useTranslations('sendIn')
  const locale = useLocale()
  const steps = ts.raw('steps')
  const root = useRef(null)
  useRevealOnScroll(root)

  return (
    <>
      <style>{`
        .ca-sendin { padding: clamp(5rem, 12vw, 10rem) 0; border-top: 1px solid var(--color-border); }
        .ca-sendin-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: clamp(2rem, 6vw, 6rem); align-items: center; }
        .ca-sendin h2 { font-size: clamp(2rem, 5.2vw, 4.6rem); margin: 0.75rem 0 2rem; max-width: 16ch; }
        .ca-sendin-steps { border-top: 2px solid var(--color-text); }
        .ca-sendin-step { display: grid; grid-template-columns: 3rem 1fr; gap: 1rem; padding: 1.1rem 0; border-bottom: 1px solid var(--color-border); }
        .ca-sendin-step span { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.16em; color: var(--color-accent-text); padding-top: 0.2rem; }
        .ca-sendin-step h3 { font-size: 1.02rem; font-weight: 600; margin: 0 0 0.35rem; }
        .ca-sendin-step p { font-size: 0.9rem; color: var(--color-text-secondary); line-height: 1.65; margin: 0; }
        .ca-sendin-cta { margin-top: 2rem; }
        .ca-sendin-photo { position: relative; }
        .ca-sendin-photo img { width: 100%; height: auto; aspect-ratio: 4 / 5; object-fit: cover; border-radius: var(--radius); display: block; box-shadow: var(--shadow-hard-lg); position: relative; }
        .ca-sendin-photo::before { content: ''; position: absolute; inset: 1.25rem -1.25rem -1.25rem 1.25rem; background: var(--color-accent); border-radius: var(--radius); }
        @media (max-width: 900px) {
          .ca-sendin-grid { grid-template-columns: 1fr; }
          .ca-sendin-photo { max-width: 360px; margin: 2rem auto 0; }
        }
      `}</style>
      <section className="ca-sendin" ref={root} id="send-in">
        <div className="ca-wrap ca-sendin-grid">
          <div>
            <p className="ca-eyebrow reveal-item">{t('sendinEyebrow')}</p>
            <h2 className="ca-display reveal-item">{t('sendinTitle')}</h2>
            <div className="ca-sendin-steps">
              {steps.map((s, i) => (
                <div className="ca-sendin-step reveal-item" key={i}>
                  <span>0{i + 1}</span>
                  <div><h3>{s.title}</h3><p>{s.desc}</p></div>
                </div>
              ))}
            </div>
            <div className="ca-sendin-cta reveal-item">
              <a href="#order" className="ca-btn">{ts('cta')}</a>
            </div>
          </div>
          <div className="ca-sendin-photo reveal-item">
            <Image src={PHOTO.img} alt={PHOTO.alt[locale] || PHOTO.alt.en} sizes="(max-width: 900px) 360px, 30vw" placeholder="blur" />
          </div>
        </div>
      </section>
    </>
  )
}
