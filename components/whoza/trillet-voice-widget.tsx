"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, PhoneOff, Mic, MicOff } from "lucide-react"

/**
 * Trillet Voice Widget
 * 
 * Embeds "Talk to Katie" voice agent directly on the whoza.ai website.
 * Uses @trillet-ai/web-sdk for real-time voice calls via WebRTC.
 * 
 * Requirements:
 * - HTTPS or localhost (secure context)
 * - Microphone permission
 * - Modern browser with WebRTC
 */

interface TrilletVoiceWidgetProps {
  workspaceId?: string
  agentId?: string
  buttonLabel?: string
}

export function TrilletVoiceWidget({
  workspaceId = "whoza-workspace",
  agentId = "katie-agent",
  buttonLabel = "Talk to Katie"
}: TrilletVoiceWidgetProps) {
  const [isCallActive, setIsCallActive] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [transcript, setTranscript] = useState<string[]>([])
  const agentRef = useRef<any>(null)

  // Dynamic import to avoid SSR issues
  useEffect(() => {
    let TrilletAgent: any

    const initAgent = async () => {
      try {
        const module = await import("@trillet-ai/web-sdk")
        TrilletAgent = module.TrilletAgent

        agentRef.current = new TrilletAgent({
          workspaceId,
          agentId,
          mode: "voice",
        })

        // Event listeners
        agentRef.current.on("connected", (details: any) => {
          // Trillet connected successfully
          setIsConnecting(false)
          setIsCallActive(true)
        })

        agentRef.current.on("disconnected", () => {
          // Trillet disconnected
          setIsCallActive(false)
          setIsConnecting(false)
        })

        agentRef.current.on("error", (err: any) => {
          setError("Call failed. Please try again.")
          setIsConnecting(false)
          setIsCallActive(false)
        })

        agentRef.current.on("transcriptionReceived", (t: any) => {
          setTranscript((prev) => [...prev, t.text || t])
        })

      } catch (err) {
        setError("Voice agent unavailable")
      }
    }

    initAgent()

    return () => {
      if (agentRef.current) {
        agentRef.current.endCall()
      }
    }
  }, [workspaceId, agentId])

  const startCall = async () => {
    if (!agentRef.current) {
      setError("Voice agent not loaded")
      return
    }

    setError(null)
    setIsConnecting(true)
    setTranscript([])

    try {
      await agentRef.current.startPublicCall()
    } catch (err) {
      setError("Could not start call. Please try again.")
      setIsConnecting(false)
    }
  }

  const endCall = () => {
    if (agentRef.current) {
      agentRef.current.endCall()
    }
    setIsCallActive(false)
    setIsConnecting(false)
  }

  const toggleMute = () => {
    if (agentRef.current) {
      agentRef.current.toggleMicrophone(isMuted)
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="relative">
      {/* Main Button */}
      <AnimatePresence mode="wait">
        {!isCallActive && !isConnecting && (
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={startCall}
            className="flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--rex-green)] text-white font-bold text-lg shadow-2xl shadow-[var(--rex-green)]/40 hover:scale-105 transition-transform"
          >
            <Phone className="w-6 h-6" />
            {buttonLabel}
          </motion.button>
        )}

        {isConnecting && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--navy-900)] text-white font-bold text-lg border border-white/20"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--rex-green)] animate-pulse" />
            Connecting to Katie...
          </motion.div>
        )}

        {isCallActive && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col gap-3 p-4 rounded-2xl bg-[var(--navy-900)] border border-white/20 min-w-[300px]"
          >
            {/* Call Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                <span className="text-white font-semibold">Live Call with Katie</span>
              </div>
              <div className="text-white/60 text-sm">00:00</div>
            </div>

            {/* Transcript */}
            <div className="max-h-32 overflow-y-auto space-y-1">
              {transcript.map((t, i) => (
                <p key={i} className="text-sm text-white/80">{t}</p>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                onClick={toggleMute}
                className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              <button
                onClick={endCall}
                className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                <PhoneOff className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-sm text-center"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
