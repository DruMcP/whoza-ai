"use client"

import { Check } from "lucide-react"
import { Logo } from "@/components/whoza/logo"
import { CtaBand } from "@/components/whoza/cta-band"
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
    { label: "Part of 5R-AI, the UK AI agency", href: "https://www.5r-ai.com", external: true },
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

const linkClass = "text-[15px] text-[var(--v2-body)] hover:text-[var(--v2-green)] transition-colors no-underline"
// Body colour, not muted: the small print sits on the greener end of the panel gradient
const smallLinkClass = "text-[13px] text-[var(--v2-body)] hover:text-[var(--v2-green-ink)] transition-colors"
const socialClass =
  "w-9 h-9 inline-flex items-center justify-center rounded-full text-[var(--v2-ink)] hover:bg-white hover:text-[var(--v2-green)] transition-colors"

/* The closing call to action band, then a light rounded panel inset from the
   page edges. Pages that already end with their own CtaBand (FinalCTA, blog
   articles) pass hideCta so the page doesn't end with two bands in a row.
   Every link and label from the previous footer is kept. */
export function Footer({ hideCta = false }: { hideCta?: boolean }) {
  return (
    <footer className={`bg-[var(--v2-paper)] px-3 pb-3 sm:px-4 sm:pb-4 ${hideCta ? "pt-10" : "pt-20 sm:pt-28"}`} role="contentinfo" aria-label="Footer">
      {!hideCta && (
        <div className="mx-auto mb-16 max-w-[1600px] sm:mb-24">
          <CtaBand
            id="footer"
            headingTag="div"
            heading={["Start your", "free trial"]}
            text="Limited to 50 UK trades. Start your free trial today."
            primaryLabel="Start Free Trial"
            source="footer"
            trackLabel="Start Free Trial - Footer"
            secondary={{ label: "See pricing", href: "/pricing" }}
          />
        </div>
      )}

      {/* Footer panel: the hero's green-to-mint gradient turned upside down,
          so the page closes on the colour it opened with. */}
      <div className="rounded-[28px] border border-[var(--v2-line)] bg-[linear-gradient(180deg,#f1f5f2_0%,#effdf4_35%,#e4fcef_55%,#b7f9da_80%,#69f2b6_100%)]">
        <div className="mx-auto max-w-[1200px] px-6 pb-10 pt-14 sm:px-10 sm:pt-20">
          {/* Brand and trades on the left across two rows; the six link
              groups in two rows of three. */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-x-8 gap-y-12">
            <div className="col-span-2 sm:col-span-3 lg:col-span-1 lg:row-span-2 lg:pr-12">
              <a href="/" className="inline-flex items-center no-underline" aria-label="whoza.ai home">
                <Logo colorMode="dark" className="h-8 w-auto" />
              </a>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-[var(--v2-muted)]">
                AI revenue system for UK tradespeople. Capture missed calls, book more jobs, grow automatically. No contracts. Cancel anytime.
              </p>

              <div className="mt-6 flex items-center gap-2">
                <a
                  href="https://www.facebook.com/profile.php?id=61586217731657"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialClass}
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <span className="h-5 w-px bg-[var(--v2-line)]" aria-hidden="true" />
                <a
                  href="https://www.linkedin.com/company/whoza"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialClass}
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>

              <div className="mt-10 text-[17px] text-[var(--v2-ink)]">Trades we cover</div>
              <ul className="mt-4 flex max-w-md flex-wrap gap-2" aria-label="Trades we cover">
                {trades.map((t) => (
                  <li key={t.href}>
                    <a
                      href={t.href}
                      className="inline-flex rounded-full border border-[var(--v2-line)] bg-white px-3 py-1.5 text-[13px] text-[var(--v2-body)] no-underline transition-colors hover:border-[var(--v2-green)] hover:text-[var(--v2-green)]"
                    >
                      {t.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {columns.map((col) => (
              <div key={col.key}>
                <div className="mb-5 text-[17px] text-[var(--v2-ink)]">{col.title}</div>
                <ul className="space-y-3.5">
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
          <ul className="mt-16 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-[var(--v2-green-ink)]/10 pt-8" aria-label="Trust and compliance">
            {badges.map((badge) => (
              <li key={badge} className="flex items-center gap-1.5 text-[13px] text-[var(--v2-body)]">
                <Check className="w-3.5 h-3.5 text-[var(--v2-green-ink)]" aria-hidden="true" />
                {badge}
              </li>
            ))}
            <li className="flex items-center gap-1.5 text-[13px] text-[var(--v2-body)]">
              <Check className="w-3.5 h-3.5 text-[var(--v2-green-ink)]" aria-hidden="true" />
              ICO: <a href="https://ico.org.uk/ESDWebPages/Entry/ZC077271" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--v2-green-ink)] transition-colors">ZC077271</a>
            </li>
            <li>
              <a
                href="https://theinstituteofai.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 no-underline ${smallLinkClass}`}
                aria-label="Member of The Institute of AI"
              >
                <img
                  src="/images/ioai-member-badge-dark.png"
                  alt="IOAI Member: Dru McPherson"
                  width="16"
                  height="16"
                  className="w-4 h-4 rounded-sm"
                  loading="lazy"
                />
                IOAI Member
              </a>
            </li>
          </ul>

          {/* Legal links */}
          <nav aria-label="Legal" className="mt-6">
            <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  {link.onClick ? (
                    <button
                      onClick={link.onClick}
                      className={`${smallLinkClass} bg-transparent border-none cursor-pointer p-0`}
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a href={link.href} className={`${smallLinkClass} no-underline`}>
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Company details */}
          <div className="mt-8 space-y-1 border-t border-[var(--v2-green-ink)]/10 pt-6 text-center">
            <p className="text-[13px] text-[var(--v2-body)]">
              WHOZA AI LTD · Registered in Scotland, Company Number {COMPANY.companyNumber} · ICO Registration: ZC077271
            </p>
            <p className="text-[13px] text-[var(--v2-body)]">
              Registered address: 6 Atholl Crescent, 6, Perth, PH1 5JN, United Kingdom
            </p>
            <p className="text-[13px] text-[var(--v2-body)]">
              Office address: 97 Main Street, Tomintoul AB37 9HA
            </p>
            <p className="pt-3 text-[13px] text-[var(--v2-ink)]">
              © {new Date().getFullYear()} whoza.ai. All rights reserved.
            </p>
          </div>
        </div>
      </div>

    </footer>
  )
}
