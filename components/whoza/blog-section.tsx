"use client"

import { motion } from "framer-motion"
import { ArrowRight, Clock, FileText } from "lucide-react"
import Link from "next/link"

const recentPosts = [
  {
    slug: "how-ai-call-handlers-are-changing-the-game-for-uk-trades-2026",
    title: "How AI Call Handlers Are Changing the Game for UK Trades in 2026",
    excerpt: "The trades industry is undergoing a quiet revolution. AI call handlers like Katie are capturing missed calls, qualifying leads, and booking jobs while tradespeople focus on the work.",
    readTime: "8 min",
    category: "AI Voice Agents",
  },
  {
    slug: "missed-calls-missed-money-the-real-cost-for-tradespeople",
    title: "Missed Calls = Missed Money: The Real Cost for UK Tradespeople",
    excerpt: "62% of calls to small trade businesses go unanswered. We break down the maths — how much revenue you're losing every week, and what you can do about it.",
    readTime: "6 min",
    category: "Business Growth",
  },
  {
    slug: "ai-receptionist-vs-human-receptionist-which-is-right-for-your-trade-business",
    title: "AI Receptionist vs Human Receptionist: Which Is Right for You?",
    excerpt: "A head-to-head comparison of cost, availability, consistency, and customer experience. Spoiler: one costs £59/month, the other costs £25,000/year.",
    readTime: "7 min",
    category: "Comparison",
  },
]

export function BlogSection() {
  return (
    <section className="py-16 lg:py-24 bg-[var(--cream)]" id="blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <FileText className="w-4 h-4" />
            Trade Business Insights
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy-900)] mb-3">
            Latest from the Blog
          </h2>
          <p className="text-[var(--slate-500)] text-lg max-w-2xl mx-auto">
            Practical tips, industry insights, and strategies to help you capture more leads and book more jobs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {recentPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block h-full bg-white rounded-xl border border-[var(--border)] p-6 hover:shadow-lg hover:border-[var(--katie-blue)]/30 transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-emerald-700 bg-emerald-500/10 px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-[var(--slate-400)] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[var(--navy-900)] group-hover:text-[var(--katie-blue)] transition-colors mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-[var(--slate-500)] leading-relaxed line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-1 text-sm font-medium text-[var(--katie-blue)] group-hover:gap-2 transition-all">
                  Read article
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--navy-900)] text-white rounded-xl font-medium hover:bg-[var(--navy-800)] transition-colors"
          >
            View all articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
