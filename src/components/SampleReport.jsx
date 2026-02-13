import { useEffect } from 'react';

const sampleData = {
  businessName: 'Mitchell Plumbing Services',
  owner: 'Sarah Mitchell',
  location: 'Birmingham, UK',
  industry: 'Plumbing',
  reportDate: 'December 2024',
  reportPeriod: '8 weeks',
  currentScore: 78,
  previousScore: 34,
  scoreChange: 44,
  percentChange: 129,

  categoryScores: [
    {
      category: 'Google Business Profile',
      score: 85,
      previousScore: 42,
      maxScore: 100,
      description: 'Completeness and optimization of your Google Business Profile',
      factors: [
        { name: 'Profile Completion', status: 'excellent', value: '100%' },
        { name: 'Photo Quality', status: 'excellent', value: '12 recent photos' },
        { name: 'Response Rate', status: 'good', value: '92%' },
        { name: 'Post Frequency', status: 'good', value: '2-3 per week' }
      ]
    },
    {
      category: 'AI Search Presence',
      score: 72,
      previousScore: 18,
      maxScore: 100,
      description: 'How often your business appears in AI-powered search results',
      factors: [
        { name: 'ChatGPT Mentions', status: 'excellent', value: 'Named first' },
        { name: 'Perplexity AI', status: 'good', value: 'Featured' },
        { name: 'Content Quality', status: 'good', value: 'High relevance' },
        { name: 'Citation Frequency', status: 'fair', value: 'Growing' }
      ]
    },
    {
      category: 'Online Reviews',
      score: 82,
      previousScore: 51,
      maxScore: 100,
      description: 'Quality, quantity, and recency of customer reviews',
      factors: [
        { name: 'Review Count', status: 'excellent', value: '34 reviews' },
        { name: 'Average Rating', status: 'excellent', value: '4.8/5.0' },
        { name: 'Review Recency', status: 'excellent', value: '3 this week' },
        { name: 'Response Rate', status: 'good', value: '88%' }
      ]
    },
    {
      category: 'Website Content',
      score: 76,
      previousScore: 28,
      maxScore: 100,
      description: 'Quality and AI-readability of your website content',
      factors: [
        { name: 'FAQ Section', status: 'excellent', value: 'Comprehensive' },
        { name: 'Service Descriptions', status: 'good', value: 'Detailed' },
        { name: 'Content Freshness', status: 'good', value: 'Updated weekly' },
        { name: 'Schema Markup', status: 'fair', value: 'Partial' }
      ]
    },
    {
      category: 'Local SEO Signals',
      score: 68,
      previousScore: 35,
      maxScore: 100,
      description: 'Local search optimization and citation consistency',
      factors: [
        { name: 'NAP Consistency', status: 'excellent', value: '100%' },
        { name: 'Local Citations', status: 'good', value: '18 directories' },
        { name: 'Location Pages', status: 'fair', value: '3 areas' },
        { name: 'Local Keywords', status: 'good', value: 'Optimized' }
      ]
    }
  ],

  weeklyProgress: [
    { week: 'Week 1', score: 34, activities: 3 },
    { week: 'Week 2', score: 42, activities: 4 },
    { week: 'Week 3', score: 51, activities: 5 },
    { week: 'Week 4', score: 58, activities: 4 },
    { week: 'Week 5', score: 64, activities: 5 },
    { week: 'Week 6', score: 71, activities: 4 },
    { week: 'Week 7', score: 75, activities: 3 },
    { week: 'Week 8', score: 78, activities: 4 }
  ],

  achievements: [
    'Started appearing in ChatGPT recommendations',
    'Google Business profile views significantly increased',
    'Received 22 new 5-star reviews',
    'Website traffic consistently grew month-over-month',
    'Added 15 service-related FAQs',
    'Completed all profile sections across 8 platforms'
  ],

  nextSteps: [
    { priority: 'high', task: 'Add more location-specific content pages', impact: '+5-8 points' },
    { priority: 'high', task: 'Implement full schema markup on website', impact: '+4-6 points' },
    { priority: 'medium', task: 'Expand to 2 additional service areas', impact: '+3-5 points' },
    { priority: 'medium', task: 'Create video content for services', impact: '+4-7 points' },
    { priority: 'low', task: 'Strengthen trust signals through local business directory listings', impact: '+2-4 points' }
  ]
};

export default function SampleReport({ onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'var(--color-success-600)';
    if (score >= 60) return 'var(--color-warning-600)';
    if (score >= 40) return 'var(--color-accent-600)';
    return 'var(--color-error-600)';
  };

  const getStatusColor = (status) => {
    const colors = {
      excellent: 'var(--color-success-600)',
      good: 'var(--color-primary-600)',
      fair: 'var(--color-warning-600)',
      poor: 'var(--color-error-600)'
    };
    return colors[status] || 'var(--color-text-muted)';
  };

  const getStatusIcon = (status) => {
    if (status === 'excellent') {
      return (
        <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: '16px', height: '16px', color: getStatusColor(status) }}>
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
    }
    if (status === 'good') {
      return (
        <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: '16px', height: '16px', color: getStatusColor(status) }}>
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: '16px', height: '16px', color: getStatusColor(status) }}>
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
      </svg>
    );
  };

  const maxScore = Math.max(...sampleData.weeklyProgress.map(w => w.score));

  return (
    <div className="report-modal-overlay" onClick={onClose}>
      <div className="report-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="report-header-bar no-print">
          <div className="report-header-bar-content">
            <h3>Sample AI Visibility Score Report</h3>
            <div className="report-actions">
              <button onClick={handlePrint} className="button-secondary button-sm">
                <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: '18px', height: '18px', marginRight: '6px' }}>
                  <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
                </svg>
                Download PDF
              </button>
              <button onClick={onClose} className="report-close-button">
                <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: '20px', height: '20px' }}>
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="report-container">
          <div className="report-page">
            <div className="report-brand-header">
              <div className="report-brand-info">
                <div className="report-logo-text">Rex</div>
                <div className="report-brand-tagline">AI Visibility Score Report</div>
              </div>
              <div className="report-meta">
                <div className="report-meta-item">{sampleData.reportDate}</div>
                <div className="report-meta-item">{sampleData.reportPeriod} Analysis</div>
              </div>
            </div>

            <div className="report-business-header">
              <h1>{sampleData.businessName}</h1>
              <div className="report-business-details">
                <span>{sampleData.owner}</span>
                <span className="report-separator">•</span>
                <span>{sampleData.industry}</span>
                <span className="report-separator">•</span>
                <span>{sampleData.location}</span>
              </div>
            </div>

            <div className="report-score-summary">
              <div className="report-score-main">
                <div className="report-score-badge">
                  <div className="report-score-circle" style={{ background: `conic-gradient(${getScoreColor(sampleData.currentScore)} ${sampleData.currentScore}%, #e5e7eb ${sampleData.currentScore}%)` }}>
                    <div className="report-score-inner">
                      <div className="report-score-value">{sampleData.currentScore}</div>
                      <div className="report-score-max">/100</div>
                    </div>
                  </div>
                  <div className="report-score-label">AI Visibility Score</div>
                </div>

                <div className="report-score-stats">
                  <div className="report-stat-card">
                    <div className="report-stat-label">Previous Score</div>
                    <div className="report-stat-value">{sampleData.previousScore}</div>
                  </div>
                  <div className="report-stat-card report-stat-highlight">
                    <div className="report-stat-label">Improvement</div>
                    <div className="report-stat-value">
                      +{sampleData.scoreChange}
                      <span className="report-stat-percent">({sampleData.percentChange}%)</span>
                    </div>
                  </div>
                  <div className="report-stat-card">
                    <div className="report-stat-label">Grade</div>
                    <div className="report-stat-value">
                      {sampleData.currentScore >= 80 ? 'A' : sampleData.currentScore >= 60 ? 'B' : sampleData.currentScore >= 40 ? 'C' : 'D'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="report-score-explanation">
                <h3>What This Score Means</h3>
                <p>Your AI Visibility Score measures how easily potential customers can find your business when using AI-powered search tools like ChatGPT, Perplexity AI, and Google's AI features.</p>
                <div className="report-score-ranges">
                  <div className="report-score-range">
                    <div className="report-range-bar" style={{ background: 'var(--color-success-600)' }}></div>
                    <div className="report-range-text">
                      <strong>80-100: Excellent</strong> - Your business appears consistently in AI search results
                    </div>
                  </div>
                  <div className="report-score-range">
                    <div className="report-range-bar" style={{ background: 'var(--color-warning-600)' }}></div>
                    <div className="report-range-text">
                      <strong>60-79: Good</strong> - Strong presence with room for optimization
                    </div>
                  </div>
                  <div className="report-score-range">
                    <div className="report-range-bar" style={{ background: 'var(--color-accent-600)' }}></div>
                    <div className="report-range-text">
                      <strong>40-59: Fair</strong> - Visible but inconsistent; improvement needed
                    </div>
                  </div>
                  <div className="report-score-range">
                    <div className="report-range-bar" style={{ background: 'var(--color-error-600)' }}></div>
                    <div className="report-range-text">
                      <strong>0-39: Poor</strong> - Rarely or never appears in AI search results
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="report-section">
              <h2 className="report-section-title">Progress Over Time</h2>
              <div className="report-chart-container">
                <div className="report-chart">
                  <div className="report-chart-y-axis">
                    <span>100</span>
                    <span>75</span>
                    <span>50</span>
                    <span>25</span>
                    <span>0</span>
                  </div>
                  <div className="report-chart-content">
                    <div className="report-chart-bars">
                      {sampleData.weeklyProgress.map((week, index) => (
                        <div key={index} className="report-chart-bar-container">
                          <div
                            className="report-chart-bar"
                            style={{
                              height: `${(week.score / maxScore) * 100}%`,
                              background: getScoreColor(week.score)
                            }}
                          >
                            <div className="report-chart-bar-value">{week.score}</div>
                          </div>
                          <div className="report-chart-bar-label">{week.week}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="report-section">
              <h2 className="report-section-title">Category Breakdown</h2>
              <p className="report-section-subtitle">Detailed analysis of the five key components that make up your AI Visibility Score</p>

              {sampleData.categoryScores.map((category, index) => (
                <div key={index} className="report-category">
                  <div className="report-category-header">
                    <div className="report-category-title">
                      <h3>{category.category}</h3>
                      <p>{category.description}</p>
                    </div>
                    <div className="report-category-scores">
                      <div className="report-category-score">
                        <div className="report-category-score-value" style={{ color: getScoreColor(category.score) }}>
                          {category.score}
                        </div>
                        <div className="report-category-score-label">Current</div>
                      </div>
                      <div className="report-category-arrow">→</div>
                      <div className="report-category-improvement">
                        <div className="report-category-improvement-value">+{category.score - category.previousScore}</div>
                        <div className="report-category-improvement-label">Gain</div>
                      </div>
                    </div>
                  </div>

                  <div className="report-category-progress">
                    <div className="report-progress-bar">
                      <div
                        className="report-progress-bar-fill"
                        style={{
                          width: `${(category.score / category.maxScore) * 100}%`,
                          background: getScoreColor(category.score)
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="report-category-factors">
                    {category.factors.map((factor, factorIndex) => (
                      <div key={factorIndex} className="report-factor">
                        <div className="report-factor-name">
                          {getStatusIcon(factor.status)}
                          <span>{factor.name}</span>
                        </div>
                        <div className="report-factor-value">{factor.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="report-section">
              <h2 className="report-section-title">Key Achievements</h2>
              <div className="report-achievements">
                {sampleData.achievements.map((achievement, index) => (
                  <div key={index} className="report-achievement">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {achievement}
                  </div>
                ))}
              </div>
            </div>

            <div className="report-section">
              <h2 className="report-section-title">Recommended Next Steps</h2>
              <p className="report-section-subtitle">Prioritized actions to further improve your AI Visibility Score</p>

              <div className="report-next-steps">
                {sampleData.nextSteps.map((step, index) => (
                  <div key={index} className="report-next-step">
                    <div className="report-next-step-header">
                      <span className={`report-priority-badge report-priority-${step.priority}`}>
                        {step.priority.charAt(0).toUpperCase() + step.priority.slice(1)} Priority
                      </span>
                      <span className="report-impact-badge">{step.impact}</span>
                    </div>
                    <div className="report-next-step-task">{step.task}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="report-footer">
              <div className="report-footer-content">
                <div className="report-footer-section">
                  <h4>How Your Score is Calculated</h4>
                  <p>Your AI Visibility Score is calculated using a proprietary algorithm that analyzes over 50 data points across five key categories. We continuously monitor your online presence and update your score weekly based on real-time data from Google, AI search platforms, and other authoritative sources.</p>
                </div>
                <div className="report-footer-section">
                  <h4>Report Frequency</h4>
                  <p>You receive a detailed report like this every week, showing your progress and new recommendations. Real-time score updates are available 24/7 in your portal dashboard.</p>
                </div>
              </div>
              <div className="report-footer-branding">
                <div className="report-footer-logo">Rex</div>
                <div className="report-footer-tagline">AI Visibility Management Platform</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
