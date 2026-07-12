import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { FAQPageSchema } from "@/components/whoza/faq-schema"
import { ArrowRight, Star, Clock, Shield, TrendingUp , Calendar, User } from "lucide-react"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "AI Receptionist vs Human: 2026 Cost Guide | Whoza",
  description: "AI receptionist vs human: cost comparison for UK trades. £59/month vs £25K/year. Speed, accuracy, and availability compared. Read the analysis.",
  keywords: [
    "AI receptionist cost UK",
    "human receptionist cost UK trades",
    "AI vs human receptionist 2026",
    "receptionist cost comparison",
    "AI call answering ROI",
    "trade business receptionist",
  ],
  openGraph: {
    type: "article",
    locale: "en_GB",
    url: "https://whoza.ai/blog/ai-receptionist-vs-human-cost-guide-2026",
    siteName: "Whoza.ai",
    title: "AI Receptionist vs Human Receptionist: 2026 Cost Guide",
    description: "AI receptionist vs human: cost comparison for UK trades. £59/month vs £25K/year. Speed, accuracy, and availability compared. Read the analysis.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "AI Receptionist vs Human Receptionist Cost Comparison 2026" }],
    publishedTime: "2026-06-25T00:00:00+00:00",
    modifiedTime: "2026-06-25T00:00:00+00:00",
    authors: [{ name: "Whoza" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "AI Receptionist vs Human Receptionist: 2026 Cost Guide",
    description: "AI receptionist vs human: cost comparison for UK trades. £59/month vs £25K/year. Speed, accuracy, and availability compared. Read the analysis.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  alternates: {
    canonical: "https://whoza.ai/blog/ai-receptionist-vs-human-cost-guide-2026",
  },
  robots: {
    index: true,
    follow: true,
  },
}

const faqs = [
  {
    q: "How much does a human receptionist cost UK trades in 2026?",
    a: "A full-time human receptionist costs UK trade businesses between £27,800 and £38,700 annually. This includes base salary (£22,000-£28,000), employer National Insurance (£2,200-£2,800), pension contributions (£600-£900), holiday and sick cover (£2,000-£3,000), training and management (£1,000-£2,000), and office space/equipment (£500-£1,500). The true cost is 1.25-1.4x the base salary.",
  },
  {
    q: "How much does an AI receptionist cost for UK trades?",
    a: "AI receptionists for UK trade businesses cost between £708 and £1,788 per year depending on call volume. Entry tier (£59/month) handles up to 100 minutes for sole traders. Standard tier (£99/month) covers 250 minutes for small teams. Professional tier (£149/month) offers unlimited minutes with advanced integrations. There are no additional costs for NI, pensions, holiday cover, or equipment.",
  },
  {
    q: "What is the ROI of an AI receptionist for trade businesses?",
    a: "AI receptionists deliver exceptional ROI for trade businesses. A typical plumber recovering 6.8 additional jobs per week at £105 expected value per call generates £37,128 in annual recovered revenue against a £708 service cost — a 5,148% ROI with payback in under 6 days. Even conservative scenarios (25% capture rate, £250 job value) produce 1,773% ROI.",
  },
  {
    q: "Can an AI receptionist handle emergency trade calls?",
    a: "Yes. AI receptionists are particularly effective for emergency trade calls because they answer immediately 24/7, qualify urgency, capture contact details, and can escalate emergency calls to the on-call engineer via text or call transfer. Unlike human receptionists who work fixed hours, AI agents never miss an emergency call at midnight, weekends, or bank holidays.",
  },
  {
    q: "How quickly can I set up an AI receptionist?",
    a: "Most AI receptionist services are operational within 24 hours. The setup process involves: choosing your service tier, configuring your business details and qualification questions, diverting your existing phone number (1-2 hours), connecting your calendar, and making test calls to refine the experience. Providers typically offer 7-day free trials.",
  },
]

export const revalidate = 3600

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "Blog", item: "https://whoza.ai/blog" },
        { name: "AI Receptionist vs Human Receptionist: 2026 Cost Guide", item: "https://whoza.ai/blog/ai-receptionist-vs-human-cost-guide-2026" },
      ]} />
      <FAQPageSchema items={faqs.map(({ q, a }) => ({ question: q, answer: a }))} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <section className="mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            Cost Analysis — 2026 Data
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            AI Receptionist vs Human Receptionist: Complete 2026 Cost Guide for UK Trades
          </h1>

              <div className="flex flex-wrap items-center gap-4 text-white/40 text-sm mt-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Whoza</span>
                  <span className="text-white/30">— Research Team</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime="2026-06-25">2026-06-25</time>
                </div>
              </div>
              <div className="mt-2 text-white/30 text-sm">
                Last updated: <time dateTime="2026-06-25">2026-06-25</time>
              </div>
          <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-3xl">
            Published 25 June 2026 by <a href="/" className="text-emerald-400 hover:underline">Whoza</a>
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-white/50">
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 12 min read</span>
            <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> ICO Registered (ZC077271)</span>
            <span className="flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Updated June 2026</span>
          </div>
        </section>

        <article className="prose prose-lg max-w-none prose-invert">
          <h2>Introduction: The Cost Question Every Trade Business Faces</h2>
          <p>
            If you run a plumbing, electrical, roofing, or building business in the UK, you have probably asked yourself: should I hire a receptionist, or is there a better way to handle incoming calls? The decision has significant financial implications. A full-time human receptionist costs between £27,800 and £38,700 annually when all overhead is included. An <a href="/" className="text-emerald-400 hover:underline">AI receptionist</a> costs between £708 and £1,500 per year — a 94-98% reduction.
          </p>
          <p>
            This guide provides a comprehensive, data-driven comparison of human and AI receptionists for UK trade businesses in 2026. We examine real costs, features, ROI, and implementation considerations to help you make an informed decision. These figures are backed by independent research. Our <a href="/research/the-true-cost-of-missed-calls-2026" className="text-emerald-400 hover:underline">UK Trades Industry Financial Impact Report</a> draws on data from Replicant AI, BT Business, and the Federation of Small Businesses to quantify the missed call crisis.
          </p>

          <h2>Cost Comparison at a Glance</h2>
          <p>Before diving into detail, here is the headline comparison:</p>

          <div className="overflow-x-auto my-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-emerald-500/5 border-b-2 border-emerald-500/30">
                  <th className="text-left p-3 font-semibold text-white">Cost Factor</th>
                  <th className="text-left p-3 font-semibold text-white">Human Receptionist</th>
                  <th className="text-left p-3 font-semibold text-white">AI Receptionist</th>
                </tr>
              </thead>
              <tbody className="text-white/80">
                <tr className="border-b border-white/5"><td className="p-3">Annual base salary</td><td className="p-3">£22,000 – £28,000</td><td className="p-3">£708 – £1,500</td></tr>
                <tr className="border-b border-white/5 bg-white/5"><td className="p-3">Employer NI (13.8%)</td><td className="p-3">£2,200 – £2,800</td><td className="p-3 text-emerald-400">Included</td></tr>
                <tr className="border-b border-white/5"><td className="p-3">Auto-enrolment pension</td><td className="p-3">£600 – £900</td><td className="p-3 text-emerald-400">Included</td></tr>
                <tr className="border-b border-white/5 bg-white/5"><td className="p-3">Holiday / sick cover</td><td className="p-3">£2,000 – £3,000</td><td className="p-3 text-emerald-400">Included (24/7)</td></tr>
                <tr className="border-b border-white/5"><td className="p-3">Training &amp; management</td><td className="p-3">£1,000 – £2,000</td><td className="p-3 text-emerald-400">None</td></tr>
                <tr className="border-b border-white/5 bg-white/5"><td className="p-3">Office space &amp; equipment</td><td className="p-3">£500 – £1,500</td><td className="p-3 text-emerald-400">None</td></tr>
                <tr className="border-b-2 border-emerald-500/30 font-semibold text-white"><td className="p-3">Total annual cost</td><td className="p-3">£27,800 – £38,700</td><td className="p-3">£708 – £1,500</td></tr>
                <tr className="font-semibold text-white"><td className="p-3">Cost per call answered</td><td className="p-3">£2.40 – £3.30</td><td className="p-3">£0.08 – £0.15</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Human Receptionist: The True Total Cost</h2>
          <h3>Base Salary and Direct Costs</h3>
          <p>
            The advertised salary for a UK receptionist ranges from £22,000 to £28,000 depending on location and experience (Indeed UK, 2026; Reed.co.uk, 2026). London-based receptionists command salaries at the upper end, while regional businesses may pay slightly less. However, the salary is only the beginning.
          </p>
          <p>
            Employer National Insurance contributions add 13.8% on earnings above the secondary threshold, equating to approximately £2,200-£2,800 annually. Auto-enrolment pension contributions add a further 3% of qualifying earnings, or £600-£900 per year (GOV.UK, 2025).
          </p>

          <h3>Hidden Costs That Add Up</h3>
          <p>The hidden costs of employing a receptionist are substantial:</p>
          <ul>
            <li>Holiday and sick cover: £2,000-£3,000 annually through temporary staff or overtime.</li>
            <li>Training and management: £1,000-£2,000 in the first year with recurring costs.</li>
            <li>Office space and equipment: Desk, computer, phone system, and software licenses — £500-£1,500.</li>
            <li>Recruitment: When turnover occurs, fees equal 15-20% of annual salary (£3,300-£5,600).</li>
          </ul>
          <p>
            The Federation of Small Businesses estimates that the true cost of employment is 1.25-1.4 times base salary when all factors are included (FSB, 2025). For a receptionist on £25,000, the real annual cost is £31,250-£35,000.
          </p>

          <h3>Capacity Limitations</h3>
          <p>
            A single human receptionist can handle one call at a time. During busy periods, calls go to voicemail or ring out. A receptionist works 40 hours per week — no coverage exists for evenings, weekends, or bank holidays. For trade businesses where emergencies happen outside 9-to-5, this creates a structural gap that directly costs revenue.
          </p>

          <h2>AI Receptionist: What You Actually Pay</h2>
          <h3>Transparent Pricing</h3>
          <p>AI receptionist services for UK trade businesses typically charge a flat monthly fee:</p>
          <ul>
            <li><strong>Entry tier:</strong> £59/month (£708/year) — up to 100 minutes, sole traders.</li>
            <li><strong>Standard tier:</strong> £99/month (£1,188/year) — up to 250 minutes, small teams.</li>
            <li><strong>Professional tier:</strong> £149/month (£1,788/year) — unlimited, multi-user, advanced integrations.</li>
          </ul>
          <p>
            There are no additional costs. National Insurance, pension, holiday cover, sick cover, training, and equipment are all irrelevant. The price quoted is the price paid. See <a href="/pricing" className="text-emerald-400 hover:underline">our pricing page</a> for current plans.
          </p>

          <h2>Feature Comparison</h2>
          <div className="overflow-x-auto my-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-emerald-500/5 border-b-2 border-emerald-500/30">
                  <th className="text-left p-3 font-semibold text-white">Feature</th>
                  <th className="text-left p-3 font-semibold text-white">Human</th>
                  <th className="text-left p-3 font-semibold text-white">Virtual Service</th>
                  <th className="text-left p-3 font-semibold text-white">AI</th>
                </tr>
              </thead>
              <tbody className="text-white/80">
                <tr className="border-b border-white/5"><td className="p-3">24/7 availability</td><td className="p-3">No</td><td className="p-3">Yes</td><td className="p-3 text-emerald-400">Yes</td></tr>
                <tr className="border-b border-white/5 bg-white/5"><td className="p-3">Multiple simultaneous calls</td><td className="p-3">No</td><td className="p-3">Limited</td><td className="p-3 text-emerald-400">Unlimited</td></tr>
                <tr className="border-b border-white/5"><td className="p-3">Call qualification</td><td className="p-3">Variable</td><td className="p-3">Basic</td><td className="p-3 text-emerald-400">Advanced</td></tr>
                <tr className="border-b border-white/5 bg-white/5"><td className="p-3">Instant transcript</td><td className="p-3">No</td><td className="p-3">Summary only</td><td className="p-3 text-emerald-400">Full transcript</td></tr>
                <tr className="border-b border-white/5"><td className="p-3">Multi-language</td><td className="p-3">Depends on hire</td><td className="p-3">Limited</td><td className="p-3 text-emerald-400">40+ languages</td></tr>
                <tr className="border-b border-white/5 bg-white/5"><td className="p-3">Annual cost</td><td className="p-3">£27,800-£38,700</td><td className="p-3">£5,000-£12,000</td><td className="p-3 text-emerald-400">£708-£1,500</td></tr>
              </tbody>
            </table>
          </div>

          <h2>ROI Analysis: Real Numbers for Trade Businesses</h2>
          <p>
            Return on investment for AI receptionists is exceptionally high. Consider a typical <a href="/for-plumbers" className="text-emerald-400 hover:underline">plumber</a> receiving 40 calls per week:
          </p>
          <ul>
            <li>Current missed calls: 34% of 40 = 13.6 calls missed weekly (industry average).</li>
            <li>Value per call: £350 average job × 30% conversion = £105 expected value.</li>
            <li>Recovered calls: AI captures 50% of previously missed = 6.8 additional jobs/week.</li>
            <li>Weekly recovered revenue: 6.8 × £105 = £714.</li>
            <li>Annual recovered revenue: £714 × 52 = £37,128.</li>
            <li>AI service cost: £708/year.</li>
            <li><strong>ROI: 5,148%. Payback period: 5.5 days.</strong></li>
          </ul>

          <h2>Which Trades Benefit Most?</h2>
          <p>
            <a href="/for-plumbers" className="text-emerald-400 hover:underline">Plumbers</a>, <a href="/for-electricians" className="text-emerald-400 hover:underline">electricians</a>, <a href="/for-roofers" className="text-emerald-400 hover:underline">roofers</a>, and <a href="/for-builders" className="text-emerald-400 hover:underline">builders</a> all benefit significantly. Emergency trades see the highest returns because callers with urgent problems do not wait — they call the next number. <a href="/for-heating-engineers" className="text-emerald-400 hover:underline">Heating engineers</a> and <a href="/for-locksmiths" className="text-emerald-400 hover:underline">locksmiths</a> capture high-value emergency work that would otherwise go to competitors.
          </p>

          <h2>Making the Switch: Implementation Guide</h2>
          <p>Switching to an AI receptionist is straightforward. Most services are operational within 24 hours:</p>
          <ol>
            <li><strong>Choose your service tier</strong> — Estimate monthly call volume. Entry tier (£59/month) suits sole traders with 20-30 weekly calls.</li>
            <li><strong>Configure your AI agent</strong> — Set up business details, services, coverage areas, and qualification questions.</li>
            <li><strong>Connect your phone number</strong> — Forward your existing number to the AI service (1-2 hours).</li>
            <li><strong>Integrate your calendar</strong> — Connect Google Calendar or your scheduling tool.</li>
            <li><strong>Test and refine</strong> — Make test calls, adjust greetings and escalation rules.</li>
          </ol>

          <h2>Conclusion</h2>
          <p>
            For UK trade businesses, the economic case for AI receptionists is overwhelming. A 94% cost reduction combined with superior capability — 24/7 coverage, unlimited calls, intelligent qualification — makes this one of the highest-ROI investments available to small businesses.
          </p>
          <p>
            The average trade business loses £50,000-£80,000 annually to missed calls. An AI receptionist costing £708 per year can recover a significant portion of that lost revenue while eliminating the administrative burden of voicemail management.
          </p>
          <p>
            With most providers offering 7-day free trials, the only question is: how many calls will you miss before making the switch? <a href="/pricing" className="text-emerald-400 hover:underline">View our pricing</a> and start your free trial today.
          </p>
        </article>

        {/* FAQ Section for visual display + anchor targets */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-3xl font-bold mb-8 text-white">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div id="faq-human-cost">
              <h3 className="font-semibold text-lg mb-2 text-white">How much does a human receptionist cost UK trades in 2026?</h3>
              <p className="text-white/70">
                A full-time human receptionist costs UK trade businesses between £27,800 and £38,700 annually. This includes base salary (£22,000-£28,000), employer National Insurance (£2,200-£2,800), pension contributions (£600-£900), holiday and sick cover (£2,000-£3,000), training and management (£1,000-£2,000), and office space/equipment (£500-£1,500).
              </p>
            </div>

            <div id="faq-ai-cost">
              <h3 className="font-semibold text-lg mb-2 text-white">How much does an AI receptionist cost for UK trades?</h3>
              <p className="text-white/70">
                AI receptionists for UK trade businesses cost between £708 and £1,788 per year depending on call volume. Entry tier (£59/month) handles up to 100 minutes. Standard tier (£99/month) covers 250 minutes. Professional tier (£149/month) offers unlimited minutes with advanced integrations.
              </p>
            </div>

            <div id="faq-roi">
              <h3 className="font-semibold text-lg mb-2 text-white">What is the ROI of an AI receptionist for trade businesses?</h3>
              <p className="text-white/70">
                AI receptionists deliver exceptional ROI. A typical plumber recovering 6.8 additional jobs per week generates £37,128 in annual recovered revenue against a £708 service cost — a 5,148% ROI with payback in under 6 days.
              </p>
            </div>

            <div id="faq-emergency">
              <h3 className="font-semibold text-lg mb-2 text-white">Can an AI receptionist handle emergency trade calls?</h3>
              <p className="text-white/70">
                Yes. AI receptionists answer immediately 24/7, qualify urgency, capture contact details, and can escalate emergency calls to the on-call engineer via text or call transfer.
              </p>
            </div>

            <div id="faq-setup">
              <h3 className="font-semibold text-lg mb-2 text-white">How quickly can I set up an AI receptionist?</h3>
              <p className="text-white/70">
                Most AI receptionist services are operational within 24 hours. The setup involves choosing your tier, configuring your agent, connecting your phone number, integrating your calendar, and testing.
              </p>
            </div>
          </div>
        </section>

        {/* Related Content */}
        <section className="mt-16 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-white">Related Guides</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <a href="/blog/ai-call-answering-uk-tradespeople-definitive-guide-2026" className="group block bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-5 transition-colors">
              <h3 className="font-semibold mb-2 group-hover:text-emerald-400 transition-colors text-white">AI Call Answering Definitive Guide</h3>
              <p className="text-sm text-white/60">Complete 2026 guide to how AI call answering works for UK trades.</p>
            </a>
            <a href="/blog/ai-call-answering-pricing-guide-uk-2026" className="group block bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-5 transition-colors">
              <h3 className="font-semibold mb-2 group-hover:text-emerald-400 transition-colors text-white">Pricing Guide 2026</h3>
              <p className="text-sm text-white/60">Detailed breakdown of AI call answering costs and ROI calculations.</p>
            </a>
            <a href="/blog/247-call-answering-uk-trades-guide-2026" className="group block bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-5 transition-colors">
              <h3 className="font-semibold mb-2 group-hover:text-emerald-400 transition-colors text-white">24/7 Emergency Call Handling</h3>
              <p className="text-sm text-white/60">How to capture emergency calls at 2am, weekends, and bank holidays.</p>
            </a>
            <a href="/blog/how-much-do-missed-calls-cost-uk-trades" className="group block bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-5 transition-colors">
              <h3 className="font-semibold mb-2 group-hover:text-emerald-400 transition-colors text-white">Missed Call Cost Calculator</h3>
              <p className="text-sm text-white/60">Data-driven analysis of how much missed calls actually cost your trade.</p>
            </a>
          </div>
        </section>

        {/* Related Content */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Related Content</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <a href="/research/the-true-cost-of-missed-calls-2026" className="group block bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-5 transition-colors">
              <h3 className="font-semibold mb-2 group-hover:text-emerald-400 transition-colors text-white">The True Cost of Missed Calls: UK Trades Research 2026</h3>
              <p className="text-sm text-white/60">Independent research with 12 citations and industry data.</p>
            </a>
            <a href="/" className="group block bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-5 transition-colors">
              <h3 className="font-semibold mb-2 group-hover:text-emerald-400 transition-colors text-white">AI Voice Agent for Trade Businesses</h3>
              <p className="text-sm text-white/60">How Whoza's AI call answering works for your trade.</p>
            </a>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mb-12">
          <div className="bg-emerald-600 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Try whoza.ai Free for 7 Days
            </h3>
            <p className="text-white/80 mb-6 max-w-lg mx-auto">
              See why trade businesses across the UK are switching to AI receptionists. Setup in 30 minutes. No contract. No credit card.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-white/60 text-sm mt-4">
              30-day money-back guarantee • ICO registered (ZC077271) • Scottish company SC874716
            </p>
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BlogPosting",
                headline: "AI Receptionist vs Human Receptionist: Complete 2026 Cost Guide for UK Trades",
                description: "Detailed cost comparison of human and AI receptionists for UK trade businesses. Includes salary data, hidden costs, ROI analysis, and implementation guidance.",
                image: "https://whoza.ai/og-image.webp",
                author: {
                  "@type": "Organization",
                  name: "Whoza",
                  url: "https://whoza.ai",
                },
                publisher: {
                  "@type": "Organization",
                  name: "Whoza",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://whoza.ai/og-image.webp",
                  },
                },
                datePublished: "2026-06-25",
                dateModified: "2026-06-25",
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": "https://whoza.ai/blog/ai-receptionist-vs-human-cost-guide-2026",
                },
              },
              {
                "@type": "FAQPage",
                mainEntity: faqs.map((faq) => ({
                  "@type": "Question",
                  name: faq.q,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.a,
                  },
                })),
              },
              {
                "@type": "HowTo",
                name: "How to Switch from a Human to an AI Receptionist",
                description: "A 5-step guide to transitioning your trade business from human receptionist to AI call answering.",
                totalTime: "PT24H",
                estimatedCost: {
                  "@type": "MonetaryAmount",
                  currency: "GBP",
                  value: "59",
                },
                step: [
                  {
                    "@type": "HowToStep",
                    name: "Choose your service tier",
                    text: "Estimate your monthly call volume. A sole trader receiving 30 calls per week at 2 minutes average uses approximately 60 minutes monthly — the entry tier at £59/month is sufficient.",
                  },
                  {
                    "@type": "HowToStep",
                    name: "Configure your AI agent",
                    text: "Set up your business details, services offered, coverage areas, and qualification questions. Most providers offer pre-built templates for common trade categories.",
                  },
                  {
                    "@type": "HowToStep",
                    name: "Connect your phone number",
                    text: "Forward your existing business number to the AI service, or provision a new number. Diverting an existing number typically takes 1-2 hours with your phone provider.",
                  },
                  {
                    "@type": "HowToStep",
                    name: "Integrate your calendar",
                    text: "Connect Google Calendar, Outlook, or your scheduling tool so the AI can book appointments directly into your diary.",
                  },
                  {
                    "@type": "HowToStep",
                    name: "Test and refine",
                    text: "Make test calls to verify the experience. Adjust greetings, qualification questions, and escalation rules based on results.",
                  },
                ],
              },
            ],
          }),
        }}
      />
      <Footer />
    </div>
  )
}
