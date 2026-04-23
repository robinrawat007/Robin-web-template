// types/content.ts

export interface ContentJSON {
  meta: Meta
  business: Business
  theme: Theme
  seo: SEO
  services: Service[]
  testimonials: Testimonial[]
  certifications: string[]
  team: TeamMember[]
  faqs: FAQ[]
  social: Social
  integrations: Integrations
  flags: Flags
  sections: Section[]
}

interface Meta {
  slug: string                  // e.g. "sharma-dental-gurgaon"
  reference_site: string | null // site they love the look of
  special_notes: string | null  // Robin only, not rendered
  generated_at: string          // ISO timestamp
  version: string               // "1.0"
}

interface Business {
  name: string
  industry:
  | "dentist_clinic"
  | "salon_spa"
  | "gym_fitness"
  | "restaurant_cafe"
  | "other"
  city: string
  address: string
  phone: string
  whatsapp: string | null
  existing_url: string | null
  gmb_url: string | null
  business_hours: string | null  // e.g. "Mon–Sat 10am–7pm"
  year_established: string | null
  logo_url: string | null        // Tally file upload URL or Supabase storage URL
  tagline: string | null         // AI-generated from scraped data
  description: string | null     // AI-generated short paragraph about the business
}

interface Theme {
  primary: string                // hex e.g. "#2563EB" — from intake or AI-picked
  secondary: string              // AI-derived complement
  accent: string                 // AI-derived accent
  background: string             // default "#FFFFFF"
  text: string                   // default "#111827"
  vibe: Vibe[]
  font_style: FontStyle
  font_heading: string           // Google Font name e.g. "Inter"
  font_body: string              // Google Font name e.g. "Inter"
}

type Vibe =
  | "clean_minimal"
  | "bold_energetic"
  | "warm_trustworthy"
  | "premium_highend"
  | "playful_fun"
  | "classic_traditional"

type FontStyle =
  | "modern_clean"
  | "elegant_serif"
  | "bold_display"
  | "no_preference"

interface SEO {
  title: string           // 50–60 chars
  description: string     // 140–160 chars, benefit-focused
  keywords: string[]      // 5–8 keywords
  og_image: string | null // URL
}

interface Service {
  name: string
  description: string | null
  price_hint: string | null   // e.g. "₹500–₹1500" or null
  icon: string | null         // emoji or icon name
  featured: boolean           // top 3 services = true
}

interface Testimonial {
  text: string
  author: string | null
  rating: number | null       // 1–5
  source: "google" | "whatsapp" | "direct" | null
}

interface TeamMember {
  name: string
  role: string
  bio: string | null
  image_url: string | null
}

interface FAQ {
  question: string
  answer: string
}

interface Social {
  instagram: string | null    // handle or full URL
  facebook: string | null
  youtube: string | null
  linkedin: string | null
  other: string | null
}

interface Integrations {
  booking_provider: "cal_com" | "calendly" | "whatsapp_only" | "none"
  booking_url: string | null
  whatsapp_widget_number: string | null
  ga4_id: string | null
  maps_embed_url: string | null
}

interface Flags {
  // Features selected in intake form
  chatbot: boolean
  booking_system: boolean
  appointment_reminders: boolean
  review_collection: boolean
  google_reviews_widget: boolean
  contact_form: boolean
  team_section: boolean
  faq_section: boolean
  video_embed: boolean
  certificates_display: boolean
  newsletter_signup: boolean
  popup_banner: boolean
  referral_program: boolean
  blog: boolean
  google_maps_embed: boolean
  payment_link: boolean
  multiple_locations: boolean
  loyalty_offers: boolean
  login_signup: boolean
  price_list_menu: boolean
  photo_video_gallery: boolean
  testimonials_section: boolean
  before_after_gallery: boolean
  missed_call_textback: boolean
  whatsapp_widget: boolean

  // System flags (set by pipeline, not intake)
  has_existing_site: boolean
  has_logo: boolean
  deployed: boolean
}

interface Section {
  type: SectionType
  variant: string           // e.g. "split-left", "centered", "grid-3"
  visible: boolean
  order: number
  content: Record<string, unknown>  // section-specific content
}

type SectionType =
  | "hero"
  | "services"
  | "pricing"
  | "booking"
  | "testimonials"
  | "gallery"
  | "before_after"
  | "team"
  | "faq"
  | "cta"
  | "contact"
  | "footer"
  | "blog"
  | "certifications"
  | "google_reviews"
  | "video"
  | "newsletter"
  | "loyalty"
  | "price_menu"
  | "referral"
  | "locations"