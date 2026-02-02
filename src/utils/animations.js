export function initScrollAnimations() {
  // Disabled - all content displays immediately without scroll animations
  return;
}

export function initPageLoadAnimation() {
  document.body.style.opacity = '0';

  window.addEventListener('load', () => {
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.4s ease-out';
      document.body.style.opacity = '1';
    }, 50);
  });
}

export function addRippleEffect(event) {
  const button = event.currentTarget;
  const ripple = document.createElement('span');

  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  const rect = button.getBoundingClientRect();
  ripple.style.width = ripple.style.height = `${diameter}px`;
  ripple.style.left = `${event.clientX - rect.left - radius}px`;
  ripple.style.top = `${event.clientY - rect.top - radius}px`;
  ripple.classList.add('ripple');

  const existingRipple = button.querySelector('.ripple');
  if (existingRipple) {
    existingRipple.remove();
  }

  button.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
}

export function smoothScrollTo(targetId) {
  const element = document.getElementById(targetId);
  if (element) {
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}
