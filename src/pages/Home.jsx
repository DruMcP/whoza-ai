import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import LiveResultsShowcase from '../components/LiveResultsShowcase';
import ExplainerVideo from '../components/ExplainerVideo';
import MiniROICalculator from '../components/MiniROICalculator';
import AITeam from '../components/AITeam';
import Icon from '../components/icons/Icon';
import { initScrollAnimations, addRippleEffect } from '../utils/animations';
import HeroIllustration from '../components/illustrations/HeroIllustration';
import Step1BusinessProfile from '../components/illustrations/Step1BusinessProfile';
import Step2TaskGeneration from '../components/illustrations/Step2TaskGeneration';
import Step3TaskApproval from '../components/illustrations/Step3TaskApproval';
import Step4ProgressTracking from '../components/illustrations/Step4ProgressTracking';
import TaskExamplesByTrade from '../components/TaskExamplesByTrade';
import ResultsTimeline from '../components/ResultsTimeline';
import InteractiveTaskPreview from '../components/InteractiveTaskPreview';
import ECEBrandBadge from '../components/ECEBrandBadge';
import First30Days from '../components/First30Days';
import StickyCTABar from '../components/StickyCTABar';
import GuaranteeBadge from '../components/GuaranteeBadge';
import ProofCard from '../components/ProofCard';
import FounderNote from '../components/FounderNote';
import WeeklyLoopVisual from '../components/WeeklyLoopVisual';
import WhoItsFor from '../components/WhoItsFor';
import WhatWeDontDo from '../components/WhatWeDontDo';
import AIAnswerShift from '../components/AIAnswerShift';
import RexIllustration from '../components/illustrations/RexIllustration';
import ECEExplainer from '../components/ECEExplainer/ECEExplainer';

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
        <HeroSection />

        <WhoItsFor />

        <ECEExplainer />

        <AIAnswerShift />

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
            <div>
              <TestimonialsCarousel />
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
            <MiniROICalculator />
          </div>
        </section>

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

        <ExplainerVideo />

        <TaskExamplesByTrade />

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
                  Get your free AI Visibility Score. See where you stand right now.
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

        <InteractiveTaskPreview />

        <ResultsTimeline />

        <LiveResultsShowcase />

        <First30Days />

        <section className="section" style={{ backgroundColor: '#0f172a', padding: 'var(--spacing-4xl) var(--spacing-lg)' }}>
          <div className="container">
            <WeeklyLoopVisual />
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
            <FounderNote />
          </div>
        </section>

        <WhatWeDontDo />

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
              <Link to="/pricing">View pricing</Link> · Monitor from £19/month
            </p>
            <p style={{ marginTop: 'var(--spacing-xs)', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              Cancel anytime • 30-day money-back guarantee
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <StickyCTABar />
    </>
  );
}
