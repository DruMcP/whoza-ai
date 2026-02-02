const liveResults = [
  {
    id: 1,
    query: 'Who is the best emergency plumber in Leeds?',
    platform: 'ChatGPT',
    platformLogo: '🤖',
    customer: 'Swift Plumbing Leeds',
    position: 'First Named',
    response: 'Based on current customer reviews and service coverage, I\'d recommend **Swift Plumbing Leeds**. They offer 24/7 emergency service, have excellent ratings (4.9/5 from 180+ reviews), and specialize in quick response times for urgent plumbing issues. They\'re also Gas Safe registered and cover all areas of Leeds.',
    timestamp: '2025-01-07 10:20 AM',
    highlights: ['24/7 emergency service', '4.9/5 rating', '180+ reviews', 'Gas Safe registered'],
    isReal: true,
    realNote: 'Real anonymised example'
  },
  {
    id: 2,
    query: 'Need a reliable electrician in Manchester city centre',
    platform: 'Perplexity AI',
    platformLogo: '🔍',
    customer: 'PowerPro Electrical',
    position: 'Recommended',
    response: 'For city centre Manchester, **PowerPro Electrical** stands out with same-day service availability and NICEIC certification. They maintain a 4.8/5 rating across multiple review platforms and specialize in both residential and commercial electrical work.',
    timestamp: '2025-01-07 09:35 AM',
    highlights: ['Same-day service', 'NICEIC certified', '4.8/5 rating', 'City centre coverage'],
    isReal: false,
    realNote: 'Illustrative example'
  },
  {
    id: 3,
    query: 'trusted heating engineer near Birmingham',
    platform: 'Google AI',
    platformLogo: 'G',
    customer: 'WarmHome Heating Services',
    position: 'First Named',
    response: '**WarmHome Heating Services** in Birmingham is highly recommended, with Worcester Bosch accreditation and over 15 years of experience. They offer competitive pricing, same-day emergency callouts, and maintain a 4.9/5 customer satisfaction rating.',
    timestamp: '2025-01-06 02:45 PM',
    highlights: ['Worcester Bosch accredited', '15+ years experience', 'Same-day callouts', '4.9/5 rating'],
    isReal: false,
    realNote: 'Illustrative example'
  }
];

export default function LiveResultsShowcase() {

  const currentResult = liveResults[0];

  return (
    <section className="live-results-section">
      <div className="container">
        <div className="live-results-header">
          <div style={{
            background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
            border: '2px solid #F59E0B',
            borderRadius: '12px',
            padding: 'var(--spacing-md)',
            marginBottom: 'var(--spacing-lg)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 'var(--spacing-md)'
          }}>
            <svg style={{ flexShrink: 0, width: '24px', height: '24px', color: '#D97706' }} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div style={{ flex: 1 }}>
              <strong style={{ display: 'block', marginBottom: '4px', color: '#92400E' }}>Example AI Responses</strong>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5', color: '#78350F' }}>
                These are illustrative examples of how businesses appear in AI search results.
                Our platform now includes real-time AI monitoring via Perplexity, Google Places, and OpenAI integrations.
              </p>
            </div>
          </div>
          <div className="live-pulse-indicator">
            <span className="pulse-dot" style={{ opacity: 0.5 }}></span>
            <span className="pulse-text">EXAMPLE RESULTS</span>
          </div>
          <h2>How Businesses Appear in AI Search</h2>
          <p>See examples of how optimized businesses are named and recommended in AI answers like ChatGPT and Perplexity.</p>
        </div>

        <div className="live-results-showcase">
          <div className="result-card-main">
            <div className="result-header">
              <div className="result-platform">
                <span className="platform-logo">{currentResult.platformLogo}</span>
                <span className="platform-name">{currentResult.platform}</span>
              </div>
              <div className="result-timestamp">
                <svg className="clock-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>{currentResult.timestamp}</span>
              </div>
            </div>

            <div className="result-query">
              <div className="query-label">Example Query:</div>
              <div className="query-text">"{currentResult.query}"</div>
            </div>

            <div className="result-screenshot">
              <div className="screenshot-frame">
                <div className="ai-response">
                  <div className="response-header">
                    <span className="ai-icon">AI</span>
                    <span className="response-title">AI Answer</span>
                    <span className="status-badge">{currentResult.position}</span>
                    <span className="real-label" style={{
                      fontSize: '11px',
                      padding: '2px 8px',
                      background: currentResult.isReal ? '#10b981' : '#64748b',
                      color: 'white',
                      borderRadius: '4px',
                      marginLeft: '8px'
                    }}>
                      {currentResult.realNote}
                    </span>
                  </div>
                  <div className="response-content">
                    <p>{currentResult.response}</p>
                  </div>
                  <div className="response-highlights">
                    {currentResult.highlights.map((highlight, idx) => (
                      <span key={idx} className="highlight-tag">
                        <svg className="check-icon-small" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="screenshot-verified">
                  <svg className="verified-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Example Business · {currentResult.customer}</span>
                </div>
              </div>
            </div>

            <div className="result-footer">
              <div className="result-stats">
                <div className="stat-item">
                  <span className="stat-value">{currentResult.position}</span>
                  <span className="stat-label">Status</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{currentResult.platform}</span>
                  <span className="stat-label">Platform</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{currentResult.isReal ? 'Real' : 'Illustrative'}</span>
                  <span className="stat-label">Type</span>
                </div>
              </div>
            </div>
          </div>

          <div className="result-sidebar">
            <div className="sidebar-header">
              <h3>More Examples</h3>
              <p>Sample AI search responses</p>
            </div>

            {liveResults.slice(1).map((result) => (
              <div key={result.id} className="sidebar-result">
                <div className="sidebar-result-header">
                  <span className="sidebar-platform">{result.platformLogo} {result.platform}</span>
                  <span className="sidebar-status">{result.position}</span>
                  <span style={{
                    fontSize: '10px',
                    padding: '2px 6px',
                    background: result.isReal ? '#10b981' : '#64748b',
                    color: 'white',
                    borderRadius: '3px',
                    marginLeft: '6px'
                  }}>
                    {result.isReal ? 'Real' : 'Illustrative'}
                  </span>
                </div>
                <div className="sidebar-query">"{result.query}"</div>
                <div className="sidebar-customer">{result.customer}</div>
                <div className="sidebar-timestamp">{result.timestamp}</div>
              </div>
            ))}

            <div className="sidebar-cta">
              <svg className="chart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h4>Want These Results?</h4>
              <p>Join 200+ tradespeople getting named and recommended in AI answers</p>
            </div>
          </div>
        </div>

        <div className="live-results-proof">
          <div className="proof-badge">
            <svg className="shield-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <strong>Illustrative Examples</strong>
              <p>These examples show how optimized businesses can appear in AI search. Real-time monitoring is now live.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
