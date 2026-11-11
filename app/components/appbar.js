'use client'
import { useEffect, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'

/*
  Mobile app chrome (≤ 960px): a fixed bottom tab bar
  (Home · Werk · Bestel · Proces · Vragen) whose active tab follows the
  section in view, with safe-area padding for phones with a home indicator.
  Mounted in the locale layout; section links are locale-prefixed home
  anchors so the bar also works from subpages. Hidden on wider screens.
*/
const TABS = [
  { id: 'hero', key: 'tabHome', icon: 'M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z' },
  { id: 'work', key: 'tabWork', icon: 'M4 5h16v14H4zM4 10h16M9 5v14' },
  { id: 'order', key: 'tabOrder', icon: 'M12 5v14M5 12h14', primary: true },
  { id: 'process', key: 'tabProcess', icon: 'M4 7h16M4 12h10M4 17h13' },
  { id: 'faq', key: 'tabFaq', icon: 'M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7M12 17h.01M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z' },
]

export default function AppBar() {
  const t = useTranslations('home')
  const locale = useLocale()
  const [active, setActive] = useState(null) // no tab lit on pages without these sections
  const [typing, setTyping] = useState(false) // on-screen keyboard is up

  useEffect(() => {
    const sections = TABS.map((tab) => document.getElementById(tab.id)).filter(Boolean)
    const io = new IntersectionObserver((entries) => {
      const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (hit) setActive(hit.target.id)
    }, { rootMargin: '-40% 0px -45% 0px', threshold: [0, 0.2, 0.5] })
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  // Slide the bar away while a text field has focus, so it never sits on top
  // of the form above the on-screen keyboard.
  useEffect(() => {
    const isField = (el) => el && (el.tagName === 'TEXTAREA' || (el.tagName === 'INPUT' && !['checkbox', 'radio', 'file', 'button', 'submit'].includes(el.type)))
    const onIn = (e) => { if (isField(e.target)) setTyping(true) }
    const onOut = () => setTyping(false)
    document.addEventListener('focusin', onIn)
    document.addEventListener('focusout', onOut)
    return () => { document.removeEventListener('focusin', onIn); document.removeEventListener('focusout', onOut) }
  }, [])

  return (
    <>
      <style>{`
        .site-tabbar { display: none; }
        @media (max-width: 960px) {
          .site-tabbar {
            position: fixed; left: 0; right: 0; bottom: 0; z-index: 80;
            display: grid; grid-template-columns: repeat(5, 1fr); align-items: end;
            padding: 0.35rem 0.25rem calc(0.35rem + env(safe-area-inset-bottom, 0px));
            background: rgba(250,250,248,0.94); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
            border-top: 1px solid var(--color-border);
            transition: transform 0.22s ease;
          }
          .site-tabbar.typing { transform: translateY(120%); }
          .site-tab .ic { transition: transform 0.12s ease; }
          .site-tab:active .ic { transform: scale(0.9); }
          .site-tab {
            display: flex; flex-direction: column; align-items: center; justify-content: end; gap: 0.25rem; padding: 0.35rem 0;
            min-height: 48px; font-family: var(--font-ui); font-size: 0.62rem; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase;
            color: var(--color-text-muted); text-decoration: none; -webkit-tap-highlight-color: transparent;
          }
          .site-tab svg { width: 22px; height: 22px; }
          .site-tab.on { color: var(--color-text); }
          .site-tab.primary { color: var(--color-text); }
          .site-tab.primary .ic { width: 46px; height: 46px; border-radius: 50%; background: var(--color-accent); color: var(--color-on-accent); display: grid; place-items: center; margin-top: -18px; box-shadow: 0 6px 16px rgba(10,10,10,0.18); }
        }
      `}</style>
      <nav className={`site-tabbar ${typing ? 'typing' : ''}`} aria-label={t('tabBarLabel')}>
        {TABS.map((tab) => (
          <a key={tab.id} href={`/${locale}#${tab.id}`} className={`site-tab ${tab.primary ? 'primary' : ''} ${active === tab.id ? 'on' : ''}`} aria-current={active === tab.id ? 'true' : undefined}>
            <span className="ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={tab.icon} /></svg>
            </span>
            {t(tab.key)}
          </a>
        ))}
      </nav>
    </>
  )
}
