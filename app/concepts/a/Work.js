'use client'
import { useRef, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { gsap, useGSAP } from '@/app/lib/gsap'
import { useRevealOnScroll } from '@/app/lib/useReveal'
import { WORKS, WORK_COUNT } from '../shared/work'

/*
  Numbered index of all binders. On fine pointers a floating image follows the
  cursor and swaps to the hovered row; on touch each row shows a thumbnail.
*/
export default function Work() {
  const t = useTranslations('concept.a')
  const locale = useLocale()
  const root = useRef(null)
  const floatRef = useRef(null)
  const [hovered, setHovered] = useState(null)
  useRevealOnScroll(root, '.ca-work-row', { y: 16, stagger: 0.05 })

  useGSAP((ctx, contextSafe) => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const el = floatRef.current
    gsap.set(el, { x: -600, y: -600 })
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' })
    const move = contextSafe((e) => { xTo(e.clientX); yTo(e.clientY) })
    const list = root.current
    list.addEventListener('pointermove', move)
    return () => list.removeEventListener('pointermove', move)
  }, { scope: root })

  const current = hovered !== null ? WORKS[hovered] : null

  return (
    <>
      <style>{`
        .ca-work { padding: clamp(4rem, 10vw, 8rem) 0; position: relative; }
        .ca-work-head { display: flex; justify-content: space-between; align-items: end; gap: 1rem; margin-bottom: 2rem; }
        .ca-work-head h2 { font-size: clamp(3rem, 9vw, 8rem); margin: 0.75rem 0 0; }
        .ca-work-head h2 sup { font-size: 0.28em; color: var(--color-accent); letter-spacing: 0; vertical-align: top; margin-left: 0.2em; }
        .ca-work-hint { font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--color-text-muted); text-align: right; }
        .ca-work-list { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--color-border); }
        .ca-work-row { border-bottom: 1px solid var(--color-border); }
        .ca-work-link {
          display: grid; grid-template-columns: 3.5rem 1fr 1fr auto; align-items: center; gap: 1rem;
          padding: 1.1rem 0; color: inherit; text-decoration: none; transition: color 0.2s, padding-left 0.3s;
        }
        .ca-work-row:hover .ca-work-link { color: var(--color-accent); padding-left: 0.75rem; }
        .ca-work-nr { font-size: 0.72rem; letter-spacing: 0.2em; color: var(--color-text-muted); }
        .ca-work-title { font-size: clamp(1.1rem, 2.4vw, 1.8rem); font-weight: 600; letter-spacing: -0.02em; }
        .ca-work-meta { font-size: 0.72rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--color-text-muted); }
        .ca-work-thumb { display: none; width: 52px; height: 65px; object-fit: cover; }
        .ca-work-float {
          position: fixed; left: 0; top: 0; width: 240px; aspect-ratio: 4 / 5; pointer-events: none; z-index: 40;
          transform: translate(-50%, -50%); opacity: 0; transition: opacity 0.25s; overflow: hidden;
        }
        .ca-work-float.on { opacity: 1; }
        .ca-work-float img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .ca-work-foot { margin-top: 2rem; display: flex; justify-content: flex-end; }
        @media (pointer: coarse), (max-width: 900px) {
          .ca-work-float { display: none; }
          .ca-work-link { grid-template-columns: 2.5rem 1fr auto 52px; }
          .ca-work-meta.game { display: none; }
          .ca-work-thumb { display: block; }
        }
      `}</style>
      <section className="ca-work" ref={root} id="work">
        <div className="ca-wrap">
          <div className="ca-work-head">
            <div>
              <p className="ca-eyebrow">{t('workEyebrow')}</p>
              <h2 className="ca-display">{t('workTitle')}<sup>({WORK_COUNT})</sup></h2>
            </div>
            <span className="ca-work-hint">{t('workHint')}</span>
          </div>
          <ul className="ca-work-list" onMouseLeave={() => setHovered(null)}>
            {WORKS.map((w, i) => (
              <li key={w.id} className="ca-work-row" onMouseEnter={() => setHovered(i)}>
                <Link href="/portfolio" className="ca-work-link">
                  <span className="ca-work-nr">{w.nr}</span>
                  <span className="ca-work-title">{w.title[locale] || w.title.en}</span>
                  <span className="ca-work-meta game">{w.game}</span>
                  <span className="ca-work-meta">{w.category}</span>
                  <img className="ca-work-thumb" src={w.card} alt="" loading="lazy" width={52} height={65} />
                </Link>
              </li>
            ))}
          </ul>
          <div className="ca-work-foot">
            <Link href="/portfolio" className="ca-btn">{t('workAll')}</Link>
          </div>
        </div>
        <div ref={floatRef} className={`ca-work-float ${current ? 'on' : ''}`} aria-hidden="true">
          {current && <img src={current.card} alt="" />}
        </div>
      </section>
    </>
  )
}
