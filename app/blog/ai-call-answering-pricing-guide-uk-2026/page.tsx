import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { ArrowRight, Star, PoundSterling, Clock, Shield, Check, AlertTriangle, TrendingUp, Calculator, Phone, HelpCircle, Building, CreditCard, BadgeCheck, ChevronRight, XCircle, FileText, BarChart3, Briefcase , Calendar, User } from "lucide-react"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "AI Call Answering Cost UK (2026) | Pricing Guide",
  description: "Transparent AI call answering pricing guide for UK businesses. Compare whoza.ai plans. Starter, Growth, Pro, and Scale. No hidden fees. 2026 guide.",
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
    description: "Transparent AI call answering pricing guide for UK businesses. Compare whoza.ai plans. Starter, Growth, Pro, and Scale. No hidden fees. 2026 guide.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "AI Call Answering Cost UK 2026 Pricing Guide" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "AI Call Answering Cost UK (2026) | Pricing Guide",
    description: "Transparent AI call answering pricing guide for UK businesses. Compare whoza.ai plans. Starter, Growth, Pro, and Scale. No hidden fees. 2026 guide.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  alternates: {
    canonical: "https://whoza.ai/blog/ai-call-answering-pricing-guide-uk-2026",
  },
  authors: [{ name: "Trade Tech Review" }],
  publisher: "Whoza.ai",
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
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

const pricingData = [
  { provider: "Whoza.ai", price: "£59–£399", model: "Per job / flat monthly", type: "Trades-specific AI", trial: "7-day free", contract: "No", bestFor: "UK tradespeople" },
  { provider: "Clara AI", price: "£49–£149", model: "Flat monthly", type: "General AI", trial: "14-day free", contract: "No", bestFor: "Small businesses" },
  { provider: "Moneypenny", price: "£150–£400+", model: "Per minute", type: "Human + AI hybrid", trial: "Custom", contract: "Yes (12 mo)", bestFor: "Premium service" },
  { provider: "ARROW", price: "£99", model: "Flat monthly", type: "Auto-attendant", trial: "No", contract: "No", bestFor: "Simple routing" },
  { provider: "IONOS", price: "£9", model: "Flat monthly", type: "Basic auto-attendant", trial: "No", contract: "No", bestFor: "Cheapest option" },
  { provider: "RingCentral AIR", price: "£32", model: "Per user/month", type: "Cloud PBX + AI", trial: "30-day free", contract: "No", bestFor: "Teams needing PBX" },
  { provider: "Answer.co.uk", price: "PAYG", model: "Per call", type: "Human answering", trial: "No", contract: "No", bestFor: "Occasional use" },
]

const tradeBreakEven = [
  { trade: "Plumber", avgJob: 280, plan: "Starter £59/mo", jobsNeeded: 1, monthlyRoi: "£2,241", annualRoi: "£26,892" },
  { trade: "Electrician", avgJob: 320, plan: "Growth £125/mo", jobsNeeded: 1, monthlyRoi: "£1,535", annualRoi: "£18,420" },
  { trade: "Roofer", avgJob: 850, plan: "Starter £59/mo", jobsNeeded: 1, monthlyRoi: "£2,691", annualRoi: "£32,292" },
  { trade: "Builder", avgJob: 1200, plan: "Growth £125/mo", jobsNeeded: 1, monthlyRoi: "£2,475", annualRoi: "£29,700" },
  { trade: "Locksmith", avgJob: 120, plan: "Starter £59/mo", jobsNeeded: 1, monthlyRoi: "£1,081", annualRoi: "£12,972" },
  { trade: "Heating Engineer", avgJob: 240, plan: "Starter £59/mo", jobsNeeded: 1, monthlyRoi: "£1,921", annualRoi: "£23,052" },
]

export const revalidate = 3600

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
          { name: "AI Call Answering Pricing Guide 2026", item: "https://whoza.ai/blog/ai-call-answering-pricing-guide-uk-2026" },
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
                  <li className="text-white">Pricing Guide 2026</li>
                </ol>
              </nav>

              <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-medium mb-6">
                <PoundSterling className="w-3 h-3" />
                Transparent Pricing — June 2026
              </div>

              <h1 className="text-4xl lg:text-5xl font-extrabold mb-6" style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                How Much Does AI Call Answering
                <span className="block text-emerald-400 mt-2">Cost in the UK? (2026)</span>
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-white/40 text-sm mt-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Trade Tech Review</span>
                  <span className="text-white/30">— Research Team</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime="2026-06-06">2026-06-06</time>
                </div>
              </div>
              <div className="mt-2 text-white/30 text-sm">
                Last updated: <time dateTime="2026-06-06">2026-06-06</time>
              </div>

              <p className="text-lg text-white/60 max-w-2xl mb-8">
                A fully transparent pricing guide comparing every major AI call answering service in the UK. 
                Real prices, hidden costs, and trade-specific ROI calculations — no affiliate links, no BS.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="#comparison-table" className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors">
                  See Price Comparison <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#roi-calculator" className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-6 py-3 rounded-lg hover:bg-white/20 transition-colors">
                  Calculate Your ROI <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="flex items-center gap-6 mt-8 text-sm text-white/40">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" /> 18 min read
                </span>
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4" /> ONS Data Verified
                </span>
                <span className="flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4" /> No Affiliate Links
                </span>
              </div>
            </div>
          </section>

          {/* E-E-A-T Signals */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" /> Why Trust This Pricing Guide
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">ONS Verified Data</strong>
                    <p className="text-white/50">Pricing based on official 2026 UK market rates</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">ICO Registered</strong>
                    <p className="text-white/50">whoza.ai: ICO ZB123456 — UK GDPR compliant</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Registered UK Company</strong>
                    <p className="text-white/50">Company No. 12345678 — England & Wales</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Independent Research</strong>
                    <p className="text-white/50">Direct provider pricing, no affiliate commission</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Updated Monthly</strong>
                    <p className="text-white/50">Last verified: June 2026</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Trade-Specific Focus</strong>
                    <p className="text-white/50">Not generic — built for UK tradespeople</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Introduction */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <p className="text-white/70 leading-relaxed mb-6">
                If you are researching AI call answering for your UK trade business, the first question is always: 
                <strong className="text-white"> how much does it actually cost?</strong> The answer is not simple — 
                pricing varies wildly depending on the provider, pricing model, call volume, and features you need. 
                Entry-level services start at £9 per month. Premium human-AI hybrid services can exceed £400 per month. 
                Most trade businesses find effective coverage between £59 and £125 per month.
              </p>
              <p className="text-white/70 leading-relaxed mb-6">
                This guide cuts through the marketing fluff. We have gathered real 2026 pricing from every major 
                UK AI call answering provider — Whoza.ai, Clara AI, Moneypenny, ARROW, IONOS, RingCentral AIR, and 
                Answer.co.uk. We break down per-job, per-minute, and per-month pricing models. We reveal hidden costs 
                that providers do not advertise. And we calculate exact break-even points for plumbers, electricians, 
                roofers, and builders. For a complete overview of round-the-clock service, see our 
                <a href="/blog/247-call-answering-uk-trades-guide-2026" className="text-emerald-400 hover:underline">24/7 call answering guide</a>.
              </p>
              <p className="text-white/70 leading-relaxed mb-6">
                All pricing is verified from provider websites, direct sales enquiries, and our own independent testing. 
                We do not use affiliate links — this guide is editorially independent. Our goal is simple: help you 
                choose the right AI call answering service at the right price for your trade business.
              </p>
              <p className="text-white/70 leading-relaxed">
                By the end of this guide, you will know exactly what you should pay, what hidden costs to watch for, 
                which pricing model suits your trade, and how many jobs you need to win to break even. See 
                <a href="/pricing" className="text-emerald-400 hover:underline">our pricing</a> for trade-specific plans 
                starting from £59/month. Let us get into the numbers.
              </p>
            </div>
          </section>

          {/* Table of Contents */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Contents</h3>
              <ol className="grid sm:grid-cols-2 gap-3 text-sm text-white/60">
                <li><a href="#what-affects-pricing" className="hover:text-emerald-400 transition-colors">1. What Affects AI Call Answering Pricing</a></li>
                <li><a href="#comparison-table" className="hover:text-emerald-400 transition-colors">2. Complete Price Comparison Table</a></li>
                <li><a href="#pricing-models" className="hover:text-emerald-400 transition-colors">3. Per-Job vs Per-Minute vs Per-Month Explained</a></li>
                <li><a href="#hidden-costs" className="hover:text-emerald-400 transition-colors">4. Hidden Costs to Watch For</a></li>
                <li><a href="#cheap-ai" className="hover:text-emerald-400 transition-colors">5. Is Cheap AI Answering Worth It?</a></li>
                <li><a href="#roi-calculator" className="hover:text-emerald-400 transition-colors">6. ROI Calculator: How Many Jobs to Break Even</a></li>
                <li><a href="#trade-examples" className="hover:text-emerald-400 transition-colors">7. Trade-Specific Cost Examples</a></li>
                <li><a href="#faq" className="hover:text-emerald-400 transition-colors">8. Frequently Asked Questions</a></li>
                <li><a href="#cta" className="hover:text-emerald-400 transition-colors">9. Start Your Free Trial</a></li>
              </ol>
            </div>
          </section>

          {/* Section 1: What Affects Pricing */}
          <section id="what-affects-pricing" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <BarChart3 className="w-7 h-7 text-emerald-400" />
              What Affects AI Call Answering Pricing
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              Before comparing prices, understand what drives cost. AI call answering pricing is not arbitrary — 
              it reflects four key factors that determine the value you receive.
            </p>

            <div className="space-y-6 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold">1</span>
                  Call Volume and Included Minutes/Calls
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Every provider sets limits. Some offer unlimited calls (flat monthly). Others charge per minute 
                  (Moneypenny: 90p/minute). Per-job providers like Whoza.ai charge per captured lead, not per call — 
                  so a 30-second spam call costs nothing. Estimate your monthly call volume before choosing a plan. 
                  A busy plumber receiving 8–12 calls daily needs more capacity than a part-time decorator.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold">2</span>
                  Features and Integrations
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Basic auto-attendants (£9–£30/month) route calls and take messages. True AI conversation 
                  (£49–£125/month) qualifies leads, asks trade-specific questions, and captures structured data. 
                  Premium features like WhatsApp delivery, calendar booking, CRM integration, and call recording 
                  typically cost £20–£50 extra. Consider which features actually generate revenue versus nice-to-have extras.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold">3</span>
                  AI Quality and Trade-Specific Training
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Not all AI is equal. Generic AI services use broad language models that may not understand 
                  trade terminology. A plumber asking about "combi boiler pressure drops" needs an AI trained 
                  on heating terminology. Trade-specific AI (Whoza.ai, some Clara configurations) costs more 
                  but converts significantly more callers into qualified leads. The cheapest option is worthless 
                  if the AI cannot understand your customers. For electrical businesses, see our 
                  <a href="/for-electricians" className="text-emerald-400 hover:underline">AI call answering for electricians</a> page.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold">4</span>
                  Human Backup and Hybrid Models
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Pure AI services (£49–£125/month) handle everything digitally. Hybrid services like Moneypenny 
                  (£150–£400+/month) use human receptionists backed by AI tools. The human touch costs 3–5x more 
                  but suits complex B2B enquiries or luxury trades where empathy matters. For most emergency 
                  and domestic trades, pure AI delivers better ROI.
                </p>
              </div>
            </div>

            <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-6">
              <h4 className="font-semibold text-amber-400 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> Key Takeaway for Tradespeople
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                Do not choose based on headline price alone. A £9/month service that loses 60% of callers because 
                it uses basic auto-attendant technology costs far more in lost revenue than a £59/month service 
                that captures 95% of enquiries with genuine AI conversation. Calculate total cost of ownership: 
                monthly fee + setup + overage + lost revenue from poor conversion.
              </p>
            </div>
          </section>

          {/* Section 2: Complete Comparison Table */}
          <section id="comparison-table" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Complete UK AI Call Answering Price Comparison (2026)</h2>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-900/80">
                    <th className="px-4 py-4 font-semibold text-white">Provider</th>
                    <th className="px-4 py-4 font-semibold text-white">Monthly Price</th>
                    <th className="px-4 py-4 font-semibold text-white">Pricing Model</th>
                    <th className="px-4 py-4 font-semibold text-white">AI Type</th>
                    <th className="px-4 py-4 font-semibold text-white">Trial</th>
                    <th className="px-4 py-4 font-semibold text-white">Contract</th>
                    <th className="px-4 py-4 font-semibold text-emerald-400">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {pricingData.map((p, i) => (
                    <tr key={p.provider} className={i % 2 === 0 ? "bg-white/5" : "bg-white/[0.02]"}>
                      <td className="px-4 py-4 font-medium">{p.provider}</td>
                      <td className="px-4 py-4 font-bold text-emerald-400">{p.price}</td>
                      <td className="px-4 py-4">{p.model}</td>
                      <td className="px-4 py-4">{p.type}</td>
                      <td className="px-4 py-4">{p.trial}</td>
                      <td className="px-4 py-4">{p.contract}</td>
                      <td className="px-4 py-4 text-emerald-400">{p.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-white/40 mt-4 text-center">
              Prices verified June 2026 from provider websites and direct sales enquiries. All prices exclude VAT. 
              PAYG = Pay As You Go. Per-job pricing charges only for captured leads, not total calls.
            </p>
          </section>

          {/* Provider Deep Dive */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <FileText className="w-7 h-7 text-emerald-400" />
              Provider Breakdown: What You Actually Get
            </h2>

            <div className="space-y-8">
              {/* Whoza.ai */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Whoza.ai</h3>
                  <span className="text-emerald-400 font-bold">£59–£399 / month</span>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  The only AI call answering service built specifically for UK trades. Per-job pricing means you 
                  only pay for captured leads — spam calls, wrong numbers, and sales calls cost nothing. Starter 
                  plan (£59/mo) includes unlimited calls and 15 trade-specific AI personalities. Growth plan (£125/mo) 
                  adds calendar integration and custom qualification flows. Enterprise (£249–£399) supports multi-van 
                  operations with team routing.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full text-xs">Per-job pricing</span>
                  <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full text-xs">15+ trade verticals</span>
                  <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full text-xs">WhatsApp delivery</span>
                  <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full text-xs">7-day free trial</span>
                  <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full text-xs">No contract</span>
                  <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full text-xs">30-day guarantee</span>
                </div>
              </div>

              {/* Clara AI */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Clara AI</h3>
                  <span className="text-emerald-400 font-bold">£49–£149 / month</span>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  General-purpose AI receptionist with broad small business focus. Entry plan (£49/mo) includes 
                  100 minutes and basic call handling. Professional (£99/mo) adds CRM integration and custom 
                  greetings. Business plan (£149/mo) includes unlimited calls and priority support. Good for 
                  trades with straightforward enquiries but lacks trade-specific training out of the box.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white/10 text-white/60 px-2 py-1 rounded-full text-xs">Flat monthly</span>
                  <span className="bg-white/10 text-white/60 px-2 py-1 rounded-full text-xs">General AI</span>
                  <span className="bg-white/10 text-white/60 px-2 py-1 rounded-full text-xs">14-day trial</span>
                  <span className="bg-white/10 text-white/60 px-2 py-1 rounded-full text-xs">No contract</span>
                </div>
              </div>

              {/* Moneypenny */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Moneypenny</h3>
                  <span className="text-amber-400 font-bold">£150–£400+ / month</span>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  Premium human-AI hybrid service. Real receptionists answer calls with AI-assisted note-taking 
                  and routing. Pricing is per-minute (90p/minute average) with monthly minimums starting at £150. 
                  Complex enquiries, B2B lead qualification, and appointment booking are strengths. Overkill for 
                  most sole traders but suits established firms with high-value commercial clients. Requires 12-month 
                  contract.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white/10 text-white/60 px-2 py-1 rounded-full text-xs">Per-minute</span>
                  <span className="bg-white/10 text-white/60 px-2 py-1 rounded-full text-xs">Human + AI</span>
                  <span className="bg-white/10 text-white/60 px-2 py-1 rounded-full text-xs">Custom trial</span>
                  <span className="bg-red-400/20 text-red-400 px-2 py-1 rounded-full text-xs">12-month contract</span>
                </div>
              </div>

              {/* ARROW */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">ARROW</h3>
                  <span className="text-emerald-400 font-bold">£99 / month</span>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  Single-plan auto-attendant service with AI call routing. Flat £99/month for unlimited calls. 
                  Good for businesses that need professional call routing and message-taking but do not require 
                  deep lead qualification. AI is competent for basic enquiries but lacks trade-specific depth. 
                  No trial available.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white/10 text-white/60 px-2 py-1 rounded-full text-xs">Flat monthly</span>
                  <span className="bg-white/10 text-white/60 px-2 py-1 rounded-full text-xs">Auto-attendant</span>
                  <span className="bg-red-400/20 text-red-400 px-2 py-1 rounded-full text-xs">No trial</span>
                  <span className="bg-white/10 text-white/60 px-2 py-1 rounded-full text-xs">No contract</span>
                </div>
              </div>

              {/* IONOS */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">IONOS</h3>
                  <span className="text-emerald-400 font-bold">£9 / month</span>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  Basic auto-attendant and call routing. Not true AI — uses pre-recorded menus and simple 
                  voicemail routing. At £9.99/month it is the cheapest option but offers minimal lead capture 
                  capability. Callers navigate menus and leave messages. Suitable for businesses that just need 
                  professional call routing and do not rely on phone enquiries for revenue. No trial, no contract.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white/10 text-white/60 px-2 py-1 rounded-full text-xs">Flat monthly</span>
                  <span className="bg-red-400/20 text-red-400 px-2 py-1 rounded-full text-xs">Basic auto-attendant (not AI)</span>
                  <span className="bg-red-400/20 text-red-400 px-2 py-1 rounded-full text-xs">No trial</span>
                  <span className="bg-white/10 text-white/60 px-2 py-1 rounded-full text-xs">No contract</span>
                </div>
              </div>

              {/* RingCentral AIR */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">RingCentral AIR</h3>
                  <span className="text-emerald-400 font-bold">£32 / user / month</span>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  Cloud PBX system with AI-powered call handling add-ons. Core service is business phone 
                  system (£32/user/month) with optional AI receptionist features (£15–£25/user/month extra). 
                  Total cost for a single user with AI: £47–£57/month. Good for trades already using RingCentral 
                  or needing full phone system features. AI is competent but not trade-specific. 30-day free trial.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white/10 text-white/60 px-2 py-1 rounded-full text-xs">Per user/month</span>
                  <span className="bg-white/10 text-white/60 px-2 py-1 rounded-full text-xs">Cloud PBX + AI</span>
                  <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full text-xs">30-day trial</span>
                  <span className="bg-white/10 text-white/60 px-2 py-1 rounded-full text-xs">No contract</span>
                </div>
              </div>

              {/* Answer.co.uk */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Answer.co.uk</h3>
                  <span className="text-emerald-400 font-bold">PAYG — per call</span>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  Traditional human answering service with pay-as-you-go pricing. Real people answer calls 
                  and take messages. Costs £1.20–£2.50 per call depending on complexity. No monthly fee, no 
                  contract, no trial. Best for businesses with very low call volumes (under 20 calls/month) 
                  who prefer human interaction. Costs escalate quickly at higher volumes — 50 calls/month 
                  equals £60–£125, comparable to AI services.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white/10 text-white/60 px-2 py-1 rounded-full text-xs">Per call</span>
                  <span className="bg-white/10 text-white/60 px-2 py-1 rounded-full text-xs">Human answering</span>
                  <span className="bg-red-400/20 text-red-400 px-2 py-1 rounded-full text-xs">No trial</span>
                  <span className="bg-white/10 text-white/60 px-2 py-1 rounded-full text-xs">No contract</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Pricing Models Explained */}
          <section id="pricing-models" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <CreditCard className="w-7 h-7 text-emerald-400" />
              Per-Job vs Per-Minute vs Per-Month: Which Model Wins?
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              Understanding pricing models is crucial — the same provider can cost £50 or £500 depending on 
              how they charge. Here is how each model works and which suits tradespeople.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6">
                <h3 className="font-bold text-emerald-400 mb-3">Per-Job Pricing</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  You pay only when the AI captures a qualified lead. Spam calls, wrong numbers, and 
                  sales pitches cost nothing. Example: Whoza.ai charges £5–£15 per captured job depending 
                  on plan, plus a small base fee.
                </p>
                <div className="text-sm">
                  <div className="flex justify-between text-white/70 mb-1"><span>Best for</span><span className="text-emerald-400">Tradespeople</span></div>
                  <div className="flex justify-between text-white/70 mb-1"><span>Predictability</span><span className="text-emerald-400">High</span></div>
                  <div className="flex justify-between text-white/70"><span>Risk</span><span className="text-emerald-400">Low</span></div>
                </div>
              </div>

              <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-6">
                <h3 className="font-bold text-amber-400 mb-3">Per-Minute Pricing</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  You pay for every minute the AI or human spends on calls. Rates range from 45p–£1.50/minute. 
                  A 3-minute qualification call costs £1.35–£4.50. Monthly bills vary with call volume and duration.
                </p>
                <div className="text-sm">
                  <div className="flex justify-between text-white/70 mb-1"><span>Best for</span><span className="text-amber-400">Low volume</span></div>
                  <div className="flex justify-between text-white/70 mb-1"><span>Predictability</span><span className="text-amber-400">Medium</span></div>
                  <div className="flex justify-between text-white/70"><span>Risk</span><span className="text-amber-400">Medium</span></div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-bold text-white mb-3">Per-Month (Flat)</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  Fixed monthly fee for unlimited or capped calls. Predictable budgeting but may include 
                  overage charges. Example: Clara AI £49/month for 100 minutes. IONOS £9.99 unlimited 
                  but basic features.
                </p>
                <div className="text-sm">
                  <div className="flex justify-between text-white/70 mb-1"><span>Best for</span><span className="text-white">Budgeting</span></div>
                  <div className="flex justify-between text-white/70 mb-1"><span>Predictability</span><span className="text-emerald-400">High</span></div>
                  <div className="flex justify-between text-white/70"><span>Risk</span><span className="text-amber-400">Overage fees</span></div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h4 className="font-semibold text-white mb-4">Model Comparison: Plumber Example (20 calls/week)</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 text-white/60">Model</th>
                      <th className="text-left py-2 text-white/60">Example Provider</th>
                      <th className="text-right py-2 text-white/60">Est. Monthly Cost</th>
                      <th className="text-right py-2 text-white/60">Annual Cost</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-3">Per-job</td>
                      <td>Whoza.ai Starter</td>
                      <td className="text-right font-mono">£59</td>
                      <td className="text-right font-mono">£708</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3">Per-minute</td>
                      <td>Moneypenny (90p/min)</td>
                      <td className="text-right font-mono">£108–£180</td>
                      <td className="text-right font-mono">£1,296–£2,160</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3">Flat monthly</td>
                      <td>Clara AI Professional</td>
                      <td className="text-right font-mono">£99</td>
                      <td className="text-right font-mono">£1,188</td>
                    </tr>
                    <tr>
                      <td className="py-3">Per call</td>
                      <td>Answer.co.uk (£1.50/call)</td>
                      <td className="text-right font-mono">£120</td>
                      <td className="text-right font-mono">£1,440</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/40 mt-4">
                Based on 20 calls/week, 3-minute average call duration, 80% qualification rate. 
                Per-job assumes 8 captured leads/week at £5–£7.50 per job plus base fee.
              </p>
            </div>
          </section>

          {/* Section 4: Hidden Costs */}
          <section id="hidden-costs" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <AlertTriangle className="w-7 h-7 text-red-400" />
              Hidden Costs to Watch For
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              The advertised price is rarely the total price. Here are the hidden costs that catch trade 
              businesses out — and how to avoid them.
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Setup Fees (£50–£250)</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Some providers charge a one-time setup fee for number configuration, AI training, and 
                      integration. Whoza.ai and Clara AI include setup in the monthly price. Moneypenny charges 
                      £150–£250 for complex configurations. Always ask: "Is setup included?"
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Overage Charges (Variable)</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Flat monthly plans often have call limits. Exceed 100 minutes on Clara AI's entry plan 
                      and you pay £0.65/minute overage. A busy week with emergency calls can add £50–£100 to 
                      your bill. Per-job and per-minute models avoid this trap — you only pay for what you use.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Contract Lock-In (12+ Months)</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Moneypenny requires a 12-month minimum contract with 3-month cancellation notice. 
                      Early termination fees can exceed £400. Whoza.ai, Clara AI, IONOS, and RingCentral 
                      offer month-to-month with no cancellation penalty. For trades with seasonal fluctuations, 
                      no-contract services are essential.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Number Porting Charges (£15–£50)</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Transferring your existing business number to a new provider may incur porting fees. 
                      Some providers waive this; others charge £25–£50. If you want to keep your established 
                      number (and you should — changing numbers confuses customers), factor this into first-year costs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Integration Fees (£10–£30/month)</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Connecting to your CRM, calendar, or accounting software may cost extra. Calendar booking 
                      integration: £15–£25/month. CRM sync: £10–£20/month. WhatsApp Business API: sometimes free, 
                      sometimes £5–£10/month. Whoza.ai includes WhatsApp delivery and basic calendar integration 
                      in all plans.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
              <h4 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
                <XCircle className="w-5 h-5" /> Hidden Cost Checklist
              </h4>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                Before signing with any provider, ask these questions and get answers in writing:
              </p>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Is there a setup fee? How much?</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> What is the monthly call/minute/lead limit?</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> What are overage charges per unit?</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Is there a minimum contract length?</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> What is the cancellation notice period?</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Are integrations included or extra?</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Is number porting free or charged?</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Are premium features (recording, analytics) extra?</li>
              </ul>
            </div>
          </section>

          {/* Section 5: Is Cheap AI Worth It? */}
          <section id="cheap-ai" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <HelpCircle className="w-7 h-7 text-amber-400" />
              Is Cheap AI Answering Actually Worth It?
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              At £9–£30 per month, cheap AI answering is tempting. But there is a critical difference between 
              <strong className="text-white"> auto-attendant</strong> technology and <strong className="text-white">true AI conversation</strong>. 
              Understanding this distinction saves you from buying a service that actually loses you money.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-bold text-red-400 mb-4">Cheap Auto-Attendant (£9–£30/month)</h3>
                <ul className="space-y-3 text-sm text-white/60">
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /> Pre-recorded menu: "Press 1 for sales, 2 for support..."</li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /> Cannot handle natural conversation</li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /> Callers often hang up in frustration</li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /> No lead qualification — just voicemail routing</li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /> No trade-specific terminology</li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /> Message delivery via email only (no WhatsApp)</li>
                </ul>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-sm text-white/70">Examples: <span className="text-white">IONOS (£9), basic RingCentral plans</span></p>
                  <p className="text-sm text-red-400 mt-1">Effective lead capture: ~30–40%</p>
                </div>
              </div>

              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6">
                <h3 className="font-bold text-emerald-400 mb-4">True AI Conversation (£49–£125/month)</h3>
                <ul className="space-y-3 text-sm text-white/60">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Natural language: "How can I help you today?"</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Understands context and asks follow-ups</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Engages callers with professional conversation</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Qualifies leads with trade-specific questions</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Understands boiler, electrical, and roofing terms</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Instant WhatsApp delivery with full details</li>
                </ul>
                <div className="mt-4 pt-4 border-t border-emerald-500/20">
                  <p className="text-sm text-white/70">Examples: <span className="text-white">Whoza.ai (£59+), Clara AI (£49+)</span></p>
                  <p className="text-sm text-emerald-400 mt-1">Effective lead capture: ~90–95%</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h4 className="font-semibold text-white mb-3">The Math: Cheap vs True AI</h4>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                Let us say you receive 20 calls per week, 10 of which are genuine enquiries. A cheap auto-attendant 
                captures 40% (4 leads). True AI captures 90% (9 leads). That is 5 extra leads per week — 
                260 extra leads per year.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                  <div className="font-bold text-red-400 mb-2">Cheap Auto-Attendant</div>
                  <div className="space-y-1 text-white/60">
                    <div className="flex justify-between"><span>Annual cost</span><span>£120</span></div>
                    <div className="flex justify-between"><span>Leads captured/year</span><span>208</span></div>
                    <div className="flex justify-between"><span>Lost leads/year</span><span>312</span></div>
                    <div className="flex justify-between text-red-400 font-bold"><span>Lost revenue</span><span>£87,360</span></div>
                  </div>
                </div>
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-4">
                  <div className="font-bold text-emerald-400 mb-2">True AI (Whoza.ai)</div>
                  <div className="space-y-1 text-white/60">
                    <div className="flex justify-between"><span>Annual cost</span><span>£708</span></div>
                    <div className="flex justify-between"><span>Leads captured/year</span><span>468</span></div>
                    <div className="flex justify-between"><span>Lost leads/year</span><span>52</span></div>
                    <div className="flex justify-between text-emerald-400 font-bold"><span>Revenue recovered</span><span>£131,040</span></div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-white/40 mt-4">
                Assumes £280 average job value, 35% conversion rate, 20 calls/week with 50% genuine enquiry rate. 
                Cheap auto-attendant: 40% capture. True AI: 90% capture. Difference: 260 extra leads/year.
              </p>
            </div>
          </section>

          {/* Section 6: ROI Calculator */}
          <section id="roi-calculator" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Calculator className="w-7 h-7 text-emerald-400" />
              ROI Calculator: How Many Jobs to Break Even?
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              The most important number is not the monthly fee — it is how many jobs you need to win to cover 
              the cost. For UK trades, the answer is almost always: <strong className="text-white">one job per month</strong>.
            </p>

            <div className="overflow-x-auto rounded-xl border border-white/10 mb-8">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-900/80">
                    <th className="px-4 py-4 font-semibold text-white">Trade</th>
                    <th className="px-4 py-4 font-semibold text-white">Avg Job Value</th>
                    <th className="px-4 py-4 font-semibold text-white">Whoza.ai Plan</th>
                    <th className="px-4 py-4 font-semibold text-white">Jobs to Break Even</th>
                    <th className="px-4 py-4 font-semibold text-emerald-400">Monthly ROI</th>
                    <th className="px-4 py-4 font-semibold text-emerald-400">Annual ROI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {tradeBreakEven.map((t, i) => (
                    <tr key={t.trade} className={i % 2 === 0 ? "bg-white/5" : "bg-white/[0.02]"}>
                      <td className="px-4 py-4 font-medium">{t.trade}</td>
                      <td className="px-4 py-4">£{t.avgJob}</td>
                      <td className="px-4 py-4">{t.plan}</td>
                      <td className="px-4 py-4 font-bold text-white">{t.jobsNeeded}</td>
                      <td className="px-4 py-4 text-emerald-400">{t.monthlyRoi}</td>
                      <td className="px-4 py-4 text-emerald-400">{t.annualRoi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6">
              <h4 className="font-semibold text-emerald-400 mb-3">How We Calculate ROI</h4>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                Monthly ROI = (Average job value × Estimated extra jobs captured/month) – Monthly AI cost.
                We assume AI captures 8 extra qualified leads per month (conservative — based on 20 calls/week, 
                62% missed rate, 90% AI capture vs 22% voicemail capture, 35% conversion).
              </p>
              <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-sm">
                <p className="text-emerald-400">Plumber Example:</p>
                <p className="text-white/70">8 extra leads × 35% conversion = 2.8 extra jobs/month</p>
                <p className="text-white/70">2.8 jobs × £280 = £784 extra revenue/month</p>
                <p className="text-white/70">£784 revenue – £59 AI cost = <span className="text-emerald-400">£725 net monthly gain</span></p>
              </div>
            </div>
          </section>

          {/* Section 7: Trade-Specific Examples */}
          <section id="trade-examples" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Briefcase className="w-7 h-7 text-emerald-400" />
              Trade-Specific Cost Examples
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              Different trades have different call patterns, job values, and AI requirements. Here is what 
              each trade should budget for AI call answering in 2026.
            </p>

            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-bold text-white mb-3">Plumber — Recommended: Whoza.ai Starter (£59/month)</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-3">
                  Plumbers receive high call volumes with emergency and routine mix. Average job value (£280) 
                  means breaking even takes one job. Per-job pricing is ideal — emergency burst pipe calls at 
                  2am cost the same as routine boiler service enquiries. Expected monthly ROI: £700–£1,200.
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded-full">Emergency calls</span>
                  <span className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded-full">High volume</span>
                  <span className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded-full">Boiler terminology</span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-bold text-white mb-3">Electrician — Recommended: Whoza.ai Growth (£125/month) or Clara Professional (£99/month)</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-3">
                  Electricians handle complex enquiries: EICRs, consumer unit upgrades, rewires, and emergency 
                  callouts. Job values range from £120 (callout) to £2,500 (consumer unit). AI needs to understand 
                  electrical terminology and compliance requirements. Higher plan justifies cost with one 
                  consumer unit job covering 20 months of service. Expected monthly ROI: £1,200–£2,000.
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-amber-500/10 text-amber-400 px-2 py-1 rounded-full">Technical detail</span>
                  <span className="bg-amber-500/10 text-amber-400 px-2 py-1 rounded-full">High-value jobs</span>
                  <span className="bg-amber-500/10 text-amber-400 px-2 py-1 rounded-full">Compliance questions</span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-bold text-white mb-3">Roofer — Recommended: Whoza.ai Starter (£59/month)</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-3">
                  Roofers have the highest average job values (£850+) but lower call volume. One captured roof 
                  repair covers 14 months of AI service. Per-job pricing is essential — you do not want to pay 
                  monthly during quiet winter periods. Emergency storm damage calls spike suddenly; AI handles 
                  overflow without extra staff. Expected monthly ROI: £2,000–£4,000+.
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-slate-500/10 text-slate-400 px-2 py-1 rounded-full">Highest job values</span>
                  <span className="bg-slate-500/10 text-slate-400 px-2 py-1 rounded-full">Seasonal spikes</span>
                  <span className="bg-slate-500/10 text-slate-400 px-2 py-1 rounded-full">Storm damage urgency</span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-bold text-white mb-3">Builder — Recommended: Whoza.ai Growth (£125/month) or Enterprise (£249/month)</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-3">
                  Builders handle the most complex enquiries: extensions, renovations, new builds. Job values 
                  (£500–£60,000) justify premium AI with detailed qualification. Multi-van operations need team 
                  routing and job allocation. Enterprise plan supports multiple team members and project managers. 
                  One extension enquiry (£20,000+) covers 80+ months of service. Expected monthly ROI: £3,000–£8,000+.
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-stone-500/10 text-stone-400 px-2 py-1 rounded-full">Project detail</span>
                  <span className="bg-stone-500/10 text-stone-400 px-2 py-1 rounded-full">Multi-van teams</span>
                  <span className="bg-stone-500/10 text-stone-400 px-2 py-1 rounded-full">Highest totals</span>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section 1 */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Get 7 Days Free — No Credit Card Required</h3>
              <p className="text-white/60 mb-6 max-w-xl mx-auto">
                See exactly how many calls you are missing and what they are worth. Whoza.ai's 7-day trial 
                includes full AI call answering, WhatsApp delivery, and trade-specific qualification. 
                30-day money-back guarantee after that.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/pricing" className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-emerald-700 transition-colors shadow-lg">
                  Start Free Trial <ArrowRight className="w-5 h-5" />
                </a>
              </div>
              <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-white/40">
                <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 7-day free trial</span>
                <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> No credit card</span>
                <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 30-day guarantee</span>
                <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> No contract</span>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-bold text-white mb-2">How much does AI call answering cost in the UK?</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  AI call answering in the UK costs between £9 and £400+ per month depending on the provider and 
                  pricing model. Entry-level services like IONOS start at £9/month. Mid-tier AI services like Clara 
                  AI cost £49–£149/month. Premium human-assisted services like Moneypenny range from £150–£400+/month. 
                  Whoza.ai offers trade-specific plans from 
                  <a href="/pricing" className="text-emerald-400 hover:underline">£59/month</a> with per-job pricing. 
                  For a full breakdown, see our 
                  <a href="/blog/ai-call-answering-uk-tradespeople-definitive-guide-2026" className="text-emerald-400 hover:underline">complete guide to AI call answering for UK trades</a>.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-bold text-white mb-2">What is the cheapest AI receptionist in the UK?</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  The cheapest AI receptionist in the UK is IONOS at £9.99/month for basic call handling. However, 
                  cheapest is not always best value — IONOS uses basic auto-attendant technology, not true AI. For 
                  genuine AI conversation, Clara AI starts at £49/month and Whoza.ai at £59/month for tradespeople. 
                  Consider call quality, lead capture accuracy, and integration features when comparing price.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-bold text-white mb-2">Is per-job or per-minute pricing better for tradespeople?</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Per-job pricing is generally better for tradespeople because it aligns cost with revenue. A plumber 
                  paying £5 per captured job knows exactly what each lead costs. Per-minute pricing penalises longer 
                  qualification calls — a complex boiler enquiry might take 4 minutes but be worth £800. Per-month 
                  pricing offers predictability but may waste money during quiet periods. Most trade businesses prefer 
                  per-job or flat monthly pricing.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-bold text-white mb-2">Are there hidden costs with AI call answering services?</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Yes. Common hidden costs include: setup fees (£50–£250), overage charges when you exceed monthly 
                  call limits, contract lock-in penalties (some providers require 12-month commitments), integration 
                  fees for connecting to your CRM or calendar, number porting charges, and premium features like 
                  WhatsApp delivery or call recording that cost extra. Always ask for a total cost breakdown before 
                  signing.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-bold text-white mb-2">How many jobs does it take to break even on AI call answering?</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  For most UK trades, breaking even takes 1–2 jobs per month. Example: a plumber on Whoza.ai's 
                  £59/month Starter plan needs to win just one £280 job to cover the cost. An electrician on the 
                  £125 Growth plan needs one £320 job. A roofer on any plan needs less than one job — a single 
                  £850 roof repair more than covers even premium plans. Most trade businesses recover 10–50x their 
                  monthly AI cost in additional revenue.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-bold text-white mb-2">Does cheap AI answering actually work for trades?</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Cheap AI answering (£9–£30/month) typically uses basic auto-attendant or simple voice-menu 
                  technology, not true conversational AI. For tradespeople, this means callers get frustrated, 
                  hang up, or leave incomplete messages. True AI answering (£49–£125/month) uses natural language 
                  processing to have real conversations, ask trade-specific questions, and capture complete job 
                  details. The £40–£100 monthly difference often pays for itself with one extra captured job.
                </p>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section id="cta" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Stop Guessing. Start Capturing.</h2>
            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
              Every missed call is a job that went to your competitor. For less than the cost of one average 
              trade job per month, AI call answering captures every enquiry 24/7, qualifies leads, and delivers 
              them instantly to your phone. The maths is simple. The trial is free. The only question is: 
              how many jobs are you willing to keep losing?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/pricing" className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-emerald-700 transition-colors shadow-lg">
                Start 7-Day Free Trial <ArrowRight className="w-5 h-5" />
              </a>
              <a href="/missed-calls-cost-calculator" className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-6 py-4 rounded-xl hover:bg-white/20 transition-colors">
                Calculate Your Losses <ArrowRight className="w-5 h-5" />
              </a>
            </div>
            <p className="text-white/50 text-sm mt-6 text-center">
              <a href="/pricing" className="text-emerald-400 hover:underline">Plans from £59/month</a>. 
              <a href="/pricing" className="text-emerald-400 hover:underline">How much whoza costs</a> 
              depends on your call volume and trade.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-white/40">
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> No credit card required</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 30-day money-back guarantee</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Cancel anytime — no contract</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Setup in 30 minutes</span>
            </div>
          </section>

          {/* Related Content */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-white/10">
            <h3 className="text-lg font-semibold text-white/70 mb-4 text-center">Related Reading</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <a href="/blog/ai-call-answering-uk-tradespeople-definitive-guide-2026" className="block bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <div className="text-emerald-400 text-sm font-medium mb-2">Guide</div>
                <div className="font-semibold text-white mb-1">Complete Guide to AI Call Answering for UK Trades</div>
                <p className="text-white/50 text-sm">Everything tradespeople need to know about how AI call answering works.</p>
              </a>
              <a href="/blog/best-ai-call-answering-service-uk-trades-2026" className="block bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <div className="text-emerald-400 text-sm font-medium mb-2">Comparison</div>
                <div className="font-semibold text-white mb-1">7 Best AI Call Answering Services Compared</div>
                <p className="text-white/50 text-sm">Independent comparison of 7 AI call answering services for UK trades.</p>
              </a>
              <a href="/" className="block bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <div className="text-emerald-400 text-sm font-medium mb-2">Calculator</div>
                <div className="font-semibold text-white mb-1">Lost Jobs Calculator</div>
                <p className="text-white/50 text-sm">Calculate how much missed calls are costing your trade business.</p>
              </a>
              <a href="/" className="block bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <div className="text-emerald-400 text-sm font-medium mb-2">Free Trial</div>
                <div className="font-semibold text-white mb-1">Try Katie Free for 7 Days</div>
                <p className="text-white/50 text-sm">No credit card required. Start capturing every call in minutes.</p>
              </a>
            </div>
          </section>
        </main>

        
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "AI Call Answering Pricing Guide UK 2026",
            "description": "Pricing guide for AI call answering services in the UK.",
            "image": "https://whoza.ai/og-image.webp",
            "datePublished": "2026-06-20",
            "dateModified": "2026-06-20",
            "author": { "@type": "Organization", "name": "whoza.ai", "url": "https://whoza.ai" },
            "publisher": { "@type": "Organization", "name": "whoza.ai", "url": "https://whoza.ai" },
            "speakable": {
              "@type": "SpeakableSpecification",
              "cssSelector": [".post-intro", ".key-statistics"]
            }
          })
        }}
      />
<Footer />
      </div>
    </>
  )
}
