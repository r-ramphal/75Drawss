/*
  Concept B — "Darkroom". Near-black studio, signal red, monospace HUD
  labels, viewfinder hero slider, work in slider / grid / list views, a fixed
  ruler that tracks scroll progress. Tokens are overridden inside the wrapper
  so the shared order form takes the theme.
*/
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import Studio from './Studio'
import About from './About'
import Process from './Process'
import SendIn from './SendIn'
import Contact from './Contact'
import Faq from './Faq'
import Footer from './Footer'
import Ruler from './Ruler'

const grotesk = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-sg', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-jb', display: 'swap' })

const THEME = `
  body { background: #0D0D0D; }
  .cb {
    --color-bg: #0D0D0D;
    --color-surface: #151515;
    --color-text: #E8E6E1;
    --color-text-secondary: #A9A7A1;
    --color-text-muted: #6E6E6A;
    --color-border: rgba(232,230,225,0.14);
    --color-border-strong: rgba(232,230,225,0.34);
    --color-accent: #FF3B30;
    --color-accent-hover: #FF5A50;
    --color-accent-text: #FF3B30;
    --color-hover-tint: #1A1A1A;
    --font-ui: var(--font-sg), system-ui, sans-serif;
    --font-display: var(--font-sg), system-ui, sans-serif;
    --font-mono: var(--font-jb), ui-monospace, monospace;
    --radius: 0;
    --shadow-hard: none;
    --shadow-hard-lg: none;
    background: var(--color-bg);
    color: var(--color-text);
    font-family: var(--font-ui);
    padding-bottom: 30px; /* room for the fixed ruler */
    overflow-x: clip;
  }
  .cb ::selection { background: var(--color-accent); color: #0D0D0D; }
  .cb-mono { font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; }
  .cb-label { font-family: var(--font-mono); font-size: 0.68rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--color-text-muted); }
  .cb-label b { color: var(--color-accent); font-weight: 500; }
  .cb-wrap { max-width: 1520px; margin: 0 auto; padding: 0 clamp(1.25rem, 3vw, 2.5rem); }
  .cb-title { font-family: var(--font-display); font-weight: 700; letter-spacing: -0.03em; line-height: 0.95; }
  .cb-btn {
    display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.85rem 1.4rem;
    font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.16em; text-transform: uppercase;
    text-decoration: none; color: var(--color-text); border: 1px solid var(--color-border-strong);
    background: transparent; cursor: pointer; transition: background 0.2s, color 0.2s, border-color 0.2s;
  }
  .cb-btn:hover { border-color: var(--color-accent); color: var(--color-accent); }
  .cb-btn.solid { background: var(--color-accent); border-color: var(--color-accent); color: #0D0D0D; }
  .cb-btn.solid:hover { background: var(--color-accent-hover); border-color: var(--color-accent-hover); color: #0D0D0D; }
  .cb-grain {
    position: fixed; inset: 0; pointer-events: none; z-index: 70; opacity: 0.07; mix-blend-mode: screen;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
  .cb-grain.off { display: none; }
  /* Shared components on the theme */
  .cb h2 { font-family: var(--font-display); font-weight: 700 !important; letter-spacing: -0.03em !important; }
  .cb .lang-btn { font-family: var(--font-mono); }
  .cb .lang-btn.active { color: #0D0D0D; }
  .cb .lang-btn:not(.active):hover { background: var(--color-hover-tint); }
  .cb .order-input { font-family: var(--font-mono) !important; }
  .cb .order-input:focus { background: var(--color-hover-tint) !important; box-shadow: inset 0 0 0 1px var(--color-accent); }
  .cb .service-btn { font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; }
  .cb .service-btn.inactive:hover { background: var(--color-hover-tint); }
  .cb .service-btn.active { background: var(--color-accent); color: #0D0D0D; }
  .cb .send-in-box { background: var(--color-surface); }
  .cb .submit-btn { color: #0D0D0D; font-family: var(--font-mono); letter-spacing: 0.14em; text-transform: uppercase; }
  .cb .qty-btn, .cb .pocket-btn { font-family: var(--font-mono); }
  .cb-anim { opacity: 0; }
  @media (prefers-reduced-motion: reduce) { .cb-anim { opacity: 1 !important; } }
`

export default function ConceptB() {
  return (
    <div className={`${grotesk.variable} ${mono.variable} cb`} data-theme="b">
      <style>{THEME}</style>
      <noscript><style>{`.cb-anim { opacity: 1 !important; }`}</style></noscript>
      <Studio />
      <main>
        <About />
        <Process />
        <SendIn />
        <Contact />
        <Faq />
      </main>
      <Footer />
      <Ruler />
    </div>
  )
}
