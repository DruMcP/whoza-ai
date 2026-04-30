import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { checkTrialAvailability, joinWaitlist, getWaitlistStatus } from '../services/trialWaitlistService';
import { Loader2, CheckCircle, Clock, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * TrialGate v2 — Mobile-optimised with progressive disclosure
 * Displays trial availability status and waitlist option
 * Shown before the main signup flow on /start
 */
export default function TrialGate({ onProceedToSignup, initialEmail = '' }) {
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(true);
  const [waitlistEmail, setWaitlistEmail] = useState(initialEmail);
  const [businessName, setBusinessName] = useState('');
  const [tradeType, setTradeType] = useState('');
  const [phone, setPhone] = useState('');
  const [postcode, setPostcode] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [waitlistSubmitting, setWaitlistSubmitting] = useState(false);
  const [waitlistResult, setWaitlistResult] = useState(null);
  const [waitlistStatus, setWaitlistStatus] = useState(null);
  const [checkingWaitlist, setCheckingWaitlist] = useState(false);
  const [showOptionalFields, setShowOptionalFields] = useState(false);
  const [formStep, setFormStep] = useState(1); // 1 = required, 2 = optional

  const tradeOptions = [
    'Electrician', 'Plumber', 'Decorator / Painter', 'Carpenter / Joiner',
    'Roofer', 'Builder', 'Plasterer', 'Landscaper / Gardener',
    'Locksmith', 'Heating Engineer / Gas Fitter', 'Tiler', 'Flooring Specialist',
    'Kitchen Fitter', 'Bathroom Fitter', 'Handyman / General', 'Other'
  ];

  useEffect(() => {
    loadAvailability();
  }, []);

  async function loadAvailability() {
    try {
      const data = await checkTrialAvailability();
      setAvailability(data);
    } catch (err) {
      console.error('Failed to load trial availability:', err);
      setAvailability({ available: true, slots_remaining: null });
    } finally {
      setLoading(false);
    }
  }

  async function handleCheckWaitlist() {
    if (!waitlistEmail) return;
    setCheckingWaitlist(true);
    try {
      const status = await getWaitlistStatus(waitlistEmail);
      setWaitlistStatus(status);
    } catch (err) {
      console.error('Failed to check waitlist:', err);
    } finally {
      setCheckingWaitlist(false);
    }
  }

  async function handleJoinWaitlist(e) {
    e.preventDefault();
    if (!waitlistEmail || !businessName || !tradeType) return;
    
    setWaitlistSubmitting(true);
    try {
      const result = await joinWaitlist({
        email: waitlistEmail,
        business_name: businessName,
        trade_type: tradeType,
        phone,
        website_url: websiteUrl,
        postcode,
      });
      setWaitlistResult(result);
    } catch (err) {
      setWaitlistResult({ success: false, message: err.message });
    } finally {
      setWaitlistSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-16 px-4">
        <Loader2 size={40} className="animate-spin mx-auto mb-4" style={{ color: 'var(--color-blue)' }} />
        <p className="ds-body" style={{ color: 'var(--color-slate)' }}>Checking trial availability...</p>
      </div>
    );
  }

  const slotsRemaining = availability?.slots_remaining ?? null;
  const isAvailable = availability?.available !== false;

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      {/* Progress dots for waitlist form */}
      {!isAvailable && !waitlistResult?.success && (
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className={`h-2.5 rounded-full transition-all ${formStep === 1 ? 'bg-blue-600 w-6' : 'bg-blue-200 w-2.5'}`} />
          <div className={`h-2.5 rounded-full transition-all ${formStep === 2 ? 'bg-blue-600 w-6' : 'bg-blue-200 w-2.5'}`} />
          <div className={`h-2.5 rounded-full w-2.5 ${waitlistResult?.success ? 'bg-green-500' : 'bg-blue-200'}`} />
        </div>
      )}

      <AnimatePresence mode="wait">
        {isAvailable ? (
          <motion.div
            key="available"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Available State */}
            <div className="ds-card text-center mb-6" style={{ border: '2px solid var(--color-primary-500)', background: 'linear-gradient(135deg, rgba(194, 255, 72, 0.12) 0%, rgba(194, 255, 72, 0.03) 100%)' }}>
              <div className="text-5xl mb-3">🎉</div>
              <h2 className="ds-heading-3 mb-2">
                Start your free trial today
              </h2>
              <p className="ds-body-sm mb-5" style={{ color: 'var(--color-slate)' }}>
                14-day full feature trial — no credit card required
              </p>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium mb-5" style={{ background: 'rgba(34, 197, 94, 0.15)', color: 'var(--color-green)' }}>
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                50% of plan minutes included
              </div>

              <button
                onClick={onProceedToSignup}
                className="ds-btn ds-btn-cta ds-btn-lg w-full"
              >
                Start Free Trial →
              </button>
            </div>

            <div className="ds-card" style={{ background: 'var(--color-navy-50)' }}>
              <p className="font-semibold mb-3 text-sm" style={{ color: 'var(--color-navy)' }}>
                What's included:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-navy)' }}>
                  <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: 'var(--color-green)' }} />
                  AI answers your calls 24/7
                </li>
                <li className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-navy)' }}>
                  <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: 'var(--color-green)' }} />
                  WhatsApp summaries after every call
                </li>
                <li className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-navy)' }}>
                  <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: 'var(--color-green)' }} />
                  AI visibility score + action plan
                </li>
                <li className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-navy)' }}>
                  <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: 'var(--color-green)' }} />
                  Competitor tracking dashboard
                </li>
                <li className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-navy)' }}>
                  <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: 'var(--color-green)' }} />
                  Spam and cold caller filtering
                </li>
              </ul>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Waitlist State */}
            <div className="ds-card text-center mb-6">
              <div className="text-5xl mb-3">⏳</div>
              <h2 className="ds-heading-3 mb-2">
                This week's trial slots are full
              </h2>
              <p className="ds-body-sm mb-5" style={{ color: 'var(--color-slate)' }}>
                We limit trials to 25 per week to ensure quality. Join the waitlist — we open new slots every Monday at 9 AM.
              </p>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium mb-2" style={{ background: 'rgba(194, 255, 72, 0.12)', color: 'var(--color-navy)' }}>
                <Clock size={14} />
                {availability?.slots_total || 25} new slots open every Monday
              </div>
            </div>

            {/* Check existing waitlist status */}
            <div className="mb-6">
              <div className="flex gap-2 mb-4">
                <input
                  type="email"
                  placeholder="Enter your email to check waitlist status"
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  className="ds-input flex-1"
                />
                <button
                  onClick={handleCheckWaitlist}
                  disabled={checkingWaitlist || !waitlistEmail}
                  className="ds-btn ds-btn-secondary whitespace-nowrap"
                >
                  {checkingWaitlist ? 'Checking...' : 'Check'}
                </button>
              </div>

              {waitlistStatus?.on_waitlist && (
                <div className="ds-card p-4 mb-4" style={{ background: 'rgba(194, 255, 72, 0.08)', border: '1px solid var(--color-primary-500)' }}>
                  <p className="font-semibold mb-1">
                    You're #{waitlistStatus.position} on the waitlist
                  </p>
                  <p className="text-sm" style={{ color: 'var(--color-slate)' }}>
                    Status: {waitlistStatus.status} • Added {new Date(waitlistStatus.created_at).toLocaleDateString()}
                  </p>
                  {waitlistStatus.status === 'notified' && (
                    <p className="text-sm mt-2" style={{ color: 'var(--color-amber)' }}>
                      ⚠️ Your slot expires {new Date(waitlistStatus.expires_at).toLocaleDateString()} — activate now!
                    </p>
                  )}
                </div>
              )}

              {waitlistStatus && !waitlistStatus.on_waitlist && waitlistEmail && (
                <p className="text-sm mb-4" style={{ color: 'var(--color-slate)' }}>
                  Not on the waitlist yet. Fill in the form below to join.
                </p>
              )}
            </div>

            {/* Join Waitlist Form */}
            {!waitlistResult?.success ? (
              <form onSubmit={handleJoinWaitlist}>
                {/* Step 1: Required fields */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-navy)' }}>Email *</label>
                    <input
                      type="email"
                      required
                      value={waitlistEmail}
                      onChange={(e) => {
                        setWaitlistEmail(e.target.value);
                        setFormStep(1);
                      }}
                      placeholder="you@yourbusiness.co.uk"
                      className="ds-input w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-navy)' }}>Business Name *</label>
                    <input
                      type="text"
                      required
                      value={businessName}
                      onChange={(e) => {
                        setBusinessName(e.target.value);
                        if (e.target.value && waitlistEmail) setFormStep(1);
                      }}
                      placeholder="Smith & Sons Plumbing"
                      className="ds-input w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-navy)' }}>Trade Type *</label>
                    <select
                      required
                      value={tradeType}
                      onChange={(e) => {
                        setTradeType(e.target.value);
                        if (e.target.value && businessName && waitlistEmail) setFormStep(2);
                      }}
                      className="ds-input w-full"
                    >
                      <option value="">Select your trade...</option>
                      {tradeOptions.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Step 2: Optional fields (collapsible) */}
                <div className="mb-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowOptionalFields(!showOptionalFields);
                      if (!showOptionalFields) setFormStep(2);
                    }}
                    className="flex items-center gap-2 text-sm font-medium py-2"
                    style={{ color: 'var(--color-blue)' }}
                  >
                    {showOptionalFields ? (
                      <><ChevronUp size={16} /> Hide optional details</>
                    ) : (
                      <><ChevronDown size={16} /> Add phone, postcode & website (helps us onboard faster)</>
                    )}
                  </button>

                  <AnimatePresence>
                    {showOptionalFields && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4 overflow-hidden"
                      >
                        <div className="pt-2">
                          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-navy)' }}>Phone Number</label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="07700 900123"
                            className="ds-input w-full"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-navy)' }}>Postcode</label>
                          <input
                            type="text"
                            value={postcode}
                            onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                            placeholder="LS1 4DY"
                            className="ds-input w-full"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-navy)' }}>Website URL</label>
                          <input
                            type="url"
                            value={websiteUrl}
                            onChange={(e) => setWebsiteUrl(e.target.value)}
                            placeholder="https://yoursite.co.uk"
                            className="ds-input w-full"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  type="submit"
                  disabled={waitlistSubmitting}
                  className="ds-btn ds-btn-cta ds-btn-lg w-full"
                >
                  {waitlistSubmitting ? 'Joining...' : 'Join Waitlist →'}
                </button>

                {waitlistResult && !waitlistResult.success && (
                  <p className="text-sm mt-3" style={{ color: 'var(--color-red)' }}>
                    {waitlistResult.message}
                  </p>
                )}
              </form>
            ) : (
              <div className="ds-card text-center py-8" style={{ border: '2px solid var(--color-primary-500)', background: 'linear-gradient(135deg, rgba(194, 255, 72, 0.12) 0%, rgba(194, 255, 72, 0.03) 100%)' }}>
                <div className="text-4xl mb-3">✅</div>
                <h3 className="ds-heading-3 mb-2">You're on the waitlist!</h3>
                <p className="ds-body-sm mb-2" style={{ color: 'var(--color-slate)' }}>
                  {waitlistResult.message}
                </p>
                <p className="text-sm" style={{ color: 'var(--color-slate)' }}>
                  We'll email and text you when your slot opens. You have 24 hours to activate.
                </p>
              </div>
            )}

            <div className="ds-card mt-6 p-4 text-sm" style={{ background: 'var(--color-navy-50)' }}>
              <p className="font-semibold mb-2" style={{ color: 'var(--color-navy)' }}>
                Why the waitlist?
              </p>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <CheckCircle size={14} className="shrink-0 mt-0.5" style={{ color: 'var(--color-green)' }} />
                  We personally onboard every trial user
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={14} className="shrink-0 mt-0.5" style={{ color: 'var(--color-green)' }} />
                  Quality over quantity — your AI is configured for your specific trade
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={14} className="shrink-0 mt-0.5" style={{ color: 'var(--color-green)' }} />
                  Fair access — no one can hog all the slots
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
