import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { FileText, Clock, ArrowRight, RefreshCw } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Blog | whoza.ai",
  description: "AI voice agent insights, trade business tips, and local SEO strategies for UK tradespeople.",
  alternates: {
    canonical: "https://whoza.ai/blog",
  },
  robots: {
    index: true,
    follow: true,
  },
}

const blogPosts = [
  { slug: "how-ai-search-engines-rank-local-tradespeople-aeo-geo-guide-2026", title: "How AI Search Engines Rank Local Tradespeople: AEO & GEO Guide 2026", excerpt: "Learn how AI search engines evaluate and rank local trade businesses using Answer Engine Optimization and Generative Engine Optimization techniques.", readTime: "7 min read" },
  { slug: "why-your-business-isnt-showing-up-in-chatgpt-recommendations-and-how-to-fix-it", title: "Why Your Business Isn't Showing Up in ChatGPT Recommendations (and How to Fix It)", excerpt: "Discover why ChatGPT might be overlooking your trade business and the steps you can take to improve your AI search visibility.", readTime: "6 min read" },
  { slug: "ai-visibility-for-london-tradespeople-2026", title: "AI Visibility for London Tradespeople 2026", excerpt: "A comprehensive guide to getting your London-based trade business discovered by AI search engines and recommendation systems.", readTime: "5 min read" },
  { slug: "electricians-guide-to-google-ai-overviews-2026", title: "Electricians' Guide to Google AI Overviews 2026", excerpt: "How electricians can optimise their online presence to appear in Google's new AI Overview search results.", readTime: "6 min read" },
  { slug: "how-plumbers-can-get-found-in-chatgpt-2026", title: "How Plumbers Can Get Found in ChatGPT 2026", excerpt: "Practical strategies for plumbers to improve their discoverability in ChatGPT and other AI-powered search platforms.", readTime: "5 min read" },
  { slug: "roofers-10-step-checklist-ai-visibility-2026", title: "Roofers: 10-Step Checklist for AI Visibility 2026", excerpt: "A step-by-step checklist to help roofing businesses maximise their visibility across AI search and recommendation engines.", readTime: "8 min read" },
  { slug: "top-10-ai-visibility-strategies-uk-tradespeople-2026", title: "Top 10 AI Visibility Strategies for UK Tradespeople 2026", excerpt: "The most effective strategies UK tradespeople can implement today to improve their AI search presence and win more jobs.", readTime: "7 min read" },
  { slug: "uk-trades-business-playbook-ai-search-visibility-2026", title: "UK Trades Business Playbook: AI Search Visibility 2026", excerpt: "Your complete playbook for dominating AI search results as a UK trade business — from GBP optimisation to content strategy.", readTime: "9 min read" },
  { slug: "what-is-ai-visibility-uk-tradespeople-2026", title: "What Is AI Visibility for UK Tradespeople 2026", excerpt: "An introduction to AI visibility: what it means, why it matters, and how it's changing the way customers find trade businesses.", readTime: "5 min read" },
  { slug: "why-ai-search-wont-recommend-your-trade-business-and-how-to-fix-it", title: "Why AI Search Won't Recommend Your Trade Business (and How to Fix It)", excerpt: "Identify the common barriers preventing AI search engines from recommending your trade business and how to overcome them.", readTime: "6 min read" },
  { slug: "how-reviews-influence-ai-search-recommendations-tradespeople-2026", title: "How Reviews Influence AI Search Recommendations for Tradespeople 2026", excerpt: "The critical role customer reviews play in AI search rankings and how to leverage them for maximum impact.", readTime: "6 min read" },
  { slug: "the-ultimate-guide-to-google-business-profile-optimization-for-ai-search-2026", title: "The Ultimate Guide to Google Business Profile Optimization for AI Search 2026", excerpt: "Everything you need to know about optimising your Google Business Profile to rank in AI-powered search results.", readTime: "8 min read" },
  { slug: "how-uk-tradespeople-can-get-found-on-chatgpt-and-ai-search-in-2026", title: "How UK Tradespeople Can Get Found on ChatGPT and AI Search in 2026", excerpt: "A practical guide to making your trade business discoverable on ChatGPT, Perplexity, and other AI search platforms.", readTime: "7 min read" },
  { slug: "manchester-vs-birmingham-local-seo-strategies-2026", title: "Manchester vs Birmingham: Local SEO Strategies 2026", excerpt: "City-specific local SEO tactics tailored for Manchester and Birmingham trade businesses targeting AI search visibility.", readTime: "6 min read" },
  { slug: "us-contractors-guide-ai-search-visibility-2026", title: "US Contractors' Guide to AI Search Visibility 2026", excerpt: "How US contractors can adapt their digital presence for AI search engines and recommendation platforms.", readTime: "7 min read" },
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
            AI voice agent insights, local SEO strategies, and practical tips to help UK tradespeople win more jobs.
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
