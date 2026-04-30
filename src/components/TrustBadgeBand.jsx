import { motion } from 'framer-motion';
import { Shield, Award, CheckCircle2, BadgeCheck, ClipboardCheck } from 'lucide-react';

const certifications = [
  {
    name: 'ICO Registered',
    description: "Information Commissioner's Office",
    icon: Shield,
    color: 'var(--navy-900)',
  },
  {
    name: 'GDPR Compliant',
    description: 'EU data protection standards',
    icon: BadgeCheck,
    color: 'var(--rex-green)',
  },
  {
    name: 'Gas Safe Recognised',
    description: 'For heating engineers',
    icon: Award,
    color: 'var(--katie-blue)',
  },
  {
    name: 'NICEIC Aligned',
    description: 'Electrical contractor standards',
    icon: CheckCircle2,
    color: 'var(--claire-amber)',
  },
  {
    name: 'FMB Partner Ready',
    description: 'Federation of Master Builders',
    icon: ClipboardCheck,
    color: 'var(--navy-900)',
  },
];

export default function TrustBadgeBand() {
  return (
    <section className="ds-section-sm" style={{ background: 'var(--white)' }}>
      <div className="ds-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--slate-400)' }}>
            Trusted by tradespeople. Built to industry standards.
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {certifications.map((cert, i) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg"
                style={{
                  background: 'var(--slate-100)',
                  border: '1px solid var(--slate-200)',
                }}
              >
                <Icon size={18} style={{ color: cert.color }} strokeWidth={2} />
                <div className="text-left">
                  <div className="text-sm font-semibold" style={{ color: 'var(--navy-900)' }}>
                    {cert.name}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--slate-400)' }}>
                    {cert.description}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
