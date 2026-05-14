'use client'
import { useState } from 'react'

const CLOUDINARY_CLOUD = 'dk3d5ejyz'
const CLOUDINARY_PRESET = '75drawss'

export default function OrderForm() {
  const [service, setService] = useState('build')
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
    const form = e.target
    const data = {
      access_key: '1149a1c9-e4f5-4f6b-84b6-d1f37306db73',
      subject: `New 75Drawss Order — ${service === 'build' ? 'Build My Product' : 'Customize My Product'}`,
      service_type: service === 'build' ? 'Build my product' : 'Customize my product',
      name: form.name.value,
      email: form.email.value,
      product_type: form.product_type.value,
      card_game: form.card_game.value,
      design_file_url: fileUrl || 'No file uploaded',
      design_description: form.design_description.value,
      special_requirements: form.special_requirements.value,
      budget: form.budget.value,
      source: form.source.value,
      quantity: qty,
      ...(service === 'build' && {
        width_cm: form.width_cm.value,
        height_cm: form.height_cm.value,
        depth_cm: form.depth_cm.value,
      }),
      ...(service === 'customize' && {
        binder_condition: form.binder_condition.value,
        binder_brand: form.binder_brand.value,
      }),
    }
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
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
        .service-toggle { display: flex; border: 1px solid #000; margin-bottom: 2rem; }
        .service-btn { flex: 1; padding: 0.875rem 1rem; font-family: inherit; font-size: 0.85rem; font-weight: 500; cursor: pointer; border: none; transition: all 0.15s; text-align: center; }
        .service-btn.active { background: #000; color: #fff; }
        .service-btn.inactive { background: #fff; color: #000; }
        .service-btn.inactive:hover { background: #f8f8f8; }
        .send-in-box { background: #f8f8f8; border: 1px solid #000; padding: 1.5rem; margin-bottom: 1.25rem; grid-column: 1 / -1; }
        .send-in-box h4 { font-size: 0.8rem; font-weight: 500; margin-bottom: 0.5rem; }
        .send-in-box p { font-size: 0.8rem; color: #555; line-height: 1.7; font-weight: 300; }
        .send-in-box ul { margin-top: 0.5rem; padding-left: 1.25rem; }
        .send-in-box ul li { font-size: 0.8rem; color: #555; line-height: 1.8; font-weight: 300; }
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

            {/* LEFT INFO */}
            <div>
              <p style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#999', marginBottom: '1rem' }}>Start a project</p>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '1rem', color: '#000' }}>
                Tell us about<br/>your idea
              </h2>
              <p style={{ fontSize: '0.875rem', color: '#555', lineHeight: 1.8, fontWeight: 300, marginBottom: '2.5rem' }}>
                {service === 'build'
                  ? 'Tell us what you want made. We\'ll get back to you within 1–2 business days with a quote. No payment required yet.'
                  : 'Send us your product and we\'ll customize it for you. Fill in the form and we\'ll reply with a quote and our shipping address.'}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {(service === 'build' ? [
                  'Free quote, no commitment',
                  'Upload your own artwork',
                  'Any product, any dimensions',
                  'Ships anywhere in NL and abroad',
                  'Reply within 1–2 business days',
                ] : [
                  'Free quote, no commitment',
                  'Send your product to us',
                  'We customize and send it back',
                  'Upload your design or describe it',
                  'Reply within 1–2 business days',
                ]).map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem', color: '#555', fontWeight: 300 }}>
                    <span style={{ width: 5, height: 5, background: '#000', borderRadius: '50%', flexShrink: 0, display: 'block' }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* FORM */}
            <div style={{ background: '#fff', border: '1px solid #000', padding: '2.5rem' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
                  <div style={{ width: 48, height: 48, background: '#000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#fff', fontSize: '1.1rem' }}>✓</div>
                  <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', fontWeight: 300, marginBottom: '0.75rem', color: '#000' }}>Order received</h3>
                  <p style={{ fontSize: '0.875rem', color: '#555', fontWeight: 300, lineHeight: 1.7 }}>
                    {service === 'build'
                      ? 'Thanks for reaching out. We\'ll review your details and reply within 1–2 business days.'
                      : 'Thanks! We\'ll reply within 1–2 business days with a quote and our shipping address so you can send your product.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>

                  {/* SERVICE TOGGLE */}
                  <div className="service-toggle">
                    <button type="button" className={`service-btn ${service === 'build' ? 'active' : 'inactive'}`} onClick={() => setService('build')}>
                      Build my product
                    </button>
                    <button type="button" className={`service-btn ${service === 'customize' ? 'active' : 'inactive'}`} onClick={() => setService('customize')}>
                      Customize my product
                    </button>
                  </div>

                  <div className="form-grid">

                    {/* SEND-IN INFO BOX */}
                    {service === 'customize' && (
                      <div className="send-in-box">
                        <h4>How to send your product</h4>
                        <p>After we confirm your quote, send your product to our address. Please make sure to:</p>
                        <ul>
                          <li>Pack it well in a sturdy box with bubble wrap</li>
                          <li>Use PostNL or DHL with a tracking code</li>
                          <li>For valuable items, use aangetekende post</li>
                          <li>Keep your tracking code until it arrives</li>
                        </ul>
                      </div>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <label style={label}>Full name <span style={{ color: '#000' }}>*</span></label>
                      <input className="order-input" style={input} type="text" name="name" placeholder="Jan de Vries" required />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <label style={label}>Email address <span style={{ color: '#000' }}>*</span></label>
                      <input className="order-input" style={input} type="email" name="email" placeholder="jan@example.nl" required />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <label style={label}>Product type <span style={{ color: '#000' }}>*</span></label>
                      <select className="order-input" style={input} name="product_type" required defaultValue="">
                        <option value="" disabled>Select product...</option>
                        <option>TCG Binder</option>
                        <option>Deck Box</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <label style={label}>Card game (if applicable)</label>
                      <select className="order-input" style={input} name="card_game" defaultValue="">
                        <option value="" disabled>Select your TCG...</option>
                        <option>Pokémon</option>
                        <option>One Piece TCG</option>
                        <option>Lorcana</option>
                        <option>Not applicable</option>
                        <option>Other</option>
                      </select>
                    </div>

                    {/* BUILD ONLY — dimensions */}
                    {service === 'build' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gridColumn: '1 / -1' }}>
                        <label style={label}>Dimensions (cm)</label>
                        <div className="dim-row">
                          <input className="order-input" style={input} type="number" name="width_cm" placeholder="Width" min="1" step="0.1" />
                          <input className="order-input" style={input} type="number" name="height_cm" placeholder="Height" min="1" step="0.1" />
                          <input className="order-input" style={input} type="number" name="depth_cm" placeholder="Depth" min="0.5" step="0.1" />
                        </div>
                      </div>
                    )}

                    {/* CUSTOMIZE ONLY — product details */}
                    {service === 'customize' && (
                      <>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <label style={label}>Brand / model</label>
                          <input className="order-input" style={input} type="text" name="binder_brand" placeholder="e.g. Ultra Pro, Dragon Shield..." />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <label style={label}>Condition <span style={{ color: '#000' }}>*</span></label>
                          <select className="order-input" style={input} name="binder_condition" required defaultValue="">
                            <option value="" disabled>Select condition...</option>
                            <option>New / unused</option>
                            <option>Like new</option>
                            <option>Good — minor wear</option>
                            <option>Used — visible wear</option>
                          </select>
                        </div>
                      </>
                    )}

                    {/* BUILD ONLY — quantity */}
                    {service === 'build' && (
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
                    )}

                    {/* DESIGN UPLOAD */}
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
                      <textarea className="order-input" style={{ ...input, minHeight: 80, resize: 'vertical' }} name="special_requirements" placeholder={service === 'build' ? 'Specific materials, finish, deadline...' : 'Anything specific about your product or the customization you want...'} />
                    </div>

<div style={{ display: 'flex', flexDirection: 'column' }}>
  <label style={label}>Approximate budget (€)</label>
  {service === 'build' ? (
    <select className="order-input" style={input} name="budget" defaultValue="">
      <option value="" disabled>Select range...</option>
      <option>€60 – €100</option>
      <option>€100 – €150</option>
      <option>€150 – €200</option>
      <option>€200 – €300</option>
      <option>€300+</option>
      <option>Flexible</option>
    </select>
  ) : (
    <select className="order-input" style={input} name="budget" defaultValue="">
      <option value="" disabled>Select range...</option>
      <option>€30 – €60</option>
      <option>€60 – €100</option>
      <option>€100 – €150</option>
      <option>€150 – €200</option>
      <option>€200+</option>
      <option>Flexible</option>
    </select>
  )}
</div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <label style={label}>How did you find us?</label>
                      <select className="order-input" style={input} name="source" defaultValue="">
                        <option value="" disabled>Select...</option>
                        <option>Instagram</option>
                        <option>TikTok</option>
                        <option>Friend / Word of mouth</option>
                        <option>Google</option>
                        <option>Other</option>
                      </select>
                    </div>

                    {/* CONSENT */}
                    <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <input type="checkbox" name="consent" required style={{ marginTop: '0.2rem', cursor: 'pointer', accentColor: '#000' }} />
                      <label style={{ ...label, textTransform: 'none', letterSpacing: 0, fontSize: '0.8rem', color: '#555', fontWeight: 300 }}>
                        I confirm that I own the rights to any artwork uploaded and agree to the order terms.
                      </label>
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