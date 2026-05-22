import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Home, PhoneOff } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--navy-900)] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
            <PhoneOff className="w-10 h-10 text-[var(--slate-500)]" />
          </div>
          <h1 className="text-6xl font-extrabold text-white tracking-tight mb-2">
            404
          </h1>
          <p className="text-xl text-[var(--slate-400)]">
            This line is disconnected.
          </p>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-10"
        >
          <p className="text-white/60 leading-relaxed">
            Even Katie couldn&apos;t track down this page.
            It might have moved, or the URL might have a typo.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/"
            className="btn-primary inline-flex items-center justify-center gap-2 bg-white text-[#1A1A2E] font-bold px-8 py-4 rounded-xl no-underline"
          >
            <Home className="w-5 h-5" />
            Back to Homepage
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 text-white/80 hover:text-white font-medium px-8 py-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors no-underline"
          >
            <ArrowLeft className="w-5 h-5" />
            View Pricing
          </Link>
        </motion.div>

        {/* Subtle footer hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-sm text-white/30"
        >
          If you believe this is an error, please{" "}
          <Link href="/contact" className="text-[var(--katie-blue)] hover:underline no-underline">
            let us know
          </Link>
          .
        </motion.p>
      </div>
    </div>
  )
}
