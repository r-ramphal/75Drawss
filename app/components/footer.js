export default function Footer() {
  return (
    <>
      <style>{`
        .footer-link { font-size: 0.75rem; color: #555; text-decoration: none; transition: color 0.15s; }
        .footer-link:hover { color: #000; }
        .footer-inner { padding: 2.5rem 3rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
        .footer-links { display: flex; gap: 2rem; }
        @media (max-width: 640px) {
          .footer-inner { padding: 2rem 1.5rem !important; flex-direction: column; align-items: flex-start; gap: 1.25rem; }
          .footer-links { gap: 1.25rem; }
        }
      `}</style>
      <footer style={{ borderTop: '1px solid #000', background: '#fff' }}>
        <div className="footer-inner" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: '1rem', fontWeight: 300, letterSpacing: '-0.02em', color: '#000' }}>
            75<span>Drawss</span>
          </div>
          <div className="footer-links">
            <a href="#how-it-works" className="footer-link">How it works</a>
            <a href="#features" className="footer-link">Why us</a>
            <a href="#order" className="footer-link">Order</a>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#999', fontWeight: 300 }}>© 2025 75Drawss · Netherlands · hello@75drawss.nl</p>
        </div>
      </footer>
    </>
  )
}