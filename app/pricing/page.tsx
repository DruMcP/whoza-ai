import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { Pricing } from "@/components/whoza/pricing"
import { FAQ } from "@/components/whoza/faq"
import { FinalCTA } from "@/components/whoza/final-cta"
import { ComparisonTable } from "@/components/whoza/comparison-table"
import { PricingSchema } from "@/components/whoza/schema-markup"
import { FAQPageSchema } from "@/components/whoza/faqpage-schema"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "AI Receptionist Cost vs In-House | £59/mo vs £25K/yr — Whoza",
  description: "Compare AI receptionist costs: Whoza.ai from £59/month vs £25K+/year for human staff. Monthly 7-day free trial. Pay only for booked jobs. See the comparison.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/pricing",
    siteName: "Whoza.ai",
    title: "AI Receptionist Cost vs In-House | £59/mo vs £25K/yr — Whoza",
    description: "Compare AI receptionist costs: Whoza.ai from £59/month vs £25K+/year for human staff. Monthly 7-day free trial. Pay only for booked jobs. See the comparison.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "Whoza.ai Pricing" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "AI Receptionist Cost vs In-House | £59/mo vs £25K/yr — Whoza",
    description: "Compare AI receptionist costs: Whoza.ai from £59/month vs £25K+/year for human staff. Monthly 7-day free trial. Pay only for booked jobs. See the comparison.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  alternates: {
    canonical: "https://whoza.ai/pricing",
  },
}

export const revalidate = 3600

const pricingFaqs = [
  { question: "How much does an AI receptionist cost vs in-house staff?", answer: "A full-time human receptionist costs £25,000-£38,700/year including salary, NI, pension, and holiday cover. Whoza.ai's AI receptionist starts at £59/month (£708/year) — a 97% saving. You pay only when you accept a job via WhatsApp or SMS." },
  { question: "What counts as a booked job?", answer: "A booked job is an enquiry you accept via the WhatsApp or SMS job card. When you tap Accept, it counts as one booked job. Declined enquiries and auto-declined enquiries (no response within 24 hours) are never charged. Spam, wrong numbers, and duplicate enquiries also never count." },
  { question: "What is included in the £59/month Starter plan?", answer: "The Starter plan includes unlimited AI call answering, 10 booked jobs per month, WhatsApp delivery, voicemail detection, and 7-day free trial. No credit card required." },
  { question: "Is there a contract or cancellation fee?", answer: "No. whoza.ai has no contracts and no cancellation fees. You can cancel anytime with one click. We also offer a 30-day money-back guarantee." },
  { question: "How quickly can I get set up?", answer: "Most tradespeople are fully set up in under 30 minutes. Forward your existing number, customize your greeting, and Katie starts answering immediately." },
  { question: "Does it work with my existing phone number?", answer: "Yes. You simply forward your existing business number to your whoza.ai number. Your customers call the same number — Katie answers when you can't." },
  { question: "Can callers be transferred to me if they want to speak to a human?", answer: "Yes. If a caller says they'd rather speak to you, Katie transfers them through on that call. Not a callback later — a live transfer to your phone, right then. If you're unavailable, she takes the details and books them in, then sends you the summary via WhatsApp." },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "Pricing", item: "https://whoza.ai/pricing" },
      ]} />
      
      <main>
        {/* Pricing Section */}
        <section className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-[var(--katie-blue)]/10 text-[var(--katie-blue)] px-4 py-2 rounded-full text-sm font-medium mb-6">
                Simple Pricing
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                AI Receptionist Cost vs In-House Staff: Save £25,000+/Year
              </h1>
              <p className="text-white/60 max-w-2xl mx-auto text-lg mb-6">
                Compare AI receptionist costs: Whoza.ai from £59/month vs £25,000+/year for a full-time human. One captured job pays for the entire year. 7-day free trial.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
                  <span className="text-[var(--katie-blue)]">✓</span>
                  <span className="text-white/80">No contract. Cancel anytime.</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
                  <span className="text-[var(--katie-blue)]">✓</span>
                  <span className="text-white/80">Keep your existing number</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
                  <span className="text-[var(--katie-blue)]">✓</span>
                  <span className="text-white/80">Pay for jobs booked, not calls answered</span>
                  <span className="text-white/40 text-xs ml-1" title="A booked job is an enquiry you accept via WhatsApp or SMS. Declined or auto-declined (no response in 24h) jobs are never charged.">ⓘ</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
                  <span className="text-[var(--katie-blue)]">✓</span>
                  <span className="text-white/80">No hidden fees</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
                  <span className="text-[var(--katie-blue)]">✓</span>
                  <span className="text-white/80">No VAT charged</span>
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
      <FAQPageSchema faqs={pricingFaqs} />
    </div>
  )
}
