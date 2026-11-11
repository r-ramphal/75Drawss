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
        .site-proc-head { padding-top: var(--section-y); padding-bottom: 1.5rem; }
        .site-proc-head h2 { font-size: clamp(2.4rem, 6vw, 5.5rem); margin: 0.75rem 0 0; }
        .site-proc-track { display: flex; }
        .site-proc-step {
          flex: 0 0 min(80vw, 640px); padding: 1.75rem clamp(1.25rem, 4vw, 3.5rem) var(--section-y);
          border-left: 1px solid var(--color-border); min-height: 40vh; display: flex; flex-direction: column; justify-content: space-between;
        }
        .site-proc-step:last-child { border-right: 1px solid var(--color-border); }
        .site-proc-nr { font-size: clamp(5rem, 12vw, 11rem); color: transparent; -webkit-text-stroke: 1px var(--color-numeral); line-height: 0.85; }
        .site-proc-step h3 { font-family: var(--font-display); font-size: 1.5rem; font-weight: 700; letter-spacing: -0.02em; margin: 1.25rem 0 0.6rem; }
        .site-proc-step p { margin: 0; color: var(--color-text-secondary); line-height: 1.7; max-width: 420px; }
        @media (max-width: 999px) {
          /* swipeable cards; the next card peeks in to show there is more */
          .site-proc-track {
            overflow-x: auto; scroll-snap-type: x mandatory; gap: 0.75rem; scrollbar-width: none;
            margin-inline: calc(-1 * clamp(1.25rem, 4vw, 3.5rem)); padding-inline: clamp(1.25rem, 4vw, 3.5rem);
            scroll-padding-inline: clamp(1.25rem, 4vw, 3.5rem); padding-bottom: var(--section-y);
          }
          .site-proc-track::-webkit-scrollbar { display: none; }
          .site-proc-step, .site-proc-step:last-child {
            flex: 0 0 min(82%, 420px); scroll-snap-align: start; min-height: 0; gap: 1.25rem;
            border: 1px solid var(--color-border); border-radius: var(--radius); background: var(--color-surface);
            padding: 1.1rem 1.1rem 1.35rem;
          }
          .site-proc-nr { font-size: 4rem; }
          .site-proc-step h3 { margin-top: 0; font-size: 1.25rem; }
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
