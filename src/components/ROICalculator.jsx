import { useState, useEffect, useRef } from 'react';

export default function ROICalculator() {
  const [selectedTrade, setSelectedTrade] = useState('plumber');
  const [averageJobValue, setAverageJobValue] = useState(250);
  const [newJobsPerMonth, setNewJobsPerMonth] = useState(3);
  const [selectedPlan, setSelectedPlan] = useState('improve');
  const [showResults, setShowResults] = useState(false);

  const tradePresets = {
    plumber: { name: 'Plumber', value: 250 },
    electrician: { name: 'Electrician', value: 300 },
    roofer: { name: 'Roofer', value: 750 },
    builder: { name: 'Builder', value: 500 },
    heating: { name: 'Heating Engineer', value: 350 },
    other: { name: 'Other', value: 250 }
  };

  const planPrices = {
    improve: 59,
    priority: 149
  };

  const handleTradeChange = (trade) => {
    setSelectedTrade(trade);
    if (trade !== 'other') {
      setAverageJobValue(tradePresets[trade].value);
    }
  };

  const calculateROI = () => {
    const monthlyRevenue = averageJobValue * newJobsPerMonth;
    const planCost = planPrices[selectedPlan];
    const netGain = monthlyRevenue - planCost;
    const roi = ((netGain / planCost) * 100).toFixed(0);
    const annualRevenue = monthlyRevenue * 12;
    const annualCost = planCost * 12;
    const annualProfit = annualRevenue - annualCost;
    const breakEvenJobs = Math.ceil(planCost / averageJobValue);

    return {
      monthlyRevenue,
      planCost,
      netGain,
      roi,
      annualRevenue,
      annualCost,
      annualProfit,
      breakEvenJobs
    };
  };

  useEffect(() => {
    setShowResults(true);
  }, [averageJobValue, newJobsPerMonth, selectedPlan]);

  const results = calculateROI();
  const isPositiveROI = results.netGain > 0;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Animated Counter Component
  const AnimatedCounter = ({ value, prefix = '', suffix = '', duration = 800 }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const prevValueRef = useRef(0);

    useEffect(() => {
      const startValue = prevValueRef.current;
      const endValue = typeof value === 'string' ? parseFloat(value) : value;
      const startTime = Date.now();
      
      const animate = () => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = startValue + (endValue - startValue) * easeOutQuart;
        
        setDisplayValue(current);
        prevValueRef.current = current;
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          prevValueRef.current = endValue;
        }
      };
      
      requestAnimationFrame(animate);
    }, [value, duration]);

    const formattedValue = typeof value === 'string' && value.includes('%') 
      ? Math.round(displayValue)
      : Math.round(displayValue);

    return (
      <span style={{ display: 'inline-block' }}>
        {prefix}{formattedValue.toLocaleString()}{suffix}
      </span>
    );
  };

  // Progress Circle Component for ROI visualization
  const ProgressCircle = ({ percentage, size = 120 }) => {
    const [progress, setProgress] = useState(0);
    const radius = (size - 16) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;
    
    useEffect(() => {
      // Animate progress
      const targetProgress = Math.min(Math.max(percentage, 0), 500); // Cap at 500% for display
      const duration = 1000;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        setProgress(easeOut * targetProgress);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }, [percentage]);

    const getColor = () => {
      if (percentage < 0) return '#ef4444';
      if (percentage < 100) return '#f59e0b';
      if (percentage < 300) return '#84CC16';
      return '#16a34a';
    };

    return (
      <div style={{ 
        position: 'relative', 
        width: size, 
        height: size,
        margin: '0 auto'
      }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={getColor()}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.5s ease, stroke 0.5s ease'
            }}
          />
        </svg>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center'
        }}>
          <div style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            color: getColor(),
            lineHeight: 1
          }}>
            <AnimatedCounter value={percentage} suffix="%" />
          </div>
          <div style={{ 
            fontSize: '0.75rem', 
            color: '#6B7280',
            marginTop: '4px'
          }}>
            ROI
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="roi-calculator">
      <div className="roi-calculator-header">
        <h2>Calculate Your ROI</h2>
        <p>See how much you could gain by improving your AI visibility</p>
      </div>

      <div className="roi-calculator-content">
        <div className="roi-inputs">
          <div className="roi-input-group">
            <label htmlFor="tradeType">Select your trade</label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '10px',
              marginBottom: '20px'
            }}>
              {Object.entries(tradePresets).map(([key, { name }]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleTradeChange(key)}
                  style={{
                    padding: '12px 16px',
                    backgroundColor: selectedTrade === key ? '#84CC16' : '#ffffff',
                    color: selectedTrade === key ? '#0f172a' : '#1e293b',
                    border: `2px solid ${selectedTrade === key ? '#84CC16' : '#e2e8f0'}`,
                    borderRadius: '8px',
                    fontWeight: selectedTrade === key ? 'bold' : 'normal',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontSize: '0.9rem'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedTrade !== key) {
                      e.currentTarget.style.borderColor = '#84CC16';
                      e.currentTarget.style.backgroundColor = '#f0fdf4';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedTrade !== key) {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.backgroundColor = '#ffffff';
                    }
                  }}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <div className="roi-input-group">
            <label htmlFor="averageJobValue">
              Average job value
              <span className="input-tooltip" style={{ color: '#6B7280' }}>What do you typically charge for a job?</span>
            </label>
            <div className="currency-input-wrapper">
              <span className="currency-symbol" aria-hidden="true">£</span>
              <input
                id="averageJobValue"
                type="number"
                min="0"
                step="10"
                value={averageJobValue}
                onChange={(e) => setAverageJobValue(Number(e.target.value))}
                aria-label="Average job value in pounds"
                aria-describedby="average-job-hint"
              />
            </div>
            <div className="input-range-wrapper">
              <input
                type="range"
                min="50"
                max="1000"
                step="10"
                value={averageJobValue}
                onChange={(e) => setAverageJobValue(Number(e.target.value))}
                aria-label="Adjust average job value with slider"
              />
              <div className="range-labels">
                <span>£50</span>
                <span>£1,000</span>
              </div>
            </div>
            <p className="field-hint" id="average-job-hint" style={{ color: '#6B7280' }}>Based on our data, most tradespeople charge £150-£500 per job</p>
          </div>

          <div className="roi-input-group">
            <label htmlFor="newJobsPerMonth">
              New jobs per month
              <span className="input-tooltip" style={{ color: '#6B7280' }}>Conservative estimate from improved visibility</span>
            </label>
            <div className="number-input-wrapper">
              <input
                id="newJobsPerMonth"
                type="number"
                min="0"
                max="50"
                value={newJobsPerMonth}
                onChange={(e) => setNewJobsPerMonth(Number(e.target.value))}
                aria-label="Expected new jobs per month"
                aria-describedby="new-jobs-hint"
              />
              <span className="input-unit">jobs</span>
            </div>
            <div className="input-range-wrapper">
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={newJobsPerMonth}
                onChange={(e) => setNewJobsPerMonth(Number(e.target.value))}
                aria-label="Adjust new jobs per month with slider"
              />
              <div className="range-labels">
                <span>1</span>
                <span>20</span>
              </div>
            </div>
            <p className="field-hint" id="new-jobs-hint" style={{ color: '#6B7280' }}>Our customers typically see 2-5 additional jobs per month</p>
          </div>

          <div className="roi-input-group">
            <label htmlFor="selectedPlan">Choose a plan</label>
            <select
              id="selectedPlan"
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              aria-label="Select subscription plan"
            >
              <option value="improve">Improve - £59/month</option>
              <option value="priority">Priority - £149/month</option>
            </select>
          </div>
        </div>

        {showResults && (
          <div 
            className="roi-results" 
            role="region" 
            aria-live="polite" 
            aria-label="ROI calculation results"
            style={{
              animation: 'fadeInUp 0.5s ease-out'
            }}
          >
            <div className={`roi-summary ${isPositiveROI ? 'positive' : 'negative'}`}>
              {/* ROI Visualization Circle */}
              <div style={{ 
                marginBottom: '32px',
                padding: '24px',
                backgroundColor: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid #e2e8f0'
              }}>
                <ProgressCircle percentage={parseFloat(results.roi)} />
              </div>

              <div className="roi-summary-main">
                <div className="roi-metric-large">
                  <span className="roi-label">Your Monthly Net Gain</span>
                  <span 
                    className={`roi-value ${isPositiveROI ? 'positive' : 'negative'}`}
                    style={{
                      fontSize: '2.5rem',
                      fontWeight: 'bold',
                      display: 'block',
                      margin: '12px 0'
                    }}
                  >
                    £<AnimatedCounter value={results.netGain} />
                  </span>
                  <span className="roi-sublabel" style={{ color: '#6B7280' }}>
                    {formatCurrency(results.monthlyRevenue)} revenue - {formatCurrency(results.planCost)} subscription
                  </span>
                </div>
              </div>

              <div className="roi-metrics-grid">
                <div className="roi-metric" style={{
                  transition: 'transform 0.2s ease',
                  cursor: 'default'
                }}>
                  <svg viewBox="0 0 20 20" fill="currentColor" className="roi-icon" aria-hidden="true">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <div className="roi-metric-content">
                    <span className="roi-metric-label" style={{ color: '#374151' }}>Return on Investment</span>
                    <span className="roi-metric-value">
                      <AnimatedCounter value={results.roi} suffix="%" />
                    </span>
                  </div>
                </div>

                <div className="roi-metric" style={{
                  transition: 'transform 0.2s ease',
                  cursor: 'default'
                }}>
                  <svg viewBox="0 0 20 20" fill="currentColor" className="roi-icon" aria-hidden="true">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <div className="roi-metric-content">
                    <span className="roi-metric-label" style={{ color: '#374151' }}>Annual Profit</span>
                    <span className="roi-metric-value">
                      £<AnimatedCounter value={results.annualProfit} />
                    </span>
                  </div>
                </div>

                <div className="roi-metric" style={{
                  transition: 'transform 0.2s ease',
                  cursor: 'default'
                }}>
                  <svg viewBox="0 0 20 20" fill="currentColor" className="roi-icon" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <div className="roi-metric-content">
                    <span className="roi-metric-label" style={{ color: '#374151' }}>Break-even Point</span>
                    <span className="roi-metric-value">
                      <AnimatedCounter value={results.breakEvenJobs} /> {results.breakEvenJobs === 1 ? 'job' : 'jobs'}
                    </span>
                  </div>
                </div>
              </div>

              {isPositiveROI && (
                <div className="roi-insight" style={{
                  animation: 'slideInLeft 0.5s ease-out 0.3s both'
                }}>
                  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <strong>Great potential!</strong> You only need {results.breakEvenJobs} new {results.breakEvenJobs === 1 ? 'job' : 'jobs'} per month to cover your subscription.
                    Everything beyond that is pure profit. With your estimate of {newJobsPerMonth} jobs,
                    you'd earn an extra {formatCurrency(results.annualProfit)} per year.
                  </div>
                </div>
              )}

              {!isPositiveROI && (
                <div className="roi-insight warning">
                  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    Consider adjusting your expectations or try a lower-tier plan. Remember, even 1-2 additional jobs per month can make a significant difference to your bottom line.
                  </div>
                </div>
              )}
            </div>

            <div className="roi-breakdown" style={{
              animation: 'fadeInUp 0.5s ease-out 0.2s both'
            }}>
              <h3>Annual Breakdown</h3>
              <div className="roi-breakdown-items">
                <div className="roi-breakdown-item">
                  <span className="breakdown-label">Additional annual revenue</span>
                  <span className="breakdown-value positive">
                    £<AnimatedCounter value={results.annualRevenue} duration={1000} />
                  </span>
                </div>
                <div className="roi-breakdown-item">
                  <span className="breakdown-label">Annual subscription cost</span>
                  <span className="breakdown-value">
                    £<AnimatedCounter value={results.annualCost} duration={1000} />
                  </span>
                </div>
                <div className="roi-breakdown-item total">
                  <span className="breakdown-label"><strong>Your net profit increase</strong></span>
                  <span className={`breakdown-value ${isPositiveROI ? 'positive' : 'negative'}`}>
                    <strong>£<AnimatedCounter value={results.annualProfit} duration={1000} /></strong>
                  </span>
                </div>
              </div>
            </div>

            <div className="roi-comparison" style={{
              backgroundColor: '#f8fafc',
              borderRadius: '12px',
              padding: '24px',
              marginTop: '24px',
              border: '1px solid #e2e8f0',
              animation: 'fadeInUp 0.5s ease-out 0.4s both'
            }}>
              <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '1.25rem', color: '#1e293b' }}>
                Compare to alternatives
              </h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div>
                    <strong style={{ color: '#1e293b' }}>Checkatrade</strong>
                    <div style={{ fontSize: '0.85rem', color: '#6B7280', marginTop: '2px' }}>
                      £60-£209/month + lead fees
                    </div>
                  </div>
                  <span style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '0.9rem' }}>Pay per lead</span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div>
                    <strong style={{ color: '#1e293b' }}>Bark</strong>
                    <div style={{ fontSize: '0.85rem', color: '#6B7280', marginTop: '2px' }}>
                      £5-£30 per lead (avg 5 leads = £75-£150)
                    </div>
                  </div>
                  <span style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '0.9rem' }}>Pay per lead</span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div>
                    <strong style={{ color: '#1e293b' }}>MyBuilder</strong>
                    <div style={{ fontSize: '0.85rem', color: '#6B7280', marginTop: '2px' }}>
                      £2-£25 per shortlist
                    </div>
                  </div>
                  <span style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '0.9rem' }}>Pay per lead</span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div>
                    <strong style={{ color: '#1e293b' }}>Traditional marketing agency</strong>
                    <div style={{ fontSize: '0.85rem', color: '#6B7280', marginTop: '2px' }}>
                      £300-£1,000/month
                    </div>
                  </div>
                  <span style={{ color: '#f59e0b', fontWeight: 'bold', fontSize: '0.9rem' }}>Variable</span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  backgroundColor: '#ecfccb',
                  borderRadius: '8px',
                  border: '2px solid #84CC16'
                }}>
                  <div>
                    <strong style={{ color: '#1e293b' }}>whoza.ai</strong>
                    <div style={{ fontSize: '0.85rem', color: '#4d7c0f', marginTop: '2px' }}>
                      From £59/month - predictable cost, no per-lead fees
                    </div>
                  </div>
                  <span style={{ color: '#16a34a', fontWeight: 'bold', fontSize: '0.9rem' }}>Fixed price</span>
                </div>
              </div>
              <p style={{
                marginTop: '16px',
                marginBottom: 0,
                fontSize: '0.9rem',
                color: '#6B7280',
                fontStyle: 'italic'
              }}>
                Unlike traditional lead generation platforms, whoza.ai builds your AI visibility for long-term growth without pay-per-lead costs.
              </p>
            </div>

            <div className="roi-cta" style={{
              animation: 'fadeInUp 0.5s ease-out 0.5s both'
            }}>
              <p className="roi-cta-text">
                Based on real results from our customers, these numbers are achievable. Most tradespeople see results within 8-10 weeks.
              </p>
              <a href="#pricing-plans" className="button button-large">
                Choose Your Plan
              </a>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .roi-metric:hover {
          transform: translateY(-2px);
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
