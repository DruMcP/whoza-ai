import { useParams, Link } from 'react-router-dom';
import { useLocalization } from '../contexts/LocalizationContext';
import { getCityBySlug, getAllUKCities } from '../data/ukCities';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

export default function LocationPageUK() {
  const { citySlug } = useParams();
  const { getTerm, formatPrice } = useLocalization();

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

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={`AI Visibility for ${getTerm('tradespeople')} in ${city.name}`}
        description={`Get your AI Visibility Score in ${city.name}. Join over ${city.tradespeople.toLocaleString()} ${getTerm('tradespeople')} optimising their online presence. ${formatPrice(59)} to start.`}
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
              <Link to="/free-score" className="btn btn-primary btn-lg">
                Get Your Free Score
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

        <section className="py-16">
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
          <section className="py-16 bg-gray-50">
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

        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Dominate AI Search in {city.name}?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join {getTerm('tradespeople')} across {city.region} who are already
              winning more work with AI-{getTerm('optimised')} visibility.
            </p>
            <Link to="/free-score" className="btn btn-primary btn-lg">
              Get Your Free Visibility Score
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
