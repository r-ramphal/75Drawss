import { setRequestLocale, getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import Footer from '@/app/components/footer'
import PortfolioHeader from '@/app/components/portfolio/PortfolioHeader'
import InspirationView from '@/app/components/inspiration/InspirationView'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'inspiratie' })
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `/${locale}/inspiratie`,
      languages: { en: '/en/inspiratie', nl: '/nl/inspiratie', 'x-default': '/en/inspiratie' },
    },
  }
}

export default async function InspiratiePage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main>
      <PortfolioHeader />
      <InspirationView />
      <Footer />
    </main>
  )
}
