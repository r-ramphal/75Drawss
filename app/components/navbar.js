export default function Navbar() {
  return (
    <>
      <style>{`
        .nav-link {
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--color-text-secondary);
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: color 0.15s;
        }
        .nav-link:hover { color: var(--color-text); }
        .nav-cta {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--color-text) !important;
          background: var(--color-accent);
          padding: 0.55rem 1.35rem;
          border-radius: 100px;
          text-decoration: none;
          border: 2px solid var(--color-border);
          box-shadow: 3px 3px 0 var(--color-border);
          transition: box-shadow 0.15s, transform 0.15s;
          white-space: nowrap;
        }
        .nav-cta:hover {
          box-shadow: none;
          transform: translate(3px, 3px);
        }
        .nav-links { display: flex; gap: 2.5rem; list-style: none; align-items: center; }
        @media (max-width: 640px) {
          .nav-links { display: none; }
          .nav-wrap { padding: 1rem 1.5rem !important; }
          .mobile-cta { display: block !important; }
        }
      `}</style>
      <nav className="nav-wrap" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.25rem 3rem',
        background: 'rgba(250,250,248,0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: '2px solid var(--color-border)',
        fontFamily: 'var(--font-ui)',
      }}>
        <a href="#" aria-label="75Drawss home" style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.15rem',
          fontWeight: 400,
          color: 'var(--color-text)',
          textDecoration: 'none',
          letterSpacing: '-0.02em',
          display: 'flex',
          alignItems: 'baseline',
          gap: '0.05em',
        }}>
          <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '1.05rem' }}>75</span>
          <span>Drawss</span>
        </a>
        <ul className="nav-links">
          <li><a href="#how-it-works" className="nav-link">How it works</a></li>
          <li><a href="#features" className="nav-link">Why us</a></li>
          <li><a href="#order" className="nav-cta">Order now</a></li>
        </ul>
        <a href="#order" style={{ display: 'none' }} className="mobile-cta nav-cta">Order now</a>
      </nav>
    </>
  )
}
