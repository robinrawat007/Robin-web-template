// src/lib/content-schema.ts
// Runtime validator for content.json. Used in Step 04 (content.json generator)
// to validate Claude API output before committing to GitHub.
// Run: validateContent(rawJson) → throws on invalid, returns typed SiteContent on success.

import { z } from 'zod'
import type { SiteContent } from '@/types/content'

const BusinessSchema = z.object({
  name: z.string().min(1),
  tagline: z.string(),
  description: z.string(),
  phone: z.string(),
  email: z.string().email(),
  address: z.string(),
  hours: z.object({ weekdays: z.string(), sunday: z.string() }),
  mapsUrl: z.string().url().optional().or(z.literal('')),
  whatsapp: z.string(),
  logo: z.string(),
})

const SEOSchema = z.object({
  title: z.string().min(1).max(60),
  description: z.string().min(1).max(160),
  keywords: z.array(z.string()),
  ogImage: z.string(),
})

const ThemeSchema = z.object({
  primary: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  primaryLight: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  accent: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  bg: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  bgCard: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  text: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  textMuted: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  border: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  fontHeading: z.string(),
  fontBody: z.string(),
})

const SectionSchema = z.object({
  type: z.string(),
  variant: z.string().optional(),
  visible: z.boolean(),
  content: z.record(z.string(), z.unknown()),
})

const ServiceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  image: z.string().optional(),
  featured: z.boolean(),
})

const TeamMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  qualification: z.string(),
  experience: z.string(),
  bio: z.string(),
  image: z.string().optional(),
})

const TestimonialSchema = z.object({
  id: z.string(),
  name: z.string(),
  location: z.string(),
  rating: z.number().min(1).max(5),
  text: z.string(),
  date: z.string(),
  service: z.string(),
})

const FAQSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
})

const GalleryItemSchema = z.object({
  id: z.string(),
  src: z.string(),
  alt: z.string(),
  category: z.string(),
})

const PricingTierSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().nonnegative(),
  currency: z.string(),
  description: z.string(),
  features: z.array(z.string()),
  highlighted: z.boolean(),
  cta: z.string(),
})

const IntegrationsSchema = z.object({
  calcom: z.string(),
  ga4: z.string(),
  whatsapp: z.string(),
})

const FeatureFlagsSchema = z.object({
  showBlog: z.boolean(),
  showPricing: z.boolean(),
  showGallery: z.boolean(),
  showTeam: z.boolean(),
  showAuth: z.boolean(),
})

export const SiteContentSchema = z.object({
  business: BusinessSchema,
  seo: SEOSchema,
  theme: ThemeSchema,
  sections: z.array(SectionSchema),
  services: z.array(ServiceSchema),
  team: z.array(TeamMemberSchema),
  testimonials: z.array(TestimonialSchema),
  faqs: z.array(FAQSchema),
  gallery: z.array(GalleryItemSchema),
  pricing: z.array(PricingTierSchema),
  integrations: IntegrationsSchema,
  featureFlags: FeatureFlagsSchema,
})

export function validateContent(raw: unknown): SiteContent {
  return SiteContentSchema.parse(raw) as unknown as SiteContent
}

export function safeValidateContent(raw: unknown) {
  return SiteContentSchema.safeParse(raw)
}
