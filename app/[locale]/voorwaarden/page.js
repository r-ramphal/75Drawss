import { getTranslations, setRequestLocale } from 'next-intl/server'
import LegalPage from '@/app/components/legalpage'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'terms' })
  return {
    title: t('title'),
    description: t('intro'),
  }
}

export default async function Voorwaarden({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  return <LegalPage locale={locale} namespace="terms" />
}
