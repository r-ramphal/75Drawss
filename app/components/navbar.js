export default function Navbar() {
  return (
    <>
      <style>{`
        .nav-link { font-size: 0.8rem; color: #555; text-decoration: none; letter-spacing: 0.03em; transition: color 0.15s; }
        .nav-link:hover { color: #000; }
        .nav-cta { font-size: 0.8rem; font-weight: 500; color: #fff !important; background: #000; padding: 0.5rem 1.25rem; border-radius: 100px; text-decoration: none; transition: background 0.15s; }
        .nav-cta:hover { background: #333 !important; }
        .nav-links { display: flex; gap: 2.5rem; list-style: none; align-items: center; }
        @media (max-width: 640px) {
          .nav-links { display: none; }
          .nav-wrap { padding: 1rem 1.5rem !important; }
        }
      `}</style>
      <nav className="nav-wrap" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.25rem 3rem',
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #000',
      }}>
        <a href="#" style={{ fontFamily: 'Georgia, serif', fontSize: '1.2rem', color: '#000', textDecoration: 'none', letterSpacing: '-0.02em' }}>
          75<span>Drawss</span>
        </a>
        <ul className="nav-links">
          <li><a href="#how-it-works" className="nav-link">How it works</a></li>
          <li><a href="#features" className="nav-link">Why us</a></li>
          <li><a href="#order" className="nav-cta">Order now</a></li>
        </ul>
        <a href="#order" style={{ display: 'none' }} className="mobile-cta nav-cta">Order now</a>
      </nav>
      <style>{`@media (max-width: 640px) { .mobile-cta { display: block !important; } }`}</style>
    </>
  )
}