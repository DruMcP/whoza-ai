import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { Pricing } from "@/components/whoza/pricing"
import { FAQ } from "@/components/whoza/faq"
import { FinalCTA } from "@/components/whoza/final-cta"
import { ComparisonTable } from "@/components/whoza/comparison-table"
import { PricingSchema } from "@/components/whoza/schema-markup"
import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Whoza.ai Pricing — Plans from £59/month | AI Voice Agents",
  description: "Choose from 4 plans: Starter £59, Growth £125, Pro £230, Scale £399/month. All include 7-day free trial. AI voice agents for UK tradespeople.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/pricing",
    siteName: "whoza.ai",
    title: "Whoza.ai Pricing — AI Voice Agents for UK Tradespeople",
    description: "Plans from £59/month. 7-day free trial. No contracts.",
    images: [{ url: "https://whoza.ai/og-image.png", width: 1200, height: 630, alt: "whoza.ai Pricing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Whoza.ai Pricing — AI Voice Agents for UK Tradespeople",
    description: "Plans from £59/month. 7-day free trial.",
    images: ["https://whoza.ai/og-image.png"],
  },
  alternates: {
    canonical: "https://whoza.ai/pricing",
  },
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />
      
      <main>
        {/* Pricing Section */}
        <section className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-[var(--katie-blue)]/10 text-[var(--katie-blue)] px-4 py-2 rounded-full text-sm font-medium mb-6">
                Simple Pricing
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                AI Call Answering Plans for UK Tradespeople
              </h1>
              <p className="text-white/60 max-w-2xl mx-auto text-lg mb-6">
                Start capturing missed calls and booking more jobs today. All plans include a 7-day free trial.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
                  <span className="text-[var(--katie-blue)]">✓</span>
                  <span className="text-white/80">Pay for jobs booked, not calls answered</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
                  <span className="text-[var(--katie-blue)]">✓</span>
                  <span className="text-white/80">No hidden fees</span>
                </div>
              </div>
            </div>
            
            <Pricing />
          </div>
        </section>

        {/* Comparison Table */}
        <ComparisonTable />

        {/* FAQ */}
        <FAQ />

        {/* Final CTA */}
        <FinalCTA />
      </main>

      <Footer />
      <PricingSchema />
    </div>
  )
}
