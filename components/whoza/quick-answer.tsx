"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

export interface QuickAnswerItem {
  label: string
  answer: string
}

interface QuickAnswerProps {
  heading?: string
  items: QuickAnswerItem[]
  tradeName: string        // e.g. "plumber" — used for micro-copy only
  serviceUrl?: string       // e.g. "/for-plumbers"
}

/**
 * QuickAnswer — Answer-first block for AI Overview extraction
 *
 * Renders as a bold-label + sentence list for maximum scraper compatibility.
 * Schema is a sibling `FAQPage` block in the page, NOT inside this component,
 * so it can be server-rendered.
 */
export function QuickAnswer({
  heading = "What whoza.ai does for your trade",
  items,
  tradeName,
  serviceUrl,
}: QuickAnswerProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx))
  }

  return (
    <section
      className="quick-answer-section py-12 bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800"
      aria-label="Quick answers"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
          {heading}
        </h2>

        {/* Desktop: always visible bold-label + sentence format */}
        <div className="hidden md:block space-y-4">
          {items.map((item) => (
            <p
              key={item.label}
              className="text-[15px] text-slate-700 dark:text-slate-300 leading-relaxed"
            >
              <strong className="text-slate-900 dark:text-white">
                {item.label}:
              </strong>{" "}
              {item.answer}
            </p>
          ))}
          {serviceUrl && (
            <p className="pt-2">
              <a
                href={serviceUrl}
                className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Learn more about whoza.ai for {tradeName}s →
              </a>
            </p>
          )}
        </div>

        {/* Mobile: accordion for compactness */}
        <div className="md:hidden space-y-2">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={item.label}
                className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  aria-expanded={isOpen}
                  aria-controls={`qa-panel-${idx}`}
                >
                  <span className="text-[15px]">
                    <strong>{item.label}:</strong>{" "}
                    <span className="font-normal text-slate-600 dark:text-slate-300">
                      {isOpen ? "" : item.answer.slice(0, 60) + "…"}
                    </span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <motion.div
                  id={`qa-panel-${idx}`}
                  initial={false}
                  animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4 text-slate-600 dark:text-slate-300 leading-relaxed text-[15px]">
                    <strong>{item.label}:</strong> {item.answer}
                    {serviceUrl && (
                      <a
                        href={serviceUrl}
                        className="block mt-3 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
                      >
                        Learn more about whoza.ai for {tradeName}s →
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
