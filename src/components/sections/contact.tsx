// src/components/sections/contact.tsx
'use client'

import { useState } from 'react'
import type { SectionMeta, Business } from '@/types/content'

interface ContactProps { content: SectionMeta; business: Business }

export function Contact({ content, business }: ContactProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', phone: '', message: '' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      // Replace with your server action or API route in Step 04+
      await new Promise((r) => setTimeout(r, 800))
      setStatus('sent')
      setForm({ name: '', phone: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem 1rem', borderRadius: '8px',
    border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)',
    color: 'var(--color-text)', fontSize: '0.95rem', outline: 'none',
    transition: 'border-color 0.15s',
  }

  return (
    <section id="contact" className="section" aria-labelledby="contact-heading"
      style={{ backgroundColor: 'var(--color-bg)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }} className="md:grid-cols-2">

          {/* Left: Info */}
          <div>
            <h2 id="contact-heading" style={{ fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 400, marginBottom: '1.5rem' }}>
              {content.headline}
            </h2>
            {content.subheadline && (
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>{content.subheadline}</p>
            )}

            <address style={{ fontStyle: 'normal', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: 'phone', label: 'Phone', value: business.phone, href: `tel:${business.phone}` },
                { icon: 'mail', label: 'Email', value: business.email, href: `mailto:${business.email}` },
                { icon: 'map-pin', label: 'Address', value: business.address, href: business.mapsUrl },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', flexShrink: 0,
                    backgroundColor: 'color-mix(in srgb, var(--color-primary) 10%, transparent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)"
                      strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                      {item.icon === 'phone' && <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9a2 2 0 012-2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.91 14a16 16 0 006 6z" />}
                      {item.icon === 'mail' && <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>}
                      {item.icon === 'map-pin' && <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></>}
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase',
                      letterSpacing: '0.05em', marginBottom: '0.15rem' }}>{item.label}</p>
                    <a href={item.href} target={item.icon === 'map-pin' ? '_blank' : undefined}
                      rel={item.icon === 'map-pin' ? 'noopener noreferrer' : undefined}
                      style={{ color: 'var(--color-text)', textDecoration: 'none', fontSize: '0.9rem' }}>
                      {item.value}
                    </a>
                  </div>
                </div>
              ))}
            </address>

            <div style={{ marginTop: '1.5rem' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase',
                letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Hours</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text)', lineHeight: 1.8 }}>
                {business.hours.weekdays}<br />{business.hours.sunday}
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div style={{ backgroundColor: 'var(--color-bg-card)', borderRadius: '16px',
            padding: '2rem', border: '1px solid var(--color-border)' }}>
            {status === 'sent' ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p style={{ fontSize: '2rem', marginBottom: '0.75rem' }} aria-live="polite">✓</p>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Message sent</p>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>We&apos;ll get back to you within a few hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label htmlFor="contact-name" style={{ display: 'block', fontSize: '0.8rem',
                    color: 'var(--color-text-muted)', marginBottom: '0.4rem' }}>Your name</label>
                  <input id="contact-name" type="text" required value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Rajesh Sharma"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')} />
                </div>
                <div>
                  <label htmlFor="contact-phone" style={{ display: 'block', fontSize: '0.8rem',
                    color: 'var(--color-text-muted)', marginBottom: '0.4rem' }}>Phone number</label>
                  <input id="contact-phone" type="tel" required value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')} />
                </div>
                <div>
                  <label htmlFor="contact-message" style={{ display: 'block', fontSize: '0.8rem',
                    color: 'var(--color-text-muted)', marginBottom: '0.4rem' }}>Message</label>
                  <textarea id="contact-message" required rows={4} value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="I'd like to book a consultation..."
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')} />
                </div>

                {status === 'error' && (
                  <p role="alert" style={{ color: '#dc2626', fontSize: '0.85rem' }}>
                    Something went wrong. Please call us directly.
                  </p>
                )}

                <button type="submit" disabled={status === 'sending'}
                  style={{ backgroundColor: 'var(--color-primary)', color: '#fff', padding: '0.875rem',
                    borderRadius: '8px', border: 'none', fontSize: '0.95rem', fontWeight: 500,
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer', opacity: status === 'sending' ? 0.7 : 1,
                    transition: 'opacity 0.15s' }}>
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
