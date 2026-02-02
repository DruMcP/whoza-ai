import { useState, useEffect, memo } from 'react';
import { dashboardService } from '../services/dashboardService';
import { visibilityScoreService } from '../services/visibilityScoreService';
import EmptyStateNoData from './illustrations/EmptyStateNoData';

function HistoryChart({ userId }) {
  const [scoreHistory, setScoreHistory] = useState([]);
  const [taskHistory, setTaskHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('scores');

  useEffect(() => {
    loadHistory();
  }, [userId]);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const [scores, tasks] = await Promise.all([
        dashboardService.getScoreHistory(userId, 10),
        dashboardService.getTaskHistory(userId, 20),
      ]);
      setScoreHistory(scores);
      setTaskHistory(tasks);
    } catch (error) {
      // TODO: Review error handling: console.error('Error loading history:', error)
    } finally {
      setLoading(false);
    }
  };

  const getScoreChange = (current, previous) => {
    if (!previous || !current) return 0;
    return current - previous;
  };

  if (loading) {
    return (
      <div className="history-loading">
        <div className="loading-spinner"></div>
        <p>Loading history...</p>
      </div>
    );
  }

  return (
    <div className="history-section">
      <div className="history-header">
        <h2>Performance History</h2>
        <div className="history-tabs">
          <button
            className={`tab-button ${activeTab === 'scores' ? 'active' : ''}`}
            onClick={() => setActiveTab('scores')}
          >
            Score Progress
          </button>
          <button
            className={`tab-button ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            Task History
          </button>
        </div>
      </div>

      {activeTab === 'scores' && (
        <div className="history-content">
          {scoreHistory.length > 0 ? (
            <>
              <div className="score-chart">
                <div className="chart-container">
                  {scoreHistory.slice().reverse().map((score, index, arr) => {
                    const maxScore = 100;
                    const height = (score.overall_score / maxScore) * 100;
                    const prevScore = index > 0 ? arr[index - 1].overall_score : null;
                    const change = prevScore ? score.overall_score - prevScore : 0;

                    return (
                      <div key={score.id} className="chart-bar-wrapper">
                        <div
                          className="chart-bar"
                          style={{
                            height: `${height}%`,
                            backgroundColor: height >= 80 ? 'var(--color-success-600)' : height >= 60 ? 'var(--color-warning-600)' : 'var(--color-error-600)'
                          }}
                        >
                          <span className="chart-bar-value">{Math.round(score.overall_score)}</span>
                          {change !== 0 && (
                            <span className={`chart-bar-change ${change > 0 ? 'positive' : 'negative'}`}>
                              {change > 0 ? '+' : ''}{Math.round(change)}
                            </span>
                          )}
                        </div>
                        <span className="chart-bar-label">
                          {new Date(score.score_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="score-history-list">
                {scoreHistory.map((score, index) => {
                  const nextScore = scoreHistory[index + 1];
                  const change = nextScore ? getScoreChange(score.overall_score, nextScore.overall_score) : 0;

                  return (
                    <div key={score.id} className="history-item">
                      <div className="history-item-date">
                        <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <strong>{new Date(score.score_date).toLocaleDateString()}</strong>
                          <span className="history-item-subtitle">
                            Score calculated on {new Date(score.score_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                      </div>
                      <div className="history-item-score">
                        <span className="score-value-large">{Math.round(score.overall_score)}</span>
                        {change !== 0 && (
                          <span className={`score-change ${change > 0 ? 'positive' : 'negative'}`}>
                            {change > 0 ? '+' : ''}{Math.round(change)}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="history-empty">
              <div style={{ width: '160px', height: '160px', margin: '0 auto' }}>
                <EmptyStateNoData />
              </div>
              <p>No score history yet</p>
              <span>Your score history will appear here as we track your progress over time.</span>
            </div>
          )}
        </div>
      )}

      {activeTab === 'tasks' && (
        <div className="history-content">
          {taskHistory.length > 0 ? (
            <div className="task-history-list">
              {taskHistory.map((task) => (
                <div key={task.id} className="history-item task-history-item">
                  <div className="task-history-icon">
                    {task.status === 'Completed' ? (
                      <svg viewBox="0 0 20 20" fill="currentColor" width="24" height="24" style={{ color: 'var(--color-success-600)' }}>
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 20 20" fill="currentColor" width="24" height="24" style={{ color: 'var(--color-warning-600)' }}>
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="task-history-content">
                    <h4>{task.recommended_action}</h4>
                    <div className="task-history-meta">
                      <span className={`status-badge ${task.status === 'Completed' ? 'status-badge-completed' : 'status-badge-approved'}`}>
                        {task.status}
                      </span>
                      <span className="task-history-date">
                        {task.completed_at
                          ? `Completed ${new Date(task.completed_at).toLocaleDateString()}`
                          : task.approved_at
                          ? `Approved ${new Date(task.approved_at).toLocaleDateString()}`
                          : `Sent ${new Date(task.sent_at).toLocaleDateString()}`
                        }
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="history-empty">
              <div style={{ width: '160px', height: '160px', margin: '0 auto' }}>
                <EmptyStateNoData />
              </div>
              <p>No completed tasks yet</p>
              <span>Your completed tasks will be listed here for reference.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default memo(HistoryChart);
