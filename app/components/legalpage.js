import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import Footer from '@/app/components/footer'

// Shared renderer for the legal pages (privacy, terms). Reads a namespace with
// the shape { title, updated, intro, back, sections: [{ h, p: [...] }] }.
export default async function LegalPage({ locale, namespace }) {
  const t = await getTranslations({ locale, namespace })
  const sections = t.raw('sections')

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', fontFamily: 'var(--font-ui)' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '4rem 1.5rem 5rem' }}>
        <Link href="/" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', textDecoration: 'none', letterSpacing: '0.01em' }}>
          ← {t('back')}
        </Link>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 3.25rem)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.1, color: 'var(--color-text)', marginTop: '2rem' }}>
          {t('title')}
        </h1>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.75rem', fontWeight: 500 }}>
          {t('updated')}
        </p>
        <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.8, marginTop: '1.5rem', fontWeight: 400 }}>
          {t('intro')}
        </p>

        <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
          {sections.map((s, i) => (
            <section key={i}>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-text)', letterSpacing: '-0.01em', marginBottom: '0.75rem' }}>
                {s.h}
              </h2>
              {s.p.map((para, j) => (
                <p key={j} style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.85, fontWeight: 400, whiteSpace: 'pre-line', marginBottom: j < s.p.length - 1 ? '0.85rem' : 0 }}>
                  {para}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
