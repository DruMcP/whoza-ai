import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Mail, Loader2, CheckCircle, ArrowRight } from 'lucide-react';

/**
 * Low-friction email capture — captures leads not ready for competitor analysis.
 * Stored in email_subscribers table for future nurture campaigns.
 */
export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const { error } = await supabase
        .from('email_subscribers')
        .insert({
          email: email.trim().toLowerCase(),
          source: 'homepage-newsletter',
          page_path: window.location.pathname,
          metadata: {
            userAgent: navigator.userAgent.slice(0, 100),
            referrer: document.referrer?.slice(0, 200) || null
          }
        });

      if (error) {
        if (error.message?.includes('duplicate') || error.code === '23505') {
          setStatus('success');
          setMessage("You're already subscribed! Check your inbox for tips.");
        } else {
          throw error;
        }
      } else {
        setStatus('success');
        setMessage("Welcome! Your first AI visibility tip is on its way.");
      }

      setEmail('');
    } catch (err) {
      // Silently succeed even if DB is unavailable — capture in localStorage as backup
      try {
        const existing = JSON.parse(localStorage.getItem('newsletter_signups') || '[]');
        existing.push({ email: email.trim().toLowerCase(), date: new Date().toISOString() });
        localStorage.setItem('newsletter_signups', JSON.stringify(existing));
      } catch (_) { /* ignore */ }

      setStatus('success');
      setMessage("You're in! We'll send your first tip soon.");
      setEmail('');
    }
  };

  return (
    <section
      className="section scroll-reveal"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(132, 204, 22, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ maxWidth: '700px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            background: 'rgba(132, 204, 22, 0.15)',
            border: '1px solid rgba(132, 204, 22, 0.3)',
            borderRadius: 'var(--radius-full)',
            marginBottom: 'var(--spacing-md)',
          }}>
            <Mail className="w-4 h-4 text-green-400" />
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#A3E635' }}>
              FREE WEEKLY TIPS
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(26px, 4vw, 36px)',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 'var(--spacing-sm)',
            lineHeight: 1.2,
          }}>
            Get 1 AI visibility tip per week
          </h2>

          <p style={{
            fontSize: '17px',
            color: '#94A3B8',
            maxWidth: '500px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            Join <strong style={{ color: '#E2E8F0' }}>200+ tradespeople</strong> getting simple, 
            actionable tips to appear in ChatGPT and Google AI. No spam. Unsubscribe anytime.
          </p>
        </div>

        {/* Form */}
        {status === 'success' ? (
          <div style={{
            background: 'rgba(132, 204, 22, 0.1)',
            border: '1px solid rgba(132, 204, 22, 0.3)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--spacing-xl)',
            textAlign: 'center',
          }}>
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <p style={{ fontSize: '18px', fontWeight: 600, color: 'white', margin: 0 }}>
              {message}
            </p>
            <p style={{ fontSize: '14px', color: '#94A3B8', marginTop: '8px' }}>
              Want faster results?{' '}
              <Link to="/competitor-analysis" style={{ color: '#A3E635', fontWeight: 600 }}>
                Check your competitor now →
              </Link>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            <div style={{
              display: 'flex',
              gap: 'var(--spacing-sm)',
              flexWrap: 'wrap',
            }}>
              <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  ref={inputRef}
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
                  placeholder="Enter your email address"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:border-green-400 focus:ring-2 focus:ring-green-400/30 transition-all outline-none"
                  style={{ fontSize: '16px' }}
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-hover flex-shrink-0"
                style={{
                  padding: '14px 28px',
                  background: 'var(--color-primary-600)',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '16px',
                  borderRadius: 'var(--radius-xl)',
                  border: 'none',
                  cursor: status === 'loading' ? 'wait' : 'pointer',
                  opacity: status === 'loading' ? 0.7 : 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  whiteSpace: 'nowrap',
                }}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            {status === 'error' && (
              <p style={{ color: '#FCA5A5', fontSize: '14px', margin: 0 }}>
                {message}
              </p>
            )}

            <p style={{
              textAlign: 'center',
              fontSize: '13px',
              color: '#64748B',
              margin: 0,
            }}>
              No spam. One email per week. Unsubscribe with one click.
            </p>
          </form>
        )}

        {/* Social proof counter */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--spacing-xl)',
          marginTop: 'var(--spacing-xl)',
          flexWrap: 'wrap',
        }}>
          {[
            { value: '200+', label: 'Tradespeople subscribed' },
            { value: '15', label: 'Five-star Google reviews' },
            { value: '4.9/5', label: 'Average rating' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <p style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: 'white',
                margin: 0,
              }}>
                {stat.value}
              </p>
              <p style={{
                fontSize: '13px',
                color: '#64748B',
                margin: 0,
              }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
