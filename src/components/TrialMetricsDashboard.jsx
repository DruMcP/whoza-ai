import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

/**
 * TrialMetricsDashboard
 * Admin view for monitoring trial slot usage, waitlist, and conversions
 * Intended for /admin/trials route (protected)
 */
export default function TrialMetricsDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMetrics();
    const interval = setInterval(loadMetrics, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  async function loadMetrics() {
    try {
      const { data, error } = await supabase.rpc('get_trial_metrics');
      if (error) throw error;
      setMetrics(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <div className="spinner" style={{ margin: '0 auto 16px' }} />
        <p>Loading trial metrics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '40px', color: '#DC2626' }}>
        Error loading metrics: {error}
      </div>
    );
  }

  const currentWeek = metrics?.current_week;
  const waitlistTotal = metrics?.waitlist_total ?? 0;
  const trialsActive = metrics?.trials_active ?? 0;
  const conversionRate = metrics?.conversion_rate ?? 0;

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '8px' }}>Trial & Waitlist Dashboard</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px' }}>
        Real-time overview of trial slots, waitlist, and conversions
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px',
        marginBottom: '40px',
      }}>
        {/* Current Week Slots */}
        <div style={{
          background: 'var(--color-bg-secondary)',
          borderRadius: '12px',
          padding: '24px',
          border: '2px solid var(--color-border)',
        }}>
          <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
            This Week's Slots
          </div>
          <div style={{ fontSize: '36px', fontWeight: 700, marginBottom: '4px' }}>
            {currentWeek?.slots_remaining ?? 0}
            <span style={{ fontSize: '18px', fontWeight: 400, color: 'var(--color-text-secondary)' }}>
              {' '}/ {currentWeek?.slots_total ?? 25} remaining
            </span>
          </div>
          <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            Week starting {currentWeek?.week_starting ? new Date(currentWeek.week_starting).toLocaleDateString() : '—'}
          </div>
        </div>

        {/* Waitlist */}
        <div style={{
          background: 'var(--color-bg-secondary)',
          borderRadius: '12px',
          padding: '24px',
          border: '2px solid var(--color-border)',
        }}>
          <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
            Waitlist
          </div>
          <div style={{ fontSize: '36px', fontWeight: 700, marginBottom: '4px' }}>
            {waitlistTotal}
          </div>
          <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            People waiting for next Monday
          </div>
        </div>

        {/* Active Trials */}
        <div style={{
          background: 'var(--color-bg-secondary)',
          borderRadius: '12px',
          padding: '24px',
          border: '2px solid var(--color-border)',
        }}>
          <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
            Active Trials
          </div>
          <div style={{ fontSize: '36px', fontWeight: 700, marginBottom: '4px' }}>
            {trialsActive}
          </div>
          <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            Currently in 7-day trial period
          </div>
        </div>

        {/* Conversion Rate */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(194, 255, 72, 0.1) 0%, rgba(194, 255, 72, 0.05) 100%)',
          borderRadius: '12px',
          padding: '24px',
          border: '2px solid var(--color-primary-500)',
        }}>
          <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
            Trial Conversion Rate
          </div>
          <div style={{ fontSize: '36px', fontWeight: 700, marginBottom: '4px', color: 'var(--color-primary-500)' }}>
            {conversionRate}%
          </div>
          <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            Trials → paid customers
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        background: 'var(--color-bg-secondary)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '40px',
      }}>
        <h3 style={{ marginBottom: '16px' }}>Quick Actions</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={loadMetrics}
            className="btn-secondary"
          >
            🔄 Refresh Data
          </button>
          <button
            onClick={async () => {
              if (!confirm('Manually process waitlist activations? This will notify up to 25 people.')) return;
              try {
                const { data, error } = await supabase.rpc('process_waitlist_activations', { p_limit: 25 });
                if (error) throw error;
                alert(`Notified ${data.activated} people. ${data.remaining} still waiting.`);
                loadMetrics();
              } catch (err) {
                alert('Error: ' + err.message);
              }
            }}
            className="btn-primary"
          >
            📧 Notify Waitlist (25)
          </button>
        </div>
      </div>

      {/* Cost Estimate */}
      <div style={{
        background: 'var(--color-bg-secondary)',
        borderRadius: '12px',
        padding: '24px',
      }}>
        <h3 style={{ marginBottom: '16px' }}>Estimated Weekly Burn</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Voice costs (est.)</div>
            <div style={{ fontSize: '20px', fontWeight: 600 }}>£{(trialsActive * 7).toFixed(2)}</div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>~£7/active trial</div>
          </div>
          <div>
            <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Infrastructure</div>
            <div style={{ fontSize: '20px', fontWeight: 600 }}>£{(trialsActive * 1.5).toFixed(2)}</div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Supabase, Resend, etc.</div>
          </div>
          <div>
            <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Total weekly burn</div>
            <div style={{ fontSize: '20px', fontWeight: 600, color: '#DC2626' }}>£{(trialsActive * 8.5).toFixed(2)}</div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Cap: £212.50 (25 trials)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
