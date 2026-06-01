import { useTranslations } from 'next-intl'
import LanguageSwitcher from './languageswitcher'

export default function Navbar() {
  const t = useTranslations('nav')
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
          padding: 0.6rem 1.35rem;
          border-radius: var(--radius);
          text-decoration: none;
          border: 1px solid var(--color-accent);
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          white-space: nowrap;
        }
        .nav-cta:hover {
          background: var(--color-accent-hover);
          border-color: var(--color-accent-hover);
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(10,10,10,0.12);
        }
        .nav-right { display: flex; align-items: center; gap: 1.5rem; }
        .nav-links { display: flex; gap: 2.5rem; list-style: none; align-items: center; }
        .mobile-cta { display: none; }
        @media (max-width: 640px) {
          .nav-links { display: none; }
          .nav-wrap { padding: 1rem 1.5rem !important; }
          .mobile-cta { display: inline-block; }
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
        <a href="#" aria-label={t('home')} style={{
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

        <div className="nav-right">
          <ul className="nav-links">
            <li><a href="#how-it-works" className="nav-link">{t('howItWorks')}</a></li>
            <li><a href="#features" className="nav-link">{t('whyUs')}</a></li>
            <li><a href="#order" className="nav-cta">{t('orderNow')}</a></li>
          </ul>
          <LanguageSwitcher />
          <a href="#order" className="nav-cta mobile-cta">{t('orderNow')}</a>
        </div>
      </nav>
    </>
  )
}
