"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { CountrySwitcher } from "./country-switcher"
import { SignupModal } from "./signup-modal"

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
  const [showSignup, setShowSignup] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--navy-900)]/95 backdrop-blur-md border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 lg:h-20">
          {/* Logo + Trust Line — pulled further left */}
          <div className="flex items-center gap-3 -ml-1 lg:-ml-8 shrink-0 lg:mr-8">
            <a href="/" className="flex items-center">
              <img 
                src="/production_logo.png" 
                alt="whoza.ai" 
                className="h-12 w-auto sm:h-16 lg:h-[5rem]"
              />
            </a>
            <span className="hidden lg:block text-sm font-medium border-l border-white/20 pl-3" style={{ color: '#10B981', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
              Built for UK Trades and Home Services
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 ml-auto mr-8">
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
          <div className="hidden lg:flex items-center gap-4 shrink-0">

            <button 
              onClick={() => setShowSignup(true)}
              className="inline-flex items-center justify-center rounded-md text-white font-bold px-3 py-1.5 text-xs transition-colors whitespace-nowrap"
              style={{ background: "linear-gradient(135deg, #059669, #10B981)", height: 32 }}
            >
              Get Katie answering my calls
            </button>
            <CountrySwitcher />
          </div>

          {/* Mobile: Country Switcher + Menu Button */}
          <div className="flex items-center gap-2 lg:hidden ml-auto">
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
                <button 
                  onClick={() => {
                    setIsOpen(false)
                    setShowSignup(true)
                  }}
                  className="inline-flex items-center justify-center w-full rounded-md text-white font-bold h-10 text-sm transition-colors"
                  style={{ background: "linear-gradient(135deg, #059669, #10B981)" }}
                >
                  Get Katie answering my calls
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
      </AnimatePresence>
    </header>
  )
}
