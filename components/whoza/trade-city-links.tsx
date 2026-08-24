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
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {heading && (
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            AI Call Answering for {tradePlural} in Your City
          </h2>
        )}
        {intro && (
          <p className="text-white/60 mb-6">
            Katie answers calls for {tradePlural} across the UK. Find your location:
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-3">
          {cities.map(city => (
            <Link
              key={city}
              href={`/${trade}-${city}`}
              className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all capitalize"
            >
              {CITY_LABEL[city] ?? city}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
