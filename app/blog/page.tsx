import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { BlogListingSchema } from "@/components/whoza/blog-schema"
import { FileText, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Blog — AI Call Answering for UK Trades | whoza.ai",
  description: "AI voice agent insights, trade business growth tips, and lead capture strategies for UK plumbers, electricians, gas engineers and builders. Book more jobs.",
  alternates: {
    canonical: "https://whoza.ai/blog",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/blog",
    siteName: "Whoza.ai",
    title: "Blog | whoza.ai",
    description: "AI voice agent insights, trade business growth tips, and lead capture strategies for UK plumbers, electricians, gas engineers and builders. Book more jobs.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "whoza.ai Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | whoza.ai",
    description: "AI voice agent insights, trade business growth tips, and lead capture strategies for UK plumbers, electricians, gas engineers and builders. Book more jobs.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const blogPosts = [
  {
    slug: "i-spent-two-weeks-comparing-virtual-receptionist-prices-ross-the-joiner",
    title: "I Spent Two Weeks Googling 'Virtual Receptionist Cost' Before I Realised I Was Buying the Wrong Thing",
    excerpt: "Self-employed joiner from Glasgow spent 14 days comparing virtual receptionist prices. He discovered the cheapest option was not the best value — and the best value was not what he expected.",
    readTime: "14 min read",
    date: "2026-08-08",
    category: "UGC / Real Stories",
  },
  {
    slug: "what-tradespeople-actually-want-from-ai",
    title: "What Tradespeople Actually Want from AI — and It Isn't What the Tech Lot Are Selling",
    excerpt: "A working tradesperson's honest take on what we actually want from AI: calls answered, evenings back, invoices out when the job's done. No apps, no jargon.",
    readTime: "12 min read",
    date: "2026-07-26",
    category: "Industry Insights",
  },
  {
    slug: "i-lost-12000-in-one-winter-to-missed-boiler-calls-charlie-the-heating-engineer",
    title: "I Lost £12,000 to Missed Boiler Calls | whoza.ai",
    excerpt: "Heating engineer shares 4-week winter diary. 47 missed boiler calls, £12,000 lost revenue. How AI call answering recovered £8,400. Real numbers. 2026.",
    readTime: "10 min read",
    date: "2026-06-27",
    category: "UGC / Real Stories",
  },
  {
    slug: "seasonal-missed-call-report-uk-trades-2026",
    title: "Seasonal Missed Call Report 2026 | whoza.ai",
    excerpt: "Original analysis of 10,000+ trade calls. Winter boiler enquiries spike 340%. Discover which months cost UK trades the most in lost revenue. Data by trade.",
    readTime: "12 min read",
    date: "2026-06-27",
    category: "Data",
  },
  {
    slug: "ai-receptionist-vs-human-cost-guide-2026",
    title: "AI Receptionist vs Human: 2026 Cost Guide | Whoza",
    excerpt: "AI receptionist vs human: cost comparison for UK trades. £59/month vs £25K/year. Speed, accuracy, and availability compared. Read the analysis.",
    readTime: "14 min read",
    date: "2026-06-25",
    category: "Comparison",
  },
  {
    slug: "ai-search-for-uk-trades",
    title: "Your Next Customer Won't Google You. They'll Ask AI.",
    excerpt: "UK customers have quietly switched to AI search — over half of UK adults now use ChatGPT (Ofcom, 2025). Here's what it means for trades, and how to be the name the AI recommends. Founder analysis, every stat sourced.",
    readTime: "9 min read",
    date: "2026-07-23",
    category: "AI Search",
  },
  {
    slug: "research/aeo-ai-search-optimisation-2026",
    title: "Answer Engine Optimisation: Why Small Businesses Must Prepare for AI-Driven Search or Risk Invisibility in 2026 and Beyond",
    excerpt: "Research report on Answer Engine Optimisation (AEO). Data from BrightEdge, Ahrefs, Semrush, Princeton, HubSpot, Google, and 30+ authoritative sources. 48% AI Overview coverage, 60% zero-click rate, 14.2% AI conversion rate.",
    readTime: "28 min read",
    date: "2026-06-20",
    category: "Research",
    isResearch: true,
    url: "https://whoza.ai/research/aeo-ai-search-optimisation-2026",
  },
  {
    slug: "research/caller-experience-revolution-ai-voice-agents-2026",
    title: "The Caller Experience Revolution: How AI Voice Agents Transform Customer Satisfaction, Trust, and Revenue Conversion in Small Business",
    excerpt: "Research report examining how AI voice agents transform caller experience for small businesses. Data from MIT, Harvard Business Review, Zendesk, BrightLocal, and SurveyMonkey.",
    readTime: "22 min read",
    date: "2026-06-20",
    category: "Research",
    isResearch: true,
    url: "https://whoza.ai/research/caller-experience-revolution-ai-voice-agents-2026",
  },
  {
    slug: "research/voice-agent-technology-state-of-art-2026",
    title: "Voice Agent Technology: State of the Art, Architecture & Future 2026",
    excerpt: "Technical deep-dive into voice AI architecture: end-to-end neural models, sub-200ms latency engineering, speech synthesis quality benchmarks, barge-in handling, and the agentic AI future.",
    readTime: "18 min read",
    date: "2026-06-18",
    category: "Research",
    isResearch: true,
    url: "https://whoza.ai/research/voice-agent-technology-state-of-art-2026",
  },
  {
    slug: "research/ai-voice-agents-uk-trades-2026",
    title: "AI Voice Agents in the UK Trades Sector: Research Report 2026",
    excerpt: "Comprehensive research report analysing AI voice agent adoption, missed call revenue loss, and market trends. Data from Gartner, McKinsey, Juniper Research, BrightLocal, and ONS.",
    readTime: "25 min read",
    date: "2026-06-18",
    category: "Research",
    isResearch: true,
    url: "https://whoza.ai/research/ai-voice-agents-uk-trades-2026",
  },
  {
    slug: "i-lost-a-8000-roof-job-because-i-was-up-a-ladder-mike-the-roofer",
    title: "I Lost an £8,000 Roof Job Because I Was Up a Ladder. AI Fixed That.",
    excerpt: "Self-employed roofer from Manchester shares his honest 5-week diary using AI call answering. Real numbers. Storm damage season. £9,400 in recovered jobs.",
    readTime: "11 min read",
    date: "2026-06-17",
    category: "UGC / Real Stories",
  },
  {
    slug: "my-phone-rang-12-times-on-a-building-site-tom-the-builder",
    title: "My Phone Rang 12 Times on a Building Site. I Answered Zero. AI Did.",
    excerpt: "Self-employed builder from Birmingham shares his honest 4-week diary using AI call answering. Real numbers. Extensions, renovations, emergency callouts. £7,200 in recovered jobs.",
    readTime: "10 min read",
    date: "2026-06-17",
    category: "UGC / Real Stories",
  },
  {
    slug: "ultimate-faq-tradespeople",
    title: "The Ultimate FAQ for Tradespeople: 100+ Real Questions Answered",
    excerpt: "115 real questions from real UK tradespeople about missed calls, AI receptionists, and growing your trade business. Honest answers, real numbers, no BS.",
    readTime: "25 min read",
    date: "2026-06-12",
    category: "FAQ",
  },
  {
    slug: "why-uk-trades-need-ai-built-in-scotland",
    title: "Why UK Tradespeople Need an AI Call Handler Built in Scotland",
    excerpt: "UK-built vs overseas AI call handlers: why postcodes, accents, data laws, and time zones matter for British tradespeople. Built in Scotland.",
    readTime: "8 min read",
    date: "2026-06-10",
    category: "Industry Insights",
  },
  {
    slug: "5-signs-your-trade-business-is-losing-customers-to-missed-calls",
    title: "5 Signs Your Trade Business is Losing Customers to Missed Calls",
    excerpt: "Self-employed heating engineer from Leeds reveals the 5 warning signs that cost him £18,000 a year. Number 3 made me sick when I worked it out.",
    readTime: "8 min read",
    date: "2026-06-08",
    category: "UGC / Real Stories",
  },
  {
    slug: "7-questions-every-uk-tradesperson-should-ask-before-hiring-a-call-answering-service",
    title: "7 Questions Every UK Tradesperson Should Ask Before Hiring a Call Answering Service",
    excerpt: "Manchester locksmith asked the wrong questions and wasted £400 on a call answering service that did not work. Here is what she wishes she had asked first.",
    readTime: "9 min read",
    date: "2026-06-08",
    category: "UGC / Buying Guide",
  },
  {
    slug: "8-reasons-uk-tradespeople-switch-to-ai-call-handling-in-2026",
    title: "8 Reasons UK Tradespeople Switch to AI Call Handling in 2026",
    excerpt: "Bristol roofer Tom Bradley explains why 2026 is the year tradespeople are ditching voicemail and human receptionists for AI. Reason 6 surprised his accountant.",
    readTime: "10 min read",
    date: "2026-06-08",
    category: "UGC / Trends",
  },
  {
    slug: "ai-phone-technology-complete-guide",
    title: "AI Phone Technology Guide for UK Trades (2026)",
    excerpt: "How AI voice agents actually work — NLP, speech synthesis, intent recognition, voice quality, and the future of AI phone technology for trade businesses.",
    readTime: "18 min read",
    date: "2026-06-05",
    category: "AI Technology",
  },
  {
    slug: "roofing-lead-generation-guide",
    title: "Roofing Lead Generation Guide: How to Get More Roofing Jobs in 2026",
    excerpt: "Practical strategies for UK roofers to generate consistent leads: Google Business Profile, local SEO, emergency call capture, and how AI call handling converts missed calls into booked surveys.",
    readTime: "8 min read",
    date: "2026-06-05",
    category: "Lead Generation",
  },
  {
    slug: "builders-lead-generation-guide",
    title: "Builders Lead Generation Guide: How to Win More Projects in 2026",
    excerpt: "Proven lead generation strategies for UK builders: local SEO, project-type targeting, quote conversion, and how AI call handling captures high-value extension and renovation enquiries.",
    readTime: "8 min read",
    date: "2026-06-05",
    category: "Lead Generation",
  },
  {
    slug: "heating-engineer-emergency-call-handling",
    title: "HVAC Emergency Call Handling: How to Capture Every Boiler Breakdown",
    excerpt: "Boiler breakdowns don't wait for business hours. Learn how UK heating engineers can capture emergency calls 24/7, prioritise urgent breakdowns, and convert after-hours enquiries into booked callouts.",
    readTime: "7 min read",
    date: "2026-06-05",
    category: "Emergency Services",
  },
  {
    slug: "locksmith-24-7-call-answering",
    title: "24/7 Call Answering for Locksmiths: Never Miss a Lockout Again",
    excerpt: "Lockouts are the most urgent trade calls. Learn how UK locksmiths can capture emergency lockout enquiries 24/7, prioritise high-value security upgrades, and convert after-hours calls into booked jobs.",
    readTime: "7 min read",
    date: "2026-06-05",
    category: "Emergency Services",
  },
  {
    slug: "how-does-ai-call-answering-work",
    title: "How AI Call Answering Works | UK Trades Guide",
    excerpt: "Simple explanation of AI call answering technology for UK tradespeople. Learn how voice agents capture calls, qualify leads, and deliver enquiries to WhatsApp in 3 seconds.",
    readTime: "6 min read",
    date: "2026-06-05",
    category: "AI Voice Agents",
  },
  {
    slug: "ai-call-answering-cost-uk",
    title: "AI Call Answering Pricing UK | Trades Cost",
    excerpt: "Complete UK pricing guide for AI call answering services. Compare plans, calculate ROI, and understand the true cost for plumbers, electricians, and builders.",
    readTime: "6 min read",
    date: "2026-06-05",
    category: "Pricing",
  },
  {
    slug: "24-7-call-answering-emergency-trades",
    title: "24/7 Call Answering for Emergency Trades UK",
    excerpt: "Why 24/7 call answering is essential for UK emergency trades. How AI captures burst pipes, power cuts, and lockouts at 2am, weekends, and bank holidays.",
    readTime: "6 min read",
    date: "2026-06-05",
    category: "Emergency Services",
  },
  {
    slug: "ai-call-answering-pricing-guide-uk-2026",
    title: "AI Call Answering Cost UK (2026) | Pricing Guide",
    excerpt: "Transparent AI call answering pricing guide for UK businesses. Compare whoza.ai plans now. Starter, Growth, Pro, and Scale. No hidden fees. 2026 guide.",
    readTime: "10 min read",
    date: "2026-06-06",
    category: "Pricing",
  },
  {
    slug: "google-business-profile-trades",
    title: "Google Business Profile for Trades: The Complete Optimisation Guide",
    excerpt: "Your GBP is your most powerful marketing tool. Learn how to optimise it properly to rank higher, get more calls, and win more customers.",
    readTime: "8 min read",
    date: "2026-06-05",
    category: "Local SEO",
  },
  {
    slug: "how-to-get-more-google-reviews-trades",
    title: "How to Get More Google Reviews: A Complete Guide for UK Trades",
    excerpt: "Google reviews are the #1 trust signal for customers. Learn how to collect them systematically, respond professionally, and turn your online reputation into a lead-generating machine.",
    readTime: "9 min read",
    date: "2026-06-05",
    category: "Reputation",
  },
  {
    slug: "how-to-get-more-plumbing-customers",
    title: "How to Get More Plumbing Customers: 8 Proven Tactics for UK Plumbers",
    excerpt: "Struggling to fill your diary? These 8 battle-tested strategies help UK plumbers get more customers, increase average job value, and build a predictable pipeline of emergency and maintenance work.",
    readTime: "8 min read",
    date: "2026-06-05",
    category: "Lead Generation",
  },
  {
    slug: "how-to-grow-trade-business-uk-guide",
    title: "Grow Your Trade Business: UK Guide (2025)",
    excerpt: "12 proven strategies to get more customers, increase revenue, and build a thriving trade business in the UK. From local SEO to Google reviews, partnerships to AI call answering — this is the guide that actually works.",
    readTime: "15 min read",
    date: "2026-06-05",
    category: "Growth",
  },
  {
    slug: "i-worked-out-i-was-losing-30000-a-year-to-missed-calls-mark-the-gas-engineer",
    title: "I Worked Out I Was Losing £30,000 a Year to Missed Calls. Then I Tried AI.",
    excerpt: "Gas Safe heating engineer from Walthamstow shares exact maths, 4-week tracked results, and honest review of AI call answering. Real numbers. No fluff. £6,650 recovered in one month.",
    readTime: "11 min read",
    date: "2026-06-05",
    category: "UGC / Real Stories",
  },
  {
    slug: "local-seo-trades-complete-guide",
    title: "Local SEO for Trades: The Complete UK Guide (2025)",
    excerpt: "Rank #1 on Google Maps and get found by local customers. This step-by-step guide covers everything UK tradespeople need to dominate local search in 2025.",
    readTime: "10 min read",
    date: "2026-06-05",
    category: "Local SEO",
  },
  {
    slug: "i-missed-5-emergency-calls-a-week-then-i-tried-ai-gary-the-plumber",
    title: "I Missed 5 Emergency Calls a Week. Then I Tried AI.",
    excerpt: "Self-employed plumber from Clapham shares honest 4-week diary using AI call answering. Real numbers. No BS. £6,800 in recovered jobs.",
    readTime: "10 min read",
    date: "2026-06-02",
    category: "UGC / Real Stories",
  },
  {
    slug: "i-lost-3-emergency-callouts-a-day-heres-how-i-fixed-it-dave-the-sparky",
    title: "I Lost 3 Emergency Callouts a Day. Here's How I Fixed It.",
    excerpt: "Self-employed sparky from Lewisham shares his honest 3-week diary using AI call answering. Real numbers. No BS. £4,200 in recovered jobs.",
    readTime: "9 min read",
    date: "2026-05-31",
    category: "Real Stories",
  },
  {
    slug: "i-lost-4000-in-one-storm-season-then-ai-answered-my-phone-tom-the-roofer",
    title: "I Lost £4,000 in One Storm Season. Then AI Answered My Phone.",
    excerpt: "Manchester roofer shares honest 4-week diary using AI call answering. Real numbers. No BS. Storm season missed calls, tile repairs, leak emergencies. £5,200 recovered in one month.",
    readTime: "9 min read",
    date: "2026-06-07",
    category: "UGC / Real Stories",
  },
  {
    slug: "i-was-missing-2000-extension-enquiries-every-month-then-i-tried-ai-steve-the-builder",
    title: "I Was Missing £2,000 Extension Enquiries Every Month. Then I Tried AI.",
    excerpt: "Self-employed builder from Bristol shares honest 5-week diary using AI call answering. Real numbers. No BS. High-value extension and renovation enquiries captured. £7,400 recovered in one month.",
    readTime: "10 min read",
    date: "2026-06-07",
    category: "UGC / Real Stories",
  },
  {
    slug: "3-am-lockout-calls-were-going-to-voicemail-now-i-catch-every-one-sarah-the-locksmith",
    title: "3 AM Lockout Calls Were Going to Voicemail. Now I Catch Every One.",
    excerpt: "Self-employed locksmith from Leeds shares honest 3-week diary using AI call answering. Real numbers. No BS. Emergency lockouts, security upgrades, and after-hours calls. £4,800 recovered in 3 weeks.",
    readTime: "9 min read",
    date: "2026-06-07",
    category: "UGC / Real Stories",
  },
  {
    slug: "i-missed-spring-booking-season-ai-captured-47-calls-in-3-weeks-james-the-landscaper",
    title: "I Missed Spring Booking Season. AI Captured 47 Calls in 3 Weeks.",
    excerpt: "Self-employed landscaper from Reading shares honest 3-week diary using AI call answering. Real numbers. No BS. Spring booking rush, garden redesigns, maintenance contracts. £3,600 recovered in 3 weeks.",
    readTime: "8 min read",
    date: "2026-06-07",
    category: "UGC / Real Stories",
  },
  {
    slug: "how-much-do-missed-calls-cost-uk-trades",
    title: "How Much Do Missed Calls Cost UK Trades?",
    excerpt: "Data-driven analysis using FSB and ONS data. Calculate your exact losses by trade. The numbers might shock you.",
    readTime: "6 min read",
    date: "2026-05-22",
    category: "Data",
  },
  {
    slug: "ai-call-answering-uk-tradespeople-definitive-guide-2026",
    title: "AI Call Answering for UK Tradespeople: The Definitive 2026 Guide",
    excerpt: "Complete 2026 data on missed call costs, AI voice agent pricing, ROI calculations, and how AI call handling works for UK trades. Statistics, benchmarks, and buyer's guide.",
    readTime: "12 min read",
    date: "2026-05-20",
    category: "Industry Insights",
  },
]

export const revalidate = 3600

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />
      <BlogListingSchema posts={blogPosts.map(({ slug, title, excerpt, date, category, url }) => ({ slug, title, excerpt, date, category, url }))} />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "Blog", item: "https://whoza.ai/blog" },
      ]} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <FileText className="w-4 h-4" />
            Trade Business Insights
          </div>
          <h1 className="text-4xl font-bold mb-4">whoza.ai Blog</h1>
          <p className="text-white/60 text-lg max-w-2xl">
            AI voice agent insights, business growth strategies, and practical tips to help UK tradespeople capture more leads and book more jobs.
          </p>
        </div>

        <div className="grid gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={post.isResearch ? `/${post.slug}` : `/blog/${post.slug}`}
              className="group block bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${post.isResearch ? 'text-amber-400 bg-amber-500/10' : 'text-emerald-400 bg-emerald-500/10'}`}>
                      {post.category}
                    </span>
                    <span className="text-xs text-white/40">{post.date}</span>
                  </div>
                  <h2 className="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-white/60 leading-relaxed mb-3">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-white/40 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
