import { useState, useRef } from 'react';
import { generateVideoObjectSchema } from '../utils/schemaOrg';
import SEO from './SEO';

/**
 * Explainer video section with VideoObject schema for LLM optimization.
 * Video is self-hosted for reliability and performance.
 */
export default function ExplainerVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  const VIDEO_SRC = '/whoza-explainer.mp4';
  const VIDEO_TITLE = 'How Whoza.ai Works - AI Search Optimization for Tradespeople';
  const VIDEO_DESC = 'See how Rex, your AI visibility assistant, helps UK tradespeople get found when customers ask ChatGPT, Google AI, and Perplexity for local services. Weekly 10-minute tasks that improve your AI visibility score.';

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVideoError = () => {
    setVideoError(true);
  };

  // VideoObject schema for LLM discovery
  const videoSchema = generateVideoObjectSchema({
    name: VIDEO_TITLE,
    description: VIDEO_DESC,
    thumbnailUrl: 'https://whoza.ai/og-image.png',
    contentUrl: `https://whoza.ai${VIDEO_SRC}`,
    uploadDate: '2026-04-24',
    duration: 'PT60S'
  });

  return (
    <section className="explainer-video-section">
      <SEO schemas={[videoSchema]} />
      <div className="container">
        <div className="explainer-video-header">
          <h2 className="gradient-text">See How Whoza.ai Works in 60 Seconds</h2>
          <p className="section-subtitle">
            Watch how Rex transforms your online visibility with simple, weekly tasks
          </p>
        </div>

        <div className="video-wrapper glass-card">
          <div className="video-container">
            <div className="relative rounded-2xl overflow-hidden bg-black aspect-video max-w-4xl mx-auto shadow-2xl">
              {videoError ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Video Temporarily Unavailable</h3>
                  <p className="text-slate-400 text-center max-w-md mb-6">
                    We're experiencing a playback issue. Try refreshing, or see how Rex works by checking your competitor position.
                  </p>
                  <a
                    href="/competitor-analysis"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-colors"
                  >
                    Check My Competitor
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    className="w-full h-full object-contain"
                    controls={isPlaying}
                    preload="metadata"
                    playsInline
                    muted={false}
                    onError={handleVideoError}
                    aria-label={VIDEO_TITLE}
                  >
                    <source src={VIDEO_SRC} type="video/mp4" onError={handleVideoError} />
                    Your browser does not support the video tag. 
                    <a href="/competitor-analysis">Try our free competitor analysis instead</a>.
                  </video>
                  {!isPlaying && (
                    <div
                      className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black/40 to-black/60 cursor-pointer z-10 backdrop-blur-sm"
                      onClick={handlePlayClick}
                      role="button"
                      tabIndex={0}
                      aria-label="Play explainer video"
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handlePlayClick(); }}
                    >
                      <button
                        className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 hover:shadow-green-500/50 transition-all duration-300 group"
                        aria-label="Play video"
                      >
                        <svg className="w-10 h-10 text-green-600 ml-1.5 group-hover:text-green-700 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                      <div className="absolute bottom-4 left-4 right-4 text-center">
                        <p className="text-white/80 text-sm font-medium">Click to play — 60 seconds</p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="video-features">
            <div className="video-feature">
              <svg className="feature-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              <span>60 seconds</span>
            </div>
            <div className="video-feature">
              <svg className="feature-icon" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
              </svg>
              <span>Works for all trades</span>
            </div>
            <div className="video-feature">
              <svg className="feature-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Real results shown</span>
            </div>
          </div>
        </div>

        <div className="video-cta">
          <p>Ready to boost your AI visibility?</p>
          <a href="/competitor-analysis" className="button button-primary">
            Check My Competitor
          </a>
        </div>
      </div>
    </section>
  );
}
