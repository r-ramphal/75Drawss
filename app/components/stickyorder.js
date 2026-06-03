'use client'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

/*
  Mobile-only sticky "order now" bar. Slides in once the visitor has scrolled
  past the hero, and hides again while the order form itself is on screen (so it
  never overlaps or duplicates the form's own submit button).
*/
export default function StickyOrder() {
  const t = useTranslations('nav')
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero')
    const order = document.getElementById('order')
    let pastHero = false
    let orderInView = false
    const update = () => setShow(pastHero && !orderInView)

    // Hero is "passed" once its bottom 40% has scrolled out of view.
    const heroObs = new IntersectionObserver(([e]) => {
      pastHero = !e.isIntersecting
      update()
    }, { rootMargin: '-40% 0px 0px 0px' })

    const orderObs = new IntersectionObserver(([e]) => {
      orderInView = e.isIntersecting
      update()
    })

    if (hero) heroObs.observe(hero)
    if (order) orderObs.observe(order)
    return () => { heroObs.disconnect(); orderObs.disconnect() }
  }, [])

  return (
    <>
      <style>{`
        .sticky-order {
          display: none;
          position: fixed; left: 1rem; right: 1rem; z-index: 70;
          bottom: calc(1rem + env(safe-area-inset-bottom));
          align-items: center; justify-content: center; gap: 0.5rem;
          background: var(--color-accent); color: var(--color-text);
          font-family: var(--font-ui); font-size: 0.95rem; font-weight: 700;
          letter-spacing: 0.01em;
          padding: 1rem; border-radius: var(--radius);
          border: 1px solid var(--color-accent-hover);
          text-decoration: none;
          box-shadow: 0 8px 24px rgba(10,10,10,0.18);
          transform: translateY(160%); opacity: 0;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
        }
        .sticky-order.show { transform: translateY(0); opacity: 1; }
        @media (max-width: 640px) { .sticky-order { display: flex; } }
      `}</style>
      <a
        href="#order"
        className={`sticky-order ${show ? 'show' : ''}`}
        aria-hidden={!show}
        tabIndex={show ? 0 : -1}
      >
        {t('orderNow')}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
        </svg>
      </a>
    </>
  )
}
