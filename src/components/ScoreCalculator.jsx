import { useState } from 'react';
import { visibilityScoreService } from '../services/visibilityScoreService';
import { supabase } from '../lib/supabase';

export default function ScoreCalculator() {
  const [businessId, setBusinessId] = useState('');
  const [businessInfo, setBusinessInfo] = useState(null);
  const [calculatedScore, setCalculatedScore] = useState(null);
  const [calculating, setCalculating] = useState(false);
  const [message, setMessage] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const loadBusinessInfo = async () => {
    if (!businessId) {
      setMessage({ type: 'error', text: 'Please enter a business ID' });
      return;
    }

    try {
      setCalculating(true);
      setMessage(null);
      setCalculatedScore(null);

      const { data: profile } = await supabase
        .from('business_profiles')
        .select('*, users(*)')
        .eq('id', businessId)
        .single();

      if (!profile) {
        throw new Error('Business not found');
      }

      setBusinessInfo(profile);
      setMessage({ type: 'success', text: 'Business loaded successfully' });
    } catch (error) {
      // TODO: Review error handling: console.error('Error loading business:', error)
      setMessage({ type: 'error', text: error.message || 'Failed to load business' });
    } finally {
      setCalculating(false);
    }
  };

  const calculateScore = async () => {
    if (!businessId) {
      setMessage({ type: 'error', text: 'Please enter a business ID' });
      return;
    }

    try {
      setCalculating(true);
      setMessage(null);

      const score = await visibilityScoreService.calculateScore(businessId);
      setCalculatedScore(score);
      setShowDetails(true);
      setMessage({
        type: 'success',
        text: `Score calculated successfully: ${score.overall_score}/100`,
      });
    } catch (error) {
      // TODO: Review error handling: console.error('Error calculating score:', error)
      setMessage({ type: 'error', text: error.message || 'Failed to calculate score' });
    } finally {
      setCalculating(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    if (score >= 40) return '#f97316';
    return '#ef4444';
  };

  return (
    <div className="score-calculator">
      <div className="calculator-header">
        <h2>Visibility Confidence Score™ Calculator</h2>
        <p className="subtitle">
          Calculate comprehensive Visibility Confidence Scores™ based on multi-factor analysis
        </p>
      </div>

      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
          <button onClick={() => setMessage(null)} className="message-close">
            ×
          </button>
        </div>
      )}

      <div className="calculator-form">
        <div className="form-group">
          <label htmlFor="businessId">Business ID</label>
          <div className="input-with-button">
            <input
              id="businessId"
              type="text"
              value={businessId}
              onChange={(e) => setBusinessId(e.target.value)}
              placeholder="Enter business profile UUID"
            />
            <button
              onClick={loadBusinessInfo}
              disabled={calculating || !businessId}
              className="button button-secondary"
            >
              {calculating ? 'Loading...' : 'Load Business'}
            </button>
          </div>
        </div>
      </div>

      {businessInfo && (
        <div className="business-summary">
          <h3>Business Information</h3>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="summary-label">Business Name</span>
              <span className="summary-value">{businessInfo.users.business_name || 'Not set'}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Trade Type</span>
              <span className="summary-value">{businessInfo.users.trade_type || 'Not set'}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Service Area</span>
              <span className="summary-value">{businessInfo.users.service_area || 'Not set'}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Plan</span>
              <span className="summary-value">{businessInfo.users.plan || 'No plan'}</span>
            </div>
          </div>

          <button
            onClick={calculateScore}
            disabled={calculating}
            className="button button-primary button-large"
            style={{ marginTop: 'var(--spacing-md)' }}
          >
            {calculating ? 'Calculating Score...' : 'Calculate Visibility Confidence Score™'}
          </button>
        </div>
      )}

      {calculatedScore && (
        <div className="calculated-score-result">
          <div className="score-result-header">
            <div className="score-result-main">
              <div
                className="score-circle-large"
                style={{ borderColor: getScoreColor(calculatedScore.overall_score) }}
              >
                <span
                  className="score-value-large"
                  style={{ color: getScoreColor(calculatedScore.overall_score) }}
                >
                  {calculatedScore.overall_score}
                </span>
                <span className="score-max">/100</span>
              </div>
              <div>
                <h3>Overall Visibility Confidence Score™</h3>
                <p className="score-percentile">
                  {calculatedScore.benchmark_percentile}th percentile
                  {calculatedScore.month_over_month_change !== 0 && (
                    <span
                      className={`score-change-badge ${
                        calculatedScore.month_over_month_change > 0 ? 'positive' : 'negative'
                      }`}
                    >
                      {calculatedScore.month_over_month_change > 0 ? '+' : ''}
                      {calculatedScore.month_over_month_change} vs last month
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          <button
            className="score-toggle"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'Hide Details' : 'View Detailed Breakdown'}
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              width="16"
              height="16"
              style={{
                transform: showDetails ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
              }}
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {showDetails && (
            <div className="score-breakdown-detailed">
              <h4>Score Components</h4>

              <div className="score-components-grid">
                <div className="component-card">
                  <div className="component-header">
                    <span className="component-name">Profile Completeness</span>
                    <span className="component-score">
                      {calculatedScore.profile_completeness_score}/25
                    </span>
                  </div>
                  <div className="component-bar">
                    <div
                      className="component-bar-fill"
                      style={{
                        width: `${(calculatedScore.profile_completeness_score / 25) * 100}%`,
                        background: getScoreColor(
                          (calculatedScore.profile_completeness_score / 25) * 100
                        ),
                      }}
                    />
                  </div>
                  {calculatedScore.calculation_metadata?.profileScore?.checks && (
                    <ul className="component-checks">
                      {calculatedScore.calculation_metadata.profileScore.checks
                        .slice(0, 5)
                        .map((check, idx) => (
                          <li key={idx} className={check.present ? 'check-pass' : 'check-fail'}>
                            {check.field}: {check.present ? 'Yes' : 'Missing'} ({check.points}pts)
                          </li>
                        ))}
                    </ul>
                  )}
                </div>

                <div className="component-card">
                  <div className="component-header">
                    <span className="component-name">Review Quality</span>
                    <span className="component-score">
                      {calculatedScore.review_quality_score}/20
                    </span>
                  </div>
                  <div className="component-bar">
                    <div
                      className="component-bar-fill"
                      style={{
                        width: `${(calculatedScore.review_quality_score / 20) * 100}%`,
                        background: getScoreColor(
                          (calculatedScore.review_quality_score / 20) * 100
                        ),
                      }}
                    />
                  </div>
                </div>

                <div className="component-card">
                  <div className="component-header">
                    <span className="component-name">Citation Presence</span>
                    <span className="component-score">
                      {calculatedScore.citation_presence_score}/20
                    </span>
                  </div>
                  <div className="component-bar">
                    <div
                      className="component-bar-fill"
                      style={{
                        width: `${(calculatedScore.citation_presence_score / 20) * 100}%`,
                        background: getScoreColor(
                          (calculatedScore.citation_presence_score / 20) * 100
                        ),
                      }}
                    />
                  </div>
                </div>

                <div className="component-card">
                  <div className="component-header">
                    <span className="component-name">Content Relevance</span>
                    <span className="component-score">
                      {calculatedScore.content_relevance_score}/15
                    </span>
                  </div>
                  <div className="component-bar">
                    <div
                      className="component-bar-fill"
                      style={{
                        width: `${(calculatedScore.content_relevance_score / 15) * 100}%`,
                        background: getScoreColor(
                          (calculatedScore.content_relevance_score / 15) * 100
                        ),
                      }}
                    />
                  </div>
                </div>

                <div className="component-card">
                  <div className="component-header">
                    <span className="component-name">Technical SEO</span>
                    <span className="component-score">
                      {calculatedScore.technical_seo_score}/10
                    </span>
                  </div>
                  <div className="component-bar">
                    <div
                      className="component-bar-fill"
                      style={{
                        width: `${(calculatedScore.technical_seo_score / 10) * 100}%`,
                        background: getScoreColor(
                          (calculatedScore.technical_seo_score / 10) * 100
                        ),
                      }}
                    />
                  </div>
                </div>

                <div className="component-card">
                  <div className="component-header">
                    <span className="component-name">Social Presence</span>
                    <span className="component-score">
                      {calculatedScore.social_presence_score}/10
                    </span>
                  </div>
                  <div className="component-bar">
                    <div
                      className="component-bar-fill"
                      style={{
                        width: `${(calculatedScore.social_presence_score / 10) * 100}%`,
                        background: getScoreColor(
                          (calculatedScore.social_presence_score / 10) * 100
                        ),
                      }}
                    />
                  </div>
                </div>
              </div>

              {calculatedScore.recommendations && calculatedScore.recommendations.length > 0 && (
                <div className="score-recommendations">
                  <h4>Priority Actions</h4>
                  {calculatedScore.recommendations.map((rec, idx) => (
                    <div key={idx} className={`recommendation priority-${rec.priority}`}>
                      <div className="recommendation-header">
                        <span className="recommendation-title">{rec.title}</span>
                        <span className={`recommendation-badge badge-${rec.priority}`}>
                          {rec.priority}
                        </span>
                      </div>
                      <p className="recommendation-description">{rec.description}</p>
                      <div className="recommendation-meta">
                        <span>Category: {rec.category}</span>
                        <span>Impact: {rec.impact}</span>
                        <span>Effort: {rec.effort}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {!businessInfo && (
        <div className="calculator-empty">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            width="64"
            height="64"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          <h3>Ready to Calculate Scores</h3>
          <p>Enter a business ID above to calculate their Visibility Confidence Score™</p>
        </div>
      )}
    </div>
  );
}
