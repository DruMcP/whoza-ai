import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Clock } from 'lucide-react';

const WHATSAPP_NUMBER = '447831643012';

const QUICK_REPLIES = [
  {
    icon: '💬',
    label: 'Questions about pricing?',
    message: "Hi whoza.ai team, I'd like to know more about your pricing plans. Can you help?",
  },
  {
    icon: '🔧',
    label: 'Need help with setup?',
    message: "Hi whoza.ai team, I need some help getting set up with your AI receptionist. Can you assist?",
  },
  {
    icon: '📞',
    label: 'Talk to a human',
    message: "Hi whoza.ai team, I'd like to speak with someone from your team. Is that possible?",
  },
];

function getWhatsAppUrl(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export default function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNewBadge, setShowNewBadge] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowNewBadge(true), 500);
    const fadeTimer = setTimeout(() => setShowNewBadge(false), 3500);
    return () => {
      clearTimeout(timer);
      clearTimeout(fadeTimer);
    };
  }, []);

  return (
    <div className="floating-chat-widget">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            className="chat-panel"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            {/* Header */}
            <div className="chat-panel-header">
              <span className="chat-panel-title">Chat with whoza.ai</span>
              <button
                className="chat-panel-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="chat-panel-body">
              <p className="chat-panel-intro">
                How can we help you today?
              </p>
              <div className="chat-quick-replies">
                {QUICK_REPLIES.map((reply) => (
                  <a
                    key={reply.label}
                    href={getWhatsAppUrl(reply.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chat-quick-reply-pill"
                  >
                    <span className="chat-quick-reply-icon">{reply.icon}</span>
                    <span className="chat-quick-reply-label">{reply.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="chat-panel-footer">
              <Clock size={14} />
              <span>We typically reply within 5 minutes</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        className="chat-fab"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={28} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* New badge */}
        <AnimatePresence>
          {showNewBadge && !isOpen && (
            <motion.span
              className="chat-fab-badge"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              New
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <style jsx>{`
        .floating-chat-widget {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 16px;
          font-family: var(--font-body, 'Inter', system-ui, sans-serif);
        }

        .chat-fab {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: none;
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
          position: relative;
          flex-shrink: 0;
        }

        .chat-fab:hover {
          box-shadow: 0 6px 24px rgba(37, 211, 102, 0.5);
        }

        .chat-fab-badge {
          position: absolute;
          top: -6px;
          right: -6px;
          background: #EF4444;
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 9999px;
          border: 2px solid #fff;
          box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
          animation: badge-pulse 1.5s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes badge-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .chat-panel {
          width: 360px;
          max-width: calc(100vw - 48px);
          max-height: 500px;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 12px 32px rgba(15, 23, 42, 0.12);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .chat-panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          background: #0F172A;
          color: #fff;
          flex-shrink: 0;
        }

        .chat-panel-title {
          font-size: 15px;
          font-weight: 600;
        }

        .chat-panel-close {
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
          padding: 4px;
          opacity: 0.7;
          transition: opacity 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chat-panel-close:hover {
          opacity: 1;
        }

        .chat-panel-body {
          padding: 20px;
          flex: 1;
          overflow-y: auto;
          background: #F8FAFC;
        }

        .chat-panel-intro {
          margin: 0 0 16px;
          font-size: 14px;
          color: #64748B;
        }

        .chat-quick-replies {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .chat-quick-reply-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 16px;
          background: #fff;
          border: 1.5px solid #E2E8F0;
          border-radius: 12px;
          text-decoration: none;
          color: #0F172A;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .chat-quick-reply-pill:hover {
          border-color: #25D366;
          background: #F0FDF4;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.12);
        }

        .chat-quick-reply-icon {
          font-size: 18px;
          flex-shrink: 0;
        }

        .chat-quick-reply-label {
          line-height: 1.3;
        }

        .chat-panel-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 12px 20px;
          background: #fff;
          border-top: 1px solid #E2E8F0;
          font-size: 12px;
          color: #64748B;
          flex-shrink: 0;
        }

        /* Mobile: full-width bottom sheet */
        @media (max-width: 480px) {
          .floating-chat-widget {
            bottom: 16px;
            right: 16px;
          }

          .chat-panel {
            width: 100vw;
            max-width: calc(100vw - 32px);
            max-height: 70vh;
            border-radius: 16px 16px 16px 16px;
          }
        }

        /* Very small screens */
        @media (max-width: 360px) {
          .chat-panel {
            max-width: calc(100vw - 24px);
          }

          .chat-quick-reply-pill {
            padding: 12px 14px;
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}
