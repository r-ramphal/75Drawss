export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Tell us your idea',
      desc: 'Fill in the order form with your product, design idea and any details. Upload your artwork or just describe what you have in mind.',
    },
    {
      num: '02',
      title: 'We send a quote',
      desc: 'Within 1–2 business days you\'ll receive a price and timeline. No surprises, no hidden fees.',
    },
    {
      num: '03',
      title: 'We craft your product',
      desc: 'Once approved we get to work. Every product is handcrafted to your exact specifications.',
    },
    {
      num: '04',
      title: 'Delivered to you',
      desc: 'Ships via PostNL or DHL with tracking. Carefully packed so it arrives in perfect condition.',
    },
  ]
  return (
    <>
      <style>{`
        .step {
          padding: 2.5rem 2rem;
          border-right: 2px solid var(--color-border);
          background: var(--color-surface);
          transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
          cursor: default;
        }
        .step:last-child { border-right: none; }
        .step:hover {
          background: #FFFBEB;
          box-shadow: inset -3px -3px 0 var(--color-accent);
        }
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border: 2px solid var(--color-border);
          box-shadow: var(--shadow-hard);
        }
        .howitworks-section { padding: 7rem 3rem; }
        @media (max-width: 640px) {
          .howitworks-section { padding: 4rem 1.5rem !important; }
          .steps-grid { grid-template-columns: 1fr 1fr !important; }
          .step { border-right: 2px solid var(--color-border); border-bottom: 2px solid var(--color-border); }
          .step:nth-child(2) { border-right: none; }
          .step:nth-child(3) { border-right: 2px solid var(--color-border); border-bottom: none; }
          .step:nth-child(4) { border-right: none; border-bottom: none; }
        }
      `}</style>
      <div id="how-it-works" style={{ background: 'var(--color-bg)' }}>
        <section className="howitworks-section" style={{ maxWidth: '1200px', margin: '0 auto', fontFamily: 'var(--font-ui)' }}>
          <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>The process</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '4rem', color: 'var(--color-text)' }}>
            From idea to<br/>your doorstep
          </h2>
          <div className="steps-grid">
            {steps.map((step, i) => (
              <div key={i} className="step">
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.75rem', fontWeight: 300, color: '#D0D0CC', lineHeight: 1, marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>{step.num}</div>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.6rem', color: 'var(--color-text)', letterSpacing: '-0.01em' }}>{step.title}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, fontWeight: 400 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
