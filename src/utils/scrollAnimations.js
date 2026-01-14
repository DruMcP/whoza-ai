export const initScrollAnimations = () => {
  // Disabled - all content displays immediately without scroll animations
  return () => {};
};

export const addScrollAnimation = (element, animationType = 'fade-in-up') => {
  if (!element) return;

  element.classList.add(`scroll-${animationType}`);
  element.dataset.once = 'true';
};

export const staggerScrollAnimations = (containerSelector, itemSelector, baseDelay = 100) => {
  const containers = document.querySelectorAll(containerSelector);

  containers.forEach(container => {
    const items = container.querySelectorAll(itemSelector);

    items.forEach((item, index) => {
      item.style.transitionDelay = `${index * baseDelay}ms`;
      item.classList.add('scroll-animate');
      item.dataset.once = 'true';
    });
  });
};

export const initStaggeredAnimations = () => {
  // Disabled - all content displays immediately without scroll animations
  return;
};
