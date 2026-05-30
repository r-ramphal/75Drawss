'use client'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'

const locales = [
  { code: 'nl', label: 'NL' },
  { code: 'en', label: 'EN' },
]

export default function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  return (
    <>
      <style>{`
        .lang-switch {
          display: inline-flex;
          border: 2px solid var(--color-border);
          border-radius: 100px;
          overflow: hidden;
          font-family: var(--font-ui);
        }
        .lang-btn {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 0.3rem 0.6rem;
          background: transparent;
          color: var(--color-text-secondary);
          border: none;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
          line-height: 1;
        }
        .lang-btn.active {
          background: var(--color-text);
          color: #fff;
        }
        .lang-btn:not(.active):hover { background: #FFFBEB; color: var(--color-text); }
      `}</style>
      <div className="lang-switch" role="group" aria-label="Language">
        {locales.map(({ code, label }) => (
          <button
            key={code}
            type="button"
            className={`lang-btn ${locale === code ? 'active' : ''}`}
            aria-current={locale === code ? 'true' : undefined}
            onClick={() => router.replace(pathname, { locale: code })}
          >
            {label}
          </button>
        ))}
      </div>
    </>
  )
}
