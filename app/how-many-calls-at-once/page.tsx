import type { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { Phone, ArrowRight, Check } from "lucide-react"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "How Many Calls Can whoza.ai Handle at Once?",
  description: "Honest answer: Starter = 1 call, Growth = 2, Pro = 3, Scale = 5. No hidden limits. No unexpected charges. See exactly what you get with whoza.ai.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/how-many-calls-at-once",
    siteName: "Whoza.ai",
    title: "How Many Calls Can whoza.ai Handle at Once?",
    description: "Honest answer: Starter = 1 call, Growth = 2, Pro = 3, Scale = 5. No hidden limits. No unexpected charges. See exactly what you get with whoza.ai.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "Whoza.ai Concurrent Call Limits" }],
  },
  alternates: {
    canonical: "https://whoza.ai/how-many-calls-at-once",
  },
}

export const revalidate = 3600

const tiers = [
  { name: "Starter", price: "£59/mo", calls: 1, minutes: "100", jobs: "8" },
  { name: "Growth", price: "£125/mo", calls: 2, minutes: "300", jobs: "16" },
  { name: "Pro", price: "£230/mo", calls: 3, minutes: "700", jobs: "40" },
  { name: "Scale", price: "£399/mo", calls: 5, minutes: "1,500", jobs: "100" },
]

export default function HowManyCallsPage() {
  return (
    <div className="min-h-screen bg-[var(--v2-paper)] text-[var(--v2-body)] v2-page">
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "How Many Calls At Once", item: "https://whoza.ai/how-many-calls-at-once" },
      ]} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-[var(--v2-mint)] text-[var(--v2-green)] px-4 py-2 rounded-full text-sm font-medium mb-6">
            Honest Answer
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            How Many Calls Can whoza.ai Handle at Once?
          </h1>
          <p className="text-[var(--v2-body)] max-w-2xl text-lg">
            We do not claim "unlimited" calls — because that is not honest. Here is exactly how many simultaneous calls each plan handles.
          </p>
        </div>

        <div className="overflow-x-auto mb-16">
          <table className="w-full text-left border border-[var(--v2-line)] rounded-lg">
            <thead className="bg-white text-[var(--v2-ink)]">
              <tr>
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Concurrent Calls</th>
                <th className="px-6 py-4">Monthly Minutes</th>
                <th className="px-6 py-4">Jobs Included</th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((tier) => (
                <tr key={tier.name} className="border-t border-[var(--v2-line)]">
                  <td className="px-6 py-4 font-medium">
                    {tier.name}
                    <span className="block text-sm text-[var(--v2-muted)]">{tier.price}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-2xl font-bold text-[var(--v2-green)]">{tier.calls}</span>
                    <span className="text-[var(--v2-muted)] ml-2">at once</span>
                  </td>
                  <td className="px-6 py-4 text-[var(--v2-body)]">{tier.minutes}</td>
                  <td className="px-6 py-4 text-[var(--v2-body)]">{tier.jobs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="bg-white border border-[var(--v2-line)] rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-semibold mb-4">What Happens If You Exceed Your Limit?</h2>
          <p className="text-[var(--v2-body)] mb-6">
            If a call comes in while all your concurrent lines are busy, the caller hears a polite message asking them to leave a voicemail or call back. You get an instant WhatsApp alert so you know a call was missed.
          </p>
          <p className="text-[var(--v2-body)]">
            This is rare for most trade businesses. Even on the Starter plan (1 concurrent call), the vast majority of calls are sequential — one finishes before the next begins. If you are running radio ads or TV campaigns that generate burst traffic, upgrade to Growth or Pro.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Why We Publish Real Numbers</h2>
          <ul className="space-y-3 text-[var(--v2-body)]">
            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[var(--v2-green)] shrink-0 mt-0.5" /> No surprise overage charges</li>
            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[var(--v2-green)] shrink-0 mt-0.5" /> No hidden fair-use clauses that cut you off</li>
            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[var(--v2-green)] shrink-0 mt-0.5" /> You know exactly what you are paying for</li>
            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[var(--v2-green)] shrink-0 mt-0.5" /> Easy to upgrade when your business grows</li>
          </ul>
        </section>

        <section className="text-center">
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 bg-[var(--v2-green)] text-white px-8 py-3 rounded-lg font-medium hover:bg-[var(--v2-green-hover)] transition-colors v2-island"
          >
            Compare Plans <ArrowRight className="w-4 h-4" />
          </a>
        </section>
      </main>

      <Footer />
    </div>
  )
}
