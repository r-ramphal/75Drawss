import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { InstagramIcon, TikTokIcon, INSTAGRAM_URL, TIKTOK_URL, CONTACT_EMAIL } from '../shared/Social'

export default function Footer() {
  const t = useTranslations('concept.c')
  const tf = useTranslations('footer')
  return (
    <>
      <style>{`
        .cc-footer { background: var(--color-ink); color: var(--color-bg); padding: 4rem 0 2rem; }
        .cc-footer-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 2rem; padding-bottom: 3rem; border-bottom: 1px solid rgba(243,238,228,0.18); }
        .cc-footer-mark { font-family: var(--font-display); font-style: italic; font-size: 2.6rem; margin: 0 0 0.75rem; }
        .cc-footer p { margin: 0; color: rgba(243,238,228,0.7); line-height: 1.7; max-width: 36ch; }
        .cc-footer-col { display: flex; flex-direction: column; gap: 0.6rem; }
        .cc-footer-col a { color: var(--color-bg); text-decoration: none; font-size: 0.88rem; }
        .cc-footer-col a:hover { color: var(--color-gold); }
        .cc-footer-social { display: flex; gap: 0.75rem; margin-bottom: 0.5rem; }
        .cc-footer-social a { display: inline-flex; width: 36px; height: 36px; align-items: center; justify-content: center; border: 1px solid rgba(243,238,228,0.3); }
        .cc-footer-rights { padding-top: 1.25rem; font-size: 0.75rem; color: rgba(243,238,228,0.55); display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
        @media (max-width: 800px) { .cc-footer-grid { grid-template-columns: 1fr; } }
      `}</style>
      <footer className="cc-footer">
        <div className="cc-wrap">
          <div className="cc-footer-grid">
            <div>
              <div className="cc-footer-mark">75Drawss</div>
              <p>{t('footerLine')}</p>
              <p style={{ marginTop: '1rem' }}><a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'var(--color-gold)' }}>{CONTACT_EMAIL}</a></p>
            </div>
            <div className="cc-footer-col">
              <Link href="/portfolio">{tf('portfolio')}</Link>
              <Link href="/inspiratie">{tf('inspiration')}</Link>
              <a href="#process">{tf('howItWorks')}</a>
              <a href="#faq">{tf('faq')}</a>
              <a href="#order">{tf('order')}</a>
            </div>
            <div className="cc-footer-col">
              <div className="cc-footer-social">
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label={tf('instagram')}><InstagramIcon /></a>
                <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" aria-label={tf('tiktok')}><TikTokIcon /></a>
              </div>
              <Link href="/privacy">{tf('privacy')}</Link>
              <Link href="/voorwaarden">{tf('terms')}</Link>
            </div>
          </div>
          <div className="cc-footer-rights"><span>{tf('rights')}</span><span>{t('heroCaption')}</span></div>
        </div>
      </footer>
    </>
  )
}
