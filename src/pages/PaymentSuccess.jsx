import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase, supabaseUrl, supabaseAnonKey } from '../lib/supabase';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, userData, loading: authLoading } = useAuth();
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sessionId = searchParams.get('session_id');

  // Plan details mapping
  const planDetails = {
    Monitor: {
      name: 'Monitor',
      tagline: 'See Where You Stand',
      color: '#84cc16',
      features: [
        'Monthly Visibility Confidence Score™',
        'AI visibility report across ChatGPT, Google AI, Perplexity',
        'Email alerts when your score changes',
        'Competitor visibility comparison (1 competitor)',
      ],
    },
    Improve: {
      name: 'Improve',
      tagline: 'Get Found by AI',
      color: '#84cc16',
      features: [
        'Weekly personalised tasks from Rex',
        'Step-by-step action plans you approve',
        'Progress tracking across all 5 pillars',
        'Email support',
        'Monthly progress reports',
      ],
    },
    Priority: {
      name: 'Priority',
      tagline: 'For Businesses Where Reputation Matters',
      color: '#84cc16',
      features: [
        'Everything in Improve, plus:',
        'Priority task review (human oversight)',
        'Conservative approach for reputation',
        'Dedicated account manager check-ins',
        'Competitor tracking (up to 5 competitors)',
        'Quarterly strategy calls',
      ],
    },
  };

  // Add timeout to prevent infinite loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) {
        setLoading(false);
      }
    }, 5000); // 5 second timeout
    return () => clearTimeout(timeout);
  }, [loading]);

  useEffect(() => {
    const fetchSubscriptionDetails = async () => {
      if (!userData?.id) return;

      try {
        // Fetch subscription from database
        const { data: subscription, error: subError } = await supabase
          .from('stripe_subscriptions')
          .select('*')
          .eq('user_id', userData.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (subError) {
          console.error('Error fetching subscription:', subError);
        }

        if (subscription) {
          // Determine plan name from price_id
          let planName = 'Subscription';
          const priceId = subscription.price_id;
          
          if (priceId?.includes('Monitor') || priceId === 'price_1So43gDN44gTlvjn8OyQ2VEB') {
            planName = 'Monitor';
          } else if (priceId?.includes('Improve') || priceId === 'price_1So458DN44gTlvjntt2UULvS') {
            planName = 'Improve';
          } else if (priceId?.includes('Priority') || priceId === 'price_1So46EDN44gTlvjnaJdSGr7V') {
            planName = 'Priority';
          }

          setSubscriptionData({
            ...subscription,
            planName,
            planInfo: planDetails[planName] || planDetails.Improve,
          });
        }
      } catch (err) {
        console.error('Error loading subscription:', err);
        setError('Unable to load subscription details');
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && userData) {
      fetchSubscriptionDetails();
    } else if (!authLoading && !user) {
      // Not logged in, redirect to sign-in
      navigate('/sign-in');
    }
  }, [authLoading, userData, user, navigate]);

  // Note: We don't redirect if no session_id - the user may have just completed
  // payment and the webhook hasn't processed yet. Let them see the success page.

  if (loading || authLoading) {
    return (
      <>
        <Header />
        <main>
          <div className="container" style={{ textAlign: 'center', padding: '80px 20px' }}>
            <LoadingSpinner size={80} />
            <p style={{ marginTop: '20px', color: 'var(--color-text-secondary)' }}>
              Confirming your subscription...
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const plan = subscriptionData?.planInfo || planDetails.Improve;
  const businessName = userData?.business_name || 'there';

  return (
    <>
      <Header />
      <main>
        {/* Hero Celebration Section */}
        <section
          style={{
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
            padding: '60px 20px 80px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Confetti-like decorative elements */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: '10%',
              width: '20px',
              height: '20px',
              background: '#84cc16',
              borderRadius: '50%',
              opacity: 0.3,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '60px',
              right: '15%',
              width: '15px',
              height: '15px',
              background: '#65a30d',
              borderRadius: '50%',
              opacity: 0.4,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              left: '20%',
              width: '25px',
              height: '25px',
              background: '#84cc16',
              borderRadius: '50%',
              opacity: 0.2,
            }}
          />

          <div className="container" style={{ maxWidth: '800px' }}>
            {/* Success Checkmark */}
            <div
              style={{
                width: '100px',
                height: '100px',
                background: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 30px',
                boxShadow: '0 10px 40px rgba(132, 204, 22, 0.3)',
              }}
            >
              <svg
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h1
              style={{
                fontSize: 'clamp(28px, 5vw, 42px)',
                fontWeight: '700',
                color: '#166534',
                marginBottom: '16px',
                lineHeight: '1.2',
              }}
            >
              Welcome to whoza.ai, {businessName}!
            </h1>

            <p
              style={{
                fontSize: '20px',
                color: '#15803d',
                marginBottom: '24px',
                fontWeight: '500',
              }}
            >
              Your {plan.name} plan is now active
            </p>

            <p
              style={{
                fontSize: '16px',
                color: '#166534',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: '1.6',
              }}
            >
              You've taken the first step towards making your business visible to AI.
              Here's what happens next...
            </p>
          </div>
        </section>

        {/* What Happens Next Section */}
        <section style={{ padding: '60px 20px', background: '#fff' }}>
          <div className="container" style={{ maxWidth: '900px' }}>
            <h2
              style={{
                textAlign: 'center',
                fontSize: '28px',
                fontWeight: '700',
                marginBottom: '40px',
                color: 'var(--color-text)',
              }}
            >
              What Happens Next
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '30px',
              }}
            >
              {/* Step 1 */}
              <div
                className="card"
                style={{
                  padding: '30px',
                  textAlign: 'center',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    color: 'white',
                    fontSize: '24px',
                    fontWeight: 'bold',
                  }}
                >
                  1
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
                  Check Your Inbox
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
                  We've sent a welcome email with your account details and quick-start guide.
                </p>
              </div>

              {/* Step 2 */}
              <div
                className="card"
                style={{
                  padding: '30px',
                  textAlign: 'center',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    color: 'white',
                    fontSize: '24px',
                    fontWeight: 'bold',
                  }}
                >
                  2
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
                  Your First AI Scan
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
                  Within 24 hours, Rex will complete your first comprehensive AI visibility scan.
                </p>
              </div>

              {/* Step 3 */}
              <div
                className="card"
                style={{
                  padding: '30px',
                  textAlign: 'center',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    color: 'white',
                    fontSize: '24px',
                    fontWeight: 'bold',
                  }}
                >
                  3
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
                  Get Personalised Tasks
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
                  Rex will create your first set of actionable tasks to improve your AI visibility.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Your Plan Section */}
        <section style={{ padding: '60px 20px', background: '#f9fafb' }}>
          <div className="container" style={{ maxWidth: '700px' }}>
            <div
              className="card"
              style={{
                padding: '40px',
                border: '2px solid #84cc16',
                borderRadius: '16px',
                background: '#fff',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    background: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '16px',
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '4px' }}>
                    {plan.name} Plan
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', margin: 0 }}>
                    {plan.tagline}
                  </p>
                </div>
              </div>

              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#374151' }}>
                What's included:
              </h4>

              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      marginBottom: '12px',
                      fontSize: '14px',
                      color: '#4b5563',
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#84cc16"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ marginRight: '12px', flexShrink: 0, marginTop: '2px' }}
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ padding: '60px 20px', background: '#fff', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: '600px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: '700',
                marginBottom: '16px',
                color: 'var(--color-text)',
              }}
            >
              Ready to Get Started?
            </h2>
            <p
              style={{
                color: 'var(--color-text-secondary)',
                marginBottom: '30px',
                fontSize: '16px',
              }}
            >
              Head to your dashboard to explore your new tools and see Rex in action.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
              <Link
                to="/portal"
                className="button"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px 40px',
                  fontSize: '18px',
                  fontWeight: '600',
                  background: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 14px rgba(132, 204, 22, 0.3)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
              >
                Go to Dashboard
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ marginLeft: '8px' }}
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>

              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                Need help?{' '}
                <Link to="/contact" style={{ color: '#84cc16', textDecoration: 'underline' }}>
                  Contact our support team
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section style={{ padding: '40px 20px', background: '#f9fafb', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '30px',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span style={{ fontSize: '14px' }}>Secure Payment</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span style={{ fontSize: '14px' }}>GDPR Compliant</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span style={{ fontSize: '14px' }}>30-Day Money-Back Guarantee</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
