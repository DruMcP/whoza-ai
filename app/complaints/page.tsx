import { Metadata } from "next"
import { ChevronRight, MessageSquareWarning } from "lucide-react"

export const metadata: Metadata = {
  title: "Complaints Procedure | Whoza.ai",
  description: "How to make a complaint about WHOZA AI LTD's services and how we handle complaints fairly and promptly.",
  alternates: {
    canonical: "https://whoza.ai/complaints",
  },
  robots: { index: true, follow: true },
}

export default function ComplaintsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Complaints Procedure
          </h1>
          <p className="text-slate-400 text-lg">
            WHOZA AI LTD — We take complaints seriously
          </p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <MessageSquareWarning className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Our Commitment</h2>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4 text-slate-300">
              <p>
                WHOZA AI LTD is committed to providing excellent service. When things go wrong, we want to know so we can put them right. This procedure explains how to make a complaint and how we will handle it.
              </p>
              <p>
                We treat all complaints seriously and aim to resolve them fairly, promptly, and confidentially. Making a complaint will not affect your service or the way we treat you.
              </p>
            </div>
          </section>

          {/* How to Complain */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <ChevronRight className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">How to Make a Complaint</h2>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4 text-slate-300">
              <p className="text-white font-medium">You can make a complaint by:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Email: <a href="mailto:dru@whoza.ai" className="text-blue-400 hover:text-blue-300 underline">dru@whoza.ai</a> — Please include "Complaint" in the subject line</li>
                <li>Post: WHOZA AI LTD, 6 Atholl Crescent, Perth, PH1 5JN, United Kingdom</li>
              </ul>
              <p>
                To help us resolve your complaint quickly, please provide:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your name and contact details</li>
                <li>Your account information (if applicable)</li>
                <li>A clear description of what went wrong</li>
                <li>What you would like us to do to put things right</li>
                <li>Any relevant dates, reference numbers, or supporting documents</li>
              </ul>
            </div>
          </section>

          {/* Timescales */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <ChevronRight className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Our Response Times</h2>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4 text-slate-300">
              <div className="space-y-4">
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                  <p className="text-white font-medium">Day 1 (Acknowledgement)</p>
                  <p className="text-sm">We will acknowledge receipt of your complaint within 24 hours (or the next business day).</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                  <p className="text-white font-medium">Day 5 (Investigation)</p>
                  <p className="text-sm">We will complete our initial investigation and provide a full response, or update you on our progress if more time is needed.</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                  <p className="text-white font-medium">Day 10 (Final Response)</p>
                  <p className="text-sm">If your complaint is complex, we will provide a final response within 10 business days. If we need longer, we will explain why and give you a revised timeline.</p>
                </div>
              </div>
            </div>
          </section>

          {/* What We Will Do */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <ChevronRight className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">How We Handle Complaints</h2>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4 text-slate-300">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We will listen to your concerns without interruption</li>
                <li>We will investigate fairly and impartially</li>
                <li>We will keep you informed of progress</li>
                <li>We will apologise if we have made a mistake</li>
                <li>We will explain what went wrong and why</li>
                <li>We will tell you what we will do to put things right</li>
                <li>We will learn from complaints to improve our service</li>
              </ul>
            </div>
          </section>

          {/* Outcomes */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <ChevronRight className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Possible Outcomes</h2>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4 text-slate-300">
              <p>Depending on the nature of your complaint, we may:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Explain our position and why we believe we acted correctly</li>
                <li>Apologise and explain what went wrong</li>
                <li>Offer a refund or service credit where appropriate</li>
                <li>Take corrective action to fix the issue</li>
                <li>Make changes to our processes to prevent recurrence</li>
                <li>Provide additional training or support</li>
              </ul>
            </div>
          </section>

          {/* Escalation */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <ChevronRight className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Escalation</h2>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4 text-slate-300">
              <p>
                If you are not satisfied with our response, you can ask for your complaint to be escalated to a senior manager. Please email <a href="mailto:dru@whoza.ai" className="text-blue-400 hover:text-blue-300 underline">dru@whoza.ai</a> with "Escalated Complaint" in the subject line.
              </p>
              <p>
                A senior manager will review your complaint and provide a response within 5 business days.
              </p>
            </div>
          </section>

          {/* External Help */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <ChevronRight className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">External Dispute Resolution</h2>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4 text-slate-300">
              <p>
                If we cannot resolve your complaint to your satisfaction, you may be able to refer the matter to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>The UK European Consumer Centre (for cross-border consumer disputes)</li>
                <li>Your local Citizens Advice service</li>
                <li>Your credit card provider (for chargeback requests, where applicable)</li>
              </ul>
              <p className="text-sm text-slate-400">
                Note: As a B2B SaaS provider, our services fall outside the jurisdiction of most consumer ombudsman services. We encourage direct resolution wherever possible.
              </p>
            </div>
          </section>

          {/* Record Keeping */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <ChevronRight className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Records</h2>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4 text-slate-300">
              <p>
                We keep records of all complaints for at least 12 months from the date of resolution. These records help us identify trends and improve our service.
              </p>
              <p>
                Complaint records are stored securely and access is limited to staff who need it to perform their duties.
              </p>
            </div>
          </section>

          <p className="text-slate-500 text-sm mt-12 pt-8 border-t border-slate-800">
            Last updated: May 2025
          </p>
        </div>
      </div>
    </div>
  )
}