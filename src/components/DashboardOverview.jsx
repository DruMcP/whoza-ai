import { useState, useEffect, useCallback } from 'react';
import { dashboardService } from '../services/dashboardService';
import ECEPillarBreakdown from './ECEPillarBreakdown';
import ECEBrandBadge from './ECEBrandBadge';

export default function DashboardOverview({ userId }) {
  const [currentScore, setCurrentScore] = useState(null);
  const [latestTask, setLatestTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDashboardData = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);
      const [score, task] = await Promise.all([
        dashboardService.getCurrentScore(userId),
        dashboardService.getLatestTask(userId),
      ]);
      setCurrentScore(score);
      setLatestTask(task);
    } catch (error) {
      // Error displayed in UI via setError
      setError('Failed to load dashboard data. Please try refreshing the page.');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const getStatusBadgeClass = (status) => {
    const statusMap = {
      Draft: 'status-badge-draft',
      Sent: 'status-badge-sent',
      Approved: 'status-badge-approved',
      Completed: 'status-badge-completed',
    };
    return statusMap[status] || 'status-badge-draft';
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'var(--color-success-600)';
    if (score >= 60) return 'var(--color-warning-600)';
    if (score >= 40) return 'var(--color-warning-700)';
    return 'var(--color-error-600)';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  if (loading) {
    return (
      <div className="dashboard-overview-loading">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-overview-error" style={{
        padding: '2rem',
        textAlign: 'center',
        backgroundColor: '#FEF2F2',
        border: '1px solid #FCA5A5',
        borderRadius: '8px',
        color: '#991B1B'
      }}>
        <svg style={{ width: '48px', height: '48px', margin: '0 auto 1rem', color: '#DC2626' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>{error}</p>
        <button
          onClick={loadDashboardData}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#DC2626',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  const scoreValue = currentScore?.overall_score || 0;
  const scoreColor = getScoreColor(scoreValue);

  return (
    <div className="dashboard-overview">
      <div className="overview-cards">
        <div className="score-card">
          <div className="score-card-header">
            <h2>AI Visibility Score (VCS)</h2>
            <span className="score-label" style={{ color: scoreColor }}>
              {getScoreLabel(scoreValue)}
            </span>
          </div>
          <div className="score-display">
            <div className="score-circle">
              <svg viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke="var(--color-border)"
                  strokeWidth="12"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke={scoreColor}
                  strokeWidth="12"
                  strokeDasharray={`${(scoreValue / 100) * 534} 534`}
                  strokeLinecap="round"
                  transform="rotate(-90 100 100)"
                />
              </svg>
              <div className="score-value">
                <span className="score-number">{Math.round(scoreValue)}</span>
                <span className="score-max">/100</span>
              </div>
            </div>
            {currentScore && currentScore.notes && (
              <p className="score-notes">{currentScore.notes}</p>
            )}
            {!currentScore && (
              <p className="score-notes">
                Your initial AI Visibility Score will be calculated once your baseline assessment is complete.
              </p>
            )}
          </div>
        </div>

        <div className="task-card">
          <div className="task-card-header">
            <h2>Latest Weekly Task</h2>
            {latestTask && (
              <span className={`status-badge ${getStatusBadgeClass(latestTask.status)}`}>
                {latestTask.status}
              </span>
            )}
          </div>
          {latestTask ? (
            <div className="task-content">
              <h3 className="task-title">{latestTask.recommended_action}</h3>
              {latestTask.copy_paste_text && (
                <div className="task-description">
                  <p>{latestTask.copy_paste_text.substring(0, 200)}...</p>
                </div>
              )}
              <div className="task-meta">
                {latestTask.sent_at && (
                  <div className="task-meta-item">
                    <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span>Sent {new Date(latestTask.sent_at).toLocaleDateString()}</span>
                  </div>
                )}
                {latestTask.approved_at && (
                  <div className="task-meta-item">
                    <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Approved {new Date(latestTask.approved_at).toLocaleDateString()}</span>
                  </div>
                )}
                {latestTask.completed_at && (
                  <div className="task-meta-item">
                    <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Completed {new Date(latestTask.completed_at).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
              <a href="/tasks" className="button button-secondary task-view-button">
                View Full Task Details
              </a>
            </div>
          ) : (
            <div className="task-empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="48" height="48">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p>No tasks assigned yet</p>
              <span>Your first weekly task will appear here once your baseline assessment is complete.</span>
            </div>
          )}
        </div>
      </div>

      {currentScore && currentScore.pillar_scores && (
        <div style={{ marginTop: 'var(--spacing-3xl)' }}>
          <ECEPillarBreakdown
            pillarScores={currentScore.pillar_scores}
            loading={false}
          />
        </div>
      )}

      <div style={{ marginTop: 'var(--spacing-2xl)', display: 'flex', justifyContent: 'center' }}>
        <ECEBrandBadge />
      </div>
    </div>
  );
}
