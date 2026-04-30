import { motion } from 'framer-motion';

/**
 * Claire — Review Collector Avatar
 * Amber/gold tones, warm, trustworthy
 * Real AI-generated human portrait photo
 */
export default function ClaireAvatar({ size = 'md', floating = true, className = '' }) {
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
      animate={floating ? { y: [0, -6, 0], rotate: [0, 1, -1, 0] } : {}}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      className={className}
    >
      <div className="relative" style={{ width: s, height: s }}>
        <img
          src="/images/claire.jpg"
          alt="Claire — Review Collector"
          className="rounded-full"
          style={{
            width: s,
            height: s,
            objectFit: 'cover',
            border: '3px solid #D97706',
            boxShadow: `
              inset -3px -3px 8px rgba(0,0,0,0.12),
              inset 3px 3px 8px rgba(255,255,255,0.25),
              0 4px 14px rgba(217,119,6,0.25),
              0 8px 24px rgba(217,119,6,0.15)
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
            background: '#FBBF24',
            boxShadow: '0 0 0 0 rgba(251, 191, 36, 0.7)',
            animation: 'claire-avatar-pulse 2.5s ease-in-out infinite',
            zIndex: 10,
          }}
        />
        {floating && (
          <motion.span
            className="absolute inset-[-3px] rounded-full"
            style={{ border: '2px dashed rgba(217,119,6,0.2)' }}
            animate={{ rotate: [0, 180, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
        )}
      </div>
      <style>{`
        @keyframes claire-avatar-pulse {
          0% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.7); }
          70% { box-shadow: 0 0 0 6px rgba(251, 191, 36, 0); }
          100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0); }
        }
      `}</style>
    </motion.div>
  );
}
