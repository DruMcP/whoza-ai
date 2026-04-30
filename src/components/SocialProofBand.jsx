import { motion } from 'framer-motion';
import { Wrench, HardHat, Paintbrush, TreePine, Zap, Truck, Shield, BadgeCheck } from 'lucide-react';

const trades = [
  { name: 'Plumbers', icon: Wrench },
  { name: 'Electricians', icon: Zap },
  { name: 'Builders', icon: HardHat },
  { name: 'Painters', icon: Paintbrush },
  { name: 'Gardeners', icon: TreePine },
  { name: 'Roofers', icon: Truck },
];

const trustIndicators = [
  { icon: Shield, label: 'ICO Registered' },
  { icon: BadgeCheck, label: 'GDPR Compliant' },
];

export default function SocialProofBand() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        borderTop: '1px solid var(--slate-200)',
        borderBottom: '1px solid var(--slate-200)',
        background: 'linear-gradient(180deg, var(--off-white) 0%, var(--white) 50%, var(--off-white) 100%)',
      }}
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--navy-900) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="ds-container relative z-10 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <p
            className="font-semibold text-sm tracking-wide uppercase"
            style={{ color: 'var(--slate-400)', letterSpacing: '0.08em' }}
          >
            Built for tradespeople across the UK
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 mb-10">
          {trades.map((trade, i) => {
            const Icon = trade.icon;
            return (
              <motion.div
                key={trade.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="flex items-center gap-2.5 px-4 py-2 rounded-xl cursor-default"
                style={{
                  color: 'var(--slate-500)',
                  background: 'var(--white)',
                  border: '1px solid var(--slate-200)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <Icon size={18} strokeWidth={1.8} />
                <span className="font-semibold text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                  {trade.name}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center gap-6"
        >
          {trustIndicators.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-xs font-medium"
              style={{ color: 'var(--slate-400)' }}
            >
              <Icon size={14} strokeWidth={2} />
              {label}
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-6"
          style={{ fontSize: 'var(--text-xs)', color: 'var(--slate-400)' }}
        >
          Also serving locksmiths, heating engineers, tilers, carpenters, bathroom fitters, kitchen fitters, plasterers, and 30+ more trades
        </motion.p>
      </div>
    </section>
  );
}
