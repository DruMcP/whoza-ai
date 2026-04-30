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

  const [calculatorJobs, setCalculatorJobs] = useState(25);

  const plans = {
    Starter: { price: 59, name: 'Capture', includedJobs: 0, includedJobsLabel: 'Lead capture only', overageRate: null, overageLabel: 'No booking automation' },
    Growth: { price: 119, name: 'Convert', includedJobs: 15, includedJobsLabel: '15 AI-booked jobs included', overageRate: 3, overageLabel: 'Then £3 per extra job' },
    Pro: { price: 199, name: 'Grow', includedJobs: 40, includedJobsLabel: '40 AI-booked jobs included', overageRate: 2.5, overageLabel: 'Then £2.50 per extra job' },
    Scale: { price: 349, name: 'Scale', includedJobs: 100, includedJobsLabel: '100 AI-booked jobs included', overageRate: 2, overageLabel: 'Then £2 per extra job' },
  };

  const founderPrice = userData?.founder ? 79 : null;

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const priceIds = {
        Starter: 'price_starter_monthly',
        Growth: 'price_growth_monthly',
        Pro: 'price_pro_monthly',
        Scale: 'price_scale_monthly',
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
                    Capture
                  </h3>
                  <p className="score-display" style={{ marginBottom: 'var(--spacing-sm)' }}>
                    £{userData?.founder ? founderPrice : plans.Starter.price}
                    <span style={{ fontSize: '19px', color: 'var(--color-text)' }}>
                      / month inc VAT
                    </span>
                  </p>
                  <ul style={{ marginBottom: 0 }}>
                    <li>Basic Katie: call capture (100 min)</li>
                    <li>WhatsApp summaries</li>
                    <li>Claire: review monitoring</li>
                    <li>2 directory listings</li>
                  </ul>
                  <p style={{ marginTop: 'var(--spacing-sm)', fontSize: '14px', color: 'var(--color-blue)', fontWeight: 500 }}>
                    {plans.Starter.includedJobsLabel}
                  </p>
                </div>
              </label>
            </div>

            <div
              className="card"
              style={{
                border: selectedPlan === 'Growth' ? '3px solid #00857d' : '1px solid var(--color-border)',
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
                  value="Growth"
                  checked={selectedPlan === 'Growth'}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  style={{ marginTop: '4px', marginRight: 'var(--spacing-sm)', flexShrink: 0 }}
                />
                <div>
                  <h3 style={{ marginTop: 0, marginBottom: 'var(--spacing-xs)' }}>
                    Convert{' '}
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
                    £{userData?.founder ? founderPrice : plans.Growth.price}
                    <span style={{ fontSize: '19px', color: 'var(--color-text)' }}>
                      / month inc VAT
                    </span>
                  </p>
                  <ul style={{ marginBottom: 0 }}>
                    <li>Full Katie: booking (300 min)</li>
                    <li>Claire: automated review requests</li>
                    <li>Rex: AI Visibility Score + monthly report</li>
                    <li>5 directory listings</li>
                  </ul>
                  <p style={{ marginTop: 'var(--spacing-sm)', fontSize: '14px', color: 'var(--color-green)', fontWeight: 600 }}>
                    ✓ {plans.Growth.includedJobsLabel}
                  </p>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                    {plans.Growth.overageLabel}
                  </p>
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
                  value="Pro"
                  checked={selectedPlan === 'Pro'}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  style={{ marginTop: '4px', marginRight: 'var(--spacing-sm)', flexShrink: 0 }}
                />
                <div>
                  <h3 style={{ marginTop: 0, marginBottom: 'var(--spacing-xs)' }}>
                    Grow
                  </h3>
                  <p className="score-display" style={{ marginBottom: 'var(--spacing-sm)' }}>
                    £{userData?.founder ? founderPrice : plans.Pro.price}
                    <span style={{ fontSize: '19px', color: 'var(--color-text)' }}>
                      / month inc VAT
                    </span>
                  </p>
                  <ul style={{ marginBottom: 0 }}>
                    <li>Full stack: Katie + Claire + Rex</li>
                    <li>Actionable competitor insights</li>
                    <li>Higher usage (800 min)</li>
                    <li>Team access (3 seats)</li>
                  </ul>
                  <p style={{ marginTop: 'var(--spacing-sm)', fontSize: '14px', color: 'var(--color-green)', fontWeight: 600 }}>
                    ✓ {plans.Pro.includedJobsLabel}
                  </p>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                    {plans.Pro.overageLabel}
                  </p>
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
                  value="Scale"
                  checked={selectedPlan === 'Scale'}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  style={{ marginTop: '4px', marginRight: 'var(--spacing-sm)', flexShrink: 0 }}
                />
                <div>
                  <h3 style={{ marginTop: 0, marginBottom: 'var(--spacing-xs)' }}>
                    Scale
                  </h3>
                  <p className="score-display" style={{ marginBottom: 'var(--spacing-sm)' }}>
                    £{userData?.founder && selectedPlan === 'Scale' ? 99 : plans.Scale.price}
                    <span style={{ fontSize: '19px', color: 'var(--color-text)' }}>
                      / month inc VAT
                    </span>
                  </p>
                  <ul style={{ marginBottom: 0 }}>
                    <li>Everything + priority optimisation</li>
                    <li>Multi-location support</li>
                    <li>Fair use policy</li>
                    <li>Dedicated account manager</li>
                  </ul>
                  <p style={{ marginTop: 'var(--spacing-sm)', fontSize: '14px', color: 'var(--color-green)', fontWeight: 600 }}>
                    ✓ {plans.Scale.includedJobsLabel}
                  </p>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                    {plans.Scale.overageLabel}
                  </p>
                </div>
              </label>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)' }}>
            <div className="panel" style={{ marginBottom: 'var(--spacing-lg)', maxWidth: '520px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'left' }}>
              <p style={{ marginBottom: 'var(--spacing-sm)', fontWeight: 600, fontSize: '16px' }}>Cost calculator</p>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-sm)' }}>How many jobs does Katie book per month?</p>
              <input
                type="range"
                min="0"
                max="200"
                value={calculatorJobs}
                onChange={(e) => setCalculatorJobs(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-primary)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                <span>0 jobs</span>
                <span style={{ fontWeight: 600, color: 'var(--color-navy)' }}>{calculatorJobs} jobs/month</span>
                <span>200 jobs</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginTop: 'var(--spacing-sm)', fontSize: '13px' }}>
                {Object.entries(plans).map(([key, plan]) => {
                  const basePrice = userData?.founder ? founderPrice : plan.price;
                  const extra = plan.includedJobs > 0 ? Math.max(0, calculatorJobs - plan.includedJobs) : 0;
                  const overage = extra * (plan.overageRate || 0);
                  const total = (basePrice || 0) + overage;
                  return (
                    <div key={key} style={{ padding: '10px 8px', borderRadius: '8px', background: selectedPlan === key ? 'var(--color-green-100)' : 'var(--color-offwhite)', border: selectedPlan === key ? '2px solid var(--color-green)' : '1px solid var(--color-border)', textAlign: 'center' }}>
                      <span style={{ fontWeight: 600, fontSize: '12px' }}>{plan.name}</span>
                      <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px' }}>
                        £{total}<span style={{ fontSize: '12px', fontWeight: 400, color: 'var(--color-text-secondary)' }}>/mo</span>
                      </div>
                      {overage > 0 && (
                        <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>£{overage} overage</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
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
