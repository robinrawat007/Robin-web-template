'use client'

// src/components/navbar.tsx
// Sticky top nav. Mobile-responsive with hamburger menu.
// Props driven by content.json business object.

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Business } from '@/types/content'

interface NavbarProps {
  business: Business
}

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Team', href: '#team' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar({ business }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  const handleNavClick = () => setMenuOpen(false)

  return (
    <header
      role="banner"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
        backgroundColor: scrolled ? 'var(--color-bg-card)' : 'transparent',
        boxShadow: scrolled ? '0 1px 0 var(--color-border)' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label={`${business.name} — home`}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
        >
          <Image
            src={business.logo}
            alt={`${business.name} logo`}
            width={36}
            height={36}
            style={{ objectFit: 'contain' }}
          />
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.1rem',
              color: 'var(--color-text)',
              fontWeight: 400,
            }}
          >
            {business.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" style={{ display: 'flex', gap: '2rem' }} className="hidden md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontSize: '0.9rem',
                color: 'var(--color-text-muted)',
                textDecoration: 'none',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#booking"
          className="hidden md:inline-flex"
          style={{
            backgroundColor: 'var(--color-primary)',
            color: '#fff',
            padding: '0.5rem 1.25rem',
            borderRadius: '6px',
            fontSize: '0.875rem',
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'background-color 0.15s, transform 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-primary-light)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-primary)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Book Appointment
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            color: 'var(--color-text)',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          role="navigation"
          aria-label="Mobile navigation"
          style={{
            backgroundColor: 'var(--color-bg-card)',
            borderTop: '1px solid var(--color-border)',
            padding: '1rem 1.5rem 1.5rem',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              style={{
                display: 'block',
                padding: '0.75rem 0',
                borderBottom: '1px solid var(--color-border)',
                color: 'var(--color-text)',
                textDecoration: 'none',
                fontSize: '1rem',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={handleNavClick}
            style={{
              display: 'block',
              marginTop: '1rem',
              backgroundColor: 'var(--color-primary)',
              color: '#fff',
              padding: '0.75rem 1rem',
              borderRadius: '6px',
              textAlign: 'center',
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            Book Appointment
          </a>
        </div>
      )}
    </header>
  )
}
