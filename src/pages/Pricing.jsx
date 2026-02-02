import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import ROICalculator from '../components/ROICalculator';
import Icon from '../components/icons/Icon';
import GuaranteeBadge from '../components/GuaranteeBadge';
import { generatePricingPageSchemas, generateBreadcrumbSchema, generateFAQPageSchema } from '../utils/schemaOrg';
import { useLocalization } from '../contexts/LocalizationContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../config/supabaseClient';

const pricingPlans = [
  {
    id: 'free-trial',
    name: 'Free Trial',
    headline: '🎁 Try Everything Risk-Free',
    subheadline: 'Full access for 90 days. Zero risk. Zero commitment.',
    price: 0,
    duration: '90 days',
    popular: true,
    featured: true,
    cta: 'Start Your Free Trial →',
    trustSignal: '✓ No credit card required  ✓ Cancel anytime  ✓ One-time offer',
    targetPersona: 'Businesses wanting to test AI visibility before committing',
    features: [
      '✨ Weekly AI visibility score reports',
      '📊 Track your progress over 12 weeks',
      '💡 Personalized improvement insights',
      '🎯 Whitelist access to new features (Chloe & Simon)',
      '🚀 Full Improve plan access included',
      '⏰ 90-day trial period (one-time offer)'
    ]
  },
  {
    id: 'improve',
    name: 'Improve',
    headline: 'Get Found by AI',
    subheadline: 'One extra job pays for the whole year.',
    price: 59,
    popular: false,
    cta: 'Start Improving',
    trustSignal: 'Significantly more affordable than SEO agencies. 30-day money-back guarantee.',
    comparisonAnchor: 'vs {currency}600-{currency}1,000/month for SEO agencies',
    targetPersona: 'Independent tradespeople and small firms ready to take action',
    features: [
      'Core features:',
      'Weekly personalised tasks from Rex (your AI employee)',
      'Step-by-step action plans you approve before doing',
      'Progress tracking across all 5 pillars',
      'Email support',
      'Monthly progress reports'
    ]
  },
  {
    id: 'priority',
    name: 'Priority',
    headline: 'For Businesses Where Reputation Matters',
    subheadline: 'Extra scrutiny. Extra caution. Extra peace of mind.',
    price: 149,
    popular: false,
    cta: 'Get Priority Access',
    trustSignal: 'Ideal for regulated businesses, clinics, and professional services.',
    targetPersona: 'Multi-van businesses, clinics, accountants, anyone reputation-sensitive',
    features: [
      'Everything in Improve, plus:',
      'Priority task review (human oversight on every recommendation)',
      'Conservative approach - we flag anything that could affect your reputation',
      'Dedicated account manager check-ins',
      'Competitor tracking (up to 5 competitors)',
      'Quarterly strategy calls',
      'Priority email support (24-hour response)'
    ]
  }
];

const comparisonFeatures = [
  { category: 'Core Features', features: [
    { name: 'Weekly AI Visibility Score', freeTrial: true, improve: true, priority: true },
    { name: 'Personalized Insights', freeTrial: true, improve: true, priority: true },
    { name: 'Progress Tracking', freeTrial: '12 weeks', improve: 'Ongoing', priority: 'Ongoing' },
    { name: 'Competitor Tracking', freeTrial: false, improve: '3', priority: '5' },
    { name: 'Weekly Tasks from Rex', freeTrial: false, improve: true, priority: true },
    { name: 'Action Plans You Approve', freeTrial: false, improve: true, priority: true },
    { name: '5-Pillar Progress Tracking', freeTrial: false, improve: true, priority: true }
  ]},
  { category: 'Premium Features', features: [
    { name: 'Whitelist Access (Chloe & Simon)', freeTrial: true, improve: false, priority: false },
    { name: 'Human Review of Tasks', freeTrial: false, improve: false, priority: true },
    { name: 'Conservative Approach', freeTrial: false, improve: false, priority: true },
    { name: 'Account Manager Check-ins', freeTrial: false, improve: false, priority: true },
    { name: 'Quarterly Strategy Calls', freeTrial: false, improve: false, priority: true }
  ]},
  { category: 'Support', features: [
    { name: 'Email Support', freeTrial: '—', improve: 'Standard', priority: 'Priority (24hr)' },
    { name: 'Money-Back Guarantee', freeTrial: 'N/A (Free)', improve: '30 days', priority: '30 days' },
    { name: 'Trial Duration', freeTrial: '3 months', improve: '—', priority: '—' }
  ]}
];

const faqData = [
  {
    question: 'What if it doesn\'t work for me?',
    answer: 'Every plan comes with a 30-day money-back guarantee. If you\'re not seeing value, we\'ll refund you completely. No questions asked.'
  },
  {
    question: 'How is this different from SEO?',
    answer: 'Traditional SEO focuses on Google search position. We focus on AI visibility - getting your business named and recommended by ChatGPT, Google AI, and Perplexity. These are different systems that require different approaches.'
  },
  {
    question: 'Do I need technical skills?',
    answer: 'Not at all. Rex sends you simple tasks like "add this sentence to your Google Business profile" or "post this to your Facebook page." Average time: 10-15 minutes per week.'
  },
  {
    question: 'Why is this so much cheaper than SEO agencies?',
    answer: 'SEO agencies charge {currency}600-{currency}1,000/month because they do everything for you. We give you the exact tasks to do yourself - it takes 10-15 minutes per week and you stay in complete control.'
  },
  {
    question: 'Can I upgrade or downgrade anytime?',
    answer: 'Yes. Change your plan anytime from your dashboard. No penalties, no hassle.'
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
    question: 'How secure is my payment information?',
    answer: 'We use Stripe for payment processing, which is PCI DSS Level 1 certified. We never store your card details on our servers.'
  }
];

export default function Pricing() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [trialEligible, setTrialEligible] = useState(true);
  const [checkingEligibility, setCheckingEligibility] = useState(false);
  const { userData } = useAuth();
  const { formatPrice, currency } = useLocalization();
  
  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Check trial eligibility when component mounts
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
          console.error('Failed to check trial eligibility:', error);
          setTrialEligible(true);
        } else {
          setTrialEligible(data === true);
        }
      } catch (error) {
        console.error('Error checking trial eligibility:', error);
        setTrialEligible(true);
      } finally {
        setCheckingEligibility(false);
      }
    };
    checkTrialEligibility();
  }, [userData]);

  // Filter plans based on trial eligibility
  const visiblePlans = trialEligible ? pricingPlans : pricingPlans.filter(plan => plan.id !== 'free-trial');

  return (
    <>
      <Header />
      <SEO 
        title="Pricing | Whoza.ai - Affordable AI Marketing"
        description="Simple, transparent pricing for AI visibility. Start with a free trial or choose a plan that fits your business."
      />
      <main id="main-content" role="main">
        <div className="container">
          <div className="pricing-header">
            <h1>Simple, Transparent Pricing</h1>
            <p className="pricing-subtitle" style={{ color: '#4B5563' }}>
              Choose the plan that fits your business. All plans come with a 30-day money-back guarantee.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="pricing-grid">
            {visiblePlans.map((plan) => (
              <div 
                key={plan.id}
                className={`pricing-card ${plan.popular ? 'popular' : ''} ${plan.featured ? 'featured' : ''}`}
              >
                {plan.popular && (
                  <div className="popular-badge">MOST POPULAR</div>
                )}
                
                <div className="pricing-card-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <h4 className="plan-headline">{plan.headline}</h4>
                  <p className="plan-subheadline">{plan.subheadline}</p>
                </div>

                <div className="pricing-card-price">
                  {plan.price === 0 ? (
                    <>
                      <span className="price-amount">FREE</span>
                      <span className="price-duration">{plan.duration}</span>
                    </>
                  ) : (
                    <>
                      <span className="price-amount">{formatPrice(plan.price)}</span>
                      <span className="price-duration">/mo</span>
                      <div className="price-billing">billed monthly</div>
                    </>
                  )}
                  {plan.comparisonAnchor && (
                    <p className="comparison-anchor">
                      {plan.comparisonAnchor.replace(/{currency}/g, currency === 'GBP' ? '£' : '$')}
                    </p>
                  )}
                </div>

                <Link to="/signup" className="button button-large btn-hover">
                  {plan.cta}
                </Link>

                <p className="trust-signal">{plan.trustSignal}</p>

                <ul className="features-list">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>
                      <Icon name="check" size={20} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="faq-section" style={{ marginTop: 'var(--spacing-3xl)' }}>
            <h2 style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>
              Common Questions
            </h2>
            <p style={{ textAlign: 'center', color: '#6B7280', marginBottom: 'var(--spacing-2xl)' }}>
              Everything you need to know about Whoza pricing and plans
            </p>
            
            <div className="faq-list">
              {faqData.map((faq, index) => (
                <div key={index} className="faq-item">
                  <button
                    className="faq-question"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={openFaqIndex === index}
                  >
                    <span>{faq.question}</span>
                    <Icon 
                      name={openFaqIndex === index ? "chevron-up" : "chevron-down"} 
                      size={20} 
                    />
                  </button>
                  {openFaqIndex === index && (
                    <div className="faq-answer">
                      <p>{faq.answer.replace(/{currency}/g, currency === 'GBP' ? '£' : '$')}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ROI Calculator */}
          <div style={{ marginTop: 'var(--spacing-3xl)' }}>
            <ROICalculator />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
