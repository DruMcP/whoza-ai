import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { Shield, RefreshCw } from "lucide-react"

export const metadata: Metadata = {
  title: "Refund Policy | whoza.ai",
  description: "whoza.ai refund policy — 30-day money-back guarantee. ICO-registered.",
  alternates: {
    canonical: "https://whoza.ai/refund-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Refund Policy
          </div>
          <h1 className="text-4xl font-bold mb-4">Refund Policy</h1>
          <div className="bg-white/5 rounded-lg p-6">
            <p className="text-white/70"><strong>Company:</strong> WHOZA AI LTD</p>
            <p className="text-white/70 mt-2"><strong>ICO Registration:</strong> ZC077271</p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <section className="mb-10">
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <RefreshCw className="w-5 h-5 text-emerald-400 mt-1 shrink-0" />
                <div>
                  <h2 className="text-xl font-semibold mb-2">30-Day Money-Back Guarantee</h2>
                  <p className="text-white/70 leading-relaxed">
                    Try Whoza risk-free. If you're not satisfied within 30 days of your first paid subscription, contact us for a full refund — no questions asked.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">1. What Qualifies for a Refund</h2>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>First-time subscribers within 30 days of first payment</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Annual plan purchasers within 30 days of purchase</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Users who have not violated our Fair Use Policy</span>
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">2. What Does NOT Qualify</h2>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Usage beyond 30 days from first payment</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Users who have violated our Fair Use Policy</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Second or subsequent subscriptions (one refund per customer)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Custom development or setup fees (unless service not delivered)</span>
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">3. How to Request a Refund</h2>
            <ol className="space-y-3 text-white/70 list-decimal list-inside">
              <li>Email <a href="mailto:dru@whoza.ai" className="text-emerald-400 hover:underline">dru@whoza.ai</a> with your account email</li>
              <li>Include "Refund Request" in the subject line</li>
              <li>We will process within 5 business days</li>
              <li>Refund returned to original payment method</li>
            </ol>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">4. 14-Day Cooling-Off Period (Consumer Rights)</h2>
            <p className="text-white/70 leading-relaxed">
              Under UK consumer law, you have 14 days from the date of purchase to cancel your subscription for any reason and receive a full refund. This applies to all consumer purchases.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">5. Partial Refunds</h2>
            <p className="text-white/70 leading-relaxed">
              We do not provide pro-rata refunds after 30 days. If you cancel after 30 days, your service continues until the end of your current billing period.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">6. Payment Processing</h2>
            <p className="text-white/70 leading-relaxed">
              Refunds are processed through Stripe and typically appear in your account within 5-10 business days, depending on your bank.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">7. Contact</h2>
            <div className="bg-white/5 rounded-lg p-6">
              <p className="text-white/70">Refund requests:</p>
              <p className="text-white/70 mt-2">Email: <a href="mailto:dru@whoza.ai" className="text-emerald-400 hover:underline">dru@whoza.ai</a></p>
              <p className="text-white/70 mt-2">Post: WHOZA AI LTD, 6 Atholl Crescent, 6, Perth, PH1 5JN, Scotland</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
