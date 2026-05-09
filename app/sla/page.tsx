import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { Shield, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Service Level Agreement | whoza.ai",
  description: "whoza.ai SLA — 99.5% uptime guarantee. ICO-registered.",
  alternates: {
    canonical: "https://whoza.ai/sla",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ServiceLevelAgreement() {
  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Service Level Agreement
          </div>
          <h1 className="text-4xl font-bold mb-4">Service Level Agreement</h1>
          <div className="bg-white/5 rounded-lg p-6">
            <p className="text-white/70"><strong>Company:</strong> WHOZA AI LTD</p>
            <p className="text-white/70 mt-2"><strong>ICO Registration:</strong> ZC077271</p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">1. Uptime Guarantee</h2>
            <p className="text-white/70 leading-relaxed">
              We guarantee <strong>99.5% uptime</strong> for our AI call answering service, measured monthly. Uptime is calculated as the percentage of time the service is available to answer calls, excluding scheduled maintenance.
            </p>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-6 mt-4">
              <p className="text-white/70">
                <strong className="text-emerald-400">99.5% uptime</strong> = maximum of 3.6 hours downtime per month
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">2. Service Credits</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              If we fail to meet the 99.5% uptime guarantee in a given month, you are entitled to service credits:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-white/70 border border-white/10 rounded-lg">
                <thead className="bg-white/5 text-white">
                  <tr>
                    <th className="px-4 py-3">Uptime</th>
                    <th className="px-4 py-3">Credit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3">99.0% – 99.4%</td>
                    <td className="px-4 py-3">10% of monthly fee</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3">98.0% – 98.9%</td>
                    <td className="px-4 py-3">25% of monthly fee</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3">Below 98.0%</td>
                    <td className="px-4 py-3">50% of monthly fee</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-white/70 leading-relaxed mt-4">
              Service credits are applied to your next month's invoice. They do not accumulate beyond 50% of one month's fee.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">3. Exclusions</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              The following are excluded from uptime calculations:
            </p>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Scheduled maintenance with 48 hours' notice</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Force majeure events (see Terms of Service)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Third-party provider outages (Twilio, Stripe, Supabase) beyond our control</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Issues caused by your phone provider or internet connection</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Problems arising from your misuse of the service</span>
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">4. Call Answering Time</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              We target the following performance metrics:
            </p>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Call pickup:</strong> Within 3 rings (approximately 10 seconds)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Enquiry qualification:</strong> Average 60 seconds</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>WhatsApp delivery:</strong> Within 5 seconds of call completion</span>
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">5. Scheduled Maintenance</h2>
            <p className="text-white/70 leading-relaxed">
              We may perform scheduled maintenance to improve the service. We will notify you at least 48 hours in advance via email and WhatsApp. Maintenance windows are typically outside UK business hours (20:00 – 06:00 GMT).
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">6. Support Response Times</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-white/70 border border-white/10 rounded-lg">
                <thead className="bg-white/5 text-white">
                  <tr>
                    <th className="px-4 py-3">Severity</th>
                    <th className="px-4 py-3">Response Time</th>
                    <th className="px-4 py-3">Resolution Target</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3"><strong>Critical</strong> — Service down</td>
                    <td className="px-4 py-3">Within 1 hour</td>
                    <td className="px-4 py-3">4 hours</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3"><strong>High</strong> — Major feature impaired</td>
                    <td className="px-4 py-3">Within 4 hours</td>
                    <td className="px-4 py-3">24 hours</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3"><strong>Medium</strong> — Minor issue</td>
                    <td className="px-4 py-3">Within 24 hours</td>
                    <td className="px-4 py-3">72 hours</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3"><strong>Low</strong> — Question or request</td>
                    <td className="px-4 py-3">Within 48 hours</td>
                    <td className="px-4 py-3">7 days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">7. How to Claim Credits</h2>
            <p className="text-white/70 leading-relaxed">
              To claim a service credit, contact us at <a href="mailto:dru@whoza.ai" className="text-emerald-400 hover:underline">dru@whoza.ai</a> within 30 days of the month in question. Include the dates and times of the outage. We will verify and apply credits to your next invoice.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">8. Limitations</h2>
            <p className="text-white/70 leading-relaxed">
              Service credits are your sole remedy for uptime failures. They do not entitle you to terminate your subscription or claim additional damages. The maximum credit in any month is 50% of your monthly fee.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">9. Changes</h2>
            <p className="text-white/70 leading-relaxed">
              We may update this SLA with 30 days' notice. Continued use = acceptance.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
