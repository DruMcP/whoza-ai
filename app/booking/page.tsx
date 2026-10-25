import type { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { Calendar, Clock, Check, ArrowRight, Zap } from "lucide-react"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "AI Booking & Scheduling | whoza.ai Calendar Integration",
  description: "whoza.ai checks your calendar before booking jobs. Google Calendar, Outlook, Apple Calendar. No double-bookings. Built for UK tradespeople.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/booking",
    siteName: "Whoza.ai",
    title: "AI Booking & Scheduling | whoza.ai Calendar Integration",
    description: "whoza.ai checks your calendar before booking jobs. Google Calendar, Outlook, Apple Calendar. No double-bookings. Built for UK tradespeople.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "Whoza.ai Booking" }],
  },
  alternates: {
    canonical: "https://whoza.ai/booking",
  },
}

export const revalidate = 3600

const steps = [
  {
    title: "Caller Describes the Job",
    desc: "The AI asks what needs doing, where, and when it is needed. It captures urgency, property type, and estimated scope.",
  },
  {
    title: "AI Checks Your Calendar",
    desc: "Before offering a slot, the AI reads your connected calendar (Google, Outlook, or Apple) to see when you are actually free.",
  },
  {
    title: "Offers Available Slots",
    desc: "The AI offers 2–3 time slots that work for both you and the caller. The caller picks one — or asks for alternatives.",
  },
  {
    title: "Booking Confirmed",
    desc: "The job is added to your calendar instantly. You get a WhatsApp summary with the booking details. The caller gets confirmation.",
  },
]

const calendars = [
  { name: "Google Calendar", desc: "Most popular. Two-way sync. Checks availability in real time." },
  { name: "Outlook / Microsoft 365", desc: "Business-standard. Works with Exchange and Office 365 accounts." },
  { name: "Apple Calendar", desc: "iCloud sync for iPhone and Mac users. Seamless integration." },
]

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-[var(--v2-paper)] text-[var(--v2-body)] v2-page">
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "Booking", item: "https://whoza.ai/booking" },
      ]} />

      <main id="main-content" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-[var(--v2-mint)] text-[var(--v2-green)] px-4 py-2 rounded-full text-sm font-medium mb-6">
            AI Scheduling
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Never Double-Book Again
          </h1>
          <p className="text-[var(--v2-body)] max-w-2xl text-lg">
            whoza.ai checks your calendar before confirming any job. Google Calendar, Outlook, Apple Calendar — all supported. Available on every plan.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8">How It Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.title} className="bg-white border border-[var(--v2-line)] rounded-2xl p-6 relative">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[var(--v2-green)] text-white flex items-center justify-center text-sm font-bold v2-island">
                  {i + 1}
                </div>
                <h3 className="font-semibold mb-2 mt-2">{step.title}</h3>
                <p className="text-[var(--v2-body)] text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Supported Calendars</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {calendars.map((cal) => (
              <div key={cal.name} className="bg-white border border-[var(--v2-line)] rounded-2xl p-6 flex items-start gap-4">
                <Calendar className="w-6 h-6 text-[var(--v2-green)] shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">{cal.name}</h3>
                  <p className="text-[var(--v2-body)] text-sm">{cal.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white border border-[var(--v2-line)] rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-semibold mb-4">What the AI Actually Does</h2>
          <ul className="space-y-3 text-[var(--v2-body)]">
            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[var(--v2-green)] shrink-0 mt-0.5" /> Reads your calendar in real time before offering slots</li>
            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[var(--v2-green)] shrink-0 mt-0.5" /> Respects working hours and blocked-out days</li>
            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[var(--v2-green)] shrink-0 mt-0.5" /> Adds confirmed bookings directly to your calendar</li>
            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[var(--v2-green)] shrink-0 mt-0.5" /> Sends you a WhatsApp summary with all details</li>
            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[var(--v2-green)] shrink-0 mt-0.5" /> Flags urgent jobs that need same-day attention</li>
            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[var(--v2-green)] shrink-0 mt-0.5" /> Learns your preferences over time (preferred times, travel radius)</li>
          </ul>
        </section>

        <section className="bg-[var(--v2-mint)] border border-[var(--v2-green)]/20 rounded-2xl p-8 mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-6 h-6 text-[var(--v2-green)]" />
            <h2 className="text-2xl font-semibold text-[var(--v2-ink)]">And if they'd rather talk to you?</h2>
          </div>
          <p className="text-[var(--v2-body)] leading-relaxed mb-4">
            They say so, and Katie puts them through.
          </p>
          <p className="text-[var(--v2-body)] leading-relaxed mb-4">
            Not "someone will call you back." Not a message in a queue. A live transfer, on that call, to your phone.
          </p>
          <p className="text-[var(--v2-body)] leading-relaxed mb-4">
            If you're up a ladder and can't take it, she takes the details and books them in — same as always. But the choice is the customer's, not the software's.
          </p>
          <p className="text-[var(--v2-muted)] text-sm leading-relaxed">
            Transfer only works if you're available to answer. If you don't pick up, it falls back to booking or message capture — so the caller never gets left hanging.
          </p>
        </section>

        <section className="text-center">
          <p className="text-[var(--v2-body)] mb-6">
            Calendar integration is included on every plan — Starter, Growth, Pro, and Scale.
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 bg-[var(--v2-green)] text-white px-8 py-3 rounded-lg font-medium hover:bg-[var(--v2-green-hover)] transition-colors v2-island"
          >
            View Pricing <ArrowRight className="w-4 h-4" />
          </a>
        </section>
      </main>

      <Footer />
    </div>
  )
}
