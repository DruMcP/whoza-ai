import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import SampleReport from '../components/SampleReport';
import ECEBrandBadge from '../components/ECEBrandBadge';
import { generateBreadcrumbSchema, generateHowToSchema, generateOrganizationSchema } from '../utils/schemaOrg';

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
    description: 'Step-by-step guide to improving your business visibility in AI search results using Entity Confidence Engineering™.',
    totalTime: 'PT15M',
    steps: [
      { 
        name: 'Tell us about your business', 
        text: 'Answer a few simple questions about your business, including your services, locations, and unique selling points. No technical knowledge needed.' 
      },
      { 
        name: 'Rex studies your situation', 
        text: 'Rex (your AI assistant) checks your current visibility across AI platforms (ChatGPT, Google AI, Perplexity) and analyzes your competitors to create your baseline Visibility Confidence Score™.' 
      },
      { 
        name: 'Get one task each week', 
        text: 'Rex sends one clear, actionable task by email based on the 5 pillars of ECE. You review and approve before completing it using our simple instructions.' 
      },
      { 
        name: 'See your monthly score', 
        text: 'Every month, Rex measures your visibility improvements. Get a detailed Visibility Confidence Score™ report that shows exactly how your AI presence is growing.' 
      }
    ]
  });

  const orgSchema = generateOrganizationSchema();

  const schemas = [breadcrumbSchema, howToSchema, orgSchema];

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
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 6v6l4 2" />
                          </svg>
                          15 mins
                        </div>
                        <button className="button button-small" onClick={() => setActiveTab('tasks')}>View Details</button>
                      </div>
                    </div>
                  </div>
                </div>
                )}

                {activeTab === 'tasks' && (
                  <div className="dashboard-tasks-view">
                    <div className="tasks-header">
                      <h3>Your Tasks</h3>
                    </div>
                    <div className="task-item active">
                      <div className="task-checkbox"></div>
                      <div className="task-info">
                        <h4>Add a customer success story to your website</h4>
                        <p>Status: Available</p>
                      </div>
                      <div className="task-due">This week</div>
                    </div>
                    <div className="task-item completed">
                      <div className="task-checkbox checked">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <path d="M20 6L9 17L4 12" />
                        </svg>
                      </div>
                      <div className="task-info">
                        <h4>Verify your Google Business Profile details</h4>
                        <p>Status: Completed</p>
                      </div>
                      <div className="task-due">Last week</div>
                    </div>
                  </div>
                )}

                {activeTab === 'reports' && (
                  <div className="dashboard-reports-view">
                    <div className="reports-header">
                      <h3>Monthly Reports</h3>
                    </div>
                    <div className="report-item">
                      <div className="report-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                          <path d="M14 2v6h6" />
                          <path d="M16 13H8" />
                          <path d="M16 17H8" />
                          <path d="M10 9H8" />
                        </svg>
                      </div>
                      <div className="report-info">
                        <h4>February 2026 Report</h4>
                        <p>Score: 75 (+12)</p>
                      </div>
                      <button className="button button-small button-secondary">Download</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="features-grid-section">
            <div className="feature-highlight-card">
              <div className="feature-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                </svg>
              </div>
              <h3>AI-Powered Assistant (Rex)</h3>
              <p>Your dedicated AI employee who works 24/7 to analyze search trends and find visibility opportunities for your business.</p>
              <ul className="feature-bullets">
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span><strong>Weekly task generation</strong> tailored to your specific trade and location</span>
                </li>
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span><strong>Competitor monitoring</strong> to see how you rank against other local firms</span>
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
