// src/components/sections/cta-banner.tsx
import type { CtaBannerContent } from '@/types/content'

interface CtaBannerProps { content: CtaBannerContent }

export function CtaBanner({ content }: CtaBannerProps) {
  return (
    <section aria-label="Call to action"
      style={{ backgroundColor: 'var(--color-primary)', padding: '5rem 1.5rem' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
          fontWeight: 400, color: '#fff', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
          {content.headline}
        </h2>
        {content.subheadline && (
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', marginBottom: '2rem' }}>
            {content.subheadline}
          </p>
        )}
        <a href={content.cta.href}
          style={{ display: 'inline-block', backgroundColor: 'var(--color-accent)',
            color: 'var(--color-text)', padding: '1rem 2rem', borderRadius: '8px',
            fontSize: '1rem', fontWeight: 600, textDecoration: 'none',
            transition: 'transform 0.15s, opacity 0.15s' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.opacity = '0.92'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.opacity = '1'
          }}>
          {content.cta.label}
        </a>
      </div>
    </section>
  )
}
