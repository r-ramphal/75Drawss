/*
  Concept A — "Index". Black, oversized uppercase grotesk, acid-green accent,
  numbered work index with a cursor-following image. Overrides the global
  design tokens inside its own wrapper so shared components (order form,
  language switcher, FAQ) take the theme automatically.
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
  body { background: #0A0A0A; }
  .ca {
    --color-bg: #0A0A0A;
    --color-surface: #131312;
    --color-text: #F2F2F0;
    --color-text-secondary: #B9B9B2;
    --color-text-muted: #77776F;
    --color-border: rgba(242,242,240,0.14);
    --color-border-strong: rgba(242,242,240,0.34);
    --color-accent: #C6F26B;
    --color-accent-hover: #DAFF8A;
    --color-accent-text: #C6F26B;
    --color-hover-tint: #1B1B19;
    --font-ui: var(--font-archivo), system-ui, sans-serif;
    --font-display: var(--font-archivo), system-ui, sans-serif;
    --radius: 0;
    --shadow-hard: none;
    --shadow-hard-lg: none;
    background: var(--color-bg);
    color: var(--color-text);
    font-family: var(--font-ui);
    overflow-x: clip;
  }
  .ca ::selection { background: var(--color-accent); color: #0A0A0A; }
  .ca-eyebrow {
    font-size: 0.68rem; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--color-text-muted); display: flex; align-items: center; gap: 0.75rem;
  }
  .ca-eyebrow::before { content: ''; width: 22px; height: 1px; background: var(--color-accent); }
  .ca-display {
    font-family: var(--font-display); font-weight: 850; font-stretch: 92%;
    text-transform: uppercase; letter-spacing: -0.035em; line-height: 0.9;
  }
  .ca-wrap { max-width: 1440px; margin: 0 auto; padding: 0 clamp(1.25rem, 4vw, 3.5rem); }
  .ca-btn {
    display: inline-flex; align-items: center; gap: 0.6rem; padding: 1rem 1.6rem;
    font-size: 0.78rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
    text-decoration: none; border: 1px solid var(--color-text); color: var(--color-text);
    transition: background 0.2s, color 0.2s, border-color 0.2s;
  }
  .ca-btn:hover { background: var(--color-text); color: #0A0A0A; }
  .ca-btn.accent { background: var(--color-accent); border-color: var(--color-accent); color: #0A0A0A; }
  .ca-btn.accent:hover { background: var(--color-accent-hover); border-color: var(--color-accent-hover); }
  /* Shared components on the dark theme */
  .ca h2 { font-family: var(--font-display); text-transform: uppercase; font-weight: 800 !important; letter-spacing: -0.03em !important; }
  .ca .lang-btn.active { color: #0A0A0A; }
  .ca .lang-btn:not(.active):hover { background: var(--color-hover-tint); }
  .ca .order-input:focus { background: var(--color-hover-tint) !important; }
  .ca .service-btn.inactive:hover { background: var(--color-hover-tint); }
  .ca .service-btn.active { background: var(--color-accent); color: #0A0A0A; }
  .ca .send-in-box { background: var(--color-surface); }
  .ca .submit-btn { color: #0A0A0A; }
  .ca .faq-icon { color: var(--color-text); }
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
