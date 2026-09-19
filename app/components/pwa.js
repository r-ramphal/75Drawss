'use client'
import { useEffect } from 'react'

/*
  Registers the service worker (production only, so dev never serves stale
  files) and parks the browser's install prompt on window so an install
  banner elsewhere can trigger it. Fires a 'pwa-installable' event when the
  prompt becomes available.
*/
export default function Pwa() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }
    const onPrompt = (e) => {
      e.preventDefault()
      window.__pwaPrompt = e
      window.dispatchEvent(new Event('pwa-installable'))
    }
    window.addEventListener('beforeinstallprompt', onPrompt)
    return () => window.removeEventListener('beforeinstallprompt', onPrompt)
  }, [])
  return null
}
