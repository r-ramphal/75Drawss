'use client'
import { useEffect, useRef, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { gsap, useGSAP, Flip } from '@/app/lib/gsap'
import LanguageSwitcher from '@/app/components/languageswitcher'
import { WORKS, WORK_COUNT } from '../shared/work'

/*
  Nav HUD + viewfinder hero + the work section. Kept together because the
  view toggles (slider / grid / list) in the nav drive the work layout.
*/
const VIEWS = ['slider', 'grid', 'list']
const HERO_IDS = ['mewtwo', 'battle', 'moltres', 'lucario', 'dialga']
const HERO = HERO_IDS.map((id) => WORKS.find((w) => w.id === id)).filter(Boolean)

export default function Studio() {
  const t = useTranslations('concept.b')
  const locale = useLocale()
  const [view, setView] = useState('slider')
  const [grain, setGrain] = useState(true)
  const [slide, setSlide] = useState(0)          // hero slider
  const [current, setCurrent] = useState(0)      // work slider
  const workRef = useRef(null)
  const flipState = useRef(null)

  // Hero crossfade.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setSlide((s) => (s + 1) % HERO.length), 4200)
    return () => clearInterval(id)
  }, [])

  // Keyboard navigation for the work slider.
  useEffect(() => {
    if (view !== 'slider') return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setCurrent((c) => (c + 1) % WORK_COUNT)
      if (e.key === 'ArrowLeft') setCurrent((c) => (c - 1 + WORK_COUNT) % WORK_COUNT)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [view])

  function switchView(next) {
    if (next === view) return
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      flipState.current = Flip.getState(workRef.current.querySelectorAll('.cb-work-item'))
    }
    setView(next)
  }

  useGSAP(() => {
    if (!flipState.current) return
    Flip.from(flipState.current, {
      duration: 0.7, ease: 'power3.inOut', absolute: true, scale: true, stagger: 0.015,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0 }, { opacity: 1, duration: 0.5 }),
      onLeave: (els) => gsap.to(els, { opacity: 0, duration: 0.3 }),
    })
    flipState.current = null
  }, { dependencies: [view], scope: workRef })

  const title = (w) => w.title[locale] || w.title.en
  const alt = (w) => w.alt[locale] || w.alt.en
  const hero = HERO[slide]
  const cur = WORKS[current]

  return (
    <>
      <style>{`
        .cb-nav {
          position: fixed; inset: 0 0 auto 0; z-index: 60; display: grid; grid-template-columns: 1fr auto 1fr; align-items: start;
          padding: 1.1rem clamp(1.25rem, 3vw, 2.5rem); gap: 1rem; pointer-events: none;
          background: linear-gradient(to bottom, rgba(13,13,13,0.9), rgba(13,13,13,0));
        }
        .cb-nav > * { pointer-events: auto; }
        .cb-nav-brand { display: flex; gap: 1.25rem; align-items: start; text-decoration: none; color: inherit; }
        .cb-nav-brand strong { font-family: var(--font-display); font-weight: 700; font-size: 1.25rem; letter-spacing: -0.03em; }
        .cb-nav-brand strong sup { color: var(--color-accent); font-size: 0.55em; }
        .cb-nav-tag { line-height: 1.6; }
        .cb-views { display: flex; gap: 1rem; justify-content: center; }
        .cb-view { background: none; border: 0; color: var(--color-text-muted); cursor: pointer; padding: 0.2rem 0; position: relative; }
        .cb-view.on { color: var(--color-text); }
        .cb-view.on::after { content: ''; position: absolute; left: 50%; bottom: -10px; transform: translateX(-50%); border: 5px solid transparent; border-bottom-color: var(--color-accent); border-top: 0; }
        .cb-nav-right { display: flex; gap: 1.5rem; justify-content: end; align-items: center; }
        .cb-nav-right a { color: var(--color-text); text-decoration: none; }
        .cb-nav-right a:hover { color: var(--color-accent); }
        .cb-nav-right a b { color: var(--color-accent); font-weight: 500; }
        @media (max-width: 760px) {
          .cb-nav { grid-template-columns: 1fr auto; }
          .cb-views { display: none; }
          .cb-nav-tag { display: none; }
          .cb-nav-right a.hide-m { display: none; }
        }

        .cb-hero { position: relative; height: 100svh; min-height: 560px; overflow: hidden; }
        .cb-hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity 1.2s ease; filter: contrast(1.05) saturate(0.9); }
        .cb-hero-img.on { opacity: 0.55; animation: cb-kb 9s ease-out forwards; }
        @keyframes cb-kb { from { transform: scale(1); } to { transform: scale(1.08); } }
        @media (prefers-reduced-motion: reduce) { .cb-hero-img.on { animation: none; } }
        .cb-hero::after { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at center, rgba(13,13,13,0) 30%, rgba(13,13,13,0.85) 100%); }
        .cb-frame { position: absolute; inset: clamp(4.5rem, 9vh, 7rem) clamp(1.25rem, 3vw, 2.5rem) clamp(3rem, 7vh, 5rem); z-index: 2; pointer-events: none; }
        .cb-frame i { position: absolute; width: 26px; height: 26px; border: 1px solid var(--color-text); }
        .cb-frame i:nth-child(1) { top: 0; left: 0; border-right: 0; border-bottom: 0; }
        .cb-frame i:nth-child(2) { top: 0; right: 0; border-left: 0; border-bottom: 0; }
        .cb-frame i:nth-child(3) { bottom: 0; left: 0; border-right: 0; border-top: 0; }
        .cb-frame i:nth-child(4) { bottom: 0; right: 0; border-left: 0; border-top: 0; }
        .cb-hero-center { position: absolute; inset: 0; z-index: 3; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 1.5rem; padding: 0 1rem; }
        .cb-hero-mark { font-size: clamp(3rem, 11vw, 10rem); color: var(--color-accent); margin: 0; }
        .cb-hero-mark sup { font-size: 0.3em; vertical-align: top; margin-left: 0.1em; }
        .cb-hero-sub { max-width: 34ch; color: var(--color-text-secondary); line-height: 1.8; }
        .cb-hero-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: center; }
        .cb-hud { position: absolute; z-index: 3; }
        .cb-hud.bl { left: clamp(1.25rem, 3vw, 2.5rem); bottom: clamp(3.4rem, 8vh, 5.6rem); }
        .cb-hud.br { right: clamp(1.25rem, 3vw, 2.5rem); bottom: clamp(3.4rem, 8vh, 5.6rem); display: flex; gap: 1.5rem; }
        .cb-hud button { background: none; border: 0; color: var(--color-text-muted); cursor: pointer; padding: 0; }
        .cb-hud button:hover { color: var(--color-text); }
        @media (max-width: 760px) { .cb-hud.br { display: none; } }

        .cb-work { padding: clamp(3rem, 7vw, 6rem) 0 clamp(4rem, 8vw, 7rem); }
        .cb-work-head { display: flex; justify-content: space-between; align-items: end; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
        .cb-work-head h2 { font-size: clamp(2.2rem, 5vw, 4.5rem); margin: 0.5rem 0 0; }
        .cb-work-views { display: none; gap: 1rem; }
        @media (max-width: 760px) { .cb-work-views { display: flex; } }
        .cb-work-body { position: relative; }
        .cb-work-item { margin: 0; position: relative; }
        .cb-work-item img { display: block; width: 100%; height: 100%; object-fit: cover; }
        .cb-work-item figcaption { position: absolute; left: 0; bottom: 0; padding: 0.75rem; }
        /* slider */
        .cb-work-body.slider { height: min(72vh, 760px); }
        .cb-work-body.slider .cb-work-item { display: none; position: absolute; left: 50%; top: 0; height: 100%; aspect-ratio: 4 / 5; transform: translateX(-50%); }
        .cb-work-body.slider .cb-work-item.cur { display: block; }
        .cb-work-body.slider .cb-work-item figcaption { display: none; }
        .cb-slider-ui { display: none; justify-content: space-between; align-items: center; margin-top: 1rem; gap: 1rem; }
        .cb-work-body.slider + .cb-slider-ui { display: flex; }
        .cb-slider-btns { display: flex; gap: 0.5rem; }
        /* grid */
        .cb-work-body.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
        .cb-work-body.grid .cb-work-item { aspect-ratio: 4 / 5; }
        @media (max-width: 760px) { .cb-work-body.grid { grid-template-columns: repeat(2, 1fr); gap: 0.6rem; } }
        /* list */
        .cb-work-body.list { border-top: 1px solid var(--color-border); }
        .cb-work-body.list .cb-work-item { display: grid; grid-template-columns: 3rem 1fr 1fr auto 56px; align-items: center; gap: 1rem; padding: 0.75rem 0; border-bottom: 1px solid var(--color-border); }
        .cb-work-body.list .cb-work-item img { width: 56px; height: 70px; opacity: 0.5; transition: opacity 0.2s; }
        .cb-work-body.list .cb-work-item:hover img { opacity: 1; }
        .cb-work-body.list .cb-work-item figcaption { position: static; display: contents; padding: 0; }
        .cb-work-body.list .cb-work-item:hover .cb-list-title { color: var(--color-accent); }
        .cb-list-title { font-family: var(--font-display); font-size: 1.1rem; font-weight: 500; }
        .cb-list-head { display: grid; grid-template-columns: 3rem 1fr 1fr auto 56px; gap: 1rem; padding: 0.5rem 0; }
        .cb-work-body.list .cb-work-item:not(:hover) .cb-list-nr { color: var(--color-text-muted); }
        @media (max-width: 760px) { .cb-work-body.list .cb-work-item, .cb-list-head { grid-template-columns: 2.5rem 1fr auto 44px; } .cb-list-game { display: none; } }
      `}</style>

      <div className={`cb-grain ${grain ? '' : 'off'}`} aria-hidden="true" />

      <nav className="cb-nav" aria-label="Concept B">
        <a href={`/${locale}/concept/b`} className="cb-nav-brand">
          <strong>75<sup>®</sup></strong>
          <span className="cb-label cb-nav-tag">{t('tagline1')}<br />{t('tagline2')}</span>
        </a>
        <div className="cb-views cb-mono" role="group" aria-label="View">
          {VIEWS.map((v) => (
            <button key={v} type="button" className={`cb-view ${view === v ? 'on' : ''}`} onClick={() => switchView(v)} aria-pressed={view === v}>
              {t(`view${v[0].toUpperCase()}${v.slice(1)}`)}
            </button>
          ))}
        </div>
        <div className="cb-nav-right cb-mono">
          <a href="#work">{t('navWork')}<b>({WORK_COUNT})</b></a>
          <a href="#about" className="hide-m">{t('navAbout')}</a>
          <a href="#order" className="hide-m">{t('navContact')}</a>
          <LanguageSwitcher />
        </div>
      </nav>

      <header className="cb-hero" id="hero">
        {HERO.map((w, i) => (
          <img key={w.id} src={w.wide} alt={i === slide ? alt(w) : ''} className={`cb-hero-img ${i === slide ? 'on' : ''}`} fetchPriority={i === 0 ? 'high' : 'low'} />
        ))}
        <div className="cb-frame" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="cb-hero-center">
          <h1 className="cb-title cb-hero-mark">75Drawss<sup>®</sup></h1>
          <p className="cb-hero-sub cb-mono">{t('heroSub')}</p>
          <div className="cb-hero-actions">
            <a href="#work" className="cb-btn solid">{t('enter')}</a>
            <a href="#order" className="cb-btn">[ {t('order')} ]</a>
          </div>
        </div>
        <div className="cb-hud bl cb-label"><b>{hero.nr}/{WORK_COUNT}</b> — {title(hero)} — {hero.category}</div>
        <div className="cb-hud br cb-label">
          <button type="button" onClick={() => setGrain((g) => !g)}>Grain:[{grain ? 'on' : 'off'}]</button>
          <span>{t('madeIn')}</span>
        </div>
      </header>

      <section className="cb-work" id="work">
        <div className="cb-wrap">
          <div className="cb-work-head">
            <div>
              <p className="cb-label">{t('workLabel')} <b>({WORK_COUNT})</b></p>
              <h2 className="cb-title">{t('workLabel')} / {t(`view${view[0].toUpperCase()}${view.slice(1)}`)}</h2>
            </div>
            <div className="cb-work-views cb-mono">
              {VIEWS.map((v) => (
                <button key={v} type="button" className={`cb-view ${view === v ? 'on' : ''}`} onClick={() => switchView(v)}>
                  {t(`view${v[0].toUpperCase()}${v.slice(1)}`)}
                </button>
              ))}
            </div>
          </div>

          {view === 'list' && (
            <div className="cb-list-head cb-label">
              <span>{t('colNr')}</span><span>{t('colTitle')}</span><span className="cb-list-game">{t('colGame')}</span><span>{t('colCat')}</span><span />
            </div>
          )}

          <div className={`cb-work-body ${view}`} ref={workRef}>
            {WORKS.map((w, i) => (
              <figure key={w.id} className={`cb-work-item ${i === current ? 'cur' : ''}`} data-flip-id={w.id}>
                <img src={view === 'slider' ? w.card : w.card} alt={alt(w)} loading={i < 6 ? 'eager' : 'lazy'} />
                <figcaption>
                  <span className="cb-label cb-list-nr"><b>{w.nr}</b></span>
                  <span className="cb-list-title">{title(w)}</span>
                  <span className="cb-label cb-list-game">{w.game}</span>
                  <span className="cb-label">{w.category}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="cb-slider-ui">
            <div className="cb-label"><b>{cur.nr}/{WORK_COUNT}</b> — {title(cur)} — {cur.game} — {cur.category}</div>
            <div className="cb-slider-btns">
              <button type="button" className="cb-btn" onClick={() => setCurrent((c) => (c - 1 + WORK_COUNT) % WORK_COUNT)} aria-label={t('prev')}>←</button>
              <button type="button" className="cb-btn" onClick={() => setCurrent((c) => (c + 1) % WORK_COUNT)} aria-label={t('next')}>→</button>
              <Link href="/portfolio" className="cb-btn">Portfolio ↗</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
