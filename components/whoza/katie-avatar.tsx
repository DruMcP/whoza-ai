"use client"

import { motion } from "framer-motion"

interface KatieAvatarProps {
  className?: string
}

export function KatieAvatar({ className = "" }: KatieAvatarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`relative ${className}`}
    >
      {/* Live pulse ring */}
      <div
        className="absolute inset-0 rounded-full animate-ping opacity-25"
        style={{
          border: "2px solid #10B981",
          transform: "scale(1.2)",
        }}
        aria-hidden="true"
      />

      {/* Avatar container */}
      <div
        className="relative rounded-full overflow-hidden"
        style={{
          width: "clamp(100px, 12vw, 140px)",
          height: "clamp(100px, 12vw, 140px)",
          border: "3px solid #10B981",
          boxShadow: "0 0 30px rgba(16,185,129,0.25), 0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        <img
          src="/assets/icons/katie-icon.png"
          alt="Katie - AI call handler"
          className="w-full h-full object-contain p-2"
        />

        {/* Live indicator badge */}
        <div
          className="absolute -bottom-1 -right-1 flex items-center gap-1 px-2 py-0.5 rounded-full"
          style={{
            background: "#10B981",
            fontSize: 10,
            fontWeight: 600,
            color: "#FFFFFF",
            fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
            boxShadow: "0 2px 8px rgba(16,185,129,0.4)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          LIVE
        </div>
      </div>

      {/* Name label */}
      <p
        className="text-center mt-2 font-medium"
        style={{
          fontSize: 14,
          color: "#9CA3AF",
          fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        Katie
      </p>
    </motion.div>
  )
}
