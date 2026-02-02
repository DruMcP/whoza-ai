import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Trust() {
  const [proofSnippets, setProofSnippets] = useState([]);

  useEffect(() => {
    loadProofSnippets();
  }, []);

  const loadProofSnippets = async () => {
    const { data, error } = await supabase
      .from('proof_snippets')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) {
    } else {
      setProofSnippets(data || []);
    }
  };

  return (
    <>
      <Header />

      <main id="main-content" role="main">
        <div className="container">
          <h1>Trust and privacy</h1>

          <p style={{ fontSize: '24px', marginBottom: 'var(--spacing-xl)' }}>
            You need to trust the people who help with your business. Here's how
            we keep things safe and transparent.
          </p>

          <h2>Manual approval required</h2>

          <p>
            Rex never publishes, posts, or changes anything without your explicit
            approval first.
          </p>

          <p>Every task follows this flow:</p>

          <ol className="step-list">
            <li>
              <h3>Rex sends a recommendation</h3>
              <p>You receive an email with a suggested task.</p>
            </li>
            <li>
              <h3>You review and approve</h3>
              <p>
                You read the task, decide if it's right for your business, and
                approve it if you want to proceed.
              </p>
            </li>
            <li>
              <h3>You do the task yourself</h3>
              <p>
                Rex provides simple instructions. You log into your own accounts
                and complete the task.
              </p>
            </li>
          </ol>

          <p>
            <strong>Nothing happens without your approval.</strong> If you don't
            approve a task, it doesn't get done. Simple as that.
          </p>

          <h2>No account access</h2>

          <p>
            Rex doesn't have your passwords. Rex can't log into your Google
            Business, website, social media, or any other accounts.
          </p>

          <p>
            This means Rex can't accidentally post something you don't want, or
            change settings without your knowledge.
          </p>

          <p>
            You do all the tasks yourself, in your own accounts, when you're
            ready.
          </p>

          <h2>GDPR and ICO compliance</h2>

          <p>whoza.ai is a UK-based service. We follow all UK data protection rules.</p>

          <div className="panel" style={{ background: 'var(--color-primary-50)', border: '2px solid var(--color-primary-200)', marginBottom: 'var(--spacing-xl)' }}>
            <p style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 0 }}>
              <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: '24px', height: '24px', color: 'var(--color-primary-600)', flexShrink: 0 }}>
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <strong>Registered with the Information Commissioner's Office (ICO). Registration number: ZC077271</strong>
            </p>
          </div>

          <h3>What data we collect</h3>
          <ul>
            <li>Your business name, location, and trade type</li>
            <li>Your email address for task delivery</li>
            <li>Information about your services and credentials</li>
            <li>Your Visibility Confidence Scores™ over time</li>
          </ul>

          <h3>What we don't collect</h3>
          <ul>
            <li>Customer data or personal information about your clients</li>
            <li>Payment details (handled securely by Stripe)</li>
            <li>Account passwords or login credentials</li>
            <li>Tracking or browsing data beyond basic analytics</li>
          </ul>

          <h3>Your data rights</h3>
          <p>Under UK GDPR, you have the right to:</p>
          <ul>
            <li>See what data we hold about you</li>
            <li>Request corrections to your data</li>
            <li>Delete your account and all associated data</li>
            <li>Export your data in a portable format</li>
          </ul>

          <p>
            To exercise any of these rights, contact us. We'll respond within 30
            days.
          </p>

          <h2>Security measures</h2>

          <ul>
            <li>All data encrypted in transit and at rest</li>
            <li>Secure authentication for all accounts</li>
            <li>Regular security audits</li>
            <li>Staff access limited to essential personnel only</li>
            <li>Hosted in secure, UK-based data centers</li>
          </ul>

          {proofSnippets.length > 0 && (
            <>
              <h2>Recent results</h2>
              <p>
                Here are some examples of how businesses are showing up in AI
                search results. All examples are anonymized.
              </p>

              {proofSnippets.map((snippet) => (
                <div key={snippet.id} className="panel">
                  <p>
                    <strong>Search query:</strong> {snippet.query_text}
                  </p>
                  <p>
                    <strong>Result:</strong> {snippet.result_text}
                  </p>
                  <p style={{ marginBottom: 0, fontSize: '16px', color: 'var(--color-text-secondary)' }}>
                    {new Date(snippet.date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              ))}
            </>
          )}

          <h2>Questions about trust?</h2>

          <p>
            If you have concerns about privacy, security, or how we handle your
            data, we're happy to answer them.
          </p>

          <p>
            Read our full <Link to="/privacy">Privacy Policy</Link> and{' '}
            <Link to="/terms">Terms of Service</Link>.
          </p>

          <div style={{ marginTop: 'var(--spacing-xl)', textAlign: 'center' }}>
            <Link to="/start" className="button">
              Get started
            </Link>
            <p style={{ marginTop: 'var(--spacing-md)' }}>
              <Link to="/how-it-works">How it works</Link> ·{' '}
              <Link to="/pricing">Pricing</Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
