import Link from "next/link"
import { ArrowRight, Wrench, Droplets, Zap, Home, Flame, Bug, TreePine, Paintbrush, Lock, Hammer, Calendar, Shield, Truck } from "lucide-react"

// Related trades mapping for each trade page
const relatedTradesMap: Record<string, Array<{ slug: string; name: string; icon: React.ComponentType<{ className?: string }> }>> = {
  "for-plumbers": [
    { slug: "/for-gas-engineers", name: "Gas Engineers", icon: Flame },
    { slug: "/for-drainage", name: "Drainage Specialists", icon: Droplets },
    { slug: "/for-heating-engineers", name: "Heating Engineers", icon: Calendar },
    { slug: "/for-handymen", name: "Handymen", icon: Home },
  ],
  "for-electricians": [
    { slug: "/for-plumbers", name: "Plumbers", icon: Droplets },
    { slug: "/for-gas-engineers", name: "Gas Engineers", icon: Flame },
    { slug: "/for-handymen", name: "Handymen", icon: Wrench },
    { slug: "/for-builders", name: "Builders", icon: Home },
  ],
  "for-builders": [
    { slug: "/for-carpenters", name: "Carpenters", icon: Hammer },
    { slug: "/for-plumbers", name: "Plumbers", icon: Droplets },
    { slug: "/for-electricians", name: "Electricians", icon: Zap },
    { slug: "/for-roofers", name: "Roofers", icon: Home },
  ],
  "for-carpenters": [
    { slug: "/for-builders", name: "Builders", icon: Home },
    { slug: "/for-joiners", name: "Joiners", icon: Hammer },
    { slug: "/for-roofers", name: "Roofers", icon: Home },
    { slug: "/for-handymen", name: "Handymen", icon: Wrench },
  ],
  "for-gas-engineers": [
    { slug: "/for-plumbers", name: "Plumbers", icon: Droplets },
    { slug: "/for-heating-engineers", name: "Heating Engineers", icon: Calendar },
    { slug: "/for-electricians", name: "Electricians", icon: Zap },
    { slug: "/for-handymen", name: "Handymen", icon: Wrench },
  ],
  "for-heating-engineers": [
    { slug: "/for-gas-engineers", name: "Gas Engineers", icon: Flame },
    { slug: "/for-plumbers", name: "Plumbers", icon: Droplets },
    { slug: "/for-electricians", name: "Electricians", icon: Zap },
    { slug: "/for-handymen", name: "Handymen", icon: Home },
  ],
  "for-roofers": [
    { slug: "/for-builders", name: "Builders", icon: Home },
    { slug: "/for-joiners", name: "Joiners", icon: Hammer },
    { slug: "/for-drainage", name: "Drainage Specialists", icon: Droplets },
    { slug: "/for-handymen", name: "Handymen", icon: Wrench },
  ],
  "for-tilers": [
    { slug: "/for-handymen", name: "Handymen", icon: Home },
    { slug: "/for-builders", name: "Builders", icon: Calendar },
    { slug: "/for-plasterers", name: "Plasterers", icon: Paintbrush },
    { slug: "/for-painters-decorators", name: "Painters & Decorators", icon: Paintbrush },
  ],
  "for-plasterers": [
    { slug: "/for-tilers", name: "Tilers", icon: Home },
    { slug: "/for-painters-decorators", name: "Painters & Decorators", icon: Paintbrush },
    { slug: "/for-builders", name: "Builders", icon: Home },
    { slug: "/for-handymen", name: "Handymen", icon: Wrench },
  ],
  "for-painters-decorators": [
    { slug: "/for-plasterers", name: "Plasterers", icon: Paintbrush },
    { slug: "/for-tilers", name: "Tilers", icon: Home },
    { slug: "/for-roofers", name: "Roofers", icon: Home },
    { slug: "/for-handymen", name: "Handymen", icon: Wrench },
  ],
  "for-locksmiths": [
    { slug: "/for-handymen", name: "Handymen", icon: Wrench },
    { slug: "/for-joiners", name: "Joiners", icon: Hammer },
    { slug: "/for-electricians", name: "Electricians", icon: Zap },
    { slug: "/for-builders", name: "Builders", icon: Home },
  ],
  "for-handymen": [
    { slug: "/for-plumbers", name: "Plumbers", icon: Droplets },
    { slug: "/for-electricians", name: "Electricians", icon: Zap },
    { slug: "/for-locksmiths", name: "Locksmiths", icon: Lock },
    { slug: "/for-painters-decorators", name: "Painters & Decorators", icon: Paintbrush },
  ],
  "for-joiners": [
    { slug: "/for-plumbers", name: "Plumbers", icon: Droplets },
    { slug: "/for-builders", name: "Builders", icon: Home },
    { slug: "/for-roofers", name: "Roofers", icon: Home },
    { slug: "/for-handymen", name: "Handymen", icon: Wrench },
  ],
  "for-landscapers": [
    { slug: "/for-builders", name: "Builders", icon: Truck },
    { slug: "/for-handymen", name: "Handymen", icon: Wrench },
    { slug: "/for-drainage", name: "Drainage Specialists", icon: Droplets },
    { slug: "/for-carpenters", name: "Carpenters", icon: Hammer },
  ],
  "for-pest-control": [
    { slug: "/for-cleaners", name: "Cleaners", icon: Shield },
    { slug: "/for-handymen", name: "Handymen", icon: Wrench },
    { slug: "/for-builders", name: "Builders", icon: Home },
    { slug: "/for-landscapers", name: "Landscapers", icon: TreePine },
  ],
  "for-cleaners": [
    { slug: "/for-pest-control", name: "Pest Control", icon: Bug },
    { slug: "/for-handymen", name: "Handymen", icon: Wrench },
    { slug: "/for-landscapers", name: "Landscapers", icon: TreePine },
    { slug: "/for-builders", name: "Builders", icon: Home },
  ],
  "for-drainage": [
    { slug: "/for-plumbers", name: "Plumbers", icon: Droplets },
    { slug: "/for-gas-engineers", name: "Gas Engineers", icon: Flame },
    { slug: "/for-handymen", name: "Handymen", icon: Wrench },
    { slug: "/for-builders", name: "Builders", icon: Home },
  ],
}

interface RelatedTradesProps {
  currentTrade: string
}

export function RelatedTrades({ currentTrade }: RelatedTradesProps) {
  // One card per page, even if the map above ever lists a trade twice.
  const related = relatedTradesMap[currentTrade]?.filter(
    (trade, i, all) => all.findIndex((t) => t.slug === trade.slug) === i,
  )
  
  if (!related || related.length === 0) return null

  return (
    <section className="v2-section-tight bg-white" aria-label="Related trades">
      <div className="v2-container">
        <div className="text-center mb-12">
          <h2 className="v2-h2 mb-4">
            Related Trades
          </h2>
          <p className="v2-lead max-w-2xl mx-auto">
            Explore AI call answering solutions for other trades. Katie adapts to every industry.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {related.map((trade) => {
            const Icon = trade.icon
            return (
              <Link
                key={trade.slug}
                href={trade.slug}
                className="group v2-card no-underline hover:border-[#b9c6bf] hover:-translate-y-0.5"
              >
                <Icon className="w-7 h-7 text-[var(--v2-green)] mb-4" />
                <h3 className="font-semibold text-[var(--v2-ink)] mb-2">{trade.name}</h3>
                <span className="inline-flex items-center text-[var(--v2-green)] text-sm font-medium">
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
