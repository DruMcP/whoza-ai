import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { FileText, Phone, CreditCard, AlertTriangle, Clock, Lock, Globe, Scale } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service | whoza.ai",
  description: "whoza.ai terms of service — no contracts, monthly rolling, 7-day free trial. Read our full terms.",
  alternates: {
    canonical: "https://whoza.ai/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Scale className="w-4 h-4" />
            Legal agreement
          </div>
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-white/60">Last updated: May 2026</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">1. Agreement to Terms</h2>
            <p className="text-white/70 leading-relaxed">
              These Terms of Service govern your use of whoza.ai, an AI-powered revenue system for UK tradespeople and local service businesses. By accessing or using our service, you agree to be bound by these terms. If you do not agree, you must not use the service.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <FileText className="w-5 h-5 text-emerald-400" />
              2. Description of Service
            </h2>
            <p className="text-white/70 leading-relaxed mb-4">
              Whoza.ai provides AI call answering, enquiry qualification, WhatsApp/SMS delivery, booking support, review collection, competitor analysis, and business growth recommendations. The service includes:
            </p>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>AI voice agents (Katie/Mark):</strong> Answer incoming calls on your behalf, qualify enquiries, and capture customer details</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>WhatsApp/SMS delivery:</strong> Send qualified enquiry summaries directly to your phone</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Review engine (Claire):</strong> Automated review requests sent after completed jobs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Growth intelligence (Rex):</strong> Competitor tracking and weekly action recommendations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Dashboard and analytics:</strong> Call volume, enquiry tracking, and performance metrics</span>
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <Phone className="w-5 h-5 text-emerald-400" />
              3. Call Recording and AI Disclosure
            </h2>
            <p className="text-white/70 leading-relaxed mb-4">
              By using whoza.ai, you acknowledge and agree that:
            </p>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>All calls answered by our AI agents are recorded for quality, training, and service delivery purposes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Callers are notified at the beginning of each call that they are speaking with an AI assistant and that the call is being recorded</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>You are responsible for ensuring compliance with all applicable laws regarding call recording in your jurisdiction</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>You will inform your existing customers that their calls may be handled by AI and recorded where required by law</span>
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-emerald-400" />
              4. Subscription and Billing
            </h2>
            <p className="text-white/70 leading-relaxed mb-4">
              Whoza.ai operates on a subscription basis with the following terms:
            </p>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Billing cycle:</strong> Monthly subscriptions are charged in advance on the same date each month</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Plans:</strong> Starter (£59), Growth (£125), Pro (£230), Scale (£399) — all prices exclude VAT</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Minute allowances:</strong> Each plan includes a set number of call minutes per month. Additional minutes are charged at £0.22 per minute</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Overage:</strong> You will be notified when approaching your monthly limit. Overage charges apply automatically</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Trial:</strong> 7-day free trial available on Starter and Growth plans. Trial includes reduced minute allowances</span>
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-emerald-400" />
              5. Acceptable Use
            </h2>
            <p className="text-white/70 leading-relaxed mb-4">
              You agree not to use whoza.ai for:
            </p>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Any illegal, fraudulent, or deceptive purposes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Harassment, abuse, or threats toward callers or our staff</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Interfering with or disrupting the service or our infrastructure</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Attempting to reverse-engineer or extract our AI models or training data</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Reselling or white-labelling the service without explicit written agreement</span>
              </li>
            </ul>
            <p className="text-white/70 leading-relaxed mt-4">
              We reserve the right to suspend or terminate your account for violation of these acceptable use terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <Lock className="w-5 h-5 text-emerald-400" />
              6. Data and Confidentiality
            </h2>
            <p className="text-white/70 leading-relaxed mb-4">
              We treat your business data and customer interactions as confidential. We will not:
            </p>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Sell your customer data to third parties</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Use your call recordings for purposes other than service delivery and anonymised model improvement</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Share your business profile or competitive intelligence with other users</span>
              </li>
            </ul>
            <p className="text-white/70 leading-relaxed mt-4">
              Full details are provided in our <a href="/privacy" className="text-emerald-400 hover:underline">Privacy Policy</a>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">7. Service Level and Limitations</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              While we strive for 99.9% uptime, whoza.ai is a technology service and occasional disruptions may occur. We do not guarantee:
            </p>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>That every call will be answered (network issues, caller hang-ups, or extreme volume may result in missed calls)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>That every enquiry will convert into a booked job (we capture and qualify; conversion depends on your response)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Specific revenue outcomes from using the service</span>
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <Clock className="w-5 h-5 text-emerald-400" />
              8. Cancellation and Termination
            </h2>
            <p className="text-white/70 leading-relaxed mb-4">
              You may cancel your subscription at any time through your account dashboard or by contacting us. Cancellation takes effect at the end of your current billing period. No partial refunds are provided for unused days within a billing period.
            </p>
            <p className="text-white/70 leading-relaxed">
              We may terminate your account immediately for: breach of these terms, non-payment, fraudulent activity, or behaviour that harms our service or other users. Upon termination, your access to the service ceases and your data will be retained in accordance with our Privacy Policy retention schedule before deletion.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">9. Limitation of Liability</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              To the maximum extent permitted by law, whoza.ai shall not be liable for:
            </p>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Indirect, incidental, special, or consequential damages</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Lost profits, lost revenue, or lost business opportunities</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Damages exceeding the total amount you paid to whoza.ai in the 12 months preceding the claim</span>
              </li>
            </ul>
            <p className="text-white/70 leading-relaxed mt-4">
              Nothing in these terms excludes or limits our liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded under applicable law.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <Globe className="w-5 h-5 text-emerald-400" />
              10. Governing Law
            </h2>
            <p className="text-white/70 leading-relaxed">
              These Terms are governed by the laws of England and Wales. Any disputes arising from these terms or your use of the service shall be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">11. Changes to These Terms</h2>
            <p className="text-white/70 leading-relaxed">
              We may update these Terms from time to time. We will notify you of material changes via email or through your dashboard at least 14 days before they take effect. Your continued use of the service after changes constitutes acceptance of the revised terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">12. Contact</h2>
            <div className="bg-white/5 rounded-lg p-6">
              <p className="text-white/70">For questions about these Terms:</p>
              <p className="text-white font-medium mt-1">Whoza.ai</p>
              <p className="text-white/70 mt-2">Email: <a href="mailto:dru@whoza.ai" className="text-emerald-400 hover:underline">dru@whoza.ai</a></p>
              <p className="text-white/70">WhatsApp: <a href="https://wa.me/447831643012" className="text-emerald-400 hover:underline">+44 7831 643012</a></p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
