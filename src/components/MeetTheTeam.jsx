import { motion } from 'framer-motion';
import KatieAvatar from './personas/KatieAvatar.jsx';
import MarkAvatar from './personas/MarkAvatar.jsx';
import RexAvatar from './personas/RexAvatar.jsx';
import ClaireAvatar from './personas/ClaireAvatar.jsx';

const team = [
  {
    name: 'Katie',
    role: 'AI Voice Agent',
    roleColor: '#2563EB',
    description: 'Answers every call, books appointments, and sends WhatsApp summaries. Never misses a job enquiry.',
    capabilities: ['24/7 call answering', 'Calendar booking', 'WhatsApp summaries'],
    status: 'Online 24/7',
    statusColor: '#10B981',
    Avatar: KatieAvatar,
  },
  {
    name: 'Mark',
    role: 'AI Voice Agent (Alternate)',
    roleColor: '#64748B',
    description: 'Professional voice for formal enquiries and complex scheduling. Handles escalations with confidence.',
    capabilities: ['Formal tone', 'Complex scheduling', 'Escalation handling'],
    status: 'Online 24/7',
    statusColor: '#10B981',
    Avatar: MarkAvatar,
  },
  {
    name: 'Rex',
    role: 'AI Visibility Analyst',
    roleColor: '#059669',
    description: 'Tracks your AI search visibility and monitors competitors. Delivers weekly action plans.',
    capabilities: ['AI visibility scores', 'Competitor tracking', 'Weekly action plans'],
    status: 'Always Active',
    statusColor: '#34D399',
    Avatar: RexAvatar,
  },
  {
    name: 'Claire',
    role: 'Review Collector',
    roleColor: '#D97706',
    description: 'Automatically follows up for reviews and monitors your reputation across platforms.',
    capabilities: ['Automated follow-ups', 'Star tracking', 'Reputation alerts'],
    status: 'Always Active',
    statusColor: '#FBBF24',
    Avatar: ClaireAvatar,
  },
];

export default function MeetTheTeam() {
  return (
    <section style={{ background: '#0F172A', padding: '5rem 0' }}>
      <div className="ds-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2
            className="font-extrabold tracking-tight mb-4"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: 'var(--white)',
              fontFamily: 'var(--font-heading)',
            }}
          >
            Meet Your AI Team
          </h2>
          <p
            className="ds-body max-w-lg mx-auto"
            style={{ color: 'var(--slate-400)', fontSize: '1.125rem' }}
          >
            Four specialists. One mission. Zero missed opportunities.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => {
            const PersonaAvatar = member.Avatar;
            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center"
                style={{
                  background: '#0F172A',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '24px',
                }}
              >
                {/* Avatar */}
                <div className="flex justify-center mb-4">
                  <PersonaAvatar size="xl" floating={false} />
                </div>

                {/* Name */}
                <p
                  className="font-bold mb-1"
                  style={{
                    fontSize: '1.25rem',
                    color: 'var(--white)',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  {member.name}
                </p>

                {/* Role */}
                <p
                  className="font-semibold text-sm mb-3"
                  style={{ color: member.roleColor }}
                >
                  {member.role}
                </p>

                {/* Description */}
                <p
                  className="text-sm mb-4"
                  style={{
                    color: 'var(--slate-400)',
                    lineHeight: 1.5,
                    minHeight: '3em',
                  }}
                >
                  {member.description}
                </p>

                {/* Status Badge */}
                <div className="flex justify-center mb-4">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      color: member.statusColor,
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <span
                      className="rounded-full"
                      style={{
                        width: 7,
                        height: 7,
                        background: member.statusColor,
                        boxShadow: `0 0 4px ${member.statusColor}`,
                      }}
                    />
                    {member.status}
                  </span>
                </div>

                {/* Capabilities */}
                <ul className="space-y-1.5 text-left">
                  {member.capabilities.map((cap) => (
                    <li
                      key={cap}
                      className="flex items-center gap-2 text-xs"
                      style={{ color: 'var(--slate-400)' }}
                    >
                      <span
                        className="rounded-full flex-shrink-0"
                        style={{
                          width: 5,
                          height: 5,
                          background: member.roleColor,
                        }}
                      />
                      {cap}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
