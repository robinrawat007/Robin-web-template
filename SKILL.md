# SKILL.md — Website Factory
> Read this before touching any file. Every client build starts here.
> Goal: after reading this, you need zero extra context to build a complete site.

---

## What this repo is

A Next.js 16 website factory for appointment-based businesses (dentists, salons, clinics, gyms, physios).
One command → full site. Content lives in `content.json`. Code never changes per client.

**Stack:** Next.js 16 · TypeScript strict · Tailwind v4 · Framer Motion (GSAP optional) · Supabase · Vercel

---

## The one rule

**Never hardcode client content.** Every string, image path, color, font, section order — it all comes from `content.json`. If you're typing a business name, phone number, or color code into a component, you're doing it wrong.

---

## content.json — complete map

```
content.json
├── business        → name, tagline, description, phone, email, address, hours, mapsUrl, whatsapp, logo
├── seo             → title (≤60 chars), description (≤160 chars), keywords[], ogImage
├── theme           → primary, primaryLight, accent, bg, bgCard, text, textMuted, border, fontHeading, fontBody
├── sections[]      → [{ type, variant?, visible, content{} }]  ← ORDER controls page order
├── services[]      → [{ id, name, description, icon, image?, featured }]
├── team[]          → [{ id, name, role, qualification, experience, bio, image? }]
├── testimonials[]  → [{ id, name, location, rating, text, date, service }]
├── faqs[]          → [{ id, question, answer }]
├── gallery[]       → [{ id, src, alt, category }]
├── pricing[]       → [{ id, name, price, currency, description, features[], highlighted, cta }]
├── integrations    → { calcom, ga4, whatsapp }
└── featureFlags    → { showBlog, showPricing, showGallery, showTeam, showAuth }
```

**Theme injection:** `layout.tsx` reads `content.theme` → writes CSS vars to `<style>` on `<html>`.
All components use `var(--color-primary)` etc. Never hardcode hex values in components.

**Section rendering:** `page.tsx` loops `content.sections`, filters `visible: true`, maps `type` → component.
To hide a section: `"visible": false`. To reorder: move the object in the array. No code changes.

---

## Section types and their content props

| type | required content fields | uses global data |
|------|------------------------|-----------------|
| `hero` | headline, subheadline, cta{label,href}, ctaSecondary?, image?, badge? | business.phone |
| `about` | headline, story, image?, stats[]{value,label} | — |
| `services` | headline, subheadline? | services[] |
| `why-us` | headline, subheadline?, features[]{icon,title,description} | — |
| `pricing` | headline, subheadline? | pricing[] |
| `team` | headline, subheadline? | team[] |
| `testimonials` | headline, subheadline? | testimonials[] |
| `gallery` | headline, subheadline? | gallery[] |
| `faq` | headline, subheadline? | faqs[] |
| `booking` | headline, subheadline?, calcomUrl? | business, integrations |
| `cta-banner` | headline, subheadline?, cta{label,href} | — |
| `contact` | headline, subheadline? | business |
| `blog` | headline, subheadline? | — (placeholder — enable only with real content) |

---

## Aesthetic rules — non-negotiable

These are checked by the `ui-polish-auditor` command before every deploy.

1. **Section spacing:** `padding: 4rem 1.5rem` mobile → `6rem 1.5rem` desktop. Use `.section` class. Never less.
2. **Headline weight:** `font-weight: 400` always on h1–h3. Never 600, never 700, never `font-bold` on headings.
3. **Primary CTA hover:** Every `<a>` or `<button>` that is a primary CTA must have `transition` + `translateY(-2px)` on hover.
4. **Image aspect ratio:** Always set `aspect-ratio` on image containers. Never let images collapse or stretch. Use `objectFit: 'cover'` on `<Image fill>`.
5. **Contrast:** Never `color: var(--color-text-muted)` on `background: var(--color-border)`. Muted text requires bg-card or bg minimum.
6. **Max 2 fonts:** `fontHeading` and `fontBody` from theme only. Never add a third font.
7. **Focus states:** Every interactive element needs `:focus-visible` outline. The global CSS handles this — don't override it.
8. **No horizontal scroll:** Every section has `overflow-x: hidden` implicitly from body. Test at 320px width.
9. **Images lazy:** All images below the fold: `loading="lazy"`. Hero image: `priority`.
10. **Mobile nav:** Hamburger at <768px. Menu closes on link click. Test this every build.

---

## Runbook: customize a client site (5 steps)

**Input:** A filled `content.json` for the client.

```
Step 1 — Replace content.json
  Copy the client's filled content.json to the root.
  Do NOT edit any component file.

Step 2 — Update fonts in layout.tsx
  If content.theme.fontHeading/fontBody differ from current:
  → Update the Google Fonts <link> in src/app/layout.tsx
  → Change the family names only, keep the weights
  Rule: max 2 font families. Pick from: DM Serif Display, Playfair Display,
        Cormorant Garamond, Instrument Serif (heading) /
        DM Sans, Inter, Plus Jakarta Sans, Geist (body)

Step 3 — Drop in client images
  Hero: /public/hero-[industry].jpg (min 1200×900, WebP preferred)
  Team: /public/team/[id].jpg (square, min 400×400)
  Services: /public/services/[id].jpg (16:9, min 800×450)
  Gallery: /public/gallery/[id].jpg (any, min 600px wide)
  Logo: /public/logo.png (square or horizontal, transparent bg preferred)
  If an image is missing: the component renders a colored placeholder. Ship without it.

Step 4 — Run the auditor
  Run the ui-polish-auditor command.
  Fix every FAIL before proceeding.

Step 5 — Build check
  pnpm build — must pass with zero errors and zero TypeScript errors.
  If it passes: ready to deploy.
```

---

## Runbook: add a new section type (4 steps)

```
Step 1 — Add content shape to src/types/content.ts
  Create interface: [Name]Content { ...fields }
  Add to SectionContent union type

Step 2 — Add Zod shape to src/lib/content-schema.ts
  Mirror the TypeScript interface with Zod validators

Step 3 — Create src/components/sections/[name].tsx
  Props: { content: [Name]Content, ...any global data arrays needed }
  Use .section class for padding
  Use CSS vars for all colors
  Follow all 10 aesthetic rules

Step 4 — Register in src/app/page.tsx
  Add to sectionMap: { '[type-string]': ComponentName }
  Add import at top of file
```

---

## Runbook: Supabase auth (fixes redirect + OTP bugs)

**ALWAYS follow this pattern. Deviating causes the bugs Robin has seen before.**

### Google OAuth
```typescript
// In your sign-in component (Client Component):
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()
await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: `${window.location.origin}/auth/callback`,
    // Optional: redirect after auth to a specific page:
    // redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`
  },
})
// No redirect needed here — Supabase handles it
```

### OTP / Magic Link (6-digit code input)
```typescript
// Step 1: Send OTP
await supabase.auth.signInWithOtp({
  email,
  options: { shouldCreateUser: true },
})

// Step 2: Verify OTP (in your OTP input component)
const { error } = await supabase.auth.verifyOtp({
  email,
  token: otpValue,    // the 6-digit code
  type: 'email',      // REQUIRED — missing this causes the "stuck" bug
})
if (!error) {
  router.push('/dashboard')  // REQUIRED — manual redirect after verifyOtp
}
```

### Reading session in Server Components
```typescript
import { createClient } from '@/lib/supabase/server'
const supabase = await createClient()
const { data: { user } } = await supabase.auth.getUser()  // NOT getSession()
```

### Supabase Dashboard config (do this once per project)
- Authentication → URL Configuration
- Site URL: `https://yourdomain.com` (or `http://localhost:3000` for dev)
- Redirect URLs: `https://yourdomain.com/auth/callback`
- Add both prod and localhost URLs

---

## What NOT to touch

- `src/types/content.ts` — only change when adding a new section type
- `src/lib/content-schema.ts` — keep in sync with types, always
- `src/app/layout.tsx` — only change fonts when client theme changes
- `src/app/page.tsx` — only add to `sectionMap` when adding a new section type
- `src/app/globals.css` — only touch spacing/reset rules; never add component styles here
- `middleware.ts` — do not modify unless changing protected routes
- `src/app/auth/callback/route.ts` — do not modify

---

## Common mistakes to avoid

| Mistake | Correct approach |
|---------|-----------------|
| Hardcoding a phone number in a component | Read from `business.phone` prop |
| Using `font-weight: 600` on a heading | Use `font-weight: 400` always |
| Adding padding less than 64px to a section | Use `.section` class |
| Setting image `width`/`height` without `aspect-ratio` on container | Always set `aspectRatio` on container div |
| Using `supabase.auth.getSession()` on server | Use `supabase.auth.getUser()` only |
| Redirecting to `/auth` after sign-in (causes loop) | Redirect to `/auth/callback` with `?next=` |
| Disabling a TypeScript error with `@ts-ignore` | Fix the type |
| Adding a section without registering in `sectionMap` | Always register in `page.tsx` |

---

## Performance notes

- All images use `next/image` with `fill` + `sizes` prop. Always set `sizes`.
- Server Components by default. `'use client'` only on: Gallery (filter tabs), FAQ (accordion), Contact (form state), Navbar (scroll + mobile menu).
- No unused dependencies. Check before adding.
- GA4 only loads in `process.env.NODE_ENV === 'production'`.

---

## Env vars required

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_SITE_URL=http://localhost:3000   # prod: https://yourdomain.com
```
