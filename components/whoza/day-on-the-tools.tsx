"use client"

import { Newsreader } from "next/font/google"
import { useEffect, useRef, useState } from "react"
import { CalendarCheck, MessageCircle, Moon, PhoneForwarded, PhoneOff, Voicemail, type LucideIcon } from "lucide-react"

/*
 * One working day for a tradesperson, hour by hour: where you are when the
 * phone rings, and what Katie does with the call. Each moment shows one
 * feature in context (WhatsApp delivery, booking, spam filtering, live
 * transfer, voicemail to text, 24/7 cover). The rail fills as you scroll
 * down the day; the last moment, at 2am, sits on a night band.
 */

const serif = Newsreader({ subsets: ["latin"], weight: ["400"], style: ["italic"], display: "swap" })

const MOMENTS: { time: string; where: string; what: string; feature: string; icon: LucideIcon; night?: boolean }[] = [
  {
    time: "08:10",
    where: "Two storeys up on a roof in Leith.",
    what: "Katie answered, asked the right questions and sent the job to your WhatsApp.",
    feature: "Job card on WhatsApp",
    icon: MessageCircle,
  },
  {
    time: "10:45",
    where: "Under a sink with both hands full.",
    what: "A caller wanted Thursday morning. Katie checked your diary and booked 10:00.",
    feature: "Booked into your calendar",
    icon: CalendarCheck,
  },
  {
    time: "12:30",
    where: "Lunch in the van.",
    what: "Two sales calls about energy deals. Katie filtered them out, so your phone stayed quiet.",
    feature: "Sales and spam filtered",
    icon: PhoneOff,
  },
  {
    time: "15:20",
    where: "Driving between jobs.",
    what: "A burst pipe. Katie flagged it red and put the caller straight through to you.",
    feature: "Live transfer",
    icon: PhoneForwarded,
  },
  {
    time: "19:40",
    where: "Tea with the family.",
    what: "A landlord left a voicemail. It reached you as text on WhatsApp within a minute.",
    feature: "Voicemail to text",
    icon: Voicemail,
  },
  {
    time: "02:10",
    where: "Fast asleep.",
    what: "No heating at a rental. Katie took the details and flagged it urgent, ready for your first look in the morning.",
    feature: "Answered 24/7",
    icon: Moon,
    night: true,
  },
]

export function DayOnTheTools() {
  const listRef = useRef<HTMLOListElement>(null)
  const [progress, setProgress] = useState(0)
  const [passed, setPassed] = useState(0)

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1)
      setPassed(MOMENTS.length)
      return
    }
    let frame = 0
    const update = () => {
      frame = 0
      const rect = list.getBoundingClientRect()
      const line = window.innerHeight * 0.55
      const p = Math.min(1, Math.max(0, (line - rect.top) / rect.height))
      setProgress(p)
      const rows = Array.from(list.children) as HTMLElement[]
      setPassed(rows.filter((row) => row.getBoundingClientRect().top + 24 < line).length)
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section className="v2-section bg-white" aria-labelledby="day-heading">
      <div className="v2-container">
        <div className="max-w-2xl">
          <h2 id="day-heading" className="v2-h2 text-balance">
            A day on the tools, with Katie on the phone
          </h2>
          <p className="v2-lead mt-4">You get on with the job. This is what happens to the calls you can&apos;t take.</p>
        </div>

        <div className="relative mt-14">
          {/* The day rail: fills as you scroll */}
          <div className="absolute bottom-0 left-[7px] top-0 w-[2px] rounded-full bg-[var(--v2-line)] sm:left-[9px]" aria-hidden="true">
            <div
              className="w-full rounded-full bg-[var(--v2-green)] transition-[height] duration-150 ease-out"
              style={{ height: `${progress * 100}%` }}
            />
          </div>

          <ol ref={listRef} className="space-y-3">
            {MOMENTS.map((m, i) => {
              const Icon = m.icon
              const done = i < passed
              return (
                <li
                  key={m.time}
                  className={`relative grid gap-x-8 gap-y-3 rounded-[24px] py-7 pr-5 md:grid-cols-[150px_1fr_1.15fr] md:items-baseline md:pr-8 ${
                    m.night ? "ml-7 bg-[var(--v2-navy)] pl-5 text-white sm:ml-10 sm:pl-8" : "pl-10 sm:pl-14"
                  }`}
                >
                  <span
                    className={`absolute top-[38px] h-4 w-4 rounded-full border-2 transition-colors duration-300 sm:h-5 sm:w-5 ${
                      done ? "border-[var(--v2-green)] bg-[var(--v2-green)]" : "border-[var(--v2-line)] bg-white"
                    } ${m.night ? "-left-7 sm:-left-10" : "left-0"}`}
                    aria-hidden="true"
                  />
                  <time
                    className={`text-[34px] font-semibold leading-none tracking-[-0.03em] tabular-nums transition-colors duration-500 sm:text-[42px] ${
                      m.night ? "text-white" : done ? "text-[var(--v2-ink)]" : "text-[#b9c6bf]"
                    }`}
                  >
                    {m.time}
                  </time>
                  <p className={`${serif.className} text-[22px] leading-snug sm:text-[24px] ${m.night ? "text-white/90" : "text-[var(--v2-ink)]"}`}>
                    {m.where}
                  </p>
                  <div>
                    <p className={`text-[16px] leading-relaxed ${m.night ? "text-white/75" : "text-[var(--v2-body)]"}`}>{m.what}</p>
                    <p className={`mt-2 inline-flex items-center gap-2 text-[14px] font-semibold ${m.night ? "text-[#6ee7b7]" : "text-[var(--v2-green)]"}`}>
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {m.feature}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
