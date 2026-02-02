import { getBrowserFingerprint, detectBotBehavior } from '../utils/browserFingerprint';
import { supabaseUrl as SUPABASE_URL, supabaseAnonKey as SUPABASE_ANON_KEY } from '../lib/supabase';

let fingerprintCache = null;
let botDetectionCache = null;

const getFingerprint = async () => {
  if (!fingerprintCache) {
    fingerprintCache = await getBrowserFingerprint();
    botDetectionCache = detectBotBehavior();
  }
  return { fingerprint: fingerprintCache, botDetection: botDetectionCache };
};

export const fetchProtectedData = async (endpoint, options = {}) => {
  try {
    const { fingerprint, botDetection } = await getFingerprint();

    if (botDetection.isSuspicious && botDetection.score < 40) {
          }

    const url = `${SUPABASE_URL}/functions/v1/${endpoint}`;
    const headers = {
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      'X-Fingerprint': fingerprint.id,
      ...options.headers
    };

    const response = await fetch(url, {
      ...options,
      headers
    });

    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');

    if (!isJson) {
      if (!response.ok) {
        throw new Error(`Service unavailable (${response.status}). The feature may not be deployed yet.`);
      }
      const text = await response.text();
      throw new Error('Invalid response format from server');
    }

    if (response.status === 429) {
      const data = await response.json();
      throw new Error(`Rate limit exceeded. ${data.reason || 'Please try again later.'}`);
    }

    if (response.status === 403) {
      const data = await response.json();
      if (data.challenge === 'captcha') {
        throw new CaptchaRequiredError(data.reason);
      }
      throw new Error(`Access denied: ${data.reason}`);
    }

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || `HTTP error ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    // TODO: Review error handling: console.error(`Error fetching protected data from ${endpoint}:`, error)
    throw error;
  }
};

export const fetchLiveResults = async () => {
  const response = await fetchProtectedData('get-live-results');
  return response.data || [];
};

export const fetchCaseStudies = async () => {
  const response = await fetchProtectedData('get-case-studies');
  return response.data || [];
};

export class CaptchaRequiredError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CaptchaRequiredError';
    this.isCaptchaRequired = true;
  }
}
