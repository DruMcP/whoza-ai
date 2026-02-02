import { useState, memo } from 'react';
import { taskGenerationService } from '../services/taskGenerationService';
import { supabase } from '../lib/supabase';

function TaskGenerator() {
  const [userId, setUserId] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState(null);

  const analyzeUser = async () => {
    if (!userId) {
      setMessage({ type: 'error', text: 'Please enter a user ID' });
      return;
    }

    try {
      setGenerating(true);
      setMessage(null);

      const { data: user } = await supabase
        .from('users')
        .select('*, business_profiles(*)')
        .eq('id', userId)
        .single();

      if (!user) {
        throw new Error('User not found');
      }

      const profileAnalysis = await taskGenerationService.analyzeBusinessProfile(userId);
      const nextTemplate = await taskGenerationService.selectNextTask(userId);

      setUserInfo(user);
      setAnalysis(profileAnalysis);
      setSelectedTemplate(nextTemplate);

      setMessage({
        type: 'success',
        text: 'User analysis complete',
      });
    } catch (error) {
      // TODO: Review error handling: console.error('Error analyzing user:', error)
      setMessage({ type: 'error', text: error.message || 'Failed to analyze user' });
    } finally {
      setGenerating(false);
    }
  };

  const generateTask = async () => {
    if (!userId) {
      setMessage({ type: 'error', text: 'Please enter a user ID' });
      return;
    }

    try {
      setGenerating(true);
      setMessage(null);

      const task = await taskGenerationService.generateNextTask(userId);

      if (!task) {
        setMessage({
          type: 'warning',
          text: 'No eligible tasks available for this user',
        });
      } else {
        setMessage({
          type: 'success',
          text: `Task generated successfully: "${task.recommended_action}"`,
        });
        await analyzeUser();
      }
    } catch (error) {
      // TODO: Review error handling: console.error('Error generating task:', error)
      setMessage({ type: 'error', text: error.message || 'Failed to generate task' });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="task-generator">
      <div className="generator-header">
        <h2>AI Task Generator</h2>
        <p className="subtitle">
          Generate personalized tasks for users based on their profile and progress
        </p>
      </div>

      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
          <button onClick={() => setMessage(null)} className="message-close">
            ×
          </button>
        </div>
      )}

      <div className="generator-form">
        <div className="form-group">
          <label htmlFor="userId">User ID</label>
          <div className="input-with-button">
            <input
              id="userId"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter user UUID"
            />
            <button
              onClick={analyzeUser}
              disabled={generating || !userId}
              className="button button-secondary"
            >
              {generating ? 'Analyzing...' : 'Analyze User'}
            </button>
          </div>
        </div>
      </div>

      {userInfo && analysis && (
        <div className="analysis-results">
          <div className="user-summary">
            <h3>User Summary</h3>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Business Name</span>
                <span className="summary-value">{userInfo.business_name || 'Not set'}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Trade Type</span>
                <span className="summary-value">{userInfo.trade_type || 'Not set'}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Service Area</span>
                <span className="summary-value">{userInfo.service_area || 'Not set'}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Plan</span>
                <span className="summary-value">{userInfo.plan || 'No plan'}</span>
              </div>
            </div>
          </div>

          <div className="analysis-metrics">
            <div className="metric-card">
              <div className="metric-icon" style={{ backgroundColor: '#10b981' }}>
                <svg viewBox="0 0 20 20" fill="currentColor" width="24" height="24">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="metric-content">
                <span className="metric-value">{analysis.completenessScore}%</span>
                <span className="metric-label">Profile Completeness</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon" style={{ backgroundColor: '#3b82f6' }}>
                <svg viewBox="0 0 20 20" fill="currentColor" width="24" height="24">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              <div className="metric-content">
                <span className="metric-value">{analysis.skillLevel}</span>
                <span className="metric-label">Skill Level</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon" style={{ backgroundColor: '#8b5cf6' }}>
                <svg viewBox="0 0 20 20" fill="currentColor" width="24" height="24">
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="metric-content">
                <span className="metric-value">
                  {userInfo.business_profiles?.[0]?.baseline_created ? 'Yes' : 'No'}
                </span>
                <span className="metric-label">Baseline Created</span>
              </div>
            </div>
          </div>

          {selectedTemplate && (
            <div className="next-task-preview">
              <h3>Next Recommended Task</h3>
              <div className="task-preview-card">
                <div className="task-preview-header">
                  <h4>{selectedTemplate.title}</h4>
                  <div className="task-preview-badges">
                    <span className="badge-category">{selectedTemplate.category}</span>
                    <span className="badge-difficulty">
                      {selectedTemplate.difficulty_level}
                    </span>
                    <span className="badge-priority">
                      Priority: {selectedTemplate.priority_score}
                    </span>
                  </div>
                </div>
                <p className="task-preview-description">{selectedTemplate.description}</p>
                <div className="task-preview-meta">
                  <span>Time: {selectedTemplate.estimated_time_minutes} minutes</span>
                </div>
              </div>

              <button
                onClick={generateTask}
                disabled={generating}
                className="button button-primary button-large"
              >
                {generating ? 'Generating Task...' : 'Generate This Task'}
              </button>
            </div>
          )}

          {!selectedTemplate && (
            <div className="no-task-available">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width="48"
                height="48"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h4>No Tasks Available</h4>
              <p>
                This user has either completed all available tasks or doesn't meet the
                prerequisites for remaining tasks.
              </p>
            </div>
          )}
        </div>
      )}

      {!userInfo && (
        <div className="generator-empty">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            width="64"
            height="64"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
          <h3>Ready to Generate Tasks</h3>
          <p>Enter a user ID above to analyze their profile and generate their next task</p>
        </div>
      )}
    </div>
  );
}

export default memo(TaskGenerator);
