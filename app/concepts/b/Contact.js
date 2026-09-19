import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'

const OrderForm = dynamic(() => import('@/app/components/orderform'))

export default function Contact() {
  const t = useTranslations('concept.b')
  return (
    <>
      <style>{`
        .cb-contact-head { border-top: 1px solid var(--color-border); padding: clamp(4rem, 8vw, 7rem) 0 0; }
        .cb-contact-head h2 { font-size: clamp(2.6rem, 8vw, 7rem); margin: 0.75rem 0 0; }
        .cb-contact-head h2 span { color: var(--color-accent); }
        .cb-contact #order { border: 0 !important; }
      `}</style>
      <div className="cb-contact">
        <div className="cb-wrap cb-contact-head">
          <p className="cb-label"><b>{'//'}</b> {t('contactLabel')}</p>
          <h2 className="cb-title"><span>[</span> {t('contactTitle')} <span>]</span></h2>
        </div>
        <OrderForm />
      </div>
    </>
  )
}
