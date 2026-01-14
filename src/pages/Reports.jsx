import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserAnalyticsDashboard from '../components/UserAnalyticsDashboard';

export default function Reports() {
  const { user, userData, loading: authLoading } = useAuth();
  const [visibilityScores, setVisibilityScores] = useState([]);
  const [benchmark, setBenchmark] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingTimeout(true);
    }, 10000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    
    if (!authLoading) {
      if (userData) {
                loadReports();
      } else if (user) {
                setLoading(false);
      } else {
                setLoading(false);
      }
    }
  }, [authLoading, userData, user]);

  const loadReports = async () => {
    try {
            const { data: profile, error: profileError } = await supabase
        .from('business_profiles')
        .select('id')
        .eq('user_id', userData.id)
        .maybeSingle();

      if (profileError) {
        // TODO: Review error handling: console.error('[Reports] Error fetching business profile:', profileError)
      } else {
              }

      if (profile) {
        
        const { data: scoresData, error: scoresError } = await supabase
          .from('visibility_scores')
          .select('*')
          .eq('business_id', profile.id)
          .order('period_start', { ascending: false });

        if (scoresError) {
          // TODO: Review error handling: console.error('[Reports] Error fetching visibility scores:', scoresError)
        } else {
                  }

        const { data: benchmarkData, error: benchmarkError } = await supabase
          .from('benchmarks')
          .select('*')
          .eq('business_id', profile.id)
          .maybeSingle();

        if (benchmarkError) {
          // TODO: Review error handling: console.error('[Reports] Error fetching benchmark:', benchmarkError)
        } else {
                  }

        setVisibilityScores(scoresData || []);
        setBenchmark(benchmarkData);
      }
    } catch (error) {
      // TODO: Review error handling: console.error('[Reports] Error loading reports:', error)
    } finally {
            setLoading(false);
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
              <p>The reports page is taking longer than expected to load. Please try refreshing the page.</p>
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
            Loading your reports...
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
                Complete your account setup to start tracking your visibility scores and seeing your progress reports.
              </p>

              <div style={{
                background: 'var(--color-bg-secondary)',
                borderRadius: '8px',
                padding: '30px',
                marginBottom: '30px',
                textAlign: 'left'
              }}>
                <h3 style={{ marginBottom: '15px', color: 'var(--color-primary-500)' }}>Track your progress with:</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ padding: '10px 0', borderBottom: '1px solid var(--color-border)' }}>
                    <strong>Visibility Confidence Score™</strong> - See how visible you are in AI search results
                  </li>
                  <li style={{ padding: '10px 0', borderBottom: '1px solid var(--color-border)' }}>
                    <strong>Monthly Reports</strong> - Track improvements over time with detailed analytics
                  </li>
                  <li style={{ padding: '10px 0', borderBottom: '1px solid var(--color-border)' }}>
                    <strong>Baseline Benchmark</strong> - Compare your current performance against your starting point
                  </li>
                  <li style={{ padding: '10px 0' }}>
                    <strong>Competitor Analysis</strong> - See how you stack up against local competitors
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
          <h1>Visibility reports</h1>

          <p>
            These scores show how visible your business is when people search
            using AI tools like ChatGPT, Perplexity, and Google's AI.
          </p>

          {benchmark && (
            <div className="panel">
              <h3 style={{ marginTop: 0 }}>Your baseline</h3>
              <p className="score-display" style={{ marginBottom: 'var(--spacing-sm)' }}>
                {benchmark.baseline_visibility_score}
              </p>
              <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)', marginBottom: 0 }}>
                Measured on{' '}
                {new Date(benchmark.created_date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
              {benchmark.competitor_notes && (
                <p style={{ marginTop: 'var(--spacing-md)', marginBottom: 0 }}>
                  {benchmark.competitor_notes}
                </p>
              )}
            </div>
          )}

          <h2>Monthly scores</h2>

          {visibilityScores.length === 0 ? (
            <div className="panel">
              <p style={{ marginBottom: 0 }}>
                Your first monthly Visibility Confidence Score™ will appear here.
                Rex measures this once a month.
              </p>
            </div>
          ) : (
            <>
              {visibilityScores.map((score) => (
                <div key={score.id} className="panel panel-success">
                  <h3 style={{ marginTop: 0 }}>
                    {new Date(score.period_start).toLocaleDateString('en-GB', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </h3>
                  <p className="score-display" style={{ marginBottom: 'var(--spacing-sm)' }}>
                    {score.score_value}
                  </p>
                  <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)' }}>
                    {new Date(score.period_start).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                    })}
                    {' – '}
                    {new Date(score.period_end).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                  {score.notes && (
                    <p style={{ marginBottom: 0, marginTop: 'var(--spacing-md)' }}>
                      {score.notes}
                    </p>
                  )}
                </div>
              ))}
            </>
          )}

          <h2>What does the score mean?</h2>

          <p>
            Your Visibility Confidence Score™ shows how often your business appears in AI
            search results when people ask questions about services in your area.
          </p>

          <p>A higher score means:</p>
          <ul>
            <li>AI tools mention your business more often</li>
            <li>You show up for more relevant searches</li>
            <li>Your information is more likely to be accurate</li>
          </ul>

          <p>
            The tasks Rex sends you are designed to improve this score over time.
          </p>

          <div style={{ marginTop: 'var(--spacing-xxl)' }}>
            <UserAnalyticsDashboard />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
