import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { generateVideoObjectSchema, generateOrganizationSchema, generateBreadcrumbSchema, getBaseUrl } from '../utils/schemaOrg';

/**
 * Dedicated video watch page — required for Google Video indexing.
 * The video MUST be the primary content of the page.
 * This page exists specifically so Google can index the video.
 */
export default function VideoWatch() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleError = () => setVideoError(true);

  const videoSchema = generateVideoObjectSchema({
    name: 'How Whoza.ai Works — AI Search Optimization for Tradespeople',
    description: 'See how Rex, your AI visibility partner, helps tradespeople get found when customers ask ChatGPT, Google AI, and Perplexity for local services. Weekly 10-minute tasks that improve your AI visibility.',
    thumbnailUrl: `${getBaseUrl()}/og-image.png`,
    contentUrl: `${getBaseUrl()}/whoza-explainer.mp4`,
    uploadDate: '2026-04-24',
    duration: 'PT60S',
  });

  const orgSchema = generateOrganizationSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Video', url: '/video' }
  ]);

  return (
    <div className="min-h-screen bg-slate-950">
      <SEO
        title="How Whoza.ai Works — Video | AI Search Optimization for Tradespeople"
        description="Watch how Rex helps tradespeople get found in ChatGPT, Google AI, and Perplexity. Weekly 10-minute tasks. 60-second explainer video."
        schemas={[videoSchema, orgSchema, breadcrumbSchema]}
      />

      {/* Header */}
      <header className="py-4 px-6 bg-slate-900 border-b border-slate-800">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-white">
            Whoza<span className="text-green-400">.ai</span>
          </Link>
          <Link
            to="/competitor-analysis"
            className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg text-sm transition-colors"
          >
            Check Your Competitor
          </Link>
        </div>
      </header>

      {/* Video — PRIMARY content of the page */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center">
          How Whoza.ai Works
        </h1>
        <p className="text-slate-400 text-center mb-6">
          See how Rex helps your trade business get found in AI search — in under 2 minutes
        </p>

        {/* Video player — largest element on the page */}
        <div className="relative rounded-2xl overflow-hidden bg-black aspect-video shadow-2xl shadow-green-900/20 border border-slate-800 mb-8">
          {videoError ? (
            <div className="w-full h-full flex flex-col items-center justify-center text-white p-8">
              <svg className="w-16 h-16 text-slate-600 mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <p className="text-lg font-medium mb-2">Video unavailable</p>
              <p className="text-slate-400 text-sm">Please try refreshing the page</p>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                className="w-full h-full"
                controls={isPlaying}
                preload="metadata"
                playsInline
                poster="/og-image.png"
                onError={handleError}
              >
                <source src="/whoza-explainer.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {!isPlaying && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
                  onClick={handlePlay}
                  role="button"
                  tabIndex={0}
                  aria-label="Play video"
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handlePlay(); }}
                >
                  <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-green-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Video metadata — helps Google understand the video */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
            <p className="text-slate-500 text-sm mb-1">Duration</p>
            <p className="text-white font-semibold">under 2 minutes</p>
          </div>
          <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
            <p className="text-slate-500 text-sm mb-1">Published</p>
            <p className="text-white font-semibold">24 April 2026</p>
          </div>
          <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
            <p className="text-slate-500 text-sm mb-1">Category</p>
            <p className="text-white font-semibold">AI Search Optimization</p>
          </div>
        </div>

        {/* Video transcript — REQUIRED for Google Video indexing */}
        <section className="bg-slate-900 rounded-xl p-6 md:p-8 border border-slate-800 mb-10">
          <h2 className="text-xl font-bold text-white mb-4">What You'll Learn</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-slate-300 leading-relaxed mb-4">
              This video explains how Whoza.ai works to help tradespeople — plumbers, electricians, builders, roofers, heating engineers, and 50+ other trades — get found when customers ask AI assistants like ChatGPT, Google AI, and Perplexity for local services.
            </p>
            <ul className="text-slate-300 space-y-2 mb-4">
              <li>Why most trade businesses are invisible to AI search</li>
              <li>How Rex, your AI visibility partner, analyses your business</li>
              <li>Simple weekly 10-minute tasks that improve your visibility</li>
              <li>Real results from tradespeople already using Whoza.ai</li>
              <li>How to start your 14-day free trial with Rex</li>
            </ul>
            <p className="text-slate-300 leading-relaxed">
              If your business is not visible to AI, your business is invisible. Whoza.ai fixes that with simple, actionable tasks designed for non-technical business owners. No coding, no complex setup — just follow Rex's weekly guidance and watch your visibility grow.
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center pb-10">
          <p className="text-slate-400 mb-4">Ready to start your 14-day free trial?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/pricing"
              className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-lg transition-colors inline-flex items-center gap-2"
            >
              Start Your Free Trial
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              to="/how-it-works"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-lg transition-colors border border-slate-700"
            >
              See How It Works
            </Link>
          </div>
          <p className="text-slate-500 text-sm mt-3">No credit card required · Cancel anytime</p>
        </div>
      </main>
    </div>
  );
}
