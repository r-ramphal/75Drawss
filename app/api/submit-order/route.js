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
function buildConfirmation(locale, clean, ref) {
  const name = escapeHtml(clean.name || '')
  const product = escapeHtml(clean.product_type || '')
  const isNl = locale === 'nl'

  const subject = isNl
    ? `We hebben je aanvraag ontvangen (#${ref}) — 75Drawss`
    : `We received your request (#${ref}) — 75Drawss`

  const greeting = isNl ? `Hoi ${name},` : `Hi ${name},`
  const intro = isNl
    ? 'Bedankt voor je aanvraag bij 75Drawss! We hebben ’m goed ontvangen.'
    : 'Thanks for your request at 75Drawss! We’ve received it.'
  const refLabel = isNl ? 'Referentie' : 'Reference'
  const productLabel = isNl ? 'Product' : 'Product'
  const detailLines = [
    `<strong>${refLabel}:</strong> #${ref}`,
    product ? `<strong>${productLabel}:</strong> ${product}` : '',
  ].filter(Boolean).join('<br/>')
  const next = isNl
    ? 'We bekijken je aanvraag en sturen je binnen 1–2 werkdagen een offerte op maat. Je hoeft nu nog niets te betalen.'
    : 'We’ll review your request and send you a tailored quote within 1–2 business days. No payment is required yet.'
  const replyNote = isNl
    ? 'Vragen? Antwoord gewoon op deze e-mail.'
    : 'Questions? Just reply to this email.'
  const signoff = isNl ? 'Groet,<br/>75Drawss' : 'Best,<br/>75Drawss'
  const auto = isNl
    ? 'Dit is een automatische bevestiging van je aanvraag.'
    : 'This is an automatic confirmation of your request.'

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#0a0a0a;max-width:560px;line-height:1.7">
      <p style="font-size:15px">${greeting}</p>
      <p style="font-size:15px">${intro}</p>
      <p style="font-size:14px;background:#f5f5f3;border:1px solid #e5e5e5;padding:10px 14px">${detailLines}</p>
      <p style="font-size:15px">${next}</p>
      <p style="font-size:14px;color:#555">${replyNote}</p>
      <p style="font-size:15px;margin-top:24px">${signoff}</p>
      <hr style="border:none;border-top:1px solid #e5e5e5;margin:24px 0"/>
      <p style="font-size:12px;color:#888">${auto}</p>
    </div>`

  return { subject, html }
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

    const refRow = `<tr><td style="padding:6px 12px;font-weight:600;background:#f5f5f3;border:1px solid #e5e5e5;vertical-align:top">Reference</td><td style="padding:6px 12px;border:1px solid #e5e5e5"><strong>#${ref}</strong></td></tr>`
    const rows = ALLOWED_FIELDS
      .filter((k) => k !== 'subject' && clean[k] !== undefined)
      .map((k) => `<tr><td style="padding:6px 12px;font-weight:600;background:#f5f5f3;border:1px solid #e5e5e5;vertical-align:top">${LABELS[k] || k}</td><td style="padding:6px 12px;border:1px solid #e5e5e5">${escapeHtml(clean[k])}</td></tr>`)
      .join('')

    const quoteHref = buildQuoteMailto(body.locale === 'nl' ? 'nl' : 'en', clean, email)

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#0a0a0a">
        <h2 style="font-weight:600;margin:0 0 2px">${escapeHtml(`${clean.product_type} — ${clean.name}`)}</h2>
        <p style="margin:0 0 16px;color:#555;font-size:13px">${escapeHtml(serviceShort)} · Ref <strong>#${ref}</strong></p>
        <table style="border-collapse:collapse;font-size:14px">${refRow}${rows}</table>
        <a href="${quoteHref}" style="display:inline-block;margin-top:20px;background:#F5B301;color:#0a0a0a;padding:11px 20px;border-radius:6px;text-decoration:none;font-weight:600;font-size:14px">✉️ Offerte sturen naar klant</a>
        <p style="font-size:12px;color:#888;margin-top:8px">Opent een kant-en-klare offerte-mail aan de klant — vul alleen de prijs en betaallink in.</p>
      </div>`

    // 1. Order notification to us (must succeed).
    const res = await sendEmail({
      from: process.env.ORDER_FROM_EMAIL,
      to: process.env.ORDER_TO_EMAIL,
      reply_to: email,
      subject: subjectLine,
      html,
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'Submission failed' }, { status: 502 })
    }

    // 2. Confirmation to the customer (best-effort — never fails the request).
    try {
      const locale = body.locale === 'nl' ? 'nl' : 'en'
      const { subject, html: confirmHtml } = buildConfirmation(locale, clean, ref)
      await sendEmail({
        from: process.env.ORDER_FROM_EMAIL,
        to: email,
        reply_to: process.env.ORDER_TO_EMAIL,
        subject,
        html: confirmHtml,
      })
    } catch {
      // Confirmation is non-critical; the order already reached us.
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
