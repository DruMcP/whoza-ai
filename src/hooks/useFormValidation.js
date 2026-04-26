/**
 * Form validation hook for Competitor Analysis form
 * Handles client-side validation logic
 */

const ADMIN_WHITELIST = ['dru.mcpherson@gmail.com'];

/**
 * Validates email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid
 */
function isValidEmail(email) {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Checks if email is in admin whitelist
 * @param {string} email - Email to check
 * @returns {boolean} True if whitelisted
 */
function isWhitelistedEmail(email) {
  return email && ADMIN_WHITELIST.includes(email.toLowerCase().trim());
}

/**
 * Checks client-side cooldown for form submission
 * @param {string} email - User's email address
 * @returns {{allowed: boolean, remainingSeconds?: number, whitelisted?: boolean}}
 */
function checkClientSideCooldown(email) {
  const isWhitelisted = isWhitelistedEmail(email);

  if (isWhitelisted) {
    return { allowed: true, whitelisted: true };
  }

  const lastSubmission = localStorage.getItem('lastCompetitorAnalysisSubmission');
  if (lastSubmission) {
    const timeSince = Date.now() - parseInt(lastSubmission);
    const cooldownMs = 60 * 1000;
    if (timeSince < cooldownMs) {
      const remainingSeconds = Math.ceil((cooldownMs - timeSince) / 1000);
      return { allowed: false, remainingSeconds };
    }
  }
  return { allowed: true };
}

/**
 * Custom hook for form validation
 * @param {Object} formData - Form data to validate
 * @returns {{validateForm: Function, validateField: Function}}
 */
export function useFormValidation(formData) {
  /**
   * Validates a single field
   * @param {string} fieldName - Name of field to validate
   * @param {any} value - Value to validate
   * @returns {{valid: boolean, error?: string}}
   */
  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'business_name':
        if (!value?.trim()) {
          return { valid: false, error: 'Business name is required' };
        }
        return { valid: true };

      case 'trade_type':
        if (!value?.trim()) {
          return { valid: false, error: 'Trade type is required' };
        }
        return { valid: true };

      case 'location':
        if (!value?.trim()) {
          return { valid: false, error: 'Location is required' };
        }
        return { valid: true };

      case 'email':
        if (!value?.trim()) {
          return { valid: false, error: 'Email address is required' };
        }
        if (!isValidEmail(value)) {
          return { valid: false, error: 'Please enter a valid email address' };
        }
        return { valid: true };

      default:
        return { valid: true };
    }
  };

  /**
   * Validates entire form
   * @returns {{valid: boolean, error?: string}}
   */
  const validateForm = () => {
    // Check required fields
    if (!formData.business_name?.trim()) {
      return { valid: false, error: 'Please enter your business name' };
    }

    if (!formData.trade_type?.trim()) {
      return { valid: false, error: 'Please select your trade type' };
    }

    if (!formData.location?.trim()) {
      return { valid: false, error: 'Please enter your location' };
    }

    if (!formData.email?.trim()) {
      return { valid: false, error: 'Please enter your email address to receive your results' };
    }

    // Validate email format
    if (!isValidEmail(formData.email)) {
      return { valid: false, error: 'Please enter a valid email address' };
    }

    // Check cooldown
    const cooldownCheck = checkClientSideCooldown(formData.email);
    if (!cooldownCheck.allowed) {
      return {
        valid: false,
        error: `Please wait ${cooldownCheck.remainingSeconds} seconds before submitting again.`
      };
    }

    return { valid: true, whitelisted: cooldownCheck.whitelisted };
  };

  return {
    validateForm,
    validateField,
    checkClientSideCooldown
  };
}
