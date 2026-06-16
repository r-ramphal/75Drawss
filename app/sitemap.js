const SITE_URL = 'https://www.75drawss.com'
const locales = ['en', 'nl']

// Home (priority 1), the main pages, then the legal pages (lower priority).
const paths = [
  { path: '', priority: 1, changeFrequency: 'monthly' },
  { path: '/portfolio', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/inspiratie', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/voorwaarden', priority: 0.3, changeFrequency: 'yearly' },
]

export default function sitemap() {
  return locales.flatMap((locale) =>
    paths.map(({ path, priority, changeFrequency }) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: {
        languages: {
          en: `${SITE_URL}/en${path}`,
          nl: `${SITE_URL}/nl${path}`,
        },
      },
    }))
  )
}
