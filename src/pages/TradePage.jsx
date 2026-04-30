import { useParams, Link } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useLocalization } from '../contexts/LocalizationContext';
import { getTradeBySlug, getAllTrades } from '../data/trades';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { generateOrganizationSchema, generateBreadcrumbSchema, getBaseUrl } from '../utils/schemaOrg';

export default function TradePage() {
  const { tradeSlug } = useParams();
  const { getTerm, formatPrice, setCountry, isLoading, country } = useLocalization();

  // Auto-detect country if not already set, default to GB
  useEffect(() => {
    if (!country) {
      setCountry('GB');
    }
  }, [country, setCountry]);

  const trade = useMemo(() => getTradeBySlug(tradeSlug), [tradeSlug]);
  const allTrades = useMemo(() => getAllTrades(), []);
  const otherTrades = useMemo(() => 
    allTrades.filter(t => t.slug !== tradeSlug).slice(0, 6),
    [allTrades, tradeSlug]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-16">
          <div className="text-center">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!trade) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold mb-4">Trade Not Found</h1>
          <p className="mb-6">We couldn't find the trade you're looking for.</p>
          <Link to="/" className="btn btn-primary">Return Home</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const isUS = country === 'US';
  const tradeName = isUS ? trade.usName : trade.ukName;
  const stats = isUS ? trade.usStats : trade.ukStats;
  const peopleTerm = isUS ? 'contractors' : getTerm('tradespeople').toLowerCase();

  const orgSchema = generateOrganizationSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: trade.plural, url: `/trades/${trade.slug}` }
  ]);

  // Schema for AEO optimization
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `Whoza.ai - AI Visibility for ${trade.plural}`,
    "description": `Helping ${trade.plural} get found and recommended by AI search engines like ChatGPT and Google AI.`,
    "url": `${getBaseUrl()}/trades/${trade.slug}`,
    "areaServed": {
      "@type": "Country",
      "name": isUS ? "United States" : "United Kingdom"
    },
    "audience": {
      "@type": "BusinessAudience",
      "name": `${trade.plural}`
    },
    "priceRange": isUS ? "$$" : "££"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Why do ${trade.plural} need AI search optimization?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `More customers now ask AI assistants like ChatGPT and Google AI for trade recommendations instead of using traditional search. When someone asks "Who is the best ${trade.name.toLowerCase()} near me?" you want AI to recommend your business. Without AI search optimization, you're invisible to the fastest-growing customer acquisition channel.`
        }
      },
      {
        "@type": "Question",
        "name": `How does whoza.ai help ${trade.plural} get found in AI search?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Rex, your AI visibility assistant, analyses your business across all major AI platforms and sends one simple weekly task to improve your Entity Confidence Score. Tasks include optimizing your Google Business Profile, fixing directory inconsistencies, adding FAQ schema markup, and building review strategies. Each task takes 10-15 minutes and is designed specifically for non-technical trade business owners.`
        }
      },
      {
        "@type": "Question",
        "name": `How long until ${trade.plural} see results from AI search optimization?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Most ${peopleTerm} see their first AI mentions within 4 weeks. Your competitor position and visibility metrics update monthly, showing measurable progress across all 5 pillars: Clarity, Consensus, Answerability, Safety, and Context. Consistency is key — small weekly tasks compound into significant visibility gains over 90 days.`
        }
      },
      {
        "@type": "Question",
        "name": `How is AI search optimization different from traditional SEO for ${trade.plural}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Traditional SEO focuses on ranking high in Google's blue-link results. AI search optimization focuses on becoming the business that ChatGPT and Google AI name directly as the answer. Instead of competing for position #1 on a search page, you're competing to be the single recommended answer when someone asks AI for a ${trade.name.toLowerCase()}.`
        }
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={`AI Visibility for ${trade.plural} | Get Recommended by ChatGPT | Whoza.ai`}
        description={`Get your AI Visibility Score as a ${tradeName}. Join ${stats.tradespeople.toLocaleString()}+ ${peopleTerm} optimising their online presence. From ${formatPrice(59)}/month.`}
        schemas={[orgSchema, breadcrumbSchema, localBusinessSchema, faqSchema]}
      />
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="hero-section py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-6">
                {stats.tradespeople.toLocaleString()}+ {peopleTerm} already optimising
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                AI Visibility for {trade.plural}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-600 max-w-3xl">
                {trade.description}
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Link to="/competitor-analysis" className="btn btn-primary btn-lg">
                  Get My Competitor
                </Link>
                <Link to="/how-it-works" className="btn btn-secondary btn-lg">
                  How It Works
                </Link>
              </div>

              {/* Stats bar */}
              <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-gray-200">
                <div>
                  <div className="text-3xl font-bold text-blue-600">{stats.monthlySearches.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Monthly AI searches</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">{stats.avgJobsPerMonth}</div>
                  <div className="text-sm text-gray-500">Avg jobs per month</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">{stats.tradespeople.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">{peopleTerm} in {isUS ? 'the US' : 'the UK'}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Services */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Services AI Customers Search For
            </h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {trade.commonServices.map((service, i) => (
                <span key={i} className="px-4 py-2 bg-white rounded-full shadow-sm text-sm font-medium text-gray-700">
                  {service}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* AI Search Examples */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              What Customers Ask AI About {trade.plural}
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {trade.aiSearchExamples.map((example, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    AI
                  </div>
                  <p className="text-gray-700 italic">"{example}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pain Points & Solutions */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Challenges {trade.plural} Face (And How We Fix Them)
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-red-600 flex items-center gap-2">
                  <span className="text-2xl">⚠️</span> The Problem
                </h3>
                {trade.painPoints.map((point, i) => (
                  <div key={i} className="p-4 bg-white rounded-lg shadow-sm">
                    <p className="text-gray-700">{point}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-green-600 flex items-center gap-2">
                  <span className="text-2xl">✅</span> The Fix
                </h3>
                {trade.solutions.map((solution, i) => (
                  <div key={i} className="p-4 bg-white rounded-lg shadow-sm">
                    <p className="text-gray-700">{solution}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              How {trade.plural} Get Started
            </h2>
            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="font-bold mb-2">Get Your Score</h3>
                <p className="text-sm text-gray-600">Enter your business details and trade type</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="font-bold mb-2">See Your Analysis</h3>
                <p className="text-sm text-gray-600">Discover how visible you are to AI search engines</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="font-bold mb-2">Weekly Tasks</h3>
                <p className="text-sm text-gray-600">Receive simple tasks tailored for {trade.plural.toLowerCase()}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="font-bold mb-2">Win More Work</h3>
                <p className="text-sm text-gray-600">Watch your AI visibility and enquiries grow</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center">
              <div className="text-4xl text-blue-300 mb-4">"</div>
              <blockquote className="text-xl md:text-2xl font-medium text-gray-800 mb-6">
                {trade.testimonial.quote}
              </blockquote>
              <div className="text-gray-600">
                <span className="font-semibold">{trade.testimonial.author}</span>, {trade.testimonial.location}
                <br />
                <span className="text-sm">{trade.testimonial.trade}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              AI Search vs. Traditional SEO for {trade.plural}
            </h2>
            <div className="max-w-4xl mx-auto overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="p-4 text-left border border-gray-200">Feature</th>
                    <th className="p-4 text-left border border-gray-200">Traditional SEO</th>
                    <th className="p-4 text-left border border-gray-200 bg-blue-100">Whoza.ai (AEO)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Goal</td>
                    <td className="p-4 border border-gray-200">Rank high on Google Search</td>
                    <td className="p-4 border border-gray-200">Get named & recommended by AI</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Strategy</td>
                    <td className="p-4 border border-gray-200">Keywords & Backlinks</td>
                    <td className="p-4 border border-gray-200">Entity Confidence Engineering™</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Timeline</td>
                    <td className="p-4 border border-gray-200">6-12 months for results</td>
                    <td className="p-4 border border-gray-200">Visible impact in 14-30 days</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Effort</td>
                    <td className="p-4 border border-gray-200">Hours of content writing</td>
                    <td className="p-4 border border-gray-200">15 mins/week actionable tasks</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Cost</td>
                    <td className="p-4 border border-gray-200">{isUS ? '$800 - $2,000' : '£600 - £1,500'} / month</td>
                    <td className="p-4 border border-gray-200">From {formatPrice(59)} / month</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Other Trades */}
        {otherTrades.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">
                AI Visibility for Other Trades
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {otherTrades.map(otherTrade => (
                  <Link
                    key={otherTrade.slug}
                    to={`/trades/${otherTrade.slug}`}
                    className="btn btn-outline"
                  >
                    {otherTrade.plural}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Dominate AI Search as a {tradeName}?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join {stats.tradespeople.toLocaleString()}+ {peopleTerm} who are already winning more work with AI-optimised visibility.
            </p>
            <Link to="/competitor-analysis" className="btn bg-white text-blue-600 hover:bg-gray-100 btn-lg">
              Get Your Free Visibility Score
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
