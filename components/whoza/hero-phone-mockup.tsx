"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function HeroPhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto"
      style={{ width: 320 }}
    >
      {/* Floating Data Cards */}
      <FloatingCard
        top={-20}
        right={-40}
        icon="/assets/icons/katie-icon.png"
        value="£480"
        label="recovered today"
        color="#FF6B6B"
        delay={0.6}
      />
      <FloatingCard
        bottom={40}
        left={-50}
        icon="/assets/icons/mark-icon.png"
        value="23"
        label="leads this week"
        color="#0F4C75"
        delay={0.9}
      />
      <FloatingCard
        top={60}
        left={-30}
        icon="/assets/icons/claire-icon.png"
        value="4.9"
        label="average review"
        color="#F6B93B"
        delay={1.2}
      />
      <FloatingCard
        bottom={-10}
        right={-20}
        icon="/assets/icons/rex-icon.png"
        value="+5"
        label="jobs vs last month"
        color="#00B894"
        delay={1.5}
      />

      {/* Phone Frame */}
      <div
        className="relative"
        style={{
          background: "#FFFFFF",
          borderRadius: 40,
          padding: 12,
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)",
          border: "8px solid #1A1A2E",
          overflow: "hidden",
          animation: "float 6s ease-in-out infinite",
        }}
      >
        {/* Notch */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-10"
          style={{
            width: 120,
            height: 28,
            background: "#1A1A2E",
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
          }}
        />

        {/* WhatsApp Header */}
        <div
          className="flex items-center gap-3 px-4 pt-10 pb-3"
          style={{ background: "#075E54" }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
            style={{ background: "#128C7E", fontSize: 18 }}
          >
            <Image src="/assets/icons/katie-icon.png" alt="" width={24} height={24} className="object-contain" />
          </div>
          <div>
            <div className="text-white font-semibold text-sm">Whoza AI 🤖</div>
            <div className="text-emerald-200 text-xs">Business Account</div>
          </div>
        </div>

        {/* Date */}
        <div className="text-center py-2 text-xs" style={{ color: "#6B7280" }}>
          Today
        </div>

        {/* Notification Banner */}
        <div
          className="mx-4 mb-2 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
          style={{ background: "#FEF3C7", color: "#92400E" }}
        >
          <span>🔔</span>
          Whoza AI captured a new lead
        </div>

        {/* Chat Bubble */}
        <div
          className="mx-4 mb-2 p-3 rounded-lg"
          style={{
            background: "#FFFFFF",
            boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
            borderLeft: "4px solid #FF6B6B",
          }}
        >
          <div className="text-sm font-semibold mb-1" style={{ color: "#1A1A2E" }}>
            New enquiry from Sarah Williams
          </div>
          <div className="text-xs mb-2" style={{ color: "#6B7280" }}>🔧 Plumbing</div>
          <div className="text-sm leading-relaxed" style={{ color: "#374151" }}>
            "Hi, I have a leaking boiler in my kitchen and no hot water. Can someone come out today please?"
          </div>
          <div className="text-right text-xs mt-1" style={{ color: "#9CA3AF" }}>09:41</div>
        </div>

        {/* Lead Summary Card */}
        <div
          className="mx-4 mb-2 p-4 rounded-xl"
          style={{
            background: "#F8FAFC",
            border: "1px solid #E2E8F0",
          }}
        >
          <div className="flex items-center gap-2 mb-3 text-sm font-semibold" style={{ color: "#1A1A2E" }}>
            <span>📋</span> Lead Summary
          </div>
          <div className="grid grid-cols-2 gap-2">
            <LeadItem label="Name" value="Sarah Williams" />
            <LeadItem label="Job Type" value="Boiler Repair" />
            <LeadItem label="Location" value="Bristol, BS16" />
            <LeadItem label="Priority" value="🔴 High" valueColor="#E74C3C" />
            <LeadItem label="Job Value" value="£250 – £450" />
            <LeadItem label="AI Verified" value="✓ Verified" valueColor="#00B894" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mx-4 mb-2">
          <button
            className="px-3 py-2.5 rounded-lg text-xs font-semibold text-white"
            style={{ background: "#00B894" }}
          >
            👍 Accept Job
          </button>
          <button
            className="px-3 py-2.5 rounded-lg text-xs font-semibold text-white"
            style={{ background: "#3B82F6" }}
          >
            📞 Call Back
          </button>
          <button
            className="px-3 py-2.5 rounded-lg text-xs font-semibold"
            style={{ background: "#F3F4F6", color: "#6B7280" }}
          >
            ❌ Decline
          </button>
          <button
            className="px-3 py-2.5 rounded-lg text-xs font-semibold"
            style={{ background: "#F3F4F6", color: "#6B7280" }}
          >
            ⏰ Reschedule
          </button>
        </div>

        {/* AI Badge */}
        <div
          className="mx-4 mb-4 px-3 py-2 rounded-lg text-xs flex items-center gap-2"
          style={{
            background: "#F0FDF4",
            border: "1px solid #BBF7D0",
            color: "#166534",
          }}
        >
          <span>🤖</span>
          AI Qualification: Verified — Not spam | Real postcode | Job confirmed
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-12px) rotate(2deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .relative > div:first-child { animation: none; }
        }
      `}</style>
    </motion.div>
  )
}

function FloatingCard({
  top,
  right,
  bottom,
  left,
  icon,
  value,
  label,
  color,
  delay,
}: {
  top?: number
  right?: number
  bottom?: number
  left?: number
  icon: string
  value: string
  label: string
  color: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="absolute z-20"
      style={{
        top: top !== undefined ? top : undefined,
        right: right !== undefined ? right : undefined,
        bottom: bottom !== undefined ? bottom : undefined,
        left: left !== undefined ? left : undefined,
        background: "white",
        borderRadius: 16,
        padding: "16px 20px",
        boxShadow: "0 8px 16px rgba(0,0,0,0.06)",
        border: "1px solid #E2E8F0",
        minWidth: 140,
        textAlign: "center",
        animation: `cardFloat 4s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <div
        className="w-10 h-10 mx-auto mb-2 flex items-center justify-center rounded-xl"
        style={{ background: `${color}15` }}
      >
        <Image src={icon} alt="" width={24} height={24} className="object-contain" />
      </div>
      <div className="text-2xl font-bold" style={{ color: "#1A1A2E", fontFamily: "Inter, sans-serif" }}>
        {value}
      </div>
      <div className="text-xs mt-1" style={{ color: "#718096" }}>
        {label}
      </div>

      <style jsx>{`
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </motion.div>
  )
}

function LeadItem({
  label,
  value,
  valueColor,
}: {
  label: string
  value: string
  valueColor?: string
}) {
  return (
    <div className="flex flex-col">
      <span className="text-xs" style={{ color: "#718096" }}>{label}</span>
      <span className="text-sm font-semibold" style={{ color: valueColor || "#1A1A2E" }}>
        {value}
      </span>
    </div>
  )
}
