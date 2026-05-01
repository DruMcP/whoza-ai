import { motion } from 'framer-motion';

// ─── Inline SVG "logo-like" icons (brand-coloured, simplified shapes) ───
// These avoid trademark infringement while remaining instantly recognisable.

const GoogleBusinessIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#4285F4" />
    <path d="M12 6v6l4 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
    <rect x="3" y="4" width="18" height="16" rx="2" fill="#EA4335" />
    <path d="M3 9h18M8 2v4M16 2v4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.08L2 22l4.92-1.37A9.96 9.96 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" fill="#25D366" />
    <path d="M9 10.5a2.5 2.5 0 114 2.5M9 10.5c0 2 1.5 3.5 3.5 3.5M9 10.5c-1.5 0-2.5 1-2.5 2.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const OutlookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
    <rect x="2" y="4" width="20" height="16" rx="2" fill="#0078D4" />
    <path d="M2 8l10 4 10-4" stroke="white" strokeWidth="1.2" />
  </svg>
);

const ServiceM8Icon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
    <rect x="3" y="3" width="18" height="18" rx="3" fill="#F26522" />
    <path d="M8 12h8M12 8v8" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
    <path d="M18.7 8.3c-.9-.5-2-.8-3.1-.8-1.7 0-3.2.9-4 2.3-.8-1.4-2.3-2.3-4-2.3-1.1 0-2.2.3-3.1.8.5 2.5 2.2 4.6 4.5 5.7.4-.8 1.2-1.3 2.1-1.3.9 0 1.7.5 2.1 1.3 2.3-1.1 4-3.2 4.5-5.7z" fill="#555" />
    <path d="M12 14c-2.2 0-4.5 1.8-5 4h10c-.5-2.2-2.8-4-5-4z" fill="#555" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#1877F2" />
    <path d="M15.5 8.5h-1.8c-.4 0-.7.1-.7.5v1.5h2.5L15.3 12h-2v6h-2.5v-6H9v-1.5h1.8V9c0-1.5.8-2.5 2.3-2.5h2.4v2z" fill="white" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
    <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#ig)" />
    <defs>
      <linearGradient id="ig" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F58529" />
        <stop offset="50%" stopColor="#DD2A7B" />
        <stop offset="100%" stopColor="#8134AF" />
      </linearGradient>
    </defs>
    <rect x="6" y="6" width="12" height="12" rx="3" stroke="white" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.5" />
    <circle cx="16.5" cy="7.5" r="1" fill="white" />
  </svg>
);

const TrustpilotIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
    <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4.5L6 21l1.5-7.5L2 9h7l3-7z" fill="#00B67A" />
  </svg>
);

const CheckatradeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
    <circle cx="12" cy="12" r="10" fill="#0053A0" />
    <path d="M7 12l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StripeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
    <rect x="2" y="6" width="20" height="12" rx="2" fill="#635BFF" />
    <path d="M7 12h2M11 12h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const integrations = [
  { name: 'Google Business', icon: GoogleBusinessIcon, color: '#4285F4' },
  { name: 'Google Calendar', icon: CalendarIcon, color: '#EA4335' },
  { name: 'WhatsApp', icon: WhatsAppIcon, color: '#25D366' },
  { name: 'Outlook', icon: OutlookIcon, color: '#0078D4' },
  { name: 'ServiceM8', icon: ServiceM8Icon, color: '#F26522' },
  { name: 'Apple Calendar', icon: AppleIcon, color: '#555' },
  { name: 'Facebook', icon: FacebookIcon, color: '#1877F2' },
  { name: 'Instagram', icon: InstagramIcon, color: '#DD2A7B' },
  { name: 'Trustpilot', icon: TrustpilotIcon, color: '#00B67A' },
  { name: 'Checkatrade', icon: CheckatradeIcon, color: '#0053A0' },
  { name: 'Stripe', icon: StripeIcon, color: '#635BFF' },
];

// Duplicate for seamless infinite scroll
const allIntegrations = [...integrations, ...integrations];

export default function IntegrationLogoBand() {
  return (
    <section className="ds-section-sm" style={{ background: 'var(--off-white)', overflow: 'hidden' }}>
      <div className="ds-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--slate-400)' }}>
            Works with the tools you already use
          </p>
        </motion.div>
      </div>

      {/* Marquee container with edge fades */}
      <div className="relative" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}>
        <div
          className="flex items-center gap-8 py-2"
          style={{
            animation: 'marquee 30s linear infinite',
            width: 'max-content',
          }}
        >
          {allIntegrations.map((integration, i) => {
            const Icon = integration.icon;
            return (
              <div
                key={`${integration.name}-${i}`}
                className="flex items-center gap-3 px-5 py-3 rounded-xl select-none"
                style={{
                  background: 'var(--white)',
                  border: '1px solid var(--slate-200)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                  minWidth: 'fit-content',
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: integration.color + '15' }}
                >
                  <Icon />
                </div>
                <span className="text-sm font-semibold whitespace-nowrap" style={{ color: 'var(--navy-800)' }}>
                  {integration.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
