import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        ...body,
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
