import { Link } from 'react-router-dom';
import { useEffect, useState, useRef, lazy, Suspense } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import Icon from '../components/icons/Icon';
import { initScrollAnimations } from '../utils/animations';

// Lazy load below-the-fold components for performance optimization
const TestimonialsCarousel = lazy(() => import('../components/TestimonialsCarousel'));
const LiveResultsShowcase = lazy(() => import('../components/LiveResultsShowcase'));
const ExplainerVideo = lazy(() => import('../components/ExplainerVideo'));
const MiniROICalculator = lazy(() => import('../components/MiniROICalculator'));
const AITeam = lazy(() => import('../components/AITeam'));
const TaskExamplesByTrade = lazy(() => import('../components/TaskExamplesByTrade'));
const ResultsTimeline = lazy(() => import('../components/ResultsTimeline'));
const InteractiveTaskPreview = lazy(() => import('../components/InteractiveTaskPreview'));
const First30Days = lazy(() => import('../components/First30Days'));
const StickyCTABar = lazy(() => import('../components/StickyCTABar'));
const GuaranteeBadge = lazy(() => import('../components/GuaranteeBadge'));
const ProofCard = lazy(() => import('../components/ProofCard'));
const FounderNote = lazy(() => import('../components/FounderNote'));
const WeeklyLoopVisual = lazy(() => import('../components/WeeklyLoopVisual'));
const WhoItsFor = lazy(() => import('../components/WhoItsFor'));
const WhatWeDontDo = lazy(() => import('../components/WhatWeDontDo'));
const AIAnswerShift = lazy(() => import('../components/AIAnswerShift'));
const ECEExplainer = lazy(() => import('../components/ECEExplainer/ECEExplainer'));

// Minimal loading fallback component
const LoadingFallback = () => (
  <div style={{
    minHeight: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--spacing-xl)'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '3px solid rgba(0, 149, 255, 0.1)',
      borderTop: '3px solid var(--color-primary-600)',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite'
    }} />
  </div>
);

const AnimatedCounter = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let current = 0;
          const increment = target / 50;
          const duration = 1000;
          const stepTime = duration / 50;

          timerRef.current = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
              }
            } else {
              setCount(Math.floor(current));
            }
          }, stepTime);
        }
      },
      { threshold: 0.1 }
    );

    const currentElement = counterRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
      observer.disconnect();
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [target, hasAnimated]);

  return <span ref={counterRef}>{count}{suffix}</span>;
};

export default function Home() {
  useEffect(() => {
    initScrollAnimations();
  }, []);

  return (
    <>
      <Header />

      <div className="beta-badge-container" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '12px 16px',
        background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div className="beta-badge" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 20px',
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '50px',
          fontSize: '14px',
          fontWeight: '600',
          color: '#0c4a6e',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(6, 182, 212, 0.2)'
        }}>
          <span style={{ fontSize: '16px' }} role="img" aria-label="rocket">🚀</span>
          <span>BETA - We're in Early Access!</span>
        </div>
      </div>

      <main id="main-content" role="main">
        {/* Above-the-fold: Critical content loaded immediately */}
        <HeroSection />

        {/* Below-the-fold: Lazy loaded with Suspense boundaries */}
        <Suspense fallback={<LoadingFallback />}>
          <WhoItsFor />
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <ECEExplainer />
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <AIAnswerShift />
        </Suspense>

        <section className="section" style={{
          background: 'linear-gradient(135deg, rgba(0, 149, 255, 0.06) 0%, rgba(0, 112, 204, 0.03) 100%)',
          padding: 'var(--spacing-4xl) 0',
          borderTop: '1px solid rgba(0, 149, 255, 0.1)',
          borderBottom: '1px solid rgba(0, 149, 255, 0.1)'
        }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <div>
              <h2 style={{ fontSize: '36px', marginBottom: 'var(--spacing-md)' }}>
                What's Your Visibility Confidence Score™?
              </h2>
              <p style={{
                fontSize: '20px',
                maxWidth: '700px',
                margin: '0 auto var(--spacing-xl)',
                color: 'var(--color-text-secondary)',
                lineHeight: '1.6'
              }}>
                Find out in 60 seconds. Get a free Visibility Confidence Score™ showing how likely your business is to be named and recommended in AI answers (ChatGPT, Google AI, Perplexity).
              </p>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--spacing-md)',
              marginBottom: 'var(--spacing-lg)'
            }}>
              <Link to="/free-score" className="button button-large btn-hover" style={{
                fontSize: '18px',
                padding: 'var(--spacing-md) var(--spacing-2xl)'
              }}>
                Get your free AI readiness score
              </Link>
              <Suspense fallback={<div style={{ minHeight: '60px' }} />}>
                <GuaranteeBadge />
              </Suspense>
              <Suspense fallback={<div style={{ minHeight: '80px' }} />}>
                <ProofCard />
              </Suspense>
              <div style={{
                display: 'flex',
                gap: 'var(--spacing-lg)',
                flexWrap: 'wrap',
                justifyContent: 'center',
                fontSize: '15px',
                color: 'var(--color-text-secondary)',
                marginTop: 'var(--spacing-md)'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Icon name="CheckIcon" size={20} color="var(--color-primary-600)" />
                  Takes 60 seconds
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Icon name="CheckIcon" size={20} color="var(--color-primary-600)" />
                  No credit card
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Icon name="CheckIcon" size={20} color="var(--color-primary-600)" />
                  Instant results
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="social-proof-section">
          <div className="container">
            <div className="social-proof-header">
              <h2>What Our Customers Are Saying</h2>
              <p>Real tradespeople who are getting found by local customers through AI search</p>
            </div>
            <div>
              <Suspense fallback={<LoadingFallback />}>
                <TestimonialsCarousel />
              </Suspense>
            </div>
            <div className="case-studies-cta">
              <h3>Want to See More Success Stories?</h3>
              <p>Read detailed case studies showing how tradespeople are improving their AI visibility</p>
              <Link to="/case-studies" className="button btn-hover">
                View Case Studies
              </Link>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2>The problem: search has changed</h2>
            <p>
              People used to search on Google and click through to websites. Now
              they ask AI tools like ChatGPT, Perplexity, and Google's AI for
              direct answers.
            </p>
            <p>
              If your business isn't visible to these AI tools, you're missing
              customers. Learn more about <Link to="/how-it-works" style={{ color: 'var(--color-primary-600)', textDecoration: 'underline' }}>how AI visibility works</Link> and why it matters for local tradespeople.
            </p>
          </div>
        </section>

        <section className="section" style={{ backgroundColor: '#f8fafc' }}>
          <div className="container">
            <Suspense fallback={<LoadingFallback />}>
              <MiniROICalculator />
            </Suspense>
          </div>
        </section>

        <Suspense fallback={<LoadingFallback />}>
          <AITeam
            onWaitlistSubmit={async (email, product) => {
              const response = await fetch(
                `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-team-waitlist`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
                  },
                  body: JSON.stringify({ email, product }),
                }
              );
              if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to join waitlist');
              }
              return await response.json();
            }}
          />
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <ExplainerVideo />
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <TaskExamplesByTrade />
        </Suspense>

        <section className="section">
          <div className="container">
            <h2>How it works</h2>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--spacing-sm)',
              marginBottom: 'var(--spacing-2xl)',
              fontSize: '14px',
              color: 'var(--color-text-secondary)'
            }}>
              <span style={{ fontSize: '16px' }}>✓</span>
              <span>Simple 3-step process</span>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-xl)',
              marginBottom: 'var(--spacing-2xl)',
              padding: '0 var(--spacing-md)'
            }} className="three-step-container">
              <div style={{
                background: 'linear-gradient(135deg, rgba(132, 204, 22, 0.08) 0%, rgba(132, 204, 22, 0.03) 100%)',
                border: '2px solid rgba(132, 204, 22, 0.2)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--spacing-xl)',
                textAlign: 'center',
                width: '100%',
                maxWidth: '100%',
                margin: '0 auto'
              }} className="step-card">
                <div style={{
                  width: '64px',
                  height: '64px',
                  margin: '0 auto var(--spacing-md)',
                  background: 'rgba(132, 204, 22, 0.15)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-primary-600)',
                  fontSize: '28px',
                  fontWeight: 'bold'
                }}>
                  1
                </div>
                <h3 style={{ fontSize: '24px', marginBottom: 'var(--spacing-sm)' }}>Measure</h3>
                <p style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: 'var(--color-primary-600)',
                  marginBottom: 'var(--spacing-sm)'
                }}>
                  60 seconds
                </p>
                <p style={{
                  fontSize: '16px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.6'
                }}>
                  Get your free AI Visibility Score. See where you stand right now.
                </p>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, rgba(132, 204, 22, 0.08) 0%, rgba(132, 204, 22, 0.03) 100%)',
                border: '2px solid rgba(132, 204, 22, 0.2)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--spacing-xl)',
                textAlign: 'center',
                width: '100%',
                maxWidth: '100%',
                margin: '0 auto'
              }} className="step-card">
                <div style={{
                  width: '64px',
                  height: '64px',
                  margin: '0 auto var(--spacing-md)',
                  background: 'rgba(132, 204, 22, 0.15)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-primary-600)',
                  fontSize: '28px',
                  fontWeight: 'bold'
                }}>
                  2
                </div>
                <h3 style={{ fontSize: '24px', marginBottom: 'var(--spacing-sm)' }}>Improve</h3>
                <p style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: 'var(--color-primary-600)',
                  marginBottom: 'var(--spacing-sm)'
                }}>
                  One task/week, 10–15 mins
                </p>
                <p style={{
                  fontSize: '16px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.6'
                }}>
                  Follow your personalized action plan. Simple weekly tasks you can actually do.
                </p>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, rgba(132, 204, 22, 0.08) 0%, rgba(132, 204, 22, 0.03) 100%)',
                border: '2px solid rgba(132, 204, 22, 0.2)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--spacing-xl)',
                textAlign: 'center',
                width: '100%',
                maxWidth: '100%',
                margin: '0 auto'
              }} className="step-card">
                <div style={{
                  width: '64px',
                  height: '64px',
                  margin: '0 auto var(--spacing-md)',
                  background: 'rgba(132, 204, 22, 0.15)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-primary-600)',
                  fontSize: '28px',
                  fontWeight: 'bold'
                }}>
                  3
                </div>
                <h3 style={{ fontSize: '24px', marginBottom: 'var(--spacing-sm)' }}>Track</h3>
                <p style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: 'var(--color-primary-600)',
                  marginBottom: 'var(--spacing-sm)'
                }}>
                  Monthly confidence score
                </p>
                <p style={{
                  fontSize: '16px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.6'
                }}>
                  Watch your AI visibility grow. See your score improve month by month.
                </p>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <Link to="/how-it-works" className="button-secondary">
                Read more about how it works
              </Link>
            </div>
          </div>
        </section>

        <Suspense fallback={<LoadingFallback />}>
          <InteractiveTaskPreview />
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <ResultsTimeline />
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <LiveResultsShowcase />
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <First30Days />
        </Suspense>

        <section className="section" style={{ backgroundColor: '#0f172a', padding: 'var(--spacing-4xl) var(--spacing-lg)' }}>
          <div className="container">
            <Suspense fallback={<LoadingFallback />}>
              <WeeklyLoopVisual />
            </Suspense>
          </div>
        </section>

        <section className="section" style={{ background: '#f3f2f1' }}>
          <div className="container">
            <h2>You're always in control</h2>

            <div className="grid">
              <div className="card card-hover">
                <h3>Manual approval required</h3>
                <p>
                  Rex never posts, publishes, or changes anything without your
                  explicit approval first.
                </p>
              </div>

              <div className="card card-hover">
                <h3>No account access</h3>
                <p>
                  Rex doesn't log into your Google Business, website, or social
                  media. You do the tasks yourself.
                </p>
              </div>

              <div className="card card-hover">
                <h3>GDPR and ICO safe</h3>
                <p>
                  We follow UK data protection rules. Your business data stays
                  private.
                </p>
              </div>
            </div>

            <Link to="/trust">Learn more about trust and privacy</Link>
          </div>
        </section>

        <section className="section" style={{ backgroundColor: '#0f172a' }}>
          <div className="container">
            <Suspense fallback={<LoadingFallback />}>
              <FounderNote />
            </Suspense>
          </div>
        </section>

        <Suspense fallback={<LoadingFallback />}>
          <WhatWeDontDo />
        </Suspense>

        <section className="section">
          <div className="container" style={{ textAlign: 'center' }}>
            <h2>Ready to get started?</h2>
            <p style={{ margin: '0 auto var(--spacing-lg)' }}>
              Takes 10-15 minutes per week. First task arrives within a week.
            </p>
            <Link to="/start" className="button btn-hover">
              Get started
            </Link>
            <Suspense fallback={<div style={{ minHeight: '60px' }} />}>
              <GuaranteeBadge />
            </Suspense>
            <p style={{ marginTop: 'var(--spacing-md)', fontSize: '16px' }}>
              <Link to="/pricing">View pricing</Link> · Improve from £59/month
            </p>
            <p style={{ marginTop: 'var(--spacing-xs)', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              Cancel anytime • 30-day money-back guarantee
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <Suspense fallback={null}>
        <StickyCTABar />
      </Suspense>
    </>
  );
}
