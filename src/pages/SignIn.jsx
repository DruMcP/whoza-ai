import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import SEO from '../components/SEO';

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    resetEmail: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || '/portal';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { email, password } = formData;

      if (!email || !password) {
        throw new Error('Please enter both email and password');
      }

      const result = await signIn(email, password);

      if (result.error) {
        throw result.error;
      }

      const from = location.state?.from?.pathname || '/portal';
      navigate(from, { replace: true });
    } catch (err) {
      // TODO: Review error handling: console.error('Sign in error:', err)
      setError(err.message || 'Failed to sign in. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { resetEmail } = formData;

      if (!resetEmail) {
        throw new Error('Please enter your email address');
      }

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (resetError) throw resetError;

      setResetEmailSent(true);
      setSuccess('Password reset email sent! Check your inbox.');
      setTimeout(() => {
        setShowForgotPassword(false);
        setResetEmailSent(false);
      }, 3000);
    } catch (err) {
      // TODO: Review error handling: console.error('Password reset error:', err)
      setError(err.message || 'Failed to send password reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <SEO
        title="Sign In - Whoza.ai"
        description="Sign in to your Whoza account to access your visibility dashboard and grow your local business."
      />
      <Header />

      <main className="page-content">
        <div className="container" style={{ maxWidth: '500px', margin: '0 auto', padding: '80px 20px' }}>
          <div className="glass-card" style={{ padding: '40px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '8px' }}>
                {showForgotPassword ? 'Reset Password' : 'Sign In'}
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                {showForgotPassword
                  ? "Enter your email to receive a password reset link"
                  : "Welcome back! Please sign in to your account"
                }
              </p>
            </div>

            {error && (
              <div style={{
                padding: '16px',
                marginBottom: '24px',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '12px',
                color: '#ef4444'
              }}>
                {error}
              </div>
            )}

            {success && (
              <div style={{
                padding: '16px',
                marginBottom: '24px',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '12px',
                color: '#22c55e'
              }}>
                {success}
              </div>
            )}

            {showForgotPassword ? (
              <form onSubmit={handleForgotPassword}>
                <div style={{ marginBottom: '24px' }}>
                  <label
                    htmlFor="resetEmail"
                    style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="resetEmail"
                    name="resetEmail"
                    value={formData.resetEmail}
                    onChange={handleInputChange}
                    disabled={loading || resetEmailSent}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: 'var(--text-primary)',
                      fontSize: '1rem',
                    }}
                    placeholder="your@email.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || resetEmailSent}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    padding: '14px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    marginBottom: '16px',
                  }}
                >
                  {loading ? <LoadingSpinner size={20} /> : 'Send Reset Link'}
                </button>

                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="btn btn-secondary"
                  style={{
                    width: '100%',
                    padding: '14px',
                    fontSize: '1rem',
                  }}
                >
                  Back to Sign In
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignIn}>
                <div style={{ marginBottom: '24px' }}>
                  <label
                    htmlFor="email"
                    style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={loading}
                    required
                    autoComplete="email"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: 'var(--text-primary)',
                      fontSize: '1rem',
                    }}
                    placeholder="your@email.com"
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label
                    htmlFor="password"
                    style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}
                  >
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      disabled={loading}
                      required
                      autoComplete="current-password"
                      style={{
                        width: '100%',
                        padding: '12px 48px 12px 16px',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        color: 'var(--text-primary)',
                        fontSize: '1rem',
                      }}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        color: 'var(--text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {showPassword ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--brand-primary)',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      padding: '0',
                    }}
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    padding: '14px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    marginBottom: '24px',
                  }}
                >
                  {loading ? <LoadingSpinner size={20} /> : 'Sign In'}
                </button>

                <div style={{
                  textAlign: 'center',
                  paddingTop: '24px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
                    Don't have an account?
                  </p>
                  <Link
                    to="/start"
                    className="btn btn-secondary"
                    style={{
                      display: 'inline-block',
                      padding: '12px 32px',
                      fontSize: '1rem',
                      fontWeight: '600',
                    }}
                  >
                    Create Account
                  </Link>
                </div>
              </form>
            )}
          </div>

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Need help? <Link to="/contact" style={{ color: 'var(--brand-primary)' }}>Contact us</Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
