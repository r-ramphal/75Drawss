/*
  Concept A — "Index", in the original house style: cream background, black
  type, gold accent. Oversized uppercase Archivo for display, Rubik (the
  site's UI font) for body text. Tokens are overridden inside the wrapper so
  shared components (order form, language switcher, FAQ) follow along.
*/
import { Archivo } from 'next/font/google'
import dynamic from 'next/dynamic'
import Nav from './Nav'
import Hero from './Hero'
import Manifesto from './Manifesto'
import Services from './Services'
import Work from './Work'
import Process from './Process'
import SendIn from './SendIn'
import Contact from './Contact'
import Footer from './Footer'

const FAQ = dynamic(() => import('@/app/components/faq'))

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
})

const THEME = `
  body { background: #FAFAF8; }
  .ca {
    --color-bg: #FAFAF8;
    --color-surface: #ffffff;
    --color-text: #0A0A0A;
    --color-text-secondary: #555;
    --color-text-muted: #888;
    --color-border: rgba(10,10,10,0.12);
    --color-border-strong: rgba(10,10,10,0.28);
    --color-accent: #F5B301;
    --color-accent-hover: #D99A00;
    --color-accent-text: #8A5E00;
    --color-hover-tint: #FFFBEB;
    --color-numeral: #D0D0CC;
    --font-ui: var(--font-rubik), system-ui, sans-serif;
    --font-display: var(--font-archivo), system-ui, sans-serif;
    --radius: 6px;
    --shadow-hard: 0 1px 2px rgba(10,10,10,0.04), 0 8px 24px rgba(10,10,10,0.06);
    --shadow-hard-lg: 0 6px 16px rgba(10,10,10,0.07), 0 20px 48px rgba(10,10,10,0.10);
    background: var(--color-bg);
    color: var(--color-text);
    font-family: var(--font-ui);
    overflow-x: clip;
  }
  .ca ::selection { background: var(--color-accent); color: #0A0A0A; }
  .ca-eyebrow {
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--color-text-muted); display: flex; align-items: center; gap: 0.75rem; margin: 0;
  }
  .ca-eyebrow::before { content: ''; width: 22px; height: 2px; background: var(--color-accent); }
  .ca-display {
    font-family: var(--font-display); font-weight: 850; font-stretch: 92%;
    text-transform: uppercase; letter-spacing: -0.035em; line-height: 0.9;
  }
  .ca-wrap { max-width: 1440px; margin: 0 auto; padding: 0 clamp(1.25rem, 4vw, 3.5rem); }
  .ca-btn {
    display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.95rem 1.5rem;
    font-size: 0.78rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    text-decoration: none; border: 1px solid var(--color-text); color: var(--color-text);
    border-radius: var(--radius); background: transparent; cursor: pointer; font-family: var(--font-ui);
    transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.2s;
  }
  .ca-btn:hover { background: var(--color-text); color: #fff; }
  .ca-btn.accent { background: var(--color-accent); border-color: var(--color-accent); color: #0A0A0A; }
  .ca-btn.accent:hover { background: var(--color-accent-hover); border-color: var(--color-accent-hover); color: #0A0A0A; }
  .ca-mark { background: var(--color-accent); color: #0A0A0A; padding: 0 0.12em; box-decoration-break: clone; -webkit-box-decoration-break: clone; }
  /* Shared components in this concept */
  .ca h2 { font-family: var(--font-display); text-transform: uppercase; font-weight: 800 !important; letter-spacing: -0.03em !important; }
  .ca-anim { opacity: 0; }
  @media (prefers-reduced-motion: reduce) { .ca-anim { opacity: 1 !important; } }
`

export default function ConceptA() {
  return (
    <div className={`${archivo.variable} ca`} data-theme="a">
      <style>{THEME}</style>
      <noscript><style>{`.ca-anim { opacity: 1 !important; }`}</style></noscript>
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <Services />
        <Work />
        <Process />
        <SendIn />
        <Contact />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
