import { logger } from './logger';

class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.enabled = true;
    this.thresholds = {
      slow: 100,
      critical: 500
    };
  }

  /**
   * Start timing a performance metric
   */
  startMeasure(name) {
    if (!this.enabled) return;
    this.metrics.set(name, performance.now());
  }

  /**
   * End timing and log the performance metric
   */
  endMeasure(name) {
    if (!this.enabled) return;

    const startTime = this.metrics.get(name);
    if (!startTime) {
      logger.warn(`No start time found for measure: ${name}`);
      return;
    }

    const duration = performance.now() - startTime;
    this.metrics.delete(name);

    if (duration > this.thresholds.critical) {
      logger.error('Critical performance issue', { operation: name, duration: `${duration.toFixed(2)}ms` });
    } else if (duration > this.thresholds.slow) {
      logger.warn('Slow operation detected', { operation: name, duration: `${duration.toFixed(2)}ms` });
    }

    return duration;
  }

  /**
   * Measure async operation
   */
  async measureAsync(name, operation) {
    if (!this.enabled) return operation();

    const startTime = performance.now();
    try {
      return await operation();
    } finally {
      const duration = performance.now() - startTime;
      if (duration > this.thresholds.critical) {
        logger.error('Critical async performance issue', { operation: name, duration: `${duration.toFixed(2)}ms` });
      } else if (duration > this.thresholds.slow) {
        logger.warn('Slow async operation', { operation: name, duration: `${duration.toFixed(2)}ms` });
      }
    }
  }

  /**
   * Get web vitals (Core Web Vitals)
   */
  reportWebVitals() {
    if (!this.enabled) return;

    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          const lcp = lastEntry.renderTime || lastEntry.loadTime;
          logger.info('LCP metric', { metric: 'LCP', value: `${lcp.toFixed(2)}ms` });
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // LCP not supported
      }

      // First Input Delay (FID)
      try {
        const fidObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            const fid = entry.processingStart - entry.startTime;
            logger.info('FID metric', { metric: 'FID', value: `${fid.toFixed(2)}ms` });
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        // FID not supported
      }

      // Cumulative Layout Shift (CLS)
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        window.addEventListener('beforeunload', () => {
          logger.info('CLS metric', { metric: 'CLS', value: clsValue.toFixed(4) });
        });
      } catch (e) {
        // CLS not supported
      }
    }
  }

  /**
   * Monitor component render performance
   */
  logRenderTime(componentName, renderTime) {
    if (!this.enabled) return;

    if (renderTime > 16.67) {
      logger.warn('Slow component render', {
        component: componentName,
        renderTime: `${renderTime.toFixed(2)}ms`,
        target: '16.67ms (60fps)'
      });
    }
  }

  /**
   * Check if page is hidden (for pausing expensive operations)
   */
  isPageVisible() {
    return document.visibilityState === 'visible';
  }

  /**
   * Debounce function for performance optimization
   */
  debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Throttle function for performance optimization
   */
  throttle(func, limit = 100) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

export const performanceMonitor = new PerformanceMonitor();

// Auto-report web vitals on load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    performanceMonitor.reportWebVitals();
  });
}
