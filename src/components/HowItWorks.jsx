import { motion } from 'framer-motion';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'We Set Up Whoza on Your Number',
      description: 'Takes 30 minutes. We configure Katie to answer your calls with your business details, availability, and pricing.',
      color: 'var(--katie-blue)',
      bgLight: 'var(--katie-blue-light)',
    },
    {
      number: '02',
      title: 'Katie Answers Every Call 24/7',
      description: 'No more missed calls. Katie books jobs, takes messages, and handles enquiries while you focus on the work.',
      color: 'var(--rex-green)',
      bgLight: 'var(--rex-green-light)',
    },
    {
      number: '03',
      title: 'You Accept Jobs and Get Paid',
      description: 'Job details sent instantly via WhatsApp. You confirm, attend, and invoice — just like any other job.',
      color: 'var(--claire-amber)',
      bgLight: 'var(--claire-amber-light)',
    },
    {
      number: '04',
      title: 'Only Continue If It\'s Working',
      description: '14-day free trial. No credit card required. If you\'re not getting more jobs, you pay nothing.',
      color: 'var(--katie-blue)',
      bgLight: 'var(--katie-blue-light)',
    },
  ];

  return (
    <section className="ds-section" style={{ background: 'var(--navy-900)' }}>
      <div className="ds-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--slate-400)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            How It Works
          </span>
          <h2 className="ds-heading-2" style={{ color: 'var(--white)' }}>
            Four Steps to Never Missing a Job Again
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="ds-card-dark relative overflow-hidden"
              style={{ borderTop: `3px solid ${step.color}` }}
            >
              <div
                className="absolute top-4 right-4 font-extrabold text-4xl opacity-10"
                style={{ color: step.color, fontFamily: 'var(--font-accent)' }}
              >
                {step.number}
              </div>
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: step.bgLight, color: step.color }}
              >
                <span className="font-bold text-sm">{step.number}</span>
              </div>
              <h3 className="ds-heading-4 mb-3" style={{ color: 'var(--white)' }}>{step.title}</h3>
              <p className="ds-body" style={{ color: 'var(--slate-400)' }}>{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}