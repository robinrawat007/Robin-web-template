// src/app/layout.tsx
// Reads content.json → injects theme as CSS vars → metadata for SEO.
// Change client theme: update content.json theme block only. Zero code changes.

import type { Metadata } from 'next'
import './globals.css'
import content from '../../content.json'

const { theme, seo, business, integrations } = content

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  openGraph: {
    title: seo.title,
    description: seo.description,
    images: [{ url: seo.ogImage, width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
    images: [seo.ogImage],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
}

// CSS vars injected from theme — every Tailwind class that references
// var(--color-primary) etc. picks up the client's brand automatically.
const themeVars = `
  :root {
    --color-primary: ${theme.primary};
    --color-primary-light: ${theme.primaryLight};
    --color-accent: ${theme.accent};
    --color-bg: ${theme.bg};
    --color-bg-card: ${theme.bgCard};
    --color-text: ${theme.text};
    --color-text-muted: ${theme.textMuted};
    --color-border: ${theme.border};
    --font-heading: ${theme.fontHeading};
    --font-body: ${theme.fontBody};
  }
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Inject client theme */}
        <style dangerouslySetInnerHTML={{ __html: themeVars }} />

        {/* Google Fonts — replace with content.json font names if changed */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300..500;1,9..40,300..400&display=swap"
          rel="stylesheet"
        />

        {/* GA4 — only loads in production */}
        {process.env.NODE_ENV === 'production' && integrations.ga4 && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${integrations.ga4}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${integrations.ga4}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body
        style={{
          fontFamily: 'var(--font-body)',
          backgroundColor: 'var(--color-bg)',
          color: 'var(--color-text)',
        }}
      >
        {children}
      </body>
    </html>
  )
}
