"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Volume2, Sparkles, MessageCircle, ChevronRight } from "lucide-react"

function trackGA4(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && "gtag" in window) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).gtag("event", event, params)
  }
}

/* ─── Animated waveform bars ─── */
function WaveformBars({ isPlaying }: { isPlaying: boolean }) {
  const bars = 24
  return (
    <div className="flex items-center justify-center gap-[3px] h-16">
      {Array.from({ length: bars }).map((_, i) => {
        const delay = i * 0.05
        const duration = 0.4 + Math.random() * 0.4
        return (
          <motion.div
            key={i}
            className="w-[3px] rounded-full bg-gradient-to-t from-[var(--katie-blue)] to-cyan-300"
            animate={
              isPlaying
                ? {
                    height: [8, 24 + Math.random() * 32, 12, 36, 8],
                    opacity: [0.6, 1, 0.8, 1, 0.6],
                  }
                : { height: 8, opacity: 0.3 }
            }
            transition={
              isPlaying
                ? {
                    duration,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay,
                    ease: "easeInOut",
                  }
                : { duration: 0.3 }
            }
            style={{ minHeight: 4 }}
          />
        )
      })}
    </div>
  )
}

/* ─── Pulsing ring behind play button ─── */
function PulseRings({ isPlaying }: { isPlaying: boolean }) {
  if (!isPlaying) return null
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border-2 border-[var(--katie-blue)]/30"
          initial={{ width: 64, height: 64, opacity: 0.6 }}
          animate={{
            width: [64, 120, 160],
            height: [64, 120, 160],
            opacity: [0.5, 0.2, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}

export function AudioDemo() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(64)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [fiftyPctFired, setFiftyPctFired] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const engagementTimeRef = useRef(0)
  const lastTickRef = useRef(0)

  // Lazy load audio via Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.readyState >= 2 && !isLoaded) {
      setDuration(audio.duration || 64)
      setIsLoaded(true)
    }

    const onTimeUpdate = () => {
      const ct = audio.currentTime
      const dur = audio.duration || 64
      setCurrentTime(ct)
      setProgress((ct / dur) * 100)

      if (!fiftyPctFired && ct / dur >= 0.5) {
        setFiftyPctFired(true)
        trackGA4("audio_50pct", { audio_name: "katie_demo_leaky_tap" })
      }

      if (lastTickRef.current > 0) {
        const delta = ct - lastTickRef.current
        if (delta > 0 && delta < 1) {
          engagementTimeRef.current += delta
        }
      }
      lastTickRef.current = ct
    }

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 64)
      setIsLoaded(true)
    }

    const onEnded = () => {
      setIsPlaying(false)
      setProgress(100)
      trackGA4("audio_complete", {
        audio_name: "katie_demo_leaky_tap",
        engagement_time: Math.round(engagementTimeRef.current),
      })
    }

    const onError = () => {
      setIsPlaying(false)
    }

    audio.addEventListener("timeupdate", onTimeUpdate)
    audio.addEventListener("loadedmetadata", onLoadedMetadata)
    audio.addEventListener("ended", onEnded)
    audio.addEventListener("error", onError)

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate)
      audio.removeEventListener("loadedmetadata", onLoadedMetadata)
      audio.removeEventListener("ended", onEnded)
      audio.removeEventListener("error", onError)
    }
  }, [fiftyPctFired, isVisible, isLoaded])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !isLoaded) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().then(() => {
        setIsPlaying(true)
        if (!hasStarted) {
          setHasStarted(true)
          trackGA4("audio_play", {
            audio_name: "katie_demo_leaky_tap",
            duration_seconds: Math.round(duration),
          })
        }
      }).catch(() => {
        setIsPlaying(false)
      })
    }
  }, [isPlaying, isLoaded, hasStarted, duration])

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio || !isLoaded) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    const newTime = pct * (audio.duration || duration)
    audio.currentTime = newTime
    setCurrentTime(newTime)
    setProgress(pct * 100)
  }, [isLoaded, duration])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  return (
    <section
      ref={sectionRef}
      id="katie-demo-audio"
      className="section-padding-lg relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)" }}
      aria-label="Katie demo audio player"
    >
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--katie-blue)]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--katie-blue)]/10 border border-[var(--katie-blue)]/20 text-[var(--katie-blue)] text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            AI Voice Demo
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Hear Katie answer a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--katie-blue)] to-cyan-300">
              real call
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Listen to Katie qualify a leaking tap enquiry and send it straight to WhatsApp — in 64 seconds.
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
        >
          {/* Hidden native audio element */}
          {isVisible && (
            <audio
              ref={audioRef}
              src="/audio/katie-demo-leaky-tap.mp3"
              preload="metadata"
              crossOrigin="anonymous"
              className="hidden"
              aria-hidden="true"
            />
          )}

          <noscript>
            <audio controls className="w-full" preload="none">
              <source src="/audio/katie-demo-leaky-tap.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </noscript>

          {/* Top: Waveform + Play Controls */}
          <div className="p-6 sm:p-8 border-b border-white/10">
            <div className="flex items-center gap-6">
              {/* Play Button with Pulse Rings */}
              <div className="relative flex-shrink-0">
                <PulseRings isPlaying={isPlaying} />
                <button
                  onClick={togglePlay}
                  disabled={!isLoaded}
                  aria-label={isPlaying ? "Pause demo call" : "Play demo call"}
                  className={`
                    relative z-10 w-20 h-20 rounded-full flex items-center justify-center
                    transition-all duration-300 ease-out
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--katie-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f172a]
                    ${isLoaded
                      ? isPlaying
                        ? "bg-gradient-to-br from-[var(--katie-blue)] to-cyan-400 text-white shadow-lg shadow-[var(--katie-blue)]/30 hover:scale-105 active:scale-95 cursor-pointer"
                        : "bg-white text-[var(--navy-900)] hover:scale-105 active:scale-95 cursor-pointer shadow-xl"
                      : "bg-white/10 text-white/30 cursor-not-allowed"
                    }
                  `}
                  style={{ touchAction: "manipulation" }}
                >
                  <AnimatePresence mode="wait">
                    {isPlaying ? (
                      <motion.div
                        key="pause"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Pause className="w-8 h-8" fill="currentColor" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="play"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Play className="w-8 h-8 ml-1" fill="currentColor" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              {/* Waveform + Progress */}
              <div className="flex-1 min-w-0">
                {/* Animated Waveform */}
                <WaveformBars isPlaying={isPlaying} />

                {/* Progress Bar */}
                <div
                  className="relative h-2 bg-white/10 rounded-full cursor-pointer group mt-2"
                  onClick={handleSeek}
                  role="slider"
                  aria-label="Audio progress"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(progress)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                      e.preventDefault()
                      const audio = audioRef.current
                      if (!audio) return
                      const delta = e.key === "ArrowLeft" ? -5 : 5
                      const newTime = Math.max(0, Math.min(audio.duration || duration, currentTime + delta))
                      audio.currentTime = newTime
                    }
                  }}
                >
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[var(--katie-blue)] to-cyan-300 rounded-full transition-all"
                    style={{
                      width: `${progress}%`,
                      transitionDuration: "100ms",
                      transitionTimingFunction: "linear",
                    }}
                  />
                  {/* Glow thumb */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-lg shadow-[var(--katie-blue)]/50 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ left: `calc(${progress}% - 10px)` }}
                  />
                </div>

                {/* Time + Info */}
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm text-slate-400 font-medium tabular-nums">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Volume2 className="w-4 h-4" />
                    <span>Demo call · 1.0 MB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom: Info only, no transcript */}
          <div className="p-6 sm:p-8 bg-gradient-to-b from-white/5 to-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  {isPlaying && (
                    <motion.div
                      className="absolute inset-0 w-2 h-2 rounded-full bg-green-400"
                      animate={{ scale: [1, 2.5, 1], opacity: [0.8, 0, 0.8] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </div>
                <span className="text-sm font-medium text-slate-300">
                  {isPlaying ? "Katie is speaking..." : hasStarted ? "Demo paused" : "Press play to start"}
                </span>
              </div>
              <span className="text-sm text-slate-500">
                64-second demo call
              </span>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <p className="text-slate-400 text-sm mb-4">
            That was a 64-second call. Katie captured the issue, location, and availability — then sent it to WhatsApp.
          </p>
          <a
            href="#final-cta"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--katie-blue)] to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-[var(--katie-blue)]/20 transition-all hover:scale-105"
          >
            <MessageCircle className="w-4 h-4" />
            Get Katie for your business
            <ChevronRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
