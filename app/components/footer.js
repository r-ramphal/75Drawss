export default function Footer() {
  return (
    <>
      <style>{`
        .footer-link {
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--color-text-secondary);
          text-decoration: none;
          transition: color 0.15s;
          letter-spacing: 0.01em;
        }
        .footer-link:hover { color: var(--color-accent); }
        .footer-inner {
          padding: 3rem;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 2rem;
        }
        .footer-links { display: flex; gap: 2rem; justify-content: center; }
        .footer-copy { text-align: right; }
        @media (max-width: 768px) {
          .footer-inner {
            grid-template-columns: 1fr !important;
            padding: 2rem 1.5rem !important;
            text-align: left;
          }
          .footer-links { justify-content: flex-start; flex-wrap: wrap; gap: 1.25rem; }
          .footer-copy { text-align: left !important; }
        }
      `}</style>
      <footer style={{ borderTop: '2px solid var(--color-border)', background: 'var(--color-text)' }}>
        <div className="footer-inner" style={{ maxWidth: '1200px', margin: '0 auto', fontFamily: 'var(--font-ui)' }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'baseline',
            gap: '0.05em',
          }}>
            <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '1rem', color: 'var(--color-accent)' }}>75</span>
            <span>Drawss</span>
          </div>

          <nav className="footer-links" aria-label="Footer navigation">
            <a href="#how-it-works" className="footer-link">How it works</a>
            <a href="#features" className="footer-link">Why us</a>
            <a href="#faq" className="footer-link">FAQ</a>
            <a href="#order" className="footer-link">Order</a>
          </nav>

          <div className="footer-copy">
            <p style={{ fontSize: '0.72rem', color: '#888', fontWeight: 400, lineHeight: 1.6 }}>
              © 2025 75Drawss · Netherlands<br/>
              <a href="mailto:75Drawss@gmail.com" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontWeight: 500 }}>75Drawss@gmail.com</a>
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
