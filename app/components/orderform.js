'use client'
import { useState, useMemo, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter, Link } from '@/i18n/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const CLOUDINARY_CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD
const CLOUDINARY_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET
// Cloudflare Turnstile site key (public). The token is verified server-side
// in /api/submit-order before the order email is sent via Resend.
const TURNSTILE_SITEKEY = process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf', 'image/svg+xml']
const MAX_FILE_SIZE = 10 * 1024 * 1024

const POCKET_SIZES = ['4-pocket', '9-pocket']
const COLORS = [
  { name: 'Black', hex: '#1a1a1a' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Pink', hex: '#f4a0bc' },
  { name: 'Red', hex: '#d93030' },
  { name: 'Blue', hex: '#2D5BE3' },
  { name: 'Purple', hex: '#7c3aed' },
  { name: 'Green', hex: '#16a34a' },
  { name: 'Yellow', hex: '#f59e0b' },
]
const QUANTITIES = [1, 2, 3, 5, 10]

export default function OrderForm() {
  const t = useTranslations('order')
  const tThanks = useTranslations('thankYou')
  const router = useRouter()
  const locale = useLocale()

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
  const [captchaError, setCaptchaError] = useState('')

  // Load the Cloudflare Turnstile widget script once.
  useEffect(() => {
    if (document.querySelector('script[src*="challenges.cloudflare.com"]')) return
    const s = document.createElement('script')
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    s.async = true
    s.defer = true
    document.head.appendChild(s)
  }, [])

  const schema = useMemo(() => z.object({
    name: z.string().min(2, { message: t('errName') }),
    email: z.string().email({ message: t('errEmail') }),
    product_type: z.string().min(1, { message: t('errProduct') }),
    card_game: z.string().optional(),
    design_description: z.string().optional(),
    special_requirements: z.string().optional(),
    budget: z.string().optional(),
    source: z.string().optional(),
    binder_brand: z.string().optional(),
    binder_condition: z.string().optional(),
    consent: z.boolean().refine(val => val === true, t('errConsent')),
    botcheck: z.string().optional(),
  }), [t])

  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '', email: '', product_type: '', card_game: '',
      design_description: '', special_requirements: '',
      budget: '', source: '', binder_brand: '', binder_condition: '',
      consent: false, botcheck: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  async function handleFileChange(e) {
    const file = e.target.files[0]
    if (!file) return
    setFileError('')
    if (file.size > MAX_FILE_SIZE) {
      setFileError(t('errFileSize'))
      return
    }
    if (!ALLOWED_TYPES.includes(file.type) && !file.name.match(/\.(ai|psd)$/i)) {
      setFileError(t('errFileType'))
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
      setFileError(t('errUpload'))
    }
    setUploading(false)
  }

  async function onSubmit(data) {
    if (service === 'build' && !binderColor && !customColor) {
      setBinderColorError(t('errColor'))
      return
    }
    if (service === 'customize' && !data.binder_condition) {
      setError('binder_condition', { message: t('errCondition') })
      return
    }
    setBinderColorError('')
    setSubmitError('')
    setCaptchaError('')

    // Cloudflare Turnstile token — verified server-side before we send the email.
    const captchaToken = typeof window !== 'undefined' && window.turnstile
      ? window.turnstile.getResponse()
      : ''
    if (!captchaToken) {
      setCaptchaError(t('errCaptcha'))
      return
    }

    const payload = {
      'cf-turnstile-response': captchaToken,
      locale,
      botcheck: data.botcheck || '',
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

    try {
      const res = await fetch('/api/submit-order', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json().catch(() => ({}))
      if (res.ok && json.success) {
        setSubmitted(true)
        router.push('/bedankt')
      } else {
        setSubmitError(t('errSubmit'))
        window.turnstile?.reset()
      }
    } catch {
      setSubmitError(t('errSubmit'))
      window.turnstile?.reset()
    }
  }

  const labelStyle = { fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '0.4rem', display: 'block', fontFamily: 'var(--font-ui)' }
  const inputStyle = { background: 'var(--color-surface)', color: 'var(--color-text)', fontSize: '0.875rem', fontWeight: 400, padding: '0.75rem 1rem', borderRadius: 0, outline: 'none', width: '100%', fontFamily: 'var(--font-ui)' }
  const errorStyle = { fontSize: '0.72rem', color: '#c00', marginTop: '0.35rem', display: 'block', fontFamily: 'var(--font-ui)' }
  const req = <span style={{ color: 'var(--color-text)' }}>*</span>

  function inputBorder(fieldError) {
    return { border: fieldError ? '2px solid #c00' : '1px solid var(--color-border-strong)' }
  }

  const bullets = service === 'build' ? t.raw('bulletsBuild') : t.raw('bulletsCustomize')

  return (
    <>
      <style>{`
        .order-input:focus { background: #FFFBEB !important; }
        .submit-btn {
          background: var(--color-accent);
          color: var(--color-text);
          font-size: 0.875rem;
          font-weight: 600;
          padding: 0.95rem 2rem;
          border: 1px solid var(--color-accent);
          border-radius: var(--radius);
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          flex-shrink: 0;
          font-family: var(--font-ui);
        }
        .submit-btn:hover { background: var(--color-accent-hover); border-color: var(--color-accent-hover); transform: translateY(-1px); box-shadow: 0 8px 20px rgba(10,10,10,0.12); }
        .submit-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; box-shadow: none; }
        .qty-btn { font-size: 0.82rem; font-weight: 500; padding: 0.5rem 1rem; cursor: pointer; transition: all 0.15s; font-family: var(--font-ui); }
        .order-section { padding: 7rem 3rem; }
        .order-grid { display: grid; grid-template-columns: 1fr 1.6fr; gap: 6rem; align-items: start; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        .form-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 2rem; padding-top: 1.75rem; border-top: 2px solid var(--color-border); gap: 1rem; flex-wrap: wrap; }
        .service-toggle { display: flex; border: 1px solid var(--color-border-strong); border-radius: var(--radius); overflow: hidden; margin-bottom: 2rem; }
        .service-btn { flex: 1; padding: 0.875rem 1rem; font-family: var(--font-ui); font-size: 0.875rem; font-weight: 600; cursor: pointer; border: none; transition: all 0.15s; text-align: center; letter-spacing: 0.01em; }
        .service-btn.active { background: var(--color-text); color: #fff; }
        .service-btn.inactive { background: var(--color-surface); color: var(--color-text); }
        .service-btn.inactive:hover { background: #FFFBEB; }
        .send-in-box { background: #FFFBEB; border: 2px solid var(--color-border); padding: 1.5rem; margin-bottom: 1.25rem; grid-column: 1 / -1; }
        .send-in-box h4 { font-size: 0.82rem; font-weight: 600; margin-bottom: 0.5rem; font-family: var(--font-ui); }
        .send-in-box p { font-size: 0.82rem; color: var(--color-text-secondary); line-height: 1.7; font-weight: 400; }
        .send-in-box ul { margin-top: 0.5rem; padding-left: 1.25rem; }
        .send-in-box ul li { font-size: 0.82rem; color: var(--color-text-secondary); line-height: 1.8; font-weight: 400; }
        .pocket-btn { font-size: 0.82rem; font-weight: 500; padding: 0.5rem 1.25rem; cursor: pointer; font-family: var(--font-ui); transition: all 0.15s; border: 1px solid var(--color-border-strong); border-radius: var(--radius); }
        @media (max-width: 768px) {
          .order-section { padding: 4rem 1.5rem !important; }
          .order-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .form-grid { grid-template-columns: 1fr !important; }
          .form-footer { flex-direction: column; align-items: stretch; }
          .submit-btn { text-align: center; }
        }
      `}</style>

      <div style={{ background: 'var(--color-bg)', borderTop: '1px solid var(--color-border-strong)', borderBottom: '1px solid var(--color-border-strong)' }} id="order">
        <div className="order-section" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="order-grid">

            {/* LEFT INFO */}
            <div>
              <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '1rem', fontFamily: 'var(--font-ui)' }}>{t('eyebrow')}</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '1rem', color: 'var(--color-text)' }}>
                {t('titleLine1')}<br/>{t('titleLine2')}
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.8, fontWeight: 400, marginBottom: '2.5rem', fontFamily: 'var(--font-ui)' }}>
                {service === 'build' ? t('introBuild') : t('introCustomize')}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {bullets.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 400, fontFamily: 'var(--font-ui)' }}>
                    <span style={{ width: 5, height: 5, background: 'var(--color-accent)', borderRadius: '50%', flexShrink: 0, display: 'block' }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* FORM */}
            <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-strong)', padding: '2.5rem', boxShadow: 'var(--shadow-hard-lg)' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
                  <div style={{ width: 48, height: 48, background: 'var(--color-text)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#fff', fontSize: '1.1rem' }}>✓</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 300, marginBottom: '0.75rem', color: 'var(--color-text)' }}>{tThanks('heading')}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', fontWeight: 400, lineHeight: 1.7, fontFamily: 'var(--font-ui)' }}>
                    {tThanks('body')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate>

                  {/* Honeypot — hidden from real users, bots tend to fill it */}
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
                    {...register('botcheck')}
                  />

                  {/* SERVICE TOGGLE */}
                  <div className="service-toggle">
                    <button type="button" className={`service-btn ${service === 'build' ? 'active' : 'inactive'}`} onClick={() => setService('build')}>
                      {t('serviceBuild')}
                    </button>
                    <button type="button" className={`service-btn ${service === 'customize' ? 'active' : 'inactive'}`} onClick={() => setService('customize')}>
                      {t('serviceCustomize')}
                    </button>
                  </div>

                  <div className="form-grid">

                    {/* SEND-IN INFO BOX */}
                    {service === 'customize' && (
                      <div className="send-in-box">
                        <h4>{t('sendInTitle')}</h4>
                        <p>{t('sendInIntro')}</p>
                        <ul>
                          {t.raw('sendInList').map((li, i) => <li key={i}>{li}</li>)}
                        </ul>
                      </div>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <label htmlFor="name" style={labelStyle}>{t('labelName')} {req}</label>
                      <input id="name" className="order-input" style={{ ...inputStyle, ...inputBorder(errors.name) }} type="text" placeholder={t('phName')} {...register('name')} />
                      {errors.name && <span style={errorStyle} role="alert">{errors.name.message}</span>}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <label htmlFor="email" style={labelStyle}>{t('labelEmail')} {req}</label>
                      <input id="email" className="order-input" style={{ ...inputStyle, ...inputBorder(errors.email) }} type="email" placeholder={t('phEmail')} {...register('email')} />
                      {errors.email && <span style={errorStyle} role="alert">{errors.email.message}</span>}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <label htmlFor="product_type" style={labelStyle}>{t('labelProductType')} {req}</label>
                      <select id="product_type" className="order-input" style={{ ...inputStyle, ...inputBorder(errors.product_type) }} {...register('product_type')}>
                        <option value="">{t('phProduct')}</option>
                        {t.raw('optProduct').map(o => <option key={o}>{o}</option>)}
                      </select>
                      {errors.product_type && <span style={errorStyle} role="alert">{errors.product_type.message}</span>}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <label htmlFor="card_game" style={labelStyle}>{t('labelCardGame')}</label>
                      <select id="card_game" className="order-input" style={{ ...inputStyle, ...inputBorder(errors.card_game) }} {...register('card_game')}>
                        <option value="">{t('phCardGame')}</option>
                        {t.raw('optCardGame').map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>

                    {/* BUILD ONLY */}
                    {service === 'build' && (
                      <>
                        {/* POCKET SIZE */}
                        <div style={{ display: 'flex', flexDirection: 'column', gridColumn: '1 / -1' }}>
                          <label style={labelStyle}>{t('labelPocketSize')} {req}</label>
                          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {POCKET_SIZES.map(size => (
                              <button
                                key={size}
                                type="button"
                                className="pocket-btn"
                                onClick={() => setPocketSize(size)}
                                aria-pressed={pocketSize === size}
                                style={{
                                  background: pocketSize === size ? 'var(--color-text)' : 'var(--color-surface)',
                                  color: pocketSize === size ? '#fff' : 'var(--color-text)',
                                }}
                              >{size}</button>
                            ))}
                          </div>
                        </div>

                        {/* BINDER COLOR */}
                        <div style={{ display: 'flex', flexDirection: 'column', gridColumn: '1 / -1' }}>
                          <label style={labelStyle}>{t('labelBinderColor')} {req}</label>
                          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                            {COLORS.map(color => (
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
                                  border: binderColor === color.name ? '3px solid var(--color-text)' : '1.5px solid #ccc',
                                  cursor: 'pointer',
                                  transition: 'all 0.15s',
                                  flexShrink: 0,
                                }}
                              />
                            ))}
                          </div>
                          <input
                            className="order-input"
                            style={{ ...inputStyle, border: binderColorError ? '2px solid #c00' : '1px solid var(--color-border-strong)' }}
                            type="text"
                            placeholder={t('phCustomColor')}
                            value={customColor}
                            onChange={e => { setCustomColor(e.target.value); setBinderColor(''); setBinderColorError('') }}
                          />
                          {binderColor && <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.4rem', fontFamily: 'var(--font-ui)' }}>{t('selectedColor', { color: binderColor })}</p>}
                          {binderColorError && <span style={errorStyle} role="alert">{binderColorError}</span>}
                        </div>

                        {/* QUANTITY */}
                        <div style={{ display: 'flex', flexDirection: 'column', gridColumn: '1 / -1' }}>
                          <label style={labelStyle}>{t('labelQuantity')}</label>
                          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {QUANTITIES.map(n => (
                              <button key={n} type="button" className="qty-btn" onClick={() => setQty(n)} aria-pressed={qty === n} style={{
                                background: qty === n ? 'var(--color-text)' : 'var(--color-surface)',
                                border: '1px solid var(--color-border-strong)',
                                color: qty === n ? '#fff' : 'var(--color-text)',
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
                          <label htmlFor="binder_brand" style={labelStyle}>{t('labelBrand')}</label>
                          <input id="binder_brand" className="order-input" style={{ ...inputStyle, border: '1px solid var(--color-border-strong)' }} type="text" placeholder={t('phBrand')} {...register('binder_brand')} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <label htmlFor="binder_condition" style={labelStyle}>{t('labelCondition')} {req}</label>
                          <select id="binder_condition" className="order-input" style={{ ...inputStyle, ...inputBorder(errors.binder_condition) }} {...register('binder_condition')}>
                            <option value="">{t('phCondition')}</option>
                            {t.raw('optCondition').map(o => <option key={o}>{o}</option>)}
                          </select>
                          {errors.binder_condition && <span style={errorStyle} role="alert">{errors.binder_condition.message}</span>}
                        </div>
                      </>
                    )}

                    {/* DESIGN UPLOAD */}
                    <div style={{ display: 'flex', flexDirection: 'column', gridColumn: '1 / -1' }}>
                      <label style={labelStyle}>{t('labelUpload')}</label>
                      <div style={{ border: fileError ? '2px dashed #c00' : '2px dashed var(--color-border)', padding: '1.75rem', textAlign: 'center', background: 'var(--color-surface)', position: 'relative' }}>
                        <input type="file" accept=".jpg,.jpeg,.png,.pdf,.ai,.psd,.svg"
                          onChange={handleFileChange}
                          style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }} />
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 400, fontFamily: 'var(--font-ui)' }}>
                          <strong style={{ color: 'var(--color-text)', fontWeight: 600 }}>{t('uploadClick')}</strong> {t('uploadDrag')}
                        </p>
                        <p style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '0.3rem', fontFamily: 'var(--font-ui)' }}>{t('uploadHint')}</p>
                        {uploading && <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem', fontFamily: 'var(--font-ui)' }}>{t('uploading')}</p>}
                        {fileUrl && !uploading && <p style={{ fontSize: '0.75rem', color: 'var(--color-text)', marginTop: '0.5rem', fontFamily: 'var(--font-ui)' }}>{t('uploaded', { file: fileName })}</p>}
                      </div>
                      {fileError && <span style={errorStyle} role="alert">{fileError}</span>}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gridColumn: '1 / -1' }}>
                      <label htmlFor="design_description" style={labelStyle}>{t('labelDescription')}</label>
                      <textarea id="design_description" className="order-input" style={{ ...inputStyle, border: '1px solid var(--color-border-strong)', minHeight: 110, resize: 'vertical' }} placeholder={t('phDescription')} {...register('design_description')} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gridColumn: '1 / -1' }}>
                      <label htmlFor="special_requirements" style={labelStyle}>{t('labelSpecial')}</label>
                      <textarea id="special_requirements" className="order-input" style={{ ...inputStyle, border: '1px solid var(--color-border-strong)', minHeight: 80, resize: 'vertical' }} placeholder={service === 'build' ? t('phSpecialBuild') : t('phSpecialCustomize')} {...register('special_requirements')} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <label htmlFor="budget" style={labelStyle}>{t('labelBudget')}</label>
                      <select id="budget" className="order-input" style={{ ...inputStyle, border: '1px solid var(--color-border-strong)' }} {...register('budget')}>
                        <option value="">{t('phBudget')}</option>
                        {(service === 'build' ? t.raw('optBudgetBuild') : t.raw('optBudgetCustomize')).map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <label htmlFor="source" style={labelStyle}>{t('labelSource')}</label>
                      <select id="source" className="order-input" style={{ ...inputStyle, border: '1px solid var(--color-border-strong)' }} {...register('source')}>
                        <option value="">{t('phSource')}</option>
                        {t.raw('optSource').map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>

                    {/* CONSENT */}
                    <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                        <input id="consent" type="checkbox" style={{ marginTop: '0.2rem', cursor: 'pointer', accentColor: 'var(--color-text)' }} {...register('consent')} />
                        <label htmlFor="consent" style={{ ...labelStyle, textTransform: 'none', letterSpacing: 0, fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 400, lineHeight: 1.6 }}>
                          {t.rich('consent', {
                            terms: (chunks) => <Link href="/voorwaarden" target="_blank" style={{ color: 'var(--color-accent-text)', textDecoration: 'underline', fontWeight: 500 }}>{chunks}</Link>,
                            privacy: (chunks) => <Link href="/privacy" target="_blank" style={{ color: 'var(--color-accent-text)', textDecoration: 'underline', fontWeight: 500 }}>{chunks}</Link>,
                          })} {req}
                        </label>
                      </div>
                      {errors.consent && <span style={errorStyle} role="alert">{errors.consent.message}</span>}
                    </div>

                    {/* CLOUDFLARE TURNSTILE */}
                    <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <div className="cf-turnstile" data-sitekey={TURNSTILE_SITEKEY} data-theme="light" />
                      {captchaError && <span style={errorStyle} role="alert">{captchaError}</span>}
                    </div>

                  </div>

                  {submitError && (
                    <p style={{ fontSize: '0.8rem', color: '#c00', marginTop: '1rem', fontFamily: 'var(--font-ui)' }} role="alert">{submitError}</p>
                  )}

                  <div className="form-footer">
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 400, lineHeight: 1.6, fontFamily: 'var(--font-ui)' }}>
                      {t('footerNote')}
                    </p>
                    <button type="submit" className="submit-btn" disabled={isSubmitting || uploading}>
                      {isSubmitting ? t('submitSending') : uploading ? t('submitUploading') : t('submitDefault')}
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
