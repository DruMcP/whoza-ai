import { useState, useEffect, useRef } from 'react';

/**
 * Animated counter that counts up when the element scrolls into view.
 * @param {number} end - The target number
 * @param {number} duration - Animation duration in ms (default 1500)
 * @param {boolean} start - Whether to start counting
 * @param {string} prefix - e.g. '£'
 * @param {string} suffix - e.g. '%', '+'
 * @returns {string} - The current animated value
 */
export function useAnimatedCounter(end, duration = 1500, start = false, prefix = '', suffix = '') {
  const [count, setCount] = useState(0);
  const frameRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (!start) {
      setCount(0);
      return;
    }

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    startTimeRef.current = null;
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [end, duration, start]);

  return `${prefix}${count.toLocaleString()}${suffix}`;
}

/**
 * Extract numeric value from a formatted string like '£2,400', '94%', '1,200+'
 */
export function parseStatValue(value) {
  const numeric = parseFloat(value.replace(/[^0-9.]/g, ''));
  if (isNaN(numeric)) return null;
  const prefix = value.match(/^[^0-9.]/)?.[0] || '';
  const suffix = value.match(/[^0-9.](?!.*[0-9])/)?.[0] || '';
  return { numeric, prefix, suffix };
}
