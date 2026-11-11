'use client'
import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRevealOnScroll } from '@/app/lib/useReveal'

/*
  Four oversized lines, one per product type. Hovering (or tapping) a line
  blurs the others and unfolds that product's description + tags — the
  Onda-style services list.
*/
export default function Services() {
  const t = useTranslations('home')
  const tp = useTranslations('products')
  const items = tp.raw('items')
  const tags = t.raw('serviceTags')
  const [active, setActive] = useState(null)
  const root = useRef(null)
  useRevealOnScroll(root, '.site-svc-row', { y: 30, stagger: 0.08 })

  return (
    <>
      <style>{`
        .site-services { padding: 0 0 var(--section-y); }
        .site-svc-head { display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; margin-bottom: 1rem; }
        .site-svc-hint { font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--color-text-muted); }
        .site-svc-list { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--color-border); }
        .site-svc-row { border-bottom: 1px solid var(--color-border); }
        .site-svc-btn {
          width: 100%; display: grid; grid-template-columns: 4rem 1fr auto; align-items: baseline; gap: 1rem;
          padding: clamp(0.7rem, 1.6vw, 1.1rem) 0; background: none; border: 0; color: inherit; cursor: pointer; text-align: left;
          font-family: inherit;
        }
        .site-svc-nr { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.2em; color: var(--color-text-muted); }
        .site-svc-name { font-size: clamp(2.2rem, 7.5vw, 6.8rem); transition: filter 0.35s, color 0.35s, transform 0.35s; }
        .site-svc-plus { font-size: 1.4rem; color: var(--color-text-muted); transition: transform 0.3s; }
        .site-svc-list.has-active .site-svc-row:not(.active) .site-svc-name { filter: blur(6px); opacity: 0.55; }
        .site-svc-row.active .site-svc-name { color: var(--color-accent-text); transform: translateX(0.5vw); }
        .site-svc-row.active .site-svc-plus { transform: rotate(45deg); }
        .site-svc-panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.45s cubic-bezier(.2,.8,.2,1); }
        .site-svc-row.active .site-svc-panel { grid-template-rows: 1fr; }
        .site-svc-panel > div { overflow: hidden; }
        .site-svc-body { display: grid; grid-template-columns: 4rem 1fr 1fr; gap: 1rem; padding: 0 0 1.75rem; }
        .site-svc-body p { margin: 0; color: var(--color-text-secondary); line-height: 1.65; max-width: 460px; }
        .site-svc-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; align-content: start; justify-content: flex-end; }
        .site-svc-tags span { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; padding: 0.4rem 0.7rem; border: 1px solid var(--color-border-strong); border-radius: 100px; }
        @media (max-width: 720px) {
          .site-svc-btn { grid-template-columns: 2.5rem 1fr auto; }
          .site-svc-body { grid-template-columns: 1fr; padding-left: 2.5rem; }
          .site-svc-tags { justify-content: flex-start; }
          .site-svc-list.has-active .site-svc-row:not(.active) .site-svc-name { filter: none; opacity: 0.4; }
        }
      `}</style>
      <section className="site-services" ref={root} id="products">
        <div className="site-wrap">
          <div className="site-svc-head">
            <p className="site-eyebrow">{t('servicesEyebrow')}</p>
            <span className="site-svc-hint">{t('servicesHint')}</span>
          </div>
          <ul className={`site-svc-list ${active !== null ? 'has-active' : ''}`} onMouseLeave={() => setActive(null)}>
            {items.map((item, i) => (
              <li key={i} className={`site-svc-row reveal-item ${active === i ? 'active' : ''}`} onMouseEnter={() => setActive(i)}>
                <button type="button" className="site-svc-btn" aria-expanded={active === i} onClick={() => setActive(active === i ? null : i)}>
                  <span className="site-svc-nr">0{i + 1}</span>
                  <span className="site-display site-svc-name">{item.title}</span>
                  <span className="site-svc-plus" aria-hidden="true">+</span>
                </button>
                <div className="site-svc-panel">
                  <div>
                    <div className="site-svc-body">
                      <span />
                      <p>{item.desc}</p>
                      <div className="site-svc-tags">{(tags[i] || []).map((tag) => <span key={tag}>{tag}</span>)}</div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
