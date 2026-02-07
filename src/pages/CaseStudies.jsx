import { Link } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { initScrollAnimations } from '../utils/animations';
import { generateBreadcrumbSchema } from '../utils/schemaOrg';
import { useLocalization } from '../contexts/LocalizationContext';

// UK Case Studies
const ukCaseStudies = [
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
  }
];

export default function CaseStudies() {
  const { getTerm, country } = useLocalization();
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Case Studies', url: '/case-studies' }
  ]);

  // Case Study Schema for AEO optimization
  const caseStudySchemas = useMemo(() => {
    return ukCaseStudies.map(cs => ({
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": `${cs.role} Case Study: ${cs.name} in ${cs.location}`,
      "description": cs.challenge.description,
      "author": {
        "@type": "Organization",
        "name": "Whoza.ai"
      },
      "about": {
        "@type": "LocalBusiness",
        "name": cs.businessName,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": cs.location,
          "addressCountry": "GB"
        }
      },
      "review": {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": cs.name
        },
        "reviewBody": cs.quote,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        }
      }
    }));
  }, []);

  const schemas = [breadcrumbSchema, ...caseStudySchemas];

  useEffect(() => {
    initScrollAnimations();
  }, []);

  return (
    <>
      <SEO 
        title={`Success Stories | AI Visibility for ${getTerm('tradespeople')}`}
        description={`Read real-world case studies of ${getTerm('tradespeople')} who improved their AI visibility and won more work with Whoza.ai.`}
        schemas={schemas}
      />
      <Header />

      <main id="main-content" role="main">
        <div className="container">
          <div className="case-studies-header">
            <h1>Success Stories</h1>
            <p className="subtitle">
              See how real {getTerm('tradespeople')} are getting found and recommended by AI search engines.
            </p>
          </div>

          <div className="case-studies-grid">
            {ukCaseStudies.map((cs) => (
              <div key={cs.id} className="case-study-card">
                <div className="card-header">
                  <div className="author-info">
                    <img src={cs.photo} alt={cs.name} className="author-photo" />
                    <div>
                      <h3>{cs.name}</h3>
                      <p>{cs.role} · {cs.location}</p>
                    </div>
                  </div>
                  <div className="business-badge">{cs.businessName}</div>
                </div>

                <div className="card-body">
                  <div className="challenge-section">
                    <h4>The Challenge</h4>
                    <p>{cs.challenge.description}</p>
                    <ul className="pain-points">
                      {cs.challenge.painPoints.slice(0, 3).map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="results-preview">
                    <div className="metric">
                      <span className="label">Visibility Score</span>
                      <span className="value">{cs.results.metrics[0].before} → {cs.results.metrics[0].after}</span>
                    </div>
                    <div className="metric">
                      <span className="label">Monthly Leads</span>
                      <span className="value">+{Math.round((parseInt(cs.results.metrics[1].after) / parseInt(cs.results.metrics[1].before) - 1) * 100)}%</span>
                    </div>
                  </div>

                  <blockquote className="case-study-quote">
                    "{cs.quote.substring(0, 150)}..."
                  </blockquote>
                </div>

                <div className="card-footer">
                  <Link to={`/case-studies/${cs.id}`} className="button full-width">
                    Read Full Case Study
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="cta-section">
            <h2>Ready to be our next success story?</h2>
            <p>Get your free AI visibility score today and see where you stand.</p>
            <Link to="/free-score" className="button button-large">
              Get Your Free Score
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
