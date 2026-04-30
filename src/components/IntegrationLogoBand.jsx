import { motion } from 'framer-motion';

const integrations = [
  { name: 'Google Calendar', category: 'calendar' },
  { name: 'WhatsApp', category: 'messaging' },
  { name: 'Outlook', category: 'calendar' },
  { name: 'ServiceM8', category: 'trade' },
  { name: 'Apple Calendar', category: 'calendar' },
  { name: 'Facebook', category: 'social' },
  { name: 'Instagram', category: 'social' },
  { name: 'Google Business', category: 'reviews' },
];

export default function IntegrationLogoBand() {
  return (
    <section className="ds-section-sm" style={{ background: 'var(--off-white)' }}>
      <div className="ds-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--slate-400)' }}>
            Works with tools you already use
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {integrations.map((integration, i) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg"
              style={{
                background: 'var(--white)',
                border: '1px solid var(--slate-200)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              <div
                className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold"
                style={{
                  background:
                    integration.category === 'calendar'
                      ? 'var(--katie-blue-light)'
                      : integration.category === 'messaging'
                      ? 'var(--rex-green-light)'
                      : integration.category === 'trade'
                      ? 'var(--claire-amber-light)'
                      : 'var(--slate-100)',
                  color:
                    integration.category === 'calendar'
                      ? 'var(--katie-blue)'
                      : integration.category === 'messaging'
                      ? 'var(--rex-green)'
                      : integration.category === 'trade'
                      ? 'var(--claire-amber)'
                      : 'var(--slate-500)',
                }}
              >
                {integration.name.charAt(0)}
              </div>
              <span className="text-sm font-medium" style={{ color: 'var(--navy-800)' }}>
                {integration.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
