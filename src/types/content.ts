// src/types/content.ts
// Auto-generated structure matching content.json schema.
// Do NOT add fields here without adding them to content.json AND content-schema.ts

export interface Business {
  name: string
  tagline: string
  description: string
  phone: string
  email: string
  address: string
  hours: { weekdays: string; sunday: string }
  mapsUrl: string
  whatsapp: string
  logo: string
}

export interface SEO {
  title: string
  description: string
  keywords: string[]
  ogImage: string
}

export interface Theme {
  primary: string
  primaryLight: string
  accent: string
  bg: string
  bgCard: string
  text: string
  textMuted: string
  border: string
  fontHeading: string
  fontBody: string
}

// ─── Section content types ───────────────────────────────────────────────────

export interface HeroContent {
  headline: string
  subheadline: string
  cta: { label: string; href: string }
  ctaSecondary?: { label: string; href: string }
  image?: string
  badge?: string
}

export interface AboutContent {
  headline: string
  story: string
  image?: string
  stats: Array<{ value: string; label: string }>
}

export interface SectionMeta {
  headline: string
  subheadline?: string
}

export interface WhyUsContent {
  headline: string
  subheadline?: string
  features: Array<{ icon: string; title: string; description: string }>
}

export interface BookingContent {
  headline: string
  subheadline?: string
  calcomUrl?: string
}

export interface CtaBannerContent {
  headline: string
  subheadline?: string
  cta: { label: string; href: string }
}

export type SectionContent =
  | HeroContent
  | AboutContent
  | SectionMeta
  | WhyUsContent
  | BookingContent
  | CtaBannerContent

export interface Section {
  type: string
  variant?: string
  visible: boolean
  content: SectionContent
}

// ─── Data types ───────────────────────────────────────────────────────────────

export interface Service {
  id: string
  name: string
  description: string
  icon: string
  image?: string
  featured: boolean
}

export interface TeamMember {
  id: string
  name: string
  role: string
  qualification: string
  experience: string
  bio: string
  image?: string
}

export interface Testimonial {
  id: string
  name: string
  location: string
  rating: number
  text: string
  date: string
  service: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
}

export interface GalleryItem {
  id: string
  src: string
  alt: string
  category: string
}

export interface PricingTier {
  id: string
  name: string
  price: number
  currency: string
  description: string
  features: string[]
  highlighted: boolean
  cta: string
}

export interface Integrations {
  calcom: string
  ga4: string
  whatsapp: string
}

export interface FeatureFlags {
  showBlog: boolean
  showPricing: boolean
  showGallery: boolean
  showTeam: boolean
  showAuth: boolean
}

export interface SiteContent {
  business: Business
  seo: SEO
  theme: Theme
  sections: Section[]
  services: Service[]
  team: TeamMember[]
  testimonials: Testimonial[]
  faqs: FAQ[]
  gallery: GalleryItem[]
  pricing: PricingTier[]
  integrations: Integrations
  featureFlags: FeatureFlags
}
