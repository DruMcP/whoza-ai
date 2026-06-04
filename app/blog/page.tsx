import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { BlogListingSchema } from "@/components/whoza/blog-schema"
import { FileText, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Blog | whoza.ai",
  description: "AI voice agent insights, trade business tips, and strategies to help UK tradespeople capture more leads and book more jobs.",
  alternates: {
    canonical: "https://whoza.ai/blog",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/blog",
    siteName: "Whoza.ai",
    title: "Blog | whoza.ai",
    description: "AI voice agent insights, trade business tips, and strategies to help UK tradespeople capture more leads and book more jobs.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "whoza.ai Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "Blog | whoza.ai",
    description: "AI voice agent insights, trade business tips, and strategies to help UK tradespeople capture more leads and book more jobs.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const blogPosts = [
  {
    slug: "ai-call-answering-trades-uk-guide",
    title: "AI Call Answering for UK Trades: The Complete Guide (2026)",
    excerpt: "The definitive UK guide to AI call answering for plumbers, electricians, gas engineers and builders. How it works, what it costs, and how to choose the right service.",
    readTime: "15 min read",
    date: "2026-06-05",
    category: "Industry Insights",
  },
  {
    slug: "missed-call-recovery-trades-guide",
    title: "Missed Call Recovery for UK Trades: The Complete Guide",
    excerpt: "Discover how UK tradespeople can recover revenue from missed calls. Statistics, cost analysis, customer journey mapping, and proven recovery strategies.",
    readTime: "14 min read",
    date: "2026-06-05",
    category: "Business Growth",
  },
  {
    slug: "how-does-ai-call-answering-work",
    title: "How Does AI Call Answering Work? A UK Trades Guide",
    excerpt: "Simple explanation of AI call answering technology for UK tradespeople. Learn how voice agents capture calls, qualify leads, and deliver enquiries to WhatsApp in 3 seconds.",
    readTime: "6 min read",
    date: "2026-06-05",
    category: "AI Voice Agents",
  },
  {
    slug: "ai-vs-human-receptionist-trades",
    title: "AI vs Human Receptionist for UK Trades: Which Wins?",
    excerpt: "Head-to-head comparison of AI and human receptionists for UK trade businesses. Cost, availability, call quality, and customer experience compared honestly.",
    readTime: "7 min read",
    date: "2026-06-05",
    category: "Comparison",
  },
  {
    slug: "ai-call-answering-cost-uk",
    title: "AI Call Answering Cost UK: Pricing Guide for Trades",
    excerpt: "Complete UK pricing guide for AI call answering services. Compare plans, calculate ROI, and understand the true cost for plumbers, electricians, and builders.",
    readTime: "6 min read",
    date: "2026-06-05",
    category: "Pricing",
  },
  {
    slug: "24-7-call-answering-emergency-trades",
    title: "24/7 Call Answering for Emergency Trades: UK Guide",
    excerpt: "Why 24/7 call answering is essential for UK emergency trades. How AI captures burst pipes, power cuts, and lockouts at 2am, weekends, and bank holidays.",
    readTime: "6 min read",
    date: "2026-06-05",
    category: "Emergency Services",
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
    slug: "best-ai-phone-answering-uk-trades-2026",
    title: "Best AI Phone Answering Services for UK Tradespeople 2026",
    excerpt: "Independent guide comparing whoza.ai, Clara, Moneypenny, Team-Connect, and Smith.ai. Real pricing, honest rankings, no affiliate links.",
    readTime: "8 min read",
    date: "2026-05-22",
    category: "Comparison",
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
  {
    slug: "how-ai-call-handlers-are-changing-the-game-for-uk-trades-2026",
    title: "How AI Call Handlers Are Changing the Game for UK Trades in 2026",
    excerpt: "The trades industry is undergoing a quiet revolution. AI call handlers like Katie are capturing missed calls, qualifying leads, and booking jobs while tradespeople focus on the work.",
    readTime: "8 min read",
    date: "2026-05-15",
    category: "AI Voice Agents",
  },
  {
    slug: "missed-calls-missed-money-the-real-cost-for-tradespeople",
    title: "Missed Calls = Missed Money: The Real Cost for UK Tradespeople",
    excerpt: "62% of calls to small trade businesses go unanswered. We break down the maths — how much revenue you're losing every week, and what you can do about it.",
    readTime: "6 min read",
    date: "2026-05-12",
    category: "Business Growth",
  },
  {
    slug: "ai-receptionist-vs-human-receptionist-which-is-right-for-your-trade-business",
    title: "AI Receptionist vs Human Receptionist: Which Is Right for Your Trade Business?",
    excerpt: "A head-to-head comparison of cost, availability, consistency, and customer experience. Spoiler: one costs £59/month, the other costs £25,000/year.",
    readTime: "7 min read",
    date: "2026-05-10",
    category: "Comparison",
  },
  {
    slug: "why-62-percent-of-trade-business-calls-go-unanswered",
    title: "Why 62% of Trade Business Calls Go Unanswered (and How to Fix It)",
    excerpt: "You're on a job site. Your phone rings. You miss it. The caller hires someone else. Here's why this happens 6 times out of 10, and the simple fix.",
    readTime: "5 min read",
    date: "2026-05-08",
    category: "Industry Insights",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />
      <BlogListingSchema posts={blogPosts.map(({ slug, title, excerpt, date, category }) => ({ slug, title, excerpt, date, category }))} />
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
              href={`/blog/${post.slug}`}
              className="group block bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
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
