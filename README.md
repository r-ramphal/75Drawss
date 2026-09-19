# 75Drawss

Marketing- en bestelsite van 75Drawss: handgemaakte custom TCG-accessoires (binders, deckboxes, displaycases, sleeves) op bestelling, gemaakt in Nederland, geleverd in NL, BE en FR. Live op [www.75drawss.com](https://www.75drawss.com), Nederlands en Engels.

## Stack

- Next.js 16 (App Router) + React 19
- next-intl — talen `nl` en `en`, altijd met locale-prefix in de URL; alle teksten in `messages/nl.json` en `messages/en.json`
- GSAP 3 — centrale plugin-registratie in `app/lib/gsap.js`, scroll-reveals via `app/lib/useReveal.js`
- react-hook-form + zod — bestelformulier
- Cloudinary (upload), Cloudflare Turnstile (captcha), Resend (order-mails)
- Vercel Analytics + Speed Insights

## Structuur

```
app/[locale]/           homepage, portfolio, inspiratie, bedankt, privacy, voorwaarden
app/[locale]/layout.js  fonts (Rubik, Archivo), SEO-metadata, Navbar + AppBar + ConsentBanner
app/api/submit-order/   order-backend (honeypot, rate-limit, Turnstile, Resend)
app/components/home/    secties van de homepage: Hero, Manifesto, Services, Work, Process, SendIn, Contact
app/components/         navbar, appbar (mobiele tabbalk), footer, orderform, faq, languageswitcher, ...
app/components/shared/  werkdata (WORKS) en iconen/logo
app/data/binders.js     de 16 portfoliostukken (single source)
app/globals.css         design tokens en gedeelde utilities (.site-*)
public/portfolio/       productfoto's
```

## Lokaal draaien

```bash
npm install
npm run dev
```

Kopieer `.env.example` naar `.env.local` en vul de sleutels in; zonder sleutels rendert het formulier wel, maar upload, captcha en verzenden werken niet.

Controle voor een push:

```bash
npm run lint
npm run build
```

## Werkafspraken

- Teksten alleen via next-intl; nieuwe keys in **beide** taalbestanden.
- Styling per component in een `<style>`-blok, uitsluitend met de tokens uit `app/globals.css`.
- Een binder toevoegen: foto in `public/portfolio/`, import + object in `app/data/binders.js`; homepage-index, portfolio en filters volgen automatisch.
- Nieuwe externe scripts of domeinen: CSP in `next.config.mjs` aanpassen.
- `HANDOFF.md` bevat de projectstand, beslissingen en het sessielog.
