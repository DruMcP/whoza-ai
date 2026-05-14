"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Play, Pause, RotateCcw, Volume2, VolumeX, Loader2 } from "lucide-react"

interface KatieAudioPlayerProps {
  isOpen: boolean
  onClose: () => void
}

const TRANSCRIPT_SEGMENTS = [
  { start: 0, end: 6, text: "Hi, you've reached Thompson Plumbing. My name is Katie. How can I help you today?" },
  { start: 6, end: 13, text: "Oh dear, no heating at all? I do understand, especially with the weather we've been having." },
  { start: 13, end: 16, text: "Is it a gas boiler or an electric one?" },
  { start: 16, end: 22, text: "Right, and are you getting any hot water at all, or is it both the heating and the hot water that's gone?" },
  { start: 22, end: 28, text: "Got it. A gas boiler with no heating and no hot water. Let me get this straight over to the engineer." },
  { start: 28, end: 35, text: "What's the best number to reach you on? ... Perfect. You'll hear back within the hour. Thank you for calling Thompson Plumbing." },
]

const TOTAL_DURATION = 35

export function KatieAudioPlayer({ isOpen, onClose }: KatieAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(TOTAL_DURATION)
  const [volume, setVolume] = useState(() => {
    if (typeof window === "undefined") return 0.8
    const saved = localStorage.getItem("whoza_audio_volume")
    return saved ? parseFloat(saved) : 0.8
  })
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [needsTapToPlay, setNeedsTapToPlay] = useState(false)
  const [isEnded, setIsEnded] = useState(false)
  const [activeSegment, setActiveSegment] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const transcriptRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>(0)

  // Check reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  // Initialize audio
  useEffect(() => {
    if (!isOpen) return

    const audio = new Audio("/assets/audio/katie_boiler_enquiry_demo.mp3")
    audio.preload = "metadata"
    audio.volume = isMuted ? 0 : volume
    audioRef.current = audio

    const handleLoaded = () => {
      setIsLoading(false)
      setDuration(audio.duration || TOTAL_DURATION)
      // Try autoplay
      audio.play().catch(() => {
        setNeedsTapToPlay(true)
      })
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
      // Find active segment
      const seg = TRANSCRIPT_SEGMENTS.findIndex(
        (s) => audio.currentTime >= s.start && audio.currentTime < s.end
      )
      if (seg !== -1) setActiveSegment(seg)
    }

    const handlePlay = () => {
      setIsPlaying(true)
      setNeedsTapToPlay(false)
      setIsEnded(false)
    }

    const handlePause = () => setIsPlaying(false)

    const handleEnded = () => {
      setIsPlaying(false)
      setIsEnded(true)
      setCurrentTime(duration)
    }

    const handleError = () => {
      setHasError(true)
      setIsLoading(false)
    }

    audio.addEventListener("loadedmetadata", handleLoaded)
    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("play", handlePlay)
    audio.addEventListener("pause", handlePause)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)

    // If already cached, loadedmetadata might have fired
    if (audio.readyState >= 1) {
      handleLoaded()
    }

    return () => {
      audio.pause()
      audio.currentTime = 0
      audio.removeEventListener("loadedmetadata", handleLoaded)
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
      audioRef.current = null
    }
  }, [isOpen, duration, isMuted, volume])

  // Keyboard controls
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === " " && !e.repeat) {
        e.preventDefault()
        togglePlay()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  // Scroll transcript to active segment
  useEffect(() => {
    if (transcriptRef.current) {
      const activeEl = transcriptRef.current.querySelector(`[data-segment="${activeSegment}"]`)
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }, [activeSegment])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.play().catch(() => setNeedsTapToPlay(true))
    } else {
      audio.pause()
    }
  }, [])

  const rewind10 = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.max(0, audio.currentTime - 10)
    if (audio.paused) audio.play()
  }, [])

  const toggleMute = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isMuted) {
      audio.volume = volume
      setIsMuted(false)
    } else {
      audio.volume = 0
      setIsMuted(true)
    }
  }, [isMuted, volume])

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value)
    setVolume(newVol)
    localStorage.setItem("whoza_audio_volume", String(newVol))
    if (audioRef.current) {
      audioRef.current.volume = newVol
      if (newVol > 0) setIsMuted(false)
    }
  }, [])

  const replay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = 0
    setIsEnded(false)
    setCurrentTime(0)
    audio.play().catch(() => setNeedsTapToPlay(true))
  }, [])

  const retryLoad = useCallback(() => {
    setHasError(false)
    setIsLoading(true)
    // Re-initialize by toggling isOpen... actually just reload the audio
    const audio = new Audio("/assets/audio/katie_boiler_enquiry_demo.mp3")
    audio.preload = "metadata"
    audio.volume = isMuted ? 0 : volume
    audioRef.current = audio
    audio.addEventListener("loadedmetadata", () => {
      setIsLoading(false)
      setDuration(audio.duration || TOTAL_DURATION)
      audio.play().catch(() => setNeedsTapToPlay(true))
    })
    audio.addEventListener("error", () => {
      setHasError(true)
      setIsLoading(false)
    })
  }, [isMuted, volume])

  const formatTime = (t: number) => {
    const mins = Math.floor(t / 60)
    const secs = Math.floor(t % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          className="bg-black/[0.85] backdrop-blur"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative w-full overflow-hidden"
            style={{
              maxWidth: 480,
              background: "#1E2229",
              borderRadius: 16,
              padding: 24,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg transition-colors hover:bg-white/10"
              className="text-gray-500 min-h-[44px] min-w-[44px]"
              aria-label="Close audio player"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Katie Avatar */}
            <div className="flex flex-col items-center mt-2">
              <div className="relative">
                <div
                  className="w-20 h-20 rounded-full overflow-hidden"
                  style={{
                    border: isPlaying && !prefersReducedMotion ? "2px solid #10B981" : "2px solid #374151",
                  }}
                >
                  <img
                    src="/assets/icons/katie-icon.webp"
                    alt="Katie"
                    width="48" height="48"
                    className="w-full h-full object-contain p-1.5"
                    style={{ filter: isLoading ? "grayscale(100%)" : "none" }}
                  />
                </div>
                {isPlaying && !prefersReducedMotion && (
                  <div className="absolute -inset-1 rounded-full border-2 border-emerald-400 animate-ping opacity-40" />
                )}
              </div>

              <p
                className="mt-3 text-base font-medium"
                className="text-emerald-500 font-sans"
              >
                {isLoading ? "Loading Katie's voice…" : isEnded ? "Katie finished" : isPlaying ? "Katie speaking…" : "Katie paused"}
              </p>

              {/* Live indicator */}
              <div className="flex items-center gap-1.5 mt-1">
                {isPlaying && (
                  <>
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                    </span>
                    <span className="text-xs font-medium" className="text-emerald-500">LIVE</span>
                  </>
                )}
              </div>
            </div>

            {/* Waveform */}
            <div className="flex justify-center items-center gap-1 mt-4 h-12">
              {prefersReducedMotion || !isPlaying ? (
                <div className="flex items-center gap-1">
                  {[0.4, 0.7, 1, 0.7, 0.4].map((h, i) => (
                    <div
                      key={i}
                      className="w-1.5 rounded-full bg-emerald-500"
                      style={{ height: `${h * 40}px` }}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-1.5 rounded-full bg-emerald-500"
                      style={{
                        height: "24px",
                        animation: `waveform 0.6s ease-in-out ${i * 0.1}s infinite alternate`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Transcript */}
            <div
              ref={transcriptRef}
              className="mt-4 space-y-2 max-h-32 overflow-y-auto pr-1"
              className="scroll-smooth"
            >
              {TRANSCRIPT_SEGMENTS.map((seg, i) => (
                <p
                  key={i}
                  data-segment={i}
                  className="text-sm leading-relaxed transition-colors duration-300"
                  style={{
                    color: i === activeSegment ? "#FFFFFF" : "#6B7280",
                    fontWeight: i === activeSegment ? 500 : 400,
                    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                  }}
                >
                  {seg.text}
                </p>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <div
                className="w-full h-1 rounded-full overflow-hidden"
                className="bg-white/10"
              >
                <div
                  className="h-full rounded-full transition-all duration-100"
                  style={{
                    width: `${progress}%`,
                    background: "#10B981",
                  }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs" className="text-gray-500 font-sans">
                  {formatTime(currentTime)}
                </span>
                <span className="text-xs" className="text-gray-500 font-sans">
                  {formatTime(duration)}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-4">
              {isLoading ? (
                <div className="flex items-center gap-2 text-sm" className="text-slate-400">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Loading...
                </div>
              ) : hasError ? (
                <div className="text-center">
                  <p className="text-sm mb-2" className="text-slate-400">Sorry, Katie's voice didn't load.</p>
                  <button
                    onClick={retryLoad}
                    className="text-sm font-medium px-4 py-2 rounded-lg"
                    className="text-emerald-500 bg-emerald-500/[0.1]"
                  >
                    Try again
                  </button>
                </div>
              ) : needsTapToPlay ? (
                <button
                  onClick={togglePlay}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white"
                  className="bg-gradient-to-br from-emerald-600 to-emerald-500 min-h-[44px]"
                >
                  <Play className="w-5 h-5" />
                  Tap to play
                </button>
              ) : isEnded ? (
                <button
                  onClick={replay}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white"
                  className="bg-gradient-to-br from-emerald-600 to-emerald-500 min-h-[44px]"
                >
                  <RotateCcw className="w-5 h-5" />
                  Hear it again
                </button>
              ) : (
                <>
                  {/* Rewind */}
                  <button
                    onClick={rewind10}
                    className="p-3 rounded-lg transition-colors hover:bg-white/10"
                    className="text-white min-h-[44px] min-w-[44px]"
                    aria-label="Rewind 10 seconds"
                    title="Rewind 10s"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>

                  {/* Play/Pause */}
                  <button
                    onClick={togglePlay}
                    className="p-3 rounded-full transition-colors"
                    style={{
                      background: "linear-gradient(135deg, #059669, #10B981)",
                      color: "#FFFFFF",
                      minHeight: 48,
                      minWidth: 48,
                    }}
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </button>

                  {/* Volume */}
                  <button
                    onClick={toggleMute}
                    className="p-3 rounded-lg transition-colors hover:bg-white/10"
                    className="text-white min-h-[44px] min-w-[44px]"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                </>
              )}
            </div>

            {/* Volume slider (only show when not loading/error) */}
            {!isLoading && !hasError && !needsTapToPlay && !isEnded && (
              <div className="flex items-center justify-center gap-2 mt-2">
                <VolumeX className="w-3 h-3" className="text-gray-500" />
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-24 h-1 accent-emerald-500"
                  aria-label="Volume"
                />
                <Volume2 className="w-3 h-3" className="text-gray-500" />
              </div>
            )}
          </motion.div>

          <style jsx global>{`
            @keyframes waveform {
              0% { height: 8px; }
              100% { height: 40px; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
