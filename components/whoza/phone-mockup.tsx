"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { MessageCircle, Clock, CheckCircle2 } from "lucide-react"

export function PhoneMockup({ city, trade }: { city?: string; trade?: string }) {
  return (
    <div className="relative">
      {/* Glow Effect */}
      <div className="absolute -inset-8 bg-[var(--rex-green)]/20 rounded-[60px] blur-3xl animate-pulse-ring" />

      {/* Hero Phone Image */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex justify-center"
      >
        <Image
          src="/images/hero-phone-3d.webp"
          alt="Whoza.ai AI call answering — Katie captures missed calls and sends job details to WhatsApp"
          width={735}
          height={1103}
          className="w-full max-w-[320px] sm:max-w-[380px] h-auto drop-shadow-2xl"
          priority
        />
      </motion.div>

      {/* Floating Badges */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="absolute -left-12 sm:-left-20 top-1/4 animate-float-delayed"
      >
        <div className="px-4 py-2 rounded-xl bg-white shadow-lg border border-gray-100">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-[var(--rex-green)]" />
            <span className="text-sm font-semibold text-[var(--navy-900)]">Via WhatsApp</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute -right-12 sm:-right-20 top-1/2 animate-float"
      >
        <div className="px-4 py-2 rounded-xl bg-white shadow-lg border border-gray-100">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[var(--katie-blue)]" />
            <span className="text-sm font-semibold text-[var(--navy-900)]">2 Taps</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="absolute -bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="px-4 py-2 rounded-xl bg-[var(--rex-green)] shadow-lg text-white">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm font-semibold">Enquiry Captured</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
