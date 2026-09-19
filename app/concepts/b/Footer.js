import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { InstagramIcon, TikTokIcon, INSTAGRAM_URL, TIKTOK_URL, CONTACT_EMAIL } from '../shared/Social'

export default function Footer() {
  const t = useTranslations('concept.b')
  const tf = useTranslations('footer')
  return (
    <>
      <style>{`
        .cb-footer { border-top: 1px solid var(--color-border-strong); padding: 2.5rem 0 3rem; }
        .cb-footer-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
        .cb-footer-col { display: flex; flex-direction: column; gap: 0.55rem; }
        .cb-footer-col a { color: var(--color-text); text-decoration: none; }
        .cb-footer-col a:hover { color: var(--color-accent); }
        .cb-footer-social { display: flex; gap: 1rem; align-items: center; }
        .cb-footer-social a { display: inline-flex; gap: 0.4rem; align-items: center; }
        .cb-footer-rights { margin-top: 2.5rem; color: var(--color-text-muted); }
        @media (max-width: 760px) { .cb-footer-grid { grid-template-columns: 1fr 1fr; } }
      `}</style>
      <footer className="cb-footer">
        <div className="cb-wrap">
          <div className="cb-footer-grid cb-mono">
            <div className="cb-footer-col">
              <span className="cb-label">{t('serves')}</span>
              <span className="cb-label">{t('madeIn')}</span>
            </div>
            <div className="cb-footer-col">
              <Link href="/portfolio">{tf('portfolio')}</Link>
              <Link href="/inspiratie">{tf('inspiration')}</Link>
              <a href="#process">{tf('howItWorks')}</a>
              <a href="#order">{tf('order')}</a>
            </div>
            <div className="cb-footer-col">
              <div className="cb-footer-social">
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label={tf('instagram')}><InstagramIcon size={14} /> @75.drawss</a>
              </div>
              <div className="cb-footer-social">
                <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" aria-label={tf('tiktok')}><TikTokIcon size={13} /> @75drawss</a>
              </div>
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'var(--color-accent)' }}>{CONTACT_EMAIL}</a>
            </div>
            <div className="cb-footer-col">
              <Link href="/privacy">{tf('privacy')}</Link>
              <Link href="/voorwaarden">{tf('terms')}</Link>
            </div>
          </div>
          <div className="cb-footer-rights cb-label">{tf('rights')}</div>
        </div>
      </footer>
    </>
  )
}
