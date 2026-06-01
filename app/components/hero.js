import { useTranslations } from 'next-intl'

const chips = ['Pokémon', 'One Piece', 'Lorcana']

export default function Hero() {
  const t = useTranslations('hero')
  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollBob {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50%      { transform: translateY(6px); opacity: 1; }
        }

        .hero-eyebrow { animation: fadeUp 0.6s ease both 0.1s; }
        .hero-h1      { animation: fadeUp 0.6s ease both 0.2s; }
        .hero-desc    { animation: fadeUp 0.6s ease both 0.3s; }
        .hero-chips   { animation: fadeUp 0.6s ease both 0.4s; }
        .hero-actions { animation: fadeUp 0.6s ease both 0.5s; }
        .hero-stats   { animation: fadeUp 0.6s ease both 0.6s; }
        .hero-scroll  { animation: fadeUp 0.6s ease both 0.8s; }

        .btn-primary {
          background: var(--color-accent); color: var(--color-text);
          font-size: 0.9rem; font-weight: 600; padding: 0.9rem 2.25rem;
          border-radius: 100px; text-decoration: none;
          border: 2px solid var(--color-border); box-shadow: 4px 4px 0 var(--color-border);
          transition: box-shadow 0.15s, transform 0.15s;
          white-space: nowrap; display: inline-block; font-family: var(--font-ui);
        }
        .btn-primary:hover { box-shadow: none; transform: translate(4px, 4px); }
        .btn-outline {
          background: transparent; color: var(--color-text);
          font-size: 0.9rem; font-weight: 500; padding: 0.9rem 2.25rem;
          border-radius: 100px; text-decoration: none;
          border: 2px solid var(--color-border);
          transition: background 0.15s, color 0.15s;
          white-space: nowrap; display: inline-block; font-family: var(--font-ui);
        }
        .btn-outline:hover { background: var(--color-text); color: #fff; }

        .hero-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-size: 0.65rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase;
          background: var(--color-accent); color: var(--color-text);
          border: 2px solid var(--color-border); padding: 0.28rem 0.85rem; border-radius: 100px;
          font-family: var(--font-ui);
        }
        .hero-stat { font-size: 0.72rem; font-weight: 500; color: var(--color-text-muted); font-family: var(--font-ui); letter-spacing: 0.04em; }
        .hero-stat strong { color: var(--color-text); font-weight: 700; margin-right: 0.3em; }

        .hero-section {
          min-height: 92vh; display: flex; flex-direction: column;
          align-items: center; justify-content: center; text-align: center;
          padding: 8rem 1.5rem 4rem; max-width: 820px; margin: 0 auto; position: relative;
        }

        @media (max-width: 640px) {
          .hero-section { min-height: 88vh; padding: 7rem 1.25rem 3rem; }
        }
      `}</style>

      <div style={{ background: 'var(--color-bg)', position: 'relative', overflow: 'hidden' }}>
        <section className="hero-section">
          <div className="hero-eyebrow" style={{ marginBottom: '1.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div className="hero-badge">
              <span style={{ width: 5, height: 5, background: 'var(--color-text)', borderRadius: '50%', display: 'block' }} />
              {t('badge')}
            </div>
            <span style={{ fontSize: '0.68rem', fontWeight: 500, color: 'var(--color-text-muted)', letterSpacing: '0.08em', fontFamily: 'var(--font-ui)' }}>
              {t('madeIn')}
            </span>
          </div>

          <h1 className="hero-h1" style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 300, lineHeight: 1.02, letterSpacing: '-0.035em',
            color: 'var(--color-text)', marginBottom: '1.75rem',
          }}>
            {t('titleLine')}<br/>
            <em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>{t('titleEmphasis')}</em>
          </h1>

          <p className="hero-desc" style={{
            fontSize: '1.05rem', fontWeight: 400, color: 'var(--color-text-secondary)',
            lineHeight: 1.8, maxWidth: '480px', marginBottom: '2rem', fontFamily: 'var(--font-ui)',
          }}>
            {t('description')}
          </p>

          <div className="hero-chips" style={{ marginBottom: '2.5rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '520px' }}>
            {chips.map(game => (
              <span key={game} style={{
                fontSize: '0.72rem', fontWeight: 500, color: 'var(--color-text-secondary)',
                border: '1.5px solid rgba(10,10,10,0.18)', padding: '0.22rem 0.65rem',
                borderRadius: '100px', fontFamily: 'var(--font-ui)', background: 'var(--color-surface)', letterSpacing: '0.01em',
              }}>{game}</span>
            ))}
          </div>

          <div className="hero-actions" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem' }}>
            <a href="#order" className="btn-primary">{t('ctaPrimary')}</a>
            <a href="#products" className="btn-outline">{t('ctaSecondary')}</a>
          </div>

          <div className="hero-stats" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', paddingTop: '1.75rem', borderTop: '1px solid rgba(10,10,10,0.1)' }}>
            <span className="hero-stat"><strong>{t('stat1Value')}</strong>{t('stat1Label')}</span>
            <span className="hero-stat"><strong>{t('stat2Value')}</strong>{t('stat2Label')}</span>
            <span className="hero-stat"><strong>{t('stat3Value')}</strong>{t('stat3Label')}</span>
          </div>

          <a href="#products" className="hero-scroll" aria-label={t('scrollAria')} style={{
            position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
            color: 'var(--color-text-muted)', textDecoration: 'none',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'scrollBob 1.8s ease-in-out infinite' }} aria-hidden="true">
              <path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>
            </svg>
          </a>
        </section>
      </div>
    </>
  )
}
