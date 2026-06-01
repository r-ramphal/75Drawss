import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function NotFound() {
  const t = useTranslations('notFound')
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
        {t('eyebrow')}
      </p>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, letterSpacing: '-0.025em', color: 'var(--color-text)' }}>
        {t('heading')}
      </h2>
      <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', maxWidth: '400px', lineHeight: 1.7 }}>
        {t('body')}
      </p>
      <Link href="/" style={{
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
