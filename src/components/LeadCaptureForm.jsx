import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  PhoneOff,
  Search,
  Star,
  TrendingDown,
  Check,
  Loader2,
} from 'lucide-react';

const TRADE_OPTIONS = [
  'Plumber',
  'Electrician',
  'Builder',
  'Roofer',
  'Painter/Decorator',
  'Carpenter',
  'Kitchen Fitter',
  'Bathroom Fitter',
  'Gas Engineer',
  'Handyman',
  'Other',
];

const PAIN_POINTS = [
  {
    id: 'missed-calls',
    label: 'Missing calls while on jobs',
    icon: PhoneOff,
    color: '#EF4444',
    glow: 'rgba(239, 68, 68, 0.25)',
  },
  {
    id: 'not-showing',
    label: 'Not showing up when customers search',
    icon: Search,
    color: '#2563EB',
    glow: 'rgba(37, 99, 235, 0.25)',
  },
  {
    id: 'no-reviews',
    label: 'Struggling to get reviews',
    icon: Star,
    color: '#F59E0B',
    glow: 'rgba(245, 158, 11, 0.25)',
  },
  {
    id: 'losing-jobs',
    label: 'Losing jobs to competitors',
    icon: TrendingDown,
    color: '#8B5CF6',
    glow: 'rgba(139, 92, 246, 0.25)',
  },
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

/**
 * LeadCaptureForm — 3-step lead qualification form.
 * Step 1: Business info
 * Step 2: Pain point selection
 * Step 3: Contact details + start trial
 */
export default function LeadCaptureForm({ onComplete, initialEmail = '' }) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    businessName: '',
    tradeType: '',
    postcode: '',
    painPoint: '',
    email: initialEmail,
    phone: '',
    consent: false,
  });

  const [errors, setErrors] = useState({});

  const updateField = useCallback((field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  }, []);

  const validateStep = (s) => {
    const newErrors = {};
    if (s === 1) {
      if (!data.businessName.trim()) newErrors.businessName = 'Business name is required';
      if (!data.tradeType) newErrors.tradeType = 'Trade type is required';
      if (!data.postcode.trim()) {
        newErrors.postcode = 'Postcode is required';
      } else if (!/^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i.test(data.postcode.trim())) {
        newErrors.postcode = 'Please enter a valid postcode';
      }
    }
    if (s === 2) {
      if (!data.painPoint) newErrors.painPoint = 'Please select your biggest challenge';
    }
    if (s === 3) {
      if (!data.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
        newErrors.email = 'Please enter a valid email';
      }
      if (!data.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!data.consent) newErrors.consent = 'Please agree to receive updates';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setDirection(1);
      setStep((s) => Math.min(s + 1, 3));
    }
  };

  const handleBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    setLoading(true);
    try {
      // Pass all captured data to parent
      await onComplete?.({
        businessName: data.businessName.trim(),
        tradeType: data.tradeType,
        postcode: data.postcode.trim().toUpperCase(),
        painPoint: data.painPoint,
        email: data.email.trim().toLowerCase(),
        phone: data.phone.trim(),
        consent: data.consent,
      });
    } finally {
      setLoading(false);
    }
  };

  const progress = (step / 3) * 100;

  const isStep1Valid = data.businessName.trim() && data.tradeType && data.postcode.trim();
  const isStep2Valid = !!data.painPoint;
  const isStep3Valid = data.email.trim() && data.phone.trim() && data.consent;

  return (
    <div
      style={{
        maxWidth: 560,
        margin: '0 auto',
        padding: '24px 16px',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Progress Header */}
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: '#94A3B8',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Step {step} of 3
          </span>
          <span style={{ fontSize: 13, color: '#64748B' }}>{Math.round(progress)}%</span>
        </div>
        <div
          style={{
            width: '100%',
            height: 4,
            backgroundColor: '#334155',
            borderRadius: 999,
            overflow: 'hidden',
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              height: '100%',
              backgroundColor: '#10B981',
              borderRadius: 999,
            }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div style={{ position: 'relative', overflow: 'hidden', minHeight: 360 }}>
        <AnimatePresence mode="wait" custom={direction}>
          {step === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: 24,
                  lineHeight: 1.3,
                }}
              >
                Let's get to know your business
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Business Name */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#E2E8F0',
                      marginBottom: 6,
                    }}
                  >
                    Business name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Hendricks Plumbing"
                    value={data.businessName}
                    onChange={(e) => updateField('businessName', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      fontSize: 15,
                      color: '#FFFFFF',
                      backgroundColor: '#1E293B',
                      border: `1.5px solid ${errors.businessName ? '#EF4444' : '#334155'}`,
                      borderRadius: 8,
                      outline: 'none',
                      fontFamily: "inherit",
                      transition: 'border-color 0.15s ease',
                    }}
                    onFocus={(e) => {
                      if (!errors.businessName) e.currentTarget.style.borderColor = '#FFFFFF';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = errors.businessName ? '#EF4444' : '#334155';
                    }}
                  />
                  {errors.businessName && (
                    <p style={{ fontSize: 12, color: '#EF4444', marginTop: 4 }}>{errors.businessName}</p>
                  )}
                </div>

                {/* Trade Type */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#E2E8F0',
                      marginBottom: 6,
                    }}
                  >
                    Trade type
                  </label>
                  <select
                    value={data.tradeType}
                    onChange={(e) => updateField('tradeType', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      fontSize: 15,
                      color: data.tradeType ? '#FFFFFF' : '#64748B',
                      backgroundColor: '#1E293B',
                      border: `1.5px solid ${errors.tradeType ? '#EF4444' : '#334155'}`,
                      borderRadius: 8,
                      outline: 'none',
                      fontFamily: "inherit",
                      cursor: 'pointer',
                      appearance: 'none',
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 12px center',
                    }}
                  >
                    <option value="" disabled>
                      Select your trade...
                    </option>
                    {TRADE_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors.tradeType && (
                    <p style={{ fontSize: 12, color: '#EF4444', marginTop: 4 }}>{errors.tradeType}</p>
                  )}
                </div>

                {/* Postcode */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#E2E8F0',
                      marginBottom: 6,
                    }}
                  >
                    Postcode
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., SW4 9HE"
                    value={data.postcode}
                    onChange={(e) => updateField('postcode', e.target.value.toUpperCase())}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      fontSize: 15,
                      color: '#FFFFFF',
                      backgroundColor: '#1E293B',
                      border: `1.5px solid ${errors.postcode ? '#EF4444' : '#334155'}`,
                      borderRadius: 8,
                      outline: 'none',
                      fontFamily: "inherit",
                      textTransform: 'uppercase',
                    }}
                    onFocus={(e) => {
                      if (!errors.postcode) e.currentTarget.style.borderColor = '#FFFFFF';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = errors.postcode ? '#EF4444' : '#334155';
                    }}
                  />
                  {errors.postcode && (
                    <p style={{ fontSize: 12, color: '#EF4444', marginTop: 4 }}>{errors.postcode}</p>
                  )}
                </div>
              </div>

              <button
                onClick={handleNext}
                disabled={!isStep1Valid}
                style={{
                  width: '100%',
                  marginTop: 24,
                  padding: '14px 20px',
                  borderRadius: 10,
                  border: 'none',
                  cursor: isStep1Valid ? 'pointer' : 'not-allowed',
                  fontSize: 16,
                  fontWeight: 700,
                  color: '#FFFFFF',
                  background: isStep1Valid
                    ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                    : '#334155',
                  opacity: isStep1Valid ? 1 : 0.6,
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  fontFamily: "inherit",
                }}
              >
                Continue
                <ArrowRight size={18} />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: 6,
                  lineHeight: 1.3,
                }}
              >
                What's your biggest challenge?
              </h2>
              <p style={{ fontSize: 14, color: '#94A3B8', marginBottom: 20 }}>
                Pick the one that hurts most right now.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {PAIN_POINTS.map((point) => {
                  const Icon = point.icon;
                  const isSelected = data.painPoint === point.id;
                  return (
                    <button
                      key={point.id}
                      onClick={() => updateField('painPoint', point.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        padding: '14px 16px',
                        borderRadius: 12,
                        border: `2px solid ${isSelected ? point.color : 'rgba(255,255,255,0.08)'}`,
                        backgroundColor: isSelected ? 'rgba(255,255,255,0.04)' : '#0F172A',
                        boxShadow: isSelected ? `0 0 20px ${point.glow}` : 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        textAlign: 'left',
                        width: '100%',
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                      }}
                    >
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 10,
                          backgroundColor: isSelected ? `${point.color}20` : '#1E293B',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          transition: 'background-color 0.2s ease',
                        }}
                      >
                        <Icon size={20} color={isSelected ? point.color : '#94A3B8'} />
                      </div>
                      <span
                        style={{
                          fontSize: 15,
                          fontWeight: 600,
                          color: isSelected ? '#FFFFFF' : '#E2E8F0',
                          flex: 1,
                        }}
                      >
                        {point.label}
                      </span>
                      {isSelected && (
                        <div
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: '50%',
                            backgroundColor: point.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <Check size={14} color="#FFFFFF" strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {errors.painPoint && (
                <p style={{ fontSize: 12, color: '#EF4444', marginTop: 10 }}>{errors.painPoint}</p>
              )}

              <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                <button
                  onClick={handleBack}
                  style={{
                    flex: '0 0 auto',
                    padding: '14px 20px',
                    borderRadius: 10,
                    border: '1.5px solid #334155',
                    cursor: 'pointer',
                    fontSize: 15,
                    fontWeight: 600,
                    color: '#94A3B8',
                    backgroundColor: 'transparent',
                    fontFamily: "inherit",
                    transition: 'all 0.15s ease',
                  }}
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!isStep2Valid}
                  style={{
                    flex: 1,
                    padding: '14px 20px',
                    borderRadius: 10,
                    border: 'none',
                    cursor: isStep2Valid ? 'pointer' : 'not-allowed',
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#FFFFFF',
                    background: isStep2Valid
                      ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                      : '#334155',
                    opacity: isStep2Valid ? 1 : 0.6,
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    fontFamily: "inherit",
                  }}
                >
                  Continue
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: 6,
                  lineHeight: 1.3,
                }}
              >
                Where should we send your results?
              </h2>
              <p style={{ fontSize: 14, color: '#94A3B8', marginBottom: 20 }}>
                We'll use this to set up your account.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Email */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#E2E8F0',
                      marginBottom: 6,
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={data.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      fontSize: 15,
                      color: '#FFFFFF',
                      backgroundColor: '#1E293B',
                      border: `1.5px solid ${errors.email ? '#EF4444' : '#334155'}`,
                      borderRadius: 8,
                      outline: 'none',
                      fontFamily: "inherit",
                    }}
                    onFocus={(e) => {
                      if (!errors.email) e.currentTarget.style.borderColor = '#FFFFFF';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = errors.email ? '#EF4444' : '#334155';
                    }}
                  />
                  {errors.email && (
                    <p style={{ fontSize: 12, color: '#EF4444', marginTop: 4 }}>{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#E2E8F0',
                      marginBottom: 6,
                    }}
                  >
                    Phone number
                  </label>
                  <input
                    type="tel"
                    placeholder="07123 456789"
                    value={data.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      fontSize: 15,
                      color: '#FFFFFF',
                      backgroundColor: '#1E293B',
                      border: `1.5px solid ${errors.phone ? '#EF4444' : '#334155'}`,
                      borderRadius: 8,
                      outline: 'none',
                      fontFamily: "inherit",
                    }}
                    onFocus={(e) => {
                      if (!errors.phone) e.currentTarget.style.borderColor = '#FFFFFF';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = errors.phone ? '#EF4444' : '#334155';
                    }}
                  />
                  {errors.phone && (
                    <p style={{ fontSize: 12, color: '#EF4444', marginTop: 4 }}>{errors.phone}</p>
                  )}
                </div>

                {/* Consent Checkbox */}
                <div>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      cursor: 'pointer',
                      padding: 10,
                      borderRadius: 8,
                      border: `1.5px solid ${errors.consent ? '#EF4444' : 'transparent'}`,
                    }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 5,
                        border: `2px solid ${data.consent ? '#10B981' : '#64748B'}`,
                        backgroundColor: data.consent ? '#10B981' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: 1,
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {data.consent && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
                    </div>
                    <input
                      type="checkbox"
                      checked={data.consent}
                      onChange={(e) => updateField('consent', e.target.checked)}
                      style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                    />
                    <span style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.4 }}>
                      I agree to receive updates about whoza.ai{' '}
                      <span style={{ color: '#64748B' }}>(unsubscribe anytime)</span>
                    </span>
                  </label>
                  {errors.consent && (
                    <p style={{ fontSize: 12, color: '#EF4444', marginTop: 4, marginLeft: 10 }}>
                      {errors.consent}
                    </p>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                <button
                  onClick={handleBack}
                  style={{
                    flex: '0 0 auto',
                    padding: '14px 20px',
                    borderRadius: 10,
                    border: '1.5px solid #334155',
                    cursor: 'pointer',
                    fontSize: 15,
                    fontWeight: 600,
                    color: '#94A3B8',
                    backgroundColor: 'transparent',
                    fontFamily: "inherit",
                  }}
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!isStep3Valid || loading}
                  style={{
                    flex: 1,
                    padding: '14px 20px',
                    borderRadius: 10,
                    border: 'none',
                    cursor: isStep3Valid && !loading ? 'pointer' : 'not-allowed',
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#FFFFFF',
                    background: isStep3Valid && !loading
                      ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                      : '#334155',
                    opacity: isStep3Valid && !loading ? 1 : 0.6,
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    fontFamily: "inherit",
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Setting up...
                    </>
                  ) : (
                    <>
                      Start Free Trial — Get Instant Access
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>

              <p
                style={{
                  fontSize: 12,
                  color: '#64748B',
                  textAlign: 'center',
                  marginTop: 14,
                }}
              >
                14 days free · No credit card · Cancel anytime
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
