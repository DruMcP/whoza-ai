// Every article listed on /blog: the blog posts under /blog and the research
// reports under /research. One list feeds the blog listing, its featured
// slider, the BlogListingSchema JSON-LD and the related posts on each article.

import type { BlogCoverVariant } from "@/components/whoza/blog/blog-cover"

export interface BlogIndexEntry {
  slug: string
  title: string
  excerpt: string
  readTime: string
  date: string
  category: string
  cover: BlogCoverVariant
  /** Optional photo at /public path; when set it replaces the illustration. */
  image?: string
  featured?: boolean
  isResearch?: boolean
  url?: string
}

const entries: BlogIndexEntry[] = [
  {
    slug: "ai-search-for-uk-trades",
    title: "AI Visibility: Why Most UK Trades Are Invisible to ChatGPT",
    excerpt: "Google visibility ≠ AI visibility. Most UK trades show up fine on Google but are missing from ChatGPT's shortlist. Here's why, and the 5 signals that fix it.",
    readTime: "9 min read",
    date: "2026-07-23",
    category: "AI Search",
    cover: "ai-shortlist",
    featured: true,
  },
  {
    slug: "research/aeo-ai-search-optimisation-2026",
    title: "Answer Engine Optimisation: Why Small Businesses Must Prepare for AI-Driven Search or Risk Invisibility in 2026 and Beyond",
    excerpt: "Research report on Answer Engine Optimisation (AEO). Data from BrightEdge, Ahrefs, Semrush, Princeton, HubSpot, Google, and 30+ authoritative sources. 48% AI Overview coverage, 60% zero-click rate, 14.2% AI conversion rate.",
    readTime: "28 min read",
    date: "2026-06-20",
    category: "Research",
    cover: "answer-engine",
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
    cover: "caller-experience",
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
    cover: "voice-tech",
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
    cover: "research-chart",
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
    cover: "uk-built",
  },
  {
    slug: "24-7-call-answering-emergency-trades",
    title: "24/7 Call Answering for Emergency Trades UK",
    excerpt: "Why 24/7 call answering is essential for UK emergency trades. How AI captures burst pipes, power cuts, and lockouts at 2am, weekends, and bank holidays.",
    readTime: "6 min read",
    date: "2026-06-05",
    category: "Emergency Services",
    cover: "night-call",
  },
  {
    slug: "ai-call-answering-pricing-guide-uk-2026",
    title: "AI Call Answering Cost UK (2026) | Pricing Guide",
    excerpt: "Transparent AI call answering pricing guide for UK businesses. Compare whoza.ai plans now. Starter, Growth, Pro, and Scale. No hidden fees. 2026 guide.",
    readTime: "10 min read",
    date: "2026-06-06",
    category: "Pricing",
    cover: "pricing",
    featured: true,
  },
  {
    slug: "how-to-get-more-google-reviews-trades",
    title: "How to Get More Google Reviews: A Complete Guide for UK Trades",
    excerpt: "Google reviews are the #1 trust signal for customers. Learn how to collect them systematically, respond professionally, and turn your online reputation into a lead-generating machine.",
    readTime: "9 min read",
    date: "2026-06-05",
    category: "Reputation",
    cover: "reviews",
  },
  {
    slug: "how-to-grow-trade-business-uk-guide",
    title: "Grow Your Trade Business: UK Guide (2025)",
    excerpt: "12 proven strategies to get more customers, increase revenue, and build a thriving trade business in the UK. From local SEO to Google reviews, partnerships to AI call answering, this is the guide that actually works.",
    readTime: "15 min read",
    date: "2026-06-05",
    category: "Growth",
    cover: "growth",
  },
  {
    slug: "ai-call-answering-uk-tradespeople-definitive-guide-2026",
    title: "AI Call Answering for UK Tradespeople: The Definitive 2026 Guide",
    excerpt: "Complete 2026 data on missed call costs, AI voice agent pricing, ROI calculations, and how AI call handling works for UK trades. Statistics, benchmarks, and buyer's guide.",
    readTime: "12 min read",
    date: "2026-05-20",
    category: "Industry Insights",
    cover: "whatsapp-lead",
    featured: true,
  },
]

/** In the order /blog has always listed them (roughly newest first), which the ItemList JSON-LD follows. */
export const blogIndex: BlogIndexEntry[] = entries

export function blogHref(entry: Pick<BlogIndexEntry, "slug" | "isResearch">): string {
  return entry.isResearch ? `/${entry.slug}` : `/blog/${entry.slug}`
}

export function findBlogEntry(slug: string): BlogIndexEntry | undefined {
  return blogIndex.find((entry) => entry.slug === slug)
}

/** Same category first, then the newest of the rest. */
export function relatedBlogEntries(slug: string, count = 3): BlogIndexEntry[] {
  const current = findBlogEntry(slug)
  const others = blogIndex.filter((entry) => entry.slug !== slug)
  const sameCategory = current ? others.filter((entry) => entry.category === current.category) : []
  const rest = others.filter((entry) => !sameCategory.includes(entry))
  return [...sameCategory, ...rest].slice(0, count)
}

/** "2026-07-23" -> "23 Jul 2026", identical on server and client. */
export function formatBlogDate(date: string): string {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${date}T00:00:00Z`),
  )
}
