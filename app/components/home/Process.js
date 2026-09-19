'use client'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { gsap, useGSAP } from '@/app/lib/gsap'

/*
  The four steps as a horizontally pinned strip on wide screens (scroll down,
  panels slide left), a plain vertical stack on small screens / reduced motion.
*/
export default function Process() {
  const t = useTranslations('home')
  const th = useTranslations('howItWorks')
  const steps = th.raw('steps')
  const root = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1000px) and (prefers-reduced-motion: no-preference)', () => {
      const track = root.current.querySelector('.site-proc-track')
      const amount = () => track.scrollWidth - root.current.clientWidth
      gsap.to(track, {
        x: () => -amount(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current, pin: true, scrub: 0.6, start: 'top top',
          end: () => `+=${amount()}`, invalidateOnRefresh: true, anticipatePin: 1,
        },
      })
    })
  }, { scope: root })

  return (
    <>
      <style>{`
        .site-proc { overflow: hidden; border-top: 1px solid var(--color-border); }
        .site-proc-head { padding-top: clamp(3rem, 6vw, 5rem); padding-bottom: 2rem; }
        .site-proc-head h2 { font-size: clamp(2.4rem, 6vw, 5.5rem); margin: 0.75rem 0 0; }
        .site-proc-track { display: flex; }
        .site-proc-step {
          flex: 0 0 min(80vw, 640px); padding: 2rem clamp(1.25rem, 4vw, 3.5rem) clamp(4rem, 8vw, 7rem);
          border-left: 1px solid var(--color-border); min-height: 52vh; display: flex; flex-direction: column; justify-content: space-between;
        }
        .site-proc-step:last-child { border-right: 1px solid var(--color-border); }
        .site-proc-nr { font-size: clamp(5rem, 12vw, 11rem); color: transparent; -webkit-text-stroke: 1px var(--color-numeral); line-height: 0.85; }
        .site-proc-step h3 { font-family: var(--font-display); font-size: 1.5rem; font-weight: 700; letter-spacing: -0.02em; margin: 2rem 0 0.75rem; }
        .site-proc-step p { margin: 0; color: var(--color-text-secondary); line-height: 1.7; max-width: 420px; }
        @media (max-width: 999px) {
          .site-proc-track { flex-direction: column; }
          .site-proc-step { flex-basis: auto; min-height: 0; border-left: 0; border-top: 1px solid var(--color-border); padding: 2rem 0 3rem; }
          .site-proc-step:last-child { border-right: 0; }
          .site-proc-nr { font-size: 4.5rem; }
        }
      `}</style>
      <section className="site-proc" ref={root} id="process">
        <div className="site-wrap site-proc-head">
          <p className="site-eyebrow">{t('processEyebrow')}</p>
          <h2 className="site-display">{t('processTitle')}</h2>
        </div>
        <div className="site-wrap">
          <div className="site-proc-track">
            {steps.map((s, i) => (
              <article className="site-proc-step" key={i}>
                <div className="site-display site-proc-nr">0{i + 1}</div>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
