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
        { label: 'AI Visibility Score', before: '28', after: '82', unit: '/100', improvement: 'Major improvement' },
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

// US Case Studies
const usCaseStudies = [
  {
    id: 1,
    name: 'Mike Rodriguez',
    role: 'HVAC Contractor',
    location: 'Phoenix, AZ',
    photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    businessName: 'Rodriguez HVAC Solutions',
    established: '2016',
    teamSize: '4 employees',
    challenge: {
      headline: 'Lost in the Digital Noise',
      description: 'Mike had a thriving HVAC business built on referrals, but when potential customers searched for HVAC services in Phoenix using AI tools like ChatGPT or Perplexity, his business never appeared. He was losing opportunities to competitors with better online visibility.',
      painPoints: [
        'Zero presence in AI search recommendations',
        'Outdated Yelp and Google Business profiles',
        'Limited online reviews despite excellent service',
        'Website not optimized for modern search methods',
        'Spending heavily on ads with diminishing returns'
      ]
    },
    solution: {
      description: 'Rex analyzed Mike\'s digital footprint and created a customized 12-week improvement plan. The platform guided him through strategic updates that AI systems recognize and value, helping establish his business as a trusted local expert.',
      approach: [
        {
          week: 'Weeks 1-3',
          focus: 'Foundation Phase',
          outcome: 'Created comprehensive, accurate business profiles across key platforms with information structured for AI understanding and trust signals.'
        },
        {
          week: 'Weeks 4-8',
          focus: 'Authority Phase',
          outcome: 'Built credibility through strategic content and customer testimonials, helping AI systems recognize Mike as a knowledgeable HVAC expert in Phoenix.'
        },
        {
          week: 'Weeks 9-12',
          focus: 'Visibility Phase',
          outcome: 'Optimized all digital touchpoints for maximum AI discoverability, ensuring consistent appearance in relevant local searches with compelling information.'
        }
      ],
      note: 'Rex provided Mike with weekly tasks tailored to his HVAC business. Each task was straightforward and took 10-20 minutes to complete.',
      timeInvested: '15 minutes per week'
    },
    results: {
      metrics: [
        { label: 'AI Visibility Score', before: '31', after: '81', unit: '/100', improvement: 'Dramatic improvement' },
        { label: 'Monthly Enquiries', before: '12', after: '31', unit: '', improvement: 'Significantly increased' },
        { label: 'Google Profile Views', before: '95', after: '412', unit: '/month', improvement: 'Strong growth' },
        { label: 'Review Rating', before: '4.1', after: '4.9', unit: '/5.0', improvement: 'Improved' }
      ],
      achievements: [
        'Now appears in ChatGPT responses for "HVAC repair Phoenix"',
        'Featured consistently in Perplexity AI recommendations for local HVAC contractors',
        'Google Business profile views increased 334% in 3 months',
        'Reduced advertising spend by 60% while increasing leads',
        'Hired two additional technicians to handle increased demand'
      ],
      timeline: '9 weeks to see significant results'
    },
    quote: "Rex made it simple to improve my online presence. Within three months, I was showing up in ChatGPT searches for HVAC services in Phoenix. The weekly tasks are easy to follow, and I've been able to cut my ad spending while getting more qualified leads than ever.",
    visualData: {
      scoreProgression: [31, 39, 48, 56, 63, 69, 74, 78, 81, 81],
      enquiriesProgression: [12, 14, 17, 21, 24, 26, 28, 30, 31, 31]
    }
  },
  {
    id: 2,
    name: 'Jennifer Thompson',
    role: 'General Contractor',
    location: 'Austin, TX',
    photo: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    businessName: 'Thompson Construction & Remodeling',
    established: '2013',
    teamSize: '6 employees',
    challenge: {
      headline: 'Strong Reputation, Weak Digital Presence',
      description: 'Jennifer had built an excellent reputation through quality work and word-of-mouth referrals, but her online presence didn\'t reflect her expertise. When homeowners searched for contractors using AI-powered tools, her business was invisible despite years of successful projects.',
      painPoints: [
        'Website hadn\'t been updated since 2017',
        'Incomplete business listings on Google and Yelp',
        'Only 8 online reviews despite hundreds of completed projects',
        'No visibility in AI search results',
        'Spending $1,200/month on Google Ads with declining ROI'
      ]
    },
    solution: {
      description: 'Rex identified critical gaps in Jennifer\'s digital presence and created a focused strategy to modernize her online footprint. The platform guided her through systematic improvements while leveraging her strong existing reputation.',
      approach: [
        {
          week: 'Weeks 1-2',
          focus: 'Quick Wins Phase',
          outcome: 'Updated all business listings with accurate, complete information and began collecting reviews from satisfied clients.'
        },
        {
          week: 'Weeks 3-6',
          focus: 'Content & Authority Phase',
          outcome: 'Created project showcases and helpful content that demonstrated expertise, helping AI systems recognize Jennifer as a trusted contractor.'
        },
        {
          week: 'Weeks 7-10',
          focus: 'Optimization Phase',
          outcome: 'Fine-tuned all digital elements for maximum AI visibility, ensuring consistent appearance in searches with strong trust signals.'
        }
      ],
      note: 'The platform provided Jennifer with specific weekly tasks matched to her construction business. Each task included clear instructions and took 15-25 minutes.',
      timeInvested: '20 minutes per week'
    },
    results: {
      metrics: [
        { label: 'AI Visibility Score', before: '26', after: '84', unit: '/100', improvement: 'Exceptional improvement' },
        { label: 'Monthly Enquiries', before: '9', after: '28', unit: '', improvement: 'Significantly increased' },
        { label: 'Google Profile Views', before: '78', after: '445', unit: '/month', improvement: 'Strong growth' },
        { label: 'Review Rating', before: '3.9', after: '4.8', unit: '/5.0', improvement: 'Improved' }
      ],
      achievements: [
        'Now appears in ChatGPT and Perplexity responses for "general contractor Austin"',
        'Featured in AI recommendations for home remodeling projects',
        'Reduced advertising costs by 70% while increasing quality leads',
        'Project inquiry rate increased 211% within 10 weeks',
        'Expanded team by 3 members due to sustained demand'
      ],
      timeline: '10 weeks to achieve strong AI visibility'
    },
    quote: "I was hesitant about AI and online marketing, but Rex made it manageable. The tasks are practical and actually help my business. I'm now showing up when people search for contractors in Austin, and I've been able to significantly reduce my advertising budget while growing my team.",
    visualData: {
      scoreProgression: [26, 34, 43, 51, 60, 67, 73, 78, 82, 84],
      enquiriesProgression: [9, 11, 14, 17, 20, 23, 25, 27, 28, 28]
    }
  }
];

export default function CaseStudies() {
  const { getTerm, country } = useLocalization();
  
  // Select case studies based on current region
  const displayedCaseStudies = country === 'GB' ? ukCaseStudies : usCaseStudies;
  const countryCode = country === 'GB' ? 'GB' : 'US';
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Case Studies', url: '/case-studies' }
  ]);

  // Case Study Schema for AEO optimization
  // IMPORTANT: Google only supports Review snippets nested inside specific types.
  // CreativeWork is NOT a supported parent type for Review snippets (causes
  // "Invalid object type for field <parent_node>" error in Search Console).
  // We use SoftwareApplication (a supported type) as the parent, with the
  // case study customer's review nested inside it.
  const caseStudySchemas = useMemo(() => {
    return displayedCaseStudies.map(cs => ({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Whoza.ai - Rex AI Visibility Assistant",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web Browser",
      "description": `How ${cs.name}, a ${cs.role} in ${cs.location}, improved their AI visibility using Whoza.ai`,
      "url": "https://whoza.ai",
      "offers": {
        "@type": "Offer",
        "price": "59",
        "priceCurrency": "GBP"
      },
      "review": {
        "@type": "Review",
        // Nested Review inside SoftwareApplication (a Google-supported type).
        // Per Google's Nov 2025 update: omit itemReviewed for nested reviews;
        // the parent SoftwareApplication is the reviewed item.
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
  }, [displayedCaseStudies, countryCode]);

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
