/*
  Product range showcase. Each product uses a clean SVG illustration as a
  placeholder. When you have real photos, drop the file in /public and set
  `image: '/your-photo.jpg'` on that product — it replaces the illustration.
*/

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

const products = [
  {
    Art: BinderArt,
    title: 'Custom Binders',
    desc: '4, 9 or 12-pocket — any size, any artwork. Your design printed edge to edge.',
    tag: 'Most popular',
    image: null,
  },
  {
    Art: DeckBoxArt,
    title: 'Deck Boxes',
    desc: 'Holds a full sleeved deck. Magnetic or slide-top, finished in your style.',
    tag: null,
    image: null,
  },
  {
    Art: DisplayCaseArt,
    title: 'Display Cases',
    desc: 'Show off your graded slabs and grails with a custom case made to fit.',
    tag: null,
    image: null,
  },
  {
    Art: SleeveArt,
    title: 'Sleeves & Extras',
    desc: 'Matching accessories — playmats, sleeves and packaging to complete the set.',
    tag: null,
    image: null,
  },
]

export default function ProductRange() {
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
          transform: translate(-2px, -2px);
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
          <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>What we make</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.1, color: 'var(--color-text)' }}>
              One studio,<br/>your whole collection
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, fontWeight: 400, maxWidth: '320px' }}>
              Custom binder design, deck boxes, display cases and more — all handcrafted to order. Mix and match to build a set that's entirely your own.
            </p>
          </div>

          <div className="products-grid">
            {products.map(({ Art, title, desc, tag, image }, i) => (
              <article key={i} className="product-card">
                {tag && <span className="product-tag">{tag}</span>}
                <div className="product-visual">
                  {image
                    ? <img src={image} alt={title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <Art />}
                </div>
                <div className="product-body">
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text)', letterSpacing: '-0.01em' }}>{title}</h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.65, fontWeight: 400 }}>{desc}</p>
                </div>
              </article>
            ))}
          </div>

          <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center' }}>
            <a href="#order" style={{
              background: 'var(--color-accent)', color: 'var(--color-text)',
              fontSize: '0.9rem', fontWeight: 600, padding: '0.9rem 2.25rem',
              borderRadius: '100px', textDecoration: 'none',
              border: '2px solid var(--color-border)', boxShadow: '4px 4px 0 var(--color-border)',
              display: 'inline-block', fontFamily: 'var(--font-ui)',
            }}>Start your custom order →</a>
          </div>
        </section>
      </div>
    </>
  )
}
