// src/components/sections/faq.tsx
'use client'

import { useState } from 'react'
import type { SectionMeta, FAQ as FAQType } from '@/types/content'

interface FAQProps { content: SectionMeta; faqs: FAQType[] }

export function FAQ({ content, faqs }: FAQProps) {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <section id="faq" className="section" aria-labelledby="faq-heading"
      style={{ backgroundColor: 'var(--color-bg)' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 id="faq-heading" style={{ fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 400, marginBottom: '0.75rem' }}>
            {content.headline}
          </h2>
          {content.subheadline && (
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>{content.subheadline}</p>
          )}
        </div>

        <dl style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {faqs.map((faq) => {
            const isOpen = open === faq.id
            return (
              <div key={faq.id} style={{ backgroundColor: 'var(--color-bg-card)', borderRadius: '10px',
                border: '1px solid', borderColor: isOpen ? 'var(--color-primary)' : 'var(--color-border)',
                overflow: 'hidden', transition: 'border-color 0.15s' }}>
                <dt>
                  <button
                    onClick={() => setOpen(isOpen ? null : faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    style={{ width: '100%', textAlign: 'left', padding: '1.25rem', background: 'none',
                      border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between',
                      alignItems: 'center', gap: '1rem', color: 'var(--color-text)', fontSize: '0.95rem',
                      fontWeight: 500 }}>
                    {faq.question}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2" aria-hidden="true"
                      style={{ flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                </dt>
                <dd id={`faq-answer-${faq.id}`} style={{ margin: 0,
                  maxHeight: isOpen ? '400px' : '0', overflow: 'hidden', transition: 'max-height 0.25s ease' }}>
                  <p style={{ padding: '0 1.25rem 1.25rem', color: 'var(--color-text-muted)',
                    fontSize: '0.9rem', lineHeight: 1.7 }}>
                    {faq.answer}
                  </p>
                </dd>
              </div>
            )
          })}
        </dl>
      </div>
    </section>
  )
}
