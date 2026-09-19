'use client'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

/*
  Mobile app chrome for concept A (≤ 960px):
  - a fixed bottom tab bar (Home · Werk · Bestel · Proces · Vragen) whose
    active tab follows the section in view, with safe-area padding for
    phones with a home indicator
  - an install banner: Android/Chrome get the real install prompt, iOS gets
    the "Share → Add to Home Screen" hint. Hidden once installed (standalone)
    or dismissed.
*/
const TABS = [
  { id: 'hero', key: 'tabHome', icon: 'M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z' },
  { id: 'work', key: 'tabWork', icon: 'M4 5h16v14H4zM4 10h16M9 5v14' },
  { id: 'order', key: 'tabOrder', icon: 'M12 5v14M5 12h14', primary: true },
  { id: 'process', key: 'tabProcess', icon: 'M4 7h16M4 12h10M4 17h13' },
  { id: 'faq', key: 'tabFaq', icon: 'M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7M12 17h.01M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z' },
]

function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true
}

export default function AppBar() {
  const t = useTranslations('concept.a')
  const [active, setActive] = useState('hero')
  const [install, setInstall] = useState(null) // null | 'prompt' | 'ios'

  useEffect(() => {
    const sections = TABS.map((tab) => document.getElementById(tab.id)).filter(Boolean)
    const io = new IntersectionObserver((entries) => {
      const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (hit) setActive(hit.target.id)
    }, { rootMargin: '-40% 0px -45% 0px', threshold: [0, 0.2, 0.5] })
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    let dismissed = false
    try { dismissed = localStorage.getItem('pwa-dismissed') === '1' } catch {}
    if (dismissed || isStandalone()) return
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream
    // Decide asynchronously (next tick) so the effect itself never sets state.
    const decide = () => setInstall(ios ? 'ios' : window.__pwaPrompt ? 'prompt' : null)
    const timer = setTimeout(decide, 0)
    const onReady = () => setInstall('prompt')
    window.addEventListener('pwa-installable', onReady)
    return () => { clearTimeout(timer); window.removeEventListener('pwa-installable', onReady) }
  }, [])

  async function doInstall() {
    const p = window.__pwaPrompt
    if (!p) return
    p.prompt()
    const { outcome } = await p.userChoice
    if (outcome === 'accepted') setInstall(null)
    window.__pwaPrompt = null
  }

  function dismiss() {
    setInstall(null)
    try { localStorage.setItem('pwa-dismissed', '1') } catch {}
  }

  return (
    <>
      <style>{`
        .ca-tabbar { display: none; }
        .ca-install { display: none; }
        @media (max-width: 960px) {
          .ca-tabbar {
            position: fixed; left: 0; right: 0; bottom: 0; z-index: 80;
            display: grid; grid-template-columns: repeat(5, 1fr); align-items: end;
            padding: 0.35rem 0.25rem calc(0.35rem + env(safe-area-inset-bottom, 0px));
            background: rgba(250,250,248,0.94); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
            border-top: 1px solid var(--color-border);
          }
          .ca-tab {
            display: flex; flex-direction: column; align-items: center; gap: 0.25rem; padding: 0.35rem 0;
            font-family: var(--font-ui); font-size: 0.62rem; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase;
            color: var(--color-text-muted); text-decoration: none; -webkit-tap-highlight-color: transparent; min-height: 48px; justify-content: end;
          }
          .ca-tab svg { width: 22px; height: 22px; }
          .ca-tab.on { color: var(--color-text); }
          .ca-tab.primary span.ic { width: 46px; height: 46px; border-radius: 50%; background: var(--color-accent); color: #0A0A0A; display: grid; place-items: center; margin-top: -18px; box-shadow: 0 6px 16px rgba(10,10,10,0.18); }
          .ca-tab.primary { color: var(--color-text); }
          .ca-install {
            position: fixed; left: 0.75rem; right: 0.75rem; bottom: calc(66px + env(safe-area-inset-bottom, 0px)); z-index: 79;
            display: grid; grid-template-columns: 40px 1fr auto; gap: 0.75rem; align-items: center;
            background: var(--color-text); color: #fff; padding: 0.75rem 0.85rem; border-radius: 12px; box-shadow: 0 12px 32px rgba(10,10,10,0.25);
            font-family: var(--font-ui);
          }
          .ca-install-ic { width: 40px; height: 40px; border-radius: 9px; background: #fff; color: #0A0A0A; display: grid; place-items: center; font-family: Georgia, serif; font-size: 1.25rem; }
          .ca-install strong { display: block; font-size: 0.82rem; }
          .ca-install small { display: block; font-size: 0.72rem; color: rgba(255,255,255,0.7); line-height: 1.35; margin-top: 0.15rem; }
          .ca-install-btn { background: var(--color-accent); color: #0A0A0A; border: 0; border-radius: 6px; padding: 0.55rem 0.8rem; font: 700 0.68rem var(--font-ui); letter-spacing: 0.08em; text-transform: uppercase; }
          .ca-install-x { background: none; border: 0; color: rgba(255,255,255,0.7); font-size: 1.1rem; padding: 0.3rem; line-height: 1; }
          .ca-install-actions { display: flex; align-items: center; gap: 0.25rem; }
        }
      `}</style>

      <nav className="ca-tabbar" aria-label={t('tabBarLabel')}>
        {TABS.map((tab) => (
          <a key={tab.id} href={`#${tab.id}`} className={`ca-tab ${tab.primary ? 'primary' : ''} ${active === tab.id ? 'on' : ''}`} aria-current={active === tab.id ? 'true' : undefined}>
            <span className="ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={tab.icon} /></svg>
            </span>
            {t(tab.key)}
          </a>
        ))}
      </nav>

      {install && (
        <div className="ca-install" role="status">
          <div className="ca-install-ic" aria-hidden="true">75</div>
          <div>
            <strong>{t('installTitle')}</strong>
            <small>{install === 'ios' ? t('installIos') : t('installBody')}</small>
          </div>
          <div className="ca-install-actions">
            {install === 'prompt' && <button type="button" className="ca-install-btn" onClick={doInstall}>{t('installBtn')}</button>}
            <button type="button" className="ca-install-x" onClick={dismiss} aria-label={t('close')}>×</button>
          </div>
        </div>
      )}
    </>
  )
}
