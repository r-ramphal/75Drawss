'use client'
import { useState } from 'react'

const faqs = [
  {
    q: 'What products can you make?',
    a: 'We make a wide range of custom products for collectors and creators — TCG binders, deck boxes, display cases and more. If you have something specific in mind just get in touch and we\'ll see what we can do.',
  },
  {
    q: 'How does the ordering process work?',
    a: 'Fill in the order form with your product details and design idea. We\'ll get back to you within 1–2 business days with a quote. Once you approve it and complete payment we start crafting your product.',
  },
  {
    q: 'How long does it take to make my product?',
    a: 'Production typically takes 7–14 business days after payment. Shipping time depends on your location — within the Netherlands usually 1–2 days via PostNL or DHL.',
  },
  {
    q: 'Can I upload my own artwork?',
    a: 'Yes! You can upload your design directly in the order form. We accept JPG, PNG, PDF, AI, PSD and SVG files up to 10MB. The higher the resolution the better the print quality.',
  },
  {
    q: 'What if I don\'t have a design?',
    a: 'No problem — just describe your idea in the order form. Tell us your colours, theme, style and any text you want included and we\'ll create something for you.',
  },
  {
    q: 'Can you make a Pokémon-inspired binder?',
    a: 'Absolutely — we just can\'t print official characters, logos or any trademarked imagery. What we can do is capture the exact aesthetic of any TCG: the colours, energy and style of Pokémon, One Piece, Lorcana, Magic, Yu-Gi-Oh and more, all in original artwork that you actually own. Describe the vibe — favourite colours, era, feel — and we\'ll make something that looks right at home in your collection.',
  },
  {
    q: 'What is the send-in service?',
    a: 'If you already have a product — like a binder — and want it customized, you can send it to us. We\'ll customize it and ship it back. Fill in the order form and select "Customize my product" to get started.',
  },
  {
    q: 'How do I send my product to you?',
    a: 'After we confirm your quote we\'ll send you our address. Pack your product well in a sturdy box with bubble wrap and ship it via PostNL or DHL with a tracking code. For valuable items we recommend aangetekende post.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes! We ship across the Netherlands, France, Germany and Belgium via PostNL and DHL. All orders include tracking so you always know where your product is.',
  },
  {
    q: 'When do I pay?',
    a: 'No payment is required when you submit the form. You only pay after we send you a quote and you approve it. We\'ll send a payment link directly to your email.',
  },
  {
    q: 'Can I order multiple products?',
    a: 'Absolutely — just select your quantity in the order form. For larger orders of 5 or more we may be able to offer a discount, mention it in the special requirements field.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <>
      <style>{`
        .faq-item { border-bottom: 2px solid var(--color-border); }
        .faq-item:first-child { border-top: 2px solid var(--color-border); }
        .faq-btn {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.4rem 0;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          gap: 2rem;
          font-family: var(--font-ui);
          transition: color 0.15s;
        }
        .faq-btn:hover .faq-q { color: var(--color-accent); }
        .faq-q {
          font-size: 0.92rem;
          font-weight: 500;
          color: var(--color-text);
          line-height: 1.4;
          transition: color 0.15s;
        }
        .faq-icon {
          width: 24px;
          height: 24px;
          border: 2px solid var(--color-border);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          color: var(--color-text);
          flex-shrink: 0;
          transition: background 0.15s, color 0.15s, transform 0.2s;
          font-family: var(--font-ui);
          line-height: 1;
        }
        .faq-icon.open {
          background: var(--color-accent);
          transform: rotate(45deg);
        }
        .faq-answer {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          line-height: 1.85;
          font-weight: 400;
          padding-bottom: 1.4rem;
          max-width: 680px;
        }
        .faq-section { padding: 7rem 3rem; }
        @media (max-width: 640px) { .faq-section { padding: 4rem 1.5rem !important; } }
      `}</style>

      <div id="faq" style={{ borderTop: '2px solid var(--color-border)', background: 'var(--color-bg)' }}>
        <section className="faq-section" style={{ maxWidth: '1200px', margin: '0 auto', fontFamily: 'var(--font-ui)' }}>
          <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>FAQ</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '4rem', color: 'var(--color-text)' }}>
            Frequently asked<br/>questions
          </h2>
          <div>
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item">
                <button
                  className="faq-btn"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className="faq-q">{faq.q}</span>
                  <span className={`faq-icon ${open === i ? 'open' : ''}`} aria-hidden="true">+</span>
                </button>
                {open === i && (
                  <p className="faq-answer">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
