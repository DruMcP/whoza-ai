import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from './Header';
import Footer from './Footer';

/**
 * TrialExpiryGate
 * Blocks access to voice features when the 14-day trial has expired
 * Shows upgrade CTA
 */
export default function TrialExpiryGate({ children }) {
  const { userData } = useAuth();

  // Check if trial has expired
  const isTrialExpired = userData?.subscription_status === 'trial_expired' ||
    userData?.subscription_tier === 'free' && userData?.trial_ends_at &&
    new Date(userData.trial_ends_at) < new Date();

  const isActivePaid = userData?.subscription_status === 'active' &&
    userData?.subscription_tier !== 'free';

  if (isActivePaid) {
    return children;
  }

  if (!isTrialExpired) {
    return children; // Trial still active or not on trial
  }

  return (
    <div>
      <Header />
      <main>
        <div className="container" style={{ maxWidth: '600px', padding: '80px 20px', textAlign: 'center' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(194, 255, 72, 0.1) 0%, rgba(194, 255, 72, 0.05) 100%)',
            border: '2px solid var(--color-primary-500)',
            borderRadius: '16px',
            padding: '48px 32px'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏰</div>
            <h1 style={{ marginBottom: '12px' }}>Your Trial Has Ended</h1>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px', fontSize: '16px' }}>
              Your 14-day free trial of whoza.ai Voice + AI Visibility has ended.
              Add a payment method to keep your AI receptionist working 24/7.
            </p>

            <div style={{
              background: 'var(--color-bg-secondary)',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '24px',
              textAlign: 'left'
            }}>
              <h3 style={{ marginBottom: '16px' }}>What you'll lose if you don't upgrade:</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ padding: '8px 0', borderBottom: '1px solid var(--color-border)' }}>
                  ❌ AI answering your calls 24/7
                </li>
                <li style={{ padding: '8px 0', borderBottom: '1px solid var(--color-border)' }}>
                  ❌ Automatic job booking into your diary
                </li>
                <li style={{ padding: '8px 0', borderBottom: '1px solid var(--color-border)' }}>
                  ❌ Spam and cold caller filtering
                </li>
                <li style={{ padding: '8px 0' }}>
                  ❌ WhatsApp call summaries after every call
                </li>
              </ul>
            </div>

            <Link to="/pricing" className="btn-primary btn-large" style={{ display: 'block', marginBottom: '12px' }}>
              Upgrade Now — Keep My AI →
            </Link>

            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              💯 Guarantee: If whoza.ai doesn't book you at least one extra job in month one, month two is free.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
