import { Metadata } from "next"
import { EARLY_ACCESS_CAP } from "@/lib/data/company"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { MessageSquare, Phone, Shield, Users, Target, Zap, Heart } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About whoza.ai | AI Call Answering for UK Trades",
  description: "AI call answering for UK trades, never miss a job. whoza.ai was built by a former tradesperson who knows what it's like to lose work to missed calls.",
  alternates: {
    canonical: "https://whoza.ai/about",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/about",
    siteName: "Whoza.ai",
    title: "About whoza.ai | AI Call Answering for UK Trades",
    description: "AI call answering for UK trades, never miss a job. Built by a former tradesperson who knows what it's like to lose work because the phone rang while you were busy.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "About whoza.ai" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About whoza.ai | AI Call Answering for UK Trades",
    description: "AI call answering for UK trades, never miss a job. Built by a former tradesperson who knows what it's like to lose work because the phone rang while you were busy.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const values = [
  {
    icon: Heart,
    title: "Built by Tradespeople, for Tradespeople",
    description: "Our founder spent years on-site: up ladders, under sinks, in lofts. He knows the exact moment when a missed call becomes a lost job. Every feature in whoza.ai is designed around real trade workflows.",
  },
  {
    icon: Target,
    title: "Every Call Matters",
    description: "We believe no trade business should lose work because they were doing their actual job. A plumber under a sink. An electrician in a fuse box. A roofer 30 feet up. You can't answer the phone, but Katie can.",
  },
  {
    icon: Shield,
    title: "Transparent & Fair",
    description: "No hidden fees. No long-term contracts. No setup charges. What you see is what you pay. If whoza.ai doesn't pay for itself within a month, you shouldn't be using it, and you can cancel anytime.",
  },
  {
    icon: Zap,
    title: "Technology That Works",
    description: "We don't do AI hype. We do AI that answers your phone, captures your leads, and sends them to your WhatsApp. Setup in 30 minutes. Works with your existing number. No technical knowledge required.",
  },
]

const stats = [
  { value: "24/7", label: "Call Answering" },
  { value: "< 3s", label: "Answer Speed" },
  { value: "30 min", label: "Setup Time" },
  { value: "50", label: "Active Users" },
]

export const revalidate = 3600

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--v2-paper)] text-[var(--v2-body)] v2-page">
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "About", item: "https://whoza.ai/about" },
      ]} />
      <main id="main-content" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Brand Identity Block */}
        <section className="mb-20">
          <div className="v2-eyebrow inline-flex items-center gap-2 mb-6">
            <Users className="w-4 h-4" />
            Our Story
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            About whoza.ai: Built by Tradespeople, for Tradespeople
          </h1>
          <p className="text-xl text-[var(--v2-body)] max-w-3xl mb-8 leading-relaxed">
            whoza.ai was built by someone who has been exactly where you are: on a roof, under a floorboard, 
            or wrist-deep in a boiler, hearing the phone ring and knowing that if you don't answer, someone else will.
          </p>
          <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-8 mb-8">
            <blockquote className="text-2xl font-medium text-[var(--v2-ink)] italic leading-relaxed mb-4">
              "I lost an £8,000 job because I was up a ladder. That was the moment I knew there had to be a better way."
            </blockquote>
            <cite className="text-[var(--v2-muted)] not-italic">
              Dru McPherson, Founder & CEO
            </cite>
          </div>
          <p className="text-lg text-[var(--v2-body)] max-w-3xl leading-relaxed">
            We are not a Silicon Valley startup building generic AI tools. We are a Scottish company 
            (Company Number SC874716) building voice agents that understand the language of UK trades. 
            Katie knows the difference between an EICR and a CP12. She knows that a "combi" isn't a sandwich 
            and that "no hot water in December" is an emergency. Because we trained her that way.
          </p>
        </section>

        {/* Stats */}
        <section className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white border border-[var(--v2-line)] rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-[var(--v2-green)] mb-1">{stat.value}</div>
                <div className="text-sm text-[var(--v2-muted)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10">What We Believe</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <div key={i} className="bg-white border border-[var(--v2-line)] rounded-2xl p-6">
                <div className="bg-[var(--v2-mint)] rounded-lg p-3 w-fit mb-4">
                  <value.icon className="w-6 h-6 text-[var(--v2-green)]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-[var(--v2-body)] text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The Team */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-6">Meet the Team</h2>
          <p className="text-lg text-[var(--v2-body)] max-w-3xl mb-8 leading-relaxed">
            whoza.ai is a small, focused team. We don't have a 200-person sales department. 
            We have engineers who build, a founder who answers support emails, and a growing community of UK tradespeople 
            who tell us exactly what works and what doesn't.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[var(--v2-mint)] flex items-center justify-center text-[var(--v2-green)] font-bold text-lg">
                  DM
                </div>
                <div>
                  <h3 className="font-semibold">Dru McPherson</h3>
                  <p className="text-sm text-[var(--v2-muted)]">Founder & CEO</p>
                </div>
              </div>
              <p className="text-[var(--v2-body)] text-sm leading-relaxed">
                Former tradesperson turned tech founder. Built whoza.ai after losing too many jobs to missed calls. 
                Obsessed with making AI actually useful for small businesses.
              </p>
            </div>
            <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[var(--v2-mint)] flex items-center justify-center text-[var(--v2-green)] font-bold text-lg">
                  KT
                </div>
                <div>
                  <h3 className="font-semibold">Katie</h3>
                  <p className="text-sm text-[var(--v2-muted)]">AI Voice Agent</p>
                </div>
              </div>
              <p className="text-[var(--v2-body)] text-sm leading-relaxed">
                Our flagship AI receptionist. Trained on thousands of real trade calls. 
                Never sleeps, never takes a day off, and never forgets to ask for the postcode.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Never Miss a Call Again?</h2>
          <p className="text-lg text-[var(--v2-body)] max-w-2xl mx-auto mb-8">
            Join {EARLY_ACCESS_CAP} UK tradespeople already using whoza.ai. 7-day free trial. No credit card required. 
            Setup takes 30 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-[var(--v2-green)] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[var(--v2-green-hover)] transition-colors inline-flex items-center justify-center gap-2 v2-island"
            >
              <Phone className="w-5 h-5" />
              Start Free Trial
            </Link>
            <Link
              href="/how-it-works"
              className="bg-white text-[var(--v2-ink)] px-8 py-4 rounded-2xl font-semibold hover:border-[#b9c6bf] transition-colors inline-flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-5 h-5" />
              See How It Works
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
