import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const SITE_URL = 'https://www.75drawss.com';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Custom TCG Binder Design & Deck Boxes | 75Drawss',
    template: '%s | 75Drawss',
  },
  description:
    'Design your own custom TCG binder, deck box or display case. Fully personalised and handcrafted in the Netherlands — Pokémon, One Piece, Lorcana, Magic & more. Custom binder laten maken? Wij maken jouw ontwerp.',
  keywords: [
    // English
    'custom binder design', 'custom TCG binder', 'custom Pokémon binder',
    'custom card binder', 'personalised binder', 'custom deck box',
    'TCG accessories', 'custom display case', 'One Piece binder', 'Lorcana binder',
    // Nederlands
    'custom binder laten maken', 'binder ontwerp', 'gepersonaliseerde binder',
    'custom TCG binder Nederland', 'eigen binder ontwerpen', 'custom deckbox',
    'Pokémon binder op maat', 'verzamelmap op maat',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Custom TCG Binder Design & Deck Boxes | 75Drawss',
    description:
      'Design your own custom TCG binder, deck box or display case. Handcrafted in the Netherlands. Custom binder laten maken — wij maken jouw ontwerp.',
    type: 'website',
    url: SITE_URL,
    siteName: '75Drawss',
    locale: 'en_NL',
    alternateLocale: ['nl_NL'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom TCG Binder Design & Deck Boxes | 75Drawss',
    description:
      'Design your own custom TCG binder, deck box or display case. Handcrafted in the Netherlands.',
  },
  icons: {
    icon: '/icon.svg',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: '75Drawss',
  description:
    'Custom TCG binder, deck box and accessory design, handcrafted to order in the Netherlands.',
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
    { '@type': 'Country', name: 'Germany' },
    { '@type': 'Country', name: 'France' },
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'NL',
  },
  makesOffer: [
    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Custom TCG Binder' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Custom Deck Box' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Custom Display Case' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Custom Card Sleeves & Accessories' } },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={rubik.variable}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
