'use client'
import { useEffect } from 'react'

export default function Error({ error, reset }) {
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
        Something went wrong
      </p>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, letterSpacing: '-0.025em', color: 'var(--color-text)' }}>
        Unexpected error
      </h2>
      <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', maxWidth: '400px', lineHeight: 1.7 }}>
        Something went wrong on our end. Try refreshing the page or come back in a moment.
      </p>
      <button
        onClick={reset}
        style={{
          background: 'var(--color-accent)',
          color: 'var(--color-text)',
          fontSize: '0.875rem',
          fontWeight: 600,
          padding: '0.875rem 2rem',
          borderRadius: '100px',
          border: '2px solid var(--color-border)',
          boxShadow: '4px 4px 0 var(--color-border)',
          cursor: 'pointer',
          fontFamily: 'var(--font-ui)',
        }}
      >
        Try again
      </button>
    </div>
  )
}
