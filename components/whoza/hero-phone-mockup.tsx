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
      role="img"
      aria-label="Demo showing how a qualified job enquiry appears in WhatsApp after Katie answers a missed call"
    >
      {/* Pilot corner badge */}
      <div
        className="absolute -top-2 -right-2 z-30 px-3 py-1.5 rounded-full text-xs font-bold"
        style={{
          background: "#10B981",
          color: "#FFFFFF",
          boxShadow: "0 2px 8px rgba(16,185,129,0.4)",
        }}
      >
        PILOT
      </div>

      {/* Phone Frame */}
      <div
        className="relative"
        style={{
          background: "#FFFFFF",
          borderRadius: 40,
          padding: 12,
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05), inset 0 0 0 8px #1A1A2E",
          overflow: "hidden",
        }}
      >
        {/* DEMO label */}
        <div
          className="absolute top-14 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-md text-xs font-bold tracking-wider"
          style={{
            background: "rgba(0,0,0,0.6)",
            color: "#FFFFFF",
            backdropFilter: "blur(4px)",
          }}
        >
          DEMO
        </div>

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

        {/* Screen Content */}
        <div className="rounded-[28px] overflow-hidden" style={{ background: "#FFFFFF" }}>
          {/* WhatsApp Header */}
          <div
            className="flex items-center gap-3 px-4 pt-10 pb-3"
            style={{ background: "#075E54" }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden"
              style={{ background: "#128C7E" }}
            >
              <Image 
                src="/assets/icons/katie-icon.png" 
                alt="" 
                width={32} 
                height={32} 
                className="object-contain"
                aria-hidden="true"
              />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">Whoza AI</div>
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
            <span aria-hidden="true">🔔</span>
            Whoza AI captured a new lead
          </div>

          {/* Chat Bubble */}
          <div
            className="mx-4 mb-2 p-3 rounded-lg"
            style={{
              background: "#FFFFFF",
              boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
              borderLeft: "4px solid #D63031",
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
              <span aria-hidden="true">📋</span> Lead Summary
            </div>
            <div className="grid grid-cols-2 gap-2">
              <LeadItem label="Name" value="Sarah Williams" />
              <LeadItem label="Job Type" value="Boiler Repair" />
              <LeadItem label="Location" value="Bristol, BS16" />
              <LeadItem label="Priority" value="High" valueColor="#D63031" />
              <LeadItem label="Job Value" value="£250 – £450" />
              <LeadItem label="AI Verified" value="Verified" valueColor="#008B6B" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 mx-4 mb-2">
            <button
              className="px-3 py-2.5 rounded-lg text-xs font-semibold text-white"
              style={{ background: "#008B6B" }}
              aria-label="Accept this job enquiry"
            >
              👍 Accept Job
            </button>
            <button
              className="px-3 py-2.5 rounded-lg text-xs font-semibold text-white"
              style={{ background: "#0F4C75" }}
              aria-label="Call the customer back"
            >
              📞 Call Back
            </button>
            <button
              className="px-3 py-2.5 rounded-lg text-xs font-semibold"
              style={{ background: "#F3F4F6", color: "#6B7280" }}
              aria-label="Decline this job enquiry"
            >
              ❌ Decline
            </button>
            <button
              className="px-3 py-2.5 rounded-lg text-xs font-semibold"
              style={{ background: "#F3F4F6", color: "#6B7280" }}
              aria-label="Reschedule this job for later"
            >
              ⏰ Reschedule
            </button>
          </div>

          {/* AI Qualification Badge */}
          <div
            className="mx-4 mb-4 px-3 py-2 rounded-lg text-xs flex items-center gap-2"
            style={{
              background: "#F0FDF4",
              border: "1px solid #BBF7D0",
              color: "#166534",
            }}
          >
            <span aria-hidden="true">🤖</span>
            AI Qualification: Verified — Not spam | Real postcode | Job confirmed
          </div>
        </div>

        {/* Side button detail */}
        <div
          className="absolute right-0 top-28 w-1 h-8 rounded-l-sm"
          style={{ background: "#2D2D44" }}
        />
      </div>
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
