import { useState, useEffect } from 'react';

export default function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedHighContrast = localStorage.getItem('highContrast') === 'true';
    const savedReduceMotion = localStorage.getItem('reduceMotion') === 'true';

    setDarkMode(savedDarkMode);
    setHighContrast(savedHighContrast);
    setReduceMotion(savedReduceMotion);

    applyTheme(savedDarkMode, savedHighContrast, savedReduceMotion);
  }, []);

  const applyTheme = (dark, contrast, motion) => {
    const root = document.documentElement;

    if (dark) {
      root.classList.add('dark-mode');
    } else {
      root.classList.remove('dark-mode');
    }

    if (contrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    if (motion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
  };

  const toggleDarkMode = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    localStorage.setItem('darkMode', newValue);
    applyTheme(newValue, highContrast, reduceMotion);
  };

  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    localStorage.setItem('highContrast', newValue);
    applyTheme(darkMode, newValue, reduceMotion);
  };

  const toggleReduceMotion = () => {
    const newValue = !reduceMotion;
    setReduceMotion(newValue);
    localStorage.setItem('reduceMotion', newValue);
    applyTheme(darkMode, highContrast, newValue);
  };

  return (
    <>
      <button
        className="accessibility-menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Accessibility options"
        aria-expanded={isOpen}
        title="Accessibility"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="3" />
          <line x1="12" y1="2" x2="12" y2="4" />
          <line x1="12" y1="20" x2="12" y2="22" />
          <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
          <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
          <line x1="2" y1="12" x2="4" y2="12" />
          <line x1="20" y1="12" x2="22" y2="12" />
          <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
          <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="accessibility-menu-overlay"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="accessibility-menu-panel" role="dialog" aria-label="Accessibility settings">
            <div className="accessibility-menu-header">
              <h2>Accessibility</h2>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close accessibility menu"
                className="close-button"
                title="Close"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                <span className="close-button-label">Close</span>
              </button>
            </div>

            <div className="accessibility-menu-content">
              <div className="accessibility-option">
                <div className="option-info">
                  <svg className="option-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                  <div>
                    <h3>Dark Mode</h3>
                    <p>Reduce eye strain with a dark color scheme</p>
                  </div>
                </div>
                <button
                  role="switch"
                  aria-checked={darkMode}
                  aria-label="Toggle dark mode"
                  className={`toggle-switch ${darkMode ? 'active' : ''}`}
                  onClick={toggleDarkMode}
                >
                  <span className="toggle-slider" aria-hidden="true"></span>
                </button>
              </div>

              <div className="accessibility-option">
                <div className="option-info">
                  <svg className="option-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <div>
                    <h3>High Contrast</h3>
                    <p>Increase text and element contrast</p>
                  </div>
                </div>
                <button
                  role="switch"
                  aria-checked={highContrast}
                  aria-label="Toggle high contrast mode"
                  className={`toggle-switch ${highContrast ? 'active' : ''}`}
                  onClick={toggleHighContrast}
                >
                  <span className="toggle-slider" aria-hidden="true"></span>
                </button>
              </div>

              <div className="accessibility-option">
                <div className="option-info">
                  <svg className="option-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 20V10" />
                    <path d="M12 20V4" />
                    <path d="M6 20v-6" />
                  </svg>
                  <div>
                    <h3>Reduce Motion</h3>
                    <p>Minimize animations and transitions</p>
                  </div>
                </div>
                <button
                  role="switch"
                  aria-checked={reduceMotion}
                  aria-label="Toggle reduced motion"
                  className={`toggle-switch ${reduceMotion ? 'active' : ''}`}
                  onClick={toggleReduceMotion}
                >
                  <span className="toggle-slider" aria-hidden="true"></span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
