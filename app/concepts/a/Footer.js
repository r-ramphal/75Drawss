import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { InstagramIcon, TikTokIcon, INSTAGRAM_URL, TIKTOK_URL, CONTACT_EMAIL } from '../shared/Social'

export default function Footer() {
  const t = useTranslations('concept.a')
  const tf = useTranslations('footer')
  return (
    <>
      <style>{`
        .ca-footer { border-top: 1px solid var(--color-border); overflow: hidden; }
        .ca-footer-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 2rem; padding: 3.5rem 0 2rem; }
        .ca-footer p { margin: 0; color: var(--color-text-secondary); line-height: 1.7; max-width: 380px; }
        .ca-footer-col { display: flex; flex-direction: column; gap: 0.6rem; }
        .ca-footer-col a { color: var(--color-text); text-decoration: none; font-size: 0.8rem; letter-spacing: 0.12em; text-transform: uppercase; }
        .ca-footer-col a:hover { color: var(--color-accent); }
        .ca-footer-social { display: flex; gap: 0.75rem; margin-bottom: 0.5rem; }
        .ca-footer-social a { display: inline-flex; width: 36px; height: 36px; align-items: center; justify-content: center; border: 1px solid var(--color-border-strong); }
        .ca-footer-social a:hover { border-color: var(--color-accent); color: var(--color-accent); }
        .ca-footer-mark { font-size: clamp(5rem, 19vw, 19rem); line-height: 0.78; margin: 1rem 0 0; transform: translateY(0.14em); color: var(--color-text); white-space: nowrap; }
        .ca-footer-rights { font-size: 0.68rem; color: var(--color-text-muted); letter-spacing: 0.1em; padding-bottom: 1rem; }
        @media (max-width: 800px) { .ca-footer-grid { grid-template-columns: 1fr; } }
      `}</style>
      <footer className="ca-footer">
        <div className="ca-wrap">
          <div className="ca-footer-grid">
            <div>
              <p>{t('footerLine')}</p>
              <p style={{ marginTop: '1rem' }}><a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'var(--color-accent)' }}>{CONTACT_EMAIL}</a></p>
            </div>
            <div className="ca-footer-col">
              <Link href="/portfolio">{tf('portfolio')}</Link>
              <Link href="/inspiratie">{tf('inspiration')}</Link>
              <a href="#process">{tf('howItWorks')}</a>
              <a href="#order">{tf('order')}</a>
            </div>
            <div className="ca-footer-col">
              <div className="ca-footer-social">
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label={tf('instagram')}><InstagramIcon /></a>
                <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" aria-label={tf('tiktok')}><TikTokIcon /></a>
              </div>
              <Link href="/privacy">{tf('privacy')}</Link>
              <Link href="/voorwaarden">{tf('terms')}</Link>
            </div>
          </div>
          <div className="ca-footer-rights">{tf('rights')}</div>
          <div className="ca-display ca-footer-mark" aria-hidden="true">75Drawss</div>
        </div>
      </footer>
    </>
  )
}
