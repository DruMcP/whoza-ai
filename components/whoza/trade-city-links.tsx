import Link from "next/link"
import { TRADE_CITY_PAGES } from "@/lib/trade-city-pages"
import { TRADE_NAMES } from "@/lib/seo-data"

const CITY_LABEL: Record<string, string> = {
  london: "London",
  manchester: "Manchester",
  birmingham: "Birmingham",
  glasgow: "Glasgow",
  bristol: "Bristol",
  liverpool: "Liverpool",
  leeds: "Leeds",
  edinburgh: "Edinburgh",
}

interface TradeCityLinksProps {
  trade: string // e.g. "for-plumbers"
  current?: string
  heading?: boolean
  intro?: boolean
}

export function TradeCityLinks({ trade, current, heading = true, intro = true }: TradeCityLinksProps) {
  const cities = (TRADE_CITY_PAGES[trade] ?? []).filter(c => c !== current)
  if (cities.length === 0) return null

  const tradeKey = trade.replace(/^for-/, "")
  const [, tradePlural] = TRADE_NAMES[tradeKey] || [tradeKey, tradeKey]

  return (
    <section className="v2-section-tight bg-[var(--v2-paper)] border-y border-[var(--v2-line)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {heading && (
          <h2 className="v2-h3 sm:text-2xl mb-3">
            AI Call Answering for {tradePlural} in Your City
          </h2>
        )}
        {intro && (
          <p className="text-[var(--v2-muted)] mb-6">
            Katie answers calls for {tradePlural} across the UK. Find your location:
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-3">
          {cities.map(city => (
            <Link
              key={city}
              href={`/${trade}-${city}`}
              className="inline-block bg-white border border-[var(--v2-line)] hover:border-[var(--v2-ink)] rounded-full px-4 py-2 text-sm font-medium text-[var(--v2-ink)] no-underline transition-colors capitalize"
            >
              {CITY_LABEL[city] ?? city}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
