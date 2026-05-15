import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { MessageSquare, Mail, Phone, MapPin, Clock, ExternalLink, RefreshCw } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Contact | whoza.ai",
  description: "Get in touch with the whoza.ai team. WhatsApp, email, or phone — we're here to help UK tradespeople never miss a call again.",
  alternates: {
    canonical: "https://whoza.ai/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
}

const contactMethods = [
  {
    icon: MessageSquare,
    label: "WhatsApp",
    value: "+44 7831 643012",
    href: "https://wa.me/447831643012",
    description: "Fastest response. Message us any time.",
  },
  {
    icon: Mail,
    label: "Email",
    value: "dru@whoza.ai",
    href: "mailto:dru@whoza.ai",
    description: "For detailed enquiries and partnerships.",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+44 7831 643012",
    href: "tel:+447831643012",
    description: "Call us during business hours.",
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "Contact", item: "https://whoza.ai/contact" },
      ]} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Banner */}
        <div className="mb-10 bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 flex items-start gap-4">
          <RefreshCw className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-300 font-semibold text-lg">Content Update in Progress</p>
            <p className="text-amber-200/70 mt-1">
              We're refreshing this page for our new AI voice agent platform. Check back soon or{" "}
              <Link href="/" className="underline hover:text-amber-300">explore our homepage</Link>.
            </p>
          </div>
        </div>

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <MessageSquare className="w-4 h-4" />
            Let's Talk
          </div>
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Questions about Katie? Want to see a demo? Just want to say hello? We're here — pick your channel.
          </p>
        </div>

        <div className="grid gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <Link
              key={index}
              href={method.href}
              target={method.href.startsWith("http") ? "_blank" : undefined}
              rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 flex items-start gap-5 transition-colors"
            >
              <div className="bg-emerald-500/10 rounded-lg p-3 flex-shrink-0">
                <method.icon className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-lg font-semibold">{method.label}</h2>
                  <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-emerald-400 transition-colors" />
                </div>
                <p className="text-white font-medium mb-1">{method.value}</p>
                <p className="text-white/50 text-sm">{method.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-start gap-5">
          <div className="bg-emerald-500/10 rounded-lg p-3 flex-shrink-0">
            <MapPin className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Registered Office</h2>
            <p className="text-white/60 leading-relaxed">
              WHOZA AI LTD<br />
              6 Atholl Crescent, 6<br />
              Perth, PH1 5JN<br />
              Scotland
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 text-white/40 text-sm">
          <Clock className="w-4 h-4" />
          <span>Typical response time: under 2 hours via WhatsApp</span>
        </div>
      </main>

      <Footer />
    </div>
  )
}
