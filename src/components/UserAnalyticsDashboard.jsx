import { useState, useEffect } from 'react';
import { analyticsService } from '../services/analyticsService';
import { useAuth } from '../contexts/AuthContext';

export default function UserAnalyticsDashboard() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      loadAnalytics();
    }
  }, [user]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const data = await analyticsService.getUserDashboardData(user.id);
      setAnalytics(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="analytics-dashboard">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading your analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="analytics-dashboard">
        <div className="error-state">
          <p>Unable to load analytics: {error}</p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return null;
  }

  return (
    <div className="analytics-dashboard">
      <div className="analytics-header">
        <h2>Your Performance Metrics</h2>
        <p>Track your progress and engagement over time</p>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">📊</div>
          <div className="metric-content">
            <h3>Engagement Score</h3>
            <p className="metric-value">{analytics.engagementScore}/100</p>
            <p className="metric-label">
              {analytics.engagementScore >= 80
                ? 'Excellent engagement!'
                : analytics.engagementScore >= 50
                  ? 'Good engagement'
                  : 'Could be better'}
            </p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">✅</div>
          <div className="metric-content">
            <h3>Task Completion</h3>
            <p className="metric-value">{analytics.taskCompletionRate.toFixed(1)}%</p>
            <p className="metric-label">
              {analytics.taskCompletionRate >= 80
                ? 'Great job!'
                : 'Keep going!'}
            </p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">🔐</div>
          <div className="metric-content">
            <h3>Logins This Month</h3>
            <p className="metric-value">{analytics.loginsThisMonth}</p>
            <p className="metric-label">Portal visits</p>
          </div>
        </div>

        {analytics.lifetimeValue && (
          <div className="metric-card">
            <div className="metric-icon">💎</div>
            <div className="metric-content">
              <h3>Lifetime Value</h3>
              <p className="metric-value">£{analytics.lifetimeValue.predicted_ltv}</p>
              <p className="metric-label">Predicted value</p>
            </div>
          </div>
        )}
      </div>

      <div className="analytics-charts">
        {analytics.taskTrend && analytics.taskTrend.length > 0 && (
          <div className="chart-section">
            <h3>Task Completion Trend</h3>
            <div className="chart-container">
              <div className="simple-bar-chart">
                {analytics.taskTrend.map((item, index) => (
                  <div key={index} className="bar-item">
                    <div className="bar-group">
                      <div
                        className="bar bar-assigned"
                        style={{
                          height: `${(item.assigned / Math.max(...analytics.taskTrend.map(t => t.assigned), 1)) * 100}%`,
                        }}
                        title={`${item.assigned} assigned`}
                      ></div>
                      <div
                        className="bar bar-completed"
                        style={{
                          height: `${(item.completed / Math.max(...analytics.taskTrend.map(t => t.assigned), 1)) * 100}%`,
                        }}
                        title={`${item.completed} completed`}
                      ></div>
                    </div>
                    <div className="bar-label">
                      {new Date(item.period).toLocaleDateString('en-GB', {
                        month: 'short',
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <div className="chart-legend">
                <span className="legend-item">
                  <span className="legend-color bar-assigned"></span> Assigned
                </span>
                <span className="legend-item">
                  <span className="legend-color bar-completed"></span> Completed
                </span>
              </div>
            </div>
          </div>
        )}

        {analytics.scoreTrend && analytics.scoreTrend.length > 0 && (
          <div className="chart-section">
            <h3>Visibility Confidence Score™ Trend</h3>
            <div className="chart-container">
              <div className="simple-line-chart">
                {analytics.scoreTrend.map((item, index) => {
                  const maxScore = 100;
                  const heightPercent = (item.overall_score / maxScore) * 100;

                  return (
                    <div key={index} className="line-point">
                      <div
                        className="point"
                        style={{ bottom: `${heightPercent}%` }}
                        title={`Score: ${item.overall_score}`}
                      >
                        <div className="point-value">{item.overall_score}</div>
                      </div>
                      <div className="point-label">
                        {new Date(item.score_date).toLocaleDateString('en-GB', {
                          month: 'short',
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {analytics.monthlyMetrics && analytics.monthlyMetrics.length > 0 && (
        <div className="detailed-metrics">
          <h3>Monthly Breakdown</h3>
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Tasks Assigned</th>
                  <th>Tasks Completed</th>
                  <th>Completion Rate</th>
                  <th>Logins</th>
                  <th>Engagement Score</th>
                </tr>
              </thead>
              <tbody>
                {analytics.monthlyMetrics.map((metric, index) => (
                  <tr key={index}>
                    <td>
                      {new Date(metric.period_start).toLocaleDateString('en-GB', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </td>
                    <td>{metric.tasks_assigned}</td>
                    <td>{metric.tasks_completed}</td>
                    <td>
                      <span
                        className={`completion-badge ${metric.task_completion_rate >= 80 ? 'high' : metric.task_completion_rate >= 50 ? 'medium' : 'low'}`}
                      >
                        {metric.task_completion_rate.toFixed(1)}%
                      </span>
                    </td>
                    <td>{metric.logins_count}</td>
                    <td>
                      <span className="engagement-score">
                        {metric.engagement_score}/100
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="analytics-footer">
        <p>
          <strong>Note:</strong> Analytics are updated daily. Your engagement score is
          calculated based on logins, portal visits, and task completion rate.
        </p>
      </div>
    </div>
  );
}
