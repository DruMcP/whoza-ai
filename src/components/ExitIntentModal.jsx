import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PhoneOff,
  Check,
  X,
  ArrowRight,
  ExternalLink,
  Shield,
  Lock,
  Star,
} from 'lucide-react';

/**
 * ExitIntentModal v2 — High-conversion exit-intent overlay.
 * Triggers on mouse-leave toward top (desktop) or rapid scroll-up / back gesture (mobile).
 * Shows once per session. 3-second delay before monitoring begins.
 */
export default function ExitIntentModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [canMonitor, setCanMonitor] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);
  const lastScrollY = useRef(0);
  const scrollVelocityRef = useRef(0);
  const scrollTimestampRef = useRef(Date.now());
  const hasScrolledDeep = useRef(false);

  // 3-second delay before monitoring
  useEffect(() => {
    const timer = setTimeout(() => setCanMonitor(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Check if already shown this session
  useEffect(() => {
    const shown = sessionStorage.getItem('exit_intent_modal_shown');
    if (shown === 'true') {
      setHasTriggered(true);
    }
  }, []);

  const trigger = useCallback(() => {
    if (hasTriggered || !canMonitor) return;
    setIsVisible(true);
    setHasTriggered(true);
    sessionStorage.setItem('exit_intent_modal_shown', 'true');
    // Start pulse animation
    setPulseCount(1);
  }, [hasTriggered, canMonitor]);

  // Desktop: mouse leaving viewport toward top
  const handleMouseLeave = useCallback(
    (e) => {
      if (hasTriggered || !canMonitor) return;
      // clientY <= 10 means moving toward the top edge (close/back/tab buttons)
      if (e.clientY <= 10 && e.relatedTarget === null) {
        trigger();
      }
    },
    [hasTriggered, canMonitor, trigger]
  );

  // Mobile: rapid scroll-up detection + deep-scroll prerequisite
  const handleScroll = useCallback(() => {
    if (hasTriggered || !canMonitor) return;

    const currentY = window.scrollY;
    const now = Date.now();
    const dt = now - scrollTimestampRef.current;

    // Track if user has scrolled down significantly
    if (currentY > 800) {
      hasScrolledDeep.current = true;
    }

    if (dt > 0) {
      const velocity = (lastScrollY.current - currentY) / dt; // positive = scrolling up
      scrollVelocityRef.current = velocity;
    }

    // Trigger if:
    // 1. User has scrolled deep first (not just loaded and bounced)
    // 2. Rapid scroll-up (velocity > 2px/ms) toward top
    // 3. OR scrollY < 100 after having scrolled deep
    if (hasScrolledDeep.current) {
      const rapidScrollUp = scrollVelocityRef.current > 2;
      const backToTop = currentY < 100 && lastScrollY.current > 300;

      if (rapidScrollUp || backToTop) {
        trigger();
      }
    }

    lastScrollY.current = currentY;
    scrollTimestampRef.current = now;
  }, [hasTriggered, canMonitor, trigger]);

  // Mobile: back gesture detection (popstate / beforeunload)
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!hasTriggered && canMonitor && hasScrolledDeep.current) {
        trigger();
        // Standard preventDefault doesn't work for back button,
        // but we show modal before navigation
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasTriggered, canMonitor, trigger]);

  useEffect(() => {
    document.addEventListener('mouseout', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleMouseLeave, handleScroll]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleStartTrial = () => {
    window.location.href = '/start';
  };

  const handleHowItWorks = () => {
    window.open('/how-it-works', '_blank');
  };

  // Pulse animation: loop 3 times then stop
  useEffect(() => {
    if (pulseCount > 0 && pulseCount < 3 && isVisible) {
      const timer = setTimeout(() => setPulseCount((c) => c + 1), 1200);
      return () => clearTimeout(timer);
    }
  }, [pulseCount, isVisible]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
            }}
            style={{
              maxWidth: 520,
              width: '100%',
              backgroundColor: '#0F172A',
              borderRadius: '1rem',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '32px',
              position: 'relative',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close X */}
            <button
              onClick={handleClose}
              aria-label="Close modal"
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#94A3B8',
                padding: 4,
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={20} />
            </button>

            {/* Animated Icon with Pulse Ring */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 20,
                position: 'relative',
                width: 64,
                height: 64,
                margin: '0 auto 20px',
              }}
            >
              {/* Pulse rings */}
              {pulseCount > 0 && pulseCount <= 3 && (
                <motion.div
                  key={`pulse-${pulseCount}`}
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    border: '2px solid #EF4444',
                  }}
                />
              )}
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <PhoneOff size={28} color="#EF4444" />
              </div>
            </div>

            {/* Headline */}
            <h2
              id="exit-modal-title"
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: '#FFFFFF',
                textAlign: 'center',
                marginBottom: 12,
                lineHeight: 1.2,
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              Wait — don't lose jobs to voicemail
            </h2>

            {/* Subhead */}
            <p
              style={{
                fontSize: 16,
                color: '#94A3B8',
                textAlign: 'center',
                marginBottom: 12,
                lineHeight: 1.5,
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              Every missed call costs £50–£250. Most tradespeople miss 3–8 calls per week.
            </p>

            {/* Counter */}
            <p
              style={{
                fontSize: 15,
                color: '#F59E0B',
                textAlign: 'center',
                marginBottom: 24,
                fontStyle: 'italic',
                lineHeight: 1.4,
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              You're about to leave £500+ on the table this month
            </p>

            {/* Bullet Points */}
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              {[
                'Katie answers every call — even at 6 AM',
                'Claire collects reviews while you work',
                'Rex tracks competitors so you stay ahead',
              ].map((text, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    fontSize: 15,
                    color: '#E2E8F0',
                    fontFamily: "'Inter', system-ui, sans-serif",
                  }}
                >
                  <span
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(16, 185, 129, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Check size={12} color="#10B981" strokeWidth={3} />
                  </span>
                  {text}
                </li>
              ))}
            </ul>

            {/* Primary CTA */}
            <button
              onClick={handleStartTrial}
              style={{
                width: '100%',
                padding: '16px 24px',
                borderRadius: 12,
                border: 'none',
                cursor: 'pointer',
                fontSize: 18,
                fontWeight: 700,
                color: '#FFFFFF',
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                boxShadow: '0 4px 14px rgba(5, 150, 105, 0.35)',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                fontFamily: "'Inter', system-ui, sans-serif",
                marginBottom: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(5, 150, 105, 0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(5, 150, 105, 0.35)';
              }}
            >
              Start Your Free Trial — See How Many Jobs Katie Books · No Card Required
              <ArrowRight size={18} />
            </button>

            {/* Secondary CTA */}
            <button
              onClick={handleHowItWorks}
              style={{
                width: '100%',
                padding: '10px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
                color: '#94A3B8',
                textAlign: 'center',
                fontFamily: "'Inter', system-ui, sans-serif",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
                marginBottom: 20,
                textDecoration: 'underline',
                textUnderlineOffset: 3,
              }}
            >
              See How It Works
              <ExternalLink size={14} />
            </button>

            {/* Close / Maybe later */}
            <button
              onClick={handleClose}
              style={{
                width: '100%',
                padding: '8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 13,
                color: '#64748B',
                textAlign: 'center',
                fontFamily: "'Inter', system-ui, sans-serif",
                marginBottom: 16,
              }}
            >
              ✕ Maybe later
            </button>

            {/* Trust Badge Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                fontSize: 11,
                color: '#64748B',
                fontFamily: "'Inter', system-ui, sans-serif",
                flexWrap: 'wrap',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Shield size={12} />
                ICO Registered
              </span>
              <span style={{ color: '#334155' }}>·</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Lock size={12} />
                GDPR Compliant
              </span>
              <span style={{ color: '#334155' }}>·</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Star size={12} />
                4.9/5 rating
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
