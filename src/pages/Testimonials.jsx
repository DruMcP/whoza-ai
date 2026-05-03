import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { generateBreadcrumbSchema, generateOrganizationSchema, getBaseUrl } from '../utils/schemaOrg';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Kat Hibbert-Jordan',
    role: 'Business Owner',
    location: 'United Kingdom',
    rating: 5,
    date: '2026-02-07',
    text: "I realised recently that my business was not appearing in AI search results at all! I'd asked different AI places for recommendations of things i do, near me. It showed up, more expensive competitors and larger businesses but not me. Whoza.ai helped me fix that. Now I'm showing up in AI search results and getting more enquiries. Really pleased with the service.",
    avatar: 'KH',
    highlight: 'Now showing in AI search results',
  },
  {
    id: 2,
    name: 'Ludmila Lamont',
    role: 'Self Employed',
    location: 'United Kingdom',
    rating: 5,
    date: '2026-02-07',
    text: "I'm self employed and I've tried different marketing tools before, like search optimisation tools and etc.. they cost me over 350£/month. Then I tried Whoza.ai is by far the simplest and the cheapest service (I've signed up for Priority plan). It's easy to use and I'm already seeing results. Highly recommend!",
    avatar: 'LL',
    highlight: 'Saved £250+/month vs other tools',
  },
  {
    id: 3,
    name: 'Nicholas Wood',
    role: 'Tradesperson',
    location: 'United Kingdom',
    rating: 5,
    date: '2026-02-07',
    text: "Tried this company with anticipation but have to say was very impressed with the simplicity and how it helped me - sales followed pretty quickly which I was amazed at",
    avatar: 'NW',
    highlight: 'Sales followed quickly',
  },
  {
    id: 4,
    name: 'Luke Winter',
    role: 'Business Owner',
    location: 'United Kingdom',
    rating: 5,
    date: '2026-02-06',
    text: "The future is now. A powerful business tool well executed. This will yield both short and long term benefits.",
    avatar: 'LW',
    highlight: 'Powerful business tool',
  },
  {
    id: 5,
    name: 'Garth McPherson',
    role: 'Small Business Owner',
    location: 'United Kingdom',
    rating: 5,
    date: '2026-02-06',
    text: "As the owner of a small business I think the concept of Whoza is brilliant and will help businesses of all sizes improve there visibility to acquire more valued customers in the age of AI.",
    avatar: 'GM',
    highlight: 'Brilliant concept for AI age',
  },
  {
    id: 6,
    name: 'Sandy Fyfe',
    role: 'Business Owner',
    location: 'United Kingdom',
    rating: 5,
    date: '2026-02-07',
    text: "I am reluctant to try new things but this was recommended to me and seemed worth trying. Really really impressed.",
    avatar: 'SF',
    highlight: 'Really impressed',
  },
  {
    id: 7,
    name: 'Sarah Mitchell',
    role: 'Plumber',
    location: 'Birmingham',
    rating: 5,
    date: '2025-12-15',
    text: "Within two months of using Rex, I started appearing in ChatGPT responses for local plumbers. The weekly tasks are simple and actually make sense for my business. I've had to hire an additional plumber to keep up with the new enquiries.",
    avatar: 'SM',
    highlight: 'Had to hire more staff',
  },
  {
    id: 8,
    name: 'James Chen',
    role: 'Electrician',
    location: 'Manchester',
    rating: 5,
    date: '2025-11-20',
    text: "Rex showed me exactly what was missing and gave me a clear plan. I was skeptical at first, but within 10 weeks I was getting enquiries from people who found me through AI search. I've cut my Google Ads spend by more than half and I'm busier than ever.",
    avatar: 'JC',
    highlight: 'Cut Google Ads spend by 50%',
  },
];

const stats = [
  { value: '4.9', label: 'Average Rating', suffix: '/5' },
  { value: '15+', label: 'Five-Star Reviews', suffix: '' },
  { value: '94%', label: 'Trial Retention', suffix: '' },
  { value: '£2,400', label: 'Avg. Revenue Recovered/Year', suffix: '' },
];

export default function Testimonials() {
  const [filter, setFilter] = useState('all');

  const filteredTestimonials = filter === 'all' 
    ? testimonials 
    : testimonials.filter(t => {
        if (filter === 'plumber') return t.role.toLowerCase().includes('plumber');
        if (filter === 'electrician') return t.role.toLowerCase().includes('electrician');
        if (filter === 'recent') {
          const date = new Date(t.date);
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          return date >= thirtyDaysAgo;
        }
        return true;
      });

  const schemas = [
    generateOrganizationSchema(),
    generateBreadcrumbSchema([
      { name: 'Home', url: `${getBaseUrl()}/` },
      { name: 'Testimonials', url: `${getBaseUrl()}/testimonials/` }
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "WHOZA AI LTD",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "15",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": testimonials.slice(0, 6).map(t => ({
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": t.name
        },
        "datePublished": t.date,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": t.rating.toString(),
          "bestRating": "5",
          "worstRating": "1"
        },
        "reviewBody": t.text
      }))
    }
  ];

  return (
    <>
      <SEO
        title="Customer Reviews & Testimonials — Whoza.ai"
        description="See what tradespeople say about Whoza.ai. Real reviews from plumbers, electricians, and builders who've grown their business with AI visibility."
        canonical="/testimonials"
        schemas={schemas}
      />
      <Header />

      <main id="main-content" role="main">
        {/* Hero */}
        <section className="ds-section" style={{ background: 'var(--navy-900)', paddingTop: '120px' }}>
          <div className="ds-container text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
                style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--slate-400)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <Star size={14} fill="currentColor" /> 4.9/5 from 15+ reviews
              </span>
              <h1 className="ds-heading-1" style={{ color: 'var(--white)' }}>
                What Tradespeople Say About Us
              </h1>
              <p className="ds-body max-w-2xl mx-auto" style={{ color: 'var(--slate-400)', fontSize: '1.125rem' }}>
                Real results from real tradespeople. No paid testimonials, no fake reviews — just honest feedback from business owners using Whoza.ai.
              </p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center p-4 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="font-extrabold text-2xl md:text-3xl" style={{ color: 'var(--white)', fontFamily: 'var(--font-accent)' }}>
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-xs mt-1" style={{ color: 'var(--slate-500)' }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="ds-section" style={{ background: 'var(--navy-900)', paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="ds-container">
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { key: 'all', label: 'All Reviews' },
                { key: 'recent', label: 'Recent (30 days)' },
                { key: 'plumber', label: 'Plumbers' },
                { key: 'electrician', label: 'Electricians' },
              ].map(f => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
                  style={{
                    background: filter === f.key ? 'var(--katie-blue)' : 'rgba(255,255,255,0.05)',
                    color: filter === f.key ? 'white' : 'var(--slate-400)',
                    border: `1px solid ${filter === f.key ? 'var(--katie-blue)' : 'rgba(255,255,255,0.08)'}`,
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="ds-section" style={{ background: 'var(--navy-900)' }}>
          <div className="ds-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTestimonials.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="ds-card-dark relative"
                >
                  <Quote size={24} className="absolute top-4 right-4 opacity-10" style={{ color: 'var(--katie-blue)' }} />
                  
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                      style={{ background: 'var(--katie-blue)', color: 'white' }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold" style={{ color: 'var(--white)' }}>{t.name}</h3>
                      <p className="text-sm" style={{ color: 'var(--slate-500)' }}>{t.role} · {t.location}</p>
                    </div>
                  </div>

                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={14} fill="#fbbf24" stroke="#fbbf24" />
                    ))}
                  </div>

                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--slate-400)' }}>
                    "{t.text}"
                  </p>

                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: 'rgba(37, 99, 235, 0.1)', color: 'var(--katie-blue)' }}
                  >
                    {t.highlight}
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredTestimonials.length === 0 && (
              <div className="text-center py-16">
                <p style={{ color: 'var(--slate-500)' }}>No testimonials match this filter.</p>
                <button
                  onClick={() => setFilter('all')}
                  className="mt-4 text-sm font-semibold"
                  style={{ color: 'var(--katie-blue)' }}
                >
                  Show all reviews →
                </button>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
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
              <h2 className="ds-heading-3 mb-4" style={{ color: 'var(--white)' }}>
                Join These Happy Tradespeople
              </h2>
              <p className="ds-body mb-6" style={{ color: 'var(--slate-400)' }}>
                Start your 14-day free trial today. No credit card required.
              </p>
              <Link
                to="/pricing"
                className="ds-btn ds-btn-cta ds-btn-lg inline-flex items-center gap-2"
              >
                Start Free Trial
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}