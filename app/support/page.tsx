import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { Mail, MessageSquare, Phone, Clock, Ticket, HelpCircle, Zap, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Support Centre | whoza.ai",
  description: "Get help with whoza.ai — email support, WhatsApp, and callback requests. Response within 24 hours.",
  alternates: {
    canonical: "https://whoza.ai/support",
  },
  robots: {
    index: true,
    follow: true,
  },
}

const supportChannels = [
  {
    icon: Mail,
    title: "Email Support",
    description: "For problem solutions, general enquiries, callbacks, and ticketing enquiries",
    email: "support@whoza.ai",
    responseTime: "Within 24 hours",
    primary: true,
  },
  {
    icon: MessageSquare,
    title: "WhatsApp",
    description: "Quick questions and urgent issues",
    link: "https://wa.me/447831643012",
    linkText: "+44 7831 643012",
    responseTime: "Within 4 hours",
  },
  {
    icon: Phone,
    title: "Callback Request",
    description: "Request a call back from our team",
    email: "support@whoza.ai",
    linkText: "Request callback",
    responseTime: "Same day",
  },
]

const supportTopics = [
  {
    icon: HelpCircle,
    title: "Getting Started",
    description: "Setup guides, onboarding, and first steps with whoza.ai",
  },
  {
    icon: Zap,
    title: "Technical Issues",
    description: "Call routing, AI agent behaviour, integration problems",
  },
  {
    icon: Ticket,
    title: "Billing \u0026 Subscriptions",
    description: "Payment queries, plan changes, invoice requests",
  },
  {
    icon: MessageSquare,
    title: "Account Management",
    description: "Profile updates, team access, cancellation requests",
  },
]

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            We're here to help
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Support Centre</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Problem solutions, general enquiries, callbacks, and ticketing — all handled via email for a clear record and fast resolution.
          </p>
        </div>

        {/* Primary Email Support Banner */}
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 mb-12 text-center">
          <Mail className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Email Support</h2>
          <p className="text-white/60 mb-4">
            Our primary support channel. Send us any enquiry and we'll respond with a solution or next steps.
          </p>
          <a
            href="mailto:support@whoza.ai"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            <Mail className="w-5 h-5" />
            support@whoza.ai
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-white/40 text-sm mt-3 flex items-center justify-center gap-1">
            <Clock className="w-3 h-3" />
            Typical response: within 24 hours
          </p>
        </div>

        {/* Support Channels */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {supportChannels.map((channel) => (
            <div
              key={channel.title}
              className={`rounded-2xl p-6 border ${
                channel.primary
                  ? "bg-emerald-500/5 border-emerald-500/20"
                  : "bg-white/5 border-white/10"
              }`}
            >
              <channel.icon className={`w-8 h-8 mb-4 ${channel.primary ? "text-emerald-400" : "text-white/60"}`} />
              <h3 className="text-lg font-semibold mb-2">{channel.title}</h3>
              <p className="text-white/60 text-sm mb-4">{channel.description}</p>
              {channel.email ? (
                <a
                  href={`mailto:${channel.email}`}
                  className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
                >
                  {channel.email}
                </a>
              ) : (
                <a
                  href={channel.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
                >
                  {channel.linkText}
                </a>
              )}
              <p className="text-white/40 text-xs mt-3 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {channel.responseTime}
              </p>
            </div>
          ))}
        </div>

        {/* Support Topics */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">What We Can Help With</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {supportTopics.map((topic) => (
              <div
                key={topic.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
              >
                <topic.icon className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{topic.title}</h3>
                <p className="text-white/60 text-sm">{topic.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Email Template Suggestion */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-4">How to Reach Us</h2>
          <p className="text-white/60 mb-6">
            For the fastest resolution, include these details in your email:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 mt-0.5">1.</span>
                <span className="text-white/70 text-sm">Your business name and account email</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 mt-0.5">2.</span>
                <span className="text-white/70 text-sm">A clear description of the issue or enquiry</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 mt-0.5">3.</span>
                <span className="text-white/70 text-sm">Any error messages or screenshots</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 mt-0.5">4.</span>
                <span className="text-white/70 text-sm">When the issue started (date and time)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 mt-0.5">5.</span>
                <span className="text-white/70 text-sm">Steps you've already tried</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 mt-0.5">6.</span>
                <span className="text-white/70 text-sm">Callback number (if you want us to call you)</span>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/10">
            <a
              href="mailto:support@whoza.ai"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              <Mail className="w-5 h-5" />
              Email support@whoza.ai
            </a>
          </div>
        </div>
      </main>

      <Footer />

      {/* ContactPoint + ContactPage Schema for Support */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "whoza.ai Support Centre",
          "description": "Get help with whoza.ai — email support, WhatsApp, and callback requests. Response within 24 hours.",
          "url": "https://whoza.ai/support",
          "mainEntity": {
            "@type": "ContactPoint",
            "contactType": "customer support",
            "email": "support@whoza.ai",
            "telephone": "+44-7831-643012",
            "areaServed": "GB",
            "availableLanguage": ["English"],
            "hoursAvailable": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "09:00",
              "closes": "17:00"
            }
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://whoza.ai/" },
              { "@type": "ListItem", "position": 2, "name": "Support", "item": "https://whoza.ai/support" }
            ]
          }
        })}}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPoint",
          "contactType": "customer support",
          "email": "support@whoza.ai",
          "telephone": "+44-7831-643012",
          "areaServed": "GB",
          "availableLanguage": ["English"],
          "hoursAvailable": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "17:00"
          },
          "url": "https://whoza.ai/support"
        })}}
      />
    </div>
  )
}
