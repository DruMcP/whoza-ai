"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Play, Pause, Volume2 } from "lucide-react"

function trackGA4(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && "gtag" in window) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).gtag("event", event, params)
  }
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

    // If already loaded (readyState >= 2 = HAVE_CURRENT_DATA), set immediately
    if (audio.readyState >= 2 && !isLoaded) {
      setDuration(audio.duration || 64)
      setIsLoaded(true)
    }

    const onTimeUpdate = () => {
      const ct = audio.currentTime
      const dur = audio.duration || 64
      setCurrentTime(ct)
      setProgress((ct / dur) * 100)

      // Track 50% completion
      if (!fiftyPctFired && ct / dur >= 0.5) {
        setFiftyPctFired(true)
        trackGA4("audio_50pct", { audio_name: "katie_demo_leaky_tap" })
      }

      // Engagement time tracking (sum of seconds played)
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
      className="section-padding-lg bg-white relative"
      aria-label="Katie demo audio player"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--navy-900)] mb-4 reveal">
            Hear Katie answer a call
          </h2>
          <p className="text-base sm:text-lg text-[var(--slate-500)] max-w-2xl mx-auto">
            Listen to Katie qualify a leaking tap enquiry and send it straight to WhatsApp — in 64 seconds.
          </p>
        </motion.div>

        {/* Audio Player Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--off-white)] rounded-2xl border border-[var(--border)] p-6 sm:p-8 shadow-sm"
          aria-live="polite"
        >
          {/* Hidden native audio element (lazy loaded) */}
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

          {/* No-JS fallback */}
          <noscript>
            <audio controls className="w-full" preload="none">
              <source src="/audio/katie-demo-leaky-tap.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </noscript>

          {/* Custom Player UI */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              disabled={!isLoaded}
              aria-label={isPlaying ? "Pause demo call" : "Play demo call"}
              className={`
                flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center
                transition-all duration-200 ease-out
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--katie-blue)] focus-visible:ring-offset-2
                min-w-[44px] min-h-[44px]
                ${isLoaded 
                  ? "bg-[var(--katie-blue)] text-white hover:scale-105 active:scale-95 cursor-pointer" 
                  : "bg-[var(--slate-200)] text-[var(--slate-400)] cursor-not-allowed"
                }
              `}
              style={{ touchAction: "manipulation" }}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" fill="currentColor" />
              ) : (
                <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
              )}
            </button>

            {/* Progress + Info */}
            <div className="flex-1 min-w-0">
              {/* Progress Bar */}
              <div
                className="relative h-2 bg-[var(--slate-200)] rounded-full cursor-pointer group"
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
                  className="absolute top-0 left-0 h-full bg-[var(--katie-blue)] rounded-full transition-all"
                  style={{
                    width: `${progress}%`,
                    transitionDuration: "100ms",
                    transitionTimingFunction: "linear",
                  }}
                />
                {/* Hover thumb */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[var(--katie-blue)] rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ left: `calc(${progress}% - 8px)` }}
                />
              </div>

              {/* Time + Duration */}
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-[var(--slate-400)] font-medium tabular-nums">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
                <div className="flex items-center gap-1.5 text-sm text-[var(--slate-400)]">
                  <Volume2 className="w-4 h-4" />
                  <span>1.0 MB</span>
                </div>
              </div>
            </div>
          </div>

          {/* Offline warning */}
          {typeof navigator !== "undefined" && !navigator.onLine && (
            <p className="mt-4 text-sm text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
              Connection required to play audio.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
