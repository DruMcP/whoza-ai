import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { Shield, AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  title: "Fair Use Policy | whoza.ai",
  description: "whoza.ai fair use policy — usage limits and prohibited use. ICO-registered.",
  alternates: {
    canonical: "https://whoza.ai/fair-use",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function FairUsePolicy() {
  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Fair Use Policy
          </div>
          <h1 className="text-4xl font-bold mb-4">Fair Use Policy</h1>
          <div className="bg-white/5 rounded-lg p-6">
            <p className="text-white/70"><strong>Company:</strong> WHOZA AI LTD</p>
            <p className="text-white/70 mt-2"><strong>ICO Registration:</strong> ZC077271</p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">1. Purpose</h2>
            <p className="text-white/70 leading-relaxed">
              This policy ensures Whoza remains available and performant for all UK tradespeople. It defines reasonable usage and what happens if usage exceeds fair limits.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">2. Normal Use</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              Normal use means using Whoza to answer genuine customer calls for your trade business. This includes:
            </p>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Answering incoming customer enquiries</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Qualifying job requests</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Sending enquiries to your WhatsApp</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Reasonable call volumes for your business size</span>
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">3. Prohibited Use</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              The following are NOT permitted:
            </p>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Stress testing, load testing, or automated dialling to trigger the AI</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Using Whoza for illegal activity, harassment, or fraud</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Reselling Whoza's service to third parties without a reseller agreement</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Reverse engineering or attempting to access underlying AI models</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Circumventing call limits or usage restrictions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Disabling or interfering with AI call recording disclosures</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Using Whoza for emergency services (999, 111, 112)</span>
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">4. Usage Limits by Plan</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-white/70 border border-white/10 rounded-lg">
                <thead className="bg-white/5 text-white">
                  <tr>
                    <th className="px-4 py-3">Plan</th>
                    <th className="px-4 py-3">Monthly Call Minutes</th>
                    <th className="px-4 py-3">Monthly Enquiries</th>
                    <th className="px-4 py-3">Concurrent Calls</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3 font-medium">Starter (£59/mo)</td>
                    <td className="px-4 py-3">Up to 500 minutes</td>
                    <td className="px-4 py-3">Up to 50 enquiries</td>
                    <td className="px-4 py-3">1</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3 font-medium">Growth (£125/mo)</td>
                    <td className="px-4 py-3">Up to 1,500 minutes</td>
                    <td className="px-4 py-3">Up to 150 enquiries</td>
                    <td className="px-4 py-3">2</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3 font-medium">Pro (£230/mo)</td>
                    <td className="px-4 py-3">Up to 3,000 minutes</td>
                    <td className="px-4 py-3">Up to 300 enquiries</td>
                    <td className="px-4 py-3">3</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3 font-medium">Scale (£399/mo)</td>
                    <td className="px-4 py-3">Up to 6,000 minutes</td>
                    <td className="px-4 py-3">Up to 600 enquiries</td>
                    <td className="px-4 py-3">5</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">5. Trial Fair Use</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              The 7-day Katie trial on Starter includes:
            </p>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Up to 30 trial minutes OR</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Up to 15 captured enquiries</span>
              </li>
            </ul>
            <p className="text-white/70 leading-relaxed mt-4">
              Whichever comes first. This is a <strong>fair use cap</strong>, not a hard limit. We will not cut you off at exactly 15 enquiries. But if usage significantly exceeds this, we may contact you to discuss upgrading to a paid plan.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">6. What Happens If You Exceed Limits</h2>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Approaching limit:</strong> We notify you via WhatsApp and email</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Overage:</strong> Additional minutes charged at £0.22/minute + VAT</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Significant excess:</strong> We may suggest a plan upgrade</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Abuse:</strong> We reserve the right to suspend service for prohibited use</span>
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">7. Emergency Services Disclaimer</h2>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-1 shrink-0" />
                <div>
                  <p className="text-white/70 leading-relaxed">
                    <strong className="text-white">Whoza is NOT for emergency services.</strong> Do not use Whoza for 999, 111, 112, or any emergency line. Our AI agents are not equipped to handle life-threatening situations. Emergency calls should always go to human-operated emergency services.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">8. Changes to This Policy</h2>
            <p className="text-white/70 leading-relaxed">
              We may update this policy from time to time. We will notify you of material changes via email or through your dashboard.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">9. Contact</h2>
            <div className="bg-white/5 rounded-lg p-6">
              <p className="text-white/70">Questions about fair use? Contact us:</p>
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
