import { motion } from 'framer-motion';

/**
 * Rex — AI Visibility Analyst Avatar
 * Data analyst vibe — green tones, sharp, focused
 * Real AI-generated human portrait photo
 */
export default function RexAvatar({ size = 'md', floating = true, className = '' }) {
  const sizeMap = {
    sm: 40,
    md: 56,
    lg: 72,
    xl: 120,
  };

  const s = sizeMap[size] || sizeMap.md;
  const dotSize = Math.max(10, s * 0.2);

  return (
    <motion.div
      animate={floating ? { y: [0, -12, 0] } : {}}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      className={className}
    >
      <div className="relative" style={{ width: s, height: s }}>
        <img
          src="/images/rex.jpg"
          alt="Rex — AI Visibility Analyst"
          className="rounded-full"
          style={{
            width: s,
            height: s,
            objectFit: 'cover',
            border: '3px solid #059669',
            boxShadow: `
              inset -3px -3px 8px rgba(0,0,0,0.15),
              inset 3px 3px 8px rgba(255,255,255,0.22),
              0 4px 14px rgba(5,150,105,0.25),
              0 8px 24px rgba(5,150,105,0.15)
            `,
          }}
        />
        {/* Active indicator dot */}
        <span
          className="absolute rounded-full border-2 border-white"
          style={{
            width: dotSize,
            height: dotSize,
            bottom: -2,
            right: -2,
            background: '#34D399',
            boxShadow: '0 0 0 0 rgba(52, 211, 153, 0.7)',
            animation: 'rex-avatar-pulse 2.5s ease-in-out infinite',
            zIndex: 10,
          }}
        />
        {floating && (
          <motion.span
            className="absolute inset-[-4px] rounded-full border-2"
            style={{ borderColor: 'rgba(52,211,153,0.25)' }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </div>
      <style>{`
        @keyframes rex-avatar-pulse {
          0% { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.7); }
          70% { box-shadow: 0 0 0 6px rgba(52, 211, 153, 0); }
          100% { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0); }
        }
      `}</style>
    </motion.div>
  );
}
