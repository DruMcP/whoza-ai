import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EmptyStateNoTasks from '../components/illustrations/EmptyStateNoTasks';
import { getAllPillars } from '../constants/ecePillars';
import PillarTooltip from '../components/PillarTooltip';

export default function Tasks() {
  const { user, userData, loading: authLoading } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const [selectedPillar, setSelectedPillar] = useState('all');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingTimeout(true);
    }, 10000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    
    if (!authLoading) {
      if (userData) {
                loadTasks();
      } else if (user) {
                setLoading(false);
      } else {
                setLoading(false);
      }
    }
  }, [authLoading, userData, user]);

  const loadTasks = async () => {
    try {
            const { data: profile, error: profileError } = await supabase
        .from('business_profiles')
        .select('id')
        .eq('user_id', userData.id)
        .maybeSingle();

      if (profileError) {
        // TODO: Review error handling: console.error('[Tasks] Error fetching business profile:', profileError)
      } else {
              }

      if (profile) {
                const { data, error: tasksError } = await supabase
          .from('tasks')
          .select('*')
          .eq('business_id', profile.id)
          .order('created_at', { ascending: false });

        if (tasksError) {
          // TODO: Review error handling: console.error('[Tasks] Error fetching tasks:', tasksError)
        } else {
                  }

        setTasks(data || []);
      }
    } catch (error) {
      // TODO: Review error handling: console.error('[Tasks] Error loading tasks:', error)
    } finally {
            setLoading(false);
    }
  };

  const approveTask = async (taskId) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({
          status: 'Approved',
          approved_at: new Date().toISOString(),
        })
        .eq('id', taskId);

      if (error) throw error;

      loadTasks();
    } catch (error) {
      // TODO: Review error handling: console.error('Error approving task:', error)
    }
  };

  const pillars = getAllPillars();

  const filteredTasks = useMemo(() => {
    if (selectedPillar === 'all') return tasks;
    return tasks.filter(task => task.ece_pillar === selectedPillar);
  }, [tasks, selectedPillar]);

  const getPillarTaskCount = (pillarId) => {
    if (pillarId === 'all') return tasks.length;
    return tasks.filter(task => task.ece_pillar === pillarId).length;
  };

  const getPillarInfo = (pillarId) => {
    return pillars.find(p => p.id === pillarId);
  };

  if (loading || authLoading) {
        if (loadingTimeout) {
      return (
        <>
          <Header />
          <main>
            <div className="container" style={{ textAlign: 'center', padding: '60px 20px' }}>
              <h1>Loading timed out</h1>
              <p>The tasks page is taking longer than expected to load. Please try refreshing the page.</p>
              <div style={{ marginTop: '20px', padding: '15px', background: 'var(--color-bg-secondary)', borderRadius: '8px', fontSize: '14px', textAlign: 'left', maxWidth: '600px', margin: '20px auto' }}>
                <strong>Debug Info:</strong>
                <pre style={{ marginTop: '10px', fontSize: '12px', overflow: 'auto' }}>
                  {JSON.stringify({
                    authLoading,
                    hasUser: !!user,
                    hasUserData: !!userData,
                    userId: user?.id,
                    loading
                  }, null, 2)}
                </pre>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="button"
                style={{ marginTop: '20px' }}
              >
                Refresh Page
              </button>
            </div>
          </main>
          <Footer />
        </>
      );
    }

    return (
      <>
        <Header />
        <main>
          <div className="container loading">
            Loading your tasks...
            <p style={{ textAlign: 'center', marginTop: '20px', color: 'var(--color-text-secondary)', fontSize: '14px' }}>
              This should only take a moment
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!userData) {
        return (
      <>
        <Header />
        <main>
          <div className="container" style={{ maxWidth: '800px', padding: '60px 20px' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(194, 255, 72, 0.1) 0%, rgba(194, 255, 72, 0.05) 100%)',
              border: '2px solid var(--color-primary-500)',
              borderRadius: '12px',
              padding: '40px',
              textAlign: 'center'
            }}>
              <h1 style={{ marginBottom: '20px' }}>Welcome to Whoza!</h1>
              <p style={{ fontSize: '18px', marginBottom: '30px', color: 'var(--color-text-secondary)' }}>
                Complete your account setup to start receiving personalized AI visibility tasks from Rex.
              </p>

              <div style={{
                background: 'var(--color-bg-secondary)',
                borderRadius: '8px',
                padding: '30px',
                marginBottom: '30px',
                textAlign: 'left'
              }}>
                <h3 style={{ marginBottom: '15px', color: 'var(--color-primary-500)' }}>Rex will send you:</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ padding: '10px 0', borderBottom: '1px solid var(--color-border)' }}>
                    <strong>One task per week</strong> - Simple, actionable steps to improve your visibility
                  </li>
                  <li style={{ padding: '10px 0', borderBottom: '1px solid var(--color-border)' }}>
                    <strong>Copy-paste instructions</strong> - Easy to follow, no technical knowledge needed
                  </li>
                  <li style={{ padding: '10px 0', borderBottom: '1px solid var(--color-border)' }}>
                    <strong>Personalized recommendations</strong> - Based on your specific business and industry
                  </li>
                  <li style={{ padding: '10px 0' }}>
                    <strong>Task approval control</strong> - Review and approve each task before taking action
                  </li>
                </ul>
              </div>

              <Link to="/start" className="button" style={{
                fontSize: '18px',
                padding: '16px 40px'
              }}>
                Complete Setup
              </Link>

              <p style={{ marginTop: '20px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                30-day money-back guarantee • Cancel anytime
              </p>
            </div>
          </div>
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
          <h1>Your tasks</h1>

          <p style={{ marginBottom: 'var(--spacing-lg)' }}>
            Rex sends you one task each week. You approve each task before doing it.
            {tasks.length > 0 && ' Filter by ECE pillar below to see tasks for specific areas.'}
          </p>

          {tasks.length > 0 && (
            <div style={{
              backgroundColor: 'var(--color-background)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--spacing-md)',
              marginBottom: 'var(--spacing-xl)'
            }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, marginTop: 0, marginBottom: 'var(--spacing-sm)', color: 'var(--color-text)' }}>
                ECE Pillar Legend
              </h3>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--spacing-md)',
                fontSize: '13px'
              }}>
                {pillars.map(pillar => (
                  <div key={pillar.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: pillar.color,
                      flexShrink: 0
                    }} />
                    <span style={{ fontWeight: 500, color: 'var(--color-text)' }}>{pillar.name}</span>
                    <span style={{ color: 'var(--color-text-secondary)' }}>- {pillar.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tasks.length > 0 && (
            <div style={{
              display: 'flex',
              gap: 'var(--spacing-sm)',
              flexWrap: 'wrap',
              marginBottom: 'var(--spacing-xl)',
              alignItems: 'center'
            }}>
              <button
                onClick={() => setSelectedPillar('all')}
                className={`pillar-filter-button ${selectedPillar === 'all' ? 'active' : ''}`}
                style={{
                  padding: 'var(--spacing-sm) var(--spacing-md)',
                  borderRadius: 'var(--radius-md)',
                  border: selectedPillar === 'all' ? '2px solid var(--color-primary-600)' : '1px solid var(--color-border)',
                  backgroundColor: selectedPillar === 'all' ? 'var(--color-primary-50)' : 'var(--color-surface)',
                  color: selectedPillar === 'all' ? 'var(--color-primary-700)' : 'var(--color-text-secondary)',
                  fontWeight: selectedPillar === 'all' ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-xs)'
                }}
              >
                All Tasks
                <span style={{
                  backgroundColor: selectedPillar === 'all' ? 'var(--color-primary-600)' : 'var(--color-border)',
                  color: selectedPillar === 'all' ? 'white' : 'var(--color-text-secondary)',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '12px',
                  fontWeight: 600
                }}>
                  {getPillarTaskCount('all')}
                </span>
              </button>

              {pillars.map(pillar => (
                <PillarTooltip key={pillar.id} pillarId={pillar.id}>
                  <button
                    onClick={() => setSelectedPillar(pillar.id)}
                    className={`pillar-filter-button ${selectedPillar === pillar.id ? 'active' : ''}`}
                    style={{
                      padding: 'var(--spacing-sm) var(--spacing-md)',
                      borderRadius: 'var(--radius-md)',
                      border: selectedPillar === pillar.id ? `2px solid ${pillar.color}` : '1px solid var(--color-border)',
                      backgroundColor: selectedPillar === pillar.id ? `${pillar.color}15` : 'var(--color-surface)',
                      color: selectedPillar === pillar.id ? pillar.color : 'var(--color-text-secondary)',
                      fontWeight: selectedPillar === pillar.id ? 600 : 400,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-xs)'
                    }}
                  >
                    <span>{pillar.icon}</span>
                    {pillar.name}
                    <span style={{
                      backgroundColor: selectedPillar === pillar.id ? pillar.color : 'var(--color-border)',
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '12px',
                      fontWeight: 600
                    }}>
                      {getPillarTaskCount(pillar.id)}
                    </span>
                  </button>
                </PillarTooltip>
              ))}
            </div>
          )}

          {tasks.length === 0 ? (
            <div className="panel" style={{ textAlign: 'center', padding: 'var(--spacing-2xl)' }}>
              <div style={{ width: '200px', height: '200px', margin: '0 auto var(--spacing-lg)' }}>
                <EmptyStateNoTasks />
              </div>
              <p style={{ marginBottom: 0, fontSize: '18px', color: 'var(--color-text-secondary)' }}>
                No tasks yet. Rex will send your first task soon.
              </p>
            </div>
          ) : (
            <>
              {selectedPillar !== 'all' && (
                <p style={{ fontWeight: 600, color: 'var(--color-primary-600)', marginBottom: 'var(--spacing-md)' }}>
                  Showing {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
                </p>
              )}

              {filteredTasks.length === 0 && selectedPillar !== 'all' ? (
                <div className="panel" style={{ textAlign: 'center', padding: 'var(--spacing-2xl)' }}>
                  <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)' }}>
                    No tasks found for this pillar. Try selecting a different pillar or "All Tasks".
                  </p>
                </div>
              ) : (
                <>
                  {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`task-card ${
                    task.status === 'Sent'
                      ? 'task-sent'
                      : task.status === 'Approved'
                      ? 'task-approved'
                      : ''
                  }`}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-sm)' }}>
                    <h3 style={{ margin: 0, flex: 1 }}>{task.recommended_action}</h3>
                    {task.ece_pillar && getPillarInfo(task.ece_pillar) && (
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-xs)',
                        padding: 'var(--spacing-xs) var(--spacing-sm)',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: `${getPillarInfo(task.ece_pillar).color}15`,
                        border: `1px solid ${getPillarInfo(task.ece_pillar).color}`,
                        fontSize: '13px',
                        fontWeight: 600,
                        color: getPillarInfo(task.ece_pillar).color,
                        flexShrink: 0
                      }}>
                        <span style={{ fontSize: '16px' }}>{getPillarInfo(task.ece_pillar).icon}</span>
                        {getPillarInfo(task.ece_pillar).name}
                      </div>
                    )}
                  </div>

                  <p>
                    {task.status === 'Sent' && (
                      <span className="status-badge status-sent">
                        Needs your approval
                      </span>
                    )}
                    {task.status === 'Approved' && (
                      <span className="status-badge status-approved">
                        You approved this
                      </span>
                    )}
                    {task.status === 'Completed' && (
                      <span className="status-badge status-completed">
                        Completed
                      </span>
                    )}
                    {task.status === 'Draft' && (
                      <span className="status-badge">Draft</span>
                    )}
                  </p>

                  <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)' }}>
                    Sent{' '}
                    {new Date(task.sent_at || task.created_at).toLocaleDateString(
                      'en-GB',
                      {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      }
                    )}
                  </p>

                  {task.copy_paste_text && (
                    <div style={{ marginTop: 'var(--spacing-md)' }}>
                      <label htmlFor={`task-${task.id}`}>
                        <strong>Instructions you can copy:</strong>
                      </label>
                      <textarea
                        id={`task-${task.id}`}
                        readOnly
                        value={task.copy_paste_text}
                        rows={5}
                        style={{ width: '100%', marginBottom: 'var(--spacing-md)' }}
                      />
                    </div>
                  )}

                  {task.status === 'Sent' && (
                    <button
                      onClick={() => approveTask(task.id)}
                      className="button"
                    >
                      I approve this task
                    </button>
                  )}

                  {task.status === 'Approved' && task.approved_at && (
                    <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)' }}>
                      You approved this on{' '}
                      {new Date(task.approved_at).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  )}

                  {task.status === 'Completed' && task.completed_at && (
                    <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)' }}>
                      Completed on{' '}
                      {new Date(task.completed_at).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  )}
                </div>
              ))}
                </>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
