"use client"

import { motion } from "framer-motion"
import { Phone, MessageCircle, Clock, CheckCircle2, MapPin } from "lucide-react"

export function PhoneMockup({ city, trade }: { city?: string; trade?: string }) {
  // Hardcoded realistic demo data per Dru spec
  const enquiry = {
    label: "WhatsApp Enquiry Received",
    heading: "New Customer Enquiry",
    jobType: "Boiler Repair",
    name: "Sarah Thompson",
    area: "Aberdeen",
    urgency: "Today",
    value: "£180–£260",
    time: "ASAP",
  }

  return (
    <div className="relative">
      {/* Glow Effect */}
      <div className="absolute -inset-8 bg-[var(--rex-green)]/20 rounded-[60px] blur-3xl animate-pulse-ring" />
      
      {/* Phone Frame */}
      <motion.div 
        className="relative w-[280px] sm:w-[320px] h-[580px] sm:h-[640px] bg-[#0b141a] rounded-[50px] p-3 shadow-2xl animate-float"
        style={{ boxShadow: "0 50px 100px -20px rgba(0,0,0,0.5), 0 30px 60px -30px rgba(5,150,105,0.3)" }}
      >
        {/* Screen */}
        <div className="w-full h-full bg-[#0b141a] rounded-[40px] overflow-hidden relative">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-10" />
          
          {/* WhatsApp Header */}
          <div className="bg-[#1f2c34] px-4 py-3 pt-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--rex-green)] flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <div>
              <div className="text-white font-semibold text-sm">whoza.ai Jobs</div>
              <div className="text-[#8696a0] text-xs">online</div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--rex-green)] animate-pulse" />
            </div>
          </div>
          
          {/* Screen Content */}
          <div className="h-full p-4 flex flex-col bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzBhMWExZiIgb3BhY2l0eT0iMC4zIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]">
            
            {/* Job Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-[#005c4b] rounded-xl p-4 max-w-[260px] ml-auto mt-4"
            >
              {/* Top Label */}
              <div className="flex items-center justify-between mb-3">
                <div className="px-2 py-0.5 rounded bg-[#25d366] text-white text-[10px] font-bold uppercase tracking-wider">
                  {enquiry.label}
                </div>
                <div className="text-[#25d366] text-[10px]">Just now</div>
              </div>
              
              {/* Main Heading */}
              <div className="text-white/90 text-xs font-medium mb-3">
                {enquiry.heading}
              </div>
              
              {/* Job Type — Bold & Prominent */}
              <div className="text-white font-bold text-base mb-3 leading-tight">
                {enquiry.jobType}
              </div>
              
              {/* Details Grid */}
              <div className="space-y-2 text-white">
                <div className="flex items-start gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#25d366] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[10px] text-white/50 uppercase tracking-wider">Name</span>
                    <div className="text-sm font-medium">{enquiry.name}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#25d366] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[10px] text-white/50 uppercase tracking-wider">Area</span>
                    <div className="text-sm">{enquiry.area}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#25d366] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[10px] text-white/50 uppercase tracking-wider">Urgency</span>
                    <div className="text-sm">
                      <span className="inline-flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                        {enquiry.urgency}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#25d366] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[10px] text-white/50 uppercase tracking-wider">Preferred Time</span>
                    <div className="text-sm font-medium text-[#25d366]">{enquiry.time}</div>
                  </div>
                </div>
              </div>
              
              {/* Estimated Value — Highlighted */}
              <div className="mt-3 pt-3 border-t border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-white/50 uppercase tracking-wider">Estimated Value</span>
                    <div className="text-lg font-bold text-[#25d366]">{enquiry.value}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex gap-1.5 justify-end mt-3"
            >
              <button className="flex-1 flex items-center justify-center gap-1 px-2 py-2 rounded-full bg-[#25d366] text-white text-[10px] sm:text-xs font-bold shadow-lg hover:bg-[#128c7e] transition-colors">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Accept
              </button>
              <button className="flex-1 flex items-center justify-center gap-1 px-2 py-2 rounded-full bg-[var(--katie-blue)] text-white text-[10px] sm:text-xs font-medium shadow-lg hover:bg-[var(--katie-blue)]/90 transition-colors">
                <Phone className="w-3.5 h-3.5" />
                Call Back
              </button>
              <button className="flex-1 flex items-center justify-center gap-1 px-2 py-2 rounded-full bg-red-500 text-white text-[10px] sm:text-xs shadow-lg hover:bg-red-600 transition-colors">
                Decline
              </button>
            </motion.div>

            {/* Confirmed Message */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8 }}
              className="bg-[#005c4b] rounded-xl p-3 max-w-[220px] ml-auto mt-4"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#25d366]" />
                <div>
                  <div className="text-[#25d366] text-sm font-bold">ENQUIRY ACCEPTED</div>
                  <div className="text-white text-xs">{enquiry.jobType} • {enquiry.area}</div>
                </div>
              </div>
            </motion.div>

            {/* Customer Notified */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
              className="text-center mt-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-white/50 text-xs">
                <CheckCircle2 className="w-3 h-3 text-[#25d366]" />
                Customer notified via WhatsApp
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Floating Badges */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="absolute -left-12 sm:-left-20 top-1/4 animate-float-delayed"
      >
        <div className="px-4 py-2 rounded-xl bg-white shadow-lg border border-gray-100">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-[var(--rex-green)]" />
            <span className="text-sm font-semibold text-[var(--navy-900)]">Via WhatsApp</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute -right-12 sm:-right-20 top-1/2 animate-float"
      >
        <div className="px-4 py-2 rounded-xl bg-white shadow-lg border border-gray-100">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[var(--katie-blue)]" />
            <span className="text-sm font-semibold text-[var(--navy-900)]">2 Taps</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="absolute -bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="px-4 py-2 rounded-xl bg-[var(--rex-green)] shadow-lg text-white">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm font-semibold">Enquiry Captured</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
