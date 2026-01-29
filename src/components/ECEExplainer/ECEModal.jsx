import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPrimaryPostForPillar } from '../../data/eceBlogMapping';

export default function ECEModal({ pillar, onClose, onNavigate, totalPillars }) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleTabTrap = (e) => {
      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTabTrap);

    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTabTrap);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const IconComponent = pillar.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={handleBackdropClick}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px',
          overflowY: 'auto'
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            maxWidth: '700px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
            boxShadow: '0 24px 48px rgba(0, 0, 0, 0.3)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{
            position: 'sticky',
            top: 0,
            background: '#ffffff',
            borderBottom: '1px solid #e5e7eb',
            padding: '24px',
            borderRadius: '24px 24px 0 0',
            zIndex: 10
          }}>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s ease'
              }}
              aria-label="Close modal"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f3f4f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <X size={24} style={{ color: '#6b7280' }} />
            </button>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '16px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(34, 211, 238, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#22d3ee',
                fontSize: '20px',
                fontWeight: '700'
              }}>
                {pillar.number}
              </div>
              <IconComponent size={36} style={{ color: '#22d3ee' }} aria-hidden="true" />
            </div>

            <div style={{
              fontSize: '12px',
              fontWeight: '600',
              letterSpacing: '0.05em',
              color: '#6b7280',
              textTransform: 'uppercase',
              marginBottom: '8px'
            }}>
              {pillar.shortLabel}
            </div>

            <h2
              id="modal-title"
              style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#111827',
                lineHeight: '1.2'
              }}
            >
              {pillar.title}
            </h2>
          </div>

          <div style={{ padding: '32px 24px' }}>
            <div style={{
              background: '#ffffff',
              border: '2px solid #e5e7eb',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '24px'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#111827',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '12px'
              }}>
                WHAT THIS MEANS
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#374151',
                lineHeight: '1.6'
              }}>
                {pillar.whatThisMeans}
              </p>
            </div>

            <div style={{
              background: '#0e7490',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '24px'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '12px'
              }}>
                WHY AI CARES ABOUT THIS
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#e0f2fe',
                lineHeight: '1.6'
              }}>
                {pillar.whyAICares}
              </p>
            </div>

            <div style={{
              background: '#365314',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '24px'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '12px'
              }}>
                WHAT YOU CAN DO TODAY
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#ecfccb',
                lineHeight: '1.6'
              }}>
                {pillar.whatYouCanDo}
              </p>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              marginBottom: '24px',
              flexWrap: 'wrap'
            }}>
              <div style={{
                display: 'flex',
                gap: '8px'
              }}>
                {Array.from({ length: totalPillars }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => onNavigate(i + 1)}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      border: pillar.id === i + 1 ? '2px solid #22d3ee' : '1px solid #d1d5db',
                      background: pillar.id === i + 1 ? 'rgba(34, 211, 238, 0.1)' : '#ffffff',
                      color: pillar.id === i + 1 ? '#22d3ee' : '#6b7280',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    aria-label={`Go to pillar ${i + 1}`}
                    aria-current={pillar.id === i + 1 ? 'true' : 'false'}
                    onMouseEnter={(e) => {
                      if (pillar.id !== i + 1) {
                        e.currentTarget.style.borderColor = '#22d3ee';
                        e.currentTarget.style.background = 'rgba(34, 211, 238, 0.05)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (pillar.id !== i + 1) {
                        e.currentTarget.style.borderColor = '#d1d5db';
                        e.currentTarget.style.background = '#ffffff';
                      }
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Blog Post Link for Internal Linking & Topical Authority */}
            {getPrimaryPostForPillar(pillar.id) && (
              <Link
                to={`/blog/${getPrimaryPostForPillar(pillar.id).slug}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '16px',
                  background: 'linear-gradient(135deg, #22d3ee, #0ea5e9)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                  marginBottom: '12px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #0ea5e9, #0284c7)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 211, 238, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #22d3ee, #0ea5e9)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span>📖 Read Detailed Guide</span>
                <ExternalLink size={18} />
              </Link>
            )}

            <button
              onClick={onClose}
              style={{
                width: '100%',
                padding: '16px',
                background: '#c4f135',
                color: '#1a2e05',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#a8d91e';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#c4f135';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Got it
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
