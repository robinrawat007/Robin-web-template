// src/components/sections/why-us.tsx
import type { WhyUsContent } from '@/types/content'

interface WhyUsProps { content: WhyUsContent }

// Icon map — add more as needed
const icons: Record<string, React.ReactNode> = {
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  clock: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>,
  star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
  heart: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />,
  award: <><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" /></>,
  phone: <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9a2 2 0 012-2.18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L9.91 14a16 16 0 006 6l.41-.41a2 2 0 012.11-.45 12.84 12.84 0 002.81.7 2 2 0 011.72 2z" />,
}

export function WhyUs({ content }: WhyUsProps) {
  return (
    <section id="why-us" className="section" aria-labelledby="whyus-heading"
      style={{ backgroundColor: 'var(--color-bg-card)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 id="whyus-heading" style={{ fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 400, marginBottom: '0.75rem' }}>
            {content.headline}
          </h2>
          {content.subheadline && (
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>{content.subheadline}</p>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {content.features.map((feature) => (
            <div key={feature.title} style={{ padding: '1.5rem', backgroundColor: 'var(--color-bg)',
              borderRadius: '12px', border: '1px solid var(--color-border)' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: 'color-mix(in srgb, var(--color-primary) 10%, transparent)',
                borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {icons[feature.icon] ?? <circle cx="12" cy="12" r="10" />}
                </svg>
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: '1.05rem',
                marginBottom: '0.5rem', color: 'var(--color-text)' }}>
                {feature.title}
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
