"use client"

import { useRef, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { X, Play, Pause } from "lucide-react"

interface AudioModalProps {
  onClose: () => void
}

export function AudioModal({ onClose }: AudioModalProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const progressInterval = useRef<ReturnType<typeof setInterval>>()

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
      if (progressInterval.current) clearInterval(progressInterval.current)
    } else {
      audioRef.current.play().catch(() => {})
      setIsPlaying(true)
      progressInterval.current = setInterval(() => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime)
        }
      }, 100)
    }
  }, [isPlaying])

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }, [])

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }, [])

  const handleEnded = useCallback(() => {
    setIsPlaying(false)
    setCurrentTime(0)
    if (progressInterval.current) clearInterval(progressInterval.current)
  }, [])

  const formatTime = useCallback((t: number) => {
    const m = Math.floor(t / 60)
    const s = Math.floor(t % 60)
    return `${m}:${s.toString().padStart(2, "0")}`
  }, [])

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="audio-title"
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative w-full"
        style={{
          maxWidth: 420,
          background: "#1E2229",
          borderRadius: 16,
          padding: 32,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg transition-colors hover:bg-white/10"
          style={{ color: "#9CA3AF", minHeight: 48, minWidth: 48 }}
          aria-label="Close audio modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <h2
          id="audio-title"
          className="text-xl font-bold pr-8"
          style={{ color: "#FFFFFF", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          Hear Katie handle a boiler enquiry
        </h2>
        <p className="mt-1" style={{ fontSize: 14, color: "#9CA3AF", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}>
          Real AI voice demo — 30 seconds
        </p>

        {/* Audio Player */}
        <div className="mt-6 space-y-4">
          {/* Hidden audio element — no autoplay */}
          <audio
            ref={audioRef}
            src="/audio/katie-boiler-demo.mp3"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleEnded}
            preload="metadata"
          />

          {/* Play button */}
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="flex items-center justify-center rounded-full transition-all hover:scale-105 active:scale-95"
              style={{
                width: 56,
                height: 56,
                background: "linear-gradient(135deg, #059669, #10B981)",
                minHeight: 48,
                minWidth: 48,
              }}
              aria-label={isPlaying ? "Pause demo" : "Play demo"}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white fill-white ml-1" />
              )}
            </button>

            {/* Waveform visual */}
            <div className="flex-1 flex items-center gap-[2px] h-10">
              {Array.from({ length: 40 }).map((_, i) => {
                const isActive = isPlaying && (i / 40) * duration <= currentTime
                const height = 20 + Math.sin(i * 0.8) * 15 + Math.random() * 10
                return (
                  <div
                    key={i}
                    className="rounded-full transition-colors duration-150"
                    style={{
                      width: 3,
                      height: Math.max(4, height),
                      background: isActive ? "#10B981" : "rgba(255,255,255,0.15)",
                    }}
                  />
                )
              })}
            </div>
          </div>

          {/* Progress bar + time */}
          <div className="flex items-center gap-3">
            <span style={{ fontSize: 12, color: "#6B7280", fontVariantNumeric: "tabular-nums" }}>
              {formatTime(currentTime)}
            </span>
            <div className="flex-1 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${progress}%`, background: "#10B981" }}
              />
            </div>
            <span style={{ fontSize: 12, color: "#6B7280", fontVariantNumeric: "tabular-nums" }}>
              {formatTime(duration || 30)}
            </span>
          </div>

          {/* Fallback note if audio file doesn't exist */}
          <p style={{ fontSize: 12, color: "#6B7280", fontStyle: "italic" }}>
            Note: Place your demo audio file at /public/audio/katie-boiler-demo.mp3
          </p>
        </div>

        {/* CTA after listening */}
        <div className="mt-6 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 font-semibold text-white transition-all hover:scale-[1.01] active:scale-[0.99]"
            style={{
              background: "linear-gradient(135deg, #059669, #10B981)",
              height: 48,
              borderRadius: 12,
              fontSize: 15,
              fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            Get Katie answering my calls
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
