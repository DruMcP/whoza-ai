"use client"

import { motion } from "framer-motion"

export function SocialProofBar() {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full py-4 border-t border-white/5 bg-[#111418]"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-1 px-4 text-center">
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">As featured in the press</p>
        <p className="text-sm text-white/70">
          <a
            href="https://www.pressandjournal.co.uk/fp/business/local/7072126/moray-virtual-receptionist-whoza-ai-speaking-aberdonian/"
            target="_blank"
            rel="noopener"
            className="font-medium text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
          >
            The Press &amp; Journal: &ldquo;Moray man&rsquo;s tech start-up offers virtual receptionists speaking in native Aberdonian&rdquo;
          </a>
          <span className="text-white/40"> &middot; 28 July 2026 &middot; </span>
          <a href="/press" className="text-white/60 underline decoration-white/20 underline-offset-4 hover:text-white">
            Whoza press centre
          </a>
        </p>
      </div>
    </motion.div>
  )
}
