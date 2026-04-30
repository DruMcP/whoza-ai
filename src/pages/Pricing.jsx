import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ComparisonTable from '../components/ComparisonTable';
import FAQAccordion from '../components/FAQAccordion';
import SEO from '../components/SEO';
import { useAuth } from '../contexts/AuthContext';
import { useLocalization } from '../contexts/LocalizationContext';
import { supabase } from '../lib/supabase';
import { generateOrganizationSchema, generateBreadcrumbSchema, getBaseUrl } from '../utils/schemaOrg';
import { Check, ArrowRight, Sparkles, Zap, Crown, TrendingUp, Users, Star, CheckCircle, ChevronDown, Calculator } from 'lucide-react';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const tiers = [
  {
    name: 'Capture',
    icon: Zap,
    capability: 'Your first AI employee — answers calls, captures leads',
    monthlyPrice: 59,
    annualPrice: 590,
    includedJobs: 0,
    includedJobsLabel: 'Lead capture only',
    overageRate: null,
    overageLabel: 'No booking automation',
    roiAnchor: '≈ 1 job/month pays for this',
    roiColor: 'var(--color-blue)',
    features: [
      'Katie answers every call (100 min/month)',
      'Katie sends WhatsApp summaries after every call',
      'Katie captures and qualifies every lead',
      'Claire monitors your reviews',
      'Rex watches 2 directory listings',
      'Email support',
    ],
    cta: 'Hire Katie — Start 14-Day Trial',
    highlight: false,
    starterNote: 'Lead capture only — no booking automation. Upgrade to Convert to get AI booking.',
  },
  {
    name: 'Convert',
    icon: Crown,
    capability: 'Your AI team starter — books jobs + collects reviews',
    monthlyPrice: 119,
    annualPrice: 1190,
    includedJobs: 15,
    includedJobsLabel: '15 AI-booked jobs included',
    overageRate: 3,
    overageLabel: 'Then £3 per extra job',
    roiAnchor: '≈ 2 jobs/month pays for this plan',
    roiColor: 'var(--color-green)',
    features: [
      'Everything in Capture',
      'Katie answers every call (300 min/month)',
      'Katie books jobs into your calendar',
      'Rex tracks your AI Visibility Score',
      'Rex sends monthly competitor reports + weekly action plans',
      'Claire follows up for reviews automatically',
      'Rex manages 5 directory listings',
      'Katie routes emergency calls straight to you',
      'Katie filters spam calls',
      'Priority email support',
    ],
    cta: 'Hire Katie + Claire — Start 14-Day Trial',
    highlight: true,
    badge: 'Most Popular',
  },
  {
    name: 'Grow',
    icon: Crown,
    capability: 'Full AI department — 24/7 voice + visibility + reputation',
    monthlyPrice: 199,
    annualPrice: 1990,
    includedJobs: 40,
    includedJobsLabel: '40 AI-booked jobs included',
    overageRate: 2.5,
    overageLabel: 'Then £2.50 per extra job',
    roiAnchor: '≈ 3 jobs/month pays for this plan',
    roiColor: 'var(--color-amber)',
    features: [
      'Everything in Convert',
      'Katie answers every call (800 min/month)',
      'Rex monitors competitors across 10 locations',
      'Rex delivers actionable competitor insights',
      'Claire handles full review collection & management',
      'Rex manages unlimited directory listings',
      '3 team seats included',
      'Advanced analytics dashboard',
      'WhatsApp Business integration',
      'API access for integrations',
      'Priority chat + phone support',
    ],
    cta: 'Hire Full AI Team — Start 14-Day Trial',
    highlight: false,
  },
  {
    name: 'Scale',
    icon: Crown,
    capability: 'Enterprise AI operations — multi-location, priority support',
    monthlyPrice: 349,
    annualPrice: 3490,
    includedJobs: 100,
    includedJobsLabel: '100 AI-booked jobs included',
    overageRate: 2,
    overageLabel: 'Then £2 per extra job',
    roiAnchor: '≈ 5 jobs/month pays for this plan',
    roiColor: '#dc2626',
    features: [
      'Everything in Grow',
      'Katie answers every call (fair use minutes)',
      'Rex runs priority optimisation across all locations',
      'Rex delivers white-label reports',
      'Claire manages reviews across multiple brands',
      'Rex manages unlimited directory listings',
      'Multi-location support',
      'White-label dashboard',
      'Dedicated account manager',
      'Priority phone support',
    ],
    cta: 'Build Your AI Department — Talk to Sales',
    highlight: false,
    ctaLink: '/contact',
  },
];

const faqData = [
  {
    question: 'How does the outcome pricing work?',
    answer: "You pay a base monthly fee that includes a set number of AI-booked jobs. After that, it's £3 (or £2.50/£2) per additional job. You only pay more when Katie books more jobs for you."
  },
  {
    question: 'What counts as an AI-booked job?',
    answer: "A confirmed appointment that Katie enters into your calendar, where the customer doesn't cancel within 24 hours. If they cancel, you don't pay."
  },
  {
    question: 'What if I don\'t use all my included jobs?',
    answer: "Included jobs don't roll over month to month — use them or lose them. But most tradespeople find Katie books more than their included amount within the first few weeks."
  },
  {
    question: 'Is there a limit to how many jobs Katie can book?',
    answer: "No limit. Katie works 24/7. Heavy users on the Scale plan pay £2 per extra job — the more you grow, the less you pay per booking."
  },
  {
    question: 'Can I switch plans if my usage changes?',
    answer: "Yes, upgrade or downgrade anytime. Your new included job count starts on your next billing cycle."
  },
  {
    question: 'Is this software or a service?',
    answer: "It's like hiring an AI employee. You pay a base monthly wage plus a small fee when Katie delivers results. We handle training, tools, and 24/7 availability. No sick days, no holidays, no recruitment fees."
  },
  {
    question: 'What if it doesn\'t work for me?',
    answer: 'Every plan comes with a 30-day money-back guarantee. If you\'re not seeing value, we\'ll refund you completely. No questions asked.'
  },
  {
    question: 'Will the AI voice agent sound robotic?',
    answer: 'No. We use advanced voice synthesis that sounds natural and human-like. Your callers won\'t know they\'re talking to AI unless you tell them. The agent uses your business name, knows your services, and handles conversations naturally.'
  },
  {
    question: 'How is this different from SEO?',
    answer: 'Traditional SEO focuses on Google search position. We focus on AI visibility - getting your business named and recommended by ChatGPT, Google AI, and Perplexity. These are different systems that require different approaches.'
  },
  {
    question: 'Do I need technical skills?',
    answer: 'Not at all. We send you simple tasks like "add this sentence to your Google Business profile" or "post this to your Facebook page." Average time: 10-15 minutes per week.'
  },
  {
    question: 'Why is this cheaper than SEO agencies?',
    answer: 'SEO agencies charge £600-£1,000/month because they do everything for you. We give you the exact tasks to do yourself - it takes 10-15 minutes per week and you stay in complete control.'
  },
  {
    question: 'Can I upgrade or downgrade anytime?',
    answer: 'Yes. Change your plan anytime from your dashboard. No penalties, no hassle. If you downgrade, you\'ll keep features until your current billing period ends.'
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes. Cancel your subscription anytime. You\'ll keep access until the end of your billing period.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major debit and credit cards via Stripe. No contracts or long-term commitments.'
  },
  {
    question: 'What if I go over my voice agent minutes?',
    answer: 'Additional voice minutes are charged at £0.22 per minute (incl VAT). You\'ll get a warning at 80% usage. You can also upgrade your plan anytime from your dashboard — no penalties.'
  },
  {
    question: 'What\'s included in the 14-day free trial?',
    answer: 'Full access to every feature in your chosen plan — including your full included job count. No credit card required. We\'ll remind you 3 days before the trial ends so you can decide whether to continue.'
  },
  {
    question: 'How quickly will whoza.ai pay for itself?',
    answer: 'Most tradespeople recover the full subscription cost within the first 3–7 days through captured leads alone. A single missed call can cost £180–400 in lost revenue. whoza.ai captures every call, books jobs while you work, and collects reviews automatically — turning missed calls into revenue from day one.'
  },
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [trialEligible, setTrialEligible] = useState(true);
  const [checkingEligibility, setCheckingEligibility] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [calculatorJobs, setCalculatorJobs] = useState(25);
  const { userData } = useAuth();
  const { country } = useLocalization();

  const currency = 'GBP';

  useEffect(() => {
    const checkTrialEligibility = async () => {
      if (!userData || !userData.id) {
        setTrialEligible(true);
        return;
      }
      setCheckingEligibility(true);
      try {
        const { data, error } = await supabase
          .rpc('check_trial_eligibility', { p_user_id: userData.id });
        if (error) {
          setTrialEligible(true);
        } else {
          setTrialEligible(data === true);
        }
      } catch (error) {
        setTrialEligible(true);
      } finally {
        setCheckingEligibility(false);
      }
    };
    checkTrialEligibility();
  }, [userData]);

  useEffect(() => {
    const priceValidUntil = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const countryCode = country === 'UK' ? 'GB' : 'US';
    const softwareSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Whoza.ai AI Visibility Platform",
      "operatingSystem": "Web",
      "applicationCategory": "BusinessApplication",
      "image": `${getBaseUrl()}/whoza-logo.png`,
      "offers": tiers.map(t => ({
        "@type": "Offer",
        "name": `Whoza.ai ${t.name}`,
        "price": isAnnual ? Math.round(t.annualPrice / 12) : t.monthlyPrice,
        "priceCurrency": currency,
        "description": t.capability,
        "availability": "https://schema.org/InStock",
        "priceValidUntil": priceValidUntil,
        "url": `${getBaseUrl()}/pricing`,
      })),
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "128"
      }
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqData.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    const scripts = [
      { id: 'pricing-software-schema', data: softwareSchema },
      { id: 'pricing-faq-schema', data: faqSchema },
      { id: 'pricing-org-schema', data: generateOrganizationSchema() },
      { id: 'pricing-breadcrumb-schema', data: generateBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Pricing', path: '/pricing' }
      ]) }
    ];

    scripts.forEach(({ id, data }) => {
      let script = document.getElementById(id);
      if (!script) {
        script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(data);
    });

    return () => {
      scripts.forEach(({ id }) => {
        const script = document.getElementById(id);
        if (script) script.remove();
      });
    };
  }, [country, isAnnual, currency]);

  const calcTotal = (tier, jobs) => {
    const base = isAnnual ? Math.round(tier.annualPrice / 12) : tier.monthlyPrice;
    if (!tier.includedJobs || tier.includedJobs === 0) return { base, overage: 0, total: base };
    const extra = Math.max(0, jobs - tier.includedJobs);
    const overage = extra * tier.overageRate;
    return { base, overage, total: base + overage };
  };

  return (
    <>
      <SEO title="Pricing — Only pay when Katie books a job | Whoza.ai" description="Hybrid outcome pricing for tradespeople: £59–£349/mo base + £2–£3 per AI-booked job. Includes 15–100 jobs. 14-day free trial." />
      <Header />

      <main id="main-content" role="main" style={{ paddingTop: '80px' }}>
        {/* Hero */}
        <section className="py-16 md:py-20">
          <div className="ds-container text-center">
            <span className="ds-badge ds-badge-amber mb-5">
              <Sparkles size={14} />
              Only pay when it works
            </span>
            <h1 className="ds-heading-hero mb-4">
              Base fee + £3 per booked job
            </h1>
            <p className="ds-body max-w-xl mx-auto">
              We only make more money when you do. Your base fee covers the platform and a set number of AI-booked jobs. After that, it's £3 per extra job — and only when Katie confirms the appointment.
            </p>
          </div>
        </section>

        {/* Social Proof Band */}
        <section className="pb-6">
          <div className="ds-container">
            <div
              className="flex flex-wrap items-center justify-center gap-6 py-4 px-6 rounded-xl"
              style={{ background: 'var(--color-navy-50)', border: '1px solid var(--color-navy-100)' }}
            >
              <div className="flex items-center gap-2">
                <Star size={16} style={{ color: 'var(--color-amber)' }} fill="var(--color-amber)" />
                <span className="text-sm font-semibold" style={{ color: 'var(--color-navy)' }}>4.9/5</span>
                <span className="text-xs" style={{ color: 'var(--color-slate)' }}>from 128 tradespeople</span>
              </div>
              <div className="hidden md:block w-px h-6" style={{ background: 'var(--color-border)' }} />
              <div className="flex items-center gap-2">
                <Users size={16} style={{ color: 'var(--color-blue)' }} />
                <span className="text-sm font-semibold" style={{ color: 'var(--color-navy)' }}>94%</span>
                <span className="text-xs" style={{ color: 'var(--color-slate)' }}>keep their plan after trial</span>
              </div>
              <div className="hidden md:block w-px h-6" style={{ background: 'var(--color-border)' }} />
              <div className="flex items-center gap-2">
                <TrendingUp size={16} style={{ color: 'var(--color-green)' }} />
                <span className="text-sm font-semibold" style={{ color: 'var(--color-navy)' }}>£2,400/yr</span>
                <span className="text-xs" style={{ color: 'var(--color-slate)' }}>average revenue recovered</span>
              </div>
            </div>
          </div>
        </section>

        {/* Billing Toggle */}
        <section className="pb-8">
          <div className="ds-container">
            <div className="flex justify-center">
              <div 
                className="inline-flex p-1 rounded-xl"
                style={{ background: 'var(--color-lightgray)', border: '1px solid var(--color-border)' }}
              >
                <button
                  onClick={() => setIsAnnual(false)}
                  className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
                  style={{
                    background: !isAnnual ? 'var(--color-white)' : 'transparent',
                    color: !isAnnual ? 'var(--color-navy)' : 'var(--color-slate)',
                    boxShadow: !isAnnual ? 'var(--shadow-sm)' : 'none',
                  }}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsAnnual(true)}
                  className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
                  style={{
                    background: isAnnual ? 'var(--color-white)' : 'transparent',
                    color: isAnnual ? 'var(--color-navy)' : 'var(--color-slate)',
                    boxShadow: isAnnual ? 'var(--shadow-sm)' : 'none',
                  }}
                >
                  Annual <span className="ds-badge ds-badge-green text-xs ml-1">2 months free</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Line */}
        <section className="pb-6">
          <div className="ds-container">
            <div className="flex items-center justify-center gap-2 text-sm italic" style={{ color: 'var(--color-slate-400)' }}>
              <CheckCircle size={14} style={{ color: 'var(--color-slate-400)' }} />
              We only make more money when you do.
            </div>
          </div>
        </section>

        {/* Four Tier Cards */}
        <section className="pb-12">
          <div className="ds-container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {tiers.map((tier) => {
                const Icon = tier.icon;
                const price = isAnnual ? Math.round(tier.annualPrice / 12) : tier.monthlyPrice;
                const annualTotal = tier.annualPrice;
                
                return (
                  <div
                    key={tier.name}
                    className="rounded-2xl p-8 relative flex flex-col"
                    style={{
                      background: 'var(--color-white)',
                      border: tier.highlight ? '2px solid var(--color-navy)' : '1px solid var(--color-border)',
                      boxShadow: tier.highlight ? 'var(--shadow-lg)' : 'var(--shadow-card)',
                    }}
                  >
                    {tier.badge && (
                      <span
                        className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                        style={{
                          background: 'var(--color-navy)',
                          color: 'var(--color-white)',
                        }}
                      >
                        {tier.badge}
                      </span>
                    )}
                    {tier.name === 'Convert' && (
                      <span
                        className="absolute -top-3 right-4 px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          background: 'var(--color-amber-100)',
                          color: 'var(--color-amber-600)',
                          border: '1px solid var(--color-amber-200)',
                        }}
                      >
                        ⭐ 94% keep after trial
                      </span>
                    )}
                    
                    <div className="text-center mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                        style={{ background: tier.highlight ? 'var(--color-blue-100)' : 'var(--color-lightgray)' }}
                      >
                        <Icon size={24} color={tier.highlight ? 'var(--color-blue-600)' : 'var(--color-slate)'} strokeWidth={2} />
                      </div>
                      <h2 className="font-bold text-xl mb-1" style={{ color: 'var(--color-navy)' }}>
                        {tier.name}
                      </h2>
                      <p className="text-sm font-medium" style={{ color: 'var(--color-slate)' }}>
                        {tier.capability}
                      </p>
                    </div>

                    <div className="text-center mb-4">
                      <div className="flex items-baseline justify-center gap-1">
                        <span
                          className="font-extrabold tracking-tighter"
                          style={{ fontSize: '3rem', color: 'var(--color-navy)', fontFamily: 'var(--font-heading)', lineHeight: 1 }}
                        >
                          £{price}
                        </span>
                      </div>
                      <p className="text-sm mt-1" style={{ color: 'var(--color-slate)' }}>
                        /month inc VAT
                      </p>
                      <p className="text-xs mt-1" style={{ color: 'var(--color-slate-700)' }}>
                        ({formatCurrency(price / 1.2)} + VAT)
                      </p>
                      {isAnnual && (
                        <p className="text-xs mt-1" style={{ color: 'var(--color-slate)' }}>
                          Billed annually at £{annualTotal} (saves £{Math.round(tier.monthlyPrice * 2.4)})
                        </p>
                      )}
                      
                      {/* Included Jobs Badge */}
                      {tier.includedJobs > 0 ? (
                        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: 'var(--color-green-100)', color: 'var(--color-green-700)', border: '1px solid var(--color-green-200)' }}>
                          <CheckCircle size={12} />
                          {tier.includedJobsLabel}
                        </div>
                      ) : (
                        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: 'var(--color-blue-100)', color: 'var(--color-blue-700)', border: '1px solid var(--color-blue-200)' }}>
                          <Zap size={12} />
                          {tier.includedJobsLabel}
                        </div>
                      )}
                      
                      {tier.overageRate && (
                        <p className="text-sm font-medium mt-2" style={{ color: 'var(--color-slate-600)' }}>
                          {tier.overageLabel}
                        </p>
                      )}
                      
                      <p className="text-base font-bold mt-2" style={{ color: tier.roiColor }}>
                        {tier.roiAnchor}
                      </p>
                    </div>

                    {tier.starterNote && (
                      <div className="mb-4 p-3 rounded-lg text-xs" style={{ background: 'var(--color-blue-50)', color: 'var(--color-blue-700)', border: '1px solid var(--color-blue-100)' }}>
                        {tier.starterNote}
                      </div>
                    )}

                    <div className="space-y-3 mb-8 flex-1">
                      {tier.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                            style={{ background: 'var(--color-green-100)' }}
                          >
                            <Check size={12} color="var(--color-green)" strokeWidth={3} />
                          </div>
                          <span className="text-sm" style={{ color: 'var(--color-navy)' }}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Link
                      to={tier.ctaLink || '/start'}
                      className={`ds-btn ds-btn-lg w-full mb-3 ${tier.highlight ? 'ds-btn-cta' : 'ds-btn-primary'}`}
                      style={tier.highlight ? { boxShadow: 'var(--shadow-amber-glow)' } : {}}
                    >
                      {tier.cta}
                      <ArrowRight size={18} />
                    </Link>

                    <p className="text-center text-xs" style={{ color: 'var(--color-slate)' }}>
                      No credit card required · 14-day trial
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Not eligible message */}
            {userData && !trialEligible && (
              <div
                className="mt-8 max-w-lg mx-auto p-4 rounded-xl text-center"
                style={{ background: 'var(--color-blue-100)', border: '1px solid var(--color-blue-100)' }}
              >
                <p className="text-sm font-semibold" style={{ color: 'var(--color-blue-600)' }}>
                  You've already used your free trial
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--color-slate)' }}>
                  Choose a paid plan above to continue improving your AI visibility.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Calculator Widget */}
        <section className="pb-12">
          <div className="ds-container">
            <div className="max-w-3xl mx-auto rounded-2xl p-8" style={{ background: 'var(--color-white)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--color-blue-100)' }}>
                  <Calculator size={20} style={{ color: 'var(--color-blue-600)' }} />
                </div>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: 'var(--color-navy)' }}>Cost calculator</h3>
                  <p className="text-sm" style={{ color: 'var(--color-slate)' }}>How many jobs do you book per month?</p>
                </div>
              </div>
              
              <div className="mb-6">
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={calculatorJobs}
                  onChange={(e) => setCalculatorJobs(Number(e.target.value))}
                  className="w-full accent-blue-600"
                  style={{ accentColor: 'var(--color-blue-600)' }}
                />
                <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--color-slate)' }}>
                  <span>0 jobs</span>
                  <span className="font-semibold" style={{ color: 'var(--color-navy)' }}>{calculatorJobs} jobs/month</span>
                  <span>200 jobs</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {tiers.filter(t => t.includedJobs > 0).map((tier) => {
                  const { base, overage, total } = calcTotal(tier, calculatorJobs);
                  return (
                    <div key={tier.name} className="p-4 rounded-xl" style={{ background: tier.highlight ? 'var(--color-navy-50)' : 'var(--color-lightgray)', border: tier.highlight ? '2px solid var(--color-navy)' : '1px solid var(--color-border)' }}>
                      <p className="text-sm font-semibold" style={{ color: 'var(--color-navy)' }}>{tier.name}</p>
                      <p className="text-2xl font-extrabold mt-1" style={{ color: 'var(--color-navy)', fontFamily: 'var(--font-heading)' }}>
                        £{total}<span className="text-sm font-normal" style={{ color: 'var(--color-slate)' }}>/mo</span>
                      </p>
                      <p className="text-xs mt-1" style={{ color: 'var(--color-slate)' }}>
                        £{base} base + {overage > 0 ? `£${overage} overage` : '£0 overage'}
                      </p>
                      <p className="text-xs mt-1" style={{ color: tier.highlight ? 'var(--color-green-600)' : 'var(--color-slate-500)' }}>
                        {calculatorJobs <= tier.includedJobs ? `${tier.includedJobs - calculatorJobs} jobs remaining` : `${calculatorJobs - tier.includedJobs} extra jobs @ £${tier.overageRate}`}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table — Collapsible */}
        <section className="pb-12">
          <div className="ds-container">
            <div className="max-w-3xl mx-auto">
              <button
                onClick={() => setShowComparison(!showComparison)}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: 'var(--color-lightgray)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-navy)',
                }}
              >
                {showComparison ? 'Hide capability breakdown' : 'See full capability breakdown'}
                <ChevronDown
                  size={16}
                  style={{
                    transform: showComparison ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                  }}
                />
              </button>
              {showComparison && (
                <div className="mt-6">
                  <ComparisonTable />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQAccordion items={faqData} title="Pricing questions" />

        {/* Final CTA */}
        <section className="py-16 md:py-20" style={{ background: 'linear-gradient(135deg, var(--color-navy) 0%, var(--color-navy-800) 100%)' }}>
          <div className="ds-container text-center">
            <h2 className="font-extrabold text-2xl md:text-3xl mb-4" style={{ color: 'var(--color-white)', fontFamily: 'var(--font-heading)' }}>
              Hire your AI team today
            </h2>
            <p className="mb-8 max-w-md mx-auto" style={{ color: 'var(--color-slate)', fontSize: 'var(--text-body)' }}>
              Start your 14-day free trial — 15 jobs included. No credit card required. Cancel anytime.
            </p>
            <Link
              to="/start"
              className="ds-btn ds-btn-cta ds-btn-lg"
            >
              Start Your 14-Day Free Trial — 15 Jobs Included
              <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
