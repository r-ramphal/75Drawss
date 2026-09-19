'use client'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import LanguageSwitcher from '@/app/components/languageswitcher'
import { Logo75 } from '../shared/Social'

const ANCHORS = ['#products', '/portfolio', '#process', '#faq']

export default function Nav() {
  const t = useTranslations('concept.c')
  const locale = useLocale()
  const menu = t.raw('navMenu')

  return (
    <>
      <style>{`
        .cc-nav {
          position: sticky; top: 0; z-index: 60; background: rgba(243,238,228,0.92); backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--color-border);
        }
        .cc-nav-in { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 1rem; padding: 0.9rem 0; }
        .cc-nav-menu { display: flex; gap: 1.5rem; }
        .cc-nav-menu a { font-size: 0.8rem; font-weight: 500; color: var(--color-text-secondary); text-decoration: none; }
        .cc-nav-menu a:hover { color: var(--color-accent); }
        .cc-nav-brand { display: flex; align-items: center; gap: 0.6rem; text-decoration: none; color: var(--color-ink); }
        .cc-nav-brand span { font-family: var(--font-display); font-style: italic; font-size: 1.5rem; letter-spacing: -0.02em; }
        .cc-nav-right { display: flex; justify-content: end; align-items: center; gap: 1rem; }
        .cc-nav-order { padding: 0.55rem 1rem; font-size: 0.74rem; }
        @media (max-width: 800px) {
          .cc-nav-in { grid-template-columns: auto 1fr; }
          .cc-nav-menu { display: none; }
          .cc-nav-order { display: none; }
        }
      `}</style>
      <nav className="cc-nav" aria-label="Concept C">
        <div className="cc-wrap cc-nav-in">
          <div className="cc-nav-menu">
            {menu.map((label, i) => ANCHORS[i].startsWith('#')
              ? <a key={label} href={ANCHORS[i]}>{label}</a>
              : <Link key={label} href={ANCHORS[i]}>{label}</Link>)}
          </div>
          <a href={`/${locale}/concept/c`} className="cc-nav-brand" aria-label="75Drawss">
            <Logo75 size={28} bg="#15130F" fg="#F3EEE4" />
            <span>75Drawss</span>
          </a>
          <div className="cc-nav-right">
            <LanguageSwitcher />
            <a href="#order" className="cc-btn ink cc-nav-order">{t('order')}</a>
          </div>
        </div>
      </nav>
    </>
  )
}
