"use client"

import { motion } from "framer-motion"
import { MapPin, TrendingUp, Users } from "lucide-react"
import { useLocale } from "@/lib/locale-context"
import { useEffect, useState } from "react"

// Simulated live stats that feel real and active
const geoStatsConfig = {
  uk: {
    cities: ["London", "Manchester", "Birmingham", "Leeds", "Glasgow", "Bristol", "Liverpool", "Edinburgh"],
    jobsPrefix: "jobs booked this week in",
    trustedPrefix: "Trusted by trades across",
    localDemand: "Local demand is high",
  },
  us: {
    cities: ["Dallas", "Houston", "Phoenix", "Chicago", "Los Angeles", "Miami", "Atlanta", "New York"],
    jobsPrefix: "jobs booked this week in",
    trustedPrefix: "Trusted by contractors across",
    localDemand: "Local demand is high",
  },
}

export function GeoProofBand() {
  const { country } = useLocale()
  const config = geoStatsConfig[country]
  
  const [jobsCount, setJobsCount] = useState(127)
  const [cityIndex, setCityIndex] = useState(0)

  // Rotate through cities and increment jobs count for realism
  useEffect(() => {
    const cityInterval = setInterval(() => {
      setCityIndex((prev) => (prev + 1) % config.cities.length)
    }, 4000)
    
    const jobsInterval = setInterval(() => {
      setJobsCount((prev) => prev + Math.floor(Math.random() * 3) + 1)
    }, 8000)

    return () => {
      clearInterval(cityInterval)
      clearInterval(jobsInterval)
    }
  }, [config.cities.length])

  const currentCity = config.cities[cityIndex]
  const nearbyCity1 = config.cities[(cityIndex + 1) % config.cities.length]
  const nearbyCity2 = config.cities[(cityIndex + 2) % config.cities.length]

  return (
    <section className="py-6 bg-[var(--navy-900)] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-12">
          {/* Jobs Booked Stat */}
          <motion.div
            key={currentCity}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-[var(--rex-green)]/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[var(--rex-green)]" />
            </div>
            <div>
              <div className="text-white font-bold text-lg">{jobsCount}+</div>
              <div className="text-white/60 text-sm">{config.jobsPrefix} {currentCity}</div>
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
              <div className="text-white/60 text-sm">{config.trustedPrefix}</div>
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
              <div className="text-white font-medium text-sm">{config.localDemand}</div>
              <div className="text-white/60 text-sm">Customers in your area need you</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
