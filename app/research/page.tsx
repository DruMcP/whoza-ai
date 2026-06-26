import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { ArrowRight, FileText, BookOpen } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "AI Research for UK Trades | whoza.ai Library",
  description: "Independent AI research for UK tradespeople. Missed call impact studies, voice agent reports, and trade business optimisation data. Download free reports.",
  alternates: { canonical: "https://whoza.ai/research" },
  robots: { index: true, follow: true },
}

export const revalidate = 3600

const researchReports = [
  {
    date: "June 2026",
    title: "The True Cost of Missed Calls",
    description: "UK Trades Industry Financial Impact Report 2026. Quantifying revenue loss from missed calls across plumbing, electrical, roofing, building, and heating trades.",
    href: "/research/the-true-cost-of-missed-calls-2026",
    status: "live" as const,
  },
  {
    date: "June 2026",
    title: "Answer Engine Optimisation: Small Business & AI-Driven Search",
    description: "Independent research on AEO — how small businesses must prepare for AI-driven search or risk invisibility.",
    href: "/research/aeo-ai-search-optimisation-2026",
    status: "live" as const,
  },
  {
    date: "June 2026",
    title: "AI Voice Agents UK Trades 2026",
    description: "Comprehensive analysis of AI voice agent adoption, market dynamics, and ROI for UK trade businesses.",
    href: "/research/ai-voice-agents-uk-trades-2026",
    status: "live" as const,
  },
  {
    date: "June 2026",
    title: "Caller Experience Revolution: AI Voice Agents 2026",
    description: "How AI voice agents are transforming customer experience for UK trades — data, trends, and implementation strategies.",
    href: "/research/caller-experience-revolution-ai-voice-agents-2026",
    status: "live" as const,
  },
  {
    date: "June 2026",
    title: "Voice Agent Technology: State of the Art 2026",
    description: "End-to-end speech models, latency engineering, and the future of conversational AI.",
    href: "/research/voice-agent-technology-state-of-art-2026",
    status: "live" as const,
  },
]

export default function ResearchLanding() {
  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "Research", item: "https://whoza.ai/research" },
      ]} />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            Research Library
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">Research Library</h1>
          <p className="text-xl text-white/70 max-w-2xl">
            Independent research on AI voice technology, missed call impact, and trade business optimisation.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-6">
          {researchReports.map((report) => (
            <Link
              key={report.href}
              href={report.href}
              className="group block bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 transition-colors"
            >
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold mb-3">
                <FileText className="w-4 h-4" />
                {report.date}
              </div>
              <h2 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">
                {report.title}
              </h2>
              <p className="text-white/60 text-sm mb-4">{report.description}</p>
              <span className="inline-flex items-center gap-1 text-emerald-400 text-sm font-medium">
                Read report <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
