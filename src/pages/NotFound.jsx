import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { SearchIcon } from '../components/icons/ui';

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    const metaRobots = document.querySelector("meta[name='robots']");
    if (!metaRobots) {
      const meta = document.createElement('meta');
      meta.name = 'robots';
      meta.content = 'noindex, nofollow';
      document.head.appendChild(meta);
    } else {
      metaRobots.setAttribute('content', 'noindex, nofollow');
    }

    document.title = '404 - Page Not Found | Whoza.ai';

    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
      metaDescription.setAttribute('content', 'The page you are looking for could not be found.');
    }

    return () => {
      if (metaRobots) {
        metaRobots.remove();
      }
    };
  }, []);

  return (
    <div className="page-container">
      <Header />
      <main id="main-content" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <div className="mb-8 inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
            <SearchIcon width={64} height={64} color="white" />
          </div>

          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            404
          </h1>

          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Page Not Found
          </h2>

          <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go Back
            </button>

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Return Home
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-300">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Popular Pages
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <Link
                to="/how-it-works"
                className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <h4 className="font-semibold text-gray-900 mb-1">How It Works</h4>
                <p className="text-sm text-gray-600">Learn about our process</p>
              </Link>

              <Link
                to="/pricing"
                className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <h4 className="font-semibold text-gray-900 mb-1">Pricing</h4>
                <p className="text-sm text-gray-600">View our plans</p>
              </Link>

              <Link
                to="/competitor-analysis"
                className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <h4 className="font-semibold text-gray-900 mb-1">Free Score</h4>
                <p className="text-sm text-gray-600">Get your visibility score</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
