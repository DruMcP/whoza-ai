import Link from "next/link";
import { LIVE_CITY_PAGES, TRADE_NAMES } from "@/lib/seo-data";

interface TradeCityLinksProps {
  tradeSlug: string; // e.g. "plumbers"
}

export function TradeCityLinks({ tradeSlug }: TradeCityLinksProps) {
  const cities = LIVE_CITY_PAGES[tradeSlug] || [];
  const [, tradePlural] = TRADE_NAMES[tradeSlug] || [tradeSlug, tradeSlug];

  if (cities.length === 0) return null;

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          AI Call Answering for {tradePlural} in Your City
        </h2>
        <p className="text-white/60 mb-6">
          Katie answers calls for {tradePlural} across the UK. Find your location:
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {cities.map((city) => (
            <Link
              key={city}
              href={`/for-${tradeSlug}-${city}`}
              className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all capitalize"
            >
              {city}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
