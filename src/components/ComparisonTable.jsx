import { motion } from 'framer-motion';
import { Check, X, Phone, Bot, User, Voicemail } from 'lucide-react';

const competitors = [
  {
    name: 'whoza.ai',
    icon: Bot,
    color: 'var(--katie-blue)',
    bgColor: 'var(--katie-blue-light)',
    price: '£59–349/mo',
    features: [true, true, true, true, true, true, true],
    highlight: true,
  },
  {
    name: 'Human VA',
    icon: User,
    color: 'var(--slate-500)',
    bgColor: 'var(--slate-100)',
    price: '£800–1,200/mo',
    features: [true, true, false, false, false, false, false],
    highlight: false,
  },
  {
    name: 'Call Answering Service',
    icon: Phone,
    color: 'var(--slate-500)',
    bgColor: 'var(--slate-100)',
    price: '£100–300/mo',
    features: [true, false, false, false, false, false, false],
    highlight: false,
  },
  {
    name: 'Voicemail',
    icon: Voicemail,
    color: 'var(--slate-500)',
    bgColor: 'var(--slate-100)',
    price: '£0*',
    features: [false, false, false, false, false, false, false],
    highlight: false,
  },
];

const featureLabels = [
  '24/7 call answering',
  'AI voice (natural accent)',
  'AI visibility scores',
  'Competitor tracking',
  'Review collection',
  'WhatsApp summaries',
  'Calendar booking',
];

export default function ComparisonTable() {
  return (
    <section className="ds-section" style={{ background: 'var(--white)' }}>
      <div className="ds-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="ds-heading-2 mb-4">The Honest Comparison</h2>
          <p className="ds-body max-w-xl mx-auto">
            Why pay more, or lose jobs to voicemail, when you can have a 24/7 AI team for less than a part-time receptionist?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="overflow-x-auto"
        >
          <div className="min-w-[700px]">
            {/* Header row */}
            <div className="grid grid-cols-5 gap-0 mb-2">
              <div className="p-4" />
              {competitors.map((comp) => {
                const Icon = comp.icon;
                return (
                  <div
                    key={comp.name}
                    className="p-4 rounded-t-xl text-center"
                    style={{
                      background: comp.highlight ? comp.bgColor : 'transparent',
                      borderTop: comp.highlight ? `2px solid ${comp.color}` : '2px solid transparent',
                    }}
                  >
                    <div
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg mb-2 mx-auto"
                      style={{ background: comp.bgColor, color: comp.color }}
                    >
                      <Icon size={16} />
                    </div>
                    <div
                      className="text-sm font-bold"
                      style={{ color: comp.highlight ? comp.color : 'var(--navy-900)' }}
                    >
                      {comp.name}
                    </div>
                    <div className="text-xs mt-1" style={{ color: 'var(--slate-400)' }}>
                      {comp.price}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Feature rows */}
            {featureLabels.map((label, i) => (
              <div
                key={label}
                className="grid grid-cols-5 gap-0"
                style={{
                  borderBottom: '1px solid var(--slate-100)',
                  background: i % 2 === 0 ? 'var(--off-white)' : 'var(--white)',
                }}
              >
                <div className="p-4 text-sm font-medium" style={{ color: 'var(--navy-800)' }}>
                  {label}
                </div>
                {competitors.map((comp) => (
                  <div
                    key={`${comp.name}-${label}`}
                    className="p-4 text-center"
                    style={{
                      background: comp.highlight && i % 2 === 0 ? comp.bgColor : 'transparent',
                    }}
                  >
                    {comp.features[i] ? (
                      <Check size={18} style={{ color: 'var(--rex-green)' }} className="mx-auto" strokeWidth={2.5} />
                    ) : (
                      <X size={18} style={{ color: 'var(--slate-200)' }} className="mx-auto" />
                    )}
                  </div>
                ))}
              </div>
            ))}

            {/* Value recovered row */}
            <div
              className="grid grid-cols-5 gap-0"
              style={{
                borderBottom: '1px solid var(--slate-100)',
                background: 'var(--katie-blue-light)',
              }}
            >
              <div className="p-4 text-sm font-bold" style={{ color: 'var(--navy-800)' }}>
                Typical monthly value recovered
              </div>
              <div className="p-4 text-center text-sm font-semibold" style={{ color: 'var(--rex-green)' }}>
                £500–5,000+/mo
              </div>
              <div className="p-4 text-center text-sm font-semibold" style={{ color: 'var(--slate-500)' }}>
                £0
              </div>
              <div className="p-4 text-center text-sm font-semibold" style={{ color: 'var(--slate-500)' }}>
                £0
              </div>
              <div className="p-4 text-center text-sm font-semibold" style={{ color: 'var(--red-500)' }}>
                £0 (but -£2,000/mo in missed jobs)
              </div>
            </div>

            {/* Footer note */}
            <div className="grid grid-cols-5 gap-0 mt-2">
              <div className="p-4 text-xs" style={{ color: 'var(--slate-400)' }} />
              <div className="col-span-4 p-4 text-center">
                <p className="text-xs" style={{ color: 'var(--slate-400)' }}>
                  * Voicemail appears free but costs an average of{' '}
                  <strong style={{ color: 'var(--navy-800)' }}>£4,200/year</strong> in missed jobs.{' '}
                  Based on 5 missed calls/week at £180 average job value.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
