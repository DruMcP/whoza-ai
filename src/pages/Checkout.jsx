import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/Toast';
import { supabase, supabaseUrl, supabaseAnonKey } from '../lib/supabase';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Checkout() {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const toast = useToast();
  const [selectedPlan, setSelectedPlan] = useState('Improve');
  const [loading, setLoading] = useState(false);

  const plans = {
    Monitor: { price: 19, name: 'Monitor' },
    Improve: { price: 59, name: 'Improve' },
    Priority: { price: 149, name: 'Priority' },
  };

  const founderPrice = userData?.founder ? 19 : null;

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const priceIds = {
        Monitor: 'price_1So43gDN44gTlvjn8OyQ2VEB',
        Improve: 'price_1So458DN44gTlvjntt2UULvS',
        Priority: 'price_1So46EDN44gTlvjnaJdSGr7V',
      };

      const successUrl = `${window.location.origin}/portal?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${window.location.origin}/checkout`;

      const response = await fetch(
        `${supabaseUrl}/functions/v1/create-checkout-session`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${supabaseAnonKey}`,
          },
          body: JSON.stringify({
            user_id: userData.id,
            price_id: priceIds[selectedPlan],
            success_url: successUrl,
            cancel_url: cancelUrl,
          }),
        }
      );

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      // TODO: Review error handling: console.error('Error creating checkout:', error)
      toast.error('Error creating checkout session. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Header />

      <main>
        <div className="container">
          <h1>Choose your plan</h1>

          {userData?.founder && (
            <div className="panel" style={{ background: '#fef9f0', borderLeft: '4px solid #ffb142' }}>
              <h3 style={{ marginTop: 0 }}>You're in the Founders Circle</h3>
              <p style={{ marginBottom: 0 }}>
                <strong>2 months free</strong>, then £{founderPrice}/month for 3
                months. After that, founder pricing continues (saving you up to
                50%).
              </p>
            </div>
          )}

          <div className="grid">
            <div className="card">
              <label
                style={{
                  display: 'flex',
                  alignItems: 'start',
                  cursor: 'pointer',
                  marginBottom: 0,
                }}
              >
                <input
                  type="radio"
                  name="plan"
                  value="Monitor"
                  checked={selectedPlan === 'Monitor'}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  style={{ marginTop: '4px', marginRight: 'var(--spacing-sm)', flexShrink: 0 }}
                />
                <div>
                  <h3 style={{ marginTop: 0, marginBottom: 'var(--spacing-xs)' }}>
                    Monitor
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-sm)' }}>
                    See Where You Stand
                  </p>
                  <p className="score-display" style={{ marginBottom: 'var(--spacing-sm)' }}>
                    £{userData?.founder ? founderPrice : plans.Monitor.price}
                    <span style={{ fontSize: '19px', color: 'var(--color-text)' }}>
                      / month
                    </span>
                  </p>
                  <ul style={{ marginBottom: 0 }}>
                    <li>Monthly Visibility Confidence Score™</li>
                    <li>AI visibility report across ChatGPT, Google AI, Perplexity</li>
                    <li>Email alerts when your score changes</li>
                    <li>Competitor visibility comparison (1 competitor)</li>
                  </ul>
                </div>
              </label>
            </div>

            <div
              className="card"
              style={{
                border: selectedPlan === 'Improve' ? '3px solid #00857d' : '1px solid var(--color-border)',
              }}
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'start',
                  cursor: 'pointer',
                  marginBottom: 0,
                }}
              >
                <input
                  type="radio"
                  name="plan"
                  value="Improve"
                  checked={selectedPlan === 'Improve'}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  style={{ marginTop: '4px', marginRight: 'var(--spacing-sm)', flexShrink: 0 }}
                />
                <div>
                  <h3 style={{ marginTop: 0, marginBottom: 'var(--spacing-xs)' }}>
                    Improve{' '}
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 'bold',
                        color: '#fff',
                        background: '#00857d',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        marginLeft: '8px',
                      }}
                    >
                      MOST POPULAR
                    </span>
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-sm)' }}>
                    Get Found by AI
                  </p>
                  <p className="score-display" style={{ marginBottom: 'var(--spacing-sm)' }}>
                    £{userData?.founder ? founderPrice : plans.Improve.price}
                    <span style={{ fontSize: '19px', color: 'var(--color-text)' }}>
                      / month
                    </span>
                  </p>
                  <ul style={{ marginBottom: 0 }}>
                    <li>Everything in Monitor, plus:</li>
                    <li>Weekly personalised tasks from Rex</li>
                    <li>Step-by-step action plans you approve</li>
                    <li>Progress tracking across all 5 pillars</li>
                    <li>Email support</li>
                    <li>Monthly progress reports</li>
                  </ul>
                </div>
              </label>
            </div>

            <div className="card">
              <label
                style={{
                  display: 'flex',
                  alignItems: 'start',
                  cursor: 'pointer',
                  marginBottom: 0,
                }}
              >
                <input
                  type="radio"
                  name="plan"
                  value="Priority"
                  checked={selectedPlan === 'Priority'}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  style={{ marginTop: '4px', marginRight: 'var(--spacing-sm)', flexShrink: 0 }}
                />
                <div>
                  <h3 style={{ marginTop: 0, marginBottom: 'var(--spacing-xs)' }}>
                    Priority
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-sm)' }}>
                    For Businesses Where Reputation Matters
                  </p>
                  <p className="score-display" style={{ marginBottom: 'var(--spacing-sm)' }}>
                    £{userData?.founder ? founderPrice : plans.Priority.price}
                    <span style={{ fontSize: '19px', color: 'var(--color-text)' }}>
                      / month
                    </span>
                  </p>
                  <ul style={{ marginBottom: 0 }}>
                    <li>Everything in Improve, plus:</li>
                    <li>Priority task review (human oversight)</li>
                    <li>Conservative approach for reputation</li>
                    <li>Dedicated account manager check-ins</li>
                    <li>Competitor tracking (up to 5 competitors)</li>
                    <li>Quarterly strategy calls</li>
                    <li>Priority email support (24-hour response)</li>
                  </ul>
                </div>
              </label>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)' }}>
            <button onClick={handleCheckout} disabled={loading} className="button">
              {loading ? 'Please wait...' : 'Continue to payment'}
            </button>

          </div>

          <div className="panel" style={{ marginTop: 'var(--spacing-xl)' }}>
            <p style={{ marginBottom: 0 }}>
              <strong>30-Day Money-Back Guarantee.</strong> Cancel anytime. No long-term contracts.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
