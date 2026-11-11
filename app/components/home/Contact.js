import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'

const OrderForm = dynamic(() => import('@/app/components/orderform'))

export default function Contact() {
  const t = useTranslations('home')
  return (
    <>
      <style>{`
        .site-contact-kicker { padding: var(--section-y) 0 0; border-top: 1px solid var(--color-border); }
        .site-contact-kicker h2 { font-size: clamp(3rem, 11vw, 10rem); margin: 0; line-height: 0.85; color: transparent; -webkit-text-stroke: 1.5px var(--color-text); }
        .site-contact-form #order { border: 0 !important; }
      `}</style>
      <div className="site-contact-kicker" aria-hidden="true">
        <div className="site-wrap"><h2 className="site-display">{t("contactKicker")}</h2></div>
      </div>
      <div className="site-contact-form">
        <OrderForm />
      </div>
    </>
  )
}
