import { motion } from 'framer-motion';
import { TrendingUp, Users, Star, Clock, PoundSterling } from 'lucide-react';

const stats = [
  {
    value: '£2,400',
    label: 'average recovered per year',
    icon: PoundSterling,
    color: 'var(--katie-blue)',
    bgLight: 'var(--katie-blue-light)',
  },
  {
    value: '94%',
    label: 'of users keep whoza.ai after trial',
    icon: TrendingUp,
    color: 'var(--rex-green)',
    bgLight: 'var(--rex-green-light)',
  },
  {
    value: '4.9/5',
    label: 'average rating from tradespeople',
    icon: Star,
    color: 'var(--claire-amber)',
    bgLight: 'var(--claire-amber-light)',
  },
  {
    value: '1,200+',
    label: 'tradespeople using whoza.ai',
    icon: Users,
    color: 'var(--katie-blue)',
    bgLight: 'var(--katie-blue-light)',
  },
  {
    value: 'Under 2 min',
    label: 'to see your visibility score',
    icon: Clock,
    color: 'var(--rex-green)',
    bgLight: 'var(--rex-green-light)',
  },
];

export default function StatsBand() {
  return (
    <section
      className="ds-section-sm"
      style={{
        background: 'var(--navy-900)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="ds-container">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                <div
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3"
                  style={{
                    background: stat.bgLight,
                    color: stat.color,
                  }}
                >
                  <Icon size={20} strokeWidth={2} />
                </div>
                <div
                  className="font-heading font-bold text-2xl md:text-3xl tracking-tight"
                  style={{ color: 'var(--white)', fontVariantNumeric: 'tabular-nums' }}
                >
                  {stat.value}
                </div>
                <p
                  className="text-xs md:text-sm mt-1 leading-snug"
                  style={{ color: 'var(--slate-400)' }}
                >
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
