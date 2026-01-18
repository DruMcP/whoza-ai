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
   * Resets Turnstile widget safely
   * Handles cases where widget may not exist or has been removed
   */
  const resetTurnstile = () => {
    // Clear the token state first
    setTurnstileToken('');
    
    // Only attempt reset if turnstile is available
    if (window.turnstile) {
      try {
        // Find the turnstile container element
        const container = document.querySelector('.cf-turnstile');
        if (container) {
          window.turnstile.reset(container);
        }
      } catch (e) {
        // Widget may have been removed or not initialized - this is expected
        // in some scenarios (e.g., component unmounted, widget never rendered)
        console.debug('[Turnstile] Reset skipped - widget not found or already removed');
      }
    }
  };

  return {
    turnstileToken,
    turnstileLoaded,
    turnstileError,
    resetTurnstile
  };
}
