export default function Ticker() {
  const items = [
    'Pokémon', '·', 'Magic: The Gathering', '·', 'Yu-Gi-Oh!', '·',
    'One Piece TCG', '·', 'Lorcana', '·', 'Flesh and Blood', '·',
    'Custom sizes', '·', 'Ships NL & worldwide', '·',
    'Pokémon', '·', 'Magic: The Gathering', '·', 'Yu-Gi-Oh!', '·',
    'One Piece TCG', '·', 'Lorcana', '·', 'Flesh and Blood', '·',
    'Custom sizes', '·', 'Ships NL & worldwide', '·',
  ]
  return (
    <>
      <style>{`
        @keyframes tick { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ticker-track { display: flex; gap: 3rem; animation: tick 24s linear infinite; white-space: nowrap; }
      `}</style>
      <div style={{ overflow: 'hidden', borderTop: '1px solid #000', borderBottom: '1px solid #000', padding: '0.9rem 0', background: '#fff' }}>
        <div className="ticker-track">
          {items.map((item, i) => (
            <span key={i} style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.13em', textTransform: 'uppercase', color: '#000', flexShrink: 0 }}>{item}</span>
          ))}
        </div>
      </div>
    </>
  )
}