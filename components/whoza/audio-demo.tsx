"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

const transcript = [
  { time: 0, speaker: "Katie", text: "Good morning, Thompson Plumbing, Katie speaking. How can I help you today?" },
  { time: 4, speaker: "Customer", text: "Hi, I've got a leaky tap in my kitchen." },
  { time: 7, speaker: "Katie", text: "Oh, a leaky tap? I can definitely help you get that sorted." },
  { time: 11, speaker: "Customer", text: "Are you available for a visit this week?" },
  { time: 14, speaker: "Katie", text: "Perfect, I've got 2 p.m. available tomorrow." },
  { time: 18, speaker: "Customer", text: "That works great." },
  { time: 20, speaker: "Katie", text: "Lovely! I've booked you in. Dave will see you tomorrow at 2 p.m." },
  { time: 25, speaker: "Customer", text: "Brilliant, thank you!" },
  { time: 27, speaker: "Katie", text: "Have a lovely day! Goodbye." },
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
    const handleLoaded = () => setDuration(audio.duration || 30)

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
      audio.play()
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

  const activeTranscriptIndex = transcript.findIndex(
    (item, index) => {
      const nextItem = transcript[index + 1]
      return currentTime >= item.time && (!nextItem || currentTime < nextItem.time)
    }
  )

  return (
    <section className="py-20 lg:py-32 bg-[var(--navy-900)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance">
            Hear Whoza in Action
          </h2>
          <p className="mt-6 text-lg text-white/60">
            This is exactly what your customers hear when they call you.
          </p>
        </motion.div>

        {/* Audio Player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--navy-800)] rounded-3xl p-6 lg:p-8 border border-white/10"
        >
          {/* Hidden audio element */}
          <audio
            ref={audioRef}
            src="/audio/katie-demo.mp3"
            preload="metadata"
          />

          {/* Controls */}
          <div className="flex items-center gap-4 mb-6">
            <Button
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-[var(--katie-blue)] hover:bg-[var(--katie-blue)]/90 p-0"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white ml-1" />
              )}
            </Button>

            <div className="flex-1">
              <Slider
                value={[currentTime]}
                onValueChange={handleSeek}
                max={duration || 30}
                step={0.1}
                className="[&_[role=slider]]:bg-[var(--katie-blue)] [&_[role=slider]]:border-0 [&_.bg-primary]:bg-[var(--katie-blue)]"
              />
              <div className="flex justify-between text-xs text-white/40 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration || 30)}</span>
              </div>
            </div>

            <button
              onClick={toggleMute}
              className="p-2 text-white/60 hover:text-white transition-colors"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            <button
              onClick={reset}
              className="p-2 text-white/60 hover:text-white transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

          {/* Transcript */}
          <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
            {transcript.map((item, index) => (
              <motion.div
                key={item.time}
                initial={{ opacity: 0.4 }}
                animate={{ 
                  opacity: index === activeTranscriptIndex ? 1 : 0.4,
                  scale: index === activeTranscriptIndex ? 1.02 : 1,
                }}
                className={`p-4 rounded-xl transition-colors ${
                  item.speaker === "Katie"
                    ? "bg-[var(--katie-blue)]/10 border border-[var(--katie-blue)]/20"
                    : "bg-white/5 border border-white/10"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-semibold ${
                    item.speaker === "Katie" ? "text-[var(--katie-blue)]" : "text-white/60"
                  }`}>
                    {item.speaker}
                  </span>
                  <span className="text-xs text-white/30">{formatTime(item.time)}</span>
                </div>
                <p className="text-white/90 text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Result line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-lg text-white/80 font-semibold">
            Calls answered. Enquiries booked. Sent to your phone.
          </p>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-white/40 text-sm mt-6"
        >
          * This is a representative transcript. Actual AI conversations sound just as natural.
        </motion.p>
      </div>
    </section>
  )
}
