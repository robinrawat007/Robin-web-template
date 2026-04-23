// src/components/sections/booking.tsx
// Cal.com embed. Set integrations.calcom in content.json.
// If no calcom URL, falls back to a simple WhatsApp CTA.

import type { BookingContent, Business, Integrations } from '@/types/content'

interface BookingProps {
  content: BookingContent
  business: Business
  integrations: Integrations
}

export function Booking({ content, business, integrations }: BookingProps) {
  const calcomUrl = content.calcomUrl ?? (integrations.calcom ? `https://cal.com/${integrations.calcom}` : null)

  return (
    <section id="booking" className="section" aria-labelledby="booking-heading"
      style={{ backgroundColor: 'var(--color-bg-card)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 id="booking-heading" style={{ fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 400, marginBottom: '0.75rem' }}>
            {content.headline}
          </h2>
          {content.subheadline && (
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>{content.subheadline}</p>
          )}
        </div>

        {calcomUrl ? (
          // Cal.com inline embed
          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg)', minHeight: '500px' }}>
            <iframe
              src={`${calcomUrl}?embed=true&embedType=inline&theme=light`}
              style={{ width: '100%', height: '600px', border: 'none' }}
              title="Book an appointment"
              loading="lazy"
            />
          </div>
        ) : (
          // Fallback: direct contact CTAs
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <a href={`tel:${business.phone}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                backgroundColor: 'var(--color-primary)', color: '#fff', padding: '1rem 1.75rem',
                borderRadius: '8px', textDecoration: 'none', fontWeight: 500 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9a2 2 0 012-2.18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L9.91 14a16 16 0 006 6l.41-.41a2 2 0 012.11-.45 12.84 12.84 0 002.81.7 2 2 0 011.72 2z" />
              </svg>
              Call {business.phone}
            </a>
            <a href={`https://wa.me/${business.whatsapp}?text=Hi, I'd like to book an appointment`}
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                backgroundColor: '#25D366', color: '#fff', padding: '1rem 1.75rem',
                borderRadius: '8px', textDecoration: 'none', fontWeight: 500 }}>
              WhatsApp Us
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
