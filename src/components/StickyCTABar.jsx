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
          -webkit-backdrop-filter: blur(10px);
          border-top: 2px solid var(--color-primary-600);
          box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
          padding: var(--spacing-md) var(--spacing-lg);
          z-index: 999;
          animation: stickyCTASlideUp 0.3s ease-out;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--spacing-md);
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
          color: white;
        }

        .sticky-cta-subtitle {
          font-size: 14px;
          color: #F3F4F6;
        }

        .sticky-cta-actions {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          flex-shrink: 0;
        }

        .sticky-cta-button {
          font-size: 16px;
          padding: var(--spacing-sm) var(--spacing-lg);
          display: inline-flex !important;
          align-items: center;
          gap: var(--spacing-sm);
          white-space: nowrap;
          width: auto !important;
        }

        @keyframes stickyCTASlideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        /* Cover all phones and tablets up to 1024px wide */
        @media (max-width: 1024px) {
          .sticky-cta-bar {
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
            padding: 16px 20px !important;
            gap: 12px !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            box-sizing: border-box !important;
          }

          .sticky-cta-content {
            flex: none !important;
            width: 100% !important;
            min-width: 0 !important;
            max-width: 100% !important;
            text-align: center !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          .sticky-cta-title {
            font-size: 16px !important;
            text-align: center !important;
            width: 100% !important;
            margin: 0 0 4px 0 !important;
            padding: 0 !important;
          }

          .sticky-cta-subtitle {
            font-size: 13px !important;
            text-align: center !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          .sticky-cta-actions {
            flex-shrink: unset !important;
            width: 100% !important;
            justify-content: center !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          .sticky-cta-button {
            width: auto !important;
            max-width: 360px !important;
            font-size: 15px !important;
            padding: 12px 24px !important;
            justify-content: center !important;
            text-align: center !important;
            box-sizing: border-box !important;
            margin: 0 auto !important;
            display: inline-flex !important;
          }
        }

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
            See who's stealing your customers from AI search
          </div>
          <div className="sticky-cta-subtitle">
            Free competitor analysis — takes 60 seconds, no email required
          </div>
        </div>

        <div className="sticky-cta-actions">
          <Link
            to="/competitor-analysis"
            className="button btn-hover sticky-cta-button"
          >
            Check my competitor now
            <Icon name="arrow-right" size={18} />
          </Link>
        </div>
      </div>
    </>
  );
}
