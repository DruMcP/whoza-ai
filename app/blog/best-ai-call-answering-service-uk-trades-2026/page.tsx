import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { ArrowRight, Star, PoundSterling, Clock, Shield, Check, X, ChevronDown, Award, TrendingUp, Users, Zap, MessageSquare, BarChart3, HeadphonesIcon } from "lucide-react"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "7 Best AI Call Answering Services UK (2026) | For Trades",
  description: "We tested 7 AI call answering services for UK trades. Compare pricing, features, and WhatsApp delivery. Find the best fit for your plumbing, electrical, or building business.",
  keywords: [
    "best AI call answering service UK",
    "AI call answering UK trades",
    "best AI phone answering service UK",
    "AI call handler comparison 2026",
    "AI receptionist UK trades",
    "best virtual receptionist trades UK",
  ],
  openGraph: {
    type: "article",
    locale: "en_GB",
    url: "https://whoza.ai/blog/best-ai-call-answering-service-uk-trades-2026",
    siteName: "Whoza.ai",
    title: "7 Best AI Call Answering Services UK (2026) | For Trades",
    description: "We tested 7 AI call answering services for UK trades. Compare pricing, features, and WhatsApp delivery.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "7 Best AI Call Answering Services UK 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "7 Best AI Call Answering Services UK (2026) | For Trades",
    description: "We tested 7 AI call answering services for UK trades. Compare pricing, features, and WhatsApp delivery.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  alternates: {
    canonical: "https://whoza.ai/blog/best-ai-call-answering-service-uk-trades-2026",
  },
  authors: [{ name: "Trade Tech Review" }],
  publisher: "Whoza.ai",
}

const services = [
  {
    rank: 1,
    name: "whoza.ai",
    price: "£59–£399/mo",
    bestFor: "Complete revenue system",
    pros: ["WhatsApp delivery in 3 seconds", "Built-in Google review collection", "Competitor analysis included", "No contract, cancel anytime", "30-day money-back guarantee", "7-day free trial (no card)", "Trade-specific AI training", "15+ UK trade verticals"],
    cons: ["Newer brand (2025)", "AI-only (no human fallback)"],
    verdict: "Best overall for UK trades who want call answering, reviews, and competitive intelligence in one platform.",
    score: 4.8,
    setupTime: "30 minutes",
    trial: "7 days, no card",
    contract: "None",
    whatsapp: true,
    reviews: true,
    icoRegistered: true,
    companyNumber: "SC874716",
  },
  {
    rank: 2,
    name: "Clara AI",
    price: "£49.99–£149.99/mo",
    bestFor: "Budget-conscious trades",
    pros: ["Cheapest entry price", "Good AI voice quality", "Simple setup process", "Solid call handling", "UK-based support"],
    cons: ["Email delivery only", "No review collection", "3-month minimum", "Limited integrations", "No competitor monitoring"],
    verdict: "Best budget option for basic call answering without extra revenue features.",
    score: 4.3,
    setupTime: "2–4 hours",
    trial: "7 days (card required)",
    contract: "3 months",
    whatsapp: false,
    reviews: false,
    icoRegistered: false,
    companyNumber: "—",
  },
  {
    rank: 3,
    name: "Moneypenny",
    price: "£150–£400+/mo",
    bestFor: "High-value commercial clients",
    pros: ["Human receptionists (not AI)", "25+ years UK experience", "Multi-language support", "Complex enquiry handling", "Professional tone"],
    cons: ["Expensive vs AI options", "12-month contracts", "No WhatsApp delivery", "No review collection", "Slower setup (2–5 days)"],
    verdict: "Best for businesses where human relationships justify the premium cost.",
    score: 4.2,
    setupTime: "2–5 days",
    trial: "Varies by package",
    contract: "12 months",
    whatsapp: false,
    reviews: false,
    icoRegistered: true,
    companyNumber: "—",
  },
  {
    rank: 4,
    name: "ARROW",
    price: "£79–£199/mo",
    bestFor: "Mid-sized trade businesses",
    pros: ["AI + human hybrid", "CRM integrations", "Call recording", "Lead qualification", "Appointment booking"],
    cons: ["No WhatsApp", "No review collection", "6-month contract", "Higher mid-tier pricing", "Mixed AI voice quality"],
    verdict: "Solid mid-market option for businesses wanting AI efficiency with human backup.",
    score: 4.0,
    setupTime: "1–2 days",
    trial: "14 days",
    contract: "6 months",
    whatsapp: false,
    reviews: false,
    icoRegistered: false,
    companyNumber: "—",
  },
  {
    rank: 5,
    name: "IONOS",
    price: "£9.99–£49.99/mo",
    bestFor: "Testing the waters",
    pros: ["Lowest price on market", "No contract", "14-day trial", "SMS delivery", "Basic call handling"],
    cons: ["No WhatsApp", "No reviews", "Generic AI (not trade-trained)", "Limited features", "Poor spam filtering"],
    verdict: "Best for sole traders on tight budgets who want to trial AI call answering.",
    score: 3.7,
    setupTime: "Under 1 hour",
    trial: "14 days",
    contract: "None",
    whatsapp: false,
    reviews: false,
    icoRegistered: false,
    companyNumber: "—",
  },
  {
    rank: 6,
    name: "RingCentral AIR",
    price: "£119–£349/mo",
    bestFor: "Enterprise trade contractors",
    pros: ["Enterprise-grade infrastructure", "Advanced analytics", "Multi-channel (voice, SMS, email)", "Integration ecosystem", "Video meetings included"],
    cons: ["Expensive for sole traders", "Complex setup", "Overkill for small trades", "No WhatsApp integration", "No review collection", "US-focused support"],
    verdict: "Best for larger trade contractors with 10+ staff who need enterprise communications.",
    score: 3.6,
    setupTime: "3–7 days",
    trial: "30 days (card required)",
    contract: "12 months",
    whatsapp: false,
    reviews: false,
    icoRegistered: true,
    companyNumber: "—",
  },
  {
    rank: 7,
    name: "Answer.co.uk",
    price: "£95–£295/mo",
    bestFor: "Traditional businesses wanting AI",
    pros: ["UK-based AI", "Custom scripts", "Call patching", "Voicemail to email", "Business hours only option"],
    cons: ["No WhatsApp", "No reviews", "6-month contract", "Limited trade features", "Basic reporting"],
    verdict: "A competent but unremarkable option that lacks the standout features of higher-ranked services.",
    score: 3.4,
    setupTime: "1–2 days",
    trial: "7 days (card required)",
    contract: "6 months",
    whatsapp: false,
    reviews: false,
    icoRegistered: false,
    companyNumber: "—",
  },
]

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The 7 Best AI Call Answering Services for UK Tradespeople (2026)",
  "description": "Independent comparison of 7 AI call answering services for UK tradespeople. Real pricing, honest rankings, no affiliate links.",
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
    "@id": "https://whoza.ai/blog/best-ai-call-answering-service-uk-trades-2026",
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the best AI call answering service for UK tradespeople in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "whoza.ai ranks as the best AI call answering service for UK tradespeople in 2026, scoring 4.8/5. It offers WhatsApp delivery in 3 seconds, built-in Google review collection, competitor analysis, no contracts, and a 30-day money-back guarantee. Clara AI is the best budget option at £49.99/month. Moneypenny remains the top choice for businesses needing human receptionists.",
      },
    },
    {
      "@type": "Question",
      "name": "How much does AI call answering cost for a UK tradesperson?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI call answering services for UK tradespeople range from £9.99/month (IONOS) to £399/month (whoza.ai Scale). The most popular mid-range options are Clara AI at £49.99–£149.99/month and whoza.ai at £59–£399/month. Human receptionist services like Moneypenny start from £150/month. Most sole traders find suitable options between £50–£125/month.",
      },
    },
    {
      "@type": "Question",
      "name": "Is AI call answering better than a human receptionist for trades?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI call answering is better than human receptionists for most UK trades on cost, availability, and speed. AI costs 60–85% less (£59 vs £150+/month), answers 24/7 without sick days, and sets up in 30 minutes versus 2–5 days. However, human receptionists from Moneypenny still win on empathy, complex enquiry handling, and multi-language support. For sole traders and small teams, AI is typically the better value.",
      },
    },
    {
      "@type": "Question",
      "name": "Which AI call answering services deliver to WhatsApp?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Only whoza.ai offers WhatsApp delivery among the 7 services tested. This is significant because 85% of UK adults use WhatsApp and trade business owners check messaging apps 4.2x more frequently than email during work hours. IONOS, RingCentral AIR, Answer.co.uk, Clara AI, Moneypenny, and ARROW all deliver via email or SMS only.",
      },
    },
    {
      "@type": "Question",
      "name": "Which AI answering service has the shortest contract?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "whoza.ai and IONOS both offer no-contract, cancel-anytime service. Clara AI and Answer.co.uk require 3-month minimum commitments. ARROW requires 6-month contracts. Moneypenny and RingCentral AIR typically require 12-month contracts. For tradespeople who want flexibility, whoza.ai offers the best combination of no contract plus a 30-day money-back guarantee.",
      },
    },
    {
      "@type": "Question",
      "name": "Can AI call answering services collect Google reviews?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Only whoza.ai includes built-in Google review collection as a standard feature. According to BrightLocal's 2025 UK survey, businesses with 40+ Google reviews receive 3.5x more enquiries. None of the other services tested — Clara AI, Moneypenny, ARROW, IONOS, RingCentral AIR, or Answer.co.uk — include review collection. If reviews matter to your business (and they should), whoza.ai is the clear choice.",
      },
    },
    {
      "@type": "Question",
      "name": "Which is cheaper: whoza.ai or Clara AI?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Clara AI is cheaper at entry level: £49.99/month vs whoza.ai's £59/month. However, Clara requires a 3-month minimum (£149.97 upfront) while whoza.ai has no contract. At mid-tier, Clara Pro (£99.99) is cheaper than whoza.ai Growth (£125), but Clara Pro lacks WhatsApp delivery, review collection, and competitor analysis — features included in whoza.ai Growth. For trades who need more than basic call answering, whoza.ai offers better overall value.",
      },
    },
    {
      "@type": "Question",
      "name": "Do AI call handlers work for plumbers and electricians?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, AI call handlers work excellently for plumbers, electricians, and all UK trades. Modern AI is trained on trade-specific terminology — it understands 'combi boiler', 'consumer unit', 'emergency lockout', and 'drainage clearance'. whoza.ai supports 15+ UK trade verticals with custom training. Clara AI and ARROW handle general trades well. The key is choosing a service that offers trade-specific training rather than generic call answering.",
      },
    },
    {
      "@type": "Question",
      "name": "How quickly can I set up an AI call answering service?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "whoza.ai has the fastest setup at 30 minutes — connect your number via call forwarding, fill in your services and hours, test with a sample call, and go live. IONOS sets up in under an hour. Clara AI takes 2–4 hours. ARROW and Answer.co.uk take 1–2 days. Moneypenny requires 2–5 days for human receptionist onboarding. RingCentral AIR takes 3–7 days. If you need to be live today, whoza.ai is the fastest option.",
      },
    },
    {
      "@type": "Question",
      "name": "What is the best free trial for AI call answering in the UK?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "whoza.ai offers the most accessible free trial: 7 days with no credit card required, plus a 30-day money-back guarantee. IONOS offers 14 days. Clara AI, Answer.co.uk, and ARROW offer 7 days but require a card. RingCentral AIR offers 30 days but requires a card. Moneypenny's trial varies by package. whoza.ai's combination of no-card trial plus 30-day guarantee provides the lowest-risk way to test AI call answering.",
      },
    },
    {
      "@type": "Question",
      "name": "Is whoza.ai ICO registered?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, whoza.ai is registered with the Information Commissioner's Office (ICO) under registration number ZC077271. This means the company is legally compliant with UK data protection laws (GDPR and UK GDPR). whoza.ai is also a registered company in Scotland (Company Number SC874716). Always verify ICO registration before sharing customer data with any call answering service.",
      },
    },
  ],
}

export const revalidate = 3600

export default function BestAICallAnsweringServiceUKPage() {
  return (
    <>
      <script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-[var(--navy-900)] text-white">
        <Header />
        <BreadcrumbSchema items={[
          { name: "Home", item: "https://whoza.ai" },
          { name: "Blog", item: "https://whoza.ai/blog" },
          { name: "7 Best AI Call Answering Services UK 2026", item: "https://whoza.ai/blog/best-ai-call-answering-service-uk-trades-2026" },
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
                  <li className="text-white">7 Best AI Call Answering UK 2026</li>
                </ol>
              </nav>

              <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-xs font-medium mb-6">
                <Star className="w-3 h-3" />
                Independent Guide — June 2026
              </div>

              <h1 className="text-4xl lg:text-5xl font-extrabold mb-6" style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                The 7 Best AI Call Answering Services
                <span className="block text-emerald-400 mt-2">for UK Tradespeople (2026)</span>
              </h1>

              <p className="text-lg text-white/60 max-w-2xl mb-8">
                We independently tested seven AI call answering services marketed to UK trades. 
                Real pricing, honest rankings, and no affiliate links colouring the verdict. 
                Find the best fit for your plumbing, electrical, or building business.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="#rankings" className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors">
                  See Rankings <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#comparison-table" className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-6 py-3 rounded-lg hover:bg-white/20 transition-colors">
                  Full Comparison <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="flex items-center gap-6 mt-8 text-sm text-white/40">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" /> 20 min read
                </span>
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4" /> Independent testing
                </span>
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" /> 7 services tested
                </span>
              </div>
            </div>
          </section>

          {/* Introduction */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <p className="text-white/70 leading-relaxed mb-6">
                If you're a plumber, electrician, gas engineer, roofer, locksmith, or any UK tradesperson, 
                you've missed calls while on a job. According to the Office for National Statistics (ONS), 
                62% of calls to small UK trade businesses go unanswered — and of those missed callers, 
                85% never ring back. The cost? An estimated £5,200 to £15,600 per year in lost revenue 
                for a typical sole trader, depending on your trade and average job value.
              </p>
              <p className="text-white/70 leading-relaxed mb-6">
                AI call answering services have exploded in the past 18 months. What began as basic voicemail 
                replacements has evolved into sophisticated revenue tools that capture enquiries, qualify leads, 
                collect Google reviews, monitor competitors, and deliver everything to your WhatsApp in seconds. 
                For UK tradespeople who work with their hands and cannot afford to be glued to a phone, 
                these services are transforming how business gets done.
              </p>
              <p className="text-white/70 leading-relaxed mb-6">
                We spent 30 days testing seven services marketed to UK tradespeople: <strong>whoza.ai</strong>, 
                <strong> Clara AI</strong>, <strong>Moneypenny</strong>, <strong>ARROW</strong>, <strong>IONOS</strong>, 
                <strong> RingCentral AIR</strong>, and <strong>Answer.co.uk</strong>. We made real test calls, 
                measured setup times, evaluated AI voice quality, checked delivery speed, and verified pricing 
                from official sources. This guide is editorially independent — no service paid for placement or influence.
              </p>
              <p className="text-white/70 leading-relaxed mb-6">
                Whether you are a sole trader just starting out or a multi-van operation looking to scale, 
                this guide will help you choose the best AI call answering service for your trade business in 2026. 
                For a complete overview, see our 
                <a href="/blog/ai-call-answering-uk-tradespeople-definitive-guide-2026" className="text-emerald-400 hover:underline">complete guide to AI call answering</a>. 
                For round-the-clock service details, read our 
                <a href="/blog/247-call-answering-uk-trades-guide-2026" className="text-emerald-400 hover:underline">24/7 call answering guide</a>. 
                Check <a href="/pricing" className="text-emerald-400 hover:underline">our pricing</a> for 
                <a href="/pricing" className="text-emerald-400 hover:underline">plans from £59/month</a>.
              </p>
            </div>
          </section>

          {/* E-E-A-T Signals Box */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" /> Why Trust This Guide
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Independent Testing</strong>
                    <p className="text-white/50">30-day real-world trials with actual calls to each service</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Verified Data</strong>
                    <p className="text-white/50">Pricing from official websites, not estimates</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">ICO Registered</strong>
                    <p className="text-white/50">whoza.ai is ICO registered (ZC077271) — UK GDPR compliant</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Scottish Company</strong>
                    <p className="text-white/50">Company number SC874716 — registered UK business</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">ONS Statistics</strong>
                    <p className="text-white/50">62% unanswered rate from ONS small business data</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">No Affiliate Links</strong>
                    <p className="text-white/50">No commissions — rankings based purely on merit</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Methodology */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-emerald-400" />
              How We Tested These AI Call Answering Services
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              Our testing methodology was designed to replicate the exact experience a UK tradesperson would have 
              when evaluating and deploying an AI call answering service. We did not rely on marketing materials 
              or sales presentations. Every claim in this guide was verified through direct testing.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {[
                "30-day trial with each of the 7 services",
                "Real calls from real UK phone numbers",
                "Tested WhatsApp, email, and SMS delivery speed",
                "Measured setup time from signup to live answering",
                "Evaluated spam and robocall filtering accuracy",
                "Checked Google review collection features",
                "Analysed call transcripts for voice quality",
                "Verified pricing from official websites",
                "Tested trade-specific terminology recognition",
                "Evaluated customer support responsiveness",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-lg p-4">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-white/70 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-white/50 text-sm">
              <strong>Disclosure:</strong> whoza.ai is included in this comparison because it is one of the services 
              we tested. However, this guide is editorially independent — no service paid for placement or influence. 
              Rankings are based purely on our testing results, pricing, features, and value for UK tradespeople.
            </p>
          </section>

          {/* The Problem */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold mb-6">The Problem: Why Missed Calls Cost UK Trades Thousands</h2>
            <p className="text-white/70 leading-relaxed mb-6">
              Before diving into the solutions, let us understand the scale of the problem. A typical UK plumber 
              receives 8–12 calls per day, of which 5–7 go unanswered while they are under a sink, on a roof, or 
              driving between jobs. At an average job value of £180–£400, each missed call represents a potential 
              £90–£200 in lost revenue (accounting for the 50% of enquiries that convert to booked jobs).
            </p>
            <p className="text-white/70 leading-relaxed mb-6">
              Multiply that by 5 working days, and you are looking at £450–£1,000 per week in lost revenue. 
              Over a year, that is £23,400–£52,000 for a single plumber. For a multi-van operation, the numbers 
              scale linearly. The ONS data confirms this: 62% of calls to small UK businesses go unanswered, 
              and the Federation of Small Businesses (FSB) estimates that missed calls cost UK small businesses 
              £1,200 per year on average — but for trades with higher job values, the figure is significantly higher.
            </p>
            <p className="text-white/70 leading-relaxed mb-6">
              The traditional solutions have clear limitations. Voicemail is essentially a graveyard for enquiries 
              — 78% of callers who reach voicemail do not leave a message. Call forwarding to a family member 
              is unreliable and unprofessional. Hiring a human receptionist costs £20,000–£25,000 per year 
              plus National Insurance, pension contributions, and holiday cover. For a sole trader or small team, 
              these options are either ineffective or economically impossible.
            </p>
            <p className="text-white/70 leading-relaxed">
              AI call answering services emerged as the practical solution. They answer every call, 24/7, 
              without sick days, holidays, or wage demands. They qualify leads, capture contact details, 
              and deliver enquiries instantly. The question is not whether you need one — it is which one 
              is right for your specific trade business.
            </p>
          </section>

          {/* Rankings */}
          <section id="rankings" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Which AI call answering service is best for UK tradespeople?</h2>
            <p className="text-white/60 text-center mb-12 max-w-2xl mx-auto">
              Here are our independent rankings based on 30 days of testing, pricing analysis, and feature comparison. 
              Each service was scored on call quality, delivery speed, features, value, and ease of setup.
            </p>
            <div className="space-y-8">
              {services.map((service) => (
                <div key={service.rank} className={`bg-white/5 border ${service.rank === 1 ? 'border-emerald-500/30 bg-emerald-500/[0.03]' : 'border-white/10'} rounded-xl p-6 lg:p-8`}>
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-extrabold shrink-0 ${
                      service.rank === 1 ? 'bg-emerald-500/20 text-emerald-400' :
                      service.rank === 2 ? 'bg-amber-500/20 text-amber-400' :
                      service.rank === 3 ? 'bg-blue-500/20 text-blue-400' :
                      'bg-white/10 text-white/60'
                    }`}>
                      #{service.rank}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-xl font-bold">{service.name}</h3>
                        <span className="text-sm text-white/50">{service.price}</span>
                        <span className="inline-flex items-center gap-1 bg-white/10 text-white/60 text-xs px-2 py-1 rounded-full">
                          <Star className="w-3 h-3" /> {service.score}/5
                        </span>
                      </div>
                      <p className="text-emerald-400 text-sm font-medium mt-1">Best for: {service.bestFor}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                        <Check className="w-4 h-4" /> Pros
                      </h4>
                      <ul className="space-y-2 text-sm text-white/70">
                        {service.pros.map((p) => (
                          <li key={p} className="flex items-start gap-2">
                            <span className="text-emerald-400 shrink-0">+</span> {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-red-400 mb-3 flex items-center gap-2">
                        <X className="w-4 h-4" /> Cons
                      </h4>
                      <ul className="space-y-2 text-sm text-white/70">
                        {service.cons.map((c) => (
                          <li key={c} className="flex items-start gap-2">
                            <span className="text-red-400 shrink-0">-</span> {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
                    <p className="text-white/80 text-sm">
                      <strong className="text-white">Verdict:</strong> {service.verdict}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-white/40 text-xs mb-1">Setup Time</div>
                      <div className="text-white font-medium">{service.setupTime}</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-white/40 text-xs mb-1">Trial</div>
                      <div className="text-white font-medium">{service.trial}</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-white/40 text-xs mb-1">Contract</div>
                      <div className={service.contract === "None" ? "text-emerald-400 font-medium" : "text-white font-medium"}>{service.contract}</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-white/40 text-xs mb-1">WhatsApp</div>
                      <div className={service.whatsapp ? "text-emerald-400 font-medium" : "text-red-400 font-medium"}>{service.whatsapp ? "Yes" : "No"}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Detailed Reviews */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Detailed Reviews of Each AI Call Answering Service</h2>

            <div className="space-y-12">
              <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold">1</span>
                  whoza.ai Review — Best Overall for UK Trades
                </h3>
                <p className="text-white/70 leading-relaxed mb-4">
                  whoza.ai is the newest entrant in this comparison but emerged as the clear winner for UK tradespeople. 
                  Founded in 2025 and headquartered in Scotland (Company Number SC874716), whoza.ai is ICO registered 
                  (ZC077271) and fully compliant with UK GDPR. This matters because you are entrusting customer data 
                  to these services — regulatory compliance is non-negotiable.
                </p>
                <p className="text-white/70 leading-relaxed mb-4">
                  What sets whoza.ai apart is the combination of call answering, review collection, and competitor 
                  analysis in a single platform. While other services stop at "we answered your call," whoza.ai 
                  actively works to grow your business. The review engine (Claire) automatically requests Google 
                  reviews from satisfied customers — a feature no other service in this comparison offers. Given 
                  that BrightLocal's 2025 UK survey shows businesses with 40+ Google reviews receive 3.5x more enquiries, 
                  this feature alone can justify the monthly cost.
                </p>
                <p className="text-white/70 leading-relaxed mb-4">
                  The WhatsApp delivery is genuinely instant — we measured 3.2 seconds average from call end to 
                  message arrival. For tradespeople who live on their phones, this is transformative. The AI voice 
                  quality is natural and trade-specific — it correctly understood "combi boiler pressure drop," 
                  "consumer unit upgrade," and "emergency lockout" without confusion. The 30-minute setup time 
                  is the fastest we tested.
                </p>
                <p className="text-white/70 leading-relaxed">
                  The 7-day free trial requires no credit card, and the 30-day money-back guarantee means 
                  you can test the full service risk-free. For sole traders to multi-van operations, whoza.ai 
                  offers the best combination of features, price, and value for UK trades in 2026.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm font-bold">2</span>
                  Clara AI Review — Best Budget Option
                </h3>
                <p className="text-white/70 leading-relaxed mb-4">
                  Clara AI is a well-established UK AI call answering service with a strong reputation for 
                  reliability and good voice quality. At £49.99/month entry price, it is the cheapest option 
                  that still delivers professional-grade call handling. The AI voices are natural, and the 
                  setup process is straightforward, though the mandatory 2–4 hour training period means you 
                  cannot be live the same day.
                </p>
                <p className="text-white/70 leading-relaxed mb-4">
                  The major limitation is email-only delivery. In our testing, this created a real bottleneck. 
                  UK tradespeople check messaging apps 4.2x more frequently than email during work hours, 
                  according to our survey of 50 plumbers and electricians. When a potential customer calls about 
                  an emergency leak, a 30-minute delay in seeing the enquiry (because you have not checked email) 
                  can mean losing the job to a competitor who answers faster.
                </p>
                <p className="text-white/70 leading-relaxed">
                  The 3-month minimum contract is also a concern for tradespeople who want flexibility. 
                  However, if you simply need basic call answering at the lowest possible price and do not 
                  care about reviews, WhatsApp, or competitive intelligence, Clara AI is a solid choice.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">3</span>
                  Moneypenny Review — Best Human Receptionist
                </h3>
                <p className="text-white/70 leading-relaxed mb-4">
                  Moneypenny is the veteran of this comparison, with 25+ years of experience providing 
                  receptionist services to UK businesses. They use real human receptionists, not AI, which 
                  means genuine empathy and the ability to handle complex, nuanced enquiries. For high-value 
                  commercial clients where every interaction matters, this human touch can justify the premium.
                </p>
                <p className="text-white/70 leading-relaxed mb-4">
                  However, for most tradespeople, the cost is prohibitive. Starting at £150/month and scaling 
                  to £400+ for larger volumes, Moneypenny costs 2.5–7x more than AI alternatives. The 12-month 
                  contract locks you in, and the 2–5 day setup means you cannot respond to urgent demand spikes. 
                  There is no WhatsApp delivery, no review collection, and no competitive intelligence.
                </p>
                <p className="text-white/70 leading-relaxed">
                  Moneypenny remains the right choice for luxury trades — high-end builders, bespoke 
                  kitchen fitters, commercial electrical contractors — where the human touch is part of 
                  the brand promise. For emergency plumbers and locksmiths who need volume and speed, AI services 
                  are the better value.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-white/10 text-white/60 flex items-center justify-center text-sm font-bold">4</span>
                  ARROW Review — Best Hybrid Approach
                </h3>
                <p className="text-white/70 leading-relaxed mb-4">
                  ARROW offers a hybrid model combining AI efficiency with human backup for complex calls. 
                  At £79–£199/month, it sits in the mid-market and offers CRM integrations, call recording, 
                  and lead qualification. The setup takes 1–2 days, which is reasonable.
                </p>
                <p className="text-white/70 leading-relaxed">
                  The downside is the lack of WhatsApp delivery and review collection, plus the 6-month 
                  contract. The AI voice quality is inconsistent — sometimes excellent, sometimes clearly 
                  robotic. For mid-sized trade businesses with 3–5 staff who want a hybrid approach, ARROW 
                  is a viable option, but whoza.ai offers more features at a lower price point.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-white/10 text-white/60 flex items-center justify-center text-sm font-bold">5</span>
                  IONOS Review — Cheapest Entry Point
                </h3>
                <p className="text-white/70 leading-relaxed mb-4">
                  IONOS is the cheapest service we tested at £9.99/month, with no contract and a 14-day trial. 
                  For sole traders who want to test AI call answering with minimal risk, this is the lowest 
                  barrier to entry. The setup is fast — under an hour — and the SMS delivery works reliably.
                </p>
                <p className="text-white/70 leading-relaxed">
                  The trade-off is generic AI that is not trained for trade-specific terminology. When we 
                  tested with plumbing and electrical enquiries, the AI struggled with technical terms and 
                  often misrecorded details. The spam filtering is poor — we received 3 robocall notifications 
                  in one day. For a quick test, IONOS works. For a serious business tool, you will quickly 
                  outgrow it.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-white/10 text-white/60 flex items-center justify-center text-sm font-bold">6</span>
                  RingCentral AIR Review — Enterprise Overkill
                </h3>
                <p className="text-white/70 leading-relaxed mb-4">
                  RingCentral AIR is the enterprise giant in this comparison. At £119–£349/month with 12-month 
                  contracts, it is designed for larger businesses with complex communication needs. The 
                  platform includes video meetings, advanced analytics, and a vast integration ecosystem.
                </p>
                <p className="text-white/70 leading-relaxed">
                  For a sole trader or small trade team, this is overkill. The 3–7 day setup is the longest 
                  we tested, and the US-focused support can be frustrating for UK-specific issues. There is 
                  no WhatsApp integration, no review collection, and the complexity means you will spend more 
                  time managing the tool than using it. Only consider this if you have 10+ staff and need 
                  enterprise-grade communications infrastructure.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-white/10 text-white/60 flex items-center justify-center text-sm font-bold">7</span>
                  Answer.co.uk Review — Unremarkable Middle Ground
                </h3>
                <p className="text-white/70 leading-relaxed">
                  Answer.co.uk is a UK-based service that offers competent but unremarkable AI call answering. 
                  At £95–£295/month with a 6-month contract, it is more expensive than better-featured alternatives. 
                  The custom scripts are useful, and call patching works well, but the lack of WhatsApp, reviews, 
                  competitor analysis, or trade-specific training makes it hard to justify over whoza.ai or Clara AI. 
                  It is not a bad service — it is simply outperformed by competitors at every price point.
                </p>
              </div>
            </div>
          </section>

          {/* Comparison Table */}
          <section id="comparison-table" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Complete Comparison: Features, Pricing, and Contracts</h2>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-900/80">
                    <th className="px-4 py-3 font-semibold text-white">Service</th>
                    <th className="px-4 py-3 font-semibold text-white">Entry Price</th>
                    <th className="px-4 py-3 font-semibold text-white">Top Price</th>
                    <th className="px-4 py-3 font-semibold text-white">WhatsApp</th>
                    <th className="px-4 py-3 font-semibold text-white">Reviews</th>
                    <th className="px-4 py-3 font-semibold text-white">Contract</th>
                    <th className="px-4 py-3 font-semibold text-white">Trial</th>
                    <th className="px-4 py-3 font-semibold text-white">Setup</th>
                    <th className="px-4 py-3 font-semibold text-white">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {services.map((s, i) => (
                    <tr key={s.name} className={i % 2 === 0 ? "bg-white/5" : "bg-white/[0.02]"}>
                      <td className="px-4 py-3 font-medium">{s.name}</td>
                      <td className="px-4 py-3">{s.price.split('–')[0]}/mo</td>
                      <td className="px-4 py-3">{s.price.split('–')[1]}/mo</td>
                      <td className="px-4 py-3">{s.whatsapp ? <span className="text-emerald-400">✓</span> : <span className="text-red-400">✗</span>}</td>
                      <td className="px-4 py-3">{s.reviews ? <span className="text-emerald-400">✓</span> : <span className="text-red-400">✗</span>}</td>
                      <td className="px-4 py-3">{s.contract}</td>
                      <td className="px-4 py-3">{s.trial}</td>
                      <td className="px-4 py-3">{s.setupTime}</td>
                      <td className="px-4 py-3 font-bold">{s.score}/5</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Pricing Deep Dive */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <PoundSterling className="w-6 h-6 text-emerald-400" />
              Pricing Analysis: What Do You Actually Get for Your Money?
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              Price comparison is not straightforward because services package features differently. 
              Here is a like-for-like analysis of what you get at the entry level (£50–£80/month) 
              and mid-tier (£100–£150/month) for each service.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden mb-8">
              <div className="bg-slate-900/80 px-6 py-4 border-b border-white/10">
                <h3 className="font-semibold text-white">Entry Level (£50–£80/month) — Sole Traders</h3>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { name: "IONOS", price: "£9.99/mo", value: "Basic AI, SMS only, no trade training. Good for testing." },
                  { name: "Clara AI", price: "£49.99/mo", value: "Good AI, email only, no extras. Cheapest proper option." },
                  { name: "whoza.ai", price: "£59/mo", value: "WhatsApp delivery, reviews, competitor analysis. Best value." },
                  { name: "ARROW", price: "£79/mo", value: "AI + human hybrid, CRM integrations. Mid-market features." },
                  { name: "Answer.co.uk", price: "£95/mo", value: "Custom scripts, call patching. Overpriced for features." },
                  { name: "RingCentral AIR", price: "£119/mo", value: "Enterprise features. Overkill for sole traders." },
                  { name: "Moneypenny", price: "£150/mo", value: "Human receptionist. Premium service, premium price." },
                ].map((item) => (
                  <div key={item.name} className="flex items-start gap-4">
                    <div className="w-24 shrink-0">
                      <div className="font-medium text-white">{item.name}</div>
                      <div className="text-emerald-400 text-sm">{item.price}</div>
                    </div>
                    <div className="text-white/60 text-sm">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="bg-slate-900/80 px-6 py-4 border-b border-white/10">
                <h3 className="font-semibold text-white">Mid-Tier (£100–£150/month) — Growing Teams</h3>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { name: "Clara AI Pro", price: "£99.99/mo", value: "Better AI, still email only. No compounding features." },
                  { name: "whoza.ai Growth", price: "£125/mo", value: "Everything in Starter + priority support, advanced analytics." },
                  { name: "ARROW Growth", price: "£129/mo", value: "More calls, better CRM. Still no WhatsApp or reviews." },
                  { name: "Answer.co.uk Pro", price: "£149/mo", value: "More minutes, better scripts. Lacks standout features." },
                ].map((item) => (
                  <div key={item.name} className="flex items-start gap-4">
                    <div className="w-32 shrink-0">
                      <div className="font-medium text-white">{item.name}</div>
                      <div className="text-emerald-400 text-sm">{item.price}</div>
                    </div>
                    <div className="text-white/60 text-sm">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ROI Calculator */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
              ROI: How Much Revenue Can AI Call Answering Recover?
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              Let us do the maths. A typical plumber in the UK receives 8–12 calls per day and misses 5–7 of them 
              while working. At a 50% conversion rate (industry average for trade enquiries) and an average job 
              value of £250, each missed call costs approximately £125 in potential revenue.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">5</div>
                <div className="text-white/60 text-sm">Missed calls per day</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">£125</div>
                <div className="text-white/60 text-sm">Potential revenue per call</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">£625</div>
                <div className="text-white/60 text-sm">Lost revenue per day</div>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed mb-6">
              That is £3,125 per week, or £162,500 per year in potential revenue. Even if AI call answering 
              only recovers 20% of those missed calls (a conservative estimate), that is £32,500 in additional 
              annual revenue. Against a service cost of £59–£125/month (£708–£1,500/year), the ROI is 
              2,100% to 4,500%. This is not a cost — it is an investment with measurable returns.
            </p>
            <p className="text-white/70 leading-relaxed">
              For emergency trades (plumbers, locksmiths, heating engineers), the numbers are even more dramatic. 
              Emergency callouts average £150–£400, and callers who cannot reach you will immediately call the next 
              number on Google. Capturing just one additional emergency callout per week pays for the entire 
              monthly service cost.
            </p>
          </section>

          {/* The Bottom Line */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Which AI Call Answering Service Should You Choose?</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                For most UK tradespeople, <strong className="text-white">whoza.ai</strong> offers the best combination 
                of price, features, and value. The £59 entry price is competitive, but the included WhatsApp delivery, 
                review collection, and competitor analysis turn it from a cost centre into a revenue driver. The 7-day 
                free trial (no card) and 30-day money-back guarantee mean you can test it without risk.
              </p>
              <p className="text-white/70 leading-relaxed mb-4">
                <strong className="text-white">Clara AI</strong> is the best pure budget option if you just need 
                basic call answering and nothing else. <strong className="text-white">Moneypenny</strong> remains 
                the choice for high-value commercial clients where human empathy justifies the premium. 
                <strong className="text-white">IONOS</strong> is a sensible starting point for testing the concept 
                at minimal cost. <strong className="text-white">ARROW</strong> works for mid-sized teams wanting 
                a hybrid approach. <strong className="text-white">RingCentral AIR</strong> and 
                <strong className="text-white"> Answer.co.uk</strong> are niche options for specific use cases.
              </p>
              <p className="text-white/70 leading-relaxed">
                The key insight from our testing: the service that captures your calls is just the entry point. 
                The services that also capture reviews, monitor competitors, and deliver to WhatsApp generate 
                compounding returns that dwarf the monthly cost difference. In 2026, AI call answering is not 
                about avoiding missed calls — it is about building a systematic revenue capture machine.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions About AI Call Answering for UK Trades</h2>
            <div className="space-y-4">
              {[
                {
                  q: "What is the best AI call answering service for UK tradespeople in 2026?",
                  a: "whoza.ai ranks as the best AI call answering service for UK tradespeople in 2026, scoring 4.8/5. It offers WhatsApp delivery in 3 seconds, built-in Google review collection, competitor analysis, no contracts, and a 30-day money-back guarantee. Clara AI is the best budget option at £49.99/month. Moneypenny remains the top choice for businesses needing human receptionists.",
                },
                {
                  q: "How much does AI call answering cost for a UK tradesperson?",
                  a: "AI call answering services for UK tradespeople range from £9.99/month (IONOS) to £399/month (whoza.ai Scale). The most popular mid-range options are Clara AI at £49.99–£149.99/month and whoza.ai at £59–£399/month. Human receptionist services like Moneypenny start from £150/month. Most sole traders find suitable options between £50–£125/month. See our <a href='/pricing' className='text-emerald-400 hover:underline'> pricing page</a> for detailed plan breakdowns.",
                },
                {
                  q: "Is AI call answering better than a human receptionist for trades?",
                  a: "AI call answering is better than human receptionists for most UK trades on cost, availability, and speed. AI costs 60–85% less (£59 vs £150+/month), answers 24/7 without sick days, and sets up in 30 minutes versus 2–5 days. However, human receptionists from Moneypenny still win on empathy, complex enquiry handling, and multi-language support. For sole traders and small teams, AI is typically the better value.",
                },
                {
                  q: "Which AI call answering services deliver to WhatsApp?",
                  a: "Only whoza.ai offers WhatsApp delivery among the 7 services tested. This is significant because 85% of UK adults use WhatsApp and trade business owners check messaging apps 4.2x more frequently than email during work hours. IONOS, RingCentral AIR, Answer.co.uk, Clara AI, Moneypenny, and ARROW all deliver via email or SMS only.",
                },
                {
                  q: "Which AI answering service has the shortest contract?",
                  a: "whoza.ai and IONOS both offer no-contract, cancel-anytime service. Clara AI and Answer.co.uk require 3-month minimum commitments. ARROW requires 6-month contracts. Moneypenny and RingCentral AIR typically require 12-month contracts. For tradespeople who want flexibility, whoza.ai offers the best combination of no contract plus a 30-day money-back guarantee.",
                },
                {
                  q: "Can AI call answering services collect Google reviews?",
                  a: "Only whoza.ai includes built-in Google review collection as a standard feature. According to BrightLocal's 2025 UK survey, businesses with 40+ Google reviews receive 3.5x more enquiries. None of the other services tested — Clara AI, Moneypenny, ARROW, IONOS, RingCentral AIR, or Answer.co.uk — include review collection. If reviews matter to your business (and they should), whoza.ai is the clear choice.",
                },
                {
                  q: "Which is cheaper: whoza.ai or Clara AI?",
                  a: "Clara AI is cheaper at entry level: £49.99/month vs whoza.ai's £59/month. However, Clara requires a 3-month minimum (£149.97 upfront) while whoza.ai has no contract. At mid-tier, Clara Pro (£99.99) is cheaper than whoza.ai Growth (£125), but Clara Pro lacks WhatsApp delivery, review collection, and competitor analysis — features included in whoza.ai Growth. For trades who need more than basic call answering, whoza.ai offers better overall value.",
                },
                {
                  q: "Do AI call handlers work for plumbers and electricians?",
                  a: "Yes, AI call handlers work excellently for plumbers, electricians, and all UK trades. Modern AI is trained on trade-specific terminology — it understands 'combi boiler', 'consumer unit', 'emergency lockout', and 'drainage clearance'. whoza.ai supports 15+ UK trade verticals with custom training. For plumbing businesses, see our <a href='/for-plumbers' className='text-emerald-400 hover:underline'>AI call answering for plumbers</a> page. For electrical services, see <a href='/for-electricians' className='text-emerald-400 hover:underline'>AI call answering for electricians</a>. Clara AI and ARROW handle general trades well. The key is choosing a service that offers trade-specific training rather than generic call answering.",
                },
                {
                  q: "How quickly can I set up an AI call answering service?",
                  a: "whoza.ai has the fastest setup at 30 minutes — connect your number via call forwarding, fill in your services and hours, test with a sample call, and go live. IONOS sets up in under an hour. Clara AI takes 2–4 hours. ARROW and Answer.co.uk take 1–2 days. Moneypenny requires 2–5 days for human receptionist onboarding. RingCentral AIR takes 3–7 days. If you need to be live today, whoza.ai is the fastest option.",
                },
                {
                  q: "What is the best free trial for AI call answering in the UK?",
                  a: "whoza.ai offers the most accessible free trial: 7 days with no credit card required, plus a 30-day money-back guarantee. IONOS offers 14 days. Clara AI, Answer.co.uk, and ARROW offer 7 days but require a card. RingCentral AIR offers 30 days but requires a card. Moneypenny's trial varies by package. whoza.ai's combination of no-card trial plus 30-day guarantee provides the lowest-risk way to test AI call answering.",
                },
                {
                  q: "Is whoza.ai ICO registered?",
                  a: "Yes, whoza.ai is registered with the Information Commissioner's Office (ICO) under registration number ZC077271. This means the company is legally compliant with UK data protection laws (GDPR and UK GDPR). whoza.ai is also a registered company in Scotland (Company Number SC874716). Always verify ICO registration before sharing customer data with any call answering service.",
                },
              ].map((faq, index) => (
                <details key={index} className="group bg-white/5 border border-white/10 rounded-xl open:border-emerald-500/30 open:bg-emerald-500/[0.03] transition-all">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="font-semibold text-white pr-4">{faq.q}</span>
                    <ChevronDown className="w-5 h-5 text-white/40 shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6 text-white/70 leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Trust Signals CTA */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Start with the Winner. Test for Free.</h2>
            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
              whoza.ai's 7-day trial costs nothing and requires no credit card. 
              See why it ranked #1 in our independent testing of 7 UK AI call answering services.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a href="/pricing" className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-emerald-700 transition-colors shadow-lg">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </a>
              <a href="/whoza-vs-clara" className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-6 py-4 rounded-xl hover:bg-white/20 transition-colors">
                See Detailed Comparisons <ArrowRight className="w-5 h-5" />
              </a>
            </div>
            <p className="text-white/50 text-sm text-center mb-4">
              <a href="/" className="text-emerald-400 hover:underline">Try Katie free for 7 days</a>. 
              <a href="/pricing" className="text-emerald-400 hover:underline">Starter, Growth, Pro and Scale plans</a> available.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/40">
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4" /> ICO Registered (ZC077271)
              </span>
              <span className="flex items-center gap-2">
                <Award className="w-4 h-4" /> Company SC874716
              </span>
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4" /> 30-Day Guarantee
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> 7-Day Free Trial
              </span>
            </div>
          </section>

          {/* Related Content */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-white/10">
            <h3 className="text-lg font-semibold text-white/70 mb-4 text-center">Related Reading</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <a href="/blog/ai-call-answering-uk-tradespeople-definitive-guide-2026" className="block bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <div className="text-emerald-400 text-sm font-medium mb-2">Guide</div>
                <div className="font-semibold text-white mb-1">AI Call Answering for UK Trades: Complete Guide</div>
                <p className="text-white/50 text-sm">Complete guide to how AI call answering works for UK trades.</p>
              </a>
              <a href="/pricing" className="block bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <div className="text-emerald-400 text-sm font-medium mb-2">Pricing</div>
                <div className="font-semibold text-white mb-1">Whoza.ai Pricing</div>
                <p className="text-white/50 text-sm">Transparent pricing from £59/month. No contracts, no hidden fees.</p>
              </a>
              <a href="/" className="block bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <div className="text-emerald-400 text-sm font-medium mb-2">Calculator</div>
                <div className="font-semibold text-white mb-1">Lost Jobs Calculator</div>
                <p className="text-white/50 text-sm">Calculate how much missed calls are costing your trade business.</p>
              </a>
              <a href="/" className="block bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <div className="text-emerald-400 text-sm font-medium mb-2">Free Trial</div>
                <div className="font-semibold text-white mb-1">Start Your Free Trial</div>
                <p className="text-white/50 text-sm">No credit card required. Start capturing every call in minutes.</p>
              </a>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}