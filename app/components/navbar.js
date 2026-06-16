'use client'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import LanguageSwitcher from './languageswitcher'

export default function Navbar() {
  const t = useTranslations('nav')
  const [open, setOpen] = useState(false)

  // While the menu is open: lock background scroll and close on Escape.
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
        .nav-wrap {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: grid; grid-template-columns: 1fr auto 1fr; align-items: center;
          padding: 1.1rem clamp(1.25rem, 4vw, 3rem);
          background: rgba(250,250,248,0.92); backdrop-filter: blur(16px);
          border-bottom: 2px solid var(--color-border); font-family: var(--font-ui);
        }
        .nav-left { justify-self: start; }
        .nav-right { justify-self: end; display: flex; align-items: center; gap: 1rem; }
        .nav-logo {
          justify-self: center;
          font-family: var(--font-display); font-size: 1.15rem; font-weight: 400;
          color: var(--color-text); text-decoration: none; letter-spacing: -0.02em;
          display: flex; align-items: baseline; gap: 0.05em;
        }
        .nav-logo .mark { font-family: var(--font-ui); font-weight: 700; font-size: 1.05rem; }

        .nav-cta {
          font-size: 0.8rem; font-weight: 600; color: var(--color-text) !important;
          background: var(--color-accent); padding: 0.6rem 1.35rem; border-radius: var(--radius);
          text-decoration: none; border: 1px solid var(--color-accent); white-space: nowrap;
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .nav-cta:hover {
          background: var(--color-accent-hover); border-color: var(--color-accent-hover);
          transform: translateY(-1px); box-shadow: 0 6px 16px rgba(10,10,10,0.12);
        }

        /* Hamburger toggle — now shown on every screen size. */
        .nav-toggle {
          display: flex; width: 44px; height: 44px;
          flex-direction: column; align-items: center; justify-content: center;
          background: transparent; border: 2px solid var(--color-border);
          border-radius: var(--radius); cursor: pointer; color: var(--color-text); flex-shrink: 0;
        }
        .nav-toggle:hover { background: #FFFBEB; }
        .nav-toggle .bar {
          display: block; width: 18px; height: 2px; background: currentColor; border-radius: 2px;
          transition: transform 0.25s ease, opacity 0.2s ease;
        }
        .nav-toggle .bar + .bar { margin-top: 4px; }
        .nav-toggle.open .bar:nth-child(1) { transform: translateY(6px) rotate(45deg); }
        .nav-toggle.open .bar:nth-child(2) { opacity: 0; }
        .nav-toggle.open .bar:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

        .menu-backdrop {
          position: fixed; inset: 0; z-index: 80; background: rgba(10,10,10,0.4);
          opacity: 0; visibility: hidden; transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        .menu-backdrop.open { opacity: 1; visibility: visible; }
        .nav-menu {
          position: fixed; top: 0; left: 0; right: 0; z-index: 90;
          background: var(--color-bg); border-bottom: 2px solid var(--color-border);
          padding: 5.5rem clamp(1.5rem, 4vw, 3rem) 2rem;
          display: flex; flex-direction: column;
          transform: translateY(-100%); transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1);
          visibility: hidden; box-shadow: var(--shadow-hard);
        }
        .nav-menu.open { transform: translateY(0); visibility: visible; }
        .nav-menu-inner { max-width: 1200px; margin: 0 auto; width: 100%; display: flex; flex-direction: column; }
        .nav-menu-link {
          font-family: var(--font-display); font-size: clamp(1.4rem, 4vw, 2rem); font-weight: 300;
          letter-spacing: -0.02em; color: var(--color-text); text-decoration: none;
          padding: 1.1rem 0.15rem; border-bottom: 1px solid var(--color-border);
          transition: color 0.15s, padding-left 0.2s ease;
        }
        .nav-menu-link:hover, .nav-menu-link:focus { color: var(--color-accent-text); padding-left: 0.5rem; }
        .nav-menu-cta {
          margin-top: 1.75rem; text-align: center; align-self: flex-start;
          background: var(--color-accent); color: var(--color-text);
          font-family: var(--font-ui); font-size: 0.95rem; font-weight: 600;
          padding: 0.95rem 2.2rem; border-radius: var(--radius);
          text-decoration: none; border: 1px solid var(--color-accent);
        }

        @media (max-width: 640px) {
          .nav-wrap { padding: 0.9rem 1.25rem; }
          .nav-cta-desktop { display: none; } /* on mobile the sticky bottom bar is the CTA */
        }
      `}</style>

      <nav className="nav-wrap">
        <div className="nav-left">
          <button
            type="button"
            className={`nav-toggle ${open ? 'open' : ''}`}
            aria-label={open ? t('closeMenu') : t('menu')}
            aria-expanded={open}
            aria-controls="nav-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
        </div>

        <a href="#" className="nav-logo" aria-label={t('home')} onClick={close}>
          <span className="mark">75</span><span>Drawss</span>
        </a>

        <div className="nav-right">
          <LanguageSwitcher />
          <a href="#order" className="nav-cta nav-cta-desktop">{t('orderNow')}</a>
        </div>
      </nav>

      <div className={`menu-backdrop ${open ? 'open' : ''}`} onClick={close} aria-hidden="true" />
      <div id="nav-menu" className={`nav-menu ${open ? 'open' : ''}`}>
        <div className="nav-menu-inner">
          <a href="#how-it-works" className="nav-menu-link" onClick={close}>{t('howItWorks')}</a>
          <a href="#features" className="nav-menu-link" onClick={close}>{t('whyUs')}</a>
          <Link href="/portfolio" className="nav-menu-link" onClick={close}>{t('portfolio')}</Link>
          <Link href="/inspiratie" className="nav-menu-link" onClick={close}>{t('inspiration')}</Link>
          <a href="#faq" className="nav-menu-link" onClick={close}>{t('faq')}</a>
          <a href="#order" className="nav-menu-cta" onClick={close}>{t('orderNow')}</a>
        </div>
      </div>
    </>
  )
}
