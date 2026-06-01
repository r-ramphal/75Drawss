import { NextResponse } from 'next/server'

// Only these fields are forwarded to Web3Forms. Anything else the client sends
// is dropped, so a caller can never override access_key / inject extra fields.
const ALLOWED_FIELDS = [
  'subject', 'service_type', 'name', 'email', 'product_type', 'card_game',
  'design_file_url', 'design_description', 'special_requirements', 'budget',
  'source', 'quantity', 'pocket_size', 'binder_color', 'binder_condition',
  'binder_brand',
]

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

    // Required-field validation.
    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const productType = typeof body.product_type === 'string' ? body.product_type.trim() : ''
    if (name.length < 2 || !EMAIL_RE.test(email) || productType.length < 1) {
      return NextResponse.json({ error: 'Invalid submission' }, { status: 400 })
    }

    // Whitelist + length-cap the payload.
    const clean = {}
    for (const key of ALLOWED_FIELDS) {
      const val = body[key]
      if (val === undefined || val === null) continue
      clean[key] = typeof val === 'string' ? val.slice(0, MAX_LEN) : val
    }

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...clean,
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
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
