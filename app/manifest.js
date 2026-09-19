// Web app manifest (served at /manifest.webmanifest, linked automatically by
// Next). Makes the site installable on iOS/Android/desktop: home-screen icon,
// standalone window without browser chrome, splash colours.
// TODO step 2: start_url → '/nl' once concept A is the real homepage.
export default function manifest() {
  return {
    name: '75Drawss — Custom TCG binders',
    short_name: '75Drawss',
    description: 'Custom TCG binders, deckboxes en displaycases, handgemaakt in Nederland.',
    id: '/',
    start_url: '/nl/concept/a',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#FAFAF8',
    theme_color: '#0A0A0A',
    lang: 'nl',
    categories: ['shopping', 'lifestyle'],
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
