import Link from 'next/link'

export default function NotFound() {
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
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div aria-hidden="true" style={{
        position: 'absolute',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(12rem, 35vw, 30rem)',
        fontWeight: 300,
        color: 'var(--color-text)',
        opacity: 0.04,
        lineHeight: 1,
        userSelect: 'none',
        letterSpacing: '-0.05em',
      }}>404</div>
      <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
        Page not found
      </p>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, letterSpacing: '-0.025em', color: 'var(--color-text)' }}>
        Nothing here
      </h2>
      <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', maxWidth: '400px', lineHeight: 1.7 }}>
        The page you're looking for doesn't exist. Head back home to browse our products.
      </p>
      <Link href="/" style={{
        background: 'var(--color-accent)',
        color: 'var(--color-text)',
        fontSize: '0.875rem',
        fontWeight: 600,
        padding: '0.875rem 2rem',
        borderRadius: '100px',
        border: '2px solid var(--color-border)',
        boxShadow: '4px 4px 0 var(--color-border)',
        textDecoration: 'none',
        display: 'inline-block',
        fontFamily: 'var(--font-ui)',
      }}>
        Back to home →
      </Link>
    </div>
  )
}
