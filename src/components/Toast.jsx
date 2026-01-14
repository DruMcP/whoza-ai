import { useState, useEffect, createContext, useContext, useRef } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef({});

  const addToast = (message, type = 'info', duration = 5000) => {
    const id = Date.now() + Math.random();
    const toast = { id, message, type, duration };

    setToasts(prev => [...prev, toast]);

    if (duration > 0) {
      timersRef.current[id] = setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  };

  const removeToast = (id) => {
    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id]);
      delete timersRef.current[id];
    }
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  useEffect(() => {
    return () => {
      Object.values(timersRef.current).forEach(timer => clearTimeout(timer));
    };
  }, []);

  const toast = {
    success: (message, duration) => addToast(message, 'success', duration),
    error: (message, duration) => addToast(message, 'error', duration),
    warning: (message, duration) => addToast(message, 'warning', duration),
    info: (message, duration) => addToast(message, 'info', duration),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

function ToastContainer({ toasts, onRemove }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '420px',
      }}
      role="region"
      aria-label="Notifications"
      aria-live="polite"
    >
      {toasts.map(toast => (
        <ToastMessage
          key={toast.id}
          toast={toast}
          onRemove={() => onRemove(toast.id)}
        />
      ))}
    </div>
  );
}

function ToastMessage({ toast, onRemove }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    return () => setIsExiting(true);
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onRemove, 300);
  };

  const colors = {
    success: {
      bg: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
      border: '#22c55e',
      text: '#166534',
      icon: '✓'
    },
    error: {
      bg: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
      border: '#ef4444',
      text: '#991b1b',
      icon: '✗'
    },
    warning: {
      bg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
      border: '#f59e0b',
      text: '#92400e',
      icon: '⚠'
    },
    info: {
      bg: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
      border: '#3b82f6',
      text: '#1e40af',
      icon: 'ℹ'
    }
  };

  const style = colors[toast.type] || colors.info;

  return (
    <div
      style={{
        background: style.bg,
        border: `2px solid ${style.border}`,
        borderRadius: '12px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        animation: isExiting ? 'slideOut 0.3s ease-out' : 'slideIn 0.3s ease-out',
        maxWidth: '100%',
      }}
      role="alert"
      aria-atomic="true"
    >
      <div
        style={{
          fontSize: '20px',
          lineHeight: 1,
          flexShrink: 0,
        }}
        aria-hidden="true"
      >
        {style.icon}
      </div>
      <div
        style={{
          flex: 1,
          color: style.text,
          fontSize: '15px',
          fontWeight: 500,
          lineHeight: '1.5',
        }}
      >
        {toast.message}
      </div>
      <button
        onClick={handleClose}
        style={{
          background: 'none',
          border: 'none',
          color: style.text,
          fontSize: '20px',
          lineHeight: 1,
          cursor: 'pointer',
          padding: 0,
          flexShrink: 0,
          opacity: 0.6,
          transition: 'opacity 0.2s',
        }}
        onMouseOver={(e) => e.target.style.opacity = '1'}
        onMouseOut={(e) => e.target.style.opacity = '0.6'}
        aria-label="Close notification"
      >
        ×
      </button>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
