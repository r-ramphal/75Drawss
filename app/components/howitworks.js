export default function HowItWorks() {
  const steps = [
    { num: '01', title: 'Fill in the form', desc: 'Tell us your dimensions, card game, pocket layout and design — or upload your own artwork.' },
    { num: '02', title: 'We send a quote', desc: 'Within 1–2 business days you\'ll receive a price and timeline. No surprises, no hidden fees.' },
    { num: '03', title: 'We craft your binder', desc: 'Once approved we get to work. Every binder is handcrafted to your exact specifications.' },
    { num: '04', title: 'Delivered to you', desc: 'Ships via PostNL or DHL with tracking. Carefully packed so it arrives in perfect condition.' },
  ]
  return (
    <>
      <style>{`
        .step { padding: 2.5rem 2rem; border-right: 1px solid #000; transition: background 0.2s; }
        .step:last-child { border-right: none; }
        .step:hover { background: #f8f8f8; }
        .steps-grid { display: grid; grid-template-columns: repeat(4, 1fr); border: 1px solid #000; }
        .howitworks-section { padding: 7rem 3rem; }
        @media (max-width: 640px) {
          .howitworks-section { padding: 4rem 1.5rem !important; }
          .steps-grid { grid-template-columns: 1fr 1fr !important; }
          .step { border-right: 1px solid #000; border-bottom: 1px solid #000; }
          .step:nth-child(2) { border-right: none; }
          .step:nth-child(3) { border-right: 1px solid #000; border-bottom: none; }
          .step:nth-child(4) { border-right: none; border-bottom: none; }
        }
      `}</style>
      <div id="how-it-works" style={{ background: '#fff' }}>
        <section className="howitworks-section" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#999', marginBottom: '1rem' }}>The process</p>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '4rem', color: '#000' }}>
            From idea to<br/>your doorstep
          </h2>
          <div className="steps-grid">
            {steps.map((step, i) => (
              <div key={i} className="step">
                <div style={{ fontFamily: 'Georgia, serif', fontSize: '2.75rem', fontWeight: 300, color: '#ddd', lineHeight: 1, marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>{step.num}</div>
                <h3 style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: '#000' }}>{step.title}</h3>
                <p style={{ fontSize: '0.8rem', color: '#555', lineHeight: 1.7, fontWeight: 300 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}