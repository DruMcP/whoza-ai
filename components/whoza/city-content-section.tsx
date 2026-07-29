"use client"

import { LocationData, locations } from "@/lib/locations"
import { MapPin, TrendingUp, Building2, Home, PhoneOff, PoundSterling, DollarSign, Map, Award, Clock, PhoneCall, Quote } from "lucide-react"
import Link from "next/link"

interface CityContentSectionProps {
  locationData: LocationData
}

export function CityContentSection({ locationData }: CityContentSectionProps) {
  const stats = locationData.localStats
  const challenges = locationData.challenges || []
  const neighbourhoods = locationData.neighbourhoods || []
  const associations = locationData.associations || []
  const testimonial = locationData.testimonial
  const currency = locationData.country === "uk" ? "£" : "$"
  const CurrencyIcon = locationData.country === "uk" ? PoundSterling : DollarSign

  // All other UK cities for cross-links
  const otherCities = locations
    .filter(loc => loc.country === "uk" && loc.slug !== locationData.slug)
    .sort((a, b) => a.city.localeCompare(b.city))

  return (
    <section className="section-padding bg-[var(--navy-900)] dark-section" aria-label="City content">
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

        {/* City-specific details grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Neighbourhoods */}
          {neighbourhoods.length > 0 && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Map className="w-5 h-5 text-[var(--katie-blue)]" />
                Areas We Cover in {locationData.city}
              </h3>
              <div className="flex flex-wrap gap-2">
                {neighbourhoods.map((hood, index) => (
                  <span key={index} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/70">
                    {hood}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Associations */}
          {associations.length > 0 && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-400" />
                Trade Standards in {locationData.city}
              </h3>
              <ul className="space-y-3">
                {associations.map((assoc, index) => (
                  <li key={index} className="flex items-center gap-3 text-white/70 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                    {assoc}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Response Time */}
          {locationData.responseTime && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[var(--coral)]" />
                Response Times in {locationData.city}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-3">
                {locationData.responseTime}. Katie answers every call instantly — 24/7, 365 days a year — so your customers never hear voicemail.
              </p>
              {locationData.callVolume && (
                <p className="text-white/50 text-sm">
                  {locationData.callVolume}.
                </p>
              )}
            </div>
          )}

          {/* Call Volume & Market */}
          {stats && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-amber-400" />
                Missed Call Revenue Impact
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                With {stats.missedCallsWeekly} missed calls every week, {locationData.city} tradespeople are losing
                {currency}{Math.round(parseInt(stats.missedCallsWeekly.replace(/,/g, "")) * parseInt(stats.avgJob.replace(/[^0-9]/g, "")) / 1000)}k+
                in potential revenue monthly. At a 35% conversion rate, that's over {currency}{Math.round(parseInt(stats.missedCallsWeekly.replace(/,/g, "")) * parseInt(stats.avgJob.replace(/[^0-9]/g, "")) * 0.35 / 1000)}k in lost jobs every month. Katie ensures you capture every opportunity.
              </p>
            </div>
          )}
        </div>

        {/* City-specific testimonial */}
        {testimonial && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[var(--katie-blue)]/20 flex items-center justify-center flex-shrink-0">
                <Quote className="w-5 h-5 text-[var(--katie-blue)]" />
              </div>
              <div>
                <blockquote className="text-white/90 text-lg leading-relaxed mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">
                    {testimonial.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{testimonial.name}</p>
                    <p className="text-white/50 text-sm">{testimonial.trade}, {testimonial.area}</p>
                  </div>
                </div>
              </div>
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
          <div className="text-center mb-12">
            <p className="text-white/60 text-sm mb-2">{locationData.city} trade market value</p>
            <p className="text-3xl font-bold text-white mb-4">{stats.marketSize}</p>
          </div>
        )}

        {/* Cross-links to other cities */}
        {otherCities.length > 0 && (
          <div className="border-t border-white/10 pt-10">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">
              Also Serving Tradespeople Across the UK
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {otherCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/${city.slug}`}
                  className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/60 hover:text-white transition-all"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  {city.city}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
