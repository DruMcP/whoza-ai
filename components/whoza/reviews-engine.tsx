"use client"

import { motion } from "framer-motion"
import { Star, MessageSquare, TrendingUp, CheckCircle2, ArrowRight, ThumbsUp } from "lucide-react"
import { useLocale } from "@/lib/locale-context"

export function ReviewsEngine() {
  const { country } = useLocale()

  return (
    <section className="py-20 lg:py-32 bg-[var(--rex-green)]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--rex-green)]/10 text-[var(--rex-green)] text-sm font-bold mb-6">
              <Star className="w-4 h-4 fill-current" />
              Claire — Every Job Becomes Your Next Review
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--navy-900)] tracking-tight text-balance reveal">
              Every Completed Job Becomes Your Next Review — And Your Next Customer
            </h2>
            <p className="mt-6 text-lg text-[var(--slate-500)] text-pretty">
              Claire automatically turns completed work into 5-star Google reviews, helping more customers choose you.
              <span className="block mt-2 font-semibold text-[var(--navy-900)]">Post-job review capture that builds trust and brings future work.</span>
            </p>

            <div className="mt-10 space-y-4 reveal-stagger">
              {[
                { icon: MessageSquare, text: "Automatic WhatsApp follow-up after every completed job", color: "text-[var(--rex-green)]" },
                { icon: Star, text: "Smart timing — reaches out when customer satisfaction is highest", color: "text-[var(--claire-amber)]" },
                { icon: ThumbsUp, text: "Handle issues privately before they become public feedback", color: "text-[var(--katie-blue)]" },
                { icon: TrendingUp, text: "Track how reviews translate into more calls", color: "text-[var(--mark-grey)]" },
              ].map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[var(--border)]"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--rex-green)]/10 flex items-center justify-center">
                    <feature.icon className={`w-5 h-5 ${feature.color}`} />
                  </div>
                  <span className="text-[var(--navy-900)] font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-xl bg-[var(--rex-green)]/10 border border-[var(--rex-green)]/20">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-[var(--rex-green)]" />
                <span className="font-semibold text-[var(--navy-900)]">Included in Growth plan and above</span>
              </div>
              <p className="text-sm text-[var(--slate-500)]">Automatic post-job conversion after every completed job.</p>
            </div>
          </motion.div>

          {/* Right - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Phone showing review request */}
            <div className="bg-white rounded-3xl p-6 shadow-2xl border border-[var(--border)] max-w-sm mx-auto">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[var(--rex-green)]/10 flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-[var(--rex-green)] fill-current" />
                </div>
                <h3 className="text-xl font-bold text-[var(--navy-900)]">How did we do?</h3>
                <p className="text-[var(--slate-500)] text-sm mt-2">
                  Your boiler repair is complete — we'd love your feedback!
                </p>
              </div>

              {/* Star Rating */}
              <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.div
                    key={star}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: star * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Star className="w-10 h-10 text-[var(--claire-amber)] fill-current cursor-pointer hover:scale-110 transition-transform" />
                  </motion.div>
                ))}
              </div>

              {/* Review Stats */}
              <div className="p-4 rounded-xl bg-[var(--off-white)] mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[var(--slate-500)]">Your current rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-[var(--claire-amber)] fill-current" />
                    <span className="font-bold text-[var(--navy-900)]">4.9</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--slate-500)]">Reviews this month</span>
                  <span className="font-bold text-[var(--rex-green)]">+12</span>
                </div>
              </div>
            </div>

            {/* Social proof badge - no unverified claims */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-[var(--rex-green)] text-white text-sm font-medium shadow-lg"
            >
              Part of your AI Revenue Team
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
