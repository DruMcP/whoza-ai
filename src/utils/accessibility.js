/**
 * Accessibility Utilities
 * Enhanced a11y features and helpers
 */

/**
 * Announce message to screen readers
 */
export const announceToScreenReader = (message, priority = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

/**
 * Trap focus within a container (useful for modals)
 */
export const trapFocus = (element) => {
  const focusableElements = element.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleTabKey = (e) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  };

  element.addEventListener('keydown', handleTabKey);

  return () => {
    element.removeEventListener('keydown', handleTabKey);
  };
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Check if user prefers dark mode
 */
export const prefersDarkMode = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

/**
 * Get contrast ratio between two colors
 */
export const getContrastRatio = (color1, color2) => {
  const getLuminance = (color) => {
    const rgb = color.match(/\d+/g).map(Number);
    const [r, g, b] = rgb.map((val) => {
      val = val / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
};

/**
 * Add visible focus indicators
 */
export const enhanceFocusIndicators = () => {
  let usingMouse = false;

  document.body.addEventListener('mousedown', () => {
    usingMouse = true;
  });

  document.body.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      usingMouse = false;
    }
  });

  document.body.addEventListener('focusin', (e) => {
    if (usingMouse) {
      e.target.classList.add('using-mouse');
    } else {
      e.target.classList.remove('using-mouse');
    }
  });
};

/**
 * Create skip links dynamically
 */
export const createSkipLinks = () => {
  const landmarks = document.querySelectorAll('main, nav, [role="navigation"], [role="main"]');
  const skipLinks = document.createElement('div');
  skipLinks.className = 'skip-links';

  landmarks.forEach((landmark, index) => {
    if (!landmark.id) {
      landmark.id = `landmark-${index}`;
    }

    const link = document.createElement('a');
    link.href = `#${landmark.id}`;
    link.className = 'skip-link';
    link.textContent = `Skip to ${landmark.tagName.toLowerCase()}`;
    skipLinks.appendChild(link);
  });

  document.body.insertBefore(skipLinks, document.body.firstChild);
};

/**
 * Ensure proper heading hierarchy
 */
export const validateHeadingHierarchy = () => {
  const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  let lastLevel = 0;
  const issues = [];

  headings.forEach((heading) => {
    const level = parseInt(heading.tagName.substring(1));

    if (level - lastLevel > 1) {
      issues.push(`Heading level jumped from H${lastLevel} to H${level}`);
    }

    lastLevel = level;
  });

  if (issues.length > 0) {
      }

  return issues.length === 0;
};

/**
 * Add aria-labels to images without alt text
 */
export const enforceAltText = () => {
  const images = document.querySelectorAll('img:not([alt])');
  images.forEach((img) => {
        img.setAttribute('alt', '');
    img.setAttribute('role', 'presentation');
  });
};

/**
 * Ensure interactive elements are keyboard accessible
 */
export const validateKeyboardAccessibility = () => {
  const interactive = document.querySelectorAll('div[onclick], span[onclick]');
  interactive.forEach((element) => {
    if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
      element.setAttribute('role', 'button');
    }
  });
};

/**
 * Add ARIA labels to form fields without labels
 */
export const validateFormLabels = () => {
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach((input) => {
    if (input.type !== 'hidden' && !input.hasAttribute('aria-label') && !input.hasAttribute('aria-labelledby')) {
      const label = document.querySelector(`label[for="${input.id}"]`);
      if (!label) {
              }
    }
  });
};

/**
 * Initialize all accessibility enhancements
 */
export const initAccessibility = () => {
  enhanceFocusIndicators();

  if (import.meta.env.MODE === 'development') {
    setTimeout(() => {
      validateHeadingHierarchy();
      enforceAltText();
      validateKeyboardAccessibility();
      validateFormLabels();
    }, 1000);
  }
};

/**
 * Custom hook helpers for React components
 */
export const useAnnouncement = () => {
  return (message, priority = 'polite') => {
    announceToScreenReader(message, priority);
  };
};

export const useKeyboardNavigation = (onEscape, onEnter) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && onEscape) {
      onEscape();
    }
    if (e.key === 'Enter' && onEnter) {
      onEnter();
    }
  };

  return handleKeyDown;
};
