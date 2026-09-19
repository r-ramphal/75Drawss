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
  const t = useTranslations('concept.a')
  const tp = useTranslations('products')
  const items = tp.raw('items')
  const tags = t.raw('serviceTags')
  const [active, setActive] = useState(null)
  const root = useRef(null)
  useRevealOnScroll(root, '.ca-svc-row', { y: 30, stagger: 0.08 })

  return (
    <>
      <style>{`
        .ca-services { padding: 0 0 clamp(4rem, 10vw, 8rem); }
        .ca-svc-head { display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; margin-bottom: 1.5rem; }
        .ca-svc-hint { font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--color-text-muted); }
        .ca-svc-list { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--color-border); }
        .ca-svc-row { border-bottom: 1px solid var(--color-border); }
        .ca-svc-btn {
          width: 100%; display: grid; grid-template-columns: 4rem 1fr auto; align-items: baseline; gap: 1rem;
          padding: clamp(1rem, 2.4vw, 1.6rem) 0; background: none; border: 0; color: inherit; cursor: pointer; text-align: left;
          font-family: inherit;
        }
        .ca-svc-nr { font-size: 0.72rem; letter-spacing: 0.2em; color: var(--color-text-muted); }
        .ca-svc-name { font-size: clamp(2.2rem, 7.5vw, 6.8rem); transition: filter 0.35s, color 0.35s, transform 0.35s; }
        .ca-svc-plus { font-size: 1.4rem; color: var(--color-text-muted); transition: transform 0.3s; }
        .ca-svc-list.has-active .ca-svc-row:not(.active) .ca-svc-name { filter: blur(6px); opacity: 0.55; }
        .ca-svc-row.active .ca-svc-name { color: var(--color-accent); transform: translateX(0.5vw); }
        .ca-svc-row.active .ca-svc-plus { transform: rotate(45deg); }
        .ca-svc-panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.45s cubic-bezier(.2,.8,.2,1); }
        .ca-svc-row.active .ca-svc-panel { grid-template-rows: 1fr; }
        .ca-svc-panel > div { overflow: hidden; }
        .ca-svc-body { display: grid; grid-template-columns: 4rem 1fr 1fr; gap: 1rem; padding: 0 0 1.75rem; }
        .ca-svc-body p { margin: 0; color: var(--color-text-secondary); line-height: 1.65; max-width: 460px; }
        .ca-svc-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; align-content: start; justify-content: flex-end; }
        .ca-svc-tags span { font-size: 0.68rem; letter-spacing: 0.14em; text-transform: uppercase; padding: 0.4rem 0.7rem; border: 1px solid var(--color-border-strong); }
        @media (max-width: 720px) {
          .ca-svc-btn { grid-template-columns: 2.5rem 1fr auto; }
          .ca-svc-body { grid-template-columns: 1fr; padding-left: 2.5rem; }
          .ca-svc-tags { justify-content: flex-start; }
          .ca-svc-list.has-active .ca-svc-row:not(.active) .ca-svc-name { filter: none; opacity: 0.4; }
        }
      `}</style>
      <section className="ca-services" ref={root} id="products">
        <div className="ca-wrap">
          <div className="ca-svc-head">
            <p className="ca-eyebrow">{t('servicesEyebrow')}</p>
            <span className="ca-svc-hint">{t('servicesHint')}</span>
          </div>
          <ul className={`ca-svc-list ${active !== null ? 'has-active' : ''}`} onMouseLeave={() => setActive(null)}>
            {items.map((item, i) => (
              <li key={i} className={`ca-svc-row reveal-item ${active === i ? 'active' : ''}`} onMouseEnter={() => setActive(i)}>
                <button type="button" className="ca-svc-btn" aria-expanded={active === i} onClick={() => setActive(active === i ? null : i)}>
                  <span className="ca-svc-nr">0{i + 1}</span>
                  <span className="ca-display ca-svc-name">{item.title}</span>
                  <span className="ca-svc-plus" aria-hidden="true">+</span>
                </button>
                <div className="ca-svc-panel">
                  <div>
                    <div className="ca-svc-body">
                      <span />
                      <p>{item.desc}</p>
                      <div className="ca-svc-tags">{(tags[i] || []).map((tag) => <span key={tag}>{tag}</span>)}</div>
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
