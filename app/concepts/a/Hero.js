'use client'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { gsap, useGSAP, SplitText } from '@/app/lib/gsap'
import Magnetic from '@/app/components/magnetic'

export default function Hero() {
  const t = useTranslations('concept.a')
  const th = useTranslations('hero')
  const tTicker = useTranslations('ticker')
  const root = useRef(null)
  const labels = tTicker.raw('items')
  const track = [...labels, ...labels]

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const title = root.current.querySelector('.ca-hero-title')
      const split = new SplitText(title, { type: 'lines', mask: 'lines' })
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.set(title, { autoAlpha: 1 })
        .from(split.lines, { yPercent: 110, duration: 1.1, stagger: 0.12 }, 0.1)
        .to('.ca-hero-eyebrow, .ca-hero-sub, .ca-hero-actions, .ca-hero-trust, .ca-hero-scroll', { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08 }, 0.5)
      return () => split.revert()
    })
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set('.ca-anim', { autoAlpha: 1 })
    })
  }, { scope: root })

  return (
    <>
      <style>{`
        .ca-hero { position: relative; min-height: 100svh; display: flex; flex-direction: column; justify-content: flex-end; padding: 7rem 0 0; }
        .ca-hero-eyebrow { margin-bottom: 1.5rem; transform: translateY(12px); }
        .ca-hero-title { font-size: clamp(3.1rem, 12.2vw, 11.4rem); margin: 0; }
        .ca-hero-row { display: grid; grid-template-columns: 1.1fr 1fr; gap: 2rem; align-items: end; margin-top: 2.5rem; }
        .ca-hero-sub { font-size: 1.05rem; line-height: 1.75; color: var(--color-text-secondary); max-width: 520px; margin: 0; transform: translateY(16px); }
        .ca-hero-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; justify-self: end; transform: translateY(16px); }
        .ca-hero-trust { display: flex; gap: 1.75rem; flex-wrap: wrap; margin: 1.75rem 0 3rem; transform: translateY(12px); }
        .ca-hero-trust span { display: inline-flex; align-items: center; gap: 0.45rem; font-size: 0.8rem; font-weight: 500; color: var(--color-text-secondary); }
        .ca-hero-trust svg { color: var(--color-accent-text); flex-shrink: 0; }
        .ca-hero-scroll {
          position: absolute; right: clamp(1.25rem, 4vw, 3.5rem); top: 50%; writing-mode: vertical-rl;
          font-size: 0.62rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--color-text-muted);
          display: flex; align-items: center; gap: 0.6rem; transform: translateY(12px);
        }
        .ca-hero-scroll::after { content: ''; width: 1px; height: 48px; background: var(--color-text-muted); }
        .ca-marquee { background: var(--color-text); overflow: hidden; padding: 0.85rem 0; }
        .ca-marquee-track { display: flex; gap: 3rem; white-space: nowrap; animation: ca-tick 34s linear infinite; }
        .ca-marquee span { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: #fff; flex-shrink: 0; }
        .ca-marquee span::after { content: '·'; color: var(--color-accent); margin-left: 3rem; }
        @keyframes ca-tick { to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .ca-marquee-track { animation: none; } }
        @media (max-width: 900px) {
          .ca-hero { padding-top: 5.5rem; min-height: calc(100svh - 64px); }
          .ca-hero-title { font-size: clamp(2.7rem, 13.5vw, 5rem); }
          .ca-hero-row { grid-template-columns: 1fr; gap: 1.5rem; }
          .ca-hero-actions { justify-self: start; }
          .ca-hero-scroll { display: none; }
          .ca-hero-trust { gap: 0.75rem 1.25rem; }
        }
      `}</style>
      <section className="ca-hero" ref={root} id="hero">
        <div className="ca-wrap">
          <p className="ca-eyebrow ca-hero-eyebrow ca-anim">{th('madeIn')}</p>
          <h1 className="ca-display ca-hero-title ca-anim">
            {t('heroL1')}<br />{t('heroL2')}<br /><span className="ca-mark">{t('heroL3')}</span>
          </h1>
          <div className="ca-hero-row">
            <p className="ca-hero-sub ca-anim">{t('heroSub')}</p>
            <div className="ca-hero-actions ca-anim">
              <Magnetic><a href="#order" className="ca-btn accent">{t('ctaPrimary')}</a></Magnetic>
              <Magnetic><a href="#work" className="ca-btn">{t('ctaSecondary')}</a></Magnetic>
            </div>
          </div>
          <div className="ca-hero-trust ca-anim">
            {['trust1', 'trust2', 'trust3'].map((k) => (
              <span key={k}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                {th(k)}
              </span>
            ))}
          </div>
        </div>
        <div className="ca-hero-scroll ca-anim" aria-hidden="true">{t('scroll')}</div>
        <div className="ca-marquee" aria-hidden="true">
          <div className="ca-marquee-track">
            {track.map((l, i) => <span key={i}>{l}</span>)}
          </div>
        </div>
      </section>
    </>
  )
}
