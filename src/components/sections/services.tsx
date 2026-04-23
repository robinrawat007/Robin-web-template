// src/components/sections/services.tsx
import Image from 'next/image'
import type { SectionMeta, Service } from '@/types/content'

interface ServicesProps {
  content: SectionMeta
  services: Service[]
}

export function Services({ content, services }: ServicesProps) {
  const featured = services.filter((s) => s.featured)
  const others = services.filter((s) => !s.featured)

  return (
    <section id="services" className="section" aria-labelledby="services-heading"
      style={{ backgroundColor: 'var(--color-bg)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 id="services-heading" style={{ fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 400, marginBottom: '0.75rem' }}>
            {content.headline}
          </h2>
          {content.subheadline && (
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>{content.subheadline}</p>
          )}
        </div>

        {/* Featured grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
          {featured.map((service) => (
            <article key={service.id} style={{ backgroundColor: 'var(--color-bg-card)', borderRadius: '12px',
              overflow: 'hidden', border: '1px solid var(--color-border)', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}>
              {service.image && (
                <div style={{ aspectRatio: '16/9', position: 'relative', backgroundColor: 'var(--color-border)' }}>
                  <Image src={service.image} alt={service.name} fill style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 33vw" loading="lazy" />
                </div>
              )}
              <div style={{ padding: '1.25rem' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: '1.15rem',
                  marginBottom: '0.5rem', color: 'var(--color-text)' }}>
                  {service.name}
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                  {service.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Other services as chips */}
        {others.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            {others.map((service) => (
              <span key={service.id} style={{ padding: '0.4rem 1rem', backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)', borderRadius: '100px', fontSize: '0.875rem',
                color: 'var(--color-text-muted)' }}>
                {service.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
