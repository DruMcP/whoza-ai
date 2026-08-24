import Link from "next/link"
import { TRADE_CITY_PAGES } from "@/lib/trade-city-pages"

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

export function TradeCityLinks({ trade, current }: { trade: string; current?: string }) {
  const cities = (TRADE_CITY_PAGES[trade] ?? []).filter(c => c !== current)
  if (cities.length === 0) return null
  return (
    <div className="mt-12 flex flex-wrap justify-center gap-3">
      {cities.map(city => (
        <Link
          key={city}
          href={`/${trade}-${city}`}
          className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-2 text-sm text-white/60 hover:text-white transition-all"
        >
          {CITY_LABEL[city] ?? city}
        </Link>
      ))}
    </div>
  )
}
