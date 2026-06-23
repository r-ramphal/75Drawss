'use client'
// Tiny consent store shared by the banner and the pixel loader.
// Value is 'granted' | 'denied' in localStorage; absent = not decided yet.
export const CONSENT_KEY = 'cookie-consent'
export const CONSENT_EVENT = 'consentchange'

export function getConsent() {
  if (typeof window === 'undefined') return null
  try {
    return localStorage.getItem(CONSENT_KEY)
  } catch {
    return null
  }
}

export function setConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value)
  } catch {}
  try {
    window.dispatchEvent(new Event(CONSENT_EVENT))
  } catch {}
}
