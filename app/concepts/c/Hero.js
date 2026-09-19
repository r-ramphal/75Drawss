'use client'
import { useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { gsap, useGSAP } from '@/app/lib/gsap'
import { WORKS } from '../shared/work'

/*
  Full-bleed photo with the italic headline over it, then the intro row with
  the CTAs and the existing trust lines. The photo is a wide crop of a binder
  for now; an atmospheric studio photo can replace it once approved.
*/
const PHOTO = WORKS.find((w) => w.id === 'starters') || WORKS[0]

export default function Hero() {
  const t = useTranslations('concept.c')
  const th = useTranslations('hero')
  const locale = useLocale()
  const root = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.cc-hero-title', { y: 40, autoAlpha: 0, duration: 1.2, ease: 'power3.out', delay: 0.1 })
      gsap.from('.cc-hero-row > *', { y: 24, autoAlpha: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1, delay: 0.5 })
      gsap.to('.cc-hero-img', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: '.cc-hero-media', start: 'top top', end: 'bottom top', scrub: true } })
    })
  }, { scope: root })

  return (
    <>
      <style>{`
        .cc-hero-media { position: relative; height: 82vh; min-height: 480px; overflow: hidden; }
        .cc-hero-img { position: absolute; inset: -12% 0 0; width: 100%; height: 112%; object-fit: cover; }
        .cc-hero-media::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(21,19,15,0.75), rgba(21,19,15,0.05) 55%); }
        .cc-hero-text { position: absolute; left: 0; right: 0; bottom: 0; z-index: 2; padding-bottom: clamp(2rem, 5vw, 4rem); color: #F3EEE4; }
        .cc-hero-caption { font-size: 0.78rem; letter-spacing: 0.1em; text-transform: uppercase; opacity: 0.85; margin: 0 0 1rem; }
        .cc-hero-title { font-size: clamp(2.8rem, 7.5vw, 7rem); margin: 0; max-width: 14ch; color: #F3EEE4; }
        .cc-hero-row { display: grid; grid-template-columns: 1.2fr 1fr; gap: 2rem; align-items: start; padding: 2.5rem 0 3rem; border-bottom: 1px solid var(--color-border); }
        .cc-hero-sub { font-size: 1.15rem; line-height: 1.7; color: var(--color-text-secondary); max-width: 46ch; margin: 0; }
        .cc-hero-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; justify-self: end; }
        .cc-hero-trust { grid-column: 1 / -1; display: flex; gap: 2rem; flex-wrap: wrap; margin-top: 0.5rem; }
        .cc-hero-trust span { font-size: 0.82rem; color: var(--color-text-secondary); display: inline-flex; gap: 0.45rem; align-items: center; }
        .cc-hero-trust svg { color: var(--color-accent); }
        @media (max-width: 800px) {
          .cc-hero-media { height: 68vh; }
          .cc-hero-row { grid-template-columns: 1fr; }
          .cc-hero-actions { justify-self: start; }
        }
      `}</style>
      <section ref={root} id="hero">
        <div className="cc-hero-media">
          <img className="cc-hero-img" src={PHOTO.wide} alt={PHOTO.alt[locale] || PHOTO.alt.en} fetchPriority="high" />
          <div className="cc-hero-text">
            <div className="cc-wrap">
              <p className="cc-hero-caption">{t('heroCaption')}</p>
              <h1 className="cc-display cc-hero-title">{t('heroL1')}<br />{t('heroL2')}</h1>
            </div>
          </div>
        </div>
        <div className="cc-wrap cc-hero-row">
          <p className="cc-hero-sub">{t('heroSub')}</p>
          <div className="cc-hero-actions">
            <a href="#order" className="cc-btn ink">{t('ctaPrimary')}</a>
            <Link href="/portfolio" className="cc-btn">{t('ctaSecondary')}</Link>
          </div>
          <div className="cc-hero-trust">
            {['trust1', 'trust2', 'trust3'].map((k) => (
              <span key={k}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                {th(k)}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
