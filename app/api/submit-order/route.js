import { NextResponse } from 'next/server'

// Run this function in Frankfurt — closest Vercel region to our NL/BE/FR
// audience, so Turnstile + Resend round-trips stay low-latency.
export const preferredRegion = 'fra1'
export const runtime = 'nodejs'

// Only these fields end up in the order email. Anything else the client sends
// is dropped, so a caller can never inject extra content.
const ALLOWED_FIELDS = [
  'subject', 'service_type', 'name', 'email', 'product_type', 'card_game',
  'design_file_url', 'design_description', 'special_requirements', 'budget',
  'source', 'quantity', 'pocket_size', 'binder_color', 'binder_condition',
  'binder_brand',
]

const LABELS = {
  service_type: 'Service', name: 'Name', email: 'Email', product_type: 'Product',
  card_game: 'Card game', design_file_url: 'Design file', design_description: 'Design description',
  special_requirements: 'Special requirements', budget: 'Budget', source: 'Source',
  quantity: 'Quantity', pocket_size: 'Pocket size', binder_color: 'Binder colour',
  binder_condition: 'Binder condition', binder_brand: 'Binder brand',
}

const MAX_LEN = 5000
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Best-effort in-memory rate limit (per warm serverless instance).
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 5
const hits = new Map()

function rateLimited(ip) {
  const now = Date.now()
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS)
  arr.push(now)
  hits.set(ip, arr)
  if (hits.size > 5000) hits.clear() // crude memory guard
  return arr.length > MAX_PER_WINDOW
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ))
}

// Short, human-friendly order reference. No ambiguous characters (0/O/1/I).
function makeRef() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const bytes = crypto.getRandomValues(new Uint8Array(6))
  let s = ''
  for (let i = 0; i < 6; i++) s += alphabet[bytes[i] % alphabet.length]
  return s
}

// Collapse arbitrary input to a single, length-capped line for an email subject.
function oneline(str, max = 40) {
  return String(str).replace(/\s+/g, ' ').trim().slice(0, max)
}

async function verifyTurnstile(token, ip) {
  const body = new URLSearchParams()
  body.append('secret', process.env.TURNSTILE_SECRET_KEY || '')
  body.append('response', token)
  if (ip && ip !== 'unknown') body.append('remoteip', ip)
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
    })
    const json = await res.json()
    return json.success === true
  } catch {
    return false
  }
}

// Customer-facing order confirmation, in the visitor's language.
// Returns a table-based, inline-styled HTML email (broad client support,
// incl. Outlook) AND a plain-text alternative. Sending multipart text+HTML —
// rather than HTML only — is a meaningful deliverability/anti-spam signal.
function buildConfirmation(locale, clean, ref) {
  const rawName = clean.name || ''
  const rawProduct = clean.product_type || ''
  const name = escapeHtml(rawName)
  const product = escapeHtml(rawProduct)
  const isNl = locale === 'nl'

  const subject = isNl
    ? `We hebben je aanvraag ontvangen (#${ref})`
    : `We received your request (#${ref})`

  const c = isNl ? {
    preheader: 'Bedankt! Je krijgt binnen 1–2 werkdagen een offerte op maat — betalen hoeft nu nog niet.',
    greeting: `Hoi ${name},`,
    intro: 'Bedankt voor je aanvraag bij 75Drawss. We hebben ’m goed ontvangen en gaan ermee aan de slag.',
    detailsHeading: 'Jouw aanvraag',
    refLabel: 'Referentie',
    productLabel: 'Product',
    nextHeading: 'Wat er nu gebeurt',
    next: 'We bekijken je aanvraag en sturen je binnen 1–2 werkdagen een offerte op maat. Je hoeft nu nog niets te betalen.',
    replyNote: 'Een vraag of wil je iets aanvullen? Antwoord gewoon op deze e-mail — dan reageren we persoonlijk.',
    signoff: 'Groet,',
    team: 'Het 75Drawss-team',
    tagline: 'Handgemaakte custom TCG-accessoires · Nederland',
    auto: 'Dit is een automatische bevestiging van je aanvraag. Je offerte volgt apart.',
  } : {
    preheader: 'Thanks! You’ll get a tailored quote within 1–2 business days — no payment needed yet.',
    greeting: `Hi ${name},`,
    intro: 'Thanks for your request at 75Drawss. We’ve received it and we’re on it.',
    detailsHeading: 'Your request',
    refLabel: 'Reference',
    productLabel: 'Product',
    nextHeading: 'What happens next',
    next: 'We’ll review your request and send you a tailored quote within 1–2 business days. No payment is required yet.',
    replyNote: 'Got a question or something to add? Just reply to this email — a real person will get back to you.',
    signoff: 'Best,',
    team: 'The 75Drawss team',
    tagline: 'Handmade custom TCG accessories · The Netherlands',
    auto: 'This is an automatic confirmation of your request. Your quote will follow separately.',
  }

  const productRow = product
    ? `<tr><td style="padding:4px 0;color:#666;font-size:13px">${c.productLabel}</td><td style="padding:4px 0 4px 16px;color:#0a0a0a;font-size:13px;font-weight:600">${product}</td></tr>`
    : ''

  const html = `<!DOCTYPE html>
<html lang="${isNl ? 'nl' : 'en'}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><title>75Drawss</title></head>
<body style="margin:0;padding:0;background:#f4f4f2;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#f4f4f2;font-size:1px;line-height:1px">${c.preheader}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f4f2">
    <tr><td align="center" style="padding:32px 16px">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;background:#ffffff;border:1px solid #e7e7e3;border-radius:8px;overflow:hidden">
        <tr><td style="height:4px;background:#F5B301;font-size:0;line-height:0">&nbsp;</td></tr>
        <tr><td style="padding:28px 32px 4px">
          <span style="font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:600;letter-spacing:0.01em;color:#0a0a0a">75Drawss</span>
        </td></tr>
        <tr><td style="padding:12px 32px 24px;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0a0a0a">
          <p style="margin:0 0 16px;font-size:15px;line-height:1.6">${c.greeting}</p>
          <p style="margin:0 0 24px;font-size:15px;line-height:1.6">${c.intro}</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#faf9f6;border:1px solid #ececea;border-radius:6px;margin:0 0 24px">
            <tr><td style="padding:16px 18px">
              <p style="margin:0 0 10px;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#999;font-weight:700">${c.detailsHeading}</p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr><td style="padding:4px 0;color:#666;font-size:13px">${c.refLabel}</td><td style="padding:4px 0 4px 16px;color:#0a0a0a;font-size:13px;font-weight:700">#${ref}</td></tr>
                ${productRow}
              </table>
            </td></tr>
          </table>
          <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#0a0a0a">${c.nextHeading}</p>
          <p style="margin:0 0 24px;font-size:15px;line-height:1.6">${c.next}</p>
          <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#555">${c.replyNote}</p>
          <p style="margin:0;font-size:15px;line-height:1.6">${c.signoff}<br>${c.team}</p>
        </td></tr>
        <tr><td style="padding:20px 32px 28px;border-top:1px solid #ececea;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
          <p style="margin:0 0 4px;font-size:13px;color:#0a0a0a;font-weight:600">75Drawss</p>
          <p style="margin:0 0 12px;font-size:12px;color:#888">${c.tagline}</p>
          <p style="margin:0 0 12px;font-size:12px">
            <a href="https://www.75drawss.com" style="color:#0a0a0a;text-decoration:underline">75drawss.com</a>
            &nbsp;·&nbsp;
            <a href="https://instagram.com/75.drawss" style="color:#0a0a0a;text-decoration:underline">Instagram</a>
            &nbsp;·&nbsp;
            <a href="https://tiktok.com/@75drawss" style="color:#0a0a0a;text-decoration:underline">TikTok</a>
          </p>
          <p style="margin:0;font-size:11px;color:#aaa;line-height:1.5">${c.auto}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  const text = [
    isNl ? `Hoi ${rawName},` : `Hi ${rawName},`,
    '',
    c.intro,
    '',
    `${c.refLabel}: #${ref}`,
    rawProduct ? `${c.productLabel}: ${rawProduct}` : null,
    '',
    c.nextHeading,
    c.next,
    '',
    c.replyNote,
    '',
    c.signoff,
    c.team,
    '',
    `75Drawss — ${c.tagline}`,
    '75drawss.com · Instagram @75.drawss · TikTok @75drawss',
    '',
    c.auto,
  ].filter((line) => line !== null).join('\n')

  return { subject, html, text }
}

// One-click "send quote" mailto for the owner: opens a ready-made quote email
// to the customer (in their language) with only price + payment link to fill in.
function buildQuoteMailto(locale, clean, customerEmail) {
  const name = clean.name || ''
  const product = clean.product_type || ''
  const isNl = locale === 'nl'

  const subject = isNl
    ? 'Je offerte van 75Drawss'
    : 'Your quote from 75Drawss'

  const body = isNl
    ? `Hoi ${name},

Bedankt voor je aanvraag bij 75Drawss! Hier is je offerte op maat:

Product: ${product}
Prijs: € [VUL IN]
Levertijd: [VUL IN] werkdagen na betaling

Ga je akkoord? Dan kun je betalen via deze link:
[BETAALLINK]

Zodra de betaling binnen is, gaan we voor je aan de slag. Vragen of aanpassingen? Antwoord gewoon op deze mail.

Groet,
75Drawss`
    : `Hi ${name},

Thanks for your request at 75Drawss! Here is your tailored quote:

Product: ${product}
Price: € [FILL IN]
Lead time: [FILL IN] business days after payment

Happy to proceed? You can pay via this link:
[PAYMENT LINK]

Once the payment arrives we'll get started. Questions or changes? Just reply to this email.

Best,
75Drawss`

  return `mailto:${customerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

async function sendEmail(payload) {
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
}

export async function POST(request) {
  try {
    const body = await request.json()

    // Honeypot: real users never fill this hidden field.
    if (typeof body.botcheck === 'string' && body.botcheck.trim() !== '') {
      return NextResponse.json({ success: true }) // silently accept, don't email
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (rateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    // Cloudflare Turnstile — block anything without a valid human token.
    const token = typeof body['cf-turnstile-response'] === 'string' ? body['cf-turnstile-response'] : ''
    if (!token || !(await verifyTurnstile(token, ip))) {
      return NextResponse.json({ error: 'Captcha verification failed' }, { status: 400 })
    }

    // Required-field validation.
    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const productType = typeof body.product_type === 'string' ? body.product_type.trim() : ''
    if (name.length < 2 || !EMAIL_RE.test(email) || productType.length < 1) {
      return NextResponse.json({ error: 'Invalid submission' }, { status: 400 })
    }

    // Whitelist + length-cap, then build the email.
    const clean = {}
    for (const key of ALLOWED_FIELDS) {
      const val = body[key]
      if (val === undefined || val === null || val === '') continue
      clean[key] = typeof val === 'string' ? val.slice(0, MAX_LEN) : val
    }

    // Unique, scannable order reference + a concise, informative subject line
    // so each order stands out and can be triaged in the inbox without opening it.
    const ref = makeRef()
    const serviceShort = clean.service_type === 'Customize my product' ? 'Customize' : 'Build'
    const subjectLine = `🆕 ${oneline(clean.product_type, 30)} — ${oneline(clean.name, 30)} · ${serviceShort} #${ref}`

    const labelCell = 'padding:8px 14px;border:1px solid #ececea;background:#faf9f6;font-weight:600;color:#444;font-size:14px;vertical-align:top;white-space:nowrap'
    const valueCell = 'padding:8px 14px;border:1px solid #ececea;color:#0a0a0a;font-size:14px;vertical-align:top'
    const refRow = `<tr><td style="${labelCell}">Reference</td><td style="${valueCell}"><strong>#${ref}</strong></td></tr>`
    const rows = ALLOWED_FIELDS
      .filter((k) => k !== 'subject' && clean[k] !== undefined)
      .map((k) => `<tr><td style="${labelCell}">${LABELS[k] || k}</td><td style="${valueCell}">${escapeHtml(clean[k])}</td></tr>`)
      .join('')

    const quoteHref = buildQuoteMailto(body.locale === 'nl' ? 'nl' : 'en', clean, email)
    const titleLine = escapeHtml(`${clean.product_type} — ${clean.name}`)

    // Internal order notification — same brand shell as the customer
    // confirmation (accent bar, serif wordmark, card, footer), but carrying the
    // full order table + the one-click "send quote" CTA.
    const html = `<!DOCTYPE html>
<html lang="nl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><title>75Drawss</title></head>
<body style="margin:0;padding:0;background:#f4f4f2;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#f4f4f2;font-size:1px;line-height:1px">${escapeHtml(serviceShort)} · ${titleLine} · #${ref}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f4f2">
    <tr><td align="center" style="padding:32px 16px">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;background:#ffffff;border:1px solid #e7e7e3;border-radius:8px;overflow:hidden">
        <tr><td style="height:4px;background:#F5B301;font-size:0;line-height:0">&nbsp;</td></tr>
        <tr><td style="padding:24px 32px 0;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
          <span style="font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:600;letter-spacing:0.01em;color:#0a0a0a">75Drawss</span>
          <span style="float:right;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#999;font-weight:700;padding-top:8px">Nieuwe aanvraag</span>
        </td></tr>
        <tr><td style="padding:16px 32px 24px;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0a0a0a">
          <h2 style="font-weight:600;margin:0 0 2px;font-size:18px">${titleLine}</h2>
          <p style="margin:0 0 18px;color:#666;font-size:13px">${escapeHtml(serviceShort)} · Ref <strong>#${ref}</strong></p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-size:14px">${refRow}${rows}</table>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:22px"><tr><td style="border-radius:6px;background:#F5B301">
            <a href="${quoteHref}" style="display:inline-block;color:#0a0a0a;padding:12px 22px;text-decoration:none;font-weight:600;font-size:14px;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">✉️ Offerte sturen naar klant</a>
          </td></tr></table>
          <p style="font-size:12px;color:#888;margin:8px 0 0">Opent een kant-en-klare offerte-mail aan de klant — vul alleen de prijs en betaallink in.</p>
        </td></tr>
        <tr><td style="padding:16px 32px 24px;border-top:1px solid #ececea;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
          <p style="margin:0;font-size:11px;color:#aaa;line-height:1.5">Interne notificatie · 75Drawss · Antwoorden gaat rechtstreeks naar de klant (${escapeHtml(clean.email || '')}).</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

    // Plain-text twin of the order notification (multipart text+HTML).
    const orderText = [
      `${serviceShort} · ${clean.product_type} — ${clean.name}`,
      `Reference: #${ref}`,
      '',
      ...ALLOWED_FIELDS
        .filter((k) => k !== 'subject' && clean[k] !== undefined)
        .map((k) => `${LABELS[k] || k}: ${clean[k]}`),
    ].join('\n')

    // 1. Order notification to us (must succeed).
    const res = await sendEmail({
      from: process.env.ORDER_FROM_EMAIL,
      to: process.env.ORDER_TO_EMAIL,
      reply_to: email,
      subject: subjectLine,
      html,
      text: orderText,
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'Submission failed' }, { status: 502 })
    }

    // 2. Confirmation to the customer (best-effort — never fails the request).
    try {
      const locale = body.locale === 'nl' ? 'nl' : 'en'
      const { subject, html: confirmHtml, text: confirmText } = buildConfirmation(locale, clean, ref)
      await sendEmail({
        from: process.env.ORDER_FROM_EMAIL,
        to: email,
        reply_to: process.env.ORDER_TO_EMAIL,
        subject,
        html: confirmHtml,
        text: confirmText,
      })
    } catch {
      // Confirmation is non-critical; the order already reached us.
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
