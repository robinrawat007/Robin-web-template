// src/app/page.tsx
// Driven entirely by content.json.
// To hide a section: set visible: false in content.json.
// To reorder sections: reorder the sections array in content.json.
// To add a new section type: add to sectionMap below + create the component.

import content from '../../content.json'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

// Sections
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Services } from '@/components/sections/services'
import { WhyUs } from '@/components/sections/why-us'
import { Pricing } from '@/components/sections/pricing'
import { Team } from '@/components/sections/team'
import { Testimonials } from '@/components/sections/testimonials'
import { Gallery } from '@/components/sections/gallery'
import { FAQ } from '@/components/sections/faq'
import { Booking } from '@/components/sections/booking'
import { CtaBanner } from '@/components/sections/cta-banner'
import { Contact } from '@/components/sections/contact'
import { Blog } from '@/components/sections/blog'

// Map section type string → component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sectionMap: Record<string, React.ComponentType<any>> = {
  hero: Hero,
  about: About,
  services: Services,
  'why-us': WhyUs,
  pricing: Pricing,
  team: Team,
  testimonials: Testimonials,
  gallery: Gallery,
  faq: FAQ,
  booking: Booking,
  'cta-banner': CtaBanner,
  contact: Contact,
  blog: Blog,
}

export default function Home() {
  const visibleSections = content.sections.filter((s) => s.visible)

  return (
    <>
      <Navbar business={content.business} />
      <main id="main-content">
        {visibleSections.map((section) => {
          const Component = sectionMap[section.type]
          if (!Component) return null

          return (
            <Component
              key={section.type}
              content={section.content}
              // Pass global data arrays to sections that need them
              services={content.services}
              team={content.team}
              testimonials={content.testimonials}
              faqs={content.faqs}
              gallery={content.gallery}
              pricing={content.pricing}
              business={content.business}
              integrations={content.integrations}
            />
          )
        })}
      </main>
      <Footer business={content.business} />
    </>
  )
}
