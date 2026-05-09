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
        className="absolute inset-0 rounded-full animate-ping opacity-30"
        style={{
          border: "3px solid #10B981",
          transform: "scale(1.15)",
        }}
        aria-hidden="true"
      />

      {/* Avatar container */}
      <div
        className="relative rounded-full flex items-center justify-center"
        style={{
          width: "clamp(80px, 10vw, 120px)",
          height: "clamp(80px, 10vw, 120px)",
          border: "3px solid #10B981",
          boxShadow: "0 0 20px rgba(16,185,129,0.3)",
          background: "#1E2229",
        }}
      >
        {/* SVG Illustration — abstract friendly AI face */}
        <svg
          viewBox="0 0 120 120"
          className="w-3/4 h-3/4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Head */}
          <circle cx="60" cy="55" r="35" fill="#1E2229" stroke="#10B981" strokeWidth="2" />
          
          {/* Hair / headset band */}
          <path d="M30 45 Q60 15 90 45" stroke="#10B981" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          
          {/* Headset ear piece left */}
          <rect x="22" y="48" width="10" height="16" rx="4" fill="#10B981" opacity="0.8" />
          {/* Headset ear piece right */}
          <rect x="88" y="48" width="10" height="16" rx="4" fill="#10B981" opacity="0.8" />
          
          {/* Microphone boom */}
          <path d="M88 58 Q88 75 70 80" stroke="#10B981" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="70" cy="80" r="4" fill="#10B981" opacity="0.8" />
          
          {/* Eyes */}
          <ellipse cx="48" cy="52" rx="5" ry="7" fill="#10B981" opacity="0.9" />
          <ellipse cx="72" cy="52" rx="5" ry="7" fill="#10B981" opacity="0.9" />
          
          {/* Eye highlights */}
          <circle cx="50" cy="50" r="2" fill="#FFFFFF" opacity="0.6" />
          <circle cx="74" cy="50" r="2" fill="#FFFFFF" opacity="0.6" />
          
          {/* Smile */}
          <path d="M48 68 Q60 76 72 68" stroke="#10B981" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          
          {/* Sound wave indicator */}
          <path d="M35 88 Q45 82 50 88 Q55 94 60 88 Q65 82 70 88 Q75 94 80 88" stroke="#10B981" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
        </svg>

        {/* Live indicator badge */}
        <div
          className="absolute -bottom-1 -right-1 flex items-center gap-1 px-2 py-0.5 rounded-full"
          style={{
            background: "#10B981",
            fontSize: 10,
            fontWeight: 600,
            color: "#FFFFFF",
            fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
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
