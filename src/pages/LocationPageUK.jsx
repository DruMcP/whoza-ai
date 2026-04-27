import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocalization } from '../contexts/LocalizationContext';
import { getCityBySlug, getAllUKCities } from '../data/ukCities';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

export default function LocationPageUK() {
  const { citySlug } = useParams();
  const { getTerm, formatPrice, setCountry, isLoading, country } = useLocalization();

  useEffect(() => {
    setCountry('GB');
  }, [setCountry]);

  if (isLoading || country !== 'GB') {
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

  const city = getCityBySlug(citySlug);

  if (!city) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold mb-4">City Not Found</h1>
          <p className="mb-6">We couldn't find the city you're looking for.</p>
          <Link to="/" className="btn btn-primary">Return Home</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const allCities = getAllUKCities();
  const otherCities = allCities.filter(c => c.slug !== citySlug).slice(0, 5);

  // Schema for AEO optimization
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Whoza.ai ${city.name} - AI Visibility for ${getTerm('tradespeople')}`,
    "description": `Helping ${getTerm('tradespeople')} in ${city.name} get found and recommended by AI search engines like ChatGPT and Google AI.`,
    "url": `https://whoza.ai/uk/ai-visibility/${city.slug}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city.name,
      "addressRegion": city.region,
      "addressCountry": "GB"
    },
    "areaServed": {
      "@type": "City",
      "name": city.name
    },
    "priceRange": "££"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Why do ${getTerm('tradespeople')} in ${city.name} need AI search optimization?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `More customers in ${city.name} now ask AI assistants like ChatGPT and Google AI for local trade recommendations instead of using traditional search. When someone asks "Who is the best plumber or electrician in ${city.name}?" you want AI to recommend your business. Without AI search optimization, you're invisible to the fastest-growing customer acquisition channel in ${city.name}.`
        }
      },
      {
        "@type": "Question",
        "name": `How does whoza.ai help ${getTerm('tradespeople')} in ${city.name} get found in AI search?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Rex, your AI visibility assistant, analyses your business across all major AI platforms and sends one simple weekly task to improve your Entity Confidence Score. Tasks include optimizing your Google Business Profile, fixing directory inconsistencies, adding FAQ schema markup, and building review strategies. Each task takes 10-15 minutes and is designed specifically for non-technical trade business owners in ${city.name}.`
        }
      },
      {
        "@type": "Question",
        "name": `How long until ${getTerm('tradespeople')} in ${city.name} see results from AI search optimization?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Most ${getTerm('tradespeople')} in ${city.name} start seeing improved AI mentions within 4-6 weeks. The timeline depends on your starting Entity Confidence Score and how consistently you complete the weekly tasks. Businesses that follow Rex's full 12-week programme typically see a 3-5x increase in AI-driven customer enquiries within 90 days. Your ${city.name} competitor analysis shows your current baseline.`
        }
      },
      {
        "@type": "Question",
        "name": `What makes AI search optimization different from local SEO in ${city.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Traditional local SEO in ${city.name} focuses on ranking high in Google's blue-link results for keywords like "plumber ${city.name}". AI search optimization focuses on becoming the business that ChatGPT and Google AI name directly as the answer when someone asks "Who's the best plumber in ${city.name}?" Instead of competing for position #1 on a search page, you're competing to be the single recommended answer — which gets 60-80% of AI-driven customer enquiries.`
        }
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={`AI Visibility for ${getTerm('tradespeople')} in ${city.name}`}
        description={`Get your AI Visibility Score in ${city.name}. Join over ${city.tradespeople.toLocaleString()} ${getTerm('tradespeople')} optimising their online presence. ${formatPrice(59)} to start.`}
        schemas={[localBusinessSchema, faqSchema]}
      />
      <Header />

      <main className="flex-grow">
        <section className="hero-section py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI Visibility for {getTerm('tradespeople')} in {city.fullName}
            </h1>
            <p className="text-xl mb-8 max-w-3xl">
              {city.description}. Get your AI Visibility Score and start winning more clients today.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Link to="/competitor-analysis" className="btn btn-primary btn-lg">
                Get My Competitor
              </Link>
              <Link to="/how-it-works" className="btn btn-secondary btn-lg">
                How It Works
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Why {city.name} {getTerm('tradespeople')} Choose whoza.ai
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="card p-6">
                <h3 className="text-xl font-bold mb-4">Local Market Expertise</h3>
                <p>
                  Over {city.tradespeople.toLocaleString()} {getTerm('tradespeople')} in {city.region}.
                  Our AI understands your local market and competition.
                </p>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-bold mb-4">Affordable Pricing</h3>
                <p>
                  Plans starting from just {formatPrice(59)}/month.
                  No long-term contracts, cancel anytime.
                </p>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-bold mb-4">Proven Results</h3>
                <p>
                  {getTerm('tradespeople')} using whoza.ai see an average 40% increase in
                  online visibility within the first 30 days.
                </p>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Serving {city.name} and Beyond</h3>
              <p className="mb-6">
                Population: {city.population.toLocaleString()} |
                {getTerm('tradespeople')}: {city.tradespeople.toLocaleString()}
              </p>
            </div>
          </div>
        </section>

        {/* AI Search vs Traditional SEO Comparison Table - World Class Specificity */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              AI Search vs. Traditional SEO in {city.name}
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
                    <td className="p-4 border border-gray-200">£600 - £1,500 / month</td>
                    <td className="p-4 border border-gray-200">From {formatPrice(59)} / month</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              How It Works in {city.name}
            </h2>
            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="font-bold mb-2">Get Your Score</h3>
                <p className="text-sm">Enter your business details and {getTerm('postcode')}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="font-bold mb-2">Review Analysis</h3>
                <p className="text-sm">See how visible you are to AI search engines</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="font-bold mb-2">Get Tasks</h3>
                <p className="text-sm">Receive weekly {getTerm('optimising')} tasks</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="font-bold mb-2">Win More Work</h3>
                <p className="text-sm">Watch your visibility and {getTerm('bookings')} grow</p>
              </div>
            </div>
          </div>
        </section>

        {otherCities.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Also Serving These UK Cities
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {otherCities.map(otherCity => (
                  <Link
                    key={otherCity.slug}
                    to={`/uk/ai-visibility/${otherCity.slug}`}
                    className="btn btn-outline"
                  >
                    {otherCity.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Dominate AI Search in {city.name}?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join {getTerm('tradespeople')} across {city.region} who are already
              winning more work with AI-{getTerm('optimised')} visibility.
            </p>
            <Link to="/competitor-analysis" className="btn bg-white text-blue-600 hover:bg-gray-100 btn-lg">
              Get Your Free Visibility Score
            </Link>
          </div>
        </section>

        {/* FAQ Section — Visible content matching schema for AEO compliance */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Frequently Asked Questions About AI Visibility in {city.name}
            </h2>

            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="text-xl font-bold mb-3">
                  Why do {getTerm('tradespeople')} in {city.name} need AI search optimization?
                </h3>
                <p>
                  More customers in {city.name} now ask AI assistants like ChatGPT and Google AI for local trade recommendations instead of using traditional search. When someone asks "Who is the best plumber or electrician in {city.name}?" you want AI to recommend your business. Without AI search optimization, you're invisible to the fastest-growing customer acquisition channel in {city.name}.
                </p>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-bold mb-3">
                  How does whoza.ai help {getTerm('tradespeople')} in {city.name} get found in AI search?
                </h3>
                <p>
                  Rex, your AI visibility assistant, analyses your business across all major AI platforms and sends one simple weekly task to improve your Entity Confidence Score. Tasks include optimizing your Google Business Profile, fixing directory inconsistencies, adding FAQ schema markup, and building review strategies. Each task takes 10-15 minutes and is designed specifically for non-technical trade business owners in {city.name}.
                </p>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-bold mb-3">
                  How long until {getTerm('tradespeople')} in {city.name} see results from AI search optimization?
                </h3>
                <p>
                  Most {getTerm('tradespeople')} in {city.name} start seeing improved AI mentions within 4-6 weeks. The timeline depends on your starting Entity Confidence Score and how consistently you complete the weekly tasks. Businesses that follow Rex's full 12-week programme typically see a 3-5x increase in AI-driven customer enquiries within 90 days. Your {city.name} competitor analysis shows your current baseline.
                </p>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-bold mb-3">
                  What makes AI search optimization different from local SEO in {city.name}?
                </h3>
                <p>
                  Traditional local SEO in {city.name} focuses on ranking high in Google's blue-link results for keywords like "plumber {city.name}". AI search optimization focuses on becoming the business that ChatGPT and Google AI name directly as the answer when someone asks "Who's the best plumber in {city.name}?" Instead of competing for position #1 on a search page, you're competing to be the single recommended answer — which gets 60-80% of AI-driven customer enquiries.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
