"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Copy, Globe, Phone } from "lucide-react"
import { TrialButton } from "@/components/whoza/trial-button"

/*
 * Set-up in four steps, laid out like the echocall.de "How it works" section:
 * the heading stays pinned on the left while the step cards scroll past, and a
 * numbered rail beside the cards follows along (click a number to jump to that
 * step). The steps are the real onboarding in the whoza.ai app: business
 * details and website scan, Customize & Test, the 7-day trial with a UK number,
 * then the call-forwarding code and its test calls. Each card shows a small,
 * live mock of that screen.
 */

const STEPS = [
  {
    title: "Tell us about your business",
    text: "Add your trade and website. We scan your site for your services, area and hours, so Katie knows your business from day one.",
  },
  {
    title: "Customise and test Katie",
    text: "Pick her voice, set her greeting and ring her yourself from the browser before any customer does.",
  },
  {
    title: "Start your free trial",
    text: "7 days free on Starter. We set up your UK whoza.ai number for you.",
  },
  {
    title: "Forward your calls",
    text: "Dial one code on your mobile and we ring you to check it works. From then on, every missed call is answered and each job lands on your WhatsApp.",
  },
]

/* ---------- the four mock screens ---------- */

function ScreenTitle({ children }: { children: React.ReactNode }) {
  return <p className="text-[14px] font-semibold text-[var(--v2-ink)]">{children}</p>
}

function TickChip({ label, delay }: { label: string; delay: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--v2-line)] bg-white py-1 pl-1.5 pr-3 text-[12px] font-medium text-[var(--v2-ink)]">
      <span className="hiw-tick grid h-4 w-4 place-items-center rounded-full bg-[var(--v2-green)]" style={{ animationDelay: `${delay}s` }}>
        <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} aria-hidden="true" />
      </span>
      {label}
    </span>
  )
}

function BusinessScreen() {
  return (
    <div className="h-full p-5">
      <ScreenTitle>Business information</ScreenTitle>
      <div className="relative mt-3 overflow-hidden rounded-xl bg-[#eef3ef] px-3.5 py-3">
        <div className="flex items-center justify-between gap-3">
          <span className="flex min-w-0 items-center gap-2.5 text-[13px] text-[var(--v2-ink)]">
            <Globe className="h-4 w-4 shrink-0 text-[var(--v2-green)]" aria-hidden="true" />
            <span className="truncate">smithplumbing.co.uk</span>
          </span>
          <span className="hiw-ready inline-flex shrink-0 items-center gap-1 text-[12px] font-medium text-[var(--v2-green)]">
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
            Scanned
          </span>
        </div>
        <span className="hiw-scan-bar absolute bottom-0 left-0 h-[3px] w-full origin-left bg-[var(--v2-green)]" />
      </div>
      <p className="mt-3 text-[12px] text-[var(--v2-muted)]">Pages we found</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {["Home", "Services", "Areas we cover", "Prices"].map((page, i) => (
          <TickChip key={page} label={page} delay={i * 0.35} />
        ))}
      </div>
    </div>
  )
}

function AgentScreen() {
  const voices = ["Scottish · Female", "Northern · Male", "+10 more"]
  return (
    <div className="relative h-full p-5">
      <ScreenTitle>Customise &amp; test</ScreenTitle>
      <div className="mt-3 flex gap-1.5 overflow-hidden">
        {voices.map((voice, i) => (
          <span
            key={voice}
            className={`shrink-0 rounded-full border px-3 py-1.5 text-[12px] font-medium ${
              i === 0
                ? "border-[var(--v2-green)] bg-[var(--v2-mint)] text-[var(--v2-green-ink)]"
                : "border-[var(--v2-line)] bg-white text-[var(--v2-muted)]"
            }`}
          >
            {voice}
          </span>
        ))}
      </div>
      <div className="mt-3 rounded-xl bg-[#eef3ef] px-3.5 py-3">
        <p className="text-[12px] text-[var(--v2-muted)]">Greeting</p>
        <p className="mt-0.5 text-[13px] leading-snug text-[var(--v2-ink)]">
          Hi, you&apos;re through to Smith Plumbing. I&apos;m Katie, how can I help?
          <span className="hiw-caret ml-0.5 inline-block h-3.5 w-px translate-y-0.5 bg-[var(--v2-ink)]" />
        </p>
      </div>
      {/* The floating button, and the pointer that presses it */}
      <span className="hiw-press absolute right-7 top-[172px] inline-flex items-center gap-1.5 rounded-full bg-[var(--v2-navy)] px-4 py-2 text-[13px] font-medium text-white shadow-[0_10px_24px_-10px_rgba(15,22,40,0.6)]">
        <Phone className="h-3.5 w-3.5" aria-hidden="true" />
        Test call
      </span>
      <svg className="hiw-pointer absolute right-9 top-[190px] h-6 w-6" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 3l14 8-6.5 1.5L9 19z" fill="#0f1628" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

function TrialScreen() {
  return (
    <div className="h-full p-5">
      <ScreenTitle>Choose your plan</ScreenTitle>
      <div className="mt-3 rounded-xl border-2 border-[var(--v2-green)] bg-white px-3.5 py-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[14px] font-semibold text-[var(--v2-ink)]">Starter</span>
          <span className="rounded-full bg-[var(--v2-mint)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--v2-green-ink)]">7-day free trial</span>
        </div>
        <p className="mt-1 text-[12px] text-[var(--v2-muted)]">100 minutes + 10 jobs included</p>
      </div>
      <div className="mt-2.5 flex items-center justify-between gap-2 rounded-xl bg-[#eef3ef] px-3.5 py-3">
        <span className="leading-tight">
          <span className="block text-[12px] text-[var(--v2-muted)]">Your UK number</span>
          <span className="block text-[13px] font-medium text-[var(--v2-ink)]">+44 7700 900123</span>
        </span>
        <span className="relative text-[12px] font-medium">
          <span className="hiw-setting-up absolute right-0 whitespace-nowrap text-[var(--v2-muted)]">Setting up…</span>
          <span className="hiw-ready inline-flex items-center gap-1 text-[var(--v2-green)]">
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
            Ready
          </span>
        </span>
      </div>
    </div>
  )
}

function ForwardScreen() {
  return (
    <div className="h-full p-5">
      <ScreenTitle>Call forwarding</ScreenTitle>
      <div className="mt-3 rounded-xl bg-[#eef3ef] px-3.5 py-3">
        <p className="text-[12px] text-[var(--v2-muted)]">Dial once on your mobile</p>
        <div className="mt-1 flex items-center justify-between gap-2">
          <code className="truncate font-mono text-[13px] font-medium text-[var(--v2-ink)]">**004*+447700900123**15#</code>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-white px-2 py-1 text-[11px] font-medium text-[var(--v2-ink)]">
            <Copy className="h-3 w-3" aria-hidden="true" />
            Copy
          </span>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {[1, 2, 3].map((n, i) => (
          <TickChip key={n} label={`Test call ${n}`} delay={i * 0.5} />
        ))}
      </div>
      <p className="hiw-ready mt-3 flex items-center gap-1.5 text-[13px] font-medium text-[var(--v2-green)]" style={{ animationDelay: "1.2s" }}>
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--v2-green)]" />
        Forwarding is working
      </p>
    </div>
  )
}

/* In the order of STEPS */
const SCREENS = [BusinessScreen, AgentScreen, TrialScreen, ForwardScreen]

export function HowItWorksSteps() {
  const [active, setActive] = useState(0)
  const cardRefs = useRef<(HTMLLIElement | null)[]>([])

  // The rail follows whichever card crosses the middle of the screen.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.step))
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    )
    cardRefs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const goTo = (i: number) => {
    const el = cardRefs.current[i]
    if (!el) return
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 140, behavior: smooth ? "smooth" : "auto" })
  }

  return (
    <section id="setup-steps" className="v2-section bg-[var(--v2-paper)]" aria-labelledby="setup-steps-heading">
      <div className="v2-container lg:flex lg:items-start">
        {/* Pinned heading */}
        <div className="max-w-2xl lg:sticky lg:top-[140px] lg:max-w-none lg:flex-1">
          <span className="v2-eyebrow">Getting started</span>
          <h2 id="setup-steps-heading" className="v2-h2 text-balance">
            Set up whoza.ai in <span className="v2-accent">4 simple steps</span>
          </h2>
          <p className="v2-lead mt-4">Most trades are live in under 30 minutes. No technical skills needed.</p>
          <div className="mt-8 hidden lg:block">
            <TrialButton source="setup-steps" />
          </div>
        </div>

        {/* Pinned divider */}
        <div className="mx-12 hidden h-[520px] w-px shrink-0 bg-[var(--v2-line)] lg:sticky lg:top-[140px] lg:block" aria-hidden="true" />

        {/* The step cards */}
        <ol className="mt-10 w-full max-w-[460px] list-none space-y-6 p-0 lg:mt-0 lg:w-[420px] lg:shrink-0 lg:space-y-48">
          {STEPS.map((step, i) => {
            const Screen = SCREENS[i]
            return (
              <li
                key={step.title}
                ref={(el) => {
                  cardRefs.current[i] = el
                }}
                data-step={i}
                className="rounded-[28px] bg-[#eef3ef] p-5 sm:p-6"
              >
                <figure className="m-0 rounded-[20px] bg-[linear-gradient(to_bottom,#b5ccbf_65%,#eef3ef)] p-2 pb-0" aria-hidden="true">
                  <div className="relative h-[264px] overflow-hidden rounded-t-[14px] bg-white">
                    <Screen />
                    {/* The screen fades into the card at the bottom */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#eef3ef] to-transparent" />
                  </div>
                </figure>
                <div className="mt-5">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--v2-green)]">Step {i + 1}</p>
                  <h3 className="v2-h3 mt-1.5">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--v2-body)]">{step.text}</p>
                </div>
              </li>
            )
          })}
        </ol>

        {/* Pinned step rail */}
        <div className="ml-8 hidden shrink-0 flex-col gap-y-2 lg:sticky lg:top-[140px] lg:flex" role="group" aria-label="Go to a step">
          {STEPS.map((step, i) => (
            <button
              key={step.title}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Step ${i + 1}: ${step.title}`}
              aria-current={i === active ? "step" : undefined}
              className={`flex h-[56px] w-[42px] cursor-pointer items-center justify-center rounded-full text-[17px] font-semibold transition-colors duration-300 ${
                i === active ? "bg-[var(--v2-green)] text-white" : "bg-[#eef3ef] text-[var(--v2-muted)] hover:text-[var(--v2-ink)]"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
