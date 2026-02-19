import { Link } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ROICalculator from '../components/ROICalculator';
import Icon from '../components/icons/Icon';
import GuaranteeBadge from '../components/GuaranteeBadge';
import { useAuth } from '../contexts/AuthContext';
import { useLocalization } from '../contexts/LocalizationContext';
import { supabase } from '../lib/supabase';

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
    comparisonAnchor: 'vs £600-£1,000/month for SEO agencies',
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
    answer: 'SEO agencies charge £600-£1,000/month because they do everything for you. We give you the exact tasks to do yourself - it takes 10-15 minutes per week and you stay in complete control.'
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
  const [trialEligible, setTrialEligible] = useState(true); // Default to true for non-logged-in users
  const [checkingEligibility, setCheckingEligibility] = useState(false);
  const { userData } = useAuth();
  const { formatPrice, country } = useLocalization();

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Check trial eligibility when component mounts (if user is logged in)
  useEffect(() => {
    const checkTrialEligibility = async () => {
      if (!userData || !userData.id) {
        // User not logged in, show trial option
        setTrialEligible(true);
        return;
      }

      setCheckingEligibility(true);
      try {
        const { data, error } = await supabase
          .rpc('check_trial_eligibility', { p_user_id: userData.id });
        
        if (error) {
          console.error('Failed to check trial eligibility:', error);
          // On error, default to showing trial option
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

  // Inject Schema for AEO optimization
  useEffect(() => {
    // SoftwareApplication Schema
    const priceValidUntil = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const currency = country === 'UK' ? 'GBP' : 'USD';
    const countryCode = country === 'UK' ? 'GB' : 'US';
    const softwareSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Whoza.ai AI Visibility Platform",
      "operatingSystem": "Web",
      "applicationCategory": "BusinessApplication",
      "image": "https://whoza.ai/whoza-logo.png",
      "offers": pricingPlans.map(plan => ({
        "@type": "Offer",
        "name": plan.name,
        "price": plan.price,
        "priceCurrency": currency,
        "description": plan.subheadline,
        "availability": "https://schema.org/InStock",
        "priceValidUntil": priceValidUntil,
        "url": "https://whoza.ai/pricing",
        "hasMerchantReturnPolicy": {
          "@type": "MerchantReturnPolicy",
          "applicableCountry": countryCode,
          "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
          "merchantReturnDays": 30,
          "returnMethod": "https://schema.org/ReturnByMail",
          "returnFees": "https://schema.org/FreeReturn"
        },
        "shippingDetails": {
          "@type": "OfferShippingDetails",
          "shippingRate": {
            "@type": "MonetaryAmount",
            "value": "0",
            "currency": currency
          },
          "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "handlingTime": {
              "@type": "QuantitativeValue",
              "minValue": 0,
              "maxValue": 0,
              "unitCode": "DAY"
            },
            "transitTime": {
              "@type": "QuantitativeValue",
              "minValue": 0,
              "maxValue": 0,
              "unitCode": "DAY"
            }
          },
          "shippingDestination": {
            "@type": "DefinedRegion",
            "addressCountry": countryCode
          }
        }
      })),
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "128"
      }
    };

    // FAQ Schema
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
      { id: 'pricing-faq-schema', data: faqSchema }
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
  }, [country]);

  return (
    <>
      <Header />

      <main id="main-content" role="main">
        <div className="container">
          <div className="pricing-header">
            <h1>Simple, Transparent Pricing</h1>
            <p className="pricing-subtitle" style={{ color: '#4B5563' }}>
              Choose the plan that fits your business. All plans come with a 30-day money-back guarantee.
            </p>
          </div>

          <div className="panel" style={{
            background: 'linear-gradient(135deg, rgba(132, 204, 22, 0.08) 0%, rgba(132, 204, 22, 0.04) 100%)',
            border: '2px solid rgba(132, 204, 22, 0.2)',
            padding: 'var(--spacing-2xl)',
            marginBottom: 'var(--spacing-3xl)',
            textAlign: 'center',
            borderRadius: 'var(--radius-2xl)'
          }}>
            <h2 style={{ fontSize: '28px', marginTop: 0, marginBottom: 'var(--spacing-md)' }}>
              Not Sure Which Plan You Need?
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#374151',
              marginBottom: 'var(--spacing-xl)',
              maxWidth: '650px',
              margin: '0 auto var(--spacing-xl)'
            }}>
              Start with a free AI visibility check. Find out where you stand, then choose
              the plan that matches your goals.
            </p>
            <Link to="/free-score" className="button button-large btn-hover">
              Get your free AI Visibility Score
            </Link>
            <p style={{
              fontSize: '14px',
              color: '#6B7280',
              marginTop: 'var(--spacing-md)',
              marginBottom: 0
            }}>
              Takes 60 seconds · No credit card required
            </p>
          </div>

          {/* Show message if user is logged in and not eligible for trial */}
          {userData && !trialEligible && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%)',
              border: '2px solid rgba(59, 130, 246, 0.3)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--spacing-lg)',
              marginBottom: 'var(--spacing-2xl)',
              textAlign: 'center'
            }}>
              <p style={{
                fontSize: '16px',
                color: '#3B82F6',
                fontWeight: 600,
                marginBottom: '8px'
              }}>
                ℹ️ You've already used your free trial
              </p>
              <p style={{
                fontSize: '14px',
                color: '#6B7280',
                margin: 0
              }}>
                Choose from our paid plans below to continue improving your AI visibility.
              </p>
            </div>
          )}

          <div className="pricing-cards">
            {pricingPlans
              .filter(plan => {
                // Only show free trial if eligible
                if (plan.id === 'free-trial') return trialEligible;
                return true;
              })
              .map((plan) => (
              <div key={plan.id} className={`pricing-card ${plan.featured ? 'featured' : ''}`}>
                {plan.popular && <div className="popular-badge">Most Popular</div>}
                <div className="card-header">
                  <h3>{plan.name}</h3>
                  <div className="headline">{plan.headline}</div>
                  <p className="subheadline">{plan.subheadline}</p>
                  <div className="price-container" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '24px 16px',
                    margin: '20px 0',
                    background: plan.featured 
                      ? 'linear-gradient(135deg, rgba(132, 204, 22, 0.12) 0%, rgba(132, 204, 22, 0.06) 100%)'
                      : 'linear-gradient(135deg, rgba(132, 204, 22, 0.05) 0%, rgba(132, 204, 22, 0.02) 100%)',
                    borderRadius: '12px',
                    border: plan.featured 
                      ? '2px solid rgba(132, 204, 22, 0.3)'
                      : '2px solid rgba(132, 204, 22, 0.15)',
                    transition: 'all 0.2s ease'
                  }} role="region" aria-label={`Pricing information: ${formatPrice(plan.price)} per ${plan.duration || 'month'}`}>
                    <span className="price" style={{
                      fontSize: 'clamp(42px, 5vw, 56px)',
                      fontWeight: '900',
                      lineHeight: '1',
                      color: plan.featured ? '#84CC16' : '#1F2937',
                      letterSpacing: '-0.02em',
                      marginBottom: '4px'
                    }}>{formatPrice(plan.price)}</span>
                    <span className="duration" style={{
                      fontSize: '18px',
                      fontWeight: '500',
                      color: '#6B7280',
                      marginTop: '4px'
                    }} aria-hidden="true">/{plan.duration || 'month'}</span>
                  </div>
                  {plan.comparisonAnchor && (
                    <div className="comparison-anchor" style={{
                      fontSize: '14px',
                      color: '#84CC16',
                      fontWeight: '600',
                      textAlign: 'center',
                      marginTop: '12px'
                    }}>{plan.comparisonAnchor}</div>
                  )}
                </div>
                <div className="card-body">
                  <div className="target-persona">
                    <strong>Best for:</strong> {plan.targetPersona}
                  </div>
                  <ul className="feature-list">
                    {plan.features.map((feature, index) => (
                      <li key={index}>
                        {feature.startsWith('Core features:') || feature.startsWith('Everything in Improve, plus:') ? (
                          <strong>{feature}</strong>
                        ) : (
                          feature
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card-footer">
                  <Link 
                    to={plan.id === 'free-trial' ? '/start?trial=true' : `/start?plan=${plan.id}`} 
                    className={`button ${plan.featured ? '' : 'button-secondary'} full-width`}
                  >
                    {plan.cta}
                  </Link>
                  <div className="trust-signal">{plan.trustSignal}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="comparison-section">
            <h2>Compare Plans</h2>
            <div className="table-responsive">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    {trialEligible && <th>Free Trial</th>}
                    <th>Improve</th>
                    <th>Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((category, catIndex) => (
                    <Fragment key={catIndex}>
                      <tr className="category-row">
                        <td colSpan={trialEligible ? 4 : 3}>{category.category}</td>
                      </tr>
                      {category.features.map((feature, featIndex) => (
                        <tr key={featIndex}>
                          <td>{feature.name}</td>
                          {trialEligible && (
                            <td>
                              {typeof feature.freeTrial === 'boolean' ? (
                                feature.freeTrial ? <Icon name="CheckIcon" size={20} color="#10B981" /> : <Icon name="XIcon" size={20} color="#EF4444" />
                              ) : feature.freeTrial}
                            </td>
                          )}
                          <td>
                            {typeof feature.improve === 'boolean' ? (
                              feature.improve ? <Icon name="CheckIcon" size={20} color="#10B981" /> : <Icon name="XIcon" size={20} color="#EF4444" />
                            ) : feature.improve}
                          </td>
                          <td>
                            {typeof feature.priority === 'boolean' ? (
                              feature.priority ? <Icon name="CheckIcon" size={20} color="#10B981" /> : <Icon name="XIcon" size={20} color="#EF4444" />
                            ) : feature.priority}
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="guarantee-section">
            <div className="guarantee-content">
              <div className="guarantee-badge-container">
                <GuaranteeBadge />
              </div>
              <div className="guarantee-text">
                <h2>Our 30-Day Money-Back Guarantee</h2>
                <p>
                  We're confident Whoza.ai will help you get found by AI. If you're not completely 
                  satisfied within your first 30 days, we'll refund your entire payment. 
                  No questions asked, no hoops to jump through.
                </p>
              </div>
            </div>
          </div>

          <div className="faq-section">
            <h2 style={{ textAlign: 'center', marginBottom: 'var(--spacing-3xl)' }}>
              Frequently Asked Questions
            </h2>
            <div className="faq-grid">
              {faqData.map((faq, index) => (
                <div key={index} className="faq-item">
                  <button 
                    className="faq-question" 
                    onClick={() => toggleFaq(index)}
                    aria-expanded={openFaqIndex === index}
                  >
                    <span>{faq.question}</span>
                    <Icon name="ChevronDownIcon" size={20} className="faq-icon" />
                  </button>
                  <div className={`faq-answer ${openFaqIndex === index ? 'open' : ''}`}>
                    <p>
                      {index === 0 && faq.question.includes('cheaper than SEO') 
                        ? `SEO agencies charge ${formatPrice(600)}-${formatPrice(1000)}/month because they do everything for you. We give you the exact tasks to do yourself - it takes 10-15 minutes per week and you stay in complete control.`
                        : faq.answer
                      }
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            textAlign: 'center',
            marginTop: 'var(--spacing-4xl)',
            marginBottom: 'var(--spacing-4xl)',
            padding: 'var(--spacing-3xl)',
            background: 'linear-gradient(135deg, rgba(132, 204, 22, 0.08) 0%, rgba(132, 204, 22, 0.04) 100%)',
            border: '2px solid rgba(132, 204, 22, 0.2)',
            borderRadius: 'var(--radius-2xl)'
          }}>
            <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Ready to Get Started?</h2>
            <p style={{
              fontSize: '18px',
              color: '#374151',
              marginBottom: 'var(--spacing-lg)',
              maxWidth: '600px',
              margin: '0 auto var(--spacing-lg)'
            }}>
              Start with a free visibility check or choose a plan that fits your business.
            </p>
            <div style={{
              display: 'flex',
              gap: 'var(--spacing-md)',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link to="/free-score" className="button button-large btn-hover">
                See if AI would recommend you
              </Link>
              <Link to="/start" className="button button-large button-secondary btn-hover">
                Choose a Plan
              </Link>
            </div>
            <p style={{
              marginTop: 'var(--spacing-md)',
              fontSize: '14px',
              color: '#6B7280'
            }}>
              <Link to="/how-it-works">How it works</Link> · <Link to="/trust">Trust and privacy</Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
