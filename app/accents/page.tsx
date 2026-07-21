import type { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { Mic, Check, ArrowRight, MapPin } from "lucide-react"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "UK AI Voice Accents | Scottish, English, Welsh | whoza.ai",
  description: "Choose from 12 AI voice options (UK accents): Scottish, English (Northern, Southern, Midlands), and Welsh. Your AI receptionist sounds local to your customers.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/accents",
    siteName: "Whoza.ai",
    title: "UK AI Voice Accents | Scottish, English, Welsh | whoza.ai",
    description: "Choose from 12 AI voice options (UK accents): Scottish, English (Northern, Southern, Midlands), and Welsh. Your AI receptionist sounds local to your customers.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "Whoza.ai Voice Accents" }],
  },
  alternates: {
    canonical: "https://whoza.ai/accents",
  },
}

export const revalidate = 3600

const accents = [
  { name: "Scottish", region: "Scotland", desc: "Warm, trustworthy. Perfect for Scottish trade businesses." },
  { name: "Northern English", region: "North East / Yorkshire", desc: "Friendly, down-to-earth. Great for northern England trades." },
  { name: "Southern English", region: "London / South East", desc: "Clear, professional. Standard for London and southern businesses." },
  { name: "Midlands English", region: "Birmingham / Midlands", desc: "Approachable, local. Ideal for Midlands-based trades." },
  { name: "Welsh", region: "Wales", desc: "Distinctive, warm. Builds instant rapport in Wales." },
]

const features = [
  "12 AI voice options (UK accents)",
  "Male and female voice options",
  "Customisable greeting scripts",
  "Accents matched to your region",
  "Natural, conversational tone — not robotic",
  "Switch accent anytime from your dashboard",
]

export default function AccentsPage() {
  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "Accents", item: "https://whoza.ai/accents" },
      ]} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-[var(--katie-blue)]/10 text-[var(--katie-blue)] px-4 py-2 rounded-full text-sm font-medium mb-6">
            Voice Options
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your AI Receptionist Sounds Local
          </h1>
          <p className="text-white/60 max-w-2xl text-lg">
            Choose from 12 AI voice options (UK accents). Scottish, English, Welsh — male and female voices. Your customers hear someone who sounds like they are from the same area.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Available Accents</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accents.map((accent) => (
              <div key={accent.name} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--katie-blue)]/10 flex items-center justify-center">
                    <Mic className="w-5 h-5 text-[var(--katie-blue)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{accent.name}</h3>
                    <span className="text-xs text-white/50 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {accent.region}
                    </span>
                  </div>
                </div>
                <p className="text-white/60 text-sm">{accent.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white/5 border border-white/10 rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-semibold mb-6">Why Regional Accents Matter</h2>
          <div className="grid md:grid-cols-2 gap-6 text-white/70">
            <div>
              <h3 className="font-semibold text-white mb-2">Trust and Familiarity</h3>
              <p className="text-sm">Callers trust voices that sound like their own community. A Scottish plumber in Glasgow gets better results with a Scottish accent than a generic American one.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Higher Conversion</h3>
              <p className="text-sm">Tradespeople report higher booking rates when the AI voice matches the local area. It removes the "call centre" feeling.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Brand Consistency</h3>
              <p className="text-sm">If your business serves a specific region, your AI voice should reflect that. It is part of your brand identity.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Change Anytime</h3>
              <p className="text-sm">Expanding from Edinburgh to London? Switch accent in your dashboard in 30 seconds. No setup fee, no downtime.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Included on Every Plan</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-white/80">{f}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="text-center">
          <p className="text-white/60 mb-6">
            All voice options are included on every plan — Starter, Growth, Pro, and Scale.
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 bg-[var(--katie-blue)] text-white px-8 py-3 rounded-lg font-medium hover:bg-[var(--katie-blue)]/90 transition-colors"
          >
            View Pricing <ArrowRight className="w-4 h-4" />
          </a>
        </section>
      </main>

      <Footer />
    </div>
  )
}
