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
    q: 'Can you use copyrighted characters like Pokémon?',
    a: 'We work with original artwork only. If you want a design inspired by a TCG aesthetic we\'ll create something original that captures the feel without using copyrighted characters. You can also upload your own original artwork.',
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
        .faq-item { border-bottom: 1px solid #000; }
        .faq-item:first-child { border-top: 1px solid #000; }
        .faq-btn { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 0; background: none; border: none; cursor: pointer; text-align: left; gap: 2rem; }
        .faq-q { font-size: 0.95rem; font-weight: 500; color: #000; font-family: inherit; line-height: 1.4; }
        .faq-icon { font-size: 1.2rem; color: #000; flex-shrink: 0; transition: transform 0.2s; font-family: inherit; }
        .faq-icon.open { transform: rotate(45deg); }
        .faq-answer { font-size: 0.875rem; color: #555; line-height: 1.8; font-weight: 300; padding-bottom: 1.5rem; max-width: 680px; }
        .faq-section { padding: 7rem 3rem; }
        @media (max-width: 640px) { .faq-section { padding: 4rem 1.5rem !important; } }
      `}</style>

      <div id="faq" style={{ borderTop: '1px solid #000', background: '#fff' }}>
        <section className="faq-section" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#999', marginBottom: '1rem' }}>FAQ</p>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '4rem', color: '#000' }}>
            Frequently asked<br/>questions
          </h2>
          <div>
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item">
                <button className="faq-btn" onClick={() => setOpen(open === i ? null : i)}>
                  <span className="faq-q">{faq.q}</span>
                  <span className={`faq-icon ${open === i ? 'open' : ''}`}>+</span>
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