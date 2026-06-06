"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Check, Sparkles, Volume2 } from "lucide-react"

interface Voice {
  id: string
  name: string
  accent: string
  tone: string
  gender: string
}

const VOICES: Voice[] = [
  { id: "v1", name: "Katie", accent: "Neutral English", tone: "Professional, warm", gender: "Female" },
  { id: "v2", name: "Mark", accent: "Neutral English", tone: "Friendly, confident", gender: "Male" },
  { id: "v3", name: "Sophie", accent: "Southern English", tone: "Professional, polished", gender: "Female" },
  { id: "v4", name: "Jack", accent: "London", tone: "Direct, reliable", gender: "Male" },
  { id: "v5", name: "Megan", accent: "Welsh", tone: "Warm, approachable", gender: "Female" },
  { id: "v6", name: "Callum", accent: "Scottish", tone: "Friendly, professional", gender: "Male" },
  { id: "v7", name: "Aimee", accent: "Northern English", tone: "Down-to-earth, friendly", gender: "Female" },
  { id: "v8", name: "Ryan", accent: "Irish", tone: "Warm, energetic", gender: "Male" },
  { id: "v9", name: "Emma", accent: "West Country", tone: "Friendly, reassuring", gender: "Female" },
  { id: "v10", name: "Josh", accent: "Midlands", tone: "Professional, calm", gender: "Male" },
  { id: "v11", name: "Olivia", accent: "Neutral English", tone: "Authoritative, efficient", gender: "Female" },
  { id: "v12", name: "Tom", accent: "Northern English", tone: "Straight-talking, trusted", gender: "Male" },
]

export function VoiceSelector() {
  const [selectedVoice, setSelectedVoice] = useState("v1")
  const [playingVoice, setPlayingVoice] = useState<string | null>(null)
  const [isRandomizing, setIsRandomizing] = useState(false)

  const handlePreview = (voiceId: string) => {
    // In a real implementation, this would play a sample
    setPlayingVoice(voiceId)
    setTimeout(() => setPlayingVoice(null), 2000)
  }

  const handleRandomize = () => {
    setIsRandomizing(true)
    const randomIndex = Math.floor(Math.random() * VOICES.length)
    setTimeout(() => {
      setSelectedVoice(VOICES[randomIndex].id)
      setIsRandomizing(false)
    }, 500)
  }

  const selectedVoiceData = VOICES.find((v) => v.id === selectedVoice)

  return (
    <div className="space-y-6">
      {/* Current Voice Display */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-[var(--slate-500)] mb-1">Active Voice</div>
            <div className="text-lg font-semibold text-[var(--navy-900)]">
              {selectedVoiceData?.name}
            </div>
            <div className="text-sm text-[var(--slate-500)]">
              {selectedVoiceData?.accent} · {selectedVoiceData?.tone}
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-[var(--katie-blue)]/10 flex items-center justify-center">
            <Volume2 className="w-6 h-6 text-[var(--katie-blue)]" />
          </div>
        </div>
      </div>

      {/* Voice Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {VOICES.map((voice) => {
          const isSelected = selectedVoice === voice.id
          const isPlaying = playingVoice === voice.id

          return (
            <motion.button
              key={voice.id}
              onClick={() => setSelectedVoice(voice.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                isSelected
                  ? "border-[var(--katie-blue)] bg-[var(--katie-blue)]/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[var(--katie-blue)] flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}

              <div className="flex items-center gap-3 mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold ${
                  voice.gender === "Female"
                    ? "bg-pink-100 text-pink-600"
                    : "bg-blue-100 text-blue-600"
                }`}>
                  {voice.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-[var(--navy-900)]">{voice.name}</div>
                  <div className="text-xs text-[var(--slate-500)]">{voice.accent}</div>
                </div>
              </div>

              <div className="text-xs text-[var(--slate-500)] mb-3">{voice.tone}</div>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handlePreview(voice.id)
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isPlaying
                    ? "bg-[var(--katie-blue)] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {isPlaying ? (
                  <>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    Playing…
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3" />
                    Preview
                  </>
                )}
              </button>
            </motion.button>
          )
        })}
      </div>

      {/* Randomize Button */}
      <button
        onClick={handleRandomize}
        disabled={isRandomizing}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-[var(--slate-500)] hover:bg-gray-50 transition-colors"
      >
        <Sparkles className={`w-4 h-4 ${isRandomizing ? "animate-spin" : ""}`} />
        {isRandomizing ? "Choosing…" : "Surprise Me"}
      </button>

      <div className="text-xs text-[var(--slate-400)]">
        Default: Katie (existing users keep their current voice). Change takes effect immediately.
      </div>
    </div>
  )
}
