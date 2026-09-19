'use client'
import { useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { gsap, useGSAP, SplitText } from '@/app/lib/gsap'
import Magnetic from '@/app/components/magnetic'
import { WORKS } from '../shared/work'

const FEATURE = WORKS.find((w) => w.id === 'mewtwo') || WORKS[0]

export default function Hero() {
  const t = useTranslations('concept.a')
  const tTicker = useTranslations('ticker')
  const locale = useLocale()
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
        .to('.ca-hero-sub, .ca-hero-actions, .ca-hero-scroll', { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1 }, 0.6)
        .fromTo('.ca-hero-img', { autoAlpha: 0, yPercent: 30, rotate: 2 }, { autoAlpha: 1, yPercent: 0, rotate: -6, duration: 1.3, ease: 'power3.out' }, 0.5)
      return () => split.revert()
    })
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set('.ca-anim', { autoAlpha: 1 })
    })
  }, { scope: root })

  return (
    <>
      <style>{`
        .ca-hero { position: relative; min-height: 100svh; display: flex; flex-direction: column; justify-content: flex-end; padding: 8rem 0 0; }
        .ca-hero-title { font-size: clamp(3.1rem, 12.2vw, 11.4rem); margin: 0; position: relative; z-index: 2; }
        .ca-hero-title .accent { color: var(--color-accent); }
        .ca-hero-row { display: grid; grid-template-columns: 1.1fr 1fr; gap: 2rem; align-items: end; margin-top: 2.5rem; padding-bottom: 3rem; }
        .ca-hero-sub { font-size: 1.05rem; line-height: 1.7; color: var(--color-text-secondary); max-width: 520px; transform: translateY(16px); }
        .ca-hero-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; justify-self: end; transform: translateY(16px); }
        .ca-hero-img {
          position: absolute; right: clamp(1rem, 6vw, 8rem); top: 14vh; width: clamp(180px, 22vw, 340px);
          aspect-ratio: 4 / 5; object-fit: cover; z-index: 1; box-shadow: 0 40px 80px rgba(0,0,0,0.6);
          transform: rotate(-6deg);
        }
        .ca-hero-scroll {
          position: absolute; left: clamp(1.25rem, 4vw, 3.5rem); top: 50%; writing-mode: vertical-rl;
          font-size: 0.62rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--color-text-muted);
          display: flex; align-items: center; gap: 0.6rem;
        }
        .ca-hero-scroll::after { content: ''; width: 1px; height: 48px; background: var(--color-text-muted); }
        .ca-marquee { border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border); overflow: hidden; padding: 0.9rem 0; }
        .ca-marquee-track { display: flex; gap: 3rem; white-space: nowrap; animation: ca-tick 34s linear infinite; }
        .ca-marquee span { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; flex-shrink: 0; }
        .ca-marquee span::after { content: '✦'; color: var(--color-accent); margin-left: 3rem; }
        @keyframes ca-tick { to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .ca-marquee-track { animation: none; } }
        @media (max-width: 900px) {
          .ca-hero { padding-top: 6rem; }
          .ca-hero-img { position: relative; right: auto; top: auto; width: 46%; max-width: 260px; margin: 1.5rem 0 0 auto; }
          .ca-hero-row { grid-template-columns: 1fr; gap: 1.5rem; }
          .ca-hero-actions { justify-self: start; }
          .ca-hero-scroll { display: none; }
        }
      `}</style>
      <section className="ca-hero" ref={root} id="hero">
        <div className="ca-wrap">
          <img className="ca-hero-img ca-anim" src={FEATURE.card} alt={FEATURE.alt[locale] || FEATURE.alt.en} width={340} height={425} fetchPriority="high" />
          <h1 className="ca-display ca-hero-title ca-anim">
            {t('heroL1')}<br />{t('heroL2')}<br /><span className="accent">{t('heroL3')}</span>
          </h1>
          <div className="ca-hero-row">
            <p className="ca-hero-sub ca-anim">{t('heroSub')}</p>
            <div className="ca-hero-actions ca-anim">
              <Magnetic><a href="#order" className="ca-btn accent">{t('ctaPrimary')}</a></Magnetic>
              <Magnetic><a href="#work" className="ca-btn">{t('ctaSecondary')}</a></Magnetic>
            </div>
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
