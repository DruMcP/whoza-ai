import { useEffect, useState, Fragment } from 'react';
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

  // Google Reviews Data (from Google Business Profile)
  const googleReviews = [
    {
      author: "Kat Hibbert-Jordan",
      rating: 5,
      date: "2026-02-07",
      text: "I realised recently that my business was not appearing in AI search results at all! I'd asked different AI places for recommendations of things i do, near me. It showed up, more expensive competitors and larger businesses but not me. Whoza.ai helped me fix that. Now I'm showing up in AI search results and getting more enquiries. Really pleased with the service."
    },
    {
      author: "Ludmila Lamont",
      rating: 5,
      date: "2026-02-07",
      text: "I'm self employed and I've tried different marketing tools before, like search optimisation tools and etc.. they cost me over 350£/month. Then I tried Whoza.ai is by far the simplest and the cheapest service (I've signed up for Priority plan). It's easy to use and I'm already seeing results. Highly recommend!"
    },
    {
      author: "Nicholas Wood",
      rating: 5,
      date: "2026-02-07",
      text: "Tried this company with anticipation but have to say was very impressed with the simplicity and how it helped me - sales followed pretty quickly which I was amazed at"
    },
    {
      author: "Luke Winter",
      rating: 5,
      date: "2026-02-06",
      text: "The future is now. A powerful business tool well executed. This will yield both short and long term benefits."
    },
    {
      author: "Garth McPherson",
      rating: 5,
      date: "2026-02-06",
      text: "As the owner of a small business I think the concept of Whoza is brilliant and will help businesses of all sizes improve there visibility to acquire more valued customers in the age of AI."
    },
    {
      author: "Sandy Fyfe",
      rating: 5,
      date: "2026-02-07",
      text: "I am reluctant to try new things but this was recommended to me and seemed worth trying. Really really impressed."
    }
  ];

  const averageRating = 5.0;
  const totalReviews = 15;

  // Generate structured schema for Google Reviews
  // Per Google's Nov 2025 update: Reviews nested inside an Organization via the
  // "review" property are Nested Reviews — omit itemReviewed on each nested Review.
  // The parent Organization is the reviewed item. Only standalone Reviews need itemReviewed.
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "WHOZA AI LTD",
    "url": "https://whoza.ai",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": averageRating.toFixed(1),
      "reviewCount": totalReviews.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": googleReviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "datePublished": review.date,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating.toString(),
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": review.text
    }))
  };

  // Inject schema into the page
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(reviewSchema);
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Fragment>
      <Header />

      <main id="main-content" role="main">
        <div className="container">
          <h1>Trust and privacy</h1>

          <p style={{ fontSize: '24px', marginBottom: 'var(--spacing-xl)' }}>
            You need to trust the people who help with your business. Here's how
            we keep things safe and transparent.
          </p>

          {/* Google Reviews Section */}
          <section style={{ marginBottom: 'var(--spacing-xxl)' }}>
            <h2>What our customers say</h2>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'var(--spacing-md)', 
              marginBottom: 'var(--spacing-lg)',
              padding: 'var(--spacing-md)',
              background: 'var(--color-primary-50)',
              borderRadius: 'var(--border-radius)',
              border: '2px solid var(--color-primary-200)'
            }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star}
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    style={{ width: '24px', height: '24px', color: '#FBBC04' }}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div>
                <strong style={{ fontSize: '20px' }}>{averageRating.toFixed(1)} out of 5</strong>
                <p style={{ margin: 0, fontSize: '16px', color: 'var(--color-text-secondary)' }}>
                  Based on {totalReviews} Google reviews
                </p>
              </div>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: 'var(--spacing-lg)',
              marginBottom: 'var(--spacing-lg)'
            }}>
              {googleReviews.map((review, index) => (
                <div 
                  key={index}
                  className="panel"
                  style={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{ display: 'flex', gap: '4px', marginBottom: 'var(--spacing-sm)' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg 
                        key={star}
                        viewBox="0 0 20 20" 
                        fill="currentColor" 
                        style={{ 
                          width: '16px', 
                          height: '16px', 
                          color: star <= review.rating ? '#FBBC04' : '#E0E0E0' 
                        }}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p style={{ flex: 1, marginBottom: 'var(--spacing-sm)' }}>
                    "{review.text}"
                  </p>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    paddingTop: 'var(--spacing-sm)',
                    borderTop: '1px solid var(--color-border)'
                  }}>
                    <strong style={{ fontSize: '16px' }}>{review.author}</strong>
                    <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                      {new Date(review.date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <a 
                href="https://maps.app.goo.gl/dNHpTGPy1Kxeh7PV8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="button"
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: 'var(--spacing-sm)',
                  background: 'white',
                  color: 'var(--color-primary-600)',
                  border: '2px solid var(--color-primary-600)'
                }}
              >
                <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: '20px', height: '20px' }}>
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                View all {totalReviews} reviews on Google
              </a>
            </div>
          </section>

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

          <p>whoza.ai follows all applicable data protection rules, including GDPR and UK ICO regulations.</p>

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
            <li>Your AI Visibility Scores over time</li>
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
            <li>Hosted in secure, enterprise-grade data centers</li>
          </ul>

          {proofSnippets.length > 0 && (
            <Fragment>
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
            </Fragment>
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
    </Fragment>
  );
}
