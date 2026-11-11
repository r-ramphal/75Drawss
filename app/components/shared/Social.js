import Image from 'next/image'
import logoColour from '@/public/logo.png'
import logoLight from '@/public/logo-light.png'

// Instagram / TikTok links with inline icons, shared by the navbar and footer.
export const INSTAGRAM_URL = 'https://www.instagram.com/75.drawss'
export const TIKTOK_URL = 'https://www.tiktok.com/@75drawss'
export const CONTACT_EMAIL = '75Drawss@gmail.com'

export function InstagramIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )
}

export function TikTokIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  )
}

/*
  The 75Drawss mark (public/logo.png, navy + grey on transparent). Use
  variant="light" on dark surfaces. Size it with CSS via className (set a
  height, width auto); the intrinsic size comes from the static import.
*/
export function Logo({ variant = 'colour', className, priority = false }) {
  const src = variant === 'light' ? logoLight : logoColour
  return <Image src={src} alt="75Drawss" className={className} priority={priority} sizes="120px" />
}
