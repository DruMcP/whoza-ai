import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { Metadata } from "next"
import { QuoteGenerator } from "@/components/tools/quote-generator"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Free Quote Generator for UK Trades | whoza.ai",
  description: "Create professional quotes for UK trade jobs in 60 seconds. Free quote generator with branded PDF output for plumbers, electricians, builders.",
  openGraph: {
    title: "Free Quote Generator for UK Trades | whoza.ai",
    description: "Create professional quotes for UK trade jobs in 60 seconds. Free quote generator with branded PDF output for plumbers, electricians, builders.",
    url: "https://whoza.ai/tools/quote-generator",
    siteName: "Whoza.ai",
    locale: "en_GB",
    type: "website",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "Quote Generator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Quote Generator for UK Trades | whoza.ai",
    description: "Create professional quotes for UK trade jobs in 60 seconds.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  alternates: {
    canonical: "https://whoza.ai/tools/quote-generator",
  },
}

export const revalidate = 3600

export default function QuoteGeneratorPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "Tools", item: "https://whoza.ai/tools" },
        { name: "Quote Generator", item: "https://whoza.ai/tools/quote-generator" },
      ]} />
      <div className="min-h-screen bg-[var(--navy-900)] text-white">
        <Header />
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Free Quote Generator for UK Trades</h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Create professional, branded quotes for plumbing, electrical, building, and roofing jobs in under 60 seconds.
              Enter your details, add line items, and download a clean PDF ready to email or WhatsApp to your customer.
              No sign-up required. Built for self-employed tradespeople who need to look professional without the admin overhead.
            </p>
          </div>

          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-4 text-center">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="text-3xl font-bold text-emerald-400 mb-2">1</div>
                <h3 className="font-semibold mb-2">Enter Your Business Details</h3>
                <p className="text-white/60 text-sm">Add your company name, logo, address and contact details. These appear on every quote you generate.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="text-3xl font-bold text-emerald-400 mb-2">2</div>
                <h3 className="font-semibold mb-2">Add Line Items</h3>
                <p className="text-white/60 text-sm">List materials, labour, and any extras. Set quantities and prices per item. The total calculates automatically.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="text-3xl font-bold text-emerald-400 mb-2">3</div>
                <h3 className="font-semibold mb-2">Download Your PDF</h3>
                <p className="text-white/60 text-sm">Hit download and get a branded, professional PDF quote you can email or WhatsApp to your customer in seconds.</p>
              </div>
            </div>
          </section>

          <section className="mb-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Why Tradespeople Use This Tool</h2>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-3"><span className="text-emerald-400 mt-1">✓</span> <span>Look professional on every quote — no more scribbled notes or Excel spreadsheets</span></li>
              <li className="flex items-start gap-3"><span className="text-emerald-400 mt-1">✓</span> <span>Win more jobs by sending branded quotes within minutes of a site visit</span></li>
              <li className="flex items-start gap-3"><span className="text-emerald-400 mt-1">✓</span> <span>Track your pricing history and stay consistent across all customers</span></li>
              <li className="flex items-start gap-3"><span className="text-emerald-400 mt-1">✓</span> <span>100% free — no sign-up, no credit card, no data stored</span></li>
            </ul>
          </section>

          <div className="mb-12">
            <QuoteGenerator />
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
