import { useState, useEffect } from 'react';
import { analyticsService } from '../services/analyticsService';

export default function PlatformAnalyticsDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeView, setActiveView] = useState('overview');

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const data = await analyticsService.getAdminDashboardData();
      setAnalytics(data);
    } catch (err) {
      // TODO: Review error handling: console.error('Error loading platform analytics:', err)
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="platform-analytics">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading platform analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="platform-analytics">
        <div className="error-state">
          <p>Unable to load analytics: {error}</p>
        </div>
      </div>
    );
  }

  if (!analytics) return null;

  return (
    <div className="platform-analytics">
      <div className="analytics-header">
        <h2>Platform Analytics & Business Intelligence</h2>
        <div className="view-toggles">
          <button
            className={`toggle-button ${activeView === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveView('overview')}
          >
            Overview
          </button>
          <button
            className={`toggle-button ${activeView === 'conversion' ? 'active' : ''}`}
            onClick={() => setActiveView('conversion')}
          >
            Conversion
          </button>
          <button
            className={`toggle-button ${activeView === 'retention' ? 'active' : ''}`}
            onClick={() => setActiveView('retention')}
          >
            Retention
          </button>
          <button
            className={`toggle-button ${activeView === 'ltv' ? 'active' : ''}`}
            onClick={() => setActiveView('ltv')}
          >
            LTV
          </button>
        </div>
      </div>

      {activeView === 'overview' && (
        <div className="overview-section">
          <div className="kpi-grid">
            <div className="kpi-card highlight">
              <div className="kpi-icon">👥</div>
              <div className="kpi-content">
                <h3>Total Users</h3>
                <p className="kpi-value">{analytics.overview.totalUsers}</p>
                <p className="kpi-subtext">
                  {analytics.overview.activeUsers} active (30d)
                </p>
              </div>
            </div>

            <div className="kpi-card highlight">
              <div className="kpi-icon">💰</div>
              <div className="kpi-content">
                <h3>MRR</h3>
                <p className="kpi-value">£{analytics.overview.mrr?.toFixed(2) || 0}</p>
                <p className="kpi-subtext">Monthly Recurring Revenue</p>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon">📈</div>
              <div className="kpi-content">
                <h3>Conversion Rate</h3>
                <p className="kpi-value">{analytics.overview.conversionRate?.toFixed(1) || 0}%</p>
                <p className="kpi-subtext">Trial to paid</p>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon">📉</div>
              <div className="kpi-content">
                <h3>Churn Rate</h3>
                <p className="kpi-value">{analytics.overview.churnRate?.toFixed(1) || 0}%</p>
                <p className="kpi-subtext">Monthly churn</p>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon">⭐</div>
              <div className="kpi-content">
                <h3>Avg Visibility Confidence Score™</h3>
                <p className="kpi-value">{analytics.overview.averageVisibilityScore}/100</p>
                <p className="kpi-subtext">Platform average</p>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon">💎</div>
              <div className="kpi-content">
                <h3>Average LTV</h3>
                <p className="kpi-value">£{analytics.overview.average_ltv?.toFixed(2) || 0}</p>
                <p className="kpi-subtext">Per customer</p>
              </div>
            </div>
          </div>

          {analytics.monthlyMetrics && analytics.monthlyMetrics.length > 0 && (
            <div className="monthly-trend-section">
              <h3>Monthly Platform Metrics</h3>
              <div className="metrics-table-container">
                <table className="metrics-table">
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th>New Signups</th>
                      <th>Active Users</th>
                      <th>Paying</th>
                      <th>Tasks Completed</th>
                      <th>MRR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.monthlyMetrics.map((metric, index) => (
                      <tr key={index}>
                        <td>
                          {new Date(metric.period_start).toLocaleDateString('en-GB', {
                            month: 'short',
                            year: 'numeric',
                          })}
                        </td>
                        <td>{metric.new_signups}</td>
                        <td>{metric.active_users}</td>
                        <td>{metric.paying_customers}</td>
                        <td>{metric.total_tasks_completed}</td>
                        <td>£{metric.mrr?.toFixed(2) || 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {activeView === 'conversion' && analytics.funnel && (
        <div className="conversion-section">
          <h3>Conversion Funnel (Last 30 Days)</h3>
          <div className="funnel-chart">
            <div className="funnel-step">
              <div className="funnel-bar" style={{ width: '100%' }}>
                <span className="funnel-label">Signups</span>
                <span className="funnel-value">{analytics.funnel.signups}</span>
              </div>
            </div>
            <div className="funnel-step">
              <div
                className="funnel-bar"
                style={{
                  width: `${(analytics.funnel.profilesCreated / analytics.funnel.signups) * 100 || 0}%`,
                }}
              >
                <span className="funnel-label">Profiles Created</span>
                <span className="funnel-value">{analytics.funnel.profilesCreated}</span>
              </div>
            </div>
            <div className="funnel-step">
              <div
                className="funnel-bar"
                style={{
                  width: `${(analytics.funnel.tasksCompleted / analytics.funnel.signups) * 100 || 0}%`,
                }}
              >
                <span className="funnel-label">Tasks Completed</span>
                <span className="funnel-value">{analytics.funnel.tasksCompleted}</span>
              </div>
            </div>
            <div className="funnel-step">
              <div
                className="funnel-bar highlight"
                style={{
                  width: `${(analytics.funnel.paidConversions / analytics.funnel.signups) * 100 || 0}%`,
                }}
              >
                <span className="funnel-label">Paid Conversions</span>
                <span className="funnel-value">{analytics.funnel.paidConversions}</span>
              </div>
            </div>
          </div>
          <div className="funnel-summary">
            <p>
              <strong>Overall Conversion Rate:</strong> {analytics.funnel.conversionRate}%
            </p>
          </div>
        </div>
      )}

      {activeView === 'retention' && analytics.churn && (
        <div className="retention-section">
          <h3>Churn Analysis</h3>
          <div className="churn-stats">
            <div className="stat-card">
              <h4>Total Paying Customers</h4>
              <p className="stat-value">{analytics.churn.totalPaying}</p>
            </div>
            <div className="stat-card">
              <h4>Cancelled (Recent)</h4>
              <p className="stat-value">{analytics.churn.cancelled}</p>
            </div>
            <div className="stat-card">
              <h4>Renewed (Recent)</h4>
              <p className="stat-value">{analytics.churn.renewed}</p>
            </div>
            <div className="stat-card highlight">
              <h4>Churn Rate</h4>
              <p className="stat-value">{analytics.churn.churnRate}%</p>
            </div>
          </div>

          {analytics.churn.reasons && Object.keys(analytics.churn.reasons).length > 0 && (
            <div className="churn-reasons">
              <h4>Churn Reasons</h4>
              <ul className="reasons-list">
                {Object.entries(analytics.churn.reasons).map(([reason, count]) => (
                  <li key={reason}>
                    <span className="reason-text">{reason}</span>
                    <span className="reason-count">{count}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {activeView === 'ltv' && analytics.ltv && (
        <div className="ltv-section">
          <h3>Lifetime Value Analysis</h3>
          <div className="ltv-overview">
            <div className="ltv-stat">
              <h4>Average LTV</h4>
              <p className="ltv-value">£{analytics.ltv.averageLTV}</p>
            </div>
            <div className="ltv-stat">
              <h4>High-Value Users</h4>
              <p className="ltv-value">{analytics.ltv.highValueCount}</p>
              <p className="ltv-label">Above avg by 50%+</p>
            </div>
            <div className="ltv-stat warning">
              <h4>At-Risk Users</h4>
              <p className="ltv-value">{analytics.ltv.atRiskCount}</p>
              <p className="ltv-label">Risk score &gt; 0.7</p>
            </div>
          </div>

          {analytics.ltv.distribution && (
            <div className="ltv-distribution">
              <h4>LTV Distribution</h4>
              <div className="distribution-chart">
                {Object.entries(analytics.ltv.distribution).map(([range, count]) => (
                  <div key={range} className="distribution-bar">
                    <span className="range-label">{range}</span>
                    <div className="bar-container">
                      <div
                        className="bar"
                        style={{
                          width: `${(count / Math.max(...Object.values(analytics.ltv.distribution))) * 100}%`,
                        }}
                      ></div>
                      <span className="bar-value">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {analytics.ltv.topUsers && analytics.ltv.topUsers.length > 0 && (
            <div className="top-users">
              <h4>Top 10 Users by LTV</h4>
              <table className="top-users-table">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Predicted LTV</th>
                    <th>Total Revenue</th>
                    <th>Months Active</th>
                    <th>Risk Score</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.ltv.topUsers.map((user) => (
                    <tr key={user.user_id}>
                      <td>{user.user_id.substring(0, 8)}...</td>
                      <td>£{parseFloat(user.predicted_ltv).toFixed(2)}</td>
                      <td>£{parseFloat(user.total_revenue).toFixed(2)}</td>
                      <td>{user.months_active}</td>
                      <td>
                        <span
                          className={`risk-badge ${parseFloat(user.risk_score) > 0.7 ? 'high' : parseFloat(user.risk_score) > 0.4 ? 'medium' : 'low'}`}
                        >
                          {(parseFloat(user.risk_score) * 100).toFixed(0)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
