import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { initScrollAnimations } from '../utils/animations';
import { useLocalization } from '../contexts/LocalizationContext';

const caseStudies = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Plumber',
    location: 'Birmingham',
    photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    businessName: 'Mitchell Plumbing Services',
    established: '2015',
    teamSize: '3 employees',
    challenge: {
      headline: 'Invisible in the AI Search Era',
      description: 'Sarah was getting most of her work through word-of-mouth and traditional directories, but new customers struggled to find her online. When people searched for plumbers in Birmingham using AI tools like ChatGPT or Perplexity, her business never appeared in the recommendations.',
      painPoints: [
        'Zero visibility in AI search results',
        'Outdated Google Business profile with missing information',
        'No strategy for online reviews',
        'Website content not optimized for AI crawlers',
        'Losing customers to competitors with better online presence'
      ]
    },
    solution: {
      description: 'Rex analyzed Sarah\'s online presence and created a personalized 12-week roadmap. The platform guided her through a structured improvement journey, automatically prioritizing and sequencing the most impactful changes for her specific situation.',
      approach: [
        {
          week: 'Weeks 1-3',
          focus: 'Foundation Phase',
          outcome: 'Established professional online presence across key platforms with complete, accurate business information that AI systems could easily understand and trust.'
        },
        {
          week: 'Weeks 4-8',
          focus: 'Authority Phase',
          outcome: 'Built credibility signals and created content that answered customer questions, helping AI systems recognize Sarah as a knowledgeable local expert.'
        },
        {
          week: 'Weeks 9-12',
          focus: 'Visibility Phase',
          outcome: 'Optimized all elements to maximize AI discoverability, ensuring Sarah\'s business appeared in relevant searches with compelling, trustworthy information.'
        }
      ],
      note: 'The platform provided Sarah with specific weekly tasks tailored to her business situation. Each task included step-by-step guidance and took 10-20 minutes to complete.',
      timeInvested: '15 minutes per week'
    },
    results: {
      metrics: [
        { label: 'Visibility Confidence Score™', before: '34', after: '78', unit: '/100', improvement: 'Significant improvement' },
        { label: 'Monthly Enquiries', before: '8', after: '24', unit: '', improvement: 'Significantly increased' },
        { label: 'Google Profile Views', before: '120', after: '336', unit: '/month', improvement: 'Strong growth' },
        { label: 'Review Rating', before: '4.2', after: '4.8', unit: '/5.0', improvement: 'Improved' }
      ],
      achievements: [
        'Now appears in ChatGPT responses for "emergency plumber Birmingham"',
        'Featured consistently in Perplexity AI recommendations for local plumbers',
        'Google Business profile views significantly increased within 2 months',
        'Average response time to enquiries reduced from 4 hours to 45 minutes',
        'Successfully hired additional team member due to increased demand'
      ],
      timeline: '8 weeks to see significant results'
    },
    quote: "Within two months of using Rex, I started appearing in ChatGPT responses for local plumbers. The weekly tasks are simple and actually make sense for my business. I've had to hire an additional plumber to keep up with the new enquiries.",
    visualData: {
      scoreProgression: [34, 42, 51, 58, 64, 71, 75, 78],
      enquiriesProgression: [8, 10, 14, 18, 20, 22, 24, 24]
    }
  },
  {
    id: 2,
    name: 'James Chen',
    role: 'Electrician',
    location: 'Manchester',
    photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    businessName: 'Chen Electrical Ltd',
    established: '2012',
    teamSize: '5 employees',
    challenge: {
      headline: 'Good Reputation, Poor Online Presence',
      description: 'James had built a solid reputation locally through quality work and referrals, but his digital presence hadn\'t kept pace with how customers now search for services. His website was outdated, his Google Business listing had missing information, and he wasn\'t appearing in any AI-powered search results.',
      painPoints: [
        'Website last updated in 2018',
        'Incomplete Google Business profile',
        'Only 12 online reviews despite hundreds of satisfied customers',
        'No presence in AI search recommendations',
        'Spending £800/month on Google Ads with declining returns'
      ]
    },
    solution: {
      description: 'Rex identified gaps in James\'s online presence and created a focused improvement strategy. The platform guided him through modernizing his digital footprint while leveraging his strong existing reputation.',
      approach: [
        {
          week: 'Weeks 1-2',
          focus: 'Quick Wins Phase',
          outcome: 'Addressed critical gaps in online presence, ensuring potential customers could find accurate, complete information across all major platforms.'
        },
        {
          week: 'Weeks 3-6',
          focus: 'Trust Signals Phase',
          outcome: 'Systematically activated James\'s existing customer relationships, transforming offline reputation into visible online proof points that AI systems recognize.'
        },
        {
          week: 'Weeks 7-10',
          focus: 'Competitive Edge Phase',
          outcome: 'Highlighted unique qualifications and expertise in ways that AI platforms prioritize, positioning James ahead of competitors in search recommendations.'
        }
      ],
      note: 'James received personalized weekly guidance on exactly what to improve and how to do it, with each action designed for maximum impact on AI visibility.',
      timeInvested: '12 minutes per week'
    },
    results: {
      metrics: [
        { label: 'Visibility Confidence Score™', before: '28', after: '82', unit: '/100', improvement: 'Major improvement' },
        { label: 'Monthly Enquiries', before: '15', after: '32', unit: '', improvement: 'Substantially increased' },
        { label: 'Website Traffic', before: '180', after: '301', unit: '/month', improvement: 'Grew steadily' },
        { label: 'Online Reviews', before: '12', after: '47', unit: '', improvement: 'Significantly increased' }
      ],
      achievements: [
        'Now regularly recommended by AI platforms when people search for "reliable electrician Manchester"',
        'Reduced Google Ads spend by half while maintaining lead volume',
        'Google Business profile now appears in most local searches',
        'Website traffic increased substantially from organic search',
        'Now receiving enquiries for higher-value commercial projects'
      ],
      timeline: '10 weeks to achieve strong AI visibility'
    },
    quote: "I was skeptical at first, but Rex's approach works. I approve each task before doing it, so I'm always in control. My Google Business profile looks professional now, and I've cut my advertising costs in half while getting more enquiries than ever.",
    visualData: {
      scoreProgression: [28, 35, 44, 52, 61, 68, 75, 79, 81, 82],
      enquiriesProgression: [15, 17, 19, 22, 25, 27, 29, 31, 32, 32]
    }
  },
  {
    id: 3,
    name: 'Tom Harrison',
    role: 'Heating Engineer',
    location: 'Leeds',
    photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    businessName: 'Harrison Heating & Gas Services',
    established: '2018',
    teamSize: 'Solo trader',
    challenge: {
      headline: 'Seasonal Business with Unpredictable Lead Flow',
      description: 'Tom\'s heating and boiler repair business was heavily seasonal, with a surge in winter and quiet summers. He had no consistent marketing strategy and relied entirely on emergency callouts and word-of-mouth. When potential customers searched for heating engineers using AI tools, his newer business wasn\'t established enough to appear.',
      painPoints: [
        'Extreme seasonal fluctuations in work',
        'No proactive marketing strategy',
        'Limited online reviews (only 6)',
        'Not appearing in AI search results',
        'Difficulty competing with established larger companies'
      ]
    },
    solution: {
      description: 'Rex developed a year-round visibility strategy specifically designed for seasonal businesses. The platform helped Tom build consistent AI presence that balanced peak demand periods with off-season service opportunities.',
      approach: [
        {
          week: 'Weeks 1-4',
          focus: 'Professional Identity Phase',
          outcome: 'Established Tom as a fully credentialed, trustworthy heating specialist with verifiable qualifications that AI systems could confidently recommend.'
        },
        {
          week: 'Weeks 5-8',
          focus: 'Year-Round Relevance Phase',
          outcome: 'Created content strategy that maintained visibility during slow periods, positioning Tom for both emergency and planned maintenance opportunities.'
        },
        {
          week: 'Weeks 9-12',
          focus: 'Market Leadership Phase',
          outcome: 'Developed strong local authority signals and customer proof that differentiated Tom from larger competitors in AI search results.'
        }
      ],
      note: 'The platform provided Tom with a customized action plan that accounted for his seasonal workload, with flexible tasks that could be completed year-round.',
      timeInvested: '20 minutes per week'
    },
    results: {
      metrics: [
        { label: 'Visibility Confidence Score™', before: '22', after: '76', unit: '/100', improvement: 'Substantial improvement' },
        { label: 'Summer Bookings', before: '4', after: '14', unit: '/month', improvement: 'Significantly increased' },
        { label: 'Annual Revenue', before: '£48k', after: '£76k', unit: '', improvement: 'Strong growth' },
        { label: 'Customer Reviews', before: '6', after: '34', unit: '', improvement: 'Significantly increased' }
      ],
      achievements: [
        'Now regularly mentioned when people search for "heating engineer Leeds"',
        'Reduced seasonal revenue fluctuation significantly',
        'Successfully transitioned from reactive emergency work to planned maintenance',
        'Featured in ChatGPT and Perplexity responses for boiler services',
        'Able to plan work schedule 4-6 weeks in advance'
      ],
      timeline: '6 weeks to see first meaningful results'
    },
    quote: "Rex has transformed my business. I used to dread the summer months when work dried up. Now I have steady bookings year-round because people find me when they search online. The weekly tasks are manageable even during my busiest periods.",
    visualData: {
      scoreProgression: [22, 31, 39, 48, 57, 64, 70, 73, 75, 76],
      enquiriesProgression: [4, 6, 8, 10, 11, 12, 13, 14, 14, 14]
    }
  }
];

export default function CaseStudies() {
  const { formatPrice } = useLocalization();
  useEffect(() => {
    initScrollAnimations();
  }, []);

  return (
    <>
      <Header />

      <main id="main-content" role="main">
        <section className="case-studies-hero">
          <div className="container">
            <div className="case-studies-hero-content">
              <h1>Real Success Stories</h1>
              <p className="hero-subtitle">
                Anonymised examples from real UK tradespeople who improved their AI visibility with Rex. Names and specific business details have been changed to protect privacy.
              </p>
              <div className="case-studies-stats">
                <div className="stat-badge">
                  <span className="stat-number">Measurable</span>
                  <span className="stat-label">Visibility improvements shown</span>
                </div>
                <div className="stat-badge">
                  <span className="stat-number">8-10 weeks</span>
                  <span className="stat-label">To see significant results</span>
                </div>
                <div className="stat-badge">
                  <span className="stat-number">15 mins</span>
                  <span className="stat-label">Average weekly time investment</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container">
          {caseStudies.map((study) => (
            <article key={study.id} className="case-study-detailed">
              <div className="case-study-header-detailed">
                <img
                  src={study.photo}
                  alt={study.name}
                  className="case-study-photo-large"
                  loading="lazy"
                />
                <div className="case-study-intro-detailed">
                  <div className="case-study-badges">
                    <span className="industry-badge">{study.role}</span>
                    <span className="location-badge">{study.location}</span>
                  </div>
                  <h2 className="case-study-title">{study.businessName}</h2>
                  <div className="case-study-meta-detailed">
                    <div className="meta-item">
                      <svg className="meta-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      <span>{study.name}, {study.role}</span>
                    </div>
                    <div className="meta-item">
                      <svg className="meta-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>{study.location}</span>
                    </div>
                    <div className="meta-item">
                      <svg className="meta-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span>Est. {study.established}</span>
                    </div>
                    <div className="meta-item">
                      <svg className="meta-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      <span>{study.teamSize}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="case-study-section-detailed challenge-section">
                <div className="section-icon challenge-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="section-content">
                  <h3>The Challenge</h3>
                  <p className="section-headline">{study.challenge.headline}</p>
                  <p className="section-description">{study.challenge.description}</p>
                  <div className="pain-points">
                    <h4>Key Issues:</h4>
                    <ul>
                      {study.challenge.painPoints.map((point, idx) => (
                        <li key={idx}>
                          <svg className="point-icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="case-study-section-detailed solution-section">
                <div className="section-icon solution-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="section-content">
                  <h3>The Solution</h3>
                  <p className="section-description">{study.solution.description}</p>

                  <div className="solution-timeline">
                    {study.solution.approach.map((phase, idx) => (
                      <div key={idx} className="timeline-phase">
                        <div className="phase-header">
                          <span className="phase-week">{phase.week}</span>
                          <span className="phase-focus">{phase.focus}</span>
                        </div>
                        <div className="phase-outcome">
                          <svg className="outcome-icon" viewBox="0 0 20 20" fill="currentColor" style={{ width: '20px', height: '20px', flexShrink: 0, color: '#84CC16', marginTop: '2px' }}>
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.6', color: '#4b5563' }}>
                            {phase.outcome}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {study.solution.note && (
                    <div className="solution-note" style={{
                      background: '#f0f9ff',
                      border: '1px solid #bae6fd',
                      borderRadius: '8px',
                      padding: '16px',
                      marginTop: '24px',
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'flex-start'
                    }}>
                      <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: '20px', height: '20px', color: '#0284c7', flexShrink: 0, marginTop: '2px' }}>
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#075985' }}>
                        <strong>How the platform works:</strong> {study.solution.note}
                      </p>
                    </div>
                  )}

                  <div className="time-investment">
                    <svg className="clock-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <strong>Time Investment:</strong> {study.solution.timeInvested}
                  </div>
                </div>
              </div>

              <div className="case-study-section-detailed results-section">
                <div className="section-icon results-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="section-content">
                  <h3>The Results</h3>

                  <div className="results-metrics-grid">
                    {study.results.metrics.map((metric, idx) => (
                      <div key={idx} className="metric-card card-hover">
                        <div className="metric-label">{metric.label}</div>
                        <div className="metric-comparison">
                          <div className="metric-before">
                            <span className="metric-value">{metric.before}</span>
                            <span className="metric-unit">{metric.unit}</span>
                          </div>
                          <svg className="arrow-icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          <div className="metric-after">
                            <span className="metric-value">{metric.after}</span>
                            <span className="metric-unit">{metric.unit}</span>
                          </div>
                        </div>
                        <div className="metric-improvement">{metric.improvement}</div>
                      </div>
                    ))}
                  </div>

                  <div className="achievements-list">
                    <h4>Key Achievements:</h4>
                    <ul>
                      {study.results.achievements.map((achievement, idx) => (
                        <li key={idx}>
                          <svg className="achievement-icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="results-timeline-badge">
                    <svg className="calendar-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <strong>Timeline:</strong> {study.results.timeline}
                  </div>
                </div>
              </div>

              <div className="case-study-quote-detailed">
                <svg className="quote-icon-large" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                </svg>
                <blockquote>{study.quote}</blockquote>
                <cite>
                  <strong>{study.name}</strong>
                  <span>{study.businessName}</span>
                </cite>
                <p style={{
                  fontSize: '13px',
                  color: '#6b7280',
                  marginTop: '12px',
                  marginBottom: 0,
                  fontStyle: 'italic',
                  textAlign: 'center'
                }}>
                  Results based on 12-week improvement journey
                </p>
              </div>
            </article>
          ))}

          <section className="case-studies-cta">
            <div className="cta-content">
              <h2>Ready to Write Your Success Story?</h2>
              <p>Join 200+ tradespeople who are improving their AI visibility and growing their businesses with Rex</p>
              <div className="cta-benefits">
                <div className="benefit-item">
                  <svg className="benefit-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>3-minute setup</span>
                </div>
                <div className="benefit-item">
                  <svg className="benefit-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>First results in 6-8 weeks</span>
                </div>
                <div className="benefit-item">
                  <svg className="benefit-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>15 minutes per week</span>
                </div>
              </div>
              <div className="cta-buttons">
                <Link to="/start" className="button button-large btn-hover">
                  Get Started Free
                </Link>
                <Link to="/how-it-works" className="button-secondary button-large btn-hover">
                  Learn How It Works
                </Link>
              </div>
              <p className="cta-note">
                <Link to="/pricing">View pricing</Link> · Improve from {formatPrice(59)}/month
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
