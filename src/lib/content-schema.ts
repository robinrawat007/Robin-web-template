// src/lib/content-schema.ts
// Single source of truth — Zod validator for content.json
// Generated from Client Intake Form (Tally RGZW54) + Step 01 template
// Usage: validateContent(raw) → throws on invalid, returns typed SiteContent
//        safeValidateContent(raw) → returns { success, data, error }

import { z } from 'zod'

// ─── Enums ────────────────────────────────────────────────────────────────────

const IndustryEnum = z.enum([
  'dentist_clinic',
  'salon_spa',
  'gym_fitness',
  'restaurant_cafe',
  'other',
])

const VibeEnum = z.enum([
  'clean_minimal',
  'bold_energetic',
  'warm_trustworthy',
  'premium_highend',
  'playful_fun',
  'classic_traditional',
])

const FontStyleEnum = z.enum([
  'modern_clean',
  'elegant_serif',
  'bold_display',
  'no_preference',
])

const BookingProviderEnum = z.enum([
  'cal_com',
  'calendly',
  'whatsapp_only',
  'none',
])

const TestimonialSourceEnum = z.enum(['google', 'whatsapp', 'direct'])

// ─── Sub-schemas ──────────────────────────────────────────────────────────────

const MetaSchema = z.object({
  slug: z.string().min(1),
  reference_site: z.string().url().nullable(),
  special_notes: z.string().nullable(),
  generated_at: z.string().datetime(),
  version: z.string(),
})

const BusinessSchema = z.object({
  name: z.string().min(1),
  industry: IndustryEnum,
  tagline: z.string(),
  description: z.string(),
  city: z.string().min(1),
  address: z.string().min(1),
  phone: z.string().min(1),
  whatsapp: z.string().nullable(),
  email: z.string().email().nullable(),
  existing_url: z.string().url().nullable(),
  gmb_url: z.string().url().nullable(),
  business_hours: z.string().nullable(),
  year_established: z.string().nullable(),
  logo_url: z.string().nullable(),
})

const ThemeSchema = z.object({
  primary: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  primaryLight: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  secondary: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  accent: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  bg: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  bgCard: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  text: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  textMuted: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  border: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  vibe: z.array(VibeEnum).min(1),
  font_style: FontStyleEnum,
  fontHeading: z.string(),
  fontBody: z.string(),
})

const SEOSchema = z.object({
  title: z.string().min(10).max(60),
  description: z.string().min(100).max(160),
  keywords: z.array(z.string()).min(3).max(10),
  ogImage: z.string().nullable(),
})

const ServiceSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string(),
  price_hint: z.string().nullable(),
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
  name: z.string().nullable(),
  location: z.string(),
  rating: z.number().min(1).max(5),
  text: z.string().min(10),
  date: z.string(),
  service: z.string(),
  source: TestimonialSourceEnum.nullable(),
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

const SocialSchema = z.object({
  instagram: z.string().nullable(),
  facebook: z.string().nullable(),
  youtube: z.string().nullable(),
  linkedin: z.string().nullable(),
  other: z.string().nullable(),
})

const IntegrationsSchema = z.object({
  booking_provider: BookingProviderEnum,
  booking_url: z.string().nullable(),
  calcom: z.string(),
  ga4: z.string(),
  whatsapp: z.string(),
  maps_embed_url: z.string().nullable(),
})

const FeatureFlagsSchema = z.object({
  // Features from intake form
  chatbot: z.boolean(),
  booking_system: z.boolean(),
  appointment_reminders: z.boolean(),
  review_collection: z.boolean(),
  google_reviews_widget: z.boolean(),
  contact_form: z.boolean(),
  team_section: z.boolean(),
  faq_section: z.boolean(),
  video_embed: z.boolean(),
  certificates_display: z.boolean(),
  newsletter_signup: z.boolean(),
  popup_banner: z.boolean(),
  referral_program: z.boolean(),
  blog: z.boolean(),
  google_maps_embed: z.boolean(),
  payment_link: z.boolean(),
  multiple_locations: z.boolean(),
  loyalty_offers: z.boolean(),
  login_signup: z.boolean(),
  price_list_menu: z.boolean(),
  photo_video_gallery: z.boolean(),
  testimonials_section: z.boolean(),
  before_after_gallery: z.boolean(),
  missed_call_textback: z.boolean(),
  whatsapp_widget: z.boolean(),
  // Legacy flags from Step 01
  showBlog: z.boolean(),
  showPricing: z.boolean(),
  showGallery: z.boolean(),
  showTeam: z.boolean(),
  showAuth: z.boolean(),
  // System flags (set by pipeline, not intake)
  has_existing_site: z.boolean(),
  has_logo: z.boolean(),
  deployed: z.boolean(),
})

const SectionSchema = z.object({
  type: z.string(),
  variant: z.string().optional(),
  visible: z.boolean(),
  order: z.number(),
  content: z.record(z.string(), z.unknown()),
})

// ─── Root schema ──────────────────────────────────────────────────────────────

export const SiteContentSchema = z.object({
  meta: MetaSchema,
  business: BusinessSchema,
  seo: SEOSchema,
  theme: ThemeSchema,
  sections: z.array(SectionSchema),
  services: z.array(ServiceSchema).min(1).max(12),
  team: z.array(TeamMemberSchema),
  testimonials: z.array(TestimonialSchema),
  faqs: z.array(FAQSchema),
  gallery: z.array(GalleryItemSchema),
  pricing: z.array(PricingTierSchema),
  certifications: z.array(z.string()),
  social: SocialSchema,
  integrations: IntegrationsSchema,
  featureFlags: FeatureFlagsSchema,
})

// ─── Exported type ────────────────────────────────────────────────────────────

export type SiteContent = z.infer<typeof SiteContentSchema>

// ─── Validators ───────────────────────────────────────────────────────────────

export function validateContent(raw: unknown): SiteContent {
  return SiteContentSchema.parse(raw)
}

export function safeValidateContent(raw: unknown) {
  return SiteContentSchema.safeParse(raw)
}