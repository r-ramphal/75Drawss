import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'thankYou' })
  return {
    title: t('title'),
    robots: { index: false, follow: false },
  }
}

export default async function Bedankt({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'thankYou' })

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: 'var(--font-ui)',
      background: 'var(--color-bg)',
      gap: '1.5rem',
      textAlign: 'center',
    }}>
      <div style={{
        width: 56, height: 56, borderRadius: '50%',
        background: 'var(--color-accent)',
        border: '1px solid var(--color-accent)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '0.5rem',
      }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--color-text)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 6 9 17l-5-5"/>
        </svg>
      </div>

      <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
        {t('eyebrow')}
      </p>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 300, letterSpacing: '-0.025em', color: 'var(--color-text)', lineHeight: 1.05 }}>
        {t('heading')}
      </h1>
      <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', maxWidth: '440px', lineHeight: 1.75 }}>
        {t('body')}
      </p>

      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.7rem',
        maxWidth: '440px',
        textAlign: 'left',
        background: 'var(--color-accent-soft, rgba(245, 179, 1, 0.12))',
        border: '1px solid var(--color-accent)',
        borderRadius: 'var(--radius)',
        padding: '0.95rem 1.1rem',
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, marginTop: '0.1rem' }}>
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text)', lineHeight: 1.6, margin: 0 }}>
          {t('mailNote')}
        </p>
      </div>

      <Link href="/" style={{
        marginTop: '0.5rem',
        background: 'var(--color-accent)',
        color: 'var(--color-text)',
        fontSize: '0.9rem',
        fontWeight: 600,
        padding: '0.95rem 2.1rem',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--color-accent)',
        textDecoration: 'none',
        display: 'inline-block',
        fontFamily: 'var(--font-ui)',
      }}>
        {t('back')}
      </Link>
    </div>
  )
}
