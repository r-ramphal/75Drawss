'use client'
import { useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { gsap, useGSAP } from '@/app/lib/gsap'
import { useRevealOnScroll } from '@/app/lib/useReveal'
import { WORKS } from '../shared/work'

/*
  Two editorial modules, text/image alternating, with a gentle scroll
  parallax on the photo. Build (module 1) and send-in (module 2).
*/
const IMG1 = WORKS.find((w) => w.id === 'mewtwo') || WORKS[0]
const IMG2 = WORKS.find((w) => w.id === 'battle') || WORKS[1]

export default function Modules() {
  const t = useTranslations('concept.c')
  const tf = useTranslations('features')
  const ts = useTranslations('sendIn')
  const locale = useLocale()
  const root = useRef(null)
  useRevealOnScroll(root)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray('.cc-mod-img img').forEach((img) => {
        gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true } })
      })
    })
  }, { scope: root })

  const build = tf.raw('items')[0]
  const sendSteps = ts.raw('steps')

  return (
    <>
      <style>{`
        .cc-mods { padding: clamp(4rem, 8vw, 7rem) 0 0; }
        .cc-mod { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(2rem, 6vw, 6rem); align-items: center; padding-bottom: clamp(4rem, 8vw, 7rem); }
        .cc-mod.flip .cc-mod-img { order: -1; }
        .cc-mod-img { aspect-ratio: 4 / 5; overflow: hidden; background: var(--color-sand); }
        .cc-mod-img img { width: 100%; height: 112%; object-fit: cover; display: block; margin-top: -6%; }
        .cc-mod h2 { font-size: clamp(2rem, 4.2vw, 3.6rem); margin: 0 0 1.25rem; line-height: 1.05; }
        .cc-mod p { color: var(--color-text-secondary); line-height: 1.75; margin: 0 0 1.75rem; max-width: 46ch; }
        .cc-mod ol { margin: 0 0 1.75rem; padding: 0; list-style: none; border-top: 1px solid var(--color-border); }
        .cc-mod ol li { display: grid; grid-template-columns: 2.5rem 1fr; gap: 0.75rem; padding: 0.8rem 0; border-bottom: 1px solid var(--color-border); font-size: 0.92rem; color: var(--color-text-secondary); }
        .cc-mod ol li i { font-family: var(--font-display); font-style: italic; color: var(--color-accent); font-size: 1.1rem; }
        @media (max-width: 800px) { .cc-mod { grid-template-columns: 1fr; } .cc-mod.flip .cc-mod-img { order: 0; } }
      `}</style>
      <section className="cc-mods" ref={root} id="products">
        <div className="cc-wrap">
          <article className="cc-mod">
            <div className="reveal-item">
              <p className="cc-eyebrow">{t('m1Eyebrow')}</p>
              <h2 className="cc-display">{t('m1Title')}</h2>
              <p>{build.desc}</p>
              <a href="#order" className="cc-link">{t('m1Cta')} →</a>
            </div>
            <div className="cc-mod-img reveal-item"><img src={IMG1.card} alt={IMG1.alt[locale] || IMG1.alt.en} loading="lazy" /></div>
          </article>
          <article className="cc-mod flip" id="send-in">
            <div className="reveal-item">
              <p className="cc-eyebrow">{t('m2Eyebrow')}</p>
              <h2 className="cc-display">{t('m2Title')}</h2>
              <ol>
                {sendSteps.map((s, i) => <li key={i}><i>{i + 1}.</i><span><strong style={{ color: 'var(--color-ink)' }}>{s.title}</strong> — {s.desc}</span></li>)}
              </ol>
              <a href="#order" className="cc-link">{t('m2Cta')} →</a>
            </div>
            <div className="cc-mod-img reveal-item"><img src={IMG2.card} alt={IMG2.alt[locale] || IMG2.alt.en} loading="lazy" /></div>
          </article>
        </div>
      </section>
    </>
  )
}
