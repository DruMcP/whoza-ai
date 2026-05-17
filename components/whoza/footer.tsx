"use client"

import { Shield } from "lucide-react"
import { useLocale } from "@/lib/locale-context"

const footerLinks = {
  product: [
    { label: "Features", href: "/#team" },
    { label: "Pricing", href: "/pricing" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Testimonials", href: "/#testimonials" },
  ],
  support: [
    { label: "Help Centre", href: "/support" },
    { label: "WhatsApp Support", href: "https://wa.me/447831643012" },
    { label: "Email Support", href: "mailto:support@whoza.ai" },
    { label: "FAQ", href: "/pricing#faq" },
  ],
  company: [
    { label: "Blog", href: "/blog" },
    { label: "Case Studies", href: "/case-studies" },
  ],
  tools: [
    { label: "Lost Jobs Calculator", href: "/tools/lost-jobs-calculator" },
    { label: "Quote Generator", href: "/tools/quote-generator" },
    { label: "Emergency Pricing", href: "/tools/emergency-pricing" },
    { label: "Hourly Rate Checker", href: "/tools/rate-checker" },
    { label: "Voicemail Scripts", href: "/tools/voicemail-scripts" },
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

const ukBadges = [
  "ICO Registered",
  "GDPR Compliant",
  "UK Data Centers",
]

const usBadges = [
  "SOC 2 Compliant",
  "CCPA Compliant",
  "US Data Centers",
]

export function Footer() {
  const { country, config } = useLocale()
  const badges = country === "uk" ? ukBadges : usBadges

  return (
    <footer className="bg-[var(--navy-900)] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 lg:gap-6">
          {/* Brand + Newsletter Column */}
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
              AI revenue system for UK tradespeople. Capture missed calls, book more jobs, grow automatically.
            </p>
            
            {/* Newsletter */}
            <div className="max-w-sm">
              <h4 className="text-white font-semibold text-sm mb-2">Get trade tips weekly</h4>
              <p className="text-sm text-white/50 mb-3">AI insights to win more jobs. No spam.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="you@company.com"
                  className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
                <button className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
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
            <h4 className="text-white font-semibold mb-4">Tools</h4>
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
            <h4 className="text-white font-semibold mb-4">Support</h4>
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
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
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
              6 Atholl Crescent, 6, Perth, PH1 5JN, United Kingdom
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
