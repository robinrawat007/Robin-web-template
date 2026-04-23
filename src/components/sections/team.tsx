// src/components/sections/team.tsx
import Image from 'next/image'
import type { SectionMeta, TeamMember } from '@/types/content'

interface TeamProps { content: SectionMeta; team: TeamMember[] }

export function Team({ content, team }: TeamProps) {
  return (
    <section id="team" className="section" aria-labelledby="team-heading"
      style={{ backgroundColor: 'var(--color-bg-card)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 id="team-heading" style={{ fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 400, marginBottom: '0.75rem' }}>
            {content.headline}
          </h2>
          {content.subheadline && (
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>{content.subheadline}</p>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {team.map((member) => (
            <article key={member.id} style={{ backgroundColor: 'var(--color-bg)', borderRadius: '16px',
              overflow: 'hidden', border: '1px solid var(--color-border)', textAlign: 'center' }}>
              {/* Photo */}
              <div style={{ aspectRatio: '1/1', position: 'relative', backgroundColor: 'var(--color-border)' }}>
                {member.image ? (
                  <Image src={member.image} alt={member.name} fill style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 33vw" loading="lazy" />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', backgroundColor: 'color-mix(in srgb, var(--color-primary) 10%, transparent)' }}>
                    <span style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
                      {member.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: '1.1rem',
                  marginBottom: '0.25rem', color: 'var(--color-text)' }}>
                  {member.name}
                </h3>
                <p style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.25rem' }}>
                  {member.role}
                </p>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                  {member.qualification} · {member.experience}
                </p>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  {member.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
