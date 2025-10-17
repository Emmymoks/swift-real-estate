import React, { useState, useMemo } from 'react'
import ModernSelect from '../components/ModernSelect'

const initial = { name: '', email: '', phone: '', reason: 'General inquiry', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const reasons = useMemo(() => [
    { value: 'General inquiry', label: 'General inquiry' },
    { value: 'Schedule viewing', label: 'Schedule viewing' },
    { value: 'Sell property', label: 'Sell property' },
    { value: 'Other', label: 'Other' }
  ], [])

  function validate() {
    const err = {}
    if (!form.name || form.name.trim().length < 2) err.name = 'Please enter your name'
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = 'Please enter a valid email'
    if (!form.message || form.message.trim().length < 10) err.message = 'Message should be at least 10 characters'
    return err
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (sent) return
    const err = validate()
    setErrors(err)
    if (Object.keys(err).length > 0) return

    console.log('Contact request', form)
    setSent(true)
  }

  const handleChange = (key) => (e) => setForm(f => ({ ...f, [key]: e.target ? e.target.value : e }))

  return (
    <div className='container contact-page' id='contact'>
      <h1>Get in touch</h1>
      <p className='lead'>Let's discuss how we can help. whether buying, selling, or advising.</p>

      <div className='contact-grid'>
        <form onSubmit={handleSubmit} className='contact-form' aria-describedby={sent ? 'success-desc' : undefined}>
          {sent ? (
            <div className='success-box' role='status' id='success-desc'>
              <strong>Thanks. your message has been sent.</strong>
              <div className='small'>We'll respond within one business day. If your request is urgent, please call us.</div>
            </div>
          ) : null}

          <div className='form-row' style={{ marginTop: sent ? 12 : 0 }}>
            <div>
              <label className='form-label'>Full name</label>
              <input aria-label='Full name' className='input' placeholder='Your name' value={form.name} onChange={handleChange('name')} disabled={sent} />
              {errors.name && <div className='field-error' role='alert'>{errors.name}</div>}
            </div>

            <div>
              <label className='form-label'>Email</label>
              <input aria-label='Email' className='input' placeholder='you@example.com' type='email' value={form.email} onChange={handleChange('email')} disabled={sent} />
              {errors.email && <div className='field-error' role='alert'>{errors.email}</div>}
            </div>
          </div>

          <div className='form-row'>
            <div>
              <label className='form-label'>Phone <span style={{ fontWeight: 400, color: 'var(--muted)', fontSize: 13 }}>(optional)</span></label>
              <input aria-label='Phone' className='input' placeholder='+1 (555) 123-4567' value={form.phone} onChange={handleChange('phone')} disabled={sent} />
            </div>

            <div>
              <ModernSelect id='reason' label='Reason' value={form.reason} onChange={e => setForm(f => ({ ...f, reason: e.target.value }))} options={reasons} />
            </div>
          </div>

          <div className='form-row'>
            <div className='form-label full'>
              <label className='form-label'>Message</label>
              <textarea aria-label='Message' rows={6} placeholder='Tell us about your needs...' value={form.message} onChange={handleChange('message')} disabled={sent} />
              {errors.message && <div className='field-error' role='alert'>{errors.message}</div>}
            </div>
          </div>

          <div className='contact-actions'>
            <div className='action-row'>
              <button className='btn-flat-primary' type='submit' disabled={sent} aria-disabled={sent}>{sent ? 'Message sent' : 'Send message'}</button>
              <button type='button' className='btn-outline' onClick={() => setForm(initial)} disabled={sent}>Reset</button>
            </div>
          </div>
        </form>

        <aside className='contact-info accent-glow'>
          <h3>Office</h3>
          <div>Swift Real Estate</div>
          <div className='muted'>123 Luxury Ave, Suite 100</div>
          <div className='muted'>New York, NY 10001</div>

          <h4 style={{ marginTop: 18 }}>Contact</h4>
          <div className='info-block'>
            <div><a className='btn-link' href='mailto:info@swiftrealestate.com'>info@swiftrealestate.com</a></div>
            <div><a className='btn-link' href='tel:+15551234567'>+1 (555) 123-4567</a></div>
          </div>

          <h4 style={{ marginTop: 18 }}>Hours</h4>
          <div className='muted'>Mon - Fri: 9:00 — 18:00</div>

          <div style={{ marginTop: 18 }}>
            <div className='small muted'>Prefer a faster reply? Use the email link above or call us directly.</div>
          </div>
        </aside>
      </div>
    </div>
  )
}
