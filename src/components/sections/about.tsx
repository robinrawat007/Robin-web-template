// src/components/sections/about.tsx
import Image from 'next/image'
import type { AboutContent } from '@/types/content'

interface AboutProps { content: AboutContent }

export function About({ content }: AboutProps) {
  return (
    <section id="about" className="section" aria-labelledby="about-heading"
      style={{ backgroundColor: 'var(--color-bg-card)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', alignItems: 'center' }}
          className="md:grid-cols-2">

          {/* Image */}
          {content.image && (
            <div style={{ borderRadius: '16px', overflow: 'hidden', aspectRatio: '4/3', position: 'relative', backgroundColor: 'var(--color-border)' }}>
              <Image src={content.image} alt="Our clinic interior" fill style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw" loading="lazy" />
            </div>
          )}

          {/* Text */}
          <div>
            <h2 id="about-heading" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              fontWeight: 400, marginBottom: '1.25rem', color: 'var(--color-text)' }}>
              {content.headline}
            </h2>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, fontSize: '1rem', marginBottom: '2rem' }}>
              {content.story}
            </p>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {content.stats.map((stat) => (
                <div key={stat.label} style={{ padding: '1rem', backgroundColor: 'var(--color-bg)',
                  borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 400,
                    color: 'var(--color-primary)', lineHeight: 1, marginBottom: '0.25rem' }}>
                    {stat.value}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase',
                    letterSpacing: '0.05em' }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
