import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getScoreExplanation, getNextSteps } from '../services/freeScoreService';
import { initScrollReveal } from '../utils/scrollReveal';
import ECEBrandBadge from '../components/ECEBrandBadge';
import ECEPillarBreakdown from '../components/ECEPillarBreakdown';
import { useFormValidation } from '../hooks/useFormValidation';
import { useFreeScoreAPI } from '../hooks/useFreeScoreAPI';
import { useTurnstile } from '../hooks/useTurnstile';
import { supabase } from '../lib/supabase';
import '../microinteractions.css';
import '../FreeScore.css';

/**
 * Free AI Visibility Score page component
 * Allows users to get a free assessment of their AI search visibility
 */
export default function FreeScore() {
      
  const [step, setStep] = useState('form');
  const [result, setResult] = useState(null);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [csrfToken, setCsrfToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState(null);
  const [formData, setFormData] = useState({
    business_name: '',
    trade_type: '',
    location: '',
    website_url: '',
    email: '',
    website_confirm: ''
  });

  // Custom hooks
  const { validateForm } = useFormValidation(formData);
  const { submitScore, loading, error, rateLimitInfo, clearError } = useFreeScoreAPI();
  const { turnstileToken, turnstileLoaded, turnstileError, resetTurnstile } = useTurnstile();

  
  /**
   * Generate CSRF token from database on mount
   */
  useEffect(() => {
    const fetchCSRFToken = async () => {
      try {
                const { data, error } = await supabase.rpc('generate_csrf_token');

        if (error) {
          // TODO: Review error handling: console.error('[FREE SCORE] ❌ CSRF token generation error:', error)
          // Use fallback - backend should handle this gracefully
          setCsrfToken('fallback');
        } else if (data) {
                    setCsrfToken(data);
        } else {
                    setCsrfToken('fallback');
        }
      } catch (err) {
        // TODO: Review error handling: console.error('[FREE SCORE] ❌ CSRF token fetch failed:', err)
        // Use fallback - backend should handle this gracefully
        setCsrfToken('fallback');
      }
    };

    fetchCSRFToken();
  }, []);

  /**
   * Calculate overall score from pillar scores
   * @param {Object} pillarScores - Pillar scores object
   * @returns {number} Overall score percentage
   */
  const calculateOverallScore = (pillarScores) => {
    if (!pillarScores) return 0;

    let totalScore = 0;
    let totalMaxScore = 0;

    Object.values(pillarScores).forEach(pillar => {
      totalScore += pillar.score || 0;
      totalMaxScore += pillar.maxScore || 0;
    });

    if (totalMaxScore === 0) return 0;
    return Math.round((totalScore / totalMaxScore) * 100);
  };

  useEffect(() => {
    if (result && step === 'result') {
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // CRITICAL FIX: Use calculated_score from API as the authoritative score
      // The pillar scores are for breakdown display only, NOT for overall score calculation
      const targetScore = result.calculated_score || 0;

      const duration = 1500;
      const steps = 60;
      const increment = targetScore / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= targetScore) {
          setAnimatedScore(targetScore);
          clearInterval(timer);
        } else {
          setAnimatedScore(Math.floor(current));
        }
      }, duration / steps);

      const cleanup = initScrollReveal();

      return () => {
        clearInterval(timer);
        cleanup();
      };
    }
  }, [result, step]);

  const commonTrades = [
    'Electrician',
    'Plumber',
    'Builder',
    'Carpenter',
    'Painter & Decorator',
    'Roofer',
    'Landscaper',
    'HVAC Engineer',
    'Plasterer',
    'Tiler',
    'Kitchen Fitter',
    'Bathroom Fitter',
    'Handyman',
    'Other'
  ];

  /**
   * Handle form field changes
   * @param {Event} e - Change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear errors when user starts typing
    if (error) {
      clearError();
    }
    if (validationError) {
      setValidationError(null);
    }
  };

  /**
   * Handle form submission
   * @param {Event} e - Submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // CRITICAL: Prevent duplicate submissions
    if (isSubmitting || loading) {
            return;
    }

    // Set submission guard immediately
    setIsSubmitting(true);

    // Clear previous validation errors
    setValidationError(null);

    // CRITICAL VERIFICATION LOG
                
                        
    // Validate form
    const validation = validateForm();

    if (!validation.valid) {
      setValidationError(validation.error || 'Please check your form and try again.');
      setIsSubmitting(false);
      return;
    }

        
    try {
      // Submit score using API hook
      // Backend handles fallback mode when Turnstile is unavailable
      await submitScore(
        formData,
        csrfToken,
        turnstileToken || 'fallback',
        (data) => {
                    setResult(data);
          setStep('result');
          resetTurnstile();
          setIsSubmitting(false);
        }
      );
          } catch (err) {
      // TODO: Review error handling: console.error('[FREE SCORE] ❌ submitScore ERROR:', err)
      // Error already handled by hook
      resetTurnstile();
      setIsSubmitting(false);
    }
  };

  const getScoreBandFromScore = (score) => {
    if (score < 45) return 'Low';
    if (score < 60) return 'Medium';
    return 'High';
  };

  const getScoreColor = (band) => {
    switch (band) {
      case 'Low': return '#FF0000';
      case 'Medium': return '#FFA500';
      case 'High': return '#00FF00';
      default: return '#999999';
    }
  };

  const getScoreLabel = (band) => {
    switch (band) {
      case 'Low': return 'NEEDS IMPROVEMENT';
      case 'Medium': return 'GOOD PROGRESS';
      case 'High': return 'EXCELLENT';
      default: return 'CALCULATING';
    }
  };

  const getScoreEmoji = (band) => {
    switch (band) {
      case 'Low': return '⚠️';
      case 'Medium': return '📈';
      case 'High': return '🎯';
      default: return '⏳';
    }
  };

  return (
    <>
      <Header />

      <main id="main-content" role="main">
        <div className="container">
          {step === 'form' && (
            <>
              <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
                <h1 style={{ marginBottom: 'var(--spacing-md)' }}>
                  Get Your AI Visibility Score
                </h1>

                <p className="hero" style={{
                  fontSize: '20px',
                  textAlign: 'center',
                  padding: '0',
                  marginBottom: 'var(--spacing-lg)',
                  color: '#F3F4F6'
                }}>
                  Get a free assessment showing how likely your business is to be named and recommended in AI answers like ChatGPT, Google AI, and Perplexity. See your score across our proprietary 5-pillar Entity Confidence Engineering™ framework.
                </p>

                <div style={{
                  background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
                  border: '2px solid #F59E0B',
                  borderRadius: '12px',
                  padding: 'var(--spacing-md)',
                  marginBottom: 'var(--spacing-lg)',
                  textAlign: 'left'
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-sm)' }}>
                    <svg style={{ flexShrink: 0, width: '20px', height: '20px', color: '#D97706', marginTop: '2px' }} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div style={{ flex: 1, fontSize: '14px', lineHeight: '1.5', color: '#78350F' }}>
                      <strong style={{ display: 'block', marginBottom: '4px', color: '#92400E' }}>How This Score Works</strong>
                      <p style={{ margin: 0 }}>
                        Your score evaluates 5 critical pillars: Entity Clarity (how clearly AI identifies you),
                        Consensus Alignment (agreement across sources), Answer Readiness (content quality),
                        Risk Reduction (trust signals), and Context Precision (relevance). We use live AI
                        integrations (Google Places, Perplexity, OpenAI) to provide real, actionable insights.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="free-score-form" style={{
                maxWidth: '600px',
                margin: '0 auto',
                background: 'white',
                padding: 'var(--spacing-2xl)',
                borderRadius: 'var(--radius-2xl)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(0, 0, 0, 0.06)'
              }}>
                <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                  <label htmlFor="business_name" style={{
                    display: 'block',
                    fontWeight: 600,
                    marginBottom: 'var(--spacing-xs)',
                    color: 'var(--color-text)'
                  }}>
                    Business Name <span style={{ color: '#ef4444' }} aria-label="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="business_name"
                    name="business_name"
                    value={formData.business_name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    placeholder="e.g. Smith Electrical Services"
                    aria-required="true"
                    aria-invalid={error && !formData.business_name ? "true" : "false"}
                    style={{
                      width: '100%',
                      padding: 'var(--spacing-sm) var(--spacing-md)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '16px',
                      opacity: loading ? 0.6 : 1
                    }}
                  />
                </div>

                <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                  <label htmlFor="trade_type" style={{
                    display: 'block',
                    fontWeight: 600,
                    marginBottom: 'var(--spacing-xs)',
                    color: 'var(--color-text)'
                  }}>
                    Type of Work <span style={{ color: '#ef4444' }} aria-label="required">*</span>
                  </label>
                  <select
                    id="trade_type"
                    name="trade_type"
                    value={formData.trade_type}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    aria-required="true"
                    aria-invalid={error && !formData.trade_type ? "true" : "false"}
                    style={{
                      width: '100%',
                      padding: 'var(--spacing-sm) var(--spacing-md)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '16px',
                      background: 'white',
                      opacity: loading ? 0.6 : 1
                    }}
                  >
                    <option value="">Select your trade...</option>
                    {commonTrades.map(trade => (
                      <option key={trade} value={trade}>{trade}</option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                  <label htmlFor="location" style={{
                    display: 'block',
                    fontWeight: 600,
                    marginBottom: 'var(--spacing-xs)',
                    color: 'var(--color-text)'
                  }}>
                    Where You Work <span style={{ color: '#ef4444' }} aria-label="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    placeholder="e.g. Manchester and surrounding areas"
                    aria-required="true"
                    aria-invalid={error && !formData.location ? "true" : "false"}
                    aria-describedby="location-help"
                    style={{
                      width: '100%',
                      padding: 'var(--spacing-sm) var(--spacing-md)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '16px',
                      opacity: loading ? 0.6 : 1
                    }}
                  />
                  <p id="location-help" style={{
                    fontSize: '14px',
                    color: 'var(--color-text-secondary)',
                    marginTop: 'var(--spacing-xs)',
                    marginBottom: 0
                  }}>
                    Town, city, or region where you serve customers
                  </p>
                </div>

                <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                  <label htmlFor="website_url" style={{
                    display: 'block',
                    fontWeight: 600,
                    marginBottom: 'var(--spacing-xs)',
                    color: 'var(--color-text)'
                  }}>
                    Website or Google Business Link
                  </label>
                  <input
                    type="text"
                    id="website_url"
                    name="website_url"
                    value={formData.website_url}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="e.g. www.smithelectrical.co.uk"
                    aria-describedby="website-help"
                    style={{
                      width: '100%',
                      padding: 'var(--spacing-sm) var(--spacing-md)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '16px',
                      opacity: loading ? 0.6 : 1
                    }}
                  />
                  <p id="website-help" style={{
                    fontSize: '14px',
                    color: 'var(--color-text-secondary)',
                    marginTop: 'var(--spacing-xs)',
                    marginBottom: 0
                  }}>
                    Optional - helps us give you a more accurate score
                  </p>
                </div>

                <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                  <label htmlFor="email" style={{
                    display: 'block',
                    fontWeight: 600,
                    marginBottom: 'var(--spacing-xs)',
                    color: 'var(--color-text)'
                  }}>
                    Email Address <span style={{ color: '#ef4444' }} aria-label="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    placeholder="your@email.com"
                    autoComplete="email"
                    aria-required="true"
                    aria-invalid={error && !formData.email ? "true" : "false"}
                    aria-describedby="email-help"
                    style={{
                      width: '100%',
                      padding: 'var(--spacing-sm) var(--spacing-md)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '16px',
                      opacity: loading ? 0.6 : 1
                    }}
                  />
                  <p id="email-help" style={{
                    fontSize: '14px',
                    color: 'var(--color-text-secondary)',
                    marginTop: 'var(--spacing-xs)',
                    marginBottom: 0
                  }}>
                    Required - we'll email your results so you can refer back to them
                  </p>
                </div>

                {/* Honeypot field - hidden from users, catches bots */}
                <input
                  type="text"
                  name="website_confirm"
                  id="website_confirm"
                  value={formData.website_confirm}
                  onChange={handleChange}
                  autoComplete="nope"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  tabIndex={-1}
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: '-9999px',
                    top: '-9999px',
                    width: '1px',
                    height: '1px',
                    opacity: 0,
                    overflow: 'hidden',
                    pointerEvents: 'none'
                  }}
                />

                {(validationError || error) && (
                  <div
                    className="panel panel-error"
                    style={{ marginBottom: 'var(--spacing-lg)' }}
                    role="alert"
                    aria-live="polite"
                  >
                    {validationError || error}
                  </div>
                )}

                {rateLimitInfo && (
                  <div
                    style={{
                      marginBottom: 'var(--spacing-lg)',
                      padding: 'var(--spacing-lg)',
                      background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)',
                      border: '2px solid rgba(74, 222, 128, 0.3)',
                      borderRadius: '12px',
                      textAlign: 'center'
                    }}
                    role="alert"
                  >
                    <h3 style={{ color: 'var(--color-text)', marginBottom: 'var(--spacing-sm)', fontSize: '18px' }}>
                      Rate Limit Reached
                    </h3>
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-md)' }}>
                      {rateLimitInfo.message}
                    </p>
                    <p style={{ color: 'var(--color-primary-500)', fontWeight: 600, marginBottom: 'var(--spacing-md)', fontSize: '16px' }}>
                      {rateLimitInfo.upgradeMessage}
                    </p>
                    <Link
                      to="/pricing"
                      className="button"
                      style={{
                        display: 'inline-block',
                        textDecoration: 'none'
                      }}
                    >
                      View Plans
                    </Link>
                  </div>
                )}

                <p style={{
                  textAlign: 'center',
                  fontSize: '15px',
                  color: '#6b7280',
                  marginBottom: 'var(--spacing-lg)',
                  fontWeight: 500
                }}>
                  Takes 2 minutes • No technical knowledge needed • Instant results
                </p>

                {/* Turnstile CAPTCHA Widget */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '65px',
                    marginBottom: 'var(--spacing-lg)'
                  }}
                >
                  {turnstileError ? (
                    <div style={{
                      padding: 'var(--spacing-md)',
                      background: '#FEF3C7',
                      border: '1px solid #F59E0B',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '14px',
                      color: '#92400E',
                      textAlign: 'center'
                    }}>
                      ⚠️ Security verification unavailable. You can still submit the form.
                    </div>
                  ) : !turnstileLoaded ? (
                    <div style={{
                      fontSize: '14px',
                      color: '#6B7280',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span className="loading-spinner" style={{ width: '16px', height: '16px' }}></span>
                      Loading security check...
                    </div>
                  ) : (
                    <div
                      className="cf-turnstile"
                      data-sitekey="0x4AAAAAACKCjfPGZgT6V7qa"
                      data-callback="onTurnstileSuccess"
                      data-theme="light"
                      data-size="normal"
                      style={{
                        minHeight: '65px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    ></div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading || isSubmitting}
                  className="button button-large gradient-animate glow"
                  aria-label={(loading || isSubmitting) ? 'Calculating your score, please wait' : 'Get my free visibility score'}
                  aria-busy={loading || isSubmitting}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-accent-600) 100%)',
                    fontSize: '18px',
                    fontWeight: 700,
                    padding: 'var(--spacing-md) var(--spacing-xl)',
                    opacity: (loading || isSubmitting) ? 0.6 : 1,
                    cursor: (loading || isSubmitting) ? 'not-allowed' : 'pointer'
                  }}
                >
                  {(loading || isSubmitting) ? (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--spacing-sm)' }}>
                      <span className="loading-spinner"></span>
                      Calculating Your Score...
                    </span>
                  ) : (
                    <>
                      Get My Free Score
                      <span style={{ marginLeft: '8px' }}>→</span>
                    </>
                  )}
                </button>

                <p style={{
                  textAlign: 'center',
                  fontSize: '14px',
                  color: 'var(--color-text-secondary)',
                  marginTop: 'var(--spacing-md)',
                  marginBottom: 0
                }}>
                  No credit card required. Your information stays private.
                </p>
              </form>

              <div style={{
                maxWidth: '600px',
                margin: 'var(--spacing-2xl) auto 0',
                padding: 'var(--spacing-lg)',
                background: '#f9fafb',
                borderLeft: '4px solid #84cc16',
                borderRadius: '8px'
              }}>
                <p style={{
                  fontSize: '16px',
                  color: '#374151',
                  lineHeight: '1.6',
                  margin: 0,
                  fontStyle: 'italic'
                }}>
                  "I had no idea my business was invisible online. The free assessment showed me exactly what to fix."
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  marginTop: 'var(--spacing-sm)',
                  marginBottom: 0,
                  fontWeight: 600
                }}>
                  - Mike, Plumber
                </p>
              </div>

              <ECEBrandBadge style={{ marginTop: 'var(--spacing-2xl)' }} />
            </>
          )}

          {step === 'result' && result && (() => {
            // CRITICAL FIX: Use calculated_score from API as the authoritative score
            const overallScore = result.calculated_score || 0;
            const currentBand = getScoreBandFromScore(overallScore);
            const displayScore = animatedScore || overallScore;

            
            return (
              <>
                <div className="free-score-container" style={{ maxWidth: '900px', margin: '0 auto' }}>
                  <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-3xl)' }}>
                    <h1 style={{ marginBottom: 'var(--spacing-md)' }}>
                      Your AI Visibility Score
                    </h1>

                    <div style={{
                      background: '#0a0a0a',
                      border: `6px solid ${getScoreColor(currentBand)}`,
                      borderRadius: '24px',
                      padding: '60px 40px',
                      marginBottom: 'var(--spacing-2xl)',
                      boxShadow: 'none',
                      position: 'relative',
                      overflow: 'visible',
                      filter: 'none',
                      backdropFilter: 'none',
                      WebkitBackdropFilter: 'none'
                    }}>
                      <div style={{
                        position: 'relative',
                        zIndex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '32px',
                        filter: 'none',
                        backdropFilter: 'none',
                        WebkitBackdropFilter: 'none'
                      }}>
                        <div style={{
                          position: 'relative',
                          width: '320px',
                          height: '320px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: '#000000',
                          borderRadius: '50%',
                          filter: 'none',
                          backdropFilter: 'none',
                          WebkitBackdropFilter: 'none'
                        }}>
                          <svg
                            width="320"
                            height="320"
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              transform: 'rotate(-90deg)',
                              pointerEvents: 'none'
                            }}
                          >
                            <circle
                              cx="160"
                              cy="160"
                              r="140"
                              fill="none"
                              stroke="#1a1a1a"
                              strokeWidth="24"
                            />
                            <circle
                              cx="160"
                              cy="160"
                              r="140"
                              fill="none"
                              stroke={getScoreColor(currentBand)}
                              strokeWidth="24"
                              strokeLinecap="round"
                              strokeDasharray={`${2 * Math.PI * 140}`}
                              strokeDashoffset={`${2 * Math.PI * 140 * (1 - displayScore / 100)}`}
                              style={{
                                transition: 'stroke-dashoffset 1.5s ease-out'
                              }}
                            />
                          </svg>

                          <div style={{
                            position: 'relative',
                            zIndex: 10,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            filter: 'none',
                            backdropFilter: 'none',
                            WebkitBackdropFilter: 'none'
                          }}>
                            <span style={{
                              fontSize: '96px',
                              fontWeight: 800,
                              color: '#FFFFFF',
                              lineHeight: 1,
                              fontFamily: 'system-ui, -apple-system, sans-serif',
                              display: 'block',
                              WebkitFontSmoothing: 'antialiased',
                              MozOsxFontSmoothing: 'grayscale',
                              filter: 'none',
                              textShadow: 'none',
                              transform: 'none'
                            }}>
                              {Math.round(displayScore) || 0}
                            </span>
                            <span style={{
                              fontSize: '20px',
                              fontWeight: 600,
                              color: '#FFFFFF',
                              marginTop: '4px',
                              letterSpacing: '1px',
                              display: 'block',
                              opacity: 0.9
                            }}>
                              / 100
                            </span>
                          </div>
                        </div>

                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '20px',
                          width: '100%'
                        }}>
                          <div className="score-badge" style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '16px',
                            padding: '20px 48px',
                            background: getScoreColor(currentBand),
                            color: '#000000',
                            borderRadius: '12px',
                            fontSize: '28px',
                            fontWeight: 900,
                            letterSpacing: '1.5px',
                            textTransform: 'uppercase',
                            boxShadow: 'none',
                            border: 'none'
                          }}>
                            <span style={{ fontSize: '32px' }}>{getScoreEmoji(currentBand)}</span>
                            {getScoreLabel(currentBand)}
                          </div>

                          <div style={{
                            fontSize: '16px',
                            fontWeight: 700,
                            color: '#ffffff',
                            textTransform: 'uppercase',
                            letterSpacing: '3px'
                          }}>
                            Calculated from 5 ECE™ Pillars
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {(() => {
                    const googleFound = result.google_found === true;
                    const websiteProvided = formData.website_url && formData.website_url.trim();

                    let confidence = 'HIGH';
                    let confidenceMessage = '';
                    let confidenceTitle = '';

                    if (!googleFound && !websiteProvided) {
                      confidence = 'LOW';
                      confidenceTitle = 'Limited Confidence Score';
                      confidenceMessage = 'We could not verify this business on Google or find a website. This score is an estimate based on limited information and may not reflect actual AI visibility.';
                    } else if (!googleFound || !websiteProvided) {
                      confidence = 'MEDIUM';
                      confidenceTitle = 'Partial Data Available';
                      confidenceMessage = 'Some verification sources were unavailable. Your actual AI visibility may differ from this estimate.';
                    }

                    if (confidence === 'LOW') {
                      return (
                        <div style={{
                          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                          border: '2px solid #f59e0b',
                          borderRadius: 'var(--radius-lg)',
                          padding: 'var(--spacing-lg)',
                          marginBottom: 'var(--spacing-2xl)',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 'var(--spacing-md)'
                        }}>
                          <div style={{
                            fontSize: '24px',
                            color: '#f59e0b',
                            flexShrink: 0
                          }}>
                            ⚠️
                          </div>
                          <div>
                            <div style={{
                              fontWeight: 600,
                              color: '#92400e',
                              marginBottom: 'var(--spacing-xs)',
                              fontSize: '16px'
                            }}>
                              {confidenceTitle}
                            </div>
                            <div style={{
                              color: '#78350f',
                              fontSize: '14px',
                              lineHeight: '1.6'
                            }}>
                              {confidenceMessage}
                            </div>
                          </div>
                        </div>
                      );
                    }

                    if (confidence === 'MEDIUM') {
                      return (
                        <div style={{
                          background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                          border: '2px solid #3b82f6',
                          borderRadius: 'var(--radius-lg)',
                          padding: 'var(--spacing-lg)',
                          marginBottom: 'var(--spacing-2xl)',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 'var(--spacing-md)'
                        }}>
                          <div style={{
                            fontSize: '24px',
                            color: '#3b82f6',
                            flexShrink: 0
                          }}>
                            ℹ️
                          </div>
                          <div>
                            <div style={{
                              fontWeight: 600,
                              color: '#1e40af',
                              marginBottom: 'var(--spacing-xs)',
                              fontSize: '16px'
                            }}>
                              {confidenceTitle}
                            </div>
                            <div style={{
                              color: '#1e3a8a',
                              fontSize: '14px',
                              lineHeight: '1.6'
                            }}>
                              {confidenceMessage}
                            </div>
                          </div>
                        </div>
                      );
                    }

                    return null;
                  })()}

                {result.database_saved === false && result.save_warning && (
                  <div style={{
                    background: 'linear-gradient(135deg, #fff4e6 0%, #ffe8cc 100%)',
                    border: '2px solid #ff9800',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--spacing-lg)',
                    marginBottom: 'var(--spacing-2xl)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'var(--spacing-md)'
                  }}>
                    <div style={{
                      fontSize: '24px',
                      color: '#ff9800',
                      flexShrink: 0
                    }}>
                      ℹ️
                    </div>
                    <div>
                      <div style={{
                        fontWeight: 600,
                        color: '#e65100',
                        marginBottom: 'var(--spacing-xs)',
                        fontSize: '16px'
                      }}>
                        Score Calculated Successfully
                      </div>
                      <div style={{
                        color: '#5d4037',
                        fontSize: '14px',
                        lineHeight: '1.6'
                      }}>
                        {result.save_warning}
                      </div>
                    </div>
                  </div>
                )}

                {result.email_sent === true && (
                  <div style={{
                    background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
                    border: '2px solid #22c55e',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--spacing-lg)',
                    marginBottom: 'var(--spacing-2xl)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'var(--spacing-md)'
                  }}>
                    <div style={{
                      fontSize: '24px',
                      color: '#22c55e',
                      flexShrink: 0
                    }}>
                      ✅
                    </div>
                    <div>
                      <div style={{
                        fontWeight: 600,
                        color: '#166534',
                        marginBottom: 'var(--spacing-xs)',
                        fontSize: '16px'
                      }}>
                        Email Sent Successfully
                      </div>
                      <div style={{
                        color: '#15803d',
                        fontSize: '14px',
                        lineHeight: '1.6'
                      }}>
                        Your detailed ECE V2.1 score report has been sent to your email. Check your inbox for the full analysis.
                      </div>
                    </div>
                  </div>
                )}

                {result.google_check_performed && (
                  <div style={{
                    background: result.google_found
                      ? 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)'
                      : 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                    border: result.google_found
                      ? '2px solid #22c55e'
                      : '2px solid #ef4444',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--spacing-lg)',
                    marginBottom: 'var(--spacing-2xl)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-md)'
                  }}>
                    <div style={{
                      fontSize: '28px',
                      flexShrink: 0
                    }}>
                      {result.google_found ? '✓' : '✗'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontWeight: 600,
                        color: result.google_found ? '#166534' : '#991b1b',
                        fontSize: '16px',
                        marginBottom: '4px'
                      }}>
                        {result.google_found ? 'Found on Google' : 'Not Found on Google'}
                      </div>
                      <div style={{
                        color: result.google_found ? '#166534' : '#991b1b',
                        fontSize: '14px',
                        lineHeight: '1.5'
                      }}>
                        {result.google_found
                          ? 'Your business has a Google presence, which helps with AI visibility.'
                          : 'Your business could not be verified on Google. This is a critical gap for AI visibility.'}
                      </div>
                    </div>
                  </div>
                )}

                <div className="panel" style={{
                  marginBottom: 'var(--spacing-2xl)',
                  padding: 'var(--spacing-2xl)',
                  fontSize: '18px',
                  lineHeight: '1.8',
                  background: 'white',
                  borderRadius: 'var(--radius-2xl)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
                }}>
                  <h2 style={{
                    marginTop: 0,
                    fontSize: '24px',
                    marginBottom: 'var(--spacing-lg)',
                    color: 'var(--color-text-primary)',
                    fontWeight: 700
                  }}>
                    What This Means For Your Business
                  </h2>
                  <p style={{
                    marginBottom: 0,
                    color: 'var(--color-text-secondary)',
                    fontSize: '16px',
                    lineHeight: '1.7'
                  }}>
                    {(() => {
                      // First priority: Use summary_text if available
                      if (result.summary_text && typeof result.summary_text === 'string' && result.summary_text.trim()) {
                                                return result.summary_text;
                      }

                      
                      // Second priority: Generate fallback based on score band and Google presence
                      const googleFound = result.google_found === true;
                      const tradeType = formData.trade_type || result.trade_type || 'business';

                      if (!googleFound) {
                        return `Your business is not showing up on Google, which means AI tools like ChatGPT and Perplexity cannot find you. This is a critical gap. Without a Google Business Profile, potential customers searching with AI assistants will never see your ${tradeType}. The good news: This can be fixed. Setting up your Google Business Profile is the first and most important step.`;
                      }

                      if (currentBand === 'Low') {
                        return `Your ${tradeType} has limited visibility when people use AI search tools. While you're on Google, there are gaps preventing AI from confidently recommending you. Most businesses in your position see significant improvement within 60-90 days of focused work.`;
                      } else if (currentBand === 'Medium') {
                        return `Your ${tradeType} appears in some AI search results, but not consistently. You have some basics in place, but could be much more visible. With the right actions, you could move into the top tier where AI actively recommends you.`;
                      } else {
                        return `Your ${tradeType} has decent visibility in AI search results. You're doing several things right, putting you ahead of competitors. There's still room to strengthen your position and ensure consistent AI recommendations.`;
                      }
                    })()}
                  </p>
                </div>

                {result.pillar_scores && (
                  <div style={{
                    marginBottom: 'var(--spacing-2xl)',
                    padding: 'var(--spacing-2xl)',
                    background: 'white',
                    borderRadius: 'var(--radius-2xl)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
                  }}>
                    <div style={{
                      marginBottom: 'var(--spacing-xl)',
                      textAlign: 'center'
                    }}>
                      <p style={{
                        fontSize: '16px',
                        color: 'var(--color-text-secondary)',
                        margin: 0,
                        lineHeight: '1.6'
                      }}>
                        Your score is calculated using Entity Confidence Engineering™, our proprietary
                        framework for AI visibility. Here's how you perform across each pillar:
                      </p>
                    </div>
                    <ECEPillarBreakdown pillarScores={result.pillar_scores} />
                  </div>
                )}

                {(() => {
                  const explanation = getScoreExplanation(currentBand, result.google_found);
                  const nextSteps = getNextSteps(currentBand, result.google_found);

                  return (
                    <>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: 'var(--spacing-xl)',
                        marginBottom: 'var(--spacing-2xl)'
                      }}>
                        <div className="panel hover-lift" style={{
                          padding: 'var(--spacing-xl)',
                          background: 'white',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)'
                        }}>
                          <h3 style={{ marginTop: 0, fontSize: '20px', marginBottom: 'var(--spacing-md)' }}>
                            {explanation.title}
                          </h3>
                          <p style={{ marginBottom: 0, fontSize: '16px', lineHeight: '1.7', color: 'var(--color-text-secondary)' }}>
                            {explanation.description}
                          </p>
                        </div>

                        <div className="panel panel-success hover-lift" style={{
                          padding: 'var(--spacing-xl)',
                          background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
                          border: '2px solid #22c55e'
                        }}>
                          <h3 style={{ marginTop: 0, fontSize: '20px', marginBottom: 'var(--spacing-md)', color: '#166534' }}>
                            How Rex Helps
                          </h3>
                          <p style={{ marginBottom: 'var(--spacing-sm)', fontSize: '16px', lineHeight: '1.7', color: '#166534' }}>
                            {explanation.canImprove}
                          </p>
                          <p style={{ marginBottom: 0, fontSize: '15px', fontWeight: 600, color: '#166534' }}>
                            {explanation.timeframe}
                          </p>
                        </div>
                      </div>

                      <div className="panel" style={{
                        padding: 'var(--spacing-2xl)',
                        background: 'linear-gradient(135deg, rgba(0, 149, 255, 0.04) 0%, rgba(0, 112, 204, 0.02) 100%)',
                        border: '2px solid rgba(0, 149, 255, 0.2)',
                        marginBottom: 'var(--spacing-2xl)'
                      }}>
                        <h3 style={{ marginTop: 0, fontSize: '22px', marginBottom: 'var(--spacing-lg)' }}>
                          Your Next Steps
                        </h3>
                        <ul style={{
                          listStyle: 'none',
                          padding: 0,
                          margin: 0,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 'var(--spacing-md)'
                        }}>
                          {nextSteps.map((step, index) => (
                            <li key={index} style={{
                              display: 'flex',
                              gap: 'var(--spacing-md)',
                              alignItems: 'start',
                              fontSize: '17px',
                              lineHeight: '1.6'
                            }}>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--color-primary-600)', flexShrink: 0, marginTop: '2px' }}>
                                <path d="M5 13l4 4L19 7" />
                              </svg>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="cta-pulse gradient-animate" style={{
                        background: 'linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-accent-600) 100%)',
                        color: 'white',
                        padding: 'var(--spacing-3xl)',
                        borderRadius: 'var(--radius-2xl)',
                        textAlign: 'center',
                        marginBottom: 'var(--spacing-2xl)',
                        boxShadow: '0 10px 40px rgba(0, 149, 255, 0.25)',
                        position: 'relative'
                      }}>
                        <div style={{
                          position: 'absolute',
                          top: '-30px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: '#22c55e',
                          color: 'white',
                          padding: 'var(--spacing-xs) var(--spacing-lg)',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '14px',
                          fontWeight: 700,
                          boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
                          animation: 'badgePop 0.6s ease backwards'
                        }}>
                          LIMITED TIME: 20% OFF
                        </div>

                        <h2 style={{
                          marginTop: 'var(--spacing-md)',
                          fontSize: '32px',
                          marginBottom: 'var(--spacing-md)',
                          color: 'white'
                        }}>
                          Ready to Improve Your Score?
                        </h2>
                        <p style={{
                          fontSize: '20px',
                          marginBottom: 'var(--spacing-xl)',
                          opacity: 0.95,
                          maxWidth: '600px',
                          margin: '0 auto var(--spacing-xl)'
                        }}>
                          Join Rex and get weekly tasks that steadily improve your AI visibility.
                          <strong style={{ display: 'block', marginTop: 'var(--spacing-sm)', fontSize: '22px' }}>
                            Most members see their score double within 90 days.
                          </strong>
                        </p>

                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 'var(--spacing-md)',
                          alignItems: 'center',
                          marginBottom: 'var(--spacing-xl)'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0 }}>
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                            <span>No credit card required</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0 }}>
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Cancel anytime</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0 }}>
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                            <span>14-day money-back guarantee</span>
                          </div>
                        </div>

                        <div style={{
                          display: 'flex',
                          gap: 'var(--spacing-md)',
                          justifyContent: 'center',
                          flexWrap: 'wrap'
                        }}>
                          <Link to="/pricing" className="button button-large hover-lift" style={{
                            background: 'white',
                            color: 'var(--color-primary-600)',
                            border: 'none',
                            fontSize: '18px',
                            fontWeight: 700,
                            padding: 'var(--spacing-lg) var(--spacing-xl)',
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '60px',
                            maxWidth: '280px',
                            margin: '0 auto',
                            borderRadius: '12px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            width: '100%'
                          }}>
                            <span style={{ display: 'inline-block', lineHeight: '1.3' }}>
                              View Pricing &<br />Start Free Trial
                            </span>
                            <span style={{ marginLeft: '8px' }}>→</span>
                          </Link>
                        </div>

                        <p style={{
                          marginTop: 'var(--spacing-lg)',
                          fontSize: '14px',
                          opacity: 0.8,
                          marginBottom: 0
                        }}>
                          Join 500+ tradespeople already improving their AI visibility
                        </p>
                      </div>
                    </>
                  );
                })()}
              </div>

              <div style={{ marginTop: 'var(--spacing-2xl)', textAlign: 'center' }}>
                <ECEBrandBadge />
              </div>
            </>
            );
          })()}
        </div>
      </main>

      <Footer />
    </>
  );
}
