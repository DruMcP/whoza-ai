import type { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { ArrowRight, Calendar, MessageSquare, Zap, Phone, Database, Check } from "lucide-react"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Integrations — Connect whoza.ai to Your Tools | UK Trades",
  description: "whoza.ai integrates with Google Calendar, Outlook, Apple Calendar, WhatsApp, Zapier, Make, Stripe, Twilio, Supabase, and more. Built for UK tradespeople.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/integrations",
    siteName: "Whoza.ai",
    title: "Integrations — Connect whoza.ai to Your Tools | UK Trades",
    description: "whoza.ai integrates with Google Calendar, Outlook, Apple Calendar, WhatsApp, Zapier, Make, Stripe, Twilio, Supabase, and more. Built for UK tradespeople.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "Whoza.ai Integrations" }],
  },
  alternates: {
    canonical: "https://whoza.ai/integrations",
  },
}

export const revalidate = 3600

const integrations = [
  {
    category: "Calendar",
    items: [
      {
        name: "Google Calendar",
        desc: "Two-way sync. AI checks availability before booking.",
        detail: "Katie reads your Google Calendar in real time before offering slots to callers. When a customer confirms, the booking drops straight into your calendar with all job details pre-filled. No double-bookings, no back-and-forth. Supports multiple calendars and shared family or team calendars.",
        icon: Calendar,
      },
      {
        name: "Outlook Calendar",
        desc: "Microsoft 365 and Exchange integration.",
        detail: "Full integration with Microsoft 365 and Exchange Online. Katie checks your Outlook availability, respects your working hours, and writes confirmed bookings directly to your calendar. Ideal for tradespeople running their business on Microsoft tools.",
        icon: Calendar,
      },
      {
        name: "Apple Calendar",
        desc: "iCloud calendar sync for Mac/iPhone users.",
        detail: "Seamless iCloud calendar sync. Katie checks your Apple Calendar free slots, creates events with caller details, and sends you a WhatsApp summary. Perfect if you run your diary from an iPhone or Mac and want everything in one place.",
        icon: Calendar,
      },
    ],
  },
  {
    category: "Communication",
    items: [
      {
        name: "WhatsApp Business",
        desc: "Instant job delivery + review requests via WhatsApp.",
        detail: "Every captured call becomes a structured WhatsApp message within 3 seconds. You tap Accept, Call Back, or Decline. Katie then sends an instant SMS confirmation to the customer. After job completion, automated review requests go out via WhatsApp to build your Google rating.",
        icon: MessageSquare,
      },
      {
        name: "Twilio",
        desc: "Phone number forwarding, SMS routing, call handling.",
        detail: "Enterprise-grade telephony backbone. Call forwarding from your existing BT, Virgin, or mobile number. SMS confirmations to customers. Fallback routing if you need live transfer. UK and international number support.",
        icon: Phone,
      },
    ],
  },
  {
    category: "Automation",
    items: [
      {
        name: "Zapier",
        desc: "Connect whoza.ai to 5,000+ apps. No code required.",
        detail: "Growth plan and above. Build no-code workflows that trigger when Katie captures a job: auto-create invoices in Xero, add leads to Mailchimp, post to Slack channels, update CRMs, or trigger any of 5,000+ Zapier apps. Set up in minutes without a developer.",
        icon: Zap,
      },
      {
        name: "Make (Integromat)",
        desc: "Advanced workflow automation with visual builder.",
        detail: "For power users who need complex multi-step automation. Visual workflow builder with conditional logic, data transformation, and custom API calls. Connect whoza.ai to bespoke internal systems, databases, or advanced CRM pipelines.",
        icon: Zap,
      },
    ],
  },
  {
    category: "Data & Payments",
    items: [
      {
        name: "Stripe",
        desc: "Secure payment processing. No card data stored.",
        detail: "PCI-compliant payment processing for plan subscriptions and optional job deposits. Stripe handles all card data — whoza.ai never stores card numbers. Automatic invoicing, VAT handling, and secure subscription management.",
        icon: Database,
      },
      {
        name: "Supabase",
        desc: "UK/EU-hosted database. GDPR-compliant data storage.",
        detail: "All call data, transcripts, and customer records stored in Supabase with UK/EU hosting. Full GDPR compliance, row-level security, encrypted at rest. Your data never leaves European jurisdiction. Export or delete on request.",
        icon: Database,
      },
    ],
  },
]

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "Integrations", item: "https://whoza.ai/integrations" },
      ]} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-[var(--katie-blue)]/10 text-[var(--katie-blue)] px-4 py-2 rounded-full text-sm font-medium mb-6">
            Integrations
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Connect whoza.ai to the Tools You Already Use
          </h1>
          <p className="text-white/60 max-w-2xl text-lg">
            No rebuilding your workflow. whoza.ai slots into your existing stack — calendars, WhatsApp, CRMs, and automation tools.
          </p>
        </div>

        {integrations.map((group) => (
          <section key={group.category} className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">{group.category}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.items.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.name} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/[0.07] transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[var(--katie-blue)]/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[var(--katie-blue)]" />
                      </div>
                      <h3 className="font-semibold">{item.name}</h3>
                    </div>
                    <p className="text-white/60 text-sm mb-3">{item.desc}</p>
                    <p className="text-white/40 text-sm leading-relaxed">{item.detail}</p>
                  </div>
                )
              })}
            </div>
          </section>
        ))}

        <section className="bg-white/5 border border-white/10 rounded-xl p-8 mt-16">
          <h2 className="text-2xl font-semibold mb-4">Need a Custom Integration?</h2>
          <p className="text-white/60 mb-6">
            We are adding new integrations every month. If you need a specific connection — Jobber, ServiceTitan, Xero, or something else — let us know and we will prioritise it.
          </p>
          <a
            href="mailto:dru@whoza.ai"
            className="inline-flex items-center gap-2 bg-[var(--katie-blue)] text-white px-6 py-3 rounded-lg font-medium hover:bg-[var(--katie-blue)]/90 transition-colors"
          >
            Request Integration <ArrowRight className="w-4 h-4" />
          </a>
        </section>
      </main>

      <Footer />
    </div>
  )
}
