import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function ScoreVisualization({ score = 72, size: propSize = 280, animate = true }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [displayScore, setDisplayScore] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  
  // Responsive sizing: cap at propSize, but shrink on small screens
  const [responsiveSize, setResponsiveSize] = useState(propSize);
  
  useEffect(() => {
    const updateSize = () => {
      const maxWidth = window.innerWidth - 48; // 24px padding each side
      setResponsiveSize(Math.min(propSize, maxWidth, 320));
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [propSize]);
  
  const size = responsiveSize;
  const radius = (size - 32) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  // IntersectionObserver to pause canvas when off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Color based on score — WCAG AA compliant on white
  const getColor = (s) => {
    if (s >= 80) return '#059669'; // green-600
    if (s >= 60) return '#2563EB'; // blue-600
    if (s >= 40) return '#D97706'; // amber-600
    return '#DC2626'; // red-600
  };

  const color = getColor(score);

  useEffect(() => {
    if (!animate) {
      setDisplayScore(score);
      return;
    }
    if (prefersReducedMotion) {
      setDisplayScore(score);
      return;
    }
    let current = 0;
    const duration = 1500;
    const steps = 60;
    const increment = score / steps;
    const interval = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.round(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [score, animate, prefersReducedMotion]);

  // Draw orbital particles on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible || prefersReducedMotion) return;
    const ctx = canvas.getContext('2d');
    canvas.width = size;
    canvas.height = size;

    let frame = 0;
    let animId;

    const particles = Array.from({ length: 12 }, (_, i) => ({
      angle: (i / 12) * Math.PI * 2,
      speed: 0.005 + Math.random() * 0.01,
      radius: radius + 20 + Math.random() * 16,
      size: 2 + Math.random() * 3,
      alpha: 0.3 + Math.random() * 0.4,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      frame++;

      particles.forEach((p) => {
        const a = p.angle + frame * p.speed;
        const x = center + Math.cos(a) * p.radius;
        const y = center + Math.sin(a) * p.radius;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37, 99, 235, ${p.alpha * (0.6 + 0.4 * Math.sin(frame * 0.03))})`;
        ctx.fill();
      });

      // Orbital ring
      ctx.beginPath();
      ctx.arc(center, center, radius + 28, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(37, 99, 235, 0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [size, radius, center, isVisible, prefersReducedMotion]);

  const progress = (displayScore / 100) * circumference;

  return (
    <div ref={containerRef} className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', top: 0, left: 0, width: size, height: size, pointerEvents: 'none' }}
      />
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="var(--color-lightgray)"
          strokeWidth="10"
        />
        {/* Animated progress */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: prefersReducedMotion ? 0 : 1.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      {/* Center content */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ transform: 'rotate(0deg)' }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.5, duration: prefersReducedMotion ? 0 : 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className="text-center"
        >
          <span
            className="block font-extrabold tracking-tight"
            style={{
              fontSize: size > 240 ? '3.5rem' : '2.5rem',
              color,
              fontFamily: 'var(--font-heading)',
              lineHeight: 1,
            }}
          >
            {displayScore}
          </span>
          <span
            className="block mt-1 font-medium"
            style={{
              fontSize: size > 240 ? '0.875rem' : '0.75rem',
              color: 'var(--color-slate)',
              fontFamily: 'var(--font-body)',
            }}
          >
            AI Visibility Score
          </span>
        </motion.div>
      </div>
    </div>
  );
}
