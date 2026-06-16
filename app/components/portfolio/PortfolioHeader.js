'use client'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import LanguageSwitcher from '../languageswitcher'

// Slim header for the standalone /portfolio page. Unlike the homepage navbar,
// its links point back to the home route (the homepage section anchors don't
// exist on this page).
export default function PortfolioHeader() {
  const t = useTranslations('portfolioPage')

  return (
    <>
      <style>{`
        .ph-wrap {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.1rem clamp(1.5rem, 4vw, 3rem);
          background: rgba(250,250,248,0.9); backdrop-filter: blur(16px);
          border-bottom: 2px solid var(--color-border); font-family: var(--font-ui);
        }
        .ph-brand {
          font-family: var(--font-display); font-size: 1.15rem; font-weight: 400;
          color: var(--color-text); text-decoration: none; letter-spacing: -0.02em;
          display: flex; align-items: baseline; gap: 0.05em;
        }
        .ph-brand .mark { font-family: var(--font-ui); font-weight: 700; font-size: 1.05rem; }
        .ph-right { display: flex; align-items: center; gap: 1.25rem; }
        .ph-back {
          font-size: 0.8rem; font-weight: 500; color: var(--color-text-secondary);
          text-decoration: none; transition: color 0.15s;
        }
        .ph-back:hover { color: var(--color-text); }
        .ph-cta {
          font-size: 0.8rem; font-weight: 600; color: var(--color-text) !important;
          background: var(--color-accent); padding: 0.6rem 1.35rem; border-radius: var(--radius);
          text-decoration: none; border: 1px solid var(--color-accent); white-space: nowrap;
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .ph-cta:hover {
          background: var(--color-accent-hover); border-color: var(--color-accent-hover);
          transform: translateY(-1px); box-shadow: 0 6px 16px rgba(10,10,10,0.12);
        }
        @media (max-width: 560px) {
          .ph-back { display: none; }
          .ph-wrap { padding: 0.85rem 1.1rem; }
          .ph-right { gap: 0.7rem; }
          .ph-cta { padding: 0.5rem 0.9rem; font-size: 0.74rem; }
        }
      `}</style>

      <header className="ph-wrap">
        <Link href="/" className="ph-brand" aria-label="75Drawss home">
          <span className="mark">75</span><span>Drawss</span>
        </Link>
        <div className="ph-right">
          <Link href="/" className="ph-back">← {t('back')}</Link>
          <LanguageSwitcher />
          <Link href="/#order" className="ph-cta">{t('order')}</Link>
        </div>
      </header>
    </>
  )
}
