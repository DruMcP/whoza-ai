import { Metadata } from "next"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { ChevronRight, ShieldCheck } from "lucide-react"

export const metadata: Metadata = {
  title: "Modern Slavery Statement | Whoza.ai",
  description: "WHOZA AI LTD modern slavery statement. We have a zero-tolerance approach to modern slavery and human trafficking in our business and supply chains.",
  alternates: {
    canonical: "https://whoza.ai/modern-slavery",
  },
  robots: { index: true, follow: true },
}

export const revalidate = 3600

export default function ModernSlaveryPage() {
  return (
    <div className="min-h-screen bg-[var(--v2-paper)] text-[var(--v2-body)] v2-page">
      <BreadcrumbSchema
        items={[
          { name: "Home", item: "https://whoza.ai" },
          { name: "Modern Slavery Statement", item: "https://whoza.ai/modern-slavery" },
        ]}
      />
      <Header />
      {/* pt-32 clears the fixed header */}
      <main id="main-content" className="max-w-4xl mx-auto px-4 pt-32 pb-16 md:pb-24">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--v2-green)] to-emerald-500 bg-clip-text text-transparent">
            Modern Slavery Statement
          </h1>
          <p className="text-[var(--v2-muted)] text-lg">
            WHOZA AI LTD: Transparency in our operations and supply chain
          </p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-[var(--v2-green)]" />
              <h2 className="text-xl font-semibold text-[var(--v2-ink)]">Our Commitment</h2>
            </div>
            <div className="bg-white border border-[var(--v2-line)] rounded-lg p-6 space-y-4 text-[var(--v2-body)]">
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
              <ChevronRight className="w-5 h-5 text-[var(--v2-green)]" />
              <h2 className="text-xl font-semibold text-[var(--v2-ink)]">Organisation Structure</h2>
            </div>
            <div className="bg-white border border-[var(--v2-line)] rounded-lg p-6 space-y-4 text-[var(--v2-body)]">
              <p>
                <strong className="text-[var(--v2-ink)]">Company:</strong> WHOZA AI LTD
              </p>
              <p>
                <strong className="text-[var(--v2-ink)]">Registered in:</strong> Scotland (Company Number: SC874716)
              </p>
              <p>
                <strong className="text-[var(--v2-ink)]">Registered Office:</strong> 6 Atholl Crescent, Perth, PH1 5JN, United Kingdom
              </p>
              <p>
                <strong className="text-[var(--v2-ink)]">Nature of Business:</strong> WHOZA AI LTD develops and operates an AI-powered voice call handling platform for UK tradespeople. We provide software-as-a-service (SaaS) technology.
              </p>
              <p>
                <strong className="text-[var(--v2-ink)]">Supply Chain:</strong> Our supply chain is primarily technology-focused, comprising software vendors, cloud infrastructure providers, telecommunications providers, and professional services firms. All suppliers are based in jurisdictions with strong labour protections (UK, EU, and US).
              </p>
            </div>
          </section>

          {/* Risk Assessment */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <ChevronRight className="w-5 h-5 text-[var(--v2-green)]" />
              <h2 className="text-xl font-semibold text-[var(--v2-ink)]">Risk Assessment</h2>
            </div>
            <div className="bg-white border border-[var(--v2-line)] rounded-lg p-6 space-y-4 text-[var(--v2-body)]">
              <p className="text-[var(--v2-ink)] font-medium">We have assessed our operations and supply chain and identified the following risk areas:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Cloud infrastructure and data centre operations (low risk: all providers have published modern slavery policies)</li>
                <li>Software development and professional services (low risk: all workers are skilled professionals in regulated industries)</li>
                <li>Telecommunications services (low risk: major UK and international carriers with established compliance programmes)</li>
                <li>Office facilities and maintenance (low risk: UK-based contractors)</li>
              </ul>
              <p>
                We consider our overall risk exposure to modern slavery to be <strong className="text-[var(--v2-ink)]">low</strong>, given the nature of our technology-focused business and the jurisdictions in which we operate.
              </p>
            </div>
          </section>

          {/* Policies and Procedures */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <ChevronRight className="w-5 h-5 text-[var(--v2-green)]" />
              <h2 className="text-xl font-semibold text-[var(--v2-ink)]">Policies and Procedures</h2>
            </div>
            <div className="bg-white border border-[var(--v2-line)] rounded-lg p-6 space-y-4 text-[var(--v2-body)]">
              <p className="text-[var(--v2-ink)] font-medium">We have implemented the following measures:</p>
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
              <ChevronRight className="w-5 h-5 text-[var(--v2-green)]" />
              <h2 className="text-xl font-semibold text-[var(--v2-ink)]">Due Diligence</h2>
            </div>
            <div className="bg-white border border-[var(--v2-line)] rounded-lg p-6 space-y-4 text-[var(--v2-body)]">
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
              <ChevronRight className="w-5 h-5 text-[var(--v2-green)]" />
              <h2 className="text-xl font-semibold text-[var(--v2-ink)]">Training and Awareness</h2>
            </div>
            <div className="bg-white border border-[var(--v2-line)] rounded-lg p-6 space-y-4 text-[var(--v2-body)]">
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
              <ChevronRight className="w-5 h-5 text-[var(--v2-green)]" />
              <h2 className="text-xl font-semibold text-[var(--v2-ink)]">Key Performance Indicators</h2>
            </div>
            <div className="bg-white border border-[var(--v2-line)] rounded-lg p-6 space-y-4 text-[var(--v2-body)]">
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
              <ChevronRight className="w-5 h-5 text-[var(--v2-green)]" />
              <h2 className="text-xl font-semibold text-[var(--v2-ink)]">Board Approval</h2>
            </div>
            <div className="bg-white border border-[var(--v2-line)] rounded-lg p-6 space-y-4 text-[var(--v2-body)]">
              <p>
                This statement has been approved by the board of WHOZA AI LTD and will be reviewed annually.
              </p>
              <div className="mt-4 p-4 bg-white rounded border border-[var(--v2-line)]">
                <p><strong className="text-[var(--v2-ink)]">Date of Approval:</strong> 1 April 2025</p>
                <p><strong className="text-[var(--v2-ink)]">Review Date:</strong> 1 April 2026</p>
                <p><strong className="text-[var(--v2-ink)]">Signed:</strong> Dru McPhee, Director</p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <ChevronRight className="w-5 h-5 text-[var(--v2-green)]" />
              <h2 className="text-xl font-semibold text-[var(--v2-ink)]">Contact and Reporting</h2>
            </div>
            <div className="bg-white border border-[var(--v2-line)] rounded-lg p-6 space-y-4 text-[var(--v2-body)]">
              <p>
                If you have any concerns about modern slavery in our operations or supply chain, please contact us:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Email: <a href="mailto:dru@whoza.ai" className="text-[var(--v2-green)] hover:text-[var(--v2-green-hover)] underline">dru@whoza.ai</a></li>
                <li>Postal: WHOZA AI LTD, 6 Atholl Crescent, Perth, PH1 5JN</li>
              </ul>
              <p className="mt-4 text-sm">
                Concerns will be treated confidentially and investigated promptly. We will not retaliate against anyone who raises concerns in good faith.
              </p>
            </div>
          </section>

          <p className="text-slate-500 text-sm mt-12 pt-8 border-t border-[var(--v2-line)]">
            Last updated: 1 April 2025 | Next review: 1 April 2026
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
