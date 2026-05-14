export default function Hero() {
  return (
    <>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .hero-eyebrow { animation: fadeUp 0.6s ease both 0.1s; }
        .hero-h1 { animation: fadeUp 0.6s ease both 0.2s; }
        .hero-bottom { animation: fadeUp 0.6s ease both 0.35s; }
        .btn-dark { background: #000; color: #fff; font-size: 0.85rem; font-weight: 500; padding: 0.875rem 2rem; border-radius: 100px; text-decoration: none; transition: background 0.15s; white-space: nowrap; }
        .btn-dark:hover { background: #333; }
        .btn-outline { background: transparent; color: #000; font-size: 0.85rem; font-weight: 500; padding: 0.875rem 2rem; border-radius: 100px; text-decoration: none; border: 1px solid #000; transition: all 0.15s; white-space: nowrap; }
        .btn-outline:hover { background: #000; color: #fff; }
        .hero-section { padding: 7rem 3rem 4rem; }
        .hero-desc { font-size: 0.95rem; font-weight: 300; color: #555; max-width: 360px; line-height: 1.8; }
        .hero-actions { display: flex; gap: 1rem; align-items: center; }
        .hero-bottom-inner { display: flex; align-items: flex-end; justify-content: space-between; width: 100%; gap: 2rem; flex-wrap: wrap; }
        @media (max-width: 640px) {
          .hero-section { padding: 6rem 1.5rem 3rem !important; }
          .hero-h1 { font-size: 3rem !important; margin-bottom: 2rem !important; }
          .hero-bottom-inner { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
          .hero-desc { max-width: 100%; }
          .hero-actions { width: 100%; flex-direction: column; align-items: stretch; }
          .btn-dark, .btn-outline { text-align: center; }
        }
      `}</style>
      <section className="hero-section" style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        maxWidth: '1200px', margin: '0 auto',
        background: '#fff',
      }}>
        <div className="hero-eyebrow" style={{
          fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.16em',
          textTransform: 'uppercase', color: '#000',
          marginBottom: '1.75rem',
          display: 'flex', alignItems: 'center', gap: '0.75rem',
        }}>
          <span style={{ width: 28, height: 1, background: '#000', display: 'block', flexShrink: 0 }} />
          Custom Design Studio · Made in the Netherlands
        </div>

        <h1 className="hero-h1" style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(3rem, 7.5vw, 7.5rem)',
          fontWeight: 300, lineHeight: 1.0,
          letterSpacing: '-0.03em',
          marginBottom: '3rem', maxWidth: '900px',
          color: '#000',
        }}>
          Your vision.<br/>
          <em style={{ fontStyle: 'italic', color: '#999' }}>Beautifully</em> made.
        </h1>

        <div className="hero-bottom">
          <div className="hero-bottom-inner">
            <p className="hero-desc">
              We design and craft custom products for collectors and creators — from TCG binders to deck boxes and beyond. Your design, your way.
            </p>
            <div className="hero-actions">
              <a href="#order" className="btn-dark">Start your order →</a>
              <a href="#how-it-works" className="btn-outline">See how it works</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}