import { motion } from 'framer-motion';
import { Search, Sparkles, ClipboardList } from 'lucide-react';
import KatieAvatar from './personas/KatieAvatar.jsx';
import RexAvatar from './personas/RexAvatar.jsx';
import ClaireAvatar from './personas/ClaireAvatar.jsx';

const steps = [
  {
    number: '01',
    title: 'Enter your details',
    description: 'Tell us your business name and trade. We auto-detect everything else.',
    icon: Search,
    time: '10 seconds',
    personaLabel: 'Katie learns your business in 10 seconds',
    personaBg: 'var(--katie-blue-light)',
    personaColor: 'var(--katie-blue)',
    avatar: 'katie',
  },
  {
    number: '02',
    title: 'Get your score',
    description: 'Rex checks how visible you are to ChatGPT, Google AI, and Perplexity.',
    icon: Sparkles,
    time: 'under 2 minutes',
    personaLabel: 'Rex checks your visibility in under 2 minutes',
    personaBg: 'var(--rex-green-light)',
    personaColor: 'var(--rex-green)',
    avatar: 'rex',
  },
  {
    number: '03',
    title: 'Follow your plan',
    description: 'Get a personalised action plan with simple tasks you can do in minutes. Katie answers your calls. Claire collects reviews.',
    icon: ClipboardList,
    time: 'Ongoing',
    personaLabel: 'Your full AI team takes over',
    personaBg: 'var(--slate-800)',
    personaColor: 'var(--slate-400)',
    avatar: 'team',
  },
];

export default function HowItWorks() {
  return (
    <section className="ds-section" style={{ background: 'var(--off-white)' }}>
      <div className="ds-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="ds-heading-2 mb-4">How it works</h2>
          <p className="ds-body max-w-xl mx-auto">
            Three simple steps to stop losing customers to AI-recommended competitors.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line - desktop */}
          <div className="hidden md:block absolute top-12 left-[16.67%] right-[16.67%] h-[2px]">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="h-full origin-left"
              style={{ background: 'linear-gradient(90deg, var(--katie-blue), var(--rex-green), var(--claire-amber))' }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative"
                >
                  <div className="ds-card text-center">
                    {/* Step number circle */}
                    <div className="relative inline-flex items-center justify-center mb-5">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center relative z-10"
                        style={{
                          background: i === 0 ? 'var(--katie-blue)' : i === 1 ? 'var(--rex-green)' : 'var(--claire-amber)',
                          color: 'var(--white)',
                          fontFamily: 'var(--font-heading)',
                          fontWeight: 800,
                          fontSize: '1.125rem',
                          boxShadow: i === 0
                            ? '0 4px 14px rgba(37, 99, 235, 0.25)'
                            : i === 1
                              ? '0 4px 14px rgba(5, 150, 105, 0.25)'
                              : '0 4px 14px rgba(217, 119, 6, 0.25)',
                        }}
                      >
                        {step.number}
                      </div>
                      {/* Glow ring */}
                      <div
                        className="absolute inset-0 rounded-full -m-1 opacity-20"
                        style={{
                          background: i === 0 ? 'var(--katie-blue)' : i === 1 ? 'var(--rex-green)' : 'var(--claire-amber)',
                        }}
                      />
                    </div>

                    {/* Icon */}
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3"
                      style={{
                        background: i === 0 ? 'var(--katie-blue-light)' : i === 1 ? 'var(--rex-green-light)' : 'var(--claire-amber-light)',
                      }}
                    >
                      <Icon size={20} style={{ color: i === 0 ? 'var(--katie-blue)' : i === 1 ? 'var(--rex-green)' : 'var(--claire-amber)' }} strokeWidth={1.8} />
                    </div>

                    <h3 className="ds-heading-3 mb-2">{step.title}</h3>
                    <p className="ds-body text-sm mb-3">{step.description}</p>

                    {/* Time badge */}
                    <span
                      className="inline-block font-semibold text-xs px-3 py-1 rounded-full"
                      style={{
                        color: i === 0 ? 'var(--katie-blue)' : i === 1 ? 'var(--rex-green)' : 'var(--claire-amber)',
                        background: i === 0 ? 'var(--katie-blue-light)' : i === 1 ? 'var(--rex-green-light)' : 'var(--claire-amber-light)',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {step.time}
                    </span>

                    {/* Persona avatar strip */}
                    <div className="flex justify-center mt-4">
                      {step.avatar === 'katie' && (
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: step.personaBg }}>
                          <KatieAvatar size="sm" floating={false} />
                          <span className="text-xs font-semibold" style={{ color: step.personaColor }}>{step.personaLabel}</span>
                        </div>
                      )}
                      {step.avatar === 'rex' && (
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: step.personaBg }}>
                          <RexAvatar size="sm" floating={false} />
                          <span className="text-xs font-semibold" style={{ color: step.personaColor }}>{step.personaLabel}</span>
                        </div>
                      )}
                      {step.avatar === 'team' && (
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: step.personaBg }}>
                          <KatieAvatar size="sm" floating={false} />
                          <ClaireAvatar size="sm" floating={false} />
                          <RexAvatar size="sm" floating={false} />
                          <span className="text-xs font-semibold" style={{ color: step.personaColor }}>{step.personaLabel}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
