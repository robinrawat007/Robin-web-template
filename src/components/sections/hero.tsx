// src/components/sections/hero.tsx
// Variant: split — headline left, image right.
// All text + CTA driven by content.json sections[type=hero].content

import Image from 'next/image'
import type { HeroContent, Business } from '@/types/content'

interface HeroProps {
  content: HeroContent
  business: Business
}

export function Hero({ content, business }: HeroProps) {
  return (
    <section
      id="hero"
      aria-label="Hero"
      style={{
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '80px', // offset sticky nav
        backgroundColor: 'var(--color-bg)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '4rem 1.5rem',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'center',
        }}
        className="md:grid-cols-2"
      >
        {/* Left: Text */}
        <div>
          {content.badge && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'color-mix(in srgb, var(--color-primary) 10%, transparent)',
                color: 'var(--color-primary)',
                padding: '0.35rem 0.875rem',
                borderRadius: '100px',
                fontSize: '0.8rem',
                fontWeight: 500,
                marginBottom: '1.5rem',
                border: '1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)',
              }}
            >
              <span aria-hidden="true">✦</span>
              {content.badge}
            </div>
          )}

          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: 'var(--color-text)',
              marginBottom: '1.25rem',
            }}
          >
            {content.headline}
          </h1>

          <p
            style={{
              fontSize: '1.125rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.7,
              marginBottom: '2rem',
              maxWidth: '480px',
            }}
          >
            {content.subheadline}
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <a
              href={content.cta.href}
              style={{
                backgroundColor: 'var(--color-primary)',
                color: '#fff',
                padding: '0.875rem 1.75rem',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'background-color 0.15s, transform 0.15s',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary-light)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {content.cta.label}
            </a>

            {content.ctaSecondary && (
              <a
                href={content.ctaSecondary.href}
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--color-text)',
                  padding: '0.875rem 1.75rem',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  border: '1px solid var(--color-border)',
                  transition: 'border-color 0.15s, color 0.15s',
                  display: 'inline-block',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)'
                  e.currentTarget.style.color = 'var(--color-primary)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)'
                  e.currentTarget.style.color = 'var(--color-text)'
                }}
              >
                {content.ctaSecondary.label}
              </a>
            )}
          </div>

          {/* Quick contact */}
          <a
            href={`tel:${business.phone}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--color-text-muted)',
              fontSize: '0.9rem',
              textDecoration: 'none',
            }}
            aria-label={`Call us at ${business.phone}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9a2 2 0 012-2.18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L9.91 14a16 16 0 006 6l.41-.41a2 2 0 012.11-.45 12.84 12.84 0 002.81.7 2 2 0 011.72 2z" />
            </svg>
            {business.phone}
          </a>
        </div>

        {/* Right: Image */}
        {content.image && (
          <div
            style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              aspectRatio: '4/5',
              backgroundColor: 'var(--color-border)',
            }}
          >
            <Image
              src={content.image}
              alt="Dental clinic — welcoming modern space"
              fill
              style={{ objectFit: 'cover' }}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}
      </div>
    </section>
  )
}
