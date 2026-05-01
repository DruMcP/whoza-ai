"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

const transcript = [
  { time: 0, speaker: "Katie", text: "Good morning, Thompson Plumbing, Katie speaking. How can I help you today?" },
  { time: 3, speaker: "Customer", text: "Hi, I've got a leaky tap in my kitchen that's been dripping for a few days now." },
  { time: 8, speaker: "Katie", text: "Oh no, that's frustrating! I can definitely help you get that sorted. Are you available for a visit this week?" },
  { time: 14, speaker: "Customer", text: "Yeah, tomorrow afternoon would be ideal if possible?" },
  { time: 18, speaker: "Katie", text: "Let me check Dave's calendar... Perfect, I've got 2pm or 4pm available tomorrow. Which works better for you?" },
  { time: 24, speaker: "Customer", text: "2pm would be great." },
  { time: 26, speaker: "Katie", text: "Lovely! I've booked you in for 2pm tomorrow. Can I take your address and a contact number?" },
  { time: 32, speaker: "Customer", text: "Sure, it's 42 Oak Street, Manchester, M4 5PQ. And my number is 07700 900123." },
  { time: 40, speaker: "Katie", text: "Perfect! You'll receive a confirmation text shortly. Dave will see you tomorrow at 2pm. Is there anything else I can help with?" },
  { time: 48, speaker: "Customer", text: "No, that's everything. Thank you!" },
  { time: 51, speaker: "Katie", text: "Brilliant, have a lovely day! Goodbye." },
]

export function AudioDemo() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const totalDuration = 54 // seconds

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false)
            return 0
          }
          return prev + 0.1
        })
      }, 100)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPlaying])

  const togglePlay = () => setIsPlaying(!isPlaying)
  const reset = () => {
    setIsPlaying(false)
    setCurrentTime(0)
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
            Hear Katie in Action
          </h2>
          <p className="mt-6 text-lg text-white/60">
            A real conversation between Katie and a customer booking a plumbing job
          </p>
        </motion.div>

        {/* Audio Player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--navy-800)] rounded-3xl p-6 lg:p-8 border border-white/10"
        >
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
                onValueChange={([value]) => setCurrentTime(value)}
                max={totalDuration}
                step={0.1}
                className="[&_[role=slider]]:bg-[var(--katie-blue)] [&_[role=slider]]:border-0 [&_.bg-primary]:bg-[var(--katie-blue)]"
              />
              <div className="flex justify-between text-xs text-white/40 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(totalDuration)}</span>
              </div>
            </div>

            <button
              onClick={() => setIsMuted(!isMuted)}
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
                key={index}
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

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-white/40 text-sm mt-6"
        >
          * Simulated transcript for demonstration. Actual AI conversations sound just as natural.
        </motion.p>
      </div>
    </section>
  )
}
