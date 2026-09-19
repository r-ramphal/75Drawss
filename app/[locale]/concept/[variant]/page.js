/*
  Temporary concept routes for the redesign review: /nl/concept/a|b|c.
  Not indexed, not in the sitemap. Removed once a concept is chosen and
  promoted to the real homepage.
*/
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import ConceptA from '@/app/concepts/a'
import ConceptB from '@/app/concepts/b'
import ConceptC from '@/app/concepts/c'

const VARIANTS = { a: ConceptA, b: ConceptB, c: ConceptC }

export const dynamicParams = false

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    Object.keys(VARIANTS).map((variant) => ({ locale, variant })),
  )
}

export async function generateMetadata({ params }) {
  const { variant } = await params
  return {
    title: `Concept ${variant.toUpperCase()}`,
    robots: { index: false, follow: false },
  }
}

export default async function ConceptPage({ params }) {
  const { locale, variant } = await params
  setRequestLocale(locale)
  const Concept = VARIANTS[variant]
  if (!Concept) notFound()
  return <Concept />
}
