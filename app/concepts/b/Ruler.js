'use client'
import { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '@/app/lib/gsap'

/*
  Fixed ruler along the bottom edge: tick marks plus a red marker that moves
  with the page scroll progress (the Remy Shoots signature, without the
  loading screen).
*/
export default function Ruler() {
  const root = useRef(null)

  useGSAP(() => {
    const marker = root.current.querySelector('.cb-ruler-marker')
    const label = root.current.querySelector('.cb-ruler-pct')
    const st = ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: (self) => {
        const p = self.progress
        gsap.set(marker, { left: `${p * 100}%` })
        label.textContent = `${Math.round(p * 100).toString().padStart(2, '0')}%`
      },
    })
    return () => st.kill()
  }, { scope: root })

  return (
    <>
      <style>{`
        .cb-ruler {
          position: fixed; left: 0; right: 0; bottom: 0; height: 30px; z-index: 65; pointer-events: none;
          background: linear-gradient(to top, #0D0D0D 60%, rgba(13,13,13,0));
        }
        .cb-ruler-ticks {
          position: absolute; left: 0; right: 0; bottom: 0; height: 14px;
          background:
            repeating-linear-gradient(to right, var(--color-border-strong) 0 1px, transparent 1px 12px) bottom / 100% 6px no-repeat,
            repeating-linear-gradient(to right, var(--color-text-muted) 0 1px, transparent 1px 60px) bottom / 100% 12px no-repeat;
        }
        .cb-ruler-marker { position: absolute; bottom: 0; width: 0; height: 14px; }
        .cb-ruler-marker::before {
          content: ''; position: absolute; left: -6px; bottom: 0; width: 0; height: 0;
          border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 10px solid var(--color-accent);
        }
        .cb-ruler-pct {
          position: absolute; bottom: 14px; left: 0; transform: translateX(-50%);
          font-family: var(--font-mono); font-size: 0.62rem; color: var(--color-accent); letter-spacing: 0.1em;
        }
      `}</style>
      <div className="cb-ruler" ref={root} aria-hidden="true">
        <div className="cb-ruler-ticks" />
        <div className="cb-ruler-marker"><span className="cb-ruler-pct">00%</span></div>
      </div>
    </>
  )
}
