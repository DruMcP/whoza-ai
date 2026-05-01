"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"

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
                <div className="text-white font-semibold text-sm">Start your free trial</div>
                <div className="text-white/60 text-xs">No credit card required</div>
              </div>
              <Button 
                className="bg-[var(--katie-blue)] hover:bg-[var(--katie-blue)]/90 text-white font-semibold px-6"
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
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

  return (
    <div className="fixed bottom-6 right-6 z-50 hidden lg:block">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-[var(--border)] overflow-hidden mb-4"
          >
            <div className="bg-[var(--katie-blue)] p-4">
              <h3 className="text-white font-semibold">Chat with us</h3>
              <p className="text-white/80 text-sm">We typically reply in minutes</p>
            </div>
            <div className="p-4">
              <div className="bg-[var(--off-white)] rounded-xl p-4 mb-4">
                <p className="text-sm text-[var(--navy-900)]">
                  👋 Hi! Got questions about whoza.ai? I&apos;m here to help!
                </p>
              </div>
              <input 
                type="text"
                placeholder="Type your message..."
                className="w-full px-4 py-3 rounded-xl bg-[var(--off-white)] border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--katie-blue)]/50"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors ${
          isOpen 
            ? "bg-[var(--navy-900)]" 
            : "bg-[var(--katie-blue)]"
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </motion.button>
    </div>
  )
}
