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
      className={`relative w-full max-w-[360px] mx-auto font-sans ${className}`}
      aria-label="Missed call simulator demo"
    >
      {/* Card Container */}
      <div
        className="rounded-2xl p-5 relative overflow-hidden bg-[#1E2229] border border-white/[0.06] min-h-[220px]"
      >
        {/* State 0: Ringing */}
        {state === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 py-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl" aria-hidden="true">📞</span>
              <span className="font-semibold text-base text-red-500">
                Missed call
              </span>
            <span className="w-2 h-2 rounded-full animate-pulse bg-red-500" aria-hidden="true" />
            </div>
            <p className="text-sm text-slate-400">
              Sarah — Boiler repair
            </p>
            <button
              onClick={handleSeeKatieAnswer}
              className="px-5 py-2.5 rounded-lg font-medium transition-all hover:scale-[1.02] active:scale-[0.98] text-white text-sm min-h-[48px]"
              style={{
                background: "linear-gradient(135deg, #059669, #10B981)",
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
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" aria-hidden="true" />
              <span className="font-medium text-emerald-500 text-sm">
                Answered by Katie
              </span>
            </div>
            <div className="space-y-2">
              <div className="rounded-lg p-3 bg-emerald-500/[0.08] border border-emerald-500/[0.15]">
                <p className="text-[13px] text-slate-400 mb-1">
                  Katie speaking. How can I help?
                </p>
                <div className="flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-[#10B981] animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1 h-1 rounded-full bg-[#10B981] animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1 h-1 rounded-full bg-[#10B981] animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
              <div className="rounded-lg p-3 ml-4 bg-white/[0.04] border border-white/[0.06]">
                <p className="text-[13px] text-gray-300">
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
              <span className="text-[13px] text-emerald-500 font-medium">
                New enquiry — WhatsApp
              </span>
            </div>
            <div
              className="rounded-xl p-4 space-y-2.5 bg-[#111418]"
              style={{
                border: "1px solid rgba(16,185,129,0.2)",
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-gray-500 font-medium min-w-[60px]">Name</span>
                <span className="text-[13px] text-white">Sarah Mitchell</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-gray-500 font-medium min-w-[60px]">Area</span>
                <span className="text-[13px] text-white">Bristol, BS3</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-gray-500 font-medium min-w-[60px]">Issue</span>
                <span className="text-[13px] text-white">No hot water — boiler fault</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-gray-500 font-medium min-w-[60px]">Urgency</span>
                <span className="text-[13px] text-amber-500">Today</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-gray-500 font-medium min-w-[60px]">Est. Value</span>
                <span className="text-[13px] text-white font-semibold">£180-240</span>
              </div>
              <div className="flex gap-2 pt-1">
                <span className="px-3 py-1.5 rounded-md text-xs font-medium bg-emerald-500/[0.15] text-emerald-500">
                  Accept
                </span>
                <span className="px-3 py-1.5 rounded-md text-xs font-medium bg-blue-500/[0.15] text-blue-400">
                  Call Back
                </span>
                <span className="px-3 py-1.5 rounded-md text-xs font-medium bg-red-500/[0.15] text-red-500">
                  Decline
                </span>
              </div>
            </div>
          </div>
        )}

        {/* State 3: Result + CTA */}
        {state === 3 && (
          <div className="flex flex-col items-center justify-center gap-4 py-4">
            <p className="text-center text-lg text-slate-400">
              That enquiry would have been missed. Katie captured it.
            </p>
            <button
              onClick={handleReplay}
              className="px-5 py-2.5 rounded-lg font-medium transition-all hover:scale-[1.02] active:scale-[0.98] text-white text-sm min-h-[48px]"
              style={{
                background: "linear-gradient(135deg, #059669, #10B981)",
              }}
            >
              Get Katie answering my calls
            </button>
            <p className="text-[13px] text-gray-500">
              Try Katie free for 7 days · No card required · Works with your existing number
            </p>
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
