import { useState, useEffect } from 'react';
import { getRealtimeStatus, getCallAnalytics, getMinuteUsage, deactivateDivert, activateDivert, triggerTestCall } from '../services/voiceService';
import { useAuth } from '../contexts/AuthContext';
import Icon from './icons/Icon';

export default function VoiceDashboard() {
  const { userData } = useAuth();
  const [status, setStatus] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [usage, setUsage] = useState(null);
  const [recentCalls, setRecentCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [testCallStatus, setTestCallStatus] = useState('idle');
  const [divertToggling, setDivertToggling] = useState(false);

  const loadVoiceData = async () => {
    try {
      setLoading(true);
      const [statusRes, analyticsRes, usageRes] = await Promise.all([
        getRealtimeStatus(userData.id),
        getCallAnalytics(userData.id, 7),
        getMinuteUsage(userData.id)
      ]);

      if (statusRes.success) setStatus(statusRes.status);
      if (analyticsRes.success) {
        setAnalytics(analyticsRes.analytics);
        setRecentCalls(analyticsRes.calls.slice(0, 5));
      }
      if (usageRes.success) setUsage(usageRes.usage);
    } catch (err) {
      setError('Failed to load voice data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData?.id) {
      loadVoiceData();
      // Poll every 30 seconds for real-time updates
      const interval = setInterval(loadVoiceData, 30000);
      return () => clearInterval(interval);
    }
  }, [userData?.id]);

  const handleDivertToggle = async () => {
    if (!status) return;
    setDivertToggling(true);
    try {
      const result = status.divert_active
        ? await deactivateDivert(userData.id)
        : await activateDivert(userData.id);

      if (result.success) {
        setStatus(prev => ({ ...prev, divert_active: !prev.divert_active }));
      }
    } catch (err) {
      setError('Failed to toggle divert');
    } finally {
      setDivertToggling(false);
    }
  };

  const handleTestCall = async () => {
    setTestCallStatus('calling');
    try {
      const result = await triggerTestCall(userData.id);
      setTestCallStatus(result.success ? 'success' : 'failed');
      setTimeout(() => setTestCallStatus('idle'), 5000);
    } catch (err) {
      setTestCallStatus('failed');
      setTimeout(() => setTestCallStatus('idle'), 5000);
    }
  };

  if (loading) {
    return (
      <div className="voice-dashboard-loading" style={{ textAlign: 'center', padding: '60px' }}>
        <div className="spinner" />
        <p>Loading your voice agent...</p>
      </div>
    );
  }

  if (!status?.trillet_number) {
    return (
      <div className="voice-dashboard-empty" style={{ textAlign: 'center', padding: '60px' }}>
        <Icon name="phone" size={48} />
        <h2>AI Voice Agent Not Set Up</h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
          Complete the voice onboarding to start answering calls with AI.
        </p>
        <a href="/voice/setup" className="btn-primary">Set Up Voice Agent →</a>
      </div>
    );
  }

  const usagePercentage = usage ? Math.min(100, usage.percentage) : 0;
  const usageColor = usagePercentage > 80 ? 'var(--color-error)' : usagePercentage > 50 ? 'var(--color-warning)' : 'var(--color-primary-green)';

  return (
    <div className="voice-dashboard">
      {/* Status Bar */}
      <div className="voice-status-bar" style={{ 
        display: 'flex', 
        gap: '16px', 
        marginBottom: '24px',
        flexWrap: 'wrap'
      }}>
        <div className="status-card" style={{ 
          flex: '1 1 200px',
          padding: '20px',
          borderRadius: '12px',
          background: status?.is_online ? 'var(--color-green-100)' : 'var(--color-neutral-100)',
          border: `2px solid ${status?.is_online ? 'var(--color-primary-green)' : 'var(--color-neutral-300)'}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ 
              width: '12px', 
              height: '12px', 
              borderRadius: '50%', 
              background: status?.is_online ? 'var(--color-primary-green)' : 'var(--color-neutral-500)',
              display: 'inline-block'
            }} />
            <span style={{ fontWeight: 600 }}>{status?.is_online ? '🟢 Online' : '⚪ Paused'}</span>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
            {status?.is_online 
              ? 'Your AI is answering calls 24/7' 
              : 'Call divert is off — calls go to your phone'}
          </p>
        </div>

        <div className="status-card" style={{ 
          flex: '1 1 200px',
          padding: '20px',
          borderRadius: '12px',
          background: 'var(--color-neutral-100)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Icon name="phone" size={20} />
            <span style={{ fontWeight: 600 }}>Your Number</span>
          </div>
          <p style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'monospace' }}>{status?.trillet_number}</p>
          <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Divert code: **21*{status?.trillet_number}#</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="voice-actions" style={{ 
        display: 'flex', 
        gap: '12px', 
        marginBottom: '24px',
        flexWrap: 'wrap'
      }}>
        <button 
          className={`btn ${status?.divert_active ? 'btn-secondary' : 'btn-primary'}`}
          onClick={handleDivertToggle}
          disabled={divertToggling}
        >
          {divertToggling ? 'Updating...' : status?.divert_active ? '📴 Pause Divert' : '📲 Activate Divert'}
        </button>

        <button 
          className="btn btn-secondary"
          onClick={handleTestCall}
          disabled={testCallStatus === 'calling'}
        >
          {testCallStatus === 'idle' && '📞 Test My AI'}
          {testCallStatus === 'calling' && 'Calling...'}
          {testCallStatus === 'success' && '✓ Test sent!'}
          {testCallStatus === 'failed' && '✗ Failed'}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="voice-stats-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div className="stat-card" style={{ padding: '16px', borderRadius: '12px', background: 'var(--color-neutral-100)' }}>
          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Calls Today</div>
          <div style={{ fontSize: '32px', fontWeight: 800, marginTop: '4px' }}>{analytics?.total_calls || 0}</div>
        </div>

        <div className="stat-card" style={{ padding: '16px', borderRadius: '12px', background: 'var(--color-neutral-100)' }}>
          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Jobs Booked</div>
          <div style={{ fontSize: '32px', fontWeight: 800, marginTop: '4px', color: 'var(--color-primary-green)' }}>{analytics?.booked || 0}</div>
        </div>

        <div className="stat-card" style={{ padding: '16px', borderRadius: '12px', background: 'var(--color-neutral-100)' }}>
          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Emergencies</div>
          <div style={{ fontSize: '32px', fontWeight: 800, marginTop: '4px', color: 'var(--color-error)' }}>{analytics?.emergency || 0}</div>
        </div>

        <div className="stat-card" style={{ padding: '16px', borderRadius: '12px', background: 'var(--color-neutral-100)' }}>
          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Spam Blocked</div>
          <div style={{ fontSize: '32px', fontWeight: 800, marginTop: '4px', color: 'var(--color-warning)' }}>{analytics?.spam_blocked || 0}</div>
        </div>
      </div>

      {/* Minute Usage */}
      {usage && (
        <div className="usage-bar" style={{ 
          padding: '20px', 
          borderRadius: '12px', 
          background: 'var(--color-neutral-100)',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontWeight: 600 }}>Minutes This Period</span>
            <span>{usage.used} / {usage.limit} min ({usage.percentage}%)</span>
          </div>
          <div style={{ 
            height: '8px', 
            borderRadius: '4px', 
            background: 'var(--color-neutral-200)',
            overflow: 'hidden'
          }}>
            <div style={{ 
              width: `${usagePercentage}%`, 
              height: '100%', 
              background: usageColor,
              borderRadius: '4px',
              transition: 'width 0.3s ease'
            }} />
          </div>
          <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '8px' }}>
            Period: {new Date(usage.period_start).toLocaleDateString('en-GB')} — {new Date(usage.period_end).toLocaleDateString('en-GB')}
          </p>
        </div>
      )}

      {/* Recent Calls */}
      <div className="recent-calls" style={{ 
        padding: '20px', 
        borderRadius: '12px', 
        background: 'var(--color-neutral-100)'
      }}>
        <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Icon name="phone" size={20} /> Recent Calls
        </h3>

        {recentCalls.length === 0 ? (
          <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center', padding: '20px' }}>
            No calls yet. Your AI is ready — time to activate divert!
          </p>
        ) : (
          <div className="calls-list">
            {recentCalls.map((call) => (
              <div 
                key={call.id} 
                className="call-item"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  padding: '12px',
                  borderBottom: '1px solid var(--color-neutral-200)',
                  borderRadius: '8px'
                }}
              >
                <div style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%',
                  background: call.is_emergency ? 'var(--color-error)' : 
                              call.booking_made ? 'var(--color-primary-green)' : 
                              'var(--color-neutral-500)',
                  flexShrink: 0
                }} />

                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, fontSize: '14px' }}>
                    {call.customer_name || 'Unknown caller'}
                    {call.is_emergency && <span style={{ color: 'var(--color-error)', fontSize: '12px', marginLeft: '8px' }}>🚨 Emergency</span>}
                    {call.booking_made && <span style={{ color: 'var(--color-primary-green)', fontSize: '12px', marginLeft: '8px' }}>✓ Booked</span>}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                    {call.service_requested || 'General enquiry'} • {Math.round(call.duration / 60)}m {call.duration % 60}s
                  </div>
                </div>

                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>
                  {new Date(call.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
