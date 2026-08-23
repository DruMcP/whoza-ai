import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { Pricing } from "@/components/whoza/pricing"
import { FAQ } from "@/components/whoza/faq"
import { FinalCTA } from "@/components/whoza/final-cta"
import { ComparisonTable } from "@/components/whoza/comparison-table"
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
  { question: "What counts as a booked job?", answer: "A booked job is a job enquiry that the tradesperson has accepted via the Whoza WhatsApp channel (e.g. replying ACCEPT to the WhatsApp job card). Job cards sent but not accepted do not count toward plan job allowances and are not billed as extra jobs." },
  { question: "How does the Refer a Trade programme work?", answer: "Refer a fellow tradesperson to Whoza.ai using your unique referral link. Your friend gets their first paid month free after their 7-day trial, on whichever plan they choose. You get one free month of your own current plan credited after they complete their second consecutive paid month. You can earn up to 12 free months per rolling 12-month period. No credit if they cancel before their second payment." },
  { question: "How much does Whoza cost in total?", answer: "You pay a monthly plan fee (Starter £59, Growth £125, Pro £230, Scale £399). Each plan includes a set number of call handling minutes and booked enquiries. Additional enquiries beyond your included amount are charged per booking. Overage minutes are billed at £0.26 per minute. There are no hidden setup fees or long-term contracts. You can cancel anytime." },
  { question: "Is there a contract?", answer: "No. whoza.ai has no contracts. You're free to cancel anytime with no penalties. We also offer a 30-day money-back guarantee on all plans." },
  { question: "What if I want to cancel?", answer: "Cancel anytime — no contracts, no cancellation fees, no hassle. We're confident you'll stay because the system pays for itself many times over, but if it's not right for your business, you can cancel with one click from your dashboard." },
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

        {/* Real story link */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <p className="text-white/70">
              <strong className="text-white">Real story from a Glasgow joiner:</strong> Ross spent two weeks comparing virtual receptionist prices from Moneypenny, Verbatim, AnswerConnect and others. He documented exactly what each costs, what is included, and what happened when he switched to AI. <a href="/blog/i-spent-two-weeks-comparing-virtual-receptionist-prices-ross-the-joiner" className="text-[var(--katie-blue)] hover:underline font-semibold">Read his honest comparison →</a>
            </p>
          </div>
        </section>

        {/* FAQ — scoped to Pricing category only */}
        <FAQ initialCategory="Pricing" />

        {/* Final CTA */}
        <FinalCTA />
      </main>

      <Footer />
      <script
        id="pricing-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                "@id": "https://whoza.ai/pricing#service",
                "name": "Whoza.ai AI Receptionist",
                "provider": { "@id": "https://whoza.ai/#organization" },
                "areaServed": "GB",
                "audience": { "@type": "Audience", "audienceType": "UK tradespeople" },
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Whoza.ai Plans",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "name": "Starter",
                      "description": "10 booked enquiries included, 100 call minutes included, 1 concurrent call, £4.50 per extra job",
                      "price": "59",
                      "priceCurrency": "GBP",
                      "priceSpecification": {
                        "@type": "UnitPriceSpecification",
                        "price": "59",
                        "priceCurrency": "GBP",
                        "billingIncrement": "P1M"
                      },
                      "url": "https://whoza.ai/pricing",
                      "availability": "https://schema.org/InStock"
                    },
                    {
                      "@type": "Offer",
                      "name": "Growth",
                      "description": "20 booked enquiries included, 300 call minutes included, 2 concurrent calls, £3.25 per extra job",
                      "price": "125",
                      "priceCurrency": "GBP",
                      "priceSpecification": {
                        "@type": "UnitPriceSpecification",
                        "price": "125",
                        "priceCurrency": "GBP",
                        "billingIncrement": "P1M"
                      },
                      "url": "https://whoza.ai/pricing",
                      "availability": "https://schema.org/InStock"
                    },
                    {
                      "@type": "Offer",
                      "name": "Pro",
                      "description": "40 booked enquiries included, 700 call minutes included, 3 concurrent calls, £2.75 per extra job",
                      "price": "230",
                      "priceCurrency": "GBP",
                      "priceSpecification": {
                        "@type": "UnitPriceSpecification",
                        "price": "230",
                        "priceCurrency": "GBP",
                        "billingIncrement": "P1M"
                      },
                      "url": "https://whoza.ai/pricing",
                      "availability": "https://schema.org/InStock"
                    },
                    {
                      "@type": "Offer",
                      "name": "Scale",
                      "description": "100 booked enquiries included, 1500 call minutes included, 5 concurrent calls, £2.25 per extra job",
                      "price": "399",
                      "priceCurrency": "GBP",
                      "priceSpecification": {
                        "@type": "UnitPriceSpecification",
                        "price": "399",
                        "priceCurrency": "GBP",
                        "billingIncrement": "P1M"
                      },
                      "url": "https://whoza.ai/pricing",
                      "availability": "https://schema.org/InStock"
                    }
                  ]
                }
              }
            ]
          })
        }}
      />
      <FAQPageSchema faqs={pricingFaqs} />
    </div>
  )
}
