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

    if (isProduction && context.error?.stack) {
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

  async sendToMonitoring(errorData) {
    try {
      await fetch('/api/v1/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errorData)
      });
    } catch (err) {
      // Silent fail - don't break app if monitoring is down
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
