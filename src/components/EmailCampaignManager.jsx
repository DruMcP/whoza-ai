import { useState, useEffect } from 'react';
import { emailService } from '../services/emailService';
import LoadingSpinner from './LoadingSpinner';

export default function EmailCampaignManager() {
  const [activeTab, setActiveTab] = useState('templates');
  const [templates, setTemplates] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [emailLogs, setEmailLogs] = useState([]);
  const [campaignProgress, setCampaignProgress] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    try {
      setLoading(true);

      if (activeTab === 'templates') {
        const templatesData = await emailService.getAllTemplates();
        setTemplates(templatesData);
      } else if (activeTab === 'campaigns') {
        const campaignsData = await emailService.getAllCampaigns();
        setCampaigns(campaignsData);
      } else if (activeTab === 'logs') {
        const logsData = await emailService.getAllEmailLogs(200);
        setEmailLogs(logsData);
      } else if (activeTab === 'progress') {
        const progressData = await emailService.getAllCampaignProgress();
        setCampaignProgress(progressData);
      } else if (activeTab === 'stats') {
        const statsData = await emailService.getCampaignStats();
        setStats(statsData);
      }
    } catch (error) {
      // TODO: Review error handling: console.error('Error loading data:', error)
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const processCampaigns = async () => {
    try {
      setProcessing(true);
      setMessage(null);

      const result = await emailService.processCampaignQueue();

      setMessage({
        type: 'success',
        text: `Processed ${result.processed} emails: ${result.successful} successful, ${result.failed} failed`,
      });

      loadData();
    } catch (error) {
      // TODO: Review error handling: console.error('Error processing campaigns:', error)
      setMessage({ type: 'error', text: error.message });
    } finally {
      setProcessing(false);
    }
  };

  const viewTemplate = (template) => {
    setSelectedTemplate(template);
  };

  const closeTemplatePreview = () => {
    setSelectedTemplate(null);
  };

  const getStatusBadgeClass = (status) => {
    const statusMap = {
      sent: 'status-badge-completed',
      failed: 'status-badge-draft',
      opened: 'status-badge-approved',
      clicked: 'status-badge-completed',
    };
    return statusMap[status] || 'status-badge-sent';
  };

  return (
    <div className="email-campaign-manager">
      <div className="campaign-header">
        <h2>Email Campaign Manager</h2>
        <button
          onClick={processCampaigns}
          disabled={processing}
          className="button button-primary"
        >
          {processing ? 'Processing...' : 'Process Campaign Queue'}
        </button>
      </div>

      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
          <button onClick={() => setMessage(null)} className="message-close">
            ×
          </button>
        </div>
      )}

      <div className="campaign-tabs">
        <button
          onClick={() => setActiveTab('templates')}
          className={`tab-button ${activeTab === 'templates' ? 'active' : ''}`}
        >
          Email Templates
        </button>
        <button
          onClick={() => setActiveTab('campaigns')}
          className={`tab-button ${activeTab === 'campaigns' ? 'active' : ''}`}
        >
          Campaigns
        </button>
        <button
          onClick={() => setActiveTab('progress')}
          className={`tab-button ${activeTab === 'progress' ? 'active' : ''}`}
        >
          User Progress
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={`tab-button ${activeTab === 'logs' ? 'active' : ''}`}
        >
          Email Logs
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`tab-button ${activeTab === 'stats' ? 'active' : ''}`}
        >
          Statistics
        </button>
      </div>

      <div className="campaign-content">
        {loading ? (
          <LoadingSpinner size={100} />
        ) : (
          <>
            {activeTab === 'templates' && (
              <div className="templates-list">
                {templates.length > 0 ? (
                  <div className="templates-grid">
                    {templates.map((template) => (
                      <div key={template.id} className="template-card">
                        <div className="template-card-header">
                          <h3>{template.name}</h3>
                          <span
                            className={`status-badge ${
                              template.is_active ? 'status-badge-approved' : 'status-badge-draft'
                            }`}
                          >
                            {template.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <p className="template-subject">{template.subject}</p>
                        <div className="template-meta">
                          <span className="template-category">{template.category}</span>
                          <span className="template-date">
                            Created {new Date(template.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <button
                          onClick={() => viewTemplate(template)}
                          className="button button-secondary button-small"
                          style={{ marginTop: 'var(--spacing-md)' }}
                        >
                          Preview
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <p>No email templates found</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'campaigns' && (
              <div className="campaigns-list">
                {campaigns.length > 0 ? (
                  <div className="campaigns-grid">
                    {campaigns.map((campaign) => (
                      <div key={campaign.id} className="campaign-card">
                        <div className="campaign-card-header">
                          <h3>{campaign.name}</h3>
                          <span
                            className={`status-badge ${
                              campaign.is_active ? 'status-badge-approved' : 'status-badge-draft'
                            }`}
                          >
                            {campaign.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <p>{campaign.description}</p>
                        <div className="campaign-meta">
                          <span>Trigger: {campaign.trigger_event}</span>
                          <span>Emails: {campaign.campaign_emails?.length || 0}</span>
                        </div>
                        {campaign.campaign_emails && campaign.campaign_emails.length > 0 && (
                          <div className="campaign-sequence">
                            <h4>Email Sequence:</h4>
                            {campaign.campaign_emails
                              .sort((a, b) => a.sequence_order - b.sequence_order)
                              .map((email) => (
                                <div key={email.id} className="sequence-item">
                                  <span className="sequence-number">{email.sequence_order}</span>
                                  <span className="sequence-template">
                                    {email.email_templates?.name}
                                  </span>
                                  <span className="sequence-delay">
                                    {email.delay_days > 0 && `${email.delay_days}d `}
                                    {email.delay_hours > 0 && `${email.delay_hours}h`}
                                    {email.delay_days === 0 && email.delay_hours === 0 && 'immediate'}
                                  </span>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <p>No campaigns found</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'progress' && (
              <div className="progress-list">
                {campaignProgress.length > 0 ? (
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Campaign</th>
                        <th>Current Step</th>
                        <th>Next Email</th>
                        <th>Status</th>
                        <th>Started</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaignProgress.map((progress) => (
                        <tr key={progress.id}>
                          <td>
                            <div>
                              <strong>{progress.users?.business_name || 'Unknown'}</strong>
                              <br />
                              <small>{progress.users?.email}</small>
                            </div>
                          </td>
                          <td>{progress.email_campaigns?.name}</td>
                          <td>Step {progress.current_sequence}</td>
                          <td>
                            {progress.next_email_at
                              ? new Date(progress.next_email_at).toLocaleString()
                              : '-'}
                          </td>
                          <td>
                            <span
                              className={`status-badge ${
                                progress.completed_at
                                  ? 'status-badge-completed'
                                  : progress.paused
                                  ? 'status-badge-draft'
                                  : 'status-badge-approved'
                              }`}
                            >
                              {progress.completed_at
                                ? 'Completed'
                                : progress.paused
                                ? 'Paused'
                                : 'Active'}
                            </span>
                          </td>
                          <td>{new Date(progress.started_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="empty-state">
                    <p>No campaign progress found</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'logs' && (
              <div className="logs-list">
                {emailLogs.length > 0 ? (
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Recipient</th>
                        <th>Template</th>
                        <th>Subject</th>
                        <th>Status</th>
                        <th>Sent</th>
                      </tr>
                    </thead>
                    <tbody>
                      {emailLogs.map((log) => (
                        <tr key={log.id}>
                          <td>
                            <div>
                              <strong>{log.users?.business_name || 'Unknown'}</strong>
                              <br />
                              <small>{log.recipient_email}</small>
                            </div>
                          </td>
                          <td>{log.email_templates?.name || 'Unknown'}</td>
                          <td>{log.subject}</td>
                          <td>
                            <span className={`status-badge ${getStatusBadgeClass(log.status)}`}>
                              {log.status}
                            </span>
                          </td>
                          <td>
                            {new Date(log.sent_at).toLocaleString()}
                            {log.error_message && (
                              <div style={{ color: 'var(--color-error-600)', fontSize: '12px' }}>
                                {log.error_message}
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="empty-state">
                    <p>No email logs found</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'stats' && stats && (
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-value">{stats.total}</div>
                  <div className="stat-label">Total Emails</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value" style={{ color: 'var(--color-success-600)' }}>
                    {stats.sent}
                  </div>
                  <div className="stat-label">Successfully Sent</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value" style={{ color: 'var(--color-error-600)' }}>
                    {stats.failed}
                  </div>
                  <div className="stat-label">Failed</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value" style={{ color: 'var(--color-primary)' }}>
                    {stats.opened}
                  </div>
                  <div className="stat-label">Opened</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value" style={{ color: 'var(--color-primary)' }}>
                    {stats.clicked}
                  </div>
                  <div className="stat-label">Clicked</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">
                    {stats.total > 0 ? Math.round((stats.sent / stats.total) * 100) : 0}%
                  </div>
                  <div className="stat-label">Delivery Rate</div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {selectedTemplate && (
        <div className="modal-overlay" onClick={closeTemplatePreview}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Template Preview: {selectedTemplate.name}</h2>
              <button onClick={closeTemplatePreview} className="modal-close">
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="template-preview-info">
                <p>
                  <strong>Subject:</strong> {selectedTemplate.subject}
                </p>
                <p>
                  <strong>Category:</strong> {selectedTemplate.category}
                </p>
                <p>
                  <strong>Variables:</strong>{' '}
                  {JSON.parse(selectedTemplate.variables || '[]').join(', ')}
                </p>
              </div>
              <div className="template-preview">
                <h3>HTML Preview:</h3>
                <iframe
                  className="template-preview-html"
                  title="Email Template Preview"
                  sandbox="allow-same-origin"
                  srcDoc={selectedTemplate.html_content}
                  style={{
                    width: '100%',
                    minHeight: '400px',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    background: 'white'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
