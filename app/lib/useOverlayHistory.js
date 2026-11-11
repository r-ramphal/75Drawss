'use client'
import { useCallback, useEffect, useRef } from 'react'

/*
  Makes a full-screen overlay (mobile menu, photo lightbox) behave like a
  screen in an app: opening it adds a history entry, so the phone's back
  button or back-swipe closes the overlay instead of leaving the site.

    const closeThen = useOverlayHistory(open, close)

  - `open`  boolean, whether the overlay is showing
  - `close` function that hides it (sets your state)
  - returns `closeThen(fn)`: close via history, then run `fn` (use it for
    links inside the overlay, so navigation starts from a clean history)

  Closing through the UI (button, Escape, backdrop) just sets your state as
  usual; the hook removes its history entry. The entry keeps Next's own
  history state, so the router is not involved.
*/
export function useOverlayHistory(open, close) {
  const pushed = useRef(false)
  const after = useRef(null)
  const closeRef = useRef(close)
  useEffect(() => { closeRef.current = close }, [close])

  useEffect(() => {
    if (open) {
      window.history.pushState({ ...window.history.state, __overlay: true }, '')
      pushed.current = true
      const onPop = () => {
        pushed.current = false
        closeRef.current()
        const fn = after.current
        after.current = null
        if (fn) setTimeout(fn, 30)
      }
      window.addEventListener('popstate', onPop)
      return () => window.removeEventListener('popstate', onPop)
    }
    if (pushed.current) {
      // closed through the UI: drop the entry we added
      pushed.current = false
      window.history.back()
    }
  }, [open])

  return useCallback((fn) => {
    if (pushed.current) {
      after.current = fn
      window.history.back()
    } else {
      closeRef.current()
      if (fn) fn()
    }
  }, [])
}
