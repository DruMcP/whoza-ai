"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { BrickWall, Check, Droplets, Flame, Home, KeyRound, Zap, type LucideIcon } from "lucide-react"

/*
 * Pick a trade and watch an example call play out: the caller, Katie's
 * questions, then the job card that lands on WhatsApp with its red, amber or
 * green urgency flag. The calls are illustrative examples, labelled as such.
 * Every line is in the HTML from the start (screen readers get the whole call);
 * the animation only reveals them in turn, and reduced motion shows the end state.
 */

type Urgency = "red" | "amber" | "green"
type Script = {
  trade: string
  href: string
  icon: LucideIcon
  lines: { who: "caller" | "katie"; text: string }[]
  card: { job: string; urgency: Urgency; urgencyLabel: string; area: string; caller: string; note: string }
}

const SCRIPTS: Script[] = [
  {
    trade: "Plumbers",
    href: "/for-plumbers",
    icon: Droplets,
    lines: [
      { who: "caller", text: "Hi, there's water coming through my kitchen ceiling from the bathroom." },
      { who: "katie", text: "That sounds urgent. Is it still running, and can you turn off the stopcock?" },
      { who: "caller", text: "I've turned it off, it's slowing down. We're in Leeds, LS6." },
    ],
    card: { job: "Leak through kitchen ceiling", urgency: "red", urgencyLabel: "Urgent", area: "Leeds, LS6", caller: "Sarah", note: "Stopcock off, water slowing" },
  },
  {
    trade: "Electricians",
    href: "/for-electricians",
    icon: Zap,
    lines: [
      { who: "caller", text: "Half the sockets have gone off and the breaker keeps tripping." },
      { who: "katie", text: "Is anything burning or sparking, or did it start after plugging something in?" },
      { who: "caller", text: "Nothing burning, it started after the storm. I'm in Bristol, BS5." },
    ],
    card: { job: "Breaker keeps tripping", urgency: "amber", urgencyLabel: "Same day", area: "Bristol, BS5", caller: "Tom", note: "No burning smell, began after storm" },
  },
  {
    trade: "Heating",
    href: "/for-heating-engineers",
    icon: Flame,
    lines: [
      { who: "caller", text: "Our combi is showing a fault and there's no heating or hot water." },
      { who: "katie", text: "Which make is the boiler, and is anyone vulnerable in the house?" },
      { who: "caller", text: "It's a Worcester. My mum's 82 and lives with us. Manchester, M20." },
    ],
    card: { job: "Combi boiler, no heat or hot water", urgency: "red", urgencyLabel: "Urgent", area: "Manchester, M20", caller: "Priya", note: "Vulnerable occupant, aged 82" },
  },
  {
    trade: "Roofers",
    href: "/for-roofers",
    icon: Home,
    lines: [
      { who: "caller", text: "We've lost a few tiles in the wind and there's a damp patch in the loft." },
      { who: "katie", text: "Is water coming in right now, and roughly how many tiles are missing?" },
      { who: "caller", text: "Only when it rains, maybe four or five. We're in Glasgow, G12." },
    ],
    card: { job: "Storm damage, missing tiles", urgency: "amber", urgencyLabel: "This week", area: "Glasgow, G12", caller: "Ewan", note: "Damp patch in loft, 4 to 5 tiles" },
  },
  {
    trade: "Locksmiths",
    href: "/for-locksmiths",
    icon: KeyRound,
    lines: [
      { who: "caller", text: "I've locked myself out and my keys are inside. The kids are home at four." },
      { who: "katie", text: "Is it a uPVC door, or a wooden door with a mortice lock?" },
      { who: "caller", text: "uPVC, front door. I'm in Edinburgh, EH6." },
    ],
    card: { job: "Lockout, uPVC front door", urgency: "red", urgencyLabel: "Now", area: "Edinburgh, EH6", caller: "Claire", note: "Children home at 4pm" },
  },
  {
    trade: "Builders",
    href: "/for-builders",
    icon: BrickWall,
    lines: [
      { who: "caller", text: "We're after a quote for a single-storey kitchen extension on a semi." },
      { who: "katie", text: "Do you have drawings or planning yet, and when would you like to start?" },
      { who: "caller", text: "Drawings are done, we're hoping for spring. Birmingham, B13." },
    ],
    card: { job: "Kitchen extension quote", urgency: "green", urgencyLabel: "Quote", area: "Birmingham, B13", caller: "Mark", note: "Drawings ready, spring start" },
  },
]

const URGENCY: Record<Urgency, string> = {
  red: "bg-[#fde8e8] text-[#b42318]",
  amber: "bg-[#fef3e2] text-[#a15c07]",
  green: "bg-[var(--v2-mint)] text-[var(--v2-green-ink)]",
}
const URGENCY_DOT: Record<Urgency, string> = { red: "bg-[#e5484d]", amber: "bg-[#f59e0b]", green: "bg-[#1fcd80]" }

// Timeline of one call, in ms: typing then a bubble for each line, then the card.
const TYPING_MS = 750
const READ_MS = 1250

export function TradeCallDemo() {
  const [active, setActive] = useState(0)
  const [shown, setShown] = useState(0) // bubbles visible
  const [typing, setTyping] = useState<"caller" | "katie" | null>(null)
  const [sent, setSent] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const script = SCRIPTS[active]

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => entry.isIntersecting && setInView(true), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Play the call for the active trade.
  useEffect(() => {
    const total = script.lines.length
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(total)
      setTyping(null)
      setSent(true)
      setSeconds(38)
      return
    }
    setShown(0)
    setTyping(null)
    setSent(false)
    setSeconds(0)
    if (!inView) return

    const timers: number[] = []
    let t = 400
    script.lines.forEach((line, i) => {
      timers.push(window.setTimeout(() => setTyping(line.who), t))
      t += TYPING_MS
      timers.push(
        window.setTimeout(() => {
          setTyping(null)
          setShown(i + 1)
        }, t),
      )
      t += READ_MS
    })
    timers.push(window.setTimeout(() => setSent(true), t))
    // The clock runs at roughly call speed, so a call ends around 00:40.
    const clock = window.setInterval(() => setSeconds((s) => s + 1), 150)
    timers.push(window.setTimeout(() => window.clearInterval(clock), t))
    return () => {
      timers.forEach((id) => window.clearTimeout(id))
      window.clearInterval(clock)
    }
  }, [active, inView, script])

  const speaking = typing !== null || (shown > 0 && !sent)
  const clock = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`

  return (
    <section ref={sectionRef} className="v2-section bg-[var(--v2-paper)]" aria-labelledby="trade-call-heading">
      <div className="v2-container">
        <div className="max-w-2xl">
          <h2 id="trade-call-heading" className="v2-h2 text-balance">
            Pick your trade and watch Katie take the call
          </h2>
          <p className="v2-lead mt-4">
            An example call for each trade, start to finish: what the caller says, what Katie asks, and the job card that lands on your WhatsApp.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-10">
          {/* Trade picker. min-w-0 lets the tab row scroll inside the column on phones. */}
          <div className="min-w-0">
            <div
              role="tablist"
              aria-label="Choose a trade"
              className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
            >
              {SCRIPTS.map((s, i) => {
                const Icon = s.icon
                const selected = i === active
                return (
                  <button
                    key={s.trade}
                    type="button"
                    role="tab"
                    id={`trade-tab-${i}`}
                    aria-selected={selected}
                    aria-controls="trade-call-panel"
                    onClick={() => setActive(i)}
                    className={`flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-left text-[15px] font-semibold transition-colors ${
                      selected
                        ? "bg-[var(--v2-navy)] text-white"
                        : "bg-white text-[var(--v2-ink)] ring-1 ring-[var(--v2-line)] hover:ring-[#b9c6bf]"
                    }`}
                  >
                    <Icon className={`h-[18px] w-[18px] ${selected ? "text-[#6ee7b7]" : "text-[var(--v2-green)]"}`} aria-hidden="true" />
                    {s.trade}
                  </button>
                )
              })}
            </div>
            <Link
              href={script.href}
              className="mt-5 hidden text-[15px] font-semibold text-[var(--v2-green)] underline underline-offset-4 hover:text-[var(--v2-green-hover)] lg:inline-block"
            >
              Katie for {script.trade.toLowerCase()}
            </Link>
          </div>

          {/* Stage */}
          <div
            id="trade-call-panel"
            role="tabpanel"
            aria-labelledby={`trade-tab-${active}`}
            className="wa-wallpaper relative min-w-0 overflow-hidden rounded-[30px] px-4 py-8 sm:px-8 sm:py-10"
          >
            <p className="absolute right-5 top-4 text-[12.5px] font-medium text-[#6f6457]">Example call</p>

            <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-center md:gap-0">
              {/* Phone: the call */}
              <div className="w-full max-w-[310px] shrink-0 rounded-[38px] bg-[#070b16] p-2.5 shadow-[0_30px_60px_-30px_rgba(15,22,40,0.7)]">
                <div className="rounded-[30px] bg-[var(--v2-navy)] px-4 pb-4 pt-5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--v2-green)] text-[15px] font-bold text-white">K</span>
                    <div className="leading-tight">
                      <p className="text-[15px] font-semibold text-white">Katie</p>
                      <p className="flex items-center gap-1.5 text-[12.5px] text-white/60">
                        <span className={`h-1.5 w-1.5 rounded-full ${sent ? "bg-white/40" : "bg-[#1fcd80] animate-pulse"}`} />
                        {sent ? "Call ended" : "On a call"}
                        <span className="tabular-nums">{clock}</span>
                      </p>
                    </div>
                  </div>

                  <ol className="mt-4 flex h-[268px] flex-col justify-end gap-2 overflow-hidden" aria-label={`Example ${script.trade.toLowerCase()} call`}>
                    {script.lines.map((line, i) => (
                      <li
                        key={`${active}-${i}`}
                        className={`max-w-[86%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-snug transition-all duration-500 ease-[var(--v2-ease)] ${
                          line.who === "katie"
                            ? "self-end rounded-br-md bg-[var(--v2-green)] text-white"
                            : "self-start rounded-bl-md bg-white/10 text-white/90"
                        } ${i < shown ? "translate-y-0 opacity-100" : "pointer-events-none h-0 translate-y-3 !py-0 opacity-0"}`}
                      >
                        <span className="sr-only">{line.who === "katie" ? "Katie: " : "Caller: "}</span>
                        {line.text}
                      </li>
                    ))}
                    <li
                      aria-hidden="true"
                      className={`flex gap-1 rounded-2xl px-3.5 py-3 transition-opacity duration-200 ${
                        typing ? "opacity-100" : "h-0 !py-0 opacity-0"
                      } ${typing === "katie" ? "self-end bg-[var(--v2-green)]/80" : "self-start bg-white/10"}`}
                    >
                      {[0, 1, 2].map((d) => (
                        <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/80" style={{ animationDelay: `${d * 120}ms` }} />
                      ))}
                    </li>
                  </ol>

                  <div className="mt-4 flex h-8 items-center justify-center gap-[3px]" aria-hidden="true">
                    {Array.from({ length: 22 }).map((_, i) => (
                      <span
                        key={i}
                        className={`w-[3px] rounded-full bg-[#1fcd80] ${speaking ? "call-wave" : ""}`}
                        style={{ height: 6 + ((i * 7) % 18), animationDelay: `${(i % 6) * 90}ms`, opacity: speaking ? 0.9 : 0.25 }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Hand-off from the call to WhatsApp */}
              <div className="relative h-12 w-px md:h-px md:w-16" aria-hidden="true">
                <span className="absolute inset-0 border-l-2 border-dashed border-[#b9a993] md:border-l-0 md:border-t-2" />
                <span className={`absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[var(--v2-green)] md:left-0 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 ${sent ? "handoff-dot" : "opacity-0"}`} />
              </div>

              {/* WhatsApp: the job card */}
              <div
                className={`w-full max-w-[320px] transition-all duration-700 ease-[var(--v2-ease)] ${
                  sent ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-[0.97] opacity-0"
                }`}
              >
                <div className="relative rounded-2xl rounded-tl-md bg-white p-4 shadow-[0_20px_40px_-24px_rgba(15,22,40,0.45)]">
                  <div className="flex items-center justify-between">
                    <p className="text-[13px] font-bold text-[var(--v2-green)]">whoza.ai</p>
                    <p className="text-[11.5px] text-[var(--v2-muted)]">Sent to your WhatsApp</p>
                  </div>
                  <p className="mt-2 text-[16px] font-semibold leading-snug text-[var(--v2-ink)]">{script.card.job}</p>
                  <span className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold ${URGENCY[script.card.urgency]}`}>
                    <span className={`h-2 w-2 rounded-full ${URGENCY_DOT[script.card.urgency]}`} />
                    {script.card.urgency.toUpperCase()}: {script.card.urgencyLabel}
                  </span>
                  <dl className="mt-3 grid grid-cols-[72px_1fr] gap-y-1.5 text-[13px]">
                    <dt className="text-[var(--v2-muted)]">Area</dt>
                    <dd className="font-medium text-[var(--v2-ink)]">{script.card.area}</dd>
                    <dt className="text-[var(--v2-muted)]">Caller</dt>
                    <dd className="font-medium text-[var(--v2-ink)]">{script.card.caller}</dd>
                    <dt className="text-[var(--v2-muted)]">Notes</dt>
                    <dd className="font-medium text-[var(--v2-ink)]">{script.card.note}</dd>
                  </dl>
                  <div className="mt-4 grid grid-cols-3 gap-1.5 text-[12.5px] font-semibold" aria-hidden="true">
                    <span className="inline-flex items-center justify-center gap-1 rounded-full bg-[var(--v2-green)] py-2 text-white">
                      <Check className="h-3.5 w-3.5" /> Accept
                    </span>
                    <span className="inline-flex items-center justify-center rounded-full bg-[var(--v2-paper)] py-2 text-[var(--v2-ink)] ring-1 ring-[var(--v2-line)]">Call back</span>
                    <span className="inline-flex items-center justify-center rounded-full bg-[var(--v2-paper)] py-2 text-[var(--v2-ink)] ring-1 ring-[var(--v2-line)]">Decline</span>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href={script.href}
              className="mt-6 block text-center text-[15px] font-semibold text-[var(--v2-green-ink)] underline underline-offset-4 lg:hidden"
            >
              Katie for {script.trade.toLowerCase()}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
