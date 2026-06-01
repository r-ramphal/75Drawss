/*
  Product range showcase. Each product uses a clean SVG illustration as a
  placeholder. When you have real photos, drop the file in /public and add an
  `images` array mapping (see below).
*/
import { useTranslations } from 'next-intl'

const BinderArt = () => (
  <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="76" height="76">
    <rect x="30" y="18" width="62" height="84" rx="3" />
    <path d="M30 18 L30 102" strokeWidth="3" />
    <circle cx="30" cy="38" r="5" />
    <circle cx="30" cy="60" r="5" />
    <circle cx="30" cy="82" r="5" />
    <path d="M44 34 h34 M44 46 h34 M44 58 h22" strokeWidth="1.5" opacity="0.5" />
  </svg>
)

const DeckBoxArt = () => (
  <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="76" height="76">
    <path d="M28 46 L60 30 L92 46 L60 62 Z" />
    <path d="M28 46 V82 L60 98 V62" />
    <path d="M92 46 V82 L60 98" />
    <path d="M60 30 V20 M60 20 L74 24" strokeWidth="1.5" opacity="0.6" />
  </svg>
)

const DisplayCaseArt = () => (
  <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="76" height="76">
    <rect x="34" y="22" width="52" height="72" rx="3" />
    <rect x="44" y="34" width="32" height="44" rx="2" strokeWidth="1.5" opacity="0.55" />
    <path d="M40 94 L34 104 M80 94 L86 104" />
    <circle cx="60" cy="50" r="7" strokeWidth="1.5" opacity="0.55" />
  </svg>
)

const SleeveArt = () => (
  <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="76" height="76">
    <rect x="42" y="28" width="44" height="64" rx="3" transform="rotate(8 64 60)" opacity="0.45" strokeWidth="1.8" />
    <rect x="34" y="26" width="44" height="64" rx="3" />
    <path d="M44 40 h24 M44 50 h24" strokeWidth="1.5" opacity="0.5" />
  </svg>
)

const arts = [BinderArt, DeckBoxArt, DisplayCaseArt, SleeveArt]

export default function ProductRange() {
  const t = useTranslations('products')
  const items = t.raw('items')

  return (
    <>
      <style>{`
        .products-section { padding: 7rem 3rem; max-width: 1200px; margin: 0 auto; }
        .products-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 2px; background: var(--color-border);
          border: 2px solid var(--color-border);
          box-shadow: var(--shadow-hard);
        }
        .product-card {
          background: var(--color-surface);
          display: flex; flex-direction: column;
          transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
          cursor: default; position: relative;
        }
        .product-card:hover {
          background: #FFFBEB;
          box-shadow: var(--shadow-hard-lg);
          transform: translateY(-4px);
          z-index: 1;
        }
        .product-visual {
          aspect-ratio: 4 / 3;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(150deg, #F4F1EA 0%, #ECE8DE 100%);
          color: var(--color-text);
          border-bottom: 2px solid var(--color-border);
          position: relative; overflow: hidden;
        }
        .product-visual::after {
          content: ''; position: absolute; inset: 0;
          background-image:
            repeating-linear-gradient(0deg, rgba(10,10,10,0.025), rgba(10,10,10,0.025) 1px, transparent 1px, transparent 22px),
            repeating-linear-gradient(90deg, rgba(10,10,10,0.025), rgba(10,10,10,0.025) 1px, transparent 1px, transparent 22px);
          pointer-events: none;
        }
        .product-body { padding: 1.5rem; }
        .product-tag {
          position: absolute; top: 0.85rem; right: 0.85rem; z-index: 2;
          font-size: 0.58rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          background: var(--color-accent); color: var(--color-text);
          border: 2px solid var(--color-border); padding: 0.18rem 0.55rem; border-radius: 100px;
          font-family: var(--font-ui);
        }
        .products-cta {
          background: var(--color-accent); color: var(--color-text);
          font-size: 0.9rem; font-weight: 600; padding: 0.95rem 2.1rem;
          border-radius: var(--radius); text-decoration: none;
          border: 1px solid var(--color-accent);
          display: inline-block; font-family: var(--font-ui);
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .products-cta:hover { background: var(--color-accent-hover); border-color: var(--color-accent-hover); transform: translateY(-1px); box-shadow: 0 8px 20px rgba(10,10,10,0.12); }
        @media (max-width: 900px) {
          .products-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 520px) {
          .products-section { padding: 4rem 1.5rem; }
          .products-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div id="products" style={{ background: 'var(--color-bg)', borderTop: '2px solid var(--color-border)' }}>
        <section className="products-section" style={{ fontFamily: 'var(--font-ui)' }}>
          <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>{t('eyebrow')}</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.1, color: 'var(--color-text)' }}>
              {t('titleLine1')}<br/>{t('titleLine2')}
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, fontWeight: 400, maxWidth: '320px' }}>
              {t('intro')}
            </p>
          </div>

          <div className="products-grid">
            {items.map((item, i) => {
              const Art = arts[i]
              return (
                <article key={i} className="product-card">
                  {i === 0 && <span className="product-tag">{t('tagPopular')}</span>}
                  <div className="product-visual">
                    <Art />
                  </div>
                  <div className="product-body">
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text)', letterSpacing: '-0.01em' }}>{item.title}</h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.65, fontWeight: 400 }}>{item.desc}</p>
                  </div>
                </article>
              )
            })}
          </div>

          <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center' }}>
            <a href="#order" className="products-cta">{t('cta')}</a>
          </div>
        </section>
      </div>
    </>
  )
}
