'use client'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import LanguageSwitcher from '@/app/components/languageswitcher'
import { Logo, InstagramIcon, TikTokIcon, INSTAGRAM_URL, TIKTOK_URL } from '@/app/components/shared/Social'
import { WORK_COUNT } from '@/app/components/shared/work'

/*
  Fixed top bar, used on every page (mounted in the locale layout). Section
  links are locale-prefixed home anchors so they work from subpages too. On
  phones the order button is hidden: the bottom tab bar carries that action.
*/
export default function Navbar() {
  const t = useTranslations('home')
  const tf = useTranslations('footer')
  const locale = useLocale()
  const home = `/${locale}`

  return (
    <>
      <style>{`
        .nav {
          position: fixed; inset: 0 0 auto 0; z-index: 60;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.6rem clamp(1.25rem, 4vw, 3.5rem);
          background: rgba(250,250,248,0.92); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--color-border);
        }
        .nav-brand { display: flex; align-items: center; gap: 0.6rem; text-decoration: none; color: var(--color-text); }
        .nav-logo { display: block; height: 42px; width: auto; }
        .nav-brand span { font-weight: 800; letter-spacing: -0.02em; font-size: 1.05rem; }
        .nav-links { display: flex; align-items: center; gap: 1.75rem; }
        .nav-link {
          font-size: 0.72rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--color-text); text-decoration: none; position: relative; white-space: nowrap;
        }
        .nav-link sup { color: var(--color-accent-text); font-size: 0.6em; margin-left: 0.15em; }
        .nav-link::after {
          content: ''; position: absolute; left: 0; right: 0; bottom: -4px; height: 1px;
          background: var(--color-accent); transform: scaleX(0); transform-origin: left; transition: transform 0.25s;
        }
        .nav-link:hover::after { transform: scaleX(1); }
        .nav-social { display: flex; align-items: center; gap: 0.15rem; }
        .nav-social a { display: inline-flex; width: 34px; height: 34px; align-items: center; justify-content: center; border-radius: 50%; color: var(--color-text); transition: background 0.15s, color 0.15s; }
        .nav-social a:hover { background: var(--color-accent); color: var(--color-on-accent); }
        .nav-order { padding: 0.6rem 1rem; border: 1px solid var(--color-accent); background: var(--color-accent); color: var(--color-on-accent); border-radius: var(--radius); }
        .nav-order::after { display: none; }
        .nav-order:hover { background: var(--color-accent-hover); border-color: var(--color-accent-hover); }
        @media (max-width: 960px) {
          .nav-link.hide-m { display: none; }
          .nav-order { display: none; } /* the bottom tab bar carries the order action */
          .nav { padding-top: 0.5rem; padding-bottom: 0.5rem; }
        }
        @media (max-width: 720px) {
          .nav-links { gap: 0.6rem; }
          .nav-brand span { display: none; }
        }
      `}</style>
      <nav className="nav" aria-label={t('navLabel')}>
        <a href={home} className="nav-brand" aria-label="75Drawss">
          <Logo className="nav-logo" priority />
          <span>75Drawss</span>
        </a>
        <div className="nav-links">
          <a href={`${home}#work`} className="nav-link">{t('navWork')}<sup>({WORK_COUNT})</sup></a>
          <a href={`${home}#process`} className="nav-link hide-m">{t('navProcess')}</a>
          <Link href="/portfolio" className="nav-link hide-m">{tf('portfolio')}</Link>
          <Link href="/inspiratie" className="nav-link hide-m">{tf('inspiration')}</Link>
          <a href={`${home}#order`} className="nav-link hide-m">{t('navContact')}</a>
          <div className="nav-social">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label={tf('instagram')}><InstagramIcon size={18} /></a>
            <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" aria-label={tf('tiktok')}><TikTokIcon size={17} /></a>
          </div>
          <LanguageSwitcher />
          <a href={`${home}#order`} className="nav-link nav-order">{t('order')}</a>
        </div>
      </nav>
    </>
  )
}
