import { logger } from './logger';
import { supabaseUrl } from '../lib/supabase';

class RateLimiter {
  constructor() {
    this.requests = new Map();
    this.cleanupInterval = setInterval(() => this.cleanup(), 60000);
  }

  isRateLimited(key, maxRequests = 10, windowMs = 60000) {
    const now = Date.now();
    const requests = this.requests.get(key) || [];

    const recentRequests = requests.filter(time => now - time < windowMs);

    if (recentRequests.length >= maxRequests) {
      logger.warn('Rate limit exceeded', { key, attempts: recentRequests.length });
      return true;
    }

    recentRequests.push(now);
    this.requests.set(key, recentRequests);
    return false;
  }

  cleanup() {
    const now = Date.now();
    const windowMs = 300000;

    for (const [key, times] of this.requests.entries()) {
      const recentTimes = times.filter(time => now - time < windowMs);
      if (recentTimes.length === 0) {
        this.requests.delete(key);
      } else {
        this.requests.set(key, recentTimes);
      }
    }
  }

  reset(key) {
    this.requests.delete(key);
  }

  destroy() {
    clearInterval(this.cleanupInterval);
    this.requests.clear();
  }
}

export const rateLimiter = new RateLimiter();

export const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
};

export const checkRateLimit = (identifier, maxRequests = 10, windowMs = 60000) => {
  const key = `rl_${identifier}`;
  return rateLimiter.isRateLimited(key, maxRequests, windowMs);
};

export const generateCSRFToken = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

export const storeCSRFToken = (token) => {
  sessionStorage.setItem('csrf_token', token);
  return token;
};

export const getCSRFToken = () => {
  let token = sessionStorage.getItem('csrf_token');
  if (!token) {
    token = generateCSRFToken();
    storeCSRFToken(token);
  }
  return token;
};

export const validateCSRFToken = (token) => {
  const storedToken = getCSRFToken();
  return token === storedToken;
};

export const sanitizeHTML = (html) => {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
};

export const escapeHTML = (unsafe) => {
  if (typeof unsafe !== 'string') return unsafe;

  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

export const isSecureContext = () => {
  return window.isSecureContext;
};

export const checkPasswordCompromised = async (password) => {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    const prefix = hashHex.substring(0, 5).toUpperCase();
    const suffix = hashHex.substring(5).toUpperCase();

    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    const text = await response.text();

    const hashes = text.split('\n');
    const found = hashes.some(line => line.startsWith(suffix));

    return found;
  } catch (error) {
    logger.error('Error checking password', { error });
    return false;
  }
};

export const secureSessionStorage = {
  set: (key, value) => {
    try {
      const encrypted = btoa(JSON.stringify(value));
      sessionStorage.setItem(key, encrypted);
    } catch (error) {
      logger.error('Error storing session data', { error, key });
    }
  },

  get: (key) => {
    try {
      const encrypted = sessionStorage.getItem(key);
      if (!encrypted) return null;
      return JSON.parse(atob(encrypted));
    } catch (error) {
      logger.error('Error retrieving session data', { error, key });
      return null;
    }
  },

  remove: (key) => {
    sessionStorage.removeItem(key);
  },

  clear: () => {
    sessionStorage.clear();
  }
};

export const validateOrigin = (origin) => {
  const allowedOrigins = [
    window.location.origin,
    supabaseUrl
  ];

  return allowedOrigins.includes(origin);
};

export const preventClickjacking = () => {
  if (window.top !== window.self) {
    logger.warn('Potential clickjacking attempt detected');
    window.top.location = window.self.location;
  }
};

if (typeof window !== 'undefined') {
  preventClickjacking();
}

export default {
  rateLimiter,
  checkRateLimit,
  generateCSRFToken,
  getCSRFToken,
  validateCSRFToken,
  sanitizeHTML,
  escapeHTML,
  isSecureContext,
  checkPasswordCompromised,
  secureSessionStorage,
  validateOrigin,
  preventClickjacking
};
