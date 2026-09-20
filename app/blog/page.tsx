import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { BlogListingSchema } from "@/components/whoza/blog-schema"
import { PreferredSourceButton } from "@/components/whoza/preferred-source-button"
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
    slug: "ai-search-for-uk-trades",
    title: "AI Visibility: Why Most UK Trades Are Invisible to ChatGPT",
    excerpt: "Google visibility ≠ AI visibility. Most UK trades show up fine on Google but are missing from ChatGPT's shortlist. Here's why — and the 5 signals that fix it.",
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
    slug: "why-uk-trades-need-ai-built-in-scotland",
    title: "Why UK Tradespeople Need an AI Call Handler Built in Scotland",
    excerpt: "UK-built vs overseas AI call handlers: why postcodes, accents, data laws, and time zones matter for British tradespeople. Built in Scotland.",
    readTime: "8 min read",
    date: "2026-06-10",
    category: "Industry Insights",
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
    slug: "how-to-get-more-google-reviews-trades",
    title: "How to Get More Google Reviews: A Complete Guide for UK Trades",
    excerpt: "Google reviews are the #1 trust signal for customers. Learn how to collect them systematically, respond professionally, and turn your online reputation into a lead-generating machine.",
    readTime: "9 min read",
    date: "2026-06-05",
    category: "Reputation",
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
        <PreferredSourceButton label="See more from whoza.ai in Google." />
      </main>

      <Footer />
    </div>
  )
}
