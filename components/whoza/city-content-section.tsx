"use client"

import { formatGBPCompact } from "@/lib/format"
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
    <section className="v2-section bg-[var(--v2-paper)] text-[var(--v2-body)]" aria-label="City content">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* City Overview */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[var(--v2-line)] mb-6">
            <MapPin className="w-4 h-4 text-[var(--coral)]" />
            <span className="text-[var(--v2-body)] text-sm">{locationData.city}, {locationData.region}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--v2-ink)] mb-4">
            The {locationData.city} Trade Market
          </h2>
          <p className="text-lg text-[var(--v2-body)] max-w-3xl mx-auto">
            {locationData.description}
          </p>
        </div>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6 text-center">
              <Building2 className="w-6 h-6 text-[var(--v2-green)] mx-auto mb-2" />
              <div className="text-2xl font-bold text-[var(--v2-ink)]">{stats.businesses}</div>
              <div className="text-sm text-[var(--v2-body)]">Trade Businesses</div>
            </div>
            <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6 text-center">
              <Home className="w-6 h-6 text-[var(--coral)] mx-auto mb-2" />
              <div className="text-2xl font-bold text-[var(--v2-ink)]">{stats.households}</div>
              <div className="text-sm text-[var(--v2-body)]">Households</div>
            </div>
            <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6 text-center">
              <CurrencyIcon className="w-6 h-6 text-[var(--v2-green)] mx-auto mb-2" />
              <div className="text-2xl font-bold text-[var(--v2-ink)]">{stats.avgJob}</div>
              <div className="text-sm text-[var(--v2-body)]">Average Job</div>
            </div>
            <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6 text-center">
              <PhoneOff className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-[var(--v2-ink)]">{stats.missedCallsWeekly}</div>
              <div className="text-sm text-[var(--v2-body)]">Missed Calls/Week</div>
            </div>
          </div>
        )}

        {/* City-specific details grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Neighbourhoods */}
          {neighbourhoods.length > 0 && (
            <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-8">
              <h3 className="text-xl font-bold text-[var(--v2-ink)] mb-6 flex items-center gap-2">
                <Map className="w-5 h-5 text-[var(--v2-green)]" />
                Areas We Cover in {locationData.city}
              </h3>
              <div className="flex flex-wrap gap-2">
                {neighbourhoods.map((hood, index) => (
                  <span key={index} className="px-3 py-1.5 rounded-full bg-white border border-[var(--v2-line)] text-sm text-[var(--v2-body)]">
                    {hood}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Associations */}
          {associations.length > 0 && (
            <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-8">
              <h3 className="text-xl font-bold text-[var(--v2-ink)] mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-[var(--v2-green)]" />
                Trade Standards in {locationData.city}
              </h3>
              <ul className="space-y-3">
                {associations.map((assoc, index) => (
                  <li key={index} className="flex items-center gap-3 text-[var(--v2-body)] text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--v2-green)] flex-shrink-0" />
                    {assoc}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Response Time */}
          {locationData.responseTime && (
            <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-8">
              <h3 className="text-xl font-bold text-[var(--v2-ink)] mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[var(--coral)]" />
                Response Times in {locationData.city}
              </h3>
              <p className="text-[var(--v2-body)] text-sm leading-relaxed mb-3">
                {locationData.responseTime}. Katie answers every call instantly, 24/7, 365 days a year, so your customers never hear voicemail.
              </p>
              {locationData.callVolume && (
                <p className="text-[var(--v2-muted)] text-sm">
                  {locationData.callVolume}.
                </p>
              )}
            </div>
          )}

          {/* Call Volume & Market */}
          {stats && (
            <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-8">
              <h3 className="text-xl font-bold text-[var(--v2-ink)] mb-4 flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-amber-400" />
                Missed Call Revenue Impact
              </h3>
              <p className="text-[var(--v2-body)] text-sm leading-relaxed">
                With {stats.missedCallsWeekly} missed calls every week, {locationData.city} tradespeople are losing{" "}
                {formatGBPCompact(parseInt(stats.missedCallsWeekly.replace(/,/g, "")) * parseInt(stats.avgJob.replace(/[^0-9]/g, "")), currency)}+
                in potential revenue every week. At a 35% conversion rate, that's over{" "}
                {formatGBPCompact(parseInt(stats.missedCallsWeekly.replace(/,/g, "")) * parseInt(stats.avgJob.replace(/[^0-9]/g, "")) * 0.35, currency)} in lost jobs every week. Katie ensures you capture every opportunity.
              </p>
            </div>
          )}
        </div>

        {/* City Context — Unique per city */}
      {locationData.cityContext && (
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-8">
            <h3 className="text-xl font-bold text-[var(--v2-ink)] mb-4 flex items-center gap-2">
              <Home className="w-5 h-5 text-[var(--v2-green)]" />
              Housing Stock in {locationData.city}
            </h3>
            <p className="text-[var(--v2-body)] text-sm leading-relaxed">{locationData.cityContext.housingStock}</p>
          </div>
          <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-8">
            <h3 className="text-xl font-bold text-[var(--v2-ink)] mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[var(--coral)]" />
              Weather Impact
            </h3>
            <p className="text-[var(--v2-body)] text-sm leading-relaxed">{locationData.cityContext.weatherImpact}</p>
          </div>
          <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-8">
            <h3 className="text-xl font-bold text-[var(--v2-ink)] mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-[var(--v2-green)]" />
              Permitting & Regulations
            </h3>
            <p className="text-[var(--v2-body)] text-sm leading-relaxed">{locationData.cityContext.permittingNotes}</p>
          </div>
          <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-8">
            <h3 className="text-xl font-bold text-[var(--v2-ink)] mb-4 flex items-center gap-2">
              <PoundSterling className="w-5 h-5 text-[var(--v2-green)]" />
              Market Dynamics
            </h3>
            <p className="text-[var(--v2-body)] text-sm leading-relaxed">{locationData.cityContext.marketDynamics}</p>
          </div>
          <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-8 md:col-span-2">
            <h3 className="text-xl font-bold text-[var(--v2-ink)] mb-4 flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-amber-400" />
              Trade Shortage in {locationData.city}
            </h3>
            <p className="text-[var(--v2-body)] text-sm leading-relaxed">{locationData.cityContext.tradeShortage}</p>
          </div>
        </div>
      )}

      {/* Case Studies — Unique per city */}
      {locationData.caseStudies && locationData.caseStudies.length > 0 && (
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-[var(--v2-ink)] mb-6 text-center">
            Real Results in {locationData.city}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {locationData.caseStudies.map((cs, idx) => (
              <div key={idx} className="bg-white border border-[var(--v2-line)] rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--v2-mint)] flex items-center justify-center text-[var(--v2-green)] font-bold text-sm">
                    {cs.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-[var(--v2-ink)] font-medium text-sm">{cs.name}</p>
                    <p className="text-[var(--v2-muted)] text-sm">{cs.trade}, {cs.area}</p>
                  </div>
                </div>
                <p className="text-[var(--v2-body)] text-sm leading-relaxed mb-4">{cs.story}</p>
                <p className="text-[var(--v2-body)] text-sm leading-relaxed mb-4">{cs.result}</p>
                <div className="text-[var(--v2-green)] font-bold text-sm">{cs.revenue}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Local Insights — Unique per city */}
      {locationData.localInsights && locationData.localInsights.length > 0 && (
        <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-8 mb-12">
          <h3 className="text-xl font-bold text-[var(--v2-ink)] mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[var(--coral)]" />
            Local Insights: {locationData.city}
          </h3>
          <ul className="space-y-3">
            {locationData.localInsights.map((insight, idx) => (
              <li key={idx} className="flex items-start gap-3 text-[var(--v2-body)] text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--coral)] flex-shrink-0 mt-1.5" />
                {insight}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* City-specific testimonial */}
        {testimonial && (
          <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-8 mb-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[var(--v2-mint)] flex items-center justify-center flex-shrink-0">
                <Quote className="w-5 h-5 text-[var(--v2-green)]" />
              </div>
              <div>
                <blockquote className="text-[var(--v2-ink)] text-lg leading-relaxed mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--v2-mint)] flex items-center justify-center text-[var(--v2-green)] font-bold text-sm">
                    {testimonial.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-[var(--v2-ink)] font-medium text-sm">{testimonial.name}</p>
                    <p className="text-[var(--v2-muted)] text-sm">{testimonial.trade}, {testimonial.area}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Local Challenges */}
        {challenges.length > 0 && (
          <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-8 mb-12">
            <h3 className="text-xl font-bold text-[var(--v2-ink)] mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[var(--coral)]" />
              Why {locationData.city} Tradespeople Miss Calls
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {challenges.map((challenge, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--coral)]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[var(--coral)] text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-[var(--v2-body)] text-sm">{challenge}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Market Size CTA */}
        {stats?.marketSize && (
          <div className="text-center mb-12">
            <p className="text-[var(--v2-body)] text-sm mb-2">{locationData.city} trade market value</p>
            <p className="text-3xl font-bold text-[var(--v2-ink)] mb-4">{stats.marketSize}</p>
          </div>
        )}

        {/* Cross-links to other cities */}
        {otherCities.length > 0 && (
          <div className="border-t border-[var(--v2-line)] pt-10">
            <h3 className="text-lg font-semibold text-[var(--v2-ink)] mb-4 text-center">
              Also Serving Tradespeople Across the UK
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {otherCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/${city.slug}`}
                  className="inline-flex items-center gap-2 bg-white hover:border-[#b9c6bf] border border-[var(--v2-line)] rounded-lg px-4 py-2 text-sm text-[var(--v2-body)] hover:text-[var(--v2-ink)] transition-all"
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
