import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
    <motion.section
      id="revenue-calculator"
      className="revenue-calculator-section visible"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="section-header"
        >
          <span className="section-tag">Quick Check</span>
          <h2>How Much Is Voicemail Costing You?</h2>
          <p>
            Most tradespeople miss 3–8 calls per week. Every missed call is a
            potential job going to a competitor.
          </p>
        </motion.div>

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
              <span className="result-period">Weekly</span>
              <span className="result-amount">{formatCurrency(weeklyLost)}</span>
              <span className="result-label">missed revenue</span>
            </div>
            <div className="result-card">
              <span className="result-period">Monthly</span>
              <span className="result-amount">{formatCurrency(monthlyLost)}</span>
              <span className="result-label">missed revenue</span>
            </div>
            <div className="result-card highlight">
              <span className="result-period">Yearly</span>
              <span className="result-amount">{formatCurrency(yearlyLost)}</span>
              <span className="result-label">potential revenue lost</span>
            </div>

            <div className="calculator-cta">
              <p className="cta-line">
                With whoza.ai, <strong>Katie answers every call 24/7</strong> and
                books jobs while you work.
              </p>
              <Link to="/start" className="btn-primary">
                Start Free Trial
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <span className="cta-guarantee">14-day free trial. No credit card required.</span>
            </div>
          </div>
        </div>

        {/* Proof Strip */}
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
    </motion.section>
  );
}