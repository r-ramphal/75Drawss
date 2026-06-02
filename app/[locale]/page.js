import dynamic from 'next/dynamic'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import Navbar from '@/app/components/navbar'
import Hero from '@/app/components/hero'
import Ticker from '@/app/components/ticker'

const ProductRange = dynamic(() => import('@/app/components/productrange'))
const Portfolio = dynamic(() => import('@/app/components/portfolio'))
const HowItWorks = dynamic(() => import('@/app/components/howitworks'))
const SendIn = dynamic(() => import('@/app/components/sendin'))
const Features = dynamic(() => import('@/app/components/features'))
const OrderForm = dynamic(() => import('@/app/components/orderform'))
const FAQ = dynamic(() => import('@/app/components/faq'))
const Footer = dynamic(() => import('@/app/components/footer'))

export default async function Home({ params }) {
  const { locale } = await params
  setRequestLocale(locale)

  // FAQPage structured data — eligible for rich results in Google.
  const t = await getTranslations({ locale, namespace: 'faq' })
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.raw('items').map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <Navbar />
      <Hero />
      <Ticker />
      <ProductRange />
      <Portfolio />
      <HowItWorks />
      <SendIn />
      <Features />
      <OrderForm />
      <FAQ />
      <Footer />
    </main>
  )
}
