import { Metadata } from "next"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { Shield, Phone, Database, Clock, Lock, UserCheck, FileText, Globe, ExternalLink } from "lucide-react"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Privacy Policy | whoza.ai",
  description: "whoza.ai privacy policy — ICO-registered, UK GDPR compliant. Learn how we protect your data.",
  alternates: {
    canonical: "https://whoza.ai/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/privacy",
    siteName: "Whoza.ai",
    title: "Privacy Policy | whoza.ai",
    description: "whoza.ai privacy policy — ICO-registered, UK GDPR compliant. Learn how we protect your data.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "Privacy Policy" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "Privacy Policy | whoza.ai",
    description: "whoza.ai privacy policy — ICO-registered, UK GDPR compliant. Learn how we protect your data.",
    images: ["https://whoza.ai/og-image.webp"],
  },
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "Privacy Policy", item: "https://whoza.ai/privacy" },
      ]} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Your data is protected
          </div>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-white/60">Last updated: July 2026</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <Database className="w-5 h-5 text-emerald-400" />
              1. Data Controller
            </h2>
            <p className="text-white/70 leading-relaxed">
              WHOZA AI LTD (Company No. SC874716) is the data controller for personal information processed through our AI revenue system for UK tradespeople. We are registered with the Information Commissioner's Office (ICO) and process data in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
            </p>
            <div className="bg-white/5 rounded-lg p-6 mt-4">
              <p className="text-white/70"><strong>WHOZA AI LTD</strong> (Company No. SC874716) is registered with the Information Commissioner's Office (ICO) as a data controller and processor.</p>
              <p className="text-white/70 mt-2">ICO Registration Number: <strong className="text-white">ZC077271</strong></p>
              <p className="text-white/70 mt-2">
                <a href="https://ico.org.uk/ESDWebPages/Entry/ZC077271" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline inline-flex items-center gap-1">
                  Verify our registration <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <Phone className="w-5 h-5 text-emerald-400" />
              2. What Data We Collect
            </h2>
            <p className="text-white/70 leading-relaxed mb-4">
              When you use whoza.ai's AI call handling service, we collect and process the following categories of data:
            </p>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Call transcripts:</strong> Voice calls answered by our AI agents (Katie/Mark) are transcribed for quality and service delivery purposes. Calls are <strong>not recorded</strong>; a written transcript is generated and processed by AI. No audio is stored. The AI assistant identifies itself as AI only when a caller asks, and always answers honestly — it never claims to be human.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Caller information:</strong> Phone numbers, names, addresses, postcodes, and job details shared during the conversation.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Business profile data:</strong> Your company name, trade type, service area, operating hours, pricing, and business rules used to train your AI agent.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Usage data:</strong> Call volumes, minute usage, enquiry outcomes, and dashboard analytics.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>WhatsApp/SMS delivery data:</strong> Messages sent to your phone containing enquiry summaries.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Payment information:</strong> Billing details processed securely through Stripe. We do not store full card numbers.</span>
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <FileText className="w-5 h-5 text-emerald-400" />
              3. How We Use Your Data
            </h2>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>To answer calls on your behalf using AI voice technology</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>To send qualified enquiries to your WhatsApp or SMS</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>To send post-call service messages (e.g. satisfaction SMS) tied to the caller's own call, processed under legitimate interests / PECR service-message basis. Marketing messages require separate consent and are not sent on the Starter plan.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>To analyse competitor data and provide growth recommendations (Rex)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>To train and improve our AI models (using anonymised data where possible)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>To track usage for billing and subscription management</span>
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <Globe className="w-5 h-5 text-emerald-400" />
              4. AI Processing Disclosure
            </h2>
            <p className="text-white/70 leading-relaxed">
              Whoza.ai uses artificial intelligence to process voice calls, transcribe conversations, and generate responses. Our AI agents (Katie and Mark) are powered by third-party voice AI infrastructure. All AI processing occurs within UK/EU data centres or jurisdictions with adequate data protection safeguards. The AI assistant identifies itself as AI only when a caller asks, and always answers honestly — it never claims to be human.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <Lock className="w-5 h-5 text-emerald-400" />
              5. Data Security
            </h2>
            <p className="text-white/70 leading-relaxed">
              We implement appropriate technical and organisational measures to protect your data, including encryption in transit (TLS 1.3) and at rest, access controls, regular security audits, and staff training. Our SOC 2 Type II programme is in progress; our security controls are SOC 2-aligned. We maintain strict data separation between client accounts.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <Clock className="w-5 h-5 text-emerald-400" />
              6. Data Retention
            </h2>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Audio:</strong> Calls are not recorded. Audio is never stored anywhere in the stack.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Transcripts and call notes (dashboard):</strong> Visible to the business owner in their dashboard for <strong>30 days</strong>, then removed from the dashboard.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Transcripts and metadata (backend archive):</strong> Retained for billing and dispute resolution for <strong>[[CONFIRM WITH LEGAL: archive transcript retention period]]</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Caller contact record:</strong> Phone number, name and known details used to recognise returning callers. This is a separate data class with its own lawful basis, retained while the account is active plus the dispute window.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Business profile data:</strong> Retained for the duration of your subscription plus 6 months after cancellation.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Payment records:</strong> Retained for 7 years in accordance with UK tax regulations.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Early deletion:</strong> You may request early deletion of transcripts, metadata and caller contact records at any time by contacting us.</span>
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <UserCheck className="w-5 h-5 text-emerald-400" />
              7. Your GDPR Rights
            </h2>
            <p className="text-white/70 leading-relaxed mb-4">
              Under UK GDPR, you have the following rights regarding your personal data:
            </p>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Right to access:</strong> Request a copy of your personal data</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Right to rectification:</strong> Correct inaccurate or incomplete data</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Right to erasure:</strong> Request deletion of your data ("right to be forgotten"). Early deletion of transcripts, metadata and caller contact records is available on request at any time.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Right to restrict processing:</strong> Limit how we use your data</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Right to data portability:</strong> Receive your data in a structured format</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Right to object:</strong> Object to processing based on legitimate interests</span>
              </li>
            </ul>
            <p className="text-white/70 leading-relaxed mt-4">
              To exercise any of these rights, contact us at <a href="mailto:dru@whoza.ai" className="text-emerald-400 hover:underline">dru@whoza.ai</a> or via WhatsApp at <a href="tel:+447463141750" className="text-emerald-400 hover:underline">+44 7463 141750</a>. We will respond within 30 days.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">8. Cookies and Tracking</h2>
            <p className="text-white/70 leading-relaxed">
              We use essential cookies for site functionality and analytics cookies to understand how visitors use our website. We do not use third-party marketing cookies. You can manage cookie preferences through your browser settings. For analytics, we use privacy-focused tools that do not track individual users across sites.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">9. Third-Party Processors</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              We use carefully selected third-party services to deliver whoza.ai:
            </p>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Telephony and SMS:</strong> Twilio (call routing and SMS delivery)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Voice-agent orchestration:</strong> Retell (conversation flow and agent management)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Voice synthesis:</strong> ElevenLabs (AI voice generation)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Payments:</strong> Stripe (billing and subscription management)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Database:</strong> Supabase (secure data storage)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Hosting:</strong> Netlify (website and application hosting)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>WhatsApp Business API:</strong> Meta (message delivery)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Calendar integration:</strong> Google, Microsoft, Apple (calendar sync and booking)</span>
              </li>
            </ul>
            <p className="text-white/70 leading-relaxed mt-4">
              All third-party processors are GDPR-compliant and bound by data processing agreements that ensure your data is handled securely and only for specified purposes.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">10. Contact Us</h2>
            <p className="text-white/70 leading-relaxed">
              For privacy-related questions, data subject requests, or concerns about how we handle your information, contact:
            </p>
            <div className="mt-4 bg-white/5 rounded-lg p-6">
              <p className="text-white/70">Data Protection Officer</p>
              <p className="text-white font-medium mt-1">WHOZA AI LTD</p>
              <p className="text-white/70 mt-2">Email: <a href="mailto:dru@whoza.ai" className="text-emerald-400 hover:underline">dru@whoza.ai</a></p>
              <p className="text-white/70">WhatsApp: <a href="tel:+447463141750" className="text-emerald-400 hover:underline">+44 7463 141750</a></p>
              <p className="text-white/70 mt-2">Post: WHOZA AI LTD, 6 Atholl Crescent, 6, Perth, PH1 5JN, Scotland</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">11. Changes to This Policy</h2>
            <p className="text-white/70 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. We will notify you of significant changes via email or through your dashboard. The "Last updated" date at the top of this page indicates when the policy was last revised.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
