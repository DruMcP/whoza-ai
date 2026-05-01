"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Globe } from "lucide-react"
import { useLocale } from "@/lib/locale-context"
import { Country } from "@/lib/locale-config"

const countries: { code: Country; flag: string; name: string; fullName: string }[] = [
  { code: "uk", flag: "🇬🇧", name: "UK", fullName: "United Kingdom" },
  { code: "us", flag: "🇺🇸", name: "USA", fullName: "United States" },
]

export function CountrySwitcher() {
  const { country, setCountry } = useLocale()
  const [isOpen, setIsOpen] = useState(false)

  const current = countries.find((c) => c.code === country) || countries[0]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white text-sm border border-white/20"
        aria-label="Select your country"
      >
        <Globe className="w-4 h-4 text-white/70" />
        <span className="text-xl">{current.flag}</span>
        <span className="font-medium">{current.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 z-50 bg-[var(--navy-900)] border border-white/20 rounded-xl shadow-xl overflow-hidden min-w-[180px]"
            >
              <div className="p-2 border-b border-white/10">
                <p className="text-xs text-white/50 px-2">Select your region</p>
              </div>
              {countries.map((c) => (
                <button
                  key={c.code}
                  onClick={() => {
                    setCountry(c.code)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors ${
                    c.code === country
                      ? "bg-[var(--katie-blue)]/20 text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="text-2xl">{c.flag}</span>
                  <div>
                    <div className="font-medium">{c.name}</div>
                    <div className="text-xs text-white/50">{c.fullName}</div>
                  </div>
                  {c.code === country && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-[var(--rex-green)]" />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
