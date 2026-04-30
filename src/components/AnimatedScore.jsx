import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedScore({ target, duration = 1500, size = 'large' }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const getColor = (s) => {
    if (s >= 80) return '#10B981';
    if (s >= 60) return '#3B82F6';
    if (s >= 40) return '#F59E0B';
    return '#EF4444';
  };

  const color = getColor(target);

  useEffect(() => {
    if (hasAnimated) return;
    setHasAnimated(true);

    let start = 0;
    const increment = target / 50;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, duration, hasAnimated]);

  const sizeClasses = {
    small: { number: '2.5rem', label: '0.75rem' },
    medium: { number: '4rem', label: '0.875rem' },
    large: { number: '6rem', label: '1rem' },
  };

  const s = sizeClasses[size] || sizeClasses.large;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      className="text-center"
    >
      <span
        className="font-extrabold tracking-tighter"
        style={{
          fontSize: s.number,
          color,
          fontFamily: 'var(--font-heading)',
          lineHeight: 1,
        }}
      >
        {count}
      </span>
      <span
        className="block font-medium mt-1"
        style={{
          fontSize: s.label,
          color: 'var(--color-slate)',
          fontFamily: 'var(--font-body)',
        }}
      >
        / 100
      </span>
    </motion.div>
  );
}
