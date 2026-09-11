import Image from "next/image"
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
 * How it works — the four-step dispatch loop.
 *
 * Replaces the old how-whoza-works section, which explained the same journey without ever
 * showing it. Each step carries one concrete artefact: the forwarded call, the answered call,
 * the WhatsApp lead card, and the confirmation trail with its real timestamps. A tradesperson
 * should finish this section with nothing left to imagine about what happens to a missed call.
 *
 * Deliberately a server component: no state, no effects, so the whole thing exists in the
 * served HTML rather than after hydration.
 */

const GREEN = "var(--rex-green)"

const card =
  "relative flex h-full flex-col rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-7 shadow-sm"
const mock =
  "rounded-xl border border-[var(--border)] bg-white shadow-[0_8px_24px_-16px_rgba(15,23,42,0.35)]"
const heading = "mt-4 text-xl font-bold text-[var(--navy-900)]"
const para = "mt-2 text-sm leading-relaxed text-[var(--slate-500)]"

/** The order is the point, so every card wears its number. */
function Step({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-black text-white"
        style={{ backgroundColor: GREEN }}
      >
        {n}
      </span>
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[var(--rex-green)]/30 bg-[var(--rex-green)]/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[var(--rex-green)]">
        {children}
      </span>
    </div>
  )
}

function Chip({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <li className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--navy-900)]">
      <Icon size={13} style={{ color: GREEN }} /> {children}
    </li>
  )
}

/** WhatsApp's mark, drawn inline so the mock shows the real thing. */
function WhatsAppMark({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className={className} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
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
          style={{ height: `${h}px`, backgroundColor: GREEN, opacity: 0.75 }}
        />
      ))}
    </div>
  )
}

const TRAIL: Array<[string, string]> = [
  ["Job added to your pipeline", "10:25"],
  ["Customer notified on WhatsApp or SMS", "10:25"],
  ["Confirmation sent", "10:26"],
]

export function DispatchLoop() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-[var(--off-white)]" aria-label="How Whoza works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--rex-green)]/30 bg-[var(--rex-green)]/5 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-[var(--rex-green)]">
            <Zap size={14} /> How it works
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--navy-900)] tracking-tight text-balance">
            From missed call to booked job, in about two minutes
          </h2>
          <p className="mt-5 text-lg text-[var(--slate-500)] text-pretty">
            Whoza sits on your existing phone line and your business WhatsApp. Nothing new to learn.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2 reveal-stagger">
          {/* 01 — the call */}
          <article className={`${card} lg:row-span-2`}>
            <Step n="01">Customer calls</Step>
            <h3 className={heading}>You miss a call. Katie takes it.</h3>
            <p className={para}>
              On a job or driving, the call forwards to Whoza in under two seconds. Nothing changes about your number.
            </p>

            <div className="flex flex-1 items-center py-8">
              <div className={`${mock} w-full px-6 py-10`}>
                <div className="flex items-center gap-4">
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[var(--off-white)] text-[var(--slate-500)]">
                    <User size={26} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg font-bold text-[var(--navy-900)]">Incoming call</p>
                    <p className="mt-0.5 truncate font-mono text-base text-[var(--slate-500)]">+44 7723 456789</p>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-500 text-white">
                    <PhoneOff size={17} />
                  </span>
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: GREEN }}
                  >
                    <Phone size={17} />
                  </span>
                </div>
              </div>
            </div>

            <ul className="mt-auto flex flex-wrap gap-2 pt-6">
              <Chip icon={Phone}>Your existing number</Chip>
              <Chip icon={PhoneForwarded}>Instant forwarding</Chip>
            </ul>
          </article>

          {/* 02 — Katie */}
          <article className={card}>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <Step n="02">Katie answers</Step>
                <h3 className={heading}>Answered in under 3 seconds</h3>
                <p className={para}>
                  In your business name, with the accent you chose and your own rules for emergencies and pricing.
                </p>
              </div>
              <span className="relative flex h-16 w-16 shrink-0 overflow-hidden rounded-full ring-4 ring-[var(--rex-green)]/15">
                <Image src="/images/katie.webp" alt="Katie, the Whoza receptionist" fill sizes="64px" className="object-cover" />
              </span>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              <Chip icon={Mic}>Yorkshire accent</Chip>
              <Chip icon={Sparkles}>Natural voice</Chip>
              <Chip icon={Zap}>Under 3 seconds</Chip>
            </ul>
            <div className="mt-5">
              <Waveform />
            </div>
          </article>

          {/* 03 — the lead card */}
          <article className={card}>
            <Step n="03">WhatsApp dispatch</Step>
            <h3 className={heading}>A lead card on your WhatsApp</h3>
            <p className={para}>
              Name, job, postcode and an estimate, with Accept and Decline. Spam never reaches you.
            </p>
            <div className={`${mock} mt-5 p-4 text-xs`}>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-bold text-[var(--navy-900)]">
                  <WhatsAppMark size={16} className="text-[#25D366]" /> New lead from Whoza
                </span>
                <span className="text-[var(--slate-400)]">now</span>
              </div>
              <ul className="mt-3 grid gap-1.5 text-[var(--navy-900)] sm:grid-cols-2">
                <li className="flex items-center gap-2">
                  <User size={13} className="text-[var(--slate-400)]" /> John Smith
                </li>
                <li className="flex items-center gap-2">
                  <Wrench size={13} className="text-[var(--slate-400)]" /> Boiler repair
                </li>
                <li className="flex items-center gap-2">
                  <MapPin size={13} className="text-[var(--slate-400)]" /> Leeds, LS6
                </li>
                <li className="flex items-center gap-2">
                  <PoundSterling size={13} className="text-[var(--slate-400)]" /> £180 – £250
                </li>
              </ul>
            </div>
          </article>

          {/* 04 — one tap */}
          <article className={`${card} lg:col-span-2`}>
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div>
                <Step n="04">One-tap booking</Step>
                <h3 className={heading}>Tap Accept. Everything else happens for you.</h3>
                <p className={para}>
                  The job lands in your pipeline, the customer hears you are coming, and the confirmation goes out in
                  seconds.
                </p>
                <ul className={`${mock} mt-5 divide-y divide-[var(--border)] text-sm`}>
                  {TRAIL.map(([text, time]) => (
                    <li key={text} className="flex items-center justify-between gap-3 px-4 py-2.5">
                      <span className="flex items-center gap-3 font-semibold text-[var(--navy-900)]">
                        <CheckCircle2 size={17} className="shrink-0" style={{ color: GREEN }} /> {text}
                      </span>
                      <span className="text-xs text-[var(--slate-400)]">{time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mx-auto w-full max-w-[300px]">
                <div className="rounded-[2rem] border-[8px] border-[var(--navy-900)] bg-[var(--navy-900)]">
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
                      <div className="ml-auto max-w-[92%] rounded-xl rounded-tr-sm bg-[#d9fdd3] p-3 text-xs text-[var(--navy-900)] shadow-sm">
                        <p className="text-sm font-bold">New job: Boiler repair</p>
                        <ul className="mt-2 space-y-1">
                          <li className="flex items-center gap-2">
                            <User size={12} className="text-[var(--slate-500)]" /> John Smith
                          </li>
                          <li className="flex items-center gap-2">
                            <MapPin size={12} className="text-[var(--slate-500)]" /> Leeds, LS6
                          </li>
                          <li className="flex items-center gap-2">
                            <PoundSterling size={12} className="text-[var(--slate-500)]" /> £180 – £250 · ASAP
                          </li>
                        </ul>
                        <p className="mt-1.5 text-right text-[10px] text-[var(--slate-500)]">10:24</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <span
                          className="flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold text-white"
                          style={{ backgroundColor: GREEN }}
                        >
                          <Check size={15} /> Accept
                        </span>
                        <span className="flex items-center justify-center gap-2 rounded-lg bg-white py-2.5 text-sm font-bold text-[var(--navy-900)]">
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
