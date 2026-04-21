import { useState, useEffect } from 'react';
import './CookieConsent.css';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always true, cannot be disabled
    analytics: false
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('whoza_cookie_consent');
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      // Load existing preferences
      const savedPrefs = JSON.parse(consent);
      setPreferences(savedPrefs);
      loadAnalytics(savedPrefs.analytics);
    }
  }, []);

  const loadAnalytics = (enabled) => {
    if (enabled && !window.clarity) {
      // Load Microsoft Clarity
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

  const handleManagePreferences = () => {
    setShowPreferences(true);
  };

  if (!showBanner && !showPreferences) return null;

  return (
    <>
      {showBanner && !showPreferences && (
        <div className="cookie-consent-banner" role="dialog" aria-label="Cookie consent">
          <div className="cookie-consent-content">
            <div className="cookie-consent-text">
              <h3>We value your privacy</h3>
              <p>
                We use cookies to enhance your browsing experience and analyze site traffic. 
                Essential cookies are required for the site to function. Analytics cookies help us 
                improve our service. You can choose which cookies to accept.
              </p>
              <a href="/cookie-policy" className="cookie-policy-link">
                Read our Cookie Policy
              </a>
            </div>
            <div className="cookie-consent-actions">
              <button 
                onClick={handleAcceptAll}
                className="cookie-btn cookie-btn-accept"
                aria-label="Accept all cookies"
              >
                Accept All
              </button>
              <button 
                onClick={handleRejectAll}
                className="cookie-btn cookie-btn-reject"
                aria-label="Reject non-essential cookies"
              >
                Reject All
              </button>
              <button 
                onClick={handleManagePreferences}
                className="cookie-btn cookie-btn-manage"
                aria-label="Manage cookie preferences"
              >
                Manage Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {showPreferences && (
        <div className="cookie-preferences-modal" role="dialog" aria-label="Cookie preferences">
          <div className="cookie-preferences-content">
            <div className="cookie-preferences-header">
              <h2>Cookie Preferences</h2>
              <button 
                onClick={() => setShowPreferences(false)}
                className="cookie-close-btn"
                aria-label="Close preferences"
              >
                ✕
              </button>
            </div>
            <div className="cookie-preferences-body">
              <div className="cookie-category">
                <div className="cookie-category-header">
                  <h3>Essential Cookies</h3>
                  <span className="cookie-required">Always Active</span>
                </div>
                <p>
                  These cookies are necessary for the website to function and cannot be disabled. 
                  They are usually only set in response to actions made by you, such as logging in 
                  or filling in forms.
                </p>
              </div>

              <div className="cookie-category">
                <div className="cookie-category-header">
                  <h3>Analytics Cookies</h3>
                  <label className="cookie-toggle">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({
                        ...preferences,
                        analytics: e.target.checked
                      })}
                      aria-label="Enable analytics cookies"
                    />
                    <span className="cookie-toggle-slider"></span>
                  </label>
                </div>
                <p>
                  These cookies help us understand how visitors interact with our website by 
                  collecting and reporting information anonymously. We use Microsoft Clarity to 
                  improve user experience.
                </p>
              </div>
            </div>
            <div className="cookie-preferences-footer">
              <button 
                onClick={handleSavePreferences}
                className="cookie-btn cookie-btn-save"
                aria-label="Save cookie preferences"
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
