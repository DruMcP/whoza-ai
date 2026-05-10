"use client"

import { motion } from "framer-motion"
import { Phone, Calendar, Star, TrendingUp, ArrowUpRight, Eye } from "lucide-react"
import { useLocale } from "@/lib/locale-context"

const statsConfig = {
  uk: [
    { label: "Calls Answered", value: "147", change: "+23%", icon: Phone, color: "var(--katie-blue)" },
    { label: "Enquiries Captured", value: "89", change: "+18%", icon: Calendar, color: "var(--rex-green)" },
    { label: "Estimated Value Captured", value: "£12,340", change: "+34%", icon: TrendingUp, color: "var(--claire-amber)" },
    { label: "Reviews Generated", value: "34", change: "+12", icon: Star, color: "var(--mark-grey)" },
  ],
  us: [
    { label: "Calls Answered", value: "147", change: "+23%", icon: Phone, color: "var(--katie-blue)" },
    { label: "Enquiries Captured", value: "89", change: "+18%", icon: Calendar, color: "var(--rex-green)" },
    { label: "Estimated Value Captured", value: "$16,450", change: "+34%", icon: TrendingUp, color: "var(--claire-amber)" },
    { label: "Reviews Generated", value: "34", change: "+12", icon: Star, color: "var(--mark-grey)" },
  ],
}

export function DashboardPreview() {
  const { country, config } = useLocale()
  const stats = statsConfig[country]

  return (
    <section className="py-20 lg:py-32 bg-[var(--navy-900)] relative overflow-hidden dark-section">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--katie-blue)]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[var(--rex-green)]/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--claire-amber)]/20 text-[var(--claire-amber)] text-sm font-medium mb-6">
            <Eye className="w-4 h-4" />
            Real-Time Dashboard
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance reveal">
            See What Whoza Captures for You
          </h2>
          <p className="mt-6 text-lg text-white/60 text-pretty">
            Track every call, job, and pound recovered. 
            Know your ROI at a glance.
          </p>
        </motion.div>

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Browser Frame */}
          <div className="bg-[#1a1a2e] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
            {/* Browser Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-white/10 rounded-lg px-3 py-1.5 text-center text-white/40 text-sm">
                  app.whoza.ai/dashboard
                </div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-6 lg:p-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 reveal-stagger">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/5 rounded-xl p-4 border border-white/10"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}20` }}>
                        <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                      </div>
                      <div className="flex items-center gap-1 text-[var(--rex-green)] text-sm font-medium">
                        <ArrowUpRight className="w-4 h-4" />
                        {stat.change}
                      </div>
                    </div>
                    <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-white/50 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Chart Placeholder */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-white font-semibold">Estimated Value Captured</div>
                    <div className="text-white/50 text-sm">Last 30 days</div>
                  </div>
                  <div className="text-2xl font-bold text-[var(--rex-green)]">
                    {country === "uk" ? "£12,340" : "$16,450"}
                  </div>
                </div>
                
                {/* Fake Chart Bars */}
                <div className="flex items-end gap-2 h-32">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${height}%` }}
                      transition={{ delay: i * 0.05, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="flex-1 rounded-t-sm bg-gradient-to-t from-[var(--rex-green)] to-[var(--rex-green)]/50"
                    />
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="mt-6 bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="text-white font-semibold mb-4">Recent Activity</div>
                <div className="space-y-3">
                  {[
                    { action: "Enquiry captured", detail: "Boiler repair • £140", time: "2 min ago", color: "var(--rex-green)" },
                    { action: "Call answered", detail: "New enquiry from Manchester", time: "5 min ago", color: "var(--katie-blue)" },
                    { action: "Review received", detail: "5 stars from David T.", time: "12 min ago", color: "var(--claire-amber)" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full live-dot" style={{ backgroundColor: item.color }} />
                      <span className="text-white">{item.action}</span>
                      <span className="text-white/50">{item.detail}</span>
                      <span className="ml-auto text-white/30">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white text-[var(--navy-900)] text-sm font-semibold shadow-lg"
          >
            Real-time ROI tracking
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
