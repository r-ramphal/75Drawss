'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const CLOUDINARY_CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD
const CLOUDINARY_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf', 'image/svg+xml']
const MAX_FILE_SIZE = 10 * 1024 * 1024

const schema = z.object({
  name: z.string().min(2, { message: 'Enter your full name' }),
  email: z.string().email({ message: 'Enter a valid email address' }),
  product_type: z.string().min(1, { message: 'Select a product type' }),
  card_game: z.string().optional(),
  design_description: z.string().optional(),
  special_requirements: z.string().optional(),
  budget: z.string().optional(),
  source: z.string().optional(),
  binder_brand: z.string().optional(),
  binder_condition: z.string().optional(),
  consent: z.boolean().refine(val => val === true, 'You must confirm to continue'),
})

export default function OrderForm() {
  const [service, setService] = useState('build')
  const [qty, setQty] = useState(1)
  const [pocketSize, setPocketSize] = useState('9-pocket')
  const [binderColor, setBinderColor] = useState('')
  const [customColor, setCustomColor] = useState('')
  const [fileName, setFileName] = useState('')
  const [fileUrl, setFileUrl] = useState('')
  const [fileError, setFileError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [binderColorError, setBinderColorError] = useState('')
  const router = useRouter()

  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '', email: '', product_type: '', card_game: '',
      design_description: '', special_requirements: '',
      budget: '', source: '', binder_brand: '', binder_condition: '',
      consent: false,
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  async function handleFileChange(e) {
    const file = e.target.files[0]
    if (!file) return
    setFileError('')
    if (file.size > MAX_FILE_SIZE) {
      setFileError('File must be under 10MB')
      return
    }
    if (!ALLOWED_TYPES.includes(file.type) && !file.name.match(/\.(ai|psd)$/i)) {
      setFileError('Unsupported file type. Use JPG, PNG, PDF, AI, PSD, or SVG')
      return
    }
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
      setFileError('Upload failed. Please try again.')
    }
    setUploading(false)
  }

  async function onSubmit(data) {
    if (service === 'build' && !binderColor && !customColor) {
      setBinderColorError('Select or enter a binder color')
      return
    }
    if (service === 'customize' && !data.binder_condition) {
      setError('binder_condition', { message: 'Select the condition of your product' })
      return
    }
    setBinderColorError('')
    setSubmitError('')

    const payload = {
      subject: `New 75Drawss Order — ${service === 'build' ? 'Build My Product' : 'Customize My Product'}`,
      service_type: service === 'build' ? 'Build my product' : 'Customize my product',
      name: data.name,
      email: data.email,
      product_type: data.product_type,
      card_game: data.card_game || 'Not specified',
      design_file_url: fileUrl || 'No file uploaded',
      design_description: data.design_description || '',
      special_requirements: data.special_requirements || '',
      budget: data.budget || 'Not specified',
      source: data.source || 'Not specified',
      quantity: qty,
      ...(service === 'build' && {
        pocket_size: pocketSize,
        binder_color: binderColor || customColor,
      }),
      ...(service === 'customize' && {
        binder_condition: data.binder_condition,
        binder_brand: data.binder_brand || '',
      }),
    }

    const res = await fetch('/api/submit-order', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    })

    if (res.ok) {
      setSubmitted(true)
      router.push('/bedankt')
    } else {
      setSubmitError('Something went wrong. Please try again.')
    }
  }

  const labelStyle = { fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '0.4rem', display: 'block', fontFamily: 'var(--font-ui)' }
  const inputStyle = { background: 'var(--color-surface)', color: 'var(--color-text)', fontSize: '0.875rem', fontWeight: 400, padding: '0.75rem 1rem', borderRadius: 0, outline: 'none', width: '100%', fontFamily: 'var(--font-ui)' }
  const errorStyle = { fontSize: '0.72rem', color: '#c00', marginTop: '0.35rem', display: 'block', fontFamily: 'var(--font-ui)' }

  function inputBorder(fieldError) {
    return { border: fieldError ? '2px solid #c00' : '2px solid var(--color-border)' }
  }

  return (
    <>
      <style>{`
        .order-input:focus { background: #FFFBEB !important; }
        .submit-btn {
          background: var(--color-accent);
          color: var(--color-text);
          font-size: 0.875rem;
          font-weight: 600;
          padding: 0.875rem 2rem;
          border: 2px solid var(--color-border);
          border-radius: 100px;
          cursor: pointer;
          box-shadow: 4px 4px 0 var(--color-border);
          transition: box-shadow 0.15s, transform 0.15s;
          flex-shrink: 0;
          font-family: var(--font-ui);
        }
        .submit-btn:hover { box-shadow: none; transform: translate(4px, 4px); }
        .submit-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; box-shadow: 4px 4px 0 var(--color-border); }
        .qty-btn { font-size: 0.82rem; font-weight: 500; padding: 0.5rem 1rem; cursor: pointer; transition: all 0.15s; font-family: var(--font-ui); }
        .order-section { padding: 7rem 3rem; }
        .order-grid { display: grid; grid-template-columns: 1fr 1.6fr; gap: 6rem; align-items: start; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        .form-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 2rem; padding-top: 1.75rem; border-top: 2px solid var(--color-border); gap: 1rem; flex-wrap: wrap; }
        .service-toggle { display: flex; border: 2px solid var(--color-border); margin-bottom: 2rem; box-shadow: 3px 3px 0 var(--color-border); }
        .service-btn { flex: 1; padding: 0.875rem 1rem; font-family: var(--font-ui); font-size: 0.875rem; font-weight: 600; cursor: pointer; border: none; transition: all 0.15s; text-align: center; letter-spacing: 0.01em; }
        .service-btn.active { background: var(--color-text); color: #fff; }
        .service-btn.inactive { background: var(--color-surface); color: var(--color-text); }
        .service-btn.inactive:hover { background: #FFFBEB; }
        .send-in-box { background: #FFFBEB; border: 2px solid var(--color-border); padding: 1.5rem; margin-bottom: 1.25rem; grid-column: 1 / -1; }
        .send-in-box h4 { font-size: 0.82rem; font-weight: 600; margin-bottom: 0.5rem; font-family: var(--font-ui); }
        .send-in-box p { font-size: 0.82rem; color: var(--color-text-secondary); line-height: 1.7; font-weight: 400; }
        .send-in-box ul { margin-top: 0.5rem; padding-left: 1.25rem; }
        .send-in-box ul li { font-size: 0.82rem; color: var(--color-text-secondary); line-height: 1.8; font-weight: 400; }
        .pocket-btn { font-size: 0.82rem; font-weight: 500; padding: 0.5rem 1.25rem; cursor: pointer; font-family: var(--font-ui); transition: all 0.15s; border: 2px solid var(--color-border); }
        @media (max-width: 768px) {
          .order-section { padding: 4rem 1.5rem !important; }
          .order-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .form-grid { grid-template-columns: 1fr !important; }
          .form-footer { flex-direction: column; align-items: stretch; }
          .submit-btn { text-align: center; }
        }
      `}</style>

      <div style={{ background: 'var(--color-bg)', borderTop: '2px solid var(--color-border)', borderBottom: '2px solid var(--color-border)' }} id="order">
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
            <div style={{ background: 'var(--color-surface)', border: '2px solid var(--color-border)', padding: '2.5rem', boxShadow: 'var(--shadow-hard-lg)' }}>
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
                <form onSubmit={handleSubmit(onSubmit)} noValidate>

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
                      <label htmlFor="name" style={labelStyle}>Full name <span style={{ color: '#000' }}>*</span></label>
                      <input id="name" className="order-input" style={{ ...inputStyle, ...inputBorder(errors.name) }} type="text" placeholder="Jan de Vries" {...register('name')} />
                      {errors.name && <span style={errorStyle} role="alert">{errors.name.message}</span>}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <label htmlFor="email" style={labelStyle}>Email address <span style={{ color: '#000' }}>*</span></label>
                      <input id="email" className="order-input" style={{ ...inputStyle, ...inputBorder(errors.email) }} type="email" placeholder="jan@example.nl" {...register('email')} />
                      {errors.email && <span style={errorStyle} role="alert">{errors.email.message}</span>}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <label htmlFor="product_type" style={labelStyle}>Product type <span style={{ color: '#000' }}>*</span></label>
                      <select id="product_type" className="order-input" style={{ ...inputStyle, ...inputBorder(errors.product_type) }} {...register('product_type')}>
                        <option value="">Select product...</option>
                        <option>TCG Binder</option>
                        <option>Deck Box</option>
                        <option>Other</option>
                      </select>
                      {errors.product_type && <span style={errorStyle} role="alert">{errors.product_type.message}</span>}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <label htmlFor="card_game" style={labelStyle}>Card game (if applicable)</label>
                      <select id="card_game" className="order-input" style={{ ...inputStyle, ...inputBorder(errors.card_game) }} {...register('card_game')}>
                        <option value="">Select your TCG...</option>
                        <option>Pokémon</option>
                        <option>One Piece TCG</option>
                        <option>Lorcana</option>
                        <option>Not applicable</option>
                        <option>Other</option>
                      </select>
                    </div>

                    {/* BUILD ONLY */}
                    {service === 'build' && (
                      <>
                        {/* POCKET SIZE */}
                        <div style={{ display: 'flex', flexDirection: 'column', gridColumn: '1 / -1' }}>
                          <label style={labelStyle}>Pocket size <span style={{ color: '#000' }}>*</span></label>
                          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {['4-pocket', '9-pocket', '12-pocket'].map(size => (
                              <button
                                key={size}
                                type="button"
                                className="pocket-btn"
                                onClick={() => setPocketSize(size)}
                                aria-pressed={pocketSize === size}
                                style={{
                                  background: pocketSize === size ? '#000' : '#fff',
                                  color: pocketSize === size ? '#fff' : '#000',
                                }}
                              >{size}</button>
                            ))}
                          </div>
                        </div>

                        {/* BINDER COLOR */}
                        <div style={{ display: 'flex', flexDirection: 'column', gridColumn: '1 / -1' }}>
                          <label style={labelStyle}>Binder color <span style={{ color: '#000' }}>*</span></label>
                          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                            {[
                              { name: 'Black', hex: '#1a1a1a' },
                              { name: 'White', hex: '#ffffff' },
                              { name: 'Pink', hex: '#f4a0bc' },
                              { name: 'Red', hex: '#d93030' },
                              { name: 'Blue', hex: '#2D5BE3' },
                              { name: 'Purple', hex: '#7c3aed' },
                              { name: 'Green', hex: '#16a34a' },
                              { name: 'Yellow', hex: '#f59e0b' },
                            ].map(color => (
                              <button
                                key={color.name}
                                type="button"
                                onClick={() => { setBinderColor(color.name); setCustomColor(''); setBinderColorError('') }}
                                title={color.name}
                                aria-label={color.name}
                                aria-pressed={binderColor === color.name}
                                style={{
                                  width: 32, height: 32,
                                  borderRadius: '50%',
                                  background: color.hex,
                                  border: binderColor === color.name ? '3px solid #000' : '1.5px solid #ccc',
                                  cursor: 'pointer',
                                  transition: 'all 0.15s',
                                  flexShrink: 0,
                                }}
                              />
                            ))}
                          </div>
                          <input
                            className="order-input"
                            style={{ ...inputStyle, border: binderColorError ? '1px solid #c00' : '1px solid #000' }}
                            type="text"
                            placeholder="Custom / other color (e.g. mint green, orange...)"
                            value={customColor}
                            onChange={e => { setCustomColor(e.target.value); setBinderColor(''); setBinderColorError('') }}
                          />
                          {binderColor && <p style={{ fontSize: '0.75rem', color: '#555', marginTop: '0.4rem' }}>Selected: {binderColor}</p>}
                          {binderColorError && <span style={errorStyle} role="alert">{binderColorError}</span>}
                        </div>

                        {/* QUANTITY */}
                        <div style={{ display: 'flex', flexDirection: 'column', gridColumn: '1 / -1' }}>
                          <label style={labelStyle}>Quantity</label>
                          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {[1, 2, 3, 5, 10].map(n => (
                              <button key={n} type="button" className="qty-btn" onClick={() => setQty(n)} aria-pressed={qty === n} style={{
                                background: qty === n ? '#000' : '#fff',
                                border: '1px solid #000',
                                color: qty === n ? '#fff' : '#000',
                              }}>{n}{n === 10 ? '+' : ''}</button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {/* CUSTOMIZE ONLY */}
                    {service === 'customize' && (
                      <>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <label htmlFor="binder_brand" style={labelStyle}>Brand / model</label>
                          <input id="binder_brand" className="order-input" style={{ ...inputStyle, border: '1px solid #000' }} type="text" placeholder="e.g. Ultra Pro, Dragon Shield..." {...register('binder_brand')} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <label htmlFor="binder_condition" style={labelStyle}>Condition <span style={{ color: '#000' }}>*</span></label>
                          <select id="binder_condition" className="order-input" style={{ ...inputStyle, ...inputBorder(errors.binder_condition) }} {...register('binder_condition')}>
                            <option value="">Select condition...</option>
                            <option>New / unused</option>
                            <option>Like new</option>
                            <option>Good — minor wear</option>
                            <option>Used — visible wear</option>
                          </select>
                          {errors.binder_condition && <span style={errorStyle} role="alert">{errors.binder_condition.message}</span>}
                        </div>
                      </>
                    )}

                    {/* DESIGN UPLOAD */}
                    <div style={{ display: 'flex', flexDirection: 'column', gridColumn: '1 / -1' }}>
                      <label style={labelStyle}>Design file upload</label>
                      <div style={{ border: fileError ? '1px dashed #c00' : '1px dashed #000', padding: '1.75rem', textAlign: 'center', background: '#fff', position: 'relative' }}>
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
                      {fileError && <span style={errorStyle} role="alert">{fileError}</span>}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gridColumn: '1 / -1' }}>
                      <label htmlFor="design_description" style={labelStyle}>Design description</label>
                      <textarea id="design_description" className="order-input" style={{ ...inputStyle, border: '1px solid #000', minHeight: 110, resize: 'vertical' }} placeholder="Describe your design — colours, theme, style, any text you want included, references, etc." {...register('design_description')} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gridColumn: '1 / -1' }}>
                      <label htmlFor="special_requirements" style={labelStyle}>Special requirements</label>
                      <textarea id="special_requirements" className="order-input" style={{ ...inputStyle, border: '1px solid #000', minHeight: 80, resize: 'vertical' }} placeholder={service === 'build' ? 'Specific materials, finish, deadline...' : 'Anything specific about your product or the customization you want...'} {...register('special_requirements')} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <label htmlFor="budget" style={labelStyle}>Approximate budget (€)</label>
                      {service === 'build' ? (
                        <select id="budget" className="order-input" style={{ ...inputStyle, border: '1px solid #000' }} {...register('budget')}>
                          <option value="">Select range...</option>
                          <option>€60 – €100</option>
                          <option>€100 – €150</option>
                          <option>€150 – €200</option>
                          <option>€200 – €300</option>
                          <option>€300+</option>
                          <option>Flexible</option>
                        </select>
                      ) : (
                        <select id="budget" className="order-input" style={{ ...inputStyle, border: '1px solid #000' }} {...register('budget')}>
                          <option value="">Select range...</option>
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
                      <label htmlFor="source" style={labelStyle}>How did you find us?</label>
                      <select id="source" className="order-input" style={{ ...inputStyle, border: '1px solid #000' }} {...register('source')}>
                        <option value="">Select...</option>
                        <option>Instagram</option>
                        <option>TikTok</option>
                        <option>Friend / Word of mouth</option>
                        <option>Google</option>
                        <option>Other</option>
                      </select>
                    </div>

                    {/* CONSENT */}
                    <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                        <input id="consent" type="checkbox" style={{ marginTop: '0.2rem', cursor: 'pointer', accentColor: '#000' }} {...register('consent')} />
                        <label htmlFor="consent" style={{ ...labelStyle, textTransform: 'none', letterSpacing: 0, fontSize: '0.8rem', color: '#555', fontWeight: 300 }}>
                          I confirm that I own the rights to any artwork uploaded and agree to the order terms.
                        </label>
                      </div>
                      {errors.consent && <span style={errorStyle} role="alert">{errors.consent.message}</span>}
                    </div>

                  </div>

                  {submitError && (
                    <p style={{ fontSize: '0.8rem', color: '#c00', marginTop: '1rem' }} role="alert">{submitError}</p>
                  )}

                  <div className="form-footer">
                    <p style={{ fontSize: '0.75rem', color: '#999', fontWeight: 300, lineHeight: 1.6 }}>
                      No payment required yet.<br/>We'll reply within 1–2 business days.
                    </p>
                    <button type="submit" className="submit-btn" disabled={isSubmitting || uploading}>
                      {isSubmitting ? 'Sending...' : uploading ? 'Uploading file...' : 'Send order request →'}
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
