"use client"

import { Shield } from "lucide-react"
import { useLocale } from "@/lib/locale-context"

const footerLinks = {
  product: [
    { label: "Features", href: "#team" },
    { label: "Pricing", href: "/pricing" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Testimonials", href: "#testimonials" },
  ],
  support: [
    { label: "Help Centre", href: "https://wa.me/447831643012" },
    { label: "Contact Us", href: "https://wa.me/447831643012" },
    { label: "Email Support", href: "mailto:support@whoza.ai" },
    { label: "Support Centre", href: "/support" },
    { label: "FAQ", href: "/pricing#faq" },
  ],
  company: [
    { label: "Blog", href: "/blog" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
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
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <a href="/" className="flex items-center mb-6">
              <img 
                src="/production_logo.png" 
                alt="whoza.ai" 
                className="h-16 w-auto"
              />
            </a>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              AI revenue system for UK tradespeople. Capture missed calls, book more jobs, grow automatically.
            </p>
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
                  <a href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Badges */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-6">
              {badges.map((badge) => (
                <div key={badge} className="flex items-center gap-2 text-white/50 text-sm">
                  <Shield className="w-4 h-4" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>
            <div className="text-sm text-white/40">
              © {new Date().getFullYear()} whoza.ai. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
