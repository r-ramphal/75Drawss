'use client'
/*
  Homepage portfolio PREVIEW — a free, swipeable strip with a gentle auto-scroll.
  No scroll-hijack: vertical page scrolling is never blocked. The strip drifts
  slowly (ping-pong), pauses on hover / touch / drag, pauses when off-screen,
  and respects reduced-motion. The full experience lives at /portfolio.
  Data comes from app/data/binders.js (single source of truth).
*/
import { useEffect, useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { BINDERS } from '@/app/data/binders'

export default function Portfolio() {
  const t = useTranslations('portfolio')
  const locale = useLocale()
  const stripRef = useRef(null)

  useEffect(() => {
    const strip = stripRef.current
    if (!strip) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const SPEED = 0.85 // px per frame — gentle ambient drift
    let paused = false
    let visible = true
    let dir = 1
    let down = false
    let startX = 0
    let startScroll = 0

    const pause = () => { paused = true }
    const resume = () => { paused = false }
    const onDown = (e) => {
      if (e.pointerType === 'touch') return // touch scrolls natively
      down = true
      startX = e.clientX
      startScroll = strip.scrollLeft
      strip.classList.add('dragging')
      try { strip.setPointerCapture(e.pointerId) } catch {}
    }
    const onMove = (e) => { if (down) strip.scrollLeft = startScroll - (e.clientX - startX) }
    const onUp = () => { down = false; strip.classList.remove('dragging') }

    strip.addEventListener('pointerenter', pause)
    strip.addEventListener('pointerleave', resume)
    strip.addEventListener('pointerdown', onDown)
    strip.addEventListener('pointermove', onMove)
    strip.addEventListener('pointerup', onUp)
    window.addEventListener('pointerup', onUp)

    const io = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting },
      { threshold: 0 },
    )
    io.observe(strip)

    let raf
    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (paused || down || !visible) return
      const max = strip.scrollWidth - strip.clientWidth
      if (max <= 1) return
      strip.scrollLeft += SPEED * dir
      if (strip.scrollLeft >= max - 0.5) dir = -1
      else if (strip.scrollLeft <= 0.5) dir = 1
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      strip.removeEventListener('pointerenter', pause)
      strip.removeEventListener('pointerleave', resume)
      strip.removeEventListener('pointerdown', onDown)
      strip.removeEventListener('pointermove', onMove)
      strip.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  return (
    <>
      <style>{`
        .pf { background: var(--color-bg); border-top: 2px solid var(--color-border); padding: 5.5rem 0 6rem; overflow: hidden; }
        .pf-head {
          max-width: 1200px; margin: 0 auto 2.5rem; padding: 0 clamp(1.5rem, 5vw, 4rem);
          display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: end;
        }
        .pf-eyebrow {
          font-size: 0.68rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--color-text-muted); margin-bottom: 1rem; font-family: var(--font-ui);
        }
        .pf-title {
          font-family: var(--font-display); font-weight: 300; font-size: clamp(2rem, 4.5vw, 3.5rem);
          letter-spacing: -0.025em; line-height: 1.05; color: var(--color-text);
        }
        .pf-head-right { display: flex; flex-direction: column; align-items: flex-start; gap: 1.3rem; }
        .pf-intro {
          font-size: 0.95rem; color: var(--color-text-secondary); line-height: 1.75;
          font-weight: 400; max-width: 420px; font-family: var(--font-ui);
        }
        .pf-cta {
          display: inline-block; background: var(--color-accent); color: var(--color-text);
          font-size: 0.9rem; font-weight: 600; padding: 0.95rem 2.1rem; border-radius: var(--radius);
          text-decoration: none; border: 1px solid var(--color-accent); font-family: var(--font-ui);
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .pf-cta:hover {
          background: var(--color-accent-hover); border-color: var(--color-accent-hover);
          transform: translateY(-1px); box-shadow: 0 8px 20px rgba(10,10,10,0.12);
        }
        .pf-strip {
          display: flex; gap: 1.25rem; overflow-x: auto; overflow-y: hidden;
          padding: 0 clamp(1.5rem, 5vw, 4rem) 1rem;
          scrollbar-width: none; -webkit-overflow-scrolling: touch; cursor: grab;
        }
        .pf-strip::-webkit-scrollbar { display: none; }
        .pf-strip.dragging { cursor: grabbing; }
        .pf-card {
          position: relative; flex: 0 0 auto;
          height: clamp(300px, 50vh, 500px); aspect-ratio: var(--ar, 0.78);
          border-radius: 12px; overflow: hidden; border: 1px solid var(--color-border-strong);
          background: var(--color-surface); box-shadow: var(--shadow-hard-lg);
        }
        .pf-card img { object-fit: cover; user-select: none; }
        .pf-cap {
          position: absolute; left: 0; right: 0; bottom: 0; padding: 2rem 1.1rem 0.95rem;
          color: #fff; font-family: var(--font-ui); font-size: 0.8rem; font-weight: 500;
          background: linear-gradient(to top, rgba(10,10,10,0.8), rgba(10,10,10,0));
          opacity: 0; transition: opacity 0.3s ease; pointer-events: none;
        }
        .pf-card:hover .pf-cap { opacity: 1; }
        @media (max-width: 768px) {
          .pf-head { grid-template-columns: 1fr; gap: 1.1rem; }
          .pf-card { height: clamp(260px, 60vw, 420px); }
        }
        @media (prefers-reduced-motion: reduce) { .pf-cap { transition: none; } }
      `}</style>

      <section id="portfolio" className="pf">
        <div className="pf-head">
          <div>
            <p className="pf-eyebrow">{t('eyebrow')}</p>
            <h2 className="pf-title">{t('titleLine1')}<br />{t('titleLine2')}</h2>
          </div>
          <div className="pf-head-right">
            <p className="pf-intro">{t('intro')}</p>
            <Link href="/portfolio" className="pf-cta">{t('viewAll')} →</Link>
          </div>
        </div>

        <div className="pf-strip" ref={stripRef} role="list" aria-label={t('eyebrow')} tabIndex={0}>
          {BINDERS.map((b) => (
            <figure className="pf-card" key={b.id} role="listitem" style={{ '--ar': b.img.width / b.img.height }}>
              <Image
                src={b.img}
                alt={b.alt[locale] || b.alt.en}
                fill
                placeholder="blur"
                sizes="(max-width: 768px) 70vw, 360px"
                style={{ objectFit: 'cover' }}
                draggable={false}
              />
              <figcaption className="pf-cap" aria-hidden="true">{b.title[locale] || b.title.en}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  )
}
