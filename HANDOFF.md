# 75Drawss — HANDOFF

> Lees dit eerst bij elke sessie. Werk het na elke sessie bij (stand, beslissingen, TODO's).
> Laatst bijgewerkt: **2026-06-16**

## Wat is het
Marketing-/bestel-one-pager voor een design studio die handgemaakte **custom TCG-accessoires** maakt op bestelling: binders (4/9-pocket), deckboxes, displaycases, sleeves & extra's. Doelgroep: verzamelaars (Pokémon, One Piece, Lorcana, Magic). Handgemaakt in Nederland, levert aan **NL/BE/FR**.

- Live-URL (in code): `https://www.75drawss.com`
- Socials: Instagram `@75.drawss`, TikTok `@75drawss`
- Contact-e-mail (JSON-LD): `75Drawss@gmail.com`

## Map & git
- **Actieve map:** `C:\Users\Lenovo\Documents\75Drawss` (gebruik deze).
- Oudere kopieën bestaan in `C:\Users\Lenovo\75Drawss` en `.cursor` — **niet gebruiken**.
- Branch: `main`.
- **Commits:** géén Claude co-author trailer toevoegen. Commit/push alleen op verzoek.

## Stack
- **Next.js 16.2.6** (App Router, Turbopack) + **React 19**
- **next-intl 4** — talen: `en` (default) + `nl`, locale-prefix altijd in URL (`/en`, `/nl`)
- **react-hook-form + zod** (`@hookform/resolvers`) — formuliervalidatie
- **GSAP 3.15 + @gsap/react** — alleen nog op `/portfolio` (DesignShowcase: ScrollTrigger + SplitText). Homepage-preview gebruikt géén GSAP meer (plain rAF). Bron-bonusbundel lokaal in `Downloads\gsap-public` (alle plugins gratis sinds v3.13). _framer-motion is verwijderd._
- **@vercel/analytics + @vercel/speed-insights** — bezoekers + Core Web Vitals (activeren pas na deploy op Vercel; lokaal no-op).
- **Cloudinary** — client-side upload van design-bestanden (unsigned preset)
- **Cloudflare Turnstile** — captcha, server-side geverifieerd
- **Resend** — order-mails (eigenaar + klantbevestiging)

## Mappenstructuur
```
app/[locale]/        page.js (homepage, lazy-loadt secties + FAQ JSON-LD)
                     layout.js (SEO: metadata, hreflang, OG/Twitter, Store JSON-LD, fonts)
                     bedankt/ privacy/ voorwaarden/ error.js not-found.js
app/api/submit-order/route.js   ← order-backend (honeypot, rate-limit, Turnstile, Resend)
app/components/      navbar hero ticker productrange portfolio howitworks
                     sendin features orderform faq footer stickyorder
                     languageswitcher legalpage
app/globals.css      design tokens (CSS variables)  ·  app/sitemap.js  ·  app/page.module.css
i18n/                routing.js (locales) · request.js · navigation.js
messages/            nl.json · en.json   ← ALLE zichtbare teksten staan hier
public/portfolio/    9 product-foto's (jpeg) + icon/og assets
```

## Design tokens (`app/globals.css`)
Component-styling gebeurt grotendeels via inline `<style>`-blokken per component, met deze CSS-variabelen:
- Fonts: `--font-ui` (Rubik), `--font-display` (Cormorant Garamond, serif)
- Achtergrond `--color-bg #FAFAF8`, surface `#fff`, tekst `#0A0A0A` / secondary `#555` / muted `#888`
- Borders `--color-border` / `--color-border-strong`
- Accent (geel) `--color-accent #F5B301`, hover `#D99A00`, accent-tekst `#8A5E00`
- `--radius 6px`, `--shadow-hard`, `--shadow-hard-lg`
- `prefers-reduced-motion` wordt gerespecteerd (globaal + per component).

## Bestelflow (kern)
Component `app/components/orderform.js`, twee modi via toggle:
1. **Build** ("Maak mijn product") — pocketformaat (4/9), kleur (swatches + vrij veld), aantal.
2. **Customize** ("Customize mijn product", send-in) — klant stuurt eigen product op; merk + conditie.

Flow: bestand → Cloudinary upload → Turnstile-token → `POST /api/submit-order` → bij succes redirect naar `/bedankt`.

`app/api/submit-order/route.js`:
- honeypot-veld (`botcheck`) + in-memory rate-limit (5/min per IP) + Turnstile-verificatie
- veld-whitelist + lengte-cap (5000) + HTML-escaping
- korte order-**referentie** `#ABC234` (geen 0/O/1/I)
- mail 1: notificatie naar eigenaar (met one-click "offerte sturen"-mailto-knop)
- mail 2: bevestiging naar klant in diens taal (best-effort, faalt nooit de request)

**Betaling staat NIET op de site.** Model: aanvraag → offerte op maat binnen 1–2 werkdagen → betaallink → productie → verzending (PostNL/DHL, **14–21 dagen**).

## Env-variabelen (zie `.env.example`)
- `NEXT_PUBLIC_CLOUDINARY_CLOUD`, `NEXT_PUBLIC_CLOUDINARY_PRESET`
- `NEXT_PUBLIC_TURNSTILE_SITEKEY`, `TURNSTILE_SECRET_KEY`
- `RESEND_API_KEY`, `ORDER_FROM_EMAIL`, `ORDER_TO_EMAIL`
- Lokaal staan deze in `.env.local`.

## Conventies
- **Alle teksten via next-intl** → toevoegen/wijzigen in **beide** `messages/nl.json` én `messages/en.json` (zelfde keys).
- Styling per component via inline `<style>` + design tokens; geen extra CSS-framework.
- Nieuwe routes onder `app/[locale]/`; interne links via `Link`/`useRouter` uit `@/i18n/navigation` (locale-aware).
- Houd CSP in `next.config.mjs` in de gaten bij nieuwe externe scripts/domeinen.

## Lokaal draaien
- `npm run dev` (Turbopack). `.claude/launch.json` start op poort 3001; `dev.log` toonde eerder poort 3007.
- Build: `npm run build` · Lint: `npm run lint`.

## Portfolio — architectuur
**Eén databron:** `app/data/binders.js` exporteert `BINDERS` (**16 stuks**) (+ afgeleide `CATEGORIES`). Elk object: `id, img (static import → auto width/height + blur), category, game, featured, title{en,nl}, alt{en,nl}`. Beschrijvingen zijn geverifieerd tegen de échte foto.

**Navigatie naar portfolio:** link in de navbar (desktop + mobiel menu, `nav.portfolio`), in de footer (`footer.portfolio`) en als CTA in de homepage-preview — alle naar `/portfolio`.

**Een binder toevoegen** (alles werkt daarna automatisch — preview, alle designs, filters):
1. Foto in `public/portfolio/<naam>.jpeg`.
2. `import <naam> from '@/public/portfolio/<naam>.jpeg'` boven in `binders.js`.
3. Eén object aan `BINDERS` toevoegen.

**Homepage = preview:** `app/components/portfolio.js` is een **vrije swipe-strip** (geen GSAP, geen scroll-hijack). Horizontale rij die je swipet/sleept; zachte auto-scroll (ping-pong via `requestAnimationFrame`) die pauzeert bij hover/touch/drag en bij off-screen (IntersectionObserver), respecteert reduced-motion. Verticaal scrollen wordt nooit geblokkeerd. **Kaarten in eigen verhouding** (geen crop): `--ar = img.width/img.height`, vaste hoogte. CTA → `/portfolio` (key `portfolio.viewAll`). _Bewust géén pin meer: een gepinde sectie dwong bezoekers eerst door de hele preview voor ze verder konden — slechte UX voor een teaser._

**Volledige pagina:** `app/[locale]/portfolio/page.js` → **gekozen design = A** (Immersive Showcase), rendert `DesignShowcase` direct. i18n-namespace `portfolioPage` (incl. `categories`-map).
- **A · Immersive Showcase** (`app/components/portfolio/DesignShowcase.js`, ACTIEF) — één binder per scherm, afwisselend L/R, SplitText-reveals + frame-parallax + vaste voortgangsrail. **Foto's in eigen verhouding** (geen crop): `<Image>` zonder `fill`, `width/height` uit static import, `max-height: 76vh` (58vh mobiel). Parallax beweegt het hele frame (niet de uitsnede).
- Designs B (Living Grid) en C (Kinetic Marquee) zijn **verwijderd** (afgewezen). `next.config.mjs` heeft nog `distDir` via `NEXT_DIST_DIR` (inert, default `.next`) mocht je opnieuw varianten naast elkaar willen draaien.

**Beschrijvingen geverifieerd tegen de foto:** o.a. gecorrigeerd — `koi.jpeg` = **Croconaw** (id `croconaw`), Mimikyu = wolkenlucht (géén Amsterdam-skyline), starters = Pikachu + Kanto-starters bij sterrenregen, kid = Eustass Kid.

GSAP-conventies: `useGSAP()` + `gsap.matchMedia()` (auto-cleanup, reduced-motion), plugins één keer registreren, `SplitText`/`Flip` reverten in cleanup. framer-motion is verwijderbaar (dood).

## Vercel (Pro)
- `@vercel/analytics` + `@vercel/speed-insights` in `app/[locale]/layout.js` (`<Analytics />`, `<SpeedInsights />`).
- Order-API draait in regio **`fra1`** (Frankfurt) — `preferredRegion`/`runtime` boven in `app/api/submit-order/route.js`.
- CSP in `next.config.mjs` uitgebreid met `va.vercel-scripts.com` (script-src) + `vitals.vercel-insights.com` (connect-src) voor de Vercel-beacons.
- Mogelijke vervolgstappen (nog niet gedaan): dynamische OG-images via `next/og`, Vercel Firewall / Attack Challenge Mode.

## Bekende aandachtspunten
- `README.md` is nog standaard create-next-app boilerplate (niet projectspecifiek).
- `middleware.js` geeft een Next 16 deprecation-warning → ooit migreren naar `proxy`.
- Project bevat een lokale skill `.claude/skills/ui-ux-pro-max/`.

## Inspiratie & community — `/inspiratie`  (LIVE)
`app/[locale]/inspiratie/page.js` → `app/components/inspiration/InspirationView.js` (client). Secties: hero, **blader op vibe** (filter op `CATEGORIES`, masonry van `BINDERS`, natuurlijke verhouding), **idee-starters** (stijlen, kleurpaletten, populaire thema's — uit `app/data/inspiration.js`), **community** (Instagram/TikTok follow-CTA's + werk-teaser) en CTA. i18n-namespace `inspiratie`. Gelinkt vanuit navbar-menu + footer; in `sitemap.js`. Content uitbreiden = objecten toevoegen in `app/data/inspiration.js`.

Community-sectie toont nu follow-CTA's; voor een **live IG/TikTok-feed** nog post-permalinks of widget + CSP nodig (zie TODO).

## TODO / in uitvoering
- [ ] **Community = live social feed:** nu follow-CTA's + teaser. Voor een echte embedded Instagram/TikTok-feed: post-permalinks aanleveren (officiële embeds) óf een widget kiezen (Behold/LightWidget) — daarna CSP in `next.config.mjs` verruimen (`www.instagram.com` / `www.tiktok.com` in script-src + frame-src).
- [ ] Optioneel: portfolio-animatie in de browser fijn-tunen (foto-hoogte `76vh`/`58vh`, focus-scale, pin-tempo) op basis van feedback eigenaar.
- [ ] Bij deploy: controleren of Analytics/Speed Insights data binnenkomen + CSP klopt in productie + `npm run build` draaien.

## Sessielog
- **2026-06-16** — Project ingelezen; geheugen-notitie + HANDOFF.md aangemaakt. Portfolio herbouwd naar GSAP pinned cinema-scroll (3 nieuwe binders toegevoegd, 12 totaal, NL+EN alts). GSAP 3.15 + @gsap/react geïnstalleerd. Vercel Analytics + Speed Insights toegevoegd, order-API → fra1, CSP bijgewerkt. Dev-server draait op :3001, `/nl` = 200, schoon gecompileerd.
- **2026-06-16 (vervolg)** — Foto-swap mewtwo/battle gecorrigeerd; cinema-scroll trager/filmischer. **Pivot:** alle portfoliodata naar `app/data/binders.js` (single source, geverifieerde beschrijvingen — koi/dialga/starters/kid gecorrigeerd). Homepage werd preview met CTA → nieuwe `/portfolio`-pagina. Drie GSAP-designs (A Showcase / B Grid+Flip / C Marquee) kiesbaar via `PORTFOLIO_DESIGN`, draaien op :3001/:3002/:3003 (eigen `distDir`). Alle servers `/nl/portfolio` = 200, geen fouten.
- **2026-06-16 (keuze)** — **Design A gekozen.** `page.js` geconsolideerd naar `DesignShowcase` (env-switch + dev-badge eruit; B/C-bestanden bewaard, niet geïmporteerd). Crop opgelost: foto's tonen nu in eigen verhouding (`<Image>` zonder `fill`, max-height 76vh/58vh). Beschrijvingen gecorrigeerd: Mimikyu zonder Amsterdam, #09 = Croconaw. Mobiele responsiveness aangescherpt (panels 1 kolom, rail verborgen, header-CTA compacter ≤560px, `overflow: clip`). Servers B/C (3002/3003) gestopt; A draait op :3001.
- **2026-06-16 (opschoning)** — `DesignGrid.js` + `DesignMarquee.js` verwijderd; `framer-motion` gedeïnstalleerd (geen imports meer). Homepage-preview ook naar **natuurlijke verhoudingen** (`--ar` per kaart, geen crop, geen horizontale parallax-overscan meer). `/nl` + `/nl/portfolio` = 200, schoon.
- **2026-06-16 (foto's + nav)** — Volledige foto's uit `Downloads\75_fotos` ingeladen: `mimikyu`/`psyduck`/`dialga`/`starters` vervangen door niet-afgesneden versies; **4 nieuwe binders** toegevoegd (Moltres, Lugia, Charmander, Chopper) → **16 totaal**. Preview-hapering opgelost (per-image `ScrollTrigger.refresh()` verwijderd; kaartmaat is al deterministisch). Portfolio-links toegevoegd in navbar (desktop + mobiel) en footer. `lucario`/`articuno` nog afgesneden in bron (geen vervanging aangeleverd) — zie TODO.
- **2026-06-16 (lucario+articuno)** — Volledige foto's voor `lucario` en `articuno` ingeladen (waren afgesneden). Alle 16 binders nu volledig in beeld; `/nl/portfolio` = 200, beide foto's laden, geen fouten.
- **2026-06-16 (preview = swipe-strip)** — Homepage-preview van gepinde cinema-scroll → **vrije swipe-strip met zachte auto-scroll** (geen scroll-hijack meer; verticaal scrollen loopt altijd door). GSAP van de homepage verwijderd (plain rAF + IntersectionObserver). `/nl` = 200, 16 kaarten, geen fouten.
- **2026-06-16 (navbar + consent)** — Navbar herbouwd: **logo gecentreerd** (grid 1fr/auto/1fr), **hamburger-menu op alle schermformaten** (titels in de uitklap: Hoe het werkt / Waarom wij / Portfolio / Inspiratie / FAQ), taalwissel + bestelknop rechts (knop verborgen ≤640px want sticky-bottom CTA dekt dat al — `stickyorder.js`, werkte al). **Consent geautomatiseerd**: verplichte checkbox verwijderd uit `orderform.js` (schema/defaults/JSX); de rechten-/vrijwaringstekst staat nu als impliciete "Door te versturen ga je akkoord…"-zin onder de verzendknop (`order.consent` herschreven, NL+EN).
- **2026-06-16 (inspiratie-pagina)** — Nieuwe `/inspiratie` (combinatie: blader op vibe + idee-starters + community). `app/data/inspiration.js` (stijlen/paletten/thema's/socials), `InspirationView.js`, route + metadata, i18n-namespace `inspiratie`. Community = follow-CTA's + teaser. `/nl/inspiratie` + `/en/inspiratie` = 200, geen fouten.
- **2026-06-16 (inspiratie → development)** — Kan geen échte IG/TikTok-posts embedden zonder post-URL's/widget. Daarom inspiratie **in development gezet**: links uit navbar + footer, `noindex,nofollow` op de pagina. Route blijft direct bereikbaar voor preview. Homepage inspiratie-links = 0, portfolio blijft live (3 links).
- **2026-06-16 (inspiratie live + sitemap)** — Inspiratie **gepubliceerd** met huidige content (links terug in navbar + footer, `noindex` verwijderd). `/portfolio` (prio 0.8) en `/inspiratie` (prio 0.6) toegevoegd aan `sitemap.js` (en/nl + hreflang). Community-feed nog follow-CTA's (live feed = openstaande TODO).
- **2026-06-16 (commit + deploy)** — Alles gecommit + gepusht naar `main` (zonder co-author trailer). Vercel-deploy `success`, nieuwe routes live op `www.75drawss.com`.
- **2026-06-16 (favicon)** — Standaard Next.js-favicon vervangen door 75drawss "75"-merkicoon via App Router-conventie: `app/favicon.ico` (1737 b, uit `public/icon.svg` via sharp), `app/icon.svg`, `app/apple-icon.png`; `metadata.icons` uit `layout.js` verwijderd. Live op productie (deploy `ca70e67` = success).
- **2026-06-16 (nav overal + inspiratie-fixes)** — `PortfolioHeader.js` verwijderd; **Navbar** (met hamburger) wordt nu op álle pagina's gebruikt — home-anchors locale-geprefixt (`/${locale}#...`) zodat ze cross-page werken vanaf /portfolio en /inspiratie. Inspiratie-elementen (blader-kaarten, stijl/palet-tegels, thema's) zijn **niet-klikbaar** gemaakt (`figure`/`div`/`span`) zodat bezoekers vrij scrollen zonder per ongeluk naar bestellen te gaan; alleen de expliciete CTA + navbar/footer linken naar `#order`. Mobiele spacing inspiratie aangescherpt (≤640px).
