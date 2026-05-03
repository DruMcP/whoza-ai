import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { generateBreadcrumbSchema, generateOrganizationSchema, getBaseUrl } from '../utils/schemaOrg';
import { Check, Phone, Calendar, MessageSquare, Shield, Zap, Clock } from 'lucide-react';

const features = [
  {
    icon: Phone,
    title: 'AI Call Answering',
    description: 'Katie answers every call 24/7. No more missed jobs going to voicemail.',
  },
  {
    icon: Calendar,
    title: 'Automatic Booking',
    description: 'Jobs booked directly into your calendar while you work.',
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp Summaries',
    description: 'Instant WhatsApp messages with caller details and booking info.',
  },
  {
    icon: Shield,
    title: 'No Risk Trial',
    description: '14 days free. No credit card required. Cancel anytime.',
  },
];

const included = [
  'Katie AI voice agent (100 minutes)',
  'Unlimited call answering during trial',
  'WhatsApp call summaries',
  'Basic call capture & qualification',
  'Review monitoring dashboard',
  '2 directory listings setup',
  'Email support',
  'Full access to Rex visibility reports',
];

const steps = [
  { number: '1', text: 'Choose your plan and sign up' },
  { number: '2', text: 'We configure Katie for your business (30 mins)' },
  { number: '3', text: 'Start diverting missed calls to Katie' },
  { number: '4', text: 'Watch jobs get booked automatically' },
];

export default function FreeTrial() {
  const [selectedPlan, setSelectedPlan] = useState('capture');

  const schemas = [
    generateOrganizationSchema(),
    generateBreadcrumbSchema([
      { name: 'Home', url: `${getBaseUrl()}/` },
      { name: 'Free Trial', url: `${getBaseUrl()}/free-trial/` }
    ]),
  ];

  return (
    <>
      <SEO
        title="14-Day Free Trial — Try Whoza.ai Risk-Free"
        description="Start your 14-day free trial of Whoza.ai. No credit card required. See how many jobs Katie can book for your trade business in the first week."
        canonical="/free-trial"
        schemas={schemas}
      />
      <Header />

      <main id="main-content" role="main">
        {/* Hero */}
        <section className="ds-section" style={{ background: 'var(--navy-900)', paddingTop: '120px' }}>
          <div className="ds-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center max-w-3xl mx-auto"
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
                style={{ background: 'rgba(37, 99, 235, 0.15)', color: 'var(--katie-blue)', border: '1px solid rgba(37, 99, 235, 0.2)' }}
              >
                <Zap size={14} />
                Limited availability — 25 spots per month
              </span>

              <h1 className="ds-heading-1" style={{ color: 'var(--white)' }}>
                Try Whoza.ai Free for 14 Days
              </h1>
              <p className="ds-body mt-4" style={{ color: 'var(--slate-400)', fontSize: '1.125rem' }}>
                No credit card required. No setup fees. See how many jobs Katie books for your business in the first week — then decide if it's worth it.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link
                  to="/start"
                  className="ds-btn ds-btn-cta ds-btn-lg inline-flex items-center justify-center gap-2"
                >
                  Start Free Trial
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  to="/pricing"
                  className="ds-btn ds-btn-secondary ds-btn-lg inline-flex items-center justify-center"
                >
                  View Pricing
                </Link>
              </div>

              <div className="flex flex-wrap justify-center gap-6 mt-6">
                {[
                  { icon: Check, text: 'No credit card' },
                  { icon: Check, text: '14 days full access' },
                  { icon: Check, text: 'Cancel anytime' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-sm" style={{ color: 'var(--slate-500)' }}>
                    <Icon size={14} style={{ color: 'var(--katie-blue)' }} />
                    {text}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* What's Included */}
        <section className="ds-section" style={{ background: 'var(--navy-900)' }}>
          <div className="ds-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="ds-heading-2" style={{ color: 'var(--white)' }}>
                Everything You Get During Trial
              </h2>
              <p className="ds-body mt-2" style={{ color: 'var(--slate-400)' }}>
                Full access to all features. No limits, no restrictions.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="ds-card-dark"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: 'var(--katie-blue-light)', color: 'var(--katie-blue)' }}
                  >
                    <feature.icon size={20} />
                  </div>
                  <h3 className="ds-heading-4 mb-2" style={{ color: 'var(--white)' }}>
                    {feature.title}
                  </h3>
                  <p className="ds-body" style={{ color: 'var(--slate-400)' }}>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Included List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto mt-10 p-6 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <h3 className="font-semibold mb-4" style={{ color: 'var(--white)' }}>
                Trial Includes:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {included.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm" style={{ color: 'var(--slate-400)' }}>
                    <Check size={16} style={{ color: 'var(--katie-blue)', marginTop: '2px', shrink: 0 }} />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="ds-section" style={{ background: 'var(--navy-900)' }}>
          <div className="ds-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="ds-heading-2" style={{ color: 'var(--white)' }}>
                How the Trial Works
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4"
                    style={{ background: 'var(--katie-blue)', color: 'white' }}
                  >
                    {step.number}
                  </div>
                  <p className="text-sm" style={{ color: 'var(--slate-400)' }}>
                    {step.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="ds-section" style={{ background: 'var(--navy-900)' }}>
          <div className="ds-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-2xl mx-auto p-8 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex justify-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} width="20" height="20" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="1.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-lg mb-4 italic" style={{ color: 'var(--slate-300)' }}>
                "Within two months of using Whoza.ai, I started appearing in ChatGPT responses for local plumbers. I've had to hire an additional plumber to keep up with the new enquiries."
              </blockquote>
              <p className="text-sm font-semibold" style={{ color: 'var(--slate-400)' }}>
                — Sarah Mitchell, Plumber, Birmingham
              </p>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="ds-section" style={{ background: 'var(--navy-900)' }}>
          <div className="ds-container text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="ds-heading-2 mb-4" style={{ color: 'var(--white)' }}>
                Ready to Never Miss a Job Again?
              </h2>
              <p className="ds-body mb-8" style={{ color: 'var(--slate-400)' }}>
                Join 100+ tradespeople already using Whoza.ai to capture every call and book more jobs.
              </p>
              <Link
                to="/start"
                className="ds-btn ds-btn-cta ds-btn-lg inline-flex items-center gap-2"
              >
                Start Your 14-Day Free Trial
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <p className="text-sm mt-4" style={{ color: 'var(--slate-500)' }}>
                <Clock size={14} className="inline mr-1" />
                Setup takes 30 minutes. First jobs typically within days.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
