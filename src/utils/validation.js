const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
const postcodeUKRegex = /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i;

export const validators = {
  required: (value, fieldName = 'This field') => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return `${fieldName} is required`;
    }
    return null;
  },

  email: (value) => {
    if (!value) return null;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    if (value.length > 254) {
      return 'Email address is too long';
    }
    return null;
  },

  phone: (value) => {
    if (!value) return null;
    if (!phoneRegex.test(value)) {
      return 'Please enter a valid phone number';
    }
    return null;
  },

  url: (value) => {
    if (!value) return null;
    if (!urlRegex.test(value)) {
      return 'Please enter a valid URL (must start with http:// or https://)';
    }
    return null;
  },

  minLength: (min) => (value, fieldName = 'This field') => {
    if (!value) return null;
    if (value.length < min) {
      return `${fieldName} must be at least ${min} characters`;
    }
    return null;
  },

  maxLength: (max) => (value, fieldName = 'This field') => {
    if (!value) return null;
    if (value.length > max) {
      return `${fieldName} must not exceed ${max} characters`;
    }
    return null;
  },

  min: (min) => (value, fieldName = 'This field') => {
    if (value === null || value === undefined || value === '') return null;
    const num = Number(value);
    if (isNaN(num) || num < min) {
      return `${fieldName} must be at least ${min}`;
    }
    return null;
  },

  max: (max) => (value, fieldName = 'This field') => {
    if (value === null || value === undefined || value === '') return null;
    const num = Number(value);
    if (isNaN(num) || num > max) {
      return `${fieldName} must not exceed ${max}`;
    }
    return null;
  },

  pattern: (regex, message) => (value) => {
    if (!value) return null;
    if (!regex.test(value)) {
      return message || 'Invalid format';
    }
    return null;
  },

  postcodeUK: (value) => {
    if (!value) return null;
    if (!postcodeUKRegex.test(value)) {
      return 'Please enter a valid UK postcode';
    }
    return null;
  },

  businessName: (value) => {
    if (!value) return null;
    if (value.length < 2) {
      return 'Business name must be at least 2 characters';
    }
    if (value.length > 100) {
      return 'Business name must not exceed 100 characters';
    }
    if (!/^[a-zA-Z0-9\s\-\&\.']+$/.test(value)) {
      return 'Business name contains invalid characters';
    }
    return null;
  },

  password: (value) => {
    if (!value) return null;
    if (value.length < 8) {
      return 'Password must be at least 8 characters';
    }
    if (value.length > 72) {
      return 'Password must not exceed 72 characters';
    }
    if (!/[a-z]/.test(value)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[A-Z]/.test(value)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[0-9]/.test(value)) {
      return 'Password must contain at least one number';
    }
    return null;
  },

  passwordStrength: (value) => {
    if (!value) return { strength: 0, message: '' };

    let strength = 0;
    const checks = {
      length: value.length >= 12,
      lowercase: /[a-z]/.test(value),
      uppercase: /[A-Z]/.test(value),
      numbers: /[0-9]/.test(value),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(value)
    };

    strength += checks.length ? 2 : value.length >= 8 ? 1 : 0;
    strength += checks.lowercase ? 1 : 0;
    strength += checks.uppercase ? 1 : 0;
    strength += checks.numbers ? 1 : 0;
    strength += checks.special ? 1 : 0;

    const messages = {
      0: 'Very weak',
      1: 'Very weak',
      2: 'Weak',
      3: 'Fair',
      4: 'Good',
      5: 'Strong',
      6: 'Very strong'
    };

    return {
      strength,
      message: messages[Math.min(strength, 6)],
      checks
    };
  }
};

export const validate = (value, validatorsList, fieldName = 'This field') => {
  for (const validator of validatorsList) {
    const error = typeof validator === 'function'
      ? validator(value, fieldName)
      : validator;

    if (error) return error;
  }
  return null;
};

export const validateForm = (formData, validationRules) => {
  const errors = {};
  let isValid = true;

  for (const [field, rules] of Object.entries(validationRules)) {
    const value = formData[field];
    const error = validate(value, rules, field);

    if (error) {
      errors[field] = error;
      isValid = false;
    }
  }

  return { isValid, errors };
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;

  return input
    .trim()
    .replace(/[<>]/g, '')
    .substring(0, 10000);
};

export const sanitizeFormData = (formData) => {
  const sanitized = {};

  for (const [key, value] of Object.entries(formData)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
};

export default validators;
