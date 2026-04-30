import * as Sentry from '@sentry/react';

const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

class Logger {
  constructor() {
    this.errors = [];
    this.maxErrors = 100;
  }

  error(message, context = {}) {
    const errorData = {
      message,
      context,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    this.errors.push(errorData);
    if (this.errors.length > this.maxErrors) {
      this.errors.shift();
    }

    if (isDevelopment) {
      console.error('[ERROR]', message, context);
    }

    if (isProduction) {
      this.sendToMonitoring(errorData);
    }
  }

  warn(message, context = {}) {
    if (isDevelopment) {
      console.warn('[WARN]', message, context);
    }
  }

  info(message, context = {}) {
    if (isDevelopment) {
    }
  }

  debug(message, context = {}) {
    if (isDevelopment) {
    }
  }

  sendToMonitoring(errorData) {
    try {
      // Send to Sentry if available (replaces broken /api/v1/errors endpoint)
      if (Sentry && Sentry.captureMessage) {
        Sentry.captureMessage(errorData.message, {
          level: 'error',
          extra: {
            context: errorData.context,
            url: errorData.url,
            userAgent: errorData.userAgent,
          },
        });
      }
    } catch (err) {
      // Silent fail — don't break app if monitoring is down
      if (isDevelopment) {
        console.warn('[Logger] Failed to send to Sentry:', err);
      }
    }
  }

  getRecentErrors() {
    return this.errors;
  }

  clearErrors() {
    this.errors = [];
  }
}

export const logger = new Logger();
export default logger;
