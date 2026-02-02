import { useState, useEffect } from 'react';
import { useLocalization } from '../contexts/LocalizationContext';

export default function ROICalculator() {
  const { formatPrice, getCurrencySymbol } = useLocalization();
  const [selectedTrade, setSelectedTrade] = useState('plumber');
  const [averageJobValue, setAverageJobValue] = useState(250);
  const [newJobsPerMonth, setNewJobsPerMonth] = useState(3);
  const [selectedPlan, setSelectedPlan] = useState('starter');
  const [showResults, setShowResults] = useState(false);

  const tradePresets = {
    plumber: { name: 'Plumber', value: 250 },
    electrician: { name: 'Electrician', value: 300 },
    roofer: { name: 'Roofer', value: 750 },
    builder: { name: 'Builder', value: 500 },
    heating: { name: 'Heating Engineer', value: 350 },
    hairSalon: { name: 'Hair Salon / Barber', value: 45 },
    beautySalon: { name: 'Beauty Salon', value: 65 },
    nailSalon: { name: 'Nail Salon', value: 50 },
    spa: { name: 'Spa / Massage', value: 80 },
    tattoo: { name: 'Tattoo / Piercing', value: 150 },
    makeup: { name: 'Makeup Artist', value: 120 },
    aesthetician: { name: 'Aesthetician / Skincare', value: 90 },
    other: { name: 'Other', value: 250 }
  };

  const planPrices = {
    starter: 19,
    pro: 39,
    max: 79
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
    return formatPrice(amount);
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
                <span>{getCurrencySymbol()}50</span>
                <span>{getCurrencySymbol()}1,000</span>
              </div>
            </div>
            <p className="field-hint" id="average-job-hint" style={{ color: '#6B7280' }}>Based on our data, most tradespeople charge {formatPrice(150)}-{formatPrice(500)} per job</p>
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
              <option value="starter">Improve - {formatPrice(59)}/month</option>
              <option value="pro">Pro - {formatPrice(39)}/month</option>
              <option value="max">Max - {formatPrice(79)}/month</option>
            </select>
          </div>
        </div>

        {showResults && (
          <div className="roi-results" role="region" aria-live="polite" aria-label="ROI calculation results">
            <div className={`roi-summary ${isPositiveROI ? 'positive' : 'negative'}`}>
              <div className="roi-summary-main">
                <div className="roi-metric-large">
                  <span className="roi-label">Your Monthly Net Gain</span>
                  <span className={`roi-value ${isPositiveROI ? 'positive' : 'negative'}`}>
                    {formatCurrency(results.netGain)}
                  </span>
                  <span className="roi-sublabel" style={{ color: '#6B7280' }}>
                    {formatCurrency(results.monthlyRevenue)} revenue - {formatCurrency(results.planCost)} subscription
                  </span>
                </div>
              </div>

              <div className="roi-metrics-grid">
                <div className="roi-metric">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="roi-icon" aria-hidden="true">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <div className="roi-metric-content">
                    <span className="roi-metric-label" style={{ color: '#374151' }}>Return on Investment</span>
                    <span className="roi-metric-value">{results.roi}%</span>
                  </div>
                </div>

                <div className="roi-metric">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="roi-icon" aria-hidden="true">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <div className="roi-metric-content">
                    <span className="roi-metric-label" style={{ color: '#374151' }}>Annual Profit</span>
                    <span className="roi-metric-value">{formatCurrency(results.annualProfit)}</span>
                  </div>
                </div>

                <div className="roi-metric">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="roi-icon" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <div className="roi-metric-content">
                    <span className="roi-metric-label" style={{ color: '#374151' }}>Break-even Point</span>
                    <span className="roi-metric-value">
                      {results.breakEvenJobs} {results.breakEvenJobs === 1 ? 'job' : 'jobs'}
                    </span>
                  </div>
                </div>
              </div>

              {isPositiveROI && (
                <div className="roi-insight">
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

            <div className="roi-breakdown">
              <h3>Annual Breakdown</h3>
              <div className="roi-breakdown-items">
                <div className="roi-breakdown-item">
                  <span className="breakdown-label">Additional annual revenue</span>
                  <span className="breakdown-value positive">{formatCurrency(results.annualRevenue)}</span>
                </div>
                <div className="roi-breakdown-item">
                  <span className="breakdown-label">Annual subscription cost</span>
                  <span className="breakdown-value">{formatCurrency(results.annualCost)}</span>
                </div>
                <div className="roi-breakdown-item total">
                  <span className="breakdown-label"><strong>Your net profit increase</strong></span>
                  <span className={`breakdown-value ${isPositiveROI ? 'positive' : 'negative'}`}>
                    <strong>{formatCurrency(results.annualProfit)}</strong>
                  </span>
                </div>
              </div>
            </div>

            <div className="roi-comparison" style={{
              backgroundColor: '#f8fafc',
              borderRadius: '12px',
              padding: '24px',
              marginTop: '24px',
              border: '1px solid #e2e8f0'
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
                      {formatPrice(60)}-{formatPrice(209)}/month + lead fees
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
                      {formatPrice(5)}-{formatPrice(30)} per lead (avg 5 leads = {formatPrice(75)}-{formatPrice(150)})
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
                      {formatPrice(2)}-{formatPrice(25)} per shortlist
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
                      {formatPrice(300)}-{formatPrice(1000)}/month
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
                      {formatPrice(59)}/month - predictable cost, no per-lead fees
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

            <div className="roi-cta">
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
    </div>
  );
}
