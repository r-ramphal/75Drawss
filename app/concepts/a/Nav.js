'use client'
import { useTranslations, useLocale } from 'next-intl'
import LanguageSwitcher from '@/app/components/languageswitcher'
import { Logo75 } from '../shared/Social'
import { WORK_COUNT } from '../shared/work'

export default function Nav() {
  const t = useTranslations('concept.a')
  const locale = useLocale()
  const home = `/${locale}/concept/a`

  return (
    <>
      <style>{`
        .ca-nav {
          position: fixed; inset: 0 0 auto 0; z-index: 60;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.1rem clamp(1.25rem, 4vw, 3.5rem);
          background: linear-gradient(to bottom, rgba(10,10,10,0.92), rgba(10,10,10,0));
          pointer-events: none;
        }
        .ca-nav > * { pointer-events: auto; }
        .ca-nav-brand { display: flex; align-items: center; gap: 0.7rem; text-decoration: none; color: var(--color-text); }
        .ca-nav-brand span { font-weight: 800; letter-spacing: -0.02em; font-size: 1.05rem; }
        .ca-nav-links { display: flex; align-items: center; gap: 2rem; }
        .ca-nav-link {
          font-size: 0.72rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--color-text); text-decoration: none; position: relative;
        }
        .ca-nav-link sup { color: var(--color-accent); font-size: 0.6em; margin-left: 0.15em; }
        .ca-nav-link::after {
          content: ''; position: absolute; left: 0; right: 0; bottom: -4px; height: 1px;
          background: var(--color-accent); transform: scaleX(0); transform-origin: left; transition: transform 0.25s;
        }
        .ca-nav-link:hover::after { transform: scaleX(1); }
        .ca-nav-order { padding: 0.6rem 1rem; border: 1px solid var(--color-accent); color: var(--color-accent); }
        .ca-nav-order::after { display: none; }
        .ca-nav-order:hover { background: var(--color-accent); color: #0A0A0A; }
        @media (max-width: 720px) {
          .ca-nav-links { gap: 1rem; }
          .ca-nav-link.hide-m { display: none; }
          .ca-nav-brand span { display: none; }
        }
      `}</style>
      <nav className="ca-nav" aria-label="Concept A">
        <a href={home} className="ca-nav-brand" aria-label="75Drawss">
          <Logo75 size={30} bg="#F2F2F0" fg="#0A0A0A" />
          <span>75Drawss</span>
        </a>
        <div className="ca-nav-links">
          <a href="#work" className="ca-nav-link">{t('navWork')}<sup>({WORK_COUNT})</sup></a>
          <a href="#process" className="ca-nav-link hide-m">{t('navProcess')}</a>
          <a href="#order" className="ca-nav-link hide-m">{t('navContact')}</a>
          <LanguageSwitcher />
          <a href="#order" className="ca-nav-link ca-nav-order">{t('order')}</a>
        </div>
      </nav>
    </>
  )
}
