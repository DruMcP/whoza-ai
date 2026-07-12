"use client"

import { Shield } from "lucide-react"
import { useState } from "react"
import { WaitlistModal } from "./waitlist-modal"
import { trackCTA } from "@/lib/gtag"

const footerLinks = {
  product: [
    { label: "Features", href: "/#team" },
    { label: "Pricing", href: "/pricing" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Testimonials", href: "/#testimonials" },
  ],
  support: [
    { label: "Help Centre", href: "/support" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "WhatsApp Support", href: "tel:+447463141750" },
    { label: "Email Support", href: "mailto:support@whoza.ai" },
  ],
  company: [
    { label: "Blog", href: "/blog" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Watch Demo", href: "/watch" },
    { label: "Best AI Call Handler", href: "/best-ai-call-handler-uk-trades" },
    { label: "Missed Calls Cost", href: "/resources/missed-call-cost-calculator" },
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
    { label: "Lost Jobs Calculator", href: "/tools/lost-jobs-calculator" },
    { label: "Quote Generator", href: "/tools/quote-generator" },
    { label: "Emergency Pricing", href: "/tools/emergency-pricing" },
    { label: "Hourly Rate Checker", href: "/tools/rate-checker" },
    { label: "Voicemail Scripts", href: "/tools/voicemail-scripts" },
  ],
  resources: [
    { label: "Research Library", href: "/research" },
    { label: "Press Centre", href: "/press" },
    { label: "Missed Call Cost Calculator", href: "/resources/missed-call-cost-calculator" },
    { label: "Trade Business Growth Toolkit", href: "/resources/trade-business-growth-toolkit" },
    { label: "Google Business Profile Checklist", href: "/resources/google-business-profile-checklist-trades" },
    { label: "24/7 Call Answering Guide", href: "/blog/247-call-answering-uk-trades-guide-2026" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Data Processing Agreement", href: "/dpa" },
    { label: "Fair Use Policy", href: "/fair-use" },
    { label: "SLA", href: "/sla" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Cookie Settings", href: "#", onClick: () => { window.dispatchEvent(new CustomEvent('openCookieConsent')); } },
  ],
}

const badges = [
  "ICO Registered",
  "GDPR Compliant",
  "UK Data Centers",
  "No Contract",
  "Cancel Anytime",
]

export function Footer() {
  const [showWaitlist, setShowWaitlist] = useState(false)

  const openWaitlist = () => {
    trackCTA("Join Pilot - Footer", "footer")
    setShowWaitlist(true)
  }

  return (
    <footer className="bg-[var(--navy-900)] border-t border-white/10" role="contentinfo" aria-label="Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 lg:gap-6">
          {/* Brand + CTA Column */}
          <div className="col-span-2">
            <a href="/" className="flex items-center mb-6">
              <img 
                src="/production_logo.webp" 
                alt="whoza.ai" 
                width="64" height="64"
                className="h-16 w-auto"
                loading="lazy"
              />
            </a>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              AI revenue system for UK tradespeople. Capture missed calls, book more jobs, grow automatically. No contracts. Cancel anytime.
            </p>
            
            {/* Pilot CTA */}
            <div className="max-w-sm">
              <div className="text-white font-semibold text-sm mb-2">Join the pilot programme</div>
              <p className="text-sm text-white/50 mb-3">Limited to 50 UK trades. Lock in introductory pricing.</p>
              <button
                onClick={openWaitlist}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors"
              >
                Start Free Trial
              </button>
            </div>
          </div>

          {/* Links */}
          <div>
            <div className="text-white font-semibold mb-4">Product</div>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-white font-semibold mb-4">Tools</div>
            <ul className="space-y-3">
              {footerLinks.tools.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-white font-semibold mb-4">Resources</div>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-white font-semibold mb-4">Support</div>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-white font-semibold mb-4">Company</div>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="text-sm text-white/60 hover:text-white transition-colors"
                    {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-white font-semibold mb-4">Comparisons</div>
            <ul className="space-y-3">
              {footerLinks.comparisons.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-white font-semibold mb-4">Legal</div>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  {link.onClick ? (
                    <button 
                      onClick={link.onClick}
                      className="text-sm text-white/60 hover:text-white transition-colors text-left bg-transparent border-none cursor-pointer p-0"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Badges */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-3">
              {badges.map((badge) => (
                <div key={badge} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs text-white/60">{badge}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs text-white/60">ICO: <a href="https://ico.org.uk/ESDWebPages/Entry/ZC077271" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">ZC077271</a></span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/whoza/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
            </div>
            <div className="text-sm text-white/40">
              © {new Date().getFullYear()} whoza.ai. All rights reserved.
            </div>
          </div>
          
          {/* Company details */}
          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <p className="text-xs text-white/30">
              WHOZA AI LTD · Registered in Scotland — Company Number SC874716 · ICO Registration: ZC077271
            </p>
            <p className="text-xs text-white/30 mt-1">
              Registered address: 6 Atholl Crescent, 6, Perth, PH1 5JN, United Kingdom
            </p>
            <p className="text-xs text-white/30 mt-1">
              Office address: 97 Main Street, Tomintoul AB37 9HA
            </p>
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
