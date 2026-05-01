import { useState, useEffect } from 'react';
import { Shield, Cookie, X, ChevronRight } from 'lucide-react';
import './CookieConsent.css';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('whoza_cookie_consent');
    if (!consent) {
      setTimeout(() => setShowBanner(true), 1200);
    } else {
      const savedPrefs = JSON.parse(consent);
      setPreferences(savedPrefs);
      loadAnalytics(savedPrefs.analytics);
    }
  }, []);

  const loadAnalytics = (enabled) => {
    if (enabled && !window.clarity) {
      const script = document.createElement('script');
      script.innerHTML = `
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "uyaruwh0gq");
      `;
      document.head.appendChild(script);
    }
  };

  const handleAcceptAll = () => {
    const newPrefs = { essential: true, analytics: true };
    savePreferences(newPrefs);
    loadAnalytics(true);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const newPrefs = { essential: true, analytics: false };
    savePreferences(newPrefs);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
    loadAnalytics(preferences.analytics);
    setShowPreferences(false);
    setShowBanner(false);
  };

  const savePreferences = (prefs) => {
    localStorage.setItem('whoza_cookie_consent', JSON.stringify(prefs));
    localStorage.setItem('whoza_cookie_consent_date', new Date().toISOString());
  };

  if (!showBanner && !showPreferences) return null;

  return (
    <>
      {showBanner && !showPreferences && (
        <div className="cc-banner" role="dialog" aria-label="Cookie consent">
          <div className="cc-glass">
            <div className="cc-inner">
              <div className="cc-icon">
                <Cookie size={20} strokeWidth={2} />
              </div>
              <div className="cc-body">
                <p className="cc-text">
                  We use cookies to improve your experience and analyse traffic. 
                  <a href="/cookie-policy" className="cc-link">Cookie Policy</a>
                </p>
              </div>
              <div className="cc-actions">
                <button 
                  onClick={handleAcceptAll}
                  className="cc-btn cc-btn-primary"
                  aria-label="Accept all cookies"
                >
                  Accept All
                </button>
                <button 
                  onClick={() => setShowPreferences(true)}
                  className="cc-btn cc-btn-ghost"
                  aria-label="Manage cookie preferences"
                >
                  Manage
                </button>
                <button 
                  onClick={handleRejectAll}
                  className="cc-btn cc-btn-icon"
                  aria-label="Reject non-essential cookies"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPreferences && (
        <div className="cc-modal-backdrop" role="dialog" aria-label="Cookie preferences">
          <div className="cc-modal">
            <div className="cc-modal-header">
              <div className="cc-modal-title">
                <Shield size={20} strokeWidth={2} />
                <h2>Privacy Preferences</h2>
              </div>
              <button 
                onClick={() => setShowPreferences(false)}
                className="cc-modal-close"
                aria-label="Close preferences"
              >
                <X size={18} />
              </button>
            </div>

            <div className="cc-modal-body">
              <div className="cc-category">
                <div className="cc-category-row">
                  <div>
                    <h3>Essential</h3>
                    <p>Required for the site to function</p>
                  </div>
                  <span className="cc-badge">Always On</span>
                </div>
              </div>

              <div className="cc-category">
                <div className="cc-category-row">
                  <div>
                    <h3>Analytics</h3>
                    <p>Helps us improve by measuring how visitors use the site</p>
                  </div>
                  <label className="cc-toggle">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({
                        ...preferences,
                        analytics: e.target.checked
                      })}
                      aria-label="Enable analytics cookies"
                    />
                    <span className="cc-toggle-slider" />
                  </label>
                </div>
              </div>
            </div>

            <div className="cc-modal-footer">
              <button 
                onClick={handleRejectAll}
                className="cc-btn cc-btn-ghost"
              >
                Reject All
              </button>
              <button 
                onClick={handleAcceptAll}
                className="cc-btn cc-btn-primary"
              >
                Accept All
              </button>
              <button 
                onClick={handleSavePreferences}
                className="cc-btn cc-btn-primary"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
