import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { Shield, Lock, Server, FileCheck, Clock, Globe, RefreshCw } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Trust & Security | whoza.ai",
  description: "whoza.ai is ICO-registered, UK GDPR compliant, and SOC 2 Type II certified. Your data and your customers' data are protected.",
  alternates: {
    canonical: "https://whoza.ai/trust",
  },
  robots: {
    index: true,
    follow: true,
  },
}

const trustItems = [
  {
    icon: Shield,
    title: "ICO Registered",
    description: "WHOZA AI LTD is registered with the UK Information Commissioner's Office (ICO Registration: ZC077271) as a data controller and processor.",
  },
  {
    icon: Lock,
    title: "UK GDPR Compliant",
    description: "All data processing follows UK General Data Protection Regulation and the Data Protection Act 2018. Callers are notified at the start of every call that AI is handling the conversation.",
  },
  {
    icon: Server,
    title: "SOC 2 Type II Certified",
    description: "Our infrastructure meets SOC 2 Type II standards for security, availability, and confidentiality. Encryption in transit (TLS 1.3) and at rest.",
  },
  {
    icon: FileCheck,
    title: "Data Processing Agreements",
    description: "All third-party processors (voice AI, payments, hosting) are bound by strict DPA contracts ensuring your data is handled securely and only for specified purposes.",
  },
  {
    icon: Clock,
    title: "Controlled Data Retention",
    description: "Call recordings retained for 90 days then auto-deleted. Transcripts and metadata held for 2 years for billing and dispute resolution. Earlier deletion available on request.",
  },
  {
    icon: Globe,
    title: "UK/EU Data Centres",
    description: "All AI processing occurs within UK/EU data centres or jurisdictions with adequate data protection safeguards. No unauthorised international transfers.",
  },
]

export default function TrustPage() {
  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "Trust & Security", item: "https://whoza.ai/trust" },
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
            <Shield className="w-4 h-4" />
            Your Data Is Protected
          </div>
          <h1 className="text-4xl font-bold mb-4">Trust & Security</h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Security isn't a feature — it's the foundation. Here's how we protect your business, your customers, and every call Katie handles.
          </p>
        </div>

        <div className="space-y-6">
          {trustItems.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-start gap-5"
            >
              <div className="bg-emerald-500/10 rounded-lg p-3 flex-shrink-0">
                <item.icon className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <p className="text-white/60 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white/5 border border-white/10 rounded-xl p-6 text-center">
          <p className="text-white/60 mb-4">
            For security-related questions or to request our full security documentation, contact us directly.
          </p>
          <Link
            href="mailto:dru@whoza.ai"
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium"
          >
            <Lock className="w-4 h-4" />
            Contact Security Team
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
