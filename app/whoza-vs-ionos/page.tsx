import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { ArrowRight, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Whoza.ai vs IONOS — AI Call Answering Comparison",
  description: "Compare whoza.ai vs IONOS for UK trades. AI call answering from £59/month with 24/7 answering, WhatsApp delivery, and instant setup. See the full comparison.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://whoza.ai/whoza-vs-ionos",
  },
  openGraph: {
    url: "https://whoza.ai/whoza-vs-ionos",
  },
}

export default function WhozaVsIonosPage() {
  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />
      <BreadcrumbSchema
        items={[
          { name: "Home", item: "https://whoza.ai" },
          { name: "Whoza vs IONOS", item: "https://whoza.ai/whoza-vs-ionos" },
        ]}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">
          Whoza.ai vs <span className="text-[var(--katie-blue)]">IONOS</span>
        </h1>
        <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
          Full comparison coming soon. See how whoza.ai&apos;s AI call answering for UK tradespeople compares to IONOS.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-lg mx-auto mb-12">
          <h2 className="text-xl font-semibold mb-4">Try whoza.ai free for 7 days</h2>
          <ul className="text-left text-white/70 space-y-3 mb-6">
            <li className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--rex-green)]" />
              No credit card required
            </li>
            <li className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--rex-green)]" />
              No contract — cancel anytime
            </li>
            <li className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--rex-green)]" />
              Setup in 30 minutes
            </li>
            <li className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--rex-green)]" />
              Keep your existing number
            </li>
          </ul>
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[var(--katie-blue)] hover:bg-[var(--katie-blue)]/90 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Start Free Trial
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <p className="text-sm text-white/40">
          Comparison page will be updated with detailed feature comparison. Last updated: June 2026.
        </p>
      </main>

      <Footer />
    </div>
  )
}
