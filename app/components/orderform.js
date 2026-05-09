'use client'
import { useState } from 'react'

const CLOUDINARY_CLOUD = 'dk3d5ejyz'
const CLOUDINARY_PRESET = '75drawss'

export default function OrderForm() {
  const [qty, setQty] = useState(1)
  const [fileName, setFileName] = useState('')
  const [fileUrl, setFileUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleFileChange(e) {
    const file = e.target.files[0]
    if (!file) return
    setFileName(file.name)
    setUploading(true)
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', CLOUDINARY_PRESET)
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/auto/upload`, {
        method: 'POST',
        body: data,
      })
      const json = await res.json()
      setFileUrl(json.secure_url)
    } catch {
      alert('File upload failed. Please try again.')
    }
    setUploading(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.target)
    if (fileUrl) formData.set('design_file_url', fileUrl)
    const res = await fetch(e.target.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' },
    })
    if (res.ok) { setSubmitted(true) }
    else { alert('Something went wrong. Please try again.'); setLoading(false) }
  }

  const label = { fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#999', marginBottom: '0.4rem', display: 'block' }
  const input = { background: '#fff', border: '1px solid #000', color: '#000', fontSize: '0.875rem', fontWeight: 300, padding: '0.75rem 1rem', borderRadius: 0, outline: 'none', width: '100%', fontFamily: 'inherit' }

  return (
    <>
      <style>{`
        .order-input:focus { background: #f8f8f8 !important; }
        .submit-btn { background: #000; color: #fff; font-size: 0.85rem; font-weight: 500; padding: 0.875rem 2rem; border: none; border-radius: 100px; cursor: pointer; transition: background 0.15s; flex-shrink: 0; }
        .submit-btn:hover { background: #333; }
        .submit-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .qty-btn { font-size: 0.8rem; padding: 0.5rem 1rem; cursor: pointer; transition: all 0.15s; font-family: inherit; }
        .order-section { padding: 7rem 3rem; }
        .order-grid { display: grid; grid-template-columns: 1fr 1.6fr; gap: 6rem; align-items: start; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        .dim-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.75rem; }
        .form-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 2rem; padding-top: 1.75rem; border-top: 1px solid #000; gap: 1rem; flex-wrap: wrap; }
        @media (max-width: 768px) {
          .order-section { padding: 4rem 1.5rem !important; }
          .order-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .form-grid { grid-template-columns: 1fr !important; }
          .dim-row { grid-template-columns: 1fr 1fr !important; }
          .form-footer { flex-direction: column; align-items: stretch; }
          .submit-btn { text-align: center; }
        }
      `}</style>

      <div style={{ background: '#fff', borderTop: '1px solid #000', borderBottom: '1px solid #000' }} id="order">
        <div className="order-section" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="order-grid">

            <div>
              <p style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#999', marginBottom: '1rem' }}>Place an order</p>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '1rem', color: '#000' }}>
                Tell us about<br/>your binder
              </h2>
              <p style={{ fontSize: '0.875rem', color: '#555', lineHeight: 1.8, fontWeight: 300, marginBottom: '2.5rem' }}>
                Fill in the form and we'll get back to you with a quote within 1–2 business days. No payment required yet.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {['Free quote, no commitment', 'Upload your own artwork', 'Any dimensions, any TCG', 'Ships anywhere in NL and abroad', 'Reply within 1–2 business days'].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem', color: '#555', fontWeight: 300 }}>
                    <span style={{ width: 5, height: 5, background: '#000', borderRadius: '50%', flexShrink: 0, display: 'block' }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#fff', border: '1px solid #000', padding: '2.5rem' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
                  <div style={{ width: 48, height: 48, background: '#000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#fff', fontSize: '1.1rem' }}>✓</div>
                  <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', fontWeight: 300, marginBottom: '0.75rem', color: '#000' }}>Order received</h3>
                  <p style={{ fontSize: '0.875rem', color: '#555', fontWeight: 300, lineHeight: 1.7 }}>Thanks for reaching out. We'll review your details and reply within 1–2 business days.</p>
                </div>
              ) : (
                <form action="https://formspree.io/f/xjglazye" method="POST" onSubmit={handleSubmit}>
                  <div className="form-grid">

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <label style={label}>Full name <span style={{ color: '#000' }}>*</span></label>
                      <input className="order-input" style={input} type="text" name="name" placeholder="Jan de Vries" required />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <label style={label}>Email address <span style={{ color: '#000' }}>*</span></label>
                      <input className="order-input" style={input} type="email" name="email" placeholder="jan@example.nl" required />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <label style={label}>Card game <span style={{ color: '#000' }}>*</span></label>
                      <select className="order-input" style={input} name="card_game" required defaultValue="">
                        <option value="" disabled>Select your TCG...</option>
                        <option>Pokémon</option>
                        <option>Magic: The Gathering</option>
                        <option>Yu-Gi-Oh!</option>
                        <option>One Piece TCG</option>
                        <option>Lorcana</option>
                        <option>Flesh and Blood</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <label style={label}>Pocket layout <span style={{ color: '#000' }}>*</span></label>
                      <select className="order-input" style={input} name="pocket_layout" required defaultValue="">
                        <option value="" disabled>Select layout...</option>
                        <option>4-pocket (2×2)</option>
                        <option>9-pocket (3×3)</option>
                        <option>12-pocket (3×4)</option>
                        <option>Side-loading 9-pocket</option>
                        <option>Custom / Not sure</option>
                      </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gridColumn: '1 / -1' }}>
                      <label style={label}>Binder dimensions (cm) <span style={{ color: '#000' }}>*</span></label>
                      <div className="dim-row">
                        <input className="order-input" style={input} type="number" name="width_cm" placeholder="Width" min="1" step="0.1" required />
                        <input className="order-input" style={input} type="number" name="height_cm" placeholder="Height" min="1" step="0.1" required />
                        <input className="order-input" style={input} type="number" name="depth_cm" placeholder="Spine depth" min="0.5" step="0.1" required />
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gridColumn: '1 / -1' }}>
                      <label style={label}>Quantity</label>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {[1, 2, 3, 5, 10].map(n => (
                          <button key={n} type="button" className="qty-btn" onClick={() => setQty(n)} style={{
                            background: qty === n ? '#000' : '#fff',
                            border: '1px solid #000',
                            color: qty === n ? '#fff' : '#000',
                          }}>{n}{n === 10 ? '+' : ''}</button>
                        ))}
                      </div>
                      <input type="hidden" name="quantity" value={qty} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gridColumn: '1 / -1' }}>
                      <label style={label}>Design file upload</label>
                      <div style={{ border: '1px dashed #000', padding: '1.75rem', textAlign: 'center', background: '#fff', position: 'relative' }}>
                        <input type="file" accept=".jpg,.jpeg,.png,.pdf,.ai,.psd,.svg"
                          onChange={handleFileChange}
                          style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }} />
                        <p style={{ fontSize: '0.8rem', color: '#555', fontWeight: 300 }}>
                          <strong style={{ color: '#000', fontWeight: 500 }}>Click to upload</strong> or drag & drop
                        </p>
                        <p style={{ fontSize: '0.7rem', color: '#999', marginTop: '0.3rem' }}>JPG, PNG, PDF, AI, PSD, SVG · max 10MB</p>
                        {uploading && <p style={{ fontSize: '0.75rem', color: '#555', marginTop: '0.5rem' }}>Uploading...</p>}
                        {fileUrl && !uploading && <p style={{ fontSize: '0.75rem', color: '#000', marginTop: '0.5rem' }}>✓ {fileName} uploaded</p>}
                      </div>
                      {fileUrl && <input type="hidden" name="design_file_url" value={fileUrl} />}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gridColumn: '1 / -1' }}>
                      <label style={label}>Design description</label>
                      <textarea className="order-input" style={{ ...input, minHeight: 110, resize: 'vertical' }} name="design_description" placeholder="Describe your design — colours, theme, style, any text you want included, references, etc." />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gridColumn: '1 / -1' }}>
                      <label style={label}>Special requirements</label>
                      <textarea className="order-input" style={{ ...input, minHeight: 80, resize: 'vertical' }} name="special_requirements" placeholder="Foil finish, specific materials, reinforced spine, deadline..." />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <label style={label}>Approximate budget (€)</label>
                      <select className="order-input" style={input} name="budget" defaultValue="">
                        <option value="" disabled>Select range...</option>
                        <option>Under €30</option>
                        <option>€30 – €60</option>
                        <option>€60 – €100</option>
                        <option>€100 – €200</option>
                        <option>€200+</option>
                        <option>Flexible</option>
                      </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <label style={label}>How did you find us?</label>
                      <select className="order-input" style={input} name="source" defaultValue="">
                        <option value="" disabled>Select...</option>
                        <option>Instagram</option>
                        <option>TikTok</option>
                        <option>Friend / Word of mouth</option>
                        <option>Reddit</option>
                        <option>Google</option>
                        <option>Other</option>
                      </select>
                    </div>

                  </div>

                  <div className="form-footer">
                    <p style={{ fontSize: '0.75rem', color: '#999', fontWeight: 300, lineHeight: 1.6 }}>
                      No payment required yet.<br/>We'll reply within 1–2 business days.
                    </p>
                    <button type="submit" className="submit-btn" disabled={loading || uploading}>
                      {loading ? 'Sending...' : uploading ? 'Uploading file...' : 'Send order request →'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}