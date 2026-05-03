import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Users, Star, Clock, PoundSterling } from 'lucide-react';

const stats = [
  {
    value: '£2,400',
    label: 'average recovered per year',
    icon: PoundSterling,
    color: 'var(--katie-blue)',
    bgLight: 'var(--katie-blue-light)',
    numeric: 2400,
    prefix: '£',
    suffix: '',
  },
  {
    value: '94%',
    label: 'of users keep whoza.ai after trial',
    icon: TrendingUp,
    color: 'var(--rex-green)',
    bgLight: 'var(--rex-green-light)',
    numeric: 94,
    prefix: '',
    suffix: '%',
  },
  {
    value: '4.9/5',
    label: 'average rating from tradespeople',
    icon: Star,
    color: 'var(--claire-amber)',
    bgLight: 'var(--claire-amber-light)',
    numeric: null,
  },
  {
    value: '1,200+',
    label: 'tradespeople using whoza.ai',
    icon: Users,
    color: 'var(--katie-blue)',
    bgLight: 'var(--katie-blue-light)',
    numeric: 1200,
    prefix: '',
    suffix: '+',
  },
  {
    value: 'Under 2 min',
    label: 'to see your visibility score',
    icon: Clock,
    color: 'var(--rex-green)',
    bgLight: 'var(--rex-green-light)',
    numeric: null,
  },
];

function AnimatedStat({ stat, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const [animatedValue, setAnimatedValue] = useState(
    stat.numeric !== null ? `${stat.prefix}0${stat.suffix}` : stat.value
  );

  useEffect(() => {
    if (!isInView || stat.numeric === null) return;
    let raf;
    const duration = 1500;
    const startTime = performance.now();
    const tick = (timestamp) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * stat.numeric);
      setAnimatedValue(`${stat.prefix}${current.toLocaleString()}${stat.suffix}`);
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setAnimatedValue(stat.value);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, stat.numeric, stat.prefix, stat.suffix, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="text-center"
    >
      <div
        className="inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3"
        style={{
          background: stat.bgLight,
          color: stat.color,
        }}
      >
        <stat.icon size={20} strokeWidth={2} />
      </div>
      <div
        className="font-heading font-bold text-2xl md:text-3xl tracking-tight"
        style={{ color: 'var(--white)', fontVariantNumeric: 'tabular-nums' }}
      >
        {stat.numeric !== null ? animatedValue : stat.value}
      </div>
      <p
        className="text-xs md:text-sm mt-1 leading-snug"
        style={{ color: 'var(--slate-400)' }}
      >
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function StatsBand() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  return (
    <section
      ref={sectionRef}
      className="ds-section-sm"
      style={{
        background: 'var(--navy-900)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="ds-container">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <AnimatedStat key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
