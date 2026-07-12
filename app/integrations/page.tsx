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
      { name: "Google Calendar", desc: "Two-way sync. AI checks availability before booking.", icon: Calendar },
      { name: "Outlook Calendar", desc: "Microsoft 365 and Exchange integration.", icon: Calendar },
      { name: "Apple Calendar", desc: "iCloud calendar sync for Mac/iPhone users.", icon: Calendar },
    ],
  },
  {
    category: "Communication",
    items: [
      { name: "WhatsApp Business", desc: "Instant job delivery + review requests via WhatsApp.", icon: MessageSquare },
      { name: "Twilio", desc: "Phone number forwarding, SMS routing, call handling.", icon: Phone },
    ],
  },
  {
    category: "Automation",
    items: [
      { name: "Zapier", desc: "Connect whoza.ai to 5,000+ apps. No code required.", icon: Zap },
      { name: "Make (Integromat)", desc: "Advanced workflow automation with visual builder.", icon: Zap },
    ],
  },
  {
    category: "Data & Payments",
    items: [
      { name: "Stripe", desc: "Secure payment processing. No card data stored.", icon: Database },
      { name: "Supabase", desc: "UK/EU-hosted database. GDPR-compliant data storage.", icon: Database },
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
                    <p className="text-white/60 text-sm">{item.desc}</p>
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
