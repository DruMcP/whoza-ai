import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { emailService } from '../services/emailService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { generateOrganizationSchema, generateBreadcrumbSchema } from '../utils/schemaOrg';
import LeadCaptureForm from '../components/LeadCaptureForm';
import AccountStep from '../components/AccountStep';
import BusinessDetailsStep from '../components/BusinessDetailsStep';
import AdditionalInfoStep from '../components/AdditionalInfoStep';
import FinalDetailsStep from '../components/FinalDetailsStep';
import StepIndicator from '../components/StepIndicator';

const STEPS = [
  { id: 1, title: 'Account', description: 'Create your account' },
  { id: 2, title: 'Business', description: 'Tell us about your business' },
  { id: 3, title: 'Plan', description: 'Choose your plan' },
];

export default function Start() {
  const navigate = useNavigate();
  const { signUp, signIn } = useAuth();
  const [isSignUp, setIsSignUp] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [showTrialGate, setShowTrialGate] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

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

  // Check URL parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode');
    const email = params.get('email');
    if (mode === 'signin') setIsSignUp(false);
    if (email) {
      setFormData(prev => ({ ...prev, email }));
      setTouched(prev => ({ ...prev, email: true }));
    }
  }, []);

  useEffect(() => {
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 0);
  }, [currentStep]);

  // Validation
  const validateEmail = (email) => {
    if (!email) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    if (password.length < 8) return 'Consider using at least 8 characters for better security';
    return '';
  };

  const validatePostcode = (postcode) => {
    if (!postcode) return 'Postcode is required';
    if (!/^[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}$/i.test(postcode)) return 'Please enter a valid UK postcode';
    return '';
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

  const formatPostcode = (value) => {
    if (!value || typeof value !== 'string') return value || '';
    const cleaned = value.toUpperCase().replace(/\s/g, '');
    if (cleaned.length <= 3) return cleaned;
    const inward = cleaned.slice(-3);
    const outward = cleaned.slice(0, -3);
    return `${outward} ${inward}`;
  };

  const handleFieldChange = (name, value) => {
    let processedValue = value;
    if (name === 'postcode' && value) processedValue = formatPostcode(value);
    setFormData(prev => ({ ...prev, [name]: processedValue }));
    if (touched[name]) {
      const error = validateField(name, processedValue);
      setFieldErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleFieldBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name] || '');
    setFieldErrors(prev => ({ ...prev, [name]: error }));
  };

  const getFieldStatus = (name) => {
    if (!touched[name]) return '';
    const error = fieldErrors[name];
    const value = formData[name];
    if (error && error.includes('Consider')) return 'warning';
    if (error) return 'error';
    if (value) return 'success';
    return '';
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'email': return validateEmail(value);
      case 'password': return validatePassword(value);
      case 'postcode': return validatePostcode(value);
      case 'websiteUrl':
      case 'googleBusinessUrl': return validateUrl(value);
      case 'businessName': return !value ? 'Business name is required' : '';
      case 'tradeType': return !value ? 'Trade type is required' : '';
      case 'serviceArea': return !value ? 'Service area is required' : '';
      default: return '';
    }
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);
        return formData.email && formData.password && !emailError && (!passwordError || passwordError.includes('Consider'));
      case 2:
        return formData.businessName && formData.tradeType && formData.postcode && formData.serviceArea && !validatePostcode(formData.postcode);
      case 3:
        return !validateUrl(formData.websiteUrl || '') && !validateUrl(formData.googleBusinessUrl || '');
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setError(null);
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 0);
    } else {
      setError('Please fill in all required fields to continue.');
    }
  };

  const handlePrevious = () => {
    setError(null);
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 0);
  };

  const handleSocialLogin = async (provider) => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: `${window.location.origin}/auth/callback` },
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
    if (errorMsg.includes('Invalid login credentials')) return 'Invalid email or password. Please try again.';
    if (errorMsg.includes('Email not confirmed')) return 'Please confirm your email address before signing in.';
    if (errorMsg.includes('User already registered') || errorMsg.includes('already been registered') || errorMsg.includes('already exists')) {
      return 'This email is already registered. Use the "Sign In" tab above to access your account.';
    }
    if (errorMsg.includes('Password should be at least')) return 'Password must be at least 6 characters long.';
    if (errorMsg.includes('network') || errorMsg.includes('fetch')) return 'Network error. Please check your connection and try again.';
    return errorMsg;
  };

  const normalizeUrl = (url) => {
    if (!url) return '';
    const trimmed = url.trim();
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) return 'https://' + trimmed;
    return trimmed;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isSignUp) {
        const { data: authData, error: authError } = await signUp(formData.email, formData.password);
        if (authError) {
          if (authError.message?.toLowerCase().includes('already') || authError.message?.toLowerCase().includes('exists') || authError.status === 422) {
            throw new Error('User already registered - This email is already registered. Use the "Sign In" tab above to access your account.');
          }
          throw authError;
        }

        setSuccess('Account created successfully! Setting up your profile...');
        const userId = authData.user.id;

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
          }, { onConflict: 'id', ignoreDuplicates: false });

        if (userError) throw new Error(`Failed to save your profile: ${userError.message}`);

        emailService.startOnboardingCampaign(userId, formData.email, formData.businessName).catch(() => {});

        // Notify admin (fire-and-forget)
        const _supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const _supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        fetch(`${_supabaseUrl}/functions/v1/notify-admin-signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${_supabaseAnonKey}`,
            'apikey': _supabaseAnonKey,
          },
          body: JSON.stringify({
            userEmail: formData.email,
            userName: formData.businessName || formData.email,
            businessName: formData.businessName || null,
            tradeType: formData.tradeType || null,
            postcode: formData.postcode || null,
            websiteUrl: formData.websiteUrl ? normalizeUrl(formData.websiteUrl) : null,
            userId,
          }),
        }).catch(() => {});

        navigate('/start/plan');
      } else {
        const { error: signInError } = await signIn(formData.email, formData.password);
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
        <AccountStep
          formData={formData}
          setFormData={setFormData}
          touched={touched}
          setTouched={setTouched}
          fieldErrors={fieldErrors}
          setFieldErrors={setFieldErrors}
          getFieldStatus={getFieldStatus}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          isSignUp={false}
          loading={loading}
          handleSocialLogin={handleSocialLogin}
          showForgotPassword={showForgotPassword}
          setShowForgotPassword={setShowForgotPassword}
          resetEmailSent={resetEmailSent}
          setResetEmailSent={setResetEmailSent}
          handleForgotPassword={handleForgotPassword}
          setError={setError}
          setSuccess={setSuccess}
          validateEmail={validateEmail}
          validatePassword={validatePassword}
        />
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <AccountStep
            formData={formData}
            setFormData={setFormData}
            touched={touched}
            setTouched={setTouched}
            fieldErrors={fieldErrors}
            setFieldErrors={setFieldErrors}
            getFieldStatus={getFieldStatus}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            isSignUp={true}
            loading={loading}
            handleSocialLogin={handleSocialLogin}
            showForgotPassword={showForgotPassword}
            setShowForgotPassword={setShowForgotPassword}
            resetEmailSent={resetEmailSent}
            setResetEmailSent={setResetEmailSent}
            handleForgotPassword={handleForgotPassword}
            setError={setError}
            setSuccess={setSuccess}
            validateEmail={validateEmail}
            validatePassword={validatePassword}
          />
        );
      case 2:
        return (
          <BusinessDetailsStep
            formData={formData}
            setFormData={setFormData}
            touched={touched}
            setTouched={setTouched}
            fieldErrors={fieldErrors}
            setFieldErrors={setFieldErrors}
            getFieldStatus={getFieldStatus}
            handleFieldChange={handleFieldChange}
            handleFieldBlur={handleFieldBlur}
          />
        );
      case 3:
        return (
          <AdditionalInfoStep
            formData={formData}
            handleFieldChange={handleFieldChange}
            handleFieldBlur={handleFieldBlur}
            touched={touched}
            fieldErrors={fieldErrors}
            getFieldStatus={getFieldStatus}
          />
        );
      case 4:
        return (
          <FinalDetailsStep
            formData={formData}
            setFormData={setFormData}
            handleFieldChange={handleFieldChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <SEO 
        title="Start Your Free Trial | Whoza.ai" 
        description="Start your 14-day free trial. No credit card required. Get found by AI search engines and never miss a call again."
        schemas={[generateOrganizationSchema(), generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Start Free Trial', url: '/start' }])]}
      />
      <Header />
      <main id="main-content" role="main">
        <div className="container" style={{ maxWidth: '600px' }}>
          {/* Auth toggle */}
          <div className="auth-toggle">
            <button
              type="button"
              className={isSignUp ? 'active' : ''}
              onClick={() => {
                setIsSignUp(true);
                setShowTrialGate(true);
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

          {/* Trial Gate or Form Header */}
          {isSignUp && showTrialGate ? (
            <>
              <h1 style={{ textAlign: 'center', marginBottom: '8px' }}>Start Your Free Trial</h1>
              <p className="signup-subtitle" style={{ textAlign: 'center', marginBottom: '32px' }}>
                14 days, all features, no credit card required
              </p>
              <LeadCaptureForm
                onComplete={(leadData) => {
                  setFormData(prev => ({
                    ...prev,
                    email: leadData.email || prev.email,
                    businessName: leadData.businessName || prev.businessName,
                    tradeType: leadData.tradeType || prev.tradeType,
                    postcode: leadData.postcode || prev.postcode,
                  }));
                  setShowTrialGate(false);
                }}
                initialEmail={formData.email}
              />
            </>
          ) : isSignUp ? (
            <>
              <h1>Get started with Rex</h1>
              <p className="signup-subtitle">
                Takes 10-15 minutes per week. You'll choose your plan after this.
              </p>
              <StepIndicator steps={STEPS} currentStep={currentStep} />
              <div className="step-content">
                <h2 className="step-title">{STEPS[currentStep - 1].description}</h2>
              </div>
            </>
          ) : (
            <>
              <h1>Sign in</h1>
              <p className="signup-subtitle">Welcome back. Enter your details below.</p>
            </>
          )}

          {/* Messages */}
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

          {/* Form */}
          <form onSubmit={handleSubmit} aria-label={isSignUp ? 'Sign up form' : 'Sign in form'}>
            {renderStepContent()}

            <div className="form-navigation">
              {isSignUp ? (
                <>
                  {currentStep > 1 && (
                    <button type="button" onClick={handlePrevious} className="button button-secondary" aria-label="Go back to previous step">
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
                    <button type="submit" disabled={loading} className="button" style={{ marginLeft: 'auto' }}>
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

          {/* Trust signals */}
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
              <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
              <span className="trust-divider">•</span>
              <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a>
            </div>
            <p className="trust-statement">
              We never share your data with third parties. Your business information stays private and is only used to provide you with personalized AI visibility insights.
            </p>
          </div>

          {/* Toggle link */}
          <p style={{ marginTop: 'var(--spacing-lg)' }}>
            {isSignUp ? (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setIsSignUp(false); setCurrentStep(1); setError(null); }}
                  style={{ background: 'none', border: 'none', padding: 0, color: 'var(--color-primary-500)', cursor: 'pointer', textDecoration: 'underline', font: 'inherit' }}
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Need an account?{' '}
                <button
                  type="button"
                  onClick={() => { setIsSignUp(true); setCurrentStep(1); setError(null); }}
                  style={{ background: 'none', border: 'none', padding: 0, color: 'var(--color-primary-500)', cursor: 'pointer', textDecoration: 'underline', font: 'inherit' }}
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
