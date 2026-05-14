"use client"

import { motion } from "framer-motion"
import { MapPin, TrendingUp, Users } from "lucide-react"
import { useLocale } from "@/lib/locale-context"
import { useEffect, useState } from "react"

// Simulated live stats that feel real and active
const geoStatsConfig = {
  uk: {
    cities: ["London", "Manchester", "Birmingham", "Leeds", "Glasgow", "Bristol", "Liverpool", "Edinburgh"],
    jobsPrefix: "enquiries captured this week in",
    trustedPrefix: "Trusted by trades across",
    localDemand: "Local demand is high",
  },
  us: {
    cities: ["Dallas", "Houston", "Phoenix", "Chicago", "Los Angeles", "Miami", "Atlanta", "New York"],
    jobsPrefix: "enquiries captured this week in",
    trustedPrefix: "Trusted by contractors across",
    localDemand: "Local demand is high",
  },
}

interface GeoProofBandProps {
  city?: string
  country?: "uk" | "us"
  jobsThisWeek?: number
}

export function GeoProofBand({ city, country: forcedCountry, jobsThisWeek: forcedJobs }: GeoProofBandProps) {
  const { country: ctxCountry } = useLocale()
  const country = forcedCountry || ctxCountry
  const geoConfig = geoStatsConfig[country]
  
  const [jobsCount, setJobsCount] = useState(forcedJobs || 127)
  const [cityIndex, setCityIndex] = useState(0)

  // Rotate through cities and increment jobs count for realism
  // But ONLY on homepage (no city prop). On location pages, stay fixed.
  useEffect(() => {
    if (city) return // Fixed on location pages
    
    const cityInterval = setInterval(() => {
      setCityIndex((prev) => (prev + 1) % geoConfig.cities.length)
    }, 4000)
    
    const jobsInterval = setInterval(() => {
      setJobsCount((prev) => prev + Math.floor(Math.random() * 3) + 1)
    }, 8000)

    return () => {
      clearInterval(cityInterval)
      clearInterval(jobsInterval)
    }
  }, [geoConfig.cities.length, city])

  const currentCity = city || geoConfig.cities[cityIndex]
  const nearbyCity1 = geoConfig.cities[(cityIndex + 1) % geoConfig.cities.length]
  const nearbyCity2 = geoConfig.cities[(cityIndex + 2) % geoConfig.cities.length]

  return (
    <section className="py-6 bg-[var(--navy-900)] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-12">
          {/* Enquiries Captured Stat */}
          <motion.div
            key={currentCity}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-[var(--rex-green)]/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[var(--rex-green)]" />
            </div>
            <div>
              <div className="text-white font-bold text-lg">{jobsCount}+</div>
              <div className="text-white/60 text-sm">{geoConfig.jobsPrefix} {currentCity}</div>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="hidden lg:block w-px h-10 bg-white/10" />

          {/* Trusted By */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--katie-blue)]/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-[var(--katie-blue)]" />
            </div>
            <div>
              <div className="text-white/60 text-sm">{geoConfig.trustedPrefix}</div>
              <div className="text-white font-medium text-sm">{currentCity}, {nearbyCity1}, {nearbyCity2}</div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px h-10 bg-white/10" />

          {/* Local Demand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--claire-amber)]/20 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-[var(--claire-amber)]" />
            </div>
            <div>
              <div className="text-white font-medium text-sm">{geoConfig.localDemand}</div>
              <div className="text-white/60 text-sm">Customers in your area need you</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
