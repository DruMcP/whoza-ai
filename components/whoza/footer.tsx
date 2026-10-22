"use client"

import { ArrowRight, Check } from "lucide-react"
import { useState } from "react"
import { WaitlistModal } from "./waitlist-modal"
import { Logo } from "@/components/whoza/logo"
import { trackCTA } from "@/lib/gtag"
import { COMPANY } from "@/lib/company"

type FooterLink = { label: string; href: string; external?: boolean; onClick?: () => void }

const footerLinks: Record<string, FooterLink[]> = {
  product: [
    { label: "Features", href: "/#team" },
    { label: "Pricing", href: "/pricing" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Testimonials", href: "/#testimonials" },
    { label: "Locations", href: "/locations" },
    { label: "Multi-Location", href: "/multi-location" },
    { label: "Booking", href: "/booking" },
    { label: "Refer a Trade", href: "/refer" },
  ],
  support: [
    { label: "Support", href: "/support" },
    { label: "System Guide", href: "/guide" },
    { label: "Getting Started", href: "/guide/getting-started" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "WhatsApp Support", href: "tel:+447463141750" },
    { label: "Email Support", href: "mailto:support@whoza.ai" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Trust & Security", href: "/trust" },
    { label: "Integrations", href: "/integrations" },
    { label: "Voice Accents", href: "/accents" },
    { label: "Blog", href: "/blog" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Watch Demo", href: "/watch" },
    { label: "Best AI Call Handler", href: "/best-ai-call-handler-uk-trades" },
    { label: "Missed Calls Cost", href: "/missed-calls-cost-calculator" },
    { label: "Evidence Base", href: "/data" },
    { label: "Part of 5R-AI — the UK AI agency", href: "https://www.5r-ai.com", external: true },
  ],
  comparisons: [
    { label: "vs Trade Receptionist", href: "/vs-trade-receptionist" },
    { label: "vs Clara AI", href: "/whoza-vs-clara" },
    { label: "vs Moneypenny", href: "/whoza-vs-moneypenny" },
    { label: "vs Team-Connect", href: "/whoza-vs-team-connect" },
    { label: "vs Virtual Receptionist", href: "/ai-vs-virtual-receptionist" },
    { label: "vs ARROW", href: "/whoza-vs-arrow" },
  ],
  tools: [
    { label: "Lost Jobs Calculator", href: "/missed-calls-cost-calculator" },
    { label: "Quote Generator", href: "/tools/quote-generator" },
    { label: "Emergency Pricing", href: "/tools/emergency-pricing" },
    { label: "Hourly Rate Checker", href: "/tools/rate-checker" },
    { label: "Voicemail Scripts", href: "/tools/voicemail-scripts" },
  ],
  resources: [
    { label: "Research Library", href: "/research" },
    { label: "Press Centre", href: "/press" },
    { label: "Missed Call Cost Calculator", href: "/missed-calls-cost-calculator" },
    { label: "Trade Business Growth Toolkit", href: "/resources/trade-business-growth-toolkit" },
    { label: "Google Business Profile Checklist", href: "/resources/google-business-profile-checklist-trades" },
    { label: "24/7 Call Answering Guide", href: "/blog/ai-call-answering-uk-tradespeople-definitive-guide-2026" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Data Processing Agreement", href: "/dpa" },
    { label: "Fair Use Policy", href: "/fair-use" },
    { label: "Call Recording", href: "/call-recording" },
    { label: "SLA", href: "/sla" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Modern Slavery Statement", href: "/modern-slavery" },
    { label: "Accessibility", href: "/accessibility" },
    { label: "VAT Information", href: "/vat-info" },
    { label: "Complaints", href: "/complaints" },
    { label: "Cookie Settings", href: "#", onClick: () => { window.dispatchEvent(new CustomEvent('openCookieConsent')); } },
  ],
}

// Every /for-<trade> landing page. Linked from every page via the footer, so the
// trade pages keep a site-wide internal link now the homepage trades strip is gone.
const trades = [
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

const columns: { title: string; key: keyof typeof footerLinks }[] = [
  { title: "Product", key: "product" },
  { title: "Tools", key: "tools" },
  { title: "Resources", key: "resources" },
  { title: "Support", key: "support" },
  { title: "Company", key: "company" },
  { title: "Comparisons", key: "comparisons" },
]

const badges = [
  "ICO Registered",
  "GDPR Compliant",
  "UK Data Centers",
  "No Contract",
  "Cancel Anytime",
]

const linkClass = "text-sm text-white/60 hover:text-white transition-colors no-underline"

export function Footer() {
  const [showWaitlist, setShowWaitlist] = useState(false)

  const openWaitlist = () => {
    trackCTA("Start Free Trial - Footer", "footer")
    setShowWaitlist(true)
  }

  return (
    <footer className="bg-[var(--v2-navy)]" role="contentinfo" aria-label="Footer">
      <div className="v2-container pt-16 sm:pt-20 pb-10">
        {/* CTA band */}
        <div className="rounded-[20px] border border-white/10 bg-[var(--v2-navy-2)] px-6 py-8 sm:px-10 sm:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="text-white text-[clamp(22px,2.6vw,30px)] font-bold tracking-[-0.02em] leading-tight">
              Start your free trial
            </div>
            <p className="mt-2 text-[15px] text-white/60">Limited to 50 UK trades. Start your free trial today.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={openWaitlist}
              className="v2-btn cursor-pointer"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <a href="/pricing" className="v2-btn-secondary" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.24)" }}>
              See pricing
            </a>
          </div>
        </div>

        {/* Brand + link columns */}
        {/* Desktop: brand + trades on the left across two rows; the six link
            groups in two rows of three, wide enough that no label wraps. */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-[1.25fr_1fr_1fr_1fr] gap-x-8 gap-y-10 lg:gap-y-12">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1 lg:row-span-2 lg:pr-10">
            <a href="/" className="inline-flex items-center no-underline" aria-label="whoza.ai home">
              <Logo colorMode="light" className="h-7 w-auto" />
            </a>
            <p className="mt-4 text-sm leading-relaxed text-white/60 max-w-xs">
              AI revenue system for UK tradespeople. Capture missed calls, book more jobs, grow automatically. No contracts. Cancel anytime.
            </p>

            <div className="mt-7 text-xs font-semibold uppercase tracking-[0.14em] text-white/55">Trades we cover</div>
            <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 max-w-sm" aria-label="Trades we cover">
              {trades.map((t) => (
                <li key={t.href}>
                  <a href={t.href} className="text-[13px] text-white/60 hover:text-white transition-colors no-underline">
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {columns.map((col) => (
            <div key={col.key}>
              <div className="text-[13px] font-semibold text-white mb-4">{col.title}</div>
              <ul className="space-y-2.5">
                {footerLinks[col.key].map((link) => (
                  <li key={link.href + link.label}>
                    <a
                      href={link.href}
                      className={linkClass}
                      {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust row */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2" aria-label="Trust and compliance">
            {badges.map((badge) => (
              <li key={badge} className="flex items-center gap-1.5 text-xs text-white/55">
                <Check className="w-3.5 h-3.5 text-[#6ee7b7]" aria-hidden="true" />
                {badge}
              </li>
            ))}
            <li className="flex items-center gap-1.5 text-xs text-white/55">
              <Check className="w-3.5 h-3.5 text-[#6ee7b7]" aria-hidden="true" />
              ICO: <a href="https://ico.org.uk/ESDWebPages/Entry/ZC077271" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">ZC077271</a>
            </li>
            <li>
              <a
                href="https://theinstituteofai.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-white/55 hover:text-white transition-colors no-underline"
                aria-label="Member of The Institute of AI"
              >
                <img
                  src="/images/ioai-member-badge-dark.png"
                  alt="IOAI Member — Dru McPherson"
                  width="16"
                  height="16"
                  className="w-4 h-4 rounded-sm"
                  loading="lazy"
                />
                IOAI Member
              </a>
            </li>
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="https://www.facebook.com/profile.php?id=61586217731657"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/whoza"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Legal links */}
        <nav aria-label="Legal" className="mt-8">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {footerLinks.legal.map((link) => (
              <li key={link.label}>
                {link.onClick ? (
                  <button
                    onClick={link.onClick}
                    className="text-xs text-white/45 hover:text-white transition-colors bg-transparent border-none cursor-pointer p-0"
                  >
                    {link.label}
                  </button>
                ) : (
                  <a href={link.href} className="text-xs text-white/45 hover:text-white transition-colors no-underline">
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Company details */}
        <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs text-white/50">
              WHOZA AI LTD · Registered in Scotland — Company Number {COMPANY.companyNumber} · ICO Registration: ZC077271
            </p>
            <p className="text-xs text-white/50">
              Registered address: 6 Atholl Crescent, 6, Perth, PH1 5JN, United Kingdom
            </p>
            <p className="text-xs text-white/50">
              Office address: 97 Main Street, Tomintoul AB37 9HA
            </p>
          </div>
          <div className="text-xs text-white/45">
            © {new Date().getFullYear()} whoza.ai. All rights reserved.
          </div>
        </div>
      </div>

      {/* Waitlist Modal */}
      {showWaitlist && (
        <WaitlistModal
          onClose={() => setShowWaitlist(false)}
          source="footer"
        />
      )}
    </footer>
  )
}
