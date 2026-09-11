import { Plus_Jakarta_Sans } from "next/font/google"
import {
  Check,
  CheckCircle2,
  ChevronLeft,
  MapPin,
  Mic,
  MoreVertical,
  Phone,
  PhoneForwarded,
  PhoneOff,
  PoundSterling,
  Sparkles,
  User,
  Video,
  Wrench,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react"

/**
 * How Whoza Works — the four-step dispatch loop, ported from app.whoza.ai unchanged.
 *
 * This IS the how-it-works section, not an addition to it. The version before this explained
 * the same journey in the abstract under "From Missed Call to 5-Star Review", promising a
 * review step the section never actually showed. Each card now carries one concrete artefact:
 * the forwarded call, the answered call, the WhatsApp lead card, and the confirmation trail
 * with its real timestamps.
 *
 * Deliberately a server component — no state, no motion wrappers — so the whole section exists
 * in the served HTML rather than after hydration.
 */

// The display face app.whoza.ai sets its headings in. Scoped to this section through next/font
// so the rest of the site keeps Inter and nothing is fetched on pages that never render this.
const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
  variable: "--font-whoza-display",
})

const EMERALD = "#10B981"

const label =
  "inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-300 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700"
// The card colour the design calls for: a lavender-grey (#DBD9E8) that reads against white.
const card =
  "relative isolate flex h-full flex-col overflow-hidden rounded-none border-2 border-[#DBD9E8] bg-white p-6 sm:p-7"
const mock =
  "rounded-md border border-[#DBD9E8] bg-white shadow-[0_8px_24px_-16px_rgba(15,23,42,0.35)]"
const h3 = "mt-4 text-xl font-extrabold text-slate-900 [font-family:var(--font-whoza-display)]"
const para = "mt-2 text-sm leading-relaxed text-slate-500"

/** Emerald glow rising from BOTH bottom corners of every card, fading to nothing by mid-height
 *  — colour at the base, white where the text is. */
function Wash() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-56"
      style={{
        background: `radial-gradient(55% 100% at 0% 100%, ${EMERALD}4d, transparent 72%), radial-gradient(55% 100% at 100% 100%, ${EMERALD}4d, transparent 72%)`,
      }}
    />
  )
}

/** WhatsApp's mark, drawn inline so the mocks show the real thing. */
function WhatsAppMark({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className={className} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

/** Line-art globe, the one illustration, kept to the first card's empty corner. */
function Globe() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 200"
      className="pointer-events-none absolute -bottom-12 -right-12 -z-10 hidden h-44 w-44 text-emerald-200 lg:block"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="100" cy="100" r="86" />
        <ellipse cx="100" cy="100" rx="38" ry="86" />
        <ellipse cx="100" cy="100" rx="68" ry="86" />
        <line x1="14" y1="100" x2="186" y2="100" />
        <ellipse cx="100" cy="100" rx="86" ry="32" />
        <ellipse cx="100" cy="100" rx="86" ry="62" />
      </g>
    </svg>
  )
}

function Waveform() {
  const bars = [6, 12, 18, 10, 22, 14, 8, 16, 20, 9, 14, 6, 11, 18, 7, 12, 9, 15, 8]
  return (
    <div className="flex h-6 items-end gap-[3px]" aria-hidden="true">
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-[3px] rounded-full"
          style={{ height: `${h}px`, backgroundColor: EMERALD, opacity: 0.8 }}
        />
      ))}
    </div>
  )
}

/** The four cards are a sequence, so each carries its number: the order IS the point. */
function Step({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-black text-white"
        style={{ backgroundColor: EMERALD }}
      >
        {n}
      </span>
      <span className={label}>{children}</span>
    </div>
  )
}

function MiniChip({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <li className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">
      <Icon size={13} className="text-emerald-600" /> {children}
    </li>
  )
}

const TRAIL: Array<[string, string]> = [
  ["Job added to your pipeline", "10:25"],
  ["Customer notified on WhatsApp or SMS", "10:25"],
  ["Confirmation sent", "10:26"],
]

export function HowWhozaWorks() {
  return (
    <section
      id="how-it-works"
      aria-label="How Whoza works"
      className={`${display.variable} border-y border-slate-200/70 bg-[#fafcfb] py-16 sm:py-20 lg:py-24`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className={label}>
            <Zap size={12} /> How it works
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl [font-family:var(--font-whoza-display)]">
            The <span className="text-[#047857]">10-second</span> automated dispatch loop
          </h2>
          <p className="mt-3 text-sm text-slate-500 sm:text-base">
            Whoza sits on your existing phone line and your business WhatsApp. Nothing new to learn.
          </p>
        </div>

        <div className="reveal mt-12 grid gap-5 lg:grid-cols-2">
          {/* 01 — the call (tall, left) */}
          <article className={`${card} lg:row-span-2`}>
            <Wash />
            <Globe />
            <Step n="01">Customer calls</Step>
            <h3 className={h3}>You miss a call. Katie takes it.</h3>
            <p className={para}>
              On a job or driving, the call forwards to Whoza in under two seconds. Nothing changes about your number.
            </p>

            {/* The call, centred in the space the card has: one caller, one number, answer or not. */}
            <div className="flex flex-1 items-center py-8">
              <div className={`${mock} w-full px-6 py-10`}>
                <div className="flex items-center gap-4">
                  <img
                    src="/images/caller-avatar.webp"
                    alt="A customer ringing a tradesperson"
                    width={80}
                    height={80}
                    loading="lazy"
                    className="h-20 w-20 shrink-0 rounded-full object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-lg font-bold text-slate-900">Incoming call</p>
                    <p className="mt-0.5 truncate font-mono text-base text-slate-600">+44 7723 456789</p>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-500 text-white">
                    <PhoneOff size={17} />
                  </span>
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: EMERALD }}
                  >
                    <Phone size={17} />
                  </span>
                </div>
              </div>
            </div>

            <ul className="mt-auto flex flex-wrap gap-2 pt-6">
              <MiniChip icon={Phone}>Your existing number</MiniChip>
              <MiniChip icon={PhoneForwarded}>Instant forwarding</MiniChip>
            </ul>
          </article>

          {/* 02 — Katie */}
          <article className={card}>
            <Wash />
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <Step n="02">Katie answers</Step>
                <h3 className={h3}>Answered in under 3 seconds</h3>
                <p className={para}>
                  In your business name, with the accent you chose and your own rules for emergencies and pricing.
                </p>
              </div>
              <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-emerald-50 ring-4 ring-emerald-100">
                <img
                  src="/images/katie-landing.webp"
                  alt="Katie, the Whoza receptionist"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </span>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              <MiniChip icon={Mic}>Yorkshire accent</MiniChip>
              <MiniChip icon={Sparkles}>Natural voice</MiniChip>
              <MiniChip icon={Zap}>Under 3 seconds</MiniChip>
            </ul>
            <div className="mt-5">
              <Waveform />
            </div>
          </article>

          {/* 03 — the lead card */}
          <article className={card}>
            <Wash />
            <Step n="03">WhatsApp dispatch</Step>
            <h3 className={h3}>A lead card on your WhatsApp</h3>
            <p className={para}>
              Name, job, postcode and an estimate, with Accept and Decline. Spam never reaches you.
            </p>
            <div className={`${mock} mt-5 p-4 text-xs`}>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-bold text-slate-900">
                  <WhatsAppMark size={16} className="text-[#25D366]" /> New lead from Whoza
                </span>
                <span className="text-slate-400">now</span>
              </div>
              <ul className="mt-3 grid gap-1.5 text-slate-700 sm:grid-cols-2">
                <li className="flex items-center gap-2">
                  <User size={13} className="text-slate-400" /> John Smith
                </li>
                <li className="flex items-center gap-2">
                  <Wrench size={13} className="text-slate-400" /> Boiler repair
                </li>
                <li className="flex items-center gap-2">
                  <MapPin size={13} className="text-slate-400" /> Leeds, LS6
                </li>
                <li className="flex items-center gap-2">
                  <PoundSterling size={13} className="text-slate-400" /> £180 – £250
                </li>
              </ul>
            </div>
          </article>

          {/* 04 — one tap (full width) */}
          <article className={`${card} lg:col-span-2`}>
            <Wash />
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div>
                <Step n="04">One-tap booking</Step>
                <h3 className={h3}>Tap Accept. Everything else happens for you.</h3>
                <p className={para}>
                  The job lands in your pipeline, the customer hears you are coming, and the confirmation goes out in
                  seconds.
                </p>
                <ul className={`${mock} mt-5 divide-y divide-slate-100 text-sm`}>
                  {TRAIL.map(([text, time]) => (
                    <li key={text} className="flex items-center justify-between gap-3 px-4 py-2.5">
                      <span className="flex items-center gap-3 font-semibold text-slate-800">
                        <CheckCircle2 size={17} className="shrink-0" style={{ color: EMERALD }} /> {text}
                      </span>
                      <span className="text-xs text-slate-400">{time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mx-auto w-full max-w-[300px]">
                <div className="rounded-[2rem] border-[8px] border-slate-900 bg-slate-900">
                  <div className="overflow-hidden rounded-[1.5rem] bg-[#efeae2]">
                    <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3 text-white">
                      <ChevronLeft size={16} />
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#25D366]">
                        <WhatsAppMark size={18} />
                      </span>
                      <div className="min-w-0 flex-1 leading-tight">
                        <p className="text-sm font-bold">Whoza</p>
                        <p className="text-[10px] text-emerald-100/80">Business account</p>
                      </div>
                      <Video size={15} className="text-emerald-100/80" />
                      <MoreVertical size={15} className="text-emerald-100/80" />
                    </div>
                    <div className="space-y-3 p-4">
                      <div className="ml-auto max-w-[92%] rounded-xl rounded-tr-sm bg-[#d9fdd3] p-3 text-xs text-slate-800 shadow-sm">
                        <p className="text-sm font-bold text-slate-900">New job: Boiler repair</p>
                        <ul className="mt-2 space-y-1">
                          <li className="flex items-center gap-2">
                            <User size={12} className="text-slate-500" /> John Smith
                          </li>
                          <li className="flex items-center gap-2">
                            <MapPin size={12} className="text-slate-500" /> Leeds, LS6
                          </li>
                          <li className="flex items-center gap-2">
                            <PoundSterling size={12} className="text-slate-500" /> £180 – £250 · ASAP
                          </li>
                        </ul>
                        <p className="mt-1.5 text-right text-[10px] text-slate-500">10:24</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <span
                          className="flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold text-white"
                          style={{ backgroundColor: EMERALD }}
                        >
                          <Check size={15} /> Accept
                        </span>
                        <span className="flex items-center justify-center gap-2 rounded-lg bg-white py-2.5 text-sm font-bold text-slate-700">
                          <X size={15} /> Decline
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
