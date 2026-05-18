
/**
 * Whoza.ai — AI Voice Agents for UK Tradespeople
 * Exit Intent Modal Component
 * 
 * Triggers on mouseleave (desktop) or 60s+70% scroll (mobile)
 * Offers lead magnet: "3 ways to never miss a job again"
 */

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Download, Phone, Clock, Calendar } from "lucide-react";

interface ExitIntentModalProps {
  onClose?: () => void;
}

export function ExitIntentModal({ onClose }: ExitIntentModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [scrollDepth, setScrollDepth] = useState(0);

  // Track scroll depth for mobile trigger
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const depth = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollDepth(depth);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile trigger: 60s + 70% scroll
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile || hasTriggered) return;

    const timer = setTimeout(() => {
      if (scrollDepth >= 70 && !hasTriggered) {
        setIsVisible(true);
        setHasTriggered(true);
      }
    }, 60000); // 60 seconds

    return () => clearTimeout(timer);
  }, [scrollDepth, hasTriggered]);

  // Desktop trigger: mouseleave
  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      if (hasTriggered) return;
      // Only trigger when mouse leaves the top of the page
      if (e.clientY < 10) {
        setIsVisible(true);
        setHasTriggered(true);
      }
    },
    [hasTriggered]
  );

  useEffect(() => {
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [handleMouseLeave]);

  // Don't show if already dismissed
  useEffect(() => {
    const dismissed = sessionStorage.getItem("exit-intent-dismissed");
    if (dismissed) setHasTriggered(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("exit-intent-dismissed", "true");
    onClose?.();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    // Track in GA
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "exit_intent_lead", {
        event_category: "engagement",
        event_label: "lead_magnet_download",
      });
    }

    setSubmitted(true);
    sessionStorage.setItem("exit-intent-dismissed", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[#0F172A] border border-[#334155] rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-400 text-sm font-medium rounded-full mb-4">
                    <Clock className="w-4 h-4" />
                    <span>Before you go...</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Not ready to start?
                  </h2>
                  <p className="text-slate-400 text-base">
                    Download the free guide: <strong className="text-white">5 Voicemail Scripts That Win Customers</strong>
                  </p>
                </div>

                {/* Benefits */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Phone className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">The professional script that converts 3x more callers into bookings</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Calendar className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">The urgency script for emergency calls that stops customers shopping around</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Download className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">The follow-up script that turns missed calls into confirmed jobs within 24 hours</p>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-4 py-3 bg-[#1E293B] border border-[#334155] rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] focus:border-transparent"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-[#2DD4BF] hover:bg-[#14B8A6] text-[#0F172A] font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Send me the free guide
                  </button>
                </form>

                <p className="text-center text-slate-500 text-xs mt-4">
                  No spam. Unsubscribe anytime. Used by 200+ UK tradespeople.
                </p>
              </div>
            ) : (
              <div className="p-6 md:p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <Download className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Check your inbox!</h3>
                <p className="text-slate-400 mb-4">
                  We&apos;ve sent <strong className="text-white">3 Ways to Never Miss a Job Again</strong> to {email}
                </p>
                <p className="text-sm text-slate-500 mb-6">
                  Meanwhile, see how Katie captures every missed call:
                </p>
                <a
                  href="#final-cta"
                  onClick={handleClose}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#2DD4BF] hover:bg-[#14B8A6] text-[#0F172A] font-semibold rounded-xl transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  See Katie in action
                </a>
              </div>
            )}

            {/* Bottom accent */}
            <div className="h-1 bg-[#2DD4BF]" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
