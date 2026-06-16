import { setRequestLocale, getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import DesignShowcase from '@/app/components/portfolio/DesignShowcase'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'portfolioPage' })
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `/${locale}/portfolio`,
      languages: { en: '/en/portfolio', nl: '/nl/portfolio', 'x-default': '/en/portfolio' },
    },
  }
}

export default async function PortfolioPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main>
      <Navbar />
      <DesignShowcase />
      <Footer />
    </main>
  )
}
