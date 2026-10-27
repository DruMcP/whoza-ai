"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { WaitlistModal } from "@/components/whoza/waitlist-modal"
import { trackCTA } from "@/lib/gtag"

/*
 * The closing call to action used across the site: a soft panel with two
 * glossy green ribbons in the corners, a two-tone headline, a dark primary
 * button that opens the free-trial flow and a white secondary link.
 * Used by FinalCTA, the footer and the blog. `id` keeps the SVG gradient ids
 * unique when two bands share a page.
 */

interface CtaBandProps {
  id: string
  /** Two-tone headline: the second part takes the accent colour. */
  heading: [string, string]
  headingTag?: "h2" | "div"
  text?: React.ReactNode
  primaryLabel: string
  /** Modal source for the primary button. */
  source: string
  /** Analytics label for the primary button; defaults to its text. */
  trackLabel?: string
  secondary?: { label: string; href: string }
  /** Smaller type and padding, for use inside an article column. */
  compact?: boolean
  children?: React.ReactNode
}

function Ribbon({ id, side, compact }: { id: string; side: "left" | "right"; compact: boolean }) {
  const gid = `${id}-ribbon-${side}`
  const d =
    side === "left"
      ? "M-30 250 C 10 170, 60 120, 95 165 S 120 285, 175 225 S 215 60, 265 95 S 300 190, 330 140"
      : "M330 -20 C 300 60, 255 40, 235 85 S 240 200, 195 190 S 140 60, 95 105 S 50 230, -20 215"
  return (
    <svg
      className={`cta-ribbon pointer-events-none absolute overflow-visible ${
        compact ? "h-32 w-44 sm:h-40 sm:w-56" : "h-48 w-60 sm:h-64 sm:w-[22rem]"
      } ${side === "left" ? "-bottom-12 -left-16 sm:-left-20" : "-right-16 -top-14 sm:-right-20 [animation-delay:-4s]"}`}
      viewBox="0 0 300 260"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${gid}-body`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#0b7d50" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#1fcd80" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#e3f8ec" stopOpacity="0.95" />
        </linearGradient>
        <filter id={`${gid}-soft`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
      </defs>
      {/* Tube body, a darker underside and a blurred highlight along the top: reads as a rounded ribbon */}
      <path d={d} stroke="#0b7d50" strokeOpacity="0.12" strokeWidth="44" strokeLinecap="round" strokeLinejoin="round" transform="translate(3 6)" filter={`url(#${gid}-soft)`} />
      <path d={d} stroke={`url(#${gid}-body)`} strokeWidth="42" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} stroke="#ffffff" strokeOpacity="0.55" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" transform="translate(-4 -8)" filter={`url(#${gid}-soft)`} />
    </svg>
  )
}

export function CtaBand({
  id,
  heading,
  headingTag = "h2",
  text,
  primaryLabel,
  source,
  trackLabel,
  secondary,
  compact = false,
  children,
}: CtaBandProps) {
  const [open, setOpen] = useState(false)
  const Heading = headingTag

  return (
    <div
      className={`relative overflow-hidden rounded-[32px] bg-[#e9efeb] text-center ${
        compact ? "px-6 py-12 sm:px-10 sm:py-14" : "px-6 py-16 sm:px-12 sm:py-28"
      }`}
    >
      <Ribbon id={id} side="left" compact={compact} />
      <Ribbon id={id} side="right" compact={compact} />

      <div className="relative mx-auto max-w-3xl">
        <Heading
          className={`text-balance font-bold leading-[1.05] tracking-[-0.03em] text-[var(--v2-ink)] ${
            compact ? "text-[clamp(28px,3.4vw,40px)]" : "text-[clamp(32px,4.8vw,58px)]"
          }`}
        >
          {heading[0]} <span className="text-[var(--v2-green)]">{heading[1]}</span>
        </Heading>
        {text && (
          <div className={`mx-auto mt-4 max-w-2xl leading-relaxed text-[var(--v2-body)] ${compact ? "text-[16px]" : "text-[16px] sm:text-[18px]"}`}>
            {text}
          </div>
        )}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              trackCTA(trackLabel ?? primaryLabel, source)
              setOpen(true)
            }}
            className="inline-flex min-h-[52px] cursor-pointer items-center gap-2 rounded-full bg-[var(--v2-navy)] px-7 text-[16px] font-semibold text-white shadow-[0_14px_30px_-16px_rgba(15,22,40,0.7)] transition-colors hover:bg-[var(--v2-green)]"
          >
            {primaryLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
          {secondary && (
            <a
              href={secondary.href}
              className="cta-link inline-flex min-h-[52px] items-center gap-2 rounded-full bg-white px-7 text-[16px] font-semibold text-[var(--v2-ink)] no-underline shadow-[0_14px_30px_-20px_rgba(15,22,40,0.45)] transition-colors hover:text-[var(--v2-green)]"
            >
              {secondary.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>
        {children}
      </div>

      {open && <WaitlistModal onClose={() => setOpen(false)} source={source} />}
    </div>
  )
}
