import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { Settings, Phone, MessageSquare, BarChart3, Shield, RefreshCw } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "How It Works | whoza.ai",
  description: "Discover how whoza.ai's AI voice agent Katie answers calls, qualifies leads, and books jobs for UK tradespeople — 24/7.",
  alternates: {
    canonical: "https://whoza.ai/how-it-works",
  },
  robots: {
    index: true,
    follow: true,
  },
}

const steps = [
  {
    icon: Settings,
    title: "1. Quick Setup",
    description: "Tell us about your business — your trade, services, areas you cover, and how you like to handle enquiries. Katie learns your voice in minutes.",
  },
  {
    icon: Phone,
    title: "2. Diverts Your Calls",
    description: "Forward your business number to whoza.ai. When a customer calls, Katie picks up instantly — no hold music, no voicemail, no missed jobs.",
  },
  {
    icon: MessageSquare,
    title: "3. Handles Every Enquiry",
    description: "Katie greets callers professionally, asks the right qualifying questions, checks your diary, and gives accurate quotes using your pricing rules.",
  },
  {
    icon: BarChart3,
    title: "4. Delivers to Your Phone",
    description: "Qualified enquiries land in your WhatsApp or SMS with caller details, job summary, and urgency level. You decide — accept, callback, or decline.",
  },
  {
    icon: Shield,
    title: "5. You Stay in Control",
    description: "Full dashboard visibility — listen to calls, tweak Katie's responses, set custom rules, and track every enquiry from first call to booked job.",
  },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "How It Works", item: "https://whoza.ai/how-it-works" },
      ]} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Banner */}
        <div className="mb-10 bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 flex items-start gap-4">
          <RefreshCw className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-300 font-semibold text-lg">Content Update in Progress</p>
            <p className="text-amber-200/70 mt-1">
              We're refreshing this page for our new AI voice agent platform. Check back soon or{" "}
              <Link href="/" className="underline hover:text-amber-300">explore our homepage</Link>.
            </p>
          </div>
        </div>

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Phone className="w-4 h-4" />
            Simple. Smart. 24/7.
          </div>
          <h1 className="text-4xl font-bold mb-4">How whoza.ai Works</h1>
          <p className="text-white/60 text-lg max-w-2xl">
            From the first ring to the booked job — here's how Katie becomes your AI revenue team in five simple steps.
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-start gap-5"
            >
              <div className="bg-emerald-500/10 rounded-lg p-3 flex-shrink-0">
                <step.icon className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">{step.title}</h2>
                <p className="text-white/60 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
          >
            <Phone className="w-5 h-5" />
            See Katie in Action
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
