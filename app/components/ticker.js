import { useTranslations } from 'next-intl'

export default function Ticker() {
  const t = useTranslations('ticker')
  const labels = t.raw('items')

  // Interleave with separators, then duplicate for a seamless loop
  const base = []
  labels.forEach((label) => { base.push(label, '·') })
  const track = [...base, ...base]

  return (
    <>
      <style>{`
        @keyframes tick { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ticker-track {
          display: flex;
          gap: 2.5rem;
          animation: tick 28s linear infinite;
          white-space: nowrap;
        }
      `}</style>
      <div style={{
        overflow: 'hidden',
        borderTop: '2px solid var(--color-border)',
        borderBottom: '2px solid var(--color-border)',
        padding: '0.85rem 0',
        background: 'var(--color-text)',
      }}>
        <div className="ticker-track">
          {track.map((item, i) => (
            <span key={i} style={{
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: item === '·' ? 'var(--color-accent)' : '#ffffff',
              flexShrink: 0,
              fontFamily: 'var(--font-ui)',
            }}>{item}</span>
          ))}
        </div>
      </div>
    </>
  )
}
