"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X, Phone, MapPin, Clock, MessageCircle, CheckCircle2 } from "lucide-react"
import { useLocale } from "@/lib/locale-context"

const jobExamples = {
  uk: [
    { 
      label: "WhatsApp Enquiry Received",
      heading: "New Customer Enquiry",
      jobType: "Boiler Repair",
      name: "Sarah Thompson",
      area: "Aberdeen",
      urgency: "Today",
      time: "ASAP",
      value: "£180–£260",
    },
    { 
      label: "WhatsApp Enquiry Received",
      heading: "New Customer Enquiry",
      jobType: "Blocked Drain",
      name: "David Wilson",
      area: "Birmingham",
      urgency: "Today",
      time: "5pm",
      value: "£85–£120",
    },
    { 
      label: "WhatsApp Enquiry Received",
      heading: "New Customer Enquiry",
      jobType: "Tap Install",
      name: "Emma Clarke",
      area: "Leeds",
      urgency: "This Week",
      time: "Friday 10am",
      value: "£95–£140",
    },
  ],
  us: [
    { 
      label: "WhatsApp Enquiry Received",
      heading: "New Customer Enquiry",
      jobType: "HVAC Repair",
      name: "Sarah Johnson",
      area: "Dallas, TX",
      urgency: "Today",
      time: "ASAP",
      value: "$180–$260",
    },
    { 
      label: "WhatsApp Enquiry Received",
      heading: "New Customer Enquiry",
      jobType: "Drain Cleaning",
      name: "Mike Williams",
      area: "Chicago, IL",
      urgency: "Today",
      time: "5pm",
      value: "$120–$180",
    },
    { 
      label: "WhatsApp Enquiry Received",
      heading: "New Customer Enquiry",
      jobType: "Faucet Replacement",
      name: "Jennifer Davis",
      area: "Houston, TX",
      urgency: "This Week",
      time: "Friday 10am",
      value: "$150–$220",
    },
  ],
}

export function WhatsAppDelivery() {
  const { country, config } = useLocale()
  const jobs = jobExamples[country]
  const [currentJob, setCurrentJob] = useState(0)
  const [jobStatus, setJobStatus] = useState<"pending" | "accepted" | "declined">("pending")

  const job = jobs[currentJob]

  const handleAccept = () => {
    setJobStatus("accepted")
    setTimeout(() => {
      setJobStatus("pending")
      setCurrentJob((prev) => (prev + 1) % jobs.length)
    }, 2000)
  }

  const handleDecline = () => {
    setJobStatus("declined")
    setTimeout(() => {
      setJobStatus("pending")
      setCurrentJob((prev) => (prev + 1) % jobs.length)
    }, 1500)
  }

  return (
    <section className="py-28 lg:py-44 bg-[var(--navy-900)] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[var(--rex-green)]/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--rex-green)] text-white text-base font-bold mb-6 shadow-lg">
            <MessageCircle className="w-5 h-5" />
            THE CORE EXPERIENCE
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight text-balance">
            Jobs Land On{" "}
            <span className="text-[var(--rex-green)]">Your Phone</span>
          </h2>
          <p className="mt-8 text-xl lg:text-2xl text-white/70 text-pretty max-w-2xl mx-auto">
            No apps. No logins. No dashboards. Just WhatsApp.
            <span className="block mt-3 text-[var(--rex-green)] font-bold text-2xl">This is how you actually get paid work.</span>
            <span className="block mt-2 text-white/80 text-lg">Tap accept and the job is yours.</span>
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* WhatsApp Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            {/* Phone Frame */}
            <div className="relative w-[320px] sm:w-[360px] bg-[#0b141a] rounded-[40px] p-3 shadow-2xl">
              {/* Screen */}
              <div className="w-full bg-[#0b141a] rounded-[32px] overflow-hidden">
                {/* WhatsApp Header */}
                <div className="bg-[#1f2c34] px-4 py-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--katie-blue)] flex items-center justify-center">
                    <span className="text-white font-bold text-sm">W</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">whoza.ai</div>
                    <div className="text-[#8696a0] text-xs">online</div>
                  </div>
                </div>

                {/* Chat Area */}
                <div className="bg-[#0b141a] p-4 min-h-[400px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentJob}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      {/* Job Card Message */}
                      <div className="bg-[#005c4b] rounded-xl p-4 max-w-[280px] ml-auto">
                        {/* Top Label */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="px-2 py-0.5 rounded bg-[#25d366] text-white text-[10px] font-bold uppercase tracking-wider">
                            {job.label}
                          </div>
                          <div className="text-[#25d366] text-[10px]">Just now</div>
                        </div>
                        
                        {/* Main Heading */}
                        <div className="text-white/90 text-xs font-medium mb-3">
                          {job.heading}
                        </div>
                        
                        {/* Job Type — Bold & Prominent */}
                        <div className="text-white font-bold text-base mb-3 leading-tight">
                          {job.jobType}
                        </div>
                        
                        {/* Details Grid */}
                        <div className="space-y-2 text-white">
                          <div className="flex items-start gap-2">
                            <Phone className="w-3.5 h-3.5 text-[#25d366] mt-0.5 shrink-0" />
                            <div>
                              <span className="text-[10px] text-white/50 uppercase tracking-wider">Name</span>
                              <div className="text-sm font-medium">{job.name}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <MapPin className="w-3.5 h-3.5 text-[#25d366] mt-0.5 shrink-0" />
                            <div>
                              <span className="text-[10px] text-white/50 uppercase tracking-wider">Area</span>
                              <div className="text-sm">{job.area}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <Clock className="w-3.5 h-3.5 text-[#25d366] mt-0.5 shrink-0" />
                            <div>
                              <span className="text-[10px] text-white/50 uppercase tracking-wider">Urgency</span>
                              <div className="text-sm">
                                <span className="inline-flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                                  {job.urgency}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#25d366] mt-0.5 shrink-0" />
                            <div>
                              <span className="text-[10px] text-white/50 uppercase tracking-wider">Preferred Time</span>
                              <div className="text-sm font-medium text-[#25d366]">{job.time}</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Estimated Value */}
                        <div className="mt-3 pt-3 border-t border-white/20">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-[10px] text-white/50 uppercase tracking-wider">Estimated Value</span>
                              <div className="text-lg font-bold text-[#25d366]">{job.value}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      {jobStatus === "pending" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="flex gap-2 justify-end flex-wrap"
                        >
                          <button
                            onClick={handleAccept}
                            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#25d366] text-white text-sm font-bold shadow-lg hover:bg-[#128c7e] transition-colors"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            Accept
                          </button>
                          <button
                            className="flex items-center gap-1.5 px-3 py-2.5 rounded-full bg-[var(--katie-blue)] text-white text-sm font-medium hover:bg-[var(--katie-blue)]/90 transition-colors shadow-lg"
                          >
                            <Phone className="w-4 h-4" />
                            Call Back
                          </button>
                          <button
                            onClick={handleDecline}
                            className="flex items-center gap-1.5 px-3 py-2.5 rounded-full bg-red-500 text-white text-sm hover:bg-red-600 transition-colors shadow-lg"
                          >
                            Decline
                          </button>
                        </motion.div>
                      )}

                      {/* Accepted State */}
                      {jobStatus === "accepted" && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="space-y-3"
                        >
                          <div className="bg-[#005c4b] rounded-xl p-4 max-w-[280px] ml-auto">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-[#25d366] flex items-center justify-center">
                                <CheckCircle2 className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <div className="text-[#25d366] font-bold text-sm">ENQUIRY ACCEPTED</div>
                                <div className="text-white text-xs">{job.jobType} • {job.area}</div>
                              </div>
                            </div>
                          </div>
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white/10 rounded-lg p-3 text-center"
                          >
                            <div className="text-[#25d366] text-xs font-medium">Customer notified via WhatsApp</div>
                          </motion.div>
                        </motion.div>
                      )}

                      {/* Declined State */}
                      {jobStatus === "declined" && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-white/10 rounded-xl p-3 max-w-[200px] ml-auto text-center"
                        >
                          <div className="text-white/70 text-sm">Job declined</div>
                        </motion.div>
                      )}

                      {/* Callback Option */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center"
                      >
                        <button className="text-[#25d366] text-xs flex items-center gap-1 mx-auto">
                          <Phone className="w-3 h-3" />
                          Request callback
                        </button>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-[var(--rex-green)] text-white text-sm font-bold shadow-lg flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Demo: tap to try
            </motion.div>
            
            {/* Live Activity Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute -top-4 -right-4 px-3 py-1.5 rounded-full bg-[var(--katie-blue)] text-white text-xs font-medium shadow-lg"
            >
              Interactive demo
            </motion.div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6">
              {[
                { title: "Customer name & details", desc: "Know who's calling before you decide" },
                { title: "Job type & requirements", desc: "Full job description from the call" },
                { title: "Location & travel time", desc: "Plan your route efficiently" },
                { title: "Preferred time slot", desc: "See when they need you" },
                { title: "Estimated job value", desc: "Know the revenue before accepting" },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-lg bg-[var(--rex-green)]/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-[var(--rex-green)]" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">{item.title}</div>
                    <div className="text-white/60 text-sm">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Actions Available */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-white font-semibold mb-4">Your options:</div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="w-12 h-12 rounded-full bg-[var(--rex-green)]/20 flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="w-6 h-6 text-[var(--rex-green)]" />
                  </div>
                  <div className="text-white text-sm">Accept</div>
                </div>
                <div>
                  <div className="w-12 h-12 rounded-full bg-[var(--katie-blue)]/20 flex items-center justify-center mx-auto mb-2">
                    <Phone className="w-6 h-6 text-[var(--katie-blue)]" />
                  </div>
                  <div className="text-white text-sm">Call Back</div>
                </div>
                <div>
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-2">
                    <X className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="text-white text-sm">Decline</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
