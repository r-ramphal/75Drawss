'use client'
import { useEffect, useRef, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { useRevealOnScroll } from '@/app/lib/useReveal'
import { WORKS, WORK_COUNT, CATEGORIES } from '@/app/components/shared/work'

/*
  Numbered index of all binders, built for use rather than show:
  - category filter chips with counts
  - every row carries a thumbnail, so nothing depends on hovering
  - on wide screens a sticky preview column shows the row under the pointer
    or keyboard focus; on narrow screens the thumbnail is the preview
  - clicking a row opens a lightbox with the full photo, arrows / Escape on
    the keyboard, and a shortcut to the order form
*/
const ALL = 'all'

export default function Work() {
  const t = useTranslations('home')
  const tc = useTranslations('portfolioPage')
  const locale = useLocale()
  const catLabels = tc.raw('categories') || {}
  const root = useRef(null)
  const closeRef = useRef(null)
  const [filter, setFilter] = useState(ALL)
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(null)
  useRevealOnScroll(root, '.site-work-head, .site-work-filters', { y: 16 })

  const list = filter === ALL ? WORKS : WORKS.filter((w) => w.category === filter)
  const title = (w) => w.title[locale] || w.title.en
  const alt = (w) => w.alt[locale] || w.alt.en
  const label = (c) => catLabels[c] || c
  const counts = CATEGORIES.reduce((acc, c) => ({ ...acc, [c]: WORKS.filter((w) => w.category === c).length }), {})

  function pick(next) { setFilter(next); setActive(0) }

  // Lightbox: lock scroll, focus the close button, keyboard navigation.
  useEffect(() => {
    if (open === null) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') setOpen((o) => (o + 1) % list.length)
      if (e.key === 'ArrowLeft') setOpen((o) => (o - 1 + list.length) % list.length)
    }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [open, list.length])

  // Swipe left/right in the lightbox on touch screens.
  const touchX = useRef(null)
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (Math.abs(dx) < 50) return
    setOpen((o) => (dx < 0 ? (o + 1) % list.length : (o - 1 + list.length) % list.length))
  }

  const cur = list[Math.min(active, list.length - 1)]
  const lb = open !== null ? list[open] : null

  return (
    <>
      <style>{`
        .site-work { padding: clamp(4rem, 10vw, 8rem) 0; border-top: 1px solid var(--color-border); }
        .site-work-head { display: flex; justify-content: space-between; align-items: end; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
        .site-work-head h2 { font-size: clamp(3rem, 9vw, 8rem); margin: 0.75rem 0 0; }
        .site-work-head h2 sup { font-size: 0.28em; color: var(--color-accent-text); letter-spacing: 0; vertical-align: top; margin-left: 0.2em; font-weight: 700; }
        .site-work-hint { font-size: 0.8rem; color: var(--color-text-secondary); max-width: 30ch; text-align: right; margin: 0; }
        .site-work-filters { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
        .site-chip {
          font-family: var(--font-ui); font-size: 0.75rem; font-weight: 600; letter-spacing: 0.04em;
          padding: 0.5rem 0.9rem; border: 1px solid var(--color-border-strong); border-radius: 100px;
          background: var(--color-surface); color: var(--color-text); cursor: pointer; transition: background 0.15s, color 0.15s, border-color 0.15s;
        }
        .site-chip:hover { background: var(--color-hover-tint); }
        .site-chip.on { background: var(--color-text); color: #fff; border-color: var(--color-text); }
        .site-chip small { color: inherit; opacity: 0.6; margin-left: 0.35em; font-weight: 500; }
        .site-work-grid { display: grid; grid-template-columns: 1fr 360px; gap: clamp(1.5rem, 4vw, 4rem); align-items: start; }
        .site-work-list { list-style: none; margin: 0; padding: 0; border-top: 2px solid var(--color-text); }
        .site-work-row { border-bottom: 1px solid var(--color-border); }
        .site-work-link {
          width: 100%; display: grid; grid-template-columns: 2.75rem 48px 1fr auto auto; align-items: center; gap: 1rem;
          padding: 0.8rem 0.5rem 0.8rem 0; background: none; border: 0; color: inherit; text-align: left; cursor: pointer;
          font-family: var(--font-ui); border-left: 3px solid transparent; transition: background 0.15s, border-color 0.15s, padding-left 0.2s;
        }
        .site-work-row.on .site-work-link, .site-work-link:focus-visible { background: var(--color-hover-tint); border-left-color: var(--color-accent); padding-left: 0.6rem; outline: none; }
        .site-work-nr { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.16em; color: var(--color-text-muted); }
        .site-work-thumb { position: relative; width: 48px; height: 60px; border-radius: 3px; overflow: hidden; display: block; background: var(--color-hover-tint); }
        .site-work-thumb img { object-fit: cover; }
        .site-work-title { font-family: var(--font-display); font-weight: 700; font-size: clamp(1.05rem, 2vw, 1.5rem); letter-spacing: -0.02em; line-height: 1.1; }
        .site-work-meta { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-text-muted); }
        .site-work-preview { position: sticky; top: 6rem; }
        .site-work-preview-img { position: relative; aspect-ratio: 4 / 5; border-radius: var(--radius); overflow: hidden; background: var(--color-hover-tint); box-shadow: var(--shadow-hard-lg); }
        .site-work-preview-img img { object-fit: cover; animation: site-fade 0.35s ease; }
        @keyframes site-fade { from { opacity: 0; } }
        .site-work-preview-cap { display: flex; justify-content: space-between; gap: 1rem; margin-top: 0.75rem; font-size: 0.8rem; color: var(--color-text-secondary); }
        .site-work-preview-cap strong { color: var(--color-text); }
        .site-work-preview-btn { margin-top: 0.9rem; width: 100%; justify-content: center; }
        .site-work-foot { margin-top: 2rem; display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; }
        .site-work-count { font-size: 0.8rem; color: var(--color-text-secondary); }
        @media (max-width: 960px) {
          .site-work-grid { grid-template-columns: 1fr; }
          .site-work-preview { display: none; }
          .site-work-link { grid-template-columns: 2rem 44px 1fr auto; }
          .site-work-meta.game { display: none; }
          .site-work-thumb { width: 44px; height: 55px; }
          .site-work-hint { text-align: left; }
        }
        /* Lightbox */
        .site-lb { position: fixed; inset: 0; z-index: 90; background: rgba(10,10,10,0.92); display: grid; grid-template-columns: auto 1fr auto; align-items: center; padding: 1rem; }
        .site-lb-close { position: absolute; top: 1rem; right: 1rem; }
        .site-lb-nav { background: none; border: 1px solid rgba(255,255,255,0.35); color: #fff; width: 48px; height: 48px; border-radius: 50%; font-size: 1.2rem; cursor: pointer; }
        .site-lb-nav:hover, .site-lb-nav:focus-visible { background: var(--color-accent); color: #0A0A0A; border-color: var(--color-accent); outline: none; }
        .site-lb-fig { margin: 0; display: grid; grid-template-columns: auto 300px; gap: 2rem; align-items: center; justify-content: center; max-height: calc(100vh - 2rem); }
        .site-lb-fig img { max-height: calc(100vh - 6rem); max-width: 100%; height: auto; width: auto; display: block; border-radius: var(--radius); }
        .site-lb-cap { color: #fff; font-family: var(--font-ui); }
        .site-lb-cap .site-work-nr { color: var(--color-accent); }
        .site-lb-cap h3 { font-family: var(--font-display); font-size: 2rem; font-weight: 800; letter-spacing: -0.03em; line-height: 1; margin: 0.5rem 0 0.75rem; text-transform: uppercase; }
        .site-lb-cap p { color: rgba(255,255,255,0.75); line-height: 1.65; font-size: 0.9rem; margin: 0 0 1.5rem; }
        .site-lb-cap .site-btn { border-color: #fff; color: #fff; }
        .site-lb-cap .site-btn:hover { background: #fff; color: #0A0A0A; }
        .site-lb-cap .site-btn.accent { border-color: var(--color-accent); color: #0A0A0A; }
        .site-lb-cap .site-btn.accent:hover { background: var(--color-accent-hover); }
        .site-lb-keys { font-size: 0.68rem; color: rgba(255,255,255,0.5); margin-top: 1rem; letter-spacing: 0.08em; text-transform: uppercase; }
        @media (max-width: 800px) {
          .site-lb { grid-template-columns: 1fr; padding: 0.75rem; overflow: auto; align-items: start; background: rgba(10,10,10,0.98); }
          .site-lb-nav { position: fixed; top: 50%; transform: translateY(-50%); }
          .site-lb-nav.prev { left: 0.75rem; } .site-lb-nav.next { right: 0.75rem; }
          .site-lb-fig { grid-template-columns: 1fr; gap: 1rem; max-height: none; padding-top: 3.5rem; }
          .site-lb-fig img { max-height: 62vh; margin: 0 auto; }
          .site-lb-keys { display: none; }
        }
      `}</style>

      <section className="site-work" ref={root} id="work">
        <div className="site-wrap">
          <div className="site-work-head reveal-item">
            <div>
              <p className="site-eyebrow">{t('workEyebrow')}</p>
              <h2 className="site-display">{t('workTitle')}<sup>({WORK_COUNT})</sup></h2>
            </div>
            <p className="site-work-hint">{t('workHint')}</p>
          </div>

          <div className="site-work-filters reveal-item" role="group" aria-label={t('filterLabel')}>
            <button type="button" className={`site-chip ${filter === ALL ? 'on' : ''}`} onClick={() => pick(ALL)} aria-pressed={filter === ALL}>
              {t('filterAll')}<small>{WORK_COUNT}</small>
            </button>
            {CATEGORIES.map((c) => (
              <button key={c} type="button" className={`site-chip ${filter === c ? 'on' : ''}`} onClick={() => pick(c)} aria-pressed={filter === c}>
                {label(c)}<small>{counts[c]}</small>
              </button>
            ))}
          </div>

          <div className="site-work-grid">
            <ol className="site-work-list">
              {list.map((w, i) => (
                <li key={w.id} className={`site-work-row ${i === active ? 'on' : ''}`}>
                  <button
                    type="button"
                    className="site-work-link"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => { setActive(i); setOpen(i) }}
                    aria-label={`${title(w)} — ${t('openLabel')}`}
                  >
                    <span className="site-work-nr">{w.nr}</span>
                    <span className="site-work-thumb"><Image src={w.img} alt="" fill sizes="48px" placeholder="blur" /></span>
                    <span className="site-work-title">{title(w)}</span>
                    <span className="site-work-meta game">{w.game}</span>
                    <span className="site-work-meta">{label(w.category)}</span>
                  </button>
                </li>
              ))}
            </ol>

            <aside className="site-work-preview" aria-hidden="true">
              <div className="site-work-preview-img">
                {cur && <Image key={cur.id} src={cur.img} alt="" fill sizes="360px" placeholder="blur" className="on" />}
              </div>
              {cur && (
                <>
                  <div className="site-work-preview-cap">
                    <span><strong>{cur.nr}</strong> — {title(cur)}</span>
                    <span>{cur.game} · {label(cur.category)}</span>
                  </div>
                  <button type="button" className="site-btn site-work-preview-btn" onClick={() => setOpen(Math.min(active, list.length - 1))} tabIndex={-1}>
                    {t('openLabel')}
                  </button>
                </>
              )}
            </aside>
          </div>

          <div className="site-work-foot">
            <span className="site-work-count">{t('countLabel', { shown: list.length, total: WORK_COUNT })}</span>
            <Link href="/portfolio" className="site-btn">{t('workAll')}</Link>
          </div>
        </div>
      </section>

      {lb && (
        <div className="site-lb" role="dialog" aria-modal="true" aria-label={title(lb)} onClick={(e) => { if (e.target === e.currentTarget) setOpen(null) }} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <button type="button" ref={closeRef} className="site-btn site-lb-close" style={{ borderColor: '#fff', color: '#fff' }} onClick={() => setOpen(null)}>
            {t('close')} ×
          </button>
          <button type="button" className="site-lb-nav prev" onClick={() => setOpen((o) => (o - 1 + list.length) % list.length)} aria-label={t('prev')}>←</button>
          <figure className="site-lb-fig">
            <Image src={lb.img} alt={alt(lb)} sizes="(max-width: 800px) 100vw, 60vw" placeholder="blur" priority />
            <figcaption className="site-lb-cap">
              <span className="site-work-nr">{lb.nr} / {String(list.length).padStart(2, '0')}</span>
              <h3>{title(lb)}</h3>
              <p>{alt(lb)}</p>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                <a href="#order" className="site-btn accent" onClick={() => setOpen(null)}>{t('lbCta')}</a>
                <Link href="/portfolio" className="site-btn">{t('workAll')}</Link>
              </div>
              <div className="site-lb-keys">← → · Esc</div>
            </figcaption>
          </figure>
          <button type="button" className="site-lb-nav next" onClick={() => setOpen((o) => (o + 1) % list.length)} aria-label={t('next')}>→</button>
        </div>
      )}
    </>
  )
}
