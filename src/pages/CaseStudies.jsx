import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { generateBreadcrumbSchema, getBaseUrl } from '../utils/schemaOrg';
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
        { label: 'AI Visibility Score', before: '34', after: '78', unit: '/100', improvement: 'Significant improvement' },
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
          focus: 'Foundation Phase',
          outcome: 'Updated website with modern, AI-friendly structure and completed Google Business profile with accurate service information and professional photos.'
        },
        {
          week: 'Weeks 3-6',
          focus: 'Authority Phase',
          outcome: 'Implemented systematic review collection from satisfied customers and created trade-specific content that demonstrated expertise in electrical services.'
        },
        {
          week: 'Weeks 7-10',
          focus: 'Visibility Phase',
          outcome: 'Optimized all digital assets for AI discoverability and reduced Google Ads spend by 60% while maintaining enquiry levels through organic AI visibility.'
        }
      ],
      note: 'James\'s strong existing reputation meant he could leverage customer reviews and testimonials more effectively than businesses starting from scratch.',
      timeInvested: '20 minutes per week'
    },
    results: {
      metrics: [
        { label: 'AI Visibility Score', before: '41', after: '82', unit: '/100', improvement: 'Significant improvement' },
        { label: 'Monthly Enquiries', before: '12', after: '31', unit: '', improvement: 'Significantly increased' },
        { label: 'Google Profile Views', before: '89', after: '412', unit: '/month', improvement: 'Strong growth' },
        { label: 'Online Reviews', before: '12', after: '47', unit: '', improvement: 'Significantly increased' }
      ],
      achievements: [
        'Appears in ChatGPT and Perplexity recommendations for electricians in Manchester',
        'Reduced Google Ads spend from £800/month to £320/month while growing enquiries',
        'Average review rating increased from 4.1 to 4.7 stars',
        'Website traffic from AI search sources increased by 340%',
        'Hired 2 additional electricians to handle increased workload'
      ],
      timeline: '10 weeks to see significant results'
    },
    quote: "Rex showed me exactly what was missing and gave me a clear plan. I was skeptical at first, but within 10 weeks I was getting enquiries from people who found me through AI search. I've cut my Google Ads spend by more than half and I'm busier than ever.",
    visualData: {
      scoreProgression: [41, 48, 55, 62, 68, 74, 79, 82],
      enquiriesProgression: [12, 15, 18, 22, 26, 28, 30, 31]
    }
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    role: 'Heating Engineer',
    location: 'Leeds',
    photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    businessName: 'Rodriguez Heating Solutions',
    established: '2018',
    teamSize: '2 employees',
    challenge: {
      headline: 'New Business, No Digital Foundation',
      description: 'Emma started her heating engineering business after working for a larger firm. She had excellent technical skills and customer service but lacked any online presence beyond a basic Facebook page. Potential customers couldn\'t find her when searching for heating engineers in Leeds.',
      painPoints: [
        'No website or professional online presence',
        'Only 3 reviews on Facebook, none on Google',
        'No visibility in AI search results',
        'Relied entirely on referrals from previous employer',
        'Competing against established firms with strong online presence'
      ]
    },
    solution: {
      description: 'Rex created a comprehensive digital foundation strategy for Emma\'s new business, prioritizing the most impactful actions for a business with no existing online presence.',
      approach: [
        {
          week: 'Weeks 1-4',
          focus: 'Foundation Phase',
          outcome: 'Created professional website, set up complete Google Business profile, and established presence on key trade directories with consistent business information.'
        },
        {
          week: 'Weeks 5-8',
          focus: 'Authority Phase',
          outcome: 'Implemented review collection system and created heating-specific content including seasonal maintenance guides and emergency response information.'
        },
        {
          week: 'Weeks 9-12',
          focus: 'Visibility Phase',
          outcome: 'Optimized all content for AI discoverability and built local partnerships with boiler manufacturers and estate agents for referral network.'
        }
      ],
      note: 'Starting from scratch meant Emma could build her digital presence correctly from the beginning, without having to fix legacy issues.',
      timeInvested: '25 minutes per week'
    },
    results: {
      metrics: [
        { label: 'AI Visibility Score', before: '12', after: '71', unit: '/100', improvement: 'Significant improvement' },
        { label: 'Monthly Enquiries', before: '3', after: '18', unit: '', improvement: 'Significantly increased' },
        { label: 'Google Profile Views', before: '0', after: '198', unit: '/month', improvement: 'New presence' },
        { label: 'Online Reviews', before: '3', after: '34', unit: '', improvement: 'Significantly increased' }
      ],
      achievements: [
        'First enquiry from AI search within 6 weeks of starting',
        'Now appears in ChatGPT responses for heating engineers in Leeds',
        'Built referral network with 2 boiler manufacturers and 3 estate agents',
        'Website receives consistent traffic from AI search sources',
        'Hired first employee to handle increased workload'
      ],
      timeline: '12 weeks to see significant results'
    },
    quote: "As a new business owner, I didn't know where to start with online marketing. Rex gave me a clear roadmap and made it manageable. I'm now getting enquiries from AI search and my calendar is full for the next 6 weeks.",
    visualData: {
      scoreProgression: [12, 22, 35, 45, 54, 62, 68, 71],
      enquiriesProgression: [3, 5, 8, 11, 14, 16, 17, 18]
    }
  }
];

export default function CaseStudies() {
  const { countryCode, getTerm } = useLocalization();
  const [displayedCaseStudies, setDisplayedCaseStudies] = useState(ukCaseStudies);

  const breadcrumbSchema = useMemo(() => generateBreadcrumbSchema([
    { name: 'Home', url: `${getBaseUrl()}/` },
    { name: 'Case Studies', url: `${getBaseUrl()}/case-studies/` }
  ]), []);

  const caseStudySchemas = useMemo(() => {
    return displayedCaseStudies.map(cs => ({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": `Whoza.ai Case Study: ${cs.name}`,
      "applicationCategory": "BusinessApplication",
      "offers": {
        "@type": "Offer",
        "price": "59",
        "priceCurrency": "GBP"
      },
      "review": {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": cs.name
        },
        "datePublished": "2025-01-01",
        "reviewBody": cs.quote,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5",
          "worstRating": "1"
        }
      }
    }));
  }, [displayedCaseStudies]);

  const schemas = [breadcrumbSchema, ...caseStudySchemas];

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
            {displayedCaseStudies.map((cs) => (
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
            <Link to="/competitor-analysis" className="button button-large">
              Get My Competitor Analysis
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}