import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
// NOTE: useState and useRef are used by the CounterAnimation component
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import HeroSection from '../components/HeroSection';
import GoogleReviewsCarousel from '../components/GoogleReviewsCarousel';
import AIAnswerShiftCompact from '../components/AIAnswerShiftCompact';
import LiveResultsShowcase from '../components/LiveResultsShowcase';
import ExplainerVideo from '../components/ExplainerVideo';
import NewsletterSignup from '../components/NewsletterSignup';
import LeadGenComparison from '../components/LeadGenComparison';
import RecentActivityTicker from '../components/RecentActivityTicker';
import Icon from '../components/icons/Icon';
import { initScrollAnimations } from '../utils/animations';
import StickyCTABar from '../components/StickyCTABar';
import GuaranteeBadge from '../components/GuaranteeBadge';
import ProofCard from '../components/ProofCard';
import WhoItsFor from '../components/WhoItsFor';
import ECEExplainer from '../components/ECEExplainer/ECEExplainer';
import HomeFAQ, { homeFAQSchema } from '../components/HomeFAQ';

import { generateHomePageSchemas } from '../utils/schemaOrg';

// SIMPLIFIED HOMEPAGE — Sections removed to reduce scroll length:
// TestimonialsCarousel (replaced by GoogleReviewsCarousel)
// MiniROICalculator, TaskExamplesByTrade, ResultsTimeline, InteractiveTaskPreview
// First30Days, WeeklyLoopVisual, FounderNote, WhatWeDontDo, AIAnswerShift
// These detailed sections are available on /how-it-works page

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
  const schemas = [...generateHomePageSchemas(), homeFAQSchema];

  useEffect(() => {
    initScrollAnimations();
  }, []);

  return (
    <>
      <SEO schemas={schemas} />
      <Header />

      <aside className="beta-badge-container" style={{
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
          <span style={{ fontSize: '16px' }} role="img" aria-label="sparkles">✨</span>
          <span>Now helping tradespeople worldwide</span>
        </div>
      </aside>

      <main id="main-content" role="main">
        <HeroSection />

        {/* Before/After AI answer — shows the #1 value proposition immediately */}
        <AIAnswerShiftCompact />

        <WhoItsFor />

        <ECEExplainer />

        <section className="section" style={{
          background: 'linear-gradient(135deg, rgba(0, 149, 255, 0.06) 0%, rgba(0, 112, 204, 0.03) 100%)',
          padding: 'var(--spacing-4xl) 0',
          borderTop: '1px solid rgba(0, 149, 255, 0.1)',
          borderBottom: '1px solid rgba(0, 149, 255, 0.1)'
        }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <div>
              <h2 style={{ fontSize: '36px', marginBottom: 'var(--spacing-md)' }}>
                Check Your AI Competitor Position
              </h2>
              <p style={{
                fontSize: '20px',
                maxWidth: '700px',
                margin: '0 auto var(--spacing-xl)',
                color: 'var(--color-text-secondary)',
                lineHeight: '1.6'
              }}>
                Find out in 60 seconds. See who AI recommends for your trade instead of your business — and get 3 quick fixes to start appearing in ChatGPT, Google AI, and Perplexity.
              </p>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--spacing-md)',
              marginBottom: 'var(--spacing-lg)'
            }}>
              <Link to="/competitor-analysis" className="button button-large btn-hover" style={{
                fontSize: '18px',
                padding: 'var(--spacing-md) var(--spacing-2xl)'
              }}>
                Check Your Competitor for Free
              </Link>
              <GuaranteeBadge />
              <ProofCard />
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
            <GoogleReviewsCarousel />
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

        {/* Comparison: whoza.ai vs Checkatrade/Bark/MyBuilder */}
        <LeadGenComparison />

        {/* AI Workforce section — features on roadmap, displayed subtly */}
        <section className="section" style={{ background: 'var(--color-bg-secondary)', padding: 'var(--spacing-xl) var(--spacing-lg)' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <p style={{
              fontSize: '14px',
              color: 'var(--color-text-secondary)',
              margin: 0
            }}>
              <span role="img" aria-hidden="true">🔮</span> AI Receptionist and Social Media Manager coming in the future — 
              <Link to="/contact" style={{ color: 'var(--color-primary-700)', fontWeight: 600 }}>join the waitlist</Link>
            </p>
          </div>
        </section>

        <ExplainerVideo />

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
              <span>Powered by <strong style={{ color: 'var(--color-primary-600)' }}>Entity Confidence Engineering™</strong> - Our proprietary 5-pillar methodology</span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--spacing-2xl)',
              marginBottom: 'var(--spacing-2xl)'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, rgba(132, 204, 22, 0.08) 0%, rgba(132, 204, 22, 0.03) 100%)',
                border: '2px solid rgba(132, 204, 22, 0.2)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--spacing-xl)',
                textAlign: 'center'
              }}>
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
                  Check who AI recommends for your trade. See where you stand right now.
                </p>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, rgba(132, 204, 22, 0.08) 0%, rgba(132, 204, 22, 0.03) 100%)',
                border: '2px solid rgba(132, 204, 22, 0.2)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--spacing-xl)',
                textAlign: 'center'
              }}>
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
                textAlign: 'center'
              }}>
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
                  Monthly progress report
                </p>
                <p style={{
                  fontSize: '16px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.6'
                }}>
                  Watch your AI visibility grow. See your position improve month by month.
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

        <LiveResultsShowcase />

        {/* Email newsletter capture — low-friction lead gen */}
        <NewsletterSignup />

        <HomeFAQ />

        <section className="section">
          <div className="container" style={{ textAlign: 'center' }}>
            <h2>Ready to get started?</h2>
            <p style={{ margin: '0 auto var(--spacing-lg)' }}>
              Takes 10-15 minutes per week. First task arrives within a week.
            </p>
            <Link to="/start" className="button btn-hover">
              Get started
            </Link>
            <GuaranteeBadge />
            <p style={{ marginTop: 'var(--spacing-md)', fontSize: '16px' }}>
              <Link to="/pricing">View pricing</Link> · Try free for 14 days
            </p>
            <p style={{ marginTop: 'var(--spacing-xs)', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              Cancel anytime • 30-day money-back guarantee
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <StickyCTABar />
      <RecentActivityTicker />
    </>
  );
}
