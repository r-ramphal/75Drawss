import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Logo, InstagramIcon, TikTokIcon, INSTAGRAM_URL, TIKTOK_URL, CONTACT_EMAIL } from '@/app/components/shared/Social'

export default function Footer() {
  const t = useTranslations('home')
  const tf = useTranslations('footer')
  const locale = useLocale()
  return (
    <>
      <style>{`
        .site-footer { background: var(--color-ink); color: #fff; overflow: hidden; }
        .site-footer-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 2rem; padding: 2.75rem 0 1.5rem; }
        .site-footer-logo { display: block; height: 56px; width: auto; margin-bottom: 1.1rem; }
        .site-footer p { margin: 0; color: rgba(255,255,255,0.7); line-height: 1.7; max-width: 380px; }
        .site-footer-col { display: flex; flex-direction: column; gap: 0.6rem; }
        .site-footer-col a { color: #fff; text-decoration: none; font-size: 0.78rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; }
        .site-footer-col a:hover { color: var(--color-accent); }
        .site-footer-social { display: flex; gap: 0.6rem; margin-bottom: 0.5rem; }
        .site-footer-social a { display: inline-flex; width: 34px; height: 34px; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.3); border-radius: 50%; }
        .site-footer-social a:hover { border-color: var(--color-accent); color: var(--color-accent); }
        .site-footer-mark { font-size: clamp(5rem, 19vw, 19rem); line-height: 0.78; margin: 0.5rem 0 0; transform: translateY(0.14em); white-space: nowrap; color: #fff; }
        .site-footer-mark span { color: var(--color-accent); }
        .site-footer-rights { font-size: 0.68rem; color: rgba(255,255,255,0.5); letter-spacing: 0.08em; padding-bottom: 1rem; }
        @media (max-width: 800px) { .site-footer-grid { grid-template-columns: 1fr; } }
      `}</style>
      <footer className="site-footer">
        <div className="site-wrap">
          <div className="site-footer-grid">
            <div>
              <Logo variant="light" className="site-footer-logo" />
              <p>{t('footerLine')}</p>
              <p style={{ marginTop: '1rem' }}><a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'var(--color-accent)' }}>{CONTACT_EMAIL}</a></p>
            </div>
            <div className="site-footer-col">
              <Link href="/portfolio">{tf('portfolio')}</Link>
              <Link href="/inspiratie">{tf('inspiration')}</Link>
              <a href={`/${locale}#process`}>{tf('howItWorks')}</a>
              <a href={`/${locale}#faq`}>{tf('faq')}</a>
              <a href={`/${locale}#order`}>{tf('order')}</a>
            </div>
            <div className="site-footer-col">
              <div className="site-footer-social">
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label={tf('instagram')}><InstagramIcon /></a>
                <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" aria-label={tf('tiktok')}><TikTokIcon /></a>
              </div>
              <Link href="/privacy">{tf('privacy')}</Link>
              <Link href="/voorwaarden">{tf('terms')}</Link>
            </div>
          </div>
          <div className="site-footer-rights">{tf('rights')}</div>
          <div className="site-display site-footer-mark" aria-hidden="true"><span>75</span>Drawss</div>
        </div>
      </footer>
    </>
  )
}
