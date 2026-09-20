import { Quote, MapPin, TrendingUp, Wrench } from "lucide-react"
import type { CaseStudyStory, LeadGenTip } from "@/lib/trade-case-studies"

/**
 * TradeCaseStudy — consolidated case studies merged from retired blog posts.
 * Rendered on /for-[trade] pages so every story figure/quote survives the
 * blog consolidation (see netlify.toml redirects for source → target mapping).
 */
export function TradeCaseStudy({
  trade,
  stories,
}: {
  trade: string
  stories: CaseStudyStory[]
}) {
  return (
    <section className="py-16 lg:py-24 bg-[var(--navy-900)] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-3">
            Real tradespeople. Real numbers.
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {trade} Who Stopped Missing Calls — and What It Made Them
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            These stories were originally told as full blog posts. They&apos;re
            consolidated here because the numbers matter more than the URL.
          </p>
        </div>

        <div className="space-y-8">
          {stories.map((story) => (
            <article
              key={story.name}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 sm:p-8 border-b border-white/10">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                  <span className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                    <Wrench className="w-3.5 h-3.5" />
                    {story.trade}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-white/50 text-sm">
                    <MapPin className="w-4 h-4" />
                    {story.location}
                  </span>
                  <span className="text-white font-bold">{story.name}</span>
                </div>
                <blockquote className="relative">
                  <Quote className="w-8 h-8 text-emerald-400/30 absolute -top-1 -left-1" />
                  <p className="text-lg sm:text-xl text-white/90 font-medium leading-relaxed pl-10">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                </blockquote>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 space-y-4">
                {story.body.map((para, i) => (
                  <p key={i} className="text-white/70 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              {/* Stats grid */}
              <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                <div className="grid sm:grid-cols-2 gap-3">
                  {story.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white/5 border border-white/10 rounded-xl p-4"
                    >
                      <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wide mb-1.5">
                        {stat.label}
                      </div>
                      <div className="text-sm text-white/80 leading-relaxed">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Result banner */}
              <div className="mx-6 sm:mx-8 mb-6 sm:mb-8 flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                <TrendingUp className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-sm text-emerald-100/90 leading-relaxed">
                  {story.result}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * TradeLeadGen — consolidated lead-generation guidance merged from retired
 * blog posts (roofing/plumbing/builders/heating/locksmith lead-gen guides).
 */
export function TradeLeadGen({
  trade,
  heading,
  intro,
  tips,
}: {
  trade: string
  heading: string
  intro: string
  tips: LeadGenTip[]
}) {
  return (
    <section className="py-16 lg:py-24 bg-[var(--navy-900)] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-3">
            Lead generation for {trade.toLowerCase()}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {heading}
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">{intro}</p>
        </div>
        <div className="space-y-4">
          {tips.map((tip) => (
            <div
              key={tip.title}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-emerald-500/30 transition-all"
            >
              <h3 className="text-lg font-bold text-white mb-2">
                {tip.title}
              </h3>
              <p className="text-white/70 leading-relaxed text-[15px]">
                {tip.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
