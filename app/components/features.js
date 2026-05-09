export default function Features() {
  const features = [
    { icon: '🎨', title: 'Fully custom design', desc: 'Upload your own artwork or describe your vision in detail. We bring it to life exactly as you imagined — no templates, no compromises.' },
    { icon: '📐', title: 'Any size, any format', desc: 'Standard 9-pocket, oversized, side-loading — we work to your exact dimensions. If it holds cards, we can make a binder for it.' },
    { icon: '🃏', title: 'All major TCGs supported', desc: 'Pokémon, MTG, Yu-Gi-Oh!, One Piece, Lorcana and more. We know the card sizes and sleeve dimensions inside out.' },
    { icon: '📦', title: 'Fast, tracked shipping', desc: 'We ship across the Netherlands and internationally via PostNL and DHL — with full tracking so you always know where your order is.' },
  ]
  return (
    <>
      <style>{`
        .feature { padding: 2.5rem; background: #fff; transition: background 0.2s; }
        .feature:hover { background: #f8f8f8; }
        .features-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: #000; border: 1px solid #000; }
        .features-section { padding: 7rem 3rem; }
        @media (max-width: 640px) {
          .features-section { padding: 4rem 1.5rem !important; }
          .features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div id="features" style={{ borderTop: '1px solid #000', background: '#fff' }}>
        <section className="features-section" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#999', marginBottom: '1rem' }}>Why 75Drawss</p>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '4rem', color: '#000' }}>
            Built for collectors,<br/>by collectors
          </h2>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature">
                <div style={{ width: 38, height: 38, background: '#fff', border: '1px solid #000', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', marginBottom: '1.25rem' }}>{f.icon}</div>
                <h3 style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: '#000' }}>{f.title}</h3>
                <p style={{ fontSize: '0.8rem', color: '#555', lineHeight: 1.7, fontWeight: 300 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}