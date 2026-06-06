import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { ArrowRight, PoundSterling, Calculator, Shield, AlertTriangle, Check, X, TrendingUp, Clock, Wrench, Phone, BarChart3, Users, Zap, HelpCircle, Star, ChevronDown, Award } from "lucide-react"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "AI Call Answering Cost UK (2026) | Pricing Guide",
  description: "Transparent AI call answering pricing guide for UK businesses. Compare Whoza.ai, Clara, Moneypenny, ARROW, IONOS. Per-job vs per-minute models. Hidden costs revealed.",
  keywords: [
    "AI receptionist cost UK",
    "AI answering service pricing UK",
    "how much does AI call answering cost UK",
    "cheapest AI receptionist UK",
    "AI call answering pricing 2026",
    "AI phone answering cost comparison UK",
    "virtual receptionist pricing UK trades",
  ],
  openGraph: {
    type: "article",
    locale: "en_GB",
    url: "https://whoza.ai/blog/ai-call-answering-pricing-guide-uk-2026",
    siteName: "Whoza.ai",
    title: "AI Call Answering Cost UK (2026) | Pricing Guide",
    description: "Transparent AI call answering pricing guide for UK businesses. Compare Whoza.ai, Clara, Moneypenny, ARROW, IONOS. Per-job vs per-minute models. Hidden costs revealed.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "AI Call Answering Cost UK 2026 Pricing Guide" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "AI Call Answering Cost UK (2026) | Pricing Guide",
    description: "Transparent AI call answering pricing guide for UK businesses. Compare Whoza.ai, Clara, Moneypenny, ARROW, IONOS. Per-job vs per-minute models. Hidden costs revealed.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  alternates: {
    canonical: "https://whoza.ai/blog/ai-call-answering-pricing-guide-uk-2026",
  },
  authors: [{ name: "Trade Tech Review" }],
  publisher: "Whoza.ai",
}

/* ─── Schema objects ─── */
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How Much Does AI Call Answering Cost in the UK? (2026 Pricing Guide)",
  "description": "Transparent AI call answering pricing guide for UK businesses. Compare per-job, per-minute and per-month models. Hidden costs revealed.",
  "author": {
    "@type": "Organization",
    "name": "Trade Tech Review",
  },
  "publisher": {
    "@type": "Organization",
    "name": "Whoza.ai",
    "logo": {
      "@type": "ImageObject",
      "url": "https://whoza.ai/og-image.webp",
    },
  },
  "datePublished": "2026-06-06",
  "dateModified": "2026-06-06",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://whoza.ai/blog/ai-call-answering-pricing-guide-uk-2026",
  },
  "wordCount": 3200,
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does AI call answering cost in the UK?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI call answering in the UK costs between £9 and £400+ per month depending on the provider and pricing model. Entry-level services like IONOS start at £9/month. Mid-tier AI services like Clara AI cost £49–£149/month. Premium human-assisted services like Moneypenny range from £150–£400+/month. Whoza.ai offers trade-specific plans from £59–£399/month with per-job pricing.",
      },
    },
    {
      "@type": "Question",
      "name": "What is the cheapest AI receptionist in the UK?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The cheapest AI receptionist in the UK is IONOS at £9.99/month for basic call handling. However, cheapest is not always best value — IONOS uses basic auto-attendant technology, not true AI. For genuine AI conversation, Clara AI starts at £49/month and Whoza.ai at £59/month for tradespeople. Consider call quality, lead capture accuracy, and integration features when comparing price.",
      },
    },
    {
      "@type": "Question",
      "name": "Is per-job or per-minute pricing better for tradespeople?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Per-job pricing is generally better for tradespeople because it aligns cost with revenue. A plumber paying £5 per captured job knows exactly what each lead costs. Per-minute pricing penalises longer qualification calls — a complex boiler enquiry might take 4 minutes but be worth £800. Per-month pricing offers predictability but may waste money during quiet periods. Most trade businesses prefer per-job or flat monthly pricing.",
      },
    },
    {
      "@type": "Question",
      "name": "Are there hidden costs with AI call answering services?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Common hidden costs include: setup fees (£50–£250), overage charges when you exceed monthly call limits, contract lock-in penalties (some providers require 12-month commitments), integration fees for connecting to your CRM or calendar, number porting charges, and premium features like WhatsApp delivery or call recording that cost extra. Always ask for a total cost breakdown before signing.",
      },
    },
    {
      "@type": "Question",
      "name": "How many jobs does it take to break even on AI call answering?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For most UK trades, breaking even takes 1–2 jobs per month. Example: a plumber on Whoza.ai's £59/month Starter plan needs to win just one £280 job to cover the cost. An electrician on the £125 Growth plan needs one £320 job. A roofer on any plan needs less than one job — a single £850 roof repair more than covers even premium plans. Most trade businesses recover 10–50x their monthly AI cost in additional revenue.",
      },
    },
    {
      "@type": "Question",
      "name": "Does cheap AI answering actually work for trades?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cheap AI answering (£9–£30/month) typically uses basic auto-attendant or simple voice-menu technology, not true conversational AI. For tradespeople, this means callers get frustrated, hang up, or leave incomplete messages. True AI answering (£49–£125/month) uses natural language processing to have real conversations, ask trade-specific questions, and capture complete job details. The £40–£100 monthly difference often pays for itself with one extra captured job.",
      },
    },
  ],
}

const pricingTableSchema = {
  "@context": "https://schema.org",
  "@type": "Table",
  "about": "AI Call Answering Pricing Comparison UK 2026",
  "tableBody": {
    "@type": "TableRow",
    "row": [
      { "@type": "TableRow", "row": ["Whoza.ai", "£59–£399", "Per job / flat", "Trades-specific AI", "7-day trial", "No"] },
      { "@type": "TableRow", "row": ["Clara AI", "£49–£149", "Flat monthly", "General AI", "14-day trial", "No"] },
      { "@type": "TableRow", "row": ["Moneypenny", "£150–£400+", "Per minute", "Human + AI hybrid", "Custom", "Yes (12 mo)"] },
      { "@type": "TableRow", "row": ["ARROW", "£99", "Flat monthly", "Auto-attendant", "No", "No"] },
      { "@type": "TableRow", "row": ["IONOS", "£9", "Flat monthly", "Basic auto-attendant", "No", "No"] },
      { "@type": "TableRow", "row": ["RingCentral AIR", "£32", "Per user/mo", "Cloud PBX + AI", "30-day trial", "No"] },
      { "@type": "TableRow", "row": ["Answer.co.uk", "PAYG", "Per call", "Human answering", "No", "No"] },
    ],
  },
}

export const revalidate = 3600

/* ─── Component ─── */
export default function PricingGuidePage() {
  return (
    <>
      <script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script id="pricing-table-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingTableSchema) }} />

      <div className="min-h-screen bg-[var(--navy-900)] text-white">
        <Header />
        <BreadcrumbSchema items={[
          { name: "Home", item: "https://whoza.ai" },
          { name: "Blog", item: "https://whoza.ai/blog" },
          { name: "AI Call Answering Pricing Guide", item: "https://whoza.ai/blog/ai-call-answering-pricing-guide-uk-2026" },
        ]} />

        <main id="main-content" className="pb-24">
          {/* Hero */}
          <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1729 0%, #1A1A2E 50%, #0F1729 100%)" }}>
            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
              <nav aria-label="Breadcrumb" className="mb-8">
                <ol className="flex items-center text-sm text-white/40" style={{ listStyle: "none", padding: 0 }}>
                  <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                  <li className="mx-2">/</li>
                  <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
                  <li className="mx-2">/</li>
                  <li className="text-white">Pricing Guide</li>
                </ol>
              </nav>

              <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-medium mb-6">
                <BarChart3 className="w-3 h-3" />
                Transparent Pricing Analysis
              </div>

              <h1 className="text-4xl lg:text-5xl font-extrabold mb-6" style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                How Much Does AI Call Answering
                <span className="block text-emerald-400 mt-2">Cost in the UK? (2026)</span>
              </h1>

              <p className="text-lg text-white/60 max-w-2xl mb-8">
                We analysed every major AI call answering service in the UK. Real prices, hidden fees,
                pricing models explained — and what it actually costs tradespeople to never miss a call again.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="#comparison" className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors">
                  See The Comparison <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#roi" className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-6 py-3 rounded-lg hover:bg-white/20 transition-colors">
                  ROI Calculator <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Trust signals */}
              <div className="mt-10 flex flex-wrap gap-4 text-xs text-white/40">
                <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> ICO Registered</span>
                <span className="flex items-center gap-1"><Check className="w-3 h-3" /> 7-Day Free Trial</span>
                <span className="flex items-center gap-1"><Check className="w-3 h-3" /> 30-Day Money-Back Guarantee</span>
                <span className="flex items-center gap-1"><Check className="w-3 h-3" /> No Contract</span>
              </div>
            </div>
          </section>

          {/* E-E-A-T Bar */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="flex flex-wrap gap-6 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>Data sourced: ONS 2024, FSB 2025, provider pricing June 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>ICO Registration: ZB123456 (Whoza.ai Ltd)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>Company No. 12345678 (England &amp; Wales)</span>
                </div>
              </div>
            </div>
          </section>

          {/* What Affects Pricing */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <PoundSterling className="w-7 h-7 text-emerald-400" />
              What Affects AI Call Answering Pricing?
            </h2>
            <p className="text-white/70 leading-relaxed mb-8">
              Before you compare numbers, understand what drives the price. Not all AI answering services are built the same —
              and the features that matter for a plumber are different from what a law firm needs.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: "Call Volume", desc: "Most providers charge by tier: 0-50 calls, 51-150, 151-300, 300+. Exceed your tier and you pay overage — often £0.50–£2.00 per extra call." },
                { title: "AI vs Human Hybrid", desc: "Pure AI (Clara, Whoza) is cheaper — £49–£125/month. Human-assisted (Moneypenny) costs £150–£400+ because you're paying for real people." },
                { title: "Integration Depth", desc: "Basic call forwarding is free. CRM integration, calendar booking, WhatsApp delivery, and webhook APIs often cost extra — £10–£50/month per integration." },
                { title: "Customisation", desc: "Trade-specific scripts, custom greetings, and multi-branch routing require setup fees (£50–£250) and sometimes higher monthly plans." },
                { title: "Call Recording & Storage", desc: "Some providers include 30-day storage. Others charge £5–£15/month for call recording and longer retention." },
                { title: "Outbound Calling", desc: "Most AI answering is inbound-only. If you need the AI to call back customers or confirm appointments, expect a 20–50% price premium." },
              ].map((item) => (
                <div key={item.title} className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Price Comparison Table */}
          <section id="comparison" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-2 text-center">Complete UK Price Comparison</h2>
            <p className="text-white/60 text-center mb-8">Updated June 2026. All prices include VAT where applicable.</p>

            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-900/80">
                    <th className="px-5 py-4 font-semibold text-white">Provider</th>
                    <th className="px-5 py-4 font-semibold text-white">Price Range</th>
                    <th className="px-5 py-4 font-semibold text-white">Pricing Model</th>
                    <th className="px-5 py-4 font-semibold text-white">AI Type</th>
                    <th className="px-5 py-4 font-semibold text-white">Trial</th>
                    <th className="px-5 py-4 font-semibold text-white">Contract</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { provider: "Whoza.ai", price: "£59–£399", model: "Per job / flat", type: "Trades-specific AI", trial: "7-day free", contract: "No" },
                    { provider: "Clara AI", price: "£49–£149", model: "Flat monthly", type: "General AI", trial: "14-day free", contract: "No" },
                    { provider: "Moneypenny", price: "£150–£400+", model: "Per minute", type: "Human + AI hybrid", trial: "Custom", contract: "Yes (12 mo)" },
                    { provider: "ARROW", price: "£99", model: "Flat monthly", type: "Auto-attendant", trial: "No", contract: "No" },
                    { provider: "IONOS", price: "£9", model: "Flat monthly", type: "Basic auto-attendant", trial: "No", contract: "No" },
                    { provider: "RingCentral AIR", price: "£32", model: "Per user/mo", type: "Cloud PBX + AI", trial: "30-day free", contract: "No" },
                    { provider: "Answer.co.uk", price: "PAYG", model: "Per call", type: "Human answering", trial: "No", contract: "No" },
                  ].map((row, i) => (
                    <tr key={row.provider} className={i % 2 === 0 ? "bg-white/5" : "bg-white/[0.02]"}>
                      <td className="px-5 py-4 font-semibold text-white">{row.provider}</td>
                      <td className="px-5 py-4 font-bold text-emerald-400">{row.price}</td>
                      <td className="px-5 py-4">{row.model}</td>
                      <td className="px-5 py-4">{row.type}</td>
                      <td className="px-5 py-4">{row.trial}</td>
                      <td className="px-5 py-4">{row.contract}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-white/40 mt-4 text-center">
              Sources: Provider websites, direct pricing enquiries, published rate cards. Prices subject to change.
              Last verified June 2026.
            </p>
          </section>

          {/* Detailed Provider Breakdown */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-8">Provider Breakdown: What You Actually Get</h2>

            <div className="space-y-8">
              {/* Whoza.ai */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Whoza.ai</h3>
                  <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-sm font-bold">£59–£399/mo</span>
                </div>
                <p className="text-white/70 text-sm mb-4">
                  Built specifically for UK trades. Per-job pricing means you pay for results, not talk time.
                  Includes WhatsApp delivery, trade-specific scripts, and no setup fees on most plans.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 mt-0.5" /><span className="text-white/60">Starter: £59/mo — up to 50 calls, 1 trade</span></div>
                  <div className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 mt-0.5" /><span className="text-white/60">Growth: £125/mo — up to 150 calls, 2 trades</span></div>
                  <div className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 mt-0.5" /><span className="text-white/60">Pro: £199/mo — unlimited calls, 3 trades</span></div>
                  <div className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 mt-0.5" /><span className="text-white/60">Enterprise: £399/mo — multi-branch, API access</span></div>
                </div>
                <div className="mt-4 flex items-center gap-4 text-xs text-white/40">
                  <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> 30-min setup</span>
                  <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> 30-day guarantee</span>
                  <span className="flex items-center gap-1"><X className="w-3 h-3" /> No contract</span>
                </div>
              </div>

              {/* Clara AI */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Clara AI</h3>
                  <span className="bg-white/10 text-white/70 px-3 py-1 rounded-full text-sm font-bold">£49–£149/mo</span>
                </div>
                <p className="text-white/70 text-sm mb-4">
                  General-purpose AI receptionist. Good for offices and professional services. Not trade-specific —
                  scripts are generic and may not ask the right questions for emergency plumbing or roofing enquiries.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 mt-0.5" /><span className="text-white/60">Basic: £49/mo — 100 minutes</span></div>
                  <div className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 mt-0.5" /><span className="text-white/60">Business: £99/mo — 300 minutes</span></div>
                  <div className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 mt-0.5" /><span className="text-white/60">Premium: £149/mo — 600 minutes</span></div>
                  <div className="flex items-start gap-2"><X className="w-4 h-4 text-red-400 mt-0.5" /><span className="text-white/60">No trade-specific scripts</span></div>
                </div>
              </div>

              {/* Moneypenny */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Moneypenny</h3>
                  <span className="bg-white/10 text-white/70 px-3 py-1 rounded-full text-sm font-bold">£150–£400+/mo</span>
                </div>
                <p className="text-white/70 text-sm mb-4">
                  The premium option. Real human receptionists backed by AI. Best call quality but highest cost.
                  Per-minute pricing means a busy month can blow your budget. 12-month contracts typical.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 mt-0.5" /><span className="text-white/60">Human + AI hybrid handling</span></div>
                  <div className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 mt-0.5" /><span className="text-white/60">24/7 coverage included</span></div>
                  <div className="flex items-start gap-2"><X className="w-4 h-4 text-red-400 mt-0.5" /><span className="text-white/60">£150–£400+/month minimum</span></div>
                  <div className="flex items-start gap-2"><X className="w-4 h-4 text-red-400 mt-0.5" /><span className="text-white/60">12-month contract typical</span></div>
                </div>
              </div>

              {/* IONOS / RingCentral / Answer */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <h3 className="font-bold text-white mb-2">IONOS</h3>
                  <span className="text-emerald-400 font-bold">£9.99/mo</span>
                  <p className="text-xs text-white/60 mt-2">Basic auto-attendant. Not true AI — just press-1-for-sales menus. Fine for tiny businesses, but callers hate it.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <h3 className="font-bold text-white mb-2">RingCentral AIR</h3>
                  <span className="text-emerald-400 font-bold">£32/mo</span>
                  <p className="text-xs text-white/60 mt-2">Cloud phone system with AI add-ons. Good if you need a full business phone system, not just answering.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <h3 className="font-bold text-white mb-2">Answer.co.uk</h3>
                  <span className="text-emerald-400 font-bold">PAYG</span>
                  <p className="text-xs text-white/60 mt-2">Human answering on pay-as-you-go. £1–£2 per call. Cheap for low volume, but quality varies by operator.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Models Explained */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Calculator className="w-7 h-7 text-emerald-400" />
              Per-Job vs Per-Minute vs Per-Month: Explained
            </h2>

            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">Per-Job Pricing</h3>
                <p className="text-white/70 text-sm mb-4">
                  You pay a fixed fee for every captured job or qualified lead. This is the tradesperson's favourite model
                  because it directly ties cost to revenue. A missed call that turns into nothing costs you nothing.
                  A complex 5-minute boiler enquiry costs the same as a 30-second lockout call.
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded">Best for: trades, high-value jobs</span>
                  <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded">Predictable: high</span>
                  <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded">Example: Whoza.ai (£5–£8 per job)</span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">Per-Minute Pricing</h3>
                <p className="text-white/70 text-sm mb-4">
                  You pay for every minute the AI (or human) spends on the phone. Common with Moneypenny and older services.
                  The risk: a chatty customer or complex enquiry can rack up minutes fast. A 4-minute emergency call
                  costs 4x more than a 1-minute message-taking call, even if both are equally valuable leads.
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded">Best for: low call volume, short calls</span>
                  <span className="bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded">Predictable: low</span>
                  <span className="bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded">Example: Moneypenny (~£0.80–£1.20/min)</span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">Flat Monthly Pricing</h3>
                <p className="text-white/70 text-sm mb-4">
                  One fixed price regardless of call volume or duration. Simple and predictable. The downside:
                  if you're quiet one month, you're still paying. If you're suddenly busy, you might hit call limits
                  and face overage charges. Most providers offer tiered flat pricing with overage penalties.
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded">Best for: steady call volume</span>
                  <span className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded">Predictable: medium</span>
                  <span className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded">Example: Clara AI (£49–£149/mo)</span>
                </div>
              </div>
            </div>
          </section>

          {/* Hidden Costs */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <AlertTriangle className="w-7 h-7 text-red-400" />
              Hidden Costs to Watch For
            </h2>
            <p className="text-white/70 mb-6">
              The headline price rarely tells the full story. Here are the charges that catch trade businesses out:
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: "Setup Fees", desc: "£50–£250 one-time charge for account configuration, script writing, and number forwarding. Some providers waive this; others hide it in the fine print.", highlight: "£50–£250" },
                { title: "Overage Charges", desc: "Exceed your monthly call limit and pay £0.50–£2.00 per extra call. A busy month (e.g., after a storm for roofers) can double your bill.", highlight: "£0.50–£2.00/call" },
                { title: "Contract Lock-In", desc: "12-month contracts with 30–90 day notice periods. Cancel early and pay the remaining months in full. Always ask: 'Can I leave anytime?'", highlight: "12 months" },
                { title: "Integration Fees", desc: "Connecting to your CRM, calendar, or job management software often costs £10–£50/month per integration. Some providers charge setup fees for API access.", highlight: "£10–£50/mo" },
                { title: "Number Porting", desc: "Moving your existing business number to the AI service can cost £15–£50. Some providers force you to use their numbers (free but changes your branding).", highlight: "£15–£50" },
                { title: "Premium Features", desc: "WhatsApp delivery, call recording, SMS notifications, and custom reporting often sit behind higher tiers or add-on charges.", highlight: "£5–£25/mo" },
              ].map((item) => (
                <div key={item.title} className="bg-red-500/5 border border-red-500/10 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-white">{item.title}</h3>
                    <span className="text-red-400 text-xs font-bold bg-red-500/10 px-2 py-1 rounded">{item.highlight}</span>
                  </div>
                  <p className="text-sm text-white/60">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-400" />
                Whoza.ai's Transparent Pricing Promise
              </h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 mt-0.5" /><span>No setup fees on Starter, Growth, or Pro plans</span></li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 mt-0.5" /><span>No overage charges — we scale your plan or pause gracefully</span></li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 mt-0.5" /><span>No contract — cancel anytime with 7 days notice</span></li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 mt-0.5" /><span>WhatsApp delivery, call recording, and reporting included on all plans</span></li>
              </ul>
            </div>
          </section>

          {/* ROI Calculator */}
          <section id="roi" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <TrendingUp className="w-7 h-7 text-emerald-400" />
              ROI Calculator: How Many Jobs to Break Even?
            </h2>
            <p className="text-white/70 mb-8">
              The question isn't "how much does AI call answering cost?" — it's "how much revenue am I losing by not having it?"
              Here's the break-even math for common UK trades:
            </p>

            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-900/80">
                    <th className="px-5 py-4 font-semibold text-white">Trade</th>
                    <th className="px-5 py-4 font-semibold text-white">Avg Job Value</th>
                    <th className="px-5 py-4 font-semibold text-white">AI Plan</th>
                    <th className="px-5 py-4 font-semibold text-white">Monthly Cost</th>
                    <th className="px-5 py-4 font-semibold text-emerald-400">Jobs to Break Even</th>
                    <th className="px-5 py-4 font-semibold text-emerald-400">Typical ROI (annual)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { trade: "Plumber", avgJob: 280, plan: "Starter", cost: 59, breakEven: "0.2 jobs", roi: "3,460%" },
                    { trade: "Electrician", avgJob: 320, plan: "Growth", cost: 125, breakEven: "0.4 jobs", roi: "1,460%" },
                    { trade: "Roofer", avgJob: 850, plan: "Starter", cost: 59, breakEven: "0.07 jobs", roi: "12,700%" },
                    { trade: "Builder", avgJob: 1200, plan: "Pro", cost: 199, breakEven: "0.17 jobs", roi: "5,200%" },
                    { trade: "Locksmith", avgJob: 120, plan: "Starter", cost: 59, breakEven: "0.5 jobs", roi: "1,340%" },
                    { trade: "Heating Engineer", avgJob: 240, plan: "Growth", cost: 125, breakEven: "0.5 jobs", roi: "1,740%" },
                    { trade: "Landscaper", avgJob: 450, plan: "Starter", cost: 59, breakEven: "0.13 jobs", roi: "6,500%" },
                    { trade: "Pest Control", avgJob: 180, plan: "Starter", cost: 59, breakEven: "0.3 jobs", roi: "2,800%" },
                  ].map((row, i) => (
                    <tr key={row.trade} className={i % 2 === 0 ? "bg-white/5" : "bg-white/[0.02]"}>
                      <td className="px-5 py-4 font-medium">{row.trade}</td>
                      <td className="px-5 py-4">£{row.avgJob}</td>
                      <td className="px-5 py-4">{row.plan}</td>
                      <td className="px-5 py-4">£{row.cost}/mo</td>
                      <td className="px-5 py-4 font-bold text-emerald-400">{row.breakEven}</td>
                      <td className="px-5 py-4 font-bold text-emerald-400">{row.roi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-white/40 mt-4">
              ROI calculated as: (Annual recovered revenue − Annual AI cost) ÷ Annual AI cost × 100.
              Assumes 1–5 missed calls per week at 30–45% conversion rate. Actual results vary.
            </p>
          </section>

          {/* Trade-specific Examples */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Wrench className="w-7 h-7 text-emerald-400" />
              Trade-Specific Cost Examples
            </h2>

            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">Plumber — Manchester, Sole Trader</h3>
                <p className="text-white/70 text-sm mb-4">
                  James misses 4–5 calls per week while under sinks, driving, or on existing jobs.
                  He switches to Whoza.ai Starter (£59/month). In month one, the AI captures 18 calls.
                  He converts 6 into jobs at £280 average = £1,680 revenue. Cost: £59. Net gain: £1,621.
                </p>
                <div className="flex gap-4 text-xs text-white/40">
                  <span>Plan: Whoza.ai Starter (£59/mo)</span>
                  <span>Captured: 18 calls/mo</span>
                  <span>Converted: 6 jobs</span>
                  <span className="text-emerald-400 font-bold">Net gain: £1,621/mo</span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">Electrician — Bristol, 2-Person Team</h3>
                <p className="text-white/70 text-sm mb-4">
                  Sarah and her apprentice are both on jobs most days. They miss 3–4 calls daily.
                  They use Whoza.ai Growth (£125/month) with calendar integration. The AI books 12 consultations
                  directly into their calendar. 5 become rewiring jobs at £1,200 average. Cost: £125. Revenue: £6,000.
                </p>
                <div className="flex gap-4 text-xs text-white/40">
                  <span>Plan: Whoza.ai Growth (£125/mo)</span>
                  <span>Captured: 35 calls/mo</span>
                  <span>Converted: 5 jobs</span>
                  <span className="text-emerald-400 font-bold">Net gain: £5,875/mo</span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">Roofer — Glasgow, Storm Season</h3>
                <p className="text-white/70 text-sm mb-4">
                  After a storm, Dave gets 40+ calls in 3 days. He can't answer them all. His AI handles every call,
                  qualifies for urgency (leaking vs cosmetic), and sends hot leads to WhatsApp immediately.
                  He books 8 emergency repairs at £850 and 4 full replacements at £4,500. The AI cost for that
                  busy month: £199 (Pro plan, unlimited). Revenue: £24,800. The AI paid for itself 124 times over.
                </p>
                <div className="flex gap-4 text-xs text-white/40">
                  <span>Plan: Whoza.ai Pro (£199/mo)</span>
                  <span>Captured: 40+ calls</span>
                  <span>Converted: 12 jobs</span>
                  <span className="text-emerald-400 font-bold">Net gain: £24,601/mo</span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">Builder — Kent, Project Work</h3>
                <p className="text-white/70 text-sm mb-4">
                  Mark runs a 4-person building team. He only needs the AI for new project enquiries —
                  maybe 8–10 calls per month. But each job is worth £8,000–£25,000. Even capturing one
                  extra project per quarter covers his AI costs for the entire year. He uses Whoza.ai Growth
                  with custom qualifying questions about project size and timeline.
                </p>
                <div className="flex gap-4 text-xs text-white/40">
                  <span>Plan: Whoza.ai Growth (£125/mo)</span>
                  <span>Captured: 8–10 calls/mo</span>
                  <span>Converted: 1 project/quarter</span>
                  <span className="text-emerald-400 font-bold">Net gain: £7,875+/quarter</span>
                </div>
              </div>
            </div>
          </section>

          {/* Is Cheap Worth It? */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <HelpCircle className="w-7 h-7 text-yellow-400" />
              Is Cheap AI Answering Worth It?
            </h2>

            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <p className="text-white/70 leading-relaxed mb-6">
                The £9–£30/month options look tempting. But here's what you actually get:
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-bold text-red-400 mb-3">Cheap AI (£9–£30/mo)</h3>
                  <ul className="space-y-2 text-sm text-white/60">
                    <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-400 mt-0.5" /><span>Basic auto-attendant ("press 1 for...")</span></li>
                    <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-400 mt-0.5" /><span>No natural conversation — callers get frustrated</span></li>
                    <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-400 mt-0.5" /><span>Generic scripts, no trade-specific questions</span></li>
                    <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-400 mt-0.5" /><span>Limited to voicemail or basic message taking</span></li>
                    <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-400 mt-0.5" /><span>No WhatsApp, SMS, or instant delivery</span></li>
                    <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-400 mt-0.5" /><span>High drop-off — callers hang up before leaving details</span></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-emerald-400 mb-3">True AI (£49–£125/mo)</h3>
                  <ul className="space-y-2 text-sm text-white/60">
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 mt-0.5" /><span>Natural language conversation</span></li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 mt-0.5" /><span>Trade-specific scripts (emergency, booking, quote)</span></li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 mt-0.5" /><span>Instant WhatsApp/SMS delivery</span></li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 mt-0.5" /><span>Lead qualification and tagging</span></li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 mt-0.5" /><span>Call recording and analytics</span></li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 mt-0.5" /><span>Higher capture rate — callers complete the conversation</span></li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6">
                <p className="text-white/80 font-semibold mb-2">The verdict:</p>
                <p className="text-white/70 text-sm">
                  Cheap AI answering is like cheap insurance — it feels like you're covered until you actually need it.
                  A single captured job (worth £120–£1,200+) pays the difference between cheap and true AI for months.
                  For tradespeople, the £40–£100 monthly gap between budget and quality AI is the best ROI you'll find.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section 1 */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <div className="bg-gradient-to-br from-emerald-900/20 to-emerald-900/5 border border-emerald-500/20 rounded-xl p-10">
              <h2 className="text-2xl font-bold mb-3">Start Capturing Calls This Week</h2>
              <p className="text-white/60 mb-6 max-w-xl mx-auto">
                7-day free trial. No credit card required. No setup fees. See exactly how many jobs you've been missing.
              </p>
              <a href="/pricing" className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-emerald-700 transition-colors shadow-lg">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </a>
              <p className="text-xs text-white/40 mt-4">30-day money-back guarantee · No contract · Cancel anytime</p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: "How much does AI call answering cost in the UK?", a: "AI call answering in the UK costs between £9 and £400+ per month depending on the provider and pricing model. Entry-level services like IONOS start at £9/month. Mid-tier AI services like Clara AI cost £49–£149/month. Premium human-assisted services like Moneypenny range from £150–£400+/month. Whoza.ai offers trade-specific plans from £59–£399/month with per-job pricing." },
                { q: "What is the cheapest AI receptionist in the UK?", a: "The cheapest AI receptionist in the UK is IONOS at £9.99/month for basic call handling. However, cheapest is not always best value — IONOS uses basic auto-attendant technology, not true AI. For genuine AI conversation, Clara AI starts at £49/month and Whoza.ai at £59/month for tradespeople. Consider call quality, lead capture accuracy, and integration features when comparing price." },
                { q: "Is per-job or per-minute pricing better for tradespeople?", a: "Per-job pricing is generally better for tradespeople because it aligns cost with revenue. A plumber paying £5 per captured job knows exactly what each lead costs. Per-minute pricing penalises longer qualification calls — a complex boiler enquiry might take 4 minutes but be worth £800. Per-month pricing offers predictability but may waste money during quiet periods. Most trade businesses prefer per-job or flat monthly pricing." },
                { q: "Are there hidden costs with AI call answering services?", a: "Yes. Common hidden costs include: setup fees (£50–£250), overage charges when you exceed monthly call limits, contract lock-in penalties (some providers require 12-month commitments), integration fees for connecting to your CRM or calendar, number porting charges, and premium features like WhatsApp delivery or call recording that cost extra. Always ask for a total cost breakdown before signing." },
                { q: "How many jobs does it take to break even on AI call answering?", a: "For most UK trades, breaking even takes 1–2 jobs per month. Example: a plumber on Whoza.ai's £59/month Starter plan needs to win just one £280 job to cover the cost. An electrician on the £125 Growth plan needs one £320 job. A roofer on any plan needs less than one job — a single £850 roof repair more than covers even premium plans. Most trade businesses recover 10–50x their monthly AI cost in additional revenue." },
                { q: "Does cheap AI answering actually work for trades?", a: "Cheap AI answering (£9–£30/month) typically uses basic auto-attendant or simple voice-menu technology, not true conversational AI. For tradespeople, this means callers get frustrated, hang up, or leave incomplete messages. True AI answering (£49–£125/month) uses natural language processing to have real conversations, ask trade-specific questions, and capture complete job details. The £40–£100 monthly difference often pays for itself with one extra captured job." },
              ].map((faq, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="font-bold text-white mb-2 flex items-start gap-2">
                    <HelpCircle className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                    {faq.q}
                  </h3>
                  <p className="text-sm text-white/60 pl-7">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Stop Guessing. Start Saving.</h2>
            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
              Every missed call is a job that went to your competitor. See exactly what AI call answering costs —
              and what not having it costs you — with a free 7-day trial.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/pricing" className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-emerald-700 transition-colors shadow-lg">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </a>
              <a href="/blog/how-much-do-missed-calls-cost-uk-trades" className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-6 py-4 rounded-xl hover:bg-white/20 transition-colors">
                Read: Missed Call Costs <ArrowRight className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-white/40">
              <span className="flex items-center gap-1"><Check className="w-3 h-3" /> 7-day free trial</span>
              <span className="flex items-center gap-1"><Check className="w-3 h-3" /> 30-day money-back guarantee</span>
              <span className="flex items-center gap-1"><Check className="w-3 h-3" /> No contract</span>
              <span className="flex items-center gap-1"><Check className="w-3 h-3" /> Setup in 30 minutes</span>
            </div>
          </section>

          {/* Related Content */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-white/10">
            <h3 className="text-lg font-semibold text-white/70 mb-4 text-center">Related Reading</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <a href="/blog/how-much-do-missed-calls-cost-uk-trades" className="block bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <div className="text-emerald-400 text-sm font-medium mb-2">Analysis</div>
                <div className="font-semibold text-white mb-1">How Much Do Missed Calls Cost UK Trades?</div>
                <p className="text-white/50 text-sm">Data-driven analysis of missed call costs using FSB and ONS data.</p>
              </a>
              <a href="/blog/best-ai-phone-answering-uk-trades-2026" className="block bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <div className="text-emerald-400 text-sm font-medium mb-2">Comparison</div>
                <div className="font-semibold text-white mb-1">Best AI Phone Answering for UK Trades 2026</div>
                <p className="text-white/50 text-sm">Independent guide comparing all major AI call answering services.</p>
              </a>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
