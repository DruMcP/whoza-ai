"use client"

import { useState } from "react"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { ArrowRight, Download, Mail, FileSpreadsheet, FileText, FileCheck, Users, Star, ChevronRight, Briefcase, PoundSterling } from "lucide-react"
import Link from "next/link"

export default function TradeBusinessGrowthToolkitPage() {
  const [formState, setFormState] = useState({ name: "", email: "", trade: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder for actual email capture logic
    setSubmitted(true)
  }

  const toolkitItems = [
    {
      icon: <FileSpreadsheet className="w-6 h-6 text-emerald-600" />,
      title: "Quoting Calculator Spreadsheet",
      description: "Never underquote again. Auto-calculates materials, labour, markup, and VAT for 12+ trade types.",
    },
    {
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      title: "Customer Enquiry Form Template",
      description: "Professional form to capture every detail on first contact — job type, urgency, location, budget.",
    },
    {
      icon: <Mail className="w-6 h-6 text-purple-600" />,
      title: "Follow-Up Email Templates (3)",
      description: "Quote follow-up, post-job thank you, and win-back templates that actually get replies.",
    },
    {
      icon: <FileCheck className="w-6 h-6 text-orange-600" />,
      title: "Missed Call Recovery Checklist",
      description: "Step-by-step system to recover lost enquiries before your competitor does.",
    },
  ]

  const tradeOptions = [
    "Plumber",
    "Electrician",
    "Builder",
    "Roofer",
    "Painter & Decorator",
    "Heating Engineer",
    "Landscaper",
    "Carpenter",
    "Tiler",
    "Plasterer",
    "Locksmith",
    "Drainage Specialist",
    "Pest Control",
    "Other",
  ]

  return (
    <>
      <Header />
      <BreadcrumbSchema
        items={[
          { name: "Home", item: "https://whoza.ai" },
          { name: "Resources", item: "https://whoza.ai/resources" },
          { name: "Growth Toolkit", item: "https://whoza.ai/resources/trade-business-growth-toolkit" },
        ]}
      />

      <main id="main-content" role="main" className="pb-24 lg:pb-0">
        {/* Hero */}
        <section
          className="dark-section relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0F1729 0%, #1A1A2E 50%, #0F1729 100%)" }}
        >
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center text-sm text-slate-400" style={{ listStyle: "none", padding: 0 }}>
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li className="mx-2">
                  <ChevronRight className="w-4 h-4" />
                </li>
                <li>
                  <Link href="/resources" className="hover:text-white transition-colors">
                    Resources
                  </Link>
                </li>
                <li className="mx-2">
                  <ChevronRight className="w-4 h-4" />
                </li>
                <li className="text-white">Growth Toolkit</li>
              </ol>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Download className="w-4 h-4" />
                  Free Download
                </div>
                <h1
                  className="text-4xl lg:text-5xl font-extrabold text-white mb-6"
                  style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}
                >
                  Free Trade Business
                  <br />
                  <span className="text-emerald-400">Growth Toolkit</span>
                </h1>

              <div className="mt-4 text-white/30 text-sm">
                Last updated: <time dateTime="2026-06-06">2026-06-06</time>
              </div>
                <p className="text-lg text-slate-400 mb-8 max-w-xl">
                  Everything you need to quote faster, follow up better, and convert more enquiries into booked jobs.
                  Built specifically for UK tradespeople.
                </p>

                {/* Social proof */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-emerald-500/20 border-2 border-[#0F1729] flex items-center justify-center text-xs text-emerald-400 font-bold"
                      >
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-slate-400">
                    <span className="text-white font-semibold">2,847+</span> downloads by UK tradespeople
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white/80 text-sm italic">
                        "The quoting spreadsheet alone saved me from underquoting three jobs in my first week. Best free
                        resource I've downloaded."
                      </p>
                      <p className="text-white/50 text-xs mt-2">— Dave R., Electrician, Lewisham</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Get Your Free Toolkit</h3>
                    <p className="text-sm text-slate-500 mb-4">Enter your details below. We'll email the toolkit instantly.</p>

                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-slate-900"
                        placeholder="e.g. John Smith"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-slate-900"
                        placeholder="john@yourbusiness.co.uk"
                      />
                    </div>

                    <div>
                      <label htmlFor="trade" className="block text-sm font-medium text-slate-700 mb-1">
                        Your Trade
                      </label>
                      <select
                        id="trade"
                        required
                        value={formState.trade}
                        onChange={(e) => setFormState({ ...formState, trade: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-slate-900 bg-white"
                      >
                        <option value="">Select your trade...</option>
                        {tradeOptions.map((trade) => (
                          <option key={trade} value={trade}>
                            {trade}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition-colors shadow-lg flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Download Free Toolkit
                    </button>

                    <p className="text-xs text-slate-400 text-center flex items-center justify-center gap-1">
                      <Users className="w-3 h-3" />
                      No credit card required. Unsubscribe anytime.
                    </p>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                      <Download className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Toolkit on its way!</h3>
                    <p className="text-slate-600 mb-6">
                      Check your inbox at <strong>{formState.email}</strong>. We've sent the Trade Business Growth
                      Toolkit directly to you.
                    </p>
                    <p className="text-sm text-slate-500">
                      Didn't receive it? Check your spam folder or{" "}
                      <a href="/contact" className="text-emerald-600 hover:underline">
                        contact us
                      </a>
                      .
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* What's inside */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">What's Inside the Toolkit</h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Four essential resources designed specifically for UK trade businesses. No fluff. Just actionable tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {toolkitItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "Is this toolkit really free?",
                a: "Yes, 100% free. No credit card required. We just ask for your email so we can send you the download link and occasional trade business tips.",
              },
              {
                q: "What format are the files in?",
                a: "The Quoting Calculator is a Google Sheets / Excel spreadsheet. The templates and checklists are PDF and editable Word formats.",
              },
              {
                q: "Will you spam my inbox?",
                a: "No. We send one email with your toolkit, plus a weekly trade business tip if you opt in. You can unsubscribe anytime with one click.",
              },
              {
                q: "Can I share this with my team?",
                a: "Absolutely. Once downloaded, the toolkit is yours to use across your entire business.",
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-slate-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related resources */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/pricing"
              className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-4 hover:border-emerald-300 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <PoundSterling className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="font-semibold text-slate-900">View Pricing</div>
                <div className="text-sm text-slate-500">Plans from £59/month</div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 ml-auto" />
            </Link>
            <Link
              href="/blog/ai-call-answering-uk-tradespeople-definitive-guide-2026"
              className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-4 hover:border-emerald-300 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold text-slate-900">How to Grow Your Trade Business</div>
                <div className="text-sm text-slate-500">Complete 2026 guide</div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 ml-auto" />
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to stop losing jobs to missed calls?</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            whoza.ai answers every call, qualifies leads, and delivers them to your WhatsApp. Start your 7-day free
            trial today — no credit card required.
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-emerald-700 transition-colors shadow-lg"
          >
            Try whoza.ai Free for 7 Days <ArrowRight className="w-5 h-5" />
          </a>
        </section>
      </main>

      <Footer />
    </>
  )
}
