'use client'
/*
  Ad pixels (Meta + TikTok). They load ONLY when:
    1. the visitor accepted cookies (consent === 'granted'), AND
    2. the corresponding NEXT_PUBLIC_*_PIXEL_ID env var is set.
  Without consent or without an ID, nothing is injected. Cookieless Vercel
  Analytics runs independently in the layout.
*/
import { useEffect, useState } from 'react'
import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { getConsent, CONSENT_EVENT } from '@/app/lib/consent'

const META_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const TIKTOK_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID

export default function Pixels() {
  const [granted, setGranted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const sync = () => setGranted(getConsent() === 'granted')
    sync()
    window.addEventListener(CONSENT_EVENT, sync)
    return () => window.removeEventListener(CONSENT_EVENT, sync)
  }, [])

  // The base scripts fire only the first PageView; fire one on each client-side
  // route change too. No-ops until the pixels exist.
  useEffect(() => {
    if (!granted) return
    try { if (window.fbq) window.fbq('track', 'PageView') } catch {}
    try { if (window.ttq) window.ttq.page() } catch {}
  }, [pathname, granted])

  if (!granted) return null

  return (
    <>
      {META_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
          document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_ID}'); fbq('track', 'PageView');
        `}</Script>
      )}
      {TIKTOK_ID && (
        <Script id="tiktok-pixel" strategy="afterInteractive">{`
          !function (w, d, t) {
            w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
            ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
            ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
            for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
            ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
            ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var a=d.createElement("script");a.type="text/javascript",a.async=!0,a.src=r+"?sdkid="+e+"&lib="+t;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(a,s)};
            ttq.load('${TIKTOK_ID}'); ttq.page();
          }(window, document, 'ttq');
        `}</Script>
      )}
    </>
  )
}
