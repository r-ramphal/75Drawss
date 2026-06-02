import { NextResponse } from 'next/server'

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

    const rows = ALLOWED_FIELDS
      .filter((k) => k !== 'subject' && clean[k] !== undefined)
      .map((k) => `<tr><td style="padding:6px 12px;font-weight:600;background:#f5f5f3;border:1px solid #e5e5e5;vertical-align:top">${LABELS[k] || k}</td><td style="padding:6px 12px;border:1px solid #e5e5e5">${escapeHtml(clean[k])}</td></tr>`)
      .join('')

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#0a0a0a">
        <h2 style="font-weight:600">${escapeHtml(clean.subject || 'New 75Drawss Order')}</h2>
        <table style="border-collapse:collapse;font-size:14px">${rows}</table>
      </div>`

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.ORDER_FROM_EMAIL,
        to: process.env.ORDER_TO_EMAIL,
        reply_to: email,
        subject: clean.subject || 'New 75Drawss Order',
        html,
      }),
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'Submission failed' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
