'use client'
import { track as vercelTrack } from '@vercel/analytics'

// One conversion helper for the whole app. The Vercel Analytics event is
// cookieless and always fires; the ad-pixel events only fire if the pixels are
// actually loaded (i.e. the visitor accepted cookies in the consent banner).
export function trackLead(props = {}) {
  try {
    vercelTrack('order_request', props)
  } catch {}
  try {
    if (typeof window !== 'undefined' && window.fbq) window.fbq('track', 'Lead', props)
  } catch {}
  try {
    if (typeof window !== 'undefined' && window.ttq) window.ttq.track('SubmitForm', props)
  } catch {}
}
