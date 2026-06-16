'use client'
/*
  /inspiratie — Inspiration & community.
  Helps undecided visitors find a direction: browse by vibe (reuses BINDERS +
  CATEGORIES), idea-starters (styles, colour palettes, popular themes), a
  community section (socials) and a closing CTA. Data-driven from
  app/data/binders.js + app/data/inspiration.js.

  Community feed note: shows follow CTAs + a work teaser. To embed a live
  Instagram/TikTok feed, add post permalinks (official embeds) or a widget —
  that step also needs the CSP widened in next.config.mjs.
*/
import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { BINDERS, CATEGORIES } from '@/app/data/binders'
import { STYLES, PALETTES, THEMES, SOCIALS } from '@/app/data/inspiration'

export default function InspirationView() {
  const t = useTranslations('inspiratie')
  const tCat = useTranslations('portfolioPage.categories')
  const locale = useLocale()
  const [filter, setFilter] = useState('all')

  const shown = filter === 'all' ? BINDERS : BINDERS.filter((b) => b.category === filter)
  const featured = BINDERS.filter((b) => b.featured).slice(0, 6)
  const L = (obj) => obj[locale] || obj.en

  return (
    <div className="insp">
      <style>{`
        .insp { background: var(--color-bg); color: var(--color-text); font-family: var(--font-ui); }
        .insp-wrap { max-width: 1200px; margin: 0 auto; padding: 0 clamp(1.5rem, 5vw, 4rem); }
        .insp-hero { padding: 9rem 0 3rem; }
        .insp-eyebrow { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: var(--color-accent-text); margin-bottom: 1.2rem; }
        .insp-h1 { font-family: var(--font-display); font-weight: 300; letter-spacing: -0.03em; font-size: clamp(2.3rem, 6vw, 4.5rem); line-height: 1.03; }
        .insp-intro { max-width: 560px; margin-top: 1.3rem; color: var(--color-text-secondary); font-size: 1.05rem; line-height: 1.7; }

        .insp-section { padding: 3.5rem 0; border-top: 1px solid var(--color-border); }
        .insp-h2 { font-family: var(--font-display); font-weight: 300; letter-spacing: -0.02em; font-size: clamp(1.6rem, 3.5vw, 2.4rem); }
        .insp-sub { color: var(--color-text-secondary); font-size: 0.95rem; margin-top: 0.5rem; margin-bottom: 1.75rem; }

        .insp-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.75rem; }
        .insp-chip { font-size: 0.78rem; font-weight: 600; padding: 0.5rem 1.05rem; border-radius: 100px; cursor: pointer; background: var(--color-surface); color: var(--color-text-secondary); border: 1px solid var(--color-border-strong); transition: all 0.18s ease; }
        .insp-chip:hover { color: var(--color-text); border-color: var(--color-text); }
        .insp-chip.active { background: var(--color-text); color: #fff; border-color: var(--color-text); }

        .insp-grid { columns: 4; column-gap: 1rem; }
        .insp-card { break-inside: avoid; margin: 0 0 1rem; position: relative; display: block; border-radius: 10px; overflow: hidden; border: 1px solid var(--color-border-strong); box-shadow: var(--shadow-hard); background: var(--color-surface); }
        .insp-card img { width: 100%; height: auto; display: block; }
        .insp-cap { position: absolute; left: 0; right: 0; bottom: 0; padding: 1.6rem 0.9rem 0.7rem; color: #fff; font-size: 0.74rem; font-weight: 600; background: linear-gradient(to top, rgba(10,10,10,0.8), rgba(10,10,10,0)); opacity: 0; transition: opacity 0.25s ease; }
        .insp-card:hover .insp-cap { opacity: 1; }
        .insp-cap .cat { display: block; font-size: 0.6rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-accent); margin-bottom: 0.15rem; }

        .insp-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        .insp-tile { display: flex; flex-direction: column; gap: 0.4rem; padding: 1.4rem; border-radius: 10px; border: 1px solid var(--color-border-strong); background: var(--color-surface); color: inherit; }
        .insp-tile h3 { font-size: 0.98rem; font-weight: 600; }
        .insp-tile p { font-size: 0.82rem; color: var(--color-text-secondary); }
        .insp-swatches { display: flex; height: 30px; border-radius: 6px; overflow: hidden; margin-bottom: 0.6rem; }
        .insp-swatches span { flex: 1; }

        .insp-themes { display: flex; flex-wrap: wrap; gap: 0.6rem; }
        .insp-theme { font-size: 0.85rem; font-weight: 500; padding: 0.6rem 1.2rem; border-radius: 100px; border: 1px solid var(--color-border-strong); background: var(--color-surface); color: var(--color-text); }

        .insp-social { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.75rem; }
        .insp-social a { display: flex; align-items: center; gap: 1rem; padding: 1.4rem 1.5rem; border-radius: 12px; text-decoration: none; color: #fff; transition: transform 0.18s ease, box-shadow 0.18s ease; }
        .insp-social a:hover { transform: translateY(-2px); box-shadow: var(--shadow-hard-lg); }
        .insp-ig { background: linear-gradient(120deg, #833ab4, #fd1d1d, #fcb045); }
        .insp-tt { background: #0a0a0a; }
        .insp-social .h { font-size: 0.95rem; font-weight: 700; }
        .insp-social .s { font-size: 0.78rem; opacity: 0.85; }

        .insp-teaser { display: grid; grid-template-columns: repeat(6, 1fr); gap: 0.6rem; }
        .insp-teaser .t { position: relative; aspect-ratio: 1 / 1; border-radius: 8px; overflow: hidden; border: 1px solid var(--color-border-strong); }
        .insp-teaser img { object-fit: cover; }

        .insp-cta { text-align: center; padding: 5rem 0 6rem; border-top: 1px solid var(--color-border); }
        .insp-cta h2 { font-family: var(--font-display); font-weight: 300; font-size: clamp(1.8rem, 4.5vw, 3rem); letter-spacing: -0.025em; }
        .insp-cta p { max-width: 480px; margin: 0.9rem auto 1.75rem; color: var(--color-text-secondary); line-height: 1.7; }
        .insp-btn { display: inline-block; background: var(--color-accent); color: var(--color-text); font-size: 0.95rem; font-weight: 600; padding: 1rem 2.4rem; border-radius: var(--radius); text-decoration: none; border: 1px solid var(--color-accent); transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease; }
        .insp-btn:hover { background: var(--color-accent-hover); border-color: var(--color-accent-hover); transform: translateY(-1px); box-shadow: 0 10px 24px rgba(10,10,10,0.14); }

        @media (max-width: 1000px) { .insp-grid { columns: 3; } }
        @media (max-width: 760px) { .insp-grid { columns: 2; } .insp-cards { grid-template-columns: 1fr 1fr; } .insp-social { grid-template-columns: 1fr; } .insp-teaser { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 640px) {
          .insp-hero { padding: 7rem 0 2.25rem; }
          .insp-section { padding: 2.5rem 0; }
          .insp-cta { padding: 3.5rem 0 4.5rem; }
        }
        @media (max-width: 460px) { .insp-cards { grid-template-columns: 1fr; } }
      `}</style>

      <section className="insp-hero insp-wrap">
        <p className="insp-eyebrow">{t('eyebrow')}</p>
        <h1 className="insp-h1">{t('title')}</h1>
        <p className="insp-intro">{t('intro')}</p>
      </section>

      {/* BROWSE BY VIBE */}
      <section className="insp-section insp-wrap">
        <h2 className="insp-h2">{t('browseTitle')}</h2>
        <p className="insp-sub">{t('browseIntro')}</p>
        <div className="insp-chips" role="group" aria-label={t('browseTitle')}>
          <button type="button" className={`insp-chip ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>{t('filterAll')}</button>
          {CATEGORIES.map((c) => (
            <button type="button" key={c} className={`insp-chip ${filter === c ? 'active' : ''}`} onClick={() => setFilter(c)}>{tCat(c)}</button>
          ))}
        </div>
        <div className="insp-grid">
          {shown.map((b) => (
            <figure className="insp-card" key={b.id}>
              <Image src={b.img} alt={L(b.alt)} placeholder="blur" sizes="(max-width: 460px) 50vw, (max-width: 760px) 33vw, 240px" style={{ width: '100%', height: 'auto', display: 'block' }} />
              <figcaption className="insp-cap"><span className="cat">{tCat(b.category)}</span>{L(b.title)}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* STYLES */}
      <section className="insp-section insp-wrap">
        <h2 className="insp-h2">{t('stylesTitle')}</h2>
        <p className="insp-sub">{t('stylesIntro')}</p>
        <div className="insp-cards">
          {STYLES.map((s) => (
            <div className="insp-tile" key={s.id}>
              <h3>{L(s.label)}</h3>
              <p>{L(s.desc)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PALETTES */}
      <section className="insp-section insp-wrap">
        <h2 className="insp-h2">{t('palettesTitle')}</h2>
        <p className="insp-sub">{t('palettesIntro')}</p>
        <div className="insp-cards">
          {PALETTES.map((p) => (
            <div className="insp-tile" key={p.id}>
              <div className="insp-swatches" aria-hidden="true">
                {p.colors.map((c) => <span key={c} style={{ background: c }} />)}
              </div>
              <h3>{L(p.label)}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* THEMES */}
      <section className="insp-section insp-wrap">
        <h2 className="insp-h2">{t('themesTitle')}</h2>
        <p className="insp-sub" />
        <div className="insp-themes">
          {THEMES.map((th) => (
            <span className="insp-theme" key={th.id}>{L(th.label)}</span>
          ))}
        </div>
      </section>

      {/* COMMUNITY */}
      <section className="insp-section insp-wrap">
        <h2 className="insp-h2">{t('communityTitle')}</h2>
        <p className="insp-sub">{t('communityIntro')}</p>
        <div className="insp-social">
          <a href={SOCIALS.instagram.url} target="_blank" rel="noopener noreferrer" className="insp-ig">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            <span><span className="h">{t('followInstagram')}</span><br /><span className="s">{SOCIALS.instagram.handle}</span></span>
          </a>
          <a href={SOCIALS.tiktok.url} target="_blank" rel="noopener noreferrer" className="insp-tt">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
            <span><span className="h">{t('followTiktok')}</span><br /><span className="s">{SOCIALS.tiktok.handle}</span></span>
          </a>
        </div>
        <div className="insp-teaser">
          {featured.map((b) => (
            <div className="t" key={b.id}>
              <Image src={b.img} alt={L(b.alt)} fill placeholder="blur" sizes="180px" style={{ objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="insp-cta insp-wrap">
        <h2>{t('ctaTitle')}</h2>
        <p>{t('ctaIntro')}</p>
        <Link href="/#order" className="insp-btn">{t('cta')} →</Link>
      </section>
    </div>
  )
}
