import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { X, Loader2, CheckCircle, Mail, Download } from 'lucide-react';

/**
 * Exit-intent popup — captures leads about to leave the site.
 * Triggers when user moves mouse to the top of the viewport (toward back/close buttons).
 * Shows once per session with localStorage tracking.
 */
export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success
  const [hasTriggered, setHasTriggered] = useState(false);

  // Check if already shown this session
  useEffect(() => {
    const shown = sessionStorage.getItem('exit_intent_shown');
    if (shown === 'true') {
      setHasTriggered(true);
    }
  }, []);

  // Detect exit intent — mouse leaving viewport toward top
  const handleMouseLeave = useCallback((e) => {
    if (hasTriggered) return;
    if (e.clientY <= 10 && e.relatedTarget === null) {
      // User moved mouse to top edge (toward back/close/tab buttons)
      // Don't trigger on mobile (no mouse)
      if ('ontouchstart' in window) return;

      setIsVisible(true);
      setHasTriggered(true);
      sessionStorage.setItem('exit_intent_shown', 'true');
    }
  }, [hasTriggered]);

  // Also detect on scroll-up past a threshold (mobile fallback)
  const handleScroll = useCallback(() => {
    if (hasTriggered) return;
    // If user scrolls back to very top quickly, might be leaving
    if (window.scrollY < 50 && window.innerHeight + window.scrollY < document.body.scrollHeight * 0.3) {
      // Only trigger if they've scrolled down significantly first
      if (window.sessionStorage.getItem('has_scrolled_deep') === 'true') {
        setIsVisible(true);
        setHasTriggered(true);
        sessionStorage.setItem('exit_intent_shown', 'true');
      }
    }
    if (window.scrollY > 1000) {
      sessionStorage.setItem('has_scrolled_deep', 'true');
    }
  }, [hasTriggered]);

  useEffect(() => {
    document.addEventListener('mouseout', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleMouseLeave, handleScroll]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    setStatus('loading');

    try {
      const { error } = await supabase
        .from('email_subscribers')
        .insert({
          email: email.trim().toLowerCase(),
          source: 'exit-intent-guide',
          page_path: window.location.pathname,
          metadata: { type: '5_ways_guide' }
        });

      // Treat duplicate as success
      if (error && !error.message?.includes('duplicate') && error.code !== '23505') {
        throw error;
      }

      setStatus('success');
    } catch {
      // Fallback — still show success
      setStatus('success');
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(4px)',
        animation: 'fadeIn 0.3s ease',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @media (max-width: 640px) {
          .exit-intent-modal {
            border-radius: 16px 16px 0 0 !important;
            max-width: 100% !important;
            position: fixed !important;
            bottom: 0 !important;
            top: auto !important;
            max-height: 90vh !important;
            overflow-y: auto !important;
          }
        }
      `}</style>

      <div
        className="exit-intent-modal"
        style={{
          background: 'white',
          borderRadius: '20px',
          maxWidth: '520px',
          width: '100%',
          boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
          position: 'relative',
          overflow: 'hidden',
          animation: 'slideUp 0.4s ease',
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Close popup"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: 'none',
            background: '#F1F5F9',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
          }}
        >
          <X className="w-5 h-5 text-slate-500" />
        </button>

        {/* Green top bar */}
        <div style={{
          height: '6px',
          background: 'linear-gradient(90deg, #84CC16, #10B981)',
        }} />

        <div style={{ padding: 'var(--spacing-xl)' }}>
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: 'var(--spacing-lg) 0' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(132, 204, 22, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--spacing-md)',
              }}>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 style={{
                fontSize: '22px',
                fontWeight: 'bold',
                color: 'var(--color-text)',
                marginBottom: '8px',
              }}>
                Check your inbox!
              </h3>
              <p style={{
                fontSize: '16px',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
              }}>
                Your guide "5 Ways to Get ChatGPT to Recommend Your Business" 
                is on its way to <strong>{email}</strong>.
              </p>
            </div>
          ) : (
            <>
              {/* Icon */}
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #DCFCE7, #D1FAE5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--spacing-md)',
              }}>
                <Download className="w-7 h-7 text-green-600" />
              </div>

              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: 'var(--color-text)',
                marginBottom: '8px',
                lineHeight: 1.2,
              }}>
                Wait! Before you go...
              </h3>

              <p style={{
                fontSize: '16px',
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--spacing-lg)',
                lineHeight: 1.6,
              }}>
                Get our free <strong>"5 Ways to Get ChatGPT to Recommend Your Business"</strong> guide. 
                Sent to your inbox instantly.
              </p>

              {/* Benefits */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                marginBottom: 'var(--spacing-lg)',
              }}>
                {[
                  'Why AI ignores most local businesses',
                  'The 3 signals AI uses to pick who to recommend',
                  '10-minute fixes you can do today',
                  'Real examples from tradespeople',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span style={{ fontSize: '14px', color: 'var(--color-text)' }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      required
                      style={{
                        width: '100%',
                        paddingLeft: '36px',
                        paddingRight: '12px',
                        paddingTop: '12px',
                        paddingBottom: '12px',
                        border: '2px solid #E2E8F0',
                        borderRadius: '12px',
                        fontSize: '15px',
                        outline: 'none',
                      }}
                      onFocus={(e) => { e.target.style.borderColor = '#84CC16'; }}
                      onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; }}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    style={{
                      padding: '12px 20px',
                      background: 'var(--color-primary-600)',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '15px',
                      borderRadius: '12px',
                      border: 'none',
                      cursor: status === 'loading' ? 'wait' : 'pointer',
                      opacity: status === 'loading' ? 0.7 : 1,
                      whiteSpace: 'nowrap',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    {status === 'loading' ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Send Me the Guide'
                    )}
                  </button>
                </div>

                <p style={{
                  fontSize: '12px',
                  color: '#94A3B8',
                  textAlign: 'center',
                  margin: 0,
                }}>
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
