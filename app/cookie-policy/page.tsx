import { Metadata } from "next"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { Cookie, Shield, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "Cookie Policy | whoza.ai",
  description: "whoza.ai cookie policy — ICO-registered, UK GDPR compliant. Learn how we use cookies.",
  alternates: {
    canonical: "https://whoza.ai/cookie-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "Cookie Policy", item: "https://whoza.ai/cookie-policy" },
      ]} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Cookie className="w-4 h-4" />
            Cookie Policy
          </div>
          <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-white/60">Last updated: May 2026</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <section className="mb-10">
            <div className="bg-white/5 rounded-lg p-6 mb-8">
              <p className="text-white/70"><strong>Company:</strong> WHOZA AI LTD</p>
              <p className="text-white/70 mt-2"><strong>ICO Registration:</strong> ZC077271</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">1. What Are Cookies</h2>
            <p className="text-white/70 leading-relaxed">
              Cookies are small text files stored on your device when you visit a website. They help the site work properly and let us understand how people use it.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">2. Types of Cookies We Use</h2>
            
            <h3 className="text-lg font-medium mb-3 mt-6">2.1 Essential Cookies (Always On)</h3>
            <p className="text-white/70 leading-relaxed mb-4">
              These cookies are necessary for Whoza to function. You cannot turn them off.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-white/70 border border-white/10 rounded-lg">
                <thead className="bg-white/5 text-white">
                  <tr>
                    <th className="px-4 py-3">Cookie Name</th>
                    <th className="px-4 py-3">Purpose</th>
                    <th className="px-4 py-3">Duration</th>
                    <th className="px-4 py-3">Provider</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3 font-mono text-emerald-400">session_id</td>
                    <td className="px-4 py-3">Keeps you logged in</td>
                    <td className="px-4 py-3">Session</td>
                    <td className="px-4 py-3">whoza.ai</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3 font-mono text-emerald-400">csrf_token</td>
                    <td className="px-4 py-3">Prevents security attacks</td>
                    <td className="px-4 py-3">Session</td>
                    <td className="px-4 py-3">whoza.ai</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3 font-mono text-emerald-400">consent_recorded</td>
                    <td className="px-4 py-3">Remembers your cookie choices</td>
                    <td className="px-4 py-3">12 months</td>
                    <td className="px-4 py-3">whoza.ai</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-medium mb-3 mt-8">2.2 Analytics Cookies (Optional)</h3>
            <p className="text-white/70 leading-relaxed mb-4">
              These help us understand how tradespeople use Whoza so we can improve it. We do NOT use Google Analytics or any ad-tracking tools.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-white/70 border border-white/10 rounded-lg">
                <thead className="bg-white/5 text-white">
                  <tr>
                    <th className="px-4 py-3">Cookie Name</th>
                    <th className="px-4 py-3">Purpose</th>
                    <th className="px-4 py-3">Duration</th>
                    <th className="px-4 py-3">Provider</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3 font-mono text-emerald-400">_wa_pv</td>
                    <td className="px-4 py-3">Anonymous page view counter</td>
                    <td className="px-4 py-3">30 days</td>
                    <td className="px-4 py-3">whoza.ai (first-party)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-medium mb-3 mt-8">2.3 Functional Cookies (Optional)</h3>
            <p className="text-white/70 leading-relaxed mb-4">
              These remember your preferences.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-white/70 border border-white/10 rounded-lg">
                <thead className="bg-white/5 text-white">
                  <tr>
                    <th className="px-4 py-3">Cookie Name</th>
                    <th className="px-4 py-3">Purpose</th>
                    <th className="px-4 py-3">Duration</th>
                    <th className="px-4 py-3">Provider</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3 font-mono text-emerald-400">preferred_trade</td>
                    <td className="px-4 py-3">Remembers your trade type</td>
                    <td className="px-4 py-3">30 days</td>
                    <td className="px-4 py-3">whoza.ai</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3 font-mono text-emerald-400">alert_preference</td>
                    <td className="px-4 py-3">Remembers WhatsApp/SMS/Email choice</td>
                    <td className="px-4 py-3">30 days</td>
                    <td className="px-4 py-3">whoza.ai</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-medium mb-3 mt-8">2.4 Marketing Cookies</h3>
            <p className="text-white/70 leading-relaxed">
              <strong>We do not use marketing cookies.</strong> We do not track you across other websites. We do not sell your data to advertisers.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">3. Third-Party Cookies</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              We keep third-party cookies to a minimum. The only third parties that may set cookies are:
            </p>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Stripe</strong> — Payment processing (only on billing pages)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Supabase</strong> — Authentication (only when you log in)</span>
              </li>
            </ul>
            <p className="text-white/70 leading-relaxed mt-4">
              Both are regulated under UK data protection law and bound by Standard Contractual Clauses.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">4. How to Manage Cookies</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              You can change your cookie preferences at any time by clicking &quot;Cookie Preferences&quot; in the footer of any page. You can also manage cookies through your browser settings:
            </p>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Chrome:</strong> Settings → Privacy and security → Cookies</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Safari:</strong> Preferences → Privacy → Manage cookies</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Firefox:</strong> Settings → Privacy &amp; Security → Cookies</span>
              </li>
            </ul>
            <p className="text-white/70 leading-relaxed mt-4">
              Blocking essential cookies will prevent Whoza from working properly.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">5. Changes to This Policy</h2>
            <p className="text-white/70 leading-relaxed">
              If we change the cookies we use, we will update this page and notify you via email or your dashboard.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">6. Contact Us</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              Questions about cookies? Contact our Data Protection Officer:
            </p>
            <div className="bg-white/5 rounded-lg p-6">
              <p className="text-white/70">Email: <a href="mailto:dru@whoza.ai" className="text-emerald-400 hover:underline">dru@whoza.ai</a></p>
              <p className="text-white/70 mt-2">WhatsApp: <a href="https://wa.me/447831643012" className="text-emerald-400 hover:underline">+44 7831 643012</a></p>
              <p className="text-white/70 mt-2">Post: WHOZA AI LTD, 6 Atholl Crescent, 6, Perth, PH1 5JN, Scotland</p>
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
