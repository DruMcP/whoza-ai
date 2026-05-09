"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface MissedCallSimulatorProps {
  className?: string
}

type SimulatorState = 0 | 1 | 2 | 3

const TRANSITIONS = [2500, 4500, 6500, 8000] as const

export function MissedCallSimulator({ className = "" }: MissedCallSimulatorProps) {
  const [state, setState] = useState<SimulatorState>(0)
  const [isRunning, setIsRunning] = useState(true)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }, [])

  const startSequence = useCallback(() => {
    clearAllTimers()
    setState(0)
    setIsRunning(true)

    const timers = TRANSITIONS.map((delay, idx) =>
      setTimeout(() => {
        setState(idx as SimulatorState)
        if (idx === 3) {
          setIsRunning(false)
        }
      }, delay)
    )
    timersRef.current = timers
  }, [clearAllTimers])

  useEffect(() => {
    startSequence()
    return () => clearAllTimers()
  }, [startSequence, clearAllTimers])

  const handleReplay = useCallback(() => {
    startSequence()
  }, [startSequence])

  const handleSeeKatieAnswer = useCallback(() => {
    clearAllTimers()
    setState(1)
    const t1 = setTimeout(() => setState(2), 2000)
    const t2 = setTimeout(() => setState(3), 4000)
    const t3 = setTimeout(() => setIsRunning(false), 4000)
    timersRef.current = [t1, t2, t3]
  }, [clearAllTimers])

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-[360px] mx-auto ${className}`}
      style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}
      aria-label="Missed call simulator demo"
    >
      {/* Card Container */}
      <div
        className="rounded-2xl p-5 relative overflow-hidden"
        style={{
          background: "#1E2229",
          border: "1px solid rgba(255,255,255,0.06)",
          minHeight: 220,
        }}
      >
        {/* State 0: Ringing */}
        {state === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 py-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl" aria-hidden="true">📞</span>
              <span
                className="font-semibold"
                style={{ color: "#EF4444", fontSize: 16 }}
              >
                Missed call
              </span>
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "#EF4444" }}
                aria-hidden="true"
              />
            </div>
            <p style={{ fontSize: 14, color: "#9CA3AF" }}>
              2 missed calls today
            </p>
            <button
              onClick={handleSeeKatieAnswer}
              className="px-5 py-2.5 rounded-lg font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #059669, #10B981)",
                color: "#FFFFFF",
                fontSize: 14,
                minHeight: 48,
              }}
            >
              See Katie answer
            </button>
          </div>
        )}

        {/* State 1: Answered by Katie */}
        {state === 1 && (
          <div className="flex flex-col gap-3 py-2">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: "#10B981" }}
                aria-hidden="true"
              />
              <span className="font-medium" style={{ color: "#10B981", fontSize: 14 }}>
                Answered by Katie
              </span>
            </div>
            <div className="space-y-2">
              <div
                className="rounded-lg p-3"
                style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)" }}
              >
                <p style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 4 }}>
                  Katie speaking. How can I help?
                </p>
                <div className="flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-[#10B981] animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1 h-1 rounded-full bg-[#10B981] animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1 h-1 rounded-full bg-[#10B981] animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
              <div
                className="rounded-lg p-3 ml-4"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <p style={{ fontSize: 13, color: "#D1D5DB" }}>
                  Hi, my boiler&apos;s making a weird noise and we&apos;ve got no hot water. I need someone today if possible.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* State 2: WhatsApp Enquiry Card */}
        {state === 2 && (
          <div className="flex flex-col gap-3 py-1">
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 1C4.134 1 1 4.134 1 8c0 1.413.423 2.726 1.147 3.822L1.5 15l3.178-.647A6.966 6.966 0 008 15c3.866 0 7-3.134 7-7s-3.134-7-7-7z" stroke="#10B981" strokeWidth="1.2" fill="none"/>
                <path d="M5 8.5l1.5 1.5 3.5-3.5" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
              <span style={{ fontSize: 13, color: "#10B981", fontWeight: 500 }}>
                New enquiry — WhatsApp
              </span>
            </div>
            <div
              className="rounded-xl p-4 space-y-2.5"
              style={{
                background: "#111418",
                border: "1px solid rgba(16,185,129,0.2)",
              }}
            >
              <div className="flex items-center gap-2">
                <span style={{ fontSize: 13, color: "#6B7280", fontWeight: 500, minWidth: 60 }}>Name</span>
                <span style={{ fontSize: 13, color: "#FFFFFF" }}>Sarah Mitchell</span>
              </div>
              <div className="flex items-center gap-2">
                <span style={{ fontSize: 13, color: "#6B7280", fontWeight: 500, minWidth: 60 }}>Area</span>
                <span style={{ fontSize: 13, color: "#FFFFFF" }}>Bristol, BS3</span>
              </div>
              <div className="flex items-center gap-2">
                <span style={{ fontSize: 13, color: "#6B7280", fontWeight: 500, minWidth: 60 }}>Issue</span>
                <span style={{ fontSize: 13, color: "#FFFFFF" }}>No hot water — boiler fault</span>
              </div>
              <div className="flex items-center gap-2">
                <span style={{ fontSize: 13, color: "#6B7280", fontWeight: 500, minWidth: 60 }}>Urgency</span>
                <span style={{ fontSize: 13, color: "#F59E0B" }}>Today</span>
              </div>
              <div className="flex items-center gap-2">
                <span style={{ fontSize: 13, color: "#6B7280", fontWeight: 500, minWidth: 60 }}>Est. Value</span>
                <span style={{ fontSize: 13, color: "#FFFFFF", fontWeight: 600 }}>£180-240</span>
              </div>
              <div className="flex gap-2 pt-1">
                <span
                  className="px-3 py-1.5 rounded-md text-xs font-medium"
                  style={{ background: "rgba(16,185,129,0.15)", color: "#10B981" }}
                >
                  Accept
                </span>
                <span
                  className="px-3 py-1.5 rounded-md text-xs font-medium"
                  style={{ background: "rgba(59,130,246,0.15)", color: "#60A5FA" }}
                >
                  Call Back
                </span>
                <span
                  className="px-3 py-1.5 rounded-md text-xs font-medium"
                  style={{ background: "rgba(239,68,68,0.15)", color: "#EF4444" }}
                >
                  Decline
                </span>
              </div>
            </div>
          </div>
        )}

        {/* State 3: Result + CTA */}
        {state === 3 && (
          <div className="flex flex-col items-center justify-center gap-4 py-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: "rgba(16,185,129,0.15)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12l5 5L20 7" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-center font-medium" style={{ fontSize: 16, color: "#FFFFFF" }}>
              Job captured in 8 seconds
            </p>
            <p className="text-center" style={{ fontSize: 13, color: "#9CA3AF" }}>
              Katie qualified the enquiry, estimated value and sent it to WhatsApp — ready to accept.
            </p>
            <button
              onClick={handleReplay}
              className="px-5 py-2.5 rounded-lg font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #059669, #10B981)",
                color: "#FFFFFF",
                fontSize: 14,
                minHeight: 48,
              }}
            >
              Watch again
            </button>
          </div>
        )}
      </div>

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 mt-3">
        {[0, 1, 2, 3].map((s) => (
          <button
            key={s}
            onClick={() => {
              clearAllTimers()
              setState(s as SimulatorState)
              if (s === 3) setIsRunning(false)
            }}
            className="transition-all"
            style={{
              width: state === s ? 20 : 8,
              height: 8,
              borderRadius: 4,
              background: state === s ? "#10B981" : "rgba(255,255,255,0.15)",
            }}
            aria-label={`Go to simulator state ${s + 1}`}
          />
        ))}
      </div>

      {/* Auto-restart after 10s when finished */}
      {!isRunning && state === 3 && (
        <RestartTimer onRestart={startSequence} />
      )}
    </div>
  )
}

function RestartTimer({ onRestart }: { onRestart: () => void }) {
  useEffect(() => {
    const t = setTimeout(onRestart, 10000)
    return () => clearTimeout(t)
  }, [onRestart])
  return null
}
