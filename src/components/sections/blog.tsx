// src/components/sections/blog.tsx
// Disabled by default (featureFlags.showBlog = false in content.json).
// Enable when you have real blog content. Reads posts from Supabase or MDX.
// This is a placeholder shell — wire to your data source before enabling.

import type { SectionMeta } from '@/types/content'

interface BlogProps { content: SectionMeta }

// Placeholder posts — replace with Supabase query or MDX imports
const PLACEHOLDER_POSTS = [
  { id: '1', title: '5 Signs You Need to Visit the Dentist Today', excerpt: 'Most dental problems are painless until they aren\'t. Here\'s what to watch for.', date: 'Dec 2024', category: 'Prevention', slug: 'signs-visit-dentist' },
  { id: '2', title: 'Invisalign vs Braces: What\'s Right For You?', excerpt: 'A straight-talking comparison from a dentist who offers both.', date: 'Nov 2024', category: 'Orthodontics', slug: 'invisalign-vs-braces' },
  { id: '3', title: 'How to Build a Dental Routine Your Kids Will Actually Follow', excerpt: 'Practical strategies from our pediatric dentist that actually stick.', date: 'Oct 2024', category: 'Kids', slug: 'kids-dental-routine' },
]

export function Blog({ content }: BlogProps) {
  return (
    <section id="blog" className="section" aria-labelledby="blog-heading"
      style={{ backgroundColor: 'var(--color-bg)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 id="blog-heading" style={{ fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 400, marginBottom: '0.75rem' }}>
            {content.headline}
          </h2>
          {content.subheadline && (
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>{content.subheadline}</p>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {PLACEHOLDER_POSTS.map((post) => (
            <article key={post.id} style={{ backgroundColor: 'var(--color-bg-card)', borderRadius: '12px',
              padding: '1.5rem', border: '1px solid var(--color-border)' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 500,
                textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                {post.category} · {post.date}
              </p>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: '1.1rem',
                marginBottom: '0.5rem', lineHeight: 1.3, color: 'var(--color-text)' }}>
                {post.title}
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                {post.excerpt}
              </p>
              <a href={`/blog/${post.slug}`} style={{ color: 'var(--color-primary)', fontSize: '0.875rem',
                fontWeight: 500, textDecoration: 'none' }}>
                Read more →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
