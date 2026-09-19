'use client'
import { useEffect, useRef, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { useRevealOnScroll } from '@/app/lib/useReveal'
import { WORKS, WORK_COUNT, CATEGORIES } from '../shared/work'

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
  const t = useTranslations('concept.a')
  const tc = useTranslations('portfolioPage')
  const locale = useLocale()
  const catLabels = tc.raw('categories') || {}
  const root = useRef(null)
  const closeRef = useRef(null)
  const [filter, setFilter] = useState(ALL)
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(null)
  useRevealOnScroll(root, '.ca-work-head, .ca-work-filters', { y: 16 })

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
        .ca-work { padding: clamp(4rem, 10vw, 8rem) 0; border-top: 1px solid var(--color-border); }
        .ca-work-head { display: flex; justify-content: space-between; align-items: end; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
        .ca-work-head h2 { font-size: clamp(3rem, 9vw, 8rem); margin: 0.75rem 0 0; }
        .ca-work-head h2 sup { font-size: 0.28em; color: var(--color-accent-text); letter-spacing: 0; vertical-align: top; margin-left: 0.2em; font-weight: 700; }
        .ca-work-hint { font-size: 0.8rem; color: var(--color-text-secondary); max-width: 30ch; text-align: right; margin: 0; }
        .ca-work-filters { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
        .ca-chip {
          font-family: var(--font-ui); font-size: 0.75rem; font-weight: 600; letter-spacing: 0.04em;
          padding: 0.5rem 0.9rem; border: 1px solid var(--color-border-strong); border-radius: 100px;
          background: var(--color-surface); color: var(--color-text); cursor: pointer; transition: background 0.15s, color 0.15s, border-color 0.15s;
        }
        .ca-chip:hover { background: var(--color-hover-tint); }
        .ca-chip.on { background: var(--color-text); color: #fff; border-color: var(--color-text); }
        .ca-chip small { color: inherit; opacity: 0.6; margin-left: 0.35em; font-weight: 500; }
        .ca-work-grid { display: grid; grid-template-columns: 1fr 360px; gap: clamp(1.5rem, 4vw, 4rem); align-items: start; }
        .ca-work-list { list-style: none; margin: 0; padding: 0; border-top: 2px solid var(--color-text); }
        .ca-work-row { border-bottom: 1px solid var(--color-border); }
        .ca-work-link {
          width: 100%; display: grid; grid-template-columns: 2.75rem 48px 1fr auto auto; align-items: center; gap: 1rem;
          padding: 0.8rem 0.5rem 0.8rem 0; background: none; border: 0; color: inherit; text-align: left; cursor: pointer;
          font-family: var(--font-ui); border-left: 3px solid transparent; transition: background 0.15s, border-color 0.15s, padding-left 0.2s;
        }
        .ca-work-row.on .ca-work-link, .ca-work-link:focus-visible { background: var(--color-hover-tint); border-left-color: var(--color-accent); padding-left: 0.6rem; outline: none; }
        .ca-work-nr { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.16em; color: var(--color-text-muted); }
        .ca-work-thumb { width: 48px; height: 60px; object-fit: cover; border-radius: 3px; display: block; background: var(--color-hover-tint); }
        .ca-work-title { font-family: var(--font-display); font-weight: 700; font-size: clamp(1.05rem, 2vw, 1.5rem); letter-spacing: -0.02em; line-height: 1.1; }
        .ca-work-meta { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-text-muted); }
        .ca-work-preview { position: sticky; top: 6rem; }
        .ca-work-preview-img { position: relative; aspect-ratio: 4 / 5; border-radius: var(--radius); overflow: hidden; background: var(--color-hover-tint); box-shadow: var(--shadow-hard-lg); }
        .ca-work-preview-img img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity 0.35s ease; }
        .ca-work-preview-img img.on { opacity: 1; }
        .ca-work-preview-cap { display: flex; justify-content: space-between; gap: 1rem; margin-top: 0.75rem; font-size: 0.8rem; color: var(--color-text-secondary); }
        .ca-work-preview-cap strong { color: var(--color-text); }
        .ca-work-preview-btn { margin-top: 0.9rem; width: 100%; justify-content: center; }
        .ca-work-foot { margin-top: 2rem; display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; }
        .ca-work-count { font-size: 0.8rem; color: var(--color-text-secondary); }
        @media (max-width: 960px) {
          .ca-work-grid { grid-template-columns: 1fr; }
          .ca-work-preview { display: none; }
          .ca-work-link { grid-template-columns: 2rem 44px 1fr auto; }
          .ca-work-meta.game { display: none; }
          .ca-work-thumb { width: 44px; height: 55px; }
          .ca-work-hint { text-align: left; }
        }
        /* Lightbox */
        .ca-lb { position: fixed; inset: 0; z-index: 90; background: rgba(10,10,10,0.92); display: grid; grid-template-columns: auto 1fr auto; align-items: center; padding: 1rem; }
        .ca-lb-close { position: absolute; top: 1rem; right: 1rem; }
        .ca-lb-nav { background: none; border: 1px solid rgba(255,255,255,0.35); color: #fff; width: 48px; height: 48px; border-radius: 50%; font-size: 1.2rem; cursor: pointer; }
        .ca-lb-nav:hover, .ca-lb-nav:focus-visible { background: var(--color-accent); color: #0A0A0A; border-color: var(--color-accent); outline: none; }
        .ca-lb-fig { margin: 0; display: grid; grid-template-columns: auto 300px; gap: 2rem; align-items: center; justify-content: center; max-height: calc(100vh - 2rem); }
        .ca-lb-fig img { max-height: calc(100vh - 6rem); max-width: 100%; height: auto; width: auto; display: block; border-radius: var(--radius); }
        .ca-lb-cap { color: #fff; font-family: var(--font-ui); }
        .ca-lb-cap .ca-work-nr { color: var(--color-accent); }
        .ca-lb-cap h3 { font-family: var(--font-display); font-size: 2rem; font-weight: 800; letter-spacing: -0.03em; line-height: 1; margin: 0.5rem 0 0.75rem; text-transform: uppercase; }
        .ca-lb-cap p { color: rgba(255,255,255,0.75); line-height: 1.65; font-size: 0.9rem; margin: 0 0 1.5rem; }
        .ca-lb-cap .ca-btn { border-color: #fff; color: #fff; }
        .ca-lb-cap .ca-btn:hover { background: #fff; color: #0A0A0A; }
        .ca-lb-cap .ca-btn.accent { border-color: var(--color-accent); color: #0A0A0A; }
        .ca-lb-cap .ca-btn.accent:hover { background: var(--color-accent-hover); }
        .ca-lb-keys { font-size: 0.68rem; color: rgba(255,255,255,0.5); margin-top: 1rem; letter-spacing: 0.08em; text-transform: uppercase; }
        @media (max-width: 800px) {
          .ca-lb { grid-template-columns: 1fr; padding: 0.75rem; overflow: auto; align-items: start; background: rgba(10,10,10,0.98); }
          .ca-lb-nav { position: fixed; top: 50%; transform: translateY(-50%); }
          .ca-lb-nav.prev { left: 0.75rem; } .ca-lb-nav.next { right: 0.75rem; }
          .ca-lb-fig { grid-template-columns: 1fr; gap: 1rem; max-height: none; padding-top: 3.5rem; }
          .ca-lb-fig img { max-height: 62vh; margin: 0 auto; }
          .ca-lb-keys { display: none; }
        }
      `}</style>

      <section className="ca-work" ref={root} id="work">
        <div className="ca-wrap">
          <div className="ca-work-head reveal-item">
            <div>
              <p className="ca-eyebrow">{t('workEyebrow')}</p>
              <h2 className="ca-display">{t('workTitle')}<sup>({WORK_COUNT})</sup></h2>
            </div>
            <p className="ca-work-hint">{t('workHint')}</p>
          </div>

          <div className="ca-work-filters reveal-item" role="group" aria-label={t('filterLabel')}>
            <button type="button" className={`ca-chip ${filter === ALL ? 'on' : ''}`} onClick={() => pick(ALL)} aria-pressed={filter === ALL}>
              {t('filterAll')}<small>{WORK_COUNT}</small>
            </button>
            {CATEGORIES.map((c) => (
              <button key={c} type="button" className={`ca-chip ${filter === c ? 'on' : ''}`} onClick={() => pick(c)} aria-pressed={filter === c}>
                {label(c)}<small>{counts[c]}</small>
              </button>
            ))}
          </div>

          <div className="ca-work-grid">
            <ol className="ca-work-list">
              {list.map((w, i) => (
                <li key={w.id} className={`ca-work-row ${i === active ? 'on' : ''}`}>
                  <button
                    type="button"
                    className="ca-work-link"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => { setActive(i); setOpen(i) }}
                    aria-label={`${title(w)} — ${t('openLabel')}`}
                  >
                    <span className="ca-work-nr">{w.nr}</span>
                    <img className="ca-work-thumb" src={w.card} alt="" loading="lazy" width={48} height={60} />
                    <span className="ca-work-title">{title(w)}</span>
                    <span className="ca-work-meta game">{w.game}</span>
                    <span className="ca-work-meta">{label(w.category)}</span>
                  </button>
                </li>
              ))}
            </ol>

            <aside className="ca-work-preview" aria-hidden="true">
              <div className="ca-work-preview-img">
                {list.map((w, i) => (
                  <img key={w.id} src={w.card} alt="" className={i === active ? 'on' : ''} loading={i < 2 ? 'eager' : 'lazy'} />
                ))}
              </div>
              {cur && (
                <>
                  <div className="ca-work-preview-cap">
                    <span><strong>{cur.nr}</strong> — {title(cur)}</span>
                    <span>{cur.game} · {label(cur.category)}</span>
                  </div>
                  <button type="button" className="ca-btn ca-work-preview-btn" onClick={() => setOpen(Math.min(active, list.length - 1))} tabIndex={-1}>
                    {t('openLabel')}
                  </button>
                </>
              )}
            </aside>
          </div>

          <div className="ca-work-foot">
            <span className="ca-work-count">{t('countLabel', { shown: list.length, total: WORK_COUNT })}</span>
            <Link href="/portfolio" className="ca-btn">{t('workAll')}</Link>
          </div>
        </div>
      </section>

      {lb && (
        <div className="ca-lb" role="dialog" aria-modal="true" aria-label={title(lb)} onClick={(e) => { if (e.target === e.currentTarget) setOpen(null) }} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <button type="button" ref={closeRef} className="ca-btn ca-lb-close" style={{ borderColor: '#fff', color: '#fff' }} onClick={() => setOpen(null)}>
            {t('close')} ×
          </button>
          <button type="button" className="ca-lb-nav prev" onClick={() => setOpen((o) => (o - 1 + list.length) % list.length)} aria-label={t('prev')}>←</button>
          <figure className="ca-lb-fig">
            <img src={lb.img.src} alt={alt(lb)} />
            <figcaption className="ca-lb-cap">
              <span className="ca-work-nr">{lb.nr} / {String(list.length).padStart(2, '0')}</span>
              <h3>{title(lb)}</h3>
              <p>{alt(lb)}</p>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                <a href="#order" className="ca-btn accent" onClick={() => setOpen(null)}>{t('lbCta')}</a>
                <Link href="/portfolio" className="ca-btn">{t('workAll')}</Link>
              </div>
              <div className="ca-lb-keys">← → · Esc</div>
            </figcaption>
          </figure>
          <button type="button" className="ca-lb-nav next" onClick={() => setOpen((o) => (o + 1) % list.length)} aria-label={t('next')}>→</button>
        </div>
      )}
    </>
  )
}
