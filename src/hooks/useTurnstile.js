import { useState, useEffect } from 'react';

/**
 * Custom hook for Cloudflare Turnstile integration
 * @returns {{turnstileToken: string, turnstileLoaded: boolean, turnstileError: boolean, resetTurnstile: Function}}
 */
export function useTurnstile() {
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileLoaded, setTurnstileLoaded] = useState(false);
  const [turnstileError, setTurnstileError] = useState(false);

  useEffect(() => {
    let timeoutId = null;
    let isScriptLoaded = false;

    // Load Turnstile script
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;

    script.onload = () => {
            isScriptLoaded = true;
      setTurnstileLoaded(true);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };

    script.onerror = () => {
      // TODO: Review error handling: console.error('[TURNSTILE] ❌ Failed to load script')
      setTurnstileError(true);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };

    document.head.appendChild(script);

    // Fallback timeout - only set error if script hasn't loaded
    timeoutId = setTimeout(() => {
      if (!isScriptLoaded) {
                setTurnstileError(true);
      }
    }, 10000);

    // Set up global callback
    window.onTurnstileSuccess = (token) => {
            setTurnstileToken(token);
    };

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      delete window.onTurnstileSuccess;
    };
  }, []);

  /**
   * Resets Turnstile widget
   */
  const resetTurnstile = () => {
    if (window.turnstile) {
      window.turnstile.reset();
    }
    setTurnstileToken('');
  };

  return {
    turnstileToken,
    turnstileLoaded,
    turnstileError,
    resetTurnstile
  };
}
