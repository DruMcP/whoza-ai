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
        className="absolute inset-0 rounded-full animate-ping opacity-25 border-2 border-emerald-500 scale-[1.2]"
        aria-hidden="true"
      />

      {/* Avatar container */}
      <div
        className="relative rounded-full overflow-hidden w-[clamp(100px,12vw,140px)] h-[clamp(100px,12vw,140px)] border-[3px] border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.25),0_4px_20px_rgba(0,0,0,0.3)]"
      >
        <img
          src="/assets/icons/katie-icon.webp"
          alt="Katie - AI call handler"
          width="140" height="140"
          className="w-full h-full object-contain p-2"
        />

        {/* Live indicator badge */}
        <div
          className="absolute -bottom-1 -right-1 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-semibold font-sans shadow-[0_2px_8px_rgba(16,185,129,0.4)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          LIVE
        </div>
      </div>

      {/* Name label */}
      <p
        className="text-center mt-2 font-medium text-sm text-gray-400 font-sans"
      >
        Katie
      </p>
    </motion.div>
  )
}
