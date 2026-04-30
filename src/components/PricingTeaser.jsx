import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Zap } from 'lucide-react';

const features = [
  'AI visibility scores',
  'Weekly action plan',
  'AI voice agent',
  'WhatsApp summaries',
  'Calendar sync',
  'Review management',
];

const plans = [
  {
    name: 'Capture',
    price: '£59',
    roiAnchor: '≈ 1 job/month',
    roiColor: 'var(--katie-blue)',
    outcome: 'Lead capture only — no booking automation',
    includedJobs: 'Lead capture only',
    popular: false,
    color: 'var(--slate-500)',
    border: 'var(--slate-200)',
  },
  {
    name: 'Convert',
    price: '£119',
    roiAnchor: '≈ 2 jobs/month',
    roiColor: 'var(--rex-green)',
    outcome: '15 jobs included, then £3 each',
    includedJobs: '15 AI-booked jobs included',
    overage: 'Then £3 per extra job',
    popular: true,
    color: 'var(--katie-blue)',
    border: 'var(--katie-blue)',
  },
  {
    name: 'Grow',
    price: '£199',
    roiAnchor: '≈ 3 jobs/month',
    roiColor: 'var(--claire-amber)',
    outcome: '40 jobs included, then £2.50 each',
    includedJobs: '40 AI-booked jobs included',
    overage: 'Then £2.50 per extra job',
    popular: false,
    color: 'var(--rex-green)',
    border: 'var(--slate-200)',
  },
  {
    name: 'Scale',
    price: '£349',
    roiAnchor: '≈ 5 jobs/month',
    roiColor: '#dc2626',
    outcome: '100 jobs included, then £2 each',
    includedJobs: '100 AI-booked jobs included',
    overage: 'Then £2 per extra job',
    popular: false,
    color: 'var(--claire-amber)',
    border: 'var(--slate-200)',
  },
];

export default function PricingTeaser() {
  return (
    <section className="ds-section">
      <div className="ds-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="ds-badge ds-badge-amber mb-5">
            <Zap size={14} strokeWidth={2.5} />
            Simple, transparent pricing
          </span>

          <h2 className="ds-heading-2 mb-4">
            Only pay when Katie books a job
          </h2>
          <p className="ds-body mb-8 max-w-xl mx-auto">
            Base fee + £3 per booked job. You get 15–100 jobs included depending on your plan. Extra jobs from £2–£3.
          </p>

          <div
            className="rounded-2xl p-6 md:p-10 mb-8"
            style={{
              background: 'var(--white)',
              border: '1px solid var(--slate-200)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            {/* Plan cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {plans.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="text-center p-4 rounded-xl relative cursor-default"
                  style={{
                    border: plan.popular ? `2px solid ${plan.border}` : `1px solid ${plan.border}`,
                    background: plan.popular ? 'rgba(37, 99, 235, 0.03)' : 'transparent',
                    boxShadow: plan.popular ? '0 4px 14px rgba(37, 99, 235, 0.1)' : 'none',
                    transition: 'box-shadow 0.2s ease',
                  }}
                >
                  {plan.popular && (
                    <span
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap"
                      style={{ background: 'var(--katie-blue)', color: 'var(--white)' }}
                    >
                      Most Popular
                    </span>
                  )}
                  <p className="text-sm font-semibold mb-1" style={{ color: 'var(--slate-500)' }}>{plan.name}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span
                      className="font-extrabold text-xl"
                      style={{
                        color: plan.popular ? 'var(--katie-blue)' : 'var(--navy-900)',
                        fontFamily: 'var(--font-heading)',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {plan.price}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--slate-500)' }}>/mo</span>
                  </div>
                  <p className="text-[11px] font-bold mt-1 leading-tight" style={{ color: plan.roiColor }}>{plan.roiAnchor}</p>
                  {plan.includedJobs && (
                    <p className="text-[10px] mt-0.5 leading-tight font-semibold" style={{ color: 'var(--rex-green)' }}>{plan.includedJobs}</p>
                  )}
                  {plan.overage && (
                    <p className="text-[10px] mt-0.5 leading-tight" style={{ color: 'var(--slate-400)' }}>{plan.overage}</p>
                  )}
                  <p className="text-[10px] mt-0.5 leading-tight" style={{ color: 'var(--slate-400)' }}>{plan.outcome}</p>
                </motion.div>
              ))}
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-left">
              {features.map((f, i) => (
                <motion.div
                  key={f}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'var(--rex-green-light)' }}
                  >
                    <Check size={12} color="var(--rex-green)" strokeWidth={3} />
                  </div>
                  <span className="text-sm" style={{ color: 'var(--navy-900)' }}>{f}</span>
                </motion.div>
              ))}
            </div>

            <Link
              to="/pricing"
              className="ds-btn ds-btn-primary ds-btn-lg w-full md:w-auto"
            >
              See Full Plans
              <ArrowRight size={18} />
            </Link>
          </div>

          <p className="text-sm" style={{ color: 'var(--slate-500)' }}>
            All prices inc VAT. 14-day free trial — 15 jobs included. Cancel anytime. Extra jobs from £2–£3.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
