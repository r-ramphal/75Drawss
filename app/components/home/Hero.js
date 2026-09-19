'use client'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { gsap, useGSAP, SplitText } from '@/app/lib/gsap'
import Magnetic from '@/app/components/magnetic'

export default function Hero() {
  const t = useTranslations('home')
  const th = useTranslations('hero')
  const tTicker = useTranslations('ticker')
  const root = useRef(null)
  const labels = tTicker.raw('items')
  const track = [...labels, ...labels]

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const title = root.current.querySelector('.site-hero-title')
      const split = new SplitText(title, { type: 'lines', mask: 'lines' })
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.set(title, { autoAlpha: 1 })
        .from(split.lines, { yPercent: 110, duration: 1.1, stagger: 0.12 }, 0.1)
        .to('.site-hero-eyebrow, .site-hero-sub, .site-hero-actions, .site-hero-trust, .site-hero-scroll', { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08 }, 0.5)
      return () => split.revert()
    })
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set('.site-anim', { autoAlpha: 1 })
    })
  }, { scope: root })

  return (
    <>
      <style>{`
        .site-hero { position: relative; min-height: 100svh; display: flex; flex-direction: column; justify-content: flex-end; padding: 7rem 0 0; }
        .site-hero-eyebrow { margin-bottom: 1.5rem; transform: translateY(12px); }
        .site-hero-title { font-size: clamp(3.1rem, 12.2vw, 11.4rem); margin: 0; }
        .site-hero-row { display: grid; grid-template-columns: 1.1fr 1fr; gap: 2rem; align-items: end; margin-top: 2.5rem; }
        .site-hero-sub { font-size: 1.05rem; line-height: 1.75; color: var(--color-text-secondary); max-width: 520px; margin: 0; transform: translateY(16px); }
        .site-hero-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; justify-self: end; transform: translateY(16px); }
        .site-hero-trust { display: flex; gap: 1.75rem; flex-wrap: wrap; margin: 1.75rem 0 3rem; transform: translateY(12px); }
        .site-hero-trust span { display: inline-flex; align-items: center; gap: 0.45rem; font-size: 0.8rem; font-weight: 500; color: var(--color-text-secondary); }
        .site-hero-trust svg { color: var(--color-accent-text); flex-shrink: 0; }
        .site-hero-scroll {
          position: absolute; right: clamp(1.25rem, 4vw, 3.5rem); top: 50%; writing-mode: vertical-rl;
          font-size: 0.62rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--color-text-muted);
          display: flex; align-items: center; gap: 0.6rem; transform: translateY(12px);
        }
        .site-hero-scroll::after { content: ''; width: 1px; height: 48px; background: var(--color-text-muted); }
        .site-marquee { background: var(--color-text); overflow: hidden; padding: 0.85rem 0; }
        .site-marquee-track { display: flex; gap: 3rem; white-space: nowrap; animation: site-tick 34s linear infinite; }
        .site-marquee span { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: #fff; flex-shrink: 0; }
        .site-marquee span::after { content: '·'; color: var(--color-accent); margin-left: 3rem; }
        @keyframes site-tick { to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .site-marquee-track { animation: none; } }
        @media (max-width: 900px) {
          .site-hero { padding-top: 5.5rem; min-height: calc(100svh - 64px); }
          .site-hero-title { font-size: clamp(2.7rem, 13.5vw, 5rem); }
          .site-hero-row { grid-template-columns: 1fr; gap: 1.5rem; }
          .site-hero-actions { justify-self: start; }
          .site-hero-scroll { display: none; }
          .site-hero-trust { gap: 0.75rem 1.25rem; }
        }
      `}</style>
      <section className="site-hero" ref={root} id="hero">
        <div className="site-wrap">
          <p className="site-eyebrow site-hero-eyebrow site-anim">{th('madeIn')}</p>
          <h1 className="site-display site-hero-title site-anim">
            {t('heroL1')}<br />{t('heroL2')}<br /><span className="site-mark">{t('heroL3')}</span>
          </h1>
          <div className="site-hero-row">
            <p className="site-hero-sub site-anim">{t('heroSub')}</p>
            <div className="site-hero-actions site-anim">
              <Magnetic><a href="#order" className="site-btn accent">{t('ctaPrimary')}</a></Magnetic>
              <Magnetic><a href="#work" className="site-btn">{t('ctaSecondary')}</a></Magnetic>
            </div>
          </div>
          <div className="site-hero-trust site-anim">
            {['trust1', 'trust2', 'trust3'].map((k) => (
              <span key={k}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                {th(k)}
              </span>
            ))}
          </div>
        </div>
        <div className="site-hero-scroll site-anim" aria-hidden="true">{t('scroll')}</div>
        <div className="site-marquee" aria-hidden="true">
          <div className="site-marquee-track">
            {track.map((l, i) => <span key={i}>{l}</span>)}
          </div>
        </div>
      </section>
    </>
  )
}
