'use client'
/*
  Magnetic — wraps any element (a link, button, CTA) and gently pulls it toward
  the cursor, then springs back on leave. Framework-agnostic: pass the actual
  <a>/<Link>/<button> as children so routing stays the caller's concern.

  Uses gsap.quickTo for cheap, high-frequency pointer updates. Disabled on touch
  (pointer: coarse) and when the visitor prefers reduced motion — there it just
  renders a static wrapper, so the link keeps working everywhere.
*/
import { useRef } from 'react'
import { gsap, useGSAP } from '@/app/lib/gsap'

export default function Magnetic({ children, strength = 0.35, className }) {
  const ref = useRef(null)

  useGSAP((context, contextSafe) => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    const el = ref.current
    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' })

    const onMove = contextSafe((e) => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - (r.left + r.width / 2)) * strength)
      yTo((e.clientY - (r.top + r.height / 2)) * strength)
    })
    const onLeave = contextSafe(() => { xTo(0); yTo(0) })

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, { scope: ref })

  return (
    <span ref={ref} className={className} style={{ display: 'inline-block', willChange: 'transform' }}>
      {children}
    </span>
  )
}
