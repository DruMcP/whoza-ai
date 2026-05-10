"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Play, CheckCircle2, Clock, MapPin, Phone, ArrowRight } from "lucide-react"

export function VideoExplainer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  return (
    <section id="video-explainer" className="py-16 lg:py-20 bg-[var(--off-white)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--navy-900)] mb-4 reveal">
            Watch Whoza capture a missed enquiry in 60 seconds
          </h2>
          <p className="text-base sm:text-lg text-[var(--slate-500)] max-w-2xl mx-auto">
            Katie answers the call. The enquiry lands in WhatsApp. Claire requests the review. Rex shows what to improve next.
          </p>
        </motion.div>

        {/* Video Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl shadow-black/20 bg-[#0b141a] border border-white/10"
        >
          {/* Video Player */}
          <div className="relative aspect-video bg-[#0b141a]">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1280' height='720' viewBox='0 0 1280 720'%3E%3Crect fill='%230b141a' width='1280' height='720'/%3E%3C/svg%3E"
              preload="metadata"
              playsInline
              onPause={handlePause}
              onEnded={handlePause}
            >
              <source src="/whoza-explainer.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Custom Thumbnail Overlay (shown when not playing) */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#0b141a]">
                {/* WhatsApp Enquiry Card Thumbnail */}
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

                      {/* Action Buttons */}
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

                {/* Play Button Overlay */}
                <button
                  onClick={handlePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors group cursor-pointer"
                  aria-label="Watch Whoza in 60 seconds"
                >
                  <div className="relative">
                    {/* Pulse Ring */}
                    <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
                    {/* Button */}
                    <div className="relative flex items-center gap-3 bg-white/95 hover:bg-white text-[var(--navy-900)] px-6 py-4 rounded-2xl shadow-2xl transition-all hover:scale-105 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                      <div className="w-12 h-12 rounded-full bg-[var(--rex-green)] flex items-center justify-center shrink-0">
                        <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-base sm:text-lg">Watch Whoza in 60 seconds</div>
                        <div className="text-xs text-[var(--slate-500)]">See the full flow</div>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Trust Line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-[var(--slate-500)] mb-4">
            See Katie capture a missed enquiry in under 60 seconds.
          </p>
          <a
            href="#final-cta"
            className="inline-flex items-center justify-center rounded-lg bg-[var(--rex-green)] hover:bg-[var(--rex-green-hover)] text-white font-bold px-8 py-6 text-lg gap-2 shadow-xl shadow-[var(--rex-green)]/30 transition-all hover:scale-105"
          >
            Get Katie answering my calls
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
