/*
  Service worker for the installable app.
  - pages: network first, fall back to cache, then to the offline page
  - static build assets and portfolio photos: cache first
  Bump VERSION when the caching strategy changes; old caches are cleared on
  activate. Never caches API calls (the order form always needs the network).
*/
const VERSION = 'v1'
const CACHE = `75drawss-${VERSION}`
const OFFLINE_URL = '/offline.html'

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.add(OFFLINE_URL)))
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return
  const url = new URL(request.url)
  if (url.origin !== self.location.origin || url.pathname.startsWith('/api/')) return

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone()
          caches.open(CACHE).then((c) => c.put(request, copy))
          return res
        })
        .catch(() => caches.match(request).then((hit) => hit || caches.match(OFFLINE_URL))),
    )
    return
  }

  const cacheFirst = url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/portfolio/') || /\.(png|svg|ico|woff2?)$/.test(url.pathname)
  if (cacheFirst) {
    event.respondWith(
      caches.match(request).then((hit) => hit || fetch(request).then((res) => {
        const copy = res.clone()
        caches.open(CACHE).then((c) => c.put(request, copy))
        return res
      })),
    )
  }
})
