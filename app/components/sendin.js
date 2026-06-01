import { useTranslations } from 'next-intl'

const IconPackage = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16.5 9.4 7.55 4.24"/>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 1 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.29 7 12 12 20.71 7"/>
    <line x1="12" x2="12" y1="22" y2="12"/>
  </svg>
)

const IconSearch = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
)

const IconReturn = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 14 4 9l5-5"/>
    <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11"/>
  </svg>
)

const infoIcons = [IconPackage, IconSearch, IconReturn]
const stepNums = ['01', '02', '03']

export default function SendIn() {
  const t = useTranslations('sendIn')
  const steps = t.raw('steps')
  const info = t.raw('info')

  return (
    <>
      <style>{`
        .sendin-section { padding: 7rem 3rem; }
        .sendin-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border: 2px solid var(--color-border);
          margin-bottom: 1.5rem;
          box-shadow: var(--shadow-hard);
        }
        .sendin-step {
          padding: 2.5rem 2rem;
          border-right: 2px solid var(--color-border);
          background: var(--color-surface);
          transition: background 0.2s;
        }
        .sendin-step:last-child { border-right: none; }
        .sendin-step:hover { background: #FFFBEB; }
        .sendin-info {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          background: var(--color-border);
          border: 2px solid var(--color-border);
          box-shadow: var(--shadow-hard);
        }
        .sendin-info-item {
          background: var(--color-surface);
          padding: 2rem;
          transition: background 0.2s;
        }
        .sendin-info-item:hover { background: #FFFBEB; }
        .sendin-cta {
          background: var(--color-accent);
          color: var(--color-text);
          font-size: 0.875rem;
          font-weight: 600;
          padding: 0.9rem 2rem;
          border-radius: var(--radius);
          text-decoration: none;
          flex-shrink: 0;
          border: 1px solid var(--color-accent);
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          display: inline-block;
        }
        .sendin-cta:hover { background: var(--color-accent-hover); border-color: var(--color-accent-hover); transform: translateY(-1px); box-shadow: 0 8px 20px rgba(10,10,10,0.12); }
        .sendin-icon {
          width: 40px;
          height: 40px;
          background: var(--color-accent);
          border-radius: var(--radius);
          border: 1px solid var(--color-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.875rem;
          color: var(--color-text);
          flex-shrink: 0;
        }
        @media (max-width: 768px) {
          .sendin-section { padding: 4rem 1.5rem !important; }
          .sendin-steps { grid-template-columns: 1fr !important; }
          .sendin-step { border-right: none !important; border-bottom: 2px solid var(--color-border); }
          .sendin-step:last-child { border-bottom: none; }
          .sendin-info { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div id="send-in" style={{ borderTop: '2px solid var(--color-border)', background: 'var(--color-bg)' }}>
        <section className="sendin-section" style={{ maxWidth: '1200px', margin: '0 auto', fontFamily: 'var(--font-ui)' }}>
          <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>{t('eyebrow')}</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.1, color: 'var(--color-text)' }}>
              {t('titleLine')}<br/>{t('titlePrefix')} <em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>{t('titleEmphasis')}</em>
            </h2>
            <a href="#order" className="sendin-cta">
              {t('cta')}
            </a>
          </div>

          <div className="sendin-steps">
            {steps.map((step, i) => (
              <div key={i} className="sendin-step">
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.75rem', fontWeight: 300, color: '#D0D0CC', lineHeight: 1, marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>{stepNums[i]}</div>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text)', letterSpacing: '-0.01em' }}>{step.title}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, fontWeight: 400 }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="sendin-info">
            {info.map((item, i) => {
              const Icon = infoIcons[i]
              return (
                <div key={i} className="sendin-info-item">
                  <div className="sendin-icon"><Icon /></div>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--color-text)', letterSpacing: '-0.01em' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, fontWeight: 400 }}>{item.desc}</p>
                </div>
              )
            })}
          </div>

        </section>
      </div>
    </>
  )
}
