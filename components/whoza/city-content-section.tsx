"use client"

import { LocationData } from "@/lib/locations"
import { MapPin, TrendingUp, Building2, Home, PhoneOff, PoundSterling, DollarSign } from "lucide-react"

interface CityContentSectionProps {
  locationData: LocationData
}

export function CityContentSection({ locationData }: CityContentSectionProps) {
  const stats = locationData.localStats
  const challenges = locationData.challenges || []
  const currency = locationData.country === "uk" ? "£" : "$"
  const CurrencyIcon = locationData.country === "uk" ? PoundSterling : DollarSign

  return (
    <section className="py-16 bg-[var(--navy-900)] dark-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* City Overview */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <MapPin className="w-4 h-4 text-[var(--coral)]" />
            <span className="text-white/80 text-sm">{locationData.city}, {locationData.region}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            The {locationData.city} Trade Market
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            {locationData.description}
          </p>
        </div>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <Building2 className="w-6 h-6 text-[var(--katie-blue)] mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.businesses}</div>
              <div className="text-sm text-white/60">Trade Businesses</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <Home className="w-6 h-6 text-[var(--coral)] mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.households}</div>
              <div className="text-sm text-white/60">Households</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <CurrencyIcon className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.avgJob}</div>
              <div className="text-sm text-white/60">Average Job</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <PhoneOff className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.missedCallsWeekly}</div>
              <div className="text-sm text-white/60">Missed Calls/Week</div>
            </div>
          </div>
        )}

        {/* Local Challenges */}
        {challenges.length > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-12">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[var(--coral)]" />
              Why {locationData.city} Tradespeople Miss Calls
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {challenges.map((challenge, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--coral)]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[var(--coral)] text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-white/80 text-sm">{challenge}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Market Size CTA */}
        {stats?.marketSize && (
          <div className="text-center">
            <p className="text-white/60 text-sm mb-2">{locationData.city} trade market value</p>
            <p className="text-3xl font-bold text-white mb-4">{stats.marketSize}</p>
            <p className="text-white/70 text-sm max-w-2xl mx-auto">
              With {stats.missedCallsWeekly} missed calls every week, {locationData.city} tradespeople are losing 
              {currency}{parseInt(stats.missedCallsWeekly.replace(/,/g, "")) * parseInt(stats.avgJob.replace(/[^0-9]/g, "")) / 1000}k+ 
              in potential revenue monthly. Katie ensures you capture every opportunity.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
