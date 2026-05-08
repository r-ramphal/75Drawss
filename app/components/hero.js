export default function Hero() {
  return (
    <>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .hero-eyebrow { animation: fadeUp 0.6s ease both 0.1s; }
        .hero-h1 { animation: fadeUp 0.6s ease both 0.2s; }
        .hero-bottom { animation: fadeUp 0.6s ease both 0.35s; }
        .btn-dark { background: #000; color: #fff; font-size: 0.85rem; font-weight: 500; padding: 0.875rem 2rem; border-radius: 100px; text-decoration: none; transition: background 0.15s; }
        .btn-dark:hover { background: #333; }
        .btn-outline { background: transparent; color: #000; font-size: 0.85rem; font-weight: 500; padding: 0.875rem 2rem; border-radius: 100px; text-decoration: none; border: 1px solid #000; transition: all 0.15s; }
        .btn-outline:hover { background: #000; color: #fff; }
      `}</style>
      <section style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: '7rem 3rem 4rem',
        maxWidth: '1200px', margin: '0 auto',
        background: '#fff',
      }}>
        <div className="hero-eyebrow" style={{
          fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.16em',
          textTransform: 'uppercase', color: '#000',
          marginBottom: '1.75rem',
          display: 'flex', alignItems: 'center', gap: '0.75rem',
        }}>
          <span style={{ width: 28, height: 1, background: '#000', display: 'block' }} />
          Custom TCG Binders · Made in the Netherlands
        </div>

        <h1 className="hero-h1" style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(3.5rem, 7.5vw, 7.5rem)',
          fontWeight: 300, lineHeight: 1.0,
          letterSpacing: '-0.03em',
          marginBottom: '3rem', maxWidth: '900px',
          color: '#000',
        }}>
          Your cards deserve<br/>
          a <em style={{ fontStyle: 'italic', color: '#999' }}>proper</em> home.
        </h1>

        <div className="hero-bottom" style={{
          display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between',
          width: '100%', gap: '2rem', flexWrap: 'wrap',
        }}>
          <p style={{ fontSize: '0.95rem', fontWeight: 300, color: '#555', maxWidth: '360px', lineHeight: 1.8 }}>
            We build fully custom binders for your TCG collection — your design, your dimensions, your way. Pokémon, MTG, Yu-Gi-Oh! and more.
          </p>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <a href="#order" className="btn-dark">Place an order →</a>
            <a href="#how-it-works" className="btn-outline">See how it works</a>
          </div>
        </div>
      </section>
    </>
  )
}