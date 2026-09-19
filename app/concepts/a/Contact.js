import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'

const OrderForm = dynamic(() => import('@/app/components/orderform'))

export default function Contact() {
  const t = useTranslations('concept.a')
  return (
    <>
      <style>{`
        .ca-contact-kicker { padding: clamp(4rem, 10vw, 8rem) 0 0; border-top: 1px solid var(--color-border); }
        .ca-contact-kicker h2 { font-size: clamp(3.4rem, 14vw, 13rem); margin: 0; line-height: 0.85; color: transparent; -webkit-text-stroke: 1.5px var(--color-text); }
        .ca-contact-form #order { border: 0 !important; }
      `}</style>
      <div className="ca-contact-kicker" aria-hidden="true">
        <div className="ca-wrap"><h2 className="ca-display">{t("contactKicker")}</h2></div>
      </div>
      <div className="ca-contact-form">
        <OrderForm />
      </div>
    </>
  )
}
