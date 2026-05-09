"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { CountrySwitcher } from "./country-switcher"

const navLinks = [
  { href: "#how-it-works", label: "How It Works", isPageLink: false },
  { href: "#team", label: "Meet the Team", isPageLink: false },
  { href: "/pricing", label: "Pricing", isPageLink: true },
  { href: "#testimonials", label: "Testimonials", isPageLink: false },
  { href: "/support", label: "Support", isPageLink: true },
  { href: "/pricing#faq", label: "FAQ", isPageLink: true },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--navy-900)]/95 backdrop-blur-md border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo + Trust Line — pulled further left */}
          <div className="flex items-center gap-3 -ml-1 lg:-ml-8">
            <a href="/" className="flex items-center">
              <img 
                src="/production_logo.png" 
                alt="whoza.ai" 
                className="h-12 w-auto sm:h-16 lg:h-[5rem]"
              />
            </a>
            <span className="hidden lg:block text-xs text-white/40 border-l border-white/20 pl-3">
              Built for UK trades — expanding globally
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  if (!link.isPageLink) {
                    e.preventDefault()
                    const el = document.querySelector(link.href)
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                }}
                className="text-sm text-white/70 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">

            <a 
              href="#final-cta"
              className="inline-flex items-center justify-center rounded-md bg-[var(--rex-green)] hover:bg-[var(--rex-green-hover)] text-white font-bold px-6 h-10 text-sm transition-colors"
            >
              Get Katie answering my calls
            </a>
            <CountrySwitcher />
          </div>

          {/* Mobile: Country Switcher + Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <CountrySwitcher />
            <button
              className="p-2 text-white"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[var(--navy-900)] border-t border-white/10"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-white/80 hover:text-white py-2 transition-colors cursor-pointer"
                  onClick={(e) => {
                    if (!link.isPageLink) {
                      e.preventDefault()
                      setIsOpen(false)
                      const el = document.querySelector(link.href)
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    } else {
                      setIsOpen(false)
                    }
                  }}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-white/10 space-y-4">
                <div className="flex justify-center">
                  <CountrySwitcher />
                </div>
                <a 
                  href="#final-cta"
                  className="inline-flex items-center justify-center w-full rounded-md bg-[var(--rex-green)] hover:bg-[var(--rex-green-hover)] text-white font-bold h-10 text-sm transition-colors"
                >
                  Get Katie answering my calls
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
