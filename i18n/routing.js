import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'nl'],
  defaultLocale: 'en',
  // Always show the locale in the URL (/en, /nl) — best for SEO
  localePrefix: 'always',
})
