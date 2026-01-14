export function initMicrointeractions() {
  if (typeof window === 'undefined') return;

  initScrollBasedHeader();
  initScrollReveal();
  initTooltips();
  initImageHoverEffects();
}

function initScrollBasedHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  let lastScroll = 0;
  const scrollThreshold = 50;

  const handleScroll = () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}

function initScrollReveal() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll(
    '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right'
  );

  revealElements.forEach(el => observer.observe(el));
}

function initTooltips() {
  const tooltipTriggers = document.querySelectorAll('[data-tooltip]');

  tooltipTriggers.forEach(trigger => {
    const tooltipText = trigger.getAttribute('data-tooltip');
    if (!tooltipText) return;

    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;
    tooltip.setAttribute('role', 'tooltip');

    trigger.classList.add('tooltip-trigger');
    trigger.style.position = 'relative';
    trigger.appendChild(tooltip);

    const updateTooltipPosition = () => {
      const triggerRect = trigger.getBoundingClientRect();
      tooltip.style.position = 'absolute';
      tooltip.style.top = 'calc(100% + 8px)';
      tooltip.style.left = '50%';
      tooltip.style.transform = 'translateX(-50%)';
    };

    trigger.addEventListener('mouseenter', updateTooltipPosition);
    trigger.addEventListener('focus', updateTooltipPosition);
  });
}

function initImageHoverEffects() {
  const images = document.querySelectorAll('img:not(.header-logo)');

  images.forEach(img => {
    img.addEventListener('mouseenter', () => {
      if (img.parentElement.tagName !== 'A') {
        img.style.cursor = 'default';
      }
    });
  });
}

export function addStaggerAnimation(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const items = container.children;
  Array.from(items).forEach((item, index) => {
    item.classList.add('stagger-item');
    item.style.animationDelay = `${index * 0.1}s`;
  });
}

export function createTooltip(element, text) {
  element.setAttribute('data-tooltip', text);
  element.classList.add('tooltip-trigger');
  element.style.position = 'relative';

  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = text;
  tooltip.setAttribute('role', 'tooltip');

  element.appendChild(tooltip);
}

export function addGlassmorphism(element) {
  element.classList.add('glass-card');
}

export function addFloatingAnimation(element) {
  element.classList.add('float-animation');
}

export function addPulseAnimation(element) {
  element.classList.add('pulse');
}
