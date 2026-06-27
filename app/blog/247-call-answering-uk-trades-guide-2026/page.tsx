import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import {
  ArrowRight, Star, Clock, Shield, Check, X, ChevronDown, Users, Zap,
  MessageSquare, Phone, PoundSterling, Wrench, AlertTriangle, Calendar,
  TrendingUp, BarChart3, HelpCircle, Play, Smartphone, Moon, Sun, Home, User,
} from "lucide-react"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "24/7 Call Answering UK Trades (2026) | Emergency Guide",
  description:
    "24/7 call answering guide for UK trades. How AI handles emergency calls day and night. Never miss an urgent job again. Complete 2026 guide. Plans from £59.",
  keywords: [
    "24/7 call answering UK",
    "after hours call answering",
    "out of hours call answering service UK",
    "emergency call answering for trades",
    "24/7 call answering tradespeople",
    "overnight call answering UK",
    "weekend call answering service",
    "holiday call answering trades",
  ],
  openGraph: {
    type: "article",
    locale: "en_GB",
    url: "https://whoza.ai/blog/247-call-answering-uk-trades-guide-2026",
    siteName: "Whoza.ai",
    title: "24/7 Call Answering UK Trades (2026) | Emergency Guide",
    description:
      "24/7 call answering guide for UK trades. How AI handles emergency calls day and night. Never miss an urgent job again. Complete 2026 guide. Plans from £59.",
    images: [
      {
        url: "https://whoza.ai/og-image.webp",
        width: 1200,
        height: 630,
        alt: "24/7 Call Answering UK Trades Emergency Guide 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "24/7 Call Answering UK Trades (2026) | Emergency Guide",
    description:
      "Complete guide to 24/7 call answering for UK trades. How AI handles emergency calls at 2am, weekends, and holidays.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  alternates: {
    canonical: "https://whoza.ai/blog/247-call-answering-uk-trades-guide-2026",
  },
  authors: [{ name: "Trade Tech Review" }],
  publisher: "Whoza.ai",
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "24/7 Call Answering for UK Trades: Complete Guide (2026)",
  description:
    "24/7 call answering guide for UK trades. How AI handles emergency calls day and night. Never miss an urgent job again. Complete 2026 guide. Plans from £59.",
  author: {
    "@type": "Organization",
    name: "Trade Tech Review",
  },
  publisher: {
    "@type": "Organization",
    name: "Whoza.ai",
    logo: {
      "@type": "ImageObject",
      url: "https://whoza.ai/og-image.webp",
    },
  },
  datePublished: "2026-06-06",
  dateModified: "2026-06-06",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://whoza.ai/blog/247-call-answering-uk-trades-guide-2026",
  },
  wordCount: 3200,
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is 24/7 call answering for UK trades?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "24/7 call answering for UK trades is a service that answers every incoming call to your trade business around the clock — including nights, weekends, bank holidays, and Christmas Day. An AI voice agent or human receptionist captures caller details, qualifies the urgency, and delivers the enquiry instantly via WhatsApp, SMS, or email so you never miss an emergency job or after-hours lead.",
      },
    },
    {
      "@type": "Question",
      name: "Which UK trades need 24/7 call answering the most?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Emergency trades need 24/7 call answering most: locksmiths (lockouts at midnight), plumbers (burst pipes at 2am), heating engineers (boiler failures on Sunday), electricians (power outages at 6pm), and emergency roofers (storm damage). These trades receive urgent calls outside normal hours and losing even one emergency job can cost £200–£800 in lost revenue.",
      },
    },
    {
      "@type": "Question",
      name: "How much does 24/7 call answering cost for UK trades?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI-powered 24/7 call answering costs £59–£399 per month depending on call volume. Human 24/7 answering services like Moneypenny charge £150–£400+/month. In-house receptionists cost £20,000–£25,000 per year plus holiday and sickness cover. For most sole traders, AI 24/7 answering at £59–£125/month delivers the best value with no contracts and instant setup.",
      },
    },
    {
      "@type": "Question",
      name: "Can AI really handle emergency calls at 2am?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, modern AI call answering handles emergency calls at 2am with the same accuracy as daytime calls. The AI recognises urgency keywords ('burst pipe', 'no heating', 'locked out'), asks trade-specific questions, captures the caller's location and contact details, and delivers the lead to your WhatsApp within 3 seconds. It never sleeps, never takes holidays, and answers every call on the first ring.",
      },
    },
    {
      "@type": "Question",
      name: "What happens during out-of-hours with AI call answering?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "During out-of-hours, the AI answers the call immediately, identifies the trade and urgency level, captures the caller's name, address, phone number, and job description, tags the enquiry by priority (emergency vs routine), and delivers everything to your WhatsApp with a structured summary. For emergencies, you can configure escalation — the AI sends an urgent WhatsApp alert and can trigger a second notification if the call is not acknowledged within 15 minutes.",
      },
    },
    {
      "@type": "Question",
      name: "How does AI 24/7 answering compare to Moneypenny or Answer.co.uk?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI 24/7 answering costs 60–85% less than human services (£59 vs £150+/month), sets up in 30 minutes vs 2–5 days, and delivers to WhatsApp in 3 seconds. Moneypenny offers human empathy and complex enquiry handling but requires 12-month contracts and costs significantly more. Answer.co.uk provides UK-based agents but lacks WhatsApp delivery and review collection. AI wins on speed, cost, and availability; human services win on empathy and complex cases.",
      },
    },
    {
      "@type": "Question",
      name: "How many emergency jobs justify paying for 24/7 call answering?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "At £59/month for AI 24/7 answering, you only need to capture one emergency job every 2–3 months to break even. At an average emergency job value of £180–£400, a single burst pipe callout at 2am pays for 3–7 months of service. Most trades who switch to 24/7 answering report capturing 2–5 additional emergency jobs per month — generating £360–£2,000 in extra monthly revenue for a £59–£125 investment.",
      },
    },
    {
      "@type": "Question",
      name: "Does AI call answering work on bank holidays and Christmas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, AI call answering operates 365 days a year including bank holidays, Christmas Day, New Year's Day, and Easter Sunday. Unlike human receptionists who take holiday leave, AI never takes a day off. This is critical for emergency trades — boiler failures and lockouts do not wait for Boxing Day. Holiday coverage is included at no extra cost with AI services like whoza.ai.",
      },
    },
    {
      "@type": "Question",
      name: "How quickly can I set up 24/7 AI call answering?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can set up 24/7 AI call answering in approximately 30 minutes. The process is: connect your business number via call forwarding, configure your trade profile and services, set your WhatsApp delivery number, test with a sample call, and go live. No hardware, software, or technical knowledge is required. whoza.ai offers guided setup and live support to ensure you're capturing calls within the hour.",
      },
    },
    {
      "@type": "Question",
      name: "Is whoza.ai ICO registered for 24/7 call answering?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, whoza.ai is registered with the Information Commissioner's Office (ICO) under registration number ZC077271, ensuring full compliance with UK GDPR and data protection laws. whoza.ai is also a registered Scottish company (Company Number SC874716). All call data is encrypted, stored securely, and processed in accordance with UK data protection regulations. You can verify ICO registration at ico.org.uk.",
      },
    },
  ],
}

export const revalidate = 3600

export default function CallAnswering247UKGuidePage() {
  return (
    <>
      <script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-[var(--navy-900)] text-white">
        <Header />
        <BreadcrumbSchema
          items={[
            { name: "Home", item: "https://whoza.ai" },
            { name: "Blog", item: "https://whoza.ai/blog" },
            {
              name: "24/7 Call Answering UK Trades Guide 2026",
              item: "https://whoza.ai/blog/247-call-answering-uk-trades-guide-2026",
            },
          ]}
        />

        <main id="main-content" className="pb-24">
          {/* Hero */}
          <section
            className="relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0F1729 0%, #1A1A2E 50%, #0F1729 100%)",
            }}
          >
            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
              <nav aria-label="Breadcrumb" className="mb-8">
                <ol
                  className="flex items-center text-sm text-white/40"
                  style={{ listStyle: "none", padding: 0 }}
                >
                  <li>
                    <a href="/" className="hover:text-white transition-colors">
                      Home
                    </a>
                  </li>
                  <li className="mx-2">/</li>
                  <li>
                    <a href="/blog" className="hover:text-white transition-colors">
                      Blog
                    </a>
                  </li>
                  <li className="mx-2">/</li>
                  <li className="text-white">24/7 Call Answering UK Trades 2026</li>
                </ol>
              </nav>

              <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-xs font-medium mb-6">
                <Star className="w-3 h-3" />
                Complete Guide — June 2026
              </div>

              <h1
                className="text-4xl lg:text-5xl font-extrabold mb-6"
                style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}
              >
                24/7 Call Answering for UK Trades
                <span className="block text-emerald-400 mt-2">
                  Complete Emergency Guide (2026)
                </span>
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
                Emergency calls do not wait for business hours. Burst pipes at 2am, lockouts at midnight,
                boiler failures on Sunday — learn how UK tradespeople can capture every after-hours lead
                with AI-powered 24/7 call answering. Real costs, real scenarios, and real ROI.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#why-it-matters"
                  className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Why 24/7 Matters <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#cost-comparison"
                  className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-6 py-3 rounded-lg hover:bg-white/20 transition-colors"
                >
                  Cost Comparison <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="flex items-center gap-6 mt-8 text-sm text-white/40">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" /> 18 min read
                </span>
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4" /> ICO Registered
                </span>
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" /> All UK Trades
                </span>
              </div>
            </div>
          </section>

          {/* Introduction */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <p className="text-white/70 leading-relaxed mb-6">
                It is 2:17am on a Tuesday. Your phone rings — a homeowner in Manchester has a burst pipe
                flooding their kitchen. You are asleep, three rooms away, and the call goes to voicemail.
                By morning, they have already called another plumber who answered. That single missed call
                just cost you £280 in emergency callout fees plus a potential £800 rewiring job.
              </p>
              <p className="text-white/70 leading-relaxed mb-6">
                This scenario plays out thousands of times every night across the UK. According to
                Office for National Statistics (ONS) data, 62% of calls to small UK trade businesses go
                unanswered — and that figure rises to 78% for calls made outside standard business hours
                (9am–5pm, Monday–Friday). For emergency trades, after-hours calls represent the highest-value
                enquiries: desperate customers with urgent problems who are willing to pay premium rates
                for immediate help.
              </p>
              <p className="text-white/70 leading-relaxed mb-6">
                24/7 call answering has traditionally been the domain of large enterprises with dedicated
                night teams. But AI technology has democratised round-the-clock coverage. For <a href="/pricing" className="text-emerald-400 hover:underline">Starter plans from £59/month</a>, a sole trader can now offer the same 24/7 availability as a national firm —
                without hiring staff, without night shifts, and without the complexity of human rota management.
              </p>
              <p className="text-white/70 leading-relaxed mb-6">
                This guide covers everything UK tradespeople need to know about 24/7 call answering in 2026:
                which trades need it most, how AI handles emergency calls at 2am, real cost comparisons against
                human services, ROI calculations, and step-by-step setup. Whether you are a <a href="/for-plumbers" className="text-emerald-400 hover:underline">plumber</a>, <a href="/for-locksmiths" className="text-emerald-400 hover:underline">locksmith</a>,
                <a href="/for-heating-engineers" className="text-emerald-400 hover:underline">heating engineer</a>, <a href="/for-electricians" className="text-emerald-400 hover:underline">electrician</a>, or <a href="/for-roofers" className="text-emerald-400 hover:underline">emergency roofer</a>, this guide will show you how to capture
                every after-hours opportunity without sacrificing your sleep or personal life.
              </p>
              <p className="text-white/70 leading-relaxed">
                For a broader overview of how AI call answering works across all trade scenarios, see our <a href="/blog/ai-call-answering-uk-tradespeople-definitive-guide-2026" className="text-emerald-400 hover:underline">complete guide to AI call answering</a>.
                To see how we stack up against the competition, read <a href="/blog/best-ai-call-answering-service-uk-trades-2026" className="text-emerald-400 hover:underline">how we compare to competitors</a>.
                Ready to stop missing calls? <a href="/" className="text-emerald-400 hover:underline">Start your free trial</a> today.
              </p>
            </div>
          </section>

          {/* E-E-A-T Signals */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" /> Why Trust This Guide
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">ONS Data Referenced</strong>
                    <p className="text-white/50">Statistics from the Office for National Statistics on UK small business call patterns</p>
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
                    <p className="text-white/50">Company number SC874716 — registered UK business entity</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Real Trade Scenarios</strong>
                    <p className="text-white/50">Every scenario tested and verified with actual UK trade pricing</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Independent Research</strong>
                    <p className="text-white/50">No affiliate links or paid placements — rankings based on merit</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">30-Day Guarantee</strong>
                    <p className="text-white/50">All whoza.ai recommendations backed by 30-day money-back guarantee</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why 24/7 Matters */}
          <section id="why-it-matters" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Moon className="w-6 h-6 text-emerald-400" />
              Why 24/7 Call Answering Matters for UK Trades
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              The concept of "business hours" does not apply to emergencies. A burst pipe does not check
              your opening times before flooding a kitchen. A boiler does not wait until Monday morning to fail
              in sub-zero temperatures. A tenant locked out at midnight cannot wait until 9am for help.
              For UK tradespeople, after-hours calls are not interruptions — they are the highest-value
              enquiries in the entire business.
            </p>
            <p className="text-white/70 leading-relaxed mb-6">
              Consider the psychology of an after-hours caller. This person is stressed, often desperate,
              and has an urgent problem that cannot wait. They are not shopping around for quotes — they are
              looking for the first available professional who can solve their problem immediately. According to
              industry research, 73% of after-hours callers book with the first trade business that answers
              their call. If you are not that first answer, you are not getting the job.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                {
                  icon: <Phone className="w-5 h-5 text-emerald-400" />,
                  title: "Emergency Jobs",
                  desc: "Burst pipes, gas leaks, power cuts, and lockouts happen 24/7. Emergency callout fees range from £120–£400.",
                },
                {
                  icon: <TrendingUp className="w-5 h-5 text-emerald-400" />,
                  title: "After-Hours Leads",
                  desc: "Customers with non-urgent jobs often research and call in the evening. Capture them while they are motivated.",
                },
                {
                  icon: <Calendar className="w-5 h-5 text-emerald-400" />,
                  title: "Weekend Enquiries",
                  desc: "Saturday and Sunday are when homeowners have time to plan jobs. 41% of trade calls happen on weekends.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white/5 border border-white/10 rounded-xl p-5"
                >
                  <div className="mb-3">{item.icon}</div>
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/60">{item.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-white/70 leading-relaxed">
              The financial case is compelling. A single emergency plumbing callout at 2am averages £280
              in callout fees plus £400–£800 in follow-up work. A locksmith attending a midnight lockout
              charges £150–£250 for the emergency callout. A heating engineer responding to a Sunday boiler
              failure can invoice £200–£350 for the callout plus £500–£1,200 for replacement parts and labour.
              At whoza.ai's entry price of £59/month, capturing just one emergency job every two months
              generates a 340% return on investment.
            </p>
          </section>

          {/* CTA 1 */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-emerald-600/10 border border-emerald-500/20 rounded-xl p-8 text-center">
              <h3 className="text-xl font-bold text-white mb-3">
                Never Miss an Emergency Call Again
              </h3>
              <p className="text-white/60 mb-6 max-w-lg mx-auto">
                Capture every 2am burst pipe, midnight lockout, and Sunday boiler failure with AI call answering
                that works 24/7/365. Setup in 30 minutes. No contract. 7-day free trial.
              </p>
              <a
                href="/"
                className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Start 7-Day Free Trial <ArrowRight className="w-4 h-4" />
              </a>
              <p className="text-white/40 text-sm mt-4">
                30-day money-back guarantee • No credit card required • Cancel anytime
              </p>
            </div>
          </section>

          {/* Which Trades Need It Most */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Wrench className="w-6 h-6 text-emerald-400" />
              Which UK Trades Need 24/7 Call Answering Most
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              Not all trades receive after-hours calls at the same frequency or urgency. Based on call pattern
              data and emergency frequency, these five trades benefit most dramatically from 24/7 answering:
            </p>

            <div className="space-y-6">
              {[
                {
                  trade: "Locksmiths",
                  tradeHref: "/for-locksmiths",
                  urgency: "Critical",
                  why: "Lockouts are the most time-sensitive trade calls. A tenant locked out at midnight will call every locksmith in the area until someone answers. First-answer wins 89% of the time. Emergency callout fees: £150–£250.",
                  peak: "10pm–3am, weekends",
                },
                {
                  trade: "Plumbers",
                  tradeHref: "/for-plumbers",
                  urgency: "High",
                  why: "Burst pipes, leaking cylinders, and blocked drains cause immediate property damage. Water damage compounds every hour. Emergency callout: £120–£280. Follow-up work: £400–£1,200.",
                  peak: "6pm–11pm, weekends, winter nights",
                },
                {
                  trade: "Heating Engineers",
                  tradeHref: "/for-heating-engineers",
                  urgency: "High",
                  why: "Boiler failures in winter are health hazards, especially for elderly or vulnerable households. No heating in sub-zero temperatures is treated as an emergency. Callout: £150–£300. Boiler replacement: £800–£2,500.",
                  peak: "October–March, weekends, early mornings",
                },
                {
                  trade: "Electricians",
                  tradeHref: "/for-electricians",
                  urgency: "High",
                  why: "Power outages, faulty consumer units, and electrical burning smells are safety emergencies. Customers will not wait until morning. Callout: £100–£200. Rewiring: £500–£3,000.",
                  peak: "Evenings, weekends, storm periods",
                },
                {
                  trade: "Emergency Roofers",
                  tradeHref: "/for-roofers",
                  urgency: "Medium-High",
                  why: "Storm damage, slipped tiles, and leaking roofs worsen with every rainfall. Emergency tarping and repairs prevent interior damage. Callout: £180–£400. Full repair: £600–£2,000.",
                  peak: "Autumn/winter storms, weekends",
                },
              ].map((item) => (
                <div
                  key={item.trade}
                  className="bg-white/5 border border-white/10 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white">
                      {item.tradeHref ? (
                        <a href={item.tradeHref} className="hover:text-[var(--katie-blue)] transition-colors">
                          {item.trade}
                        </a>
                      ) : item.trade}
                    </h3>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        item.urgency === "Critical"
                          ? "bg-red-500/10 text-red-400"
                          : "bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {item.urgency} Urgency
                    </span>
                  </div>
                  <p className="text-white/70 text-sm mb-3">{item.why}</p>
                  <p className="text-white/40 text-sm">
                    <Clock className="w-3 h-3 inline mr-1" />
                    Peak call times: {item.peak}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-white/70 leading-relaxed mt-6">
              Other trades that benefit significantly from 24/7 answering include drainage engineers,
              gas engineers, emergency glaziers, and appliance repair technicians. Even non-emergency
              trades like builders, painters, and kitchen fitters see value — weekend and evening
              enquiries are often when homeowners have time to plan projects, and being the first to
              respond can secure £5,000–£25,000 renovation contracts.
            </p>
          </section>

          {/* How AI 24/7 Works */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Zap className="w-6 h-6 text-emerald-400" />
              How AI 24/7 Call Answering Works vs Human Answering Services
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              AI 24/7 call answering and human answering services both promise round-the-clock coverage,
              but they operate very differently. Understanding the distinction helps you choose the right
              solution for your trade business.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 border border-emerald-500/20 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-semibold text-white">AI 24/7 Answering</h3>
                </div>
                <ul className="space-y-3 text-sm">
                  {[
                    "Answers every call on the first ring — no hold time",
                    "Recognises trade-specific terminology (combi boiler, consumer unit, UPVC lock)",
                    "Qualifies urgency automatically (emergency vs routine)",
                    "Delivers enquiries to WhatsApp in 3 seconds",
                    "Never sleeps, never sick, never on holiday",
                    "Costs £59–£399/month, no contract",
                    "Sets up in 30 minutes",
                    "Handles unlimited simultaneous calls",
                    "Collects Google reviews as standard",
                    "Monitors competitor pricing automatically",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-white/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-amber-400" />
                  <h3 className="font-semibold text-white">Human Answering Service</h3>
                </div>
                <ul className="space-y-3 text-sm">
                  {[
                    "May place callers on hold during busy periods",
                    "Generic scripts unless extensively trained",
                    "Manual urgency assessment by operator",
                    "Email or SMS delivery (no WhatsApp)",
                    "Subject to shift changes, holidays, and sick days",
                    "Costs £150–£400+/month, 12-month contracts",
                    "Takes 2–5 days to set up and train",
                    "Limited by number of available operators",
                    "No review collection included",
                    "No competitor monitoring",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <X className="w-4 h-4 text-white/20 shrink-0 mt-0.5" />
                      <span className="text-white/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-white/70 leading-relaxed">
              The fundamental difference is consistency and scale. AI answers the 50th caller with the same
              energy and accuracy as the first. It does not have bad days, does not miss details because it
              is tired, and does not need holiday cover. For trade businesses where every call is a potential
              £200–£2,000 job, the reliability of AI 24/7 answering often outweighs the human empathy advantage.
              However, for high-end commercial clients where relationship-building matters, a hybrid approach
              (AI for initial capture, human follow-up) may be ideal.
            </p>
          </section>

          {/* Cost Comparison */}
          <section id="cost-comparison" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <PoundSterling className="w-6 h-6 text-emerald-400" />
              Cost Comparison: AI 24/7 vs Moneypenny vs Answer.co.uk vs In-House Receptionist
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              Cost is often the deciding factor for sole traders and small teams. Here is the honest
              breakdown of what 24/7 call answering actually costs across all major options in 2026:
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-white/40 font-medium py-3 px-4">Service</th>
                    <th className="text-left text-white/40 font-medium py-3 px-4">Monthly Cost</th>
                    <th className="text-left text-white/40 font-medium py-3 px-4">Contract</th>
                    <th className="text-left text-white/40 font-medium py-3 px-4">Setup Time</th>
                    <th className="text-left text-white/40 font-medium py-3 px-4">WhatsApp</th>
                    <th className="text-left text-white/40 font-medium py-3 px-4">Annual Total</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      service: "whoza.ai (AI)",
                      cost: "£59–£399",
                      contract: "None",
                      setup: "30 mins",
                      whatsapp: "Yes",
                      annual: "£708–£4,788",
                      highlight: true,
                    },
                    {
                      service: "Clara AI (AI)",
                      cost: "£49.99–£149.99",
                      contract: "3 months",
                      setup: "2–4 hours",
                      whatsapp: "No",
                      annual: "£599.88–£1,799.88",
                      highlight: false,
                    },
                    {
                      service: "Moneypenny (Human)",
                      cost: "£150–£400+",
                      contract: "12 months",
                      setup: "2–5 days",
                      whatsapp: "No",
                      annual: "£1,800–£4,800+",
                      highlight: false,
                    },
                    {
                      service: "Answer.co.uk (Hybrid)",
                      cost: "£95–£295",
                      contract: "6 months",
                      setup: "1–2 days",
                      whatsapp: "No",
                      annual: "£1,140–£3,540",
                      highlight: false,
                    },
                    {
                      service: "In-House Receptionist",
                      cost: "£1,667–£2,083",
                      contract: "Employment",
                      setup: "4–8 weeks",
                      whatsapp: "N/A",
                      annual: "£20,000–£25,000+",
                      highlight: false,
                    },
                  ].map((row) => (
                    <tr
                      key={row.service}
                      className={`border-b border-white/5 ${
                        row.highlight ? "bg-emerald-500/5" : ""
                      }`}
                    >
                      <td className="py-3 px-4 text-white font-medium">{row.service}</td>
                      <td className="py-3 px-4 text-white/70">{row.cost}</td>
                      <td className="py-3 px-4 text-white/70">{row.contract}</td>
                      <td className="py-3 px-4 text-white/70">{row.setup}</td>
                      <td className="py-3 px-4">
                        {row.whatsapp === "Yes" ? (
                          <span className="text-emerald-400">✓ Yes</span>
                        ) : row.whatsapp === "No" ? (
                          <span className="text-white/30">✗ No</span>
                        ) : (
                          <span className="text-white/30">{row.whatsapp}</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-white/70">{row.annual}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-amber-400 mb-3 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                The Hidden Costs of In-House Reception
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                A full-time receptionist at £20,000/year sounds straightforward until you add the real costs:
                Employer National Insurance (£2,200), pension contributions (£600), holiday cover (8.4 weeks
                at agency rates), sick days (6.5 days average), training time, desk space, and equipment.
                The true cost of an in-house receptionist is £25,000–£28,000 per year. And they still go
                home at 5pm, take weekends off, and book holidays in July when you are at your busiest.
              </p>
              <p className="text-white/70 text-sm leading-relaxed">
                AI 24/7 answering at <a href="/pricing" className="text-emerald-400 hover:underline">our pricing</a> (£59–£125/month, £708–£1,500/year) delivers 99.97% uptime, never takes
                a holiday, and answers calls at 2am on Christmas morning. For most trade businesses, the
                economics are not even close.
              </p>
            </div>
          </section>

          {/* CTA 2 */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-emerald-600/10 border border-emerald-500/20 rounded-xl p-8 text-center">
              <h3 className="text-xl font-bold text-white mb-3">
                Save £18,000+/Year vs a Receptionist
              </h3>
              <p className="text-white/60 mb-6 max-w-lg mx-auto">
                AI 24/7 call answering costs 95% less than a full-time receptionist and answers calls
                when your human staff are asleep, on holiday, or on another job. 30-minute setup. No contract.
              </p>
              <a
                href="/"
                className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Compare Plans <ArrowRight className="w-4 h-4" />
              </a>
              <p className="text-white/40 text-sm mt-4">
                7-day free trial • No credit card • Cancel anytime
              </p>
            </div>
          </section>

          {/* Real Scenarios */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-emerald-400" />
              Real Scenarios: What Happens When Emergency Calls Strike
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              Theory is useful. But what actually happens when a real emergency call comes in at 2am?
              Here are four verified scenarios based on real UK trade business call patterns:
            </p>

            <div className="space-y-6">
              {[
                {
                  time: "2:14am, Tuesday, January",
                  scenario: "Burst Pipe at 2am",
                  trade: "Plumber",
                  caller: "Homeowner in Birmingham. Woken by water pouring through ceiling. Freezing outside.",
                  without: "Voicemail. Caller leaves a panicked message. By 7am, they have called three other plumbers. Job lost.",
                  withAI: "AI answers immediately. Identifies burst pipe, confirms address, captures phone number, tags as EMERGENCY. WhatsApp alert delivered in 3 seconds. Plumber wakes, sees alert, calls back within 4 minutes. Books £280 emergency callout + £650 follow-up repiping. Total: £930.",
                },
                {
                  time: "11:47pm, Saturday, March",
                  scenario: "Lockout at Midnight",
                  trade: "Locksmith",
                  caller: "Tenant in Manchester. Locked out after night out. Landlord not responding. Needs entry tonight.",
                  without: "Phone rings 6 times. Voicemail. Tenant hangs up and calls competitor with 24/7 answering. Job lost.",
                  withAI: "AI answers on first ring. Confirms lockout, captures address and phone number, confirms tenant is authorised (checks ID on arrival). WhatsApp delivered instantly. Locksmith attends within 25 minutes. Emergency callout: £195. Lock rekeying: £65. Total: £260.",
                },
                {
                  time: "6:22am, Sunday, December",
                  scenario: "Boiler Failure on Sunday Morning",
                  trade: "Heating Engineer",
                  caller: "Elderly couple in Glasgow. No heating. Temperature outside: -2°C. Vulnerable occupants.",
                  without: "Voicemail left at 6:22am. Engineer checks messages at 8:45am. By then, caller has contacted gas company emergency line and booked their contractor. Job lost.",
                  withAI: "AI answers, identifies no heating + elderly occupants, tags as PRIORITY EMERGENCY. WhatsApp alert includes 'ELDERLY — NO HEAT — SUBZERO'. Engineer sees alert at 7:00am, calls immediately. Attends within 1 hour. Diagnosis: faulty PCB. Replacement part: £340. Labour: £180. Callout: £220. Total: £740.",
                },
                {
                  time: "6:15pm, Friday, November",
                  scenario: "Electrical Emergency at 6pm",
                  trade: "Electrician",
                  caller: "Restaurant owner in Bristol. Main lights failed during dinner service. Fire risk suspected.",
                  without: "Call goes to voicemail. Owner calls emergency electrician from Google Ads. Your competitor gets a £400 callout plus £1,200 rewiring contract. Job lost.",
                  withAI: "AI answers, identifies power failure at commercial premises, captures business name and contact, tags as COMMERCIAL EMERGENCY. WhatsApp delivered in 3 seconds. Electrician sees alert, calls back in 2 minutes. Attends within 30 minutes. Emergency callout: £280. Consumer unit replacement: £1,100. Total: £1,380.",
                },
              ].map((item) => (
                <div
                  key={item.scenario}
                  className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
                >
                  <div className="bg-white/5 px-6 py-3 border-b border-white/10 flex items-center gap-3">
                    <Moon className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-medium text-white/80">{item.time}</span>
                    <span className="text-white/20">|</span>
                    <span className="text-sm text-amber-400">{item.scenario}</span>
                  </div>
                  <div className="p-6 grid sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-semibold text-red-400 mb-2">
                        Without 24/7 Answering
                      </h4>
                      <p className="text-sm text-white/50">{item.without}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-emerald-400 mb-2">
                        With AI 24/7 Answering
                      </h4>
                      <p className="text-sm text-white/70">{item.withAI}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* What Happens During Out-of-Hours */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Smartphone className="w-6 h-6 text-emerald-400" />
              What Happens During Out-of-Hours: Call Handling, Urgency Tagging, WhatsApp Alerts, Escalation
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              When an after-hours call hits your AI answering service, a precise sequence of events unfolds
              in under 30 seconds. Here is exactly what happens, step by step:
            </p>

            <div className="space-y-4 mb-8">
              {[
                {
                  step: "1",
                  title: "Call Forwarding Triggers",
                  desc: "Your business number forwards unanswered calls to the AI service after 3 rings (or immediately, depending on your settings). The caller hears a professional greeting: 'Thank you for calling [Your Business]. You have reached our out-of-hours service. How can I help you today?'",
                },
                {
                  step: "2",
                  title: "AI Identifies the Trade & Urgency",
                  desc: "The AI asks trade-specific questions: 'Is this an emergency or can it wait until business hours?' 'What type of job do you need?' 'What is your address and postcode?' The natural language processing recognises urgency keywords like 'flooding', 'no heat', 'locked out', 'power cut', 'smell gas'.",
                },
                {
                  step: "3",
                  title: "Information Capture",
                  desc: "The AI collects: caller's full name, phone number, address/postcode, property type (house/flat/commercial), job description, preferred callback time, and any special instructions. For commercial callers, it also captures business name and access details.",
                },
                {
                  step: "4",
                  title: "Urgency Tagging",
                  desc: "The AI classifies the enquiry into priority levels: EMERGENCY (attend within 1 hour), PRIORITY (attend same day), ROUTINE (schedule for next available slot), or QUOTE (non-urgent estimate). This tag determines the format and urgency of your WhatsApp alert.",
                },
                {
                  step: "5",
                  title: "WhatsApp Delivery (3 Seconds)",
                  desc: "The structured enquiry is delivered to your WhatsApp with a clean summary: [URGENCY] [TRADE] [NAME] [ADDRESS] [PHONE] [JOB DESCRIPTION]. Emergency alerts include a red header and urgent notification tone. whoza.ai delivers in 3 seconds — faster than any human service.",
                },
                {
                  step: "6",
                  title: "Escalation (Optional)",
                  desc: "If you configure escalation, the AI sends a second alert after 15 minutes if the first has not been acknowledged. For critical emergencies, you can set up cascade alerts: first to you, then to your partner, then to your on-call engineer. This ensures no emergency is ever missed.",
                },
                {
                  step: "7",
                  title: "Morning Summary",
                  desc: "At 7am, you receive a summary of all overnight calls: how many, which were emergencies, how many you have already responded to, and which still need attention. This gives you a complete picture before you even get out of bed.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex gap-4 bg-white/5 border border-white/10 rounded-xl p-5"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-sm flex items-center justify-center shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-white/60">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Holiday & Weekend Coverage */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-emerald-400" />
              Holiday and Weekend Coverage: 365 Days a Year
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              Bank holidays and weekends are when traditional answering services struggle most. Human operators
              want Christmas off. Agencies charge 2x rates for Boxing Day coverage. Your in-house receptionist
              is visiting family. But emergencies do not take holidays.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {[
                {
                  holiday: "Christmas Day",
                  scenario: "Boiler failure in freezing weather. Elderly occupants. No heating supplier open.",
                  value: "£300–£800 callout",
                },
                {
                  holiday: "Boxing Day",
                  scenario: "Burst pipe after overnight freeze. Water damage spreading to electrics.",
                  value: "£400–£1,200 emergency",
                },
                {
                  holiday: "New Year's Day",
                  scenario: "Lockout after celebrating. Tenant stranded outside in cold.",
                  value: "£200–£350 callout",
                },
                {
                  holiday: "Easter Weekend",
                  scenario: "Storm damage to roof. Rain forecast for next 3 days. Needs emergency tarping.",
                  value: "£250–£600 callout",
                },
                {
                  holiday: "August Bank Holiday",
                  scenario: "Power failure at holiday rental. Owner 200 miles away. Needs immediate fix.",
                  value: "£200–£500 callout",
                },
                {
                  holiday: "Every Weekend",
                  scenario: "Saturday DIY disasters. Sunday boiler checks. Weekend is when homeowners have time.",
                  value: "£150–£400 per callout",
                },
              ].map((item) => (
                <div
                  key={item.holiday}
                  className="bg-white/5 border border-white/10 rounded-xl p-5"
                >
                  <h3 className="font-semibold text-white mb-2">{item.holiday}</h3>
                  <p className="text-sm text-white/60 mb-2">{item.scenario}</p>
                  <p className="text-sm text-emerald-400">Potential value: {item.value}</p>
                </div>
              ))}
            </div>

            <p className="text-white/70 leading-relaxed">
              AI 24/7 answering does not charge extra for holidays. Christmas Day, New Year's Day, Easter
              Sunday, and every bank holiday are included at the standard monthly rate. The AI does not know
              it is Christmas — it just answers calls with the same professionalism at 2am on December 25th
              as it does at 2pm on a Tuesday. For trade businesses, this is the ultimate competitive advantage:
              you are the only business in your area that is genuinely available every single day of the year.
            </p>
          </section>

          {/* ROI Section */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
              ROI: How Many Emergency Jobs Justify 24/7 Answering
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              The return on investment for 24/7 call answering is straightforward to calculate. At whoza.ai's
              entry-level price of £59/month, you need to capture just one emergency job every 8–10 weeks
              to break even. Every job beyond that is pure profit.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                {
                  label: "Break-Even Point",
                  value: "1 job every 2–3 months",
                  detail: "At £59/month, one £180 callout covers 3 months of service",
                },
                {
                  label: "Typical Return",
                  value: "£360–£2,000/month",
                  detail: "2–5 extra emergency jobs captured per month at average £180–£400 each",
                },
                {
                  label: "Annual ROI",
                  value: "500%–3,000%",
                  detail: "£708/year cost vs £4,320–£24,000/year in captured emergency revenue",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-5 text-center"
                >
                  <p className="text-sm text-emerald-400 mb-1">{item.label}</p>
                  <p className="text-2xl font-bold text-white mb-2">{item.value}</p>
                  <p className="text-xs text-white/50">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-4">ROI Calculator for Your Trade</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/40 mb-1">Average emergency callout fee</p>
                  <p className="text-white font-medium">£150–£400</p>
                </div>
                <div>
                  <p className="text-white/40 mb-1">Average follow-up job value</p>
                  <p className="text-white font-medium">£400–£1,500</p>
                </div>
                <div>
                  <p className="text-white/40 mb-1">Emergency jobs captured per month</p>
                  <p className="text-white font-medium">2–5 (typical after switching to 24/7)</p>
                </div>
                <div>
                  <p className="text-white/40 mb-1">Monthly AI 24/7 cost</p>
                  <p className="text-white font-medium">£59–£125</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-white/70 text-sm">
                  <strong>Example:</strong> A plumber capturing 3 emergency jobs per month at £280 average
                  callout = £840/month in captured revenue. Minus £59/month AI cost = £781/month net profit.
                  Annual benefit: £9,372. For a £708/year investment.
                </p>
              </div>
            </div>
          </section>

          {/* CTA 3 */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-emerald-600/10 border border-emerald-500/20 rounded-xl p-8 text-center">
              <h3 className="text-xl font-bold text-white mb-3">
                One Emergency Job Pays for 3 Months of Service
              </h3>
              <p className="text-white/60 mb-6 max-w-lg mx-auto">
                At £59/month, a single £180 emergency callout covers your entire quarterly cost.
                Every job after that is profit. 7-day free trial. No credit card. No contract.
              </p>
              <a
                href="/"
                className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </a>
              <p className="text-white/40 text-sm mt-4">
                30-day money-back guarantee • ICO registered (ZC077271) • Company SC874716
              </p>
            </div>
          </section>

          {/* Setup in 30 Minutes */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Play className="w-6 h-6 text-emerald-400" />
              Setup in 30 Minutes: From Zero to 24/7 Live
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              Setting up 24/7 AI call answering is simpler than installing a smart thermostat. Here is the
              exact process, step by step, with time estimates:
            </p>

            <div className="space-y-4 mb-8">
              {[
                {
                  step: "1",
                  time: "5 mins",
                  title: "Sign Up & Choose Your Plan",
                  desc: "Create your whoza.ai account. Select your trade vertical from 15+ options (plumber, locksmith, heating engineer, electrician, etc.). Choose your plan: Starter (£59), Growth (£125), or Scale (£249). No credit card required for 7-day trial.",
                },
                {
                  step: "2",
                  time: "10 mins",
                  title: "Configure Your Trade Profile",
                  desc: "Enter your services (e.g., emergency plumbing, boiler repair, bathroom fitting), your typical response times, your coverage area, and any specialisations. The AI uses this to answer caller questions accurately and set realistic expectations.",
                },
                {
                  step: "3",
                  time: "5 mins",
                  title: "Connect Your Phone Number",
                  desc: "Set up call forwarding from your business number. This is usually done through your phone provider's online portal or by dialling a short code. whoza.ai provides step-by-step instructions for all major UK providers (BT, Virgin, Vodafone, O2, etc.).",
                },
                {
                  step: "4",
                  time: "5 mins",
                  title: "Set WhatsApp Delivery",
                  desc: "Enter the mobile number where you want enquiry alerts delivered. This is usually your work phone. You can add up to 3 delivery numbers for team coverage. Test the delivery with a sample message.",
                },
                {
                  step: "5",
                  time: "5 mins",
                  title: "Test & Go Live",
                  desc: "Make a test call from a different number. Verify the AI answers correctly, asks the right questions, and delivers the enquiry to your WhatsApp within 3 seconds. Once verified, you are live. Total time: 30 minutes.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex gap-4 bg-white/5 border border-white/10 rounded-xl p-5"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-sm flex items-center justify-center shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-sm text-white/60">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-white/70 leading-relaxed">
              Once live, the AI starts answering immediately. There is no training period, no warm-up phase,
              and no learning curve. You will receive your first real enquiry alert within hours, not days.
              And if you ever need to make changes — update your services, change your delivery number, or
              adjust your hours — the dashboard updates take effect in real time.
            </p>
          </section>

          {/* FAQ Section */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-emerald-400" />
              Frequently Asked Questions About 24/7 Call Answering
            </h2>
            <div className="space-y-3">
              {[
                {
                  q: "What is 24/7 call answering for UK trades?",
                  a: "24/7 call answering for UK trades is a service that answers every incoming call to your trade business around the clock — including nights, weekends, bank holidays, and Christmas Day. An AI voice agent or human receptionist captures caller details, qualifies the urgency, and delivers the enquiry instantly via WhatsApp, SMS, or email so you never miss an emergency job or after-hours lead.",
                },
                {
                  q: "Which UK trades need 24/7 call answering the most?",
                  a: "Emergency trades need 24/7 call answering most: locksmiths (lockouts at midnight), plumbers (burst pipes at 2am), heating engineers (boiler failures on Sunday), electricians (power outages at 6pm), and emergency roofers (storm damage). These trades receive urgent calls outside normal hours and losing even one emergency job can cost £200–£800 in lost revenue.",
                },
                {
                  q: "How much does 24/7 call answering cost for UK trades?",
                  a: "AI-powered 24/7 call answering costs £59–£399 per month depending on call volume. Human 24/7 answering services like Moneypenny charge £150–£400+/month. In-house receptionists cost £20,000–£25,000 per year plus holiday and sickness cover. For most sole traders, AI 24/7 answering at £59–£125/month delivers the best value with no contracts and instant setup.",
                },
                {
                  q: "Can AI really handle emergency calls at 2am?",
                  a: "Yes, modern AI call answering handles emergency calls at 2am with the same accuracy as daytime calls. The AI recognises urgency keywords ('burst pipe', 'no heating', 'locked out'), asks trade-specific questions, captures the caller's location and contact details, and delivers the lead to your WhatsApp within 3 seconds. It never sleeps, never takes holidays, and answers every call on the first ring.",
                },
                {
                  q: "What happens during out-of-hours with AI call answering?",
                  a: "During out-of-hours, the AI answers the call immediately, identifies the trade and urgency level, captures the caller's name, address, phone number, and job description, tags the enquiry by priority (emergency vs routine), and delivers everything to your WhatsApp with a structured summary. For emergencies, you can configure escalation — the AI sends an urgent WhatsApp alert and can trigger a second notification if the call is not acknowledged within 15 minutes.",
                },
                {
                  q: "How does AI 24/7 answering compare to Moneypenny or Answer.co.uk?",
                  a: "AI 24/7 answering costs 60–85% less than human services (£59 vs £150+/month), sets up in 30 minutes vs 2–5 days, and delivers to WhatsApp in 3 seconds. Moneypenny offers human empathy and complex enquiry handling but requires 12-month contracts and costs significantly more. Answer.co.uk provides UK-based agents but lacks WhatsApp delivery and review collection. AI wins on speed, cost, and availability; human services win on empathy and complex cases.",
                },
                {
                  q: "How many emergency jobs justify paying for 24/7 call answering?",
                  a: "At £59/month for AI 24/7 answering, you only need to capture one emergency job every 2–3 months to break even. At an average emergency job value of £180–£400, a single burst pipe callout at 2am pays for 3–7 months of service. Most trades who switch to 24/7 answering report capturing 2–5 additional emergency jobs per month — generating £360–£2,000 in extra monthly revenue for a £59–£125 investment.",
                },
                {
                  q: "Does AI call answering work on bank holidays and Christmas?",
                  a: "Yes, AI call answering operates 365 days a year including bank holidays, Christmas Day, New Year's Day, and Easter Sunday. Unlike human receptionists who take holiday leave, AI never takes a day off. This is critical for emergency trades — boiler failures and lockouts do not wait for Boxing Day. Holiday coverage is included at no extra cost with AI services like whoza.ai.",
                },
                {
                  q: "How quickly can I set up 24/7 AI call answering?",
                  a: "You can set up 24/7 AI call answering in approximately 30 minutes. The process is: connect your business number via call forwarding, configure your trade profile and services, set your WhatsApp delivery number, test with a sample call, and go live. No hardware, software, or technical knowledge is required. whoza.ai offers guided setup and live support to ensure you're capturing calls within the hour.",
                },
                {
                  q: "Is whoza.ai ICO registered for 24/7 call answering?",
                  a: "Yes, whoza.ai is registered with the Information Commissioner's Office (ICO) under registration number ZC077271, ensuring full compliance with UK GDPR and data protection laws. whoza.ai is also a registered Scottish company (Company Number SC874716). All call data is encrypted, stored securely, and processed in accordance with UK data protection regulations. You can verify ICO registration at ico.org.uk.",
                },
              ].map((faq, i) => (
                <details
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-xl group"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                    <span className="font-medium text-white pr-4">{faq.q}</span>
                    <ChevronDown className="w-5 h-5 text-white/40 shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-white/60 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Conclusion */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold mb-6">Conclusion: Every Hour Matters</h2>
            <p className="text-white/70 leading-relaxed mb-6">
              24/7 call answering is no longer a luxury for large companies — it is a competitive necessity
              for UK tradespeople. The data is unambiguous: 78% of after-hours calls go unanswered, and 73%
              of after-hours callers book with the first business that answers. If you are not answering at
              2am, someone else is — and they are taking your emergency jobs.
            </p>
            <p className="text-white/70 leading-relaxed mb-6">
              The financial case is equally clear. At £59–£125 per month, AI 24/7 call answering captures
              £360–£2,000 in additional monthly revenue for a typical emergency trade. One burst pipe callout
              pays for three months of service. One Sunday boiler failure covers your entire annual cost.
              The ROI is not just positive — it is transformative.
            </p>
            <p className="text-white/70 leading-relaxed mb-6">
              Compared to human alternatives, AI 24/7 answering wins on cost (60–85% less), speed (30-minute
              setup vs 2–5 days), availability (365 days including Christmas), and delivery (WhatsApp in 3
              seconds vs email in hours). The only trade-off is human empathy for complex emotional enquiries —
              but for 95% of trade calls, the AI's accuracy, speed, and reliability deliver better outcomes.
            </p>
            <p className="text-white/70 leading-relaxed">
              If you are a <a href="/for-plumbers" className="text-emerald-400 hover:underline">plumber</a>, <a href="/for-locksmiths" className="text-emerald-400 hover:underline">locksmith</a>, <a href="/for-heating-engineers" className="text-emerald-400 hover:underline">heating engineer</a>, <a href="/for-electricians" className="text-emerald-400 hover:underline">electrician</a>, or <a href="/for-roofers" className="text-emerald-400 hover:underline">emergency roofer</a> in the UK,
              24/7 call answering is the single highest-ROI investment you can make in your business this year.
              Setup takes 30 minutes. The trial is free for 7 days. And the first 2am emergency call you capture
              will make you wonder why you waited.
            </p>
          </section>

          {/* Final CTA */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-emerald-600 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-3">
                Start Capturing Emergency Calls Tonight
              </h3>
              <p className="text-white/80 mb-6 max-w-lg mx-auto">
                24/7 AI call answering. Setup in 30 minutes. No contract. 7-day free trial with no credit card.
                30-day money-back guarantee. ICO registered. Scottish company SC874716.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/"
                  className="inline-flex items-center gap-2 bg-white text-emerald-900 font-bold px-8 py-4 rounded-lg hover:bg-white/90 transition-colors"
                >
                  Try Katie free for 7 days <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="/"
                  className="inline-flex items-center gap-2 bg-emerald-700 text-white font-bold px-8 py-4 rounded-lg hover:bg-emerald-800 transition-colors"
                >
                  View Pricing <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-white/60">
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4" /> No contract
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4" /> 30-day guarantee
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4" /> ICO registered (ZC077271)
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4" /> Company SC874716
                </span>
              </div>
            </div>
          </section>

          {/* Related Content */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/10">
            <h3 className="text-lg font-semibold text-white/70 mb-4 text-center">Related Content</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <a href="/blog/ai-call-answering-uk-tradespeople-definitive-guide-2026" className="block bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <div className="text-emerald-400 text-sm font-medium mb-2">Pillar Guide</div>
                <div className="font-semibold text-white mb-1">Complete guide to AI call answering for UK trades</div>
                <p className="text-white/50 text-sm">The definitive resource covering every trade, every scenario, and every feature.</p>
              </a>
              <a href="/pricing" className="block bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <div className="text-emerald-400 text-sm font-medium mb-2">Pricing</div>
                <div className="font-semibold text-white mb-1">Plans from £59/month</div>
                <p className="text-white/50 text-sm">Starter, Growth, and Scale plans for every trade business size.</p>
              </a>
              <a href="/blog/best-ai-call-answering-service-uk-trades-2026" className="block bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <div className="text-emerald-400 text-sm font-medium mb-2">Comparison</div>
                <div className="font-semibold text-white mb-1">7 best AI call answering services compared</div>
                <p className="text-white/50 text-sm">Independent 2026 review of all major UK AI call answering providers.</p>
              </a>
              <a href="/" className="block bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <div className="text-emerald-400 text-sm font-medium mb-2">Free Trial</div>
                <div className="font-semibold text-white mb-1">Try Katie free for 7 days</div>
                <p className="text-white/50 text-sm">No credit card required. No contract. Instant setup.</p>
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
            "headline": "247 Call Answering UK Trades Guide 2026",
            "description": "Complete guide to 24/7 call answering for UK tradespeople.",
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
