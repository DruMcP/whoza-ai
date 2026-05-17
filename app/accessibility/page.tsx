import { Metadata } from "next"
import { ChevronRight, Accessibility, CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Accessibility Statement | Whoza.ai",
  description: "WHOZA AI LTD's commitment to making our website and services accessible to everyone, including users with disabilities.",
  alternates: {
    canonical: "https://whoza.ai/accessibility",
  },
  robots: { index: true, follow: true },
}

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Accessibility Statement
          </h1>
          <p className="text-slate-400 text-lg">
            WHOZA AI LTD — Committed to digital accessibility for all
          </p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Accessibility className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Our Commitment</h2>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4 text-slate-300">
              <p>
                WHOZA AI LTD is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
              </p>
              <p>
                We believe the web should be accessible to all, regardless of ability or technology. This statement applies to <a href="https://whoza.ai" className="text-blue-400 hover:text-blue-300 underline">whoza.ai</a> and all associated web properties operated by WHOZA AI LTD.
              </p>
            </div>
          </section>

          {/* Standards */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <ChevronRight className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Conformance Standards</h2>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4 text-slate-300">
              <p>
                We aim to conform to the <strong className="text-white">Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong> as published by the World Wide Web Consortium (W3C).
              </p>
              <p>
                These guidelines explain how to make web content more accessible for people with disabilities, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Visual impairments (blindness, low vision, colour blindness)</li>
                <li>Auditory impairments (deafness, hearing loss)</li>
                <li>Motor impairments (limited fine motor control, tremors)</li>
                <li>Cognitive impairments (learning disabilities, dyslexia, ADHD)</li>
                <li>Seizure disorders (photosensitive epilepsy)</li>
              </ul>
            </div>
          </section>

          {/* Measures */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <ChevronRight className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Accessibility Measures</h2>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4 text-slate-300">
              <p className="text-white font-medium">We have implemented the following accessibility features:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <h3 className="font-medium text-white">Keyboard Navigation</h3>
                  </div>
                  <p className="text-sm">All interactive elements are accessible via keyboard. Tab order follows logical content flow.</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <h3 className="font-medium text-white">Screen Reader Support</h3>
                  </div>
                  <p className="text-sm">ARIA labels, roles, and landmarks enable proper navigation with assistive technologies.</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <h3 className="font-medium text-white">Colour Contrast</h3>
                  </div>
                  <p className="text-sm">Text meets WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text).</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <h3 className="font-medium text-white">Focus Indicators</h3>
                  </div>
                  <p className="text-sm">Clear visible focus indicators on all interactive elements for keyboard users.</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <h3 className="font-medium text-white">Alt Text</h3>
                  </div>
                  <p className="text-sm">All meaningful images include descriptive alt text. Decorative images are marked appropriately.</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <h3 className="font-medium text-white">Reduced Motion</h3>
                  </div>
                  <p className="text-sm">Animations respect <code className="bg-slate-800 px-1 rounded">prefers-reduced-motion</code> user preferences.</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <h3 className="font-medium text-white">Resizable Text</h3>
                  </div>
                  <p className="text-sm">Content remains functional when text is resized up to 200% without assistive technology.</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <h3 className="font-medium text-white">Semantic HTML</h3>
                  </div>
                  <p className="text-sm">Proper heading hierarchy, landmark regions, and form labels for structure and navigation.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Known Limitations */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <ChevronRight className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Known Limitations</h2>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4 text-slate-300">
              <p>
                We are aware of the following accessibility limitations and are actively working to address them:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Some third-party embedded content (e.g., video players) may not fully meet WCAG AA standards</li>
                <li>PDF documents may have varying levels of accessibility</li>
                <li>Some complex interactive elements may require additional ARIA enhancements</li>
              </ul>
              <p>
                We welcome feedback on any accessibility issues you encounter.
              </p>
            </div>
          </section>

          {/* Assessment */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <ChevronRight className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Assessment Methods</h2>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4 text-slate-300">
              <p>
                We assess accessibility through:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Regular automated testing using axe-core and Lighthouse</li>
                <li>Manual keyboard navigation testing</li>
                <li>Screen reader testing with NVDA and VoiceOver</li>
                <li>User testing with people with disabilities</li>
                <li>Periodic external accessibility audits</li>
              </ul>
              <p>
                Last assessed: <strong className="text-white">May 2025</strong>
              </p>
            </div>
          </section>

          {/* Feedback */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <ChevronRight className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Feedback and Contact</h2>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4 text-slate-300">
              <p>
                We welcome your feedback on the accessibility of whoza.ai. If you encounter any barriers or have suggestions for improvement, please contact us:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Email: <a href="mailto:dru@whoza.ai" className="text-blue-400 hover:text-blue-300 underline">dru@whoza.ai</a></li>
                <li>Postal: WHOZA AI LTD, 6 Atholl Crescent, Perth, PH1 5JN</li>
              </ul>
              <p className="mt-4">
                We aim to respond to accessibility feedback within <strong className="text-white">5 business days</strong> and to propose a solution within <strong className="text-white">10 business days</strong>.
              </p>
            </div>
          </section>

          {/* Enforcement */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <ChevronRight className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Enforcement Procedure</h2>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4 text-slate-300">
              <p>
                In the event that you are dissatisfied with our response to an accessibility concern, you may escalate the matter to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>The Equality and Human Rights Commission (EHRC) for UK residents</li>
                <li>Your local trading standards office</li>
              </ul>
            </div>
          </section>

          <p className="text-slate-500 text-sm mt-12 pt-8 border-t border-slate-800">
            Last updated: May 2025 | Next review: November 2025
          </p>
        </div>
      </div>
    </div>
  )
}
