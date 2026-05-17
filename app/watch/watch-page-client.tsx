"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Play, Pause, ArrowRight, Share2, CheckCircle2, Clock, MapPin, Phone, Zap, Star, MessageSquare, TrendingUp } from "lucide-react"

export function WatchPageClient() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const togglePlay = () => {
    if (isPlaying) {
      handlePause()
    } else {
      handlePlay()
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleEnded = () => {
    setIsPlaying(false)
    setCurrentTime(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const shareVideo = () => {
    if (navigator.share) {
      navigator.share({
        title: "Watch Whoza in Action — 60-Second Demo",
        text: "See how Katie captures every missed enquiry in under 60 seconds.",
        url: "https://whoza.ai/watch",
      })
    } else {
      navigator.clipboard.writeText("https://whoza.ai/watch")
      alert("Link copied to clipboard!")
    }
  }

  const timestamps = [
    { time: 0, label: "Missed call alert" },
    { time: 3, label: "Katie answers instantly" },
    { time: 12, label: "Captures job details" },
    { time: 20, label: "WhatsApp enquiry card" },
    { time: 35, label: "Claire requests review" },
    { time: 48, label: "Rex delivers insights" },
  ]

  const jumpToTimestamp = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds
      if (!isPlaying) {
        handlePlay()
      }
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--rex-green)]/10 border border-[var(--rex-green)]/30 text-[var(--rex-green)] text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              60-Second Demo
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Watch Whoza Capture Every
              <br />
              <span className="text-[var(--rex-green)]">Missed Enquiry</span>
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              See Katie answer a call, capture the job, and deliver it to WhatsApp —
              all in under 60 seconds. No code. No setup. Just results.
            </p>
          </motion.div>

          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl shadow-black/30 bg-[#0b141a] border border-white/10"
          >
            {/* Video */}
            <div className="relative aspect-video bg-[#0b141a]">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1280' height='720' viewBox='0 0 1280 720'%3E%3Crect fill='%230b141a' width='1280' height='720'/%3E%3C/svg%3E"
                preload="metadata"
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
                onClick={togglePlay}
              >
                <source src="/whoza-explainer.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Custom Thumbnail Overlay (shown when not playing and at start) */}
              {!isPlaying && currentTime === 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#0b141a]">
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <div className="w-full max-w-md">
                      {/* WhatsApp Header Bar */}
                      <div className="bg-[#1f2c34] rounded-t-xl px-4 py-3 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[var(--rex-green)] flex items-center justify-center">
                          <span className="text-white font-bold text-xs">W</span>
                        </div>
                        <div>
                          <div className="text-white font-semibold text-sm">whoza.ai Jobs</div>
                          <div className="text-[#8696a0] text-xs">online</div>
                        </div>
                        <div className="ml-auto flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[var(--rex-green)] animate-pulse" />
                        </div>
                      </div>

                      {/* Enquiry Card */}
                      <div className="bg-[#005c4b] rounded-b-xl p-4 sm:p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="px-2 py-0.5 rounded bg-[#25d366] text-white text-xs font-bold uppercase tracking-wide">
                            New Enquiry
                          </div>
                          <div className="text-[#25d366] text-xs font-medium">Just now</div>
                        </div>

                        <div className="space-y-2.5 text-white">
                          <div className="flex items-start gap-2">
                            <Phone className="w-4 h-4 text-[#25d366] mt-0.5 shrink-0" />
                            <div>
                              <div className="text-sm font-semibold">Mrs. Sarah Thompson</div>
                              <div className="text-xs text-white/70">Boiler repair — no heating</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#25d366] shrink-0" />
                            <span className="text-xs">Manchester, M20</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#25d366] shrink-0" />
                            <span className="text-xs text-[#25d366] font-medium">Urgency: Today</span>
                          </div>

                          <div className="pt-2 border-t border-white/20 flex items-center justify-between">
                            <span className="text-lg font-bold">£140</span>
                            <span className="text-xs text-white/60">estimated</span>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                          <div className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-[#25d366] text-white text-sm font-medium">
                            <CheckCircle2 className="w-4 h-4" />
                            Accept
                          </div>
                          <div className="flex items-center justify-center px-3 py-2 rounded-full bg-red-500 text-white text-sm font-medium shadow-lg">
                            Decline
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Play Button */}
                  <button
                    onClick={handlePlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors group cursor-pointer"
                    aria-label="Play demo video"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
                      <div className="relative flex items-center gap-3 bg-white/95 hover:bg-white text-[var(--navy-900)] px-6 py-4 rounded-2xl shadow-2xl transition-all hover:scale-105">
                        <div className="w-12 h-12 rounded-full bg-[var(--rex-green)] flex items-center justify-center shrink-0">
                          <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-base sm:text-lg">Watch the 60-Second Demo</div>
                          <div className="text-xs text-[var(--slate-500)]">See Katie in action</div>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              )}

              {/* Pause overlay (when playing, click to pause) */}
              {isPlaying && (
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={handlePause}
                >
                  <div className="bg-black/50 rounded-full p-4">
                    <Pause className="w-8 h-8 text-white" />
                  </div>
                </div>
              )}

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <div
                  className="h-full bg-[var(--rex-green)] transition-all duration-100"
                  style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                />
              </div>

              {/* Time display */}
              <div className="absolute bottom-3 left-3 text-xs text-white/80 font-mono bg-black/50 px-2 py-1 rounded">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
          </motion.div>

          {/* Timestamps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6"
          >
            <h2 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-3">What happens</h2>
            <div className="flex flex-wrap gap-2">
              {timestamps.map((ts) => (
                <button
                  key={ts.time}
                  onClick={() => jumpToTimestamp(ts.time)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    Math.abs(currentTime - ts.time) < 2
                      ? "bg-[var(--rex-green)] text-white"
                      : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
                  }`}
                >
                  <span className="font-mono mr-2">{formatTime(ts.time)}</span>
                  {ts.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 flex flex-wrap gap-4"
          >
            <a
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--rex-green)] hover:bg-[var(--rex-green-hover)] text-white font-bold px-8 py-4 text-lg transition-all hover:scale-105 shadow-xl shadow-[var(--rex-green)]/30"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </a>
            <button
              onClick={shareVideo}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium px-6 py-4 text-lg transition-all border border-white/10"
            >
              <Share2 className="w-5 h-5" />
              Share This Demo
            </button>
          </motion.div>
        </div>
      </section>

      {/* What You See Section */}
      <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              What You See in 60 Seconds
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Every stage of the Whoza revenue system, from missed call to growth insight.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Phone,
                color: "bg-[var(--katie-blue)]",
                title: "Katie Answers",
                description: "Every missed call is answered in under 3 seconds. No voicemail. No lost enquiries.",
              },
              {
                icon: MessageSquare,
                color: "bg-[var(--rex-green)]",
                title: "WhatsApp Delivery",
                description: "The full enquiry lands in WhatsApp — who, what, where, urgency, and estimated value.",
              },
              {
                icon: Star,
                color: "bg-[var(--coral)]",
                title: "Claire + Rex",
                description: "Claire auto-requests reviews. Rex delivers AI growth recommendations weekly.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats + CTA */}
      <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-[var(--navy-800)] to-[var(--navy-900)] border border-white/10 rounded-2xl lg:rounded-3xl p-8 lg:p-12 text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Stop Missing Calls?
            </h2>
            <p className="text-white/60 max-w-lg mx-auto mb-8">
              Join 200+ UK tradespeople who never miss another enquiry. 7-day free trial on the Starter plan.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--rex-green)]">3s</div>
                <div className="text-sm text-white/50">Answer time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--katie-blue)]">1 tap</div>
                <div className="text-sm text-white/50">Book job</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--coral)]">£140+</div>
                <div className="text-sm text-white/50">Per job recovered</div>
              </div>
            </div>

            <a
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--rex-green)] hover:bg-[var(--rex-green-hover)] text-white font-bold px-8 py-4 text-lg transition-all hover:scale-105 shadow-xl shadow-[var(--rex-green)]/30"
            >
              Get Katie Answering My Calls
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Video Transcript (SEO) */}
      <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Video Transcript</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-white/70 leading-relaxed mb-4">
                <strong className="text-white">[00:00-00:03]</strong> A missed call comes in to a UK tradesperson's
                mobile. The phone rings out. The caller hits voicemail — and 85% of them never call back.
              </p>
              <p className="text-white/70 leading-relaxed mb-4">
                <strong className="text-white">[00:03-00:12]</strong> Katie, Whoza's AI call handler, picks up the call
                in under 3 seconds. She introduces herself as the trade business's receptionist and begins capturing
                the enquiry details — name, service needed, location, and urgency.
              </p>
              <p className="text-white/70 leading-relaxed mb-4">
                <strong className="text-white">[00:12-00:20]</strong> The full enquiry is compiled into a WhatsApp
                message card and delivered instantly to the tradesperson's phone. The card shows the customer's name,
                the job type, the location, the urgency level, and the estimated value — everything needed to book the
                job with one tap.
              </p>
              <p className="text-white/70 leading-relaxed mb-4">
                <strong className="text-white">[00:20-00:35]</strong> The tradesperson accepts the job directly from
                WhatsApp. The customer's details are automatically saved. No manual data entry. No lost paperwork.
              </p>
              <p className="text-white/70 leading-relaxed mb-4">
                <strong className="text-white">[00:35-00:48]</strong> After the job is completed, Claire — Whoza's
                review engine — automatically sends a review request to the customer via WhatsApp. The customer leaves
                a 5-star Google review, boosting the business's local search ranking.
              </p>
              <p className="text-white/70 leading-relaxed mb-4">
                <strong className="text-white">[00:48-01:00]</strong> Rex — Whoza's growth engine — delivers weekly
                insights to the tradesperson: how many calls were answered, how many jobs were booked, average job
                value, and AI-powered recommendations for improving visibility and conversion.
              </p>
              <p className="text-white/70 leading-relaxed">
                Whoza.ai turns every missed call into a booked job, a 5-star review, and a growth insight.
                The AI revenue team for UK tradespeople.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
