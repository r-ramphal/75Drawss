import Link from 'next/link'

export const metadata = {
  title: 'Thank you — order received',
  // Keep the thank-you page out of search results
  robots: { index: false, follow: false },
}

export default function Bedankt() {
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
      {/* Success badge */}
      <div style={{
        width: 56, height: 56, borderRadius: '50%',
        background: 'var(--color-accent)',
        border: '2px solid var(--color-border)',
        boxShadow: '4px 4px 0 var(--color-border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '0.5rem',
      }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--color-text)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 6 9 17l-5-5"/>
        </svg>
      </div>

      <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
        Order received
      </p>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 300, letterSpacing: '-0.025em', color: 'var(--color-text)', lineHeight: 1.05 }}>
        Thank you!
      </h1>
      <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', maxWidth: '440px', lineHeight: 1.75 }}>
        We&apos;ve received your request and will get back to you within 1–2 business days with a quote. Keep an eye on your inbox — check your spam folder just in case.
      </p>

      <Link href="/" style={{
        marginTop: '0.5rem',
        background: 'var(--color-accent)',
        color: 'var(--color-text)',
        fontSize: '0.9rem',
        fontWeight: 600,
        padding: '0.9rem 2.25rem',
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
