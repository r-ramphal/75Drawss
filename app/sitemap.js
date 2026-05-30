const SITE_URL = 'https://www.75drawss.com'
const locales = ['en', 'nl']

export default function sitemap() {
  return locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
    alternates: {
      languages: {
        en: `${SITE_URL}/en`,
        nl: `${SITE_URL}/nl`,
      },
    },
  }))
}
