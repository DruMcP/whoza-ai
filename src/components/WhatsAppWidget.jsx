import { useState, useEffect } from 'react';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);

  useEffect(() => {
    // Show notification dot for first 10 seconds
    const timer = setTimeout(() => setHasNotification(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  const phoneNumber = '447451234567'; // TODO: Update with real support number
  const message = encodeURIComponent(
    "Hi whoza.ai team, I'm interested in learning more about your AI receptionist. Can you help?"
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="whatsapp-widget">
      {/* Chat popup */}
      {isOpen && (
        <div className="whatsapp-popup">
          <div className="whatsapp-popup-header">
            <div className="whatsapp-popup-avatar">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 2.17.7 4.19 1.89 5.83L2 22l4.31-1.14A9.93 9.93 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.85 0-3.55-.53-5.02-1.44l-.36-.22-2.55.68.68-2.49-.23-.37A7.96 7.96 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm4.24-5.76c-.23-.12-1.36-.67-1.57-.75-.21-.08-.36-.12-.51.12-.15.23-.58.75-.71.9-.13.15-.26.17-.49.06-.23-.12-.97-.36-1.85-1.14-.68-.61-1.14-1.36-1.27-1.59-.13-.23-.01-.36.1-.47.1-.1.23-.26.34-.39.11-.13.15-.23.23-.38.08-.15.04-.29-.02-.4-.06-.12-.51-1.23-.7-1.68-.18-.44-.37-.38-.51-.39-.13 0-.29-.01-.45-.01-.15 0-.4.06-.61.29-.21.23-.8.78-.8 1.91 0 1.12.82 2.21.93 2.36.12.15 1.61 2.46 3.9 3.45.55.24.97.38 1.3.49.55.17 1.05.15 1.45.09.44-.06 1.36-.56 1.55-1.09.19-.54.19-1 .13-1.09-.06-.1-.23-.15-.46-.26z"/>
              </svg>
            </div>
            <div className="whatsapp-popup-info">
              <strong>whoza.ai Support</strong>
              <span>Typically replies in minutes</span>
            </div>
            <button
              className="whatsapp-popup-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div className="whatsapp-popup-body">
            <div className="whatsapp-message received">
              <p>Hi there! 👋</p>
              <p>Got questions about our AI receptionist or visibility platform? I can help you get started or answer anything.</p>
              <span className="whatsapp-timestamp">Just now</span>
            </div>
          </div>
          <div className="whatsapp-popup-footer">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-start-chat"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 2.17.7 4.19 1.89 5.83L2 22l4.31-1.14A9.93 9.93 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.85 0-3.55-.53-5.02-1.44l-.36-.22-2.55.68.68-2.49-.23-.37A7.96 7.96 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm4.24-5.76c-.23-.12-1.36-.67-1.57-.75-.21-.08-.36-.12-.51.12-.15.23-.58.75-.71.9-.13.15-.26.17-.49.06-.23-.12-.97-.36-1.85-1.14-.68-.61-1.14-1.36-1.27-1.59-.13-.23-.01-.36.1-.47.1-.1.23-.26.34-.39.11-.13.15-.23.23-.38.08-.15.04-.29-.02-.4-.06-.12-.51-1.23-.7-1.68-.18-.44-.37-.38-.51-.39-.13 0-.29-.01-.45-.01-.15 0-.4.06-.61.29-.21.23-.8.78-.8 1.91 0 1.12.82 2.21.93 2.36.12.15 1.61 2.46 3.9 3.45.55.24.97.38 1.3.49.55.17 1.05.15 1.45.09.44-.06 1.36-.56 1.55-1.09.19-.54.19-1 .13-1.09-.06-.1-.23-.15-.46-.26z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        className="whatsapp-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open WhatsApp chat"
      >
        {isOpen ? (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 2.17.7 4.19 1.89 5.83L2 22l4.31-1.14A9.93 9.93 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.85 0-3.55-.53-5.02-1.44l-.36-.22-2.55.68.68-2.49-.23-.37A7.96 7.96 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm4.24-5.76c-.23-.12-1.36-.67-1.57-.75-.21-.08-.36-.12-.51.12-.15.23-.58.75-.71.9-.13.15-.26.17-.49.06-.23-.12-.97-.36-1.85-1.14-.68-.61-1.14-1.36-1.27-1.59-.13-.23-.01-.36.1-.47.1-.1.23-.26.34-.39.11-.13.15-.23.23-.38.08-.15.04-.29-.02-.4-.06-.12-.51-1.23-.7-1.68-.18-.44-.37-.38-.51-.39-.13 0-.29-.01-.45-.01-.15 0-.4.06-.61.29-.21.23-.8.78-.8 1.91 0 1.12.82 2.21.93 2.36.12.15 1.61 2.46 3.9 3.45.55.24.97.38 1.3.49.55.17 1.05.15 1.45.09.44-.06 1.36-.56 1.55-1.09.19-.54.19-1 .13-1.09-.06-.1-.23-.15-.46-.26z"/>
          </svg>
        )}
        {hasNotification && !isOpen && (
          <span className="whatsapp-notification">1</span>
        )}
      </button>
    </div>
  );
}
