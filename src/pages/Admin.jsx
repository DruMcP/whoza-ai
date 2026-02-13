import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/Toast';
import { supabase } from '../lib/supabase';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TaskTemplateManager from '../components/TaskTemplateManager';
import TaskGenerator from '../components/TaskGenerator';
import ScoreCalculator from '../components/ScoreCalculator';
import EmailCampaignManager from '../components/EmailCampaignManager';
import PlatformAnalyticsDashboard from '../components/PlatformAnalyticsDashboard';

export default function Admin() {
  const { isAdmin } = useAuth();
  const toast = useToast();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('analytics');

  const [taskForm, setTaskForm] = useState({
    businessId: '',
    recommendedAction: '',
    copyPasteText: '',
    deliveryChannel: 'Email',
  });

  const [scoreForm, setScoreForm] = useState({
    businessId: '',
    periodStart: '',
    periodEnd: '',
    scoreValue: '',
    notes: '',
  });

  const [proofForm, setProofForm] = useState({
    queryText: '',
    resultText: '',
    date: new Date().toISOString().split('T')[0],
  });

  const loadCustomers = useCallback(async () => {
    try {
      const { data: usersData } = await supabase
        .from('users')
        .select('*, business_profiles(*)')
        .eq('role', 'customer')
        .order('created_at', { ascending: false });

      setCustomers(usersData || []);
    } catch (error) {
      console.error('Error loading customers:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      loadCustomers();
    }
  }, [isAdmin, loadCustomers]);

  const createTask = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('tasks').insert({
        business_id: taskForm.businessId,
        recommended_action: taskForm.recommendedAction,
        copy_paste_text: taskForm.copyPasteText,
        delivery_channel: taskForm.deliveryChannel,
        status: 'Sent',
        sent_at: new Date().toISOString(),
      });

      if (error) throw error;

      setTaskForm({
        businessId: '',
        recommendedAction: '',
        copyPasteText: '',
        deliveryChannel: 'Email',
      });
      toast.success('Task created successfully');
    } catch (error) {
      toast.error('Error creating task. Please try again.');
    }
  };

  const createVisibilityScore = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('visibility_scores').insert({
        business_id: scoreForm.businessId,
        period_start: scoreForm.periodStart,
        period_end: scoreForm.periodEnd,
        score_value: parseFloat(scoreForm.scoreValue),
        notes: scoreForm.notes,
      });

      if (error) throw error;

      setScoreForm({
        businessId: '',
        periodStart: '',
        periodEnd: '',
        scoreValue: '',
        notes: '',
      });
      toast.success('AI Visibility Score uploaded successfully');
    } catch (error) {
      toast.error('Error creating score. Please try again.');
    }
  };

  const createProofSnippet = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('proof_snippets').insert({
        query_text: proofForm.queryText,
        result_text: proofForm.resultText,
        date: proofForm.date,
      });

      if (error) throw error;

      setProofForm({
        queryText: '',
        resultText: '',
        date: new Date().toISOString().split('T')[0],
      });
      toast.success('Proof snippet added successfully');
    } catch (error) {
      toast.error('Error creating proof snippet. Please try again.');
    }
  };

  if (!isAdmin) {
    return (
      <>
        <Header />
        <main>
          <div className="container">
            <h1>Access denied</h1>
            <p>This page is for administrators only.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Header />
        <main>
          <div className="container loading">Loading admin panel...</div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main>
        <div className="container">
          <h1>Admin portal</h1>

          <div style={{ marginBottom: 'var(--spacing-lg)', borderBottom: '1px solid var(--color-border)' }}>
            <button
              onClick={() => setActiveTab('analytics')}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: activeTab === 'analytics' ? '4px solid #00857d' : '4px solid transparent',
                padding: 'var(--spacing-sm) var(--spacing-md)',
                cursor: 'pointer',
                fontWeight: activeTab === 'analytics' ? 700 : 400,
              }}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: activeTab === 'customers' ? '4px solid #00857d' : '4px solid transparent',
                padding: 'var(--spacing-sm) var(--spacing-md)',
                cursor: 'pointer',
                fontWeight: activeTab === 'customers' ? 700 : 400,
              }}
            >
              Customers
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: activeTab === 'tasks' ? '4px solid #00857d' : '4px solid transparent',
                padding: 'var(--spacing-sm) var(--spacing-md)',
                cursor: 'pointer',
                fontWeight: activeTab === 'tasks' ? 700 : 400,
              }}
            >
              Create task
            </button>
            <button
              onClick={() => setActiveTab('scores')}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: activeTab === 'scores' ? '4px solid #00857d' : '4px solid transparent',
                padding: 'var(--spacing-sm) var(--spacing-md)',
                cursor: 'pointer',
                fontWeight: activeTab === 'scores' ? 700 : 400,
              }}
            >
              Upload score
            </button>
            <button
              onClick={() => setActiveTab('proof')}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: activeTab === 'proof' ? '4px solid #00857d' : '4px solid transparent',
                padding: 'var(--spacing-sm) var(--spacing-md)',
                cursor: 'pointer',
                fontWeight: activeTab === 'proof' ? 700 : 400,
              }}
            >
              Add proof
            </button>
            <button
              onClick={() => setActiveTab('taskGenerator')}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: activeTab === 'taskGenerator' ? '4px solid #00857d' : '4px solid transparent',
                padding: 'var(--spacing-sm) var(--spacing-md)',
                cursor: 'pointer',
                fontWeight: activeTab === 'taskGenerator' ? 700 : 400,
              }}
            >
              AI Task Generator
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: activeTab === 'templates' ? '4px solid #00857d' : '4px solid transparent',
                padding: 'var(--spacing-sm) var(--spacing-md)',
                cursor: 'pointer',
                fontWeight: activeTab === 'templates' ? 700 : 400,
              }}
            >
              Task Templates
            </button>
            <button
              onClick={() => setActiveTab('scoreCalculator')}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: activeTab === 'scoreCalculator' ? '4px solid #00857d' : '4px solid transparent',
                padding: 'var(--spacing-sm) var(--spacing-md)',
                cursor: 'pointer',
                fontWeight: activeTab === 'scoreCalculator' ? 700 : 400,
              }}
            >
              Score Calculator
            </button>
            <button
              onClick={() => setActiveTab('emailCampaigns')}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: activeTab === 'emailCampaigns' ? '4px solid #00857d' : '4px solid transparent',
                padding: 'var(--spacing-sm) var(--spacing-md)',
                cursor: 'pointer',
                fontWeight: activeTab === 'emailCampaigns' ? 700 : 400,
              }}
            >
              Email Campaigns
            </button>
          </div>

          {activeTab === 'analytics' && <PlatformAnalyticsDashboard />}

          {activeTab === 'customers' && (
            <>
              <h2>Customers</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Business name</th>
                    <th>Email</th>
                    <th>Plan</th>
                    <th>Founder</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td>{customer.business_name}</td>
                      <td>{customer.email}</td>
                      <td>{customer.plan || 'None'}</td>
                      <td>{customer.founder ? 'Yes' : 'No'}</td>
                      <td>
                        {new Date(customer.created_at).toLocaleDateString(
                          'en-GB',
                          { day: 'numeric', month: 'short', year: 'numeric' }
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {activeTab === 'tasks' && (
            <>
              <h2>Create weekly task</h2>
              <form onSubmit={createTask}>
                <label htmlFor="customer-select">Customer</label>
                <select
                  id="customer-select"
                  value={taskForm.businessId}
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, businessId: e.target.value })
                  }
                  required
                >
                  <option value="">Select customer</option>
                  {customers.map(
                    (customer) =>
                      customer.business_profiles?.[0] && (
                        <option
                          key={customer.id}
                          value={customer.business_profiles[0].id}
                        >
                          {customer.business_name}
                        </option>
                      )
                  )}
                </select>

                <label htmlFor="recommended-action">Recommended action</label>
                <textarea
                  id="recommended-action"
                  value={taskForm.recommendedAction}
                  onChange={(e) =>
                    setTaskForm({
                      ...taskForm,
                      recommendedAction: e.target.value,
                    })
                  }
                  rows={3}
                  placeholder="What should the customer do?"
                  required
                />

                <label htmlFor="copy-paste-text">
                  Instructions (optional - for copy and paste)
                </label>
                <textarea
                  id="copy-paste-text"
                  value={taskForm.copyPasteText}
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, copyPasteText: e.target.value })
                  }
                  rows={6}
                  placeholder="Provide clear instructions the customer can follow"
                />

                <label htmlFor="delivery-channel">Delivery method</label>
                <select
                  id="delivery-channel"
                  value={taskForm.deliveryChannel}
                  onChange={(e) =>
                    setTaskForm({
                      ...taskForm,
                      deliveryChannel: e.target.value,
                    })
                  }
                >
                  <option value="Email">Email</option>
                  <option value="WhatsApp">WhatsApp (future)</option>
                </select>

                <button type="submit" className="button">
                  Create and send task
                </button>
              </form>
            </>
          )}

          {activeTab === 'scores' && (
            <>
              <h2>Upload Monthly AI Visibility Score</h2>
              <form onSubmit={createVisibilityScore}>
                <label htmlFor="score-customer-select">Customer</label>
                <select
                  id="score-customer-select"
                  value={scoreForm.businessId}
                  onChange={(e) =>
                    setScoreForm({ ...scoreForm, businessId: e.target.value })
                  }
                  required
                >
                  <option value="">Select customer</option>
                  {customers.map(
                    (customer) =>
                      customer.business_profiles?.[0] && (
                        <option
                          key={customer.id}
                          value={customer.business_profiles[0].id}
                        >
                          {customer.business_name}
                        </option>
                      )
                  )}
                </select>

                <label htmlFor="period-start">Period start date</label>
                <input
                  id="period-start"
                  type="date"
                  value={scoreForm.periodStart}
                  onChange={(e) =>
                    setScoreForm({ ...scoreForm, periodStart: e.target.value })
                  }
                  required
                />

                <label htmlFor="period-end">Period end date</label>
                <input
                  id="period-end"
                  type="date"
                  value={scoreForm.periodEnd}
                  onChange={(e) =>
                    setScoreForm({ ...scoreForm, periodEnd: e.target.value })
                  }
                  required
                />

                <label htmlFor="score-value">AI Visibility Score</label>
                <input
                  id="score-value"
                  type="number"
                  step="0.1"
                  value={scoreForm.scoreValue}
                  onChange={(e) =>
                    setScoreForm({ ...scoreForm, scoreValue: e.target.value })
                  }
                  placeholder="For example: 7.5"
                  required
                />

                <label htmlFor="score-notes">Notes (optional)</label>
                <textarea
                  id="score-notes"
                  value={scoreForm.notes}
                  onChange={(e) =>
                    setScoreForm({ ...scoreForm, notes: e.target.value })
                  }
                  rows={3}
                  placeholder="Any observations or context"
                />

                <button type="submit" className="button">
                  Upload score
                </button>
              </form>
            </>
          )}

          {activeTab === 'proof' && (
            <>
              <h2>Add proof snippet</h2>
              <p>
                These appear on the Trust page to show potential customers how
                businesses are appearing in AI search results.
              </p>
              <form onSubmit={createProofSnippet}>
                <label htmlFor="query-text">Search query</label>
                <input
                  id="query-text"
                  type="text"
                  value={proofForm.queryText}
                  onChange={(e) =>
                    setProofForm({ ...proofForm, queryText: e.target.value })
                  }
                  placeholder='For example: "best electrician in Reading"'
                  required
                />

                <label htmlFor="result-text">Result or answer</label>
                <textarea
                  id="result-text"
                  value={proofForm.resultText}
                  onChange={(e) =>
                    setProofForm({ ...proofForm, resultText: e.target.value })
                  }
                  rows={4}
                  placeholder="What did the AI tool say?"
                  required
                />

                <label htmlFor="proof-date">Date</label>
                <input
                  id="proof-date"
                  type="date"
                  value={proofForm.date}
                  onChange={(e) =>
                    setProofForm({ ...proofForm, date: e.target.value })
                  }
                  required
                />

                <button type="submit" className="button">
                  Add proof snippet
                </button>
              </form>
            </>
          )}

          {activeTab === 'taskGenerator' && (
            <TaskGenerator />
          )}

          {activeTab === 'templates' && (
            <TaskTemplateManager />
          )}

          {activeTab === 'scoreCalculator' && (
            <ScoreCalculator />
          )}

          {activeTab === 'emailCampaigns' && (
            <EmailCampaignManager />
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
