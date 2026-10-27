"use client"

import { useState, useEffect, useRef, useCallback, Fragment } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  Briefcase,
  Building2,
  Calculator,
  CalendarCheck,
  ChevronDown,
  FileText,
  FlaskConical,
  Gift,
  HelpCircle,
  Info,
  LifeBuoy,
  Mail,
  Menu,
  Mic,
  Newspaper,
  Package,
  PhoneCall,
  PlayCircle,
  Plug,
  PoundSterling,
  Scale,
  ShieldCheck,
  Siren,
  Star,
  Users,
  Voicemail,
  X,
  type LucideIcon,
} from "lucide-react"
import { useSignedIn, APP_HOME_URL } from "@/hooks/use-signed-in"
import { WaitlistModal } from "./waitlist-modal"
import { Logo } from "@/components/whoza/logo"
import { BlogCover } from "@/components/whoza/blog/blog-cover"
import { blogHref, blogIndex } from "@/lib/blog-index"

/* A floating pill with dropdown menus. Every link the old five-link bar had is
   still here: Home is the logo, Pricing stays top level, Blog sits under
   Resources, and Refer a Trade and Testimonials under Company. The footer
   still links every page site-wide. */

type NavLink = { label: string; href: string; description?: string; icon?: LucideIcon }
type NavGroup = { title?: string; columns: 1 | 2 | 3; links: NavLink[] }
type NavMenu = {
  id: string
  label: string
  /** Panel width in px on desktop. */
  width: number
  groups: NavGroup[]
  feature?: "demo" | "latest-post"
  footer?: NavLink
}

const TRADES: NavLink[] = [
  { label: "Plumbers", href: "/for-plumbers" },
  { label: "Electricians", href: "/for-electricians" },
  { label: "Builders", href: "/for-builders" },
  { label: "Roofers", href: "/for-roofers" },
  { label: "Heating Engineers", href: "/for-heating-engineers" },
  { label: "Gas Engineers", href: "/for-gas-engineers" },
  { label: "Locksmiths", href: "/for-locksmiths" },
  { label: "Drainage", href: "/for-drainage" },
  { label: "Joiners", href: "/for-joiners" },
  { label: "Carpenters", href: "/for-carpenters" },
  { label: "Plasterers", href: "/for-plasterers" },
  { label: "Tilers", href: "/for-tilers" },
  { label: "Painters & Decorators", href: "/for-painters-decorators" },
  { label: "Landscapers", href: "/for-landscapers" },
  { label: "Cleaners", href: "/for-cleaners" },
  { label: "Pest Control", href: "/for-pest-control" },
  { label: "Handymen", href: "/for-handymen" },
]

// The demo call is the homepage audio player ("Hear Katie answer a real call").
const DEMO_CALL_HREF = "/#katie-demo-audio"

/* Every description repeats what the linked page says about itself (its meta
   description or opening line), so the menu never promises more than the page. */
const MENUS: NavMenu[] = [
  {
    id: "product",
    label: "Product",
    width: 980,
    feature: "demo",
    groups: [
      {
        columns: 2,
        links: [
          { label: "How it works", href: "/how-it-works", description: "How Katie answers, qualifies and books your calls", icon: PhoneCall },
          { label: "Meet the team", href: "/#team", description: "Katie, Mark, Claire and Rex: calls, reviews and insights", icon: Users },
          { label: "Booking", href: "/booking", description: "Checks your calendar first, so no double-bookings", icon: CalendarCheck },
          { label: "Integrations", href: "/integrations", description: "Google Calendar, Outlook, WhatsApp, Zapier and more", icon: Plug },
          { label: "Voice accents", href: "/accents", description: "12+ UK accents: Scottish, English, Welsh and Irish", icon: Mic },
          { label: "Multi-location", href: "/multi-location", description: "Several locations or depots, one dashboard", icon: Building2 },
          { label: "Call recording & data", href: "/call-recording", description: "Written transcripts only, no audio recordings", icon: FileText },
          { label: "Watch the demo", href: "/watch", description: "Katie capturing a missed enquiry in 60 seconds", icon: PlayCircle },
        ],
      },
    ],
  },
  {
    id: "trades",
    label: "Trades",
    width: 720,
    groups: [{ columns: 3, links: TRADES }],
    footer: { label: "Every city we cover", href: "/locations" },
  },
  {
    id: "resources",
    label: "Resources",
    width: 1060,
    feature: "latest-post",
    groups: [
      {
        title: "Learn",
        columns: 1,
        links: [
          { label: "Blog", href: "/blog", description: "Tips on leads, reviews and growing your trade", icon: BookOpen },
          { label: "Research library", href: "/research", description: "Missed call studies and voice agent reports", icon: FlaskConical },
          { label: "System guide", href: "/guide", description: "Set-up, the WhatsApp workflow and the dashboard", icon: BookMarked },
          { label: "FAQ", href: "/faq", description: "Pricing, set-up, contracts and WhatsApp alerts", icon: HelpCircle },
          { label: "Support", href: "/support", description: "Email, WhatsApp and callback requests", icon: LifeBuoy },
        ],
      },
      {
        title: "Free tools",
        columns: 1,
        links: [
          { label: "Missed call cost calculator", href: "/missed-calls-cost-calculator", description: "What missed calls cost your trade business", icon: Calculator },
          { label: "Quote generator", href: "/tools/quote-generator", description: "Professional quotes as a branded PDF", icon: FileText },
          { label: "Hourly rate checker", href: "/tools/rate-checker", description: "Your rate against regional averages", icon: PoundSterling },
          { label: "Emergency callout pricing", href: "/tools/emergency-pricing", description: "Price callouts by trade, region and time", icon: Siren },
          { label: "Voicemail scripts", href: "/tools/voicemail-scripts", description: "Voicemail greetings written for your trade", icon: Voicemail },
          { label: "Growth toolkit", href: "/resources/trade-business-growth-toolkit", description: "Quoting calculator, templates and checklists", icon: Package },
        ],
      },
    ],
  },
  {
    id: "company",
    label: "Company",
    width: 700,
    groups: [
      {
        columns: 2,
        links: [
          { label: "About", href: "/about", description: "Built by a former tradesperson", icon: Info },
          { label: "Case studies", href: "/case-studies", description: "How UK trades win more jobs with Katie", icon: Briefcase },
          { label: "Testimonials", href: "/#testimonials", description: "Google reviews from verified users", icon: Star },
          { label: "Refer a Trade", href: "/refer", description: "Give a free month, get a free month", icon: Gift },
          { label: "Compare", href: "/best-ai-call-handler-uk-trades", description: "Six AI call handlers tested side by side", icon: Scale },
          { label: "Trust & Security", href: "/trust", description: "ICO registered and UK GDPR compliant", icon: ShieldCheck },
          { label: "Press", href: "/press", description: "Press releases and media resources", icon: Newspaper },
          { label: "Contact", href: "/contact", description: "WhatsApp, email or phone", icon: Mail },
        ],
      },
    ],
  },
]

const TOP_LINKS: NavLink[] = [
  { label: "Pricing", href: "/pricing" },
  { label: "Demo call", href: DEMO_CALL_HREF },
]

const PROMO_KEY = "whoza-promo-closed"
const PROMO_HEIGHT = 36

const isHashLink = (href: string) => href.startsWith("/#")

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileSection, setMobileSection] = useState<string | null>(null)
  const [showWaitlist, setShowWaitlist] = useState(false)
  // Signed in to the app already? Then "Log in" and "Start Free Trial" are both the wrong
  // thing to offer; one Dashboard button replaces them.
  const signedIn = useSignedIn()
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<number | null>(null)
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  useEffect(() => {
    const handleOpen = () => setShowWaitlist(true)
    window.addEventListener('openWaitlist', handleOpen)
    return () => window.removeEventListener('openWaitlist', handleOpen)
  }, [])

  // The promo bar scrolls away with the page; the header follows it up until it
  // sits at the top. The offset is a CSS variable, so there is no re-render.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      headerRef.current?.style.setProperty("--promo-scroll", `${Math.min(y, PROMO_HEIGHT)}px`)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const dismissPromo = () => {
    try {
      window.localStorage.setItem(PROMO_KEY, "1")
    } catch {
      /* storage unavailable: hide for this page view only */
    }
    document.documentElement.setAttribute("data-promo-closed", "")
  }

  // Desktop dropdowns: open on hover or click, close shortly after the pointer leaves.
  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    closeTimer.current = null
  }
  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 160)
  }
  const closeMenus = useCallback((returnFocusTo?: string) => {
    setOpenMenu(null)
    if (returnFocusTo) triggerRefs.current[returnFocusTo]?.focus()
  }, [])

  useEffect(() => {
    if (!openMenu) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenus(openMenu)
    }
    const onPointer = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) closeMenus()
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("pointerdown", onPointer)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("pointerdown", onPointer)
    }
  }, [openMenu, closeMenus])

  // Mobile menu focus management: open → first focusable, close → button
  useEffect(() => {
    if (menuOpen) {
      // Small delay to ensure DOM is rendered
      const timer = setTimeout(() => {
        mobileMenuRef.current?.querySelector<HTMLElement>("a[href], button:not([disabled])")?.focus()
      }, 50)
      return () => clearTimeout(timer)
    } else {
      menuButtonRef.current?.focus({ preventScroll: true })
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

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    setMenuOpen(false)
    setOpenMenu(null)
    if (!isHashLink(href)) return // Let <a> handle page links normally

    e.preventDefault()
    // Extract id from "/#section" → "section"
    const el = document.getElementById(href.replace(/^\/#/, ""))
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    } else {
      // On subpages: navigate to homepage with hash
      window.location.href = href
    }
  }

  const light = scrolled && !menuOpen
  const linkTone = light ? "text-[var(--v2-ink)]/75 hover:text-[var(--v2-ink)]" : "text-white/75 hover:text-white"

  return (
    <>
      {/* Offer bar: in the page flow, so it scrolls away; dismissal is remembered
          and applied before paint by the inline script in app/layout.tsx. */}
      <div className="v2-promo relative z-[51] flex h-9 items-center justify-center border-b border-[var(--v2-line)] bg-[var(--v2-mint)] px-10 text-[13px] text-[var(--v2-green-ink)]">
        <p className="truncate">
          <span className="hidden sm:inline">7-day free trial on the Starter plan. </span>
          <span className="sm:hidden">7-day free trial. </span>
          <a href="/pricing" className="font-semibold underline underline-offset-2 hover:text-[var(--v2-green)]">
            View pricing
          </a>
        </p>
        <button
          type="button"
          onClick={dismissPromo}
          className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-[var(--v2-green-ink)] hover:bg-white/70"
          aria-label="Dismiss offer"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <header
        ref={headerRef}
        className="v2-header fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 pt-3"
        role="banner"
        aria-label="Main navigation"
      >
        {/* Floating pill: dark and see-through over the hero, light once the page scrolls. */}
        <nav
          ref={navRef}
          className={`relative max-w-[1200px] mx-auto rounded-[22px] border backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 px-3 sm:px-4 ${
            light
              ? 'bg-[rgba(251,252,250,0.88)] border-[var(--v2-line)] shadow-[0_10px_30px_-18px_rgba(15,22,40,0.35)]'
              : menuOpen
                ? 'bg-[rgba(15,22,40,0.97)] border-white/10 shadow-2xl shadow-black/30'
                : 'bg-[rgba(15,22,40,0.72)] border-white/10 shadow-lg shadow-black/15'
          }`}
          aria-label="Primary"
          onMouseLeave={scheduleClose}
          onMouseEnter={cancelClose}
        >
          <div className="flex items-center justify-between h-[60px]">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-2 rounded-full pl-2 pr-3 hover:opacity-90 transition-opacity no-underline shrink-0"
              aria-label="Whoza.ai Home"
            >
              <Logo colorMode={light ? "dark" : "light"} className="h-7 w-auto" />
            </a>

            {/* Desktop menus */}
            <div className="hidden lg:flex items-center gap-1">
              {MENUS.map((menu) => {
                const open = openMenu === menu.id
                return (
                  <Fragment key={menu.id}>
                    <button
                      ref={(el) => {
                        triggerRefs.current[menu.id] = el
                      }}
                      type="button"
                      aria-expanded={open}
                      aria-controls={`nav-panel-${menu.id}`}
                      onClick={() => setOpenMenu(open ? null : menu.id)}
                      onMouseEnter={() => {
                        cancelClose()
                        setOpenMenu(menu.id)
                      }}
                      className={`flex h-10 items-center gap-1 rounded-full px-3.5 text-[14.5px] font-medium transition-colors ${linkTone} ${
                        open ? (light ? "bg-[var(--v2-ink)]/[0.06]" : "bg-white/10") : ""
                      }`}
                    >
                      {menu.label}
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
                    </button>
                    <AnimatePresence>
                      {open && <MenuPanel menu={menu} onNavigate={handleNavClick} />}
                    </AnimatePresence>
                  </Fragment>
                )
              })}
              {TOP_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  onMouseEnter={scheduleClose}
                  className={`flex h-10 items-center rounded-full px-3.5 text-[14.5px] font-medium no-underline transition-colors ${linkTone}`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-2">
              {signedIn ? (
                <a
                  href={APP_HOME_URL}
                  className={`inline-flex items-center gap-1.5 rounded-full text-sm font-semibold px-5 h-11 no-underline transition-colors whitespace-nowrap ${
                    light ? "bg-[var(--v2-navy)] text-white hover:bg-[var(--v2-green)]" : "bg-white text-[#0f1628] hover:bg-white/90"
                  }`}
                  aria-label="Open your Whoza dashboard"
                >
                  Dashboard
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              ) : (
                <>
                  <a
                    href="https://app.whoza.ai/login"
                    className={`rounded-full px-4 text-sm font-medium no-underline transition-colors whitespace-nowrap min-h-[44px] flex items-center ${linkTone}`}
                    aria-label="Log in to your Whoza dashboard"
                  >
                    Log In
                  </a>
                  <button
                    onClick={() => setShowWaitlist(true)}
                    className={`inline-flex items-center gap-1.5 rounded-full text-sm font-semibold px-5 h-11 border-none cursor-pointer transition-colors whitespace-nowrap ${
                      light ? "bg-[var(--v2-navy)] text-white hover:bg-[var(--v2-green)]" : "bg-white text-[#0f1628] hover:bg-white/90"
                    }`}
                    aria-label="Get started with a free trial"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              ref={menuButtonRef}
              className={`lg:hidden p-2 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
                light ? "text-[var(--v2-ink)] hover:bg-[var(--v2-ink)]/[0.06]" : "text-white hover:bg-white/10"
              }`}
              onClick={() => setMenuOpen((p) => !p)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile menu, inside the pill: one accordion per menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                id="mobile-menu"
                ref={mobileMenuRef}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="lg:hidden border-t border-white/10 overflow-hidden max-h-[calc(100vh-110px)] overflow-y-auto"
              >
                <div className="py-3 flex flex-col">
                  {MENUS.map((menu) => {
                    const open = mobileSection === menu.id
                    return (
                      <div key={menu.id} className="border-b border-white/[0.06]">
                        <button
                          type="button"
                          aria-expanded={open}
                          aria-controls={`mobile-section-${menu.id}`}
                          onClick={() => setMobileSection(open ? null : menu.id)}
                          className="flex w-full min-h-[48px] items-center justify-between text-[15px] font-medium text-white/85"
                        >
                          {menu.label}
                          <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
                        </button>
                        {open && (
                          <div id={`mobile-section-${menu.id}`} className="pb-3">
                            {menu.groups.map((group, gi) => (
                              <div key={gi}>
                                {group.title && <p className="pb-1 pt-2 text-[12.5px] font-semibold text-white/45">{group.title}</p>}
                                <ul className={group.columns === 3 ? "grid grid-cols-2 gap-x-3" : ""}>
                                  {group.links.map((link) => (
                                    <li key={link.href}>
                                      <a
                                        href={link.href}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        className="flex min-h-[40px] items-center text-sm text-white/65 hover:text-white no-underline"
                                      >
                                        {link.label}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                            {menu.footer && (
                              <a href={menu.footer.href} className="flex min-h-[40px] items-center gap-1 text-sm font-semibold text-[#6ee7b7] no-underline">
                                {menu.footer.label} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}
                  {TOP_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="border-b border-white/[0.06] text-[15px] font-medium text-white/85 hover:text-white no-underline min-h-[48px] flex items-center"
                    >
                      {link.label}
                    </a>
                  ))}
                  {signedIn ? (
                    <a
                      href={APP_HOME_URL}
                      onClick={() => setMenuOpen(false)}
                      className="btn-primary text-center text-[13px] font-bold px-4 py-3 rounded-full bg-white text-[#111418] no-underline mt-4 min-h-[44px] flex items-center justify-center"
                    >
                      Dashboard
                    </a>
                  ) : (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <a
                        href="https://app.whoza.ai/login"
                        onClick={() => setMenuOpen(false)}
                        className="text-center text-[13px] font-bold px-4 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 no-underline transition-colors min-h-[44px] flex items-center justify-center"
                      >
                        Log In
                      </a>
                      <button
                        onClick={() => {
                          setMenuOpen(false)
                          setShowWaitlist(true)
                        }}
                        className="btn-primary text-center text-[13px] font-bold px-4 py-3 rounded-full bg-white text-[#111418] no-underline cursor-pointer min-h-[44px]"
                      >
                        Get Started
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      <AnimatePresence>
        {showWaitlist && (
          <WaitlistModal onClose={() => setShowWaitlist(false)} source="nav-bar" />
        )}
      </AnimatePresence>
    </>
  )
}

/** One desktop dropdown. Positioned against the nav pill, centred under it. */
function MenuPanel({ menu, onNavigate }: { menu: NavMenu; onNavigate: (e: React.MouseEvent, href: string) => void }) {
  const latest = blogIndex[0]
  return (
    <motion.div
      id={`nav-panel-${menu.id}`}
      initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: 6, filter: "blur(4px)" }}
      transition={{ duration: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
      className="absolute left-1/2 top-[calc(100%+10px)] -translate-x-1/2 rounded-[24px] border border-[var(--v2-line)] bg-white p-3 text-left shadow-[0_30px_60px_-30px_rgba(15,22,40,0.45)]"
      style={{ width: `min(${menu.width}px, calc(100vw - 32px))` }}
    >
      <div className="flex gap-3">
        <div className="flex flex-1 gap-3">
          {menu.groups.map((group, gi) => (
            <div key={gi} className="min-w-0 flex-1">
              {group.title && <p className="px-3.5 pb-1 pt-2 text-[13px] font-semibold text-[var(--v2-muted)]">{group.title}</p>}
              <ul className={`grid gap-1 ${group.columns === 3 ? "grid-cols-3" : group.columns === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
                {group.links.map((link) => {
                  const Icon = link.icon
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={(e) => onNavigate(e, link.href)}
                        className={`group flex gap-3.5 rounded-2xl no-underline transition-colors hover:bg-[var(--v2-mint)] ${
                          Icon ? "p-3" : "px-3.5 py-2.5"
                        }`}
                      >
                        {Icon && (
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[var(--v2-line)] bg-white text-[var(--v2-green)] transition-colors group-hover:border-[#b9c6bf]">
                            <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                          </span>
                        )}
                        <span className="min-w-0">
                          <span className="block text-[15px] font-semibold text-[var(--v2-ink)]">{link.label}</span>
                          {link.description && (
                            <span className="mt-0.5 block text-[13.5px] leading-snug text-[var(--v2-muted)]">{link.description}</span>
                          )}
                        </span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        {menu.feature === "demo" && (
          <div className="flex w-[290px] shrink-0 flex-col rounded-[18px] bg-[var(--v2-mint)] p-3">
            <BlogCover variant="whatsapp-lead" uid="nav-demo" className="aspect-[16/11] w-full rounded-[14px]" />
            <p className="mt-4 px-1 text-[15px] font-semibold text-[var(--v2-ink)]">Hear Katie answer a real call</p>
            <p className="mt-1 px-1 text-[13.5px] leading-snug text-[var(--v2-muted)]">A leaking tap enquiry, qualified and sent to WhatsApp in 64 seconds.</p>
            <a
              href={DEMO_CALL_HREF}
              onClick={(e) => onNavigate(e, DEMO_CALL_HREF)}
              className="v2-btn mt-auto self-start !min-h-[42px] !px-5 !text-[14px]"
            >
              Listen to the call <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        )}

        {menu.feature === "latest-post" && latest && (
          <a
            href={blogHref(latest)}
            className="group flex w-[290px] shrink-0 flex-col rounded-[18px] bg-[var(--v2-mint)] p-3 no-underline"
          >
            <BlogCover variant={latest.cover} uid="nav-latest" image={latest.image} className="aspect-[16/11] w-full rounded-[14px]" />
            <span className="mt-4 px-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--v2-green)]">Latest article</span>
            <span className="mt-1 px-1 text-[15px] font-semibold leading-snug text-[var(--v2-ink)] group-hover:text-[var(--v2-green)]">
              {latest.title}
            </span>
          </a>
        )}
      </div>

      {menu.footer && (
        <a
          href={menu.footer.href}
          className="mt-2 flex items-center justify-between rounded-2xl bg-[var(--v2-mint)] px-4 py-3 text-[14px] font-semibold text-[var(--v2-green-ink)] no-underline hover:text-[var(--v2-green)]"
        >
          {menu.footer.label}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      )}
    </motion.div>
  )
}
