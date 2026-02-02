import { Link } from 'react-router-dom';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import SampleReport from '../components/SampleReport';
import ECEBrandBadge from '../components/ECEBrandBadge';
import { generateBreadcrumbSchema, generateHowToSchema } from '../utils/schemaOrg';

export default function HowItWorks() {
  const [showReport, setShowReport] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showTaskDetails, setShowTaskDetails] = useState(false);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'How It Works', url: '/how-it-works' }
  ]);

  const howToSchema = generateHowToSchema({
    name: 'How to Improve Your AI Visibility with Whoza',
    description: 'Step-by-step guide to improving your business visibility in AI search results',
    totalTime: 'PT15M',
    steps: [
      { name: 'Tell us about your business', text: 'Answer a few simple questions about your business. No technical knowledge needed.' },
      { name: 'Rex studies your situation', text: 'Rex checks your current visibility across AI platforms and analyzes your competitors.' },
      { name: 'Get one task each week', text: 'Rex sends one clear, actionable task by email. You review and approve before completing it.' },
      { name: 'See your monthly score', text: 'Every month, Rex measures your visibility. Get a simple Visibility Confidence Score™ that shows if you\'re improving.' }
    ]
  });

  const schemas = [breadcrumbSchema, howToSchema];

  return (
    <>
      <SEO schemas={schemas} />
      <Header />

      <main id="main-content" role="main">
        <div className="container">
          <h1>How it works</h1>

          <div className="how-it-works-subtitle">
            <p>
              Rex handles your AI visibility one simple task at a time. You stay
              in control of everything.
            </p>
          </div>

          <h2>The four steps</h2>

          <div className="process-diagram">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                </svg>
              </div>
              <h3>Tell us about your business</h3>
              <p className="step-time">Takes 2 minutes</p>
              <p>Answer a few simple questions about your business. No technical knowledge needed.</p>
            </div>

            <div className="process-arrow">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>

            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <h3>Rex studies your situation</h3>
              <p className="step-time">Automated</p>
              <p>Rex checks your current visibility across AI platforms and analyzes your competitors. This creates your baseline Visibility Confidence Score™.</p>
            </div>

            <div className="process-arrow">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>

            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <h3>Get one task each week</h3>
              <p className="step-time">10-15 minutes per week</p>
              <p>Rex sends one clear, actionable task by email. You review and approve before completing it. Simple instructions included.</p>
            </div>

            <div className="process-arrow">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>

            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3v18h18" />
                  <path d="M18 17l-5-5-3 3-4-4" />
                </svg>
              </div>
              <h3>See your monthly score</h3>
              <p className="step-time">2 minutes to review</p>
              <p>Every month, Rex measures your visibility. Get a simple Visibility Confidence Score™ that shows if you're improving.</p>
            </div>
          </div>

          <div className="panel panel-success">
            <h3 style={{marginTop: 0}}>Total time commitment</h3>
            <ul>
              <li><strong>Setup:</strong> 10-15 minutes</li>
              <li><strong>Weekly tasks:</strong> 10-15 minutes</li>
              <li><strong>Monthly review:</strong> 5 minutes</li>
            </ul>
            <p style={{marginBottom: 0}}>
              That's roughly an hour per month to stay visible in AI search.
            </p>
          </div>

          <h2>Your Dashboard Preview</h2>

          <p style={{ fontSize: '18px', marginBottom: 'var(--spacing-2xl)' }}>
            After signing up, you'll have access to a simple dashboard where you can track your progress,
            view your weekly tasks, and watch your Visibility Confidence Score™ improve over time.
          </p>

          <div className="dashboard-preview-section">
            <div className="dashboard-mockup">
              <div className="dashboard-header-bar">
                <div className="dashboard-nav">
                  <button
                    className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                    aria-label="View overview tab"
                  >
                    Overview
                  </button>
                  <button
                    className={`nav-item ${activeTab === 'tasks' ? 'active' : ''}`}
                    onClick={() => setActiveTab('tasks')}
                    aria-label="View tasks tab"
                  >
                    Tasks
                  </button>
                  <button
                    className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}
                    onClick={() => setActiveTab('reports')}
                    aria-label="View reports tab"
                  >
                    Reports
                  </button>
                </div>
                <div className="dashboard-user">
                  <div className="user-avatar">JD</div>
                </div>
              </div>

              <div className="dashboard-content">
                {activeTab === 'overview' && (
                <div className="dashboard-grid">
                  <div className="dashboard-card score-card">
                    <div className="card-header">
                      <h3>Visibility Confidence Score™</h3>
                      <span className="score-badge positive">+12 this month</span>
                    </div>
                    <div className="score-display">
                      <div className="score-circle">
                        <svg viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8"/>
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="#22c55e"
                            strokeWidth="8"
                            strokeDasharray="283"
                            strokeDashoffset="70"
                            transform="rotate(-90 50 50)"
                          />
                        </svg>
                        <div className="score-value">
                          <span className="score-number">75</span>
                          <span className="score-max">/100</span>
                        </div>
                      </div>
                      <div className="score-trend">
                        <div className="mini-chart">
                          <div className="mini-bar" style={{ height: '40%' }}></div>
                          <div className="mini-bar" style={{ height: '48%' }}></div>
                          <div className="mini-bar" style={{ height: '55%' }}></div>
                          <div className="mini-bar" style={{ height: '63%' }}></div>
                          <div className="mini-bar" style={{ height: '68%' }}></div>
                          <div className="mini-bar" style={{ height: '75%' }}></div>
                        </div>
                        <p className="trend-label">6 month progress</p>
                      </div>
                    </div>
                  </div>

                  <div className="dashboard-card task-card">
                    <div className="card-header">
                      <h3>This Week's Task</h3>
                      <span className="task-status new">New</span>
                    </div>
                    <div className="task-content">
                      <h4>Add a customer success story to your website</h4>
                      <p>Write a brief case study about a recent customer project. Include the problem, your solution, and the results.</p>
                      <div className="task-meta">
                        <div className="task-time">
                          <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                          </svg>
                          <span>15 min</span>
                        </div>
                        <div className="task-impact">
                          <svg viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                          <span>High Impact</span>
                        </div>
                      </div>
                      <button
                        className="task-action-btn"
                        onClick={() => setShowTaskDetails(!showTaskDetails)}
                        aria-label="View task details for customer success story"
                        aria-expanded={showTaskDetails}
                      >
                        {showTaskDetails ? 'Hide Details' : 'View Task Details'}
                      </button>
                      {showTaskDetails && (
                        <div className="task-details-expanded" style={{
                          marginTop: 'var(--spacing-md)',
                          padding: 'var(--spacing-md)',
                          background: '#f9fafb',
                          borderRadius: '8px',
                          border: '1px solid #e5e7eb'
                        }}>
                          <h5 style={{ marginTop: 0, marginBottom: 'var(--spacing-sm)', fontSize: '14px', fontWeight: 600 }}>
                            Step-by-Step Instructions:
                          </h5>
                          <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.6' }}>
                            <li>Think of a recent project you completed that went well</li>
                            <li>Write a brief description (3-4 sentences) about the problem, your solution, and the outcome</li>
                            <li>Add this to your website's "Reviews" or "Projects" page</li>
                            <li>Take a screenshot and mark the task as complete</li>
                          </ol>
                          <p style={{
                            marginTop: 'var(--spacing-sm)',
                            marginBottom: 0,
                            fontSize: '13px',
                            color: 'var(--color-text-secondary)'
                          }}>
                            This helps AI systems understand the quality of work you deliver. Real customer stories build trust.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="dashboard-card history-card">
                    <div className="card-header">
                      <h3>Recent Activity</h3>
                    </div>
                    <div className="activity-list">
                      <div className="activity-item completed">
                        <div className="activity-icon">
                          <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <div className="activity-details">
                          <p className="activity-title">Updated Google Business Profile</p>
                          <p className="activity-date">3 days ago</p>
                        </div>
                      </div>
                      <div className="activity-item completed">
                        <div className="activity-icon">
                          <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <div className="activity-details">
                          <p className="activity-title">Published blog post about services</p>
                          <p className="activity-date">10 days ago</p>
                        </div>
                      </div>
                      <div className="activity-item completed">
                        <div className="activity-icon">
                          <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <div className="activity-details">
                          <p className="activity-title">Added service area information</p>
                          <p className="activity-date">17 days ago</p>
                        </div>
                      </div>
                      <div className="activity-item completed">
                        <div className="activity-icon">
                          <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <div className="activity-details">
                          <p className="activity-title">Created FAQ page</p>
                          <p className="activity-date">24 days ago</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="dashboard-card chart-card">
                    <div className="card-header">
                      <h3>Score History</h3>
                      <div className="chart-period">Last 6 months</div>
                    </div>
                    <div className="progress-chart">
                      <div className="chart-bars">
                        <div className="chart-bar-group">
                          <div className="chart-bar-value">51</div>
                          <div className="chart-bar" style={{ height: '51%' }}>
                            <div className="bar-fill"></div>
                          </div>
                          <div className="chart-bar-label">Jan</div>
                        </div>
                        <div className="chart-bar-group">
                          <div className="chart-bar-value">56</div>
                          <div className="chart-bar" style={{ height: '56%' }}>
                            <div className="bar-fill"></div>
                          </div>
                          <div className="chart-bar-label">Feb</div>
                        </div>
                        <div className="chart-bar-group">
                          <div className="chart-bar-value">59</div>
                          <div className="chart-bar" style={{ height: '59%' }}>
                            <div className="bar-fill"></div>
                          </div>
                          <div className="chart-bar-label">Mar</div>
                        </div>
                        <div className="chart-bar-group">
                          <div className="chart-bar-value">63</div>
                          <div className="chart-bar" style={{ height: '63%' }}>
                            <div className="bar-fill"></div>
                          </div>
                          <div className="chart-bar-label">Apr</div>
                        </div>
                        <div className="chart-bar-group">
                          <div className="chart-bar-value">68</div>
                          <div className="chart-bar" style={{ height: '68%' }}>
                            <div className="bar-fill"></div>
                          </div>
                          <div className="chart-bar-label">May</div>
                        </div>
                        <div className="chart-bar-group">
                          <div className="chart-bar-value">75</div>
                          <div className="chart-bar" style={{ height: '75%' }}>
                            <div className="bar-fill"></div>
                          </div>
                          <div className="chart-bar-label">Jun</div>
                        </div>
                      </div>
                      <div className="chart-footer">
                        <div className="chart-stat">
                          <span className="stat-label">Starting Score</span>
                          <span className="stat-value">51</span>
                        </div>
                        <div className="chart-stat">
                          <span className="stat-label">Current Score</span>
                          <span className="stat-value highlight">75</span>
                        </div>
                        <div className="chart-stat">
                          <span className="stat-label">Improvement</span>
                          <span className="stat-value positive">Improved</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                )}

                {activeTab === 'tasks' && (
                  <div className="dashboard-grid">
                    <div className="dashboard-card" style={{ gridColumn: '1 / -1' }}>
                      <div className="card-header">
                        <h3>Your Weekly Tasks</h3>
                        <span className="task-status new">3 Active</span>
                      </div>
                      <div style={{ padding: 'var(--spacing-lg)' }}>
                        <div style={{ marginBottom: 'var(--spacing-lg)', paddingBottom: 'var(--spacing-lg)', borderBottom: '1px solid #e5e7eb' }}>
                          <h4 style={{ marginTop: 0, marginBottom: 'var(--spacing-sm)' }}>Add a customer success story to your website</h4>
                          <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                            Status: <strong style={{ color: '#f59e0b' }}>In Progress</strong> • Due: This week
                          </p>
                        </div>
                        <div style={{ marginBottom: 'var(--spacing-lg)', paddingBottom: 'var(--spacing-lg)', borderBottom: '1px solid #e5e7eb' }}>
                          <h4 style={{ marginTop: 0, marginBottom: 'var(--spacing-sm)' }}>Update your Google Business hours</h4>
                          <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                            Status: <strong style={{ color: '#22c55e' }}>Ready to Start</strong> • Due: Next week
                          </p>
                        </div>
                        <div>
                          <h4 style={{ marginTop: 0, marginBottom: 'var(--spacing-sm)' }}>Add FAQ section to website</h4>
                          <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                            Status: <strong style={{ color: '#94a3b8' }}>Scheduled</strong> • Due: 2 weeks
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reports' && (
                  <div className="dashboard-grid">
                    <div className="dashboard-card" style={{ gridColumn: '1 / -1' }}>
                      <div className="card-header">
                        <h3>Monthly Reports</h3>
                        <span className="score-badge positive">6 Reports Available</span>
                      </div>
                      <div style={{ padding: 'var(--spacing-lg)' }}>
                        <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-md)', background: '#f9fafb', borderRadius: '8px' }}>
                            <div>
                              <h4 style={{ margin: 0, marginBottom: '4px', fontSize: '16px' }}>June 2024 Report</h4>
                              <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                                Score: <strong style={{ color: '#22c55e' }}>75/100</strong> (+12 from last month)
                              </p>
                            </div>
                            <button className="button-secondary" style={{ fontSize: '14px', padding: '8px 16px' }}>View Report</button>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-md)', background: '#f9fafb', borderRadius: '8px' }}>
                            <div>
                              <h4 style={{ margin: 0, marginBottom: '4px', fontSize: '16px' }}>May 2024 Report</h4>
                              <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                                Score: <strong style={{ color: '#22c55e' }}>68/100</strong> (+5 from last month)
                              </p>
                            </div>
                            <button className="button-secondary" style={{ fontSize: '14px', padding: '8px 16px' }}>View Report</button>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-md)', background: '#f9fafb', borderRadius: '8px' }}>
                            <div>
                              <h4 style={{ margin: 0, marginBottom: '4px', fontSize: '16px' }}>April 2024 Report</h4>
                              <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                                Score: <strong>63/100</strong> (+4 from last month)
                              </p>
                            </div>
                            <button className="button-secondary" style={{ fontSize: '14px', padding: '8px 16px' }}>View Report</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="dashboard-features">
              <h3>What You'll Get Access To</h3>
              <ul className="feature-list">
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span><strong>Real-time visibility tracking</strong> updated monthly with your current Visibility Confidence Score™</span>
                </li>
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span><strong>Weekly actionable tasks</strong> delivered straight to your dashboard (and email)</span>
                </li>
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span><strong>Complete task history</strong> so you can see everything you've accomplished</span>
                </li>
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span><strong>Progress charts</strong> showing your improvement over time with month-by-month comparisons</span>
                </li>
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span><strong>Detailed monthly reports</strong> with category breakdowns and personalized recommendations</span>
                </li>
              </ul>
            </div>
          </div>

          <h2>Why tasks instead of automation?</h2>

          <p>
            We could automate everything and post content on your behalf. But we
            don't, for three important reasons:
          </p>

          <ol>
            <li>
              <strong>You know your business best.</strong> Our suggestions are
              better when you review them with your local knowledge.
            </li>
            <li>
              <strong>Trust matters.</strong> Customers trust businesses that
              speak authentically. Fully automated posts often don't sound right.
            </li>
            <li>
              <strong>You stay in control.</strong> Your online presence belongs
              to you. You should approve everything that goes out.
            </li>
          </ol>

          <h2>What if I can't do a task?</h2>

          <p>
            That's fine. You can skip any task. Rex will send a different one
            next week.
          </p>

          <p>
            The tasks are recommendations, not requirements. You're always in
            charge.
          </p>

          <h2>Understanding Your Visibility Confidence Score™</h2>

          <p>
            Each month, you'll receive a detailed report showing your Visibility Confidence Score™.
            This score measures how easily potential customers can find your business when
            using AI-powered search tools like ChatGPT, Perplexity AI, and Google's AI features.
          </p>

          <div className="sample-report-showcase">
            <div className="sample-report-preview">
              <div className="sample-report-mockup">
                <div className="mockup-header">
                  <div className="mockup-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="mockup-title">Visibility Confidence Score™ Report</div>
                </div>
                <div className="mockup-content">
                  <div className="mockup-score-badge">
                    <div className="mockup-score">78</div>
                    <div className="mockup-score-label">/100</div>
                  </div>
                  <div className="mockup-bars">
                    <div className="mockup-bar" style={{ width: '85%' }}></div>
                    <div className="mockup-bar" style={{ width: '72%' }}></div>
                    <div className="mockup-bar" style={{ width: '82%' }}></div>
                    <div className="mockup-bar" style={{ width: '76%' }}></div>
                    <div className="mockup-bar" style={{ width: '68%' }}></div>
                  </div>
                  <div className="mockup-chart">
                    <div className="mockup-chart-bar" style={{ height: '34%' }}></div>
                    <div className="mockup-chart-bar" style={{ height: '42%' }}></div>
                    <div className="mockup-chart-bar" style={{ height: '51%' }}></div>
                    <div className="mockup-chart-bar" style={{ height: '58%' }}></div>
                    <div className="mockup-chart-bar" style={{ height: '64%' }}></div>
                    <div className="mockup-chart-bar" style={{ height: '71%' }}></div>
                    <div className="mockup-chart-bar" style={{ height: '75%' }}></div>
                    <div className="mockup-chart-bar" style={{ height: '78%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="sample-report-details">
              <h3>What's in Your Report</h3>
              <ul className="report-features">
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Your overall Visibility Confidence Score™ (0-100)</span>
                </li>
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Week-by-week progress tracking</span>
                </li>
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Breakdown across 5 ECE pillars: Clarity, Consensus, Answerability, Safety, Context</span>
                </li>
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Specific achievements and milestones</span>
                </li>
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Prioritized next steps for improvement</span>
                </li>
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Easy-to-understand explanations</span>
                </li>
              </ul>

              <div style={{
                marginTop: 'var(--spacing-2xl)',
                padding: 'var(--spacing-lg)',
                background: '#f9fafb',
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}>
                <h4 style={{ marginTop: 0, marginBottom: 'var(--spacing-md)', fontSize: '18px' }}>The 5 Pillars Explained Simply:</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                  <li style={{ fontSize: '15px', lineHeight: '1.6' }}>
                    <strong style={{ color: '#65a30d' }}>Clarity:</strong> How easy it is for customers to understand what you do and where you work
                  </li>
                  <li style={{ fontSize: '15px', lineHeight: '1.6' }}>
                    <strong style={{ color: '#65a30d' }}>Consensus:</strong> Whether multiple sources online say the same good things about your business
                  </li>
                  <li style={{ fontSize: '15px', lineHeight: '1.6' }}>
                    <strong style={{ color: '#65a30d' }}>Answerability:</strong> How well your online presence answers common customer questions
                  </li>
                  <li style={{ fontSize: '15px', lineHeight: '1.6' }}>
                    <strong style={{ color: '#65a30d' }}>Safety:</strong> Whether customers can trust you based on reviews, credentials, and transparency
                  </li>
                  <li style={{ fontSize: '15px', lineHeight: '1.6' }}>
                    <strong style={{ color: '#65a30d' }}>Context:</strong> How relevant your business is to local searches in your area
                  </li>
                </ul>
              </div>

              <button onClick={() => setShowReport(true)} className="button button-large" aria-label="View sample Visibility Confidence Score™ report">
                <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: '20px', height: '20px', marginRight: '8px' }} aria-hidden="true" focusable="false">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                View Sample Report
              </button>
              <p className="sample-report-note">See what your monthly report will look like</p>
            </div>
          </div>

          <div style={{ marginTop: 'var(--spacing-3xl)', textAlign: 'center' }}>
            <ECEBrandBadge style={{ marginBottom: 'var(--spacing-lg)' }} />
            <Link to="/start" className="button button-large">
              Get started
            </Link>
            <p style={{ marginTop: 'var(--spacing-md)' }}>
              <Link to="/pricing">View pricing</Link> · <Link to="/trust">Trust and privacy</Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />

      {showReport && <SampleReport onClose={() => setShowReport(false)} />}
    </>
  );
}
