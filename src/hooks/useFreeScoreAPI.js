import { useState, useCallback, useRef } from 'react';
import { submitFreeScore } from '../services/freeScoreService';
import { supabaseUrl, supabaseAnonKey } from '../lib/supabase';

/**
 * API error types
 */
const ERROR_TYPES = {
  NETWORK: 'network',
  VALIDATION: 'validation',
  RATE_LIMIT: 'rate_limit',
  SERVER: 'server',
  UNKNOWN: 'unknown'
};

/**
 * Global request tracking to prevent duplicates across component re-renders
 */
let lastRequestTimestamp = 0;
let lastRequestEmail = '';
const REQUEST_DEBOUNCE_MS = 3000; // 3 seconds

/**
 * Determines error type from error object
 * @param {Error} error - Error object
 * @param {number} status - HTTP status code
 * @returns {string} Error type
 */
function getErrorType(error, status) {
  if (status === 429) return ERROR_TYPES.RATE_LIMIT;
  if (error.message?.includes('network') || error.message?.includes('fetch')) {
    return ERROR_TYPES.NETWORK;
  }
  if (error.message?.includes('required') || error.message?.includes('invalid')) {
    return ERROR_TYPES.VALIDATION;
  }
  if (status >= 500) return ERROR_TYPES.SERVER;
  return ERROR_TYPES.UNKNOWN;
}

/**
 * Gets user-friendly error message
 * @param {string} errorType - Error type
 * @param {string} originalMessage - Original error message
 * @returns {string} User-friendly message
 */
function getUserFriendlyMessage(errorType, originalMessage) {
  switch (errorType) {
    case ERROR_TYPES.NETWORK:
      return 'Connection issue. Please check your internet and try again.';
    case ERROR_TYPES.RATE_LIMIT:
      return originalMessage || 'Too many requests. Please wait a moment and try again.';
    case ERROR_TYPES.SERVER:
      return 'We\'re experiencing technical difficulties. Please try again in a moment.';
    case ERROR_TYPES.VALIDATION:
      return originalMessage || 'Please check your information and try again.';
    default:
      return originalMessage || 'We encountered an issue. Please try again, or contact support if the problem persists.';
  }
}

/**
 * Custom hook for Free Score API operations
 * @returns {{submitScore: Function, loading: boolean, error: string, rateLimitInfo: Object}}
 */
export function useFreeScoreAPI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rateLimitInfo, setRateLimitInfo] = useState(null);
  const isProcessingRef = useRef(false);

  /**
   * Verifies submission with abuse protection
   * @param {Object} formData - Form data
   * @param {string} csrfToken - CSRF token
   * @param {string} turnstileToken - Turnstile token or 'fallback'
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  const verifySubmission = useCallback(async (formData, csrfToken, turnstileToken) => {
    const payload = {
      email: formData.email,
      businessName: formData.business_name,
      location: formData.location,
      tradeType: formData.trade_type,
      websiteUrl: formData.website_url,
      csrfToken: csrfToken,
      turnstileToken: turnstileToken || 'fallback',
      honeypot: formData.website_confirm
    };

    const url = `${supabaseUrl}/functions/v1/verify-free-score`;

                            
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    
    const data = await response.json();
    
    if (!response.ok || !data.success) {
      // Handle rate limit
      if (response.status === 429 && data.rateLimited) {
                setRateLimitInfo({
          message: data.error,
          nextAllowedDate: data.nextAllowedDate,
          upgradeMessage: data.upgradeMessage
        });
      }
      // TODO: Review error handling: console.error('[VERIFY SUBMISSION] ❌ Verification failed:', data.error)
      throw new Error(data.error || 'Verification failed');
    }

        return data;
  }, []);

  /**
   * Submits score calculation
   * @param {Object} formData - Form data
   * @param {string} csrfToken - CSRF token
   * @param {string} turnstileToken - Turnstile token
   * @param {Function} onSuccess - Success callback
   * @returns {Promise<void>}
   */
  const submitScore = useCallback(async (formData, csrfToken, turnstileToken, onSuccess) => {
                        
    // CRITICAL: Prevent duplicate API calls with ref check
    if (isProcessingRef.current) {
            return;
    }

    // CRITICAL: Prevent duplicate API calls with timestamp check (across re-renders)
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTimestamp;
    const isSameEmail = lastRequestEmail === formData.email;

    if (isSameEmail && timeSinceLastRequest < REQUEST_DEBOUNCE_MS) {
                  return;
    }

    // Set guards
    isProcessingRef.current = true;
    lastRequestTimestamp = now;
    lastRequestEmail = formData.email;

    setError(null);
    setRateLimitInfo(null);
    setLoading(true);

    try {
      // Step 1: Verify with abuse protection and calculate score
            const verifyData = await verifySubmission(formData, csrfToken, turnstileToken);
      
      // Step 2: Legacy database save (will be deprecated)
            const { data, error: serviceError, warning } = await submitFreeScore(formData);
      
      if (serviceError) {
        const errorType = getErrorType(serviceError, 0);
        const userMessage = getUserFriendlyMessage(errorType, serviceError.message);
        // TODO: Review error handling: console.error('[FREE SCORE API] ❌ Service error:', userMessage)
        throw new Error(userMessage);
      }

      if (!data && !verifyData) {
        // TODO: Review error handling: console.error('[FREE SCORE API] ❌ No data returned')
        throw new Error('Unable to calculate your score right now. Please try again.');
      }

      // Merge data: prioritize ECE V2.1 score from verifyData
      const mergedData = {
        ...data,
        calculated_score: verifyData.score || data?.calculated_score,
        pillar_scores: verifyData.pillarScores || data?.pillar_scores,
        summary_text: verifyData.summaryText || data?.summary_text,
        email_sent: verifyData.email_sent !== undefined ? verifyData.email_sent : data?.email_sent,
        recommendations: verifyData.recommendations || data?.recommendations,
      };

      
      // Store submission timestamp
            localStorage.setItem('lastFreeScoreSubmission', Date.now().toString());

      // Call success callback
            if (onSuccess) {
        onSuccess({ ...mergedData, serviceWarning: warning });
      }
      
    } catch (err) {
      // TODO: Review error handling: console.error('[FREE SCORE API] ❌ Error:', err)
      const userMessage = err.message || getUserFriendlyMessage(ERROR_TYPES.UNKNOWN);
      setError(userMessage);
      throw err;
    } finally {
      setLoading(false);
      isProcessingRef.current = false;
          }
  }, []);

  /**
   * Clears error state
   */
  const clearError = useCallback(() => {
    setError(null);
    setRateLimitInfo(null);
  }, []);

  return {
    submitScore,
    loading,
    error,
    rateLimitInfo,
    clearError
  };
}
