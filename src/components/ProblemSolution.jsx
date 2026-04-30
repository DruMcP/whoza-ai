import { motion } from 'framer-motion';
import { AlertTriangle, TrendingUp, Eye, Bot, Phone, Star, Check, X } from 'lucide-react';
import KatieAvatar from './personas/KatieAvatar.jsx';
import RexAvatar from './personas/RexAvatar.jsx';
import ClaireAvatar from './personas/ClaireAvatar.jsx';

export default function ProblemSolution() {
  return (
    <section className="ds-section">
      <div className="ds-container">
        {/* The Problem */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="ds-badge ds-badge-red mb-4">The problem</span>
          <h2 className="ds-heading-2 mb-4">
            70% of customers now ask AI for recommendations.
          </h2>
          <p className="ds-body max-w-2xl mx-auto">
            ChatGPT, Google AI, and Perplexity are replacing traditional search. If your business isn't visible to these tools, you're invisible to a growing share of your market.
          </p>
        </motion.div>

        {/* Before/After Visual */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-20">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="ds-card"
            style={{
              borderColor: 'rgba(239, 68, 68, 0.15)',
              background: 'linear-gradient(135deg, #fff, #FEE2E2)',
            }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--color-red-100)' }}
              >
                <AlertTriangle size={20} color="#EF4444" />
              </div>
              <h3 className="ds-heading-4" style={{ color: '#EF4444' }}>Before whoza.ai</h3>
            </div>
            <ul className="space-y-3">
              {[
                'Customers ask AI for "a plumber near me"',
                'AI recommends your competitors',
                'You never know you lost the enquiry',
                'Phone stays quiet while rivals get busy',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'var(--slate-500)' }}>
                  <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: '#FEE2E2' }}>
                    <X size={10} color="#EF4444" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="ds-card"
            style={{
              borderColor: 'rgba(5, 150, 105, 0.15)',
              background: 'linear-gradient(135deg, #fff, #D1FAE5)',
            }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--rex-green-light)' }}
              >
                <TrendingUp size={20} color="var(--rex-green)" />
              </div>
              <h3 className="ds-heading-4" style={{ color: 'var(--rex-green)' }}>With whoza.ai</h3>
            </div>
            <ul className="space-y-3">
              {[
                { text: 'AI sees your business across directories', icon: Eye, color: 'var(--katie-blue)' },
                { text: 'You appear in ChatGPT recommendations', icon: Bot, color: 'var(--katie-blue)' },
                { text: 'Get alerts when competitors outrank you', icon: TrendingUp, color: 'var(--rex-green)' },
                { text: 'AI answers your calls — WhatsApp summaries instantly', icon: Phone, color: 'var(--claire-amber)' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'var(--slate-500)' }}>
                  <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: 'var(--rex-green-light)' }}>
                    <Check size={10} color="var(--rex-green)" strokeWidth={3} />
                  </span>
                  <span className="flex items-center gap-2">
                    <item.icon size={14} style={{ color: item.color }} strokeWidth={2} />
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Solution Cards with Personas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="ds-badge ds-badge-blue mb-4">The solution</span>
          <h2 className="ds-heading-2 mb-4">Three tools. One mission.</h2>
          <p className="ds-body max-w-xl mx-auto">
            Everything you need to stop losing customers to AI-recommended competitors.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              avatar: KatieAvatar,
              title: 'AI Voice Agent',
              description: 'Katie answers every call, books appointments, and sends WhatsApp summaries. Never miss another job enquiry.',
              color: 'var(--katie-blue)',
              bg: 'var(--katie-blue-light)',
              glow: 'var(--katie-blue-glow)',
              icon: Phone,
            },
            {
              avatar: RexAvatar,
              title: 'AI Visibility Analyst',
              description: 'Rex checks how findable you are to ChatGPT, Google AI, and Perplexity. Monthly competitor reports. Weekly action plans.',
              color: 'var(--rex-green)',
              bg: 'var(--rex-green-light)',
              glow: 'var(--rex-green-glow)',
              icon: Eye,
            },
            {
              avatar: ClaireAvatar,
              title: 'Review Collector',
              description: 'Claire collects reviews while you work. Automated follow-ups, star-tracking, and reputation alerts.',
              color: 'var(--claire-amber)',
              bg: 'var(--claire-amber-light)',
              glow: 'var(--claire-amber-glow)',
              icon: Star,
            },
          ].map((card, i) => {
            const PersonaAvatar = card.avatar;
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="ds-card text-center"
                style={{
                  borderTop: `3px solid ${card.color}`,
                  background: `linear-gradient(180deg, ${card.bg} 0%, #fff 100%)`,
                  borderColor: `${card.color}30`,
                }}
              >
                <div className="flex justify-center mb-4">
                  <PersonaAvatar size="lg" floating={true} />
                </div>
                <h3 className="ds-heading-3 mb-2">{card.title}</h3>
                <p className="ds-body text-sm">{card.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
