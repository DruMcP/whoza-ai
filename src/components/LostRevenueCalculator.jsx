import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function LostRevenueCalculator() {
  const [missedCalls, setMissedCalls] = useState(5);
  const [avgJobValue, setAvgJobValue] = useState(250);
  const [closeRate, setCloseRate] = useState(40);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    const el = document.getElementById('revenue-calculator');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const weeklyLost = missedCalls * avgJobValue * (closeRate / 100);
  const monthlyLost = weeklyLost * 4.3;
  const yearlyLost = weeklyLost * 52;

  const formatCurrency = (val) =>
    new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <section
      id="revenue-calculator"
      className={`revenue-calculator-section ${isVisible ? 'visible' : ''}`}
    >
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Quick Check</span>
          <h2>How Much Is Voicemail Costing You?</h2>
          <p>
            Most tradespeople miss 3–8 calls per week. Every missed call is a
            potential job going to a competitor.
          </p>
        </div>

        <div className="calculator-grid">
          {/* Inputs */}
          <div className="calculator-inputs">
            <div className="input-group">
              <div className="input-header">
                <label>Missed calls per week</label>
                <span className="input-value">{missedCalls}</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={missedCalls}
                onChange={(e) => setMissedCalls(Number(e.target.value))}
                className="range-slider"
              />
              <div className="range-labels">
                <span>1</span>
                <span>20+</span>
              </div>
            </div>

            <div className="input-group">
              <div className="input-header">
                <label>Average job value</label>
                <span className="input-value">
                  {formatCurrency(avgJobValue)}
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="2000"
                step="50"
                value={avgJobValue}
                onChange={(e) => setAvgJobValue(Number(e.target.value))}
                className="range-slider"
              />
              <div className="range-labels">
                <span>£50</span>
                <span>£2,000+</span>
              </div>
            </div>

            <div className="input-group">
              <div className="input-header">
                <label>Your close rate</label>
                <span className="input-value">{closeRate}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                step="5"
                value={closeRate}
                onChange={(e) => setCloseRate(Number(e.target.value))}
                className="range-slider"
              />
              <div className="range-labels">
                <span>10%</span>
                <span>90%</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="calculator-results">
            <div className="result-card">
              <span className="result-period">Every week</span>
              <span className="result-amount">{formatCurrency(weeklyLost)}</span>
              <span className="result-label">lost to voicemail</span>
            </div>

            <div className="result-card highlight">
              <span className="result-period">Every month</span>
              <span className="result-amount">
                {formatCurrency(monthlyLost)}
              </span>
              <span className="result-label">lost to voicemail</span>
            </div>

            <div className="result-card">
              <span className="result-period">Every year</span>
              <span className="result-amount">
                {formatCurrency(yearlyLost)}
              </span>
              <span className="result-label">lost to voicemail</span>
            </div>

            <div className="calculator-cta">
              <p className="cta-line">
                whoza.ai costs{' '}
                <strong>{formatCurrency(59)}</strong> per month.{' '}
                {monthlyLost > 500 ? (
                  <>
                    You could recover{' '}
                    <strong>
                      {formatCurrency(monthlyLost - 59)}
                      /mo
                    </strong>{' '}
                    in lost jobs.
                  </>
                ) : (
                  <>That's the price of a few missed calls.</>
                )}
              </p>
              <Link
                to="/start"
                className="btn btn-primary btn-lg"
              >
                Stop Losing Jobs — Start Free Trial
              </Link>
              <span className="cta-guarantee">
                14 days free · No card required · Cancel anytime
              </span>
            </div>
          </div>
        </div>

        {/* Social proof strip */}
        <div className="calculator-proof">
          <div className="proof-item">
            <strong>£2,400</strong>
            <span>average recovered per year</span>
          </div>
          <div className="proof-item">
            <strong>94%</strong>
            <span>of users keep whoza.ai after trial</span>
          </div>
          <div className="proof-item">
            <strong>4.9/5</strong>
            <span>average rating</span>
          </div>
        </div>
      </div>
    </section>
  );
}
