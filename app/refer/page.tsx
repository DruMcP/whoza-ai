import type { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { ReferralInteractive } from "@/components/whoza/referral-interactive"
import { Gift, Share2, Users, ArrowRight } from "lucide-react"
import { organizationSchemaObject } from "@/components/whoza/organization-schema"

export const metadata: Metadata = {
  title: "Refer a Trade — Give a Free Month, Get a Free Month",
  description: "Refer fellow UK tradespeople to Whoza.ai. When they join and stay, you both get rewarded. Earn up to a full year free.",
  alternates: {
    canonical: "https://whoza.ai/refer",
  },
}

export default function ReferPage() {
  const jsonLd = [
    {
      "@type": "WebSite",
      "@id": "https://whoza.ai/#website",
      "url": "https://whoza.ai",
      "name": "whoza.ai",
      "publisher": {
        "@id": "https://whoza.ai/#organization"
      }
    },
    organizationSchemaObject,
  ]

  return (
    <div className="min-h-screen bg-[var(--off-white)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <BreadcrumbSchema
        items={[
          { name: "Home", item: "https://whoza.ai" },
          { name: "Refer a Trade", item: "https://whoza.ai/refer" },
        ]}
      />

      <main>
        {/* Hero */}
        <div className="bg-[var(--navy-900)] pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--rex-green)]/20 text-[var(--rex-green)] text-sm font-medium mb-6">
              <Gift className="w-4 h-4" />
              Refer a Trade Programme
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
              Give a Free Month.{" "}
              <span className="text-[var(--rex-green)]">Get a Free Month.</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Refer a fellow tradesperson to Whoza.ai. When they join and stay,
              you both get rewarded. Earn up to a full year free.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Share2,
                  title: "Share Your Link",
                  description: "Copy your unique referral link or share it directly via WhatsApp or email.",
                  color: "var(--katie-blue)",
                },
                {
                  icon: Users,
                  title: "They Sign Up",
                  description: "Your friend joins Whoza.ai using your referral link and starts their free trial.",
                  color: "var(--rex-green)",
                },
                {
                  icon: Gift,
                  title: "You Both Win",
                  description: "Your friend gets their first paid month free after their 7-day trial. You get a free month credited after they complete their second consecutive paid month.",
                  color: "var(--claire-amber)",
                },
              ].map((step) => (
                <div key={step.title} className="text-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: `${step.color}20` }}
                  >
                    <step.icon className="w-8 h-8" style={{ color: step.color }} />
                  </div>
                  <h2 className="text-lg font-bold text-[var(--navy-900)] mb-2">{step.title}</h2>
                  <p className="text-[var(--slate-500)]">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Section — referral link, share, email, stats */}
        <ReferralInteractive />

        {/* FAQ */}
        <div className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[var(--navy-900)] mb-8 text-center">
              Referral Programme FAQ
            </h2>
            <div className="space-y-4">
              {[
                {
                  question: "How do I get my referral code?",
                  answer: "Once you sign up for Whoza.ai, your unique referral code is automatically generated. You can find it in your dashboard under the 'Refer a Trade' section.",
                },
                {
                  question: "What does my friend get?",
                  answer: "Their first paid month free after their 7-day trial, on whichever plan they choose. The free month is valued on their chosen plan, not yours.",
                },
                {
                  question: "What do I get?",
                  answer: "One free month of your own current plan for every referred tradesperson who (a) completes their 7-day trial AND (b) pays for their second consecutive month. No credit if they cancel or lapse before their second payment. Maximum 12 free months per rolling 12-month period.",
                },
                {
                  question: "When do I get my free month?",
                  answer: "After your friend completes their second consecutive paid month. We'll notify you via email and update your dashboard. The credit applies automatically to your next invoice.",
                },
                {
                  question: "Can I refer multiple people?",
                  answer: "Yes — refer as many tradespeople as you like. You can earn up to 12 free months in any 12-month period — a full year free. After the cap, referrals still track but no further credits accrue until the rolling window frees up.",
                },
                {
                  question: "What if my friend cancels?",
                  answer: "If your friend cancels or lapses before completing their second paid month, no credit is awarded. Credits only apply for referrals who genuinely continue as paying customers. No cash alternative; credits are non-transferable.",
                },
              ].map((faq) => (
                <div
                  key={faq.question}
                  className="border border-[var(--border)] rounded-xl p-6 hover:bg-[var(--off-white)] transition-colors"
                >
                  <h3 className="font-semibold text-[var(--navy-900)] mb-2">{faq.question}</h3>
                  <p className="text-[var(--slate-500)]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-16 bg-[var(--navy-900)]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Start Sharing, Start Saving
            </h2>
            <p className="text-white/70 mb-8">
              Earn up to a full year free by referring tradespeople who love Whoza.ai.
            </p>
            <a
              href="/?ref=referral-cta"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--rex-green)] text-white font-bold rounded-lg hover:bg-[var(--rex-green-hover)] transition-colors"
            >
              Get Started with Whoza.ai
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
