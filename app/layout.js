import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://75drawss.nl'),
  title: '75Drawss — Custom TCG Binders & Accessories',
  description: 'Fully custom TCG binders, deck boxes and accessories built to your exact specifications. Upload your design, tell us your vision — we handle the rest.',
  openGraph: {
    title: '75Drawss — Custom TCG Binders & Accessories',
    description: 'Fully custom TCG binders, deck boxes and accessories built to your exact specifications.',
    type: 'website',
    url: 'https://75drawss.nl',
  },
  twitter: {
    card: 'summary_large_image',
    title: '75Drawss — Custom TCG Binders & Accessories',
    description: 'Fully custom TCG binders, deck boxes and accessories built to your exact specifications.',
  },
  icons: {
    icon: '/icon.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={rubik.variable}>
      <body>{children}</body>
    </html>
  );
}
