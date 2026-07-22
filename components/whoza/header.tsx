"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { WaitlistModal } from "./waitlist-modal"

const navLinks = [
  { href: "/#how-it-works", label: "How It Works", isPageLink: false },
  { href: "/#team", label: "Meet the Team", isPageLink: false },
  { href: "/pricing", label: "Pricing", isPageLink: true },
  { href: "/#testimonials", label: "Testimonials", isPageLink: false },
  { href: "/blog", label: "Blog", isPageLink: true },
  { href: "/support", label: "Support", isPageLink: true },
  { href: "/#faq", label: "FAQ", isPageLink: false },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showWaitlist, setShowWaitlist] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const lastLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const handleOpen = () => setShowWaitlist(true)
    window.addEventListener('openWaitlist', handleOpen)
    return () => window.removeEventListener('openWaitlist', handleOpen)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Focus management: open → first link, close → button
  useEffect(() => {
    if (menuOpen) {
      // Small delay to ensure DOM is rendered
      const timer = setTimeout(() => {
        firstLinkRef.current?.focus()
      }, 50)
      return () => clearTimeout(timer)
    } else {
      menuButtonRef.current?.focus()
    }
  }, [menuOpen])

  // Esc to close + focus trap
  useEffect(() => {
    if (!menuOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        setMenuOpen(false)
        return
      }
      if (e.key === "Tab") {
        const focusable = mobileMenuRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        )
        if (!focusable || focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [menuOpen])

  const handleNavClick = (e: React.MouseEvent, href: string, isPageLink: boolean) => {
    if (!isPageLink) {
      e.preventDefault()
      setMenuOpen(false)
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
    } else {
      setMenuOpen(false)
      // Let <a> handle page links normally
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-xl bg-[#111418]/60 border-b border-white/10 shadow-lg shadow-black/10'
            : 'backdrop-blur-md bg-[#111418]/80 border-b border-white/[0.08]'
        }`}
        role="banner"
        aria-label="Main navigation"
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Primary">
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
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href, link.isPageLink)}
                    className="text-white/70 hover:text-white text-sm font-medium no-underline transition-colors min-h-[44px] flex items-center"
                  >
                    {link.label}
                  </a>
              )}
              <button
                onClick={() => setShowWaitlist(true)}
                className="btn-primary text-[13px] font-bold px-4 py-2 rounded-lg border border-white/20 bg-white/10 text-white hover:bg-white/20 hover:scale-105 active:scale-95 no-underline cursor-pointer transition-all whitespace-nowrap min-h-[44px]"
                aria-label="Start free trial"
              >
                Start Free Trial
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              ref={menuButtonRef}
              className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setMenuOpen((p) => !p)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              ref={mobileMenuRef}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-[#111418]/95 backdrop-blur-md border-t border-white/[0.08] overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3">
                {navLinks.map((link, index) =>
                  <a
                    key={link.href}
                    href={link.href}
                    ref={index === 0 ? firstLinkRef : index === navLinks.length - 1 ? lastLinkRef : undefined}
                    onClick={(e) => handleNavClick(e, link.href, link.isPageLink)}
                    className="text-white/70 hover:text-white text-sm font-medium no-underline transition-colors py-2 min-h-[44px] flex items-center"
                  >
                    {link.label}
                  </a>
                )}
                <button
                  onClick={() => {
                    setMenuOpen(false)
                    setShowWaitlist(true)
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
        {showWaitlist && (
          <WaitlistModal onClose={() => setShowWaitlist(false)} source="nav-bar" />
        )}
      </AnimatePresence>
    </>
  )
}