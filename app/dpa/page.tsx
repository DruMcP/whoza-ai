import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { Shield, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "Data Processing Agreement | whoza.ai",
  description: "whoza.ai Data Processing Agreement — UK GDPR Article 28 compliant. ICO-registered.",
  alternates: {
    canonical: "https://whoza.ai/dpa",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function DataProcessingAgreement() {
  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Data Processing Agreement
          </div>
          <h1 className="text-4xl font-bold mb-4">Data Processing Agreement</h1>
          <div className="bg-white/5 rounded-lg p-6">
            <p className="text-white/70"><strong>Parties:</strong> WHOZA AI LTD ("Processor") and the Customer ("Controller")</p>
            <p className="text-white/70 mt-2"><strong>Company:</strong> WHOZA AI LTD, registered in Scotland (Company Number: SC874716)</p>
            <p className="text-white/70 mt-2"><strong>ICO Registration:</strong> ZC077271</p>
            <p className="text-white/70 mt-2"><strong>Address:</strong> 6 Atholl Crescent, 6, Perth, PH1 5JN, Scotland</p>
            <p className="text-white/70 mt-2"><strong>Contact:</strong> <a href="mailto:dru@whoza.ai" className="text-emerald-400 hover:underline">dru@whoza.ai</a></p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">1. Background</h2>
            <p className="text-white/70 leading-relaxed">
              This Data Processing Agreement ("DPA") forms part of the Terms of Service between WHOZA AI LTD and the Customer. It sets out how we process personal data on your behalf under UK GDPR Article 28.
            </p>
            <p className="text-white/70 leading-relaxed mt-4">
              <strong>Key point:</strong> You (the tradesperson or business) are the Data Controller for your customers' personal data. We (WHOZA AI LTD) are the Data Processor. We only process caller data as instructed by you.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">2. What Data We Process</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-white/70 border border-white/10 rounded-lg">
                <thead className="bg-white/5 text-white">
                  <tr>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Examples</th>
                    <th className="px-4 py-3">Source</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3">Caller phone number</td>
                    <td className="px-4 py-3">CLI (calling line identity)</td>
                    <td className="px-4 py-3">Incoming call</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3">Caller name</td>
                    <td className="px-4 py-3">If provided during call</td>
                    <td className="px-4 py-3">Caller verbal</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3">Caller address/postcode</td>
                    <td className="px-4 py-3">If provided during call</td>
                    <td className="px-4 py-3">Caller verbal</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3">Call recording</td>
                    <td className="px-4 py-3">Audio recording of conversation</td>
                    <td className="px-4 py-3">AI system</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3">Call transcript</td>
                    <td className="px-4 py-3">Text transcription of conversation</td>
                    <td className="px-4 py-3">AI system</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3">Enquiry details</td>
                    <td className="px-4 py-3">Job type, urgency, estimated value</td>
                    <td className="px-4 py-3">AI-extracted</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3">WhatsApp delivery</td>
                    <td className="px-4 py-3">Confirmation of message sent</td>
                    <td className="px-4 py-3">WhatsApp API</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-white/70 leading-relaxed mt-4">
              We do NOT process: payment card data (handled by Stripe), special category data, or criminal records data.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">3. Sub-Processors</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              We use the following sub-processors to deliver the service:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-white/70 border border-white/10 rounded-lg">
                <thead className="bg-white/5 text-white">
                  <tr>
                    <th className="px-4 py-3">Sub-Processor</th>
                    <th className="px-4 py-3">Location</th>
                    <th className="px-4 py-3">Function</th>
                    <th className="px-4 py-3">Transfer Safeguard</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3 font-medium">Trillet.ai</td>
                    <td className="px-4 py-3">United Kingdom</td>
                    <td className="px-4 py-3">AI voice agent, transcription</td>
                    <td className="px-4 py-3">UK-based</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3 font-medium">Stripe</td>
                    <td className="px-4 py-3">United States</td>
                    <td className="px-4 py-3">Payment processing</td>
                    <td className="px-4 py-3">SCCs + UK Addendum</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3 font-medium">Supabase</td>
                    <td className="px-4 py-3">United Kingdom / EU</td>
                    <td className="px-4 py-3">Database hosting, auth</td>
                    <td className="px-4 py-3">UK/EU adequacy</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3 font-medium">Twilio</td>
                    <td className="px-4 py-3">United States</td>
                    <td className="px-4 py-3">Telephony, SMS routing</td>
                    <td className="px-4 py-3">SCCs + UK Addendum</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3 font-medium">Meta (WhatsApp)</td>
                    <td className="px-4 py-3">United States / EU</td>
                    <td className="px-4 py-3">WhatsApp message delivery</td>
                    <td className="px-4 py-3">SCCs + UK Addendum</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3 font-medium">Netlify</td>
                    <td className="px-4 py-3">United States</td>
                    <td className="px-4 py-3">Website hosting</td>
                    <td className="px-4 py-3">SCCs + UK Addendum</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-white/70 leading-relaxed mt-4">
              <strong>Consent to sub-processors:</strong> By using Whoza, you consent to our use of these sub-processors. If we add a new sub-processor, we will notify you at least 14 days in advance. You may object within that period if you have a legitimate data protection concern.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">4. Security Measures</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              We implement the following technical and organisational measures:
            </p>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Encryption:</strong> TLS 1.3 in transit; AES-256 at rest</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Access controls:</strong> Role-based access; multi-factor authentication for staff</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Data separation:</strong> Row-level security ensures your data is isolated from other customers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Audit logging:</strong> All access to personal data is logged</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>SOC 2 Type II:</strong> Independently audited security controls</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Penetration testing:</strong> Annual third-party security assessment</span>
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">5. Data Subject Rights</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              We will assist you with data subject requests (DSARs) from your customers:
            </p>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Response time:</strong> Within 15 business days of your request</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Format:</strong> Data provided in structured, machine-readable format (JSON or CSV)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Deletion:</strong> We can delete specific caller records on your instruction</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Portability:</strong> We can export your caller data for transfer to another service</span>
              </li>
            </ul>
            <p className="text-white/70 leading-relaxed mt-4">
              Your customers should contact YOU (their tradesperson) to exercise their GDPR rights, as you are the Data Controller.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">6. Data Breaches</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              If we discover a personal data breach:
            </p>
            <ol className="space-y-3 text-white/70 list-decimal list-inside">
              <li>We will notify you <strong>within 24 hours</strong> of discovery</li>
              <li>We will notify the ICO <strong>within 72 hours</strong> if the breach is reportable</li>
              <li>We will provide: breach description, categories of data affected, approximate number of people affected, likely consequences, measures taken</li>
            </ol>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">7. Data Return and Deletion</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              When your subscription ends:
            </p>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Option A:</strong> We export all your caller data in CSV format within 7 days</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Option B:</strong> We delete all personal data within 30 days of account closure</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>We provide a deletion certificate on request</span>
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">8. Audit Rights</h2>
            <p className="text-white/70 leading-relaxed">
              You have the right to audit our data processing once per year with 30 days' notice. As an alternative, we will provide our latest SOC 2 Type II report.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">9. International Transfers</h2>
            <p className="text-white/70 leading-relaxed">
              Primary data processing occurs in the United Kingdom. Where data is transferred to the United States (for sub-processors), we use Standard Contractual Clauses (SCCs) incorporating the UK International Data Transfer Agreement (IDTA) issued by the ICO.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">10. Term and Termination</h2>
            <p className="text-white/70 leading-relaxed">
              This DPA remains in force for the duration of your subscription and 30 days thereafter. Sections 6 (breaches), 7 (return/deletion), and 8 (audit) survive termination.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">11. Changes</h2>
            <p className="text-white/70 leading-relaxed">
              Material changes to this DPA require 30 days' notice. Continued use = acceptance.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">12. Contact</h2>
            <div className="bg-white/5 rounded-lg p-6">
              <p className="text-white/70">Data Protection Officer</p>
              <p className="text-white/70 mt-2">Email: <a href="mailto:dru@whoza.ai" className="text-emerald-400 hover:underline">dru@whoza.ai</a></p>
              <p className="text-white/70 mt-2">Post: WHOZA AI LTD, 6 Atholl Crescent, Perth, PH1 5JN, Scotland</p>
            </div>
          </section>

          <section className="mb-10">
            <div className="inline-flex items-center gap-2 text-white/40 text-sm">
              <Shield className="w-4 h-4" />
              <span>ICO Registration: ZC077271</span>
              <a href="https://ico.org.uk/ESDWebPages/Entry/ZC077271" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline inline-flex items-center gap-1">
                Verify <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
