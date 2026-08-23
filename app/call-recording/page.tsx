import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { FAQPageSchema } from "@/components/whoza/faqpage-schema"
import { QuickAnswer } from "@/components/whoza/quick-answer"
import { AlertTriangle, Shield, ExternalLink } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Call Recording, Transcripts & Data Retention | whoza.ai",
  description:
    "How whoza.ai handles call data: no audio recordings, written transcripts only, with exact retention periods per data class. Not legal advice.",
  alternates: {
    canonical: "https://whoza.ai/call-recording",
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/call-recording",
    siteName: "Whoza.ai",
    title: "Call Recording, Transcripts & Data Retention | whoza.ai",
    description:
      "How whoza.ai handles call data: no audio recordings, written transcripts only, with exact retention periods per data class.",
    images: [
      { url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "Whoza.ai — Call Recording & Data Retention" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Call Recording, Transcripts & Data Retention | whoza.ai",
    description:
      "How whoza.ai handles call data: no audio recordings, written transcripts only, with exact retention periods per data class.",
    images: ["https://whoza.ai/og-image.webp"],
  },
}

const quickAnswerItems = [
  {
    label: "Audio recording",
    answer:
      "Calls answered by our AI agents are not recorded. Audio is never stored anywhere in the stack. A written transcript is generated for quality and service delivery purposes.",
  },
  {
    label: "Transcript visibility",
    answer:
      "Transcripts and call notes are visible in your dashboard for 30 days, then removed from the dashboard.",
  },
  {
    label: "Backend archive",
    answer:
      "A backend archive of transcripts and metadata is retained for 90 days for billing and dispute resolution.",
  },
  {
    label: "Earlier deletion",
    answer:
      "Earlier deletion of transcripts, metadata and caller contact records is available on request. A deletion certificate is provided on request.",
  },
]

const faqs = [
  {
    question: "Does whoza.ai record phone calls?",
    answer:
      "No. Calls answered by our AI agents are not recorded. A written transcript is generated for quality and service delivery purposes. Audio is never stored anywhere in the stack. Callers are notified at the beginning of each call that they are speaking with an AI assistant.",
  },
  {
    question: "How long are call transcripts kept?",
    answer:
      "Transcripts and call notes are visible in your dashboard for 30 days, then removed from the dashboard. A backend archive of transcripts and metadata is retained for 90 days for billing and dispute resolution. Earlier deletion is available on request.",
  },
  {
    question: "What happens to my data if I cancel?",
    answer:
      "Business profile data is retained for the duration of your subscription plus 6 months after cancellation. Caller contact records are retained while your account is active plus the dispute window. Payment records are retained for 7 years in accordance with UK tax regulations. You can request export of all caller data in CSV format within 7 days, or deletion within 30 days of account closure. A deletion certificate is provided on request.",
  },
  {
    question: "Can I get my data deleted early?",
    answer:
      "Yes. Earlier deletion of transcripts, metadata and caller contact records is available on request. We provide a deletion certificate on request.",
  },
]

export const revalidate = 3600

export default function CallRecordingPage() {
  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />
      <BreadcrumbSchema
        items={[
          { name: "Home", item: "https://whoza.ai" },
          { name: "Call Recording & Retention", item: "https://whoza.ai/call-recording" },
        ]}
      />
      <FAQPageSchema
        faqs={faqs}
        speakableSelectors={[".retention-headline", ".retention-lead", ".retention-table"]}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Human sign-off banner */}
        <div className="mb-10 bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-300">NEEDS HUMAN SIGN-OFF</p>
            <p className="text-amber-200/70 text-sm mt-1">
              This page discusses how whoza.ai handles personal data and makes claims about our
              product architecture. It is published as{" "}
              <code className="bg-amber-500/20 px-1 rounded text-amber-200">noindex</code>{" "}
              pending review by a person with the standing to approve it.
            </p>
          </div>
        </div>

        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Data Handling
          </div>
          <h1 className="text-4xl font-bold mb-4 retention-headline">
            Call Recording, Transcripts &amp; Data Retention
          </h1>
          <p className="text-xl text-white/70 leading-relaxed retention-lead">
            This page describes how whoza.ai handles call data. It is not legal advice. Recording
            obligations vary by purpose, sector and lawful basis, and what follows is a statement of
            how Whoza operates — not a statement of what any business must do.
          </p>
        </div>

        {/* QuickAnswer */}
        <QuickAnswer
          heading="How whoza.ai handles call data"
          tradeName="trade business"
          items={quickAnswerItems}
        />

        {/* Retention schedule table */}
        <section className="mt-16 mb-16">
          <h2 className="text-2xl font-bold mb-6">Retention Schedule</h2>
          <p className="text-white/70 mb-6">
            Exact retention periods per data class. Every figure below is drawn from our{" "}
            <Link href="/privacy" className="text-emerald-400 hover:underline">
              Privacy Policy
            </Link>{" "}
            or{" "}
            <Link href="/trust" className="text-emerald-400 hover:underline">
              Trust Centre
            </Link>
            .
          </p>
          <div className="overflow-x-auto retention-table">
            <table className="w-full text-sm text-left text-white/70 border border-white/10 rounded-lg">
              <thead className="bg-white/5 text-white">
                <tr>
                  <th className="px-4 py-3">Data class</th>
                  <th className="px-4 py-3">What it is</th>
                  <th className="px-4 py-3">Retention period</th>
                  <th className="px-4 py-3">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-white/10">
                  <td className="px-4 py-3 font-medium text-white">Audio recordings</td>
                  <td className="px-4 py-3">Call audio</td>
                  <td className="px-4 py-3">Not stored</td>
                  <td className="px-4 py-3">Audio is never stored anywhere in the stack.</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="px-4 py-3 font-medium text-white">Dashboard transcripts</td>
                  <td className="px-4 py-3">Transcripts and call notes visible in your dashboard</td>
                  <td className="px-4 py-3">30 days</td>
                  <td className="px-4 py-3">Removed from dashboard after 30 days.</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="px-4 py-3 font-medium text-white">Backend archive</td>
                  <td className="px-4 py-3">Transcripts and metadata for billing and dispute resolution</td>
                  <td className="px-4 py-3">90 days</td>
                  <td className="px-4 py-3">Retained in backend archive for billing and dispute resolution.</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="px-4 py-3 font-medium text-white">Caller contact records</td>
                  <td className="px-4 py-3">Phone number, name, known details for recognising returning callers</td>
                  <td className="px-4 py-3">Account active + dispute window</td>
                  <td className="px-4 py-3">Separate data class with its own lawful basis.</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="px-4 py-3 font-medium text-white">Business profile data</td>
                  <td className="px-4 py-3">Your business details, preferences and settings</td>
                  <td className="px-4 py-3">Subscription duration + 6 months</td>
                  <td className="px-4 py-3">Retained for 6 months after cancellation.</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="px-4 py-3 font-medium text-white">Payment records</td>
                  <td className="px-4 py-3">Invoice and payment history</td>
                  <td className="px-4 py-3">7 years</td>
                  <td className="px-4 py-3">UK tax regulations.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* What you give up / trade-off */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">The Trade-Off: What You Give Up Without Audio</h2>
          <div className="space-y-4 text-white/70">
            <p>
              Choosing a transcript-only architecture means you cannot listen back to a disputed
              call. You cannot use recordings for staff training or quality assurance. A transcript
              is a reconstruction of the conversation — useful, searchable, and delivered instantly
              to your WhatsApp — but it is not the call itself.
            </p>
            <p>
              What you get instead: a complete text record of every conversation, flagged by urgency,
              with caller details, job type, postcode and estimated value, delivered to your WhatsApp
              within 3 seconds of the call ending. For dispute resolution, the 90-day backend archive
              preserves transcript and metadata. For most trade businesses, the speed of capture and
              the absence of audio storage risk outweigh the inability to replay a call.
            </p>
          </div>
        </section>

        {/* Questions to ask any provider */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Questions Worth Asking Any Provider</h2>
          <div className="space-y-4 text-white/70">
            <p>
              If you are comparing call-handling services, the following questions are worth asking
              regardless of which provider you choose:
            </p>
            <ul className="space-y-3 list-disc list-inside">
              <li>Is audio recorded, and if so, for how long is it retained?</li>
              <li>Where is call data stored, and what jurisdiction governs it?</li>
              <li>Can I request early deletion of transcripts or metadata?</li>
              <li>What happens to my data if I cancel the service?</li>
              <li>Is a deletion certificate available?</li>
            </ul>
            <p className="mt-4">
              The area is governed by UK GDPR, the Data Protection Act 2018 and PECR. These regimes
              set out what is permitted and what is required in different circumstances. If you need
              certainty about your own legal position, you should take advice from a solicitor or
              the ICO.
            </p>
          </div>
        </section>

        {/* FAQ section — visible rendering of the same array passed to FAQPageSchema */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                <p className="text-white/60 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Links to legal pages */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Source Documents</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/terms"
              className="flex items-center justify-between p-4 rounded-lg border border-white/10 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all"
            >
              <span className="font-semibold text-emerald-400">Terms of Service</span>
              <ExternalLink className="w-4 h-4 text-white/40" />
            </Link>
            <Link
              href="/privacy"
              className="flex items-center justify-between p-4 rounded-lg border border-white/10 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all"
            >
              <span className="font-semibold text-emerald-400">Privacy Policy</span>
              <ExternalLink className="w-4 h-4 text-white/40" />
            </Link>
            <Link
              href="/trust"
              className="flex items-center justify-between p-4 rounded-lg border border-white/10 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all"
            >
              <span className="font-semibold text-emerald-400">Trust Centre</span>
              <ExternalLink className="w-4 h-4 text-white/40" />
            </Link>
            <Link
              href="/dpa"
              className="flex items-center justify-between p-4 rounded-lg border border-white/10 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all"
            >
              <span className="font-semibold text-emerald-400">Data Processing Agreement</span>
              <ExternalLink className="w-4 h-4 text-white/40" />
            </Link>
            <Link
              href="/data"
              className="flex items-center justify-between p-4 rounded-lg border border-white/10 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all"
            >
              <span className="font-semibold text-emerald-400">Evidence Base</span>
              <ExternalLink className="w-4 h-4 text-white/40" />
            </Link>
          </div>
        </section>

        {/* Not legal advice disclaimer */}
        <section className="mb-12 bg-white/5 border border-white/10 rounded-xl p-6">
          <p className="text-white/50 text-sm">
            <strong>Not legal advice.</strong> This page describes how whoza.ai operates. It does
            not constitute legal advice, and it does not state what any business must do under UK
            GDPR, the Data Protection Act 2018, PECR or any other regime. Recording obligations
            depend on your specific circumstances. If you need legal certainty, consult a solicitor
            or contact the ICO.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  )
}
