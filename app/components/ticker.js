export default function Ticker() {
  const items = [
    'Custom Binders', '·', 'Deck Boxes', '·', 'Card Sleeves', '·',
    'Display Cases', '·', 'Custom Packaging', '·', 'TCG Accessories', '·',
    'Made in the Netherlands', '·',
  ]
  // Duplicate for seamless infinite loop
  const track = [...items, ...items]
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
