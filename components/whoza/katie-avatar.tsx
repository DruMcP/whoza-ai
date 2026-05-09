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
        className="relative rounded-full overflow-hidden flex items-center justify-center"
        style={{
          width: "clamp(100px, 12vw, 140px)",
          height: "clamp(100px, 12vw, 140px)",
          border: "3px solid #10B981",
          boxShadow: "0 0 30px rgba(16,185,129,0.25), 0 4px 20px rgba(0,0,0,0.3)",
          background: "linear-gradient(135deg, #f5e6d3 0%, #e8d5c4 50%, #d4b896 100%)",
        }}
      >
        {/* Realistic Human Face - CSS Art */}
        <div className="relative w-full h-full">
          {/* Hair - brown, professional style */}
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-[55%] rounded-t-full"
            style={{
              background: "linear-gradient(180deg, #4a3728 0%, #5c4033 40%, #6b4e3d 100%)",
            }}
          />
          
          {/* Side hair */}
          <div 
            className="absolute top-[15%] left-[8%] w-[20%] h-[45%] rounded-full"
            style={{ background: "#5c4033" }}
          />
          <div 
            className="absolute top-[15%] right-[8%] w-[20%] h-[45%] rounded-full"
            style={{ background: "#5c4033" }}
          />

          {/* Face shape */}
          <div 
            className="absolute top-[22%] left-1/2 -translate-x-1/2 w-[65%] h-[55%] rounded-full"
            style={{
              background: "linear-gradient(180deg, #f5e6d3 0%, #e8d5c4 60%, #dcbfa6 100%)",
            }}
          />

          {/* Eyes */}
          <div className="absolute top-[42%] left-[32%] w-[12%] h-[8%] rounded-full bg-[#2d1810]" />
          <div className="absolute top-[42%] right-[32%] w-[12%] h-[8%] rounded-full bg-[#2d1810]" />
          
          {/* Eye highlights */}
          <div className="absolute top-[43%] left-[34%] w-[4%] h-[3%] rounded-full bg-white opacity-70" />
          <div className="absolute top-[43%] right-[34%] w-[4%] h-[3%] rounded-full bg-white opacity-70" />

          {/* Eyebrows */}
          <div 
            className="absolute top-[38%] left-[30%] w-[16%] h-[3%] rounded-full bg-[#4a3728]"
            style={{ transform: "rotate(-5deg)" }}
          />
          <div 
            className="absolute top-[38%] right-[30%] w-[16%] h-[3%] rounded-full bg-[#4a3728]"
            style={{ transform: "rotate(5deg)" }}
          />

          {/* Nose */}
          <div 
            className="absolute top-[48%] left-1/2 -translate-x-1/2 w-[8%] h-[12%] rounded-full"
            style={{
              background: "linear-gradient(180deg, #dcbfa6 0%, #c9a882 100%)",
            }}
          />

          {/* Smile */}
          <div 
            className="absolute top-[58%] left-1/2 -translate-x-1/2 w-[30%] h-[12%]"
            style={{
              borderBottom: "3px solid #c17f59",
              borderRadius: "0 0 50% 50%",
            }}
          />

          {/* Cheeks - subtle blush */}
          <div 
            className="absolute top-[50%] left-[20%] w-[15%] h-[10%] rounded-full opacity-30"
            style={{ background: "#e8a090" }}
          />
          <div 
            className="absolute top-[50%] right-[20%] w-[15%] h-[10%] rounded-full opacity-30"
            style={{ background: "#e8a090" }}
          />

          {/* Headset - left ear */}
          <div 
            className="absolute top-[35%] left-[2%] w-[12%] h-[22%] rounded-lg"
            style={{
              background: "linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%)",
              border: "1px solid #444",
            }}
          />
          
          {/* Headset - right ear */}
          <div 
            className="absolute top-[35%] right-[2%] w-[12%] h-[22%] rounded-lg"
            style={{
              background: "linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%)",
              border: "1px solid #444",
            }}
          />
          
          {/* Headset band */}
          <div 
            className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[75%] h-[15%] rounded-t-full"
            style={{
              borderTop: "4px solid #2a2a2a",
              borderLeft: "4px solid #2a2a2a",
              borderRight: "4px solid #2a2a2a",
            }}
          />
          
          {/* Microphone boom */}
          <div 
            className="absolute top-[52%] right-[8%] w-[20%] h-[3%] rounded-full"
            style={{
              background: "#2a2a2a",
              transform: "rotate(-30deg)",
              transformOrigin: "right center",
            }}
          />
          <div 
            className="absolute top-[58%] right-[22%] w-[6%] h-[6%] rounded-full"
            style={{
              background: "#1a1a1a",
              border: "1px solid #444",
            }}
          />

          {/* Neck */}
          <div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[30%] h-[20%]"
            style={{
              background: "linear-gradient(180deg, #dcbfa6 0%, #c9a882 100%)",
            }}
          />

          {/* Collar / professional top */}
          <div 
            className="absolute -bottom-[5%] left-1/2 -translate-x-1/2 w-[50%] h-[20%] rounded-t-full"
            style={{
              background: "linear-gradient(180deg, #2c5282 0%, #1a365d 100%)",
            }}
          />
        </div>

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
