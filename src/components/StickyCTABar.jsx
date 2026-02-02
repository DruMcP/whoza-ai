import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from './icons/Icon';

export default function StickyCTABar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 500);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        .sticky-cta-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          background-color: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(10px);
          border-top: 2px solid var(--color-primary-600);
          box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
          padding: var(--spacing-md) var(--spacing-lg);
          z-index: 999;
          animation: slideUp 0.3s ease-out;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--spacing-md);
          flex-wrap: wrap;
          box-sizing: border-box;
        }

        .sticky-cta-content {
          flex: 1;
          min-width: 200px;
          color: white;
        }

        .sticky-cta-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .sticky-cta-subtitle {
          font-size: 14px;
          color: #F3F4F6;
        }

        .sticky-cta-actions {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          flex-wrap: wrap;
        }

        .sticky-cta-button {
          font-size: 16px;
          padding: var(--spacing-sm) var(--spacing-lg);
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-sm);
          white-space: nowrap;
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        /* Mobile optimization - ABSOLUTE CENTERING */
        @media (max-width: 768px) {
          .sticky-cta-bar {
            padding: 16px 20px !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
            gap: 12px !important;
            max-height: none !important;
            overflow: visible !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            margin: 0 !important;
          }
          
          .sticky-cta-content {
            width: 100% !important;
            min-width: 100% !important;
            max-width: 100% !important;
            flex: none !important;
            margin: 0 auto !important;
            padding: 0 !important;
            text-align: center !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
          }
          
          .sticky-cta-title {
            font-size: 16px !important;
            margin-bottom: 4px !important;
            text-align: center !important;
            width: 100% !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
            padding: 0 !important;
          }
          
          .sticky-cta-subtitle {
            font-size: 13px !important;
            text-align: center !important;
            width: 100% !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
            padding: 0 !important;
          }
          
          .sticky-cta-actions {
            width: 100% !important;
            max-width: 100% !important;
            justify-content: center !important;
            gap: 12px !important;
            flex-direction: column !important;
            align-items: center !important;
            margin: 0 auto !important;
            padding: 0 !important;
          }
          
          .sticky-cta-button {
            width: 100% !important;
            max-width: 320px !important;
            font-size: 15px !important;
            padding: 12px 24px !important;
            justify-content: center !important;
            text-align: center !important;
            box-sizing: border-box !important;
            margin: 0 auto !important;
            display: flex !important;
            align-items: center !important;
          }
        }

        /* Extra small mobile devices */
        @media (max-width: 480px) {
          .sticky-cta-bar {
            padding: 14px 16px !important;
          }
          
          .sticky-cta-title {
            font-size: 15px !important;
          }
          
          .sticky-cta-subtitle {
            font-size: 12px !important;
          }
          
          .sticky-cta-button {
            font-size: 14px !important;
            padding: 11px 20px !important;
            max-width: 280px !important;
          }
        }
      `}</style>
      
      <div className="sticky-cta-bar">
        <div className="sticky-cta-content">
          <div className="sticky-cta-title">
            Ready to improve your AI visibility?
          </div>
          <div className="sticky-cta-subtitle">
            Get your free Visibility Confidence Score™ in 60 seconds
          </div>
        </div>

        <div className="sticky-cta-actions">
          <Link
            to="/free-score"
            className="button btn-hover sticky-cta-button"
          >
            See if AI would recommend you
            <Icon name="arrow-right" size={18} />
          </Link>
        </div>
      </div>
    </>
  );
}
