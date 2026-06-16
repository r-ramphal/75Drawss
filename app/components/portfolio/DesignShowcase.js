'use client'
/*
  Design A — Immersive Showcase.
  A full-viewport panel per binder, alternating left/right, with scroll-driven
  SplitText reveals, image parallax and a fixed progress rail. Data-driven from
  app/data/binders.js. Reduced-motion / mobile fall back to plain layout.
*/
import { useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import { BINDERS } from '@/app/data/binders'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

export default function DesignShowcase() {
  const t = useTranslations('portfolioPage')
  const tCat = useTranslations('portfolioPage.categories')
  const locale = useLocale()

  const rootRef = useRef(null)
  const counterRef = useRef(null)
  const barRef = useRef(null)

  useGSAP(() => {
    const root = rootRef.current
    const splits = []

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Hero title reveal on load.
      const heroTitle = root.querySelector('.dsa-h1')
      if (heroTitle) {
        const s = new SplitText(heroTitle, { type: 'words,chars' })
        splits.push(s)
        gsap.from(s.chars, { yPercent: 110, opacity: 0, ease: 'power3.out', duration: 0.9, stagger: 0.018 })
      }
      gsap.from('.dsa-hero .reveal', { y: 24, opacity: 0, duration: 0.8, delay: 0.25, stagger: 0.12, ease: 'power2.out' })

      // Per-panel reveals + parallax.
      gsap.utils.toArray('.dsa-panel').forEach((panel) => {
        const title = panel.querySelector('.dsa-ptitle')
        const s = new SplitText(title, { type: 'words' })
        splits.push(s)
        gsap.from(s.words, {
          yPercent: 120, opacity: 0, ease: 'power3.out', duration: 0.8, stagger: 0.06,
          scrollTrigger: { trigger: panel, start: 'top 65%', toggleActions: 'play none none reverse' },
        })
        gsap.from(panel.querySelectorAll('.dsa-meta, .dsa-desc'), {
          y: 28, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: panel, start: 'top 60%', toggleActions: 'play none none reverse' },
        })
        // Parallax drifts the whole framed image as a unit (no cropping).
        gsap.fromTo(panel.querySelector('.dsa-figure'),
          { yPercent: -5 },
          {
            yPercent: 5, ease: 'none',
            scrollTrigger: { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })

      // Single progress rail across all panels.
      ScrollTrigger.create({
        trigger: '.dsa-panels',
        start: 'top center',
        end: 'bottom center',
        onUpdate: (self) => {
          const idx = Math.min(BINDERS.length, Math.round(self.progress * (BINDERS.length - 1)) + 1)
          if (counterRef.current) counterRef.current.textContent = String(idx).padStart(2, '0')
          if (barRef.current) barRef.current.style.transform = `scaleY(${self.progress})`
        },
      })

      ScrollTrigger.refresh()
      return () => splits.forEach((s) => s.revert())
    })

    if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh())
  }, { scope: rootRef })

  return (
    <div ref={rootRef} className="dsa">
      <style>{`
        .dsa { background: var(--color-bg); color: var(--color-text); overflow: clip; }
        .dsa-hero {
          min-height: 100vh; display: flex; flex-direction: column; justify-content: center;
          padding: 9rem clamp(1.5rem, 6vw, 6rem) 5rem; max-width: 1100px; margin: 0 auto;
        }
        .dsa-eyebrow {
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--color-accent-text); margin-bottom: 1.4rem; font-family: var(--font-ui);
        }
        .dsa-h1 {
          font-family: var(--font-display); font-weight: 300; letter-spacing: -0.03em;
          font-size: clamp(2.6rem, 8vw, 6rem); line-height: 1.02; color: var(--color-text);
        }
        .dsa-intro {
          max-width: 540px; margin-top: 1.6rem; color: var(--color-text-secondary);
          font-size: 1.05rem; line-height: 1.7; font-family: var(--font-ui);
        }
        .dsa-scroll {
          margin-top: 2.5rem; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--color-text-muted); font-family: var(--font-ui);
          display: inline-flex; align-items: center; gap: 0.6rem;
        }
        .dsa-scroll::after { content: ''; width: 34px; height: 1px; background: var(--color-text-muted); }

        .dsa-panel {
          min-height: 100vh; display: grid; grid-template-columns: 1fr 1fr;
          align-items: center; gap: clamp(2rem, 5vw, 5rem);
          max-width: 1200px; margin: 0 auto; padding: 8vh clamp(1.5rem, 6vw, 6rem);
        }
        .dsa-figure-col { display: flex; justify-content: center; align-items: center; min-width: 0; }
        .dsa-panel.alt .dsa-figure-col { order: 2; }
        /* Frame wraps the image at its own aspect ratio — no cropping. */
        .dsa-figure {
          display: inline-block; line-height: 0; max-width: 100%;
          border-radius: 12px; overflow: hidden;
          border: 1px solid var(--color-border-strong); box-shadow: var(--shadow-hard-lg);
          background: var(--color-surface); will-change: transform;
        }
        .dsa-img { display: block; width: auto; height: auto; max-width: 100%; max-height: 76vh; }
        .dsa-num { font-family: var(--font-ui); font-size: 0.8rem; font-weight: 700; letter-spacing: 0.12em; color: var(--color-accent-text); }
        .dsa-cat {
          font-family: var(--font-ui); font-size: 0.68rem; font-weight: 700; letter-spacing: 0.16em;
          text-transform: uppercase; color: var(--color-text-muted);
          border: 1px solid var(--color-border-strong); border-radius: 100px; padding: 0.3rem 0.8rem;
        }
        .dsa-meta { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
        .dsa-ptitle {
          font-family: var(--font-display); font-weight: 300; letter-spacing: -0.02em;
          font-size: clamp(1.9rem, 4.2vw, 3.2rem); line-height: 1.04; color: var(--color-text);
          margin-bottom: 1.1rem; overflow: hidden;
        }
        .dsa-desc { font-family: var(--font-ui); color: var(--color-text-secondary); font-size: 1.02rem; line-height: 1.75; max-width: 42ch; }
        .dsa-game { margin-top: 1.3rem; font-family: var(--font-ui); font-size: 0.8rem; color: var(--color-text-muted); }

        .dsa-rail {
          position: fixed; right: clamp(0.8rem, 2vw, 2.2rem); top: 50%; transform: translateY(-50%);
          z-index: 50; display: flex; flex-direction: column; align-items: center; gap: 0.8rem;
          font-family: var(--font-ui);
        }
        .dsa-rail .num { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.06em; color: var(--color-text); }
        .dsa-rail .num b { color: var(--color-accent-text); }
        .dsa-railbar { width: 2px; height: 120px; background: var(--color-border); position: relative; overflow: hidden; }
        .dsa-railbar i { position: absolute; inset: 0; background: var(--color-accent); transform-origin: top center; transform: scaleY(0); }

        .dsa-end {
          min-height: 70vh; display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center; padding: 6rem clamp(1.5rem, 6vw, 6rem); gap: 1.5rem;
          border-top: 2px solid var(--color-border);
        }
        .dsa-end h2 { font-family: var(--font-display); font-weight: 300; font-size: clamp(2rem, 5vw, 3.6rem); letter-spacing: -0.025em; }
        .dsa-cta {
          display: inline-block; background: var(--color-accent); color: var(--color-text);
          font-family: var(--font-ui); font-size: 0.95rem; font-weight: 600; padding: 1rem 2.4rem;
          border-radius: var(--radius); text-decoration: none; border: 1px solid var(--color-accent);
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .dsa-cta:hover { background: var(--color-accent-hover); border-color: var(--color-accent-hover); transform: translateY(-1px); box-shadow: 0 10px 24px rgba(10,10,10,0.14); }

        @media (max-width: 860px) {
          .dsa-hero { min-height: 88vh; padding: 7rem clamp(1.5rem, 6vw, 6rem) 3rem; }
          .dsa-panel { grid-template-columns: 1fr; gap: 1.5rem; min-height: auto; padding: 5vh clamp(1.5rem, 6vw, 6rem); }
          .dsa-panel.alt .dsa-figure-col { order: 0; }
          .dsa-figure-col { justify-content: flex-start; }
          .dsa-img { max-height: 58vh; }
          .dsa-rail { display: none; }
          .dsa-end { min-height: 50vh; padding: 4rem clamp(1.5rem, 6vw, 6rem); }
        }
      `}</style>

      <section className="dsa-hero">
        <p className="dsa-eyebrow">{t('eyebrow')}</p>
        <h1 className="dsa-h1">{t('title')}</h1>
        <p className="dsa-intro reveal">{t('intro')}</p>
        <span className="dsa-scroll reveal">{t('scrollHint')}</span>
      </section>

      <div className="dsa-panels">
        {BINDERS.map((b, i) => (
          <section className={`dsa-panel ${i % 2 ? 'alt' : ''}`} key={b.id}>
            <div className="dsa-figure-col">
              <div className="dsa-figure">
                <Image
                  src={b.img}
                  alt={b.alt[locale] || b.alt.en}
                  placeholder="blur"
                  sizes="(max-width: 860px) 92vw, 560px"
                  className="dsa-img"
                  style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '76vh' }}
                />
              </div>
            </div>
            <div className="dsa-text-col">
              <div className="dsa-meta">
                <span className="dsa-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="dsa-cat">{tCat(b.category)}</span>
              </div>
              <h2 className="dsa-ptitle">{b.title[locale] || b.title.en}</h2>
              <p className="dsa-desc">{b.alt[locale] || b.alt.en}</p>
              <p className="dsa-game">{b.game}</p>
            </div>
          </section>
        ))}
      </div>

      <aside className="dsa-rail" aria-hidden="true">
        <span className="num"><b ref={counterRef}>01</b> / {String(BINDERS.length).padStart(2, '0')}</span>
        <span className="dsa-railbar"><i ref={barRef} /></span>
      </aside>

      <section className="dsa-end">
        <h2>{t('title')}</h2>
        <Link href="/#order" className="dsa-cta">{t('order')}</Link>
      </section>
    </div>
  )
}
