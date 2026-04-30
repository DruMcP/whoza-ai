import { motion } from 'framer-motion';

/**
 * Katie — AI Voice Agent Avatar
 * Warm, friendly female — soft blue tones, approachable
 * Real AI-generated human portrait photo
 */
export default function KatieAvatar({ size = 'md', floating = true, className = '' }) {
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
      animate={floating ? { y: [0, -8, 0] } : {}}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className={className}
    >
      <div className="relative" style={{ width: s, height: s }}>
        <img
          src="/images/katie.jpg"
          alt="Katie — AI Voice Agent"
          className="rounded-full"
          style={{
            width: s,
            height: s,
            objectFit: 'cover',
            border: '3px solid #2563EB',
            boxShadow: `
              inset -3px -3px 8px rgba(0,0,0,0.15),
              inset 3px 3px 8px rgba(255,255,255,0.25),
              0 4px 14px rgba(37,99,235,0.25),
              0 8px 24px rgba(37,99,235,0.15)
            `,
          }}
        />
        {/* Online pulse dot */}
        <span
          className="absolute rounded-full border-2 border-white"
          style={{
            width: dotSize,
            height: dotSize,
            bottom: -2,
            right: -2,
            background: '#10B981',
            boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.7)',
            animation: 'katie-avatar-pulse 2s ease-in-out infinite',
            zIndex: 10,
          }}
        />
        {/* Ring when floating */}
        {floating && (
          <span
            className="absolute inset-0 rounded-full"
            style={{
              animation: 'katie-avatar-ring 2s ease-in-out infinite',
            }}
          />
        )}
      </div>
      <style>{`
        @keyframes katie-avatar-pulse {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
          70% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
        @keyframes katie-avatar-ring {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37,99,235,0.2); }
          50% { box-shadow: 0 0 0 4px rgba(37,99,235,0); }
        }
      `}</style>
    </motion.div>
  );
}
