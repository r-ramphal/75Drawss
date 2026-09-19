/*
  Concept C — "Paper". Warm paper background, ink text, ultramarine accent,
  italic serif display (Fraunces) with a clean sans (Instrument Sans).
  Full-bleed hero photo, alternating editorial modules, product carousel,
  masonry gallery, numbered timeline. Light in mood and in motion.
*/
import { Fraunces, Instrument_Sans } from 'next/font/google'
import dynamic from 'next/dynamic'
import Nav from './Nav'
import Hero from './Hero'
import Modules from './Modules'
import Range from './Range'
import Gallery from './Gallery'
import Process from './Process'
import Contact from './Contact'
import Footer from './Footer'
import Ticker from '@/app/components/ticker'

const FAQ = dynamic(() => import('@/app/components/faq'))

const fraunces = Fraunces({ subsets: ['latin'], style: ['normal', 'italic'], axes: ['opsz', 'SOFT'], variable: '--font-fraunces', display: 'swap' })
const instrument = Instrument_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-instrument', display: 'swap' })

const THEME = `
  body { background: #F3EEE4; }
  .cc {
    --color-bg: #F3EEE4;
    --color-surface: #FBF8F2;
    --color-sand: #E6DFCF;
    --color-ink: #15130F;
    --color-text: #15130F;
    --color-text-secondary: #4F4A42;
    --color-text-muted: #8A8378;
    --color-border: rgba(21,19,15,0.14);
    --color-border-strong: rgba(21,19,15,0.32);
    --color-accent: #1E2FA8;
    --color-accent-hover: #16238A;
    --color-accent-text: #1E2FA8;
    --color-gold: #F5B301;
    --color-hover-tint: #ECE5D6;
    --font-ui: var(--font-instrument), system-ui, sans-serif;
    --font-display: var(--font-fraunces), Georgia, serif;
    --radius: 0;
    --shadow-hard: none;
    --shadow-hard-lg: 0 24px 60px rgba(21,19,15,0.10);
    background: var(--color-bg);
    color: var(--color-text);
    font-family: var(--font-ui);
    overflow-x: clip;
  }
  .cc ::selection { background: var(--color-accent); color: #F3EEE4; }
  .cc-wrap { max-width: 1360px; margin: 0 auto; padding: 0 clamp(1.25rem, 4vw, 3rem); }
  .cc-eyebrow { font-family: var(--font-display); font-style: italic; font-size: 1.05rem; color: var(--color-accent); margin: 0 0 0.75rem; font-variation-settings: 'opsz' 14; }
  .cc-display { font-family: var(--font-display); font-style: italic; font-weight: 400; letter-spacing: -0.02em; line-height: 1.02; font-variation-settings: 'opsz' 144, 'SOFT' 40; }
  .cc-btn {
    display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.95rem 1.5rem;
    font-size: 0.82rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase;
    text-decoration: none; border: 1px solid var(--color-ink); color: var(--color-ink); background: transparent;
    transition: background 0.2s, color 0.2s;
  }
  .cc-btn:hover { background: var(--color-ink); color: var(--color-bg); }
  .cc-btn.ink { background: var(--color-ink); color: var(--color-bg); }
  .cc-btn.ink:hover { background: var(--color-accent); border-color: var(--color-accent); }
  .cc-link { color: var(--color-accent); text-decoration: none; font-weight: 600; border-bottom: 1px solid currentColor; padding-bottom: 2px; }
  .cc-link:hover { color: var(--color-ink); }
  /* Shared components on the theme */
  .cc h2 { font-family: var(--font-display); font-style: italic; font-weight: 400 !important; }
  .cc .submit-btn { background: var(--color-ink); border-color: var(--color-ink); color: var(--color-bg); }
  .cc .submit-btn:hover { background: var(--color-accent); border-color: var(--color-accent); box-shadow: none; }
  .cc .order-input:focus { background: var(--color-surface) !important; box-shadow: inset 0 0 0 1px var(--color-accent); }
  .cc .service-btn.inactive:hover { background: var(--color-hover-tint); }
  .cc .send-in-box { background: var(--color-sand); }
  .cc .lang-btn:not(.active):hover { background: var(--color-hover-tint); }
  .cc .lang-btn.active { color: var(--color-bg); }
`

export default function ConceptC() {
  return (
    <div className={`${fraunces.variable} ${instrument.variable} cc`} data-theme="c">
      <style>{THEME}</style>
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Modules />
        <Range />
        <Gallery />
        <Process />
        <Contact />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
