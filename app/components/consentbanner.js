'use client'
/*
  Lightweight cookie-consent banner. Shows once until the visitor chooses.
  "Accept" -> ad pixels (Meta/TikTok) may load; "Reject" -> only the cookieless
  Vercel Analytics keeps running. Choice is stored in localStorage.
*/
import { useSyncExternalStore } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { getConsent, setConsent, CONSENT_EVENT } from '@/app/lib/consent'

// Subscribe to consent changes (our own event + cross-tab storage events).
function subscribe(callback) {
  window.addEventListener(CONSENT_EVENT, callback)
  window.addEventListener('storage', callback)
  return () => {
    window.removeEventListener(CONSENT_EVENT, callback)
    window.removeEventListener('storage', callback)
  }
}

export default function ConsentBanner() {
  const t = useTranslations('consent')
  // null on the server and until a choice is made; 'granted' | 'denied' after.
  const consent = useSyncExternalStore(subscribe, getConsent, () => null)

  if (consent) return null

  const choose = (value) => setConsent(value)

  return (
    <div className="consent" role="dialog" aria-label={t('aria')} aria-live="polite">
      <style>{`
        .consent {
          position: fixed; left: 1rem; bottom: 1rem; z-index: 1000;
          width: min(420px, calc(100vw - 2rem));
          background: var(--color-surface); color: var(--color-text);
          border: 2px solid var(--color-border);
          box-shadow: var(--shadow-hard-lg);
          border-radius: var(--radius);
          padding: 1.1rem 1.2rem 1.2rem;
          font-family: var(--font-ui);
        }
        .consent-text { margin: 0 0 0.9rem; font-size: 0.82rem; line-height: 1.65; color: var(--color-text-secondary); }
        .consent-link { color: var(--color-text); text-decoration: underline; }
        .consent-actions { display: flex; gap: 0.6rem; justify-content: flex-end; }
        .consent-btn {
          font-family: var(--font-ui); font-size: 0.82rem; font-weight: 600;
          padding: 0.55rem 1.1rem; border-radius: var(--radius); cursor: pointer;
          border: 1px solid var(--color-border-strong); background: transparent;
          color: var(--color-text); transition: background 0.15s ease, border-color 0.15s ease;
        }
        .consent-reject:hover { background: var(--color-bg); }
        .consent-accept {
          background: var(--color-accent); border-color: var(--color-accent);
        }
        .consent-accept:hover { background: var(--color-accent-hover); border-color: var(--color-accent-hover); }
        @media (max-width: 520px) {
          .consent { left: 0.75rem; right: 0.75rem; bottom: 0.75rem; width: auto; }
        }
      `}</style>
      <p className="consent-text">
        {t('text')} <Link href="/privacy" className="consent-link">{t('more')}</Link>
      </p>
      <div className="consent-actions">
        <button type="button" className="consent-btn consent-reject" onClick={() => choose('denied')}>
          {t('reject')}
        </button>
        <button type="button" className="consent-btn consent-accept" onClick={() => choose('granted')}>
          {t('accept')}
        </button>
      </div>
    </div>
  )
}
