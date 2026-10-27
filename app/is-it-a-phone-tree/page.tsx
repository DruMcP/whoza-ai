import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { ArrowRight, Phone, MessageCircle, XCircle, Headphones } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Is It a Phone Tree? No. Here's What Actually Happens.",
  description: "When people hear 'AI answers your phone', they picture a phone tree menu. That's not Katie. No menus, no hold music. Here's how whoza.ai actually works.",
  alternates: {
    canonical: "https://whoza.ai/is-it-a-phone-tree",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/is-it-a-phone-tree",
    siteName: "Whoza.ai",
    title: "Is It a Phone Tree? No. Here's What Actually Happens.",
    description: "When people hear 'AI answers your phone', they picture a menu. Press 1 for sales. Press 2 for accounts. That's not what this is. There is no menu. There is no hold music. Here's how Katie actually works.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "Is it a phone tree? No." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Is It a Phone Tree? No. Here's What Actually Happens.",
    description: "When people hear 'AI answers your phone', they picture a menu. Press 1 for sales. Press 2 for accounts. That's not what this is. There is no menu. There is no hold music. Here's how Katie actually works.",
    images: ["https://whoza.ai/og-image.webp"],
  },
}

export const revalidate = 3600

export default function IsItAPhoneTreePage() {
  return (
    <div className="min-h-screen bg-[var(--v2-paper)] text-[var(--v2-body)] v2-page">
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "Is It a Phone Tree?", item: "https://whoza.ai/is-it-a-phone-tree" },
      ]} />

      <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero */}
        <div className="mb-12">
          <div className="v2-eyebrow inline-flex items-center gap-2 mb-6">
            <Phone className="w-4 h-4" />
            Objection Answered
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6" style={{ lineHeight: 1.1 }}>
            Is It a Phone Tree?{" "}<br />
            <span className="text-[var(--v2-green)]">No. Here's What Actually Happens.</span>
          </h1>
          <p className="text-lg text-[var(--v2-body)] max-w-2xl">
            When people hear "AI answers your phone", they picture the thing they hate most: a menu. Press 1 for sales. Press 2 for accounts. Press 3 to hear these options again.
          </p>
          <p className="text-lg text-[var(--v2-body)] max-w-2xl mt-4">
            That's not what this is. There is no menu. There are no options. There is no hold music.
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--v2-ink)] mb-4">The Phone Rings, and Someone Says Hello</h2>
            <p className="text-[var(--v2-body)] leading-relaxed mb-4">
              Katie asks what's wrong. She listens to the answer: the actual answer, in the caller's own words, not a number they've pressed. Then she asks the next sensible question, the way a good receptionist would.
            </p>
            <p className="text-[var(--v2-body)] leading-relaxed">
              Burst pipe under the sink? She knows that's urgent, and she'll say so. She asks for the postcode, checks your diary, and offers a time. The caller doesn't press anything. They just talk.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--v2-ink)] mb-4">No Menu. No Queue. No "Your Call Is Important to Us."</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <h3 className="font-semibold text-red-600">Phone Tree</h3>
                </div>
                <ul className="space-y-2 text-[var(--v2-body)] text-sm">
                  <li>Press 1 for sales</li>
                  <li>Press 2 for accounts</li>
                  <li>Press 3 to wait</li>
                  <li>Hold music for 8 minutes</li>
                  <li>"Your call is important to us"</li>
                  <li>Disconnected, call back later</li>
                </ul>
              </div>
              <div className="bg-[var(--v2-mint)] border border-[var(--v2-green)]/20 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Headphones className="w-5 h-5 text-[var(--v2-green)]" />
                  <h3 className="font-semibold text-[var(--v2-green)]">Katie</h3>
                </div>
                <ul className="space-y-2 text-[var(--v2-body)] text-sm">
                  <li>"Hello, this is Katie. How can I help?"</li>
                  <li>Listens to the problem in their own words</li>
                  <li>Asks the next sensible question</li>
                  <li>Checks your diary</li>
                  <li>Books the job</li>
                  <li>Sends you the details in WhatsApp</li>
                </ul>
              </div>
            </div>
            <p className="text-[var(--v2-body)] leading-relaxed">
              A phone tree makes your customer do the work of sorting themselves. Katie does the work for them.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--v2-ink)] mb-4">What If They Want to Talk to You?</h2>
            <p className="text-[var(--v2-body)] leading-relaxed mb-4">
              If the caller would rather talk to you, they say so and she puts them through. No menu. No queue. No "your call is important to us."
            </p>
            <p className="text-[var(--v2-body)] leading-relaxed mb-4">
              The transfer works if you're available to answer. If you're up a ladder and can't take it, she takes the details and books them in, same as always. We state this constraint honestly because the honesty is what makes the rest credible.
            </p>
            <p className="text-[var(--v2-body)] leading-relaxed">
              If you don't pick up, it falls back to booking or message capture. The caller still gets what they need: their job logged, their time booked, their details captured. They don't get dropped into a void.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--v2-ink)] mb-4">Why This Matters for Tradespeople</h2>
            <p className="text-[var(--v2-body)] leading-relaxed mb-4">
              Your customers are calling because something is wrong. Their boiler is broken. Their roof is leaking. Their power is out. They are not in the mood for a menu.
            </p>
            <p className="text-[var(--v2-body)] leading-relaxed mb-4">
              They want someone to hear them, understand the problem, and tell them when help is coming. That's what Katie does. She doesn't make them navigate a system. She has a conversation, the same way a good receptionist would.
            </p>
            <p className="text-[var(--v2-body)] leading-relaxed">
              The Moneypenny Small Business Call Report (2016) reports that 33% of small businesses fail to answer incoming calls. Not because tradespeople don't care. Because they're on a job, at the merchants, or it's 7pm. Katie answers every call as if it's the only one that matters. Because to that caller, it is.
            </p>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-[var(--v2-ink)] mb-4">Hear the Difference</h2>
          <p className="text-[var(--v2-body)] mb-6 max-w-xl mx-auto">
            The 7-day free trial lets you hear Katie handle a real call. No menu. No hold music. Just a conversation that ends with a booking.
          </p>
          <a href="/pricing" className="inline-flex items-center gap-2 bg-[var(--v2-green)] text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-[var(--v2-green-hover)] transition-colors shadow-lg v2-island">
            Start Free Trial <ArrowRight className="w-5 h-5" />
          </a>
          <p className="text-sm text-[var(--v2-muted)] mt-4">No credit card required · 30-day money-back guarantee</p>
        </div>

        {/* Links to other objection pages */}
        <div className="mt-16 pt-8 border-t border-[var(--v2-line)]">
          <p className="text-sm text-[var(--v2-muted)] mb-4">Related:</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/will-my-customers-mind" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[var(--v2-line)] hover:border-[#b9c6bf] transition-all text-sm text-[var(--v2-ink)]">
              <MessageCircle className="w-4 h-4" />
              Will my customers mind?
            </Link>
            <Link href="/best-ai-call-handler-uk-trades" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[var(--v2-line)] hover:border-[#b9c6bf] transition-all text-sm text-[var(--v2-ink)]">
              Compare all AI call handlers
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
