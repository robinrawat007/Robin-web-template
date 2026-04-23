// src/components/sections/gallery.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { SectionMeta, GalleryItem } from '@/types/content'

interface GalleryProps { content: SectionMeta; gallery: GalleryItem[] }

export function Gallery({ content, gallery }: GalleryProps) {
  const categories = ['all', ...Array.from(new Set(gallery.map((g) => g.category)))]
  const [active, setActive] = useState('all')

  const filtered = active === 'all' ? gallery : gallery.filter((g) => g.category === active)

  return (
    <section id="gallery" className="section" aria-labelledby="gallery-heading"
      style={{ backgroundColor: 'var(--color-bg-card)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 id="gallery-heading" style={{ fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 400, marginBottom: '0.75rem' }}>
            {content.headline}
          </h2>
          {content.subheadline && (
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>{content.subheadline}</p>
          )}
        </div>

        {/* Filter tabs */}
        <div role="tablist" aria-label="Gallery categories"
          style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button key={cat} role="tab" aria-selected={active === cat}
              onClick={() => setActive(cat)}
              style={{
                padding: '0.4rem 1rem', borderRadius: '100px', fontSize: '0.85rem', cursor: 'pointer',
                border: '1px solid',
                borderColor: active === cat ? 'var(--color-primary)' : 'var(--color-border)',
                backgroundColor: active === cat ? 'var(--color-primary)' : 'transparent',
                color: active === cat ? '#fff' : 'var(--color-text-muted)',
                textTransform: 'capitalize', transition: 'all 0.15s',
              }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
          {filtered.map((item) => (
            <div key={item.id} style={{ borderRadius: '10px', overflow: 'hidden',
              aspectRatio: '4/3', position: 'relative', backgroundColor: 'var(--color-border)',
              transition: 'transform 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}>
              <Image src={item.src} alt={item.alt} fill style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 50vw, 25vw" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
