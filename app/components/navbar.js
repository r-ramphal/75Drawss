'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import LanguageSwitcher from '@/app/components/languageswitcher'
import { useOverlayHistory } from '@/app/lib/useOverlayHistory'
import { Logo, InstagramIcon, TikTokIcon, INSTAGRAM_URL, TIKTOK_URL, CONTACT_EMAIL, KVK_NUMBER } from '@/app/components/shared/Social'
import { WORK_COUNT } from '@/app/components/shared/work'

/*
  Fixed top bar, used on every page (mounted in the locale layout). Section
  links are locale-prefixed home anchors so they work from subpages too.

  Wide screens: inline links, socials, language switch, order button.
  Phones/tablets (≤ 960px): logo, socials and a burger button that opens a
  full-screen menu. The menu locks page scroll, closes on Escape and on the
  phone's back button (useOverlayHistory), and moves focus in and back out.
*/
export default function Navbar() {
  const t = useTranslations('home')
  const tf = useTranslations('footer')
  const locale = useLocale()
  const router = useRouter()
  const home = `/${locale}`

  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  const closeThen = useOverlayHistory(open, close)
  const burgerRef = useRef(null)
  const closeBtnRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeBtnRef.current?.focus()
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    const burger = burgerRef.current
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
      burger?.focus({ preventScroll: true })
    }
  }, [open])

  // Menu links: close first (clean history), then navigate.
  const go = (href) => (e) => {
    e.preventDefault()
    closeThen(() => router.push(href))
  }

  const items = [
    { href: `${home}#hero`, label: t('tabHome') },
    { href: `${home}#work`, label: t('navWork'), count: WORK_COUNT },
    { href: `${home}#process`, label: t('navProcess') },
    { href: `${home}#send-in`, label: t('sendinEyebrow') },
    { href: `${home}/portfolio`, label: tf('portfolio') },
    { href: `${home}/inspiratie`, label: tf('inspiration') },
    { href: `${home}#faq`, label: t('tabFaq') },
  ]

  const socials = (
    <>
      <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label={tf('instagram')}><InstagramIcon size={18} /></a>
      <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" aria-label={tf('tiktok')}><TikTokIcon size={17} /></a>
    </>
  )

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
        @media (hover: hover) { .nav-social a:hover { background: var(--color-accent); color: var(--color-on-accent); } }
        .nav-order { padding: 0.6rem 1rem; border: 1px solid var(--color-accent); background: var(--color-accent); color: var(--color-on-accent); border-radius: var(--radius); }
        .nav-order::after { display: none; }
        .nav-order:hover { background: var(--color-accent-hover); border-color: var(--color-accent-hover); }

        .nav-burger {
          display: none; width: 44px; height: 44px; margin-right: -0.5rem; align-items: center; justify-content: center;
          background: none; border: 0; color: var(--color-text); cursor: pointer; border-radius: 50%;
        }
        .nav-burger:active { background: var(--color-hover-tint); }
        .nav-burger i { display: block; width: 22px; height: 2px; background: currentColor; border-radius: 2px; box-shadow: 0 7px 0 currentColor, 0 -7px 0 currentColor; }

        .menu { display: none; }
        @media (max-width: 960px) {
          .nav { padding-top: calc(0.4rem + env(safe-area-inset-top, 0px)); padding-bottom: 0.4rem; }
          .nav-links { gap: 0.35rem; }
          .nav-link, .nav-lang { display: none; }
          .nav-burger { display: inline-flex; }

          .menu {
            position: fixed; inset: 0; z-index: 95; display: flex; flex-direction: column;
            padding: calc(0.4rem + env(safe-area-inset-top, 0px)) clamp(1.25rem, 4vw, 3.5rem) calc(1.1rem + env(safe-area-inset-bottom, 0px));
            background: var(--color-bg); overflow-y: auto; overscroll-behavior: contain;
            transform: translateX(100%); visibility: hidden;
            transition: transform 0.32s cubic-bezier(.2,.8,.2,1), visibility 0s linear 0.32s;
          }
          .menu.open { transform: none; visibility: visible; transition: transform 0.32s cubic-bezier(.2,.8,.2,1); }
          .menu-top { display: flex; align-items: center; justify-content: space-between; min-height: 50px; }
          .menu-close { width: 44px; height: 44px; margin-right: -0.5rem; background: none; border: 0; color: var(--color-text); font-size: 1.7rem; line-height: 1; cursor: pointer; border-radius: 50%; }
          .menu-close:active { background: var(--color-hover-tint); }
          .menu-list { list-style: none; margin: 0.9rem 0 0; padding: 0; border-top: 2px solid var(--color-text); }
          .menu-list li { opacity: 0; transform: translateX(18px); transition: opacity 0.3s ease, transform 0.3s ease; }
          .menu.open .menu-list li { opacity: 1; transform: none; transition-delay: calc(var(--i) * 35ms + 120ms); }
          .menu-list a {
            display: grid; grid-template-columns: 2.1rem 1fr auto; align-items: baseline; gap: 0.25rem;
            padding: 0.8rem 0; border-bottom: 1px solid var(--color-border); text-decoration: none; color: var(--color-text);
          }
          .menu-list a:active { background: var(--color-hover-tint); }
          .menu-nr { font-size: 0.66rem; font-weight: 700; letter-spacing: 0.16em; color: var(--color-text-muted); }
          .menu-label { font-size: clamp(1.6rem, 7.6vw, 2.3rem); line-height: 1; }
          .menu-label sup { font-size: 0.38em; color: var(--color-accent-text); letter-spacing: 0; margin-left: 0.25em; vertical-align: top; }
          .menu-arrow { color: var(--color-accent-text); font-size: 1.1rem; }
          .menu-cta { margin-top: 1.1rem; width: 100%; justify-content: center; }
          .menu-foot { margin-top: auto; padding-top: 1.4rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
          .menu-foot .lang-btn { padding: 0.6rem 0.95rem; font-size: 0.8rem; }
          .menu-foot .nav-social a { width: 44px; height: 44px; border: 1px solid var(--color-border-strong); margin-left: 0.4rem; }
          .menu-meta { margin-top: 0.9rem; font-size: 0.72rem; color: var(--color-text-muted); display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
          .menu-meta a { color: var(--color-accent-text); }
          .menu .nav-brand span { display: inline; }
        }
        @media (max-width: 720px) { .nav > .nav-brand span { display: none; } }
      `}</style>

      <nav className="nav" aria-label={t('navLabel')}>
        <a href={home} className="nav-brand" aria-label="75Drawss">
          <Logo className="nav-logo" priority />
          <span>75Drawss</span>
        </a>
        <div className="nav-links">
          <a href={`${home}#work`} className="nav-link">{t('navWork')}<sup>({WORK_COUNT})</sup></a>
          <a href={`${home}#process`} className="nav-link">{t('navProcess')}</a>
          <Link href="/portfolio" className="nav-link">{tf('portfolio')}</Link>
          <Link href="/inspiratie" className="nav-link">{tf('inspiration')}</Link>
          <a href={`${home}#order`} className="nav-link">{t('navContact')}</a>
          <div className="nav-social">{socials}</div>
          <span className="nav-lang"><LanguageSwitcher /></span>
          <a href={`${home}#order`} className="nav-link nav-order">{t('order')}</a>
          <button
            type="button" ref={burgerRef} className="nav-burger"
            aria-label={t('menuOpen')} aria-expanded={open} aria-controls="site-menu"
            onClick={() => setOpen(true)}
          ><i aria-hidden="true" /></button>
        </div>
      </nav>

      <div id="site-menu" className={`menu ${open ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label={t('menuTitle')} inert={!open}>
        <div className="menu-top">
          <a href={home} className="nav-brand" aria-label="75Drawss" onClick={go(`${home}#hero`)}>
            <Logo className="nav-logo" />
            <span>75Drawss</span>
          </a>
          <button type="button" ref={closeBtnRef} className="menu-close" aria-label={t('menuClose')} onClick={close}>×</button>
        </div>

        <ul className="menu-list">
          {items.map((item, i) => (
            <li key={item.href} style={{ '--i': i }}>
              <a href={item.href} onClick={go(item.href)}>
                <span className="menu-nr">{String(i + 1).padStart(2, '0')}</span>
                <span className="site-display menu-label">{item.label}{item.count ? <sup>({item.count})</sup> : null}</span>
                <span className="menu-arrow" aria-hidden="true">→</span>
              </a>
            </li>
          ))}
        </ul>

        <a href={`${home}#order`} className="site-btn accent menu-cta" onClick={go(`${home}#order`)}>{t('ctaPrimary')}</a>

        <div className="menu-foot">
          <LanguageSwitcher />
          <div className="nav-social">{socials}</div>
        </div>
        <div className="menu-meta">
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <span>{tf('kvk', { number: KVK_NUMBER })}</span>
        </div>
      </div>
    </>
  )
}
