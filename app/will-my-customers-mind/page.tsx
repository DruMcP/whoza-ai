import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { Phone, ArrowRight, UserCheck, MessageCircle, Voicemail } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Will My Customers Mind an AI Answering My Phone? | whoza.ai",
  description: "The honest answer: some callers can tell. But almost nobody hangs up — because the alternative is your voicemail. Here's what actually happens when Katie answers.",
  alternates: {
    canonical: "https://whoza.ai/will-my-customers-mind",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/will-my-customers-mind",
    siteName: "Whoza.ai",
    title: "Will My Customers Mind an AI Answering My Phone? | whoza.ai",
    description: "The honest answer: some callers can tell. But almost nobody hangs up — because the alternative is your voicemail. Here's what actually happens when Katie answers.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "Will my customers mind an AI answering my phone?" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "Will My Customers Mind an AI Answering My Phone? | whoza.ai",
    description: "The honest answer: some callers can tell. But almost nobody hangs up — because the alternative is your voicemail. Here's what actually happens when Katie answers.",
    images: ["https://whoza.ai/og-image.webp"],
  },
}

export const revalidate = 3600

export default function WillMyCustomersMindPage() {
  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "Will My Customers Mind?", item: "https://whoza.ai/will-my-customers-mind" },
      ]} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Phone className="w-4 h-4" />
            Objection Answered
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6" style={{ lineHeight: 1.1 }}>
            Will My Customers Mind<br />
            <span className="text-emerald-400">an AI Answering My Phone?</span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl">
            That's the first thing every tradesperson says. It's a fair worry — nobody wants to be the plumber whose phone gets answered by a robot.
          </p>
          <p className="text-lg text-white/60 max-w-2xl mt-4">
            So here's the honest version.
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Some Callers Can Tell</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              Not many, but some. And if anyone asks Katie directly whether she's an AI, she says yes. We don't pretend otherwise — pretending is how you lose trust, not how you keep it.
            </p>
            <p className="text-white/70 leading-relaxed">
              And if they'd rather speak to you, they can. Ask for a human and Katie puts you on — a real transfer, not a promise to ring back later. The transfer only works if you're available to answer. If you don't pick up, it falls back to booking or message capture. We say that plainly because the honesty is what makes the rest credible.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Almost Nobody Hangs Up</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              Because think about what actually happens when Katie doesn't answer.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6 flex items-start gap-4">
              <Voicemail className="w-8 h-8 text-amber-400 shrink-0 mt-1" />
              <div>
                <p className="text-white font-semibold mb-2">They get your voicemail.</p>
                <p className="text-white/60">
                  Your customer isn't choosing between you and a robot. They're choosing between a robot that takes their details and books them in for Tuesday — and a beep.
                </p>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed">
              Nobody has ever preferred the beep.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">What People Actually Resent</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              The people who resent an AI are the ones who wanted help and got a machine that couldn't give it. That isn't this. Katie takes the job, checks your diary, and books it. The caller gets exactly what they rang for: a tradesperson turning up.
            </p>
            <p className="text-white/70 leading-relaxed">
              She captures the postcode, the job type, the urgency, and the best time to call back. She sends it all to your WhatsApp in a message you can read in five seconds. Two taps to accept the job. One tap to call back.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">The Real Choice</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <UserCheck className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-semibold text-emerald-400">With Katie</h3>
                </div>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li>Call answered in 3 rings</li>
                  <li>Job details captured</li>
                  <li>Diary checked</li>
                  <li>Booking confirmed</li>
                  <li>WhatsApp summary sent instantly</li>
                </ul>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Voicemail className="w-5 h-5 text-amber-400" />
                  <h3 className="font-semibold text-white/60">Without Katie</h3>
                </div>
                <ul className="space-y-2 text-white/50 text-sm">
                  <li>Call rings out</li>
                  <li>Voicemail beep</li>
                  <li>Customer hangs up</li>
                  <li>Job goes to competitor</li>
                  <li>You never know it happened</li>
                </ul>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed">
              The ONS reports that 62% of after-hours calls go unanswered. Every one of those is a job your competitor gets instead. Katie doesn't replace you — she replaces the beep.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Can They Speak to a Real Person?</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              Yes. If a caller says "I'd rather speak to the plumber," Katie transfers them to you on that call. Not "someone will call you back." Not a message in a queue. A live transfer, to your phone, right then.
            </p>
            <p className="text-white/70 leading-relaxed">
              If you're up a ladder and can't take it, she takes the details and books them in — same as always. But the choice is the customer's, not the software's. That's the difference between a phone tree and a real assistant.
            </p>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Try It Yourself</h2>
          <p className="text-white/60 mb-6 max-w-xl mx-auto">
            The 7-day free trial lets you hear Katie handle real calls. See what your customers actually experience — and decide for yourself.
          </p>
          <a href="/pricing" className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-emerald-700 transition-colors shadow-lg">
            Start Free Trial <ArrowRight className="w-5 h-5" />
          </a>
          <p className="text-sm text-white/40 mt-4">No credit card required · 30-day money-back guarantee</p>
        </div>

        {/* Links to other objection pages */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-sm text-white/50 mb-4">Related:</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/is-it-a-phone-tree" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm text-white">
              <MessageCircle className="w-4 h-4" />
              Is it a phone tree?
            </Link>
            <Link href="/best-ai-call-handler-uk-trades" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm text-white">
              Compare all AI call handlers
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
