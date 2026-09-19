import dynamic from 'next/dynamic'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import Hero from '@/app/components/home/Hero'
import Manifesto from '@/app/components/home/Manifesto'
import Services from '@/app/components/home/Services'

const Work = dynamic(() => import('@/app/components/home/Work'))
const Process = dynamic(() => import('@/app/components/home/Process'))
const SendIn = dynamic(() => import('@/app/components/home/SendIn'))
const Contact = dynamic(() => import('@/app/components/home/Contact'))
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
      <Hero />
      <Manifesto />
      <Services />
      <Work />
      <Process />
      <SendIn />
      <Contact />
      <FAQ />
      <Footer />
    </main>
  )
}
