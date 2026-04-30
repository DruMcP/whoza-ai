import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Loader2, Users, Clock, TrendingUp, PoundSterling, Mail, Calendar, AlertCircle } from 'lucide-react';

export default function AdminTrials() {
  const { isAdmin } = useAuth();
  const [metrics, setMetrics] = useState(null);
  const [waitlist, setWaitlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    if (!isAdmin) return;
    loadData();
  }, [isAdmin]);

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      // Load trial metrics
      const { data: metricsData, error: metricsError } = await supabase.rpc('get_trial_metrics');
      if (metricsError) throw metricsError;
      setMetrics(metricsData);

      // Load waitlist entries
      const { data: waitlistData, error: waitlistError } = await supabase
        .from('trial_waitlist')
        .select('*')
        .order('position', { ascending: true })
        .limit(50);
      if (waitlistError) throw waitlistError;
      setWaitlist(waitlistData || []);

      setLastUpdated(new Date());
    } catch (err) {
      console.error('Failed to load trial data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!isAdmin) {
    return (
      <>
        <Header />
        <main style={{ paddingTop: '80px' }}>
          <div className="ds-container py-12 text-center">
            <AlertCircle size={48} style={{ color: 'var(--color-red)', margin: '0 auto 16px' }} />
            <h1 className="ds-heading-2 mb-2">Access Denied</h1>
            <p className="ds-body">This page is for administrators only.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main style={{ paddingTop: '80px' }}>
        <div className="ds-container py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="ds-heading-2 mb-1">Trial Dashboard</h1>
              <p className="ds-body-sm" style={{ color: 'var(--color-slate)' }}>
                Monitor trial signups, waitlist, and conversion metrics
              </p>
            </div>
            <button
              onClick={loadData}
              disabled={loading}
              className="ds-btn ds-btn-secondary"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Clock size={16} />}
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          {error && (
            <div
              className="rounded-xl p-4 mb-6"
              style={{ background: 'var(--color-red-100)', border: '1px solid var(--color-red-200)' }}
            >
              <p style={{ color: 'var(--color-red)' }}>
                <AlertCircle size={16} className="inline mr-2" />
                {error}
              </p>
              <p className="text-sm mt-1" style={{ color: 'var(--color-red-700)' }}>
                The trial tables or RPC functions may not be deployed yet. Run the SQL migration first.
              </p>
            </div>
          )}

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <KPICard
              icon={Users}
              label="Trials This Week"
              value={metrics?.current_week?.slots_used ?? 0}
              subValue={`/${metrics?.current_week?.slots_total ?? 25} slots`}
              color="blue"
            />
            <KPICard
              icon={Mail}
              label="Waitlist Size"
              value={metrics?.waitlist_total ?? 0}
              subValue="people waiting"
              color="amber"
            />
            <KPICard
              icon={TrendingUp}
              label="Conversion Rate"
              value={`${metrics?.conversion_rate ?? 0}%`}
              subValue={metrics?.conversions_this_week ? `${metrics.conversions_this_week} this week` : 'No conversions yet'}
              color="green"
            />
            <KPICard
              icon={PoundSterling}
              label="Active Trials"
              value={metrics?.trials_active ?? 0}
              subValue={metrics?.trials_expired_this_week ? `${metrics.trials_expired_this_week} expired this week` : 'None expired'}
              color="navy"
            />
          </div>

          {/* Current Week Progress */}
          {metrics?.current_week && (
            <div className="ds-card mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="ds-heading-3">Weekly Slot Usage</h2>
                <span className="ds-badge ds-badge-blue">
                  <Calendar size={12} className="mr-1" />
                  Week starting {new Date(metrics.current_week.week_starting).toLocaleDateString('en-GB')}
                </span>
              </div>
              <div className="mb-2">
                <div
                  className="h-3 rounded-full overflow-hidden"
                  style={{ background: 'var(--color-lightgray)' }}
                >
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min(100, ((metrics.current_week.slots_used / metrics.current_week.slots_total) * 100))}%`,
                      background: metrics.current_week.slots_remaining > 0 ? 'var(--color-blue)' : 'var(--color-red)',
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-between text-sm" style={{ color: 'var(--color-slate)' }}>
                <span>{metrics.current_week.slots_used} used</span>
                <span>{metrics.current_week.slots_remaining} remaining</span>
              </div>
            </div>
          )}

          {/* Waitlist Table */}
          <div className="ds-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="ds-heading-3">Waitlist</h2>
              <span className="ds-badge ds-badge-amber">
                {waitlist.length} entries
              </span>
            </div>

            {waitlist.length === 0 ? (
              <div className="text-center py-8" style={{ color: 'var(--color-slate)' }}>
                <Mail size={32} className="mx-auto mb-2 opacity-50" />
                <p>No one on the waitlist yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <th className="text-left py-3 px-2 font-semibold" style={{ color: 'var(--color-navy)' }}>#</th>
                      <th className="text-left py-3 px-2 font-semibold" style={{ color: 'var(--color-navy)' }}>Business</th>
                      <th className="text-left py-3 px-2 font-semibold" style={{ color: 'var(--color-navy)' }}>Trade</th>
                      <th className="text-left py-3 px-2 font-semibold" style={{ color: 'var(--color-navy)' }}>Status</th>
                      <th className="text-left py-3 px-2 font-semibold" style={{ color: 'var(--color-navy)' }}>Added</th>
                    </tr>
                  </thead>
                  <tbody>
                    {waitlist.map((entry) => (
                      <tr
                        key={entry.id}
                        style={{ borderBottom: '1px solid var(--color-border)' }}
                        className="hover:bg-gray-50"
                      >
                        <td className="py-3 px-2 font-medium" style={{ color: 'var(--color-navy)' }}>
                          {entry.position}
                        </td>
                        <td className="py-3 px-2">
                          <div>
                            <p className="font-medium" style={{ color: 'var(--color-navy)' }}>{entry.business_name || '—'}</p>
                            <p className="text-xs" style={{ color: 'var(--color-slate)' }}>{entry.email}</p>
                          </div>
                        </td>
                        <td className="py-3 px-2" style={{ color: 'var(--color-slate)' }}>
                          {entry.trade_type || '—'}
                        </td>
                        <td className="py-3 px-2">
                          <StatusBadge status={entry.status} />
                        </td>
                        <td className="py-3 px-2" style={{ color: 'var(--color-slate)' }}>
                          {new Date(entry.created_at).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {lastUpdated && (
            <p className="text-center text-xs mt-4" style={{ color: 'var(--color-slate)' }}>
              Last updated: {lastUpdated.toLocaleTimeString('en-GB')}
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function KPICard({ icon: Icon, label, value, subValue, color }) {
  const colorMap = {
    blue: { bg: 'var(--color-blue-100)', text: 'var(--color-blue-600)', icon: 'var(--color-blue)' },
    amber: { bg: 'var(--color-amber-100)', text: 'var(--color-amber-600)', icon: 'var(--color-amber)' },
    green: { bg: 'var(--color-green-100)', text: 'var(--color-green)', icon: 'var(--color-green)' },
    navy: { bg: 'var(--color-navy-100)', text: 'var(--color-navy)', icon: 'var(--color-navy)' },
  };
  const c = colorMap[color] || colorMap.blue;

  return (
    <div className="ds-card flex items-start gap-4">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: c.bg }}
      >
        <Icon size={20} style={{ color: c.icon }} />
      </div>
      <div>
        <p className="text-sm mb-1" style={{ color: 'var(--color-slate)' }}>{label}</p>
        <p className="font-extrabold text-2xl" style={{ color: 'var(--color-navy)', fontFamily: 'var(--font-heading)' }}>
          {value}
        </p>
        <p className="text-xs" style={{ color: 'var(--color-slate)' }}>{subValue}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    waiting: { bg: 'var(--color-blue-100)', color: 'var(--color-blue-600)', label: 'Waiting' },
    notified: { bg: 'var(--color-amber-100)', color: 'var(--color-amber-600)', label: 'Notified' },
    activated: { bg: 'var(--color-green-100)', color: 'var(--color-green)', label: 'Activated' },
    expired: { bg: 'var(--color-red-100)', color: 'var(--color-red)', label: 'Expired' },
    cancelled: { bg: 'var(--color-gray-100)', color: 'var(--color-slate)', label: 'Cancelled' },
  };
  const s = styles[status] || styles.waiting;

  return (
    <span
      className="inline-flex px-2 py-1 rounded-full text-xs font-medium"
      style={{ background: s.bg, color: s.color }}
    >
      {s.label}
    </span>
  );
}
