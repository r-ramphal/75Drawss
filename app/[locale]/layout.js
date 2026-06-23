import { Rubik, Cormorant_Garamond } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ConsentBanner from "@/app/components/consentbanner";
import Pixels from "@/app/components/pixels";
import "../globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const displaySerif = Cormorant_Garamond({
  variable: "--font-display-serif",
  subsets: ["latin"],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const SITE_URL = 'https://www.75drawss.com';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t('title'),
      template: '%s | 75Drawss',
    },
    description: t('description'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        nl: '/nl',
        'x-default': '/en',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      url: `${SITE_URL}/${locale}`,
      siteName: '75Drawss',
      locale: locale === 'nl' ? 'nl_NL' : 'en_NL',
      alternateLocale: locale === 'nl' ? ['en_NL'] : ['nl_NL'],
      images: [{ url: `${SITE_URL}/og.jpg`, width: 1200, height: 630, alt: '75Drawss — custom TCG binders & accessories' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [`${SITE_URL}/og.jpg`],
    },
    verification: {
      google: '4n7f3GSEAdSc6A9H4XlPCpjwmtHAGZAkjUIXEHTGLOY',
    },
  };
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: '75Drawss',
  description: 'Custom TCG binder, deck box and accessory design, handcrafted to order in the Netherlands.',
  url: SITE_URL,
  email: '75Drawss@gmail.com',
  image: `${SITE_URL}/icon.svg`,
  sameAs: [
    'https://www.instagram.com/75.drawss',
    'https://www.tiktok.com/@75drawss',
  ],
  priceRange: '€€',
  knowsLanguage: ['en', 'nl'],
  areaServed: [
    { '@type': 'Country', name: 'Netherlands' },
    { '@type': 'Country', name: 'Belgium' },
    { '@type': 'Country', name: 'France' },
  ],
  address: { '@type': 'PostalAddress', addressCountry: 'NL' },
  makesOffer: [
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom TCG Binder Design' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Deck Box Design' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Display Case Design' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Card Sleeves & Accessories' } },
  ],
};

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${rubik.variable} ${displaySerif.variable}`}>
      <body>
        {/* No-JS fallback: scroll-reveal elements stay hidden until GSAP runs,
            so reveal everything when scripts are unavailable. */}
        <noscript>
          <style>{`.reveal-item { opacity: 1 !important; }`}</style>
        </noscript>
        <NextIntlClientProvider messages={messages}>
          {children}
          <ConsentBanner />
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
        <Pixels />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
