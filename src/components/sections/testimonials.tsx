// src/components/sections/testimonials.tsx
import type { SectionMeta, Testimonial } from '@/types/content'

interface TestimonialsProps { content: SectionMeta; testimonials: Testimonial[] }

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24"
          fill={i < rating ? 'var(--color-accent)' : 'var(--color-border)'}
          stroke={i < rating ? 'var(--color-accent)' : 'var(--color-border)'}
          strokeWidth="1" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

export function Testimonials({ content, testimonials }: TestimonialsProps) {
  return (
    <section id="testimonials" className="section" aria-labelledby="testimonials-heading"
      style={{ backgroundColor: 'var(--color-bg)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 id="testimonials-heading" style={{ fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 400, marginBottom: '0.75rem' }}>
            {content.headline}
          </h2>
          {content.subheadline && (
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>{content.subheadline}</p>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {testimonials.map((t) => (
            <blockquote key={t.id} style={{ backgroundColor: 'var(--color-bg-card)', borderRadius: '12px',
              padding: '1.5rem', border: '1px solid var(--color-border)', margin: 0,
              display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <StarRating rating={t.rating} />
              <p style={{ color: 'var(--color-text)', fontSize: '0.9rem', lineHeight: 1.7, fontStyle: 'italic', flex: 1 }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <footer>
                <cite style={{ fontStyle: 'normal' }}>
                  <p style={{ fontWeight: 500, fontSize: '0.9rem', color: 'var(--color-text)', marginBottom: '0.1rem' }}>
                    {t.name}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    {t.location} · {t.service}
                  </p>
                </cite>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
