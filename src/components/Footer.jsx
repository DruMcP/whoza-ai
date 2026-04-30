import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Shield } from 'lucide-react';

const Footer = memo(function Footer() {
  return (
    <footer
      className="border-t"
      style={{
        background: 'var(--color-offwhite)',
        borderColor: 'var(--color-border)',
        paddingTop: 'var(--space-16)',
        paddingBottom: 'var(--space-8)',
      }}
      role="contentinfo"
    >
      <div className="ds-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <img
              src="/production_logo.png"
              alt="Whoza.ai"
              className="mb-4"
              style={{ maxHeight: '32px', width: 'auto' }}
              loading="lazy"
            />
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-slate)', maxWidth: '260px' }}>
              AI-powered visibility platform helping tradespeople get found when customers ask ChatGPT, Google AI, and Perplexity for local services.
            </p>
            <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-slate)' }}>
              <Shield size={14} />
              <span>ICO Registered · GDPR Compliant</span>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4
              className="font-semibold text-sm mb-4"
              style={{ color: 'var(--color-navy)', fontFamily: 'var(--font-heading)' }}
            >
              Product
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Competitor Analysis', href: '/competitor-analysis' },
                { label: 'How It Works', href: '/how-it-works' },
                { label: 'Pricing', href: '/pricing' },
                { label: 'Case Studies', href: '/case-studies' },
                { label: 'Blog', href: '/blog' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm transition-colors hover:text-blue-600"
                    style={{ color: 'var(--color-slate)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              className="font-semibold text-sm mb-4"
              style={{ color: 'var(--color-navy)', fontFamily: 'var(--font-heading)' }}
            >
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'About', href: '/trust' },
                { label: 'Contact', href: '/contact' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm transition-colors hover:text-blue-600"
                    style={{ color: 'var(--color-slate)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-semibold text-sm mb-4"
              style={{ color: 'var(--color-navy)', fontFamily: 'var(--font-heading)' }}
            >
              Contact
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:support@whoza.ai"
                className="flex items-center gap-2 text-sm transition-colors hover:text-blue-600"
                style={{ color: 'var(--color-slate)' }}
              >
                <Mail size={14} />
                support@whoza.ai
              </a>
              <div className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-slate)' }}>
                <MapPin size={14} className="mt-0.5 shrink-0" />
                <span>
                  WHOZA AI LTD<br />
                  6 Atholl Crescent, Perth, PH1 5JN<br />
                  Scotland · SC874716
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--color-slate)' }}>
            © {new Date().getFullYear()} WHOZA AI LTD. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: 'var(--color-slate)' }}>
            Built by a team passionate about helping tradespeople compete in the AI age.
          </p>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
