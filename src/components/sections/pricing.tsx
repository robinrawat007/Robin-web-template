// src/components/sections/pricing.tsx
import type { SectionMeta, PricingTier } from '@/types/content'

interface PricingProps { content: SectionMeta; pricing: PricingTier[] }

export function Pricing({ content, pricing }: PricingProps) {
  return (
    <section id="pricing" className="section" aria-labelledby="pricing-heading"
      style={{ backgroundColor: 'var(--color-bg)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 id="pricing-heading" style={{ fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 400, marginBottom: '0.75rem' }}>
            {content.headline}
          </h2>
          {content.subheadline && (
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>{content.subheadline}</p>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {pricing.map((tier) => (
            <div key={tier.id} style={{
              backgroundColor: tier.highlighted ? 'var(--color-primary)' : 'var(--color-bg-card)',
              color: tier.highlighted ? '#fff' : 'var(--color-text)',
              borderRadius: '16px',
              padding: '2rem',
              border: tier.highlighted ? 'none' : '1px solid var(--color-border)',
              position: 'relative',
              transform: tier.highlighted ? 'scale(1.02)' : 'none',
            }}>
              {tier.highlighted && (
                <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                  backgroundColor: 'var(--color-accent)', color: 'var(--color-text)', padding: '0.25rem 1rem',
                  borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
                  Most Popular
                </div>
              )}
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: '1.25rem',
                marginBottom: '0.5rem', color: 'inherit' }}>
                {tier.name}
              </h3>
              <p style={{ fontSize: '0.875rem', opacity: 0.7, marginBottom: '1.25rem' }}>{tier.description}</p>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 400,
                marginBottom: '1.5rem', color: 'inherit' }}>
                {tier.currency}{tier.price.toLocaleString('en-IN')}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {tier.features.map((f) => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', opacity: 0.9 }}>
                    <span style={{ color: tier.highlighted ? 'var(--color-accent)' : 'var(--color-primary)', fontWeight: 700 }} aria-hidden="true">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#booking" style={{
                display: 'block', textAlign: 'center', padding: '0.75rem',
                backgroundColor: tier.highlighted ? '#fff' : 'var(--color-primary)',
                color: tier.highlighted ? 'var(--color-primary)' : '#fff',
                borderRadius: '8px', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem',
                transition: 'opacity 0.15s',
              }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
