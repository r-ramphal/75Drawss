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
        .footer-brand { display: flex; flex-direction: column; gap: 1rem; }
        .footer-social { display: flex; gap: 0.6rem; }
        .social-link {
          width: 34px; height: 34px;
          display: flex; align-items: center; justify-content: center;
          border: 1.5px solid rgba(255,255,255,0.2);
          border-radius: 50%;
          color: #ffffff;
          transition: color 0.15s, border-color 0.15s, background 0.15s;
        }
        .social-link:hover {
          color: var(--color-text);
          background: var(--color-accent);
          border-color: var(--color-accent);
        }
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
          <div className="footer-brand">
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
            <div className="footer-social">
              <a href="https://www.instagram.com/75.drawss" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="75Drawss on Instagram">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@75drawss" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="75Drawss on TikTok">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
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
