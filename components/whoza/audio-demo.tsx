"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, RotateCcw, ArrowRight, Headphones, MessageSquare, ClipboardCheck, PhoneIncoming } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

const flowSteps = [
  {
    icon: PhoneIncoming,
    title: "Katie answers professionally",
    description: "Every call is greeted with your business name",
  },
  {
    icon: MessageSquare,
    title: "The customer explains the issue",
    description: "Katie listens and asks the right follow-up questions",
  },
  {
    icon: ClipboardCheck,
    title: "Katie captures the details",
    description: "Urgency, postcode and contact info are collected",
  },
  {
    icon: Headphones,
    title: "Enquiry sent to your phone",
    description: "You decide: Accept, Call Back or Decline",
  },
]

export function AudioDemo() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const handleEnded = () => setIsPlaying(false)
    const handleLoaded = () => setDuration(audio.duration || 0)

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("loadedmetadata", handleLoaded)
    audio.addEventListener("canplaythrough", handleLoaded)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("loadedmetadata", handleLoaded)
      audio.removeEventListener("canplaythrough", handleLoaded)
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play().catch(() => {})
    }
    setIsPlaying(!isPlaying)
  }

  const reset = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    audio.currentTime = 0
    setIsPlaying(false)
    setCurrentTime(0)
  }

  const handleSeek = ([value]: number[]) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = value
    setCurrentTime(value)
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <section className="py-20 lg:py-28 bg-[var(--navy-900)] dark-section">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--katie-blue)]/20 text-[var(--katie-blue)] text-sm font-medium mb-4">
            Listen Now
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance reveal">
            Hear Katie handle a{" "}
            <span className="text-[var(--katie-blue)]">customer enquiry</span>
          </h2>
          <p className="mt-6 text-lg text-white/60 max-w-2xl mx-auto">
            Listen to a short example of how Whoza answers, qualifies and sends an enquiry straight to your phone.
          </p>
        </motion.div>

        {/* Audio Player Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--navy-800)] rounded-3xl p-6 lg:p-8 border border-white/10 shadow-xl mb-10"
        >
          {/* Hidden audio element */}
          <audio
            ref={audioRef}
            src="/audio/whoza_katie_customer_enquiry_demo_final.mp3"
            preload="metadata"
            controlsList="nodownload"
          />

          {/* Player Controls */}
          <div className="flex items-center gap-4 mb-4">
            <Button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="w-14 h-14 rounded-full bg-[var(--katie-blue)] hover:bg-[var(--katie-blue)]/90 p-0 shrink-0 transition-transform active:scale-95"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white ml-1" />
              )}
            </Button>

            <div className="flex-1 min-w-0">
              <Slider
                value={[currentTime]}
                onValueChange={handleSeek}
                max={duration || 1}
                step={0.1}
                className="[&_[role=slider]]:bg-[var(--katie-blue)] [&_[role=slider]]:border-0 [&_.bg-primary]:bg-[var(--katie-blue)]"
              />
              <div className="flex justify-between text-xs text-white/40 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
              className="p-2 text-white/60 hover:text-white transition-colors shrink-0"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            <button
              onClick={reset}
              aria-label="Restart audio"
              className="p-2 text-white/60 hover:text-white transition-colors shrink-0"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

          {/* 4-step flow */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6 reveal-stagger">
            {flowSteps.map((step, index) => {
              const StepIcon = step.icon
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="w-8 h-8 rounded-lg bg-[var(--katie-blue)]/20 flex items-center justify-center shrink-0 mt-0.5"
                  >
                    <StepIcon className="w-4 h-4 text-[var(--katie-blue)]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white/90 leading-tight">{step.title}</p>
                    <p className="text-xs text-white/50 mt-0.5 leading-snug">{step.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Trust line */}
          <div className="mt-5 pt-4 border-t border-white/10">
            <p className="text-xs text-white/40 text-center">
              Example AI conversation for demonstration purposes.
              {" "}<span className="text-white/60">
                Your own assistant name, voice and greeting can be customised during setup.
              </span>
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="#final-cta"
            className="inline-flex items-center justify-center rounded-lg bg-[var(--katie-blue)] hover:bg-[var(--katie-blue)]/90 text-white font-semibold px-8 h-12 text-base transition-colors"
          >
            Get Katie answering my calls
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
          <p className="mt-4 text-sm text-white/50">
            <a href="#how-it-works" className="underline hover:text-white/70 transition-colors">
              See how setup works
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
