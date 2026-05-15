import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { FileText, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Blog | whoza.ai",
  description: "AI voice agent insights, trade business tips, and strategies to help UK tradespeople capture more leads and book more jobs.",
  alternates: {
    canonical: "https://whoza.ai/blog",
  },
  robots: {
    index: true,
    follow: true,
  },
}

const blogPosts = [
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
  {
    slug: "how-katie-answers-captures-and-delivers-enquiries-in-3-seconds",
    title: "How Katie Answers, Captures, and Delivers Enquiries in 3 Seconds",
    excerpt: "A behind-the-scenes look at whoza.ai's AI call handler. From ring to WhatsApp in under 3 seconds — here's exactly how it works.",
    readTime: "6 min read",
    date: "2026-05-05",
    category: "Product",
  },
  {
    slug: "the-7-day-free-trial-what-to-expect-when-you-try-katie",
    title: "The 7-Day Free Trial: What to Expect When You Try Katie",
    excerpt: "No credit card. No contract. Just a week of Katie answering your calls. Here's what happens when you sign up for the whoza.ai pilot programme.",
    readTime: "4 min read",
    date: "2026-05-03",
    category: "Getting Started",
  },
  {
    slug: "how-whatsapp-delivery-changes-everything-for-tradespeople",
    title: "How WhatsApp Delivery Changes Everything for Tradespeople",
    excerpt: "Forget app dashboards and email notifications. Katie sends enquiries straight to your WhatsApp. Here's why that matters.",
    readTime: "5 min read",
    date: "2026-05-01",
    category: "Product",
  },
  {
    slug: "roi-calculator-how-much-could-an-ai-call-handler-save-your-trade-business",
    title: "ROI Calculator: How Much Could an AI Call Handler Save Your Trade Business?",
    excerpt: "Plug in your numbers: missed calls per week, average job value, conversion rate. See exactly how much revenue Katie could recover for you.",
    readTime: "7 min read",
    date: "2026-04-28",
    category: "Business Growth",
  },
  {
    slug: "case-study-how-a-london-electrician-recovered-12k-month-with-ai-call-handling",
    title: "Case Study: How a London Electrician Recovered £12,400/Month with AI Call Handling",
    excerpt: "From 40% missed calls to 98% answer rate. We break down exactly how one electrical contractor transformed their business with whoza.ai.",
    readTime: "9 min read",
    date: "2026-04-25",
    category: "Case Studies",
  },
  {
    slug: "moneypenny-vs-whoza-ai-which-receptionist-service-is-right-for-trades",
    title: "Moneypenny vs whoza.ai: Which Receptionist Service Is Right for Trades?",
    excerpt: "The two biggest names in trade call handling, compared head-to-head on price, features, setup time, and flexibility.",
    readTime: "8 min read",
    date: "2026-04-22",
    category: "Comparison",
  },
  {
    slug: "why-tradespeople-need-a-revenue-team-not-just-a-virtual-receptionist",
    title: "Why Tradespeople Need a Revenue Team — Not Just a Virtual Receptionist",
    excerpt: "Answering calls is table stakes. The real value is in qualification, capture, follow-up, and review management. Here's what a true AI Revenue Team delivers.",
    readTime: "6 min read",
    date: "2026-04-20",
    category: "AI Voice Agents",
  },
  {
    slug: "how-to-never-miss-an-emergency-call-again-plumbers-electricians-roofers",
    title: "How to Never Miss an Emergency Call Again: A Guide for Plumbers, Electricians & Roofers",
    excerpt: "Emergency calls are your highest-value enquiries. Katie qualifies them instantly and sends urgent enquiries straight to your phone — 24/7.",
    readTime: "5 min read",
    date: "2026-04-18",
    category: "Business Growth",
  },
  {
    slug: "the-truth-about-ai-voice-agents-what-google-reviews-say",
    title: "The Truth About AI Voice Agents: What Google Reviews Say",
    excerpt: "We analysed 200+ reviews of AI call handling services. Here's what real tradespeople love, hate, and wish they'd known before signing up.",
    readTime: "7 min read",
    date: "2026-04-15",
    category: "Industry Insights",
  },
  {
    slug: "5-signs-your-trade-business-needs-an-ai-call-handler",
    title: "5 Signs Your Trade Business Needs an AI Call Handler",
    excerpt: "Voicemail full of 'please call me back'? Customers saying 'I tried ringing'? If these sound familiar, it's time to meet Katie.",
    readTime: "4 min read",
    date: "2026-04-12",
    category: "Getting Started",
  },
  {
    slug: "how-ai-call-handling-works-with-your-existing-phone-number",
    title: "How AI Call Handling Works With Your Existing Phone Number",
    excerpt: "No new numbers. No new hardware. No IT team required. Here's how whoza.ai connects to your existing business number in under 30 minutes.",
    readTime: "5 min read",
    date: "2026-04-10",
    category: "Product",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />
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
