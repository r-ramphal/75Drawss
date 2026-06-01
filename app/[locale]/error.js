'use client'
import { useEffect } from 'react'
import { useTranslations } from 'next-intl'

export default function Error({ error, reset }) {
  const t = useTranslations('error')

  useEffect(() => {
    console.error(error)
  }, [error])

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
      <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
        {t('eyebrow')}
      </p>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, letterSpacing: '-0.025em', color: 'var(--color-text)' }}>
        {t('heading')}
      </h2>
      <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', maxWidth: '400px', lineHeight: 1.7 }}>
        {t('body')}
      </p>
      <button
        onClick={reset}
        style={{
          background: 'var(--color-accent)',
          color: 'var(--color-text)',
          fontSize: '0.875rem',
          fontWeight: 600,
          padding: '0.95rem 2rem',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--color-accent)',
          cursor: 'pointer',
          fontFamily: 'var(--font-ui)',
        }}
      >
        {t('retry')}
      </button>
    </div>
  )
}
