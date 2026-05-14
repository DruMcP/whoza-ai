"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { CountrySwitcher } from "./country-switcher"
import { SignupModal } from "./signup-modal"

const navLinks = [
  { href: "/#how-it-works", label: "How It Works", isPageLink: false },
  { href: "/#team", label: "Meet the Team", isPageLink: false },
  { href: "/pricing", label: "Pricing", isPageLink: true },
  { href: "/#testimonials", label: "Testimonials", isPageLink: false },
  { href: "/support", label: "Support", isPageLink: true },
  { href: "/#faq", label: "FAQ", isPageLink: false },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showSignup, setShowSignup] = useState(false)

  const handleNavClick = (href: string, isPageLink: boolean) => {
    setMenuOpen(false)
    if (isPageLink) return // Let <a> handle page links
    if (typeof window === "undefined") return

    // Extract id from "/#section" → "section"
    const id = href.replace(/^\/#/, "")
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    } else {
      // On subpages: navigate to homepage with hash
      window.location.href = href
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#111418]/80 border-b border-white/[0.08]"
        role="banner"
        aria-label="Main navigation"
      >
        <nav className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8" aria-label="Primary">
          <div className="flex items-center justify-between h-[56px]">
            {/* Logo */}
            <a
              href="/"
              className="font-sans text-xl font-extrabold text-white hover:opacity-90 transition-opacity no-underline shrink-0"
              aria-label="Whoza.ai Home"
            >
              Whoza.ai
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) =>
                link.isPageLink ? (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm font-medium no-underline transition-colors min-h-[44px] flex items-center"
                  >
                    {link.label}
                  </a>
                ) : (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href, false)}
                    className="text-white/70 hover:text-white text-sm font-medium cursor-pointer transition-colors min-h-[44px]"
                  >
                    {link.label}
                  </button>
                )
              )}
              <button
                onClick={() => setShowSignup(true)}
                className="btn-primary text-[13px] font-bold px-4 py-2 rounded-lg border border-white/20 bg-white/10 text-white hover:bg-white/20 no-underline cursor-pointer transition-colors whitespace-nowrap min-h-[44px]"
                aria-label="Start free trial"
              >
                Start Free Trial
              </button>
              <CountrySwitcher />
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setMenuOpen((p) => !p)}
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-[#111418]/95 backdrop-blur-md border-t border-white/[0.08] overflow-hidden"
            >
              <div className="max-w-[1200px] mx-auto px-4 py-4 flex flex-col gap-3">
                {navLinks.map((link) =>
                  link.isPageLink ? (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-white/70 hover:text-white text-sm font-medium no-underline transition-colors py-2"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <button
                      key={link.href}
                      onClick={() => handleNavClick(link.href, false)}
                      className="text-left text-white/70 hover:text-white text-sm font-medium cursor-pointer transition-colors py-2"
                    >
                      {link.label}
                    </button>
                  )
                )}
                <button
                  onClick={() => {
                    setMenuOpen(false)
                    setShowSignup(true)
                  }}
                  className="btn-primary text-center text-[13px] font-bold px-4 py-3 rounded-lg bg-white text-[#111418] no-underline cursor-pointer mt-2 min-h-[44px]"
                >
                  Start Free Trial
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <AnimatePresence>
        {showSignup && (
          <SignupModal onClose={() => setShowSignup(false)} />
        )}
      </AnimatePresence>
    </>
  )
}
