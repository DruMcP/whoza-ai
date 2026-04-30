import { useState } from 'react';

export default function AccountStep({
  formData,
  setFormData,
  touched,
  setTouched,
  fieldErrors,
  setFieldErrors,
  getFieldStatus,
  showPassword,
  setShowPassword,
  isSignUp,
  loading,
  handleSocialLogin,
  showForgotPassword,
  setShowForgotPassword,
  resetEmailSent,
  setResetEmailSent,
  handleForgotPassword,
  setError,
  setSuccess,
  validateEmail,
  validatePassword,
}) {
  const handleFieldChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = name === 'email' ? validateEmail(value) : validatePassword(value);
      setFieldErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleFieldBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const value = formData[name] || '';
    const error = name === 'email' ? validateEmail(value) : validatePassword(value);
    setFieldErrors(prev => ({ ...prev, [name]: error }));
  };

  if (!isSignUp) {
    return (
      <>
        <div className="social-login-section">
          <div className="social-login-buttons">
            <SocialButton provider="google" onClick={() => handleSocialLogin('google')} loading={loading} label="Continue with Google" />
            <SocialButton provider="linkedin" onClick={() => handleSocialLogin('linkedin_oidc')} loading={loading} label="Continue with LinkedIn" />
          </div>
          <div className="divider"><span>or continue with email</span></div>
        </div>

        {showForgotPassword ? (
          <>
            <p className="step-description">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
              autoFocus
            />
            {resetEmailSent && (
              <div className="success-message" role="status">
                Check your email for a password reset link. It may take a few minutes to arrive.
              </div>
            )}
            <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-lg)' }}>
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={loading}
                className="button"
                style={{ flex: 1 }}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForgotPassword(false);
                  setResetEmailSent(false);
                  setError(null);
                  setSuccess(null);
                }}
                className="button button-secondary"
                style={{ flex: 1 }}
              >
                Back to Sign In
              </button>
            </div>
          </>
        ) : (
          <>
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />

            <label htmlFor="password">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
                style={{ paddingRight: '48px' }}
              />
              <PasswordToggle show={showPassword} onToggle={() => setShowPassword(!showPassword)} />
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 'var(--spacing-sm)',
              marginBottom: 'var(--spacing-md)'
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-xs)',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                <input type="checkbox" style={{ cursor: 'pointer' }} />
                Remember me
              </label>
              <button
                type="button"
                onClick={() => {
                  setShowForgotPassword(true);
                  setError(null);
                  setSuccess(null);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  fontSize: '14px',
                  color: 'var(--color-primary-500)',
                  cursor: 'pointer',
                  textDecoration: 'none'
                }}
              >
                Forgot password?
              </button>
            </div>
          </>
        )}
      </>
    );
  }

  // Sign up mode
  return (
    <>
      <div className="social-login-section">
        <div className="social-login-buttons">
          <SocialButton provider="google" onClick={() => handleSocialLogin('google')} loading={loading} label="Continue with Google" />
          <SocialButton provider="linkedin" onClick={() => handleSocialLogin('linkedin_oidc')} loading={loading} label="Continue with LinkedIn" />
        </div>
        <div className="divider"><span>or continue with email</span></div>
      </div>

      <div className="form-field">
        <label htmlFor="email">Email address <span className="required-indicator">*</span></label>
        <div className="input-wrapper">
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            onBlur={() => handleFieldBlur('email')}
            className={`input-with-validation ${getFieldStatus('email')}`}
            required
            aria-required="true"
          />
          {getFieldStatus('email') && (
            <span className={`validation-icon ${getFieldStatus('email')}`}>
              {getFieldStatus('email') === 'success' ? '✓' : getFieldStatus('email') === 'error' ? '✕' : '!'}
            </span>
          )}
        </div>
        {touched.email && fieldErrors.email && (
          <p className={`field-error ${getFieldStatus('email')}`} role="alert">{fieldErrors.email}</p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="password">Password <span className="required-indicator">*</span></label>
        <div className="input-wrapper" style={{ position: 'relative' }}>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => handleFieldChange('password', e.target.value)}
            onBlur={() => handleFieldBlur('password')}
            className={`input-with-validation ${getFieldStatus('password')}`}
            required
            style={{ paddingRight: '72px' }}
          />
          <PasswordToggle show={showPassword} onToggle={() => setShowPassword(!showPassword)} />
          {getFieldStatus('password') && (
            <span className={`validation-icon ${getFieldStatus('password')}`}>
              {getFieldStatus('password') === 'success' ? '✓' : getFieldStatus('password') === 'error' ? '✕' : '!'}
            </span>
          )}
        </div>
        {touched.password && fieldErrors.password && (
          <p className={`field-error ${getFieldStatus('password')}`} role="alert">{fieldErrors.password}</p>
        )}
        {!fieldErrors.password && <p className="field-hint">At least 6 characters</p>}
      </div>
    </>
  );
}

function SocialButton({ provider, onClick, loading, label }) {
  const isGoogle = provider === 'google';
  return (
    <button
      type="button"
      onClick={onClick}
      className={`social-login-btn ${isGoogle ? 'google-btn' : 'linkedin-btn'}`}
      disabled={loading}
      aria-label={label}
    >
      {isGoogle ? (
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="#0A66C2">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )}
      {label}
    </button>
  );
}

function PasswordToggle({ show, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={show ? 'Hide password' : 'Show password'}
      style={{
        position: 'absolute',
        right: '36px',
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
        zIndex: 1,
      }}
    >
      {show ? (
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
  );
}
