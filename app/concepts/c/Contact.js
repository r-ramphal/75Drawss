import dynamic from 'next/dynamic'

const OrderForm = dynamic(() => import('@/app/components/orderform'))

export default function Contact() {
  return (
    <>
      <style>{`
        .cc-contact #order { background: var(--color-sand) !important; border: 0 !important; }
        .cc-contact .order-form-box { border-color: var(--color-border) !important; }
      `}</style>
      <div className="cc-contact">
        <OrderForm />
      </div>
    </>
  )
}
