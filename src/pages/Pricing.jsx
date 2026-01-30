import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ROICalculator from '../components/ROICalculator';
import Icon from '../components/icons/Icon';
import GuaranteeBadge from '../components/GuaranteeBadge';
import { useAuth } from '../contexts/AuthContext';
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
                // Hide Free Trial if user is not eligible
                if (plan.id === 'free-trial' && !trialEligible) {
                  return false;
                }
                return true;
              })
              .map((plan) => (
              <div
                key={plan.id}
                className={`pricing-card card-hover scroll-reveal ${plan.popular ? 'popular' : ''} ${plan.featured ? 'featured-trial' : ''}`}
                style={{
                  position: 'relative',
                  transform: plan.featured ? 'scale(1.15)' : plan.popular ? 'scale(1.05)' : 'scale(1)',
                  zIndex: plan.featured ? 3 : plan.popular ? 2 : 1,
                  ...(plan.featured && {
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
                    border: '3px solid transparent',
                    backgroundImage: 'linear-gradient(135deg, #0f172a, #1e293b), linear-gradient(135deg, #84CC16, #9EF01A, #84CC16)',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box',
                    boxShadow: '0 25px 70px rgba(132, 204, 22, 0.4), 0 0 50px rgba(132, 204, 22, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    animation: 'pulse-glow 3s ease-in-out infinite'
                  })
                }}
              >
                {plan.popular && (
                  <div className="popular-badge" style={{
                    background: plan.featured 
                      ? 'linear-gradient(135deg, #84CC16 0%, #9EF01A 50%, #84CC16 100%)'
                      : 'linear-gradient(135deg, var(--color-primary-600) 0%, #65a30d 100%)',
                    color: '#0f172a',
                    fontWeight: 700,
                    fontSize: plan.featured ? '15px' : '14px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    padding: plan.featured ? '10px 24px' : 'var(--spacing-sm) var(--spacing-md)',
                    borderRadius: 'var(--radius-full)',
                    position: 'absolute',
                    top: '-14px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    boxShadow: plan.featured 
                      ? '0 6px 20px rgba(132, 204, 22, 0.5), 0 0 30px rgba(132, 204, 22, 0.3)'
                      : '0 4px 12px rgba(132, 204, 22, 0.3)',
                    animation: plan.featured ? 'pulse-badge 2s ease-in-out infinite' : 'none',
                    zIndex: 10
                  }}>
                    {plan.featured ? '⭐ MOST POPULAR' : 'Most Popular'}
                  </div>
                )}

                <div className="pricing-card-header" style={{ 
                  marginTop: plan.popular ? 'var(--spacing-md)' : 0,
                  marginBottom: plan.id === 'free-trial' ? 'var(--spacing-xs)' : 'var(--spacing-sm)'
                }}>
                  <div style={{
                    fontSize: plan.featured ? '22px' : '20px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: plan.featured ? '#84CC16' : '#3B82F6',
                    marginBottom: plan.id === 'free-trial' ? '4px' : '6px',
                    textShadow: plan.featured ? '0 0 20px rgba(132, 204, 22, 0.5)' : 'none',
                    display: plan.id === 'free-trial' ? 'flex' : 'block',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}>
                    {plan.id === 'free-trial' && <span style={{ fontSize: '28px' }}>🎁</span>}
                    {plan.name}
                  </div>
                  <h3 style={{
                    fontSize: plan.featured ? '24px' : '22px',
                    fontWeight: 700,
                    marginBottom: plan.id === 'free-trial' ? '4px' : '6px',
                    color: '#ffffff',
                    textShadow: plan.featured ? '0 2px 10px rgba(255, 255, 255, 0.1)' : 'none',
                    lineHeight: '1.2'
                  }}>
                    {plan.id === 'free-trial' ? plan.headline.replace('🎁 ', '') : plan.headline}
                  </h3>
                  <p className="plan-description" style={{
                    fontSize: '14px',
                    color: '#4B5563',
                    fontStyle: 'italic',
                    marginBottom: plan.id === 'free-trial' ? '8px' : '10px',
                    lineHeight: '1.3'
                  }}>
                    {plan.subheadline}
                  </p>
                </div>

                <div className="pricing-card-price" style={{ 
                  marginBottom: plan.id === 'free-trial' ? '4px' : '6px',
                  paddingTop: plan.id === 'free-trial' ? '8px' : '12px',
                  paddingBottom: plan.id === 'free-trial' ? '8px' : '12px'
                }}>
                  {plan.id === 'free-trial' ? (
                    <>
                      <span className="price-currency" style={{ 
                        fontSize: '48px', 
                        fontWeight: 900,
                        background: 'linear-gradient(135deg, #84CC16, #9EF01A)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0 0 30px rgba(132, 204, 22, 0.5)',
                        letterSpacing: '2px'
                      }}>FREE</span>
                    </>
                  ) : (
                    <>
                      <span className="price-currency">£</span>
                      <span className="price-amount">{plan.price}</span>
                      <span className="price-period">/month</span>
                    </>
                  )}
                </div>

                <div style={{
                  fontSize: '13px',
                  color: '#6B7280',
                  marginBottom: plan.id === 'free-trial' ? '8px' : '10px',
                  textAlign: 'center'
                }}>
                  {plan.id === 'free-trial' ? `for ${plan.duration}` : 'billed monthly'}
                </div>

                {plan.comparisonAnchor && (
                  <div style={{
                    fontSize: '13px',
                    color: 'var(--color-primary-600)',
                    fontWeight: 600,
                    marginBottom: '12px',
                    textAlign: 'center',
                    padding: 'var(--spacing-xs)',
                    background: 'rgba(132, 204, 22, 0.1)',
                    borderRadius: 'var(--radius-md)'
                  }}>
                    {plan.comparisonAnchor}
                  </div>
                )}

                <Link
                  to={`/start?plan=${plan.id}`}
                  className={`pricing-cta btn-hover ${plan.featured ? 'button-featured' : plan.popular ? 'button' : 'button-secondary'}`}
                  style={{
                    width: '100%',
                    marginBottom: plan.id === 'free-trial' ? '8px' : '10px',
                    padding: plan.id === 'free-trial' ? '14px 28px' : '14px 32px',
                    fontSize: plan.featured ? '17px' : '16px',
                    ...(plan.featured && {
                      background: 'linear-gradient(135deg, #84CC16 0%, #65A30D 100%)',
                      color: '#0f172a',
                      fontWeight: 700,
                      borderRadius: '12px',
                      border: 'none',
                      boxShadow: '0 10px 30px rgba(132, 204, 22, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                      textTransform: 'none',
                      letterSpacing: '0.3px',
                      transition: 'all 0.3s ease'
                    })
                  }}
                >
                  {plan.cta}
                </Link>

                <div style={{
                  fontSize: '12px',
                  color: '#4B5563',
                  marginBottom: plan.id === 'free-trial' ? '10px' : '12px',
                  textAlign: 'center',
                  minHeight: plan.id === 'free-trial' ? '32px' : '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: '1.4'
                }}>
                  {plan.trustSignal}
                </div>

                <ul className="pricing-features" style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {plan.features.map((feature, index) => {
                    const isHeader = feature.includes('Core features:') || feature.includes('Everything in');
                    return (
                      <li key={index} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: isHeader ? '0' : 'var(--spacing-sm)',
                        marginBottom: plan.id === 'free-trial' ? '4px' : '5px',
                        fontSize: '14px',
                        lineHeight: '1.35',
                        color: isHeader ? 'var(--color-primary-600)' : '#374151',
                        fontWeight: isHeader ? 600 : 400
                      }}>
                        {!isHeader && (
                          <Icon name="CheckIcon" size={18} className="feature-check" style={{
                            color: 'var(--color-primary-600)',
                            flexShrink: 0,
                            marginTop: '1px'
                          }} />
                        )}
                        {feature}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div className="guarantee-section" style={{
            marginTop: 'var(--spacing-4xl)',
            marginBottom: 'var(--spacing-4xl)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
              <GuaranteeBadge />
            </div>
            <div className="guarantee-content" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
              <h2 className="guarantee-title" style={{ fontSize: '28px', marginBottom: 'var(--spacing-md)' }}>
                30-Day Money-Back Guarantee
              </h2>
              <p style={{
                fontSize: '18px',
                color: '#4B5563',
                lineHeight: '1.7'
              }}>
                Try Whoza completely risk-free. If you're not seeing value within 30 days, we'll refund you completely. No questions asked.
              </p>
              <div className="guarantee-details" style={{
                display: 'flex',
                gap: 'var(--spacing-lg)',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginTop: 'var(--spacing-lg)'
              }}>
                <div className="guarantee-detail" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-xs)'
                }}>
                  <Icon name="CheckIcon" size={20} style={{ color: 'var(--color-primary-600)' }} />
                  <span>No Risk</span>
                </div>
                <div className="guarantee-detail" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-xs)'
                }}>
                  <Icon name="CheckIcon" size={20} style={{ color: 'var(--color-primary-600)' }} />
                  <span>Cancel Anytime</span>
                </div>
                <div className="guarantee-detail" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-xs)'
                }}>
                  <Icon name="CheckIcon" size={20} style={{ color: 'var(--color-primary-600)' }} />
                  <span>No Long-Term Contracts</span>
                </div>
              </div>
            </div>
          </div>

          <div className="comparison-section">
            <h2 className="comparison-title">Compare Plans in Detail</h2>
            <p className="comparison-subtitle">
              See all features side-by-side to choose the perfect plan for your business
            </p>

            <div className="comparison-table-wrapper" style={{ overflowX: 'auto' }}>
              <table className="comparison-table" style={{
                width: '100%',
                borderCollapse: 'collapse',
                marginTop: 'var(--spacing-xl)'
              }}>
                <thead>
                  <tr>
                    <th className="feature-column" style={{
                      textAlign: 'left',
                      padding: 'var(--spacing-md)',
                      borderBottom: '2px solid rgba(132, 204, 22, 0.3)',
                      fontSize: '16px',
                      fontWeight: 700
                    }}>
                      Feature
                    </th>
                    {pricingPlans.map((plan) => (
                      <th key={plan.id} className={plan.popular ? 'popular-column' : ''} style={{
                        textAlign: 'center',
                        padding: 'var(--spacing-md)',
                        borderBottom: '2px solid rgba(132, 204, 22, 0.3)',
                        background: plan.popular ? 'rgba(132, 204, 22, 0.1)' : 'transparent',
                        fontSize: '16px',
                        fontWeight: 700
                      }}>
                        <div className="table-plan-header">
                          <div className="table-plan-name">{plan.name}</div>
                          <div className="table-plan-price" style={{
                            marginTop: 'var(--spacing-xs)',
                            fontSize: '14px',
                            color: '#6B7280'
                          }}>
                            {plan.id === 'free-trial' ? `FREE for ${plan.duration}` : `£${plan.price}/month`}
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((section, sectionIndex) => (
                    <>
                      <tr key={`category-${sectionIndex}`} className="category-row">
                        <td colSpan={4} className="category-cell" style={{
                          padding: 'var(--spacing-md)',
                          fontWeight: 700,
                          fontSize: '15px',
                          background: 'rgba(132, 204, 22, 0.05)',
                          color: 'var(--color-primary-600)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          {section.category}
                        </td>
                      </tr>
                      {section.features.map((feature, featureIndex) => (
                        <tr key={`feature-${sectionIndex}-${featureIndex}`}>
                          <td className="feature-name" style={{
                            padding: 'var(--spacing-md)',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                            fontSize: '15px'
                          }}>
                            {feature.name}
                          </td>
                          {['freeTrial', 'improve', 'priority'].map((tier, tierIndex) => (
                            <td key={tier} className={`feature-value ${tier === 'improve' ? 'popular-column' : ''}`} style={{
                              textAlign: 'center',
                              padding: 'var(--spacing-md)',
                              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                              background: tier === 'improve' ? 'rgba(132, 204, 22, 0.05)' : 'transparent'
                            }}>
                              {typeof feature[tier] === 'boolean' ? (
                                feature[tier] ? (
                                  <Icon name="CheckIcon" size={20} className="check-icon" style={{ color: 'var(--color-primary-600)' }} />
                                ) : (
                                  <span className="not-included" style={{ color: 'var(--color-text-secondary)' }}>—</span>
                                )
                              ) : (
                                <span className="feature-text" style={{
                                  fontSize: '14px',
                                  color: feature[tier] === '—' ? 'var(--color-text-secondary)' : '#374151'
                                }}>
                                  {feature[tier]}
                                </span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <section id="pricing-plans" style={{ marginTop: 'var(--spacing-4xl)' }}>
            <div id="roi-calculator">
              <ROICalculator />
            </div>
          </section>

          <div className="simple-pricing-section" style={{
            marginTop: 'var(--spacing-4xl)',
            marginBottom: 'var(--spacing-4xl)',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '32px', marginBottom: 'var(--spacing-lg)' }}>Choose Your Plan</h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--spacing-xl)',
              maxWidth: '1000px',
              margin: '0 auto var(--spacing-xl)'
            }}>
              <div className="simple-pricing-card card-hover" style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--spacing-2xl)',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-primary-600)', marginBottom: 'var(--spacing-sm)' }}>
                  Free Trial
                </div>
                <div style={{ fontSize: '48px', fontWeight: 700, marginBottom: 'var(--spacing-xs)' }}>
                  <span style={{ fontSize: '32px' }}>FREE</span>
                </div>
                <p style={{ color: '#9CA3AF', fontSize: '16px', lineHeight: '1.6', minHeight: '75px' }}>
                  3 months free. Weekly updates & tips. No credit card required.
                </p>
                <Link
                  to="/start?plan=free-trial"
                  className="button-secondary btn-hover"
                  style={{ width: '100%', marginTop: 'var(--spacing-md)' }}
                >
                  Start Free Trial
                </Link>
              </div>

              <div className="simple-pricing-card card-hover" style={{
                background: 'linear-gradient(135deg, rgba(132, 204, 22, 0.15) 0%, rgba(132, 204, 22, 0.08) 100%)',
                border: '2px solid var(--color-primary-600)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--spacing-2xl)',
                position: 'relative',
                transform: 'scale(1.05)',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'var(--color-primary-600)',
                  color: '#0f172a',
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  padding: 'var(--spacing-xs) var(--spacing-md)',
                  borderRadius: 'var(--radius-full)',
                  letterSpacing: '0.5px'
                }}>
                  Most Popular
                </div>
                <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-primary-600)', marginBottom: 'var(--spacing-sm)', marginTop: 'var(--spacing-sm)' }}>
                  Improve
                </div>
                <div style={{ fontSize: '48px', fontWeight: 700, marginBottom: 'var(--spacing-xs)' }}>
                  <span style={{ fontSize: '24px' }}>£</span>59<span style={{ fontSize: '18px', color: '#6B7280' }}>/month</span>
                </div>
                <p style={{ color: '#9CA3AF', fontSize: '16px', lineHeight: '1.6', minHeight: '75px' }}>
                  One approved improvement per week + monthly confidence score.
                </p>
                <Link
                  to="/start?plan=improve"
                  className="button btn-hover"
                  style={{ width: '100%', marginTop: 'var(--spacing-md)' }}
                >
                  Start Improving
                </Link>
              </div>

              <div className="simple-pricing-card card-hover" style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--spacing-2xl)',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-primary-600)', marginBottom: 'var(--spacing-sm)' }}>
                  Priority
                </div>
                <div style={{ fontSize: '48px', fontWeight: 700, marginBottom: 'var(--spacing-xs)' }}>
                  <span style={{ fontSize: '24px' }}>£</span>149<span style={{ fontSize: '18px', color: '#6B7280' }}>/month</span>
                </div>
                <p style={{ color: '#9CA3AF', fontSize: '16px', lineHeight: '1.6', minHeight: '75px' }}>
                  Faster reviews + extra caution for high-value or regulated services.
                </p>
                <Link
                  to="/start?plan=priority"
                  className="button-secondary btn-hover"
                  style={{ width: '100%', marginTop: 'var(--spacing-md)' }}
                >
                  Get Priority Access
                </Link>
              </div>
            </div>

            <p style={{
              fontSize: '15px',
              color: '#6B7280',
              marginTop: 'var(--spacing-lg)'
            }}>
              30-day money-back guarantee • Cancel anytime • No contracts
            </p>
          </div>

          <div className="trust-signals-section" style={{ marginTop: 'var(--spacing-4xl)' }}>
            <h2 className="trust-signals-title">Why Choose Whoza?</h2>

            <div className="trust-signals-grid">
              <div className="trust-signal-card card-hover">
                <div className="trust-signal-icon guarantee-icon">
                  <Icon name="GuaranteeIcon" size={32} />
                </div>
                <h3>30-Day Money-Back Guarantee</h3>
                <p>Not satisfied? Get a full refund within 30 days. No questions asked.</p>
              </div>

              <div className="trust-signal-card card-hover">
                <div className="trust-signal-icon security-icon">
                  <Icon name="SecurityIcon" size={32} />
                </div>
                <h3>Bank-Level Security</h3>
                <p>Your payment data is encrypted and secured by Stripe, trusted by millions worldwide.</p>
              </div>

              <div className="trust-signal-card card-hover">
                <div className="trust-signal-icon cancel-icon">
                  <Icon name="CloseIcon" size={32} />
                </div>
                <h3>Cancel Anytime</h3>
                <p>No contracts or commitments. Cancel your subscription whenever you want.</p>
              </div>

              <div className="trust-signal-card card-hover">
                <div className="trust-signal-icon">
                  <span style={{ fontSize: '32px' }}>🇬🇧</span>
                </div>
                <h3>GDPR Compliant</h3>
                <p>Your data is protected under UK GDPR regulations. We never sell your information.</p>
              </div>
            </div>

            <div className="stripe-badge" style={{
              textAlign: 'center',
              marginTop: 'var(--spacing-xl)',
              padding: 'var(--spacing-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--spacing-sm)',
              flexWrap: 'wrap',
              fontSize: '14px',
              color: '#6B7280'
            }}>
              <span className="powered-by">Powered by</span>
              <span className="stripe-text" style={{ fontWeight: 700, color: '#635bff' }}>Stripe</span>
              <span style={{ color: '#6B7280' }}>·</span>
              <span className="pci-badge">PCI DSS Compliant</span>
            </div>
          </div>

          <div className="faq-section" style={{ marginTop: 'var(--spacing-4xl)', marginBottom: 'var(--spacing-4xl)' }}>
            <h2 className="faq-title">Common Questions</h2>
            <p className="faq-subtitle">Everything you need to know about Whoza pricing and plans</p>

            <div className="faq-accordion">
              {faqData.map((faq, index) => (
                <div key={index} className="faq-item">
                  <button
                    className={`faq-question ${openFaqIndex === index ? 'active' : ''}`}
                    onClick={() => toggleFaq(index)}
                    aria-expanded={openFaqIndex === index}
                  >
                    <span>{faq.question}</span>
                    <Icon name="ChevronDownIcon" size={20} className="faq-icon" />
                  </button>
                  <div className={`faq-answer ${openFaqIndex === index ? 'open' : ''}`}>
                    <p>{faq.answer}</p>
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
