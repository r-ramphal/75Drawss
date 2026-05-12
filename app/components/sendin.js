export default function SendIn() {
  const steps = [
    {
      num: '01',
      title: 'Request a quote',
      desc: 'Fill in the order form and select "Customize my product". Tell us your design idea and we\'ll reply within 1–2 business days with a quote.',
    },
    {
      num: '02',
      title: 'Send your product',
      desc: 'Once you approve the quote we\'ll send you our address. Pack your product well in a sturdy box with bubble wrap and ship it via PostNL or DHL with a tracking code.',
    },
    {
      num: '03',
      title: 'We customize it',
      desc: 'We carefully customize your product to your exact specifications. Once done we pack it securely and ship it straight back to you.',
    },
  ]

  return (
    <>
      <style>{`
        .sendin-section { padding: 7rem 3rem; }
        .sendin-steps { display: grid; grid-template-columns: repeat(3, 1fr); border: 1px solid #000; margin-bottom: 3rem; }
        .sendin-step { padding: 2.5rem 2rem; border-right: 1px solid #000; transition: background 0.2s; }
        .sendin-step:last-child { border-right: none; }
        .sendin-step:hover { background: #f8f8f8; }
        .sendin-info { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: #000; border: 1px solid #000; }
        .sendin-info-item { background: #fff; padding: 2rem; transition: background 0.2s; }
        .sendin-info-item:hover { background: #f8f8f8; }
        @media (max-width: 768px) {
          .sendin-section { padding: 4rem 1.5rem !important; }
          .sendin-steps { grid-template-columns: 1fr !important; }
          .sendin-step { border-right: none !important; border-bottom: 1px solid #000; }
          .sendin-step:last-child { border-bottom: none; }
          .sendin-info { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div id="send-in" style={{ borderTop: '1px solid #000', background: '#fff' }}>
        <section className="sendin-section" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#999', marginBottom: '1rem' }}>Send-in service</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.1, color: '#000' }}>
              Already have a product?<br/>We'll make it <em style={{ fontStyle: 'italic', color: '#999' }}>yours.</em>
            </h2>
            <a href="#order" style={{ background: '#000', color: '#fff', fontSize: '0.85rem', fontWeight: 500, padding: '0.875rem 2rem', borderRadius: '100px', textDecoration: 'none', flexShrink: 0 }}>
              Customize my product →
            </a>
          </div>

          <div className="sendin-steps">
            {steps.map((step, i) => (
              <div key={i} className="sendin-step">
                <div style={{ fontFamily: 'Georgia, serif', fontSize: '2.75rem', fontWeight: 300, color: '#ddd', lineHeight: 1, marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>{step.num}</div>
                <h3 style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: '#000' }}>{step.title}</h3>
                <p style={{ fontSize: '0.8rem', color: '#555', lineHeight: 1.7, fontWeight: 300 }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="sendin-info">
            <div className="sendin-info-item">
              <div style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>📦</div>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: '#000' }}>Pack it well</h3>
              <p style={{ fontSize: '0.8rem', color: '#555', lineHeight: 1.7, fontWeight: 300 }}>Use a sturdy box with bubble wrap around your product. We handle it with care on our end too.</p>
            </div>
            <div className="sendin-info-item">
              <div style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>🔍</div>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: '#000' }}>Use tracked shipping</h3>
              <p style={{ fontSize: '0.8rem', color: '#555', lineHeight: 1.7, fontWeight: 300 }}>Always ship with a tracking code via PostNL or DHL. For valuable items use aangetekende post.</p>
            </div>
            <div className="sendin-info-item">
              <div style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>↩️</div>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: '#000' }}>We ship it back</h3>
              <p style={{ fontSize: '0.8rem', color: '#555', lineHeight: 1.7, fontWeight: 300 }}>Return shipping is included in your quote. We pack your customized product securely before sending it back.</p>
            </div>
          </div>

        </section>
      </div>
    </>
  )
}