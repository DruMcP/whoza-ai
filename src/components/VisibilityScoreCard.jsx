import { useEffect, useState } from 'react';
import { visibilityScoreService } from '../services/visibilityScoreService';

export default function VisibilityScoreCard({ businessId }) {
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (businessId) {
      loadScore();
    }
  }, [businessId]);

  const loadScore = async () => {
    try {
      setLoading(true);
      const latestScore = await visibilityScoreService.getLatestScore(businessId);
      setScore(latestScore);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    if (score >= 40) return '#f97316';
    return '#ef4444';
  };

  const getScoreGrade = (score) => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    if (score >= 50) return 'D';
    return 'F';
  };

  const getPercentileLabel = (percentile) => {
    if (percentile >= 90) return 'Top 10%';
    if (percentile >= 75) return 'Top 25%';
    if (percentile >= 50) return 'Above Average';
    if (percentile >= 25) return 'Below Average';
    return 'Bottom 25%';
  };

  if (loading) {
    return (
      <div className="score-card loading">
        <div className="loading-spinner"></div>
        <p>Calculating your AI Visibility Score...</p>
      </div>
    );
  }

  if (!score) {
    return (
      <div className="score-card empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="48" height="48">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <h3>No Score Yet</h3>
        <p>Your first AI Visibility Score will be calculated soon</p>
      </div>
    );
  }

  const scoreColor = getScoreColor(score.overall_score);

  return (
    <div className="score-card">
      <div className="score-header">
        <div className="score-main">
          <div className="score-circle" style={{ borderColor: scoreColor }}>
            <span className="score-value" style={{ color: scoreColor }}>
              {score.overall_score}
            </span>
            <span className="score-max">/100</span>
          </div>
          <div className="score-info">
            <h2>AI Visibility Score</h2>
            <div className="score-grade" style={{ background: scoreColor }}>
              Grade: {getScoreGrade(score.overall_score)}
            </div>
            <p className="score-date">
              Last updated: {new Date(score.score_date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>

        <div className="score-stats">
          <div className="stat-item">
            <div className="stat-icon" style={{ background: score.month_over_month_change >= 0 ? '#10b981' : '#ef4444' }}>
              {score.month_over_month_change >= 0 ? (
                <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                  <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div>
              <span className="stat-value">{score.month_over_month_change > 0 ? '+' : ''}{score.month_over_month_change}</span>
              <span className="stat-label">vs last month</span>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon" style={{ background: '#3b82f6' }}>
              <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <div>
              <span className="stat-value">{getPercentileLabel(score.benchmark_percentile)}</span>
              <span className="stat-label">vs similar businesses</span>
            </div>
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
          style={{ transform: showDetails ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {showDetails && (
        <div className="score-breakdown">
          <h3>Score Breakdown</h3>

          <div className="score-category">
            <div className="category-header">
              <span className="category-name">Profile Completeness</span>
              <span className="category-score">
                {score.profile_completeness_score}/25
              </span>
            </div>
            <div className="category-bar">
              <div
                className="category-bar-fill"
                style={{
                  width: `${(score.profile_completeness_score / 25) * 100}%`,
                  background: getScoreColor((score.profile_completeness_score / 25) * 100),
                }}
              />
            </div>
          </div>

          <div className="score-category">
            <div className="category-header">
              <span className="category-name">Review Quality</span>
              <span className="category-score">
                {score.review_quality_score}/20
              </span>
            </div>
            <div className="category-bar">
              <div
                className="category-bar-fill"
                style={{
                  width: `${(score.review_quality_score / 20) * 100}%`,
                  background: getScoreColor((score.review_quality_score / 20) * 100),
                }}
              />
            </div>
          </div>

          <div className="score-category">
            <div className="category-header">
              <span className="category-name">Citation Presence</span>
              <span className="category-score">
                {score.citation_presence_score}/20
              </span>
            </div>
            <div className="category-bar">
              <div
                className="category-bar-fill"
                style={{
                  width: `${(score.citation_presence_score / 20) * 100}%`,
                  background: getScoreColor((score.citation_presence_score / 20) * 100),
                }}
              />
            </div>
          </div>

          <div className="score-category">
            <div className="category-header">
              <span className="category-name">Content Relevance</span>
              <span className="category-score">
                {score.content_relevance_score}/15
              </span>
            </div>
            <div className="category-bar">
              <div
                className="category-bar-fill"
                style={{
                  width: `${(score.content_relevance_score / 15) * 100}%`,
                  background: getScoreColor((score.content_relevance_score / 15) * 100),
                }}
              />
            </div>
          </div>

          <div className="score-category">
            <div className="category-header">
              <span className="category-name">Technical SEO</span>
              <span className="category-score">
                {score.technical_seo_score}/10
              </span>
            </div>
            <div className="category-bar">
              <div
                className="category-bar-fill"
                style={{
                  width: `${(score.technical_seo_score / 10) * 100}%`,
                  background: getScoreColor((score.technical_seo_score / 10) * 100),
                }}
              />
            </div>
          </div>

          <div className="score-category">
            <div className="category-header">
              <span className="category-name">Social Presence</span>
              <span className="category-score">
                {score.social_presence_score}/10
              </span>
            </div>
            <div className="category-bar">
              <div
                className="category-bar-fill"
                style={{
                  width: `${(score.social_presence_score / 10) * 100}%`,
                  background: getScoreColor((score.social_presence_score / 10) * 100),
                }}
              />
            </div>
          </div>

          {score.recommendations && score.recommendations.length > 0 && (
            <div className="score-recommendations">
              <h4>Recommendations to Improve Your Score</h4>
              {score.recommendations.slice(0, 3).map((rec, idx) => (
                <div key={idx} className={`recommendation priority-${rec.priority}`}>
                  <div className="recommendation-header">
                    <span className="recommendation-title">{rec.title}</span>
                    <span className={`recommendation-badge badge-${rec.priority}`}>
                      {rec.priority} priority
                    </span>
                  </div>
                  <p className="recommendation-description">{rec.description}</p>
                  <div className="recommendation-meta">
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
  );
}
