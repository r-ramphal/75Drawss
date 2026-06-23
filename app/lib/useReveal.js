'use client'
import { gsap, useGSAP, ScrollTrigger } from '@/app/lib/gsap'

/*
  Staggered scroll-reveal for elements inside `scopeRef` matching `selector`.
  Pair it with the global `.reveal-item` baseline (opacity:0) in globals.css:
  this fades + lifts the matched elements as they enter the viewport, once.

  Reduced-motion visitors skip the whole effect (the matchMedia branch never
  runs, and the CSS override keeps them visible); no-JS visitors are covered by
  the <noscript> fallback in the layout. `clearProps: 'transform'` is important
  so any CSS hover-lift on the targets keeps working after the reveal.
*/
export function useRevealOnScroll(scopeRef, selector = '.reveal-item', opts = {}) {
  const { y = 20, start = 'top 85%', stagger = 0.12, duration = 0.7 } = opts

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const els = gsap.utils.toArray(scopeRef.current.querySelectorAll(selector))
      if (!els.length) return
      gsap.set(els, { y })
      const triggers = ScrollTrigger.batch(els, {
        start,
        once: true,
        onEnter: (batch) => gsap.to(batch, {
          autoAlpha: 1, y: 0, duration, ease: 'power3.out',
          stagger, overwrite: true, clearProps: 'transform',
        }),
      })
      return () => triggers.forEach((trigger) => trigger.kill())
    })
  }, { scope: scopeRef })
}
