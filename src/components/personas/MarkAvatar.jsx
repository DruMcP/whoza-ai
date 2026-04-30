import { motion } from 'framer-motion';

/**
 * Mark — AI Voice Agent Avatar (Professional male)
 * Neutral tones, confident
 * Real AI-generated human portrait photo
 */
export default function MarkAvatar({ size = 'md', floating = true, className = '' }) {
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
          src="/images/mark.jpg"
          alt="Mark — AI Voice Agent"
          className="rounded-full"
          style={{
            width: s,
            height: s,
            objectFit: 'cover',
            border: '3px solid #64748B',
            boxShadow: `
              inset -3px -3px 8px rgba(0,0,0,0.18),
              inset 3px 3px 8px rgba(255,255,255,0.2),
              0 4px 14px rgba(100,116,139,0.25),
              0 8px 24px rgba(100,116,139,0.15)
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
            animation: 'mark-avatar-pulse 2s ease-in-out infinite',
            zIndex: 10,
          }}
        />
        {/* Ring when floating */}
        {floating && (
          <span
            className="absolute inset-0 rounded-full"
            style={{
              animation: 'mark-avatar-ring 2s ease-in-out infinite',
            }}
          />
        )}
      </div>
      <style>{`
        @keyframes mark-avatar-pulse {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
          70% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
        @keyframes mark-avatar-ring {
          0%, 100% { box-shadow: 0 0 0 0 rgba(100,116,139,0.2); }
          50% { box-shadow: 0 0 0 4px rgba(100,116,139,0); }
        }
      `}</style>
    </motion.div>
  );
}
