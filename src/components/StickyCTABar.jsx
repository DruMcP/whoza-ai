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
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(10px)',
        borderTop: '2px solid var(--color-primary-600)',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.3)',
        padding: 'var(--spacing-md) var(--spacing-lg)',
        zIndex: 999,
        animation: 'slideUp 0.3s ease-out',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--spacing-md)',
        flexWrap: 'wrap'
      }}
    >
      <div style={{
        flex: '1',
        minWidth: '200px',
        color: 'white'
      }}>
        <div style={{
          fontSize: '18px',
          fontWeight: 600,
          marginBottom: '4px'
        }}>
          Ready to improve your AI visibility?
        </div>
        <div style={{
          fontSize: '14px',
          color: '#F3F4F6'
        }}>
          Get your free Visibility Confidence Score™ in 60 seconds
        </div>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-md)',
        flexWrap: 'wrap'
      }}>
        <div style={{
          fontSize: '14px',
          color: '#84CC16',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <Icon name="check-circle" size={18} />
          From £19/month
        </div>

        <Link
          to="/free-score"
          className="button btn-hover"
          style={{
            fontSize: '16px',
            padding: 'var(--spacing-sm) var(--spacing-lg)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--spacing-sm)',
            whiteSpace: 'nowrap'
          }}
        >
          See if AI would recommend you
          <Icon name="arrow-right" size={18} />
        </Link>
      </div>

      <style>{`
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

        @media (max-width: 768px) {
          div[style*="position: fixed"] {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
