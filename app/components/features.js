const IconPalette = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
  </svg>
)

const IconRuler = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21.3 8.7 8.7 21.3c-1 1-2.5 1-3.4 0l-2.6-2.6c-1-1-1-2.5 0-3.4L15.3 2.7c1-1 2.5-1 3.4 0l2.6 2.6c1 1 1 2.5 0 3.4Z"/>
    <path d="m7.5 10.5 2 2"/><path d="m10.5 7.5 2 2"/><path d="m13.5 4.5 2 2"/><path d="m4.5 13.5 2 2"/>
  </svg>
)

const IconStar = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)

const IconTruck = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/>
    <rect width="7" height="7" x="14" y="10" rx="1"/>
    <path d="M5 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0"/>
    <path d="M19 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0"/>
  </svg>
)

export default function Features() {
  const features = [
    {
      Icon: IconPalette,
      title: 'Fully custom design',
      desc: 'Upload your own artwork or describe your vision. We bring it to life exactly as you imagined — no templates, no compromises, no limits.',
    },
    {
      Icon: IconRuler,
      title: 'Any product, any size',
      desc: 'Binders, deck boxes, display cases and more. If you can design it, we can make it. Any dimensions, any format.',
    },
    {
      Icon: IconStar,
      title: 'Original designs',
      desc: 'No copyrighted characters — just stunning original artwork. We create designs you actually own, built around your style and vision.',
    },
    {
      Icon: IconTruck,
      title: 'Fast, tracked shipping',
      desc: 'We ship across the Netherlands and internationally via PostNL and DHL — with full tracking so you always know where your order is.',
    },
  ]
  return (
    <>
      <style>{`
        .feature {
          padding: 2.5rem;
          background: var(--color-surface);
          transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
          cursor: default;
        }
        .feature:hover {
          background: #FFFBEB;
          box-shadow: var(--shadow-hard-lg);
          transform: translate(-2px, -2px);
          position: relative;
          z-index: 1;
        }
        .features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          background: var(--color-border);
          border: 2px solid var(--color-border);
          box-shadow: var(--shadow-hard);
        }
        .features-section { padding: 7rem 3rem; }
        .feature-icon {
          width: 40px;
          height: 40px;
          background: var(--color-accent);
          border: 2px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
          color: var(--color-text);
          flex-shrink: 0;
        }
        @media (max-width: 640px) {
          .features-section { padding: 4rem 1.5rem !important; }
          .features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div id="features" style={{ borderTop: '2px solid var(--color-border)', background: 'var(--color-bg)' }}>
        <section className="features-section" style={{ maxWidth: '1200px', margin: '0 auto', fontFamily: 'var(--font-ui)' }}>
          <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>Why 75Drawss</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '4rem', color: 'var(--color-text)' }}>
            Built for collectors<br/>and creators
          </h2>
          <div className="features-grid">
            {features.map(({ Icon, title, desc }, i) => (
              <div key={i} className="feature">
                <div className="feature-icon">
                  <Icon />
                </div>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text)', letterSpacing: '-0.01em' }}>{title}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.75, fontWeight: 400 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
