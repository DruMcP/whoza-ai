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
  const [selectedPlan, setSelectedPlan] = useState('Pro');
  const [loading, setLoading] = useState(false);

  const plans = {
    Starter: { price: 99, name: 'Starter' },
    Pro: { price: 199, name: 'Pro' },
    Max: { price: 399, name: 'Max' },
  };

  const founderPrice = userData?.founder ? 79 : null;

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const priceIds = {
        Starter: 'price_starter_monthly',
        Pro: 'price_pro_monthly',
        Max: 'price_max_monthly',
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
                  value="Starter"
                  checked={selectedPlan === 'Starter'}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  style={{ marginTop: '4px', marginRight: 'var(--spacing-sm)', flexShrink: 0 }}
                />
                <div>
                  <h3 style={{ marginTop: 0, marginBottom: 'var(--spacing-xs)' }}>
                    Starter
                  </h3>
                  <p className="score-display" style={{ marginBottom: 'var(--spacing-sm)' }}>
                    £{userData?.founder ? founderPrice : plans.Starter.price}
                    <span style={{ fontSize: '19px', color: 'var(--color-text)' }}>
                      / month
                    </span>
                  </p>
                  <ul style={{ marginBottom: 0 }}>
                    <li>One task per week</li>
                    <li>Monthly Visibility Confidence Score™</li>
                    <li>Email delivery</li>
                  </ul>
                </div>
              </label>
            </div>

            <div
              className="card"
              style={{
                border: selectedPlan === 'Pro' ? '3px solid #00857d' : '1px solid var(--color-border)',
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
                  value="Pro"
                  checked={selectedPlan === 'Pro'}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  style={{ marginTop: '4px', marginRight: 'var(--spacing-sm)', flexShrink: 0 }}
                />
                <div>
                  <h3 style={{ marginTop: 0, marginBottom: 'var(--spacing-xs)' }}>
                    Pro{' '}
                    <span
                      style={{
                        fontSize: '16px',
                        fontWeight: 'normal',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      ← Most popular
                    </span>
                  </h3>
                  <p className="score-display" style={{ marginBottom: 'var(--spacing-sm)' }}>
                    £{userData?.founder ? founderPrice : plans.Pro.price}
                    <span style={{ fontSize: '19px', color: 'var(--color-text)' }}>
                      / month
                    </span>
                  </p>
                  <ul style={{ marginBottom: 0 }}>
                    <li>Everything in Starter</li>
                    <li>Priority support</li>
                    <li>Competitor tracking</li>
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
                  value="Max"
                  checked={selectedPlan === 'Max'}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  style={{ marginTop: '4px', marginRight: 'var(--spacing-sm)', flexShrink: 0 }}
                />
                <div>
                  <h3 style={{ marginTop: 0, marginBottom: 'var(--spacing-xs)' }}>
                    Max
                  </h3>
                  <p className="score-display" style={{ marginBottom: 'var(--spacing-sm)' }}>
                    £{userData?.founder && selectedPlan === 'Max' ? 99 : plans.Max.price}
                    <span style={{ fontSize: '19px', color: 'var(--color-text)' }}>
                      / month
                    </span>
                  </p>
                  <ul style={{ marginBottom: 0 }}>
                    <li>Everything in Pro</li>
                    <li>Custom task timing</li>
                    <li>Quarterly strategy review</li>
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
              <strong>Cancel anytime.</strong> No long-term contracts. 14-day
              money-back guarantee if you're not happy.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
