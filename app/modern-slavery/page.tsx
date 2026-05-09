import { Metadata } from "next"
import { ChevronRight, ShieldCheck } from "lucide-react"

export const metadata: Metadata = {
  title: "Modern Slavery Statement | Whoza.ai",
  description: "WHOZA AI LTD's commitment to preventing modern slavery and human trafficking in our operations and supply chain.",
  robots: { index: true, follow: true },
}

export default function ModernSlaveryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Modern Slavery Statement
          </h1>
          <p className="text-slate-400 text-lg">
            WHOZA AI LTD — Transparency in our operations and supply chain
          </p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Our Commitment</h2>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4 text-slate-300">
              <p>
                WHOZA AI LTD is committed to ensuring that modern slavery and human trafficking have no place in our operations or supply chain. We take a zero-tolerance approach to any form of forced labour, human trafficking, or exploitation.
              </p>
              <p>
                This statement is made pursuant to Section 54 of the Modern Slavery Act 2015 and covers our financial year ending 31 March 2026.
              </p>
            </div>
          </section>

          {/* Organisation Structure */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <ChevronRight className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Organisation Structure</h2>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4 text-slate-300">
              <p>
                <strong className="text-white">Company:</strong> WHOZA AI LTD
              </p>
              <p>
                <strong className="text-white">Registered in:</strong> Scotland (Company Number: SC874716)
              </p>
              <p>
                <strong className="text-white">Registered Office:</strong> 6 Atholl Crescent, Perth, PH1 5JN, United Kingdom
              </p>
              <p>
                <strong className="text-white">Nature of Business:</strong> WHOZA AI LTD develops and operates an AI-powered voice call answering platform for UK tradespeople. We provide software-as-a-service (SaaS) technology.
              </p>
              <p>
                <strong className="text-white">Supply Chain:</strong> Our supply chain is primarily technology-focused, comprising software vendors, cloud infrastructure providers, telecommunications providers, and professional services firms. All suppliers are based in jurisdictions with strong labour protections (UK, EU, and US).
              </p>
            </div>
          </section>

          {/* Risk Assessment */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <ChevronRight className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Risk Assessment</h2>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4 text-slate-300">
              <p className="text-white font-medium">We have assessed our operations and supply chain and identified the following risk areas:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Cloud infrastructure and data centre operations (low risk — all providers have published modern slavery policies)</li>
                <li>Software development and professional services (low risk — all workers are skilled professionals in regulated industries)</li>
                <li>Telecommunications services (low risk — major UK and international carriers with established compliance programmes)</li>
                <li>Office facilities and maintenance (low risk — UK-based contractors)</li>
              </ul>
              <p>
                We consider our overall risk exposure to modern slavery to be <strong className="text-white">low</strong>, given the nature of our technology-focused business and the jurisdictions in which we operate.
              </p>
            </div>
          </section>

          {/* Policies and Procedures */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <ChevronRight className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Policies and Procedures</h2>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4 text-slate-300">
              <p className="text-white font-medium">We have implemented the following measures:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All employees are paid at or above the National Living Wage</li>
                <li>We conduct right-to-work checks for all UK employees</li>
                <li>We require key suppliers to confirm compliance with modern slavery legislation</li>
                <li>We include anti-slavery clauses in our standard supplier contracts</li>
                <li>We encourage employees to report any concerns through our confidential whistleblowing channel</li>
              </ul>
            </div>
          </section>

          {/* Due Diligence */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <ChevronRight className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Due Diligence</h2>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4 text-slate-300">
              <p>
                We conduct due diligence on all key suppliers before engagement. This includes reviewing their modern slavery statements where applicable, and requiring confirmation that they operate in compliance with applicable labour laws.
              </p>
              <p>
                We prioritise suppliers who publish modern slavery statements and demonstrate transparent supply chain practices.
              </p>
            </div>
          </section>

          {/* Training */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <ChevronRight className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Training and Awareness</h2>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4 text-slate-300">
              <p>
                We provide training to relevant staff on identifying and preventing modern slavery. This includes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Understanding what constitutes modern slavery and human trafficking</li>
                <li>Recognising risk indicators in our operations and supply chain</li>
                <li>Reporting procedures for suspected cases</li>
              </ul>
            </div>
          </section>

          {/* Key Performance Indicators */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <ChevronRight className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Key Performance Indicators</h2>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4 text-slate-300">
              <p>We measure our effectiveness through:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Percentage of key suppliers with published modern slavery statements: 100%</li>
                <li>Number of reported incidents: 0</li>
                <li>Staff training completion rate: 100% of relevant personnel</li>
                <li>Supplier contract clauses updated: 100% of new contracts</li>
              </ul>
            </div>
          </section>

          {/* Approval */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <ChevronRight className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Board Approval</h2>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4 text-slate-300">
              <p>
                This statement has been approved by the board of WHOZA AI LTD and will be reviewed annually.
              </p>
              <div className="mt-4 p-4 bg-slate-900/50 rounded border border-slate-700">
                <p><strong className="text-white">Date of Approval:</strong> 1 April 2025</p>
                <p><strong className="text-white">Review Date:</strong> 1 April 2026</p>
                <p><strong className="text-white">Signed:</strong> Dru McPhee, Director</p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <ChevronRight className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Contact and Reporting</h2>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4 text-slate-300">
              <p>
                If you have any concerns about modern slavery in our operations or supply chain, please contact us:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Email: <a href="mailto:dru@whoza.ai" className="text-blue-400 hover:text-blue-300 underline">dru@whoza.ai</a></li>
                <li>Postal: WHOZA AI LTD, 6 Atholl Crescent, Perth, PH1 5JN</li>
              </ul>
              <p className="mt-4 text-sm">
                Concerns will be treated confidentially and investigated promptly. We will not retaliate against anyone who raises concerns in good faith.
              </p>
            </div>
          </section>

          <p className="text-slate-500 text-sm mt-12 pt-8 border-t border-slate-800">
            Last updated: 1 April 2025 | Next review: 1 April 2026
          </p>
        </div>
      </div>
    </div>
  )
}
