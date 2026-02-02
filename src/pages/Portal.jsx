import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { analyticsService } from '../services/analyticsService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DashboardOverview from '../components/DashboardOverview';
import HistoryChart from '../components/HistoryChart';
import AccountManagement from '../components/AccountManagement';
import NotificationPreferences from '../components/NotificationPreferences';
import NotificationHistory from '../components/NotificationHistory';
import RexDashboard from '../components/RexDashboard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Portal() {
  const { user, userData, loading: authLoading } = useAuth();
  const [businessProfile, setBusinessProfile] = useState(null);
  const [nextTask, setNextTask] = useState(null);
  const [latestScore, setLatestScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingTimeout(true);
    }, 10000);

    return () => clearTimeout(timeout);
  }, []);

  const loadPortalData = useCallback(async () => {
    if (!userData) return;

    try {
      const { data: profile, error: profileError } = await supabase
        .from('business_profiles')
        .select('*')
        .eq('user_id', userData.id)
        .maybeSingle();

      if (profileError) {
        console.error('[Portal] Error fetching business profile:', profileError);
      }

      setBusinessProfile(profile);

      if (profile) {
        const { data: taskData, error: taskError } = await supabase
          .from('tasks')
          .select('*')
          .eq('business_id', profile.id)
          .in('status', ['Sent', 'Approved'])
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (taskError) {
          console.error('[Portal] Error fetching tasks:', taskError);
        }

        const { data: scoreData, error: scoreError } = await supabase
          .from('visibility_scores')
          .select('*')
          .eq('business_id', profile.id)
          .order('period_start', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (scoreError) {
          console.error('[Portal] Error fetching scores:', scoreError);
        }

        setNextTask(taskData);
        setLatestScore(scoreData);
      }
    } catch (error) {
      console.error('[Portal] Error loading portal data:', error);
    } finally {
      setLoading(false);
    }
  }, [userData]);

  useEffect(() => {
    if (!authLoading) {
      if (userData) {
        loadPortalData();
        analyticsService.trackPortalVisit(userData.id).catch(console.error);
      } else if (user) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  }, [authLoading, userData, user, loadPortalData]);

  const approveTask = async () => {
    if (!nextTask) return;

    try {
      const { error } = await supabase
        .from('tasks')
        .update({
          status: 'Approved',
          approved_at: new Date().toISOString(),
        })
        .eq('id', nextTask.id);

      if (error) throw error;

      loadPortalData();
    } catch (error) {
      // TODO: Review error handling: console.error('Error approving task:', error)
    }
  };

  if (loading || authLoading) {
        if (loadingTimeout) {
      return (
        <>
          <Header />
          <main>
            <div className="container" style={{ textAlign: 'center', padding: '60px 20px' }}>
              <h1>Loading timed out</h1>
              <p>The portal is taking longer than expected to load. Please try refreshing the page.</p>
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
          <div className="container">
            <LoadingSpinner size={120} />
            <p style={{ textAlign: 'center', marginTop: '20px', color: 'var(--color-text-secondary)' }}>
              Loading your portal...
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
                Let's get your account set up. Complete the onboarding process to unlock your personalized AI visibility dashboard.
              </p>

              <div style={{
                background: 'var(--color-bg-secondary)',
                borderRadius: '8px',
                padding: '30px',
                marginBottom: '30px',
                textAlign: 'left'
              }}>
                <h3 style={{ marginBottom: '15px', color: 'var(--color-primary-500)' }}>What you'll get:</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ padding: '10px 0', borderBottom: '1px solid var(--color-border)' }}>
                    <strong>Weekly Task Recommendations</strong> - Rex AI analyzes your business and generates personalized visibility tasks
                  </li>
                  <li style={{ padding: '10px 0', borderBottom: '1px solid var(--color-border)' }}>
                    <strong>Visibility Score Tracking</strong> - Monitor your online presence with our comprehensive 60-point scoring system
                  </li>
                  <li style={{ padding: '10px 0', borderBottom: '1px solid var(--color-border)' }}>
                    <strong>Competitor Analysis</strong> - See how you stack up against local competitors
                  </li>
                  <li style={{ padding: '10px 0' }}>
                    <strong>Progress Reports</strong> - Track improvements over time with detailed analytics
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

  const isPaidUser = userData.subscription_tier &&
    userData.subscription_tier !== 'free' &&
    userData.subscription_status === 'active';

  const isTrialUser = userData.subscription_tier === 'free' &&
    userData.subscription_status === 'trial';

  
  if (!isPaidUser && !isTrialUser) {
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
              <h1 style={{ marginBottom: '20px' }}>Welcome to Whoza, {userData?.business_name || 'there'}!</h1>
              <p style={{ fontSize: '18px', marginBottom: '30px', color: 'var(--color-text-secondary)' }}>
                Complete your subscription to unlock your personalized AI visibility dashboard and start growing your online presence.
              </p>

              <div style={{
                background: 'var(--color-bg-secondary)',
                borderRadius: '8px',
                padding: '30px',
                marginBottom: '30px',
                textAlign: 'left'
              }}>
                <h3 style={{ marginBottom: '15px', color: 'var(--color-primary-500)' }}>What you'll get:</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ padding: '10px 0', borderBottom: '1px solid var(--color-border)' }}>
                    <strong>Weekly Task Recommendations</strong> - Rex AI analyzes your business and generates personalized visibility tasks
                  </li>
                  <li style={{ padding: '10px 0', borderBottom: '1px solid var(--color-border)' }}>
                    <strong>Visibility Score Tracking</strong> - Monitor your online presence with our comprehensive 60-point scoring system
                  </li>
                  <li style={{ padding: '10px 0', borderBottom: '1px solid var(--color-border)' }}>
                    <strong>Competitor Analysis</strong> - See how you stack up against local competitors
                  </li>
                  <li style={{ padding: '10px 0' }}>
                    <strong>Progress Reports</strong> - Track improvements over time with detailed analytics
                  </li>
                </ul>
              </div>

              <Link to="/checkout" className="button" style={{
                fontSize: '18px',
                padding: '16px 40px'
              }}>
                Choose Your Plan
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

      <main className="portal-main">
        <div className="container">
          <div className="portal-header">
            <div>
              <h1>Welcome back, {userData.business_name || userData.email}</h1>
              <p className="portal-subtitle">
                <strong>Plan:</strong> {userData.subscription_tier === 'free' ? 'Trial' : userData.subscription_tier}
                {' • '}
                <strong>Status:</strong> {userData.subscription_status || 'Active'}
                {userData.founder && ' • Founder Member'}
              </p>
              {isTrialUser && (
                <div style={{
                  marginTop: '15px',
                  padding: '12px 20px',
                  background: 'rgba(194, 255, 72, 0.1)',
                  border: '1px solid var(--color-primary-500)',
                  borderRadius: '8px',
                  display: 'inline-block'
                }}>
                  <strong>Trial Account</strong> - Upgrade to unlock full features
                  <Link
                    to="/checkout"
                    style={{
                      marginLeft: '15px',
                      color: 'var(--color-primary-500)',
                      textDecoration: 'underline',
                      fontWeight: 600
                    }}
                  >
                    View Plans
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="portal-tabs">
            <button
              className={`portal-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              Dashboard
            </button>
            <button
              className={`portal-tab ${activeTab === 'rex' ? 'active' : ''}`}
              onClick={() => setActiveTab('rex')}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Rex AI
            </button>
            <button
              className={`portal-tab ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              History
            </button>
            <button
              className={`portal-tab ${activeTab === 'account' ? 'active' : ''}`}
              onClick={() => setActiveTab('account')}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              Account
            </button>
            <button
              className={`portal-tab ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              Notifications
            </button>
          </div>

          <div className="portal-content">
            {activeTab === 'dashboard' && (
              <>
                {isTrialUser && !businessProfile && (
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(194, 255, 72, 0.1) 0%, rgba(194, 255, 72, 0.05) 100%)',
                    border: '2px solid var(--color-primary-500)',
                    borderRadius: '12px',
                    padding: '30px',
                    marginBottom: '30px'
                  }}>
                    <h2 style={{ marginBottom: '15px', color: 'var(--color-primary-500)' }}>
                      Get Started with Whoza
                    </h2>
                    <p style={{ marginBottom: '20px', fontSize: '16px' }}>
                      Welcome to your AI visibility command center! Here's how to get the most out of Whoza:
                    </p>
                    <div style={{
                      display: 'grid',
                      gap: '15px',
                      marginBottom: '20px'
                    }}>
                      <div style={{
                        background: 'var(--color-bg-secondary)',
                        padding: '15px',
                        borderRadius: '8px'
                      }}>
                        <strong>Step 1: Choose Your Plan</strong>
                        <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>
                          Select a subscription plan to unlock Rex AI task generation and visibility tracking
                        </p>
                      </div>
                      <div style={{
                        background: 'var(--color-bg-secondary)',
                        padding: '15px',
                        borderRadius: '8px'
                      }}>
                        <strong>Step 2: Rex Analyzes Your Business</strong>
                        <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>
                          Our AI will analyze your industry, location, and competitors to create a custom visibility strategy
                        </p>
                      </div>
                      <div style={{
                        background: 'var(--color-bg-secondary)',
                        padding: '15px',
                        borderRadius: '8px'
                      }}>
                        <strong>Step 3: Complete Your Weekly Tasks</strong>
                        <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>
                          Get 1-3 actionable tasks each week. Approve them and track your progress
                        </p>
                      </div>
                      <div style={{
                        background: 'var(--color-bg-secondary)',
                        padding: '15px',
                        borderRadius: '8px'
                      }}>
                        <strong>Step 4: Watch Your Visibility Grow</strong>
                        <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>
                          Monitor your 60-point visibility score and see real improvements in 30-60 days
                        </p>
                      </div>
                    </div>
                    <Link to="/checkout" className="button">
                      Choose Your Plan to Get Started
                    </Link>
                  </div>
                )}

                <DashboardOverview userId={userData.id} />

                <div className="portal-quick-links">
                  <Link to="/tasks" className="quick-link-card">
                    <svg viewBox="0 0 20 20" fill="currentColor" width="24" height="24">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h3>View All Tasks</h3>
                      <p>See your complete task history</p>
                    </div>
                  </Link>
                  <Link to="/reports" className="quick-link-card">
                    <svg viewBox="0 0 20 20" fill="currentColor" width="24" height="24">
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                    <div>
                      <h3>View Reports</h3>
                      <p>Access detailed performance reports</p>
                    </div>
                  </Link>
                  <Link to="/pricing" className="quick-link-card">
                    <svg viewBox="0 0 20 20" fill="currentColor" width="24" height="24">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h3>View Pricing</h3>
                      <p>Explore plans and upgrade options</p>
                    </div>
                  </Link>
                </div>
              </>
            )}

            {activeTab === 'rex' && (
              <>
                {businessProfile ? (
                  <RexDashboard businessId={businessProfile.id} userId={userData.id} />
                ) : (
                  <div style={{
                    background: 'var(--color-bg-secondary)',
                    border: '2px solid var(--color-border)',
                    borderRadius: '12px',
                    padding: '40px',
                    textAlign: 'center'
                  }}>
                    <h2 style={{ marginBottom: '15px' }}>Unlock Rex AI</h2>
                    <p style={{ marginBottom: '20px', color: 'var(--color-text-secondary)' }}>
                      Subscribe to a plan to unlock Rex AI recommendations and automated task generation.
                    </p>
                    <Link to="/checkout" className="button">
                      View Plans
                    </Link>
                  </div>
                )}
              </>
            )}

            {activeTab === 'history' && (
              <HistoryChart userId={userData.id} />
            )}

            {activeTab === 'account' && (
              <AccountManagement userId={userData.id} />
            )}

            {activeTab === 'notifications' && (
              <div className="notifications-container">
                <div className="notification-sections">
                  <div className="notification-section">
                    <NotificationPreferences />
                  </div>
                  <div className="notification-section">
                    <NotificationHistory />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
