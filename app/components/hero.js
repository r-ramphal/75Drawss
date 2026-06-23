'use client'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { gsap, useGSAP } from '@/app/lib/gsap'
import Magnetic from './magnetic'

const chips = ['Pokémon', 'One Piece', 'Lorcana']

export default function Hero() {
  const t = useTranslations('hero')
  const root = useRef(null)

  // Choreographed entrance. Elements start hidden via the `.hero-anim` CSS
  // baseline (so there's no flash of un-animated content); GSAP reveals them
  // in sequence. Reduced-motion + no-JS visitors get the content immediately
  // (see the media query and <noscript> fallback in the <style> block).
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.85 } })
      tl.fromTo('.hero-eyebrow', { y: 18 }, { autoAlpha: 1, y: 0, duration: 0.6 })
        .fromTo('.hero-h1', { y: 28 }, { autoAlpha: 1, y: 0 }, '-=0.25')
        .fromTo('.hero-desc', { y: 22 }, { autoAlpha: 1, y: 0 }, '-=0.55')
        .fromTo('.hero-chips', { y: 18 }, { autoAlpha: 1, y: 0 }, '-=0.6')
        .fromTo('.hero-actions', { y: 18 }, { autoAlpha: 1, y: 0 }, '-=0.6')
        .fromTo('.hero-stats', { y: 14 }, { autoAlpha: 1, y: 0 }, '-=0.55')
        .fromTo('.hero-scroll', {}, { autoAlpha: 1, duration: 0.5 }, '-=0.3')
    })
  }, { scope: root })

  return (
    <>
      <style>{`
        @keyframes scrollBob {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50%      { transform: translateY(6px); opacity: 1; }
        }

        /* Animated-in elements start hidden; GSAP reveals them. */
        .hero-anim { opacity: 0; }
        /* Visitors who opt out of motion (or have JS disabled) see everything. */
        @media (prefers-reduced-motion: reduce) { .hero-anim { opacity: 1 !important; } }

        .btn-primary {
          background: var(--color-accent); color: var(--color-text);
          font-size: 0.9rem; font-weight: 600; padding: 0.95rem 2.1rem;
          border-radius: var(--radius); text-decoration: none;
          border: 1px solid var(--color-accent);
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          white-space: nowrap; display: inline-block; font-family: var(--font-ui);
        }
        .btn-primary:hover { background: var(--color-accent-hover); border-color: var(--color-accent-hover); transform: translateY(-1px); box-shadow: 0 8px 20px rgba(10,10,10,0.12); }
        .btn-outline {
          background: transparent; color: var(--color-text);
          font-size: 0.9rem; font-weight: 500; padding: 0.95rem 2.1rem;
          border-radius: var(--radius); text-decoration: none;
          border: 1px solid var(--color-border-strong);
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
          white-space: nowrap; display: inline-block; font-family: var(--font-ui);
        }
        .btn-outline:hover { background: var(--color-text); color: #fff; border-color: var(--color-text); }

        .hero-stat { font-size: 0.72rem; font-weight: 500; color: var(--color-text-muted); font-family: var(--font-ui); letter-spacing: 0.04em; }
        .hero-stat strong { color: var(--color-text); font-weight: 700; margin-right: 0.3em; }

        .hero-section {
          min-height: 92vh; /* fallback for browsers without dvh */
          min-height: 92dvh; display: flex; flex-direction: column;
          align-items: center; justify-content: center; text-align: center;
          padding: 8rem 1.5rem 4rem; max-width: 820px; margin: 0 auto; position: relative;
        }

        @media (max-width: 640px) {
          .hero-section { min-height: 88vh; min-height: 88dvh; padding: 7rem 1.25rem 3rem; }
        }
      `}</style>

      {/* No-JS fallback: if scripts never run, GSAP can't reveal — show it all. */}
      <noscript>
        <style>{`.hero-anim { opacity: 1 !important; }`}</style>
      </noscript>

      <div id="hero" ref={root} style={{ background: 'var(--color-bg)', position: 'relative', overflow: 'hidden' }}>
        <section className="hero-section">
          <div className="hero-eyebrow hero-anim" style={{ marginBottom: '1.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ fontSize: '0.68rem', fontWeight: 500, color: 'var(--color-text-muted)', letterSpacing: '0.08em', fontFamily: 'var(--font-ui)' }}>
              {t('madeIn')}
            </span>
          </div>

          <h1 className="hero-h1 hero-anim" style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 300, lineHeight: 1.02, letterSpacing: '-0.035em',
            color: 'var(--color-text)', marginBottom: '1.75rem',
          }}>
            {t('titleLine')}<br/>
            <em style={{ fontStyle: 'normal', color: 'var(--color-accent-text)' }}>{t('titleEmphasis')}</em>
          </h1>

          <p className="hero-desc hero-anim" style={{
            fontSize: '1.05rem', fontWeight: 400, color: 'var(--color-text-secondary)',
            lineHeight: 1.8, maxWidth: '480px', marginBottom: '2rem', fontFamily: 'var(--font-ui)',
          }}>
            {t('description')}
          </p>

          <div className="hero-chips hero-anim" style={{ marginBottom: '2.5rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '520px' }}>
            {chips.map(game => (
              <span key={game} style={{
                fontSize: '0.72rem', fontWeight: 500, color: 'var(--color-text-secondary)',
                border: '1.5px solid rgba(10,10,10,0.18)', padding: '0.22rem 0.65rem',
                borderRadius: '100px', fontFamily: 'var(--font-ui)', background: 'var(--color-surface)', letterSpacing: '0.01em',
              }}>{game}</span>
            ))}
          </div>

          <div className="hero-actions hero-anim" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem' }}>
            <Magnetic><a href="#order" className="btn-primary">{t('ctaPrimary')}</a></Magnetic>
            <Magnetic strength={0.25}><a href="#products" className="btn-outline">{t('ctaSecondary')}</a></Magnetic>
          </div>

          <div className="hero-stats hero-anim" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', paddingTop: '1.75rem', borderTop: '1px solid rgba(10,10,10,0.1)' }}>
            <span className="hero-stat"><strong>{t('stat1Value')}</strong>{t('stat1Label')}</span>
            <span className="hero-stat"><strong>{t('stat2Value')}</strong>{t('stat2Label')}</span>
            <span className="hero-stat"><strong>{t('stat3Value')}</strong>{t('stat3Label')}</span>
          </div>

          <a href="#products" className="hero-scroll hero-anim" aria-label={t('scrollAria')} style={{
            position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
            color: 'var(--color-text-muted)', textDecoration: 'none',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'scrollBob 1.8s ease-in-out infinite' }} aria-hidden="true">
              <path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>
            </svg>
          </a>
        </section>
      </div>
    </>
  )
}
