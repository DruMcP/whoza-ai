import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { emailService } from '../services/emailService';
import Header from '../components/Header';
import Footer from '../components/Footer';

const STEPS = [
  { id: 1, title: 'Account', description: 'Create your account' },
  { id: 2, title: 'Business', description: 'Tell us about your business' },
  { id: 3, title: 'Services', description: 'What you offer' },
  { id: 4, title: 'Finish', description: 'Final details' },
];

const TRADE_OPTIONS = [
  { value: '', label: 'Select your trade...' },
  { value: 'electrician', label: 'Electrician' },
  { value: 'plumber', label: 'Plumber' },
  { value: 'decorator', label: 'Decorator / Painter' },
  { value: 'carpenter', label: 'Carpenter / Joiner' },
  { value: 'roofer', label: 'Roofer' },
  { value: 'builder', label: 'Builder' },
  { value: 'plasterer', label: 'Plasterer' },
  { value: 'landscaper', label: 'Landscaper / Gardener' },
  { value: 'locksmith', label: 'Locksmith' },
  { value: 'heating_engineer', label: 'Heating Engineer / Gas Fitter' },
  { value: 'tiler', label: 'Tiler' },
  { value: 'flooring', label: 'Flooring Specialist' },
  { value: 'kitchen_fitter', label: 'Kitchen Fitter' },
  { value: 'bathroom_fitter', label: 'Bathroom Fitter' },
  { value: 'handyman', label: 'Handyman / General' },
  { value: 'other', label: 'Other' }
];

export default function Start() {
  const navigate = useNavigate();
  const { signUp, signIn } = useAuth();
  const [isSignUp, setIsSignUp] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [rememberMe, setRememberMe] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    businessName: '',
    tradeType: '',
    postcode: '',
    serviceArea: '',
    websiteUrl: '',
    googleBusinessUrl: '',
    keyServices: '',
    credentials: '',
    competitors: '',
    isFounder: false,
  });

  const [touched, setTouched] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Check URL parameter for sign-in mode
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode');
    if (mode === 'signin') {
      setIsSignUp(false);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 0);
  }, [currentStep]);

  const validateEmail = (email) => {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) return 'Email is required';
      if (!emailRegex.test(email)) return 'Please enter a valid email address';
      return '';
    } catch (err) {
      return 'Invalid email';
    }
  };

  const validatePassword = (password) => {
    try {
      if (!password) return 'Password is required';
      if (password.length < 6) return 'Password must be at least 6 characters';
      if (password.length < 8) return 'Consider using at least 8 characters for better security';
      return '';
    } catch (err) {
      return 'Invalid password';
    }
  };

  const validatePostcode = (postcode) => {
    try {
      if (!postcode) return 'Postcode is required';
      const postcodeRegex = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}$/i;
      if (!postcodeRegex.test(postcode)) return 'Please enter a valid UK postcode';
      return '';
    } catch (err) {
      return 'Invalid postcode';
    }
  };

  const validateUrl = (url) => {
    if (!url) return '';
    try {
      let urlToValidate = url.trim();
      if (!urlToValidate.startsWith('http://') && !urlToValidate.startsWith('https://')) {
        urlToValidate = 'https://' + urlToValidate;
      }
      new URL(urlToValidate);
      return '';
    } catch {
      return 'Please enter a valid URL (e.g., example.com)';
    }
  };

  const normalizeUrl = (url) => {
    if (!url) return '';
    const trimmed = url.trim();
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
      return 'https://' + trimmed;
    }
    return trimmed;
  };

  const formatPostcode = (value) => {
    try {
      if (!value || typeof value !== 'string') return value || '';
      const cleaned = value.toUpperCase().replace(/\s/g, '');
      if (cleaned.length <= 3) return cleaned;
      const inward = cleaned.slice(-3);
      const outward = cleaned.slice(0, -3);
      return `${outward} ${inward}`;
    } catch (err) {
      return value;
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        return validateEmail(value);
      case 'password':
        return validatePassword(value);
      case 'postcode':
        return validatePostcode(value);
      case 'websiteUrl':
      case 'googleBusinessUrl':
        return validateUrl(value);
      case 'businessName':
        return !value ? 'Business name is required' : '';
      case 'tradeType':
        return !value ? 'Trade type is required' : '';
      case 'serviceArea':
        return !value ? 'Service area is required' : '';
      default:
        return '';
    }
  };

  const handleFieldChange = (name, value) => {
    try {
      let processedValue = value;

      if (name === 'postcode' && value) {
        processedValue = formatPostcode(value);
      }

      setFormData({ ...formData, [name]: processedValue });

      if (touched[name]) {
        const error = validateField(name, processedValue);
        setFieldErrors({ ...fieldErrors, [name]: error });
      }
    } catch (err) {
    }
  };

  const handleFieldBlur = (name) => {
    try {
      setTouched({ ...touched, [name]: true });
      const error = validateField(name, formData[name] || '');
      setFieldErrors({ ...fieldErrors, [name]: error });
    } catch (err) {
    }
  };

  const getFieldStatus = (name) => {
    try {
      if (!touched[name]) return '';
      const error = fieldErrors[name];
      const value = formData[name];

      if (error && typeof error === 'string' && error.includes('Consider')) return 'warning';
      if (error) return 'error';
      if (value) return 'success';
      return '';
    } catch (err) {
      return '';
    }
  };

  const validateStep = (step) => {
    try {
      switch (step) {
        case 1:
          const emailError = validateEmail(formData.email);
          const passwordError = validatePassword(formData.password);
          return (
            formData.email &&
            formData.password &&
            !emailError &&
            (!passwordError || passwordError.includes('Consider'))
          );
        case 2:
          return (
            formData.businessName &&
            formData.tradeType &&
            formData.postcode &&
            formData.serviceArea &&
            !validatePostcode(formData.postcode)
          );
        case 3:
          const websiteError = validateUrl(formData.websiteUrl || '');
          const googleError = validateUrl(formData.googleBusinessUrl || '');
          return !websiteError && !googleError;
        case 4:
          return true;
        default:
          return false;
      }
    } catch (err) {
      return false;
    }
  };

  const handleNext = () => {
    try {
      if (validateStep(currentStep)) {
        setError(null);
        setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }, 0);
      } else {
        setError('Please fill in all required fields to continue.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please check all fields are filled correctly.');
    }
  };

  const handlePrevious = () => {
    setError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 0);
  };

  const handleSocialLogin = async (provider) => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: 'https://whoza.ai/auth/callback',
        },
      });
      if (error) throw error;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      setError('Please enter your email address');
      return;
    }

    if (validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: `${window.location.origin}/start`,
      });
      if (error) throw error;
      setResetEmailSent(true);
      setSuccess('Password reset email sent! Check your inbox.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (error) => {
    if (!error) return null;

    const errorMsg = error.message || error;

    if (errorMsg.includes('Invalid login credentials')) {
      return 'Invalid email or password. Please try again.';
    }
    if (errorMsg.includes('Email not confirmed')) {
      return 'Please confirm your email address before signing in.';
    }
    if (errorMsg.includes('User already registered') ||
        errorMsg.includes('already been registered') ||
        errorMsg.includes('already exists')) {
      return 'This email is already registered. Use the "Sign In" tab above to access your account.';
    }
    if (errorMsg.includes('Password should be at least')) {
      return 'Password must be at least 6 characters long.';
    }
    if (errorMsg.includes('network') || errorMsg.includes('fetch')) {
      return 'Network error. Please check your connection and try again.';
    }

    return errorMsg;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isSignUp) {
        const { data: authData, error: authError } = await signUp(
          formData.email,
          formData.password
        );

        if (authError) {
          if (authError.message?.toLowerCase().includes('already') ||
              authError.message?.toLowerCase().includes('exists') ||
              authError.status === 422) {
            throw new Error('User already registered - This email is already registered. Use the "Sign In" tab above to access your account.');
          }
          throw authError;
        }

        setSuccess('Account created successfully! Setting up your profile...');

        const userId = authData.user.id;

        // Use upsert to create or update user profile
        // This handles cases where profile may already exist
        const { error: userError } = await supabase
          .from('users')
          .upsert({
            id: userId,
            email: formData.email,
            business_name: formData.businessName,
            trade_type: formData.tradeType,
            postcode: formData.postcode,
            service_area: formData.serviceArea || null,
            website_url: formData.websiteUrl ? normalizeUrl(formData.websiteUrl) : null,
            google_business_url: formData.googleBusinessUrl ? normalizeUrl(formData.googleBusinessUrl) : null,
            key_services: formData.keyServices || null,
            credentials: formData.credentials || null,
            competitors: formData.competitors || null,
            founder: formData.isFounder,
            role: 'customer',
            subscription_tier: 'free',
            subscription_status: 'trial',
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'id',
            ignoreDuplicates: false
          });

        if (userError) {
          throw new Error(`Failed to save your profile: ${userError.message}`);
        }

        emailService.startOnboardingCampaign(
          userId,
          formData.email,
          formData.businessName
        ).catch((emailError) => {
        });

        navigate('/checkout');
      } else {
        const { error: signInError } = await signIn(
          formData.email,
          formData.password
        );

        if (signInError) throw signInError;

        navigate('/portal');
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    if (!isSignUp) {
      return (
        <>
          <div className="social-login-section">
            <div className="social-login-buttons">
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                className="social-login-btn google-btn"
                disabled={loading}
              >
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin('linkedin_oidc')}
                className="social-login-btn linkedin-btn"
                disabled={loading}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#0A66C2">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Continue with LinkedIn
              </button>
            </div>
            <div className="divider">
              <span>or continue with email</span>
            </div>
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
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
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
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />

              <label htmlFor="password">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                  style={{ paddingRight: '48px' }}
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
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ cursor: 'pointer' }}
                  />
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

    switch (currentStep) {
      case 1:
        return (
          <>
            <div className="social-login-section">
              <div className="social-login-buttons">
                <button
                  type="button"
                  onClick={() => handleSocialLogin('google')}
                  className="social-login-btn google-btn"
                  disabled={loading}
                  aria-label="Sign up with Google"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin('linkedin_oidc')}
                  className="social-login-btn linkedin-btn"
                  disabled={loading}
                  aria-label="Sign up with LinkedIn"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="#0A66C2">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Continue with LinkedIn
                </button>
              </div>
              <div className="divider">
                <span>or continue with email</span>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="email">
                Email address <span className="required-indicator">*</span>
              </label>
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
                  aria-invalid={touched.email && fieldErrors.email ? 'true' : 'false'}
                  aria-describedby={touched.email && fieldErrors.email ? 'email-error' : undefined}
                />
                {getFieldStatus('email') && (
                  <span className={`validation-icon ${getFieldStatus('email')}`}>
                    {getFieldStatus('email') === 'success' ? '✓' :
                     getFieldStatus('email') === 'error' ? '✕' : '!'}
                  </span>
                )}
              </div>
              {touched.email && fieldErrors.email && (
                <p className={`field-error ${getFieldStatus('email')}`} id="email-error" role="alert">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="password">
                Password <span className="required-indicator">*</span>
              </label>
              <div className="input-wrapper" style={{ position: 'relative' }}>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleFieldChange('password', e.target.value)}
                  onBlur={() => handleFieldBlur('password')}
                  className={`input-with-validation ${getFieldStatus('password')}`}
                  required
                  minLength={6}
                  aria-required="true"
                  aria-invalid={touched.password && fieldErrors.password ? 'true' : 'false'}
                  aria-describedby={touched.password && fieldErrors.password ? 'password-error' : 'password-hint'}
                  style={{ paddingRight: '72px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
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
                {getFieldStatus('password') && (
                  <span className={`validation-icon ${getFieldStatus('password')}`}>
                    {getFieldStatus('password') === 'success' ? '✓' :
                     getFieldStatus('password') === 'error' ? '✕' : '!'}
                  </span>
                )}
              </div>
              {touched.password && fieldErrors.password && (
                <p className={`field-error ${getFieldStatus('password')}`} id="password-error" role="alert">
                  {fieldErrors.password}
                </p>
              )}
              {!fieldErrors.password && (
                <p className="field-hint" id="password-hint">At least 6 characters</p>
              )}
            </div>
          </>
        );

      case 2:
        return (
          <>
            <div className="form-field">
              <label htmlFor="businessName">
                Business name <span className="required-indicator">*</span>
              </label>
              <div className="input-wrapper">
                <input
                  id="businessName"
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => handleFieldChange('businessName', e.target.value)}
                  onBlur={() => handleFieldBlur('businessName')}
                  className={`input-with-validation ${getFieldStatus('businessName')}`}
                  required
                />
                {getFieldStatus('businessName') && (
                  <span className={`validation-icon ${getFieldStatus('businessName')}`}>
                    {getFieldStatus('businessName') === 'success' ? '✓' : '✕'}
                  </span>
                )}
              </div>
              {touched.businessName && fieldErrors.businessName && (
                <p className="field-error error">
                  {fieldErrors.businessName}
                </p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="tradeType">
                What trade are you? <span className="required-indicator">*</span>
              </label>
              <div className="input-wrapper">
                <select
                  id="tradeType"
                  name="tradeType"
                  value={formData.tradeType}
                  onChange={(e) => handleFieldChange('tradeType', e.target.value)}
                  onBlur={() => handleFieldBlur('tradeType')}
                  className={`input-with-validation ${getFieldStatus('tradeType')}`}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '15px',
                    backgroundColor: 'white',
                    cursor: 'pointer'
                  }}
                >
                  {TRADE_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {getFieldStatus('tradeType') && (
                  <span className={`validation-icon ${getFieldStatus('tradeType')}`}>
                    {getFieldStatus('tradeType') === 'success' ? '✓' : '✕'}
                  </span>
                )}
              </div>
              {touched.tradeType && fieldErrors.tradeType && (
                <p className="field-error error">
                  {fieldErrors.tradeType}
                </p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="postcode">
                Postcode <span className="required-indicator">*</span>
              </label>
              <div className="input-wrapper">
                <input
                  id="postcode"
                  type="text"
                  placeholder="For example: SW1A 1AA"
                  value={formData.postcode}
                  onChange={(e) => handleFieldChange('postcode', e.target.value)}
                  onBlur={() => handleFieldBlur('postcode')}
                  className={`input-with-validation ${getFieldStatus('postcode')}`}
                  required
                  maxLength={8}
                />
                {getFieldStatus('postcode') && (
                  <span className={`validation-icon ${getFieldStatus('postcode')}`}>
                    {getFieldStatus('postcode') === 'success' ? '✓' : '✕'}
                  </span>
                )}
              </div>
              {touched.postcode && fieldErrors.postcode && (
                <p className="field-error error">
                  {fieldErrors.postcode}
                </p>
              )}
              {!fieldErrors.postcode && (
                <p className="field-hint">Automatically formatted as you type</p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="serviceArea">
                Where do you work? <span className="required-indicator">*</span>
              </label>
              <div className="input-wrapper">
                <input
                  id="serviceArea"
                  type="text"
                  placeholder="For example: West London, or 10 mile radius of Reading"
                  value={formData.serviceArea}
                  onChange={(e) => handleFieldChange('serviceArea', e.target.value)}
                  onBlur={() => handleFieldBlur('serviceArea')}
                  className={`input-with-validation ${getFieldStatus('serviceArea')}`}
                  required
                />
                {getFieldStatus('serviceArea') && (
                  <span className={`validation-icon ${getFieldStatus('serviceArea')}`}>
                    {getFieldStatus('serviceArea') === 'success' ? '✓' : '✕'}
                  </span>
                )}
              </div>
              {touched.serviceArea && fieldErrors.serviceArea && (
                <p className="field-error error">
                  {fieldErrors.serviceArea}
                </p>
              )}
            </div>
          </>
        );

      case 3:
        return (
          <>
            <p className="step-description">
              Help Rex understand your business better (all optional)
            </p>

            <div className="form-field">
              <label htmlFor="websiteUrl">Website (if you have one)</label>
              <div className="input-wrapper">
                <input
                  id="websiteUrl"
                  type="url"
                  placeholder="https://example.com"
                  value={formData.websiteUrl}
                  onChange={(e) => handleFieldChange('websiteUrl', e.target.value)}
                  onBlur={() => handleFieldBlur('websiteUrl')}
                  className={`input-with-validation ${getFieldStatus('websiteUrl')}`}
                />
                {getFieldStatus('websiteUrl') && (
                  <span className={`validation-icon ${getFieldStatus('websiteUrl')}`}>
                    {getFieldStatus('websiteUrl') === 'success' ? '✓' : '✕'}
                  </span>
                )}
              </div>
              {touched.websiteUrl && fieldErrors.websiteUrl && (
                <p className="field-error error">
                  {fieldErrors.websiteUrl}
                </p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="googleBusinessUrl">
                Google Business Profile URL (if you have one)
              </label>
              <div className="input-wrapper">
                <input
                  id="googleBusinessUrl"
                  type="url"
                  placeholder="https://g.page/..."
                  value={formData.googleBusinessUrl}
                  onChange={(e) => handleFieldChange('googleBusinessUrl', e.target.value)}
                  onBlur={() => handleFieldBlur('googleBusinessUrl')}
                  className={`input-with-validation ${getFieldStatus('googleBusinessUrl')}`}
                />
                {getFieldStatus('googleBusinessUrl') && (
                  <span className={`validation-icon ${getFieldStatus('googleBusinessUrl')}`}>
                    {getFieldStatus('googleBusinessUrl') === 'success' ? '✓' : '✕'}
                  </span>
                )}
              </div>
              {touched.googleBusinessUrl && fieldErrors.googleBusinessUrl && (
                <p className="field-error error">
                  {fieldErrors.googleBusinessUrl}
                </p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="keyServices">Main services you offer</label>
              <input
                id="keyServices"
                type="text"
                placeholder="Separate with commas, like: rewiring, fuse boxes, emergency callouts"
                value={formData.keyServices}
                onChange={(e) => handleFieldChange('keyServices', e.target.value)}
              />
              <p className="field-hint">Separate multiple services with commas</p>
            </div>
          </>
        );

      case 4:
        return (
          <>
            <p className="step-description">
              Final details (all optional)
            </p>

            <div className="form-field">
              <label htmlFor="credentials">
                Qualifications or certifications
              </label>
              <input
                id="credentials"
                type="text"
                placeholder="For example: Part P registered, 20 years experience, NICEIC approved"
                value={formData.credentials}
                onChange={(e) => handleFieldChange('credentials', e.target.value)}
              />
            </div>

            <div className="form-field">
              <label htmlFor="competitors">
                Who are your main local competitors?
              </label>
              <input
                id="competitors"
                type="text"
                placeholder="Names or websites, separated by commas"
                value={formData.competitors}
                onChange={(e) => handleFieldChange('competitors', e.target.value)}
              />
              <p className="field-hint">Helps us benchmark your online visibility</p>
            </div>

            <div className="founder-circle-box">
              <label className="founder-circle-label">
                <input
                  type="checkbox"
                  checked={formData.isFounder}
                  onChange={(e) =>
                    setFormData({ ...formData, isFounder: e.target.checked })
                  }
                />
                <span>
                  <strong>I'm interested in the Founders Circle</strong>
                  <br />
                  <span className="founder-circle-description">
                    If spaces are available, you'll get 2 months free and
                    then founder pricing (limited to 10 members).
                  </span>
                </span>
              </label>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Header />

      <main id="main-content" role="main">
        <div className="container" style={{ maxWidth: '600px' }}>
          <div className="auth-toggle">
            <button
              type="button"
              className={isSignUp ? 'active' : ''}
              onClick={() => {
                setIsSignUp(true);
                setCurrentStep(1);
                setError(null);
                setSuccess(null);
                setShowForgotPassword(false);
              }}
              aria-label="Sign up"
              aria-pressed={isSignUp}
            >
              Sign Up
            </button>
            <button
              type="button"
              className={!isSignUp ? 'active' : ''}
              onClick={() => {
                setIsSignUp(false);
                setError(null);
                setSuccess(null);
                setShowForgotPassword(false);
              }}
              aria-label="Sign in"
              aria-pressed={!isSignUp}
            >
              Sign In
            </button>
          </div>

          {isSignUp ? (
            <>
              <h1>Get started with Rex</h1>
              <p className="signup-subtitle">
                Takes 10-15 minutes per week. You'll choose your plan after this.
              </p>

              <div className="progress-bar-container" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={STEPS.length} aria-label="Sign up progress">
                <div className="progress-steps">
                  {STEPS.map((step, index) => (
                    <div
                      key={step.id}
                      className={`progress-step ${
                        currentStep === step.id
                          ? 'active'
                          : currentStep > step.id
                          ? 'completed'
                          : ''
                      }`}
                      aria-current={currentStep === step.id ? 'step' : undefined}
                    >
                      <div className="progress-step-circle">
                        {currentStep > step.id ? (
                          <svg viewBox="0 0 20 20" fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <span>{step.id}</span>
                        )}
                      </div>
                      <div className="progress-step-label">
                        <div className="progress-step-title">{step.title}</div>
                      </div>
                      {index < STEPS.length - 1 && (
                        <div
                          className={`progress-step-line ${
                            currentStep > step.id ? 'completed' : ''
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="step-content">
                <h2 className="step-title">{STEPS[currentStep - 1].description}</h2>
              </div>
            </>
          ) : (
            <>
              <h1>Sign in</h1>
              <p className="signup-subtitle">
                Welcome back. Enter your details below.
              </p>
            </>
          )}

          {error && (
            <div className="error" role="alert" aria-live="assertive">
              <strong>There was a problem:</strong> {error}
            </div>
          )}

          {success && (
            <div className="success-message" role="status" aria-live="polite" style={{
              padding: 'var(--spacing-md)',
              backgroundColor: 'rgba(194, 255, 72, 0.1)',
              border: '2px solid var(--color-primary-500)',
              borderRadius: '8px',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--spacing-lg)',
              fontSize: '15px',
              fontWeight: 500
            }}>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} aria-label={isSignUp ? 'Sign up form' : 'Sign in form'}>
            {renderStepContent()}

            <div className="form-navigation">
              {isSignUp ? (
                <>
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handlePrevious}
                      className="button button-secondary"
                      aria-label="Go back to previous step"
                    >
                      Back
                    </button>
                  )}
                  {currentStep < STEPS.length ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="button"
                      style={{ marginLeft: currentStep > 1 ? 'auto' : '0' }}
                      aria-label="Continue to next step"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="button"
                      style={{ marginLeft: 'auto' }}
                    >
                      {loading ? 'Please wait...' : 'Continue to choose plan'}
                    </button>
                  )}
                </>
              ) : (
                !showForgotPassword && (
                  <button type="submit" disabled={loading} className="button">
                    {loading ? 'Please wait...' : 'Sign in'}
                  </button>
                )
              )}
            </div>
          </form>

          <div className="trust-signals">
            <div className="security-badge">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
              </svg>
              <div>
                <strong>Your data is secure</strong>
                <p>Bank-level encryption protects your information</p>
              </div>
            </div>

            <div className="trust-links">
              <a href="/privacy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
              <span className="trust-divider">•</span>
              <a href="/terms" target="_blank" rel="noopener noreferrer">
                Terms of Service
              </a>
            </div>

            <p className="trust-statement">
              We never share your data with third parties. Your business information stays private and is only used to provide you with personalized AI visibility insights.
            </p>
          </div>

          <p style={{ marginTop: 'var(--spacing-lg)' }}>
            {isSignUp ? (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(false);
                    setCurrentStep(1);
                    setError(null);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: 'var(--color-primary-500)',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    font: 'inherit'
                  }}
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Need an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(true);
                    setCurrentStep(1);
                    setError(null);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: 'var(--color-primary-500)',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    font: 'inherit'
                  }}
                >
                  Sign up
                </button>
              </>
            )}
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
