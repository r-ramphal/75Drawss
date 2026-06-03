'use client'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from './languageswitcher'

export default function Navbar() {
  const t = useTranslations('nav')
  const [open, setOpen] = useState(false)

  // While the mobile menu is open: lock background scroll and close on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

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

        /* Hamburger toggle — hidden on desktop, shown on mobile. */
        .nav-toggle {
          display: none;
          width: 42px; height: 42px;
          flex-direction: column; align-items: center; justify-content: center;
          background: transparent;
          border: 2px solid var(--color-border);
          border-radius: var(--radius);
          cursor: pointer;
          color: var(--color-text);
          flex-shrink: 0;
        }
        .nav-toggle .bar {
          display: block; width: 18px; height: 2px;
          background: currentColor; border-radius: 2px;
          transition: transform 0.25s ease, opacity 0.2s ease;
        }
        .nav-toggle .bar + .bar { margin-top: 4px; }
        .nav-toggle.open .bar:nth-child(1) { transform: translateY(6px) rotate(45deg); }
        .nav-toggle.open .bar:nth-child(2) { opacity: 0; }
        .nav-toggle.open .bar:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

        /* Slide-down mobile menu panel + backdrop. */
        .menu-backdrop {
          position: fixed; inset: 0; z-index: 80;
          background: rgba(10,10,10,0.4);
          opacity: 0; visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        .menu-backdrop.open { opacity: 1; visibility: visible; }
        .mobile-menu {
          position: fixed; top: 0; left: 0; right: 0; z-index: 90;
          background: var(--color-bg);
          border-bottom: 2px solid var(--color-border);
          padding: 5.25rem 1.5rem 2rem;
          display: flex; flex-direction: column;
          transform: translateY(-100%);
          transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1);
          visibility: hidden;
          box-shadow: var(--shadow-hard);
        }
        .mobile-menu.open { transform: translateY(0); visibility: visible; }
        .mobile-menu-link {
          font-family: var(--font-ui);
          font-size: 1.05rem; font-weight: 500;
          color: var(--color-text); text-decoration: none;
          padding: 1rem 0.25rem;
          border-bottom: 1px solid var(--color-border);
          transition: color 0.15s;
        }
        .mobile-menu-link:hover, .mobile-menu-link:focus { color: var(--color-accent-text); }
        .mobile-menu-cta {
          margin-top: 1.5rem; text-align: center;
          background: var(--color-accent); color: var(--color-text);
          font-size: 0.95rem; font-weight: 600;
          padding: 1rem; border-radius: var(--radius);
          text-decoration: none; border: 1px solid var(--color-accent);
        }

        @media (max-width: 640px) {
          .nav-links { display: none; }
          .nav-wrap { padding: 1rem 1.5rem !important; }
          .nav-toggle { display: flex; }
        }
        @media (min-width: 641px) {
          /* Never show the mobile menu on desktop, even if state lingers. */
          .menu-backdrop, .mobile-menu { display: none; }
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
        <a href="#" aria-label={t('home')} onClick={close} style={{
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
          <button
            type="button"
            className={`nav-toggle ${open ? 'open' : ''}`}
            aria-label={open ? t('closeMenu') : t('menu')}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
        </div>
      </nav>

      <div className={`menu-backdrop ${open ? 'open' : ''}`} onClick={close} aria-hidden="true" />
      <div id="mobile-menu" className={`mobile-menu ${open ? 'open' : ''}`}>
        <a href="#how-it-works" className="mobile-menu-link" onClick={close}>{t('howItWorks')}</a>
        <a href="#features" className="mobile-menu-link" onClick={close}>{t('whyUs')}</a>
        <a href="#faq" className="mobile-menu-link" onClick={close}>{t('faq')}</a>
        <a href="#order" className="mobile-menu-cta" onClick={close}>{t('orderNow')}</a>
      </div>
    </>
  )
}
