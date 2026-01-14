/**
 * Encryption Utilities
 * Note: This is client-side helper code.
 * ACTUAL ENCRYPTION happens server-side in Edge Functions.
 * These are placeholder functions for reference.
 */

/**
 * Generate a random encryption key ID (for tracking)
 * In production, this would be managed server-side
 * @returns {string} UUID v4
 */
export function generateKeyId() {
  return crypto.randomUUID();
}

/**
 * Check if a token is expired or expiring soon
 * @param {string|Date} expiryDate - Token expiry date
 * @param {number} warningDays - Days before expiry to warn (default: 7)
 * @returns {Object} Status object
 */
export function checkTokenExpiry(expiryDate, warningDays = 7) {
  if (!expiryDate) {
    return { expired: false, expiring: false, daysUntilExpiry: null };
  }

  const expiry = new Date(expiryDate);
  const now = new Date();
  const daysUntilExpiry = Math.floor((expiry - now) / (1000 * 60 * 60 * 24));

  return {
    expired: expiry < now,
    expiring: daysUntilExpiry > 0 && daysUntilExpiry <= warningDays,
    daysUntilExpiry: daysUntilExpiry
  };
}

/**
 * Validate webhook signature (reference implementation)
 * Actual validation happens server-side
 * @param {string} payload - Webhook payload
 * @param {string} signature - Webhook signature
 * @param {string} secret - Webhook secret
 * @returns {boolean} True if valid
 */
export function validateWebhookSignature(payload, signature, secret) {
  // This is a placeholder - actual validation is server-side
  // Different providers use different signing methods
    return false;
}

/**
 * Mask sensitive data for display
 * @param {string} value - Value to mask
 * @param {number} visibleChars - Number of characters to show (default: 4)
 * @returns {string} Masked value
 */
export function maskSensitiveData(value, visibleChars = 4) {
  if (!value || value.length <= visibleChars) {
    return value;
  }

  const masked = '*'.repeat(value.length - visibleChars);
  return masked + value.slice(-visibleChars);
}

/**
 * Format API key for display (shows only first and last 4 chars)
 * @param {string} apiKey - API key
 * @returns {string} Formatted API key
 */
export function formatApiKey(apiKey) {
  if (!apiKey || apiKey.length < 12) {
    return apiKey;
  }

  const first = apiKey.slice(0, 4);
  const last = apiKey.slice(-4);
  const masked = '*'.repeat(8);

  return `${first}${masked}${last}`;
}

/**
 * Sanitize external data before storing
 * @param {any} data - Data to sanitize
 * @returns {any} Sanitized data
 */
export function sanitizeExternalData(data) {
  if (typeof data !== 'object' || data === null) {
    return data;
  }

  // Remove potentially dangerous fields
  const dangerous = ['__proto__', 'constructor', 'prototype'];
  const sanitized = {};

  for (const [key, value] of Object.entries(data)) {
    if (dangerous.includes(key)) {
      continue;
    }

    if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeExternalData(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

/**
 * Generate a secure random string for state parameters
 * @param {number} length - Length of string (default: 32)
 * @returns {string} Random string
 */
export function generateSecureRandomString(length = 32) {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Create HMAC for request signing (reference)
 * Actual signing happens server-side
 * @param {string} data - Data to sign
 * @param {string} secret - Secret key
 * @returns {Promise<string>} HMAC signature
 */
export async function createHMAC(data, secret) {
  // This is a placeholder for reference
  // Actual HMAC creation should be server-side
    return '';
}

export default {
  generateKeyId,
  checkTokenExpiry,
  validateWebhookSignature,
  maskSensitiveData,
  formatApiKey,
  sanitizeExternalData,
  generateSecureRandomString,
  createHMAC
};
