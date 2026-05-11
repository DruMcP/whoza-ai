"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, X } from "lucide-react"

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the hero section (roughly 100vh)
      const scrolled = window.scrollY > window.innerHeight * 0.8
      setIsVisible(scrolled && !isDismissed)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isDismissed])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
        >
          <div className="bg-[var(--navy-900)] border-t border-white/10 p-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="text-white font-semibold text-sm">Get Katie answering my calls</div>
                <div className="text-white/60 text-xs">Free 7-day trial · No card needed</div>
              </div>
              <a 
                href="#final-cta"
                className="inline-flex items-center justify-center bg-[var(--katie-blue)] hover:bg-[var(--katie-blue)]/90 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                <span className="truncate">Get Katie answering my calls</span>
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
              <button 
                onClick={() => setIsDismissed(true)}
                className="p-2 text-white/40 hover:text-white transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      // Hide on hero section, show after scrolling past hero
      const scrolled = window.scrollY > window.innerHeight * 0.6
      setIsVisible(scrolled)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial position
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const quickReplies = [
    {
      icon: "💬",
      label: "Questions about pricing?",
      text: "Hi whoza.ai team, I'd like to know more about your pricing plans. Can you help?",
    },
    {
      icon: "🔧",
      label: "Need help with setup?",
      text: "Hi whoza.ai team, I need some help getting set up with your AI receptionist. Can you assist?",
    },
    {
      icon: "📞",
      label: "Talk to a human",
      text: "Hi whoza.ai team, I'd like to speak with someone from your team. Is that possible?",
    },
  ]

  const waLink = (text: string) =>
    `https://wa.me/447831643012?text=${encodeURIComponent(text)}`

  if (!mounted) return null
  if (!isVisible) return null

  return (
    <div className="fixed bottom-24 lg:bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-[var(--border)] overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-[#25D366] p-4 flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold">Chat with whoza.ai</h3>
                <p className="text-white/80 text-sm">We typically reply within 5 minutes</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick replies */}
            <div className="p-4 space-y-3">
              <p className="text-sm text-[var(--slate-500)] mb-3">How can we help you today?</p>
              {quickReplies.map((reply, i) => (
                <a
                  key={i}
                  href={waLink(reply.text)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-[var(--off-white)] hover:bg-[var(--katie-blue)]/10 transition-colors group"
                >
                  <span className="text-lg">{reply.icon}</span>
                  <span className="text-sm text-[var(--navy-900)] group-hover:text-[var(--katie-blue)] font-medium">
                    {reply.label}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors ${
          isOpen ? "bg-[var(--navy-900)]" : "bg-[#25D366]"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        )}
      </motion.button>
    </div>
  )
}
